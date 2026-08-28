-- =============================================================================
-- Moments in Blooms — CMS page content (generic JSON-blob store)
-- -----------------------------------------------------------------------------
-- Backs the admin CMS page editors with Supabase so admin edits go live for
-- every public visitor (previously page content persisted to localStorage only,
-- so edits never left the editor's browser).
--
--   Admin page editor → pageContent service → Supabase → Public page
--
-- Table:
--
--   page_content → one row per CMS page key (about, homepage, services, …).
--                  `content` holds the whole page's values object as a JSON
--                  blob — the exact shape the app already stored per page
--                  (src/services/content.js `savePageContent`), so no per-page
--                  column mapping is needed.
--
-- Security model:
--
--   anon (public visitors):
--     SELECT → allowed (page content is public by definition)
--     INSERT / UPDATE / DELETE → denied (no policy; privileges revoked)
--
--   authenticated (admin panel session):
--     SELECT / INSERT / UPDATE / DELETE → allowed
--
-- No draft/publish workflow: a save is immediately live, matching the existing
-- CMS semantics.
--
-- PILOT NOTE: the application currently reads/writes Supabase for a single
-- gated page (`about`) via SUPABASE_CONTENT_PAGES in src/services/pageContent.js.
-- This table serves every page; rollout is a code-only change (add page keys to
-- that set) — no further migration required.
--
-- NO SEED ROWS: until an admin saves a page for the first time, the public site
-- falls back to the hardcoded seed constants (src/constants/*). The first save
-- creates that page's row. This avoids an empty `{}` blob blanking a page.
--
-- SAFE TO RE-RUN: every statement is idempotent. All pre-existing policies on
-- the table are dropped first (no competing/duplicate policies remain).
--
-- Run in the Supabase SQL Editor: Dashboard → SQL Editor → New query.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Table
-- -----------------------------------------------------------------------------
create table if not exists public.page_content (
  page_key text primary key,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint page_content_key_not_blank check (btrim(page_key) <> '')
);

comment on table public.page_content is
  'CMS page content, one row per page key. `content` is the whole page values object (JSON blob) rendered by the matching public page. Publicly readable; admin-writable.';

-- -----------------------------------------------------------------------------
-- 2. updated_at maintenance (function is shared with the other migrations)
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists page_content_set_updated_at on public.page_content;
create trigger page_content_set_updated_at
  before update on public.page_content
  for each row
  execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 3. Enable RLS
-- -----------------------------------------------------------------------------
alter table public.page_content enable row level security;

-- -----------------------------------------------------------------------------
-- 4. Remove conflicting/duplicate policies (any source: GUI, earlier runs)
-- -----------------------------------------------------------------------------
do $$
declare
  policy_name text;
begin
  for policy_name in
    select p.policyname
    from pg_policies p
    where p.schemaname = 'public' and p.tablename = 'page_content'
  loop
    execute format('drop policy if exists %I on public.page_content', policy_name);
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- 5. Public read policy — anon can read all page content
-- -----------------------------------------------------------------------------
create policy "Public can view page content"
  on public.page_content
  for select
  to anon
  using (true);

-- -----------------------------------------------------------------------------
-- 6. Authenticated admin policies — full CRUD
-- -----------------------------------------------------------------------------
create policy "Admins can view page content"
  on public.page_content for select to authenticated using (true);
create policy "Admins can create page content"
  on public.page_content for insert to authenticated with check (true);
create policy "Admins can update page content"
  on public.page_content for update to authenticated using (true) with check (true);
create policy "Admins can delete page content"
  on public.page_content for delete to authenticated using (true);

-- -----------------------------------------------------------------------------
-- 7. Grants — anon gets SELECT only; authenticated gets full CRUD
--    (defense in depth: even if RLS were ever disabled, anon cannot write)
-- -----------------------------------------------------------------------------
grant select on public.page_content to anon;
revoke insert, update, delete on public.page_content from anon;

grant select, insert, update, delete on public.page_content to authenticated;
