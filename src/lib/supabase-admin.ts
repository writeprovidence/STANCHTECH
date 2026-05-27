import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceRole) {
  console.warn('Supabase Admin credentials missing. Check .env.local');
}

// This client has the service role key and completely bypasses RLS.
// IT MUST NEVER BE USED IN CLIENT COMPONENTS OR EXPOSED TO THE FRONTEND.
export const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceRole || 'placeholder',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
