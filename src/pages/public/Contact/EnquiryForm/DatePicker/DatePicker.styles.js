import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
`

export const DateHidden = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
`

export const Trigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  min-height: ${({ theme }) => theme.controls.tapTarget};
  padding: 0.8rem 1rem;
  border: 1px solid
    ${({ $invalid, theme }) =>
      $invalid ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ $hasValue, theme }) =>
    $hasValue ? theme.colors.textPrimary : theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover:not(:focus) {
    border-color: ${({ theme }) => theme.colors.taupe};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  ${({ $open, theme }) =>
    $open &&
    css`
      border-color: ${theme.colors.focus};
      box-shadow: ${theme.shadows.focus};
    `}

  ${({ $invalid, theme }) =>
    $invalid &&
    css`
      border-color: ${theme.colors.danger};

      &:focus-visible {
        box-shadow: 0 0 0 4px rgba(201, 74, 70, 0.18);
      }
    `}
`

export const Popover = styled(motion.div)`
  position: absolute;
  z-index: 20;
  top: calc(100% + 0.45rem);
  left: 0;
  right: 0;
  padding: 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.header};
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: 0.75rem;
`

export const MonthLabel = styled.p`
  flex: 1;
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.3;
`

export const NavButton = styled.button`
  display: inline-grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primaryHover};
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const ClearButton = styled.button`
  margin-left: auto;
  padding: 0.3rem;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 0.35rem;
`

export const Weekday = styled.span`
  padding: 0.25rem 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-align: center;
  text-transform: uppercase;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;

  &:focus {
    outline: none;
  }
`

export const Blank = styled.span``

export const Day = styled.button`
  display: inline-grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: rgba(165, 137, 116, 0.1);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.35;
    cursor: not-allowed;
  }

  ${({ $selected, theme }) =>
    $selected &&
    css`
      background: ${theme.colors.primary};
      color: ${theme.colors.surface};
      box-shadow: ${theme.shadows.card};

      &:hover:not(:disabled) {
        background: ${theme.colors.primary};
      }
    `}

  ${({ $today, theme }) =>
    $today &&
    css`
      border-color: ${theme.colors.gold};
    `}
`