# Database

## Purpose

This document defines the database architecture for the Moments in Blooms website and CMS.

The goal is to create a clean, scalable, and maintainable database structure that supports the current project scope while allowing future expansion without major redesign.

The system is built on **Supabase (PostgreSQL)** and follows best practices for naming conventions, normalization, security, and scalability.

---

# Overview

The database is designed around a modular content management system rather than a traditional e-commerce platform.

The current scope includes:

- Public Website
- Custom CMS
- Services Management
- Gallery Management
- FAQ Management
- Enquiry Management
- Basic SEO
- User Authentication

Advanced business features such as Bookings, Payments, CRM, Quotes, Invoices, and Inventory Management are intentionally excluded from Version 1 and reserved for future upgrades.

---

# Current Status

Database architecture approved.

Supabase migration scripts and Row Level Security (RLS) policies will be implemented during backend development.

---

# Database Design Principles

The database follows these principles:

- Normalize related content
- Avoid duplicated data
- Keep tables focused on a single responsibility
- Support future expansion
- Never over-engineer the initial release
- Prefer relationships over nested JSON whenever practical
- All uploaded media will be stored in Supabase Storage
- Database tables store only file URLs and metadata

---

# Naming Conventions

## Tables

- plural
- snake_case

Examples

services_categories

service_subcategories

service_items

gallery_items

faq_items

---

## Columns

snake_case

Examples

created_at

updated_at

display_order

is_featured

is_published

---

## Primary Keys

All tables use

id (UUID)

---

## Foreign Keys

Use

<parent_table_singular>\_id

Example

category_id

subcategory_id

service_item_id

album_id

enquiry_id

---

# Tables

---

# site_settings

Stores global website settings.

Only one active record should exist.

Columns

- id
- business_name
- business_address
- business_email
- business_phone
- business_hours
- logo_url
- favicon_url
- facebook_url
- instagram_url
- tiktok_url
- google_maps_embed
- footer_text
- default_seo_title
- default_seo_description
- created_at
- updated_at

---

# home_content

Stores editable homepage content.

Examples

- Hero
- About Preview
- Featured Services
- CTA
- Statistics

---

# about_content

Stores About page content.

Examples

- Story
- Mission
- Vision
- Team
- Values

---

# service_categories

Top-level service collections, representing each main offering under the Moments in Blooms master brand. The Blissful Nest entry is modeled as a sub-brand collection with its own nested product categories.

Examples

Decor Hire

Luxe Photobooth

Blissful Nest

Columns

- id
- name
- slug
- brand (parent brand id — e.g. Moments in Blooms or the Blissful Nest sub-brand)
- collection_type (e.g. collection, sub-brand)
- description
- featured_image
- icon
- display_order
- is_featured
- is_published
- seo_title
- seo_description
- created_at
- updated_at

---

# service_subcategories

Each service collection may contain multiple subcategories. For the Blissful Nest sub-brand, subcategories represent its product categories (e.g. Claw Machine Hire), with future Blissful Nest products added as new subcategory rows.

Examples

Florals

Backdrops

Props

Custom Decor

Claw Machine Hire

Columns

- id
- category_id
- name
- slug
- description
- featured_image
- display_order
- is_published
- created_at
- updated_at

Relationship

One Category

↓

Many Subcategories

---

# service_items

Actual services displayed to website visitors.

Examples

Flower Tower

White Arch

Premium Mirror Booth

Columns

- id
- subcategory_id
- title
- slug
- description
- featured_image
- pricing_type
- price
- button_text
- button_url
- display_order
- is_featured
- is_published
- seo_title
- seo_description
- created_at
- updated_at

Relationship

One Subcategory

↓

Many Service Items

---

# service_item_gallery

Stores multiple images for each service item.

Columns

- id
- service_item_id
- image_url
- caption
- display_order
- created_at

Relationship

One Service Item

↓

Many Images

---

# gallery_albums

Gallery organization.

Examples

Weddings

Corporate

Birthdays

Baby Shower

Columns

- id
- title
- slug
- cover_image
- display_order
- is_published
- created_at
- updated_at

---

# gallery_items

Stores gallery images.

Columns

- id
- album_id
- image_url
- caption
- display_order
- is_featured
- is_published
- created_at
- updated_at

Relationship

One Album

↓

Many Images

---

# faq_categories

Stores the FAQ category filter shown on the public /faqs page.

Columns

- id — uuid, primary key, default gen_random_uuid()
- name — text, required
- slug — text, required, unique (used in the category URL)
- description — text, optional
- display_order — integer, default 0
- is_published — boolean, default true
- created_at — timestamptz, default now()
- updated_at — timestamptz, default now() (kept current by trigger)
- deleted_at — timestamptz (soft delete)

Relationship

One Category

↓

Many FAQs

---

# faqs

Stores Frequently Asked Questions (the accordion content on /faqs).

Columns

- id — uuid, primary key, default gen_random_uuid()
- question — text, required
- answer — text, required
- category_id — uuid, required, FK → faq_categories(id), ON UPDATE CASCADE, ON DELETE RESTRICT
- display_order — integer, default 0 (ordering is per category)
- is_published — boolean, default true
- created_at — timestamptz, default now()
- updated_at — timestamptz, default now() (kept current by trigger)
- deleted_at — timestamptz (soft delete)

Relationship

One Category

↓

Many FAQs

---

# faq_page

Single-row (id = 1) section heading + hero + call-to-action copy for the
public /faqs page. This is the CMS source for the FAQ section heading (the
intro above the category filter), the hero section and the CTA section below
the accordion. Columns are flat snake_case (section_eyebrow, hero_eyebrow,
cta_primary_label, ...) and are mapped to `{ section, hero, cta }` objects by
`src/services/faqs.js`.

Columns

- id — integer, primary key, check (id = 1)
- section_eyebrow — text, required (default from seed copy)
- section_title — text, required
- section_description — text, required
- hero_eyebrow — text, required
- hero_title — text, required
- hero_description — text, required
- cta_eyebrow — text, required
- cta_title — text, required
- cta_description — text, required
- cta_primary_label — text, required
- cta_primary_url — text, required (site-relative, e.g. /contact)
- cta_secondary_label — text, required
- cta_secondary_url — text, required
- updated_at — timestamptz, default now() (kept current by trigger)

---

# enquiries

Stores enquiries submitted from the website.

Columns

- id — uuid, primary key, default gen_random_uuid()
- customer_name — text, required
- email — text, required
- phone — text
- event_date — date
- event_type — text, required
- venue — text
- guest_count — text
- selected_services — text[], required (human-readable labels)
- setup_required — text, required (Yes / No / Not sure yet)
- setup_requests — text (reserved for dedicated setup/styling requests)
- custom_inquiry — text (the "Anything else we should know?" field)
- status — text, default 'new'
- created_at — timestamptz, default now()
- updated_at — timestamptz, default now() (kept current by trigger)

Status

- New — default, set automatically on insert; never set by the public form
- Contacted
- Quoted
- Closed

Status is admin-only. A BEFORE INSERT trigger forces status = 'new'
regardless of what the client sends.

---

# enquiry_notes

Internal notes visible only to admins.

Columns

- id
- enquiry_id
- created_by
- note
- created_at

Relationship

One Enquiry

↓

Many Notes

---

# admin_profiles

Stores additional profile information for authenticated users.

Authentication is handled by Supabase Auth.

Columns

- id
- display_name
- avatar_url
- role
- is_active
- created_at
- updated_at

Roles

Owner

Staff

Developer

---

# media_library

Centralized media manager.

All uploaded files should pass through this table.

Columns

- id
- file_name
- file_url
- file_type
- file_size
- folder
- uploaded_by
- created_at

Purpose

Prevent duplicate uploads.

Reuse images across CMS pages.

---

# Relationships

service_categories

↓

service_subcategories

↓

service_items

↓

service_item_gallery

gallery_albums

↓

gallery_items

faq_categories

↓

faqs

enquiries

↓

enquiry_notes

auth.users

↓

admin_profiles

---

# Indexes

Unique

- services.slug
- gallery_albums.slug

Indexes

- enquiries.status
- enquiries.created_at (descending — newest first)
- enquiries.event_date
- faq_categories.display_order
- faq_categories published filter (partial: where deleted_at is null)
- faqs.category_id
- faqs published filter (partial: where deleted_at is null)
- faqs (category_id, display_order)
- service_items.display_order
- gallery_items.display_order
- enquiry_notes.enquiry_id

---

# Media Storage

Images are stored in Supabase Storage.

Database tables only store URLs and metadata.

Binary files should never be stored directly inside PostgreSQL.

---

# Security

Row Level Security (RLS) is enabled on every table.

Public users may only read published content.

Public users may submit enquiries.

Public enquiry submissions are INSERT-only:

- anon can INSERT into enquiries (table-level grant only — never column-level,
  which makes RLS unable to evaluate the policy against columns the role has
  no privilege on; the insert policy's WITH CHECK is `status = 'new'`, and
  required-field integrity is enforced by the table's NOT NULL constraints,
  the status CHECK constraint and the blank-name/email checks)
- anon SELECT/UPDATE/DELETE privileges are explicitly revoked (defense in
  depth — even without RLS, anon could not read the table)
- a BEFORE INSERT trigger forces status = 'new' and the column defaults to
  'new'; the client does NOT send status at all — anon can never set a status
- anon can NEVER select, update or delete enquiries
- because anon has no SELECT policy, the client must never request the
  inserted row back (`.select()` / `Prefer: return=representation`) —
  PostgreSQL raises 42501 on the RETURNING leg even though the insert
  itself is allowed. `createEnquiry` performs a plain insert for this
  reason.

Authenticated administrators may:

- Create
- Edit
- Publish
- Hide
- Archive

FAQ content (faq_categories, faqs, faq_page) — implemented in Phase 1:

- anon can SELECT only; the read policy filters to
  `is_published = true AND deleted_at IS NULL` (plus anon INSERT/UPDATE/DELETE
  privileges are revoked as defense in depth). The public page reads through
  the session-less publicSupabase client so it always runs as anon.
- authenticated admins have full CRUD on all three tables (soft delete via
  `deleted_at`; the FAQ admin UI never hard-deletes).
- archiving a category with FAQs assigned is blocked by the app unless the
  FAQs are first reassigned to another category (never orphaned); the service
  layer (src/services/faqs.js) enforces this.

For enquiries specifically, authenticated admins may SELECT, UPDATE
(including status) and DELETE (permanent record removal — there is no
soft-delete for enquiries; the admin UI always confirms before
deleting). The current policies scope to the `authenticated` role;
tighten them (e.g. via a user-roles table) if public accounts are ever
introduced. See SUPABASE_SETUP.md for the full Phase 1 setup guide.

Only Owner users may manage other users.

---

# Soft Delete Strategy

Content should never be permanently deleted by default.

Use

deleted_at

instead of hard delete.

Benefits

- Recover deleted content
- Prevent accidental deletion
- Maintain historical records

---

# Future Tables

These are intentionally excluded from Version 1.

- bookings
- booking_staff
- booking_calendar
- customers
- quotes
- invoices
- payments
- contracts
- package_builder
- inventory
- discount_codes
- crm_contacts
- notifications
- activity_logs

These tables will be introduced during future project phases.

---

# Checklist

- [x] Database architecture approved
- [x] Create Supabase migrations (enquiries + FAQ content — Phase 1)
- [x] Implement RLS policies (enquiries + FAQ content — Phase 1)
- [ ] Configure Storage Buckets
- [x] Seed initial CMS data (FAQ seed in the faqs migration; rest pending)
- [ ] Test CRUD operations (enquiries + FAQ CRUD tested in Phase 1; rest pending)
- [ ] Validate relationships
- [x] Test role-based permissions (enquiries + FAQ content — Phase 1)

---

# Related Documents

- ARCHITECTURE.md
- CMS.md
- API.md
- SECURITY.md
- SUPABASE_SETUP.md (Phase 1 setup guide: migration, RLS, verification)
- ROADMAP.md
- FUTURE_UPGRADES.md
