import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { useImageFallback } from '../../hooks/index.js'

import { GALLERY_FALLBACK_IMAGES } from '../../constants/galleryImages.js'

import * as S from './StoryGallery.styles.js'

function StoryGallery({ images = [], title }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = images.length
  const { src, onError } = useImageFallback(images[activeIndex], GALLERY_FALLBACK_IMAGES.story)

  const goTo = useCallback(
    (index) => {
      if (!total) return
      setActiveIndex(((index % total) + total) % total)
    },
    [total]
  )

  const navigate = useCallback(
    (direction) => {
      goTo(activeIndex + direction)
    },
    [activeIndex, goTo]
  )

  useEffect(() => {
    if (!total) return

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') goTo(activeIndex - 1)
      if (event.key === 'ArrowRight') goTo(activeIndex + 1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [total, activeIndex, goTo])

  if (!total) return null

  return (
    <S.StoryGallerySection>
      <S.StorySectionTitle>Inside The Event</S.StorySectionTitle>

      <S.StoryGalleryFrame>
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={src}
            alt={`${title} gallery image ${activeIndex + 1}`}
            loading="lazy"
            decoding="async"
            onError={onError}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        <S.StoryGalleryPrev onClick={() => navigate(-1)} aria-label="Previous image">
          <FiChevronLeft size={24} />
        </S.StoryGalleryPrev>
        <S.StoryGalleryNext onClick={() => navigate(1)} aria-label="Next image">
          <FiChevronRight size={24} />
        </S.StoryGalleryNext>
      </S.StoryGalleryFrame>

      <S.StoryGalleryMeta>
        <S.StoryGalleryCounter>
          {String(activeIndex + 1).padStart(2, '0')}
          <span>/</span>
          {String(total).padStart(2, '0')}
        </S.StoryGalleryCounter>
      </S.StoryGalleryMeta>

      {total > 1 && (
        <S.StoryGalleryThumbs>
          {images.map((imageSrc, index) => (
            <S.StoryGalleryThumb
              key={`${title}-${index}`}
              type="button"
              $isActive={index === activeIndex}
              onClick={() => goTo(index)}
              aria-label={`View gallery image ${index + 1}`}
            >
              <StoryThumbImage src={imageSrc} title={title} />
            </S.StoryGalleryThumb>
          ))}
        </S.StoryGalleryThumbs>
      )}
    </S.StoryGallerySection>
  )
}

function StoryThumbImage({ src, title }) {
  const { src: thumbSrc, onError } = useImageFallback(src, GALLERY_FALLBACK_IMAGES.story)

  return <S.StoryGalleryThumbImg src={thumbSrc} alt={`${title} thumbnail`} onError={onError} />
}

export default StoryGallery
