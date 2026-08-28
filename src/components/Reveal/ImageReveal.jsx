import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE_LUXE } from '../../styles/animations.js'

const FALLBACK_DELAY_MS = 2500

function ImageReveal({ children, delay = 0, duration = 1.05, amount = 0.2, ...props }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, amount })
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    let revealed = false
    const force = () => {
      if (revealed) return
      revealed = true
      setShown(true)
    }

    const checkPosition = () => {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) force()
    }

    window.addEventListener('scroll', checkPosition, { passive: true })
    window.addEventListener('resize', checkPosition)
    checkPosition()
    const timer = setTimeout(force, FALLBACK_DELAY_MS)

    return () => {
      window.removeEventListener('scroll', checkPosition)
      window.removeEventListener('resize', checkPosition)
      clearTimeout(timer)
    }
  }, [])

  if (reduce) {
    return <>{children}</>
  }

  return (
    <motion.div
      ref={ref}
      style={{ width: '100%', height: '100%' }}
      initial={false}
      animate={inView || shown ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration, delay, ease: EASE_LUXE }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default ImageReveal
