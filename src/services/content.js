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

const seedCache = {}

export const getSeedContent = (pageKey) => {
  if (!seedCache[pageKey]) {
    seedCache[pageKey] = clone(contentSeeds[pageKey] ?? {})
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

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
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
  const entry = {
    values: clone(values),
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