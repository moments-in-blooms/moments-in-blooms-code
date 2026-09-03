# Supabase Setup — Phase 1 (Enquiries + FAQ CMS)

This guide walks through configuring Supabase for the Moments in Blooms
enquiry system and CMS-driven FAQ content. It assumes you have never opened
the Supabase dashboard.

Everything below is manual, browser-based setup — no Supabase CLI required.

---

## 1. Open your Supabase project

1. Go to https://supabase.com and sign in.
2. In the dashboard, open the project:
   `moments-in-bloom` (Project ID: `nkiklcuhxuwjnwmuaqaf`).
3. You land on the **Home** tab. The sidebar on the left has **Table Editor**,
   **SQL Editor**, **Authentication**, **Storage**, etc.

---

## 2. Find the Project URL and anon key

1. In the sidebar, open **Project Settings** (gear icon) → **API**.
2. Copy the **Project URL**:
   `https://nkiklcuhxuwjnwmuaqaf.supabase.co`
3. Copy the **anon public** key (NOT the `service_role` key — the
   `service_role` key bypasses RLS and must never be used in the website).
4. Create a `.env` file in the project root (copy `.env.example`):

   ```
   VITE_SUPABASE_URL=https://nkiklcuhxuwjnwmuaqaf.supabase.co
   VITE_SUPABASE_ANON_KEY=<paste the anon public key here>
   ```

5. Restart the dev server (`npm run dev`) after adding the `.env` file.

---

## 3. Run the migrations

The migration files live at:

```
supabase/migrations/20260816000000_create_enquiries.sql
supabase/migrations/20260816000001_create_faqs.sql
```

1. Open the **SQL Editor** in the Supabase dashboard (sidebar → SQL Editor).
2. Click **New query**.
3. Paste the entire contents of the first migration file.
4. Click **Run**.
5. Repeat for the second migration file.

The enquiries script creates the `enquiries` table, its indexes, the
`updated_at` trigger, the status guard trigger, enables RLS, and creates
the policies.

The FAQ script creates `faq_categories`, `faqs` and the single-row
`faq_page` table (hero + CTA copy), enables RLS, creates the policies and
seeds the initial categories, questions and page copy (seed only runs when
the tables are empty, so it never overwrites client edits).

Both scripts are **safe to re-run** — every statement is idempotent, and
re-running them repairs any broken RLS/privilege state (including the
42501 insert error below) instead of failing partway.

---

## 4. Verify the enquiries table

1. Sidebar → **Table Editor** → select the `enquiries` table.
2. You should see the columns:
   `id, customer_name, email, phone, event_date, event_type, venue,
   guest_count, selected_services, setup_required, setup_requests,
   custom_inquiry, status, created_at, updated_at`
3. Check the default values in the **Columns** view:
   - `status` defaults to `new`
   - `created_at` / `updated_at` default to `now()`
   - `id` defaults to `gen_random_uuid()`

---

## 5. Verify RLS

1. Sidebar → **Table Editor** → `enquiries` → **RLS policies** tab.
2. You should see:
   - Row Level Security: **enabled**
   - `Public can submit enquiries` — INSERT to `anon`
   - `Admins can view enquiries` — SELECT to `authenticated`
   - `Admins can update enquiries` — UPDATE to `authenticated`
   - `Admins can delete enquiries` — DELETE to `authenticated`
3. There must be NO policy that lets `anon` select, update or delete.

4. Repeat for `faq_categories`, `faqs` and `faq_page` — each must show:
   - Row Level Security: **enabled**
   - Public read policies (anon SELECT):
     - `Public can view published FAQ categories` — SELECT to `anon`
     - `Public can view published FAQs` — SELECT to `anon`
     - `Public can view FAQ page content` — SELECT to `anon`
   - Admin policies (authenticated SELECT/INSERT/UPDATE/DELETE per table).
5. There must be NO policy that lets `anon` insert, update or delete FAQ
   content (anon write privileges are also revoked at the grant level).

---

## 6. Verify the FAQ public flow

1. Run the site locally: `npm run dev` → open `http://localhost:3000/faqs`.
2. The page should show the seeded hero, category filter (General first),
   the accordion groups and the CTA.
3. Sign in at `/admin/login` (real admin account from step 7).
4. **FAQs → FAQ items** — edit a question or answer and save.
5. Reload the public `/faqs` page — the change appears immediately (no
   rebuild/deploy needed; the page reads the database on every load).
6. Unpublish a FAQ and reload — it disappears from the public page.
7. Reorder FAQs within a category (up/down arrows) and reload — the public
   order follows the CMS order.
8. **FAQ categories** — create a category, publish it, assign FAQs, reload
   — the filter updates automatically. Deleting a category that still has
   FAQs asks you to move them to another category first (nothing is
   orphaned).
9. **FAQ page content** — change the hero/CTA copy and reload `/faqs` to
   confirm.

You can also test the raw SQL path (anon-role test of the public read):

```sql
-- True anon-role test of the public path (runs exactly as the page's client):
set role anon;
select id, name, slug from public.faq_categories; -- expected: the categories
select question from public.faqs;                 -- expected: the questions
-- anon must NOT see archived/unpublished rows after an admin archives one.
reset role;
```

---

## 7. Test an enquiry

1. Run the site locally: `npm run dev` → open `http://localhost:3000/contact`.
2. Complete the four steps and submit the form.
3. Back in Supabase → **Table Editor** → `enquiries`, refresh the table.
4. A new row should appear with `status = new` and the form's data.

You can also test the raw SQL path:

```sql
-- should succeed (simulates the public form):
insert into public.enquiries
  (customer_name, email, event_type, setup_required, selected_services)
values
  ('Test', 'test@example.com', 'Wedding', 'Yes', array['Event Decor Hire']);

-- should FAIL (RLS blocks public reads):
select * from public.enquiries;
```

Run both snippets in the SQL Editor while signed in to the dashboard —
the `select` still succeeds for YOU because the dashboard uses the
service role; RLS blocks the anon key used by the website. To truly
verify the public path, use the website form (step 6) or this anon-role
test in the SQL Editor:

```sql
-- True anon-role test of the public path (runs exactly as the form's client):
set role anon;
insert into public.enquiries
  (customer_name, email, phone, event_date, event_type, venue,
   guest_count, selected_services, setup_required, custom_inquiry)
values
  ('Darcy Tabafunda', 'tabafundadarcymoratal@gmail.com', '09127697988',
   '2026-08-16', 'Wedding', 'San Antonio, Quezon', 'Under 30',
   array['Luxe Photobooth', 'Blissful Nest'], 'Yes', 'Test');
-- expected: INSERT 0 1 (no status column sent — the database assigns 'new')

-- expected to FAIL as anon (public must never read enquiries):
select * from public.enquiries;
reset role;
```

---

## 8. Create the admin account

The admin panel signs in with **real Supabase auth** when Supabase is
configured (demo credentials are only used when `.env` is missing).

1. Sidebar → **Authentication** → **Users** → **Add user**.
2. Email: `owner@momentsinblooms.com` (or any inbox you control).
3. Password: choose a strong one.
4. **Auto Confirm: ON** — otherwise the user must click an email
   confirmation link before the first sign-in.
5. Sign in at `/admin/login` with that email and password.

## 9. Verify in the admin dashboard

1. Open `http://localhost:3000/admin/login` and sign in with the admin
   account from step 7.
2. Open **Enquiries** in the sidebar.
3. The enquiry from step 6 should appear at the top, status `New`.
4. Change the status to **Contacted** (table or detail modal).
5. Confirm the badge updates. The `updated_at` timestamp also updates.

## 10. Allowlist auth redirect URLs (password reset)

The forgot-password flow (`/admin/forgot-password` → email link →
`/admin/reset-password`) sends the user back to whatever deployment they
requested it from (`window.location.origin` in `src/services/auth.js`).
Supabase only honours redirect targets listed here, so without this step
the reset link fails and the password is never updated.

1. Sidebar → **Authentication** → **URL Configuration** → **Redirect URLs**.
2. Add each deployment the admin signs in from, with the reset path:
   - Production, e.g. `https://momentsinblooms-au.vercel.app/admin/reset-password`
   - Any preview deployment you test from, e.g.
     `https://<deployment>.vercel.app/admin/reset-password`
   - Local dev: `http://localhost:3000/admin/reset-password`
3. **Save**, then test end to end: sign out → **Forgot password?** → submit
   your admin email → open the email link → set a new password → sign in
   with it at `/admin/login`.

Troubleshooting: link lands on the wrong site — you are on a deployment
older than the dynamic-`origin` fix; redeploy. Link errors about redirect —
the exact URL (including `/admin/reset-password`) is missing from the list
above. No email arrives at all — check spam, confirm the user exists under
**Authentication → Users**, and note Supabase's default SMTP is
rate-limited (fine for occasional admin resets).

---

## Environment variables (summary)

| Variable | Required | Where to find it |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Yes | Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Project Settings → API → anon public key |

The `service_role` key must never be added to `.env` — it bypasses RLS.

---

## Email notification (EmailJS)

After an enquiry is saved, the site sends the studio a summary via
EmailJS from the browser (`src/services/email.js`,
`sendEnquiryEmail`). The email is best-effort: a failed send never
blocks the form's success state.

Setup:

1. Create (or sign in to) an account at https://emailjs.com.
2. **Email Services → Add new service → Gmail** and connect the studio
   Gmail account (OAuth — no password stored by EmailJS).
3. **Email Templates → Create new template**:
   - **To Email: fixed to the studio inbox** (visitors must never
     control the recipient — the form does not send it).
   - Subject, e.g. `New enquiry — {{fullName}}`.
   - Body uses the template placeholders sent by the code:
     `fullName, email, phone, eventType, eventDate, venue, guestCount,
     services, setupRequired, message`.
4. Add the credentials to `.env` (copy `.env.example`):
   ```
   VITE_EMAILJS_PUBLIC_KEY=<Account → API Keys → Public Key>
   VITE_EMAILJS_SERVICE_ID=<Email Services → Service ID>
   VITE_EMAILJS_TEMPLATE_ID=<Email Templates → Template ID>
   ```
5. Restart `npm run dev` and submit a test enquiry — the studio inbox
   should receive the summary within seconds.

Troubleshooting: no email but form says success — the env vars are
missing/typo'd (missing ones just skip the email), or the send failed
(console warning `[email] sendEnquiryEmail failed` shows the EmailJS
error — e.g. wrong Service/Template ID, or the Gmail service needs
re-authentication in EmailJS). Template fields rendering empty means a
placeholder name differs from the list in step 3.

---

## Troubleshooting

- **Form stored nothing and no error:** `.env` is missing or the server
  wasn't restarted. The form falls back to demo mode and stores in
  browser localStorage instead.
- **`42703` column does not exist:** the migration has not been run.
  Run the SQL from step 3.
- **`42501` / RLS errors:** the migration was partially applied; re-run
  the whole file.
- **Public `/faqs` page empty or FAQs missing:** the FAQ migration has not
  been run (or anon RLS policies are missing). Re-run
  `20260816000001_create_faqs.sql` — it is idempotent and re-seeds only
  when the tables are empty.
- **`42501` new row violates row-level security (inserts):** two known
  causes:
  1. **Requesting the inserted row back with `.select()`.** anon has no
     SELECT policy on `enquiries` (by design), so PostgREST's
     `return=representation` triggers the *same* 42501 error even though
     the insert itself is allowed. The site deliberately performs a plain
     insert (no `.select()`) to avoid this. If custom code ever inserts
     with `.select()`, expect this error — or add a SELECT policy (not
     recommended).
  2. **The anon INSERT grant is missing.** Check with
     `select relacl::text from pg_class where relname = 'enquiries';`
     — anon's entry must contain `a`. Repair:
  ```sql
  grant insert on public.enquiries to anon;
  ```
When in doubt, re-run the whole migration file — it is idempotent and
   self-healing (drops every existing policy on the table, rebuilds the
   insert policy `Public can submit enquiries` with `with check
   (status = 'new')`, re-creates the triggers, and retro-applies NOT
   NULL/defaults to an existing table). Column-level INSERT grants are
   never used: they make RLS unable to evaluate the policy and reproduce
   this error.
- **`42501` permission denied (admin Enquiries page empty / status update
  fails):** you are signed in with the demo account while Supabase is
  configured — demo sessions carry no Supabase JWT, so admin queries run
  as the anonymous role and the `authenticated` policies never apply.
  Sign in with the real admin account created in step 7 (or remove
  `.env` to use demo mode end-to-end).