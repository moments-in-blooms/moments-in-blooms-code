import { describe, expect, it } from 'vitest'
import {
  buildBreadcrumbJsonLd,
  buildImageGalleryJsonLd,
  buildLocalBusinessJsonLd,
  buildServiceSchemas,
} from './seo.js'

describe('buildLocalBusinessJsonLd', () => {
  it('returns the base LocalBusiness fields with the default image', () => {
    const jsonLd = buildLocalBusinessJsonLd({})

    expect(jsonLd).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Moments in Blooms',
      url: 'https://momentsinblooms.vercel.app/',
      areaServed: 'Melbourne',
      priceRange: '$$',
    })
    expect(jsonLd.image).toBe('https://momentsinblooms.vercel.app/pwa-512x512.png')
  })

  it('uses the provided share image', () => {
    const jsonLd = buildLocalBusinessJsonLd({ image: 'https://example.com/share.jpg' })
    expect(jsonLd.image).toBe('https://example.com/share.jpg')
  })

  it('omits the seed placeholder phone but keeps a real one', () => {
    expect(
      buildLocalBusinessJsonLd({ contact: { phone: '+61 3 0000 0000' } }).telephone,
    ).toBeUndefined()
    expect(buildLocalBusinessJsonLd({}).telephone).toBeUndefined()
    expect(
      buildLocalBusinessJsonLd({ contact: { phone: '+61 400 123 456' } }).telephone,
    ).toBe('+61 400 123 456')
  })

  it('includes the studio email', () => {
    const jsonLd = buildLocalBusinessJsonLd({ contact: { email: 'hello@momentsinblooms.com' } })
    expect(jsonLd.email).toBe('hello@momentsinblooms.com')
  })

  it('parses "Melbourne, Australia" into address parts', () => {
    const jsonLd = buildLocalBusinessJsonLd({ contact: { location: 'Melbourne, Australia' } })
    expect(jsonLd.address).toEqual({
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      addressCountry: 'AU',
    })
  })

  it('handles a single-part location without a country', () => {
    const jsonLd = buildLocalBusinessJsonLd({ contact: { location: 'Melbourne' } })
    expect(jsonLd.address).toEqual({
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
    })
  })

  it('omits the address when no location is set', () => {
    expect(buildLocalBusinessJsonLd({}).address).toBeUndefined()
  })

  it('passes through saved social links and omits sameAs when empty', () => {
    const jsonLd = buildLocalBusinessJsonLd({
      socialLinks: [
        { label: 'Instagram', href: 'https://instagram.com/momentsinblooms' },
        { label: 'Broken', href: '' },
        { href: 'not-a-url' },
      ],
    })
    expect(jsonLd.sameAs).toEqual(['https://instagram.com/momentsinblooms'])
    expect(buildLocalBusinessJsonLd({ socialLinks: [] }).sameAs).toBeUndefined()
  })
})

describe('buildBreadcrumbJsonLd', () => {  it('builds a breadcrumb trail from the pathname', () => {
    const jsonLd = buildBreadcrumbJsonLd('/about')

    expect(jsonLd).toMatchObject({ '@context': 'https://schema.org', '@type': 'BreadcrumbList' })
    expect(jsonLd.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://momentsinblooms.vercel.app/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://momentsinblooms.vercel.app/about',
      },
    ])
  })
})

describe('buildServiceSchemas', () => {
  const catalog = {
    categories: [
      {
        id: 'luxe-photobooth',
        title: 'Luxe Photobooth',
        tagline: 'Mirror booth experiences',
        items: [
          { id: 'p1', name: 'SIGNATURE', price: '$600', description: 'Essential luxury' },
          { id: 'p2', name: 'GLAM', price: '$850' },
          { id: 'p3', name: 'POA special', price: 'POA' },
          { id: 'p4', name: 'Hourly extra', price: '$100/hr' },
        ],
        subcategories: [
          {
            id: 'sub-studio',
            title: 'Studio',
            items: [{ id: 'p5', name: 'STUDIO SIGNATURE', price: '1,200' }],
          },
        ],
      },
      {
        id: 'decor-hire',
        title: 'Decor Hire',
        description: 'Curated pieces',
        items: [],
        subcategories: [],
      },
      { id: 'blank', title: '   ', items: [] },
    ],
  }

  it('builds one Service node per titled category', () => {
    const schemas = buildServiceSchemas(catalog)
    expect(schemas).toHaveLength(2)
    expect(schemas[0]).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Luxe Photobooth',
      description: 'Mirror booth experiences',
      areaServed: 'Melbourne',
    })
    expect(schemas[0].provider).toMatchObject({
      '@type': 'LocalBusiness',
      name: 'Moments in Blooms',
    })
  })

  it('includes Offers only for strict dollar prices', () => {
    const schemas = buildServiceSchemas(catalog)
    expect(schemas[0].offers).toEqual([
      {
        '@type': 'Offer',
        name: 'SIGNATURE',
        price: 600,
        priceCurrency: 'AUD',
        description: 'Essential luxury',
      },
      { '@type': 'Offer', name: 'GLAM', price: 850, priceCurrency: 'AUD' },
      { '@type': 'Offer', name: 'STUDIO SIGNATURE', price: 1200, priceCurrency: 'AUD' },
    ])
  })

  it('omits offers for categories without priced items', () => {
    const schemas = buildServiceSchemas(catalog)
    expect(schemas[1].name).toBe('Decor Hire')
    expect(schemas[1].offers).toBeUndefined()
  })

  it('returns an empty array for missing catalogs', () => {
    expect(buildServiceSchemas(null)).toEqual([])
    expect(buildServiceSchemas({})).toEqual([])
  })
})

describe('buildImageGalleryJsonLd', () => {
  it('builds ImageObject entries from gallery items', () => {
    const jsonLd = buildImageGalleryJsonLd([
      { id: 1, src: 'https://example.com/a.jpg', title: 'Garden Wedding', subtitle: 'Styling' },
      { id: 2, src: 'https://example.com/b.jpg' },
      { id: 3, src: '  ', title: 'No src' },
    ])

    expect(jsonLd).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'Moments in Blooms Gallery',
      url: 'https://momentsinblooms.vercel.app/gallery',
    })
    expect(jsonLd.image).toEqual([
      {
        '@type': 'ImageObject',
        contentUrl: 'https://example.com/a.jpg',
        name: 'Garden Wedding',
        caption: 'Styling',
      },
      { '@type': 'ImageObject', contentUrl: 'https://example.com/b.jpg' },
    ])
  })

  it('returns null when there is nothing to describe', () => {
    expect(buildImageGalleryJsonLd([])).toBeNull()
    expect(buildImageGalleryJsonLd(null)).toBeNull()
  })
})
