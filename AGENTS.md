# AGENTS.md

React 19 + Vite site for Moments in Blooms (Melbourne event styling). JavaScript (ESM, `"type": "module"`), no TypeScript. All styling via styled-components; copy and image metadata live in `src/constants/`.

## Commands

```bash
npm install
npm run dev      # Vite dev server on port 3000 (NOT the 5173 default; vite.config.js + package.json)
npm run lint     # eslint .
npm run build    # output to dist/
```

- No test framework, no test script, no typecheck. Manual QA only — never run `npm test`.
- `.env` is required for real enquiries: copy `.env.example` with `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`. Without it the site still works; the contact form falls back to demo mode (see below).

## Architecture facts that are not obvious

- **Component pattern:** every component is a folder with `Name.jsx`, `Name.styles.js`, and `index.js` (barrel). Follow this for any new component/section — do not add loose `Page.jsx` files at repo root.
- **Styling:** styled-components only, referencing tokens from `src/styles/theme.js` (colors, type, spacing, `breakpoints`, `EASE_LUXE`). No inline `style={{}}` except truly dynamic per-instance values. No CSS modules / Tailwind / etc.
- **Copy & content:** site text, CTAs, SKU data, SEO metadata, and image URLs live in `src/constants/*.js` (e.g. `homepage.js`, `about.js`, `services.js`, `contact.js`). `src/pages/public/Gallery/` is self-contained with its own `constants/`, `hooks/`, `utils/`. Never hardcode copy into JSX; edit the constants instead. Images are remote (Unsplash) URLs built via a local `imageUrl()` helper.
- **Reveal animations:** entry content is wrapped in `SafeReveal` / `TitleReveal`/ `ImageReveal` from `src/components/Reveal/`, which handle reduced-motion and use `EASE_LUXE`. Reuse these rather than raw `framer-motion` `motion.div`s where possible.
- **Routing:** all routes in `src/routes/AppRoutes.jsx` (React Router v7, lazy-loaded, Suspense fallback `LoadingScreen`). `/admin` redirects to `/admin/dashboard`. Public routes live under `PublicLayout`; admin under `AdminLayout`. `/admin/login` is a standalone route outside `RequireAuth`.
- **Admin panel:** every admin page lives in `src/pages/admin/<Page>/`. Most edit one content page via `useContent('<pageKey>')` from `src/hooks/useContent.js` (homepage/about/services/gallery/seo/settings). Two exceptions: `FAQsCMS` is a dedicated module backed by the `faqs` service (see below) and `Enquiries` is backed by the `enquiries` service. Pages: `Dashboard`, `Login`, `HomepageCMS`, `AboutCMS`, `ServicesCMS`, `GalleryCMS`, `FAQsCMS`, `Enquiries`, `SEO`, `Settings`. Reusable admin UI (DataTable, EditorCard, Repeater, ImagePicker, ToggleSwitch, Modal, ConfirmDialog, SaveBar, StatusBadge, EmptyState, Toast) lives in `src/components/admin/` — reuse these rather than hand-rolling. Sidebar nav is grouped via `adminNavigationGroups` in `src/constants/navigation.js` (Overview / Content / Business / System) — add new admin routes there, not in a flat list.
- **Admin auth:** `src/services/auth.js` uses real Supabase auth when configured (`supabase.auth.signInWithPassword` / `signOut` / `getSession`, session kept in sync via `subscribeToAuthChanges` in `AuthProvider`). Without `.env` it falls back to demo credentials (`ADMIN_DEMO_CREDENTIALS` in `src/constants/admin.js`: owner@momentsinblooms.com / bloom-admin, localStorage `mib_admin_session`, 8h TTL). The UI does not hardcode demo specifics (the Login page picks its hint via `isSupabaseConfigured()`). A real session is what makes admin `enquiries` queries pass the `authenticated` RLS policies — demo sessions run as anon and see zero rows.
- **Admin content persistence is demo-only for most modules:** CMS pages read/write through `src/services/content.js` + `ContentProvider`. Seeds come from the public `src/constants/*.js`; edits persist to localStorage under `mib_admin_content_v1` (no Supabase yet — don't assume CMS data flows). Public pages currently read constants, not saved content, so CMS edits are not visible on the public site yet — **except the FAQ module**, which is fully DB-driven (see below).
- **FAQ module is the first fully CMS-driven module:** `src/services/faqs.js` is the single source of truth for every FAQ-related piece of content on the public `/faqs` page. With Supabase configured, the admin module (`src/pages/admin/FAQsCMS/`) reads/writes `faq_categories`, `faqs` and the single-row `faq_page` (hero + CTA) through the main `supabase` client, and the public page reads published rows through the session-less `publicSupabase` client — no deploy needed, changes appear on next fetch. Without `.env` both sides fall back to a demo store in localStorage (`mib_admin_faqs_v1`) seeded from `src/constants/faqs.js`, so the full admin → public flow still works locally. FAQ archiving is a soft delete (`deleted_at` + `is_published = false`); deleting a category with FAQs requires reassigning them first (never orphaned). Public reads return only published, non-archived rows ordered by `display_order`; categories with zero published FAQs are omitted. The public page shows skeletons while loading and falls back to the seed copy for hero/CTA if the fetch fails (with a retry in the accordion area). `getActiveFaqs`/`getActiveCategories` in `src/constants/faqs.js` are now only used as seed source (and by `src/constants/services.js`) — the public page no longer imports them.

## Enquiries (the only other live backend integration)

`src/services/enquiries.js` submits the contact form:

- Maps camelCase form values to snake_case `enquiries` columns and inserts WITHOUT `.select()` — anon has no SELECT policy, so requesting the row back (`return=representation`) fails with 42501; the form only checks `result.error`. The insert goes through the session-less `publicSupabase` client (never sends a browser's admin JWT); admin reads/updates use the main `supabase` client.
- If `.env` is unset, `supabase`/`publicSupabase` are `null` (`src/services/supabaseClient.js`) and submissions are stored in browser localStorage under `mib_demo_public_enquiries`. Don't add features that assume Supabase is always present — guard with `isSupabaseConfigured()`.
- `listEnquiries()`, `getEnquiry(id)`, `updateEnquiryStatus(id, status)` and `deleteEnquiry(id)` read/update/delete enquiries from the `enquiries` table (demo mode reads `mib_demo_public_enquiries`); statuses are `new|contacted|quoted|closed` (`ENQUIRY_STATUSES` in `src/constants/admin.js`). Deletion requires the `authenticated` DELETE policy from the migration.
- After a successful save, `createEnquiry` best-effort-sends a studio notification via `sendEnquiryEmail` (`src/services/email.js`, EmailJS, `VITE_EMAILJS_*` vars). It never fails the form — a failed email only logs a warning. No `.env` EmailJS vars → email silently skipped.
- Keep the DB column list in `DOCUMENTED_COLUMNS` in sync when the `enquiries` schema changes (full schema in `docs/DATABASE.md`, but the code is the source of truth).

## Git / workflow conventions (from `docs/CONTRIBUTING.md`)

- Conventional Commits: `feat(scoped-area): short description`, plus `fix|docs|style|refactor|chore`.
- Branch names `feature/<desc>` / `fix/<desc>`; PR into `main` required; `main` always deployable.
- No `console.log` left in committed code — prefer real error handling; `console.warn/error` already appears in `src/services/`.

## Docs caveats

The `docs/` folder is aspirational and partly stale. Trust the code and configs over docs when they disagree. Known mismatches:

- Docs say dev port 5173 and reference `.github/workflows/` CI — neither exists (no `.github/`, port is 3000). A `supabase/` folder DOES exist (migrations only — no Edge Functions). Keep migration SQL and docs in sync.
- README's file tree and milestone descriptions lag behind `src/` (e.g. lists `src/animations/` which doesn't exist; About/Services/Gallery/Contact pages are implemented, not placeholders).