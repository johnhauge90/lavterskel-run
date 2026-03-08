import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Service role-klient — bruker SUPABASE_SERVICE_ROLE_KEY (hemmelig, aldri eksponert til browser).
// BARE brukt i Server Components og Server Actions under /admin.
// Bypasser RLS — kan lese/skrive alle rader på tvers av brukere.

if (typeof window !== 'undefined') {
  throw new Error('admin.ts må aldri importeres på klientsiden.');
}

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      'Mangler NEXT_PUBLIC_SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY i miljøvariabler.'
    );
  }

  return createSupabaseClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
