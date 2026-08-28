import { useEffect, useState, useRef } from 'react'
import { FiStar } from 'react-icons/fi'
import Container from '../../../../components/Container/index.js'
import Section from '../../../../components/Section/index.js'
import { SECTION_TONES } from '../../../../constants/ui.js'
import {
  AuthorAvatar,
  AuthorFooter,
  AuthorMeta,
  AuthorName,
  CardTop,
  EventTag,
  QuoteText,
  RatingStars,
  TestimonialCard,
  TestimonialsRoot,
  TestimonialsTrack,
  TestimonialsWrapper,
  ReadMoreButton,
  QuoteContent,
} from './ClientLove.styles.js'

function ClientLove({ testimonials, id }) {
  const [expandedCards, setExpandedCards] = useState({})
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef(null)
  const animationRef = useRef(null)

  // Duplicate testimonials for seamless infinite loop
  const extendedTestimonials = testimonials
    ? [...testimonials, ...testimonials, ...testimonials]
    : []

  const toggleExpand = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // Animation logic
  useEffect(() => {
    if (isPaused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    let lastTime = 0
    const speed = 0.5 // pixels per frame

    const animate = (timestamp) => {
      if (!trackRef.current) return

      if (timestamp - lastTime < 16) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastTime = timestamp

      const currentTransform = trackRef.current.style.transform || 'translateX(0px)'
      const currentTranslate = parseFloat(currentTransform.replace('translateX(', '').replace('px)', '')) || 0
      const newTranslate = currentTranslate - speed

      trackRef.current.style.transform = `translateX(${newTranslate}px)`

      // Reset position when we've scrolled one full set
      const trackWidth = trackRef.current.offsetWidth
      const singleSetWidth = trackWidth / 3

      if (newTranslate <= -singleSetWidth) {
        trackRef.current.style.transform = 'translateX(0px)'
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused])

  // Handle touch swipe
  const handleTouchStart = useRef(0)
  const handleTouchMove = (e) => {
    const currentTouch = e.touches[0].clientX
    const diff = handleTouchStart.current - currentTouch
    if (trackRef.current) {
      const currentTranslate = parseFloat(
        trackRef.current.style.transform.replace('translateX(', '').replace('px)', '') || 0
      )
      trackRef.current.style.transform = `translateX(${currentTranslate - diff}px)`
    }
    handleTouchStart.current = currentTouch
  }

  const handleTouchStartHandler = (e) => {
    handleTouchStart.current = e.touches[0].clientX
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }

  const handleTouchEnd = () => {
    // Resume animation after touch ends
    setIsPaused(false)
  }

  if (!testimonials || !testimonials.length) return null

  return (
    <Section
      id={id}
      subtitle="Client Testimonials"
      title="Kind Words From Our Celebrators"
      description="Read how couples, private hosts, and brand partners describe their styling experience with Moments in Blooms."
      tone={SECTION_TONES.SOFT}
    >
      <Container>
        <TestimonialsRoot
          onTouchStart={handleTouchStartHandler}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <TestimonialsWrapper>
            <TestimonialsTrack ref={trackRef}>
              {extendedTestimonials.map((item, index) => {
                const isExpanded = expandedCards[index] || false
                const originalIndex = index % testimonials.length

                return (
                  <TestimonialCard
                    key={`${item.id || index}-${index}`}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: originalIndex * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <CardTop>
                      <RatingStars>
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <FiStar key={i} fill="currentColor" aria-hidden="true" />
                        ))}
                      </RatingStars>
                      <QuoteContent $isExpanded={isExpanded}>
                        <QuoteText>"{item.quote}"</QuoteText>
                      </QuoteContent>
                      {item.quote.length > 180 && (
                        <ReadMoreButton
                          type="button"
                          onClick={() => toggleExpand(index)}
                          aria-expanded={isExpanded}
                          aria-label={isExpanded ? 'Show less' : 'Read more'}
                        >
                          {isExpanded ? 'Show Less' : 'Read More'}
                        </ReadMoreButton>
                      )}
                    </CardTop>

                    <AuthorFooter>
                      {item.image ? (
                        <AuthorAvatar>
                          <img src={item.image.src} alt={item.image.alt} loading="lazy" />
                        </AuthorAvatar>
                      ) : null}
                      <AuthorMeta>
                        <AuthorName>{item.name}</AuthorName>
                        <EventTag>{item.event}</EventTag>
                      </AuthorMeta>
                    </AuthorFooter>
                  </TestimonialCard>
                )
              })}
            </TestimonialsTrack>
          </TestimonialsWrapper>
        </TestimonialsRoot>
      </Container>
    </Section>
  )
}

export default ClientLove
