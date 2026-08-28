import Button from '../../../../components/Button/index.js'
import Container from '../../../../components/Container/index.js'
import SafeReveal from '../../../../components/Reveal/SafeReveal.jsx'
import TitleReveal from '../../../../components/Reveal/TitleReveal.jsx'
import {
  CTAActions,
  CTAContent,
  CTADescription,
  CTARoot,
  CTASubtitle,
  CTATitle,
} from './ServicesCTA.styles.js'

function ServicesCTA({ content, id }) {
  if (!content) return null

  return (
    <CTARoot id={id}>
      <Container>
        <CTAContent>
          {content.eyebrow ? (
            <SafeReveal from={{ y: 12 }} duration={0.6}>
              <CTASubtitle>{content.eyebrow}</CTASubtitle>
            </SafeReveal>
          ) : null}
          <CTATitle>
            <TitleReveal>{content.title}</TitleReveal>
          </CTATitle>
          <SafeReveal from={{ y: 28 }} duration={0.55}>
            <CTADescription>{content.description}</CTADescription>
          </SafeReveal>

          <SafeReveal from={{ y: 14 }} duration={0.7} delay={0.2}>
            <CTAActions>
              {content.primaryCta ? (
                <Button to={content.path || '/contact'} size="large" variant="light">
                  {content.primaryCta}
                </Button>
              ) : null}

              {content.secondaryCta ? (
                <Button to="/gallery" size="large" variant="outlineLight">
                  {content.secondaryCta}
                </Button>
              ) : null}
            </CTAActions>
          </SafeReveal>
        </CTAContent>
      </Container>
    </CTARoot>
  )
}

export default ServicesCTA
