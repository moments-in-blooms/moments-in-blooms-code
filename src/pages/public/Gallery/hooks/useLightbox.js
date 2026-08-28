import { useCallback, useEffect, useState } from 'react'

/**
 * Custom hook for managing lightbox state and navigation.
 * Scroll locking, Escape handling and focus trapping are owned by useModal.
 * @param {Array} items - Array of gallery items
 * @returns {Object} Lightbox state and handlers
 */
export const useLightbox = (items = []) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = useCallback((index) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setIsOpen(false)
  }, [])

  const navigateLightbox = useCallback(
    (direction) => {
      if (!items.length) return

      setCurrentIndex((prev) => {
        if (direction === 'next') {
          return (prev + 1) % items.length
        }
        return (prev - 1 + items.length) % items.length
      })
    },
    [items.length]
  )

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') navigateLightbox('next')
      if (event.key === 'ArrowLeft') navigateLightbox('prev')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, navigateLightbox])

  return {
    isOpen,
    currentIndex,
    currentItem: items[currentIndex],
    openLightbox,
    closeLightbox,
    navigateLightbox,
    totalItems: items.length,
  }
}

export default useLightbox
