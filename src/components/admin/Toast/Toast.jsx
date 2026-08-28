import { createPortal } from 'react-dom'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi'
import { EASE_LUXE } from '../../../styles/animations.js'
import { ToastShell } from './Toast.styles.js'

const TONE_CONFIG = {
  success: { icon: FiCheckCircle, role: 'status' },
  error: { icon: FiAlertCircle, role: 'alert' },
  warning: { icon: FiAlertTriangle, role: 'alert' },
  info: { icon: FiInfo, role: 'status' },
}

function Toast({ message, tone = 'success', visible = false, position = 'inline' }) {
  const reduceMotion = useReducedMotion()
  const config = TONE_CONFIG[tone] ?? TONE_CONFIG.success
  const Icon = config.icon

  const toast =
    visible && message ? (
      <ToastShell
        key="toast"
        $tone={tone}
        $position={position}
        role={config.role}
        initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.28, ease: EASE_LUXE }}
      >
        <Icon aria-hidden="true" size={17} />
        <span>{message}</span>
      </ToastShell>
    ) : null

  const content = <AnimatePresence>{toast}</AnimatePresence>

  if (position === 'fixed') {
    return createPortal(content, document.body)
  }

  return content
}

export default Toast