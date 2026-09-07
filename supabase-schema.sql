-- Run this in your Supabase project's SQL editor (Database -> SQL Editor)

create table invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  business_name text,
  client_name text,
  due_date date,
  tax_rate numeric,
  items jsonb,
  total numeric,
  created_at timestamp with time zone default now()
);

create table expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  date date,
  category text,
  description text,
  amount numeric,
  created_at timestamp with time zone default now()
);

-- Row Level Security: each business can only see and edit its own data
alter table invoices enable row level security;
alter table expenses enable row level security;

create policy "Users manage their own invoices"
  on invoices for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage their own expenses"
  on expenses for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
