import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import Button from '../../../../components/Button/index.js'
import TitleReveal from '../../../../components/Reveal/index.js'
import { BUTTON_VARIANTS } from '../../../../constants/ui.js'
import { EASE_LUXE } from '../../../../styles/animations.js'
import {
  HeroActions,
  HeroContainer,
  HeroCopy,
  HeroDecoration,
  HeroDescription,
  HeroEyebrow,
  HeroMedia,
  HeroOverlay,
  HeroRoot,
  HeroSideNote,
  HeroTitle,
  ScrollCue,
} from './Hero.styles.js'

function Hero({ content, id = 'home-hero' }) {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const mediaY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : 72])

  return (
    <HeroRoot id={id}>
      <HeroMedia
        $src={content.image.src}
        style={{ y: mediaY }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE_LUXE }}
        aria-hidden="true"
      />
      <HeroOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE_LUXE }}
        aria-hidden="true"
      />
      <HeroDecoration
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, rotate: 360 }}
        transition={{ opacity: { duration: 1.2, delay: 1.2 }, scale: { duration: 1.2, delay: 1.2 }, rotate: { duration: 28, repeat: Infinity, ease: 'linear' } }}
      />
      <HeroContainer>
        <HeroCopy>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE_LUXE }}
          >
            <HeroEyebrow>{content.eyebrow}</HeroEyebrow>
          </motion.div>
          <HeroTitle>
            <TitleReveal delay={0.4}>{content.title}</TitleReveal>
          </HeroTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE_LUXE }}
          >
            <HeroDescription>{content.description}</HeroDescription>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease: EASE_LUXE }}
          >
            <HeroActions>
              <Button as={NavLink} to="/contact">
                {content.primaryCta}
                <FiArrowUpRight aria-hidden="true" color="currentColor" size={17} />
              </Button>
              <Button as={NavLink} to="/gallery" variant={BUTTON_VARIANTS.OUTLINE}>
                {content.secondaryCta}
              </Button>
            </HeroActions>
          </motion.div>
        </HeroCopy>
        <HeroSideNote
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: EASE_LUXE }}
        >
          Floral design
          <br />
          thoughtful details
          <br />
          joyful gatherings
        </HeroSideNote>
      </HeroContainer>
      <ScrollCue
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.35, ease: EASE_LUXE }}
        href="#home-trusted-by"
        aria-label="Scroll to discover more"
      >
        <span>Scroll to discover</span>
        <FiArrowDown aria-hidden="true" color="currentColor" size={14} />
      </ScrollCue>
      <span className="sr-only">{content.image.credit}</span>
    </HeroRoot>
  )
}

export default Hero
