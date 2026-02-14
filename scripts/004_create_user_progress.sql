-- Create user progress tracking
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  career_goal text,
  skills_learned text[],
  weekly_score integer,
  monthly_score integer,
  updated_at timestamp with time zone default now()
);

alter table public.user_progress enable row level security;

create policy "user_progress_select_own"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "user_progress_insert_own"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "user_progress_update_own"
  on public.user_progress for update
  using (auth.uid() = user_id);
