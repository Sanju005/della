-- Supabase Storage setup for mobile provider application uploads
-- Run this once in Supabase SQL editor.

insert into storage.buckets (id, name, public)
values ('provider-assets', 'provider-assets', true)
on conflict (id) do nothing;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public can view provider assets'
  ) then
    create policy "Public can view provider assets"
      on storage.objects
      for select
      to public
      using (bucket_id = 'provider-assets');
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public can upload provider assets'
  ) then
    create policy "Public can upload provider assets"
      on storage.objects
      for insert
      to public
      with check (bucket_id = 'provider-assets');
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public can update provider assets'
  ) then
    create policy "Public can update provider assets"
      on storage.objects
      for update
      to public
      using (bucket_id = 'provider-assets')
      with check (bucket_id = 'provider-assets');
  end if;
end $$;
