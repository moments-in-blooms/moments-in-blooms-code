import { NavLink } from 'react-router-dom'
import Button from '../../../../components/Button/index.js'
import Container from '../../../../components/Container/index.js'
import SafeReveal from '../../../../components/Reveal/SafeReveal.jsx'
import TitleReveal from '../../../../components/Reveal/TitleReveal.jsx'
import { BUTTON_VARIANTS } from '../../../../constants/ui.js'
import {
  CTAActions,
  CTAContent,
  CTADescription,
  CTARoot,
  CTASubtitle,
  CTATitle,
} from './CTA.styles.js'

function CTA({ content = {}, id }) {
  const { subtitle, title, description, primaryCta, secondaryCta } = content

  return (
    <CTARoot id={id}>
      <Container>
        <CTAContent>
          {subtitle && (
            <SafeReveal from={{ y: 12 }} duration={0.6}>
              <CTASubtitle>{subtitle}</CTASubtitle>
            </SafeReveal>
          )}
          <CTATitle>
            <TitleReveal>{title}</TitleReveal>
          </CTATitle>
          <SafeReveal from={{ y: 28 }} duration={0.55}>
            <CTADescription>{description}</CTADescription>
          </SafeReveal>

          <SafeReveal from={{ y: 14 }} duration={0.7} delay={0.2}>
            <CTAActions>
              {primaryCta && (
                <Button as={NavLink} to={primaryCta.path} variant={BUTTON_VARIANTS.LIGHT}>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button as={NavLink} to={secondaryCta.path} variant={BUTTON_VARIANTS.OUTLINE_LIGHT}>
                  {secondaryCta.label}
                </Button>
              )}
            </CTAActions>
          </SafeReveal>
        </CTAContent>
      </Container>
    </CTARoot>
  )
}

export default CTA
