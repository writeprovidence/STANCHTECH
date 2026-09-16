'use server';

import { currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// ─── Admin Verification ─────────────────────────────────────────────────────
async function checkIsAdmin() {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized: You must be logged in.');

  const adminEmailsVar = process.env.ADMIN_EMAILS || '';
  const allowedEmails = adminEmailsVar.split(',').map(e => e.trim().toLowerCase());

  const isAllowed = user.emailAddresses.some(email =>
    allowedEmails.includes(email.emailAddress.toLowerCase())
  );

  if (!isAllowed) throw new Error('Forbidden: Your account is not authorized.');
  return user;
}

// ─── Types ──────────────────────────────────────────────────────────────────
export interface InventoryItem {
  id: number;
  part_name: string;
  part_number: string;
  category: string;
  location: string;
  quantity: number;
  min_stock: number;
  unit_cost: number;
  supplier: string;
  condition: string;
  notes: string;
  last_restocked: string;
  created_at: string;
  updated_at: string;
}

// ─── Ensure Table Exists ────────────────────────────────────────────────────
async function ensureInventoryTable() {
  // Try a simple select — if the table doesn't exist, create it via raw SQL
  const { error } = await supabaseAdmin.from('inventory').select('id').limit(1);
  
  if (error && error.message.includes('relation "public.inventory" does not exist')) {
    const { error: createError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.inventory (
          id BIGSERIAL PRIMARY KEY,
          part_name TEXT NOT NULL DEFAULT '',
          part_number TEXT NOT NULL DEFAULT '',
          category TEXT NOT NULL DEFAULT '',
          location TEXT NOT NULL DEFAULT '',
          quantity INTEGER NOT NULL DEFAULT 0,
          min_stock INTEGER NOT NULL DEFAULT 0,
          unit_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
          supplier TEXT NOT NULL DEFAULT '',
          condition TEXT NOT NULL DEFAULT 'New',
          notes TEXT NOT NULL DEFAULT '',
          last_restocked TIMESTAMPTZ DEFAULT NOW(),
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow service role full access" ON public.inventory
          FOR ALL USING (true) WITH CHECK (true);
      `
    });
    
    // If rpc doesn't exist, just try inserting directly — the table may already exist
    if (createError) {
      console.warn('Could not auto-create inventory table via RPC. Please create it manually in Supabase dashboard.', createError.message);
    }
  }
}

// ─── Fetch All Inventory ────────────────────────────────────────────────────
export async function fetchInventoryItems(): Promise<{ success: boolean; data?: InventoryItem[]; error?: string }> {
  await checkIsAdmin();
  
  try {
    await ensureInventoryTable();
    
    const { data, error } = await supabaseAdmin
      .from('inventory')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw new Error(error.message);
    return { success: true, data: (data || []) as InventoryItem[] };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to fetch inventory' };
  }
}

// ─── Save Inventory Item (Create or Update) ─────────────────────────────────
export async function saveInventoryItem(
  payload: Record<string, any>,
  isUpdate: boolean,
  itemId?: number
): Promise<{ success: boolean; data?: any; error?: string }> {
  await checkIsAdmin();

  try {
    await ensureInventoryTable();

    const cleanPayload = {
      part_name: payload.part_name || '',
      part_number: payload.part_number || '',
      category: payload.category || '',
      location: payload.location || '',
      quantity: typeof payload.quantity === 'number' ? payload.quantity : 0,
      min_stock: typeof payload.min_stock === 'number' ? payload.min_stock : 0,
      unit_cost: typeof payload.unit_cost === 'number' ? payload.unit_cost : 0,
      supplier: payload.supplier || '',
      condition: payload.condition || 'New',
      notes: payload.notes || '',
      last_restocked: payload.last_restocked || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isUpdate && itemId) {
      const { data, error } = await supabaseAdmin
        .from('inventory')
        .update(cleanPayload)
        .eq('id', itemId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return { success: true, data };
    } else {
      const { data, error } = await supabaseAdmin
        .from('inventory')
        .insert([{ ...cleanPayload, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return { success: true, data };
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to save item' };
  }
}

// ─── Delete Single Item ─────────────────────────────────────────────────────
export async function deleteInventoryItem(itemId: number): Promise<{ success: boolean; error?: string }> {
  await checkIsAdmin();

  try {
    const { error } = await supabaseAdmin
      .from('inventory')
      .delete()
      .eq('id', itemId);

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete item' };
  }
}

// ─── Delete ALL Inventory ───────────────────────────────────────────────────
export async function deleteAllInventory(): Promise<{ success: boolean; error?: string }> {
  await checkIsAdmin();

  try {
    const { error } = await supabaseAdmin
      .from('inventory')
      .delete()
      .gt('id', -1);

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to wipe inventory' };
  }
}

// ─── Bulk Restock ───────────────────────────────────────────────────────────
export async function bulkRestockItems(
  items: { id: number; quantity: number }[]
): Promise<{ success: boolean; error?: string }> {
  await checkIsAdmin();

  try {
    for (const item of items) {
      const { error } = await supabaseAdmin
        .from('inventory')
        .update({
          quantity: item.quantity,
          last_restocked: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', item.id);

      if (error) throw new Error(error.message);
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Bulk restock failed' };
  }
}
