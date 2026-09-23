# Plan: Bottom category nav must actually scroll to the selected category

## Root cause (investigated)

In `src/pages/public/Services/ServiceCollectionsShowcase/index.jsx:168-186`, the bottom-nav
handler pre-schedules the `scrollIntoView` via `requestAnimationFrame` + `setTimeout(0)` right
after `setSearchParams`. React Router processes the navigation state update as a transition, so
the re-render (and the panel-swap commit) can happen AFTER the scheduled callback fires. At
that moment `#collection-panel-{nextId}` is still `hidden` (`display: none`), and
`scrollIntoView` on a hidden element does nothing. The swap then commits afterwards — no
scroll, page stays put at the bottom.

## Change (single file: `ServiceCollectionsShowcase/index.jsx`)

Move the scroll execution to the effect that already runs after the commit
(deep-link effect at lines ~132-151, which is guaranteed post-commit and runs after panels are
un-hidden), driven by ref-based intent:

1. Add `const pendingBottomScrollRef = useRef(null);` beside `isLocalSelectionRef` (line ~130).
2. Rewrite `handleSelectCollectionFromBottomNav`:
   - If `nextId === requestedCollectionId` (already-active tab): the URL won't change, so the
     effect won't re-run — schedule the panel `scrollIntoView` directly in the handler
     (same `rAF + setTimeout` pattern).
   - Else: `pendingBottomScrollRef.current = nextId; handleSelectCollection(nextId);` — no
     pre-scheduled scroll in the handler.
   - Drop the leftover duplicate reduce-motion/setup in the handler otherwise.
3. In the effect's local-selection branch (lines 134-138):
   - After consuming `isLocalSelectionRef`, read and clear
     `pendingBottomScrollRef.current`; if it equals `requestedCollectionId`, `scrollIntoView`
     the `collection-panel-{id}` element with the existing
     `reduceMotion ? "auto" : "smooth"`, `block: "start"` logic (same
     `requestAnimationFrame` + `setTimeout(…, 0)` scheduling as the deep-link branch).
4. Guard consumption order/behavior unchanged; top nav handler untouched; no CollectionSelector changes.

## Verification

- `npm run lint`, `npm run test`.
- Manual on `/services`: clicking each bottom tab (including the already-active one) smoothly
  scrolls to that category's hero at panel top; reduced-motion = instant jump; top-nav clicks,
  keyboard arrows, deep links (`/services?collection=…`) and footer/home links unchanged.
