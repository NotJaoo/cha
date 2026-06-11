create table if not exists public.gift_statuses (
  gift_id integer primary key,
  status text not null check (status in ('disponivel', 'pendente', 'presenteado')),
  updated_at timestamptz not null default now()
);

create or replace function public.set_gift_status_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_gift_status_updated_at on public.gift_statuses;

create trigger set_gift_status_updated_at
before update on public.gift_statuses
for each row
execute function public.set_gift_status_updated_at();

alter table public.gift_statuses enable row level security;

drop policy if exists "Public can read gift statuses" on public.gift_statuses;
drop policy if exists "Authenticated can insert gift statuses" on public.gift_statuses;
drop policy if exists "Authenticated can update gift statuses" on public.gift_statuses;

create policy "Public can read gift statuses"
on public.gift_statuses
for select
using (true);

create policy "Authenticated can insert gift statuses"
on public.gift_statuses
for insert
to authenticated
with check (true);

create policy "Authenticated can update gift statuses"
on public.gift_statuses
for update
to authenticated
using (true)
with check (true);
