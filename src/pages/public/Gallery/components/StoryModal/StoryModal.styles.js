import styled from 'styled-components'
import { motion } from 'framer-motion'

export const StoryOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.layers.loading + 20};
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 24, 23, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: clamp(0rem, 2vw, 1.5rem);
`

export const StoryPanel = styled(motion.div)`
  position: relative;
  width: min(1040px, 100%);
  max-height: calc(100dvh - 3rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.45);
  scrollbar-width: thin;
  scrollbar-color: rgba(165, 137, 116, 0.5) transparent;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    max-height: 100dvh;
    border-radius: 0;
  }
`

export const StoryToolbar = styled.div`
  position: sticky;
  top: 0;
  height: 0;
  z-index: 20;
  display: flex;
  justify-content: flex-end;
`

export const StoryClose = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(26, 24, 23, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: white;
  cursor: pointer;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  margin: 1.25rem 1.25rem 0 0;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: rotate(90deg);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const StoryHero = styled.div`
  position: relative;
  width: 100%;
  height: clamp(320px, 52vh, 520px);
  overflow: hidden;
  background: ${({ theme }) => theme.colors.secondary};
`

export const StoryHeroImage = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const StoryHeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(20, 15, 18, 0.35) 0%,
    rgba(20, 15, 18, 0.05) 40%,
    rgba(20, 15, 18, 0.74) 100%
  );
`

export const StoryHeroContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: clamp(1.5rem, 4vw, 3rem);
`

export const StoryKicker = styled.p`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 0.75rem;

  &::before {
    content: '';
    width: 2.25rem;
    height: 1px;
    background: ${({ theme }) => theme.colors.gold};
  }
`

export const StoryHeroTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-weight: 400;
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1.12;
  color: white;
  max-width: 620px;
  text-wrap: balance;
`

export const StoryHeroLocation = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
`

export const StoryBody = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: clamp(2.5rem, 7vw, 4.5rem) clamp(1.5rem, 5vw, 2.5rem) clamp(4rem, 10vw, 6rem);
`

export const StoryNarrative = styled.p`
  font-family: ${({ theme }) => theme.typography.bodyFont};
  font-size: clamp(1.05rem, 1.4vw, 1.125rem);
  line-height: 1.95;
  color: ${({ theme }) => theme.colors.textSecondary};

  &::first-letter {
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-weight: 400;
    font-size: 3.4em;
    line-height: 0.85;
    float: left;
    padding: 0.08em 0.12em 0 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const StoryDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: clamp(2.5rem, 6vw, 3.5rem) 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(165, 137, 116, 0.5), transparent);
  }

  span {
    flex: none;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    background: ${({ theme }) => theme.colors.gold};
  }
`

export const StorySection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

export const StorySectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::before {
    content: '';
    flex: none;
    width: 1.5rem;
    height: 2px;
    background: ${({ theme }) => theme.colors.gold};
  }
`

export const HighlightList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.9rem;
`

export const HighlightItem = styled.li`
  position: relative;
  padding-left: 2rem;
  font-family: ${({ theme }) => theme.typography.bodyFont};
  font-size: 1rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::before {
    content: '';
    position: absolute;
    left: 0.35rem;
    top: 0.6em;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    background: ${({ theme }) => theme.colors.gold};
  }
`

export const ServiceList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`

export const ServiceTag = styled.span`
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.55rem 1.25rem;
  border: 1px solid rgba(165, 137, 116, 0.45);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(165, 137, 116, 0.12);
`
