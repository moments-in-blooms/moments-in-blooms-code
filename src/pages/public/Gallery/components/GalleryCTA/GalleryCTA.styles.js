import styled from 'styled-components'

export const CTASection = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.spacing.sectionGenerous} 0;
  background: ${({ theme }) => theme.colors.beige};
  overflow: hidden;
`

export const CTAContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.containerMaxWidth};
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 2rem);
  position: relative;
  z-index: 2;
  text-align: center;
`

export const CTAEyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const CTATitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: ${({ theme }) => theme.typography.headingLineHeight};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const CTADescription = styled.p`
  font-family: ${({ theme }) => theme.typography.bodyFont};
  font-size: clamp(1rem, 1.3vw, 1.25rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
`

export const CTAButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`

export const CTABackground = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
  opacity: 0.08;
  z-index: 1;
`
