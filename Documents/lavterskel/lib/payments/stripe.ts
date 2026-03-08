import Stripe from 'stripe';
import type { Program } from '@/lib/programs/registry';

let stripeClient: Stripe | null = null;

export function getStripeClient() {
  if (stripeClient) return stripeClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Manglende STRIPE_SECRET_KEY');
  }

  stripeClient = new Stripe(secretKey);
  return stripeClient;
}

type CreateCheckoutSessionInput = {
  userId: string;
  userEmail?: string | null;
  orderId: string;
  program: Program;
  successUrl: string;
  cancelUrl: string;
};

export async function createStripeCheckoutSession({
  userId,
  userEmail,
  orderId,
  program,
  successUrl,
  cancelUrl,
}: CreateCheckoutSessionInput) {
  const stripe = getStripeClient();

  return stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: userEmail ?? undefined,
    client_reference_id: userId,
    metadata: {
      order_id: orderId,
      user_id: userId,
      program_slug: program.slug,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'nok',
          unit_amount: program.price * 100,
          product_data: {
            name: program.name,
            description: `${program.weeks} ukers treningsprogram`,
          },
        },
      },
    ],
  });
}

export function constructStripeEvent(payload: string, signature: string) {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('Manglende STRIPE_WEBHOOK_SECRET');
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
