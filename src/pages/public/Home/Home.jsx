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

function Home() {
  const { values, loading } = useContent('homepage')
  const { values: seoValues } = useContent('seo')
  const seo = seoValues.home ?? seoValues.site ?? {}

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
      <Services items={values.services} id={HOME_SECTION_IDS.SERVICES} />
      <GalleryPreview items={values.galleryItems} id={HOME_SECTION_IDS.GALLERY} />
      <WhyChooseUs reasons={values.reasons} id={HOME_SECTION_IDS.WHY_US} />
      <Testimonials items={values.testimonials} id={HOME_SECTION_IDS.TESTIMONIALS} />
      <InstagramPreview items={values.instagramItems} id={HOME_SECTION_IDS.INSTAGRAM} />
      <CTA content={values.cta} id={HOME_SECTION_IDS.CTA} />
    </HomePage>
  )
}

export default Home
