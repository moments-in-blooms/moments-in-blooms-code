import styled from 'styled-components'

export const IntroSection = styled.section`
  padding: ${({ theme }) => theme.spacing.sectionStandard};
  background: ${({ theme }) => theme.colors.beige};
`

export const IntroContent = styled.div`
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin: 0 auto;
  text-align: center;
  padding: 0 clamp(1.25rem, 4vw, 2rem);
`

export const IntroEyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const IntroTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: ${({ theme }) => theme.typography.headingLineHeight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: calc(${({ theme }) => theme.spacing.lg} - 0.1em);
`

export const IntroText = styled.p`
  font-family: ${({ theme }) => theme.typography.bodyFont};
  font-size: clamp(1rem, 1.3vw, 1.125rem);
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
`
