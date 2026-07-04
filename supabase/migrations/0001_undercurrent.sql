create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  therapy_goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  selections jsonb not null default '{}'::jsonb,
  why_text text not null default '',
  ai_feedback jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.therapy_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  therapist_name text,
  next_session_at timestamptz,
  mood_history int[] not null default array[3]::int[],
  streak_days int not null default 0,
  healing_milestones text[] not null default '{}'::text[],
  unlocked_pings text[] not null default '{}'::text[],
  journal_entries jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger user_profiles_set_updated_at
before update on public.user_profiles
for each row execute function public.set_updated_at();

create trigger quiz_insights_set_updated_at
before update on public.quiz_insights
for each row execute function public.set_updated_at();

create trigger therapy_logs_set_updated_at
before update on public.therapy_logs
for each row execute function public.set_updated_at();

alter table public.user_profiles enable row level security;
alter table public.quiz_insights enable row level security;
alter table public.therapy_logs enable row level security;

create policy "user_profiles_select_own"
on public.user_profiles
for select
using (auth.uid() = user_id);

create policy "user_profiles_insert_own"
on public.user_profiles
for insert
with check (auth.uid() = user_id);

create policy "user_profiles_update_own"
on public.user_profiles
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "quiz_insights_select_own"
on public.quiz_insights
for select
using (auth.uid() = user_id);

create policy "quiz_insights_insert_own"
on public.quiz_insights
for insert
with check (auth.uid() = user_id);

create policy "quiz_insights_update_own"
on public.quiz_insights
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "therapy_logs_select_own"
on public.therapy_logs
for select
using (auth.uid() = user_id);

create policy "therapy_logs_insert_own"
on public.therapy_logs
for insert
with check (auth.uid() = user_id);

create policy "therapy_logs_update_own"
on public.therapy_logs
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);