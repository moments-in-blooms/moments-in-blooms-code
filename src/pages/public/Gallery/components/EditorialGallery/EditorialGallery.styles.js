import styled from 'styled-components'

export const GallerySection = styled.section`
  padding: ${({ theme }) => theme.spacing.sectionStandard} 0;
  background: ${({ theme }) => theme.colors.background};
`

export const GalleryContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.containerMaxWidth};
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 2rem);
`

export const EditorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1.5rem, 2.5vw, 2.5rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`

export const LoadMoreWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: clamp(2.5rem, 6vw, 4rem);
`

export const LoadMoreButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  background: transparent;
  border: 1px solid rgba(165, 137, 116, 0.55);
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  svg {
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: white;
    box-shadow: ${({ theme }) => theme.shadows.ctaHover};
    transform: translateY(-2px);

    svg {
      transform: translateY(3px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const EndMessage = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: clamp(2.5rem, 6vw, 4rem);

  &::before,
  &::after {
    content: '';
    width: clamp(2rem, 8vw, 4rem);
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(165, 137, 116, 0.5));
  }

  &::after {
    transform: rotate(180deg);
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(4rem, 10vw, 6rem) ${({ theme }) => theme.spacing.lg};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
`

export const EmptyStateIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const EmptyStateTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  line-height: ${({ theme }) => theme.typography.headingLineHeight};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const EmptyStateText = styled.p`
  font-family: ${({ theme }) => theme.typography.bodyFont};
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 420px;
`
