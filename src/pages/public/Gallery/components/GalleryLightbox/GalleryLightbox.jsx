import { AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { useImageFallback, useModal } from '../../hooks/index.js'

import { GALLERY_FALLBACK_IMAGES } from '../../constants/galleryImages.js'

import * as S from './GalleryLightbox.styles.js'

function GalleryLightbox({ isOpen, currentItem, currentIndex, totalItems, onClose, onNavigate }) {
  const { src, onError } = useImageFallback(currentItem?.src, GALLERY_FALLBACK_IMAGES.item)
  const { overlayProps } = useModal({ isOpen, onClose, label: 'Gallery image viewer' })

  return (
    <AnimatePresence>
      {isOpen && (
        <S.LightboxOverlay
          {...overlayProps}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <S.LightboxContent onClick={(event) => event.stopPropagation()}>
            <S.LightboxClose onClick={onClose} aria-label="Close lightbox">
              <FiX size={24} />
            </S.LightboxClose>

            <S.LightboxNav
              $direction="prev"
              onClick={() => onNavigate('prev')}
              aria-label="Previous image"
            >
              <FiChevronLeft size={28} />
            </S.LightboxNav>

            <S.LightboxNav
              $direction="next"
              onClick={() => onNavigate('next')}
              aria-label="Next image"
            >
              <FiChevronRight size={28} />
            </S.LightboxNav>

            <AnimatePresence mode="wait">
              <S.LightboxImage
                key={currentItem?.id}
                src={src}
                alt={currentItem?.title}
                onError={onError}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            <S.LightboxCounter>
              {currentIndex + 1} / {totalItems}
            </S.LightboxCounter>

            <S.LightboxCaption
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={currentItem?.id}
            >
              <S.LightboxCaptionTitle>{currentItem?.title}</S.LightboxCaptionTitle>
              <S.LightboxCaptionSubtitle>{currentItem?.subtitle}</S.LightboxCaptionSubtitle>
            </S.LightboxCaption>
          </S.LightboxContent>
        </S.LightboxOverlay>
      )}
    </AnimatePresence>
  )
}

export default GalleryLightbox
