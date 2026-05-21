-- Provider registration workflow support for DELLA
-- Corrected so every referenced column exists before any index or foreign key uses it.
-- Safe to run in Supabase SQL editor.

create extension if not exists pgcrypto;

begin;

-- 1. Extend existing core tables first.

alter table if exists public.providers
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists date_of_birth date,
  add column if not exists residential_address text,
  add column if not exists current_location text,
  add column if not exists email text,
  add column if not exists phone_number text,
  add column if not exists id_number text,
  add column if not exists profile_photo_url text,
  add column if not exists verification_email text,
  add column if not exists verification_phone text,
  add column if not exists verification_status text default 'pending';

alter table if exists public.provider_services
  add column if not exists provider_id uuid,
  add column if not exists service_id text,
  add column if not exists service_name text,
  add column if not exists radius_km numeric,
  add column if not exists experience_years numeric,
  add column if not exists specialties text,
  add column if not exists description text,
  add column if not exists minimum_booking_hours numeric,
  add column if not exists payment_methods jsonb default '[]'::jsonb,
  add column if not exists availability_modes jsonb default '[]'::jsonb,
  add column if not exists certificates_label text,
  add column if not exists driving_license_label text,
  add column if not exists current_location text;

alter table if exists public.provider_images
  add column if not exists provider_id uuid,
  add column if not exists service_id text,
  add column if not exists title text,
  add column if not exists caption text,
  add column if not exists sort_order integer default 0;

-- 2. Create new tables only after providers exists.

create table if not exists public.provider_documents (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null,
  document_type text not null,
  label text not null,
  file_url text,
  notes text,
  status text not null default 'pending_review',
  created_at timestamptz not null default now()
);

create table if not exists public.admin_notifications (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  title text not null,
  body text not null,
  status text not null default 'unread',
  provider_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- 3. Add foreign keys after all columns/tables exist.
-- Guard each constraint so reruns stay safe.

do $$
begin
  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'public' and table_name = 'providers'
  ) then
    if not exists (
      select 1
      from pg_constraint
      where conname = 'provider_services_provider_id_fkey'
    ) then
      alter table public.provider_services
        add constraint provider_services_provider_id_fkey
        foreign key (provider_id) references public.providers(id) on delete cascade;
    end if;

    if not exists (
      select 1
      from pg_constraint
      where conname = 'provider_images_provider_id_fkey'
    ) then
      alter table public.provider_images
        add constraint provider_images_provider_id_fkey
        foreign key (provider_id) references public.providers(id) on delete cascade;
    end if;

    if not exists (
      select 1
      from pg_constraint
      where conname = 'provider_documents_provider_id_fkey'
    ) then
      alter table public.provider_documents
        add constraint provider_documents_provider_id_fkey
        foreign key (provider_id) references public.providers(id) on delete cascade;
    end if;

    if not exists (
      select 1
      from pg_constraint
      where conname = 'admin_notifications_provider_id_fkey'
    ) then
      alter table public.admin_notifications
        add constraint admin_notifications_provider_id_fkey
        foreign key (provider_id) references public.providers(id) on delete cascade;
    end if;
  end if;
end $$;

-- 4. Create indexes only after referenced columns exist.

create index if not exists idx_provider_services_provider_id
  on public.provider_services(provider_id);

create index if not exists idx_provider_documents_provider_id
  on public.provider_documents(provider_id);

create index if not exists idx_provider_images_provider_service
  on public.provider_images(provider_id, service_id, sort_order);

create index if not exists idx_admin_notifications_status
  on public.admin_notifications(status, created_at desc);

create index if not exists idx_admin_notifications_provider_id
  on public.admin_notifications(provider_id);

commit;
