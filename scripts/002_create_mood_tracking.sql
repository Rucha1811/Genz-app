-- Create mood tracking table
create table if not exists public.mood_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mood_score integer check (mood_score >= 1 and mood_score <= 5),
  mood_label text,
  notes text,
  created_at timestamp with time zone default now()
);

alter table public.mood_entries enable row level security;

create policy "mood_entries_select_own"
  on public.mood_entries for select
  using (auth.uid() = user_id);

create policy "mood_entries_insert_own"
  on public.mood_entries for insert
  with check (auth.uid() = user_id);
