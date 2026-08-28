/**
 * Filter gallery items by category
 * @param {Array} items - Array of gallery items
 * @param {string} categoryId - Category ID to filter by
 * @returns {Array} Filtered array of gallery items
 */
export const filterByCategory = (items, categoryId) => {
  if (categoryId === 'all') {
    return items
  }
  return items.filter(item => item.category === categoryId)
}

/**
 * Sort gallery items by size priority (large items first for better layout)
 * @param {Array} items - Array of gallery items
 * @returns {Array} Sorted array of gallery items
 */
export const sortBySizePriority = (items) => {
  const sizePriority = { large: 1, wide: 2, portrait: 3, medium: 4, small: 5 }
  return [...items].sort((a, b) => {
    const priorityA = sizePriority[a.size] || 999
    const priorityB = sizePriority[b.size] || 999
    return priorityA - priorityB
  })
}

/**
 * Get unique categories from gallery items
 * @param {Array} items - Array of gallery items
 * @returns {Array} Array of unique category IDs
 */
export const getUniqueCategories = (items) => {
  const categories = new Set(items.map(item => item.category))
  return Array.from(categories)
}

/**
 * Format image counter for lightbox display
 * @param {number} current - Current image index (1-based)
 * @param {number} total - Total number of images
 * @returns {string} Formatted counter string
 */
export const formatImageCounter = (current, total) => {
  return `${current} / ${total}`
}

/**
 * Preload images for better performance
 * @param {Array} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
  imageUrls.forEach(url => {
    const img = new Image()
    img.src = url
  })
}
