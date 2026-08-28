# Deployment

## Purpose
To document the deployment process and environments clearly enough that a release can be performed (or debugged) by anyone on the project, not just the original developer.

## Overview
The frontend is a static Vite build deployable to any static host; Supabase is a separate, already-hosted managed backend requiring no deployment of its own beyond schema migrations and configuration.

## Current Status
Development environment active; production hosting target to be finalized with the client ahead of Milestone 6 (`ROADMAP.md`).

## Responsibilities

**Development**
- Local development via `npm run dev` (Vite dev server), pointed at either a shared development Supabase project or the production project's read-safe content, depending on what's agreed for this phase.

**Production**
- `npm run build` produces the static `dist/` output, deployed to the chosen static hosting provider (e.g., Vercel or Netlify — matching the pattern used across the developer's other client projects).
- Deployment is triggered on merge to the main branch, either via the hosting provider's git integration or the `.github/workflows/deploy.yml` CI workflow.

**Environment Variables**
Required at build/runtime:
| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase public anon key (safe for client exposure; protected by RLS) |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key (Account → API Keys) — needed for enquiry email notifications |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID (Email Services) |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID (Email Templates) |

These are configured in the hosting provider's environment variable settings for production, and in a local `.env` (git-ignored) for development — see `ENVIRONMENT_SETUP.md`.

**Vercel** *(or equivalent static host)*
- Framework preset: Vite.
- Build command: `npm run build`.
- Output directory: `dist`.
- Environment variables set per the table above, for both Preview and Production environments.

**Supabase**
- No deployment step required; schema changes are applied via SQL migrations run against the Supabase project (see `supabase/` folder in the repository) rather than made ad hoc through the dashboard, so schema history stays in version control.

**Domain**
- Custom domain (client-owned) pointed at the hosting provider via DNS (CNAME/A record per the host's instructions); to be finalized with the client closer to launch.

**SSL**
- Provisioned automatically by the hosting provider for the custom domain; no manual certificate management required.

**Monitoring**
- Baseline: hosting provider's built-in deployment and error logs.
- No dedicated uptime/error-tracking service (e.g., Sentry) included in current scope; flagged as a low-cost future improvement given the project's budget constraints.

## Implementation Notes
Because the CMS is data-driven (content lives in Supabase, not the static build), publishing a content change never requires a redeploy — only code changes do. This should be communicated clearly to the client so they don't assume every content update needs "the developer to push an update."

## Checklist
- [ ] Hosting provider selected and project created
- [ ] Environment variables configured in hosting provider (Preview + Production)
- [ ] Custom domain connected and SSL verified
- [ ] `deploy.yml` CI workflow validated against a real deploy
- [ ] Supabase migrations applied to production project

## Future Improvements
Add basic uptime monitoring and error tracking (e.g., a free-tier Sentry project) once the site is live and traffic is real, rather than pre-provisioning for a marketing site with no users yet.

## Related Documents
`ENVIRONMENT_SETUP.md`, `SECURITY.md`, `HANDOVER.md`
