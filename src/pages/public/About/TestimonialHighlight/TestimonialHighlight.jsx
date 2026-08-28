import { FiStar } from 'react-icons/fi'
import Container from '../../../../components/Container/index.js'
import { ImageReveal, SafeReveal } from '../../../../components/Reveal/index.js'
import Section from '../../../../components/Section/index.js'
import { SECTION_TONES } from '../../../../constants/ui.js'
import {
  AuthorMeta,
  AuthorName,
  ContentCol,
  EventRole,
  HighlightCard,
  ImageFrame,
  QuoteText,
  StarsRow,
} from './TestimonialHighlight.styles.js'

function TestimonialHighlight({ content = {}, id }) {
  const { subtitle, title, quote, author, role, image } = content

  return (
    <Section id={id} subtitle={subtitle} title={title} tone={SECTION_TONES.DEFAULT}>
      <Container>
        <HighlightCard>
          <ContentCol>
            <SafeReveal>
              <StarsRow aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={18} fill="currentColor" />
                ))}
              </StarsRow>
            </SafeReveal>

            <SafeReveal>
              <QuoteText>&ldquo;{quote}&rdquo;</QuoteText>
            </SafeReveal>

            <SafeReveal>
              <AuthorMeta>
                <AuthorName>{author}</AuthorName>
                <EventRole>{role}</EventRole>
              </AuthorMeta>
            </SafeReveal>
          </ContentCol>

          {image?.src && (
            <ImageFrame>
              <ImageReveal>
                <img
                  src={image.src}
                  alt={image.alt || `Wedding celebration for ${author}`}
                  loading="lazy"
                />
              </ImageReveal>
            </ImageFrame>
          )}
        </HighlightCard>
      </Container>
    </Section>
  )
}

export default TestimonialHighlight
