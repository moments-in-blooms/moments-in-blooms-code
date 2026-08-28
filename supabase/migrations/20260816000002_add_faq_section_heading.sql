-- =============================================================================
-- Moments in Blooms — FAQ section heading (faq_page)
-- -----------------------------------------------------------------------------
-- Adds the "Browse by topic" section heading (the intro above the category
-- filter on the public /faqs page) to the single-row faq_page table, so the
-- admin FAQ module can manage it like the hero and CTA copy.
--
-- Columns added (flat snake_case, matching the hero_* / cta_* convention):
--
--   section_eyebrow     → the small label ("Browse by topic")
--   section_title       → the heading ("Find the answer you need.")
--   section_description → the supporting sentence
--
-- Defaults mirror the seed copy in src/constants/faqs.js, so existing rows are
-- backfilled and fresh inserts get sensible copy without the app.
--
-- SAFE TO RE-RUN: every statement is idempotent (add column if not exists).
-- =============================================================================

alter table public.faq_page
  add column if not exists section_eyebrow text not null default 'Browse by topic',
  add column if not exists section_title text not null default 'Find the answer you need.',
  add column if not exists section_description text not null default 'Choose a category to see the questions couples and hosts ask most often before they book.';