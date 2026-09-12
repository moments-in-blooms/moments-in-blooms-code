// Plain-language glossary for admin CMS labels.
//
// Technical content keys (e.g. `hero`, `cta`, `eyebrow`) stay untouched in
// storage and URLs. This file is the single source of truth for what the
// client *sees*: the friendly label plus a one-line plain-English hint.
// Sections and forms import from here instead of hardcoding jargon strings,
// so a future "the client doesn't understand X" fix is a one-line change.

export const SECTION_TERMS = Object.freeze({
  hero: Object.freeze({
    label: 'Top banner',
    hint: 'The first thing visitors see when they open your site.',
  }),
  trustMarks: Object.freeze({
    label: 'Trust badges',
    hint: 'Short credibility words shown under the intro.',
  }),
  servicesHeading: Object.freeze({
    label: 'Services section title',
    hint: 'The heading above your three services.',
  }),
  galleryHeading: Object.freeze({
    label: 'Gallery section title',
    hint: 'The heading above your photos.',
  }),
  galleryItems: Object.freeze({
    label: 'Gallery photos',
    hint: 'The photo collage on the homepage.',
  }),
  reasons: Object.freeze({
    label: 'Why choose us',
    hint: 'The reasons clients choose you.',
  }),
  testimonials: Object.freeze({
    label: 'Client reviews',
    hint: 'What past clients say about you.',
  }),
  instagramItems: Object.freeze({
    label: 'Instagram photos',
    hint: 'The Instagram strip near the bottom.',
  }),
  cta: Object.freeze({
    label: 'Bottom banner',
    hint: 'The final "book now" section at the bottom.',
  }),
})

export const FIELD_TERMS = Object.freeze({
  eyebrow: Object.freeze({
    label: 'Small line above the title',
    hint: 'The short phrase shown above the heading.',
  }),
  headline: Object.freeze({
    label: 'Main heading',
  }),
  floatingWords: Object.freeze({
    label: 'Side phrases',
    hint: 'One phrase per line — shown beside the banner. Clear it to hide the note.',
  }),
  primaryButton: Object.freeze({
    label: 'Main button',
    hint: 'The standout button.',
  }),
  secondaryButton: Object.freeze({
    label: 'Second button',
    hint: 'The quieter button.',
  }),
  heroImage: Object.freeze({
    label: 'Banner image',
  }),
  layoutVariant: Object.freeze({
    label: 'Photo arrangement',
    hint: 'How this photo is sized in the collage.',
  }),
  offsetLayout: Object.freeze({
    label: 'Staggered layout',
    hint: 'Alternates the card layout on the homepage. Leave off to follow the default staggered order.',
  }),
  mark: Object.freeze({
    label: 'Badge text',
  }),
  linkedCategory: Object.freeze({
    label: 'Linked category',
    hint: 'This card follows its category — manage the category itself under Services.',
  }),
  cardImage: Object.freeze({
    label: 'Card image',
  }),
  primaryButtonLabel: Object.freeze({
    label: 'Main button label',
  }),
  secondaryButtonLabel: Object.freeze({
    label: 'Second button label',
  }),
  primaryButtonLink: Object.freeze({
    label: 'Main button link',
    hint: 'Where this button goes, e.g. /contact.',
  }),
  secondaryButtonLink: Object.freeze({
    label: 'Second button link',
  }),
  backgroundImage: Object.freeze({
    label: 'Banner image',
  }),
  ctaText: Object.freeze({
    label: 'Button text',
    hint: 'The words shown on the button, e.g. "Enquire now".',
  }),
})

export const CATALOG_TERMS = Object.freeze({
  urlSlug: Object.freeze({
    label: 'Web address',
    hint: 'Unique per category. Leave blank to generate it from the title.',
  }),
  categoryType: Object.freeze({
    label: 'Type',
    hint: 'Standard is a normal service group. Named brand is e.g. Blissful Nest.',
  }),
  navSubtitle: Object.freeze({
    label: 'Menu subtitle',
  }),
  navMeta: Object.freeze({
    label: 'Menu note',
  }),
  startingPrice: Object.freeze({
    label: 'Starting price',
    hint: 'Optional. Shown as "Price starts at …" on the public site.',
  }),
  featured: Object.freeze({
    label: 'Highlighted',
    hint: 'Highlighted items and categories stand out on the public site.',
  }),
  placement: Object.freeze({
    label: 'Where it appears',
    hint: 'Which category — and optionally which sub-category — this item belongs to.',
  }),
  noSubcategory: Object.freeze({
    label: 'No sub-category',
  }),
})
