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

  it('preserves custom headings on save and read', () => {
    const next = normalizeContent('homepage', {
      servicesHeading: { eyebrow: 'E', title: 'For every kind of celebration', description: 'D' },
      galleryHeading: { eyebrow: 'E', title: 'A Look at What We Do', description: 'D' },
    })

    expect(next.servicesHeading.title).toBe('For every kind of celebration')
    expect(next.galleryHeading.title).toBe('A Look at What We Do')
  })
})
