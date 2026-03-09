create table if not exists public.funnel_events (
  id bigserial primary key,
  event_name text not null,
  event_props jsonb not null default '{}'::jsonb,
  page_path text,
  referrer text,
  user_agent text,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists funnel_events_event_name_idx
  on public.funnel_events (event_name);

create index if not exists funnel_events_occurred_at_idx
  on public.funnel_events (occurred_at desc);

alter table public.funnel_events enable row level security;

-- Allow anonymous/event ingestion from the website.
create policy "funnel_events_insert_public"
  on public.funnel_events
  for insert
  to anon, authenticated
  with check (true);

-- Allow reads for authenticated users (dashboard/funnel).
create policy "funnel_events_select_authenticated"
  on public.funnel_events
  for select
  to authenticated
  using (true);
