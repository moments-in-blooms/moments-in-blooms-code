-- =============================================================================
-- Moments in Blooms — Supabase Storage bucket for CMS images
-- -----------------------------------------------------------------------------
-- All CMS images (hero, gallery, testimonials, collections, etc.) must be
-- uploaded to Supabase Storage — pasting external URLs is not allowed.
--
--   Admin ImageField → storage service → Supabase Storage → public URL
--   stored in `page_content.content` JSON blob (or future relational rows)
--
-- Bucket:
--
--   public-media → public read, authenticated write. Files are organized by
--                  prefix: `cms/<pageKey>/<uuid>-<filename>` so the CMS can
--                  delete/replace without collisions.
--
-- Security model:
--
--   anon (public visitors):
--     SELECT → allowed (public bucket — images are public by definition)
--     INSERT / UPDATE / DELETE → denied (no policy; privileges revoked)
--
--   authenticated (admin panel session):
--     SELECT / INSERT / UPDATE / DELETE → allowed on objects in this bucket
--
-- Policy for `storage.objects` follows Supabase Storage RLS conventions:
--   bucket_id = 'public-media'
--
-- SAFE TO RE-RUN: every statement is idempotent. Bucket is upserted; policies
-- are dropped then recreated. Grants are re-applied.
--
-- Run in the Supabase SQL Editor: Dashboard → SQL Editor → New query.
-- Or via Supabase CLI: `supabase db push`
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Bucket — public, reasonable limits
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'public-media',
  'public-media',
  true,
  5242880, -- 5 MB per file (matches ImageField maxSizeMb default)
  array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- -----------------------------------------------------------------------------
-- 2. Enable RLS on storage.objects (already enabled by Supabase, but idempotent)
-- -----------------------------------------------------------------------------
-- Do not disable RLS.

-- -----------------------------------------------------------------------------
-- 3. Remove conflicting/duplicate policies on storage.objects for this bucket
-- -----------------------------------------------------------------------------
do $$
declare
  policy_name text;
begin
  for policy_name in
    select p.policyname
    from pg_policies p
    where p.schemaname = 'storage' and p.tablename = 'objects'
      and p.policyname like '%public-media%'
  loop
    execute format('drop policy if exists %I on storage.objects', policy_name);
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- 4. Public read — anon can read any object in public-media
-- -----------------------------------------------------------------------------
create policy "Public can view public-media"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'public-media');

-- Allow authenticated to also read (needed for admin preview via same client)
create policy "Admins can view public-media"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'public-media');

-- -----------------------------------------------------------------------------
-- 5. Admin write — authenticated can insert/update/delete in public-media
-- -----------------------------------------------------------------------------
create policy "Admins can upload to public-media"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'public-media');

create policy "Admins can update public-media"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'public-media')
  with check (bucket_id = 'public-media');

create policy "Admins can delete from public-media"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'public-media');

-- -----------------------------------------------------------------------------
-- 6. Grants — storage.objects is managed by supabase storage schema;
--    policies above are the source of truth. No additional grants needed
--    beyond defaults (authenticated already has usage on storage schema).
-- -----------------------------------------------------------------------------
