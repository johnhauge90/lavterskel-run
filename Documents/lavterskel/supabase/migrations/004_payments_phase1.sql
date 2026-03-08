-- ============================================================
-- LAVTERSKEL.RUN — Fase 1: Payments (Stripe Checkout)
-- user_programs = source of truth for dashboard access
-- payment_orders = checkout/order log
-- ============================================================

-- Access/payment fields on user_programs
alter table public.user_programs
  add column if not exists price_nok int not null default 0,
  add column if not exists payment_status text not null default 'pending',
  add column if not exists paid_at timestamptz;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'user_programs_payment_status_check'
  ) then
    alter table public.user_programs
      add constraint user_programs_payment_status_check
      check (payment_status in ('pending', 'paid', 'failed', 'canceled'));
  end if;
end $$;

create index if not exists user_programs_paid_at_idx
  on public.user_programs (paid_at);

-- Minimal checkout/order log
create table if not exists public.payment_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  program_slug text not null,
  provider text not null default 'stripe',
  stripe_checkout_session_id text,
  amount_nok int not null,
  currency text not null default 'NOK',
  status text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz,

  constraint payment_orders_status_check
    check (status in ('created', 'pending', 'paid', 'failed', 'canceled', 'expired'))
);

create unique index if not exists payment_orders_stripe_session_uidx
  on public.payment_orders (stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;

create index if not exists payment_orders_user_id_created_at_idx
  on public.payment_orders (user_id, created_at desc);

alter table public.payment_orders enable row level security;

create policy "payment_orders: read own"
  on public.payment_orders for select
  using (auth.uid() = user_id);

create policy "payment_orders: insert own"
  on public.payment_orders for insert
  with check (auth.uid() = user_id);
