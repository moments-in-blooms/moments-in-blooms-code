import { describe, expect, it } from 'vitest'
import { findServiceOverride } from './homepageCards.js'

const luxeCategory = { id: 'luxe-photobooth', title: 'Luxe Photobooth' }
const decorCategory = { id: 'decor-hire', title: 'Decor Hire' }

describe('findServiceOverride', () => {
  it('finds an override linked by collectionId', () => {
    const overrides = [
      { id: 'service-1', collectionId: 'decor-hire', title: 'Decor' },
      { id: 'service-2', collectionId: 'luxe-photobooth', title: 'Booth' },
    ]

    expect(findServiceOverride(overrides, [luxeCategory, decorCategory], luxeCategory)).toMatchObject({
      id: 'service-2',
    })
  })

  it('finds an unlinked override whose title matches the category', () => {
    const overrides = [
      { id: 'service-1', collectionId: '', title: '  LUXE photobooth ' },
    ]

    expect(findServiceOverride(overrides, [luxeCategory], luxeCategory)).toMatchObject({
      id: 'service-1',
    })
  })

  it('prefers the id-linked override over a title match', () => {
    const overrides = [
      { id: 'service-1', collectionId: '', title: 'Luxe Photobooth' },
      { id: 'service-2', collectionId: 'luxe-photobooth', title: 'Other copy' },
    ]

    expect(findServiceOverride(overrides, [luxeCategory], luxeCategory)).toMatchObject({
      id: 'service-2',
    })
  })

  it('returns null when nothing matches', () => {
    const overrides = [{ id: 'service-1', collectionId: '', title: 'Unrelated' }]

    expect(findServiceOverride(overrides, [luxeCategory], luxeCategory)).toBeNull()
  })

  it('ignores overrides already linked to a different category', () => {
    const overrides = [{ id: 'service-1', collectionId: 'decor-hire', title: 'Luxe Photobooth' }]

    expect(findServiceOverride(overrides, [luxeCategory, decorCategory], luxeCategory)).toBeNull()
  })
})
