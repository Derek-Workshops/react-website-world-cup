-- ============================================================
--  World Cup Prediction Pool — database schema
--  Run this once in your Supabase project:
--  Dashboard → SQL Editor → New query → paste → Run.
-- ============================================================

-- Pool members (public display names for the leaderboard).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  created_at timestamptz not null default now()
);

-- One prediction per member per match.
create table if not exists public.predictions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  match_id bigint not null,
  predicted_home int not null check (predicted_home >= 0),
  predicted_away int not null check (predicted_away >= 0),
  updated_at timestamptz not null default now(),
  unique (user_id, match_id)
);

-- ---------- Row Level Security ----------
alter table public.profiles enable row level security;
alter table public.predictions enable row level security;

-- Everyone signed in can see all members and all predictions (needed for the
-- shared leaderboard), but can only create / change their own rows.

drop policy if exists "profiles are viewable by authenticated users" on public.profiles;
create policy "profiles are viewable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

drop policy if exists "users manage their own profile" on public.profiles;
create policy "users manage their own profile"
  on public.profiles for all
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "predictions are viewable by authenticated users" on public.predictions;
create policy "predictions are viewable by authenticated users"
  on public.predictions for select
  to authenticated
  using (true);

drop policy if exists "users manage their own predictions" on public.predictions;
create policy "users manage their own predictions"
  on public.predictions for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
