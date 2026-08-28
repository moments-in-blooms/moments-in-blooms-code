import Container from '../../../../components/Container/index.js'
import { ImageReveal, SafeReveal } from '../../../../components/Reveal/index.js'
import Section from '../../../../components/Section/index.js'
import { SECTION_TONES } from '../../../../constants/ui.js'
import {
  IntroContent,
  IntroGrid,
  IntroQuote,
  IntroTextGroup,
  IntroVisual,
  PrimaryImageFrame,
  QuoteAuthor,
  QuoteRole,
  SecondaryImageFloat,
} from './ServicesIntro.styles.js'

function ServicesIntro({ content, id }) {
  if (!content) return null

  return (
    <Section
      id={id}
      subtitle={content.subtitle}
      title={content.title}
      tone={SECTION_TONES.DEFAULT}
    >
      <Container>
        <IntroGrid>
          <SafeReveal from={{ x: 44 }}>
            <IntroContent>
              <IntroTextGroup>
                <p>{content.paragraph1}</p>
                <p>{content.paragraph2}</p>
              </IntroTextGroup>

              {content.quote ? (
                <IntroQuote>
                  <p>“{content.quote.text}”</p>
                  <cite>
                    <QuoteAuthor>{content.quote.author}</QuoteAuthor>
                    <QuoteRole>{content.quote.role}</QuoteRole>
                  </cite>
                </IntroQuote>
              ) : null}
            </IntroContent>
          </SafeReveal>

          <IntroVisual>
            <PrimaryImageFrame>
              <ImageReveal>
                <img
                  src={content.primaryImage.src}
                  alt={content.primaryImage.alt}
                  loading="lazy"
                />
              </ImageReveal>
            </PrimaryImageFrame>

            {content.secondaryImage ? (
              <SafeReveal as={SecondaryImageFloat} from={{ scale: 0.85, y: 16 }} delay={0.3}>
                <img
                  src={content.secondaryImage.src}
                  alt={content.secondaryImage.alt}
                  loading="lazy"
                />
              </SafeReveal>
            ) : null}
          </IntroVisual>
        </IntroGrid>
      </Container>
    </Section>
  )
}

export default ServicesIntro
