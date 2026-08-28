import styled from 'styled-components'
import { motion } from 'framer-motion'

export const GalleryHero = styled.section`
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  margin-top: calc(-1 * ${({ theme }) => theme.layout.headerHeight});

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: calc(-1 * ${({ theme }) => theme.layout.mobileHeaderHeight});
  }
`

export const HeroMedia = styled(motion.div)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
  z-index: 0;
`

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(26, 24, 23, 0.3) 0%,
    rgba(26, 24, 23, 0.5) 50%,
    rgba(26, 24, 23, 0.7) 100%
  );
  z-index: 1;
`

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  padding: clamp(6rem, 16vh, 9rem) clamp(1.5rem, 5vw, 2.5rem) clamp(4rem, 10vh, 6rem);
  color: white;
`

export const HeroEyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.9;
`

export const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: ${({ theme }) => theme.typography.headingLineHeight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: 400;
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: calc(${({ theme }) => theme.spacing.lg} - 0.1em);
`

export const HeroDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.bodyFont};
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  opacity: 0.95;
`

export const HeroCTA = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`
