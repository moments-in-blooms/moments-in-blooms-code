import styled, { css } from 'styled-components'

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

export const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const FieldLabel = styled.label`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 600;
  }
`

const fieldBase = css`
  width: 100%;
  min-height: ${({ theme }) => theme.controls.tapTarget};
  padding: 0.8rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.9rem;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.65;
  }

  &:hover:not(:focus):not(:disabled) {
    border-color: ${({ theme }) => theme.colors.taupe};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.secondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  ${({ $error, theme }) =>
    $error &&
    css`
      border-color: ${theme.colors.danger};

      &:focus {
        border-color: ${theme.colors.danger};
        box-shadow: 0 0 0 4px rgba(201, 74, 70, 0.18);
      }
    `}
`

export const Input = styled.input`
  ${fieldBase}
`

export const Textarea = styled.textarea`
  ${fieldBase}
  min-height: 10rem;
  line-height: 1.6;
  resize: vertical;
`

export const Select = styled.select`
  ${fieldBase}
  cursor: pointer;
  appearance: none;
  padding-right: 2.5rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237D5F49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;

  option {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`

export const HelpText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.72rem;
  line-height: 1.6;
`

export const ErrorText = styled.p`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.danger};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1.5;

  svg {
    flex: 0 0 auto;
    margin-top: 0.15rem;
  }
`

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-weight: 700;
`

export const ChoiceInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
`

export const ChoicePill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.1rem;
  border: 1px solid ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : theme.colors.background};
  color: ${({ $checked, theme }) =>
    $checked ? theme.colors.surface : theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  .choice-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${({ $checked, theme }) =>
      $checked ? theme.colors.gold : theme.colors.border};
  }
`

export const ChoiceGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
`

export const ChoiceLabel = styled.label`
  position: relative;
  display: inline-flex;
  cursor: pointer;

  ${ChoiceInput}:focus-visible + ${ChoicePill} {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  ${ChoiceInput}:disabled + ${ChoicePill} {
    opacity: 0.6;
    cursor: not-allowed;
  }
`