import { describe, expect, it } from 'vitest'
import { getSeedContent, normalizeContent } from './content.js'

describe('homepage section headings', () => {
  it('seeds the services heading', () => {
    expect(getSeedContent('homepage').servicesHeading).toMatchObject({
      eyebrow: 'Designed around your day',
      title: 'Details with a point of view.',
    })
  })

  it('seeds the gallery heading', () => {
    expect(getSeedContent('homepage').galleryHeading).toMatchObject({
      eyebrow: 'A glimpse of the good stuff',
      title: 'Made for the memory.',
    })
  })

  it('backfills headings when saved homepage content predates them', () => {
    const next = normalizeContent('homepage', { hero: { title: 'T' } })

    expect(next.servicesHeading.title).toBe('Details with a point of view.')
    expect(next.galleryHeading.title).toBe('Made for the memory.')
  })

  it('seeds the trust statement, why-us intro, reviews and instagram headings', () => {
    const seed = getSeedContent('homepage')

    expect(seed.trustedBy).toMatchObject({
      eyebrow: 'Trusted by beautiful celebrations',
      statementLead: 'We believe a celebration should feel',
      statementRest: 'as beautiful as the reason you\'re gathering.',
    })
    expect(seed.whyChooseUs).toMatchObject({
      eyebrow: 'The difference is in the detail',
      title: 'Why us?',
    })
    expect(seed.testimonialsHeading).toMatchObject({
      eyebrow: 'Kind words from good people',
    })
    expect(seed.instagramHeading).toMatchObject({
      eyebrow: 'A little more over on Instagram',
      handle: '@momentsinblooms',
      followLabel: 'Follow @momentsinblooms',
    })
  })

  it('backfills the trust/why-us/reviews/instagram headings on old saves', () => {
    const next = normalizeContent('homepage', { hero: { title: 'T' } })

    expect(next.trustedBy.statementLead).toBe('We believe a celebration should feel')
    expect(next.whyChooseUs.title).toBe('Why us?')
    expect(next.testimonialsHeading.eyebrow).toBe('Kind words from good people')
    expect(next.instagramHeading.handle).toBe('@momentsinblooms')
    expect(next.hero.scrollCue).toBe('Scroll to discover')
  })

  it('keeps an explicit blank instead of snapping back to the default', () => {
    const next = normalizeContent('homepage', {
      trustedBy: { eyebrow: '', statementLead: '', statementRest: '' },
    })

    expect(next.trustedBy.eyebrow).toBe('')
    expect(next.trustedBy.statementLead).toBe('')
  })

  it('preserves custom headings on save and read', () => {
    const next = normalizeContent('homepage', {
      servicesHeading: { eyebrow: 'E', title: 'For every kind of celebration', description: 'D' },
      galleryHeading: { eyebrow: 'E', title: 'A Look at What We Do', description: 'D' },
    })

    expect(next.servicesHeading.title).toBe('For every kind of celebration')
    expect(next.galleryHeading.title).toBe('A Look at What We Do')
  })
})

describe('about values heading', () => {
  it('seeds the values heading', () => {
    expect(getSeedContent('about').coreValuesHeading).toMatchObject({
      subtitle: 'Our Principles',
      title: 'Values that guide every arrangement',
    })
  })

  it('backfills the heading when saved about content predates it', () => {
    const next = normalizeContent('about', { hero: { title: 'T' } })

    expect(next.coreValuesHeading.title).toBe('Values that guide every arrangement')
  })

  it('preserves a custom heading on save and read', () => {
    const next = normalizeContent('about', {
      coreValuesHeading: { subtitle: 'S', title: 'Custom values', description: 'D' },
    })

    expect(next.coreValuesHeading).toMatchObject({
      subtitle: 'S',
      title: 'Custom values',
      description: 'D',
    })
  })
})

describe('gallery interface labels', () => {
  it('seeds the interface labels', () => {
    expect(getSeedContent('gallery').galleryLabels).toMatchObject({
      loadMore: 'Load More',
      viewFullStory: 'View Full Story',
      decorHighlights: 'Decor Highlights',
    })
  })

  it('backfills the labels when saved gallery content predates them', () => {
    const next = normalizeContent('gallery', { hero: { title: 'H' } })

    expect(next.galleryLabels.loadMore).toBe('Load More')
    expect(next.galleryLabels.insideTheEvent).toBe('Inside The Event')
  })

  it('preserves custom labels on save and read', () => {
    const next = normalizeContent('gallery', {
      galleryLabels: { loadMore: 'Show more' },
    })

    expect(next.galleryLabels.loadMore).toBe('Show more')
    expect(next.galleryLabels.viewFullStory).toBe('View Full Story')
  })
})

describe('contact form step labels and success copy', () => {
  it('seeds the wizard step names and success message', () => {
    const rail = getSeedContent('contact').enquiryFormRail

    expect(rail.stepLabels).toEqual([
      'Your Details',
      'Event Details',
      'Service Interest',
      'Setup & Styling',
    ])
    expect(rail.success).toMatchObject({
      eyebrow: 'Enquiry received',
      title: 'Thank you.',
      homeLabel: 'Back to the homepage',
      againLabel: 'Send another enquiry',
    })
  })

  it('backfills them when saved contact content predates them', () => {
    const next = normalizeContent('contact', { hero: { title: 'H' } })

    expect(next.enquiryFormRail.stepLabels).toEqual([
      'Your Details',
      'Event Details',
      'Service Interest',
      'Setup & Styling',
    ])
    expect(next.enquiryFormRail.success.title).toBe('Thank you.')
  })

  it('preserves custom step names and keeps the other three positions', () => {
    const next = normalizeContent('contact', {
      enquiryFormRail: { stepLabels: ['Contact', 'Occasion'] },
    })

    expect(next.enquiryFormRail.stepLabels).toEqual([
      'Contact',
      'Occasion',
      'Service Interest',
      'Setup & Styling',
    ])
  })
})
