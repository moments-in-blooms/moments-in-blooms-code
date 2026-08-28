import { useRef } from 'react'
import {
  CategoryList,
  CategoryNav,
  CategoryOption,
  CategoryLabel,
  CategoryCount,
} from './FAQCategoryNav.styles.js'

function FAQCategoryNav({ categories, selected, onSelect }) {
  const listRef = useRef(null)

  const handleOptionKeyDown = (event, index) => {
    const options = Array.from(
      listRef.current?.querySelectorAll('[role="tab"]') || [],
    )
    let nextIndex

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % options.length
        break
      case 'ArrowLeft':
        nextIndex = (index - 1 + options.length) % options.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = options.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    const next = options[nextIndex]
    next?.focus()
    onSelect(next.getAttribute('data-category'))
    next?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }

  return (
    <CategoryNav aria-label="FAQ categories">
      <CategoryList
        ref={listRef}
        role="tablist"
        aria-label="Browse FAQs by category"
      >
        {categories.map((category, index) => {
          const isSelected = selected === category.id
          return (
            <CategoryOption
              key={category.id}
              role="tab"
              data-category={category.id}
              aria-selected={isSelected}
              $selected={isSelected}
              type="button"
              onClick={() => onSelect(category.id)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
            >
              <CategoryLabel>{category.name}</CategoryLabel>
              <CategoryCount $selected={isSelected}>{category.faqs.length}</CategoryCount>
            </CategoryOption>
          )
        })}
      </CategoryList>
    </CategoryNav>
  )
}

export default FAQCategoryNav
