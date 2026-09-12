import { describe, expect, it } from 'vitest'
import { BOOTH_FALLBACK_LABEL, buildBoothTabs, groupBoothPackages } from './photobooth.js'

const mirrorPackage = {
  id: 'package-mirror-2h',
  name: 'MIRROR CLASSIC',
  price: '$600',
  inclusions: ['Mirror booth', 'Unlimited sessions'],
}

const studioPackage = {
  id: 'package-studio-3h',
  name: 'STUDIO SIGNATURE',
  price: '$850',
  inclusions: ['Studio booth', 'Prints'],
}

describe('groupBoothPackages', () => {
  it('groups subcategory items under their booth titles', () => {
    const groups = groupBoothPackages({
      id: 'luxe-photobooth',
      title: 'Luxe Photobooth',
      items: [],
      subcategories: [
        { id: 'sub-mirror', title: 'Luxe Mirror Booth', items: [mirrorPackage] },
        { id: 'sub-studio', title: 'Luxe Studio Booth', items: [studioPackage] },
      ],
    })

    expect(groups).toHaveLength(2)
    expect(groups[0]).toMatchObject({ id: 'sub-mirror', title: 'Luxe Mirror Booth' })
    expect(groups[0].packages).toHaveLength(1)
    expect(groups[0].packages[0]).toMatchObject({ id: 'package-mirror-2h', name: 'MIRROR CLASSIC' })
    expect(groups[1]).toMatchObject({ id: 'sub-studio', title: 'Luxe Studio Booth' })
    expect(groups[1].packages[0]).toMatchObject({ id: 'package-studio-3h' })
  })

  it('falls back to a single untitled group for direct items', () => {
    const groups = groupBoothPackages({
      id: 'luxe-photobooth',
      title: 'Luxe Photobooth',
      items: [mirrorPackage, studioPackage],
      subcategories: [],
    })

    expect(groups).toHaveLength(1)
    expect(groups[0].title).toBe('')
    expect(groups[0].packages).toHaveLength(2)
  })

  it('returns no groups when the category has no packages', () => {
    expect(groupBoothPackages({ id: 'luxe-photobooth', items: [], subcategories: [] })).toEqual([])
    expect(groupBoothPackages(null)).toEqual([])
  })

  it('skips empty subcategories and keeps direct items visible', () => {
    const groups = groupBoothPackages({
      id: 'luxe-photobooth',
      items: [mirrorPackage],
      subcategories: [
        { id: 'sub-empty', title: 'Coming soon', items: [] },
        { id: 'sub-studio', title: 'Luxe Studio Booth', items: [studioPackage] },
      ],
    })

    expect(groups.map((group) => group.id)).toEqual(['luxe-photobooth', 'sub-studio'])
    expect(groups[0].packages).toHaveLength(1)
    expect(groups[1].packages).toHaveLength(1)
  })
})

describe('buildBoothTabs', () => {
  it('labels each booth with its title', () => {
    const tabs = buildBoothTabs([
      { id: 'sub-mirror', title: 'Luxe Mirror Booth', packages: [mirrorPackage] },
      { id: 'sub-studio', title: 'Luxe Studio Booth', packages: [studioPackage] },
    ])

    expect(tabs).toEqual([
      { id: 'sub-mirror', label: 'Luxe Mirror Booth' },
      { id: 'sub-studio', label: 'Luxe Studio Booth' },
    ])
  })

  it('labels an untitled group with the fallback label', () => {
    const tabs = buildBoothTabs([{ id: 'luxe-photobooth', title: '', packages: [mirrorPackage] }])

    expect(tabs).toEqual([{ id: 'luxe-photobooth', label: BOOTH_FALLBACK_LABEL }])
    expect(BOOTH_FALLBACK_LABEL).toBe('All Packages')
  })

  it('returns no tabs when there are no groups', () => {
    expect(buildBoothTabs([])).toEqual([])
    expect(buildBoothTabs(null)).toEqual([])
  })
})
