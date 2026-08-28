import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { useContent } from '../../../hooks/useContent.js'
import { settingsSections } from './sections.jsx'
import { SettingsPage } from './Settings.styles.js'

const SETTINGS_GROUPS = [
  {
    title: 'Footer contact details',
    description: 'The phone number, email and location shown in the footer.',
    keys: ['footerContact'],
  },
  {
    title: 'Links & navigation',
    description: 'Social links and the footer navigation columns.',
    keys: ['footerSocialLinks', 'footerGroups'],
  },
]

function Settings() {
  const { values, savedAt } = useContent('settings')

  return (
    <SettingsPage>
      <AdminPageHeader {...adminPageMeta.settings} />

      <ContentList title="My account" description="Your display name, email and password for admin access.">
        <ContentCard
          to="/admin/settings/account"
          title="My account"
          description="Update your display name, email and password."
        />
      </ContentList>

      {SETTINGS_GROUPS.map((group) => {
        const sections = group.keys
          .map((key) => settingsSections.find((section) => section.key === key))
          .filter(Boolean)

        return (
          <ContentList key={group.title} title={group.title} description={group.description}>
            {sections.map((section) => (
              <ContentCard
                key={section.key}
                to={`/admin/settings/${section.key}`}
                title={section.title}
                description={section.description}
                meta={section.sectionMeta?.(values)}
                lastUpdated={savedAt}
              />
            ))}
          </ContentList>
        )
      })}
    </SettingsPage>
  )
}

export default Settings