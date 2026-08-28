import styled from 'styled-components'

export const SaveBarShell = styled.div`
  position: fixed;
  bottom: 0;
  left: var(--admin-sidebar-width, 0px);
  right: 0;
  z-index: ${({ theme }) => theme.layers.backToTop};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0.75rem ${({ theme }) => theme.spacing.lg};
  padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.surfaces.headerScrolled};
  box-shadow: ${({ theme }) => theme.shadows.header};
  backdrop-filter: blur(${({ theme }) => theme.effects.headerBlur});

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    left: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.5rem ${({ theme }) => theme.spacing.xs};
    gap: ${({ theme }) => theme.spacing.xs};
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    /* icon-only: hide text labels, keep square buttons in one row */
    .btn-label {
      display: none;
    }

    button {
      padding: 0;
      width: 2.25rem;
      height: 2.25rem;
      min-width: 2.25rem;
      justify-content: center;
      gap: 0;
    }

    button svg {
      transform: none !important;
    }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
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
    margin-left: auto;
    width: auto;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`

export const SaveBarDeleteZone = styled.div`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;
  }
`