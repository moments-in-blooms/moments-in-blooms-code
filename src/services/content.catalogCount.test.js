import { describe, expect, it } from 'vitest'
import { catalogCategoryCount, getSeedContent } from './content.js'

const categories = () => getSeedContent('services').catalog.categories

const byId = (id) => categories().find((category) => category.id === id)

describe('catalogCategoryCount', () => {
  it('counts decor sub-categories as collections', () => {
    const summary = catalogCategoryCount(byId('decor-hire'))

    expect(summary).toMatchObject({ count: 4, label: 'collections' })
  })

  it('counts package items as packages', () => {
    const summary = catalogCategoryCount(byId('luxe-photobooth'))

    expect(summary).toMatchObject({ count: 3, label: 'packages' })
  })

  it('counts prize items across sub-categories as prize options', () => {
    const summary = catalogCategoryCount(byId('blissful-nest'))

    expect(summary).toMatchObject({ count: 4, label: 'prize options' })
  })

  it('uses CMS-provided label wording when set', () => {
    const labels = {
      collectionsLabel: 'curated collections',
      packagesLabel: 'photo packages',
      prizeOptionsLabel: 'claw prizes',
    }

    expect(catalogCategoryCount(byId('decor-hire'), labels).label).toBe(
      'curated collections',
    )
    expect(catalogCategoryCount(byId('luxe-photobooth'), labels).label).toBe(
      'photo packages',
    )
    expect(catalogCategoryCount(byId('blissful-nest'), labels).label).toBe(
      'claw prizes',
    )
  })

  it('counts a direct-items block as one decor collection', () => {
    const summary = catalogCategoryCount({
      id: 'custom-decor',
      subcategories: [{ id: 's1', items: [] }],
      items: [{ id: 'i1' }, { id: 'i2' }],
    })

    expect(summary).toMatchObject({ count: 2, label: 'collections' })
  })

  it('returns null for empty categories so the tab hides the line', () => {
    expect(
      catalogCategoryCount({ id: 'empty-decor', subcategories: [], items: [] }),
    ).toBeNull()
    expect(
      catalogCategoryCount({ id: 'luxe-photobooth', items: [] }),
    ).toBeNull()
    expect(catalogCategoryCount(null)).toBeNull()
    expect(catalogCategoryCount(undefined)).toBeNull()
  })
})
