import Container from '../../../../components/Container/index.js'
import { ImageReveal, SafeReveal } from '../../../../components/Reveal/index.js'
import Section from '../../../../components/Section/index.js'
import { SECTION_TONES } from '../../../../constants/ui.js'
import {
  BadgeSub,
  BadgeTitle,
  DecorativeBadge,
  ImageFrame,
  QuoteAuthor,
  QuoteRole,
  StoryContent,
  StoryGrid,
  StoryParagraphs,
  StoryQuoteCard,
  StoryVisual,
} from './BrandStory.styles.js'

function BrandStory({ content = {}, id }) {
  const { subtitle, title, paragraphs = [], quote, image } = content

  return (
    <Section id={id} subtitle={subtitle} title={title} tone={SECTION_TONES.SURFACE}>
      <Container>
        <StoryGrid>
          <StoryContent>
            <SafeReveal>
              <StoryParagraphs>
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </StoryParagraphs>
            </SafeReveal>

            {quote && (
              <SafeReveal>
                <StoryQuoteCard>
                  <p>&ldquo;{quote.text}&rdquo;</p>
                  <cite>
                    <QuoteAuthor>{quote.author}</QuoteAuthor>
                    <QuoteRole>{quote.role}</QuoteRole>
                  </cite>
                </StoryQuoteCard>
              </SafeReveal>
            )}
          </StoryContent>

          <StoryVisual>
            <ImageFrame>
              <ImageReveal>
                {image?.src ? (
                  <img src={image.src} alt={image.alt ?? ''} loading="lazy" />
                ) : null}
              </ImageReveal>
            </ImageFrame>
            <SafeReveal as={DecorativeBadge} from={{ scale: 0.85 }} delay={0.3}>
              <BadgeTitle>Est.</BadgeTitle>
              <BadgeSub>2018</BadgeSub>
            </SafeReveal>
          </StoryVisual>
        </StoryGrid>
      </Container>
    </Section>
  )
}

export default BrandStory
