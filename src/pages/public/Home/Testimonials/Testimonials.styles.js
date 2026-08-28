import { motion } from 'framer-motion'
import styled from 'styled-components'
import PageContainer from '../../../../components/PageContainer/index.js'
import { darkSectionTokens } from '../../../../components/Section/Section.styles.js'

export const TestimonialsRoot = styled.section`
  position: relative;
  overflow: hidden;
  padding-block: ${({ theme }) => theme.spacing.sectionGenerous};
  background: ${({ theme }) => theme.colors.ink};
  ${darkSectionTokens}
  outline: none;

  &:focus-visible {
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.goldLight};
  }
`

export const TestimonialsContainer = styled(PageContainer)`
  position: relative;
  display: grid;
  justify-items: center;
  text-align: center;
`

export const TestimonialEyebrow = styled.span`
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.colors.goldLight};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

export const QuoteMark = styled(motion.span)`
  position: absolute;
  z-index: 0;
  top: -4rem;
  color: rgba(245, 240, 232, 0.08);
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(12rem, 28vw, 24rem);
  line-height: 0.7;
  pointer-events: none;
`

export const TestimonialViewport = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  width: 100%;
  min-height: 19rem;
  place-items: center;
  margin-top: ${({ theme }) => theme.spacing.xxl};
`

export const TestimonialSlide = styled(motion.div)`
  display: grid;
  justify-items: center;
  width: min(100%, 50rem);
`

export const TestimonialQuote = styled.blockquote`
  margin: 0;
  color: var(--section-heading, ${({ theme }) => theme.colors.textPrimary});
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.65rem, 4.5vw, 4rem);
  font-style: italic;
  letter-spacing: -0.045em;
  line-height: 1.05;
`

export const TestimonialMeta = styled.div`
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xl};
`

export const TestimonialAvatar = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border: 3px solid rgba(245, 240, 232, 0.25);
  border-radius: 50%;
  object-fit: cover;
`

export const TestimonialName = styled.cite`
  color: var(--section-heading, ${({ theme }) => theme.colors.textPrimary});
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

export const TestimonialEvent = styled.span`
  color: var(--section-text-secondary, ${({ theme }) => theme.colors.textSecondary});
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
`

export const TestimonialControls = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`

export const TestimonialArrow = styled.button`
  display: inline-grid;
  width: ${({ theme }) => theme.controls.tapTarget};
  height: ${({ theme }) => theme.controls.tapTarget};
  place-items: center;
  border: 1px solid rgba(245, 240, 232, 0.3);
  border-radius: 50%;
  background: transparent;
  color: #f5f0e8;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.goldLight};
    background: rgba(245, 240, 232, 0.08);
    color: ${({ theme }) => theme.colors.goldLight};
  }
`

export const TestimonialDots = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const TestimonialDot = styled.button`
  position: relative;
  display: inline-grid;
  width: ${({ theme }) => theme.controls.dotHitTarget};
  height: ${({ theme }) => theme.controls.dotHitTarget};
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;

  &::after {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${({ $active, theme }) =>
      $active ? theme.colors.goldLight : 'rgba(245, 240, 232, 0.28)'};
    content: '';
    transition: transform ${({ theme }) => theme.transitions.fast},
      background ${({ theme }) => theme.transitions.fast};
  }

  &:hover::after {
    transform: scale(1.3);
  }
`
