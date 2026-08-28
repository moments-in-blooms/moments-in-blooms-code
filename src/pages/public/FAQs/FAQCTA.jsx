import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import Button from '../../../components/Button/index.js'
import Container from '../../../components/Container/index.js'
import SafeReveal from '../../../components/Reveal/SafeReveal.jsx'
import TitleReveal from '../../../components/Reveal/TitleReveal.jsx'
import { BUTTON_VARIANTS } from '../../../constants/ui.js'
import { EASE_LUXE, VIEWPORT_DEFAULT } from '../../../styles/animations.js'
import {
  CtaActions,
  CtaBottomLine,
  CtaContent,
  CtaDescription,
  CtaEyebrow,
  CtaRoot,
  CtaTitle,
} from './FAQCTA.styles.js'

function FAQCTA({ cta }) {
  return (
    <CtaRoot>
      <Container>
        <CtaContent>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ duration: 0.6, ease: EASE_LUXE }}
          >
            <CtaEyebrow>{cta.eyebrow}</CtaEyebrow>
          </motion.div>
          <CtaTitle>
            <TitleReveal>{cta.title}</TitleReveal>
          </CtaTitle>
          <SafeReveal from={{ y: 24 }} duration={0.6}>
            <CtaDescription>{cta.description}</CtaDescription>
          </SafeReveal>
          <SafeReveal from={{ y: 24 }} duration={0.6} delay={0.15}>
            <CtaActions>
              {cta.primaryUrl ? (
                <Button
                  as={NavLink}
                  to={cta.primaryUrl}
                  variant={BUTTON_VARIANTS.LIGHT}
                >
                  {cta.primaryLabel}
                  <FiArrowRight
                    aria-hidden="true"
                    color="currentColor"
                    size={17}
                  />
                </Button>
              ) : (
                <Button type="button" variant={BUTTON_VARIANTS.LIGHT}>
                  {cta.primaryLabel}
                </Button>
              )}
              {cta.secondaryUrl ? (
                <Button
                  as={NavLink}
                  to={cta.secondaryUrl}
                  variant={BUTTON_VARIANTS.OUTLINE_LIGHT}
                >
                  {cta.secondaryLabel}
                </Button>
              ) : (
                <Button type="button" variant={BUTTON_VARIANTS.OUTLINE_LIGHT}>
                  {cta.secondaryLabel}
                </Button>
              )}
            </CtaActions>
          </SafeReveal>
        </CtaContent>
      </Container>
      <CtaBottomLine
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT_DEFAULT}
        transition={{ duration: 1.1, ease: EASE_LUXE }}
      />
    </CtaRoot>
  )
}

export default FAQCTA
