// Pure overflow predicates for the scrollable category row. Kept separate
// from the component so they are unit-testable — jsdom performs no layout,
// so scrollWidth/clientWidth can only be asserted through these functions.

/** Rounding/sub-pixel slack before an edge counts as overflowing or reached. */
export const OVERFLOW_TOLERANCE_PX = 4

/** True when the scroller's content extends beyond its visible width. */
export const isOverflowing = ({ scrollWidth = 0, clientWidth = 0 } = {}) =>
  scrollWidth - clientWidth > OVERFLOW_TOLERANCE_PX

/** True when the scroller sits at (or past) its trailing edge. */
export const isAtEnd = ({ scrollLeft = 0, scrollWidth = 0, clientWidth = 0 } = {}) =>
  scrollLeft + clientWidth >= scrollWidth - OVERFLOW_TOLERANCE_PX

/**
 * Whether the "scroll for more" hint should show: there is hidden content
 * ahead and the user has not reached it yet.
 */
export const shouldShowScrollHint = (metrics = {}) =>
  isOverflowing(metrics) && !isAtEnd(metrics)
