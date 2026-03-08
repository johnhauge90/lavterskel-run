-- ============================================================
-- LAVTERSKEL.RUN — Fase 4: User Health Status
-- Kjør dette i Supabase Dashboard → SQL Editor
-- ============================================================

-- PRIMARY KEY på user_id: maks én aktiv status per bruker om gangen
create table if not exists public.user_health_status (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  status      text not null check (status in ('syk', 'skadet')),
  reported_at timestamp with time zone not null default now()
);

-- RLS: Brukere ser og endrer kun sin egen status
alter table public.user_health_status enable row level security;

create policy "Bruker kan lese egen helsestatus"
  on public.user_health_status for select
  using (auth.uid() = user_id);

create policy "Bruker kan sette/oppdatere egen helsestatus"
  on public.user_health_status for insert
  with check (auth.uid() = user_id);

create policy "Bruker kan slette egen helsestatus"
  on public.user_health_status for delete
  using (auth.uid() = user_id);

-- Upsert støtte: bruker kan endre fra 'syk' til 'skadet' uten å slette først
create policy "Bruker kan oppdatere egen helsestatus"
  on public.user_health_status for update
  using (auth.uid() = user_id);
