import { AnimatePresence } from 'framer-motion'
import { FiMapPin, FiX } from 'react-icons/fi'

import { useImageFallback, useModal } from '../../hooks/index.js'

import { GALLERY_FALLBACK_IMAGES } from '../../constants/galleryImages.js'

import StoryGallery from './StoryGallery.jsx'

import * as S from './StoryModal.styles.js'

const EASE = [0.22, 1, 0.36, 1]
const EASE_EXIT = [0.4, 0, 1, 1]

function StoryModal({ story, onClose }) {
  const { src, onError } = useImageFallback(story?.image, GALLERY_FALLBACK_IMAGES.story)
  const { overlayProps } = useModal({
    isOpen: Boolean(story),
    onClose,
    label: story ? story.title : 'Featured story',
  })

  return (
    <AnimatePresence>
      {story && (
        <S.StoryOverlay
          {...overlayProps}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <S.StoryPanel
            initial={{ opacity: 0, y: 48, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 48, scale: 0.985, transition: { duration: 0.28, ease: EASE_EXIT } }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
          >
            <S.StoryToolbar>
              <S.StoryClose onClick={onClose} aria-label="Close story">
                <FiX size={22} />
              </S.StoryClose>
            </S.StoryToolbar>

            <S.StoryHero>
              <S.StoryHeroImage
                src={src}
                alt={story.title}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
                onError={onError}
              />
              <S.StoryHeroOverlay aria-hidden="true" />
              <S.StoryHeroContent>
                <S.StoryKicker>{story.eventType}</S.StoryKicker>
                <S.StoryHeroTitle>{story.title}</S.StoryHeroTitle>
                {story.location && (
                  <S.StoryHeroLocation>
                    <FiMapPin aria-hidden="true" size={14} />
                    {story.location}
                  </S.StoryHeroLocation>
                )}
              </S.StoryHeroContent>
            </S.StoryHero>

            <S.StoryBody>
              <S.StoryNarrative>{story.narrative}</S.StoryNarrative>

              <S.StoryDivider aria-hidden="true">
                <span />
              </S.StoryDivider>

              {story.highlights?.length > 0 && (
                <S.StorySection>
                  <S.StorySectionTitle>Decor Highlights</S.StorySectionTitle>
                  <S.HighlightList>
                    {story.highlights.map((highlight) => (
                      <S.HighlightItem key={highlight}>{highlight}</S.HighlightItem>
                    ))}
                  </S.HighlightList>
                </S.StorySection>
              )}

              {story.services?.length > 0 && (
                <S.StorySection>
                  <S.StorySectionTitle>Services Used</S.StorySectionTitle>
                  <S.ServiceList>
                    {story.services.map((service) => (
                      <S.ServiceTag key={service}>{service}</S.ServiceTag>
                    ))}
                  </S.ServiceList>
                </S.StorySection>
              )}

              <StoryGallery images={story.gallery} title={story.title} />
            </S.StoryBody>
          </S.StoryPanel>
        </S.StoryOverlay>
      )}
    </AnimatePresence>
  )
}

export default StoryModal
