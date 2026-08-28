import { AnimatePresence } from 'framer-motion'
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useEffect, useMemo, useRef, useState } from 'react'
import { EASE_LUXE } from '../../../../../styles/animations.js'
import * as S from './DatePicker.styles.js'

const WEEKDAYS = Object.freeze(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'])

const POPOVER_OPEN = { opacity: 1, y: 0, scale: 1 }
const POPOVER_CLOSED = { opacity: 0, y: -6, scale: 0.99 }

const toIso = (year, month, day) => {
  const y = String(year).padStart(4, '0')
  const m = String(month + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const splitIso = (iso) => {
  if (!iso) return null
  const [year, month, day] = iso.split('-').map(Number)
  return { year, month: month - 1, day }
}

const buildCells = (view, todayIso) => {
  const leading = (new Date(view.year, view.month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  const totalCells = Math.ceil((leading + daysInMonth) / 7) * 7

  return Array.from({ length: totalCells }, (_, index) => {
    const day = index - leading + 1
    if (day < 1 || day > daysInMonth) return null
    const iso = toIso(view.year, view.month, day)
    return { day, iso, disabled: iso < todayIso }
  })
}

const findEnabledIndex = (cells, fromIndex, direction = 1) => {
  let index = fromIndex
  while (index >= 0 && index < cells.length) {
    if (cells[index] && !cells[index].disabled) return index
    index += direction
  }
  return -1
}

const formatDisplay = (iso) => {
  const parts = splitIso(iso)
  if (!parts) return ''
  const label = new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(parts.year, parts.month, parts.day))
  return label
}

function DatePicker({
  ariaDescribedBy,
  ariaLabel,
  id,
  invalid = false,
  name,
  placeholder = 'Select a date',
  register,
  rules,
  setValue,
  watch,
}) {
  const currentValue = watch?.(name) ?? ''
  const todayIso = useMemo(() => {
    const now = new Date()
    return toIso(now.getFullYear(), now.getMonth(), now.getDate())
  }, [])

  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [focusIndex, setFocusIndex] = useState(-1)
  const rootRef = useRef(null)
  const hiddenInputRef = useRef(null)
  const triggerRef = useRef(null)
  const cellRefs = useRef([])

  const cells = useMemo(() => buildCells(view, todayIso), [view, todayIso])

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
    if (open && focusIndex >= 0) {
      cellRefs.current[focusIndex]?.focus()
    }
  }, [open, focusIndex])

  const openCalendar = () => {
    const now = new Date()
    const parts = splitIso(currentValue)
    const nextView = parts
      ? { year: parts.year, month: parts.month }
      : { year: now.getFullYear(), month: now.getMonth() }
    setView(nextView)
    setFocusIndex(
      nextView.month === now.getMonth() && nextView.year === now.getFullYear()
        ? findEnabledIndex(cells, 0)
        : 0,
    )
    setOpen(true)
  }

  const closeCalendar = (refocus = false) => {
    setOpen(false)
    setFocusIndex(-1)
    if (refocus) triggerRef.current?.focus()
  }

  const commitValue = (iso) => {
    const input = hiddenInputRef.current
    if (input) input.value = iso
    if (setValue) setValue(name, iso, { shouldValidate: true })
    closeCalendar(true)
  }

  const moveFocus = (delta) => {
    setFocusIndex((current) => {
      const next = current + delta
      if (next < 0 || next >= cells.length) return current
      if (!cells[next]) return current
      return cells[next].disabled ? findEnabledIndex(cells, next) : next
    })
  }

  const changeMonth = (offset) => {
    let month = view.month + offset
    let year = view.year
    if (month < 0) {
      month = 11
      year -= 1
    } else if (month > 11) {
      month = 0
      year += 1
    }
    setView({ year, month })
    const nextCells = buildCells({ year, month }, todayIso)
    setFocusIndex(findEnabledIndex(nextCells, 0))
  }

  const handleGridKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        moveFocus(-1)
        break
      case 'ArrowRight':
        event.preventDefault()
        moveFocus(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        moveFocus(-7)
        break
      case 'ArrowDown':
        event.preventDefault()
        moveFocus(7)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (focusIndex >= 0 && cells[focusIndex]) {
          commitValue(cells[focusIndex].iso)
        }
        break
      case 'Escape':
        event.preventDefault()
        closeCalendar(true)
        break
      default:
        break
    }
  }

  const monthLabel = new Intl.DateTimeFormat('en-AU', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(view.year, view.month, 1))

  return (
    <S.Wrapper ref={rootRef}>
      <S.DateHidden
        ref={(node) => {
          hiddenInputRef.current = node
          registerRef(node)
        }}
        {...fieldProps}
        id={id}
        type="date"
        tabIndex={-1}
        aria-hidden="true"
      />
      <S.Trigger
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-autocomplete="none"
        aria-expanded={open}
        aria-controls={`${id}-popover`}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid || undefined}
        $hasValue={Boolean(currentValue)}
        $open={open}
        $invalid={invalid}
        onClick={openCalendar}
      >
        <span>{currentValue ? formatDisplay(currentValue) : placeholder}</span>
        <FiCalendar aria-hidden="true" size={18} />
      </S.Trigger>

      <AnimatePresence>
        {open ? (
          <S.Popover
            key="popover"
            id={`${id}-popover`}
            initial={POPOVER_CLOSED}
            animate={POPOVER_OPEN}
            exit={POPOVER_CLOSED}
            transition={{ duration: 0.18, ease: EASE_LUXE }}
          >
            <S.Header>
              <S.NavButton
                type="button"
                aria-label="Previous month"
                onClick={() => changeMonth(-1)}
              >
                <FiChevronLeft aria-hidden="true" />
              </S.NavButton>
              <S.MonthLabel>{monthLabel}</S.MonthLabel>
              <S.NavButton
                type="button"
                aria-label="Next month"
                onClick={() => changeMonth(1)}
              >
                <FiChevronRight aria-hidden="true" />
              </S.NavButton>
              {currentValue ? (
                <S.ClearButton
                  type="button"
                  onClick={() => commitValue('')}
                >
                  Clear
                </S.ClearButton>
              ) : null}
            </S.Header>

            <S.WeekdayRow aria-hidden="true">
              {WEEKDAYS.map((day) => (
                <S.Weekday key={day}>{day}</S.Weekday>
              ))}
            </S.WeekdayRow>

            <S.Grid
              role="grid"
              aria-label={monthLabel}
              onKeyDown={handleGridKeyDown}
            >
              {cells.map((cell, index) =>
                cell ? (
                  <S.Day
                    key={cell.iso}
                    ref={(node) => {
                      cellRefs.current[index] = node
                    }}
                    type="button"
                    role="gridcell"
                    aria-selected={cell.iso === currentValue}
                    aria-disabled={cell.disabled}
                    tabIndex={index === focusIndex && !cell.disabled ? 0 : -1}
                    disabled={cell.disabled}
                    $selected={cell.iso === currentValue}
                    $today={cell.iso === todayIso}
                    onClick={() => commitValue(cell.iso)}
                  >
                    {cell.day}
                  </S.Day>
                ) : (
                  <S.Blank key={`blank-${index}`} />
                ),
              )}
            </S.Grid>
          </S.Popover>
        ) : null}
      </AnimatePresence>
    </S.Wrapper>
  )
}

export default DatePicker