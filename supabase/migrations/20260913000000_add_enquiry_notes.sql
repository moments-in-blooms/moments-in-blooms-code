-- =============================================================================
-- Moments in Blooms — staff notes on enquiries
-- -----------------------------------------------------------------------------
-- Adds `public.enquiries.notes` (nullable text) so admins can keep internal
-- follow-up notes on an enquiry without touching the customer's own message
-- (`custom_inquiry`).
--
-- Security model: unchanged from 20260816000000_create_enquiries.
--
--   anon (public visitors):
--     SELECT → denied (no policy; privileges revoked)
--     INSERT → allowed, but the client payload never includes notes (see
--              toExternal in src/services/enquiries.js), so visitors can
--              never set them. Column is nullable with no default, so the
--              WITH CHECK (status = 'new') insert policy is unaffected.
--
--   authenticated (admin panel session):
--     SELECT / UPDATE → covered by the existing "Admins can view enquiries"
--                       and "Admins can update enquiries" policies. No new
--                       policy needed; column-level grants are intentionally
--                       absent so RLS keeps evaluating.
--
-- SAFE TO RE-RUN: `add column if not exists`.
--
-- Run in the Supabase SQL Editor: Dashboard → SQL Editor → New query.
-- Or via Supabase CLI: `supabase db push`
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Column — internal staff follow-up notes, admin-only
-- -----------------------------------------------------------------------------
alter table public.enquiries
  add column if not exists notes text;

comment on column public.enquiries.notes is
  'Internal staff follow-up notes. Never shown to customers; admin-only via authenticated RLS.';
