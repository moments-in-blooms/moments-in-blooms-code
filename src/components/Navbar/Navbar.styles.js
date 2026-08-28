import styled from 'styled-components'
import Container from '../Container/index.js'
import { NAVBAR_THEMES } from '../../constants/ui.js'

export const Header = styled.header`
  position: fixed;
  z-index: ${({ theme }) => theme.layers.header};
  top: 0;
  right: 0;
  left: 0;
  border-bottom: 1px solid
    ${({ $scrolled, theme }) => ($scrolled ? theme.colors.border : 'transparent')};
  background: ${({ $scrolled, theme }) =>
    $scrolled ? theme.surfaces.headerScrolled : 'transparent'};
  box-shadow: ${({ $scrolled, theme }) => ($scrolled ? theme.shadows.header : 'none')};
  backdrop-filter: ${({ $scrolled, theme }) =>
    $scrolled ? `blur(${theme.effects.headerBlur})` : 'none'};
  transition: background ${({ theme }) => theme.transitions.standard},
    border-color ${({ theme }) => theme.transitions.standard},
    box-shadow ${({ theme }) => theme.transitions.standard};
`

export const HeaderContainer = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  min-height: ${({ theme }) => theme.layout.headerHeight};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    justify-content: space-between;
    min-height: ${({ theme }) => theme.layout.mobileHeaderHeight};
  }
`

export const Brand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
`

export const LogoStage = styled.span`
  position: relative;
  display: inline-block;
  flex: none;
  height: clamp(1.75rem, 3.5vw, 2.25rem);
  aspect-ratio: 1;
`

export const LogoImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.transitions.standard};
`

export const Wordmark = styled.span`
  color: ${({ $variant, theme }) =>
    $variant === NAVBAR_THEMES.DARK ? theme.colors.surface : theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.05rem, 1.6vw, 1.3rem);
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1.1;
  white-space: nowrap;
  transition: color ${({ theme }) => theme.transitions.standard};
`

export const PrimaryNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

export const NavigationLink = styled.span`
  position: relative;
  display: inline-flex;
  padding-block: ${({ theme }) => theme.spacing.xs};
  color: ${({ $variant, theme }) =>
    $variant === NAVBAR_THEMES.DARK ? theme.colors.surface : theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color ${({ theme }) => theme.transitions.fast};

  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ $variant, theme }) =>
      $variant === NAVBAR_THEMES.DARK ? theme.colors.goldLight : theme.colors.primaryHover};
    content: '';
    opacity: 0;
    transform: scaleX(0.5);
    transition: opacity ${({ theme }) => theme.transitions.fast},
      transform ${({ theme }) => theme.transitions.fast};
  }

  a:hover &,
  a.active & {
    color: ${({ $variant, theme }) =>
      $variant === NAVBAR_THEMES.DARK ? theme.colors.goldLight : theme.colors.primaryHover};
  }

  a:hover &::after,
  a.active &::after {
    opacity: 1;
    transform: scaleX(1);
  }
`

export const DesktopActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

export const MobileActions = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`
