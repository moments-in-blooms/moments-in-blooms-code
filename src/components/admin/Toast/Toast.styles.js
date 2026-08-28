import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

const toneStyles = {
  success: ({ theme }) => theme.colors.status.success,
  error: ({ theme }) => theme.colors.status.danger,
  warning: ({ theme }) => theme.colors.status.warning,
  info: ({ theme }) => theme.colors.status.info,
}

const toneColor = (tone) => toneStyles[tone] ?? toneStyles.success

export const ToastShell = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 24rem;
  padding: 0.85rem 1.1rem;
  border: 1px solid ${({ theme, $tone }) => toneColor($tone)({ theme })};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  color: ${({ theme, $tone }) => toneColor($tone)({ theme })};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  font-weight: 700;

  ${({ $position, theme }) =>
    $position === 'fixed' &&
    css`
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: ${theme.layers.loading + 1};
      width: min(24rem, calc(100vw - 2rem));
      max-width: none;
    `}
`