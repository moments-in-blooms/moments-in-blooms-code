import { useInView, useReducedMotion, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE_LUXE } from '../../styles/animations.js'
import { TitleRevealMask } from './TitleReveal.styles.js'

const FALLBACK_DELAY_MS = 2500

function TitleReveal({ children, delay = 0, duration = 0.95, amount = 0.2, ...props }) {
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
    return <TitleRevealMask>{children}</TitleRevealMask>
  }

  return (
    <TitleRevealMask>
      <motion.span
        ref={ref}
        style={{ display: 'block' }}
        initial={false}
        animate={inView || shown ? { y: '0%' } : { y: '115%' }}
        transition={{ duration, delay, ease: EASE_LUXE }}
        {...props}
      >
        {children}
      </motion.span>
    </TitleRevealMask>
  )
}

export default TitleReveal
