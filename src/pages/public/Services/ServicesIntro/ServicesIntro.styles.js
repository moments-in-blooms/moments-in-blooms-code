import { motion } from 'framer-motion'
import styled from 'styled-components'

export const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1.1fr 0.9fr;
  }
`

export const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const IntroTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.0625rem;
    line-height: 1.8;

    &:first-of-type {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.textPrimary};
      font-weight: 400;
      line-height: 1.7;

      &::first-letter {
        font-family: ${({ theme }) => theme.typography.headingFont};
        font-size: 3.5rem;
        float: left;
        line-height: 0.8;
        padding-top: 0.1rem;
        padding-right: 0.6rem;
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`

export const IntroQuote = styled.blockquote`
  position: relative;
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  background: ${({ theme }) => theme.colors.surface};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};

  p {
    margin: 0 0 ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: clamp(1.125rem, 2vw, 1.3rem);
    font-style: italic;
    line-height: 1.5;
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
  font-size: 0.9rem;
`

export const QuoteRole = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

export const IntroVisual = styled.div`
  position: relative;
  width: 100%;
`

export const PrimaryImageFrame = styled.div`
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

export const SecondaryImageFloat = styled(motion.div)`
  position: absolute;
  bottom: -2rem;
  left: -2rem;
  width: clamp(10rem, 20vw, 15rem);
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  border: 4px solid ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  z-index: 2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: -1.5rem;
    left: 1rem;
  }
`
