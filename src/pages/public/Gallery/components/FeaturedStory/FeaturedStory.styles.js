import styled from 'styled-components'
import { motion } from 'framer-motion'

export const FeaturedStoriesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.sectionStandard} 0;
  background: ${({ theme }) => theme.colors.surface};
`

export const StoriesContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.containerMaxWidth};
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 2rem);
`

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

export const SectionEyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: ${({ theme }) => theme.typography.headingLineHeight};
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const StoryCard = styled(motion.article)`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  
  &:last-of-type {
    margin-bottom: 0;
  }
  
  &:nth-child(even) {
    direction: rtl;
    
    > * {
      direction: ltr;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
    
    &:nth-child(even) {
      direction: ltr;
    }
  }
`

export const StoryImageWrapper = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  aspect-ratio: 4/3;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 16/9;
  }
`

export const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.slow};
  
  ${StoryCard}:hover & {
    transform: scale(1.03);
  }
`

export const StoryContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0;
  }
`

export const StoryTag = styled.p`
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const StoryTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  line-height: ${({ theme }) => theme.typography.headingLineHeight};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const StoryDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.bodyFont};
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const StoryLink = styled.button`
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0;
  position: relative;

  svg {
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.3rem;
    height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.colors.gold};
    transform: scaleX(0.4);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.transitions.standard};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};

    &::after {
      transform: scaleX(1);
    }

    svg {
      transform: translateX(4px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 4px;
  }
`
