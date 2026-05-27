'use server';

import { currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// ─── Admin Verification ─────────────────────────────────────────────────────
// Checks that the current Clerk user is logged in AND their email is authorized.
async function checkIsAdmin() {
  const user = await currentUser();
  if (!user) {
    throw new Error('Unauthorized: You must be logged in.');
  }

  const adminEmailsVar = process.env.ADMIN_EMAILS || '';
  const allowedEmails = adminEmailsVar.split(',').map(e => e.trim().toLowerCase());

  const isAllowed = user.emailAddresses.some(email =>
    allowedEmails.includes(email.emailAddress.toLowerCase())
  );

  if (!isAllowed) {
    throw new Error('Forbidden: Your account is not authorized for admin actions.');
  }

  return user;
}

// ─── Verify Admin Status (for client-side auth check) ───────────────────────
export async function verifyAdminAccess(): Promise<{ authorized: boolean; email?: string; error?: string }> {
  try {
    const user = await checkIsAdmin();
    const email = user.emailAddresses[0]?.emailAddress || '';
    return { authorized: true, email };
  } catch (err: any) {
    return { authorized: false, error: err.message };
  }
}

// ─── Save Product ────────────────────────────────────────────────────────────
export async function saveAdminProduct(payload: Record<string, any>, isUpdate: boolean, productId?: number) {
  await checkIsAdmin();

  try {
    if (isUpdate && productId) {
      const { data, error } = await supabaseAdmin
        .from('products')
        .update(payload)
        .eq('id', productId)
        .select()
        .single();

      if (error) {
        // Graceful fallback for missing columns
        if (error.message.includes('is_hidden') || error.message.includes('weight')) {
          const fallback = { ...payload };
          delete fallback.is_hidden;
          delete fallback.weight;
          const { data: d2, error: e2 } = await supabaseAdmin
            .from('products')
            .update(fallback)
            .eq('id', productId)
            .select()
            .single();
          if (e2) throw new Error(e2.message);
          return { success: true, data: d2 };
        }
        throw new Error(error.message);
      }
      return { success: true, data };
    } else {
      const { data, error } = await supabaseAdmin
        .from('products')
        .insert([payload])
        .select()
        .single();

      if (error) {
        if (error.message.includes('is_hidden') || error.message.includes('weight')) {
          const fallback = { ...payload };
          delete fallback.is_hidden;
          delete fallback.weight;
          const { data: d2, error: e2 } = await supabaseAdmin
            .from('products')
            .insert([fallback])
            .select()
            .single();
          if (e2) throw new Error(e2.message);
          return { success: true, data: d2 };
        }
        throw new Error(error.message);
      }
      return { success: true, data };
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'Unknown error' };
  }
}

// ─── Delete Single Product ───────────────────────────────────────────────────
export async function deleteAdminProduct(productId: number) {
  await checkIsAdmin();

  try {
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Unknown error' };
  }
}

// ─── Delete ALL Products ────────────────────────────────────────────────────
export async function deleteAllAdminProducts() {
  await checkIsAdmin();

  try {
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .gt('id', -1);

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Unknown error' };
  }
}

// ─── Nuke ALL Data ──────────────────────────────────────────────────────────
export async function nukeAllAdminData() {
  await checkIsAdmin();

  try {
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .gt('id', -1);

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Unknown error' };
  }
}

// ─── Migration: Sync local products to DB ───────────────────────────────────
export async function executeMigrationAction(productsPayload: Record<string, any>[]) {
  await checkIsAdmin();

  try {
    // 1. Clear existing products
    await supabaseAdmin.from('products').delete().gt('id', -1);

    // 2. Insert all products
    if (productsPayload.length > 0) {
      let { error } = await supabaseAdmin.from('products').insert(productsPayload);

      // Fallback if is_hidden column doesn't exist yet
      if (error && error.message.includes('is_hidden')) {
        const fallback = productsPayload.map(({ is_hidden, ...rest }) => rest);
        const retry = await supabaseAdmin.from('products').insert(fallback);
        if (retry.error) throw new Error(retry.error.message);
      } else if (error) {
        throw new Error(error.message);
      }
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Migration failed' };
  }
}
