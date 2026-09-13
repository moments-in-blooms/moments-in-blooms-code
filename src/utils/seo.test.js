import { describe, expect, it } from 'vitest'
import { buildBreadcrumbJsonLd, buildLocalBusinessJsonLd } from './seo.js'

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

describe('buildBreadcrumbJsonLd', () => {
  it('builds a breadcrumb trail from the pathname', () => {
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
