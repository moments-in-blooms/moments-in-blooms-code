# Moments in Blooms

Production-ready React foundation for Moments in Blooms, a luxury event styling business based in Melbourne, Australia.

## Milestone boundaries

Milestone 1 established the application architecture, public/admin shells, routing, theme system, and reusable primitives. The admin screens, CMS functionality, forms, API integrations, and content models remain deferred to future milestones.

## Stack

- React 19 with JavaScript
- Vite
- React Router DOM
- Styled Components for all application styling
- Framer Motion for shared motion primitives
- React Helmet Async for route metadata
- React Icons for interface icons
- React Hook Form reserved for future forms

## Project architecture



Every reusable component keeps its implementation and styled-components stylesheet together. Every route page owns a corresponding `*.styles.js` file, even while the route renders a restrained placeholder. This keeps the project ready for page-by-page implementation without coupling feature logic to layouts.

## Routes

### Public

`/`, `/about`, `/services`, `/gallery`, `/faqs`, `/contact`

### Admin

`/admin`, `/admin/dashboard`, `/admin/homepage`, `/admin/about`, `/admin/services`, `/admin/gallery`, `/admin/faqs`, `/admin/enquiries`, `/admin/seo`, `/admin/settings`

`/admin` redirects to `/admin/dashboard`.

## Theme system

The single source of truth is [`src/styles/theme.js`](./src/styles/theme.js). It contains the luxury-neutral color system, Fraunces and Manrope type stacks, spacing, radii, transitions, shadows, container widths, and responsive breakpoints. [`src/styles/GlobalStyles.js`](./src/styles/GlobalStyles.js) applies the reset, scrollbar, selection, focus, responsive typography, and reduced-motion behavior.

## Milestone 2 public shell

The reusable public shell now includes:

- A fixed transparent navbar that becomes a blurred, bordered, shadowed white surface after scrolling.
- Centered desktop navigation with active-route underlines and an `Enquire Now` CTA.
- A full-screen mobile menu with Framer Motion transitions, Escape/backdrop dismissal, focus trapping, focus restoration, and body scroll lock.
- A premium footer with grouped navigation, service links, contact details, social icons, copyright, watermark typography, and an enquiry CTA.
- `Section` support for title, subtitle, description, action, and background tone composition.
- Button variants for primary, secondary, outline, and ghost states, plus loading behavior.
- Branded route loading, route scroll restoration, a scroll-aware Back To Top control, and an editorial 404 recovery page.

The footer CTA routes visitors to `/contact` so the shell prioritizes enquiry generation over email marketing.

## Homepage milestone

The homepage is composed from isolated section modules under [`src/pages/public/Home`](./src/pages/public/Home):

- Cinematic hero with stock floral background, parallax, scroll cue, and enquiry-led CTAs
- Editorial trust statement and text-only trust marks
- Staggered image-led services for Decor Hire, Luxe Photobooth, and Blissful Nest
- Overlap gallery collage
- Sticky “Why us?” proof list
- Alternating enquiry process timeline
- Controlled testimonial preview with keyboard-accessible controls
- Reduced-motion-aware Instagram preview strip
- Single-open accessible FAQ accordion
- Final enquiry conversion section

Static copy and remote image metadata are centralized in [`src/constants/homepage.js`](./src/constants/homepage.js). The homepage uses direct stock image URLs and keeps photographer attributions in the image metadata and accessible credit text.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

SVG assets can be imported as React components with the Vite SVGR plugin and the `?react` suffix, for example `import Mark from './mark.svg?react'`.

```
moments-in-bloom
├─ .kombai
│  ├─ canvas
│  └─ design-systems
├─ docs
│  ├─ API.md
│  ├─ ARCHITECTURE.md
│  ├─ BUSINESS_RULES.md
│  ├─ CHANGELOG.md
│  ├─ CHANGE_REQUESTS.md
│  ├─ CLIENT_DECISIONS.md
│  ├─ CLIENT_PROFILE.md
│  ├─ CMS.md
│  ├─ COMPONENT_GUIDE.md
│  ├─ CONTENT_GUIDE.md
│  ├─ CONTRIBUTING.md
│  ├─ DATABASE.md
│  ├─ DEPLOYMENT.md
│  ├─ DESIGN_SYSTEM.md
│  ├─ ENVIRONMENT_SETUP.md
│  ├─ FUTURE_UPGRADES.md
│  ├─ HANDOVER.md
│  ├─ MEETING_NOTES.md
│  ├─ PAYMENTS.md
│  ├─ PROJECT_CONTEXT.md
│  ├─ PROJECT_OVERVIEW.md
│  ├─ PROJECT_SCOPE.md
│  ├─ README.md
│  ├─ ROADMAP.md
│  ├─ SECURITY.md
│  ├─ SEO.md
│  ├─ TESTING.md
│  ├─ TIMELINE.md
│  └─ TODO.md
├─ eslint.config.js
├─ index.html
├─ orlando-docs.zip
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ hero.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ components
│  │  ├─ BackToTop
│  │  │  ├─ BackToTop.jsx
│  │  │  ├─ BackToTop.styles.js
│  │  │  └─ index.js
│  │  ├─ Badge
│  │  │  ├─ Badge.jsx
│  │  │  ├─ Badge.styles.js
│  │  │  └─ index.js
│  │  ├─ Button
│  │  │  ├─ Button.jsx
│  │  │  ├─ Button.styles.js
│  │  │  └─ index.js
│  │  ├─ Card
│  │  │  ├─ Card.jsx
│  │  │  ├─ Card.styles.js
│  │  │  └─ index.js
│  │  ├─ Container
│  │  │  ├─ Container.jsx
│  │  │  ├─ Container.styles.js
│  │  │  └─ index.js
│  │  ├─ Divider
│  │  │  ├─ Divider.jsx
│  │  │  ├─ Divider.styles.js
│  │  │  └─ index.js
│  │  ├─ Footer
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Footer.styles.js
│  │  │  └─ index.js
│  │  ├─ Heading
│  │  │  ├─ Heading.jsx
│  │  │  ├─ Heading.styles.js
│  │  │  └─ index.js
│  │  ├─ Loading
│  │  │  ├─ index.js
│  │  │  ├─ Loading.jsx
│  │  │  ├─ Loading.styles.js
│  │  │  ├─ LoadingScreen.jsx
│  │  │  └─ LoadingScreen.styles.js
│  │  ├─ Navbar
│  │  │  ├─ index.js
│  │  │  ├─ MobileMenu.jsx
│  │  │  ├─ MobileMenu.styles.js
│  │  │  ├─ Navbar.jsx
│  │  │  └─ Navbar.styles.js
│  │  ├─ PageContainer
│  │  │  ├─ index.js
│  │  │  └─ PageContainer.jsx
│  │  ├─ PublicOnly
│  │  ├─ ScrollToTop
│  │  │  ├─ index.js
│  │  │  └─ ScrollToTop.jsx
│  │  ├─ Section
│  │  │  ├─ index.js
│  │  │  ├─ Section.jsx
│  │  │  └─ Section.styles.js
│  │  ├─ SEO
│  │  │  ├─ index.js
│  │  │  └─ SEO.jsx
│  │  ├─ Sidebar
│  │  │  ├─ index.js
│  │  │  ├─ Sidebar.jsx
│  │  │  └─ Sidebar.styles.js
│  │  ├─ Text
│  │  │  ├─ index.js
│  │  │  ├─ Text.jsx
│  │  │  └─ Text.styles.js
│  │  └─ Topbar
│  │     ├─ index.js
│  │     ├─ Topbar.jsx
│  │     └─ Topbar.styles.js
│  ├─ constants
│  │  ├─ homepage.js
│  │  ├─ navigation.js
│  │  └─ ui.js
│  ├─ hooks
│  │  ├─ index.js
│  │  ├─ useBodyScrollLock.js
│  │  └─ useScrolled.js
│  ├─ layout
│  │  ├─ AdminLayout.jsx
│  │  ├─ AdminLayout.styles.js
│  │  ├─ PublicLayout.jsx
│  │  └─ PublicLayout.styles.js
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ admin
│  │  │  ├─ AboutCMS
│  │  │  │  ├─ AboutCMS.jsx
│  │  │  │  └─ AboutCMS.styles.js
│  │  │  ├─ Dashboard
│  │  │  │  ├─ Dashboard.jsx
│  │  │  │  └─ Dashboard.styles.js
│  │  │  ├─ Enquiries
│  │  │  │  ├─ Enquiries.jsx
│  │  │  │  └─ Enquiries.styles.js
│  │  │  ├─ FAQsCMS
│  │  │  │  ├─ FAQsCMS.jsx
│  │  │  │  └─ FAQsCMS.styles.js
│  │  │  ├─ GalleryCMS
│  │  │  │  ├─ GalleryCMS.jsx
│  │  │  │  └─ GalleryCMS.styles.js
│  │  │  ├─ HomepageCMS
│  │  │  │  ├─ HomepageCMS.jsx
│  │  │  │  └─ HomepageCMS.styles.js
│  │  │  ├─ SEO
│  │  │  │  ├─ SEO.jsx
│  │  │  │  └─ SEO.styles.js
│  │  │  ├─ ServicesCMS
│  │  │  │  ├─ ServicesCMS.jsx
│  │  │  │  └─ ServicesCMS.styles.js
│  │  │  └─ Settings
│  │  │     ├─ Settings.jsx
│  │  │     └─ Settings.styles.js
│  │  ├─ index.js
│  │  ├─ NotFound
│  │  │  ├─ NotFound.jsx
│  │  │  └─ NotFound.styles.js
│  │  ├─ PagePlaceholder.jsx
│  │  ├─ pageStyles.js
│  │  └─ public
│  │     ├─ About
│  │     │  ├─ About.jsx
│  │     │  └─ About.styles.js
│  │     ├─ Contact
│  │     │  ├─ Contact.jsx
│  │     │  └─ Contact.styles.js
│  │     ├─ FAQs
│  │     │  ├─ FAQs.jsx
│  │     │  └─ FAQs.styles.js
│  │     ├─ Gallery
│  │     │  ├─ Gallery.jsx
│  │     │  └─ Gallery.styles.js
│  │     ├─ Home
│  │     │  ├─ CTA
│  │     │  │  ├─ CTA.jsx
│  │     │  │  └─ CTA.styles.js
│  │     │  ├─ FAQPreview
│  │     │  │  ├─ FAQPreview.jsx
│  │     │  │  └─ FAQPreview.styles.js
│  │     │  ├─ GalleryPreview
│  │     │  │  ├─ GalleryPreview.jsx
│  │     │  │  └─ GalleryPreview.styles.js
│  │     │  ├─ Hero
│  │     │  │  ├─ Hero.jsx
│  │     │  │  └─ Hero.styles.js
│  │     │  ├─ Home.jsx
│  │     │  ├─ Home.styles.js
│  │     │  ├─ InstagramPreview
│  │     │  │  ├─ InstagramPreview.jsx
│  │     │  │  └─ InstagramPreview.styles.js
│  │     │  ├─ Process
│  │     │  │  ├─ Process.jsx
│  │     │  │  └─ Process.styles.js
│  │     │  ├─ Services
│  │     │  │  ├─ Services.jsx
│  │     │  │  └─ Services.styles.js
│  │     │  ├─ Testimonials
│  │     │  │  ├─ Testimonials.jsx
│  │     │  │  └─ Testimonials.styles.js
│  │     │  ├─ TrustedBy
│  │     │  │  ├─ TrustedBy.jsx
│  │     │  │  └─ TrustedBy.styles.js
│  │     │  └─ WhyChooseUs
│  │     │     ├─ WhyChooseUs.jsx
│  │     │     └─ WhyChooseUs.styles.js
│  │     └─ Services
│  │        ├─ Services.jsx
│  │        └─ Services.styles.js
│  ├─ routes
│  │  └─ AppRoutes.jsx
│  ├─ services
│  │  └─ index.js
│  ├─ styles
│  │  ├─ animations.js
│  │  ├─ GlobalStyles.js
│  │  └─ theme.js
│  └─ utils
│     └─ index.js
└─ vite.config.js

```