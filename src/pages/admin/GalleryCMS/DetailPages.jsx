import ItemDetailPage from '../../../components/admin/ItemDetailPage/index.js'
import SectionDetailPage from '../../../components/admin/SectionDetailPage/index.js'
import { gallerySections } from './sections.jsx'

const BASE_PATH = '/admin/gallery'

const GallerySectionDetail = () => (
  <SectionDetailPage
    pageKey="gallery"
    basePath={BASE_PATH}
    pageTitle="Gallery"
    sections={gallerySections}
  />
)

const GalleryItemDetail = () => (
  <ItemDetailPage
    pageKey="gallery"
    basePath={BASE_PATH}
    pageTitle="Gallery"
    sections={gallerySections}
  />
)

export { GallerySectionDetail, GalleryItemDetail }