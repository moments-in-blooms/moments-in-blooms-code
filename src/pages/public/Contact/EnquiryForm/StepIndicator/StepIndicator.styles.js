import styled, { css } from 'styled-components'

export const Header = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.6rem;
  }
`

export const List = styled.ol`
  --marker: 40px;
  list-style: none;
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  padding: 0 0 ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    --marker: 32px;
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    --marker: 28px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    padding-bottom: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`

const stateStyles = {
  completed: css`
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
  `,
  active: css`
    background: ${({ theme }) => theme.colors.blushSoft};
    border: 2px solid ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
  `,
  upcoming: css`
    background: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textSecondary};
  `,
}

export const Item = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: calc(var(--marker) / 2);
    left: calc(50% + var(--marker) / 2 + 2px);
    width: calc(100% - var(--marker) - 4px);
    height: 1px;
    background: ${({ $state, theme }) =>
      $state === 'completed' ? theme.colors.gold : theme.colors.border};
  }
`

export const Marker = styled.span`
  position: relative;
  z-index: 1;
  width: var(--marker);
  height: var(--marker);
  border: 1px solid transparent;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  font-weight: 700;
  ${({ $state }) => stateStyles[$state]}

  svg {
    width: 1rem;
    height: 1rem;
  }
`

const labelStyles = {
  active: css`
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  `,
  completed: css`
    color: ${({ theme }) => theme.colors.textPrimary};
  `,
  upcoming: css`
    color: ${({ theme }) => theme.colors.textSecondary};
  `,
}

export const Label = styled.span`
  display: block;
  max-width: 100%;
  min-height: 1.85em;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.68rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.01em;
  ${({ $state }) => labelStyles[$state]}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.55rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`