import { describe, expect, it } from 'vitest'
import { isAtEnd, isOverflowing, shouldShowScrollHint } from './scrollHints.js'

describe('scroll hint predicates', () => {
  it('detects overflow when content exceeds the visible width', () => {
    expect(isOverflowing({ scrollWidth: 900, clientWidth: 600 })).toBe(true)
    expect(isOverflowing({ scrollWidth: 600, clientWidth: 600 })).toBe(false)
    expect(isOverflowing({ scrollWidth: 603, clientWidth: 600 })).toBe(false)
  })

  it('detects the trailing edge with tolerance', () => {
    expect(isAtEnd({ scrollLeft: 300, scrollWidth: 900, clientWidth: 600 })).toBe(true)
    expect(isAtEnd({ scrollLeft: 100, scrollWidth: 900, clientWidth: 600 })).toBe(false)
    expect(isAtEnd({ scrollLeft: 297, scrollWidth: 900, clientWidth: 600 })).toBe(true)
  })

  it('shows the hint only while there is more to see', () => {
    expect(
      shouldShowScrollHint({ scrollLeft: 0, scrollWidth: 900, clientWidth: 600 }),
    ).toBe(true)
    expect(
      shouldShowScrollHint({ scrollLeft: 300, scrollWidth: 900, clientWidth: 600 }),
    ).toBe(false)
    expect(
      shouldShowScrollHint({ scrollLeft: 0, scrollWidth: 600, clientWidth: 600 }),
    ).toBe(false)
  })
})
