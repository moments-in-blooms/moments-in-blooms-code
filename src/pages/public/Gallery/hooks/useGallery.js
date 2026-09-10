import { useCallback, useMemo, useState } from 'react'

import { useMediaQuery } from './useMediaQuery.js'

const PAGE_SIZE = { mobile: 4, tablet: 6, desktop: 9 }

/**
 * Custom hook for managing gallery pagination.
 * @param {Array} allItems - All gallery items
 * @returns {Object} Gallery state and handlers
 */
export const useGallery = (allItems = []) => {
  const [pageIndex, setPageIndex] = useState(1)

  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const pageSize = isMobile ? PAGE_SIZE.mobile : isTablet ? PAGE_SIZE.tablet : PAGE_SIZE.desktop

  const visibleItems = useMemo(
    () => allItems.slice(0, pageIndex * pageSize),
    [allItems, pageIndex, pageSize]
  )

  const hasMore = visibleItems.length < allItems.length

  const loadMore = useCallback(() => {
    setPageIndex((index) => index + 1)
  }, [])

  return {
    visibleItems,
    hasMore,
    loadMore,
  }
}

export default useGallery
