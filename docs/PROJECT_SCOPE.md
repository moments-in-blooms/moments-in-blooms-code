# Project Scope

## Purpose
To draw a clear, unambiguous line between what this engagement delivers and what it does not, so that scope creep is visible and can be handled through the change request process rather than silently absorbed.

## Overview
This document mirrors the scope defined in the signed Website Development Agreement. It is the canonical reference when a request comes in and the team needs to determine whether it's in-scope, out-of-scope, or a future upgrade.

## Current Status
Locked for the current engagement. Any addition requires a Change Request (see `CHANGE_REQUESTS.md`).

## Responsibilities

### Included

**Public Website**
- Home
- About
- Services
- Gallery
- FAQs
- Contact

**Content Management System** — client-editable:
- Homepage content
- About page
- Services
- Gallery
- FAQs
- Contact information
- Basic SEO settings
- Enquiries
- Personal notes for enquiries

**Enquiries**
- Contact form
- Email notification on new enquiry
- View enquiries
- Search enquiries
- Personal notes per enquiry

### Not Included (This Agreement)
**Booking, Payments & CRM**
- Booking and calendar management
- Online booking
- Payments and deposits
- Quotes and contracts
- Invoice system
- Customer accounts
- Staff scheduling
- CRM integration

**Advanced Security**
- Two-factor authentication (2FA)
- Login history
- Audit logs
- Automatic backups

### Future Upgrades
Everything listed under "Not Included" is a candidate for a future, separately-scoped and separately-quoted phase. See `FUTURE_UPGRADES.md` for the fuller backlog and rationale.

## Implementation Notes
When a client request arrives that touches a "Not Included" item, it should be logged in `CHANGE_REQUESTS.md` rather than implemented ad hoc, even if it seems small — features like "just a simple booking calendar" typically imply calendar state, conflict handling, and notifications that are non-trivial in aggregate.

## Checklist
- [x] Scope confirmed against signed agreement
- [x] Out-of-scope items explicitly listed and shared with client
- [ ] Client sign-off on this document as the scope reference (recommended before development milestones proceed)

## Future Improvements
As Phase 2 is scoped, this document should be versioned (e.g., duplicated as `PROJECT_SCOPE_PHASE2.md`) rather than overwritten, so historical scope agreements remain auditable.

## Related Documents
`PROJECT_CONTEXT.md`, `FUTURE_UPGRADES.md`, `CHANGE_REQUESTS.md`, `PAYMENTS.md`
