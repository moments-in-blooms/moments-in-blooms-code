const asList = (value) => (Array.isArray(value) ? value : []).filter((entry) => entry && typeof entry === 'object')

/** Tab label for a package group with no booth title (top-level packages). */
export const BOOTH_FALLBACK_LABEL = 'All Packages'

/**
 * Tab entries for the booth filter. Each group becomes a tab labeled with
 * its booth title; untitled groups fall back to `BOOTH_FALLBACK_LABEL` so
 * they are never hidden behind a blank tab.
 */
export function buildBoothTabs(groups) {
  return asList(groups).map((group) => ({
    id: String(group.id ?? ''),
    label: String(group.title ?? '').trim() || BOOTH_FALLBACK_LABEL,
  }))
}

/**
 * Group a package-kind category's packages by booth. Sub-categories (e.g.
 * Luxe Mirror Booth, Luxe Studio Booth) become titled groups in order;
 * packages attached directly to the category form a leading untitled group
 * so the legacy flat shape (direct items only) renders exactly as before.
 * Sub-categories without packages are skipped.
 */
export function groupBoothPackages(category) {
  if (!category || typeof category !== 'object') return []
  const groups = []
  const direct = asList(category.items)
  if (direct.length > 0) {
    groups.push({ id: String(category.id ?? 'packages'), title: '', packages: direct })
  }
  for (const subcategory of asList(category.subcategories)) {
    const packages = asList(subcategory.items)
    if (packages.length === 0) continue
    groups.push({
      id: String(subcategory.id ?? ''),
      title: subcategory.title ?? '',
      packages,
    })
  }
  return groups
}
