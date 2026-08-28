import { useId } from 'react'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { EASE_LUXE } from '../../../styles/animations.js'
import {
  FaqAnswer,
  FaqIcon,
  FaqPanel,
  FaqQuestion,
  FaqTrigger,
  FaqItemRoot,
} from './FAQItem.styles.js'

function FAQItem({ item, isOpen, onToggle, onKeyDown }) {
  const baseId = useId()
  const shouldReduceMotion = useReducedMotion()
  const triggerId = `${baseId}-trigger`
  const panelId = `${baseId}-panel`

  return (
    <FaqItemRoot id={item.id}>
      <FaqTrigger
        id={triggerId}
        type="button"
        data-item-id={item.id}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        onKeyDown={onKeyDown}
      >
        <FaqQuestion>{item.question}</FaqQuestion>
        <FaqIcon $isOpen={isOpen} aria-hidden="true">
          {isOpen ? '−' : '+'}
        </FaqIcon>
      </FaqTrigger>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <FaqPanel
            key={panelId}
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_LUXE }}
          >
            <FaqAnswer>{item.answer}</FaqAnswer>
          </FaqPanel>
        ) : null}
      </AnimatePresence>
    </FaqItemRoot>
  )
}

export default FAQItem
