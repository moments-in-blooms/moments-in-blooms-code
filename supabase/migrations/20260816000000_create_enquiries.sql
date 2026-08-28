-- =============================================================================
-- Moments in Blooms — enquiries table (single, clean, re-runnable migration)
-- -----------------------------------------------------------------------------
-- Security model:
--
--   anon (public contact form):
--     INSERT  → allowed (policy "Public can submit enquiries")
--     SELECT  → denied (no policy; RLS)
--     UPDATE  → denied (no policy; RLS)
--     DELETE  → denied (no policy; RLS)
--
--   authenticated (admin panel session):
--     SELECT  → allowed (policy "Admins can view enquiries")
--     UPDATE  → allowed (policy "Admins can update enquiries")
--     DELETE  → allowed (policy "Admins can delete enquiries")
--
--   `status` is database-controlled: column DEFAULT 'new' plus a BEFORE
--   INSERT trigger that forces 'new'. The public client never submits it.
--
-- SAFE TO RE-RUN: every statement is idempotent. All pre-existing policies
-- on the table are dropped first (no competing/duplicate policies remain).
-- There is intentionally NO `revoke insert` and NO column-level grant — a
-- column-level INSERT grant makes RLS unable to evaluate the policy's
-- WITH CHECK against columns the role has no privilege on (42501).
--
-- Run in the Supabase SQL Editor: Dashboard → SQL Editor → New query.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Table (created if missing; exact columns/types are defined here)
-- -----------------------------------------------------------------------------
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  phone text,
  event_date date,
  event_type text not null,
  venue text,
  guest_count text,
  selected_services text[] not null default '{}',
  setup_required text not null,
  setup_requests text,
  custom_inquiry text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint enquiries_status_check
    check (status in ('new', 'contacted', 'quoted', 'closed')),
  constraint enquiries_customer_name_not_blank
    check (btrim(customer_name) <> ''),
  constraint enquiries_email_not_blank
    check (btrim(email) <> '')
);

comment on table public.enquiries is
  'Enquiry submissions from the public contact form.';
comment on column public.enquiries.status is
  'Admin-only lifecycle status: new | contacted | quoted | closed. Database-controlled (default + trigger).';
comment on column public.enquiries.selected_services is
  'Human-readable labels of the services the visitor is interested in (text[]).';
comment on column public.enquiries.setup_required is
  'Whether the visitor needs setup and styling of hired items (Yes | No | Not sure yet).';
comment on column public.enquiries.setup_requests is
  'Reserved for dedicated setup/styling requests (not yet populated by the form).';
comment on column public.enquiries.custom_inquiry is
  'Free-text "Anything else we should know?" from the contact form.';

-- -----------------------------------------------------------------------------
-- 2. Indexes
-- -----------------------------------------------------------------------------
create index if not exists enquiries_status_idx on public.enquiries (status);
create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_event_date_idx on public.enquiries (event_date);

-- -----------------------------------------------------------------------------
-- 3. updated_at maintenance
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

drop trigger if exists enquiries_set_updated_at on public.enquiries;

create trigger enquiries_set_updated_at
  before update on public.enquiries
  for each row
  execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 4. Status guard — status is always forced to 'new' on insert
-- -----------------------------------------------------------------------------
create or replace function public.enquiries_force_new_status()
returns trigger
language plpgsql
as $$
begin
  new.status := 'new';
  return new;
end;
$$;

drop trigger if exists enquiries_force_new_status on public.enquiries;

create trigger enquiries_force_new_status
  before insert on public.enquiries
  for each row
  execute function public.enquiries_force_new_status();

-- -----------------------------------------------------------------------------
-- 5. Enable RLS
-- -----------------------------------------------------------------------------
alter table public.enquiries enable row level security;

-- -----------------------------------------------------------------------------
-- 6. Remove conflicting/duplicate policies (any source: GUI, earlier runs)
-- -----------------------------------------------------------------------------
do $$
declare
  policy_name text;
begin
  for policy_name in
    select p.policyname
    from pg_policies p
    where p.schemaname = 'public' and p.tablename = 'enquiries'
  loop
    execute format('drop policy if exists %I on public.enquiries', policy_name);
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- 7. Public INSERT policy — anon only, WITH CHECK (status = 'new')
-- -----------------------------------------------------------------------------
-- The WITH CHECK keeps the "visitors can never choose a status" property at
-- the policy level too: the client does not send status, the column DEFAULT
-- ('new') and the BEFORE INSERT trigger guarantee status = 'new' at check
-- time, and any other value is rejected. Required-field integrity is enforced
-- by the table's NOT NULL constraints, not duplicated here.
create policy "Public can submit enquiries"
  on public.enquiries
  for insert
  to anon
  with check (status = 'new');

-- -----------------------------------------------------------------------------
-- 8. Authenticated admin policies — SELECT + UPDATE only
-- -----------------------------------------------------------------------------
-- No user-registration flow exists on the site; the `authenticated` role
-- only ever holds admin sessions. If public accounts are introduced later,
-- tighten these (e.g. via a user_roles table).
create policy "Admins can view enquiries"
  on public.enquiries
  for select
  to authenticated
  using (true);

create policy "Admins can update enquiries"
  on public.enquiries
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins can delete enquiries"
  on public.enquiries
  for delete
  to authenticated
  using (true);

-- -----------------------------------------------------------------------------
-- 9. Grants — anon gets INSERT only; anon SELECT/UPDATE/DELETE are revoked
--    (defense in depth: even if RLS were ever disabled, anon cannot read)
-- -----------------------------------------------------------------------------
grant insert on public.enquiries to anon;
revoke select, update, delete on public.enquiries from anon;

-- -----------------------------------------------------------------------------
-- 10. Self-healing repairs for pre-existing tables (idempotent)
-- -----------------------------------------------------------------------------
-- Applied last so a failure here (e.g. existing NULL rows) can never leave
-- the RLS/policy/privilege state partially applied.
alter table public.enquiries alter column customer_name set not null;
alter table public.enquiries alter column email set not null;
alter table public.enquiries alter column event_type set not null;
alter table public.enquiries alter column setup_required set not null;
alter table public.enquiries alter column status set default 'new';
alter table public.enquiries alter column created_at set default now();
alter table public.enquiries alter column updated_at set default now();