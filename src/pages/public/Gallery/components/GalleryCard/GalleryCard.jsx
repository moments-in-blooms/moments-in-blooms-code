import { memo, useCallback } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

import { useImageFallback } from '../../hooks/index.js'

import { GALLERY_FALLBACK_IMAGES } from '../../constants/galleryImages.js'

import { EASE_LUXE } from '../../../../../styles/animations.js'

import * as S from './GalleryCard.styles.js'

function GalleryCard({ item, index, onSelect }) {
  const { src, onError } = useImageFallback(item.src, GALLERY_FALLBACK_IMAGES.item)

  const handleSelect = useCallback(() => onSelect(index), [onSelect, index])

  return (
    <S.GalleryItem
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: EASE_LUXE, delay: Math.min(index, 8) * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <S.GalleryImageWrapper>
        <S.GalleryImage
          src={src}
          alt={item.title}
          loading="lazy"
          decoding="async"
          onError={onError}
        />
        <S.GalleryOverlay>
          <S.GalleryNumber>{String(index + 1).padStart(2, '0')}</S.GalleryNumber>
          <S.GalleryCaption>
            <S.GalleryCaptionTitle>{item.title}</S.GalleryCaptionTitle>
            <S.GalleryCaptionSubtitle>{item.subtitle}</S.GalleryCaptionSubtitle>
          </S.GalleryCaption>
        </S.GalleryOverlay>
        <S.GalleryViewIcon aria-hidden="true">
          <FiArrowUpRight size={18} />
        </S.GalleryViewIcon>
      </S.GalleryImageWrapper>
      <S.GalleryHitArea onClick={handleSelect} aria-label={`View ${item.title}`} />
    </S.GalleryItem>
  )
}

export default memo(GalleryCard)
