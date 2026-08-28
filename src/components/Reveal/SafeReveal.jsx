import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE_LUXE } from '../../styles/animations.js'

const FALLBACK_DELAY_MS = 2500

function SafeReveal({ as: Component = motion.div, children, from = { y: 24 }, duration = 0.55, delay = 0, amount = 0.2, ...props }) {
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
    return children
  }

  return (
    <Component
      ref={ref}
      initial={false}
      animate={inView || shown ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, ...from }}
      transition={{ duration, delay, ease: EASE_LUXE }}
      {...props}
    >
      {children}
    </Component>
  )
}

export default SafeReveal
