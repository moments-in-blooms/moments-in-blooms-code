# Project Context

## Purpose
To capture the business context behind the Moments in Blooms website so that technical decisions can always be traced back to a business reason, not just a feature request.

## Overview
Moments in Blooms is a Melbourne-based luxury event styling business. Their current online presence does not reflect the premium, curated quality of their in-person work, and they lack a way for prospective clients to browse styled work, learn about services, and submit enquiries without relying on Instagram DMs or phone calls. This project replaces that gap with a dedicated, brand-appropriate website and a lightweight backend the client can run independently.

## Current Status
Approved and under active development, following the terms in the executed Website Development Agreement.

## Responsibilities
- **Business:** Moments in Blooms — provider of event styling services (florals, staging, decor) for weddings, corporate events, and private functions in and around Melbourne.
- **Vision:** To be the go-to luxury event styling name in Melbourne, with a web presence that reflects the same level of polish as the events themselves.
- **Target Audience:** Engaged couples and event planners in the mid-to-premium budget range, primarily discovered through Instagram, referrals, and venue partnerships, who are now doing further research/vetting via the website before enquiring.
- **Brand Identity:** Elegant, romantic, refined — soft neutral and floral-adjacent palettes, editorial-style photography, generous whitespace, understated typography rather than loud or trend-driven design.
- **Goals:** Increase qualified enquiries, present a professional portfolio of past work, and give the client full control over updating that portfolio without developer involvement.

## Implementation Notes
- **Project Objectives:**
  1. Ship a public site (Home, About, Services, Gallery, FAQs, Contact) that matches the brand's premium positioning.
  2. Give the client a CMS to manage all of the above without code.
  3. Centralize enquiries in one searchable place with notes, replacing scattered DMs and emails.
  4. Lay basic SEO foundations so the site is discoverable, without over-engineering for a six-page marketing site.
- **Design Philosophy:** Content and imagery lead; UI chrome stays quiet. Motion (Framer Motion) is used to add polish on entrance/scroll, not as a gimmick. Every interactive element should feel intentional and unhurried, consistent with the luxury positioning.
- **Current Scope:** Public website + CMS + Enquiries + basic SEO, as defined in `PROJECT_SCOPE.md`.
- **Future Scope:** Booking/calendar, payments/deposits, quotes/contracts, invoicing, customer accounts, staff scheduling, CRM integration, and advanced security (2FA, audit logs, automated backups) — see `FUTURE_UPGRADES.md`.

## Checklist
- [x] Business context confirmed with client
- [x] Brand direction agreed (palette, tone, photography style)
- [ ] Brand assets (logo files, fonts, photography) received in full
- [ ] Copywriting for all six public pages finalized

## Future Improvements
Revisit this document once Phase 2 (booking/payments) scoping begins, since target audience and business goals may shift with a transactional feature set.

## Related Documents
`CLIENT_PROFILE.md`, `PROJECT_SCOPE.md`, `BUSINESS_RULES.md`, `CONTENT_GUIDE.md`
