import { useContent } from '../../../hooks/useContent.js'
import SEO from '../../../components/SEO/index.js'
import { SERVICES_SECTION_IDS } from '../../../constants/services.js'
import { buildServicesCatalog } from '../../../services/content.js'
import { buildBreadcrumbJsonLd, buildServiceSchemas } from '../../../utils/seo.js'
import FaqSection from './FaqSection/index.js'
import ServiceCollectionsShowcase from './ServiceCollectionsShowcase/index.js'
import { ServicesPage } from './Services.styles.js'
import ServicesCTA from './ServicesCTA/index.js'
import ServicesExperience from './ServicesExperience/index.js'
import ServicesHero from './ServicesHero/index.js'

function Services() {
  const { values, loading } = useContent('services')
  const { values: seoValues } = useContent('seo')
  const seo = seoValues.services ?? seoValues.site ?? {}

  // The canonical catalog is the single source of truth; legacy-only blobs
  // (e.g. mid-migration saves) are converted on the fly.
  const catalog = values.catalog ?? buildServicesCatalog(values)
  // Service markup follows the live catalog — CMS price/name edits flow
  // into the schema with no deploy.
  const jsonLd = [buildBreadcrumbJsonLd('/services'), ...buildServiceSchemas(catalog)]

  return (
    <ServicesPage aria-busy={loading ? 'true' : undefined}>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        image={seo.image}
        keywords={seo.keywords}
        url={seo.url}
        jsonLd={jsonLd}
      />
      <ServicesHero content={values.hero} id={SERVICES_SECTION_IDS.HERO} />
      <ServiceCollectionsShowcase
        catalog={catalog}
        photoboothHighlights={values.photoboothHighlights}
        blissfulNestIntro={values.blissfulNestIntro}
        showcase={values.showcase}
        labels={values.catalogueLabels}
        id={SERVICES_SECTION_IDS.FEATURED}
      />
      <ServicesExperience
        content={values.experienceTimeline}
        id={SERVICES_SECTION_IDS.EXPERIENCE}
      />
      <FaqSection heading={values.faqPreview} id={SERVICES_SECTION_IDS.FAQ} />
      <ServicesCTA content={values.cta} id={SERVICES_SECTION_IDS.CTA} />
    </ServicesPage>
  )
}

export default Services
