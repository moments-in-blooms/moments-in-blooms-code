import ItemDetailPage from '../../../components/admin/ItemDetailPage/index.js'
import SectionDetailPage from '../../../components/admin/SectionDetailPage/index.js'
import { aboutSections } from './sections.jsx'

const BASE_PATH = '/admin/about'

const AboutSectionDetail = () => (
  <SectionDetailPage
    pageKey="about"
    basePath={BASE_PATH}
    pageTitle="About"
    sections={aboutSections}
  />
)

const AboutItemDetail = () => (
  <ItemDetailPage
    pageKey="about"
    basePath={BASE_PATH}
    pageTitle="About"
    sections={aboutSections}
  />
)

export { AboutSectionDetail, AboutItemDetail }