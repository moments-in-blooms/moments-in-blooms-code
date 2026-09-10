import { useMemo } from 'react'
import { useContent } from '../../../hooks/useContent.js'
import SEO from '../../../components/SEO/index.js'
import { HOME_SECTION_IDS } from '../../../constants/homepage.js'
import { buildBreadcrumbJsonLd } from '../../../utils/seo.js'
import CTA from './CTA/CTA.jsx'
import GalleryPreview from './GalleryPreview/GalleryPreview.jsx'
import Hero from './Hero/Hero.jsx'
import InstagramPreview from './InstagramPreview/InstagramPreview.jsx'
import { HomePage } from './Home.styles.js'
import Services from './Services/Services.jsx'
import Testimonials from './Testimonials/Testimonials.jsx'
import TrustedBy from './TrustedBy/TrustedBy.jsx'
import WhyChooseUs from './WhyChooseUs/WhyChooseUs.jsx'

const localBusinessJsonLd = Object.freeze({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Moments in Blooms',
  url: 'https://momentsinblooms.vercel.app',
  image: 'https://momentsinblooms.vercel.app/pwa-512x512.png',
  telephone: '+61 3 0000 0000',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
    addressCountry: 'AU',
  },
  areaServed: 'Melbourne',
  priceRange: '$$',
  sameAs: [
    'https://ig.me/m/momentsinblooms',
    'https://m.me/61575145079420',
  ],
})

/**
 * Build homepage service cards from the live catalog. Each category becomes
 * a card; a Homepage CMS entry with a matching `collectionId` (or `id`)
 * overrides the display copy, image, link and layout. Overrides without a
 * matching category (custom cards) are appended unchanged.
 */
function buildServiceCards(categories, overrides) {
  const list = Array.isArray(categories) ? categories : []
  const byCollection = new Map()
  const unmatched = []
  for (const override of Array.isArray(overrides) ? overrides : []) {
    if (!override || typeof override !== 'object') continue
    const key = override.collectionId || override.id
    if (key && list.some((category) => String(category?.id) === String(key))) {
      byCollection.set(String(key), override)
    } else {
      unmatched.push(override)
    }
  }
  const cards = list.map((category, index) => {
    const override = byCollection.get(String(category.id))
    const image =
      override?.image?.src
        ? override.image
        : category.coverImage?.src
          ? {
              src: category.coverImage.src,
              alt: category.coverImage.alt || category.title,
            }
          : { src: '', alt: '' }
    return {
      id: category.id,
      collectionId: category.id,
      eyebrow: override?.eyebrow ?? '',
      title: override?.title || category.title || '',
      description: override?.description || category.description || category.tagline || '',
      path: override?.path || `/services?collection=${encodeURIComponent(category.id)}`,
      offset: override?.offset ?? index % 2 === 1,
      image,
    }
  })
  return [...cards, ...unmatched]
}

function Home() {
  const { values, loading } = useContent('homepage')
  const { values: seoValues } = useContent('seo')
  const { values: servicesValues } = useContent('services')
  const seo = seoValues.home ?? seoValues.site ?? {}

  // Homepage service cards are driven by the live catalog (single source of
  // truth). Homepage CMS entries act as per-card display overrides matched by
  // category id; unlinked custom cards are appended unchanged.
  const serviceCards = useMemo(
    () => buildServiceCards(servicesValues.catalog?.categories, values.services),
    [servicesValues.catalog, values.services],
  )

  const jsonLdArray = [localBusinessJsonLd, buildBreadcrumbJsonLd('/')]

  return (
    <HomePage aria-busy={loading ? 'true' : undefined}>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        image={seo.image}
        keywords={seo.keywords}
        url={seo.url}
        jsonLd={jsonLdArray}
      />
      <Hero content={values.hero} id={HOME_SECTION_IDS.HERO} />
      <TrustedBy marks={values.trustMarks} id={HOME_SECTION_IDS.TRUST} />
      <Services items={serviceCards} id={HOME_SECTION_IDS.SERVICES} />
      <GalleryPreview items={values.galleryItems} id={HOME_SECTION_IDS.GALLERY} />
      <WhyChooseUs reasons={values.reasons} id={HOME_SECTION_IDS.WHY_US} />
      <Testimonials items={values.testimonials} id={HOME_SECTION_IDS.TESTIMONIALS} />
      <InstagramPreview items={values.instagramItems} id={HOME_SECTION_IDS.INSTAGRAM} />
      <CTA content={values.cta} id={HOME_SECTION_IDS.CTA} />
    </HomePage>
  )
}

export default Home
