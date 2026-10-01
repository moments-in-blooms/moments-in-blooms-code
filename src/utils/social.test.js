import { describe, expect, it } from 'vitest'
import { INSTAGRAM_PROFILE_URL } from '../constants/navigation.js'
import { buildInstagramProfileUrl } from './social.js'

describe('buildInstagramProfileUrl', () => {
  it('builds a profile URL from a CMS handle', () => {
    expect(buildInstagramProfileUrl('@momentsinblooms')).toBe(
      'https://www.instagram.com/momentsinblooms/',
    )
    expect(buildInstagramProfileUrl('momentsinblooms')).toBe(
      'https://www.instagram.com/momentsinblooms/',
    )
  })

  it('trims stray whitespace and trailing slashes', () => {
    expect(buildInstagramProfileUrl(' @momentsinblooms/ ')).toBe(
      'https://www.instagram.com/momentsinblooms/',
    )
  })

  it('falls back to the official profile for a blank handle', () => {
    expect(buildInstagramProfileUrl('')).toBe(INSTAGRAM_PROFILE_URL)
    expect(buildInstagramProfileUrl(undefined)).toBe(INSTAGRAM_PROFILE_URL)
    expect(buildInstagramProfileUrl('@')).toBe(INSTAGRAM_PROFILE_URL)
  })
})
