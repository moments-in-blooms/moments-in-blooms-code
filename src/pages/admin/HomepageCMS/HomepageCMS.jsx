import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { useContent } from '../../../hooks/useContent.js'
import { buildServiceCards } from '../../../services/homepageCards.js'
import { listCategories } from '../ServicesCMS/catalog.js'
import { homepageSections } from './sections.jsx'
import { HomepageCMSPage } from './HomepageCMS.styles.js'

function HomepageCMS() {
  const { values, savedAt } = useContent('homepage')
  const { values: servicesValues, savedAt: servicesSavedAt } = useContent('services')
  // Homepage service cards are the live catalog categories, managed from
  // the dedicated Services section below (not from homepageSections).
  const serviceCards = buildServiceCards(
    listCategories(servicesValues),
    values.services ?? [],
  )

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
        <ContentCard
          key="services"
          to="/admin/homepage/services"
          title="Services"
          description="Homepage service cards. Each card follows a live service category; copy, image and layout set here override it."
          meta={[`${serviceCards.length} service${serviceCards.length === 1 ? '' : 's'}`]}
          lastUpdated={savedAt ?? servicesSavedAt}
        />
      </ContentList>
    </HomepageCMSPage>
  )
}

export default HomepageCMS