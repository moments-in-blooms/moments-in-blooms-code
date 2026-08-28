import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { useContent } from '../../../hooks/useContent.js'
import { aboutSections } from './sections.jsx'
import { AboutCMSPage } from './AboutCMS.styles.js'

function AboutCMS() {
  const { values, savedAt } = useContent('about')

  return (
    <AboutCMSPage>
      <AdminPageHeader {...adminPageMeta.about} />
      <ContentList
        title="About page content"
        description="Click a section to review and update its content."
      >
        {aboutSections.map((section) => (
          <ContentCard
            key={section.key}
            to={`/admin/about/${section.key}`}
            title={section.title}
            description={section.description}
            meta={section.sectionMeta?.(values)}
            lastUpdated={savedAt}
          />
        ))}
      </ContentList>
    </AboutCMSPage>
  )
}

export default AboutCMS