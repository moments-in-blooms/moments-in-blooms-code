import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Per-page scroll memory for the admin panel ("minus one" behavior).
//
// Tracks the scroll position of every admin page by pathname. Returning to
// a previously visited page — via "Back to …", "Cancel", the browser back /
// forward buttons, or even a sidebar link — restores where it was scrolled.
// Pages visited for the first time start at the top.

// In-memory only: a full reload intentionally resets every page to the top.
const scrollMemory = new Map()

// Every admin route is lazy-loaded: on navigation React first renders the
// Suspense fallback (LoadingScreen, a fixed overlay with zero document
// height) while the chunk loads. Applying a saved position then is clamped
// to 0 by the browser. Restoration therefore waits until the document is
// tall enough to hold the target before applying it.
const RESTORE_MAX_FRAMES = 400

function applyWhenReady(target, onApplied) {
  let frame = 0
  let rafId = null
  const step = () => {
    frame += 1
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    )
    if (maxScroll >= target || frame >= RESTORE_MAX_FRAMES) {
      window.scrollTo({ top: Math.min(target, maxScroll), left: 0, behavior: 'auto' })
      onApplied(Math.min(target, maxScroll))
      return
    }
    rafId = window.requestAnimationFrame(step)
  }
  rafId = window.requestAnimationFrame(step)
  return () => {
    if (rafId !== null) window.cancelAnimationFrame(rafId)
  }
}

function ScrollRestore() {
  const { pathname } = useLocation()
  const pendingRef = useRef(null)
  const currentScrollRef = useRef(typeof window === 'undefined' ? 0 : window.scrollY)

  // Continuously track the current page's scroll so the position saved on
  // navigation is the page being left — the browser may already mutate
  // window.scrollY for the incoming page before our restore effect runs.
  // The browser's native restoration is disabled while mounted: it fires
  // against the same zero-height fallback and would fight our restore.
  useEffect(() => {
    const handleScroll = () => {
      currentScrollRef.current = window.scrollY
    }
    const previousRestoration =
      typeof window !== 'undefined' && 'scrollRestoration' in window.history
        ? window.history.scrollRestoration
        : null
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (previousRestoration !== null) {
      window.history.scrollRestoration = 'manual'
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (previousRestoration !== null) {
        window.history.scrollRestoration = previousRestoration
      }
    }
  }, [])

  useLayoutEffect(() => {
    // Save the position of the page we are leaving, then resolve the
    // position of the page we are entering. Query-string-only changes are
    // in-page state (e.g. collection/category tabs) and must neither save
    // nor restore — the position is simply kept.
    const previous = pendingRef.current
    pendingRef.current = pathname
    if (previous === null) {
      // First mount in this session: start at the top.
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      currentScrollRef.current = 0
      return undefined
    }
    if (previous === pathname) return undefined
    scrollMemory.set(previous, currentScrollRef.current)
    const saved = scrollMemory.get(pathname)
    if (saved == null || saved <= 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      currentScrollRef.current = 0
      return undefined
    }
    return applyWhenReady(saved, (applied) => {
      currentScrollRef.current = applied
    })
  }, [pathname])

  return null
}

export default ScrollRestore
