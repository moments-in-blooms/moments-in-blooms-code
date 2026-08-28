import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { useContent } from '../../../hooks/useContent.js'
import { seoSections } from './sections.jsx'
import { SEOPage } from './SEO.styles.js'

function SEO() {
  const { values, savedAt } = useContent('seo')

  return (
    <SEOPage>
      <AdminPageHeader {...adminPageMeta.seo} />
      <ContentList
        title="Search & sharing"
        description="The titles, descriptions and share images used for each page."
      >
        {seoSections.map((section) => (
          <ContentCard
            key={section.key}
            to={`/admin/seo/${section.key}`}
            title={section.title}
            description={section.description}
            meta={[values[section.key]?.title].filter(Boolean)}
            lastUpdated={savedAt}
          />
        ))}
      </ContentList>
    </SEOPage>
  )
}

export default SEO