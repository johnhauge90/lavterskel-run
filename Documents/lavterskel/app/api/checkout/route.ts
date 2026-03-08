import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { createStripeCheckoutSession } from '@/lib/payments/stripe';
import { getProgram } from '@/lib/programs/registry';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'UNAUTHORIZED', redirectTo: '/login' }, { status: 401 });
  }

  const { data: userProgram, error: userProgramError } = await supabase
    .from('user_programs')
    .select('program_slug, payment_status, paid_at')
    .eq('user_id', user.id)
    .maybeSingle();

  if (userProgramError) {
    console.error('[checkout] Kunne ikke hente user_programs:', userProgramError.message);
    return NextResponse.json({ error: 'PROGRAM_LOOKUP_FAILED' }, { status: 500 });
  }

  if (!userProgram) {
    return NextResponse.json({ error: 'NO_PROGRAM_SELECTED', redirectTo: '/quiz' }, { status: 400 });
  }

  const hasPaidAccess = Boolean(userProgram.paid_at) || userProgram.payment_status === 'paid';
  if (hasPaidAccess) {
    return NextResponse.json({ redirectTo: '/dashboard' }, { status: 200 });
  }

  const program = getProgram(userProgram.program_slug);
  if (!program) {
    return NextResponse.json({ error: 'INVALID_PROGRAM', redirectTo: '/quiz' }, { status: 400 });
  }

  const { data: order, error: orderInsertError } = await supabase
    .from('payment_orders')
    .insert({
      user_id: user.id,
      program_slug: program.slug,
      provider: 'stripe',
      amount_nok: program.price,
      currency: 'NOK',
      status: 'created',
    })
    .select('id')
    .single();

  if (orderInsertError || !order) {
    console.error('[checkout] Kunne ikke opprette payment_order:', orderInsertError?.message);
    return NextResponse.json({ error: 'ORDER_CREATE_FAILED' }, { status: 500 });
  }

  const url = new URL(request.url);
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? url.origin;

  let checkoutSession;
  try {
    checkoutSession = await createStripeCheckoutSession({
      userId: user.id,
      userEmail: user.email,
      orderId: order.id,
      program,
      successUrl: `${origin}/checkout?status=success`,
      cancelUrl: `${origin}/checkout?status=cancel`,
    });
  } catch (error) {
    await supabase
      .from('payment_orders')
      .update({
        status: 'failed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id);

    console.error('[checkout] Stripe session-feil:', error);
    return NextResponse.json({ error: 'STRIPE_SESSION_FAILED' }, { status: 500 });
  }

  if (!checkoutSession.url) {
    return NextResponse.json({ error: 'CHECKOUT_SESSION_MISSING_URL' }, { status: 500 });
  }

  const { error: orderUpdateError } = await supabase
    .from('payment_orders')
    .update({
      stripe_checkout_session_id: checkoutSession.id,
      status: 'pending',
      updated_at: new Date().toISOString(),
    })
    .eq('id', order.id);

  if (orderUpdateError) {
    console.error('[checkout] Kunne ikke oppdatere payment_order:', orderUpdateError.message);
    return NextResponse.json({ error: 'ORDER_UPDATE_FAILED' }, { status: 500 });
  }

  const { error: userProgramUpdateError } = await supabase
    .from('user_programs')
    .update({
      price_nok: program.price,
      payment_status: 'pending',
    })
    .eq('user_id', user.id)
    .is('paid_at', null);

  if (userProgramUpdateError) {
    console.error('[checkout] Klarte ikke å synke price/payment_status:', userProgramUpdateError.message);
  }

  return NextResponse.json({ url: checkoutSession.url });
}
