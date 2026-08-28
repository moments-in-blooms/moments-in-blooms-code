import { motion } from 'framer-motion'
import styled from 'styled-components'
import { NAVBAR_THEMES } from '../../constants/ui.js'

export const MenuBackdrop = styled(motion.div)`
  position: fixed;
  z-index: ${({ theme }) => theme.layers.menuBackdrop};
  inset: 0;
  background: ${({ theme }) => theme.surfaces.overlay};
  backdrop-filter: blur(${({ theme }) => theme.effects.menuBackdropBlur});
`

export const MenuPanel = styled(motion.div)`
  position: fixed;
  z-index: ${({ theme }) => theme.layers.menu};
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  width: min(100%, 34rem);
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  padding: 1.5rem;
  background: ${({ theme }) => theme.surfaces.menu};

  @media (min-width: ${({ theme }) => theme.breakpoints.tabletMin}) {
    padding: 2rem 3rem;
  }
`

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const MenuBrandBlock = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`

export const MenuBrand = styled.img`
  display: block;
  width: auto;
  height: 1.75rem;
  object-fit: contain;
`

export const MenuBrandText = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
`

export const CloseButton = styled.button`
  display: inline-grid;
  width: ${({ theme }) => theme.controls.tapTarget};
  height: ${({ theme }) => theme.controls.tapTarget};
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.25rem;
  line-height: 1;
`

export const MenuLinks = styled.nav`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-block: auto;
  padding-block: 4rem;
`

export const MenuLink = styled(motion.span)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2.5rem, 11vw, 4.5rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 0.95;
  transition: color ${({ theme }) => theme.transitions.fast};

  a:hover &,
  a.active & {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`

export const MenuFooter = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8125rem;
`

export const MenuContact = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
`

export const MenuSocials = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  a {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.2em;
    transition: ${({ theme }) => theme.transitions.fast};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
    text-decoration-color: currentColor;
  }
`

export const MobileMenuButton = styled.button`
  display: inline-grid;
  width: ${({ theme }) => theme.controls.tapTarget};
  height: ${({ theme }) => theme.controls.tapTarget};
  place-items: center;
  gap: 5px;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ $variant, theme }) =>
    $variant === NAVBAR_THEMES.DARK ? theme.colors.surface : theme.colors.textPrimary};
  transition: color ${({ theme }) => theme.transitions.standard};
`

export const MenuIcon = styled.span`
  display: grid;
  width: 1.35rem;
  gap: 5px;
`

export const MenuLine = styled(motion.span)`
  display: block;
  height: 2px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: currentColor;
  transform-origin: center;
`
