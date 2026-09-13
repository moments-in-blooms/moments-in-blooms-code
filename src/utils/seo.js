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
