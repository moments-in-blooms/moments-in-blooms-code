import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
`

export const SelectHidden = styled.select`
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
    transition: transform ${({ theme }) => theme.transitions.standard},
      color ${({ theme }) => theme.transitions.standard};
  }

  ${({ $open, theme }) =>
    $open &&
    css`
      border-color: ${theme.colors.focus};
      box-shadow: ${theme.shadows.focus};

      svg {
        transform: rotate(180deg);
      }
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

export const Menu = styled(motion.ul)`
  position: absolute;
  z-index: 20;
  top: calc(100% + 0.45rem);
  left: 0;
  right: 0;
  margin: 0;
  padding: 0.4rem;
  list-style: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.header};
  max-height: 15.5rem;
  overflow-y: auto;
`

export const Option = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0.7rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.9rem;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  ${({ $highlighted }) =>
    $highlighted &&
    css`
      background: rgba(165, 137, 116, 0.1);
    `}

  ${({ $selected, theme }) =>
    $selected &&
    css`
      color: ${theme.colors.primary};
      font-weight: 600;
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: -2px;
  }

  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.gold};
  }
`