import styled from 'styled-components'
import { motion } from 'framer-motion'

export const CategoryNavSection = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const CategoryNavContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.containerMaxWidth};
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 2rem);
`

export const CategoryNavLabel = styled.p`
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

export const CategoryNavList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    scroll-snap-type: x proximity;
    scroll-padding-left: 1.25rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 0.25rem clamp(1.25rem, 4vw, 2rem) 0.75rem;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const CategoryNavItem = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  min-height: 44px;
  padding: 0.55rem 1.3rem;
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  white-space: nowrap;
  scroll-snap-align: center;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &[aria-selected='true'] {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const CategoryNavItemLabel = styled.span`
  position: relative;
  z-index: 1;
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`

export const ActiveIndicator = styled(motion.span)`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid rgba(165, 137, 116, 0.5);
  border-radius: ${({ theme }) => theme.radii.pill};
  box-shadow: 0 2px 12px rgba(26, 24, 23, 0.08);
`

export const ActiveUnderline = styled.span`
  position: absolute;
  bottom: 0.35rem;
  left: 50%;
  transform: translateX(-50%);
  width: 1.25rem;
  height: 2px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.gold};
  z-index: 1;
`
