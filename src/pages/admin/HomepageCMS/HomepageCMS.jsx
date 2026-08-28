import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { useContent } from '../../../hooks/useContent.js'
import { homepageSections } from './sections.jsx'
import { HomepageCMSPage } from './HomepageCMS.styles.js'

function HomepageCMS() {
  const { values, savedAt } = useContent('homepage')

  return (
    <HomepageCMSPage>
      <AdminPageHeader {...adminPageMeta.homepage} />
      <ContentList
        title="Homepage content"
        description="Click a section to review and update its content."
      >
        {homepageSections.map((section) => (
          <ContentCard
            key={section.key}
            to={`/admin/homepage/${section.key}`}
            title={section.title}
            description={section.description}
            meta={section.sectionMeta?.(values)}
            lastUpdated={savedAt}
          />
        ))}
      </ContentList>
    </HomepageCMSPage>
  )
}

export default HomepageCMS