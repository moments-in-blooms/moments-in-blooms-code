# Design System

## Purpose
To centralize every visual design decision (color, type, spacing, motion) in one referenced source of truth, so the UI stays consistent as more sections and admin screens are built.

## Overview
The design system reflects Moments in Blooms' luxury, editorial brand positioning: soft neutrals, generous whitespace, refined serif/sans pairing, and restrained, purposeful motion. All tokens live in `src/styles/theme.js` and are consumed via Styled Components' `ThemeProvider` — no hardcoded hex values or pixel spacing in component styles.

## Current Status
Core tokens defined and applied to the sections built so far (Hero, About, Gallery-pattern); full token set to be finalized as remaining sections and the admin dashboard are built.

## Responsibilities

**Colors**
| Token | Value | Usage |
|---|---|---|
| `primary` | Warm gold/brass tone | Primary buttons, accents, active states |
| `primaryDark` | Deeper brass | Hover states, headings on light backgrounds |
| `secondary` | Soft cream | Section backgrounds, cards |
| `ink` | Near-black warm gray | Body text |
| `muted` | Mid gray | Secondary/meta text |
| `line` | Soft warm gray | Borders, dividers |

*(Exact hex values are finalized in `src/styles/theme.js` and should be pulled from there, not this document, to avoid drift.)*

**Typography**
- Headings: a refined serif (editorial feel, consistent with the luxury brand), reserved for section titles and hero copy.
- Body: a clean, highly legible sans-serif for paragraph copy, forms, and UI chrome.
- Type scale is defined in `rem` units in `theme.js`, with distinct scales for mobile and desktop where hero/heading sizes need to step down.

**Spacing**
- 8px-based spacing scale (`4, 8, 16, 24, 32, 48, 64, 96`), exposed as theme tokens (`theme.spacing.sm`, `.md`, `.lg`, etc.) rather than raw pixel values in components.

**Container Width**
- Max content width capped (desktop) with fluid padding on smaller viewports; defined once in a shared `Container` styled primitive rather than repeated per section.

**Border Radius**
- Consistent small-to-medium radius scale for cards, buttons, and modals — sharp enough to feel modern, soft enough to stay elegant (no fully squared or fully pill-shaped defaults).

**Shadows**
- Subtle, low-opacity shadows for elevation (cards, modals) — never heavy drop shadows, consistent with the minimalist brand direction.

**Buttons**
- Variants: `primary` (solid brass), `outline` (bordered, transparent fill), `danger` (admin destructive actions), `success` (admin confirmations).
- Sizes: `sm`, `md`, `lg`.
- Consistent hover/focus/disabled states defined once in the shared `Button` component.

**Forms**
- Consistent input, label, and validation-error styling shared across the public Contact form and all admin CRUD forms, so the two never visually diverge.

**Cards**
- Shared card primitive used for Gallery items, Service listings, and FAQ entries, with slot-based content (image optional, heading, body, meta).

**Animation**
- Framer Motion variants centralized in `src/animations/`: fade-in-up on scroll for section entrances, staggered children for lists/grids, subtle hover lift for interactive cards.
- Motion duration and easing values are shared constants, not redefined per component, so the feel of "unhurried elegance" is consistent site-wide.

**Icons**
- React Icons, used sparingly and consistently sized, matching the minimalist direction (icons support content, they don't decorate for its own sake).

**Accessibility**
- Color contrast checked against WCAG AA for all text/background combinations, including the gold-on-cream palette which needs particular attention given its lower natural contrast.
- All interactive elements are keyboard-navigable and carry visible focus states.
- Images (gallery, hero) require meaningful `alt` text, sourced from CMS-entered captions where available.

**Responsive Design**
- Breakpoints: mobile `576px`, tablet `1024px` (consistent with prior client project conventions), desktop above that.
- Mobile-first base styles, with `min-width` media queries layering in tablet/desktop refinements.

## Implementation Notes
Any new color, spacing value, or type size introduced during development should be added to `theme.js` first and referenced from there — never introduced inline "just this once," which is how design systems drift.

## Checklist
- [x] Color and spacing tokens defined
- [x] Typography scale defined
- [ ] Full `Button` variant/size matrix implemented
- [ ] Form component styling finalized
- [ ] Accessibility contrast check completed across full palette

## Future Improvements
A dark-mode token set is not currently planned (not brand-appropriate for this client) but the token architecture (theme object + ThemeProvider) would support it later if ever requested.

## Related Documents
`COMPONENT_GUIDE.md`, `CONTENT_GUIDE.md`
