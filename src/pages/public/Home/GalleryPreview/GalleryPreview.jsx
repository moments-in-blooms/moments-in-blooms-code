import { FiArrowUpRight, FiStar } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import Button from '../../../../components/Button/index.js'
import { ImageReveal, SafeReveal, TitleReveal } from '../../../../components/Reveal/index.js'
import { BUTTON_VARIANTS } from '../../../../constants/ui.js'
import {
  GalleryAction,
  GalleryCollage,
  GalleryContainer,
  GalleryCopy,
  GalleryEyebrow,
  GalleryFeature,
  GalleryHeader,
  GalleryImage,
  GalleryRoot,
  GallerySide,
  GallerySpark,
  GalleryTitle,
} from './GalleryPreview.styles.js'

function GalleryPreview({ items = [], id = 'home-gallery-preview' }) {
  const [feature, firstSide, secondSide] = items

  return (
    <GalleryRoot id={id}>
      <GalleryContainer>
        <GalleryHeader>
          <div>
            <SafeReveal from={{ y: 12 }} duration={0.6}>
              <GalleryEyebrow>A glimpse of the good stuff</GalleryEyebrow>
            </SafeReveal>
            <GalleryTitle>
              <TitleReveal>Made for the memory.</TitleReveal>
            </GalleryTitle>
          </div>
          <SafeReveal>
            <GalleryCopy>
              A little floral, a little playful, always intentional. Explore a selection of celebrations styled with our signature mix of softness and surprise.
            </GalleryCopy>
          </SafeReveal>
        </GalleryHeader>
        <GalleryCollage>
          {feature ? (
            <GalleryFeature to="/gallery" aria-label="View featured floral installation in the gallery">
              <ImageReveal>
                <GalleryImage src={feature.image?.src} alt={feature.image?.alt} loading="lazy" />
              </ImageReveal>
            </GalleryFeature>
          ) : null}
          {firstSide ? (
            <GallerySide $overlap to="/gallery" aria-label="View couple walking through petals in the gallery">
              <ImageReveal>
                <GalleryImage src={firstSide.image?.src} alt={firstSide.image?.alt} loading="lazy" />
              </ImageReveal>
            </GallerySide>
          ) : null}
          {secondSide ? (
            <GallerySide to="/gallery" aria-label="View place card detail in the gallery">
              <ImageReveal>
                <GalleryImage src={secondSide.image?.src} alt={secondSide.image?.alt} loading="lazy" />
              </ImageReveal>
            </GallerySide>
          ) : null}
          <GallerySpark
            aria-hidden="true"
            animate={{ rotate: [12, 22, 12], scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiStar aria-hidden="true" color="currentColor" size={19} />
          </GallerySpark>
        </GalleryCollage>
        <span className="sr-only">
          {items.map((item) => item.image?.credit).filter(Boolean).join('. ')}
        </span>
        <GalleryAction>
          <SafeReveal from={{ y: 14 }} duration={0.7}>
            <Button as={NavLink} to="/gallery" variant={BUTTON_VARIANTS.OUTLINE}>
              View Gallery
              <FiArrowUpRight aria-hidden="true" color="currentColor" size={16} />
            </Button>
          </SafeReveal>
        </GalleryAction>
      </GalleryContainer>
    </GalleryRoot>
  )
}

export default GalleryPreview
