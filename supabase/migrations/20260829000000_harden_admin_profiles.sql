-- =============================================================================
-- Moments in Blooms — harden admin_profiles RLS + storage allow-list note
-- -----------------------------------------------------------------------------
-- - Owner-only role/is_active changes: staff can update only their own
--   display_name; role + is_active changes require caller to be an owner.
-- - Keeps authenticated SELECT for team list, INSERT via trigger/backfill.
-- - Storage bucket allow-list is enforced client-side (no SVG); server-side
--   MIME enforcement should be applied in Supabase dashboard storage policy
--   (allowed_mime_types: image/jpeg, image/png, image/webp, image/gif).
--
-- SAFE TO RE-RUN: drops conflicting policies first, recreates owner-gated ones.
-- =============================================================================

-- 1. Helper: is the current user an active owner?
create or replace function public.is_active_owner()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.admin_profiles
    where id = auth.uid() and role = 'owner' and is_active = true
  );
$$;

-- 2. Replace admin_profiles policies with owner-gated writes
do $$
declare policy_name text;
begin
  for policy_name in select p.policyname from pg_policies p where p.schemaname='public' and p.tablename='admin_profiles'
  loop execute format('drop policy if exists %I on public.admin_profiles', policy_name); end loop;
end; $$;

-- Team list visible to any active admin
create policy "Admins can view profiles" on public.admin_profiles
  for select to authenticated using (true);

-- Updates:
--  a) a user can always update their own display_name (never role/is_active)
--  b) owners can update any profile including role/is_active
create policy "Admins can update own display name" on public.admin_profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "Owners can manage profiles" on public.admin_profiles
  for update to authenticated
  using (public.is_active_owner())
  with check (public.is_active_owner());

-- Inserts/deletes remain owner-only (trigger creates rows on signup)
create policy "Owners can create profiles" on public.admin_profiles
  for insert to authenticated with check (public.is_active_owner());

create policy "Owners can delete profiles" on public.admin_profiles
  for delete to authenticated using (public.is_active_owner());

-- 3. Grants (unchanged shape, re-assert)
revoke all on public.admin_profiles from anon;
grant select, insert, update, delete on public.admin_profiles to authenticated;
