import styled from 'styled-components'

export const FieldShell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FieldTitle = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`

export const ActionBox = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  min-height: 6.5rem;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.taupe};
    background: ${({ theme }) => theme.colors.surface};

    svg {
      transform: translateY(-2px);
    }
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`

export const ActionIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(165, 137, 116, 0.14);
  color: ${({ theme }) => theme.colors.taupeText};
  transition: background ${({ theme }) => theme.transitions.fast};

  svg {
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  ${ActionBox}:hover & {
    background: rgba(165, 137, 116, 0.22);
  }
`

export const ActionLabel = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
`

export const CaptionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const CurrentImageLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

export const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
    text-decoration: underline;
  }
`

export const Thumb = styled.img`
  width: 9rem;
  max-width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.secondary};
`

export const FieldError = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.danger};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1.5;
`