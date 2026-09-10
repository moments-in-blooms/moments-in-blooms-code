import SectionDetailPage from '../../../components/admin/SectionDetailPage/index.js'
import { servicesSections } from './sections.jsx'

const BASE_PATH = '/admin/services/page'

const ServicesPageSectionDetail = () => (
  <SectionDetailPage
    pageKey="services"
    basePath={BASE_PATH}
    pageTitle="Services Page"
    sections={servicesSections}
  />
)

export { ServicesPageSectionDetail }
