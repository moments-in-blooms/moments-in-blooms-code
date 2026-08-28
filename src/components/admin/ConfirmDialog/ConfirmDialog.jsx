import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FiAlertTriangle } from 'react-icons/fi'
import Button from '../../Button/index.js'
import {
  ConfirmActions,
  ConfirmCard,
  ConfirmDescription,
  ConfirmIcon,
  ConfirmOverlay,
  ConfirmTitle,
} from './ConfirmDialog.styles.js'

function ConfirmDialog({
  open = false,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) {
  const cardRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!open) return undefined

    const previousActive = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cardRef.current?.querySelector('[data-cancel]')?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel?.()
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
  }, [open, onCancel])

  if (!open) return null

  return createPortal(
    <ConfirmOverlay role="presentation">
      <ConfirmCard
        ref={cardRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
      >
        <ConfirmIcon>
          <FiAlertTriangle aria-hidden="true" size={22} />
        </ConfirmIcon>
        <ConfirmTitle id={titleId}>{title}</ConfirmTitle>
        {description ? (
          <ConfirmDescription id={descriptionId}>{description}</ConfirmDescription>
        ) : null}
        <ConfirmActions>
          <Button type="button" variant="outline" radius="md" onClick={onCancel} data-cancel>
            {cancelLabel}
          </Button>
          <Button type="button" variant="danger" radius="md" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </ConfirmActions>
      </ConfirmCard>
    </ConfirmOverlay>,
    document.body,
  )
}

export default ConfirmDialog