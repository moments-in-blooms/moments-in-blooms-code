import { useContent } from '../../../hooks/useContent.js'
import SEO from '../../../components/SEO/index.js'
import { CONTACT_SECTION_IDS } from '../../../constants/contact.js'
import { buildBreadcrumbJsonLd } from '../../../utils/seo.js'
import ContactCTA from './ContactCTA/index.js'
import ContactHero from './ContactHero/index.js'
import ContactInformation from './ContactInformation/index.js'
import EnquiryForm from './EnquiryForm/index.js'
import { ContactPage } from './Contact.styles.js'

function Contact() {
  const { values, loading } = useContent('contact')
  const { values: seoValues } = useContent('seo')
  const seo = seoValues.contact ?? seoValues.site ?? {}

  return (
    <ContactPage aria-busy={loading ? 'true' : undefined}>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        image={seo.image}
        keywords={seo.keywords}
        url={seo.url}
        jsonLd={buildBreadcrumbJsonLd('/contact')}
      />

      <ContactHero content={values.hero} id={CONTACT_SECTION_IDS.HERO} />
      <EnquiryForm
        content={values.enquiryFormRail}
        id={CONTACT_SECTION_IDS.FORM}
        eventTypeOptions={values.enquiryFormOptions?.eventTypeOptions}
        serviceInterestOptions={values.enquiryFormOptions?.serviceInterestOptions}
        guestCountOptions={values.enquiryFormOptions?.guestCountOptions}
        setupRequirementOptions={values.enquiryFormOptions?.setupRequirementOptions}
      />
      <ContactInformation content={values.information} id={CONTACT_SECTION_IDS.INFORMATION} />
      <ContactCTA content={values.cta} id={CONTACT_SECTION_IDS.CTA} />
    </ContactPage>
  )
}

export default Contact