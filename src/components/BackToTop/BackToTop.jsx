import { AnimatePresence } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import { BACK_TO_TOP_THRESHOLD } from '../../constants/ui.js'
import useScrolled from '../../hooks/useScrolled.js'
import { BackToTopButton } from './BackToTop.styles.js'

function BackToTop() {
  const isVisible = useScrolled(BACK_TO_TOP_THRESHOLD)

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <BackToTopButton
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
        >
          <FiArrowUp aria-hidden="true" color="currentColor" size={18} />
        </BackToTopButton>
      ) : null}
    </AnimatePresence>
  )
}

export default BackToTop
