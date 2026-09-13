import { describe, expect, it } from 'vitest'
import { homepageTrustMarks } from '../constants/homepage.js'
import { getSeedContent, normalizeContent } from './content.js'

describe('homepage trust marks', () => {
  it('seeds the trust marks', () => {
    expect(getSeedContent('homepage').trustMarks).toEqual([...homepageTrustMarks])
  })

  it('backfills trust marks when saved homepage content predates them', () => {
    const next = normalizeContent('homepage', { hero: { title: 'T' } })

    expect(next.trustMarks).toEqual([...homepageTrustMarks])
  })

  it('preserves an intentionally emptied trust marks list', () => {
    const next = normalizeContent('homepage', { trustMarks: [] })

    expect(next.trustMarks).toEqual([])
  })

  it('preserves custom trust marks on save and read', () => {
    const marks = ['Weddings', 'Birthdays', 'Brand events', 'Private celebrations']
    const next = normalizeContent('homepage', { trustMarks: marks })

    expect(next.trustMarks).toEqual(marks)
  })
})
