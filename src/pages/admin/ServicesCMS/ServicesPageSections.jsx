import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { useContent } from '../../../hooks/useContent.js'
import { CatalogPage } from './CatalogPages.styles.js'
import { servicesPageSectionPath } from './catalog.js'
import { servicesSections } from './sections.jsx'

// Page-level copy blocks around the service catalog. Package/prize lists are
// managed under Services → Items; dormant legacy blocks stay hidden.
const PAGE_SECTION_KEYS = ['hero', 'photoboothHighlights', 'blissfulNestIntro', 'experienceTimeline', 'cta']

function ServicesPageSections() {
  const { values, savedAt } = useContent('services')
  const pageSections = servicesSections.filter((section) => PAGE_SECTION_KEYS.includes(section.key))

  return (
    <CatalogPage>
      <AdminPageHeader {...adminPageMeta.servicesPage} />
      <ContentList
        title="Page sections"
        description="The copy blocks around the service catalog."
      >
        {pageSections.map((section) => (
          <ContentCard
            key={section.key}
            to={servicesPageSectionPath(section.key)}
            title={section.title}
            description={section.description}
            meta={section.sectionMeta?.(values)}
            lastUpdated={savedAt}
          />
        ))}
      </ContentList>
    </CatalogPage>
  )
}

export default ServicesPageSections
export { PAGE_SECTION_KEYS }
