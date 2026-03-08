-- Migrasjon 003: user_programs
-- Kobler bruker til valgt treningsprogram fra quiz-funnelen.
-- En rad per bruker (UNIQUE på user_id) — MVP støtter ett aktivt program.
-- program_name er denormalisert for rask display uten join mot registry.

create table if not exists public.user_programs (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users on delete cascade,
  program_slug  text not null,
  program_name  text not null,
  total_weeks   int  not null,
  current_week  int  not null default 1,
  started_at    timestamptz not null default now(),

  -- Én bruker, ett aktivt program (MVP)
  unique (user_id)
);

-- Indeks for oppslag i dashboard
create index if not exists user_programs_user_id_idx
  on public.user_programs (user_id);

-- Row Level Security
alter table public.user_programs enable row level security;

-- Bruker kan lese eget program
create policy "user_programs: read own"
  on public.user_programs for select
  using (auth.uid() = user_id);

-- Bruker kan opprette eget program (én gang, pga UNIQUE)
create policy "user_programs: insert own"
  on public.user_programs for insert
  with check (auth.uid() = user_id);

-- Bruker kan oppdatere eget program (f.eks. current_week++)
create policy "user_programs: update own"
  on public.user_programs for update
  using (auth.uid() = user_id);
