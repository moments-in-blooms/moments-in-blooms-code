# Future Upgrades

## Purpose
To capture every feature discussed but deliberately excluded from the current engagement, so nothing is forgotten and every future conversation starts from a shared backlog rather than from scratch.

## Overview
These items are explicitly listed as "Not Included" in the signed Website Development Agreement and `PROJECT_SCOPE.md`. They represent a natural Phase 2+ for Moments in Blooms as the business's needs grow beyond a marketing site with a CMS.

## Current Status
Backlog only — none of these are scoped, quoted, or scheduled. Any of them moving forward requires a fresh scoping conversation and a separate quotation, per the current agreement's terms.

## Responsibilities

**Booking**
- Client-facing service/date selection so prospective clients can request specific styling dates directly.

**Calendar**
- Internal calendar/availability management for the business, likely underpinning Booking above.

**Payments**
- Online payment collection (likely deposits rather than full payment upfront, matching event-industry norms) via a provider such as Stripe.
- Would require new database tables (`payments`, `invoices`) and careful RLS/security design given the sensitivity of payment data — see `SECURITY.md` for why this was excluded from the current, lower-budget phase.

**Invoices**
- Automated invoice generation tied to bookings/payments, replacing manual invoicing.

**CRM**
- A lightweight CRM layer extending the current Enquiries module — converting enquiries into ongoing customer relationships, tracking event history per client, and follow-up reminders.

**Inventory**
- Tracking of styling inventory (florals sourced per-event aside; think reusable decor items, furniture, backdrops) — relevant if the business's operations scale to a point where manual inventory tracking becomes a bottleneck.

**Staff**
- Staff accounts and permission tiers (currently, a single admin role is sufficient), plus staff scheduling for event-day logistics.

**Analytics**
- Deeper analytics beyond basic hosting/traffic stats — e.g., enquiry-to-booking conversion tracking, campaign attribution if paid marketing is introduced.

**Marketing**
- Email marketing integration (newsletter capture, automated follow-up sequences for enquiries), and potentially blog/content marketing to support the SEO strategy in `SEO.md` beyond the current six static pages.

**Advanced Security** *(also listed in `PROJECT_SCOPE.md` as excluded from current scope)*
- Two-factor authentication (2FA)
- Login history
- Audit logs
- Automatic backups

## Implementation Notes
When any of these moves toward being scoped, start by revisiting `DATABASE.md` and `ARCHITECTURE.md` together — several of these (Booking, Payments, CRM) share underlying data model needs and should be designed as a coherent Phase 2 schema rather than bolted on individually.

## Checklist
This is a backlog, not a checklist — items move out of this document and into `PROJECT_SCOPE.md`/`ROADMAP.md` once formally scoped and quoted.

## Future Improvements
Revisit this list with the client roughly 60–90 days post-launch, once real usage data (enquiry volume, common client questions) can inform which of these upgrades actually deliver the most value first.

## Related Documents
`PROJECT_SCOPE.md`, `DATABASE.md`, `SECURITY.md`, `PAYMENTS.md`
