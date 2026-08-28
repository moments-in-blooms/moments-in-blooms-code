import { motion, useReducedMotion } from 'framer-motion'
import { FiInstagram } from 'react-icons/fi'
import Button from '../../../../components/Button/index.js'
import { VIEWPORT_DEFAULT } from '../../../../styles/animations.js'
import {
  InstagramAction,
  InstagramContainer,
  InstagramEyebrow,
  InstagramImage,
  InstagramItem,
  InstagramItemOverlay,
  InstagramRoot,
  InstagramStrip,
  InstagramStripViewport,
  InstagramTitle,
} from './InstagramPreview.styles.js'

function InstagramPreview({ items, id = 'home-instagram', profileUrl = 'https://www.instagram.com' }) {
  const shouldReduceMotion = useReducedMotion()
  const repeatedItems = [...items, ...items]

  return (
    <InstagramRoot id={id}>
      <InstagramContainer>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_DEFAULT}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <InstagramEyebrow>A little more over on Instagram</InstagramEyebrow>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_DEFAULT}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <InstagramTitle>@momentsinblooms</InstagramTitle>
        </motion.div>
      </InstagramContainer>
      <InstagramStripViewport aria-label="Moments in Blooms Instagram preview">
        <InstagramStrip
          animate={shouldReduceMotion ? undefined : { x: ['0%', '-50%'] }}
          transition={shouldReduceMotion ? undefined : { duration: 34, repeat: Infinity, ease: 'linear' }}
        >
          {repeatedItems.map((item, index) => (
            <InstagramItem
              key={`${item.id}-${index}`}
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${item.image.alt} on Instagram`}
            >
              <InstagramImage src={item.image.src} alt={item.image.alt} loading="lazy" />
              <InstagramItemOverlay aria-hidden="true">
                <FiInstagram size={24} />
              </InstagramItemOverlay>
            </InstagramItem>
          ))}
        </InstagramStrip>
      </InstagramStripViewport>
      <InstagramAction>
        <Button as="a" href={profileUrl} target="_blank" rel="noreferrer">
          <FiInstagram aria-hidden="true" color="currentColor" size={17} />
          Follow @momentsinblooms
        </Button>
      </InstagramAction>
      <span className="sr-only">{items.map((item) => item.image.credit).join('. ')}</span>
    </InstagramRoot>
  )
}

export default InstagramPreview
