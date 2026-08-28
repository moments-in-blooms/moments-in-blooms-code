-- =============================================================================
-- Moments in Blooms — FAQ content tables (categories, faqs, page content)
-- -----------------------------------------------------------------------------
-- CMS-driven FAQ architecture:
--
--   Admin FAQ module → faqs service → Supabase → Public /faqs page
--
-- Tables:
--
--   faq_categories  → the category filter/nav on the public page
--   faqs            → each accordion question/answer, assigned to a category
--   faq_page        → single-row (id = 1) hero + CTA copy for the FAQ page
--
-- Security model:
--
--   anon (public visitors):
--     SELECT  → allowed, but ONLY published + non-archived rows
--               (policy-level filter: is_published = true, deleted_at is null)
--     INSERT / UPDATE / DELETE → denied (no policy; privileges revoked)
--
--   authenticated (admin panel session):
--     SELECT / INSERT / UPDATE / DELETE → allowed (4 policies per table)
--
-- Soft delete: rows are archived via `deleted_at` (+ is_published = false by
-- the app). Nothing is hard-deleted from the admin UI.
--
-- SAFE TO RE-RUN: every statement is idempotent. All pre-existing policies on
-- these tables are dropped first (no competing/duplicate policies remain).
-- Seeding only runs when the tables are empty, so client edits are never
-- overwritten by a re-run.
--
-- Run in the Supabase SQL Editor: Dashboard → SQL Editor → New query.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Tables
-- -----------------------------------------------------------------------------
create table if not exists public.faq_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint faq_categories_name_not_blank check (btrim(name) <> ''),
  constraint faq_categories_slug_not_blank check (btrim(slug) <> '')
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category_id uuid not null
    references public.faq_categories (id)
    on update cascade
    on delete restrict,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint faqs_question_not_blank check (btrim(question) <> ''),
  constraint faqs_answer_not_blank check (btrim(answer) <> '')
);

create table if not exists public.faq_page (
  id integer primary key default 1 check (id = 1),
  hero_eyebrow text not null,
  hero_title text not null,
  hero_description text not null,
  cta_eyebrow text not null,
  cta_title text not null,
  cta_description text not null,
  cta_primary_label text not null,
  cta_primary_url text not null,
  cta_secondary_label text not null,
  cta_secondary_url text not null,
  updated_at timestamptz not null default now()
);

comment on table public.faq_categories is
  'FAQ category filter shown on the public /faqs page. Soft-deleted via deleted_at.';
comment on table public.faqs is
  'FAQ accordion entries shown on the public /faqs page. Soft-deleted via deleted_at.';
comment on table public.faq_page is
  'Single-row (id = 1) hero + call-to-action copy for the public /faqs page.';

-- -----------------------------------------------------------------------------
-- 2. Indexes
-- -----------------------------------------------------------------------------
create index if not exists faq_categories_published_idx
  on public.faq_categories (is_published) where deleted_at is null;
create index if not exists faq_categories_order_idx
  on public.faq_categories (display_order);
create index if not exists faqs_category_idx on public.faqs (category_id);
create index if not exists faqs_published_idx
  on public.faqs (is_published) where deleted_at is null;
create index if not exists faqs_order_idx
  on public.faqs (category_id, display_order);

-- -----------------------------------------------------------------------------
-- 3. updated_at maintenance (function is shared with the enquiries migration)
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

drop trigger if exists faq_categories_set_updated_at on public.faq_categories;
create trigger faq_categories_set_updated_at
  before update on public.faq_categories
  for each row
  execute function public.set_updated_at();

drop trigger if exists faqs_set_updated_at on public.faqs;
create trigger faqs_set_updated_at
  before update on public.faqs
  for each row
  execute function public.set_updated_at();

drop trigger if exists faq_page_set_updated_at on public.faq_page;
create trigger faq_page_set_updated_at
  before update on public.faq_page
  for each row
  execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 4. Enable RLS
-- -----------------------------------------------------------------------------
alter table public.faq_categories enable row level security;
alter table public.faqs enable row level security;
alter table public.faq_page enable row level security;

-- -----------------------------------------------------------------------------
-- 5. Remove conflicting/duplicate policies (any source: GUI, earlier runs)
-- -----------------------------------------------------------------------------
do $$
declare
  table_name text;
  policy_name text;
begin
  for table_name in select unnest(array['faq_categories', 'faqs', 'faq_page'])
  loop
    for policy_name in
      select p.policyname
      from pg_policies p
      where p.schemaname = 'public' and p.tablename = table_name
    loop
      execute format('drop policy if exists %I on public.%I', policy_name, table_name);
    end loop;
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- 6. Public read policies — anon can only see published, non-archived rows
-- -----------------------------------------------------------------------------
create policy "Public can view published FAQ categories"
  on public.faq_categories
  for select
  to anon
  using (is_published = true and deleted_at is null);

create policy "Public can view published FAQs"
  on public.faqs
  for select
  to anon
  using (is_published = true and deleted_at is null);

create policy "Public can view FAQ page content"
  on public.faq_page
  for select
  to anon
  using (true);

-- -----------------------------------------------------------------------------
-- 7. Authenticated admin policies — full CRUD on every FAQ table
-- -----------------------------------------------------------------------------
create policy "Admins can view FAQ categories"
  on public.faq_categories for select to authenticated using (true);
create policy "Admins can create FAQ categories"
  on public.faq_categories for insert to authenticated with check (true);
create policy "Admins can update FAQ categories"
  on public.faq_categories for update to authenticated using (true) with check (true);
create policy "Admins can delete FAQ categories"
  on public.faq_categories for delete to authenticated using (true);

create policy "Admins can view FAQs"
  on public.faqs for select to authenticated using (true);
create policy "Admins can create FAQs"
  on public.faqs for insert to authenticated with check (true);
create policy "Admins can update FAQs"
  on public.faqs for update to authenticated using (true) with check (true);
create policy "Admins can delete FAQs"
  on public.faqs for delete to authenticated using (true);

create policy "Admins can view FAQ page content"
  on public.faq_page for select to authenticated using (true);
create policy "Admins can create FAQ page content"
  on public.faq_page for insert to authenticated with check (true);
create policy "Admins can update FAQ page content"
  on public.faq_page for update to authenticated using (true) with check (true);
create policy "Admins can delete FAQ page content"
  on public.faq_page for delete to authenticated using (true);

-- -----------------------------------------------------------------------------
-- 8. Grants — anon gets SELECT only; authenticated gets full CRUD
--    (defense in depth: even if RLS were ever disabled, anon cannot write)
-- -----------------------------------------------------------------------------
grant select on public.faq_categories, public.faqs, public.faq_page to anon;
revoke insert, update, delete on public.faq_categories, public.faqs, public.faq_page from anon;

grant select, insert, update, delete
  on public.faq_categories, public.faqs, public.faq_page
  to authenticated;

-- -----------------------------------------------------------------------------
-- 9. Seed data — only rows whose ids do not already exist, so re-runs never
--    overwrite client edits (and never resurrect archived rows). Copy mirrors
--    the pre-CMS constants (src/constants/faqs.js).
-- -----------------------------------------------------------------------------
insert into public.faq_categories (id, name, slug, description, display_order, is_published)
values
  ('00000000-0000-0000-0000-000000000001', 'General', 'general', null, 1, true),
  ('00000000-0000-0000-0000-000000000002', 'Services', 'services', null, 2, true),
  ('00000000-0000-0000-0000-000000000003', 'Decor Hire', 'decor-hire', null, 3, true),
  ('00000000-0000-0000-0000-000000000004', 'Luxe Photobooth', 'photobooth', null, 4, true),
  ('00000000-0000-0000-0000-000000000005', 'Blissful Nest', 'blissful-nest', null, 5, true),
  ('00000000-0000-0000-0000-000000000006', 'Enquiries & Planning', 'enquiries', null, 6, true),
  ('00000000-0000-0000-0000-000000000007', 'Events & Travel', 'events-travel', null, 7, true)
on conflict (id) do nothing;

insert into public.faqs (id, question, answer, category_id, display_order, is_published)
values
  ('00000000-0000-0000-0000-000000001001', 'How far in advance should we book your services?',
   'We recommend booking 6 to 12 months in advance for weekend weddings during peak season (October to April). For photobooths, claw machines, and private events, 2 to 4 months lead time is usually sufficient subject to availability.',
   '00000000-0000-0000-0000-000000000006', 1, true),
  ('00000000-0000-0000-0000-000000001002', 'Can we combine multiple services into a custom package?',
   'Yes! Combining services such as Event Styling + Haute Florals + Luxe Photobooth allows us to create a unified aesthetic across your entire venue, while providing bundled investment savings.',
   '00000000-0000-0000-0000-000000000002', 1, true),
  ('00000000-0000-0000-0000-000000001003', 'Which areas in Victoria do you service?',
   'We service all Greater Melbourne metropolitan suburbs, Yarra Valley, Mornington Peninsula, Daylesford, and the Bellarine Peninsula. Travel fees apply for regional Victorian locations.',
   '00000000-0000-0000-0000-000000000007', 1, true),
  ('00000000-0000-0000-0000-000000001004', 'What happens during bump-in and bump-out on the event day?',
   'Our team coordinates directly with your venue manager to secure bump-in timing. We handle complete setup prior to guest arrival and return after the event to pack down quietly and efficiently.',
   '00000000-0000-0000-0000-000000000007', 2, true),
  ('00000000-0000-0000-0000-000000001005', 'How do we secure our date?',
   'To lock in your date on our studio calendar, we require a 30% retainer deposit alongside a signed styling agreement. The remaining balance is due 14 days prior to your celebration.',
   '00000000-0000-0000-0000-000000000006', 2, true),
  ('00000000-0000-0000-0000-000000001006', 'What does Moments in Blooms specialise in?',
   'We are a Melbourne-based event styling studio. Our signature blend of florals, decor hire and considered styling brings a warm, elevated atmosphere to weddings and private celebrations — often with a playful detail that makes it feel entirely yours.',
   '00000000-0000-0000-0000-000000000001', 1, true),
  ('00000000-0000-0000-0000-000000001007', 'Do you take on events outside Melbourne?',
   'Yes. We travel throughout Victoria — including the Yarra Valley, Mornington Peninsula, Daylesford and the Bellarine Peninsula — and can discuss destination celebrations beyond Victoria on request.',
   '00000000-0000-0000-0000-000000000001', 2, true),
  ('00000000-0000-0000-0000-000000001008', 'What services are available to combine?',
   'Our full suite spans event styling and tablescapes, haute florals, decor hire, the Luxe Photobooth, and Blissful Nest claw machines. Each can be reserved individually or woven into a single cohesive package.',
   '00000000-0000-0000-0000-000000000002', 2, true),
  ('00000000-0000-0000-0000-000000001009', 'Can styling be tailored to our event?',
   'Absolutely. Every celebration begins with your story, palette, venue and guest experience. We can work from a clear brief or help you shape the creative direction from the very beginning.',
   '00000000-0000-0000-0000-000000000002', 3, true),
  ('00000000-0000-0000-0000-000000001010', 'What is included with decor hire?',
   'Decor hire includes delivery, styling and collection of every piece within your booking. Your dedicated stylist prepares the space before guests arrive and returns afterwards to pack down quietly.',
   '00000000-0000-0000-0000-000000000003', 1, true),
  ('00000000-0000-0000-0000-000000001011', 'Do you offer floral design alongside decor?',
   'Yes. Floral design is at the heart of our studio. From sculptural installations to hand-tied table florals, our florals and decor are always designed together for one continuous feeling.',
   '00000000-0000-0000-0000-000000000003', 2, true),
  ('00000000-0000-0000-0000-000000001012', 'Can we view decor in person before booking?',
   'We would love to show you. Studio visits are by appointment, and we are happy to share an edited selection of pieces that suit your palette and venue during a consultation.',
   '00000000-0000-0000-0000-000000000003', 3, true),
  ('00000000-0000-0000-0000-000000001013', 'How does the Luxe Photobooth experience work?',
   'The Luxe Photobooth arrives styled and ready — soft draping, flattering light and a curated set of props. A host manages the experience so your guests simply step in and enjoy it.',
   '00000000-0000-0000-0000-000000000004', 1, true),
  ('00000000-0000-0000-0000-000000001014', 'How long can we use the Luxe Photobooth?',
   'Photobooth hire typically covers your full celebration, from guest arrival through to the final dances. Extended coverage can be arranged on request.',
   '00000000-0000-0000-0000-000000000004', 2, true),
  ('00000000-0000-0000-0000-000000001015', 'Are printed photos and digital copies included?',
   'Yes. Guests receive printed keepsakes in real time, and you receive a complete digital gallery after the event so every moment is yours to keep.',
   '00000000-0000-0000-0000-000000000004', 3, true),
  ('00000000-0000-0000-0000-000000001016', 'What is Blissful Nest?',
   'Blissful Nest is our playful sister offering — beautifully presented claw machines and curated prizes that bring a moment of delight to guests of every age.',
   '00000000-0000-0000-0000-000000000005', 1, true),
  ('00000000-0000-0000-0000-000000001017', 'Are prizes included with Blissful Nest hire?',
   'Yes. A curated selection of prizes is included, and our team restocks the machine throughout the evening so the fun never runs out.',
   '00000000-0000-0000-0000-000000000005', 2, true),
  ('00000000-0000-0000-0000-000000001018', 'Does Blissful Nest require power or extra space?',
   'Each machine needs a standard power point and a compact footprint roughly the size of a dining table. We confirm dimensions with your venue well ahead of the event.',
   '00000000-0000-0000-0000-000000000005', 3, true),
  ('00000000-0000-0000-0000-000000001019', 'What happens after we submit an enquiry?',
   'We review the details, come back with a few thoughtful questions and arrange a conversation if the fit feels right. From there, we shape a tailored styling direction and proposal for your date.',
   '00000000-0000-0000-0000-000000000006', 3, true),
  ('00000000-0000-0000-0000-000000001020', 'Is a deposit required to hold our date?',
   'A 30% retainer plus a signed styling agreement reserves your date. The balance is due 14 days before the celebration, giving you plenty of time to settle the final details.',
   '00000000-0000-0000-0000-000000000006', 4, true),
  ('00000000-0000-0000-0000-000000001021', 'Can you work with our chosen venue?',
   'In most cases, yes. We have styled hundreds of venues across Melbourne and regional Victoria, from historic estates to warehouse spaces, and coordinate closely with each venue manager.',
   '00000000-0000-0000-0000-000000000007', 3, true),
  ('00000000-0000-0000-0000-000000001022', 'Are travel fees included in every quote?',
   'Travel is included within metropolitan Melbourne. For regional locations such as the Yarra Valley, Mornington Peninsula, Daylesford and the Bellarine, a transparent travel fee is itemised in your proposal.',
   '00000000-0000-0000-0000-000000000007', 4, true)
on conflict (id) do nothing;

insert into public.faq_page (id, hero_eyebrow, hero_title, hero_description,
  cta_eyebrow, cta_title, cta_description,
  cta_primary_label, cta_primary_url, cta_secondary_label, cta_secondary_url)
values (
  1,
  'Frequently Asked Questions',
  'Everything you need to know.',
  'Answers about services, styling, planning, travel and the journey from first enquiry to your final celebration.',
  'Still have questions?',
  'Let''s talk about your celebration.',
  'If you cannot find the answer you are looking for, our team is happy to help with anything specific to your date, venue or vision.',
  'Enquire Now', '/contact',
  'Explore Services', '/services'
)
on conflict (id) do nothing;

-- -----------------------------------------------------------------------------
-- 10. Self-healing repairs for pre-existing tables (idempotent)
-- -----------------------------------------------------------------------------
alter table public.faq_categories alter column name set not null;
alter table public.faq_categories alter column slug set not null;
alter table public.faq_categories alter column display_order set default 0;
alter table public.faq_categories alter column is_published set default true;

alter table public.faqs alter column question set not null;
alter table public.faqs alter column answer set not null;
alter table public.faqs alter column category_id set not null;
alter table public.faqs alter column display_order set default 0;
alter table public.faqs alter column is_published set default true;