import { useEffect, useId, useRef } from 'react'
import { FiX } from 'react-icons/fi'
import { ModalBody, ModalCard, ModalClose, ModalFooter, ModalHeader, ModalOverlay, ModalTitle } from './Modal.styles.js'

function Modal({ open = false, title, description, onClose, children, footer }) {
  const cardRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()

  // Callers commonly pass inline onClose closures, so keep the latest in a ref
  // and keep it out of the focus effect's deps. Otherwise every parent
  // re-render (e.g. typing in a controlled input inside the modal) tears the
  // effect down and re-runs it, stealing focus back to the close button after
  // each keystroke.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return undefined

    const previousActive = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCloseRef.current?.()
        return
      }
      if (event.key !== 'Tab') return
      const card = cardRef.current
      if (!card) return
      const focusable = card.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
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

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (previousActive instanceof HTMLElement) {
        previousActive.focus()
      }
    }
  }, [open])

  if (!open) return null

  return (
    <ModalOverlay
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.()
        }
      }}
    >
      <ModalCard
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
      >
        <ModalHeader>
          <ModalTitle id={titleId}>{title}</ModalTitle>
          {description ? <p id={descriptionId}>{description}</p> : null}
          <ModalClose ref={closeRef} type="button" onClick={onClose} aria-label="Close dialog">
            <FiX aria-hidden="true" size={18} />
          </ModalClose>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footer ? <ModalFooter>{footer}</ModalFooter> : null}
      </ModalCard>
    </ModalOverlay>
  )
}

export default Modal