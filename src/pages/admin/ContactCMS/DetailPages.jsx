import SectionDetailPage from '../../../components/admin/SectionDetailPage/index.js'
import { contactSections } from './sections.jsx'

const BASE_PATH = '/admin/contact'

const ContactSectionDetail = () => (
  <SectionDetailPage
    pageKey="contact"
    basePath={BASE_PATH}
    pageTitle="Contact"
    sections={contactSections}
  />
)

export { ContactSectionDetail }
