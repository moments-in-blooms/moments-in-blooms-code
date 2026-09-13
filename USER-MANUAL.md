# Moments in Blooms — Website Manual

For the studio owner and staff. Plain language, no technical knowledge required.

**Your two addresses:** the public website is `momentsinblooms.vercel.app` (what every visitor sees), and your admin panel is `momentsinblooms.vercel.app/admin` (where you change the website). You need your email and password to get in.

**The one rule that matters:** every time you press **Save Changes**, your change goes live on the public website straight away. There is no draft mode and no extra "publish to website" step — saving *is* publishing. To hide something, turn its **Published** switch off (or **Highlight** off) and save.

---

## 1. How to use this manual

On-screen labels are written in **bold**, exactly as they appear. A path like `Dashboard → Services → Categories` means: open the **Dashboard**, click **Services** in the left sidebar, then click **Categories**.

The left sidebar has five groups:

- **Overview** — Dashboard
- **Website Pages** — Homepage, About, Services, Gallery, FAQs, Contact
- **Services** — Categories, Sub-Categories, Items (your service catalogue — see §6)
- **Business** — Enquiries
- **System** — SEO, Settings

> **"Services" appears twice.** Under **Website Pages**, *Services* edits the words around your catalogue (the page's top banner, highlights, introduction, timeline, bottom banner). Under **Services** (its own group), *Categories / Sub-Categories / Items* edit the actual services and prices. The manual calls these the **Services Page** and the **Services catalogue** so you always know which one you are editing.

---

## 2. Quick start — the 5 tasks you will do most

1. **Sign in:** go to `momentsinblooms.vercel.app/admin/login`, enter your email and password, press **Sign in**.
2. **Edit a page:** open `Website Pages` in the sidebar (e.g. **Homepage**), edit any section, press **Save Changes** at the bottom.
3. **Add a service item:** open `Services → Items`, press **Add item**, fill in the name, price and where it appears, press **Add item** again to create it.
4. **Check an enquiry:** open **Business → Enquiries**, click an enquiry to **View** it, update its status as you work the lead.
5. **See it live:** open the public website in another tab — your saved change is already there. If it is not, see §14 Troubleshooting.

---

## 3. Signing in and out

1. Go to `momentsinblooms.vercel.app/admin/login`. You will see the **Studio Admin** panel with the heading **Welcome back.**
2. Enter your **Email address** and **Password** (passwords are at least 6 characters; the eye icon shows or hides what you type). Required fields are marked with a `*`.
3. Press **Sign in** (it reads **Signing in…** while it works). You land on the **Dashboard**.

**If your email or password is wrong**, a message appears above the button: *"Invalid email or password."* Check for typos and try again. The **Forgot password?** link is below the button:

1. Press **Forgot password?** and enter your email address.
2. Press **Send reset link**. You will see **Reset link sent.** with a reminder to check your inbox and spam folder.
3. Open the email and follow the link. It takes you to a **Choose a new password** screen.
4. Type your new password twice — **New password** and **Confirm password** (at least 6 characters) — and press **Update password**. You will see **All set.** and be taken back to sign in.

**To sign out**, press **Sign out** in the top bar (you will be asked to confirm). The **Back to the website** link under the sign-in form takes you to the public site without signing in.

> **A locked account:** if your account has been disabled you will see *"Your account has been disabled."* Contact the studio owner — only an owner can reactivate accounts.

---

## 4. Your dashboard

After signing in you land on the **Dashboard** ("Studio at a glance", "Welcome back"). It shows:

- **Total enquiries** and **New this week** — your lead pipeline at a glance.
- **Pages updated** — how many website pages have saved changes.
- **Website content** — every page with its state: **Saved** (with date), **Not saved yet**, or **Unsaved changes** (you started editing but have not pressed Save).
- **Recent enquiries** — the five newest enquiries. **Review enquiries** and **View all** take you to the full inbox (§7).

---

## 5. Editing website pages (the CMS)

Every content page works the same way:

1. Open the page from `Website Pages` (e.g. **Homepage**). It lists its sections — labelled in plain words like **Top banner** (the first thing visitors see), **Trust badges**, **Services section title**, **Gallery photos**, **Why choose us**, **Client reviews**, **Instagram photos**, and **Bottom banner** (the final section at the bottom).
2. Open a section to edit it. Common fields:
   - **Small line above the title** — the short phrase shown above a heading.
   - **Main heading** — the big title.
   - **Main button** / **Second button** — the two buttons, with their labels and links (links look like `/contact`).
   - **Banner image** / **Card image** — press **Add Image**, choose a file from your device (or drag and drop it), and fill in **Image Title** so the image is described for accessibility and search engines. JPG, PNG, WebP and GIF are accepted, up to 20 MB. SVG files are rejected.
3. Press **Save Changes** at the bottom of the screen. The status text changes from **Unsaved changes** to **Saved** with the date. Your edit is live on the public website right now.
4. **Cancel** goes back without saving. **Discard** throws away your unsaved edits (the saved version stays untouched). **Delete** removes an entry after asking you to confirm.

### What you will find on each page

- **Homepage** — top banner, trust badges, the services section title, the gallery collage, "why choose us" reasons, client reviews, the Instagram strip and the bottom banner. The service cards on the homepage are *not* edited here: each card follows its own category (see the **Linked category** note on a card). To change what a card says, edit the category itself under `Services → Categories` (§6).
- **About** — your brand story, values, and why couples choose the studio.
- **Services Page** — only the words *around* the catalogue: top banner, highlights, introduction, experience timeline and bottom banner. The services and prices themselves live in `Services → Categories / Sub-Categories / Items` (§6).
- **Gallery** — the page banners plus **Featured stories** (the stories you want to tell), opened through `Admin → Gallery → Items` where you can **Add image**, use **Search images…** and **Filter by category**, select many images at once (**Select all**), set each image's **Grid size** (how big it appears), and remove images (**Delete** with confirmation).
- **FAQs** — three cards: **FAQ top banner**, **FAQ Content** (press **Manage FAQ Content**), and **FAQ bottom banner** (press **Manage bottom banner**). Inside **FAQ Content** you edit the **Section Heading**, then the filter categories, then the **FAQ Items** (press **Manage FAQ Items**):
  - To add a question, press **Add FAQ** in the FAQ Items list, write the question and answer, choose its category and press **Create FAQ**. To add a category, press **Add category** and then **Create category**.
  - The **Published** switch controls whether visitors see an item or category. Items you archive disappear from the public page but stay in the admin with a banner (*"Archived and hidden from visitors"*) and a **Restore** button — nothing is ever lost.
  - Deleting a category that still has questions is blocked on purpose: the panel will ask you to **move those FAQs** to another category first, so no question is ever orphaned.
- **Contact** — the top banner, the enquiry form steps and options, the contact information visitors see, and the bottom banner.

---

## 6. Managing your services catalogue (deep-dive)

Your services are stored as a three-level tree, exactly matching how the admin sidebar is organised:

**Categories** (top level) → **Sub-Categories** (inside exactly one category) → **Items** (the individual services, packages and prize options, inside a category and optionally a sub-category).

The public website reads this tree directly: the **/services** page filters by it, and each homepage service card follows one category. Reorder, rename or repricing anything here and the website updates everywhere at once — including the footer service links.

### Categories (`Services → Categories`)

Press **Add category** to create one, or open an existing category to edit it. Fields that matter:

- Title and description, shown on the public site.
- **Web address** — the short unique address for the category. Leave it blank and the system generates it from the title.
- **Type** — *Standard* is a normal service group; *Named brand* is for a sub-brand like Blissful Nest.
- **Menu subtitle** and **Menu note** — the short lines shown under the category on the site.
- **Highlighted** — highlights this category on the public site.
- **Starting price** — optional; shown as *"Price starts at …"*.

Use the **Move up** / **Move down** arrows to control the order visitors see. The detail page for an existing category carries the eyebrow **Services · Categories** and a **Back to Categories** link.

### Sub-Categories (`Services → Sub-Categories`)

Press **Add sub-category**; every sub-category belongs to exactly one category (shown under **Where it appears** — pick the category first). If a sub-category holds items and you delete it, the panel offers **Move & delete**: choose where the items go first, so nothing is ever orphaned. The detail page eyebrow is **Services · Sub-Categories**.

### Items (`Services → Items`)

Press **Add item** to create a service, package or prize option; open an item to edit it. You set the name, description, pricing (**Starting price** if it applies), **Where it appears** (its category, and **No sub-category** if it sits directly under the category), and **Highlighted** (highlighted items stand out on the public site — several items can be highlighted at once). Price lists, inclusions and gallery photos live on the same form; reorder sections with the **Move up** / **Move down** arrows. The detail page eyebrow is **Services · Items** with a **Back to Items** link.

### About "Published" in the catalogue

Unlike FAQs, catalogue entries have no **Published** switch: being in the tree *is* being on the website. To remove something without deleting it, move it into an unused sub-category or delete it (deletions always ask you to confirm first). Press **Save Changes** (or **Add item** / **Add category** / **Add sub-category** when creating) — the status text under the buttons always tells you whether you have **Unsaved changes** or everything is **Saved**.

---

## 7. Handling enquiries (deep-dive)

Every contact-form submission lands in `Business → Enquiries` as soon as the visitor presses send — and the studio gets an email notification about it. (If you never receive notification emails, see §14.)

Your lead inbox shows:

- **Status filters with counts** — **All / New / Contacted / Quoted / Closed**. Move each enquiry along as you work it: New → Contacted → Quoted → Closed, either from the list or from inside the detail view (press **View**).
- **Search** — *"Search by name, email or event…"* finds any enquiry instantly.
- **View** — opens the full enquiry: name, email, phone, event type and date, venue, guest count, who is doing the styling, services of interest, and the visitor's *"Anything else we should know?"* message. **Reply by email** opens your email app addressed to the visitor.
- **Export CSV** — downloads the current list (respecting your filter) as a spreadsheet. It is disabled when there is nothing to export.
- **Delete** — permanently removes an enquiry after you confirm (*"Are you sure you want to delete this enquiry? This action cannot be undone."*).

> **Closed means closed.** A closed enquiry cannot be reopened — if you try, the panel tells you: *"Closed enquiries cannot be reopened. Delete it or leave it closed."* So only mark an enquiry **Closed** when the job is truly finished.

---

## 8. SEO settings (`System → SEO`)

This controls how your pages appear in search results: each page gets a search **title** and **description**. Keep titles under about 60 characters and descriptions under about 160 so Google shows them in full, and mention the service plus "Melbourne" where it fits (e.g. *"Luxe Photobooth Hire Melbourne | Moments in Blooms"*). If you leave a page's fields blank, the site-wide defaults are used — you are never blocked from saving by an empty SEO field. Edit, press **Save Changes**, done.

---

## 9. Studio settings (`System → Settings`)

Your contact details live in exactly one place — and the header, footer and Contact page all read from it, so one edit updates the whole website:

- **Studio contact details** — phone, email, address, hours.
- **Social links** — Instagram, Facebook, TikTok.
- **Footer navigation** — the link groups in the website footer.

Press **Save Changes** when done.

---

## 10. Your account

Open `Settings` and press the **My account** card. It shows *"You are signed in as …"* with your current email, and lets you change it:

- **Display name** — the name shown for you in the admin panel.
- **Email** — changing it requires your current password, and you will receive a confirmation email at the new address.
- **Password** — type your current password, then the new one twice (**New password** and **Confirm new password**, at least 6 characters). *"Leave blank to keep current password"* if you only want to change your name or email.

Press **Save account** (it reads **Saving…** while it works).

---

## 11. Install the website as an app

On your phone you can install the admin panel as an app: open the admin address in your mobile browser and follow the prompt to add it to your home screen. It opens full-screen without the browser bar — handy for checking enquiries on event days. The app updates itself in the background; if it ever looks out of date, see §14.

---

## 12. Tour of the public website

What a visitor sees, page by page:

- **Home** — cinematic top banner → trust statement → the three service cards (each jumps to its catalogue filter) → gallery collage → "why choose us" proof list → the enquiry process timeline → client reviews → Instagram strip → FAQs → final enquiry section.
- **Services** — every category, sub-category and item from your catalogue (§6), with prices, highlights, timeline and gallery.
- **Gallery** — the photo portfolio with categories, featured stories, lightbox viewing and the Instagram strip.
- **FAQs** — the top banner, the search-and-filter question list, and the bottom banner (all edited under §5's FAQ walkthrough).
- **Contact** — top banner, the multi-step enquiry form, your contact information and the bottom banner.

Everything above is driven by what you save in the admin panel — there is no other place to change website content.

---

## 13. Writing for your website

Short, specific and warm beats long and flowery. Follow the same voice you already use on the site:

- Write to one visitor (*"you"*), as the studio (*"we"*). About-page storytelling may use *"we"* throughout.
- One idea per line for trust badges, inclusions and menu notes.
- Captions: short and specific (*"Garden wedding at Stones of the Yarra Valley"*, not *"Beautiful event"*). No exclamation points on headings.
- Prices: keep the numbers in the catalogue's price fields; let the surrounding copy stay timeless (*"Starting price"* renders as *"Price starts at …"* automatically).
- FAQs: answer the question in the first two sentences, then add detail. Keep answers under ~80 words where possible.
- Never invent opening hours, phone numbers or addresses in page copy — those come from **Studio contact details** (§9) so they can only ever be right.

---

## 14. Troubleshooting

| Problem | What to do |
|---|---|
| I can't sign in (*"Invalid email or password"*) | Check for typos (especially spaces). If it still fails, use **Forgot password?** (§3). |
| I never got the reset email | Wait a few minutes and check spam. Links expire — request a fresh one. If you requested several in a row, wait about an hour (anti-spam limit) and see the next row. |
| Too many reset emails / rate limit | Supabase limits how often reset emails can be sent. Wait about an hour, then try once. |
| My account says disabled | Only the studio owner can reactivate it — contact them. |
| My edit isn't on the website | Did you press **Save Changes**? The bar at the bottom says **Unsaved changes** if you haven't. Saved edits are live immediately, so also refresh the public page (hard refresh: Ctrl/Cmd + Shift + R). |
| The app on my phone shows an old version | Close it fully and reopen it — it updates itself in the background. If it persists, remove it from the home screen and re-add it (§11). |
| An image won't upload | It must be JPG, PNG, WebP or GIF and under 20 MB. SVG files are rejected. Rename the file simply (letters, numbers, dashes) and retry. |
| A question/category isn't showing on the FAQs page | Open it in the admin — its **Published** switch is probably off. An **Archived** item needs **Restore**. |
| I closed an enquiry by accident | It cannot be reopened — leave it closed, or delete it (§7). Be careful with **Closed**. |
| The dashboard says **Demo mode** | The browser isn't connected to the live database, so edits would only save in that browser. See the developer row below — then sign in again once it's fixed. |
| An old "Services" page/bookmark looks broken | Old catalogue links redirect automatically to the right place — you don't need to do anything. If one doesn't, copy the address and send it to your developer. |

### Needs your developer

| Symptom | Likely cause |
|---|---|
| "Demo mode" notice on the dashboard; saves never leave the browser | The site's Supabase connection (`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`) isn't configured in this environment. |
| New-enquiry email notifications never arrive | EmailJS (`VITE_EMAILJS_*`) isn't configured. The enquiry itself still saves — only the email is skipped. |
| Reset-password links go nowhere | The Supabase *Redirect URLs* allow-list must include the site's `/admin/reset-password` address. |
| A CMS section renders empty after a save | Never save an empty form over a live page — restore from memory and re-save; contact your developer if a section key changed. |
| Admin data loads nothing with a configured `.env` | The database migrations (`supabase/migrations/`) or RLS policies may not be applied to the project. |

---

## 15. Where your website lives

Three services, three jobs:

- **GitHub** — holds the source code (the recipe). Repository: `github.com/moments-in-blooms/moments-in-blooms-code`, branch `release/v1.2`. Every accepted change to the code is deployed to the live website automatically.
- **Supabase** — holds the database (the ingredients): your saved page content, FAQs, enquiries and uploaded images. Project: `nkiklcuhxuwjnwmuaqaf`. Your developer signs in at `supabase.com` to manage it.
- **Vercel** — hosts the live website (the kitchen that serves it): `momentsinblooms.vercel.app`.

You never need to touch these to run the studio — everything you change day-to-day is in this manual's admin panel. The rest of this section is for your developer.

### For your developer

- **Source:** `https://github.com/moments-in-blooms/moments-in-blooms-code.git` (current branch `release/v1.2`). Stack: React 19 + Vite, styled-components, React Router v7, vitest (`npm test`, 66 tests). Conventional Commits, PR into `main`; dev server on port 3000.
- **Deploy:** Vercel auto-deploys accepted commits; SPA rewrite, asset caching and security headers live in `vercel.json`. PWA service worker auto-updates hourly and reloads tabs on new deploys.
- **Database:** Supabase Postgres, project `nkiklcuhxuwjnwmuaqaf` (`https://nkiklcuhxuwjnwmuaqaf.supabase.co`). Tables: `page_content` (one JSON blob per CMS page — homepage/about/services/contact/gallery/seo/settings), `faq_categories` / `faqs` / `faq_page` (relational FAQ module, soft delete via `deleted_at`), `enquiries` (anon insert-only, no `.select()` on insert), `admin_profiles` (owner-gated RLS via `is_active_owner()`), storage bucket `public-media` (20 MB cap, JPG/PNG/WebP/GIF). All migrations in `supabase/migrations/` are idempotent and re-runnable.
- **Clients:** `src/services/supabaseClient.js` exports the session `supabase` client (admin CRUD) and the session-less `publicSupabase` client (public reads + enquiry inserts). Environment: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_EMAILJS_*`, `VITE_SITE_URL`. The anon key is safe to expose; RLS protects the data. Keys live in `.env` (gitignored) and the Vercel project settings — never in this manual.
- **Content model:** seeds in `src/constants/*.js`; `useContent('<pageKey>')` overlays saved blobs; `src/services/faqs.js` is the single source of truth for FAQ content; `buildServicesCatalog` derives the live catalogue tree. Component pattern `Name.jsx` / `Name.styles.js` / `index.js`; full conventions in `AGENTS.md`.
