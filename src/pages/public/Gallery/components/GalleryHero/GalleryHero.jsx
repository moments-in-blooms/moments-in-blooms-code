import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

import Button from '../../../../../components/Button/index.js'
import TitleReveal from '../../../../../components/Reveal/index.js'

import { BUTTON_VARIANTS } from '../../../../../constants/ui.js'

import { EASE_LUXE } from '../../../../../styles/animations.js'

import * as S from './GalleryHero.styles.js'

function GalleryHero({ content }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <S.GalleryHero>
      <S.HeroMedia
        $src={content.backgroundImage}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 8, ease: 'easeOut' }}
        aria-hidden="true"
      />
      <S.HeroOverlay aria-hidden="true" />
      <S.HeroContent>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE_LUXE }}
        >
          <S.HeroEyebrow>{content.eyebrow}</S.HeroEyebrow>
        </motion.div>
        <S.HeroTitle>
          <TitleReveal delay={0.4}>{content.title}</TitleReveal>
        </S.HeroTitle>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: EASE_LUXE }}
        >
          <S.HeroDescription>{content.description}</S.HeroDescription>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: EASE_LUXE }}
        >
          <S.HeroCTA>
            <Button as={NavLink} to={content.primaryLink}>
              {content.primaryCTA}
              <FiArrowRight aria-hidden="true" size={18} />
            </Button>
            <Button as={NavLink} to={content.secondaryLink} variant={BUTTON_VARIANTS.OUTLINE_LIGHT}>
              {content.secondaryCTA}
            </Button>
          </S.HeroCTA>
        </motion.div>
      </S.HeroContent>
    </S.GalleryHero>
  )
}

export default GalleryHero
