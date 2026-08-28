import { useCallback, useMemo, useState } from 'react'

import { filterByCategory } from '../utils/galleryHelpers.js'
import { useMediaQuery } from './useMediaQuery.js'

const PAGE_SIZE = { mobile: 4, tablet: 6, desktop: 9 }

/**
 * Custom hook for managing gallery state, filtering and pagination.
 * @param {Array} allItems - All gallery items
 * @param {Array} categories - Available categories
 * @returns {Object} Gallery state and handlers
 */
export const useGallery = (allItems = [], categories = []) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [pageIndex, setPageIndex] = useState(1)

  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const pageSize = isMobile ? PAGE_SIZE.mobile : isTablet ? PAGE_SIZE.tablet : PAGE_SIZE.desktop

  const filteredItems = useMemo(
    () => filterByCategory(allItems, activeCategory),
    [allItems, activeCategory]
  )

  const visibleItems = useMemo(
    () => filteredItems.slice(0, pageIndex * pageSize),
    [filteredItems, pageIndex, pageSize]
  )

  const hasMore = visibleItems.length < filteredItems.length

  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId)
    setPageIndex(1)
  }, [])

  const loadMore = useCallback(() => {
    setPageIndex((index) => index + 1)
  }, [])

  return {
    activeCategory,
    setActiveCategory: handleCategoryChange,
    filteredItems,
    visibleItems,
    hasMore,
    loadMore,
    categories,
    totalItems: allItems.length,
    displayedItems: visibleItems.length,
  }
}

export default useGallery
