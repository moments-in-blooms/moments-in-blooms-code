# API

## Purpose
To document how the frontend talks to the backend — there is no custom REST/GraphQL API in this project, so this document defines the Supabase client usage patterns that serve the same role.

## Overview
All data access goes through the Supabase JS client, wrapped in per-table service modules under `src/services/`. There is no separately hosted API server; Supabase's auto-generated PostgREST layer, combined with RLS, is the API.
## Current Status

Service-module pattern established on prior projects (e.g., `patients.js`, `branches.js`, `appointments.js` conventions); being applied here per the `DATABASE.md` schema as each CMS screen is built. Phase 1 (enquiries + FAQ CMS) is live: `src/services/enquiries.js` is the data-access layer for the public contact form and the admin Enquiries module; `src/services/faqs.js` is the single source of truth for the public `/faqs` page and the admin FAQ module (categories, accordion items, hero + CTA copy via the `faq_categories`, `faqs` and `faq_page` tables — see SUPABASE_SETUP.md).

## Responsibilities

**Future APIs**
No custom backend API is planned for the current scope. If Phase 2 introduces payments, a Supabase Edge Function (or small serverless function) will be needed to handle webhook verification (e.g., from a payment provider) — this is the only anticipated departure from "Supabase client only."

**Supabase Client**
- Two clients initialized in `src/services/supabaseClient.js` from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`:
  - `supabase` — session-aware; used for admin auth and admin data access.
  - `publicSupabase` — session-less (`persistSession: false`); used only for public operations (the contact form insert) so a logged-in admin's JWT is never attached to public requests.
- Never instantiated more than once each; imported wherever a service module needs them.

**Data Fetching**
- Public reads use `.select()` with `is_published.eq.true` filters baked into the relevant service function, so components never need to know about the publish flag directly.
- Admin reads omit the publish filter and include all rows, ordered by `sort_order` or `created_at` as appropriate.
- Example pattern (services list, public):
```js
// src/services/services.js
export async function getPublishedServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}
```

**Mutations**
- All writes are wrapped in service functions (`createService`, `updateService`, `deleteService`, etc.) rather than called inline from components, so validation and error shaping happen in one place.
- Enquiry submission is the one public-facing mutation. `createEnquiry` maps the form payload to snake_case columns (including `message` → `custom_inquiry`) and submits through the Supabase client. Duplicate submissions are prevented at the application layer (disable-on-submit plus a submitting guard), and RLS limits anon access to INSERT of the form columns only.

**Error Handling**
- Every enquiries service function returns `{ data, error, demo }` — it never throws. `error.message` is a human-friendly message (database details are logged with `console.error` in `shapeError`, never shown to the customer).
- `demo: true` indicates Supabase is not configured and the data lives in browser localStorage (`mib_demo_public_enquiries`).

**Caching**
- No dedicated caching library (e.g., React Query) is in the current stack; given the content volume and update frequency of a marketing site, component-level `useEffect`/`useState` fetching is sufficient. This is flagged in Future Improvements below as the first thing to reconsider if the admin dashboard grows.

## Implementation Notes
Every service function must throw or return a typed error shape consistently (`{ data, error }` or throwing), never silently swallow Supabase errors — this was a recurring debugging issue on prior projects (403/406 errors going unnoticed) and is called out explicitly here to avoid repeating it.
## Checklist

- [x] `supabaseClient.js` initialized with env-based config
- [x] Service module created per table (`enquiries.js` + `faqs.js` — Phase 1; `services.js`, `gallery.js`, `siteSettings.js` still pending)
- [x] Consistent error handling pattern applied across service modules (`{ data, error, demo }`, never throws)

## Future Improvements
Introduce React Query (or SWR) if/when the admin dashboard's data needs (caching, revalidation, optimistic updates) outgrow plain `useEffect` fetching — not needed for current scope.

## Related Documents
`ARCHITECTURE.md`, `DATABASE.md`, `SECURITY.md`
