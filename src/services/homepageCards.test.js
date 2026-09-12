import { describe, expect, it } from 'vitest'
import { buildServiceCards } from './homepageCards.js'

const decorCategory = {
  id: 'decor-hire',
  title: 'Decor Hire',
  description: 'Layered linens and candlelight.',
  tagline: 'Atmosphere',
  coverImage: { src: 'decor.jpg', alt: 'Decor table' },
}

const luxeCategory = {
  id: 'luxe-photobooth',
  title: 'Luxe Photobooth',
  description: 'A refined photo moment.',
  tagline: 'Playful luxury',
  coverImage: { src: 'booth.jpg', alt: 'Photo booth' },
}

describe('buildServiceCards', () => {
  it('renders one card per catalog category', () => {
    const cards = buildServiceCards([decorCategory, luxeCategory], [])

    expect(cards).toHaveLength(2)
    expect(cards[0]).toMatchObject({ id: 'decor-hire', collectionId: 'decor-hire', title: 'Decor Hire' })
    expect(cards[1]).toMatchObject({ id: 'luxe-photobooth', collectionId: 'luxe-photobooth', title: 'Luxe Photobooth' })
  })

  it('merges an override matched by category id', () => {
    const cards = buildServiceCards([decorCategory], [
      {
        id: 'decor-hire',
        collectionId: 'decor-hire',
        eyebrow: '01 · Atmosphere',
        title: 'Decor Hire',
        description: 'Custom copy.',
        image: { src: 'custom.jpg', alt: 'Custom' },
      },
    ])

    expect(cards).toHaveLength(1)
    expect(cards[0]).toMatchObject({
      eyebrow: '01 · Atmosphere',
      description: 'Custom copy.',
      image: { src: 'custom.jpg', alt: 'Custom' },
    })
  })

  it('merges an unlinked override whose title matches a category', () => {
    const cards = buildServiceCards([luxeCategory], [
      {
        id: 'service-123',
        collectionId: '',
        eyebrow: '02 · Playful luxury',
        title: '  luxe photobooth ',
        description: 'Custom booth copy.',
        image: { src: '', alt: '' },
      },
    ])

    expect(cards).toHaveLength(1)
    expect(cards[0]).toMatchObject({
      id: 'luxe-photobooth',
      collectionId: 'luxe-photobooth',
      eyebrow: '02 · Playful luxury',
      description: 'Custom booth copy.',
    })
  })

  it('drops an override that matches no category by id or title', () => {
    const cards = buildServiceCards([decorCategory], [
      {
        id: 'service-999',
        collectionId: '',
        title: 'Something Else Entirely',
        description: 'Orphan card.',
        image: { src: '', alt: '' },
      },
    ])

    expect(cards).toHaveLength(1)
    expect(cards[0]).toMatchObject({ id: 'decor-hire' })
  })

  it('falls back to the category title, description and cover image', () => {
    const cards = buildServiceCards([decorCategory], [])

    expect(cards[0]).toMatchObject({
      title: 'Decor Hire',
      description: 'Layered linens and candlelight.',
      image: { src: 'decor.jpg', alt: 'Decor table' },
    })
  })

  it('deep-links each card to its category collection', () => {
    const cards = buildServiceCards([decorCategory], [])

    expect(cards[0].path).toBe('/services?collection=decor-hire')
  })
})
