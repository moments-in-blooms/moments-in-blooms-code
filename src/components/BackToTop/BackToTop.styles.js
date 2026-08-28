import { motion } from 'framer-motion'
import styled from 'styled-components'

export const BackToTopButton = styled(motion.button)`
  position: fixed;
  z-index: ${({ theme }) => theme.layers.backToTop};
  right: 2rem;
  bottom: 2rem;
  display: inline-grid;
  width: ${({ theme }) => theme.controls.backToTopSize};
  height: ${({ theme }) => theme.controls.backToTopSize};
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: color ${({ theme }) => theme.transitions.fast}, border-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-3px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 1rem;
    bottom: 1rem;
  }
`
