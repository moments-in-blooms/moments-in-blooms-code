import styled, { css } from 'styled-components'

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  min-height: 2.5rem;
`

export const ToggleLabel = styled.label`
  display: grid;
  gap: 0.2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
`

export const ToggleHint = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 1.5;
`

export const ToggleTrack = styled.span`
  position: relative;
  flex: 0 0 auto;
  width: 3rem;
  height: 1.625rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : theme.colors.border};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  input:focus-visible + span {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  input:disabled + span {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

export const ToggleKnob = styled.span`
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 1px 4px rgba(26, 26, 26, 0.25);
  transition: transform ${({ theme }) => theme.transitions.fast};

  ${({ $checked }) =>
    $checked &&
    css`
      transform: translateX(1.375rem);
    `}
`