import { motion } from 'framer-motion'
import { FiChevronDown, FiImage } from 'react-icons/fi'

import GalleryCard from '../GalleryCard/GalleryCard.jsx'

import * as S from './EditorialGallery.styles.js'

function EditorialGallery({ items, hasMore, onLoadMore, onImageClick }) {
  if (items.length === 0) {
    return (
      <S.GallerySection id="gallery-panel" role="tabpanel">
        <S.GalleryContainer>
          <S.EmptyState>
            <S.EmptyStateIcon aria-hidden="true">
              <FiImage size={36} />
            </S.EmptyStateIcon>
            <S.EmptyStateTitle>This collection is resting</S.EmptyStateTitle>
            <S.EmptyStateText>
              New pieces for this category are being curated. Explore another collection in the
              meantime.
            </S.EmptyStateText>
          </S.EmptyState>
        </S.GalleryContainer>
      </S.GallerySection>
    )
  }

  return (
    <S.GallerySection id="gallery-panel" role="tabpanel">
      <S.GalleryContainer>
        <motion.div layout>
          <S.EditorialGrid>
            {items.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} onSelect={onImageClick} />
            ))}
          </S.EditorialGrid>
        </motion.div>

        {hasMore ? (
          <S.LoadMoreWrap>
            <S.LoadMoreButton type="button" onClick={onLoadMore}>
              Load More
              <FiChevronDown aria-hidden="true" size={16} />
            </S.LoadMoreButton>
          </S.LoadMoreWrap>
        ) : (
          <S.EndMessage>You&apos;ve reached the end of the gallery.</S.EndMessage>
        )}
      </S.GalleryContainer>
    </S.GallerySection>
  )
}

export default EditorialGallery
