import { useCallback, useState } from 'react'

/**
 * Custom hook for graceful image fallback handling.
 * Resets the fallback whenever the primary source changes.
 * @param {string} src - Primary image source
 * @param {string} fallbackSrc - Local fallback image source
 * @returns {Object} Image props to spread on an <img> element
 */
export const useImageFallback = (src, fallbackSrc) => {
  const [prevSrc, setPrevSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  if (prevSrc !== src) {
    setPrevSrc(src)
    setHasError(false)
  }

  const currentSrc = hasError ? fallbackSrc : src

  const onError = useCallback(() => {
    setHasError(true)
  }, [])

  return { src: currentSrc, onError }
}

export default useImageFallback
