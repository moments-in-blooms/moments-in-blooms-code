import { describe, expect, it } from 'vitest'
import { getSeedContent, normalizeContent } from './content.js'

const DEFAULT_SIDE_NOTE = 'Floral design\nthoughtful details\njoyful gatherings'

describe('homepage hero side note', () => {
  it('seeds the default floating words', () => {
    expect(getSeedContent('homepage').hero.sideNote).toBe(DEFAULT_SIDE_NOTE)
  })

  it('backfills the default when saved hero content predates it', () => {
    const next = normalizeContent('homepage', { hero: { title: 'T', description: 'D' } })

    expect(next.hero.sideNote).toBe(DEFAULT_SIDE_NOTE)
  })

  it('preserves a custom side note on save and read', () => {
    const next = normalizeContent('homepage', {
      hero: { title: 'T', description: 'D', sideNote: 'My custom words' },
    })

    expect(next.hero.sideNote).toBe('My custom words')
  })
})
