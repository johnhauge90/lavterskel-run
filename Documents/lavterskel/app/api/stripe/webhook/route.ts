import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { constructStripeEvent } from '@/lib/payments/stripe';
import { createAdminClient } from '@/app/utils/supabase/admin';

export const runtime = 'nodejs';

async function findOrderBySessionOrMetadata(session: Stripe.Checkout.Session) {
  const admin = createAdminClient();

  const bySession = await admin
    .from('payment_orders')
    .select('id, user_id, status')
    .eq('stripe_checkout_session_id', session.id)
    .maybeSingle();

  if (bySession.error) {
    throw new Error(bySession.error.message);
  }

  if (bySession.data) {
    return bySession.data;
  }

  const metadataOrderId = session.metadata?.order_id;
  if (!metadataOrderId) {
    return null;
  }

  const byId = await admin
    .from('payment_orders')
    .select('id, user_id, status')
    .eq('id', metadataOrderId)
    .maybeSingle();

  if (byId.error) {
    throw new Error(byId.error.message);
  }

  if (!byId.data) {
    return null;
  }

  await admin
    .from('payment_orders')
    .update({
      stripe_checkout_session_id: session.id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', byId.data.id)
    .is('stripe_checkout_session_id', null);

  return byId.data;
}

async function markOrderAndProgramPaid(session: Stripe.Checkout.Session) {
  const admin = createAdminClient();
  const order = await findOrderBySessionOrMetadata(session);

  if (!order) {
    console.warn('[stripe-webhook] Fant ingen payment_order for session', session.id);
    return;
  }

  if (order.status === 'paid') {
    return;
  }

  const paidAt = new Date().toISOString();

  const { error: orderUpdateError } = await admin
    .from('payment_orders')
    .update({
      status: 'paid',
      paid_at: paidAt,
      updated_at: paidAt,
    })
    .eq('id', order.id)
    .neq('status', 'paid');

  if (orderUpdateError) {
    throw new Error(orderUpdateError.message);
  }

  const { error: programUpdateError } = await admin
    .from('user_programs')
    .update({
      payment_status: 'paid',
      paid_at: paidAt,
    })
    .eq('user_id', order.user_id)
    .neq('payment_status', 'paid');

  if (programUpdateError) {
    throw new Error(programUpdateError.message);
  }
}

async function markOrderExpired(session: Stripe.Checkout.Session) {
  const admin = createAdminClient();
  const order = await findOrderBySessionOrMetadata(session);

  if (!order) return;
  if (order.status === 'paid') return;

  const { error } = await admin
    .from('payment_orders')
    .update({
      status: 'expired',
      updated_at: new Date().toISOString(),
    })
    .eq('id', order.id)
    .neq('status', 'paid');

  if (error) {
    throw new Error(error.message);
  }
}

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'MISSING_SIGNATURE' }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = constructStripeEvent(payload, signature);
  } catch (error) {
    console.error('[stripe-webhook] Signaturfeil:', error);
    return NextResponse.json({ error: 'INVALID_SIGNATURE' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status === 'paid') {
        await markOrderAndProgramPaid(session);
      }
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      await markOrderExpired(session);
    }
  } catch (error) {
    console.error('[stripe-webhook] Behandlingsfeil:', error);
    return NextResponse.json({ error: 'WEBHOOK_PROCESSING_FAILED' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
