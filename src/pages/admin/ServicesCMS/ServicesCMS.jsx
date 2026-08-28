import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { useContent } from '../../../hooks/useContent.js'
import { servicesSections } from './sections.jsx'
import { ServicesCMSPage } from './ServicesCMS.styles.js'

function ServicesCMS() {
  const { values, savedAt } = useContent('services')

  const collectionSection = servicesSections.find((section) => section.key === 'serviceCollections')
  const collections = values.serviceCollections ?? []
  const pageSections = servicesSections.filter((section) => section.key !== 'serviceCollections')

  return (
    <ServicesCMSPage>
      <AdminPageHeader {...adminPageMeta.services} />
      <ContentList
        title="Collections"
        description="The main service collections and everything inside them."
        emptyState={
          <EmptyState
            title="No collections found"
            description="The three service collections are part of the Services page layout and cannot be added here."
          />
        }
      >
        {collections.map((collection, index) => (
          <ContentCard
            key={collection.id ?? index}
            to={`/admin/services/serviceCollections/${collection.id}`}
            title={collectionSection.itemTitle(collection)}
            description={collectionSection.itemDescription(collection)}
            meta={collectionSection.itemMeta?.(collection)}
            status={collectionSection.itemStatus?.(collection)}
            thumbnail={collectionSection.itemThumb?.(collection)}
            lastUpdated={savedAt}
          />
        ))}
      </ContentList>
      <ContentList
        title="Page sections"
        description="The sections that make up the services page around the collections."
      >
        {pageSections.map((section) => (
          <ContentCard
            key={section.key}
            to={`/admin/services/${section.key}`}
            title={section.title}
            description={section.description}
            meta={section.sectionMeta?.(values)}
            lastUpdated={savedAt}
          />
        ))}
      </ContentList>
    </ServicesCMSPage>
  )
}

export default ServicesCMS