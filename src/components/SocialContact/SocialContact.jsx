import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiFacebook, FiInstagram, FiMessageCircle, FiX } from 'react-icons/fi'
import { footerSocialLinks } from '../../constants/navigation.js'
import { EASE_LUXE } from '../../styles/animations.js'
import { ActionLink, ActionsRail, ChatLabel, IconWrap, Launcher, MainButton } from './SocialContact.styles.js'

const SOCIAL_ACTIONS = Object.freeze({
  Instagram: { icon: FiInstagram, label: 'Open Instagram direct messages' },
  Facebook: { icon: FiFacebook, label: 'Open Facebook chat' },
})

const ACTIONS_ID = 'social-contact-actions'

function SocialContact() {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef(null)
  const mainButtonRef = useRef(null)
  const firstActionRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const actions = footerSocialLinks
    .filter((social) => social.href)
    .map((social) => ({
      ...social,
      icon: SOCIAL_ACTIONS[social.label]?.icon,
      ariaLabel: SOCIAL_ACTIONS[social.label]?.label ?? `Open ${social.label}`,
    }))
    .filter((action) => action.icon)

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      mainButtonRef.current?.focus({ preventScroll: true })
    }

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) firstActionRef.current?.focus({ preventScroll: true })
  }, [isOpen])

  if (actions.length === 0) return null

  return (
    <Launcher ref={rootRef}>
      <AnimatePresence>
        {isOpen ? (
          <ActionsRail
            key="actions"
            id={ACTIONS_ID}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
            }}
          >
            {actions.map((action, index) => {
              const ActionIcon = action.icon
              return (
                <ActionLink
                  key={action.label}
                  ref={index === 0 ? firstActionRef : undefined}
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={action.ariaLabel}
                  variants={{
                    hidden: { opacity: 0, x: -12, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: { duration: 0.45, ease: EASE_LUXE },
                    },
                  }}
                >
                  <ActionIcon aria-hidden="true" color="currentColor" size={16} />
                  {action.label}
                </ActionLink>
              )
            })}
          </ActionsRail>
        ) : null}
      </AnimatePresence>

      <MainButton
        ref={mainButtonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={isOpen ? ACTIONS_ID : undefined}
        aria-label="Open social contact options"
        initial={false}
        $bouncing={!isOpen && !reduceMotion}
        animate={
          isOpen
            ? { y: 0, scale: 0.96, transition: { duration: 0.25, ease: EASE_LUXE } }
            : { y: 0, scale: 1, transition: { duration: 0.25, ease: EASE_LUXE } }
        }
        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        onClick={() => setIsOpen((current) => !current)}
      >
        {reduceMotion ? (
          isOpen ? (
            <IconWrap>
              <FiX aria-hidden="true" color="currentColor" size={20} />
            </IconWrap>
          ) : (
            <IconWrap>
              <FiMessageCircle aria-hidden="true" color="currentColor" size={20} />
            </IconWrap>
          )
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <IconWrap key="close">
                <FiX
                  aria-hidden="true"
                  color="currentColor"
                  size={20}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.22, ease: EASE_LUXE }}
                />
              </IconWrap>
            ) : (
              <IconWrap key="message">
                <FiMessageCircle
                  aria-hidden="true"
                  color="currentColor"
                  size={20}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.22, ease: EASE_LUXE }}
                />
              </IconWrap>
            )}
          </AnimatePresence>
        )}
        <ChatLabel aria-hidden="true">Chat</ChatLabel>
      </MainButton>
    </Launcher>
  )
}

export default SocialContact