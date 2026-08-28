import { motion } from 'framer-motion'
import styled from 'styled-components'

export const ProcessTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vw, 3.5rem);
  max-width: 58rem;
  margin-inline: auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    left: 2rem;
    width: 2px;
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.primary} 0%,
      rgba(165, 137, 116, 0.2) 100%
    );
    z-index: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      left: 1.5rem;
    }
  }
`

export const StepNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.125rem;
  font-weight: 500;
  z-index: 1;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 3rem;
    height: 3rem;
    font-size: 1rem;
  }
`

export const StepTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 500;
  line-height: 1.3;
`

export const StepDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.7;
`

export const StepContent = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: clamp(1.75rem, 3vw, 2.5rem);
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: transform ${({ theme }) => theme.transitions.slow},
    box-shadow ${({ theme }) => theme.transitions.slow},
    border-color ${({ theme }) => theme.transitions.slow};
`

export const StepCard = styled(motion.article)`
  display: flex;
  align-items: flex-start;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  position: relative;
  z-index: 1;

  &:hover ${StepContent} {
    transform: translateY(-4px);
    border-color: rgba(165, 137, 116, 0.3);
    box-shadow: ${({ theme }) => theme.shadows.soft};
  }

  &:hover ${StepNumber} {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
    transform: scale(1.1);
  }
`
