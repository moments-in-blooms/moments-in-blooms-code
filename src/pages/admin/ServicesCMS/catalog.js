/**
 * Unified "service catalog" view over the stored services content.
 *
 * The public page renders three native shapes (decor collection sections,
 * photobooth packages, blissful-nest prize options); this module presents
 * them to the admin as one flat idea — "services grouped by category" — and
 * maps edits back onto the native shapes so public rendering never changes.
 */

export const SERVICE_KINDS = Object.freeze({
  DECOR: 'decor',
  PACKAGE: 'package',
  PRIZE: 'prize',
})

export const serviceEditorPath = (categoryId, serviceId) =>
  `/admin/services/catalog/${categoryId}/${serviceId}`

export const newServicePath = (categoryId) =>
  `/admin/services/catalog/${categoryId}/new`

export function kindForCollection(collection) {
  if (!collection) return SERVICE_KINDS.DECOR
  if (collection.id === 'luxe-photobooth') return SERVICE_KINDS.PACKAGE
  if (collection.id === 'blissful-nest' || collection.type === 'sub-brand') {
    return SERVICE_KINDS.PRIZE
  }
  return SERVICE_KINDS.DECOR
}

const clone = (value) => (value == null ? null : JSON.parse(JSON.stringify(value)))

const imageSrcOf = (image) =>
  typeof image === 'string' ? image : (image?.src ?? '')

const imageAltOf = (image, fallback = '') =>
  typeof image === 'string' ? fallback : (image?.alt ?? fallback)

const upsertById = (items, record) => {
  const exists = items.some((entry) => String(entry.id) === String(record.id))
  return exists
    ? items.map((entry) => (String(entry.id) === String(record.id) ? record : entry))
    : [...items, record]
}

/* ------------------------------------------------------------------ */
/* Unified list entries (display only)                                 */
/* ------------------------------------------------------------------ */

function decorServiceEntry(collection, section) {
  const items = Array.isArray(section.featuredItems) ? section.featuredItems : []
  const primary = items[0] ?? null
  const optionCount = items.reduce(
    (total, item) => total + (Array.isArray(item.options) ? item.options.length : 0),
    0,
  )
  const meta = [`${optionCount} variant${optionCount !== 1 ? 's' : ''}`]
  if (items.length > 1) meta.push(`${items.length} items`)
  return {
    id: section.id,
    kind: SERVICE_KINDS.DECOR,
    title: section.title || primary?.name || 'Untitled service',
    description: section.subtitle || section.description || primary?.tagline || '',
    meta,
    imageSrc: imageSrcOf(primary?.image),
    imageAlt: imageAltOf(primary?.image, primary?.name),
    featured: items.some((item) => item.isFeatured),
  }
}

function packageServiceEntry(pkg) {
  return {
    id: pkg.id,
    kind: SERVICE_KINDS.PACKAGE,
    title: `${pkg.name ?? ''} ${pkg.price ?? ''}`.trim() || 'New package',
    description: pkg.tagline || '',
    meta: [pkg.hireDuration, pkg.badge].filter(Boolean),
    imageSrc: '',
    imageAlt: '',
    featured: Boolean(pkg.popular),
  }
}

function prizeServiceEntry(pkg) {
  return {
    id: pkg.id,
    kind: SERVICE_KINDS.PRIZE,
    title: pkg.name || 'New prize option',
    description: pkg.tagline || '',
    meta: [pkg.badge].filter(Boolean),
    imageSrc: imageSrcOf(pkg.image),
    imageAlt: imageAltOf(pkg.image, pkg.name),
    featured: Boolean(pkg.isFeatured),
  }
}

/**
 * Unified service entries for one collection/category.
 * `sectionsOverride` lets callers read live draft sections instead of saved.
 */
export function listCategoryServices(values, collection, sectionsOverride) {
  if (!collection) return []
  const kind = kindForCollection(collection)
  if (kind === SERVICE_KINDS.PACKAGE) {
    return (values.photoboothPackages ?? []).map(packageServiceEntry)
  }
  if (kind === SERVICE_KINDS.PRIZE) {
    return (values.blissfulNestPackages ?? []).map(prizeServiceEntry)
  }
  const sections = sectionsOverride ?? collection.sections ?? []
  return sections.map((section) => decorServiceEntry(collection, section))
}

/**
 * Catalog groups for the landing page: one per collection, in stored order.
 * Packages whose collection was removed surface in an unassigned group so
 * they can never become invisible/orphaned.
 */
export function getCatalogGroups(values) {
  const collections = values.serviceCollections ?? []
  const groups = collections.map((collection) => ({
    collection,
    kind: kindForCollection(collection),
    services: listCategoryServices(values, collection),
    orphan: false,
  }))

  const hasLuxe = collections.some((entry) => entry.id === 'luxe-photobooth')
  const hasBlissful = collections.some(
    (entry) => entry.id === 'blissful-nest' || entry.type === 'sub-brand',
  )
  if (!hasLuxe && (values.photoboothPackages ?? []).length > 0) {
    groups.push({
      collection: { id: 'luxe-photobooth', title: 'Luxe Photobooth (unassigned)' },
      kind: SERVICE_KINDS.PACKAGE,
      services: (values.photoboothPackages ?? []).map(packageServiceEntry),
      orphan: true,
    })
  }
  if (!hasBlissful && (values.blissfulNestPackages ?? []).length > 0) {
    groups.push({
      collection: { id: 'blissful-nest', title: 'Blissful Nest (unassigned)' },
      kind: SERVICE_KINDS.PRIZE,
      services: (values.blissfulNestPackages ?? []).map(prizeServiceEntry),
      orphan: true,
    })
  }
  return groups
}

/* ------------------------------------------------------------------ */
/* Editor read/write (native shapes)                                   */
/* ------------------------------------------------------------------ */

/**
 * Native stored record for one service, cloned for draft editing.
 * Returns { collection, kind, record } — record is null when missing.
 */
export function getServiceForEdit(values, categoryId, serviceId) {
  const normalizedCategoryId = String(categoryId)
  const collection =
    (values.serviceCollections ?? []).find(
      (entry) => String(entry.id) === normalizedCategoryId,
    ) ?? null
  if (collection) {
    const kind = kindForCollection(collection)
    let record
    if (kind === SERVICE_KINDS.PACKAGE) {
      record = (values.photoboothPackages ?? []).find(
        (entry) => String(entry.id) === String(serviceId),
      )
    } else if (kind === SERVICE_KINDS.PRIZE) {
      record = (values.blissfulNestPackages ?? []).find(
        (entry) => String(entry.id) === String(serviceId),
      )
    } else {
      record = (collection.sections ?? []).find(
        (entry) => String(entry.id) === String(serviceId),
      )
    }
    return { collection, kind, record: clone(record ?? null) }
  }
  // Orphan fallback: the category page was removed but its packages still
  // render on the public site — keep them editable instead of invisible.
  if (normalizedCategoryId === 'luxe-photobooth') {
    const record = (values.photoboothPackages ?? []).find(
      (entry) => String(entry.id) === String(serviceId),
    )
    if (record) {
      return {
        collection: { id: 'luxe-photobooth', title: 'Luxe Photobooth' },
        kind: SERVICE_KINDS.PACKAGE,
        record: clone(record),
        orphan: true,
      }
    }
  }
  if (normalizedCategoryId === 'blissful-nest') {
    const record = (values.blissfulNestPackages ?? []).find(
      (entry) => String(entry.id) === String(serviceId),
    )
    if (record) {
      return {
        collection: { id: 'blissful-nest', title: 'Blissful Nest' },
        kind: SERVICE_KINDS.PRIZE,
        record: clone(record),
        orphan: true,
      }
    }
  }
  return { collection: null, kind: null, record: null }
}

const blankFeaturedItem = (name = 'New service') => ({
  id: `featured-${Date.now()}`,
  name,
  tagline: '',
  dimensions: '',
  description: '',
  isFeatured: true,
  image: { src: '', alt: '' },
  options: [],
  gallery: [],
})

export function createServiceDraft(categoryId) {
  // New records assume the fixed site taxonomy (decor/luxe/blissful); edits
  // always resolve the kind from the stored collection instead.
  const kind =
    categoryId === 'luxe-photobooth'
      ? SERVICE_KINDS.PACKAGE
      : categoryId === 'blissful-nest'
        ? SERVICE_KINDS.PRIZE
        : SERVICE_KINDS.DECOR
  if (kind === SERVICE_KINDS.PACKAGE) {
    return {
      id: `package-${Date.now()}`,
      name: 'NEW PACKAGE',
      tagline: '',
      price: '',
      hireDuration: '',
      popular: false,
      badge: '',
      description: '',
      inclusions: [],
      addOns: [],
      travelNotes: '',
      ctaText: 'Reserve Your Date',
    }
  }
  if (kind === SERVICE_KINDS.PRIZE) {
    return {
      id: `nest-${Date.now()}`,
      name: 'New prize option',
      tagline: '',
      description: '',
      badge: '',
      items: [],
      image: { src: '', alt: '' },
      isFeatured: false,
    }
  }
  return {
    id: `section-${Date.now()}`,
    title: 'New service',
    subtitle: '',
    description: '',
    featuredItems: [blankFeaturedItem('New service')],
  }
}

export { blankFeaturedItem }

/**
 * Merge an edited service back into a full services-values object without
 * reshaping anything else. Decor sections keep every extra featured item
 * beyond the edited primary one, and the legacy `featuredItem` mirror is
 * kept in sync for the public renderer.
 */
export function upsertService(values, categoryId, record) {
  const collections = values.serviceCollections ?? []
  const collection = collections.find((entry) => String(entry.id) === String(categoryId))
  const kind = kindForCollection(collection ?? { id: categoryId })
  if (kind === SERVICE_KINDS.PACKAGE) {
    return {
      ...values,
      photoboothPackages: upsertById(values.photoboothPackages ?? [], record),
    }
  }
  if (kind === SERVICE_KINDS.PRIZE) {
    return {
      ...values,
      blissfulNestPackages: upsertById(values.blissfulNestPackages ?? [], record),
    }
  }
  if (!collection) return values
  const toSave = { ...record }
  if (Array.isArray(toSave.featuredItems) && toSave.featuredItems.length > 0) {
    toSave.featuredItem = toSave.featuredItems[0]
  } else {
    delete toSave.featuredItem
  }
  return {
    ...values,
    serviceCollections: collections.map((entry) =>
      String(entry.id) === String(categoryId)
        ? { ...entry, sections: upsertById(entry.sections ?? [], toSave) }
        : entry,
    ),
  }
}

export function deleteService(values, categoryId, serviceId) {
  const collections = values.serviceCollections ?? []
  const collection = collections.find((entry) => String(entry.id) === String(categoryId))
  const kind = kindForCollection(collection ?? { id: categoryId })
  if (kind === SERVICE_KINDS.PACKAGE) {
    return {
      ...values,
      photoboothPackages: (values.photoboothPackages ?? []).filter(
        (entry) => String(entry.id) !== String(serviceId),
      ),
    }
  }
  if (kind === SERVICE_KINDS.PRIZE) {
    return {
      ...values,
      blissfulNestPackages: (values.blissfulNestPackages ?? []).filter(
        (entry) => String(entry.id) !== String(serviceId),
      ),
    }
  }
  if (!collection) return values
  return {
    ...values,
    serviceCollections: collections.map((entry) =>
      String(entry.id) === String(categoryId)
        ? {
            ...entry,
            sections: (entry.sections ?? []).filter(
              (section) => String(section.id) !== String(serviceId),
            ),
          }
        : entry,
    ),
  }
}
