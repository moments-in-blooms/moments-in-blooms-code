import { motion } from 'framer-motion'
import styled from 'styled-components'

export const HeroRoot = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  min-height: clamp(30rem, 65vh, 44rem);
  padding-block: clamp(4.75rem, 9vw, 7rem);
  overflow: hidden;
  isolation: isolate;
  background: ${({ theme }) => theme.colors.background};
  margin-top: calc(-1 * ${({ theme }) => theme.layout.headerHeight});

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: calc(-1 * ${({ theme }) => theme.layout.mobileHeaderHeight});
  }
`

export const HeroMedia = styled(motion.div)`
  position: absolute;
  z-index: -2;
  inset: -6%;
  background-image: url(${({ $src }) => $src});
  background-position: center;
  background-size: cover;
  will-change: transform;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background-position: 55% center;
  }
`

export const HeroOverlay = styled(motion.div)`
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(250, 247, 241, 0.88) 0%,
    rgba(250, 247, 241, 0.95) 100%
  );
`

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 44rem;
`

export const HeroEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;

  &::before {
    content: '';
    display: inline-block;
    width: 2rem;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gold};
  }
`

export const HeroTitle = styled.h1`
  margin: 0;
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2.75rem, 6vw, 4.5rem);
  font-weight: 500;
  line-height: 0.98;
  letter-spacing: -0.05em;
`

export const HeroDescription = styled.p`
  margin: 0;
  max-width: 38ch;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: clamp(1.0625rem, 1.3vw, 1.25rem);
  line-height: 1.65;
`

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xs};
`
