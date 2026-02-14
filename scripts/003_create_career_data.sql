-- Create careers table
create table if not exists public.careers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  risk_score text,
  growth_trend text,
  salary_range text,
  required_skills text[],
  future_outlook text,
  created_at timestamp with time zone default now()
);

alter table public.careers enable row level security;

create policy "careers_select_all"
  on public.careers for select
  using (true);

-- Create audio stories table
create table if not exists public.audio_stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  mood_type text,
  audio_url text,
  duration_seconds integer,
  created_at timestamp with time zone default now()
);

alter table public.audio_stories enable row level security;

create policy "audio_stories_select_all"
  on public.audio_stories for select
  using (true);
