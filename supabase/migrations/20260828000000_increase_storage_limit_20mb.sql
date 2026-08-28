-- =============================================================================
-- Moments in Blooms — Increase Supabase Storage bucket limit to 20MB
-- -----------------------------------------------------------------------------
-- Updates the public-media bucket file_size_limit from 5MB to 20MB to support
-- high-quality professional photos. Keeps all other settings and RLS policies
-- unchanged (admin upload/update/delete, public read).
--
-- SAFE TO RE-RUN: upsert on bucket id, idempotent.
-- Run via `supabase db push` or SQL Editor.
-- =============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'public-media',
  'public-media',
  true,
  20971520, -- 20 MB per file (matches ImageField/storage MAX_SIZE_MB=20)
  array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
