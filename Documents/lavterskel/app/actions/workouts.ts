'use server';

import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// Server Action: Marker en økt som fullført.
// Kalles fra CompleteButton (client component) via useTransition.
// revalidatePath sørger for at dashbordet viser oppdatert status uten full reload.
export async function markWorkoutComplete(workoutId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Ikke innlogget');
  }

  const { error } = await supabase
    .from('workout_completions')
    .insert({ user_id: user.id, workout_id: workoutId });

  // unique-constraint på (user_id, workout_id) — ignorer duplikat-feil
  if (error && error.code !== '23505') {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
}
