'use server';

// Admin Server Actions — bruker service role client som bypasser RLS.
// ALLE funksjoner her validerer at innlogget bruker er admin FØR de gjør noe.
// Ellers er enhver innlogget bruker en sikkerhetsrisiko.

import { revalidatePath } from 'next/cache';
import { createClient } from '@/app/utils/supabase/server';
import { createAdminClient } from '@/app/utils/supabase/admin';
import { PROGRAMS, isProgramSlug } from '@/lib/programs/registry';

// --- INTERN HJELPEFUNKSJON ---
async function assertAdmin(): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Ikke innlogget');

  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!adminEmails.includes((user.email ?? '').toLowerCase())) {
    throw new Error('Ikke admin');
  }
}

// --- BRUKERHÅNDTERING ---

/** Marker bruker som betalt (manuell Vipps-godkjenning) */
export async function markUserAsPaid(userId: string): Promise<void> {
  await assertAdmin();
  const admin = createAdminClient();

  const { error } = await admin
    .from('user_programs')
    .update({
      payment_status: 'paid',
      paid_at: new Date().toISOString(),
    })
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/users');
  revalidatePath(`/admin/users/${userId}`);
}

/** Endre aktivt program for en bruker */
export async function changeUserProgram(
  userId: string,
  newSlug: string
): Promise<void> {
  await assertAdmin();

  if (!isProgramSlug(newSlug)) {
    throw new Error(`Ugyldig program-slug: ${newSlug}`);
  }

  const program = PROGRAMS[newSlug];
  const admin = createAdminClient();

  const { error } = await admin
    .from('user_programs')
    .update({
      program_slug: program.slug,
      program_name: program.name,
      total_weeks: program.weeks,
      current_week: 1,
      price_nok: program.price,
    })
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/users');
  revalidatePath(`/admin/users/${userId}`);
}

/** Tilordne program til bruker som ikke har ett fra før */
export async function assignProgramToUser(
  userId: string,
  slug: string
): Promise<void> {
  await assertAdmin();

  if (!isProgramSlug(slug)) throw new Error(`Ugyldig slug: ${slug}`);
  const program = PROGRAMS[slug];
  const admin = createAdminClient();

  const { error } = await admin.from('user_programs').upsert(
    {
      user_id: userId,
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

  if (error) throw new Error(error.message);

  revalidatePath('/admin/users');
  revalidatePath(`/admin/users/${userId}`);
}

/** Slett bruker (auth + alle tilknyttede data via cascade) */
export async function deleteUser(userId: string): Promise<void> {
  await assertAdmin();
  const admin = createAdminClient();

  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) throw new Error(error.message);

  revalidatePath('/admin/users');
  revalidatePath('/admin');
}

/** Endre aktiv uke for bruker */
export async function setUserWeek(userId: string, week: number): Promise<void> {
  await assertAdmin();

  const admin = createAdminClient();
  const { data: prog } = await admin
    .from('user_programs')
    .select('total_weeks')
    .eq('user_id', userId)
    .single();

  if (!prog) throw new Error('Ingen program funnet');
  if (week < 1 || week > prog.total_weeks) {
    throw new Error(`Uke må være mellom 1 og ${prog.total_weeks}`);
  }

  const { error } = await admin
    .from('user_programs')
    .update({ current_week: week })
    .eq('user_id', userId);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/users/${userId}`);
}

// --- MELDINGER ---

/** Send broadcast-melding til alle dashboards */
export async function sendBroadcastMessage(
  title: string,
  body: string,
  createdBy: string
): Promise<void> {
  await assertAdmin();
  const admin = createAdminClient();

  const { error } = await admin.from('broadcast_messages').insert({
    title,
    body,
    is_active: true,
    created_by: createdBy,
  });

  if (error) throw new Error(error.message);
  revalidatePath('/admin/messages');
}

/** Deaktiver en broadcast-melding */
export async function deactivateBroadcastMessage(messageId: string): Promise<void> {
  await assertAdmin();
  const admin = createAdminClient();

  const { error } = await admin
    .from('broadcast_messages')
    .update({ is_active: false })
    .eq('id', messageId);

  if (error) throw new Error(error.message);
  revalidatePath('/admin/messages');
}
