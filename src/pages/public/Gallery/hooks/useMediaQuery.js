import { useSyncExternalStore } from 'react'

const subscribe = (query, callback) => {
  const mediaQueryList = window.matchMedia(query)
  mediaQueryList.addEventListener('change', callback)
  return () => mediaQueryList.removeEventListener('change', callback)
}

/**
 * Custom hook for responsive breakpoint queries.
 * @param {string} query - CSS media query string
 * @returns {boolean} Whether the query currently matches
 */
export const useMediaQuery = (query) =>
  useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => window.matchMedia(query).matches,
    () => false
  )

export default useMediaQuery
