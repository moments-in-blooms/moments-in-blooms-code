import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { useContent } from '../../../hooks/useContent.js'
import { contactSections } from './sections.jsx'
import { ContactCMSPage } from './ContactCMS.styles.js'

function ContactCMS() {
  const { values, savedAt } = useContent('contact')

  return (
    <ContactCMSPage>
      <AdminPageHeader {...adminPageMeta.contact} />
      <ContentList
        title="Contact page content"
        description="Click a section to review and update its content."
      >
        {contactSections.map((section) => (
          <ContentCard
            key={section.key}
            to={`/admin/contact/${section.key}`}
            title={section.title}
            description={section.description}
            meta={section.sectionMeta?.(values)}
            lastUpdated={savedAt}
          />
        ))}
      </ContentList>
    </ContactCMSPage>
  )
}

export default ContactCMS
