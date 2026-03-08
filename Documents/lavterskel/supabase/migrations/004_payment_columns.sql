-- Migrasjon 004: betalingskolonner på user_programs
-- Legger til payment_status, price_nok og paid_at for Stripe/Vipps-integrasjon.
-- Codex la til disse kolonnene i programs.ts og checkout/page.tsx — dette er den
-- manglende DB-støtten for å unngå "column does not exist"-feil i produksjon.

alter table public.user_programs
  add column if not exists payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'refunded')),
  add column if not exists price_nok      int,
  add column if not exists paid_at        timestamptz;

-- Indeks for rask sjekk om bruker har betalt (brukes i middleware/paywall-guard)
create index if not exists user_programs_paid_at_idx
  on public.user_programs (paid_at)
  where paid_at is not null;
