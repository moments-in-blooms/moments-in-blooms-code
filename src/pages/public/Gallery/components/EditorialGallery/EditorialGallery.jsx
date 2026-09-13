import { motion } from 'framer-motion'
import { FiChevronDown, FiImage } from 'react-icons/fi'

import GalleryCard from '../GalleryCard/GalleryCard.jsx'

import * as S from './EditorialGallery.styles.js'

function EditorialGallery({ items, hasMore, onLoadMore, onImageClick, labels = {} }) {
  const loadMoreLabel = labels.loadMore ?? 'Load More'
  const endMessage = labels.endOfGallery ?? "You've reached the end of the gallery."
  const emptyTitle = labels.emptyStateTitle ?? 'This collection is resting'
  const emptyText =
    labels.emptyStateText ??
    'New pieces are being curated. Please check back soon to see our latest work.'
  if (items.length === 0) {
    return (
      <S.GallerySection>
        <S.GalleryContainer>
          <S.EmptyState>
            <S.EmptyStateIcon aria-hidden="true">
              <FiImage size={36} />
            </S.EmptyStateIcon>
            <S.EmptyStateTitle>{emptyTitle}</S.EmptyStateTitle>
            <S.EmptyStateText>{emptyText}</S.EmptyStateText>
          </S.EmptyState>
        </S.GalleryContainer>
      </S.GallerySection>
    )
  }

  return (
    <S.GallerySection>
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
              {loadMoreLabel}
              <FiChevronDown aria-hidden="true" size={16} />
            </S.LoadMoreButton>
          </S.LoadMoreWrap>
        ) : (
          <S.EndMessage>{endMessage}</S.EndMessage>
        )}
      </S.GalleryContainer>
    </S.GallerySection>
  )
}

export default EditorialGallery
