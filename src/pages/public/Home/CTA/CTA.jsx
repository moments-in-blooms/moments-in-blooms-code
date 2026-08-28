import { FiArrowUpRight } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import Button from '../../../../components/Button/index.js'
import SafeReveal from '../../../../components/Reveal/SafeReveal.jsx'
import TitleReveal from '../../../../components/Reveal/TitleReveal.jsx'
import { BUTTON_VARIANTS } from '../../../../constants/ui.js'
import { VIEWPORT_DEFAULT } from '../../../../styles/animations.js'
import {
  CTAActions,
  CTAContainer,
  CTADescription,
  CTAEyebrow,
  CTARoot,
  CTATitle,
  CTABottomLine,
  CTAOrb,
} from './CTA.styles.js'

function CTA({ content, id = 'home-cta' }) {
  return (
    <CTARoot id={id}>
      <CTAOrb
        aria-hidden="true"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
      />
      <CTAContainer>
        <SafeReveal from={{ y: 12 }} duration={0.6}>
          <CTAEyebrow>{content.eyebrow}</CTAEyebrow>
        </SafeReveal>
        <CTATitle>
          <TitleReveal duration={1}>{content.title}</TitleReveal>
        </CTATitle>
        <SafeReveal from={{ y: 28 }} duration={0.55} delay={0.15}>
          <CTADescription>{content.description}</CTADescription>
        </SafeReveal>
        <SafeReveal from={{ y: 28 }} duration={0.55} delay={0.3}>
          <CTAActions>
            <Button as={NavLink} to="/contact" variant={BUTTON_VARIANTS.OUTLINE}>
              {content.primaryCta}
              <FiArrowUpRight aria-hidden="true" color="currentColor" size={17} />
            </Button>
            <Button as={NavLink} to="/gallery" variant={BUTTON_VARIANTS.GHOST}>
              {content.secondaryCta}
            </Button>
          </CTAActions>
        </SafeReveal>
      </CTAContainer>
      <CTABottomLine
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT_DEFAULT}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </CTARoot>
  )
}

export default CTA
