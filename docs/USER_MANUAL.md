# Moments in Blooms — User Manual

A plain-language guide for the studio owner and staff. It covers signing in to the
admin area, updating website content, handling enquiries, managing your account,
and a tour of what visitors see on the public website.

> **Important — please read first:** not everything you edit in the admin area
> appears on the live website yet. See
> [What goes live and what stays in this browser](#what-goes-live-and-what-stays-in-this-browser)
> before making changes, so you know what to expect.

## Contents

1. [How to use this manual](#how-to-use-this-manual)
2. [Signing in and out](#signing-in-and-out)
3. [If you forget your password](#if-you-forget-your-password)
4. [Dashboard tour](#dashboard-tour)
5. [Editing website content](#editing-website-content)
6. [Managing FAQs](#managing-faqs)
7. [Handling enquiries](#handling-enquiries)
8. [SEO settings](#seo-settings)
9. [Studio settings](#studio-settings)
10. [Your account](#your-account)
11. [Tour of the public website](#tour-of-the-public-website)
12. [The enquiry journey, end to end](#the-enquiry-journey-end-to-end)
13. [What goes live and what stays in this browser](#what-goes-live-and-what-stays-in-this-browser)
14. [Troubleshooting](#troubleshooting)
15. [Getting help](#getting-help)

## How to use this manual

- Follow the numbered steps in order. Words in **bold** are the exact buttons,
  links and field names you will see on screen.
- Steps describe the admin area (the private pages under `/admin`) unless they
  say "public site".

## Signing in and out

Your admin area lives at `your-website.com/admin/login`. (While the site is
being built, use the staging address you were given, followed by
`/admin/login`.)

1. Open the login page. You will see **Welcome back.**
2. Type your **Email address** and **Password**.
3. Press **Sign in**. While it checks your details the button reads
   **Signing in…**.
4. You land on the **Dashboard**.

Notes:

- Your session lasts about 8 hours. After that you will be asked to sign in again.
- If the email or password is wrong, an error message appears above the button.
  Check for typos and try again.
- **Show** / **Hide** next to the password field lets you peek at what you typed.
- **Back to the website** returns to the public homepage without signing in.
- To sign out, use **Sign out** in the admin area.

## If you forget your password

> Requires the site database to be connected. In demo mode (see the
> **Demo mode** notice on the dashboard) password reset cannot work — there
> is no account to reset. Your developer must also allowlist the reset page
> in Supabase (see `SUPABASE_SETUP.md` step 10) or the email link will fail.

1. On the login page, click **Forgot password?**.
2. Type your email address and press **Send reset link**.
3. Check your inbox (and spam folder) for the reset email and open its link,
   which takes you to the reset page.
4. Type a **New password** and repeat it in **Confirm password** (minimum
   6 characters; each field has its own show/hide toggle).
5. Press **Update password**. When you see the success message you will be sent
   back to sign in — use your new password.

## Dashboard tour

After signing in you see the **Dashboard** ("Studio at a glance" / "Welcome
back"). It has:

- **Total enquiries**, **New this week**, and **Pages updated** — headline numbers.
- **Website content** — a list of every editable area. Click one to jump
  straight to it. Each shows **Saved** with a date, or **Not saved yet** if you
  have never saved changes there.
- **Recent enquiries** — the latest messages from the contact form (name,
  email, event, status). Press **Review enquiries** or **View all** to open the
  full inbox.
- If you see a **Demo mode** notice, the site is not connected to its database
  yet — see [What goes live](#what-goes-live-and-what-stays-in-this-browser).

Shortly after signing in you may also be offered the option to **install the
site as an app** on your device for quick access. This is optional.

## Editing website content

Open any area from the sidebar (**Homepage**, **About**, **Services**,
**Gallery**, **FAQs**, **Contact**) or from the dashboard's **Website
content** list. Every area works the same way:

1. The area opens on a hub page of cards — one card per section
   (for example the Homepage hub lists hero, services, gallery preview,
   testimonials and the call-to-action).
2. Click a card to open that section's form.
3. Change the text, images or toggles. A **Published** switch means
   "show this on the website"; switching it off hides the item.
4. Press **Save** (or **Save Changes** / **Create** for a new item).
   **Cancel** abandons your changes; **Reset** restores the last saved values.
5. If you try to leave with unsaved changes, you will be warned first.

Adding and removing items:

- Lists (services, gallery images, testimonials) have an **Add …** button
  (e.g. **Add image**, **Add service**). Fill in the new-item form and press
  **Create**.
- To remove something, open it and press **Delete …**. You will always be
  asked to confirm first — deletion is permanent, so be sure.
- Some lists let you reorder with **Move up** / **Move down** buttons.
  The order you set is the order visitors see.

Images:

- Image fields let you upload a picture and add **alt text** — a short
  description of the image (e.g. "Garden wedding arch in blush and ivory").
  Alt text helps visually impaired visitors and search engines, so always
  fill it in.
- There is no separate photo library: pictures are managed inside the item
  they belong to.

What each area holds:

- **Homepage** — hero heading, trust marks, the 3 service cards, gallery
  preview images, reasons to choose the studio, testimonials, Instagram
  images and the closing call-to-action.
- **About** — hero, brand story paragraphs and quote, mission and vision
  panels, core values (each with an icon), highlights, process steps,
  statistics and the testimonial highlight.
- **Services** — the service collections (Decor Hire, Luxe Photobooth,
  Blissful Nest), their packages, inclusions and gallery images, plus the
  experience timeline. Collections open their own detail pages where you can
  edit the title, description, cover image, **Featured** toggle and sections.
- **Gallery** — images, categories and featured stories. Start from the
  **Gallery images** card ({n} images, {m} categories): search with
  **Search images…**, narrow with **Filter by category**, tick **Select all**
  to select everything, **Add image** for a new one, or select several and
  press **Delete …** to remove them together. Each image needs a title, a
  category and a grid size (large, portrait, medium, small, wide).
- **Contact** — hero text, the "what happens after you enquire" steps, and
  the enquiry form options below. The order of the dropdown options here is
  the order visitors see them in the form (see
  [Managing FAQs](#managing-faqs) for the FAQ editor, which lives separately).

## Managing FAQs

The FAQ editor (**FAQs** in the sidebar) has its own hub with three cards:
**FAQ Hero**, **Content** and **CTA**. Unlike most content areas, FAQ changes
go live on the public `/faqs` page (once the site database is connected).

- **FAQ Hero** and **CTA** — edit the heading, description and buttons at the
  top and bottom of the public FAQ page, then **Save Changes**.
- **Content → FAQ Items** — the questions and answers. Use
  **Search questions…** to find one, **Filter** by category or status
  (published / unpublished / archived), **Add FAQ** for a new one. Each item
  has a question (max 160 characters), an answer, a category, a display
  order number and a **Published** switch. Only published, non-archived items
  appear on the website, ordered by their display number. **Move up** /
  **Move down** reorder items inside a category.
- **Content → FAQ Categories** — the topic pills visitors filter by
  (e.g. Services, Pricing). **Add category** for a new one; each has a name,
  an auto-generated web address (slug) you can edit, a description, a display
  order and a **Published** switch. Categories with no published questions
  are hidden on the public page automatically.
- Deleting a question moves it to the archive first (hidden from the site),
  from where it can be **Restore**d or deleted permanently. Deleting a
  category that still has questions is blocked until you move its questions
  to another category — questions are never left orphaned.

## Handling enquiries

**Enquiries** in the sidebar is your lead inbox — every contact-form
submission arrives here.

- At the top: status filters **All / New / Contacted / Quoted / Closed** with
  counts, plus **Search by name, email or event…**.
- Each row shows name, email, event, date and a status dropdown you can
  change inline. Suggested workflow: **New → Contacted → Quoted → Closed**.
- **View** opens the full message (contact details, event details, services
  asked about, message) with a **Reply by email** link that opens your email
  app addressed to the enquirer.
- **Export CSV** downloads the whole inbox as a spreadsheet (disabled when
  there are no enquiries).
- **Delete** removes an enquiry permanently after confirmation.
- On small screens the inbox shows as cards instead of a table; everything
  works the same.

## SEO settings

**SEO** controls how your pages appear in Google and when links are shared:

1. Open **SEO** and click a page card (site-wide defaults plus Home, About,
   Services, Gallery, Contact, FAQs).
2. Edit the **SEO title** (aim for 50–60 characters; over 70 is flagged),
   **SEO description** (aim for 150–160 characters; over 200 is flagged),
   **Keywords** (3–5 comma-separated words), the canonical **URL**, and the
   **Share image** (ideally 1200×630 pixels — this is the picture shown when
   someone shares the page).
3. Press **Save**. Leaving fields blank is safe: pages fall back to the
   site-wide defaults.

## Studio settings

**Settings** holds your studio profile:

- **My account** — your own sign-in details (see [Your account](#your-account)).
- Footer contact details — studio location, email and phone as shown in the
  website footer.
- Links & navigation — social links (platform + URL) and footer link groups.
- Enquiry form options also live under the Contact area (see above).

## Your account

Open **Settings → My account**. You will see "You are signed in as …".

- **Display name** — the name shown for you in the admin area.
- **Email** — changing it requires your current password, and you must
  confirm the new address via email.
- **Password** — type your **Current password** (always required to save),
  then a **New password** and **Confirm password** (minimum 6 characters;
  leave blank to keep the current one).
- Press **Save account**.

## Tour of the public website

This is what your visitors see. The top menu links to **Home, About,
Services, Gallery, FAQs, Contact**; the footer repeats key links plus your
contact details and socials.

- **Home (`/`)** — the front door: headline, trust marks ("Weddings, Private
  celebrations…"), the three service cards (Decor Hire, Luxe Photobooth,
  Blissful Nest), a gallery preview, reasons to choose the studio, client
  testimonials, an Instagram preview and a closing **Enquire Now** button.
- **About (`/about`)** — your story: brand story and founder quote, mission
  and vision, core values, process steps, statistics (events styled,
  five-star rating, years, venue partners) and a testimonial highlight.
- **Services (`/services`)** — the catalogue: tab between **Decor Hire**
  (flower arrangements, backdrops, plinths), **Luxe Photobooth** (Signature,
  Glam and VIP packages with prices) and **Blissful Nest** (Standard,
  Premium, Deluxe and Custom prize options). Every package links to
  **Reserve Your Date** (the contact form). A short FAQ preview sits below.
- **Gallery (`/gallery`)** — the portfolio: filter by category tabs
  (Weddings, Engagements, Birthdays, Corporate Events, Luxury Booth, Decor
  Hire, Blissful Nest…), **Load More** reveals more images, clicking an image
  opens it large with previous/next arrows and a counter, and **View Full
  Story** on featured stories opens the full narrative with decor highlights
  and services used.
- **FAQs (`/faqs`)** — searchable help: type in **Search questions…**,
  filter by topic pill, click a question to expand its answer. Multiple
  answers can stay open; links can point to a specific question.
- **Contact (`/contact`)** — the enquiry form (see next section), your phone
  / email / socials, response-time note (1–2 business days), and links back
  to services and gallery.
- Unknown addresses show a friendly "page not found" page with a way back
  home — not an error screen.

## The enquiry journey, end to end

What a visitor does on the **Contact** page:

1. **Part 1 — Personal details:** full name and email (required), phone
   (optional).
2. **Part 2 — Event details:** event type (required: Wedding, Birthday,
   Private Celebration, Corporate Event, Brand Event, Other), date
   (optional, cannot be in the past), venue/location and guest count
   (optional dropdowns).
3. **Part 3 — Services:** tick at least one interest (event decor hire,
   Luxe Photobooth, Blissful Nest, setup & styling, or not sure yet).
4. **Part 4 — Requirements:** say whether setup help is needed
   (Yes / No / Not sure yet — required) and add a free-text message
   (optional: mood, colours, requests).
5. **Next** / **Back** move between steps; each step is checked before
   continuing. **Send Enquiry** submits.

What happens then:

- The visitor sees a **Thank you** panel with options to return home or send
  another enquiry. The form notes that submitting is an enquiry, not a
  confirmed booking.
- The enquiry appears in your **Enquiries** inbox (top of the list, status
  **New**).
- If email notifications are set up, the studio also receives an email. If
  anything fails, the visitor is shown an email fallback so no lead is lost.

## What goes live and what stays in this browser

Two honest states, verified against the running site:

**✅ Goes live on the public website** (once the site database is connected):

- FAQ hero, categories, questions and CTA.
- Contact-form enquiries arriving in your inbox.

**⚠️ Saved in this browser only (for now):**

- Homepage, About, Services, Gallery, Contact, SEO and Settings edits.
  These are stored in this browser's local storage
  (`mib_admin_content_v1`), and the public pages currently read their text
  from the built-in defaults. Your edits are safe in the browser you made
  them in, but visitors will not see them yet, and they will not follow you
  to another computer or browser.

Practical consequences:

- If you see the dashboard's **Demo mode** notice, the database is not
  connected: enquiries are also kept in this browser only
  (`mib_demo_public_enquiries`) and FAQs fall back to the same pattern.
- Do your admin work in one browser (ideally Chrome or Edge) and don't clear
  its site data, or unsynced edits and demo enquiries will be lost.
- Ask your developer before treating any local-only edit as published.

## Troubleshooting

| Problem | What to do |
|---|---|
| Can't sign in | Check email/password typos; use **Show** to inspect the password; session may have expired — just sign in again. Still stuck? Use **Forgot password?**. |
| No password-reset email | Wait a few minutes, check spam/junk, confirm you typed the right email. Still nothing? The database may not be connected (demo mode), or the reset page isn't allowlisted in Supabase — contact your developer (`SUPABASE_SETUP.md` step 10). |
| "My edit isn't on the website" | Almost always the local-only behaviour above: check whether the area is ✅ or ⚠️, and whether the **Demo mode** notice is showing. Also confirm you pressed **Save**. |
| "Demo mode" notice won't go away | The site needs its database keys configured and redeployed by your developer — not something you can fix from the admin area. |
| Enquiry never arrived | Check the **Enquiries** inbox directly (email notifications can fail while the inbox save succeeds). In demo mode, check the same browser the visitor used. |
| Warned about unsaved changes | Press **Save** to keep them or **Cancel** to abandon them before navigating away. |
| Deleted something by accident | Deletion is permanent except FAQ items, which sit in the archive first — check the archived filter and **Restore**. For anything else, contact your developer promptly. |
| Page looks broken on your phone | Try a hard refresh; if it persists, note the page and what you tapped and contact your developer. |

## Getting help

- Writing style rules for any new copy: `CONTENT_GUIDE.md` (warm, refined,
  second-person for visitors, specific over generic, no exclamation points).
- Handover checklist, credentials and support terms: `HANDOVER.md`.
- Technical detail (database, deployment, security): the other files in
  `docs/` — these are written for your developer, not for daily use.
- For anything this manual doesn't cover, contact your developer with the
  page address, what you clicked, and what you expected — a screenshot helps.
