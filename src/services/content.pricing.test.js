import { describe, expect, it } from 'vitest'
import { getSeedContent, normalizeContent } from './content.js'

describe('photobooth pricing heading', () => {
  it('seeds the client-approved pricing tag', () => {
    expect(getSeedContent('services').photoboothHighlights.pricing).toMatchObject({
      tag: 'WORTH EVERY MOMENT',
      title: 'Luxury Photobooth Packages',
    })
  })

  it('backfills the pricing block when saved services content predates it', () => {
    const next = normalizeContent('services', {
      photoboothHighlights: {
        studioGrade: { badge: 'B', title: 'T' },
      },
    })

    expect(next.photoboothHighlights.pricing.tag).toBe('WORTH EVERY MOMENT')
    expect(next.photoboothHighlights.studioGrade.title).toBe('T')
  })

  it('preserves a custom pricing block on save and read', () => {
    const next = normalizeContent('services', {
      photoboothHighlights: {
        pricing: { tag: 'Custom tag', title: 'Custom title', description: 'Custom desc' },
      },
    })

    expect(next.photoboothHighlights.pricing).toMatchObject({
      tag: 'Custom tag',
      title: 'Custom title',
      description: 'Custom desc',
    })
  })

  it('leaves unrelated services keys untouched', () => {
    const next = normalizeContent('services', {
      hero: { title: 'H' },
      photoboothHighlights: { studioGrade: { badge: 'B' } },
    })

    expect(next.hero).toMatchObject({ title: 'H' })
    expect(next.photoboothHighlights.pricing.tag).toBe('WORTH EVERY MOMENT')
  })
})
