import { useReducedMotion } from 'framer-motion'
import { LoadingIndicator, LoadingRegion } from './Loading.styles.js'

function Loading({ label = 'Loading', inline = false }) {
  const reduceMotion = useReducedMotion()

  return (
    <LoadingRegion $inline={inline} aria-live="polite" role="status">
      <LoadingIndicator
        animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </LoadingRegion>
  )
}

export default Loading
