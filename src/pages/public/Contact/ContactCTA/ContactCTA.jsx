import { FiArrowUpRight } from 'react-icons/fi'
import Button from '../../../../components/Button/index.js'
import Container from '../../../../components/Container/index.js'
import SafeReveal from '../../../../components/Reveal/SafeReveal.jsx'
import TitleReveal from '../../../../components/Reveal/TitleReveal.jsx'
import * as S from './ContactCTA.styles.js'

function ContactCTA({ content, id }) {
  if (!content) return null

  return (
    <S.CTARoot id={id}>
      <Container>
        <S.CTAContent>
          <SafeReveal from={{ y: 12 }} duration={0.6}>
            <S.CTASubtitle>{content.eyebrow}</S.CTASubtitle>
          </SafeReveal>
          <S.CTATitle>
            <TitleReveal>{content.title}</TitleReveal>
          </S.CTATitle>
          <SafeReveal from={{ y: 28 }} duration={0.55}>
            <S.CTADescription>{content.description}</S.CTADescription>
          </SafeReveal>

          <SafeReveal from={{ y: 14 }} duration={0.7} delay={0.2}>
            <S.CTAActions>
              <Button to={content.primaryPath} size="large" variant="light">
                {content.primaryCta}
                <FiArrowUpRight aria-hidden="true" color="currentColor" size={17} />
              </Button>
              <Button to={content.secondaryPath} size="large" variant="outlineLight">
                {content.secondaryCta}
              </Button>
            </S.CTAActions>
          </SafeReveal>
        </S.CTAContent>
      </Container>
    </S.CTARoot>
  )
}

export default ContactCTA