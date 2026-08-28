import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { useState } from 'react'
import { VIEWPORT_DEFAULT } from '../../../../styles/animations.js'
import {
  QuoteMark,
  TestimonialArrow,
  TestimonialAvatar,
  TestimonialControls,
  TestimonialDot,
  TestimonialDots,
  TestimonialEvent,
  TestimonialMeta,
  TestimonialName,
  TestimonialQuote,
  TestimonialSlide,
  TestimonialViewport,
  TestimonialsContainer,
  TestimonialsRoot,
  TestimonialEyebrow,
} from './Testimonials.styles.js'

function Testimonials({ items = [], id = 'home-testimonials' }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (items.length === 0) {
    return null
  }

  const safeIndex = activeIndex < items.length ? activeIndex : 0
  const activeTestimonial = items[safeIndex]

  const goTo = (nextIndex) => {
    setActiveIndex((nextIndex + items.length) % items.length)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      goTo(safeIndex - 1)
    } else if (e.key === 'ArrowRight') {
      goTo(safeIndex + 1)
    }
  }

  return (
    <TestimonialsRoot id={id} onKeyDown={handleKeyDown} tabIndex={0} aria-label="Client Testimonials Carousel">
      <TestimonialsContainer>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_DEFAULT}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <TestimonialEyebrow>Kind words from good people</TestimonialEyebrow>
        </motion.div>
        <QuoteMark
          key={activeIndex}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          “
        </QuoteMark>
        <TestimonialViewport aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <TestimonialSlide
              key={activeTestimonial.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <TestimonialQuote>“{activeTestimonial.quote}”</TestimonialQuote>
              <TestimonialMeta>
                <TestimonialAvatar src={activeTestimonial.image?.src} alt={activeTestimonial.image?.alt} loading="lazy" />
                <TestimonialName>{activeTestimonial.name}</TestimonialName>
                <TestimonialEvent>
                  {activeTestimonial.event} · {activeTestimonial.location}
                </TestimonialEvent>
              </TestimonialMeta>
            </TestimonialSlide>
          </AnimatePresence>
        </TestimonialViewport>
        <TestimonialControls>
          <TestimonialArrow
            type="button"
            aria-label="Previous testimonial"
            onClick={() => goTo(safeIndex - 1)}
          >
            <FiArrowLeft aria-hidden="true" color="currentColor" size={16} />
          </TestimonialArrow>
          <TestimonialDots aria-label="Testimonial selection">
            {items.map((item, index) => (
              <TestimonialDot
                key={item.name}
                type="button"
                $active={index === safeIndex}
                aria-label={`Show testimonial from ${item.name}`}
                aria-current={index === safeIndex ? 'true' : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </TestimonialDots>
          <TestimonialArrow
            type="button"
            aria-label="Next testimonial"
            onClick={() => goTo(safeIndex + 1)}
          >
            <FiArrowRight aria-hidden="true" color="currentColor" size={16} />
          </TestimonialArrow>
        </TestimonialControls>
      </TestimonialsContainer>
    </TestimonialsRoot>
  )
}

export default Testimonials
