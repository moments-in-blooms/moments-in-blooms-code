import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

import Button from '../../../../../components/Button/index.js'

import { BUTTON_VARIANTS } from '../../../../../constants/ui.js'

import { fadeUp, softReveal, staggerContainer, VIEWPORT_DEFAULT } from '../../../../../styles/animations.js'

import * as S from './GalleryCTA.styles.js'

function GalleryCTA({ content }) {
  return (
    <S.CTASection>
      <S.CTABackground $src={content.backgroundImage} aria-hidden="true" />
      <S.CTAContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
          variants={staggerContainer}
        >
          <motion.div variants={softReveal}>
            <S.CTAEyebrow>{content.eyebrow}</S.CTAEyebrow>
          </motion.div>
          <motion.div variants={fadeUp}>
            <S.CTATitle>{content.title}</S.CTATitle>
          </motion.div>
          <motion.div variants={fadeUp}>
            <S.CTADescription>{content.description}</S.CTADescription>
          </motion.div>
          <motion.div variants={fadeUp}>
            <S.CTAButtons>
              <Button as={NavLink} to={content.primaryLink}>
                {content.primaryCTA}
                <FiArrowRight aria-hidden="true" size={18} />
              </Button>
              <Button as={NavLink} to={content.secondaryLink} variant={BUTTON_VARIANTS.OUTLINE}>
                {content.secondaryCTA}
              </Button>
            </S.CTAButtons>
          </motion.div>
        </motion.div>
      </S.CTAContainer>
    </S.CTASection>
  )
}

export default GalleryCTA
