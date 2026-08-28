import { useCallback, useEffect, useRef } from 'react'
import { useBlocker, useLocation } from 'react-router-dom'
import ConfirmDialog from '../components/admin/ConfirmDialog/index.js'

/**
 * Protects a page from losing unsaved edits. Renders a `ConfirmDialog`
 * (returned as `guard`) when the user attempts to navigate away while the
 * form is dirty, and guards against hard reloads/closing the tab.
 *
 * Returns `{ guard, bypass }`. Call `bypass()` immediately before an
 * intentional navigation that follows a successful save (e.g. the create →
 * edit redirect), so the just-saved state does not trigger the warning.
 * The bypass is one-shot: it is cleared once that navigation completes,
 * so later navigations are guarded again.
 */
function useUnsavedGuard({
  active = false,
  title = 'Unsaved changes',
  description = 'You have unsaved changes. Are you sure you want to leave?',
  confirmLabel = 'Leave',
  cancelLabel = 'Stay',
}) {
  const activeRef = useRef(active)
  const bypassRef = useRef(false)
  const location = useLocation()
  const locationKeyRef = useRef(location.key)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  const blocker = useBlocker(
    useCallback(() => {
      if (bypassRef.current) return false
      return activeRef.current
    }, []),
  )

  useEffect(() => {
    if (locationKeyRef.current === location.key) return undefined
    locationKeyRef.current = location.key
    bypassRef.current = false
    return undefined
  }, [location.key])

  useEffect(() => {
    if (!active) return undefined
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [active])

  const bypass = useCallback(() => {
    bypassRef.current = true
  }, [])

  if (blocker.state !== 'blocked') {
    return { guard: null, bypass }
  }

  return {
    guard: (
      <ConfirmDialog
        open
        title={title}
        description={description}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        onConfirm={() => {
          blocker.proceed()
          blocker.reset()
        }}
        onCancel={() => blocker.reset()}
      />
    ),
    bypass,
  }
}

export default useUnsavedGuard
export { useUnsavedGuard }