import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/index.js'
import Topbar from '../components/Topbar/index.js'
import { AdminMain, AdminShell, AdminSkipLink, AdminWorkspace } from './AdminLayout.styles.js'

function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (!drawerOpen) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDrawerOpen(false)
      }
    }
    const handleTouchMove = (event) => {
      if (event.target.closest('aside')) return
      event.preventDefault()
    }
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [drawerOpen])

  return (
    <AdminShell $collapsed={collapsed}>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminSkipLink href="#admin-main-content">Skip to content</AdminSkipLink>
      <Sidebar
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((current) => !current)}
      />
      <AdminWorkspace $drawerOpen={drawerOpen} onClick={() => drawerOpen && setDrawerOpen(false)}>
        <Topbar onMenuClick={() => setDrawerOpen((open) => !open)} menuOpen={drawerOpen} />
        <AdminMain id="admin-main-content" tabIndex={-1}>
          <Outlet />
        </AdminMain>
      </AdminWorkspace>
    </AdminShell>
  )
}

export default AdminLayout