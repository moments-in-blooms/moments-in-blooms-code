import { FiPlus } from 'react-icons/fi'
import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import Button from '../../../components/Button/index.js'
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Button to="/admin/services/serviceCollections/new" variant="primary">
          <FiPlus aria-hidden="true" size={15} />
          Add collection
        </Button>
      </div>
      <ContentList
        title="Collections"
        description="The main service collections and everything inside them — add Luxe booth types, Decor hire categories, or any new service."
        emptyState={
          <EmptyState
            title="No collections found"
            description="Add your first collection to get started."
            action={
              <Button to="/admin/services/serviceCollections/new" variant="outline">
                <FiPlus aria-hidden="true" size={15} />
                Add collection
              </Button>
            }
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