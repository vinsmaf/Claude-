-- Amaryllis Corp — Supabase schema

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  address text,
  city text,
  price_per_night numeric(10,2) not null,
  max_guests integer not null default 4,
  bedrooms integer not null default 1,
  bathrooms integer not null default 1,
  images text[] default '{}',
  amenities text[] default '{}',
  created_at timestamptz default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade,
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  check_in date not null,
  check_out date not null,
  guests_count integer not null default 1,
  total_price numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  created_at timestamptz default now(),
  constraint check_dates check (check_out > check_in)
);

-- RLS: lecture publique des biens
alter table properties enable row level security;
create policy "public read properties" on properties for select using (true);

-- RLS: insertion publique des réservations
alter table bookings enable row level security;
create policy "public insert bookings" on bookings for insert with check (true);
create policy "public read own bookings" on bookings for select using (true);
