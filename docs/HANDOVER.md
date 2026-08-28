# Handover

## Purpose
To ensure a clean, complete handover to the client at project close — no loose ends, no missing credentials, no client left unable to operate their own site.

## Overview
Per the signed Website Development Agreement, upon full payment the client owns the website, source code, CMS, project assets, and all project-specific accounts. This document is the checklist that ensures that ownership transfer is actually complete in practice, not just on paper.

## Current Status
Not yet initiated — scheduled for Milestone 6 (`ROADMAP.md`), after final payment and QA sign-off.

## Responsibilities

**Client Handover Checklist**
- [ ] Final payment received and confirmed (see `PAYMENTS.md`)
- [ ] Full QA pass completed and signed off (see `TESTING.md`)
- [ ] Production deployment live on client's custom domain with SSL verified
- [ ] Source code repository transferred to client-owned GitHub organization/account (or access granted, per client preference)
- [ ] Supabase project ownership transferred to a client-controlled account, or client added as owner/admin
- [ ] Hosting provider account transferred or access granted to client
- [ ] Domain registrar access confirmed as client-owned (developer never holds domain ownership)
- [ ] Developer's temporary/admin access revoked from all services, per the agreement's ownership terms, unless the client separately requests ongoing support access

**Credentials**
All credentials handed over via a secure method (password manager shared vault, not plaintext email):
- [ ] Supabase project credentials (or ownership transfer confirmation)
- [ ] Hosting provider login (or ownership transfer confirmation)
- [ ] Domain registrar login (confirmation client already owns this)
- [ ] Admin dashboard login for the site itself (client's own admin account, created fresh — not the developer's)

**CMS Training**
- [ ] Live or recorded walkthrough of the admin dashboard covering: editing each content type, publishing/unpublishing, reordering, managing enquiries and notes, and updating basic SEO fields
- [ ] Written quick-reference guide left with the client (can be a trimmed version of `CMS.md`)
- [ ] Client given the opportunity to make a real edit during the training session, not just watch

**Deployment**
- [ ] Client understands that content updates via the CMS do not require a redeploy (see `DEPLOYMENT.md`), but code changes do
- [ ] Client knows who to contact (and how) for future code changes or the Phase 2 upgrades listed in `FUTURE_UPGRADES.md`

**Support**
- [ ] Post-handover support window and terms clarified (per the agreement: reasonable assistance during handover; future maintenance quoted separately)
- [ ] Any known issues or deferred polish items disclosed transparently before sign-off, not discovered later

## Implementation Notes
Handover should never be treated as a single event on the last day — credential transfer and access review should be planned at least a week ahead so nothing is rushed or forgotten under deadline pressure.

## Checklist
See the itemized checklists above — this document's body is the handover checklist in full.

## Future Improvements
If the client engages the developer for Phase 2 work, this document should be revisited to define what access (if any) is restored for that engagement, rather than assuming prior handover terms still apply.

## Related Documents
`PAYMENTS.md`, `SECURITY.md`, `DEPLOYMENT.md`, `CMS.md`
