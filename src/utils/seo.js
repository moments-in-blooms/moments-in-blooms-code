const SITE_URL = 'https://momentsinblooms.vercel.app'

const DEFAULT_OG_IMAGE = `${SITE_URL}/pwa-512x512.png`

// Seed placeholder shipped in src/constants/navigation.js. It must never be
// emitted as structured data — a fake phone number is worse than no number.
const PLACEHOLDER_PHONE = '+61 3 0000 0000'

const COUNTRY_CODES = Object.freeze({ australia: 'AU' })

const breadcrumbNames = {
  '/': 'Home',
  '/about': 'About',
  '/services': 'Services',
  '/gallery': 'Gallery',
  '/faqs': 'FAQs',
  '/contact': 'Contact',
}

export function buildBreadcrumbJsonLd(pathname) {
  const segments = pathname.split('/').filter(Boolean)
  const itemList = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    },
  ]

  let accumulatedPath = ''
  segments.forEach((segment, index) => {
    accumulatedPath += `/${segment}`
    const name = breadcrumbNames[accumulatedPath] || segment.charAt(0).toUpperCase() + segment.slice(1)
    itemList.push({
      '@type': 'ListItem',
      position: index + 2,
      name,
      item: `${SITE_URL}${accumulatedPath}`,
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemList,
  }
}

/**
 * Build the LocalBusiness JSON-LD for the homepage from the Settings CMS
 * (see useSiteSettings). Every field comes from client-editable content:
 * - telephone is emitted only when the client has replaced the seed
 *   placeholder — structured data must describe real, visible content.
 * - address is parsed from the free-text location ("City, Country").
 * - sameAs is the client's saved social links; omitted when empty.
 */
export function buildLocalBusinessJsonLd({ contact = {}, socialLinks = [], image } = {}) {
  const phone = String(contact.phone ?? '').trim()
  const email = String(contact.email ?? '').trim()
  const location = String(contact.location ?? '').trim()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Moments in Blooms',
    url: `${SITE_URL}/`,
    image: image || DEFAULT_OG_IMAGE,
    areaServed: 'Melbourne',
    priceRange: '$$',
  }

  if (phone && phone !== PLACEHOLDER_PHONE) {
    jsonLd.telephone = phone
  }
  if (email) {
    jsonLd.email = email
  }

  const parts = location.split(',').map((part) => part.trim()).filter(Boolean)
  if (parts.length > 0) {
    const address = {
      '@type': 'PostalAddress',
      addressLocality: parts[0],
    }
    if (parts[0].toLowerCase() === 'melbourne') {
      address.addressRegion = 'VIC'
    }
    if (parts.length > 1) {
      const countryPart = parts[parts.length - 1]
      address.addressCountry = COUNTRY_CODES[countryPart.toLowerCase()] ?? countryPart
    }
    jsonLd.address = address
  }

  const sameAs = (Array.isArray(socialLinks) ? socialLinks : [])
    .map((link) => String(link?.href ?? '').trim())
    .filter((href) => /^https?:\/\//i.test(href))
  if (sameAs.length > 0) {
    jsonLd.sameAs = sameAs
  }

  return jsonLd
}

// Only strict dollar amounts become Offer prices ("$600", "1,200"). Ranges,
// rates ("From $600", "$100/hr") and "POA" stay out — a wrong price in
// structured data is worse than no Offer.
const parseOfferPrice = (value) => {
  const match = String(value ?? '').trim().match(/^\$?\s?([\d,]+(?:\.\d{1,2})?)$/)
  if (!match) return null
  const amount = Number(match[1].replace(/,/g, ''))
  return Number.isFinite(amount) ? amount : null
}

const collectCategoryItems = (category) => {
  const direct = Array.isArray(category?.items) ? category.items : []
  const nested = (Array.isArray(category?.subcategories) ? category.subcategories : []).flatMap(
    (sub) => (Array.isArray(sub?.items) ? sub.items : []),
  )
  return [...direct, ...nested]
}

/**
 * Build one Service schema node per catalog category, each carrying Offers
 * for items with a strict parseable price. Reads the live canonical catalog
 * (see buildServicesCatalog in services/content.js), so CMS price/name edits
 * flow into the Services page markup with no deploy.
 */
export function buildServiceSchemas(catalog) {
  const categories = Array.isArray(catalog?.categories) ? catalog.categories : []
  return categories
    .filter((category) => category && String(category.title ?? '').trim())
    .map((category) => {
      const title = String(category.title).trim()
      const description = String(category.tagline ?? category.description ?? '').trim()
      const offers = collectCategoryItems(category)
        .map((item) => {
          const name = String(item?.name ?? '').trim()
          const price = parseOfferPrice(item?.price)
          if (!name || price == null) return null
          const itemDescription = String(item?.description ?? item?.tagline ?? '').trim()
          const offer = {
            '@type': 'Offer',
            name,
            price,
            priceCurrency: 'AUD',
          }
          if (itemDescription) offer.description = itemDescription
          return offer
        })
        .filter(Boolean)

      const service = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: title,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Moments in Blooms',
          url: `${SITE_URL}/`,
        },
        areaServed: 'Melbourne',
      }
      if (description) service.description = description
      if (offers.length > 0) service.offers = offers
      return service
    })
}

const MAX_GALLERY_SCHEMA_IMAGES = 30

/**
 * Build the ImageGallery schema from the gallery page items (seed or
 * CMS-saved — both share { src, title, subtitle }). Items without a usable
 * src are skipped and the list is capped so the head never bloats.
 * Returns null when there is nothing to describe.
 */
export function buildImageGalleryJsonLd(items) {
  const images = (Array.isArray(items) ? items : [])
    .filter((item) => item && typeof item.src === 'string' && item.src.trim())
    .slice(0, MAX_GALLERY_SCHEMA_IMAGES)
    .map((item) => {
      const image = { '@type': 'ImageObject', contentUrl: item.src }
      const name = String(item.title ?? '').trim()
      const caption = String(item.subtitle ?? item.alt ?? '').trim()
      if (name) image.name = name
      if (caption) image.caption = caption
      return image
    })
  if (images.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Moments in Blooms Gallery',
    url: `${SITE_URL}/gallery`,
    image: images,
  }
}
