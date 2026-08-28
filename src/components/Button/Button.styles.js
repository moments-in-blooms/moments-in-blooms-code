import styled, { css } from 'styled-components'

const variantStyles = {
  primary: css`
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.hover};
      background: ${({ theme }) => theme.colors.hover};
    }
  `,
  secondary: css`
    border-color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.blushSoft};
      background: ${({ theme }) => theme.colors.blushSoft};
    }
  `,
  outline: css`
    border-color: ${({ theme }) => theme.colors.primary};
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  ghost: css`
    border-color: transparent;
    background: transparent;
    color: ${({ theme }) => theme.colors.textPrimary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.beige};
      color: ${({ theme }) => theme.colors.primary};
    }
  `,
  light: css`
    border-color: ${({ theme }) => theme.colors.ivory};
    background: ${({ theme }) => theme.colors.ivory};
    color: ${({ theme }) => theme.colors.ink};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.surface};
      background: ${({ theme }) => theme.colors.surface};
    }
  `,
  outlineLight: css`
    border-color: rgba(245, 240, 232, 0.55);
    background: transparent;
    color: #f5f0e8;

    &:hover:not(:disabled) {
      border-color: rgba(245, 240, 232, 0.8);
      background: rgba(245, 240, 232, 0.1);
    }
  `,
  danger: css`
    border-color: ${({ theme }) => theme.colors.danger};
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.surface};

    &:hover:not(:disabled) {
      border-color: #a83a37;
      background: #a83a37;
    }
  `,
  success: css`
    border-color: ${({ theme }) => theme.colors.success};
    background: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.surface};

    &:hover:not(:disabled) {
      border-color: #2f6642;
      background: #2f6642;
    }
  `,
}

const sizeStyles = {
  small: css`
    min-height: ${({ theme }) => theme.controls.height.sm};
    padding-inline: 1rem;
    font-size: 0.8125rem;
  `,
  medium: css`
    min-height: ${({ theme }) => theme.controls.height.md};
    padding-inline: 1.25rem;
  `,
  large: css`
    min-height: ${({ theme }) => theme.controls.height.lg};
    padding-inline: 1.75rem;
  `,
}

const radiusStyles = {
  sm: ({ theme }) => theme.radii.sm,
  md: ({ theme }) => theme.radii.md,
  lg: ({ theme }) => theme.radii.lg,
  xl: ({ theme }) => theme.radii.xl,
  pill: ({ theme }) => theme.radii.pill,
}

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-height: ${({ theme }) => theme.controls.height.md};
  padding-block: ${({ theme }) => theme.spacing.sm};
  border: 1px solid transparent;
  border-radius: ${({ theme, $radius }) =>
    (radiusStyles[$radius] ?? radiusStyles.pill)({ theme })};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  transition: ${({ theme }) => theme.transitions.standard};
  ${({ $size }) => sizeStyles[$size] || sizeStyles.medium};
  ${({ $variant }) => variantStyles[$variant] || variantStyles.primary};

  &:hover:not(:disabled) {
    box-shadow: ${({ theme, $variant }) =>
      $variant === 'primary' || $variant === 'light'
        ? theme.shadows.ctaHover
        : 'none'};
    transform: translateY(-1px);
  }

  & > svg {
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover:not(:disabled) > svg {
    transform: translateX(3px);
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);

    & > svg {
      transform: translateX(0);
    }
  }

  &:disabled {
    opacity: 0.55;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const ButtonSpinner = styled.span`
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  animation: button-spin 0.75s linear infinite;

  @keyframes button-spin {
    to {
      transform: rotate(360deg);
    }
  }
`
