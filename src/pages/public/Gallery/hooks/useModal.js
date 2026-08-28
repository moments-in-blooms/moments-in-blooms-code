import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

const getFocusableElements = (container) =>
  Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element) => element.getClientRects().length > 0
  )

/**
 * Custom hook providing accessible modal behavior: focus trapping,
 * Escape-to-close, body scroll locking and focus restoration.
 * @param {Object} options
 * @param {boolean} options.isOpen - Whether the modal is open
 * @param {Function} options.onClose - Called on Escape or programmatic close
 * @param {string} options.label - Accessible label for the dialog
 * @returns {Object} Props to spread on the dialog root element
 */
export const useModal = ({ isOpen, onClose, label }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const container = containerRef.current
    const previouslyFocused = document.activeElement

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const focusable = getFocusableElements(container)
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    const focusFirst = () => {
      const focusable = getFocusableElements(container)
      ;(focusable[0] || container).focus()
    }

    focusFirst()
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return {
    containerRef,
    overlayProps: {
      ref: containerRef,
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': label,
    },
  }
}

export default useModal
