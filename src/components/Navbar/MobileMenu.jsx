import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo-old.png'
import { footerContact, footerSocialLinks, publicNavigation } from '../../constants/navigation.js'
import useAuth from '../../hooks/useAuth.js'
import Button from '../Button/index.js'
import * as S from './MobileMenu.styles.js'

const panelVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '100%', transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
}

const linkVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
}

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

function MobileMenu({ isOpen, onClose }) {
  const { session } = useAuth()
  const panelRef = useRef(null)
  const firstLinkRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      firstLinkRef.current?.focus()
    }
  }, [isOpen])

  const handleKeyDown = (event) => {
    if (event.key !== 'Tab' || !panelRef.current) {
      return
    }

    const focusableElements = [...panelRef.current.querySelectorAll(focusableSelector)]
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <S.MenuBackdrop
            key="mobile-menu-backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <S.MenuPanel
            key="mobile-menu-panel"
            id="mobile-navigation"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onKeyDown={handleKeyDown}
          >
            <S.MenuHeader>
              <S.MenuBrandBlock>
                <S.MenuBrand src={logo} alt="" />
                <S.MenuBrandText>Moments in Blooms</S.MenuBrandText>
              </S.MenuBrandBlock>
              <S.CloseButton type="button" onClick={onClose} aria-label="Close menu">
                <span aria-hidden="true">×</span>
              </S.CloseButton>
            </S.MenuHeader>

            <S.MenuLinks aria-label="Mobile navigation links">
              {publicNavigation.map((item, index) => (
                <NavLink
                  key={item.path}
                  ref={index === 0 ? firstLinkRef : undefined}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                >
                  <S.MenuLink
                    custom={index}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {item.label}
                  </S.MenuLink>
                </NavLink>
              ))}
            </S.MenuLinks>

            <S.MenuFooter>
              {session ? (
                <Button as={NavLink} to="/admin/dashboard" onClick={onClose} variant="outline">
                  Dashboard
                </Button>
              ) : null}
              <Button as={NavLink} to="/contact" onClick={onClose}>
                Enquire Now
              </Button>
              <S.MenuContact>
                <span>{footerContact.location}</span>
                <a href={`mailto:${footerContact.email}`}>{footerContact.email}</a>
              </S.MenuContact>
              <S.MenuSocials aria-label="Social links">
                {footerSocialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                ))}
              </S.MenuSocials>
            </S.MenuFooter>
          </S.MenuPanel>
        </>
      ) : null}
    </AnimatePresence>
  )
}

export default MobileMenu
