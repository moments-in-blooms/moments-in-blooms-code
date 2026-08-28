import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { useContent } from '../../../hooks/useContent.js'
import { gallerySections } from './sections.jsx'
import { GalleryCMSPage } from './GalleryCMS.styles.js'

function GalleryCMS() {
  const { values, savedAt } = useContent('gallery')
  const items = values.items ?? []
  const categories = values.categories ?? []
  const pageSections = gallerySections.filter((section) => section.key !== 'items')

  return (
    <GalleryCMSPage>
      <AdminPageHeader {...adminPageMeta.gallery} />

      <ContentList title="Content" description="Gallery images and page sections.">
        <ContentCard
          to="/admin/gallery/items"
          title="Gallery images"
          description="The images in your gallery grid."
          meta={[`${items.length} images`, `${categories.length} categories`].filter(Boolean)}
          lastUpdated={savedAt}
        />
        {pageSections.map((section) => (
          <ContentCard
            key={section.key}
            to={`/admin/gallery/${section.key}`}
            title={section.title}
            description={section.description}
            meta={section.sectionMeta?.(values)}
            lastUpdated={savedAt}
          />
        ))}
      </ContentList>
    </GalleryCMSPage>
  )
}

export default GalleryCMS
