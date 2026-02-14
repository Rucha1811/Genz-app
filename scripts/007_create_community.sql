-- Create community posts table
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text,
  category text,
  anonymous boolean default true,
  likes_count integer default 0,
  replies_count integer default 0,
  created_at timestamp with time zone default now()
);

alter table public.community_posts enable row level security;

create policy "posts_select_all"
  on public.community_posts for select
  using (true);

create policy "posts_insert_own"
  on public.community_posts for insert
  with check (auth.uid() = user_id);

-- Create news feed table
create table if not exists public.news_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  source text,
  category text,
  url text,
  created_at timestamp with time zone default now()
);

alter table public.news_items enable row level security;

create policy "news_select_all"
  on public.news_items for select
  using (true);
