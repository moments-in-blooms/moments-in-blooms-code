# Security

## Purpose
To define the security model for the system given its actual risk profile — a marketing site with a small admin surface — and to be explicit about what is intentionally deferred versus what is a hard requirement now.

## Overview
The primary attack surface is the admin dashboard (content and enquiry data) and the public contact form (spam/abuse vector). The public marketing pages themselves hold no sensitive data. Security is enforced primarily at the database layer via Supabase RLS, not trusted to the frontend alone.

## Current Status
Baseline security model defined; RLS policy implementation tracked alongside `DATABASE.md` and `CMS.md` build-out.

## Responsibilities

**Authentication**
- Supabase Auth (email/password) for the single admin account (or small number of admin accounts, if the client has staff).
- No public user accounts exist in the current scope — "authentication" refers exclusively to admin access.

**Authorization**
- A single authenticated role is sufficient for current scope (one client, no staff-level permission tiers requested). If multiple admin users are added later, role distinction (owner vs. staff) would be layered on via a thin `admin_profiles` table without changing the core RLS model.

**Supabase RLS**
- Enabled on every table, no exceptions.
- Content tables: public `SELECT` limited to `is_published = true` rows; all writes require an authenticated session.
- `enquiries`: public `INSERT` only (the contact form); all reads/updates/deletes require authentication.
- `faq_categories`, `faqs`, `faq_page` (CMS-driven FAQ content): public `SELECT` of published, non-archived rows only; admin full CRUD (soft delete via `deleted_at` — nothing is hard-deleted from the UI).
- `enquiry_notes`: fully authenticated-only, both read and write.

**Environment Variables**
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are the only credentials present in the client bundle — both are meant to be public-safe by design (the anon key relies on RLS, not secrecy, for protection).
- Any privileged key (e.g., a Supabase service role key, if ever needed for an Edge Function) is never exposed to the frontend and lives only in server-side/Edge Function environment configuration.
- `.env` is git-ignored; `.env.example` documents required variables with placeholder values only.

**Password Policies**
- Minimum length and standard complexity enforced via Supabase Auth's built-in settings; no custom password logic implemented client-side.

**XSS**
- React's default JSX escaping is relied on for all rendered content; any place CMS content is rendered as HTML (if ever needed, e.g., rich text) must be explicitly sanitized before use — plain text fields (current CMS scope) carry no such risk.

**CSRF**
- Not a significant vector for this architecture — Supabase Auth uses token-based sessions (not cookie-session CSRF-prone patterns) for API requests from the SPA.

**Rate Limiting**
- Contact form submission is debounced/disabled-on-submit client-side to prevent accidental duplicate submissions; server-side rate limiting on the `enquiries` insert path is a candidate future improvement if spam becomes an issue (see below).

**Security Headers**
- Standard hosting-provider defaults (HTTPS enforced, HSTS) apply; no custom header configuration required beyond what the hosting platform provides for a static SPA deployment.

**Best Practices**
- No secrets committed to the repository, ever — enforced by `.gitignore` covering `.env` and reviewed in PRs.
- All Supabase queries go through `src/services/` modules so RLS assumptions are documented and tested in one place, not scattered across components.
- Error messages shown to admin users never leak raw database errors; raw errors are logged to the console for debugging but presented to the user in plain language (a recurring issue on prior projects — swallowed/obscured error messages — is explicitly avoided here in the other direction: errors are surfaced, just not verbatim).

## Implementation Notes
Given the current scope explicitly excludes 2FA, login history, audit logs, and automatic backups (see `PROJECT_SCOPE.md`), the practical mitigation is a strong password on the single admin account and Supabase's own platform-level backup/retention defaults — this is a conscious, documented trade-off, not an oversight.

## Checklist
- [ ] RLS policies implemented and tested for every table
- [ ] `.env.example` complete and `.env` confirmed git-ignored
- [ ] Admin password strength requirement confirmed with client
- [ ] Contact form abuse/spam monitored post-launch

## Future Security Features
- Two-factor authentication (2FA) for admin login
- Login history / session visibility
- Audit logs for content and enquiry changes
- Automatic, scheduled backups beyond Supabase's platform defaults
- Server-side rate limiting / CAPTCHA on the contact form if spam volume warrants it

## Related Documents
`DATABASE.md`, `ARCHITECTURE.md`, `DEPLOYMENT.md`, `PROJECT_SCOPE.md`
