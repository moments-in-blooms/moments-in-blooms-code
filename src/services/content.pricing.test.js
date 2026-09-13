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

describe('services showcase, catalogue labels and FAQ preview', () => {
  it('seeds the showcase, labels and FAQ preview copy', () => {
    const seed = getSeedContent('services')

    expect(seed.showcase).toMatchObject({
      title: 'Bespoke Collections & Experiences',
      allCollectionsLabel: 'All Collections',
      priceStartsAtLabel: 'Price starts at',
    })
    expect(seed.catalogueLabels).toMatchObject({
      requestQuote: 'Request a Quote',
      enquireNow: 'Enquire Now',
      viewFullDetails: 'View full details',
    })
    expect(seed.faqPreview).toMatchObject({
      eyebrow: 'A few helpful things',
      title: 'Good to know.',
      buttonLabel: 'View all FAQs',
    })
  })

  it('backfills them when saved services content predates them', () => {
    const next = normalizeContent('services', { hero: { title: 'H' } })

    expect(next.showcase.title).toBe('Bespoke Collections & Experiences')
    expect(next.catalogueLabels.requestQuote).toBe('Request a Quote')
    expect(next.faqPreview.buttonLabel).toBe('View all FAQs')
  })

  it('preserves custom showcase copy and blanks on save and read', () => {
    const next = normalizeContent('services', {
      showcase: { title: 'Custom title', description: '' },
      catalogueLabels: { enquireNow: 'Get in touch' },
    })

    expect(next.showcase.title).toBe('Custom title')
    expect(next.showcase.description).toBe('')
    expect(next.showcase.subtitle).toBe('Explore Our Services')
    expect(next.catalogueLabels.enquireNow).toBe('Get in touch')
  })
})
