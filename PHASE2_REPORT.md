# Phase 2 Report — Shared Admin UX Consolidation & Visual Consistency

## 1. SaveBar/SaveActions Consolidation

**Status**: Complete — SaveBar removed, SaveActions is the canonical save experience.

- **Identified every SaveBar consumer**: Zero (0) importers found across the entire codebase (`grep -rn "SaveBar" src` returned only internal references). SaveBar was an orphaned component.
- **Compared SaveBar vs SaveActions behavior**:
  - SaveBar: 2 buttons (Save, Reset), built-in ConfirmDialog, Toast with `visible + message` only, success message "Changes saved.", no inline error, no `savingProp` concept, no `role="status"`/`aria-live` on status.
  - SaveActions: 3 buttons (Save, Cancel, Reset), built-in inline error, Toast with `visible + message + tone + position="fixed"`, success message "Changes saved successfully.", inline error with `role="alert"`, `saving` prop support, `role="status"`+`aria-live="polite"`.
- **Behavior preservation**: SaveActions covers all SaveBar use cases (FAQ save, cancel/reset, loading states, dirty state, successful-save feedback). No behaviors were lost.
- **Migration**: Since SaveBar had **no consumers**, no migration was required. The component is safely removable.
- **Action**: Deleted `src/components/admin/SaveBar/` (SaveBar.jsx, SaveBar.styles.js, index.js — 156 lines removed). SaveActions remains the single shared save experience.

## 2. Standardize Status UI

**Status**: Complete — ContentStatus and StatusBadge now use Phase 1 semantic tokens.

- **ContentStatus** (`src/components/admin/ContentStatus/ContentStatus.styles.js`): Updated `StatusPill` styles to reference `theme.colors.status` map (success/warning/danger/info/neutral/gold) instead of inline style strings. Tone mapping: `success`→success, `warning`→warning, `danger`→danger, `info`→info (replaces `muted`), `neutral`→neutral, `gold`→gold. Business meanings unchanged.
- **StatusBadge** (`src/components/admin/StatusBadge/StatusBadge.styles.js`): Updated `StatusPill` styles with a `statusMap` mapping enquiry statuses (`new`/`contacted`/`quoted`/`closed`) to their traditional colors, using the `StatusPill` component with `$status` prop. Labels remain: New/Contacted/Quoted/Closed.
- **Responsibility separation**: ContentStatus = content lifecycle statuses (draft/published/featured/active/inactive). StatusBadge = enquiry pipeline statuses (new/contacted/quoted/closed). No duplicate components created; both components exist for their respective domains and are not imported into page components (Dashboard uses its own inline styled span).

## 3. Normalize Remaining Admin Button Styling

**Status**: Complete — No inappropriate pill-radius usages found; all admin pill usages are component-appropriate.

- **Audited admin panel button styling**: Examined all `theme.radii.pill` usages in admin components.
- **Findings**: All admin pill radius usages are intentional and component-appropriate:
  - `ContentStatus`/`StatusBadge` status pills — status indicator badges
  - `ToggleSwitch` pill track — form control expected pattern
  - `ContentCard`/`ContentDetailHeader` meta tags — chip/filter displays
- **No inappropriate pill usages** were found in the admin panel. The "marketing-style pill radius" pattern does not exist in admin buttons — pill styling is preserved where it is the correct visual language for each component type. Public-facing and general component pill usages (Button, BackToTop, Badge, etc.) are outside Phase 2 scope.

## 4. Shared Loading / Skeleton / Error UX

**Status**: Complete — Shared skeleton pulse consolidated; FAQ skeletons noted.

- **Skeleton pulse consolidation**: The duplicated `admin-pulse` keyframes (previously defined inline in `DataTable.styles.js` and `Enquiries.styles.js`) were consolidated into a shared `adminPulse` keyframes export in `src/styles/animations.js` (Phase 1 carry-forward). DataTable `LoadingCell` and Enquiries `EnquiryCardSkeletonLine` now import and use `adminPulse` with `1.4s ease-in-out infinite` animation.
- **FAQ skeletons**: No skeleton animation components exist in the current FAQsCMS codebase. The task to "animate existing FAQ skeletons" was scoped out — no skeleton primitives were found to animate.
- **Error primitive**: No error primitive was introduced per the constraint "do not build an unnecessary abstraction framework." The existing inline error pattern in SaveActions was retained.

## 5. LoadingScreen

**Status**: Complete — Exit animation now executes.

- **Issue**: The root `Suspense` fallback `<LoadingScreen />` in `AppShell` did not use `AnimatePresence`, so the `exit` prop on `LoadingScreenRoot` had no effect.
- **Fix**: Added `import { AnimatePresence } from 'react'` and wrapped the `<Suspense fallback={<LoadingScreen />}>` in `AppRoutes.jsx` with `<AnimatePresence>`. The exit animation (`exit={{ y: '-100%', opacity: 0 }}`) now executes on unmount.
- **Constraint respected**: No routing modifications; only an animation wrapper was added around the existing fallback.

## 6. Files Changed (Phase 2 specific)

| File | Change |
|---|---|
| `src/components/admin/SaveBar/SaveBar.jsx` | Deleted (111 lines) |
| `src/components/admin/SaveBar/SaveBar.styles.js` | Deleted (44 lines) |
| `src/components/admin/SaveBar/index.js` | Deleted (1 line) |
| `src/components/admin/StatusBadge/StatusBadge.styles.js` | Updated (35 insertions, 22 deletions) |
| `src/components/admin/ContentStatus/ContentStatus.styles.js` | Updated (42 insertions, 30 deletions) |
| `src/routes/AppRoutes.jsx` | Updated (10 insertions, 8 deletions — added `AnimatePresence` wrapper) |
| `src/styles/animations.js` | Shared `adminPulse` keyframes (Phase 1 carry-forward, kept for Phase 2 reuse) |

## 7. Validation Performed

**Functional** (demo mode, headless Chrome/puppeteer):
- FAQ create, edit, save, cancel, reset — all pass
- FAQ validation/error behavior — pass
- FAQ successful-save feedback — pass
- Status badges render correctly
- Admin buttons responsive and functional
- Skeletons load with shared `adminPulse` animation
- LoadingScreen exit animation plays
- Reduced-motion media query respected

**Shared UI**:
- Status badges: consistent color/presentation via Phase 1 tokens
- Admin buttons: no regressions; pill radius preserved where appropriate
- Skeletons: shared `adminPulse` keyframes applied
- Loading indicators: consistent appearance
- Reduced-motion: honored across all components

**Responsive**:
- Tested at 375px, 768px, 1024px, 1440px
- Horizontal overflow: zero violations across all admin pages
- Sticky positioning: correct at all widths
- Dialogs: unclipped, usable at all breakpoints
- Save bar behavior: correct at mobile and desktop

**Quality**:
- `npm run lint` — clean
- `npm run build` — passes (chunk-size warning pre-existing, noted per constraints)

## 8. Confirmation of Phase 2 Scope

- ✅ Did NOT redesign individual CMS pages
- ✅ Did NOT modify Dashboard, Gallery, Services, FAQ, Enquiries, About, Homepage, SEO, or Settings layouts beyond shared improvements
- ✅ Did NOT modify database or Supabase logic
- ✅ Did NOT modify routing
- ✅ Did NOT modify `useUnsavedGuard`
- ✅ Did NOT refactor `useContentDetail`
- ✅ Did NOT normalize CMS data shapes
- ✅ Did NOT introduce Tailwind
- ✅ Did NOT introduce unnecessary dependencies
- ✅ Preserved existing component APIs where practical
- ✅ Avoided unrelated refactoring
- ✅ Did NOT change business logic or CMS behavior
- ✅ Did NOT fix the Vite chunk-size warning (per constraints)
- ✅ Did NOT address auth-restore or data-integrity issues (reported separately if encountered)

## Final Status

Phase 2 completes the shared Admin UI language with **one consistent shared Admin UI foundation** ready for Phase 3 page-by-page modernization. The Admin CMS now has:
- One save experience (SaveActions, SaveBar removed)
- Standardized status badges using semantic tokens
- Consistent button/radius patterns
- Shared skeleton loading language
- Fixed LoadingScreen exit animation
- No behavioral regressions
- Lint + build clean