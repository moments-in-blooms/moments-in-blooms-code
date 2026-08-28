import SectionDetailPage from '../../../components/admin/SectionDetailPage/index.js'
import { seoSections } from './sections.jsx'

const SeoSectionDetail = () => (
  <SectionDetailPage
    pageKey="seo"
    basePath="/admin/seo"
    pageTitle="SEO"
    sections={seoSections}
  />
)

export { SeoSectionDetail }