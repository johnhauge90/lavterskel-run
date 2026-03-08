'use server';

// Server Action: kobler innlogget bruker til et treningsprogram.
// Kalles fra LoginForm.tsx etter auth.
// user_programs er source of truth for tilgang; nytt/oppdatert valg settes til pending betaling.

import { revalidatePath } from 'next/cache';
import { createClient } from '@/app/utils/supabase/server';
import { getProgram } from '@/lib/programs/registry';

export async function assignProgram(programSlug: string): Promise<void> {
  const program = getProgram(programSlug);
  // Ugyldig slug — still og ignorer. Bruker havner på dashboard uten program.
  if (!program) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: existing, error: existingError } = await supabase
    .from('user_programs')
    .select('paid_at, payment_status')
    .eq('user_id', user.id)
    .maybeSingle();

  if (existingError) {
    console.error('[assignProgram] Kunne ikke hente eksisterende program:', existingError.message);
    return;
  }

  // Betalt bruker skal ikke få overskrevet programmet via URL-param.
  if (existing && (existing.paid_at || existing.payment_status === 'paid')) {
    return;
  }

  const { error } = await supabase.from('user_programs').upsert(
    {
      user_id: user.id,
      program_slug: program.slug,
      program_name: program.name,
      total_weeks: program.weeks,
      current_week: 1,
      price_nok: program.price,
      payment_status: 'pending',
      paid_at: null,
    },
    { onConflict: 'user_id' }
  );

  if (error) {
    console.error('[assignProgram] Uventet feil:', error.message);
  }

  revalidatePath('/checkout');
  revalidatePath('/dashboard');
}
