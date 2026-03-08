-- ============================================================
-- LAVTERSKEL.RUN — Fase 2: Workout Completions
-- Kjør dette i Supabase Dashboard → SQL Editor
-- ============================================================

-- Tabell: Hvem fullførte hvilken økt
create table if not exists public.workout_completions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  workout_id   uuid not null,        -- refererer til hardkodet UUID i koden (MVP)
  completed_at timestamp with time zone not null default now(),
  unique(user_id, workout_id)         -- kan ikke fullføre samme økt to ganger
);

-- RLS: Brukere ser og endrer kun egne data
alter table public.workout_completions enable row level security;

create policy "Bruker kan lese egne completions"
  on public.workout_completions for select
  using (auth.uid() = user_id);

create policy "Bruker kan legge til egne completions"
  on public.workout_completions for insert
  with check (auth.uid() = user_id);

-- Index for raskere oppslag per bruker
create index if not exists workout_completions_user_id_idx
  on public.workout_completions(user_id);


-- ============================================================
-- SEED: Statiske workout-IDer (matcher hardkodet data i page.tsx)
-- Disse er kun dokumentasjon — ingen data å inserte her.
-- ============================================================
-- Uke 3 - Torsdag Terskelfart: 'c3d4e5f6-0003-0003-0003-000000000002'
-- Uke 3 - Søndag Langtur:      'c3d4e5f6-0003-0003-0003-000000000003'
-- Uke 3 - Tirsdag Sone 2:      'c3d4e5f6-0003-0003-0003-000000000001'
