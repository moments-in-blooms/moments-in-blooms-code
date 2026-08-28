/**
 * Legacy fixed collection IDs — kept for backward compatibility and migration.
 * Collections are now fully dynamic (create/read/update/delete). This list is
 * no longer used to gate CMS operations; see adapters in src/services/content.js.
 */
const FIXED_COLLECTION_IDS = Object.freeze([
  'decor-hire',
  'luxe-photobooth',
  'blissful-nest',
])

const isFixedCollectionId = (id) => FIXED_COLLECTION_IDS.includes(id)

export { FIXED_COLLECTION_IDS, isFixedCollectionId }
