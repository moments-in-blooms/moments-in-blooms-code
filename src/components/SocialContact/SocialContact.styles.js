import { motion } from 'framer-motion'
import { css, keyframes } from 'styled-components'
import styled from 'styled-components'

const socialContactBounce = keyframes`
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5rem);
  }
`

export const Launcher = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.layers.socialContact};
  left: 2rem;
  bottom: 2rem;
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: 1rem;
    bottom: 1rem;
  }
`

export const ActionsRail = styled(motion.div)`
  position: absolute;
  left: calc(100% + 0.75rem);
  bottom: 0;
  display: grid;
  grid-template-columns: auto;
  gap: 0.6rem;
`

export const ActionLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  min-height: ${({ theme }) => theme.controls.tapTarget};
  padding: 0.6rem 1.15rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transform-origin: left center;
  transition: color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.primaryHover};
    transition: transform ${({ theme }) => theme.transitions.fast},
      color ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateX(3px);
    box-shadow: ${({ theme }) => theme.shadows.card};

    svg {
      color: ${({ theme }) => theme.colors.gold};
      transform: translateX(2px);
    }
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const IconWrap = styled.span`
  display: inline-grid;
  place-items: center;
  width: 1.25rem;
  height: 1.25rem;
  flex: 0 0 auto;
`

export const ChatLabel = styled.span`
  color: inherit;
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.02em;
`

export const MainButton = styled(motion.button)`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: ${({ theme }) => theme.controls.socialContactSize};
  padding: 0 1.35rem;
  border: 1px solid rgba(254, 254, 254, 0.14);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: box-shadow ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};
  animation: ${({ $bouncing }) =>
    $bouncing ? css`${socialContactBounce} 1.8s ease-in-out infinite` : 'none'};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  svg {
    color: ${({ theme }) => theme.colors.background};
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.ctaHover};

    svg {
      color: ${({ theme }) => theme.colors.goldLight};
    }
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`