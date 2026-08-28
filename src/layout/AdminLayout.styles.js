import styled from 'styled-components'

export const AdminShell = styled.div`
  --admin-sidebar-width: ${({ theme, $collapsed }) =>
    $collapsed ? '4.75rem' : theme.layout.adminSidebarWidth};
  min-height: 100vh;
  padding-left: var(--admin-sidebar-width);
  background: ${({ theme }) => theme.colors.background};
  transition: padding-left ${({ theme }) => theme.transitions.standard};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-left: 0;
  }
`

export const AdminWorkspace = styled.div`
  min-width: 0;
  padding-top: 4.5rem;
  overflow: ${({ $drawerOpen }) => ($drawerOpen ? 'hidden' : 'visible')};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: ${({ theme }) => theme.layout.mobileHeaderHeight};
  }
`

export const AdminMain = styled.main`
  min-height: calc(100vh - 4.5rem);
  max-width: ${({ theme }) => theme.layout.containerMaxWidth};
  margin-inline: auto;
  padding: clamp(1.25rem, 3vw, 2.5rem);
  padding-block-end: calc(5.5rem + env(safe-area-inset-bottom));

  &:focus {
    outline: none;
  }
`

export const AdminSkipLink = styled.a`
  position: fixed;
  left: -9999px;
  top: 0;
  z-index: ${({ theme }) => theme.layers.loading};
  padding: 0.75rem 1.25rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;

  &:focus {
    left: 1rem;
    top: 1rem;
  }
`