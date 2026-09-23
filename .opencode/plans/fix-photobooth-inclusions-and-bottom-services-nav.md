# Plan: Fix photobooth inclusions input bug + add bottom Services category navigation

## Root causes found

### 1. Inclusions input: one character per click
- Editor: `PackageListsSection` in `src/pages/admin/ServicesCMS/ServiceItemDetail.jsx:758-972`
  (edits inclusions/add-ons via `Modal` + `TextField`).
- Cause: `src/components/admin/Modal/Modal.jsx:11-50` — focus-management `useEffect` deps
  are `[open, onClose]`. The parent passes an inline `closeModal` (new identity each render),
  so each keystroke re-render runs cleanup → `previousActive.focus()`, then re-runs effect →
  `closeRef.current?.focus()` steals focus to the ✕ button. No remount / key change; the
  input itself is fine. Affects every admin modal with an inline `onClose`.

### 2. Bottom category nav
- Top nav is the shared `CollectionSelector`
  (`src/components/CollectionSelector/CollectionSelector.jsx`); selection state is the URL
  (`?collection=`) in `ServiceCollectionsShowcase/index.jsx`, so a second instance stays in
  sync automatically.
- `idPrefix` does double duty: must be unique per instance (framer-motion `layoutId`,
  line 124) but also builds `aria-controls` which must match real panel ids
  (`collection-panel-{id}`).

## Changes

1. `src/components/admin/Modal/Modal.jsx`
   - Add `onCloseRef` kept up to date each render; Escape handler calls `onCloseRef.current?.()`.
   - Narrow effect deps to `[open]`. Cleanups (focus restore, scroll lock) only run on
     open/close transitions; typing keeps focus. No behavior change otherwise.

2. `src/components/CollectionSelector/CollectionSelector.jsx`
   - Add optional `panelIdPrefix` prop (defaults to `idPrefix`) used only for `aria-controls`.

3. `src/pages/public/Services/ServiceCollectionsShowcase/index.jsx`
   - After the `CollectionPanel` map (line ~247), render a second `<CollectionSelector>`
     with `idPrefix="collection-bottom"`, `panelIdPrefix="collection"`,
     `ariaLabel="Service Collections (bottom)"`, same `categories`/`activeId`/`onSelect`.
   - Existing `isLocalSelectionRef` / `scrolledForRef` guards prevent scroll yank on click.
   - Responsive layout comes from existing `CollectionSelector.styles.js` (stacked under tablet).

## Verification
- `npm run test`, `npm run lint`.
- Manual: type continuously in Add/Edit inclusion modal (no focus loss); add/edit/remove
  inclusions work; top and bottom navs switch categories in sync; desktop + mobile layout.
