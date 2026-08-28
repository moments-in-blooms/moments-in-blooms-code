import { motion } from 'framer-motion'
import styled from 'styled-components'

export const TestimonialsRoot = styled.div`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.sectionStandard} 0;
  background: ${({ theme }) => theme.colors.surface};
  touch-action: pan-y pinch-zoom;
`

export const TestimonialsWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`

export const TestimonialsTrack = styled.div`
  display: flex;
  gap: clamp(1.5rem, 3vw, 2rem);
  width: max-content;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
`

export const TestimonialCard = styled(motion.article)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: clamp(18rem, 28vw, 24rem);
  height: 28rem;
  padding: clamp(1.75rem, 3vw, 2.25rem);
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: transform ${({ theme }) => theme.transitions.slow},
    box-shadow ${({ theme }) => theme.transitions.slow};
  flex-shrink: 0;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadows.soft};
  }

  &::before {
    content: '"';
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: 4rem;
    line-height: 1;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.12;
    pointer-events: none;
  }
`

export const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`

export const RatingStars = styled.div`
  display: flex;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 0.9rem;
  flex-shrink: 0;
`

export const QuoteContent = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  max-height: ${({ $isExpanded }) => ($isExpanded ? 'none' : '8.5rem')};
`

export const QuoteText = styled.blockquote`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  padding: 0;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-style: italic;
  line-height: 1.65;
`

export const ReadMoreButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primaryHover};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  margin-top: ${({ theme }) => theme.spacing.sm};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 2px;
  }
`

export const AuthorFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: auto;
  flex-shrink: 0;
`

export const AuthorAvatar = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const AuthorMeta = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

export const AuthorName = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const EventTag = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
