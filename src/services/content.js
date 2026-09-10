import {
  aboutBehindExperience,
  aboutBrandStory,
  aboutCoreValues,
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
  homepageGalleryItems,
  homepageHero,
  homepageInstagramItems,
  homepageReasons,
  homepageSeo,
  homepageServices,
  homepageTestimonials,
  homepageTrustMarks,
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
  servicesCta,
  servicesExperienceTimeline,
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
  HERO_CONTENT,
  INSTAGRAM_CONTENT,
  INSTAGRAM_POSTS,
  INTRODUCTION_CONTENT,
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

// Legacy footer links retired in favour of the three real service
// collections. Applies only while a stored `Services` group still holds the
// legacy generic links — once the client re-saves Settings, stored content
// carries the new links and this becomes a no-op.
const LEGACY_FOOTER_SERVICE_LABELS = new Set([
  'Event styling',
  'Floral design',
  'Tablescapes',
  'Private celebrations',
])

const normalizeFooterGroups = (groups) => {
  if (!Array.isArray(groups)) return groups
  const canonical = footerNavigationGroups.find((group) => group.title === 'Services')
  return groups.map((group) => {
    if (!group || group.title !== 'Services' || !Array.isArray(group.links)) return group
    // Legacy while none of the links point at a collection yet: either the
    // exact legacy set, or any leftover legacy label among generic
    // `/services` links (partial CMS edits). A Services group that already
    // carries `?collection=` links was migrated or customized — leave it.
    const hasCanonicalLink = group.links.some(
      (link) => typeof link?.path === 'string' && link.path.includes('?collection='),
    )
    if (hasCanonicalLink || !canonical) return group
    const isUntouchedLegacy =
      group.links.length > 0 &&
      group.links.every((link) => link?.path === '/services') &&
      group.links.some((link) => LEGACY_FOOTER_SERVICE_LABELS.has(link?.label))
    if (!isUntouchedLegacy) return group
    return { ...group, links: canonical.links.map((link) => ({ ...link })) }
  })
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
    // Retired "unlimited prints" copy in content saved before the rewording
    // (Supabase page_content / localStorage) so it reads correctly on every
    // render until the page is next saved through the CMS.
    return rewriteLegacyCopy(next)
  }
  if (pageKey === 'gallery' && next.items) {
    next.items = normalizeGalleryPageItems(next.items)
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
  if (pageKey === 'settings' && Array.isArray(next.footerGroups)) {
    next.footerGroups = normalizeFooterGroups(next.footerGroups)
  }
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
    trustMarks: homepageTrustMarks,
    services: homepageServices,
    galleryItems: homepageGalleryItems,
    reasons: homepageReasons,
    testimonials: homepageTestimonials,
    instagramItems: homepageInstagramItems,
    cta: homepageCta,
  }),
  about: Object.freeze({
    hero: aboutHero,
    brandStory: aboutBrandStory,
    missionVision: aboutMissionVision,
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
    photoboothPackages,
    photoboothHighlights,
    blissfulNestIntro,
    blissfulNestPackages,
    serviceCollections,
    experienceTimeline: servicesExperienceTimeline,
    gallery: servicesGallery,
    testimonials: servicesTestimonials,
    cta: servicesCta,
  }),
  gallery: Object.freeze({
    categories: GALLERY_CATEGORIES,
    items: GALLERY_ITEMS,
    featuredStories: FEATURED_STORIES,
    instagramPosts: INSTAGRAM_POSTS,
    hero: HERO_CONTENT,
    introduction: INTRODUCTION_CONTENT,
    cta: CTA_CONTENT,
    instagram: INSTAGRAM_CONTENT,
    featuredStoriesSection: FEATURED_STORIES_SECTION_CONTENT,
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

export { normalizeContent, normalizeImage }

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

export const getPageSavedAt = (pageKey) => readStored()[pageKey]?.savedAt ?? null

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