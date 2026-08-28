import { useEffect, useRef, useState } from 'react'
import { FiChevronDown, FiExternalLink, FiLogOut, FiMenu, FiSettings, FiUser } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ConfirmDialog from '../admin/ConfirmDialog/index.js'
import Toast from '../admin/Toast/index.js'
import { adminLogin } from '../../constants/admin.js'
import { adminNavigationGroups, routeMetadata } from '../../constants/navigation.js'
import useAuth from '../../hooks/useAuth.js'
import {
  TopbarActions,
  TopbarContainer,
  TopbarContext,
  TopbarMenuButton,
  TopbarShell,
  TopbarTitle,
  TopbarUserAvatar,
  TopbarUserButton,
  TopbarUserDropdown,
  TopbarUserEmail,
  TopbarUserMenu,
  TopbarUserMenuItem,
  TopbarUserName,
  TopbarViewSite,
} from './Topbar.styles.js'

function Topbar({ onMenuClick, menuOpen = false }) {
  const { session, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [signOutError, setSignOutError] = useState(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const errorTimerRef = useRef(null)

  const currentGroup = adminNavigationGroups.find((group) =>
    group.items.some(
      (item) =>
        location.pathname === item.path ||
        location.pathname.startsWith(`${item.path}/`),
    ),
  )
  const currentItem = currentGroup?.items.find(
    (item) =>
      location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`),
  )

  const showSignOutError = (message) => {
    setSignOutError(message)
    window.clearTimeout(errorTimerRef.current)
    errorTimerRef.current = window.setTimeout(() => setSignOutError(null), 3200)
  }

  const handleSignOut = () => {
    setConfirmOpen(true)
  }

  const handleCancelSignOut = () => {
    if (isSigningOut) return
    setConfirmOpen(false)
  }

  const handleConfirmSignOut = async () => {
    if (isSigningOut) return
    setIsSigningOut(true)

    const result = await signOut()
    setIsSigningOut(false)

    if (result?.error) {
      setConfirmOpen(false)
      showSignOutError(result.error.message)
      return
    }

    setConfirmOpen(false)
    navigate('/admin/login', { replace: true })
  }

  const email = session?.email ?? ''
  const displayName = session?.displayName ?? ''
  const initials = (displayName || email)
    .split('@')[0]
    .split(/[ ._-]+/)
    .filter(Boolean)
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'AD'

  useEffect(() => {
    if (!userMenuOpen) return undefined
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [userMenuOpen])

  return (
    <TopbarShell>
      <TopbarContainer>
        <TopbarContext>
          {onMenuClick ? (
            <TopbarMenuButton
              type="button"
              onClick={onMenuClick}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="admin-sidebar"
              title="Open navigation menu"
            >
              <FiMenu aria-hidden="true" size={18} />
            </TopbarMenuButton>
          ) : null}
          <div>
            <TopbarTitle>{currentItem?.label ?? routeMetadata.admin.title}</TopbarTitle>
            {currentGroup && currentGroup.id !== 'overview' ? (
              <span>{currentGroup.label}</span>
            ) : null}
          </div>
        </TopbarContext>

        <TopbarActions>
          <TopbarViewSite to="/" target="_blank" rel="noreferrer">
            <FiExternalLink aria-hidden="true" size={14} />
            <span>View site</span>
          </TopbarViewSite>
          {session ? (
            <TopbarUserDropdown ref={userMenuRef}>
              <TopbarUserButton
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                aria-label="Account menu"
              >
                <TopbarUserAvatar aria-hidden="true">{initials}</TopbarUserAvatar>
                <span style={{ display: 'grid', textAlign: 'left', lineHeight: 1.1 }}>
                  {displayName ? <TopbarUserName>{displayName}</TopbarUserName> : null}
                  <TopbarUserEmail>{email}</TopbarUserEmail>
                </span>
                <FiChevronDown aria-hidden="true" size={14} style={{ opacity: 0.7 }} />
              </TopbarUserButton>
              {userMenuOpen ? (
                <TopbarUserMenu role="menu">
                  <TopbarUserMenuItem
                    as={Link}
                    to="/admin/settings/account"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <FiUser aria-hidden="true" size={14} /> My account
                  </TopbarUserMenuItem>
                  <TopbarUserMenuItem
                    as={Link}
                    to="/admin/settings"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <FiSettings aria-hidden="true" size={14} /> Settings
                  </TopbarUserMenuItem>
                  <TopbarUserMenuItem
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setUserMenuOpen(false)
                      handleSignOut()
                    }}
                    disabled={isSigningOut}
                  >
                    <FiLogOut aria-hidden="true" size={14} /> {adminLogin.signOutLabel}
                  </TopbarUserMenuItem>
                </TopbarUserMenu>
              ) : null}
            </TopbarUserDropdown>
          ) : null}
        </TopbarActions>
      </TopbarContainer>

      <ConfirmDialog
        open={confirmOpen}
        title="Log out?"
        description="Are you sure you want to log out of the admin dashboard?"
        confirmLabel="Yes, Log Out"
        cancelLabel="Cancel"
        onConfirm={handleConfirmSignOut}
        onCancel={handleCancelSignOut}
      />

      <Toast visible={Boolean(signOutError)} message={signOutError} tone="error" />
    </TopbarShell>
  )
}

export default Topbar