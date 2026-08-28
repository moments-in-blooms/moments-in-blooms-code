import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../../../../components/Button/index.js'
import TitleReveal from '../../../../components/Reveal/index.js'
import { BUTTON_VARIANTS } from '../../../../constants/ui.js'
import {
  fadeUp,
  softReveal,
  staggerContainer,
  VIEWPORT_DEFAULT,
} from '../../../../styles/animations.js'
import {
  FAQAction,
  FAQAnswer,
  FAQContainer,
  FAQEyebrow,
  FAQHeader,
  FAQIcon,
  FAQItem,
  FAQList,
  FAQPanel,
  FAQRoot,
  FAQTitle,
  FAQTrigger,
} from './FAQPreview.styles.js'

function FAQPreview({ items, id = 'home-faq-preview', tone }) {
  const [openId, setOpenId] = useState(null)

  return (
    <FAQRoot id={id} $tone={tone}>
      <FAQContainer>
        <FAQHeader>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <FAQEyebrow>A few helpful things</FAQEyebrow>
          </motion.div>
          <FAQTitle>
            <TitleReveal>Good to know.</TitleReveal>
          </FAQTitle>
        </FAQHeader>
        <FAQList
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
        >
          {items.map((item) => {
            const isOpen = openId === item.id
            const panelId = `faq-panel-${item.id}`
            const triggerId = `faq-trigger-${item.id}`

            return (
              <FAQItem key={item.id} variants={softReveal}>
                <FAQTrigger
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <FAQIcon
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    aria-hidden="true"
                  >
                    +
                  </FAQIcon>
                </FAQTrigger>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <FAQPanel
                      key={panelId}
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <FAQAnswer>{item.answer}</FAQAnswer>
                    </FAQPanel>
                  ) : null}
                </AnimatePresence>
              </FAQItem>
            )
          })}
        </FAQList>
        <FAQAction>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
          >
            <Button as={NavLink} to="/faqs" variant={BUTTON_VARIANTS.GHOST}>
              View all FAQs
              <FiArrowUpRight aria-hidden="true" color="currentColor" size={16} />
            </Button>
          </motion.div>
        </FAQAction>
      </FAQContainer>
    </FAQRoot>
  )
}

export default FAQPreview
