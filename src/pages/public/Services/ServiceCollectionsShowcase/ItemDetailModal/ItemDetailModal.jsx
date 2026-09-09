import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { FiArrowRight, FiGift, FiX } from 'react-icons/fi'
import { EASE_LUXE } from '../../../../../styles/animations.js'
import Button from '../../../../../components/Button/index.js'
import * as S from './ItemDetailModal.styles.js'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

const getFocusableElements = (container) =>
  Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element) => element.getClientRects().length > 0,
  )

/**
 * Accessible detail dialog for a Services collection item: full (uncropped)
 * image plus every available field, with an enquiry CTA.
 * Props: { item, contextLabel, onClose }
 */
function ItemDetailModal({ item, contextLabel, onClose }) {
  const containerRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!item) return undefined

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

    const focusable = getFocusableElements(container)
    ;(focusable[0] || container).focus()
    document.addEventListener('keydown', handleKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [item, onClose])

  const motionProps = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 48, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 48, scale: 0.985 },
      }

  return (
    <AnimatePresence>
      {item && (
        <S.ItemOverlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <S.ItemPanel
            as={motion.div}
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label={item.name || 'Item details'}
            tabIndex={-1}
            {...motionProps}
            transition={{ duration: 0.45, ease: EASE_LUXE }}
            onClick={(event) => event.stopPropagation()}
          >
            <S.ItemToolbar>
              <S.ItemClose onClick={onClose} aria-label={`Close ${item.name || 'item'} details`}>
                <FiX size={22} />
              </S.ItemClose>
            </S.ItemToolbar>

            {item.imageSrc ? (
              <S.ItemMedia>
                <S.ItemMediaImage
                  src={item.imageSrc}
                  alt={item.imageAlt || item.name || 'Item preview'}
                  loading="lazy"
                />
              </S.ItemMedia>
            ) : null}

            <S.ItemBody>
              {contextLabel ? <S.ItemKicker>{contextLabel}</S.ItemKicker> : null}
              <S.ItemTitle>{item.name}</S.ItemTitle>
              {item.badge ? <S.ItemBadge>{item.badge}</S.ItemBadge> : null}
              {item.tagline ? <S.ItemTagline>{item.tagline}</S.ItemTagline> : null}
              {item.specs ? <S.ItemSpecs>{item.specs}</S.ItemSpecs> : null}
              {item.description ? <S.ItemDescription>{item.description}</S.ItemDescription> : null}

              {item.items?.length > 0 ? (
                <S.ItemList>
                  {item.items.map((entry) => (
                    <li key={entry}>
                      <FiGift aria-hidden="true" />
                      <span>{entry}</span>
                    </li>
                  ))}
                </S.ItemList>
              ) : null}

              <S.ItemActions>
                <Button to="/contact">
                  <span>{item.ctaLabel || 'Enquire Now'}</span>
                  <FiArrowRight aria-hidden="true" color="currentColor" size={16} />
                </Button>
              </S.ItemActions>
            </S.ItemBody>
          </S.ItemPanel>
        </S.ItemOverlay>
      )}
    </AnimatePresence>
  )
}

export default ItemDetailModal
