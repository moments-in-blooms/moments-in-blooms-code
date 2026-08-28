import ItemDetailPage from '../../../components/admin/ItemDetailPage/index.js'
import SectionDetailPage from '../../../components/admin/SectionDetailPage/index.js'
import CollectionDetailPage from './CollectionDetailPage.jsx'
import CollectionSectionDetailPage from './CollectionSectionDetailPage.jsx'
import { servicesSections } from './sections.jsx'

const BASE_PATH = '/admin/services'

const ServicesSectionDetail = () => (
  <SectionDetailPage
    pageKey="services"
    basePath={BASE_PATH}
    pageTitle="Services"
    sections={servicesSections}
  />
)

const ServicesItemDetail = () => (
  <ItemDetailPage
    pageKey="services"
    basePath={BASE_PATH}
    pageTitle="Services"
    sections={servicesSections}
  />
)

export {
  ServicesSectionDetail,
  ServicesItemDetail,
  CollectionDetailPage,
  CollectionSectionDetailPage,
}