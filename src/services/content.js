import {
  aboutBehindExperience,
  aboutBrandStory,
  aboutCoreValues,
  aboutCoreValuesHeading,
  aboutCta,
  aboutHero,
  aboutMissionVision,
  aboutSeo,
  aboutStats,
  aboutTestimonialHighlight,
  aboutWhyChooseUs,
} from '../constants/about.js'
import {
  contactCta,
  contactHero,
  contactInformation,
  contactSeo,
  enquiryFormRail,
  eventTypeOptions,
  guestCountOptions,
  serviceInterestOptions,
  setupRequirementOptions,
} from '../constants/contact.js'
import {
  faqCategories,
  faqItems,
  faqPageContent,
} from '../constants/faqs.js'
import {
  homepageCta,
  homepageGalleryHeading,
  homepageGalleryItems,
  homepageHero,
  homepageInstagramHeading,
  homepageInstagramItems,
  homepageReasons,
  homepageSeo,
  homepageServices,
  homepageServicesHeading,
  homepageTestimonials,
  homepageTestimonialsHeading,
  homepageTrustedBy,
  homepageTrustMarks,
  homepageWhyChooseUs,
} from '../constants/homepage.js'
import {
  footerContact,
  footerNavigationGroups,
  footerSocialLinks,
  routeMetadata,
} from '../constants/navigation.js'
import {
  blissfulNestIntro,
  blissfulNestPackages,
  photoboothHighlights,
  photoboothPackages,
  serviceCollections,
  serviceCollectionsShowcase,
  servicesCatalogueLabels,
  servicesCta,
  servicesExperienceTimeline,
  servicesFaqPreview,
  servicesGallery,
  servicesHero,
  servicesIntro,
  servicesSeo,
  servicesTestimonials,
} from '../constants/services.js'
import {
  CTA_CONTENT,
  FEATURED_STORIES,
  FEATURED_STORIES_SECTION_CONTENT,
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  GALLERY_LABELS,
  HERO_CONTENT,
  INSTAGRAM_CONTENT,
  INSTAGRAM_POSTS,
} from '../pages/public/Gallery/constants/galleryData.js'

const STORAGE_KEY = 'mib_admin_content_v1'

const clone = (value) => JSON.parse(JSON.stringify(value))

// -----------------------------------------------------------------------
// Backward-compatibility adapters — normalize legacy string images to
// {src,alt} objects and singular featuredItem to featuredItems[].
// Kept in content.js so every consumer (seed, localStorage, Supabase) sees
// the same contract regardless of source.
// -----------------------------------------------------------------------
const normalizeImage = (value) => {
  if (typeof value === 'string') return { src: value, alt: '' }
  if (value && typeof value === 'object' && typeof value.src === 'string') {
    return { src: value.src, alt: value.alt ?? '' }
  }
  if (value == null) return { src: '', alt: '' }
  return value
}

const normalizeOption = (option) => {
  if (!option || typeof option !== 'object') return option
  const image = typeof option.image === 'string' ? normalizeImage(option.image) : option.image
  // legacy string image with alt fallback to name
  const normImage = image && image.src !== undefined ? image : normalizeImage(option.image)
  return { ...option, image: normImage }
}

const normalizeGalleryEntry = (entry) => {
  if (!entry || typeof entry !== 'object') return entry
  if (typeof entry.src === 'string') {
    return { ...entry, src: entry.src, alt: entry.alt ?? entry.title ?? '' }
  }
  return entry
}

const normalizeFeaturedItem = (item) => {
  if (!item || typeof item !== 'object') return item
  const image = item.image != null ? normalizeImage(item.image) : item.image
  const options = Array.isArray(item.options) ? item.options.map(normalizeOption) : item.options
  const gallery = Array.isArray(item.gallery) ? item.gallery.map(normalizeGalleryEntry) : item.gallery
  return {
    ...item,
    isFeatured: item.isFeatured ?? item.featured ?? true,
    image,
    options,
    gallery,
  }
}

const normalizeSection = (section) => {
  if (!section || typeof section !== 'object') return section
  let featuredItems
  if (Array.isArray(section.featuredItems)) {
    featuredItems = section.featuredItems.map(normalizeFeaturedItem)
  } else if (section.featuredItem) {
    featuredItems = [normalizeFeaturedItem(section.featuredItem)]
  }
  const next = { ...section }
  if (featuredItems) {
    next.featuredItems = featuredItems
    // keep legacy featuredItem for one release so old public code that reads
    // featuredItem still works; new code prefers featuredItems
    next.featuredItem = featuredItems[0] ?? section.featuredItem
  }
  if (section.image != null) next.image = normalizeImage(section.image)
  return next
}

const normalizeServiceCollections = (collections) =>
  Array.isArray(collections)
    ? collections.map((col) => {
        const next = { ...col }
        if (col.coverImage != null) next.coverImage = normalizeImage(col.coverImage)
        if (Array.isArray(col.sections)) next.sections = col.sections.map(normalizeSection)
        // support legacy blissful productCategories image strings if any
        if (Array.isArray(col.productCategories)) {
          next.productCategories = col.productCategories.map((cat) => ({ ...cat }))
        }
        return next
      })
    : collections

const normalizeBlissfulPackages = (packages) =>
  Array.isArray(packages)
    ? packages.map((pkg) => {
        const next = { ...pkg }
        if (pkg.image != null && typeof pkg.image === 'string') {
          next.image = normalizeImage(pkg.image)
          if (!next.image.alt && pkg.name) next.image.alt = pkg.name
        } else if (pkg.image && typeof pkg.image === 'object') {
          next.image = normalizeImage(pkg.image)
        }
        if (next.isFeatured == null && next.featured == null) next.isFeatured = false
        if (next.featured != null && next.isFeatured == null) next.isFeatured = Boolean(next.featured)
        return next
      })
    : packages

const normalizeGalleryPageItems = (items) =>
  Array.isArray(items)
    ? items.map((it) => {
        const next = { ...it }
        if (typeof it.src === 'string') {
          next.src = it.src
          next.alt = it.alt ?? it.title ?? ''
        } else if (it.src && typeof it.src === 'object') {
          const img = normalizeImage(it.src)
          next.src = img.src
          next.alt = it.alt ?? img.alt ?? it.title ?? ''
        }
        return next
      })
    : items

// -----------------------------------------------------------------------
// Services catalog — canonical tree (Categories → Sub-Categories → Items)
//
// The services page historically stored three different shapes side by
// side: `serviceCollections[].sections[].featuredItems[]` (decor),
// top-level `photoboothPackages` (luxe) and top-level
// `blissfulNestPackages` (blissful). `catalog` is the single canonical
// tree everything converges on:
//
//   catalog.categories[]   → admin "Categories" / public "Collections"
//     .subcategories[]     → admin "Sub-Categories" (optional level)
//     .items[]             → admin "Items" attached directly to a category
//
// Sync rules — this module is the single sync point:
//  - `buildServicesCatalog(values)` derives the tree from the legacy keys
//    when `catalog` is absent (old stored blobs, legacy seeds).
//  - When `catalog` is present it wins: the legacy keys are regenerated
//    from it by `mirrorServicesLegacyFromCatalog`, so legacy readers (the
//    public Services page, the current admin editors) keep working
//    unchanged. There is no feedback loop: the mirror only runs when
//    `catalog` exists, and the builder only runs when it does not.
//  - The mirror preserves the public renderer's dispatch exactly — only
//    decor-style categories get `sections`; luxe keeps top-level packages
//    with no sections; blissful keeps `productCategories` + packages.
//    (ServiceCollectionsShowcase renders DecorHireCatalogue for ANY
//    collection with sections, so this placement must stay exact.)
// -----------------------------------------------------------------------

const slugifyCatalog = (value) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Mirrors the public renderer dispatch (ServiceCollectionsShowcase) and the
// admin kind mapping (ServicesCMS/catalog.js): only the fixed luxe id is
// package-kind, blissful-nest / sub-brand is prize-kind, everything else is
// decor. NOTE: ServicesCMS/catalog.js has its own copy — both will be
// unified onto the canonical tree when the admin screens are rebuilt.
const inferCatalogKind = (collection) => {
  const id = String(collection?.id ?? '')
  if (id === 'luxe-photobooth') return 'package'
  if (id === 'blissful-nest' || collection?.type === 'sub-brand') return 'prize'
  return 'decor'
}

/**
 * Automatic count summary for one canonical catalog category, used for the
 * category filter tabs on the public Services page. Replaces the old
 * hardcoded `navMeta` counts ("4 Collections" etc.) so the number always
 * reflects the live catalog: adding or removing an item, package or
 * sub-category updates the tab instantly.
 *
 * Returns `{ count, label }`, or `null` when there is nothing to count so
 * the tab hides the line instead of showing "0 …".
 *
 *   decor   → sub-categories (plus one when direct items render their own
 *             "services" block)      → "N collections"
 *   package → direct items           → "N packages"
 *   prize   → direct + all subcategory items → "N prize options"
 */
const catalogCategoryCount = (category, labels = {}) => {
  if (!category || typeof category !== 'object') return null
  const kind = inferCatalogKind(category)
  if (kind === 'package') {
    const count = Array.isArray(category.items) ? category.items.length : 0
    return count > 0 ? { count, label: labels.packagesLabel ?? 'packages' } : null
  }
  if (kind === 'prize') {
    const direct = Array.isArray(category.items) ? category.items.length : 0
    const nested = (Array.isArray(category.subcategories) ? category.subcategories : []).reduce(
      (total, sub) => total + (Array.isArray(sub?.items) ? sub.items.length : 0),
      0,
    )
    const count = direct + nested
    return count > 0 ? { count, label: labels.prizeOptionsLabel ?? 'prize options' } : null
  }
  const subcategoryCount = Array.isArray(category.subcategories) ? category.subcategories.length : 0
  const directCount = Array.isArray(category.items) && category.items.length > 0 ? 1 : 0
  const count = subcategoryCount + directCount
  return count > 0 ? { count, label: labels.collectionsLabel ?? 'collections' } : null
}

const orderAt = (entry, index) => {
  const order = Number(entry?.order)
  return Number.isFinite(order) ? order : index + 1
}

const normalizeCatalogItem = (item, kind, index) => {
  if (!item || typeof item !== 'object') return item
  const next = kind === 'decor' ? normalizeFeaturedItem(item) : { ...item }
  if (kind !== 'decor' && next.image != null) {
    next.image = normalizeImage(next.image)
  }
  if (next.order == null) next.order = index + 1
  return next
}

const toCanonicalSubcategory = (section, index) => {
  const itemsSource = Array.isArray(section?.featuredItems)
    ? section.featuredItems
    : section?.featuredItem
      ? [section.featuredItem]
      : []
  return {
    id: String(section?.id ?? `subcategory-${Date.now()}-${index}`),
    title: section?.title ?? '',
    subtitle: section?.subtitle ?? '',
    description: section?.description ?? '',
    image: null,
    order: orderAt(section, index),
    priceFrom: section?.priceFrom ?? '',
    items: itemsSource
      .filter((item) => item && typeof item === 'object')
      .map((item, itemIndex) => normalizeCatalogItem(item, 'decor', itemIndex)),
  }
}

const toCanonicalCategory = (collection, index, packages) => {
  if (!collection || typeof collection !== 'object') return null
  const kind = inferCatalogKind(collection)
  const id = String(collection.id ?? `category-${Date.now()}-${index}`)
  const category = {
    id,
    slug: collection.slug ?? slugifyCatalog(collection.id ?? collection.title ?? ''),
    title: collection.title ?? '',
    type: collection.type ?? 'collection',
    brand: collection.brand ?? 'Moments in Blooms',
    order: orderAt(collection, index),
    featured: collection.featured ?? false,
    navSub: collection.navSub ?? '',
    navMeta: collection.navMeta ?? '',
    tagline: collection.tagline ?? '',
    description: collection.description ?? '',
    coverImage:
      collection.coverImage != null
        ? normalizeImage(collection.coverImage)
        : { src: '', alt: '' },
    priceFrom: collection.priceFrom ?? '',
    subcategories: [],
    items: [],
  }
  if (kind === 'package') {
    category.items = (packages.photobooth ?? []).map((pkg, pkgIndex) =>
      normalizeCatalogItem(pkg, 'package', pkgIndex),
    )
  } else if (kind === 'prize') {
    const productCategories = Array.isArray(collection.productCategories)
      ? collection.productCategories
      : []
    const subs =
      productCategories.length > 0
        ? productCategories
        : [{ id: `${id}-offerings`, name: category.title, description: '' }]
    category.subcategories = subs.map((entry, subIndex) => ({
      id: String(entry?.id ?? `${id}-subcategory-${subIndex + 1}`),
      title: entry?.name ?? entry?.title ?? '',
      subtitle: '',
      description: entry?.description ?? '',
      image: null,
      order: orderAt(entry, subIndex),
      priceFrom: entry?.priceFrom ?? '',
      items: [],
    }))
    // Legacy blissful packages are a flat global list rendered under every
    // product-category block, so they attach to the first sub-category.
    const items = (packages.blissful ?? []).map((pkg, pkgIndex) =>
      normalizeCatalogItem(pkg, 'prize', pkgIndex),
    )
    if (category.subcategories.length > 0) {
      category.subcategories[0].items = items
    } else {
      category.items = items
    }
  } else {
    const sections = Array.isArray(collection.sections) ? collection.sections : []
    category.subcategories = sections.map((section, sectionIndex) =>
      toCanonicalSubcategory(section, sectionIndex),
    )
  }
  return category
}

/**
 * Derive the canonical catalog tree from the legacy services keys.
 * Never mutates its input.
 */
export function buildServicesCatalog(values) {
  const source = values && typeof values === 'object' ? values : {}
  const packages = {
    photobooth: Array.isArray(source.photoboothPackages) ? source.photoboothPackages : [],
    blissful: Array.isArray(source.blissfulNestPackages) ? source.blissfulNestPackages : [],
  }
  const collections = Array.isArray(source.serviceCollections) ? source.serviceCollections : []
  const categories = collections
    .map((collection, index) => toCanonicalCategory(collection, index, packages))
    .filter(Boolean)

  // Orphan safety (mirrors the admin catalog's unassigned groups): packages
  // whose category row was deleted stay reachable instead of invisible.
  const hasLuxe = categories.some((entry) => entry.id === 'luxe-photobooth')
  const hasBlissful = categories.some(
    (entry) => entry.id === 'blissful-nest' || entry.type === 'sub-brand',
  )
  if (!hasLuxe && packages.photobooth.length > 0) {
    const orphan = toCanonicalCategory(
      { id: 'luxe-photobooth', type: 'collection', title: 'Luxe Photobooth (unassigned)' },
      categories.length,
      packages,
    )
    if (orphan) categories.push(orphan)
  }
  if (!hasBlissful && packages.blissful.length > 0) {
    const orphan = toCanonicalCategory(
      { id: 'blissful-nest', type: 'sub-brand', title: 'Blissful Nest (unassigned)' },
      categories.length,
      packages,
    )
    if (orphan) categories.push(orphan)
  }
  return { categories }
}

const normalizeCatalogSubcategory = (subcategory, index, kind) => {
  if (!subcategory || typeof subcategory !== 'object') return subcategory
  const next = { ...subcategory }
  if (next.order == null) next.order = index + 1
  if (next.priceFrom == null) next.priceFrom = ''
  if (next.image !== undefined && next.image !== null) {
    next.image = normalizeImage(next.image)
  }
  const items = Array.isArray(next.items) ? next.items : []
  next.items = items.map((item, itemIndex) => normalizeCatalogItem(item, kind, itemIndex))
  return next
}

/** Normalize an existing canonical tree (images, ordering defaults). */
export function normalizeServicesCatalog(catalog) {
  if (!catalog || typeof catalog !== 'object') return { categories: [] }
  const categories = Array.isArray(catalog.categories) ? catalog.categories : []
  return {
    ...catalog,
    categories: categories.map((category, index) => {
      if (!category || typeof category !== 'object') return category
      const kind = inferCatalogKind(category)
      const next = { ...category }
      if (next.slug == null || next.slug === '') {
        next.slug = slugifyCatalog(next.id ?? next.title ?? '')
      }
      if (next.order == null) next.order = index + 1
      if (next.priceFrom == null) next.priceFrom = ''
      if (next.coverImage != null) next.coverImage = normalizeImage(next.coverImage)
      const subcategories = Array.isArray(next.subcategories) ? next.subcategories : []
      next.subcategories = subcategories.map((sub, subIndex) => {
        const normalized = normalizeCatalogSubcategory(sub, subIndex, kind)
        if (!normalized || typeof normalized !== 'object') return normalized
        // Legacy items predate ids — assign stable positional fallbacks so
        // every item is addressable (editor URLs, list keys, moves).
        const scope = normalized.id ?? `${next.id}-subcategory-${subIndex + 1}`
        normalized.items = (Array.isArray(normalized.items) ? normalized.items : []).map(
          (item, itemIndex) =>
            item && typeof item === 'object' && item.id == null
              ? { ...item, id: `${scope}-item-${itemIndex + 1}` }
              : item,
        )
        return normalized
      })
      const items = Array.isArray(next.items) ? next.items : []
      next.items = items.map((item, itemIndex) =>
        item && typeof item === 'object' && item.id == null
          ? normalizeCatalogItem({ ...item, id: `${next.id}-item-${itemIndex + 1}` }, kind, itemIndex)
          : normalizeCatalogItem(item, kind, itemIndex),
      )
      return next
    }),
  }
}

const toLegacySection = (subcategory) => {
  const items = Array.isArray(subcategory?.items) ? subcategory.items.map((item) => ({ ...item })) : []
  const section = {
    id: subcategory?.id,
    title: subcategory?.title ?? '',
    subtitle: subcategory?.subtitle ?? '',
    description: subcategory?.description ?? '',
    featuredItems: items,
  }
  if (items.length > 0) section.featuredItem = items[0]
  return section
}

const toLegacyProductCategory = (subcategory) => ({
  id: subcategory?.id,
  type: 'product-category',
  name: subcategory?.title ?? '',
  description: subcategory?.description ?? '',
})

const legacyCollectionCore = (category) => ({
  id: category?.id,
  type: category?.type ?? 'collection',
  brand: category?.brand ?? 'Moments in Blooms',
  order: category?.order ?? 1,
  featured: category?.featured ?? false,
  title: category?.title ?? '',
  slug: category?.slug ?? slugifyCatalog(category?.id ?? category?.title ?? ''),
  navSub: category?.navSub ?? '',
  navMeta: category?.navMeta ?? '',
  description: category?.description ?? '',
  tagline: category?.tagline ?? '',
  coverImage: category?.coverImage ?? { src: '', alt: '' },
})

/**
 * Regenerate the legacy services keys from the canonical tree. Used when
 * `catalog` is present so legacy readers keep working unchanged. Placement
 * preserves the public dispatch: only decor-style categories get
 * `sections`, luxe keeps top-level packages with no sections, blissful
 * keeps `productCategories` + packages with no sections.
 *
 * Known interim limitation: a sub-brand category with several
 * sub-categories flattens all their items into one legacy package list,
 * which the OLD blissful renderer shows under every product-category
 * block. The canonical tree itself keeps the true grouping, and the new
 * public renderer will read it directly.
 */
export function mirrorServicesLegacyFromCatalog(catalog) {
  const categories = Array.isArray(catalog?.categories) ? catalog.categories : []
  const serviceCollections = []
  let photoboothPackages = []
  let blissfulNestPackages = []
  categories.forEach((category) => {
    if (!category || typeof category !== 'object') return
    const kind = inferCatalogKind(category)
    if (kind === 'package') {
      serviceCollections.push(legacyCollectionCore(category))
      const direct = Array.isArray(category.items) ? category.items : []
      const fromSubs = (Array.isArray(category.subcategories) ? category.subcategories : []).flatMap(
        (sub) => (Array.isArray(sub?.items) ? sub.items : []),
      )
      photoboothPackages = [...direct, ...fromSubs].map((item) => ({ ...item }))
    } else if (kind === 'prize') {
      const subcategories = Array.isArray(category.subcategories) ? category.subcategories : []
      serviceCollections.push({
        ...legacyCollectionCore(category),
        productCategories: subcategories.map(toLegacyProductCategory),
      })
      const direct = Array.isArray(category.items) ? category.items : []
      const fromSubs = subcategories.flatMap((sub) =>
        Array.isArray(sub?.items) ? sub.items : [],
      )
      blissfulNestPackages = [...direct, ...fromSubs].map((item) => ({ ...item }))
    } else {
      const subcategories = Array.isArray(category.subcategories) ? category.subcategories : []
      const sections = subcategories.map(toLegacySection)
      const direct = Array.isArray(category.items) ? category.items : []
      if (direct.length > 0) {
        const clones = direct.map((item) => ({ ...item }))
        sections.push({
          id: `${category.id}-services`,
          title: category.title ?? '',
          subtitle: '',
          description: '',
          featuredItems: clones,
          featuredItem: clones[0],
        })
      }
      serviceCollections.push({ ...legacyCollectionCore(category), sections })
    }
  })
  return { serviceCollections, photoboothPackages, blissfulNestPackages }
}

// Legacy copy rewrites — exact-phrase only, so deliberate "prints" wording
// elsewhere (instant prints, 4x6 prints, high-quality prints) is untouched.
const LEGACY_COPY_REWRITES = [
  [
    'Unlimited prints throughout the event',
    'Unlimited photo sessions throughout the event',
  ],
  [
    'unlimited prints, and fun props',
    'unlimited photo sessions, and fun props',
  ],
  ['Unlimited Prints', 'Unlimited Photo Sessions'],
  [
    'Unlimited prints available throughout the event for every guest.',
    'Unlimited photo sessions available throughout the event for every guest.',
  ],
]

const rewriteLegacyCopy = (value) => {
  if (typeof value === 'string') {
    return LEGACY_COPY_REWRITES.reduce(
      (text, [from, to]) => text.split(from).join(to),
      value,
    )
  }
  if (Array.isArray(value)) return value.map(rewriteLegacyCopy)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, rewriteLegacyCopy(entry)]),
    )
  }
  return value
}

// Retired footer link labels from before the footer pointed at real service
// collections. A stored `Services` group is "legacy" while none of its links
// point at a collection yet.
const LEGACY_FOOTER_SERVICE_LABELS = new Set([
  'Event styling',
  'Floral design',
  'Tablescapes',
  'Private celebrations',
])

/**
 * Whether a stored footer `Services` group predates collection links and
 * should resolve to the live catalog instead (see Footer.jsx).
 */
export function isLegacyFooterServicesGroup(group) {
  if (!group || group.title !== 'Services' || !Array.isArray(group.links)) return false
  const hasCollectionLink = group.links.some(
    (link) => typeof link?.path === 'string' && link.path.includes('?collection='),
  )
  if (hasCollectionLink) return false
  return (
    group.links.length > 0 &&
    group.links.every((link) => link?.path === '/services') &&
    group.links.some((link) => LEGACY_FOOTER_SERVICE_LABELS.has(link?.label))
  )
}

export function areFooterLinksEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false
  return a.every(
    (link, index) => link?.label === b[index]?.label && link?.path === b[index]?.path,
  )
}

/** Footer `Services` links derived from the live catalog (single source). */
export function buildCatalogServiceLinks(categories) {
  return (Array.isArray(categories) ? categories : []).map((category) => ({
    label: category?.title || 'Untitled',
    path: `/services?collection=${encodeURIComponent(category?.id ?? '')}`,
  }))
}

const normalizeContent = (pageKey, values) => {
  if (!values || typeof values !== 'object') return values
  const next = { ...values }
  if (pageKey === 'services') {
    if (next.serviceCollections) next.serviceCollections = normalizeServiceCollections(next.serviceCollections)
    if (next.blissfulNestPackages) next.blissfulNestPackages = normalizeBlissfulPackages(next.blissfulNestPackages)
    // photoboothPackages keep popular as is, ensure isFeatured alias not needed
    if (Array.isArray(next.photoboothPackages)) {
      next.photoboothPackages = next.photoboothPackages.map((p) => ({ ...p }))
    }
    // Canonical catalog: the tree wins when present and the legacy keys are
    // regenerated from it; otherwise the tree is derived from the legacy keys.
    if (next.catalog && Array.isArray(next.catalog.categories)) {
      next.catalog = normalizeServicesCatalog(next.catalog)
      const legacy = mirrorServicesLegacyFromCatalog(next.catalog)
      next.serviceCollections = legacy.serviceCollections
      next.photoboothPackages = legacy.photoboothPackages
      next.blissfulNestPackages = legacy.blissfulNestPackages
    } else {
      next.catalog = normalizeServicesCatalog(buildServicesCatalog(next))
    }
    // Backfill the photobooth pricing heading for services content saved
    // before it was editable. Per-field merge so an explicit blank stays
    // blank instead of snapping back to the default.
    if (next.photoboothHighlights && typeof next.photoboothHighlights === 'object') {
      const savedPricing =
        next.photoboothHighlights.pricing && typeof next.photoboothHighlights.pricing === 'object'
          ? next.photoboothHighlights.pricing
          : {}
      next.photoboothHighlights = {
        ...next.photoboothHighlights,
        pricing: { ...photoboothHighlights.pricing, ...savedPricing },
      }
    }
    // Backfill the showcase heading, catalogue labels and FAQ preview for
    // services content saved before they were editable. Per-field merge so
    // an explicit blank stays blank instead of snapping back to the default.
    for (const [key, seed] of [
      ['showcase', serviceCollectionsShowcase],
      ['catalogueLabels', servicesCatalogueLabels],
      ['faqPreview', servicesFaqPreview],
    ]) {
      const saved = next[key] && typeof next[key] === 'object' ? next[key] : {}
      next[key] = { ...seed, ...saved }
    }
    // Retired "unlimited prints" copy in content saved before the rewording
    // (Supabase page_content / localStorage) so it reads correctly on every
    // render until the page is next saved through the CMS.
    return rewriteLegacyCopy(next)
  }
  if (pageKey === 'gallery' && next.items) {
    next.items = normalizeGalleryPageItems(next.items)
  }
  if (pageKey === 'gallery') {
    // Backfill the interface labels for gallery content saved before they
    // were editable. Per-field merge so an explicit blank stays blank.
    const saved = next.galleryLabels && typeof next.galleryLabels === 'object'
      ? next.galleryLabels
      : {}
    next.galleryLabels = { ...GALLERY_LABELS, ...saved }
  }
  if (pageKey === 'contact') {
    // Backfill the form step labels and success message for rail content
    // saved before they were editable. Per-field merge so explicit blanks
    // stay blank; the 4 step labels keep their positions.
    const railSeed = enquiryFormRail
    const savedRail =
      next.enquiryFormRail && typeof next.enquiryFormRail === 'object'
        ? next.enquiryFormRail
        : {}
    const savedSteps = Array.isArray(savedRail.stepLabels) ? savedRail.stepLabels : []
    const railNext = { ...railSeed, ...savedRail }
    railNext.stepLabels = [0, 1, 2, 3].map((index) =>
      savedSteps[index] ?? railSeed.stepLabels[index],
    )
    const savedSuccess =
      savedRail.success && typeof savedRail.success === 'object'
        ? savedRail.success
        : {}
    railNext.success = { ...railSeed.success, ...savedSuccess }
    next.enquiryFormRail = railNext
  }
  if (pageKey === 'about') {
    // Backfill the values heading for about content saved before it was
    // editable. Per-field merge so an explicit blank stays blank.
    const saved = next.coreValuesHeading && typeof next.coreValuesHeading === 'object'
      ? next.coreValuesHeading
      : {}
    next.coreValuesHeading = { ...aboutCoreValuesHeading, ...saved }
  }
  if (pageKey === 'homepage' && next.hero && typeof next.hero === 'object') {
    // Backfill the floating side note and scroll cue for hero content saved
    // before they were editable, so the homepage keeps showing them until
    // the next CMS save.
    if (next.hero.sideNote == null) {
      next.hero = { ...next.hero, sideNote: homepageHero.sideNote }
    }
    if (next.hero.scrollCue == null) {
      next.hero = { ...next.hero, scrollCue: homepageHero.scrollCue }
    }
  }
  if (pageKey === 'homepage') {
    // Backfill the section headings for homepage content saved before they
    // were editable. Per-field merge so an explicit blank stays blank
    // instead of snapping back to the default.
    for (const [key, seed] of [
      ['trustedBy', homepageTrustedBy],
      ['servicesHeading', homepageServicesHeading],
      ['galleryHeading', homepageGalleryHeading],
      ['whyChooseUs', homepageWhyChooseUs],
      ['testimonialsHeading', homepageTestimonialsHeading],
      ['instagramHeading', homepageInstagramHeading],
    ]) {
      const saved = next[key] && typeof next[key] === 'object' ? next[key] : {}
      next[key] = { ...seed, ...saved }
    }
    // Backfill the trust-mark badges for homepage content saved before they
    // were editable. Only a missing list is backfilled — an explicit empty
    // list stays empty so the section can still be cleared on purpose.
    if (next.trustMarks == null) {
      next.trustMarks = [...homepageTrustMarks]
    }
  }
  if (pageKey === 'homepage' && Array.isArray(next.services)) {
    // Backfill deep-link target for cards saved before `collectionId`
    // existed. Card ids originate from the seed (decor-hire,
    // luxe-photobooth, blissful-nest) and survive CMS text edits, so an
    // unmapped card id that matches a known collection is a safe mapping.
    const collectionIds = new Set(
      Array.isArray(serviceCollections)
        ? serviceCollections.map((collection) => collection?.id)
        : [],
    )
    next.services = next.services.map((item) => {
      if (!item || typeof item !== 'object') return item
      if (!item.collectionId && collectionIds.has(item.id)) {
        return { ...item, collectionId: item.id }
      }
      return item
    })
  }
  // Footer `Services` links resolve to the live catalog at render time
  // (see Footer.jsx) — stored groups are left untouched here so client
  // customizations survive.
  // sections inside gallery/ services still handled per above
  return next
}

const seedCache = {}

export const getSeedContent = (pageKey) => {
  if (!seedCache[pageKey]) {
    const raw = clone(contentSeeds[pageKey] ?? {})
    seedCache[pageKey] = normalizeContent(pageKey, raw)
  }
  return seedCache[pageKey]
}

const gallerySeoSeed = Object.freeze({
  title: 'Our Gallery',
  description:
    'Browse recent celebrations styled by Moments in Blooms across weddings, private celebrations, brand events and more.',
  url: 'https://momentsinblooms.vercel.app/gallery',
  image: GALLERY_ITEMS[0]?.src ?? '',
  keywords: '',
})

const faqsSeoSeed = Object.freeze({
  title: 'Frequently Asked Questions',
  description:
    'Answers about our Melbourne event styling, florals, decor hire, Luxe Photobooth, Blissful Nest and the journey from first enquiry to your celebration.',
  url: 'https://momentsinblooms.vercel.app/faqs',
  image: GALLERY_ITEMS[0]?.src ?? '',
  keywords: '',
})

export const contentSeeds = Object.freeze({
  homepage: Object.freeze({
    hero: homepageHero,
    trustedBy: homepageTrustedBy,
    trustMarks: homepageTrustMarks,
    services: homepageServices,
    servicesHeading: homepageServicesHeading,
    galleryHeading: homepageGalleryHeading,
    galleryItems: homepageGalleryItems,
    whyChooseUs: homepageWhyChooseUs,
    reasons: homepageReasons,
    testimonialsHeading: homepageTestimonialsHeading,
    testimonials: homepageTestimonials,
    instagramHeading: homepageInstagramHeading,
    instagramItems: homepageInstagramItems,
    cta: homepageCta,
  }),
  about: Object.freeze({
    hero: aboutHero,
    brandStory: aboutBrandStory,
    missionVision: aboutMissionVision,
    coreValuesHeading: aboutCoreValuesHeading,
    coreValues: aboutCoreValues,
    whyChooseUs: aboutWhyChooseUs,
    behindExperience: aboutBehindExperience,
    stats: aboutStats,
    testimonialHighlight: aboutTestimonialHighlight,
    cta: aboutCta,
  }),
  services: Object.freeze({
    hero: servicesHero,
    intro: servicesIntro,
    showcase: serviceCollectionsShowcase,
    catalogueLabels: servicesCatalogueLabels,
    photoboothPackages,
    photoboothHighlights,
    blissfulNestIntro,
    blissfulNestPackages,
    serviceCollections,
    catalog: buildServicesCatalog({
      serviceCollections,
      photoboothPackages,
      blissfulNestPackages,
    }),
    experienceTimeline: servicesExperienceTimeline,
    gallery: servicesGallery,
    testimonials: servicesTestimonials,
    faqPreview: servicesFaqPreview,
    cta: servicesCta,
  }),
  gallery: Object.freeze({
    categories: GALLERY_CATEGORIES,
    items: GALLERY_ITEMS,
    featuredStories: FEATURED_STORIES,
    instagramPosts: INSTAGRAM_POSTS,
    hero: HERO_CONTENT,
    cta: CTA_CONTENT,
    instagram: INSTAGRAM_CONTENT,
    featuredStoriesSection: FEATURED_STORIES_SECTION_CONTENT,
    galleryLabels: GALLERY_LABELS,
  }),
  faqs: Object.freeze({
    categories: faqCategories,
    items: faqItems,
    hero: faqPageContent.hero,
    cta: faqPageContent.cta,
  }),
  contact: Object.freeze({
    hero: contactHero,
    information: contactInformation,
    enquiryFormRail,
    cta: contactCta,
    enquiryFormOptions: Object.freeze({
      eventTypeOptions,
      serviceInterestOptions,
      guestCountOptions,
      setupRequirementOptions,
    }),
  }),
  settings: Object.freeze({
    footerGroups: footerNavigationGroups,
    footerContact,
    footerSocialLinks,
  }),
  seo: Object.freeze({
    site: routeMetadata.public,
    home: homepageSeo,
    about: aboutSeo,
    services: servicesSeo,
    gallery: gallerySeoSeed,
    contact: contactSeo,
    faqs: faqsSeoSeed,
  }),
})

export const CONTENT_PAGE_KEYS = Object.freeze(Object.keys(contentSeeds))

export { catalogCategoryCount, inferCatalogKind, normalizeContent, normalizeImage }

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    const obj = parsed && typeof parsed === 'object' ? parsed : {}
    // normalize stored page values so legacy string images work after adapter
    Object.keys(obj).forEach((key) => {
      if (obj[key]?.values) {
        obj[key] = {
          ...obj[key],
          values: normalizeContent(key, obj[key].values),
        }
      }
    })
    return obj
  } catch {
    return {}
  }
}

function writeStored(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn('[content] storage unavailable', error)
  }
}

export const getStoredContent = () => readStored()

/**
 * Remove demo-mode entries for the given page keys from localStorage.
 * Used when Supabase is configured: remote-backed pages are authoritative
 * from the server, so stale local copies must not shadow the seed/remote
 * value before the first fetch settles.
 */
export function dropStoredPages(pageKeys) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return
    let changed = false
    for (const key of pageKeys ?? []) {
      if (key in parsed) {
        delete parsed[key]
        changed = true
      }
    }
    if (changed) {
      writeStored(parsed)
    }
  } catch {
    // Storage unavailable or corrupt — the provider falls back to seeds.
  }
}

export function savePageContent(pageKey, values) {
  const normalized = normalizeContent(pageKey, clone(values))
  const entry = {
    values: normalized,
    savedAt: new Date().toISOString(),
  }
  const stored = readStored()
  stored[pageKey] = entry
  writeStored(stored)
  return entry
}

export function resetPageContent(pageKey) {
  const stored = readStored()
  delete stored[pageKey]
  writeStored(stored)
}