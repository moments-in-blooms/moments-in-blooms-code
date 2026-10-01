# Plan: Inclusions input fix, inclusions list, Instagram links

## Investigation findings (confirmed)

### 1. Inclusions input loses focus
- The only admined inclusions input is `PackageListsSection` in
  `src/pages/admin/ServicesCMS/ServiceItemDetail.jsx` (package items): a `Modal`
  + `TextField`.
- Root cause (fixed in commit `a674f66`, only on `develop`): `Modal`'s focus
  effect had deps `[open, onClose]`. The parent passes an inline `closeModal`,
  so every keystroke re-render tore the effect down (`previousActive.focus()`)
  and re-ran it (`closeRef.focus()`), pulling focus to the ✕ button after each
  character. Current `develop` Modal depends only on `[open]` — the steal is
  gone. `main` (production branch) and `release/v1.2` still have the old Modal.
- No other focus-stealing path exists in the inclusions flow (checked
  `Repeater`, `FormField`, `ContentFormSection`, `ServiceItemDetail` re-renders).
- User reports it still reproduces → plan adds a regression test to prove/locate
  it and a verification step (see Validation).

### 2. Inclusions as a vertical list (standard/decor items)
- Luxe packages already store `inclusions: string[]` and render a vertical
  check-list (`LuxePhotoboothShowcase` → `HighlightList`). No change needed.
- Standard/decor items (e.g. `Floral Atelier | Flower Bar`, category
  `collection-1789049527773`) have **no inclusions field**; live data has the
  inclusions typed into the item `description`, so the public card/modal shows a
  paragraph. Need a CMS list field + vertical list rendering.
- Normalization is safe: `normalizeFeaturedItem` spreads unknown fields, so a new
  `inclusions` array survives save/load; `upsertItem` stores the whole draft.

### 3/4. Instagram links
- There is **no Instagram gallery on the Services page**. Instagram galleries:
  - Homepage strip (`Home/InstagramPreview`): links use `profileUrl` which
    defaults to `https://www.instagram.com` (wrong account). Confirmed.
  - Gallery page "follow-us" grid (`Gallery/components/InstagramPreview`): posts
    are `motion.div`s with **no link at all**. Confirmed.
- The official account URL is the target for both:
  `https://www.instagram.com/momentsinblooms/`.

---

## Changes

### A. Admin — standard/decor item inclusions field
1. `src/pages/admin/ServicesCMS/catalog.js` — `createItemDraft` decor branch:
   add `inclusions: []` (package branch already has it).
2. `src/pages/admin/ServicesCMS/itemForms.jsx` — export the existing
   `StringsRepeater` (currently a module-local const) so it can be reused.
3. `src/pages/admin/ServicesCMS/ServiceItemDetail.jsx`:
   - import `StringsRepeater`.
   - in `DecorItemForm`, add an "Inclusions" editor inside the Item details
     `ContentFormSection` (after Description):
     `items={draft?.inclusions ?? []}`, `onChange={(inclusions) => patch({ ...draft, inclusions })}`,
     `addLabel="Add inclusion"`, label `Inclusion`, placeholder from the feature.
   - Reuses the existing add/remove/move/edit UI pattern — no new component.

### B. Public — render inclusions vertically (decor items)
4. `src/pages/public/Services/ServiceCollectionsShowcase/DecorHireCatalogue/DecorHireCatalogue.jsx`:
   add a small `InclusionsList` renderer (title + `<ul>` of `<li>` with a check
   icon), reading `item.inclusions`; insert it after the description in the
   `FeaturedItemBlock` layouts (options / gallery / image / fallbacks) via a
   single shared node so no duplication.
5. `.../DecorHireCatalogue.styles.js`: add `InclusionsBlock` / `InclusionsTitle`
   / `InclusionsList` styles mirroring the Luxe `HighlightList` (vertical flex,
   gold check, theme tokens).
6. `src/pages/public/Services/ServiceCollectionsShowcase/itemDetail.js` —
   `toDecorFeatureDetail`: change `items: []` to
   `items: Array.isArray(item?.inclusions) ? item.inclusions : []` so the detail
   modal also shows them as the existing vertical list.
7. `.../ItemDetailModal/ItemDetailModal.jsx` (small): optional `itemsIcon` prop
   (`'gift'` default → `FiGift`, `'check'` → `FiCheck`) so decor inclusions use
   check marks; `toDecorFeatureDetail` passes/consumes the existing default
   otherwise. Existing Blissful Nest modal behavior unchanged.

No migration/parsing of the old description text: after deploy the client
re-enters the existing inclusions in the new field and clears the old
"Inclusions:" block from the description (manual CMS edit). Nothing is
hardcoded; public rendering reads CMS data only.

### C. Instagram destinations
8. `src/constants/navigation.js` — add
   `export const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/momentsinblooms/'`
   (leave `footerSocialLinks` untouched — it is a DM link).
9. New `src/utils/social.js`:
   `buildInstagramProfileUrl(handle)` → strips leading `@`, returns
   `https://www.instagram.com/<handle>/`, or `INSTAGRAM_PROFILE_URL` when blank.
   Add `src/utils/social.test.js` covering handle/@handle/blank.
10. `src/pages/public/Home/Home.jsx` — pass
    `profileUrl={buildInstagramProfileUrl(values.instagramHeading?.handle)}` to
    `InstagramPreview` (CMS handle drives it; fallback = official URL).
    The images and the Follow CTA already use this one prop.
11. `src/pages/public/Gallery/Gallery.jsx` — pass
    `profileUrl={INSTAGRAM_PROFILE_URL}` to the Gallery `InstagramPreview`.
12. `src/pages/public/Gallery/components/InstagramPreview/InstagramPreview.jsx`
    + `.styles.js` — make `InstagramPost` a link: `styled(motion.a)`
    (`display:block; color:inherit; text-decoration:none`), `href={profileUrl}`,
    `target="_blank" rel="noreferrer"`, descriptive `aria-label`. Hover/overlay
    behavior preserved.

### D. Regression test (issue 1)
13. `src/pages/admin/ServicesCMS/ServiceItemDetail.test.jsx` — new test: render
    `/admin/services/items/signature-package` (package item, seed catalog is
    already mocked), click "Add inclusion", focus the Inclusion input, fire
    several `change` events, assert `document.activeElement === input` after
    each and the value accumulates. This fails on the old `[open, onClose]`
    Modal and passes on the current one.

---

## Validation

- `npm run lint`, `npm run test` (existing 17 files + new tests).
- Manual (dev, port 3000):
  - Admin → Luxe item → Add/Edit/Remove inclusion: type continuously, no focus
    loss; add/edit/remove/move still work.
  - Admin → standard/decor item (Floral Atelier) → Inclusions editor
    add/remove/reorder; save; reload → persists.
  - Public `/services?collection=collection-1789049527773` (and an item with
    options/gallery/image) → inclusions render as a vertical list; item modal
    shows them too; mobile layout stacks correctly.
  - Public `/gallery` → every Instagram photo opens
    `https://www.instagram.com/momentsinblooms/` in a new tab (desktop + mobile).
  - Public `/` → Instagram strip photos and Follow CTA open the same account.
- If the inclusions focus test passes but the reporter still sees the bug:
  the running app is a stale bundle (production PWA cache / `main` branch lacks
  commit `a674f66`). Rebuild/hard-refresh; release the fix to `main` per the
  normal PR flow.
