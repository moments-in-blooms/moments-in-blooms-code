import { motion } from 'framer-motion'
import Container from '../../../components/Container/index.js'
import TitleReveal from '../../../components/Reveal/TitleReveal.jsx'
import { EASE_LUXE } from '../../../styles/animations.js'
import { FaqHeroSkeleton } from './FAQSkeleton.jsx'
import {
  FaqHeroContent,
  FaqHeroDescription,
  FaqHeroEyebrow,
  FaqHeroRoot,
  FaqHeroTitle,
} from './FAQHero.styles.js'

function FAQHero({ eyebrow, title, description, loading = false }) {
  return (
    <FaqHeroRoot>
      <Container>
        {loading ? (
          <FaqHeroSkeleton />
        ) : (
          <FaqHeroContent>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE_LUXE }}
            >
              <FaqHeroEyebrow>{eyebrow}</FaqHeroEyebrow>
            </motion.div>
            <FaqHeroTitle>
              <TitleReveal delay={0.4}>{title}</TitleReveal>
            </FaqHeroTitle>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: EASE_LUXE }}
            >
              <FaqHeroDescription>{description}</FaqHeroDescription>
            </motion.div>
          </FaqHeroContent>
        )}
      </Container>
    </FaqHeroRoot>
  )
}

export default FAQHero
