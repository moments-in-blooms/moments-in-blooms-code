# Business Rules

## Purpose
To document the non-obvious logic and constraints that come from how Moments in Blooms actually operates, so implementation matches real business behavior rather than generic assumptions.

## Overview
This is a small system, but a handful of business rules meaningfully shape implementation — particularly around enquiries, publishing, and content ordering.

## Current Status
Rules confirmed with client during scoping; to be revisited as the CMS and Enquiries module are implemented.

## Responsibilities

**Content Publishing**
- New content items (services, gallery items, FAQs) default to published (`is_published = true`) on creation — the client's workflow is "add and it's live," with unpublishing as the deliberate exception, not the default.
- Unpublished items remain fully editable in the admin dashboard; unpublishing is not the same as deleting.

**Content Ordering**
- Services, gallery items, and FAQs are manually orderable (`sort_order`) rather than sorted by creation date — the client curates presentation order deliberately (e.g., leading with signature services or standout gallery pieces), matching how a styling portfolio is normally presented.

**Enquiries**
- Every contact form submission creates an `enquiries` row with status `new`; the client manually progresses status to `contacted` or `closed` as they work the lead — there is no automated status transition.
- Enquiry notes are private to the admin dashboard and never exposed to the public or included in the email notification — they're the client's internal working notes (e.g., "called, no answer, try again Thursday").
- Email notification fires once per new enquiry; there is no notification on status or note changes, keeping notification volume aligned with actual new-lead activity.

**SEO Defaults**
- If a content item's `seo_title`/`seo_description` is left blank, the site-wide default (`site_settings.default_seo`) is used — the client should never be blocked from publishing due to an empty SEO field.

**Contact Information**
- Contact details (email, phone, social links) are single-source in `site_settings` and referenced everywhere they appear (header, footer, Contact page) rather than duplicated, so an update in one place propagates everywhere.

## Implementation Notes
These rules should be enforced in the `src/services/` layer (defaults, ordering logic) rather than left to be "remembered" per component — see `API.md` for the service-module pattern.

## Checklist
- [x] Business rules confirmed with client
- [ ] Default-publish behavior implemented and tested
- [ ] Manual `sort_order` implemented for all three orderable content types
- [ ] Enquiry status workflow implemented

## Future Improvements
If Phase 2 introduces bookings, additional business rules around availability, conflicts, and cancellation policy will need to be documented here before implementation — not inferred from the code.

## Related Documents
`DATABASE.md`, `CMS.md`, `PROJECT_CONTEXT.md`
