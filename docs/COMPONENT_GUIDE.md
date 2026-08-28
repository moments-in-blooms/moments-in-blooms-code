# Component Guide

## Purpose
To keep the component structure consistent and predictable across the (growing) codebase, so any file's location and shape can be guessed correctly before even opening it.

## Overview
Components follow a strict 4-file pattern established across prior client projects and reused here: `Component.jsx`, `Component.styled.js`, `index.js`, plus an optional data/hook file when a component needs local logic or static data separated from markup.

## Current Status
Pattern applied to Hero, About, and Projects/Gallery-pattern sections and the shared UI primitives; remaining public sections and all admin components follow the same structure as they're built.

## Responsibilities

**Component Hierarchy**
```
src/components/
├── ui/                  # Design-system primitives, used by both public and admin
│   ├── Button/
│   ├── Modal/
│   └── SectionTitle/
├── public/              # Public site sections, one folder per page section
│   ├── Hero/
│   ├── About/
│   ├── Services/
│   ├── Gallery/
│   ├── FAQs/
│   └── Contact/
└── admin/               # Admin dashboard components
    ├── AdminLayout/
    ├── SideBar/
    ├── TopBar/
    ├── Dashboard/
    ├── Services/
    ├── Gallery/
    ├── FAQs/
    └── Enquiries/
```

**Folder Structure (per component)**
```
ComponentName/
├── ComponentName.jsx          # markup + logic
├── ComponentName.styled.js    # styled-components definitions
├── ComponentName.data.js      # optional: static data
├── useComponentName.js        # optional: extracted hook logic
└── index.js                   # barrel export
```

**Naming**
- Components: `PascalCase`, matching their folder name exactly.
- Styled files: `ComponentName.styled.js`, exporting `PascalCase` styled elements (e.g., `Wrapper`, `Title`, `CardGrid`).
- Hooks: `useComponentName.js` or `useFeatureName.js`, always prefixed `use`.
- Barrel exports: every component folder has an `index.js` re-exporting the default, so imports read `from "components/public/Hero"`, never reaching into the internal filename.

**Composition**
- Page-level components (`src/pages/`) compose section components; they contain no styling of their own beyond layout wrapping.
- Section components (`src/components/public/*`) own their own styling and internal layout, and accept minimal props — content comes from Supabase via a service/hook, not prop-drilled from the page.

**Reusable Components**
- `Button` — variants: `primary`, `outline`, `danger`, `success`; sizes: `sm`, `md`, `lg`.
- `SectionTitle` — props: `eyebrow`, `headingStart`, `headingAccent`, `id` (for anchor/scroll-to navigation).
- `Modal` — used for both public (e.g., branch/location details) and admin (e.g., add/edit forms) contexts, with a shared base and context-specific content passed as children.

**Shared Components**
- `Header` — banner + navbar + mobile drawer, driven by a `useHeader` hook for scroll/open-state behavior; used only on the public site.
- Animation variants under `src/animations/` — shared Framer Motion configs (fade/slide/stagger patterns) imported by section components rather than redefined per component.

## Implementation Notes
Admin and public components do not share business logic directly, even when visually similar (e.g., a "card" pattern in both Gallery and the admin Gallery list) — each owns its own presentation, while any genuinely shared logic (formatting, validation) is extracted to `src/utils/`.

## Checklist
- [x] 4-file pattern applied to Hero, About, and Gallery-pattern sections
- [x] Shared animation architecture established
- [ ] `ui/` primitives (`Button`, `Modal`, `SectionTitle`) fully implemented and documented
- [ ] Admin component set scaffolded following the same pattern

## Future Improvements
Consider a lightweight Storybook (or similar) setup once the `ui/` primitive set stabilizes, to give the client-facing team a visual reference without reading component code.

## Related Documents
`DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`
