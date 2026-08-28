import styled from 'styled-components'

export const HighlightCard = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2.5rem, 5vw, 4.5rem);
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: clamp(2.5rem, 5vw, 4.5rem);
  box-shadow: ${({ theme }) => theme.shadows.card};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.tabletMin}) {
    grid-template-columns: 1.25fr 0.75fr;
    align-items: center;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary} 0%,
      ${({ theme }) => theme.colors.gold} 100%
    );
  }
`

export const ContentCol = styled.div`
  display: flex;
  flex-direction: column;
`

export const StarsRow = styled.div`
  display: flex;
  gap: 0.35rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const QuoteText = styled.blockquote`
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  padding: 0;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 400;
  font-style: italic;
  line-height: 1.5;
  letter-spacing: -0.01em;
`

export const AuthorMeta = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const AuthorName = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.25rem;
  font-weight: 600;
`

export const EventRole = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 0.2rem;
`

export const ImageFrame = styled.div`
  aspect-ratio: 4 / 3;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.imageCard};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  ${HighlightCard}:hover img {
    transform: scale(1.05);
  }
`
