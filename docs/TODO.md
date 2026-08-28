# TODO

## Purpose
A single master task list, grouped by milestone, so priorities are visible at a glance without digging through issue trackers or chat history.

## Overview
This list mirrors the milestones in `ROADMAP.md` and should be kept in sync with it — `ROADMAP.md` shows the plan, this file tracks execution.

## Current Status
Milestone 1 (Foundations) largely complete; Milestone 2 (Public Site) in progress.

## Responsibilities

### Milestone 1 — Foundations
- [x] Project scaffold (Vite, React, Styled Components, Supabase client)
- [x] Design token theme (`theme.js`)
- [x] Shared animation architecture (`src/animations/`)
- [x] `Header`, `Button`, `SectionTitle` shared components (in progress → confirm completion)
- [ ] `Modal` shared component

### Milestone 2 — Public Site
- [x] Hero section
- [x] About section
- [x] Projects/Gallery-pattern section
- [ ] Services section
- [ ] FAQs section
- [ ] Contact section (form UI, pre-Supabase wiring)

### Milestone 3 — Supabase Backend
- [x] Finalize schema per `DATABASE.md`
- [x] Write and apply migrations (enquiries + FAQ content)
- [x] Implement RLS policies (enquiries + FAQ content)
- [ ] Set up Storage bucket(s) for media

### Milestone 4 — CMS & Admin Dashboard
- [x] `AdminLayout`, `SideBar`, `TopBar`
- [ ] Services CMS screen
- [ ] Gallery CMS screen
- [x] FAQs CMS screen (fully CMS-driven — categories, FAQs, hero/CTA)
- [ ] Home/About content editing screens (demo-only persistence)
- [ ] Site settings screen (contact info, social, default SEO)

### Milestone 5 — Enquiries
- [x] Contact form wired to `enquiries` table
- [x] Email notification on new enquiry (EmailJS)
- [x] Admin enquiries list, search, and status (incl. delete)
- [ ] Enquiry notes

### Milestone 6 — QA, SEO Pass & Handover
- [ ] Full manual QA pass (`TESTING.md` checklist)
- [ ] SEO metadata, sitemap, robots.txt, JSON-LD
- [ ] Lighthouse/Core Web Vitals pass
- [ ] Client CMS training session
- [ ] Credential handover (`HANDOVER.md` checklist)

## Implementation Notes
Tasks should move from this file into `CHANGELOG.md` once shipped, rather than accumulating indefinitely — this file reflects what's left, not a permanent record.

## Checklist
See milestone breakdown above — this file's entire body is the checklist.

## Future Improvements
Once Milestone 6 completes, archive this file's completed content into `CHANGELOG.md` and reset `TODO.md` for Phase 2 planning.

## Related Documents
`ROADMAP.md`, `CHANGELOG.md`, `TIMELINE.md`
