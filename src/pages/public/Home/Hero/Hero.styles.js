import { motion } from 'framer-motion'
import styled from 'styled-components'
import PageContainer from '../../../../components/PageContainer/index.js'

export const HeroRoot = styled.section`
  position: relative;
  display: flex;
  min-height: min(50rem, calc(100svh - ${({ theme }) => theme.layout.headerHeight}));
  overflow: hidden;
  isolation: isolate;
  align-items: stretch;
  background: ${({ theme }) => theme.colors.background};
  margin-top: calc(-1 * ${({ theme }) => theme.layout.headerHeight});

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: calc(100svh - ${({ theme }) => theme.layout.mobileHeaderHeight});
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
    background-position: 58% center;
  }
`

export const HeroOverlay = styled(motion.div)`
  position: absolute;
  z-index: -1;
  inset: 0;
  background: ${({ theme }) => theme.effects.heroOverlay};
`

export const HeroContainer = styled(PageContainer)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(12rem, 0.55fr);
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  padding-block: ${({ theme }) => theme.spacing.sectionStandard} ${({ theme }) => theme.spacing.sectionCompact};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    align-content: center;
    padding-block: ${({ theme }) => theme.spacing.sectionStandard} ${({ theme }) => theme.spacing.xl};
  }
`

export const HeroCopy = styled(motion.div)`
  display: grid;
  max-width: 48rem;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const HeroEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

export const HeroTitle = styled.h1`
  max-width: 12ch;
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(3rem, 9vw, 8.5rem);
  font-weight: 500;
  letter-spacing: -0.075em;
  line-height: 0.88;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(2.75rem, 15vw, 4.5rem);
    letter-spacing: -0.06em;
  }
`

export const HeroDescription = styled.p`
  max-width: 31rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: clamp(1rem, 1.7vw, 1.2rem);
  line-height: 1.7;
`

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    width: min(100%, 22rem);
  }
`

export const HeroSideNote = styled(motion.div)`
  display: grid;
  align-self: end;
  justify-self: end;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 12rem;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid rgba(26, 24, 23, 0.3);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  line-height: 1.6;
  text-align: right;
  text-transform: uppercase;

  &::before {
    width: 2rem;
    height: 1px;
    margin-left: auto;
    background: ${({ theme }) => theme.colors.gold};
    content: '';
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

export const HeroDecoration = styled(motion.span)`
  position: absolute;
  right: 8%;
  top: 24%;
  width: clamp(5rem, 11vw, 10rem);
  aspect-ratio: 1;
  border: 1px solid rgba(165, 137, 116, 0.4);
  border-radius: 50%;
  pointer-events: none;

  &::after {
    position: absolute;
    inset: 18%;
    border: 1px solid rgba(165, 137, 116, 0.45);
    border-radius: 50%;
    content: '';
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 18%;
    right: 8%;
    width: 5rem;
  }
`

export const ScrollCue = styled(motion.a)`
  position: absolute;
  right: ${({ theme }) => theme.spacing.xl};
  bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  writing-mode: vertical-rl;

  svg {
    animation: hero-scroll-cue 1.8s ease-in-out infinite;
  }

  @keyframes hero-scroll-cue {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(0.4rem);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: ${({ theme }) => theme.spacing.md};
    bottom: ${({ theme }) => theme.spacing.md};
  }
`
