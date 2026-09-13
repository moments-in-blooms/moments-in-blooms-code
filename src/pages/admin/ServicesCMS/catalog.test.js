import { describe, expect, it } from 'vitest'
import { createItemDraft, validateCategory } from './catalog.js'

const luxeCategory = { id: 'luxe-photobooth', slug: 'luxe-photobooth', title: 'Luxe Photobooth' }
const decorCategory = { id: 'decor-hire', slug: 'decor-hire', title: 'Decor Hire' }

describe('validateCategory', () => {
  it('requires a title', () => {
    const errors = validateCategory({ id: 'x', slug: 'x', title: '  ' }, [])

    expect(errors.title).toBe('A category title is required.')
  })

  it('rejects a title already used by another category', () => {
    const errors = validateCategory(
      { id: 'category-1', slug: 'another-booth', title: 'Luxe Photobooth' },
      [luxeCategory, decorCategory],
    )

    expect(errors.title).toBe('A category with this title already exists.')
  })

  it('rejects a duplicate title regardless of case and surrounding spaces', () => {
    const errors = validateCategory(
      { id: 'category-2', slug: 'booth-two', title: '  LUXE photobooth ' },
      [luxeCategory],
    )

    expect(errors.title).toBe('A category with this title already exists.')
  })

  it('allows a category to keep its own title when editing', () => {
    const errors = validateCategory(
      { id: 'luxe-photobooth', slug: 'luxe-photobooth', title: 'Luxe Photobooth' },
      [luxeCategory, decorCategory],
    )

    expect(errors.title).toBeUndefined()
  })

  it('allows a unique title', () => {
    const errors = validateCategory(
      { id: 'category-3', slug: 'floral-styling', title: 'Floral Styling' },
      [luxeCategory, decorCategory],
    )

    expect(errors).toEqual({})
  })
})

describe('createItemDraft', () => {
  it('defaults new decor items to featured so they appear on the public catalogue', () => {
    expect(createItemDraft('decor').isFeatured).toBe(true)
  })

  it('defaults new prize items to featured so they appear on the public grid', () => {
    expect(createItemDraft('prize').isFeatured).toBe(true)
  })

  it('keeps new packages unbadged by default', () => {
    expect(createItemDraft('package').popular).toBe(false)
  })
})
