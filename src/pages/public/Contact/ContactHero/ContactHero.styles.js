import { motion } from 'framer-motion'
import styled from 'styled-components'

export const HeroRoot = styled.section`
  position: relative;
  min-height: clamp(36rem, 84vh, 50rem);
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
    object-position: center 30%;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(18, 12, 15, 0.62) 0%,
      rgba(18, 12, 15, 0.4) 50%,
      rgba(18, 12, 15, 0.78) 100%
    );
  }
`

export const HeroContent = styled.div`
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

export const HeroEyebrow = styled.span`
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
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.03em;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.25);
`

export const HeroDescription = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  color: rgba(255, 255, 255, 0.92);
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  line-height: 1.75;
  max-width: 46ch;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
`

export const HeroNote = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0.5rem 1.15rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: ${({ theme }) => theme.radii.pill};

  span {
    width: 0.5rem;
    height: 0.5rem;
    flex: 0 0 auto;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gold};
  }

  p {
    margin: 0;
    color: rgba(245, 240, 232, 0.9);
    font-family: ${({ theme }) => theme.typography.uiFont};
    font-size: 0.72rem;
    line-height: 1.6;
    letter-spacing: 0.01em;
    text-align: left;
  }
`