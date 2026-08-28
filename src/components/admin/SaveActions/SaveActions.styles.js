import styled from 'styled-components'

export const SaveBarShell = styled.div`
  position: sticky;
  bottom: 0;
  z-index: ${({ theme }) => theme.layers.backToTop};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding: 0.9rem ${({ theme }) => theme.spacing.lg};
  padding-bottom: calc(0.9rem + env(safe-area-inset-bottom));
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.surfaces.headerScrolled};
  box-shadow: ${({ theme }) => theme.shadows.header};
  backdrop-filter: blur(${({ theme }) => theme.effects.headerBlur});

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
    padding-bottom: calc(${({ theme }) => theme.spacing.md} + env(safe-area-inset-bottom));
    flex-direction: column;
    align-items: stretch;
  }
`

export const SaveStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme, $dirty }) =>
    $dirty ? theme.colors.warning : theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.76rem;
  font-weight: 700;

  .status-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.warning};
  }
`

export const SaveActionsError = styled.p`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: 0.4rem 0 0;
  color: ${({ theme }) => theme.colors.danger};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.74rem;
  font-weight: 600;
  line-height: 1.5;

  svg {
    flex: 0 0 auto;
    margin-top: 0.15rem;
  }
`

export const SaveActionsRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-left: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 0;
    width: 100%;
    flex-direction: column;
    align-items: stretch;

    > * {
      width: 100%;
    }
  }
`