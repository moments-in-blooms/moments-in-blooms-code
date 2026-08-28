// TEMPORARY DEVELOPMENT IMAGES
// Curated editorial photography sourced from Unsplash (royalty-free) and
// verified to load. These URLs are development placeholders only and will be
// replaced by CMS-managed images. When CMS integration lands, swap the values
// in `GALLERY_IMAGE_IDS` (or the `src` fields in galleryData.js) — no
// structural changes are required.

const IMAGE_BASE_URL = 'https://images.unsplash.com'

export const GALLERY_IMAGE_IDS = Object.freeze({
  WEDDING_AISLE: 'photo-1519741497674-611481863552',
  WEDDING_CEREMONY: 'photo-1511795409834-ef04bbd61622',
  WEDDING_SPARKLERS: 'photo-1522673607200-164d1b6ce486',
  WEDDING_RECEPTION: 'photo-1515934751635-c81c6bc9a2d8',
  VENUE_DECOR: 'photo-1519225421980-715cb0215aed',
  CELEBRATION: 'photo-1533174072545-7a4b6ad7a6c3',
  CORPORATE_GALA: 'photo-1511578314322-379afb476865',
  CHAMPAGNE_TOAST: 'photo-1527529482837-4698179dc6ce',
  HOME_TABLE: 'photo-1511285560929-80b456fea0bc',
  RECEPTION_DETAIL: 'photo-1521737604893-d14cc237f11d',
})

export const GALLERY_FALLBACK_IMAGES = Object.freeze({
  item: `${IMAGE_BASE_URL}/${GALLERY_IMAGE_IDS.WEDDING_AISLE}?auto=format&fit=crop&w=800&q=80`,
  story: `${IMAGE_BASE_URL}/${GALLERY_IMAGE_IDS.WEDDING_RECEPTION}?auto=format&fit=crop&w=1200&q=80`,
  instagram: `${IMAGE_BASE_URL}/${GALLERY_IMAGE_IDS.CELEBRATION}?auto=format&fit=crop&w=600&q=80`,
})

export const imageUrl = (id, width = 1200) =>
  `${IMAGE_BASE_URL}/${id}?auto=format&fit=crop&w=${width}&q=80`
