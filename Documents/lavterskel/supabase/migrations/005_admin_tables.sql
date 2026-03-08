-- Migrasjon 005: admin-støtte
-- broadcast_messages: meldinger admin sender til alle dashboards (announcement-banner).
-- Lesing: alle innloggede brukere kan lese aktive meldinger.
-- Skriving: kun service-role (admin-panel bruker service role client, ikke anon key).

create table if not exists public.broadcast_messages (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  body       text not null,
  is_active  boolean not null default true,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users on delete set null
);

-- Indeks for rask henting av aktive meldinger
create index if not exists broadcast_messages_active_idx
  on public.broadcast_messages (is_active, created_at desc)
  where is_active = true;

-- RLS
alter table public.broadcast_messages enable row level security;

-- Alle innloggede brukere kan lese aktive meldinger (for dashboard-banner)
create policy "broadcast_messages: read active"
  on public.broadcast_messages for select
  using (is_active = true and auth.role() = 'authenticated');

-- Insert/update/delete kun via service role (admin-panel)
-- (ingen policy = blokkert for authenticated/anon)
