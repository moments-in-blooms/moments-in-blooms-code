const normalizeTitle = (value) => String(value ?? '').trim().toLowerCase()

/** The category identity a homepage entry claims, if any. */
export const overrideKey = (override) => {
  if (!override || typeof override !== 'object') return ''
  return String(override.collectionId || override.id || '')
}

/**
 * Claim the homepage override for one catalog category from the pool,
 * marking it used so it can never back a second card. Id-linked entries
 * win (last one wins, mirroring Map overwrite); otherwise the first
 * unlinked entry whose title matches the category (trimmed,
 * case-insensitive). Returns `null` when nothing matches.
 */
function claimOverride(pool, categoryIds, category, used) {
  const categoryId = String(category?.id ?? '')
  let match = -1
  pool.forEach((entry, index) => {
    if (!used.has(index) && overrideKey(entry) !== '' && overrideKey(entry) === categoryId) {
      match = index
    }
  })
  if (match >= 0) {
    used.add(match)
    return pool[match]
  }
  const title = normalizeTitle(category?.title)
  if (!title) return null
  const found = pool.findIndex(
    (entry, index) =>
      !used.has(index) &&
      !categoryIds.has(overrideKey(entry)) &&
      normalizeTitle(entry.title) === title,
  )
  if (found >= 0) {
    used.add(found)
    return pool[found]
  }
  return null
}

/**
 * Resolve the homepage override for one catalog category: the entry linked
 * by id first, otherwise the first unlinked entry whose title matches the
 * category (trimmed, case-insensitive). Shares the merge rules of
 * `buildServiceCards` so admin editors and the public page resolve the
 * same override. Returns `null` when nothing matches.
 */
export function findServiceOverride(overrides, categories, category) {
  if (!category || typeof category !== 'object') return null
  const pool = (Array.isArray(overrides) ? overrides : []).filter(
    (entry) => entry && typeof entry === 'object',
  )
  const categoryIds = new Set(
    (Array.isArray(categories) ? categories : []).map((entry) => String(entry?.id ?? '')),
  )
  return claimOverride(pool, categoryIds, category, new Set())
}

/**
 * Build homepage service cards from the live catalog. Each category becomes
 * a card; a Homepage CMS entry with a matching `collectionId` (or `id`)
 * overrides the display copy, image, link and layout. An entry without an
 * id match is matched by title (trimmed, case-insensitive) and merged into
 * that category's card, so a homepage card and a category with the same
 * title can never render as two cards. Entries that match neither are
 * dropped — a homepage card must always resolve to a live category.
 */
export function buildServiceCards(categories, overrides) {
  const list = Array.isArray(categories) ? categories : []
  const pool = (Array.isArray(overrides) ? overrides : []).filter(
    (entry) => entry && typeof entry === 'object',
  )
  const categoryIds = new Set(list.map((entry) => String(entry?.id ?? '')))
  const used = new Set()
  const cards = list.map((category, index) => {
    const override = claimOverride(pool, categoryIds, category, used)
    const image =
      override?.image?.src
        ? override.image
        : category.coverImage?.src
          ? {
              src: category.coverImage.src,
              alt: category.coverImage.alt || category.title,
            }
          : { src: '', alt: '' }
    return {
      id: category.id,
      collectionId: category.id,
      eyebrow: override?.eyebrow ?? '',
      title: override?.title || category.title || '',
      description: override?.description || category.description || category.tagline || '',
      path: override?.path || `/services?collection=${encodeURIComponent(category.id)}`,
      offset: override?.offset ?? index % 2 === 1,
      image,
    }
  })
  return cards
}
