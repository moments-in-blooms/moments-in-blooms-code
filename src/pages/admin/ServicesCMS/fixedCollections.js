/**
 * The public Services page renders its collections through hardcoded showcases
 * (Decor Hire catalogue, Luxe Photobooth showcase, Blissful Nest sub-brand), so
 * only these three collections can be displayed. The CMS therefore edits them
 * in place and never creates or removes collections.
 */
const FIXED_COLLECTION_IDS = Object.freeze([
  'decor-hire',
  'luxe-photobooth',
  'blissful-nest',
])

const isFixedCollectionId = (id) => FIXED_COLLECTION_IDS.includes(id)

export { FIXED_COLLECTION_IDS, isFixedCollectionId }
