import SectionDetailPage from '../../../components/admin/SectionDetailPage/index.js'
import { settingsSections } from './sections.jsx'

const SettingsSectionDetail = () => (
  <SectionDetailPage
    pageKey="settings"
    basePath="/admin/settings"
    pageTitle="Settings"
    sections={settingsSections}
  />
)

export { SettingsSectionDetail }