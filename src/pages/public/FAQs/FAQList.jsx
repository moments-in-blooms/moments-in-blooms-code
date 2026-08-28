import { useCallback, useRef, useState } from 'react'
import FAQEmptyState from './FAQEmptyState.jsx'
import FAQItem from './FAQItem.jsx'
import { ListGroup, ListHeading, ListRoot } from './FAQList.styles.js'

function FAQList({ categories, selected }) {
  const [openIds, setOpenIds] = useState(() => {
    const initial = new Set()
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.slice(1)
      if (hashId) initial.add(hashId)
    }
    return initial
  })
  const triggerRefs = useRef({})

  const isFiltering = Boolean(selected)
  const groups = isFiltering
    ? categories.filter((category) => category.id === selected)
    : categories

  const [lastSelected, setLastSelected] = useState(selected)
  if (lastSelected !== selected) {
    setLastSelected(selected)
    setOpenIds(() => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const hashId = window.location.hash.slice(1)
        if (hashId) return new Set([hashId])
      }
      return new Set()
    })
  }

  const handleToggle = useCallback((itemId) => {
    setOpenIds((currentIds) => {
      const nextIds = new Set(currentIds)
      if (nextIds.has(itemId)) {
        nextIds.delete(itemId)
      } else {
        nextIds.add(itemId)
      }
      return nextIds
    })
  }, [])

  const handleTriggerKeyDown = useCallback(
    (event, groupIndex, itemIndex) => {
      const triggers = triggerRefs.current[groupIndex]
      if (!triggers || !triggers.length) return

      let nextIndex

      switch (event.key) {
        case 'ArrowDown':
          nextIndex = (itemIndex + 1) % triggers.length
          break
        case 'ArrowUp':
          nextIndex = (itemIndex - 1 + triggers.length) % triggers.length
          break
        case 'Home':
          nextIndex = 0
          break
        case 'End':
          nextIndex = triggers.length - 1
          break
        default:
          return
      }

      event.preventDefault()
      const nextTrigger = triggers[nextIndex]
      nextTrigger?.focus()
      const nextId = nextTrigger?.getAttribute('data-item-id')
      if (nextId) {
        setOpenIds((currentIds) => new Set(currentIds).add(nextId))
      }
    },
    [],
  )

  const visibleGroups = groups.filter((group) => group.faqs.length > 0)

  if (!visibleGroups.length) {
    return (
      <ListRoot>
        <FAQEmptyState />
      </ListRoot>
    )
  }

  return (
    <ListRoot>
      {visibleGroups.map((group, groupIndex) => (
        <div key={group.id}>
          {!isFiltering ? <ListHeading>{group.name}</ListHeading> : null}
          <ListGroup
            ref={(node) => {
              triggerRefs.current[groupIndex] = node
                ? Array.from(
                    node.querySelectorAll('[data-item-id]'),
                  )
                : []
            }}
          >
            {group.faqs.map((item, itemIndex) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openIds.has(item.id)}
                onToggle={() => handleToggle(item.id)}
                onKeyDown={(event) =>
                  handleTriggerKeyDown(event, groupIndex, itemIndex)
                }
              />
            ))}
          </ListGroup>
        </div>
      ))}
    </ListRoot>
  )
}

export default FAQList
