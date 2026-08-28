import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

const mobileBreak = ({ theme }) => `@media (max-width: ${theme.breakpoints.desktop})`

export const SidebarShell = styled.aside`
  position: fixed;
  inset-block: 0;
  left: 0;
  z-index: ${({ theme }) => theme.layers.header};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: ${({ theme, $collapsed }) =>
    $collapsed ? '4.75rem' : theme.layout.adminSidebarWidth};
  height: 100vh;
  height: 100dvh;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  overflow-y: auto;
  overflow-x: hidden;
  transition: transform ${({ theme }) => theme.transitions.standard},
    width ${({ theme }) => theme.transitions.standard};

  ${mobileBreak} {
    z-index: ${({ theme }) => theme.layers.menu};
    width: ${({ theme }) => theme.layout.adminSidebarWidth};
    box-shadow: ${({ theme }) => theme.shadows.soft};
    transform: translateX(-110%);

    ${({ $open }) =>
      $open &&
      css`
        transform: translateX(0);
      `}
  }
`

export const DrawerOverlay = styled.div`
  display: none;

  ${mobileBreak} {
    display: block;
    position: fixed;
    inset: 0;
    z-index: ${({ theme }) => theme.layers.menuBackdrop};
    background: ${({ theme }) => theme.surfaces.overlay};
    opacity: 0;
    pointer-events: none;
    transition: opacity ${({ theme }) => theme.transitions.standard};

    ${({ $open }) =>
      $open &&
      css`
        opacity: 1;
        pointer-events: auto;
      `}
  }
`

export const SidebarBrand = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 3rem;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const SidebarBrandLogo = styled.img`
  flex: 0 0 auto;
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
`

export const SidebarBrandName = styled.span`
  display: grid;
  gap: 0.15rem;
  min-width: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.1;
  white-space: nowrap;

  &[hidden] {
    display: none;
  }
`

export const SidebarBrandCaption = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
`

export const SidebarNav = styled.nav`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const SidebarGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xxs};
`

export const SidebarGroupLabel = styled.span`
  padding: 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`

export const SidebarLink = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 2.6rem;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.82rem;
  font-weight: 600;
  transition: background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &::before {
    content: '';
    position: absolute;
    inset-block: 0.45rem;
    left: 0;
    width: 3px;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: transparent;
    transition: background ${({ theme }) => theme.transitions.fast};
  }

  svg {
    flex: 0 0 auto;
  }

  a:hover & {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  a:focus-visible & {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  a.active & {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
    font-weight: 700;

    &::before {
      background: ${({ theme }) => theme.colors.gold};
    }
  }
`

export const SidebarCollapse = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 2.6rem;
  margin-top: auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.taupe};
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  ${mobileBreak} {
    display: none;
  }
`