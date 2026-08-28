# Project Overview

## Purpose
A single-page, high-level summary of what the system is and how its pieces fit together — the fastest way for a new team member to get oriented before diving into the more detailed documents.

## Overview
The Moments in Blooms system is a React single-page application with two logical zones sharing one Supabase backend:

1. **Public Website** — the marketing site prospective clients see (Home, About, Services, Gallery, FAQs, Contact).
2. **Custom Admin Dashboard** — a authenticated area where the client manages content and enquiries.
3. **CMS** — the content-editing layer inside the admin dashboard, backed by Supabase tables rather than a third-party headless CMS.
4. **Enquiry Management** — contact form submissions land in Supabase, trigger an email notification, and are viewable/searchable/annotatable in the admin dashboard.
5. **Basic SEO Management** — per-page metadata (title, description, social preview) editable from the CMS.
6. **Authentication** — Supabase Auth gates the admin dashboard; the public site remains fully open.
7. **Supabase Backend** — Postgres database, authentication, storage (for images/media), and row-level security policies.

## Current Status
Public site sections are in active build-out; CMS and admin dashboard follow the phased plan in `ROADMAP.md`.

## Responsibilities
- The **public website** has no write access to the database — it only reads published content and writes new enquiry rows.
- The **admin dashboard** is the only place with authenticated write access to content and enquiries.
- **Supabase** owns data persistence, auth, storage, and enforces access rules via Row Level Security (RLS), rather than trusting the client to do so.

## Implementation Notes
The system deliberately avoids a third-party headless CMS (e.g., Sanity, Contentful) to keep monthly costs at zero beyond Supabase's free/low tier, given the project's fixed, modest budget. All "CMS" functionality is bespoke: Supabase tables + a purpose-built admin UI.

## Checklist
- [x] High-level system boundaries defined
- [x] Zones (public vs. admin) agreed and reflected in routing
- [ ] Full data flow diagram added once schema is finalized (see `ARCHITECTURE.md`)

## Future Improvements
As Phase 2 features (booking, payments, CRM) are scoped, this overview should be revised to show those systems as additional zones/integrations rather than folded into the existing ones.

## Related Documents
`ARCHITECTURE.md`, `DATABASE.md`, `CMS.md`, `PROJECT_SCOPE.md`
