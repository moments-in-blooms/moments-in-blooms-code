import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

import { useImageFallback } from '../../hooks/index.js'

import { GALLERY_FALLBACK_IMAGES } from '../../constants/galleryImages.js'

import { rise, softReveal, staggerContainer, VIEWPORT_DEFAULT } from '../../../../../styles/animations.js'

import StoryModal from '../StoryModal/StoryModal.jsx'

import * as S from './FeaturedStory.styles.js'

function FeaturedStory({ content }) {
  const [activeStory, setActiveStory] = useState(null)

  const handleClose = useCallback(() => setActiveStory(null), [])

  return (
    <S.FeaturedStoriesSection>
      <S.StoriesContainer>
        <S.SectionHeader>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <S.SectionEyebrow>{content.eyebrow}</S.SectionEyebrow>
            <S.SectionTitle>{content.title}</S.SectionTitle>
          </motion.div>
        </S.SectionHeader>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
        >
          {content.stories.map((story) => (
            <StoryCard key={story.id} story={story} onOpen={setActiveStory} />
          ))}
        </motion.div>
      </S.StoriesContainer>

      <StoryModal story={activeStory} onClose={handleClose} />
    </S.FeaturedStoriesSection>
  )
}

function StoryCard({ story, onOpen }) {
  const { src, onError } = useImageFallback(story.image, GALLERY_FALLBACK_IMAGES.story)

  const handleOpen = useCallback(() => onOpen(story), [onOpen, story])

  return (
    <S.StoryCard variants={rise} whileHover={{ y: -4 }}>
      <S.StoryImageWrapper>
        <S.StoryImage src={src} alt={story.title} loading="lazy" onError={onError} />
      </S.StoryImageWrapper>
      <S.StoryContent>
        <motion.div variants={softReveal}>
          <S.StoryTag>{story.tag}</S.StoryTag>
        </motion.div>
        <motion.div variants={softReveal}>
          <S.StoryTitle>{story.title}</S.StoryTitle>
        </motion.div>
        <motion.div variants={softReveal}>
          <S.StoryDescription>{story.description}</S.StoryDescription>
        </motion.div>
        <motion.div variants={softReveal}>
          <S.StoryLink type="button" onClick={handleOpen}>
            View Full Story
            <FiArrowRight aria-hidden="true" size={16} />
          </S.StoryLink>
        </motion.div>
      </S.StoryContent>
    </S.StoryCard>
  )
}

export default FeaturedStory
