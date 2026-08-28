import ItemDetailPage from '../../../components/admin/ItemDetailPage/index.js'
import SectionDetailPage from '../../../components/admin/SectionDetailPage/index.js'
import { homepageSections } from './sections.jsx'

const BASE_PATH = '/admin/homepage'

const HomepageSectionDetail = () => (
  <SectionDetailPage
    pageKey="homepage"
    basePath={BASE_PATH}
    pageTitle="Homepage"
    sections={homepageSections}
  />
)

const HomepageItemDetail = () => (
  <ItemDetailPage
    pageKey="homepage"
    basePath={BASE_PATH}
    pageTitle="Homepage"
    sections={homepageSections}
  />
)

export { HomepageSectionDetail, HomepageItemDetail }