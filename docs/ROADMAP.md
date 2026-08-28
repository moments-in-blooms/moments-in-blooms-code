# Roadmap

## Purpose
To sequence the work so that dependencies are respected (e.g., design tokens before components, schema before CMS UI) and so progress can be tracked milestone by milestone.

## Overview
The roadmap covers the current 4–6 week engagement as defined in the Website Development Agreement, broken into five milestones. Dates are estimates and shift with client revisions, additional requested features, or delayed content/assets, per the agreement's timeline terms.

## Current Status
Milestone 1 (Foundations) in progress; Hero, About, and Projects/Gallery-pattern sections and the shared animation architecture under `src/animations/` have been established.

## Responsibilities
| Milestone | Scope | Priority | Depends On |
|---|---|---|---|
| M1 — Foundations | Project scaffold, design tokens, shared `Header`/`Button`/`SectionTitle` components, animation architecture | Critical | Brand assets from client |
| M2 — Public Site | Home, About, Services, Gallery, FAQs, Contact pages fully built and responsive | Critical | M1 |
| M3 — Supabase Backend | Schema design, RLS policies, storage buckets, auth setup | Critical | None (can run parallel to M2) |
| M4 — CMS & Admin Dashboard | Admin layout, content editing screens for all CMS-managed areas, basic SEO fields | Critical | M3 |
| M5 — Enquiries | Contact form wired to Supabase, email notifications, admin enquiries list/search/notes | High | M2, M3 |
| M6 — QA, SEO Pass & Handover | Cross-browser/device QA, metadata pass, client training, credential handover | Critical | M1–M5 |

## Implementation Notes
M3 (Supabase Backend) is intentionally parallelizable with M2 (Public Site) since they don't share direct dependencies until the Contact form (M5) and CMS (M4) need the schema in place. This is where time can be recovered if content delivery from the client is delayed.

## Checklist
- [x] M1: Design tokens and shared components scaffolded
- [x] M1: Hero, About, Projects/Gallery animation patterns established
- [ ] M2: Remaining public pages (Services, FAQs, Contact) completed
- [ ] M3: Supabase schema finalized and migrated
- [ ] M4: Admin dashboard CMS screens built
- [ ] M5: Enquiries module wired end-to-end
- [ ] M6: QA pass, SEO pass, and client handover completed

## Future Improvements
Once Phase 2 (booking/payments/CRM) is greenlit, add a second roadmap table for that phase rather than appending to this one, to keep the current engagement's milestones legible.

## Related Documents
`TIMELINE.md`, `PROJECT_SCOPE.md`, `TODO.md`
