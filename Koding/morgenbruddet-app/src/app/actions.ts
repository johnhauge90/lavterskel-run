'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function signupUser(formData: FormData) {
  const email = formData.get('email') as string;

  // Validate email
  if (!email || email.trim() === '') {
    return {
      success: false,
      message: 'E-post er påkrevd',
    };
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Ugyldig e-postformat',
    };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('signups')
      .insert({
        email: email.trim().toLowerCase(),
        source: 'nettside',
      });

    if (error) {
      console.error('Supabase error:', error);
      return {
        success: false,
        message: 'Noe gikk galt. Prøv igjen senere.',
      };
    }

    return {
      success: true,
      message: 'Takk! Du er nå registrert.',
    };
  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      success: false,
      message: 'En uventet feil oppstod. Prøv igjen senere.',
    };
  }
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validate inputs
  if (!email || !password) {
    redirect('/login?message=E-post og passord er påkrevd');
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect('/login?message=Ugyldig e-post eller passord');
  }

  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validate inputs
  if (!email || !password) {
    redirect('/login?message=E-post og passord er påkrevd');
  }

  if (password.length < 6) {
    redirect('/login?message=Passordet må være minst 6 tegn');
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect('/login?message=Kunne ikke opprette bruker. Prøv igjen.');
  }

  redirect('/login?message=Sjekk e-posten din for å bekrefte kontoen');
}
