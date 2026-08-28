import styled from 'styled-components'

export const InfoRoot = styled.section`
  padding-block: ${({ theme }) => theme.spacing.sectionStandard};
  background: ${({ theme }) => theme.colors.background};
`

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

export const InfoCopy = styled.div``

export const InfoEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &::before {
    content: '';
    width: 2.5rem;
    height: 1px;
    background: ${({ theme }) => theme.colors.gold};
  }
`

export const InfoTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: calc(${({ theme }) => theme.spacing.lg} - 0.1em);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.85rem, 3.5vw, 2.6rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
`

export const InfoDescription = styled.p`
  margin: 0;
  max-width: 40ch;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  line-height: 1.8;
`

export const InfoNote = styled.p`
  margin: ${({ theme }) => theme.spacing.lg} 0 0;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 40ch;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  line-height: 1.7;
`

export const InfoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const InfoItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: start;
`

export const InfoIcon = styled.span`
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  flex: 0 0 auto;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.ivory};
  color: ${({ theme }) => theme.colors.primaryHover};
`

export const InfoLabel = styled.p`
  margin: 0 0 0.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

export const InfoValue = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1rem;
  line-height: 1.6;
`

export const InfoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1rem;
  line-height: 1.6;
  text-decoration: none;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.15rem;
    height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.colors.gold};
    transform: scaleX(0.35);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.transitions.standard};
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 4px;
  }

  svg {
    transition: opacity ${({ theme }) => theme.transitions.fast};
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`

export const InfoSocialRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`