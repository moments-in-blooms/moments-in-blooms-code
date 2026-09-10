import {
  footerContact as defaultContact,
  footerNavigationGroups as defaultFooterGroups,
  footerSocialLinks as defaultSocialLinks,
} from '../constants/navigation.js'
import { useContent } from './useContent.js'

/**
 * Single source of truth for site-wide contact details.
 * Reads the Settings CMS page (`footerContact`, `footerSocialLinks`) and
 * falls back to the seed constants when nothing has been saved yet.
 * Must be used within a ContentProvider.
 */
function useSiteSettings() {
  const { values } = useContent('settings')

  const contact = { ...defaultContact, ...(values.footerContact ?? {}) }
  const socialLinks =
    (values.footerSocialLinks ?? []).length > 0
      ? values.footerSocialLinks
      : defaultSocialLinks
  const footerGroups =
    (values.footerGroups ?? []).length > 0
      ? values.footerGroups
      : defaultFooterGroups

  return { contact, socialLinks, footerGroups }
}

export default useSiteSettings
