# Testing

## Purpose
To define a testing approach proportionate to the project's current scope and budget, while being explicit about what's deferred so it isn't mistaken for an oversight.

## Overview
Given the fixed-fee, six-page-plus-CMS scope of this engagement, testing is currently manual and checklist-driven rather than automated. This is a deliberate, cost-appropriate choice, revisited if the codebase grows in Phase 2.

## Current Status
Manual QA checklist defined; to be run in full at Milestone 6 (`ROADMAP.md`) and after any significant change thereafter.

## Responsibilities

**Testing Strategy**
- Manual, structured QA across browsers/devices before each milestone sign-off and before final handover.
- Critical paths (contact form submission, CMS content edits, publish/unpublish behavior) are tested against real Supabase data, not mocked.

**Manual Testing**
- Cross-browser: latest Chrome, Safari, Firefox, and Edge.
- Cross-device: iOS Safari and Android Chrome on representative phone sizes, plus tablet and desktop breakpoints (576px / 1024px thresholds per `DESIGN_SYSTEM.md`).
- Forms: contact form validation (required fields, email format), submission success/error states, and confirmation of the resulting email notification and admin-side enquiry record.
- CMS: create/edit/delete/reorder/publish flows tested for each content type (services, gallery, FAQs).
- Auth: login, logout, and session-expiry behavior on the admin dashboard.

**Future Unit Testing**
Not implemented in current scope. If introduced in Phase 2, the recommended starting point is Vitest (Vite-native) plus React Testing Library, prioritized for: `src/services/` (data-access logic), form validation utilities, and any business-rule functions in `src/utils/`.

**QA Checklist**
- [ ] All six public pages render correctly at mobile, tablet, and desktop breakpoints
- [ ] Contact form: valid submission succeeds, invalid submission shows clear errors
- [ ] Enquiry received in admin dashboard and via email notification
- [ ] Admin search and notes function correctly on enquiries
- [ ] CMS create/edit/delete/reorder/publish verified for Services, Gallery, and FAQs
- [ ] SEO metadata renders correctly per page (verified via browser dev tools / social share debuggers)
- [ ] No console errors on any public or admin route
- [ ] Broken-link check across navigation and footer
- [ ] Lighthouse pass (performance, accessibility, SEO, best practices)

**Regression Testing**
- Before each milestone sign-off, previously completed features are spot-checked, not just the new work — particularly after shared component or theme-token changes, since those ripple across every section.
- Any bug fix is paired with a manual re-test of the specific broken flow, and noted in `CHANGELOG.md`.

## Implementation Notes
Prior projects surfaced recurring issues with swallowed error messages (e.g., 403/406 Supabase errors not surfaced clearly) — QA passes should explicitly include checking the browser console and network tab during CMS and form testing, not just visual verification.

## Checklist
- [x] QA checklist drafted
- [ ] First full QA pass completed against a staging build
- [ ] Full QA pass completed pre-handover

## Future Improvements
Introduce automated unit tests (Vitest) for `src/services/` once Phase 2 work begins, given the increased complexity that booking/payments logic would introduce.

## Related Documents
`ROADMAP.md`, `DEPLOYMENT.md`, `CHANGELOG.md`
