/**
 * Canonical services-catalog store.
 *
 * Every category / sub-category / item read and write goes through these
 * helpers. They operate on `values.catalog.categories[]` (built by
 * `buildServicesCatalog` in src/services/content.js) and every writer
 * persists through `writeCatalog`, which regenerates the legacy mirrors so
 * legacy readers (the public Services page until its rewrite) keep working.
 *
 * Relationship rules enforced here:
 *  - a sub-category always belongs to exactly one category;
 *  - an item belongs to a category, optionally inside one sub-category;
 *  - deleting a category/sub-category that still has children is blocked
 *    until the children are moved (see `moveCategoryChildren` and
 *    `moveSubcategoryItems`).
 */
import { inferCatalogKind, mirrorServicesLegacyFromCatalog } from '../../../services/content.js'

export { inferCatalogKind }

export const slugify = (value) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */

export const categoriesPath = '/admin/services/categories'
export const categoryPath = (categoryId) => `/admin/services/categories/${categoryId}`
export const newCategoryPath = '/admin/services/categories/new'
export const subcategoriesPath = '/admin/services/subcategories'
export const subcategoryPath = (subcategoryId) => `/admin/services/subcategories/${subcategoryId}`
export const newSubcategoryPath = (categoryId) =>
  categoryId
    ? `/admin/services/subcategories/new?category=${encodeURIComponent(categoryId)}`
    : '/admin/services/subcategories/new'
export const itemsPath = '/admin/services/items'
export const itemPath = (itemId) => `/admin/services/items/${itemId}`
export const newItemPath = ({ categoryId, subcategoryId } = {}) => {
  const params = new URLSearchParams()
  if (categoryId) params.set('category', categoryId)
  if (subcategoryId) params.set('subcategory', subcategoryId)
  const query = params.toString()
  return `/admin/services/items/new${query ? `?${query}` : ''}`
}
export const servicesPagePath = '/admin/services/page'
export const servicesPageSectionPath = (sectionKey) => `/admin/services/page/${sectionKey}`

/* ------------------------------------------------------------------ */
/* Reads                                                               */
/* ------------------------------------------------------------------ */

export function getCatalog(values) {
  const catalog = values?.catalog
  return catalog && typeof catalog === 'object' ? catalog : { categories: [] }
}

export function listCategories(values) {
  const categories = getCatalog(values).categories
  return Array.isArray(categories) ? categories : []
}

export function getCategory(values, categoryId) {
  if (categoryId == null || categoryId === '') return null
  return (
    listCategories(values).find((entry) => String(entry?.id) === String(categoryId)) ?? null
  )
}

export function getSubcategory(values, subcategoryId) {
  if (subcategoryId == null || subcategoryId === '') return null
  for (const category of listCategories(values)) {
    const subcategory = (category.subcategories ?? []).find(
      (sub) => String(sub?.id) === String(subcategoryId),
    )
    if (subcategory) return { category, subcategory }
  }
  return null
}

export function getItem(values, itemId) {
  if (itemId == null || itemId === '') return null
  for (const category of listCategories(values)) {
    const direct = (category.items ?? []).find((item) => String(item?.id) === String(itemId))
    if (direct) return { category, subcategory: null, item: direct }
    for (const subcategory of category.subcategories ?? []) {
      const found = (subcategory.items ?? []).find(
        (item) => String(item?.id) === String(itemId),
      )
      if (found) return { category, subcategory, item: found }
    }
  }
  return null
}

/**
 * Resolve any catalog node by id. Legacy shapes share ids with the
 * canonical tree (decor "services" were sections; packages/prizes keep
 * their ids), so legacy admin URLs resolve through this too.
 */
export function resolveCatalogNode(values, id) {
  const category = getCategory(values, id)
  if (category) return { type: 'category', category }
  const sub = getSubcategory(values, id)
  if (sub) return { type: 'subcategory', ...sub }
  const item = getItem(values, id)
  if (item) return { type: 'item', ...item }
  return null
}

export function categoryCounts(category) {
  const subcategories = Array.isArray(category?.subcategories) ? category.subcategories : []
  const directItems = Array.isArray(category?.items) ? category.items.length : 0
  const nestedItems = subcategories.reduce(
    (total, sub) => total + (Array.isArray(sub?.items) ? sub.items.length : 0),
    0,
  )
  return { subcategories: subcategories.length, directItems, items: directItems + nestedItems }
}

/* ------------------------------------------------------------------ */
/* Display helpers (kind-native fields differ: sections use `title`,    */
/* featured items and packages use `name`)                             */
/* ------------------------------------------------------------------ */

export const itemDisplayName = (item) => item?.name ?? item?.title ?? 'Untitled item'
export const itemSubtitle = (item) => item?.tagline ?? item?.subtitle ?? ''
export const itemDescription = (item) => item?.description ?? item?.desc ?? ''
export const itemPrice = (item) => item?.price ?? ''
export const itemIsFeatured = (item) => Boolean(item?.isFeatured ?? item?.popular)

export function itemThumbnail(item) {
  const image = item?.image
  const fallback = itemDisplayName(item)
  if (typeof image === 'string') {
    return image ? { src: image, alt: fallback } : undefined
  }
  if (image && typeof image === 'object' && image.src) {
    return { src: image.src, alt: image.alt || fallback }
  }
  return undefined
}

export function parentLabel(category, subcategory) {
  if (category && subcategory) return `${category.title ?? 'Untitled'} › ${subcategory.title ?? 'Untitled'}`
  if (category) return `${category.title ?? 'Untitled'} › Top level`
  return 'Unassigned'
}

// Local marker check (mirrors isStorageUrl in src/services/storage.js without
// pulling the Supabase client into this pure store module).
const isStorageUrlLike = (url) =>
  typeof url === 'string' && url.includes('/storage/v1/object/public/')

/** Collect every Supabase Storage URL inside a value (for file cleanup). */
export function collectStorageUrls(value, acc = new Set()) {
  if (!value) return acc
  if (typeof value === 'string') {
    if (isStorageUrlLike(value)) acc.add(value)
    return acc
  }
  if (Array.isArray(value)) {
    value.forEach((entry) => collectStorageUrls(entry, acc))
    return acc
  }
  if (typeof value === 'object') {
    Object.values(value).forEach((entry) => collectStorageUrls(entry, acc))
  }
  return acc
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

export function validateCategory(draft, categories) {
  const errors = {}
  if (!draft?.title?.trim()) {
    errors.title = 'A category title is required.'
  }
  const slug = String(draft?.slug ?? '').trim()
  if (!slug) {
    errors.slug = 'A URL slug is required.'
  } else if (
    categories.some(
      (entry) => String(entry?.id) !== String(draft?.id) && String(entry?.slug ?? '') === slug,
    )
  ) {
    errors.slug = 'This slug is already used by another category.'
  }
  return errors
}

export function validateSubcategory(draft, categoryId, categories) {
  const errors = {}
  if (!draft?.title?.trim()) {
    errors.title = 'A sub-category title is required.'
  }
  if (!categoryId || !categories.some((entry) => String(entry?.id) === String(categoryId))) {
    errors.categoryId = 'Choose a parent category.'
  }
  return errors
}

export function validateItem(draft, categoryId, subcategoryId, categories) {
  const errors = {}
  if (!draft?.name?.trim() && !draft?.title?.trim()) {
    errors.name = 'A service name is required.'
  }
  const category = categories.find((entry) => String(entry?.id) === String(categoryId))
  if (!category) {
    errors.categoryId = 'Choose a category.'
  } else if (subcategoryId) {
    const belongs = (category.subcategories ?? []).some(
      (sub) => String(sub?.id) === String(subcategoryId),
    )
    if (!belongs) {
      errors.subcategoryId = 'This sub-category does not belong to the selected category.'
    }
  }
  return errors
}

/* ------------------------------------------------------------------ */
/* Factories                                                           */
/* ------------------------------------------------------------------ */

export function createCategoryDraft(order) {
  return {
    id: `category-${Date.now()}`,
    slug: '',
    title: '',
    type: 'collection',
    brand: 'Moments in Blooms',
    order: order ?? 1,
    featured: false,
    navSub: '',
    navMeta: '',
    tagline: '',
    description: '',
    coverImage: { src: '', alt: '' },
    priceFrom: '',
    subcategories: [],
    items: [],
  }
}

export function createSubcategoryDraft(order) {
  return {
    id: `subcategory-${Date.now()}`,
    title: '',
    subtitle: '',
    description: '',
    image: null,
    order: order ?? 1,
    priceFrom: '',
    items: [],
  }
}

export function createItemDraft(kind) {
  if (kind === 'package') {
    return {
      id: `package-${Date.now()}`,
      name: '',
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
  if (kind === 'prize') {
    return {
      id: `nest-${Date.now()}`,
      name: '',
      tagline: '',
      description: '',
      badge: '',
      price: '',
      items: [],
      image: { src: '', alt: '' },
      isFeatured: false,
    }
  }
  return {
    id: `item-${Date.now()}`,
    name: '',
    tagline: '',
    dimensions: '',
    description: '',
    price: '',
    isFeatured: false,
    image: { src: '', alt: '' },
    options: [],
    gallery: [],
  }
}

/* ------------------------------------------------------------------ */
/* Writers — every writer persists through `writeCatalog` so the       */
/* legacy mirrors stay in sync for legacy readers.                     */
/* ------------------------------------------------------------------ */

export function writeCatalog(values, catalog) {
  const base = values && typeof values === 'object' ? values : {}
  const nextCatalog = catalog && typeof catalog === 'object' ? catalog : { categories: [] }
  return {
    ...base,
    catalog: nextCatalog,
    ...mirrorServicesLegacyFromCatalog(nextCatalog),
  }
}

const replaceById = (entries, record) => {
  const list = Array.isArray(entries) ? entries : []
  const exists = list.some((entry) => String(entry?.id) === String(record?.id))
  return exists
    ? list.map((entry) => (String(entry?.id) === String(record?.id) ? record : entry))
    : [...list, record]
}

const removeById = (entries, id) => {
  const list = Array.isArray(entries) ? entries : []
  return list.filter((entry) => String(entry?.id) !== String(id))
}

/**
 * Move one entry up/down inside its sibling list. Returns `{ list, moved }`
 * with `order` fields renumbered to match the new positions. Pure — used for
 * draft-first reordering on detail pages (persisted via the page save).
 */
export function moveListItem(entries, id, direction) {
  const list = Array.isArray(entries) ? [...entries] : []
  const index = list.findIndex((entry) => String(entry?.id) === String(id))
  const neighbor = index + direction
  if (index < 0 || neighbor < 0 || neighbor >= list.length) {
    return { list, moved: false }
  }
  const [removed] = list.splice(index, 1)
  list.splice(neighbor, 0, removed)
  return {
    list: list.map((entry, position) =>
      entry && typeof entry === 'object' ? { ...entry, order: position + 1 } : entry,
    ),
    moved: true,
  }
}

/** Reorder top-level categories (persists immediately via writeCatalog). */
export function moveCategory(values, categoryId, direction) {
  const catalog = getCatalog(values)
  const { list, moved } = moveListItem(catalog.categories, categoryId, direction)
  if (!moved) return values
  return writeCatalog(values, { ...catalog, categories: list })
}

/** Reorder sub-categories inside their parent category. */
export function moveSubcategory(values, categoryId, subcategoryId, direction) {
  const catalog = getCatalog(values)
  let moved = false
  const categories = listCategories(values).map((entry) => {
    if (String(entry?.id) !== String(categoryId)) return entry
    const result = moveListItem(entry.subcategories, subcategoryId, direction)
    if (result.moved) moved = true
    return { ...entry, subcategories: result.list }
  })
  if (!moved) return values
  return writeCatalog(values, { ...catalog, categories })
}

/** Reorder items inside their parent list (category top level or sub-category). */
export function moveItem(values, categoryId, subcategoryId, itemId, direction) {
  const catalog = getCatalog(values)
  let moved = false
  const categories = listCategories(values).map((entry) => {
    if (String(entry?.id) !== String(categoryId)) return entry
    if (subcategoryId) {
      return {
        ...entry,
        subcategories: (entry.subcategories ?? []).map((sub) => {
          if (String(sub?.id) !== String(subcategoryId)) return sub
          const result = moveListItem(sub.items, itemId, direction)
          if (result.moved) moved = true
          return { ...sub, items: result.list }
        }),
      }
    }
    const result = moveListItem(entry.items, itemId, direction)
    if (result.moved) moved = true
    return { ...entry, items: result.list }
  })
  if (!moved) return values
  return writeCatalog(values, { ...catalog, categories })
}

const removeItemFrom = (categories, categoryId, subcategoryId, itemId) =>
  categories.map((entry) => {
    if (String(entry?.id) !== String(categoryId)) return entry
    if (subcategoryId) {
      return {
        ...entry,
        subcategories: (entry.subcategories ?? []).map((sub) =>
          String(sub?.id) === String(subcategoryId)
            ? { ...sub, items: removeById(sub.items, itemId) }
            : sub,
        ),
      }
    }
    return { ...entry, items: removeById(entry.items, itemId) }
  })

export function upsertCategory(values, category) {
  const catalog = getCatalog(values)
  const categories = replaceById(catalog.categories ?? [], category)
  return writeCatalog(values, { ...catalog, categories })
}

export function removeCategory(values, categoryId) {
  const catalog = getCatalog(values)
  const categories = (catalog.categories ?? []).filter(
    (entry) => String(entry?.id) !== String(categoryId),
  )
  return writeCatalog(values, { ...catalog, categories })
}

/**
 * Move a category's children elsewhere so the category can be deleted.
 * `itemTarget` is `{ categoryId, subcategoryId|null }`.
 */
export function moveCategoryChildren(
  values,
  fromCategoryId,
  { subcategoryTargetId, itemTarget } = {},
) {
  const from = getCategory(values, fromCategoryId)
  if (!from) return values
  const subs = [...(from.subcategories ?? [])]
  const items = [...(from.items ?? [])]
  let categories = listCategories(values).map((entry) =>
    String(entry?.id) === String(fromCategoryId)
      ? { ...entry, subcategories: [], items: [] }
      : entry,
  )
  if (subs.length > 0 && subcategoryTargetId) {
    categories = categories.map((entry) =>
      String(entry?.id) === String(subcategoryTargetId)
        ? { ...entry, subcategories: [...(entry.subcategories ?? []), ...subs] }
        : entry,
    )
  }
  if (items.length > 0 && itemTarget?.categoryId) {
    categories = categories.map((entry) => {
      if (String(entry?.id) !== String(itemTarget.categoryId)) return entry
      if (itemTarget.subcategoryId) {
        return {
          ...entry,
          subcategories: (entry.subcategories ?? []).map((sub) =>
            String(sub?.id) === String(itemTarget.subcategoryId)
              ? { ...sub, items: [...(sub.items ?? []), ...items] }
              : sub,
          ),
        }
      }
      return { ...entry, items: [...(entry.items ?? []), ...items] }
    })
  }
  return writeCatalog(values, { ...getCatalog(values), categories })
}

export function upsertSubcategory(values, categoryId, subcategory, { fromCategoryId } = {}) {
  let categories = listCategories(values)
  if (fromCategoryId && String(fromCategoryId) !== String(categoryId)) {
    categories = categories.map((entry) =>
      String(entry?.id) === String(fromCategoryId)
        ? {
            ...entry,
            subcategories: removeById(entry.subcategories, subcategory?.id),
          }
        : entry,
    )
  }
  categories = categories.map((entry) =>
    String(entry?.id) === String(categoryId)
      ? { ...entry, subcategories: replaceById(entry.subcategories, subcategory) }
      : entry,
  )
  return writeCatalog(values, { ...getCatalog(values), categories })
}

export function removeSubcategory(values, categoryId, subcategoryId) {
  const categories = listCategories(values).map((entry) =>
    String(entry?.id) === String(categoryId)
      ? { ...entry, subcategories: removeById(entry.subcategories, subcategoryId) }
      : entry,
  )
  return writeCatalog(values, { ...getCatalog(values), categories })
}

/** Move a sub-category's items elsewhere so it can be deleted. */
export function moveSubcategoryItems(values, categoryId, subcategoryId, itemTarget) {
  const found = getSubcategory(values, subcategoryId)
  if (!found || !itemTarget?.categoryId) return values
  const items = [...(found.subcategory.items ?? [])]
  let categories = listCategories(values).map((entry) =>
    String(entry?.id) === String(categoryId)
      ? {
          ...entry,
          subcategories: (entry.subcategories ?? []).map((sub) =>
            String(sub?.id) === String(subcategoryId) ? { ...sub, items: [] } : sub,
          ),
        }
      : entry,
  )
  categories = categories.map((entry) => {
    if (String(entry?.id) !== String(itemTarget.categoryId)) return entry
    if (itemTarget.subcategoryId) {
      return {
        ...entry,
        subcategories: (entry.subcategories ?? []).map((sub) =>
          String(sub?.id) === String(itemTarget.subcategoryId)
            ? { ...sub, items: [...(sub.items ?? []), ...items] }
            : sub,
        ),
      }
    }
    return { ...entry, items: [...(entry.items ?? []), ...items] }
  })
  return writeCatalog(values, { ...getCatalog(values), categories })
}

export function upsertItem(values, categoryId, subcategoryId, item, { from } = {}) {
  let categories = listCategories(values)
  if (
    from &&
    (String(from.categoryId) !== String(categoryId) ||
      String(from.subcategoryId ?? '') !== String(subcategoryId ?? ''))
  ) {
    categories = removeItemFrom(categories, from.categoryId, from.subcategoryId, item?.id)
  }
  categories = categories.map((entry) => {
    if (String(entry?.id) !== String(categoryId)) return entry
    if (subcategoryId) {
      return {
        ...entry,
        subcategories: (entry.subcategories ?? []).map((sub) =>
          String(sub?.id) === String(subcategoryId)
            ? { ...sub, items: replaceById(sub.items, item) }
            : sub,
        ),
      }
    }
    return { ...entry, items: replaceById(entry.items, item) }
  })
  return writeCatalog(values, { ...getCatalog(values), categories })
}

export function deleteItem(values, categoryId, subcategoryId, itemId) {
  const categories = removeItemFrom(
    listCategories(values),
    categoryId,
    subcategoryId,
    itemId,
  )
  return writeCatalog(values, { ...getCatalog(values), categories })
}
