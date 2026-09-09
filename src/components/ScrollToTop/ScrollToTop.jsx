import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  // Scroll to top on route (pathname) changes only. Query-string-only
  // changes (e.g. switching Services/FAQ tabs via ?collection= / ?category=)
  // are in-page state and must not yank the visitor back to the top.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

export default ScrollToTop
