# Plan: Stop bottom category nav from scrolling to the top

## Root cause (investigated, refuted JS-yank theory)

- The deep-link `scrollIntoView` effect in
  `src/pages/public/Services/ServiceCollectionsShowcase/index.jsx:132-151` is NOT the cause —
  its `isLocalSelectionRef` guard correctly consumes in-page tab clicks, and the handler is
  shared by both navs, so a guard misfire would also yank on top-nav clicks (not reported).
- Actual mechanism: top nav + all (hidden/visible) `CollectionPanel`s + bottom nav live in one
  section. A bottom-nav click swaps the panel content ABOVE the viewport for a panel of a
  different height (plus the `collection-panel-in` entry animation and lazy images). The
  removed panel is the scroll anchor, so the numeric scroll offset is kept while the document
  above shrinks/grows — the same offset maps to a much higher position, clamping near the
  section start = the "jump back to the top category nav". Top-nav clicks change content below
  the viewport, so this never happens there.

## Change (stay-at-bottom-nav behavior, confirmed with user)

Single file: `src/pages/public/Services/ServiceCollectionsShowcase/index.jsx`
(no changes to CollectionSelector, guards, or panel/aria wiring)

1. `const bottomNavRef = useRef(null)` — attach to the existing `S.BottomCollectionNav` wrapper.
2. New `handleSelectCollectionFromBottomNav` (useCallback, deps `[collectionIds, handleSelectCollection]`):
   - Guard `!collectionIds.has(nextId)` (no-ops if CollectionSelector's own check ever changed).
   - Measure `bottomNavRef.current.getBoundingClientRect().top` synchronously BEFORE the swap.
   - Call existing `handleSelectCollection(nextId)` (URL update + `isLocalSelectionRef` guard unchanged).
   - After the swap commits, re-measure the nav's top and `window.scrollBy({ top: delta })`
     (`behavior: "auto"` = instant; follows the existing `rAF + setTimeout` scheduling style
     used by the deep-link effect). Delta = newTop - oldTop; 0 delta costs nothing.
3. Pass `onSelect={handleSelectCollectionFromBottomNav}` to the bottom `CollectionSelector`
   only; top nav keeps `handleSelectCollection`.

## Verification

- `npm run lint`, `npm run test` (114 tests).
- Manual on `/services`: click every bottom tab — page must not move upward; top nav still
  deep-links/scrolls as before; keyboard arrows on both navs fine; mobile stacked layout ok.
