import { useEffect } from 'react'

function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (typeof document === 'undefined' || !isLocked) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isLocked])
}

export default useBodyScrollLock
