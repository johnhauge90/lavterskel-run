'use server';

import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export type HealthStatus = 'syk' | 'skadet';

// Rapporter at bruker er syk eller skadet.
// Bruker upsert slik at status kan endres uten å slette først.
export async function reportHealthStatus(status: HealthStatus) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Ikke innlogget');

  const { error } = await supabase
    .from('user_health_status')
    .upsert({ user_id: user.id, status, reported_at: new Date().toISOString() });

  if (error) throw new Error(error.message);

  revalidatePath('/dashboard');
}

// Slett helsestatusen — bruker er klar til å trene igjen.
export async function clearHealthStatus() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Ikke innlogget');

  const { error } = await supabase
    .from('user_health_status')
    .delete()
    .eq('user_id', user.id);

  if (error) throw new Error(error.message);

  revalidatePath('/dashboard');
}
