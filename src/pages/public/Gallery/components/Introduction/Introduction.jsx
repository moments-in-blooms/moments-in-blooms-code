import { motion } from 'framer-motion'

import Container from '../../../../../components/Container/index.js'
import TitleReveal from '../../../../../components/Reveal/index.js'

import { EASE_LUXE } from '../../../../../styles/animations.js'

import * as S from './Introduction.styles.js'

function Introduction({ content }) {
  return (
    <S.IntroSection>
      <Container>
        <S.IntroContent>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE_LUXE }}
          >
            <S.IntroEyebrow>{content.eyebrow}</S.IntroEyebrow>
          </motion.div>
          <S.IntroTitle>
            <TitleReveal>{content.title}</TitleReveal>
          </S.IntroTitle>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_LUXE }}
          >
            <S.IntroText>{content.text}</S.IntroText>
          </motion.div>
        </S.IntroContent>
      </Container>
    </S.IntroSection>
  )
}

export default Introduction
