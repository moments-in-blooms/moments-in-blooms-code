import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logoPrimary from '../../assets/images/logo-old-primary.png'
import logoWhite from '../../assets/images/logo-old-white.png'
import { publicNavigation } from '../../constants/navigation.js'
import {
  BUTTON_VARIANTS,
  MENU_KEYS,
  NAVBAR_SCROLL_THRESHOLD,
  NAVBAR_THEMES,
} from '../../constants/ui.js'
import useAuth from '../../hooks/useAuth.js'
import useBodyScrollLock from '../../hooks/useBodyScrollLock.js'
import useScrolled from '../../hooks/useScrolled.js'
import Button from '../Button/index.js'
import MobileMenu from './MobileMenu.jsx'
import * as S from './Navbar.styles.js'
import * as M from './MobileMenu.styles.js'

function Navbar({ variant = NAVBAR_THEMES.LIGHT }) {
  const { session } = useAuth()
  const isScrolled = useScrolled(NAVBAR_SCROLL_THRESHOLD)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const hadMenuOpen = useRef(false)
  const navbarTheme = isScrolled ? NAVBAR_THEMES.LIGHT : variant
  const isDark = navbarTheme === NAVBAR_THEMES.DARK

  useBodyScrollLock(isMenuOpen)

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      hadMenuOpen.current = true
      return undefined
    }

    if (hadMenuOpen.current) {
      menuButtonRef.current?.focus()
      hadMenuOpen.current = false
    }

    return undefined
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === MENU_KEYS.ESCAPE) {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeMenu, isMenuOpen])

  return (
    <>
      <S.Header $scrolled={isScrolled} $variant={navbarTheme}>
        <S.HeaderContainer>
          <NavLink to="/" end aria-label="Moments in Blooms home">
            <S.Brand>
              <S.LogoStage aria-hidden="true">
                <S.LogoImage src={logoPrimary} alt="" $visible={!isDark} />
                <S.LogoImage src={logoWhite} alt="" $visible={isDark} />
              </S.LogoStage>
              <S.Wordmark $variant={navbarTheme}>Moments in Blooms</S.Wordmark>
            </S.Brand>
          </NavLink>
          <S.PrimaryNav aria-label="Primary navigation">
            {publicNavigation.map((item) => (
              <NavLink key={item.path} to={item.path} end={item.path === '/'}>
                <S.NavigationLink $variant={navbarTheme}>{item.label}</S.NavigationLink>
              </NavLink>
            ))}
          </S.PrimaryNav>
          <S.DesktopActions>
            {session ? (
              <Button
                as={NavLink}
                to="/admin/dashboard"
                variant={isDark ? BUTTON_VARIANTS.OUTLINE_LIGHT : BUTTON_VARIANTS.OUTLINE}
              >
                Dashboard
              </Button>
            ) : null}
            <Button
              as={NavLink}
              to="/contact"
              variant={isDark ? BUTTON_VARIANTS.LIGHT : BUTTON_VARIANTS.PRIMARY}
            >
              Enquire Now
            </Button>
          </S.DesktopActions>
          <S.MobileActions>
            <M.MobileMenuButton
              ref={menuButtonRef}
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
              $variant={navbarTheme}
            >
              <M.MenuIcon aria-hidden="true">
                <M.MenuLine
                  animate={isMenuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                />
                <M.MenuLine
                  animate={isMenuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                />
              </M.MenuIcon>
            </M.MobileMenuButton>
          </S.MobileActions>
        </S.HeaderContainer>
      </S.Header>
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  )
}

export default Navbar
