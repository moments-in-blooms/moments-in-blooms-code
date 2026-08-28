import styled from 'styled-components'
import Container from '../Container/index.js'

export const FooterShell = styled.footer`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.ink};
  color: #f5f0e8;
  --footer-heading: #f5f0e8;
  --footer-text: #f5f0e8;
  --footer-text-secondary: rgba(245, 240, 232, 0.66);
  --footer-eyebrow: ${({ theme }) => theme.colors.goldLight};
  --footer-border: rgba(245, 240, 232, 0.14);
`

export const FooterContainer = styled(Container)`
  position: relative;
  z-index: 1;
  padding-block: ${({ theme }) => theme.spacing.section};
`

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  gap: clamp(3rem, 8vw, 8rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`

export const FooterBrand = styled.span`
  color: var(--footer-heading, ${({ theme }) => theme.colors.textPrimary});
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.5rem, 4vw, 2rem);
  letter-spacing: -0.03em;
`

export const FooterLogo = styled.img`
  display: block;
  width: auto;
  height: 3.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  object-fit: contain;
`

export const FooterDescription = styled.p`
  max-width: 24rem;
  margin-top: ${({ theme }) => theme.spacing.md};
  color: var(--footer-text-secondary, ${({ theme }) => theme.colors.textSecondary});
  font-size: 0.875rem;
  line-height: 1.8;
`

export const FooterCta = styled.section`
  display: grid;
  justify-items: start;
  max-width: 28rem;
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid var(--footer-border, ${({ theme }) => theme.colors.border});
`

export const FooterCtaEyebrow = styled.span`
  color: var(--footer-eyebrow, ${({ theme }) => theme.colors.primaryHover});
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

export const FooterCtaTitle = styled.h2`
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: var(--footer-heading, ${({ theme }) => theme.colors.textPrimary});
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 500;
  letter-spacing: -0.03em;
`

export const FooterCtaCopy = styled.p`
  max-width: 24rem;
  margin: ${({ theme }) => theme.spacing.sm} 0 ${({ theme }) => theme.spacing.lg};
  color: var(--footer-text-secondary, ${({ theme }) => theme.colors.textSecondary});
  font-size: 0.875rem;
  line-height: 1.8;
`

export const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`

export const FooterLinkGroup = styled.div`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FooterLinkHeading = styled.h3`
  color: var(--footer-heading, ${({ theme }) => theme.colors.textPrimary});
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

export const FooterLinkList = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  padding: 0;
  list-style: none;
`

export const FooterLink = styled.span`
  color: var(--footer-text-secondary, ${({ theme }) => theme.colors.textSecondary});
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.875rem;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 0.2em;
  transition: color ${({ theme }) => theme.transitions.fast}, text-decoration-color ${({ theme }) => theme.transitions.fast};

  a:hover & {
    color: ${({ theme }) => theme.colors.goldLight};
    text-decoration-color: currentColor;
  }
`

export const FooterContact = styled.div`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing.sm};
  color: var(--footer-text-secondary, ${({ theme }) => theme.colors.textSecondary});
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.875rem;

  a:hover {
    color: ${({ theme }) => theme.colors.goldLight};
  }
`

export const FooterSocials = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};

  a {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    color: var(--footer-text, ${({ theme }) => theme.colors.textPrimary});
    font-family: ${({ theme }) => theme.typography.uiFont};
    font-size: 0.8125rem;
    font-weight: 700;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.goldLight};
  }
`

export const FooterBottom = styled.div`
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.section};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid var(--footer-border, ${({ theme }) => theme.colors.border});
  color: var(--footer-text-secondary, ${({ theme }) => theme.colors.textSecondary});
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: flex-start;
    flex-direction: column;
  }
`

export const FooterWatermark = styled.span`
  position: absolute;
  z-index: -1;
  right: 0;
  bottom: -0.35em;
  color: ${({ theme }) => theme.colors.goldLight};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(3rem, 12vw, 10rem);
  letter-spacing: -0.06em;
  line-height: 0.8;
  opacity: ${({ theme }) => theme.effects.watermarkOpacity};
  pointer-events: none;
  white-space: nowrap;
`
