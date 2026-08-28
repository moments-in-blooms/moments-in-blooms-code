import { motion } from 'framer-motion'
import Button from '../../../../components/Button/index.js'
import Container from '../../../../components/Container/index.js'
import TitleReveal from '../../../../components/Reveal/index.js'
import { EASE_LUXE } from '../../../../styles/animations.js'
import {
  BadgeSubtitle,
  BadgeTitle,
  FloatingBadge,
  HeroActions,
  HeroBackground,
  HeroContent,
  HeroDescription,
  HeroEyebrow,
  HeroRoot,
  HeroTitle,
} from './ServicesHero.styles.js'

function ServicesHero({ content, id }) {
  if (!content) return null

  return (
    <HeroRoot id={id}>
      <HeroBackground
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE_LUXE }}
      >
        {content.image?.src ? (
          <img src={content.image.src} alt={content.image.alt || ''} loading="eager" />
        ) : null}
      </HeroBackground>

      <Container>
        <HeroContent>
          {content.eyebrow ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE_LUXE }}
            >
              <HeroEyebrow>{content.eyebrow}</HeroEyebrow>
            </motion.div>
          ) : null}

          {content.title ? (
            <HeroTitle>
              <TitleReveal delay={0.4}>{content.title}</TitleReveal>
            </HeroTitle>
          ) : null}

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
              {content.primaryCta ? (
                <Button to={content.primaryCta.path} size="large" variant="primary">
                  {content.primaryCta.label}
                </Button>
              ) : null}

              {content.secondaryCta ? (
                <Button
                  to={content.secondaryCta.path}
                  size="large"
                  variant="outlineLight"
                >
                  {content.secondaryCta.label}
                </Button>
              ) : null}
            </HeroActions>
          </motion.div>
        </HeroContent>
      </Container>

      {content.badge ? (
        <FloatingBadge
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE_LUXE }}
        >
          <BadgeTitle>{content.badge.title}</BadgeTitle>
          <BadgeSubtitle>{content.badge.subtitle}</BadgeSubtitle>
        </FloatingBadge>
      ) : null}
    </HeroRoot>
  )
}

export default ServicesHero
