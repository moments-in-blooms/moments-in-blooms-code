-- =============================================================================
-- Moments in Blooms — admin profiles (team management)
-- -----------------------------------------------------------------------------
-- Allows the single owner to add another staff/admin and lets every admin
-- edit their own display name / email. This table is NOT the CMS content
-- blob — it mirrors `auth.users` with a lightweight profile.
--
-- Table:
--
--   admin_profiles → one row per auth user (id = auth.users.id)
--                    `role` = owner | staff, `is_active` soft-disables login
--
-- Security model:
--
--   anon: no access (no policies; privileges revoked)
--   authenticated: SELECT/INSERT/UPDATE/DELETE allowed (any admin can manage team
--                  for v1 — tighten to owner-only later if needed). This mirrors
--                  FAQ tables' authenticated full CRUD and keeps the client simple.
--
-- Auto-creation: when a new auth user signs up via Supabase Auth, an
--                 `after insert on auth.users` trigger creates their profile
--                 from `raw_user_meta_data.display_name` (if present). This
--                 keeps `auth.users` as source of truth for email/password.
--
-- SAFE TO RE-RUN: idempotent — table `if not exists`, policies dropped first,
--                 trigger/function `or replace`.
-- =============================================================================

-- 1. Table
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  role text not null default 'staff' check (role in ('owner','staff')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_profiles_email_not_blank check (btrim(email) <> '')
);

comment on table public.admin_profiles is 'Admin team profiles — one per auth user, mirrors auth.users for display_name/role.';

-- 2. updated_at maintenance
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end; $$;

drop trigger if exists admin_profiles_set_updated_at on public.admin_profiles;
create trigger admin_profiles_set_updated_at
  before update on public.admin_profiles
  for each row execute function public.set_updated_at();

-- 3. Auto-create profile on auth.users insert
create or replace function public.handle_new_admin_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.admin_profiles (id, email, display_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'displayName', split_part(new.email,'@',1)),
    case when (select count(*) from public.admin_profiles) = 0 then 'owner' else 'staff' end
  )
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_admin_user();

-- 4. Enable RLS
alter table public.admin_profiles enable row level security;

-- 5. Remove conflicting policies
do $$
declare policy_name text;
begin
  for policy_name in select p.policyname from pg_policies p where p.schemaname='public' and p.tablename='admin_profiles'
  loop execute format('drop policy if exists %I on public.admin_profiles', policy_name); end loop;
end; $$;

-- 6. Authenticated full CRUD (v1 simple — any admin can manage team)
create policy "Admins can view profiles" on public.admin_profiles for select to authenticated using (true);
create policy "Admins can create profiles" on public.admin_profiles for insert to authenticated with check (true);
create policy "Admins can update profiles" on public.admin_profiles for update to authenticated using (true) with check (true);
create policy "Admins can delete profiles" on public.admin_profiles for delete to authenticated using (true);

-- 7. Grants
revoke all on public.admin_profiles from anon;
grant select, insert, update, delete on public.admin_profiles to authenticated;

-- 8. Index
create index if not exists admin_profiles_email_idx on public.admin_profiles (email);

-- 9. Backfill for pre-existing auth users (primary account before migration)
insert into public.admin_profiles (id, email, display_name, role)
select
  u.id,
  u.email,
  coalesce(u.raw_user_meta_data->>'display_name', u.raw_user_meta_data->>'displayName', split_part(u.email,'@',1)),
  case when row_number() over (order by u.created_at) = 1 then 'owner' else 'staff' end
from auth.users u
left join public.admin_profiles p on p.id = u.id
where p.id is null
on conflict (id) do nothing;
