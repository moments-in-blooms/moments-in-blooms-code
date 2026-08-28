import { AnimatePresence } from 'framer-motion'
import { FiCheck, FiChevronDown } from 'react-icons/fi'
import { useEffect, useMemo, useRef, useState } from 'react'
import { EASE_LUXE } from '../../../../../styles/animations.js'
import * as S from './Dropdown.styles.js'

const MENU_OPEN = { opacity: 1, y: 0, scale: 1 }
const MENU_CLOSED = { opacity: 0, y: -6, scale: 0.99 }

function Dropdown({
  ariaDescribedBy,
  ariaLabel,
  id,
  invalid = false,
  name,
  options = [],
  placeholder = 'Select an option',
  register,
  rules,
  setValue,
  watch,
}) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef(null)
  const hiddenSelectRef = useRef(null)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  const currentValue = watch?.(name) ?? ''
  const selectedIndex = useMemo(
    () => options.indexOf(currentValue),
    [options, currentValue],
  )

  const field = register(name, rules)
  const { ref: registerRef, ...fieldProps } = field

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    menuRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, open])

  const closeMenu = (refocus = false) => {
    setOpen(false)
    setActiveIndex(-1)
    if (refocus) triggerRef.current?.focus()
  }

  const commitSelection = (option) => {
    const select = hiddenSelectRef.current
    if (select) select.value = option
    if (setValue) setValue(name, option, { shouldValidate: true })
    closeMenu(true)
  }

  const handleTriggerKeyDown = (event) => {
    if (!open) {
      if (
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp' ||
        event.key === 'Enter' ||
        event.key === ' '
      ) {
        event.preventDefault()
        setActiveIndex(selectedIndex)
        setOpen(true)
      }
      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((current) => Math.min(current + 1, options.length - 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((current) => Math.max(current - 1, 0))
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (activeIndex >= 0) commitSelection(options[activeIndex])
        break
      case 'Escape':
        event.preventDefault()
        closeMenu()
        break
      case 'Tab':
        closeMenu()
        break
      default:
        break
    }
  }

  return (
    <S.Wrapper ref={rootRef}>
      <S.SelectHidden
        ref={(node) => {
          hiddenSelectRef.current = node
          registerRef(node)
        }}
        {...fieldProps}
        id={id}
        aria-hidden="true"
        tabIndex={-1}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </S.SelectHidden>
      <S.Trigger
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-autocomplete="none"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid || undefined}
        $hasValue={Boolean(currentValue)}
        $open={open}
        $invalid={invalid}
        onKeyDown={handleTriggerKeyDown}
        onPointerDown={(event) => {
          if (event.button === 0) {
            setActiveIndex(selectedIndex)
            setOpen((current) => !current)
          }
        }}
      >
        <span>{currentValue || placeholder}</span>
        <FiChevronDown aria-hidden="true" size={18} />
      </S.Trigger>

      <AnimatePresence>
        {open ? (
          <S.Menu
            key="menu"
            ref={menuRef}
            id={`${id}-listbox`}
            role="listbox"
            aria-label={ariaLabel}
            initial={MENU_CLOSED}
            animate={MENU_OPEN}
            exit={MENU_CLOSED}
            transition={{ duration: 0.18, ease: EASE_LUXE }}
          >
            {options.map((option, index) => (
              <S.Option
                key={option}
                role="option"
                aria-selected={index === selectedIndex}
                id={`${id}-option-${index}`}
                $selected={index === selectedIndex}
                $highlighted={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commitSelection(option)}
              >
                <span>{option}</span>
                {index === selectedIndex ? (
                  <FiCheck aria-hidden="true" size={16} />
                ) : null}
              </S.Option>
            ))}
          </S.Menu>
        ) : null}
      </AnimatePresence>
    </S.Wrapper>
  )
}

export default Dropdown