import { motion } from 'framer-motion'
import styled from 'styled-components'

export const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1.15fr 0.85fr;
  }
`

export const StoryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

export const StoryParagraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.0625rem;
    line-height: 1.8;

    &:first-of-type {
      font-size: 1.1875rem;
      color: ${({ theme }) => theme.colors.textPrimary};
      font-weight: 400;
      line-height: 1.75;

      &::first-letter {
        font-family: ${({ theme }) => theme.typography.headingFont};
        font-size: 3.25rem;
        float: left;
        line-height: 0.8;
        padding-top: 0.1rem;
        padding-right: 0.5rem;
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`

export const StoryQuoteCard = styled.blockquote`
  position: relative;
  margin: ${({ theme }) => theme.spacing.md} 0 0;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  background: ${({ theme }) => theme.colors.background};
  border-left: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};

  &::before {
    content: '“';
    position: absolute;
    top: -0.5rem;
    right: 1.5rem;
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: 4.5rem;
    line-height: 1;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.15;
    pointer-events: none;
  }

  p {
    margin: 0 0 ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: clamp(1.125rem, 2vw, 1.35rem);
    font-style: italic;
    line-height: 1.55;
    letter-spacing: -0.01em;
  }

  cite {
    display: flex;
    flex-direction: column;
    font-style: normal;
  }
`

export const QuoteAuthor = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: 0.02em;
`

export const QuoteRole = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8125rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 0.15rem;
`

export const StoryVisual = styled.div`
  position: relative;
  width: 100%;
`

export const ImageFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.imageCard};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  &:hover img {
    transform: scale(1.04);
  }
`

export const DecorativeBadge = styled(motion.div)`
  position: absolute;
  bottom: -1.5rem;
  left: -1.5rem;
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.5rem;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: -1rem;
    left: 1rem;
    width: 6rem;
    height: 6rem;
  }
`

export const BadgeTitle = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1;
`

export const BadgeSub = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-top: 0.2rem;
`
