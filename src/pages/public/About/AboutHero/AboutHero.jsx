import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import Button from '../../../../components/Button/index.js'
import Container from '../../../../components/Container/index.js'
import TitleReveal from '../../../../components/Reveal/index.js'
import { BUTTON_VARIANTS } from '../../../../constants/ui.js'
import { EASE_LUXE } from '../../../../styles/animations.js'
import {
  HeroActions,
  HeroContent,
  HeroDescription,
  HeroEyebrow,
  HeroMedia,
  HeroOverlay,
  HeroRoot,
  HeroTitle,
} from './AboutHero.styles.js'

function AboutHero({ content = {} }) {
  const { eyebrow, title, description, primaryCta, secondaryCta, image } = content
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const mediaY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : 60])

  return (
    <HeroRoot>
      {image && image.src && (
        <HeroMedia
          $src={image.src}
          style={{ y: mediaY }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: EASE_LUXE }}
          aria-hidden="true"
        />
      )}
      <HeroOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE_LUXE }}
        aria-hidden="true"
      />
      <Container>
        <HeroContent>
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE_LUXE }}
            >
              <HeroEyebrow>{eyebrow}</HeroEyebrow>
            </motion.div>
          )}

          {title && (
            <HeroTitle>
              <TitleReveal delay={0.4}>{title}</TitleReveal>
            </HeroTitle>
          )}

          {description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: EASE_LUXE }}
            >
              <HeroDescription>{description}</HeroDescription>
            </motion.div>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1, ease: EASE_LUXE }}
            >
              <HeroActions>
                {primaryCta && (
                  <Button as={NavLink} to={primaryCta.path} variant={BUTTON_VARIANTS.PRIMARY}>
                    {primaryCta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button as={NavLink} to={secondaryCta.path} variant={BUTTON_VARIANTS.OUTLINE}>
                    {secondaryCta.label}
                  </Button>
                )}
              </HeroActions>
            </motion.div>
          )}
        </HeroContent>
      </Container>
    </HeroRoot>
  )
}

export default AboutHero
