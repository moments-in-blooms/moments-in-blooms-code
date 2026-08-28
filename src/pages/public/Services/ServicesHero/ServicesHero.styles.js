import { motion } from 'framer-motion'
import styled from 'styled-components'

export const HeroRoot = styled.section`
  position: relative;
  min-height: clamp(38rem, 85vh, 52rem);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
  isolation: isolate;
  padding-block: clamp(6rem, 12vw, 10rem);
  margin-top: calc(-1 * ${({ theme }) => theme.layout.headerHeight});

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: calc(-1 * ${({ theme }) => theme.layout.mobileHeaderHeight});
  }
`

export const HeroBackground = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 1;
  will-change: transform;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 35%;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(18, 12, 15, 0.65) 0%,
      rgba(18, 12, 15, 0.45) 50%,
      rgba(18, 12, 15, 0.8) 100%
    );
  }
`

export const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 56rem;
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.spacing.md};
`

export const HeroEyebrow = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.goldLight};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.725rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: 0.4rem 1.25rem;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.radii.pill};
`

export const HeroTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: calc(${({ theme }) => theme.spacing.md} - 0.1em);
  color: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2.75rem, 6vw, 4.75rem);
  font-weight: 400;
  line-height: 1.02;
  letter-spacing: -0.04em;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.25);
`

export const HeroDescription = styled(motion.p)`
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  color: rgba(255, 255, 255, 0.92);
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  line-height: 1.7;
  max-width: 44ch;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
`

export const HeroActions = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FloatingBadge = styled(motion.div)`
  position: absolute;
  bottom: 2.5rem;
  right: clamp(2rem, 6vw, 6rem);
  z-index: 3;
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

export const BadgeTitle = styled.span`
  color: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.15rem;
  font-weight: 500;
  line-height: 1;
`

export const BadgeSubtitle = styled.span`
  color: rgba(255, 255, 255, 0.85);
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-top: 0.25rem;
`
