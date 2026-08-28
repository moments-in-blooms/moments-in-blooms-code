import { useContent } from '../../../hooks/useContent.js'
import SEO from '../../../components/SEO/index.js'
import { ABOUT_SECTION_IDS } from '../../../constants/about.js'
import { buildBreadcrumbJsonLd } from '../../../utils/seo.js'
import { AboutPage } from './About.styles.js'
import AboutHero from './AboutHero/index.js'
import BehindExperience from './BehindExperience/index.js'
import BrandStory from './BrandStory/index.js'
import CoreValues from './CoreValues/index.js'
import CTA from './CTA/index.js'
import MissionVision from './MissionVision/index.js'
import Stats from './Stats/index.js'
import TestimonialHighlight from './TestimonialHighlight/index.js'
import WhyChooseUs from './WhyChooseUs/index.js'

function About() {
  const { values, loading } = useContent('about')
  const { values: seoValues } = useContent('seo')
  const seo = seoValues.about ?? seoValues.site ?? {}

  return (
    <AboutPage aria-busy={loading ? 'true' : undefined}>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        image={seo.image}
        keywords={seo.keywords}
        url={seo.url}
        jsonLd={buildBreadcrumbJsonLd('/about')}
      />
      <AboutHero content={values.hero} id={ABOUT_SECTION_IDS.HERO} />
      <BrandStory content={values.brandStory} id={ABOUT_SECTION_IDS.BRAND_STORY} />
      <MissionVision content={values.missionVision} id={ABOUT_SECTION_IDS.MISSION_VISION} />
      <CoreValues items={values.coreValues} id={ABOUT_SECTION_IDS.CORE_VALUES} />
      <WhyChooseUs content={values.whyChooseUs} id={ABOUT_SECTION_IDS.WHY_US} />
      <BehindExperience
        content={values.behindExperience}
        id={ABOUT_SECTION_IDS.BEHIND_EXPERIENCE}
      />
      <Stats content={values.stats} id={ABOUT_SECTION_IDS.STATS} />
      <TestimonialHighlight
        content={values.testimonialHighlight}
        id={ABOUT_SECTION_IDS.TESTIMONIAL}
      />
      <CTA content={values.cta} id={ABOUT_SECTION_IDS.CTA} />
    </AboutPage>
  )
}

export default About