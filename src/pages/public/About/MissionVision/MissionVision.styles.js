import { motion } from 'framer-motion'
import styled from 'styled-components'

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2rem, 5vw, 4rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.tabletMin}) {
    grid-template-columns: repeat(2, 1fr);
    align-items: start;
  }
`

export const StyledMissionCard = styled(motion.article)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: clamp(2.5rem, 5vw, 4rem);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transitions.slow},
    box-shadow ${({ theme }) => theme.transitions.slow};

  &:nth-child(2) {
    @media (min-width: ${({ theme }) => theme.breakpoints.tabletMin}) {
      margin-top: 2.5rem;
    }
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadows.soft};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary} 0%,
      ${({ theme }) => theme.colors.gold} 100%
    );
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -3rem;
    right: -3rem;
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(165, 137, 116, 0.07) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    pointer-events: none;
  }
`

export const CardTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &::after {
    content: '';
    display: inline-block;
    width: 1.5rem;
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
  }
`

export const CardTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.5rem, 2.5vw, 2.125rem);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
`

export const CardDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.05rem;
  line-height: 1.75;
`
