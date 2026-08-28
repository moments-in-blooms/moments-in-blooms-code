import { keyframes } from 'styled-components'

export const EASE_LUXE = [0.22, 1, 0.36, 1]

// Shared admin skeleton pulse — respects prefers-reduced-motion via GlobalStyles
export const adminPulse = keyframes`
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
`

export const MOTION = Object.freeze({
  FAST: 0.25,
  NORMAL: 0.55,
  SLOW: 0.9,
  CINEMATIC: 1.2,
  STAGGER: 0.1,
  STAGGER_SLOW: 0.16,
})

export const VIEWPORT_DEFAULT = Object.freeze({ once: true, amount: 0.2 })
export const viewportWith = (amount) => ({ once: true, amount })

// Fade only — reserved for ambient/background layers
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: MOTION.NORMAL, ease: EASE_LUXE } },
}

// Base rise — secondary copy and utility content
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: MOTION.NORMAL, ease: EASE_LUXE } },
}

// Gentle rise — quotes, meta, small copy
export const softReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_LUXE } },
}

// Editorial directional slides
export const slideLeft = {
  hidden: { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: EASE_LUXE } },
}

export const slideRight = {
  hidden: { opacity: 0, x: 44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: EASE_LUXE } },
}

export const stepIn = (from = 'left') => ({
  hidden: { opacity: 0, x: from === 'left' ? -28 : 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_LUXE } },
})

// Masked line reveal — for major typography. Parent must clip with overflow: hidden.
export const textLineReveal = {
  hidden: { y: '115%' },
  visible: { y: '0%', transition: { duration: 0.95, ease: EASE_LUXE } },
}

// Risen card — slight scale for depth, reserved for cards/panels
export const rise = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE_LUXE } },
}

// Image curtain reveal — editorial clip-path mask
export const imageReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1.05, ease: EASE_LUXE },
  },
}

// Image settle — begins enlarged and eases into place
export const imageSettle = {
  hidden: { opacity: 0, scale: 1.09 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: EASE_LUXE, delay: 0.15 },
  },
}

// Line / indicator growth
export const lineGrowX = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.1, ease: EASE_LUXE } },
}

export const lineGrowY = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.5, ease: EASE_LUXE } },
}

// Pop — badges, floating accents
export const popIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE_LUXE } },
}

// Containers
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: MOTION.STAGGER } },
}

export const staggerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: MOTION.STAGGER_SLOW } },
}

export const staggerItem = fadeUp

// Legacy exports kept for compatibility
export const EASE_LUXE_LEGACY = EASE_LUXE
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
}

export const fadeInUp = fadeUp
export const maskReveal = textLineReveal
export const scaleIn = rise
