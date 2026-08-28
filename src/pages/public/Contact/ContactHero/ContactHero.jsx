import { motion } from 'framer-motion'
import Container from '../../../../components/Container/index.js'
import TitleReveal from '../../../../components/Reveal/TitleReveal.jsx'
import { EASE_LUXE } from '../../../../styles/animations.js'
import * as S from './ContactHero.styles.js'

function ContactHero({ content, id }) {
  if (!content) return null

  return (
    <S.HeroRoot id={id}>
      <S.HeroBackground
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE_LUXE }}
      >
        <img src={content.image.src} alt={content.image.alt} loading="eager" />
      </S.HeroBackground>

      <Container>
        <S.HeroContent>
          {content.eyebrow ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE_LUXE }}
            >
              <S.HeroEyebrow>{content.eyebrow}</S.HeroEyebrow>
            </motion.div>
          ) : null}

          {content.title ? (
            <S.HeroTitle>
              <TitleReveal delay={0.4}>{content.title}</TitleReveal>
            </S.HeroTitle>
          ) : null}

          {content.description ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: EASE_LUXE }}
            >
              <S.HeroDescription>{content.description}</S.HeroDescription>
            </motion.div>
          ) : null}

          {content.note ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1, ease: EASE_LUXE }}
            >
              <S.HeroNote>
                <span aria-hidden="true" />
                <p>{content.note}</p>
              </S.HeroNote>
            </motion.div>
          ) : null}
        </S.HeroContent>
      </Container>

      {content.image.credit ? (
        <span className="sr-only">{content.image.credit}</span>
      ) : null}
    </S.HeroRoot>
  )
}

export default ContactHero