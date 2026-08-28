# SEO

## Purpose
To define an SEO approach appropriately scaled to a six-page marketing site — solid fundamentals, not an over-engineered enterprise SEO stack.

## Overview
SEO is handled through per-page metadata managed via React Helmet Async and editable (where relevant) from the CMS, combined with standard technical SEO hygiene (sitemap, robots file, semantic HTML, image alt text, and performance).

## Current Status
Strategy defined; implementation proceeds alongside each public page as it's built, with a dedicated SEO pass scheduled at Milestone 6 in `ROADMAP.md`.

## Responsibilities

**SEO Strategy**
- Target local-intent search terms relevant to Melbourne event styling (e.g., "luxury event styling Melbourne," "wedding styling Melbourne") reflected naturally in page copy, headings, and metadata — not keyword-stuffed.
- Each of the six public pages has a distinct, purposeful title and description rather than a single reused template.

**Metadata**
- Managed via React Helmet Async per route; `title` and `meta description` pulled from CMS-entered `seo_title`/`seo_description` fields where available, falling back to `site_settings.default_seo`.

**Open Graph**
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type` set per page, with `og:image` defaulting to a curated brand image (e.g., a hero gallery shot) if no page-specific image is set.

**Twitter Cards**
- `summary_large_image` card type, mirroring the Open Graph title/description/image so social previews stay consistent across platforms.

**Schema**
- `LocalBusiness` structured data (JSON-LD) on the homepage, reflecting business name, location (Melbourne), and category (event styling services), to support local search visibility.

**Robots**
- A standard `robots.txt` allowing full crawl of the public site; the admin route tree (`/admin/*`) is disallowed from crawling as a defense-in-depth measure (not a substitute for authentication).

**Sitemap**
- A static `sitemap.xml` covering the six public routes, submitted to Google Search Console post-launch.

**Image SEO**
- Descriptive `alt` text required on all gallery and content images, sourced from CMS-entered captions/descriptions rather than left blank or auto-generated from filenames.
- Images served at appropriately compressed sizes (see Performance below).

**Performance**
- Images optimized (compressed, appropriately sized) before or during upload to Supabase Storage; lazy-loading applied to below-the-fold images (notably the Gallery page).
- Fonts loaded efficiently (subset where possible, `font-display: swap`) to avoid render-blocking on the serif/sans pairing used in the design system.

**Core Web Vitals**
- Largest Contentful Paint (LCP) kept in check by prioritizing hero image loading and avoiding layout shift from late-loading fonts/images.
- Cumulative Layout Shift (CLS) minimized by reserving space (aspect-ratio boxes) for images before they load, particularly in the Gallery grid.
- A Lighthouse pass is included as part of the Milestone 6 QA/SEO pass, not left until after launch.

## Implementation Notes
Because SEO fields are optional at the CMS level (fallback to site-wide defaults), the client is never blocked from publishing content due to missing SEO fields — but the admin UI should visibly encourage filling them in per page for best results.

## Checklist
- [ ] React Helmet Async wired into routing with per-page metadata
- [ ] `robots.txt` and `sitemap.xml` added to `public/`
- [ ] `LocalBusiness` JSON-LD added to homepage
- [ ] Image alt text populated from CMS captions
- [ ] Lighthouse/Core Web Vitals pass completed pre-launch

## Future Improvements
Blog/content marketing, additional schema types (e.g., `Review`/`AggregateRating` if testimonials are added), and deeper local SEO (Google Business Profile integration) are candidates for a future phase, not required for launch.

## Related Documents
`CMS.md`, `DESIGN_SYSTEM.md`, `DEPLOYMENT.md`
