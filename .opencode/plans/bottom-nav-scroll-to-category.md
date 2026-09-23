# Plan: Bottom category nav should scroll to the newly selected category's top

## Context

After the previous fix, clicking a category in the bottom `CollectionSelector` keeps the
viewport pinned at the bottom nav while the panels swap (scroll-anchoring wrapper
`handleSelectCollectionFromBottomNav` in
`src/pages/public/Services/ServiceCollectionsShowcase/index.jsx:164-193`). User now wants an
intentional scroll after the click: land at the start of the newly selected category's content
(its `CollectionPanel` hero), just below the top nav.

## Implementation (single file)

`src/pages/public/Services/ServiceCollectionsShowcase/index.jsx`

Replace the delta-anchoring logic in `handleSelectCollectionFromBottomNav` with a
`scrollIntoView` on the newly active panel:

1. Keep the handler shape, but drop `bottomNavRef`/getBoundingClientRect/`scrollBy` logic.
2. After `handleSelectCollection(nextId)` (URL update + local-selection guard unchanged),
   schedule (same `requestAnimationFrame` + `setTimeout(…, 0)` pattern as the deep-link
   effect at lines ~132-151):
   `document.getElementById(`collection-panel-${nextId}`)?.
     scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })`
   with `reduceMotion` from `window.matchMedia("(prefers-reduced-motion: reduce)")`,
   mirroring the existing deep-link effect.
3. Remove `bottomNavRef` and the `ref` on `S.BottomCollectionNav` (no longer needed).

Why this is safe: panel ids (`collection-panel-{id}`) exist for the full category map, the
element is mounted (just hidden) before the swap, `handleSelectCollection`'s guard still
prevents the deep-link effect from double-scrolling, and the top nav's handler is untouched.

## Verification

- `npm run lint`, `npm run test` (114 tests should pass).
- Manual on `/services`: click each bottom tab → page smooth-scrolls to the selected
  category's hero; top-nav clicks/deep-links/footer links behave as before; reduced-motion
  gives an instant jump; keyboard arrow navigation works.
