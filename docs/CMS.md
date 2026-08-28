# CMS

## Purpose
To define exactly what the client can edit, how the admin dashboard is organized to support it, and what the editing workflow looks like — the CMS being the primary reason the client can operate the site without ongoing developer involvement.

## Overview
The CMS is a set of authenticated screens inside the admin dashboard (`/admin/*`), each mapped to a content table documented in `DATABASE.md`. There is no generic "page builder" — each editable area has a purpose-built form matched to its content shape, which keeps the editing experience simple and hard to break.

## Current Status
Scoped and schema-aligned; screen-by-screen implementation follows Milestone 4 in `ROADMAP.md`.

## Responsibilities

### Editable Content
- Homepage content (hero heading, subheading, featured copy)
- About page copy
- Services (add/edit/reorder/publish, with image upload)
- Gallery (add/edit/reorder/publish images and captions)
- FAQs (add/edit/reorder/publish question-answer pairs)
- Contact information (email, phone, social links)
- Basic SEO settings (per-page title/description, plus a site-wide default)
- Enquiries (view, search, status)
- Personal notes for enquiries (private, admin-only annotations per enquiry)

### Admin Features
- Authenticated dashboard (`AdminLayout`: sidebar + top bar + content area, matching the pattern used on prior admin panels).
- Sidebar navigation grouped by content area (Content, Enquiries, Settings).
- Publish/unpublish toggle on gallery items, services, and FAQs, so drafts can be prepared without going live.
- Drag-or-arrow-based reordering (`sort_order`) for services, gallery items, and FAQs.
- Basic dashboard landing view summarizing recent enquiries and content status.

## Implementation Notes

**Content Workflow**
1. Admin logs in via Supabase Auth.
2. Admin navigates to the relevant content screen (e.g., Gallery).
3. Admin adds/edits an item; image uploads go to Supabase Storage, returning a public URL saved on the row.
4. Admin toggles `is_published` when ready to go live (default `true`, so unpublishing is an explicit action).
5. Public site reflects the change on next fetch — no build or deploy step required, since content is data-driven, not baked into the static build.

**SEO Workflow**
- Each content-bearing page/service has optional `seo_title` / `seo_description` fields.
- If left blank, the page falls back to `site_settings.default_seo`, so the client is never required to fill these in for the site to remain valid — see `SEO.md`.

**Media Management**
- Images are uploaded directly from the relevant CMS form (e.g., adding a gallery item) into a Supabase Storage bucket (`public-media` or similar), with the returned public URL stored on the corresponding row.
- No separate "media library" screen in this phase — media is managed in the context of the content it belongs to, keeping the CMS scope aligned with `PROJECT_SCOPE.md`. A standalone media library is a candidate future upgrade if the gallery grows large enough to need cross-referencing.

## Checklist
- [ ] Admin layout and navigation implemented
- [ ] Services CMS screen (CRUD + reorder + publish)
- [ ] Gallery CMS screen (CRUD + reorder + publish + image upload)
- [ ] FAQs CMS screen (CRUD + reorder + publish)
- [ ] Home/About content editing screens
- [ ] Site settings screen (contact info, social links, default SEO)
- [ ] Enquiries list, search, and notes screens

## Future Improvements
A dedicated media library, bulk image upload, and image optimization/resizing on upload are natural next steps if the client's content volume grows — currently deferred to keep the CMS lean and match the agreed scope.

## Related Documents
`DATABASE.md`, `SEO.md`, `COMPONENT_GUIDE.md`, `CONTENT_GUIDE.md`
