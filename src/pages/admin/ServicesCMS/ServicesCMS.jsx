import { Fragment } from 'react'
import { FiPlus } from 'react-icons/fi'
import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import Button from '../../../components/Button/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { useContent } from '../../../hooks/useContent.js'
import {
  getCatalogGroups,
  newServicePath,
  serviceEditorPath,
} from './catalog.js'
import { servicesSections } from './sections.jsx'
import { ServicesCMSPage } from './ServicesCMS.styles.js'

// Page-level copy blocks that stay editable outside the service catalog.
// Package/prize lists moved into the catalog; legacy blocks stay hidden.
const PAGE_SECTION_KEYS = [
  'hero',
  'photoboothHighlights',
  'blissfulNestIntro',
  'experienceTimeline',
  'cta',
]

function ServicesCMS() {
  const { values, savedAt } = useContent('services')

  const collectionSection = servicesSections.find((section) => section.key === 'serviceCollections')
  const collections = values.serviceCollections ?? []
  const catalogGroups = getCatalogGroups(values)
  const pageSections = servicesSections.filter((section) => PAGE_SECTION_KEYS.includes(section.key))

  return (
    <ServicesCMSPage>
      <AdminPageHeader {...adminPageMeta.services} />

      {catalogGroups.map((group) => (
        <Fragment key={group.collection.id}>
          {!group.orphan ? (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <Button to={newServicePath(group.collection.id)} variant="primary">
                <FiPlus aria-hidden="true" size={15} />
                Add service
              </Button>
            </div>
          ) : null}
          <ContentList
            title={group.collection.title || 'Untitled category'}
            description={
              group.orphan
                ? 'Services whose category page is missing — they still appear on the public site.'
                : `${group.services.length} service${group.services.length !== 1 ? 's' : ''} in this category.`
            }
            emptyState={
              group.orphan ? undefined : (
                <EmptyState
                  title="No services yet"
                  description={`Add the first service in ${group.collection.title || 'this category'}.`}
                  action={
                    <Button to={newServicePath(group.collection.id)} variant="outline">
                      <FiPlus aria-hidden="true" size={15} />
                      Add service
                    </Button>
                  }
                />
              )
            }
          >
            {group.services.map((service) => (
              <ContentCard
                key={service.id}
                to={serviceEditorPath(group.collection.id, service.id)}
                title={service.title}
                description={service.description}
                meta={service.meta}
                status={service.featured ? 'featured' : undefined}
                thumbnail={
                  service.imageSrc ? { src: service.imageSrc, alt: service.imageAlt } : undefined
                }
                lastUpdated={savedAt}
              />
            ))}
          </ContentList>
        </Fragment>
      ))}

      {collections.length === 0 ? (
        <ContentList
          title="Categories"
          description="Service categories group everything on the services page."
          emptyState={
            <EmptyState
              title="No categories found"
              description="Add your first category to get started."
              action={
                <Button to="/admin/services/serviceCollections/new" variant="outline">
                  <FiPlus aria-hidden="true" size={15} />
                  Add category
                </Button>
              }
            />
          }
        >
          {null}
        </ContentList>
      ) : (
        <ContentList
          title="Category settings"
          description="Names, cover photos and navigation text for each service category."
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
      )}

      <ContentList
        title="Page sections"
        description="The copy blocks around the service catalog."
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
