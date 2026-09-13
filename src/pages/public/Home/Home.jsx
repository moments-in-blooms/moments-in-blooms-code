import { useMemo } from 'react'
import { useContent } from '../../../hooks/useContent.js'
import useSiteSettings from '../../../hooks/useSiteSettings.js'
import SEO from '../../../components/SEO/index.js'
import { HOME_SECTION_IDS } from '../../../constants/homepage.js'
import { buildServiceCards } from '../../../services/homepageCards.js'
import { buildBreadcrumbJsonLd, buildLocalBusinessJsonLd } from '../../../utils/seo.js'
import CTA from './CTA/CTA.jsx'
import GalleryPreview from './GalleryPreview/GalleryPreview.jsx'
import Hero from './Hero/Hero.jsx'
import InstagramPreview from './InstagramPreview/InstagramPreview.jsx'
import { HomePage } from './Home.styles.js'
import Services from './Services/Services.jsx'
import Testimonials from './Testimonials/Testimonials.jsx'
import TrustedBy from './TrustedBy/TrustedBy.jsx'
import WhyChooseUs from './WhyChooseUs/WhyChooseUs.jsx'

function Home() {
  const { values, loading } = useContent('homepage')
  const { values: seoValues } = useContent('seo')
  const { values: servicesValues } = useContent('services')
  const { contact, socialLinks } = useSiteSettings()
  const seo = seoValues.home ?? seoValues.site ?? {}

  // Homepage service cards are driven by the live catalog (single source of
  // truth). Homepage CMS entries act as per-card display overrides matched by
  // category id; unlinked custom cards are appended unchanged.
  const serviceCards = useMemo(
    () => buildServiceCards(servicesValues.catalog?.categories, values.services),
    [servicesValues.catalog, values.services],
  )

  // LocalBusiness schema reads the Settings CMS so the studio's contact
  // details and social links stay accurate when the client edits them.
  const jsonLdArray = [
    buildLocalBusinessJsonLd({ contact, socialLinks, image: seo.image }),
    buildBreadcrumbJsonLd('/'),
  ]

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
      <TrustedBy
        marks={values.trustMarks}
        content={values.trustedBy}
        id={HOME_SECTION_IDS.TRUST}
      />
      <Services items={serviceCards} heading={values.servicesHeading} id={HOME_SECTION_IDS.SERVICES} />
      <GalleryPreview
        items={values.galleryItems}
        heading={values.galleryHeading}
        id={HOME_SECTION_IDS.GALLERY}
      />
      <WhyChooseUs
        reasons={values.reasons}
        content={values.whyChooseUs}
        id={HOME_SECTION_IDS.WHY_US}
      />
      <Testimonials
        items={values.testimonials}
        heading={values.testimonialsHeading}
        id={HOME_SECTION_IDS.TESTIMONIALS}
      />
      <InstagramPreview
        items={values.instagramItems}
        heading={values.instagramHeading}
        id={HOME_SECTION_IDS.INSTAGRAM}
      />
      <CTA content={values.cta} id={HOME_SECTION_IDS.CTA} />
    </HomePage>
  )
}

export default Home
