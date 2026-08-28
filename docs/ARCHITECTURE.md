# Architecture

## Purpose
To describe how the system is put together — frontend, backend, and the boundaries between them — so a new developer can reason about where a given change belongs.

## Overview
Moments in Blooms is a single-page application (React + Vite) with two route trees — public and admin — sharing one codebase, one design token set, and one Supabase project. There is no separate backend service; Supabase provides database, auth, storage, and (where needed) edge functions.

## Current Status
Public-facing architecture (routing, shared components, animation layer) is established. Supabase schema and admin dashboard architecture follow the same conventions used on prior client projects (e.g., strict 4-file component pattern, Zustand for local UI state).

## Responsibilities

**Frontend**
- Built with React 19-style functional components and hooks, bundled by Vite.
- Styled Components for all styling, with a shared `theme.js` for design tokens.
- React Router DOM handles both the public route tree (`/`, `/about`, `/services`, `/gallery`, `/faqs`, `/contact`) and the admin route tree (`/admin/*`), each under its own layout.
- Framer Motion powers entrance/scroll animation via a shared animation module (`src/animations/`) so variants are defined once and reused, not redefined per component.
- React Helmet Async manages per-page `<head>` metadata for SEO.

**Backend (Supabase)**
- **Database:** PostgreSQL, schema documented in `DATABASE.md`.
- **Authentication:** Supabase Auth (email/password) gates `/admin/*`; the public site makes no authenticated calls.
- **Storage:** Supabase Storage buckets hold gallery images and other media uploaded via the CMS.
- **Row Level Security (RLS):** Enforced at the database layer so that even if the client-side code were compromised, unauthenticated clients cannot write to content or read admin-only data (e.g., enquiry notes).

**CMS**
- Not a third-party product — it's a set of authenticated admin screens that read/write directly to Supabase tables (see `CMS.md`), keeping the stack simple and cost-free beyond Supabase's own pricing.

**Email**
- Enquiry notifications are sent from the browser via EmailJS (`src/services/email.js`) as a best-effort step after the enquiry row is saved — a failed send never fails the form.

**SEO**
- Per-page metadata is stored alongside each content type (e.g., a `seo_title`/`seo_description` pair on pages/services) and rendered via React Helmet Async at request time.

**Deployment**
- Static Vite build deployed to a static hosting provider (see `DEPLOYMENT.md`); Supabase remains a separately hosted, managed service.

## Implementation Notes

**Data Flow (typical read):**
`Public page component → service module (src/services/*) → Supabase client → Postgres (RLS: public read on published content) → response mapped to view model → rendered`

**Data Flow (typical write, e.g., enquiry submission):**
`Contact form → validation → service module → Supabase insert (RLS: public insert-only on enquiries table) → EmailJS notification (best-effort) → admin dashboard reflects new row on next fetch`

**Folder Structure:** see `README.md` for the full tree; the key architectural boundary is `src/components/public/` vs `src/components/admin/`, which must never share business logic directly — shared concerns (formatting, validation) live in `src/utils/`, shared visual primitives in `src/components/ui/`.

**Best Practices**
- No component reaches into Supabase directly — all access goes through `src/services/`, matching the pattern used in prior projects (`patients.js`, `branches.js`, etc. on other client work), so RLS assumptions and query shapes live in one place per table.
- Admin-only logic must never be bundled reachable from the public route tree beyond what's needed for route-splitting; code-split `/admin/*` so public visitors don't download admin JS.
- Environment variables (Supabase URL/anon key) are the only secrets ever present client-side; anything requiring elevated privilege happens in an Edge Function, never in the browser bundle.

## Checklist
- [x] Public/admin route separation established
- [x] Shared animation architecture established
- [ ] `src/services/` layer implemented for all Supabase-backed tables
- [x] EmailJS notification on new enquiry implemented (`src/services/email.js`)
- [ ] Code-splitting confirmed for `/admin/*` bundle

## Future Improvements
If Phase 2 introduces booking/payments, consider whether Supabase Edge Functions remain sufficient or whether a dedicated backend service becomes warranted for payment webhook handling.

## Related Documents
`DATABASE.md`, `CMS.md`, `API.md`, `SECURITY.md`, `COMPONENT_GUIDE.md`
