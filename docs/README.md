# Moments in Blooms — Project Documentation

## Purpose
This is the entry point for all technical and business documentation for the Moments in Blooms website project. It orients any developer, designer, or stakeholder joining the project, and links out to every other document in this repository.

## Overview
Moments in Blooms is a luxury event styling business based in Melbourne, Australia. This project delivers a custom-built marketing website with an integrated content management system (CMS), enquiry management, and basic SEO tooling, so the client can operate the site independently once handed over.

**Project Type:** Public marketing website + custom admin dashboard
**Client:** Moments in Blooms (Melbourne, Australia)
**Developer:** Orlando Dela Cruz (Frontend Web Developer, Philippines)
**Engagement Model:** Fixed-fee, milestone-based freelance contract

## Features
- Public-facing marketing website (Home, About, Services, Gallery, FAQs, Contact)
- Custom CMS for non-technical content management
- Enquiry management system with email notifications, search, and internal notes
- Basic SEO controls (per-page metadata)
- Supabase-backed authentication for the admin dashboard
- Responsive, animated UI built with Framer Motion

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | React.js (Vite) |
| Styling | Styled Components |
| Routing | React Router DOM |
| Animation | Framer Motion |
| Backend / DB / Auth / Storage | Supabase (PostgreSQL) |
| SEO / Head Management | React Helmet Async |
| Language | JavaScript (ES2022+) |

## Folder Structure
```
moments-in-blooms/
├── .github/                # Issue/PR templates, CI workflows
├── assets/                 # Design source files, brand assets, exported images
├── docs/                   # This documentation system
├── public/                 # Static public assets served as-is
├── src/                    # Application source code
│   ├── assets/             # Imported images, icons, fonts
│   ├── components/         # Shared and page-level components
│   │   ├── ui/              # Reusable primitives (Button, Modal, SectionTitle, etc.)
│   │   ├── public/          # Public site sections (Hero, About, Gallery, etc.)
│   │   └── admin/           # Admin dashboard components
│   ├── pages/               # Route-level page components
│   ├── layouts/             # Layout wrappers (PublicLayout, AdminLayout)
│   ├── hooks/                # Custom React hooks
│   ├── services/             # Supabase service/data-access modules
│   ├── store/                 # Client-side state (if/where used)
│   ├── styles/                 # Global styles, theme tokens
│   ├── animations/              # Shared Framer Motion variants
│   ├── utils/                    # Helper functions
│   ├── router/                    # Route definitions
│   ├── App.jsx
│   └── main.jsx
├── supabase/                # SQL migrations, seed data, RLS policies
├── scripts/                 # Build/deploy/maintenance scripts
├── .env.example
├── index.html
├── vite.config.js
└── package.json
```

## Installation
```bash
git clone <repository-url>
cd moments-in-blooms
npm install
cp .env.example .env
# populate .env with Supabase project URL and anon key
```

## Development
```bash
npm run dev
```
Runs the Vite dev server (default: `http://localhost:5173`) with hot module reloading.

## Build
```bash
npm run build
```
Produces a production build in `dist/`. Run `npm run preview` to smoke-test the build locally before deploying.

## Deployment
The project deploys as a static Vite build to a standard static host (see `DEPLOYMENT.md` for the current hosting target, environment variables, and domain/SSL setup). Supabase is a hosted, managed backend and requires no separate deployment.

## Coding Standards
- Functional components and hooks only — no class components.
- One component per folder, following the 4-file pattern: `Component.jsx`, `Component.styled.js`, `index.js`, and an optional data/hook file.
- Styling is done exclusively through Styled Components — no inline styles except for truly dynamic, per-instance values.
- Shared design tokens (color, spacing, typography) live in `src/styles/theme.js` and must be referenced, not hardcoded.
- See `CONTRIBUTING.md` for full coding standards, git workflow, and commit conventions.

## Architecture Overview
The public site and admin dashboard are two logical zones of a single React application, sharing the same design tokens and Supabase client but with separate route trees and layouts. See `ARCHITECTURE.md` for the full breakdown of data flow, authentication, and folder responsibilities.

## Documentation Guide
| Document | Covers |
|---|---|
| `PROJECT_CONTEXT.md` | Business context, vision, brand identity |
| `CLIENT_PROFILE.md` | Client details, goals, target audience |
| `PROJECT_SCOPE.md` | What is and isn't included |
| `ROADMAP.md` | Milestones and priorities |
| `ARCHITECTURE.md` | System architecture and data flow |
| `DATABASE.md` | Supabase schema and relationships |
| `CMS.md` | CMS features and content workflow |
| `API.md` | Data access patterns and Supabase client usage |
| `COMPONENT_GUIDE.md` | Component structure and conventions |
| `DESIGN_SYSTEM.md` | Visual design tokens and UI patterns |
| `SECURITY.md` | Auth, RLS, and security practices |
| `SEO.md` | SEO strategy and implementation |
| `TESTING.md` | QA and testing approach |
| `DEPLOYMENT.md` | Environments and release process |
| `CHANGELOG.md` | Version history |
| `TODO.md` | Master task list |
| `PAYMENTS.md` | Project cost and payment status |
| `TIMELINE.md` | Schedule and milestone tracking |
| `CHANGE_REQUESTS.md` | Scope change log |
| `MEETING_NOTES.md` | Meeting record |
| `BUSINESS_RULES.md` | Domain/business logic |
| `CLIENT_DECISIONS.md` | Decision log |
| `CONTENT_GUIDE.md` | Content writing rules |
| `ENVIRONMENT_SETUP.md` | Local dev setup |
| `CONTRIBUTING.md` | Coding standards and workflow |
| `HANDOVER.md` | Client handover checklist |
| `FUTURE_UPGRADES.md` | Deferred features backlog |

## Current Status
Active development. Core public site sections (Hero, About, Projects/Gallery-pattern components) and shared animation architecture are in progress; CMS and admin dashboard build-out follows the same phased approach used on prior client projects.

## Responsibilities
- **Developer (Orlando Dela Cruz):** Architecture, implementation, CMS build, deployment, documentation.
- **Client (Moments in Blooms):** Content supply, brand assets, timely revision feedback, final content approval.

## Implementation Notes
This documentation set is intended to be maintained alongside the codebase. Any structural or scope change should be reflected here in the same commit or pull request that introduces it.

## Checklist
- [x] Documentation system scaffolded
- [ ] `.env.example` committed with all required keys documented
- [ ] CI workflows validated against a real branch
- [ ] Handover checklist reviewed with client

## Future Improvements
- Add architecture diagrams (C4-style) once component boundaries stabilize.
- Add a `docs/adr/` folder for Architecture Decision Records if the project grows past the current scope.

## Related Documents
`PROJECT_CONTEXT.md`, `ARCHITECTURE.md`, `PROJECT_SCOPE.md`, `CONTRIBUTING.md`
