import { motion } from 'framer-motion'
import Container from '../../../../components/Container/index.js'
import Section from '../../../../components/Section/index.js'
import { SECTION_TONES } from '../../../../constants/ui.js'
import { rise, staggerContainer, VIEWPORT_DEFAULT } from '../../../../styles/animations.js'
import {
  GalleryGrid,
  GalleryItem,
  ItemCategory,
  ItemOverlay,
  ItemTitle,
} from './GalleryPreview.styles.js'

function GalleryPreview({ content, id }) {
  if (!content) return null

  return (
    <Section
      id={id}
      subtitle={content.subtitle}
      title={content.title}
      description={content.description}
      tone={SECTION_TONES.DEFAULT}
    >
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
        >
          <GalleryGrid>
            {content.items.map((item, index) => (
              <GalleryItem
                key={item.id || index}
                $variant={item.variant}
                variants={rise}
              >
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  loading="lazy"
                />
                <ItemOverlay>
                  <ItemCategory>{item.category}</ItemCategory>
                  <ItemTitle>{item.title}</ItemTitle>
                </ItemOverlay>
              </GalleryItem>
            ))}
          </GalleryGrid>
        </motion.div>
      </Container>
    </Section>
  )
}

export default GalleryPreview
