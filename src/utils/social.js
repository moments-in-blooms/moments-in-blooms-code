import { INSTAGRAM_PROFILE_URL } from '../constants/navigation.js'

/**
 * Resolve the public Instagram profile URL from a CMS handle. The homepage
 * Instagram heading stores the handle (`@momentsinblooms`), so the link
 * follows a handle change with no code edit; a blank handle falls back to the
 * official profile.
 */
export function buildInstagramProfileUrl(handle) {
  const clean = String(handle ?? '')
    .trim()
    .replace(/^@+/, '')
    .replace(/\/+$/, '')
  return clean ? `https://www.instagram.com/${clean}/` : INSTAGRAM_PROFILE_URL
}
