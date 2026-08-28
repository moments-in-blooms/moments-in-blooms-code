import { FiChevronDown, FiChevronUp, FiPlus, FiTrash2 } from 'react-icons/fi'
import Button from '../../Button/index.js'
import {
  IconButton,
  RepeaterFooter,
  RepeaterItem,
  RepeaterItemBody,
  RepeaterItemControls,
  RepeaterItemHeader,
  RepeaterItemTitle,
  RepeaterShell,
} from './Repeater.styles.js'

function Repeater({
  items = [],
  onChange,
  renderItem,
  createItem,
  itemTitle,
  addLabel = 'Add item',
  emptyText = 'No items yet.',
}) {
  const replaceItem = (index, nextItem) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? nextItem : item)))
  }

  const patchItem = (index, patch) => {
    replaceItem(index, { ...items[index], ...patch })
  }

  const removeItem = (index) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index))
  }

  const moveItem = (index, delta) => {
    const target = index + delta
    if (target < 0 || target >= items.length) return
    const next = [...items]
    const [moved] = next.splice(index, 1)
    next.splice(target, 0, moved)
    onChange(next)
  }

  const handleAdd = () => {
    if (!createItem) return
    onChange([...items, createItem()])
  }

  return (
    <RepeaterShell>
      {items.length === 0 ? <RepeaterItemTitle>{emptyText}</RepeaterItemTitle> : null}
      {items.map((item, index) => (
        <RepeaterItem key={item?.id ?? index}>
          <RepeaterItemHeader>
            <RepeaterItemTitle>
              {itemTitle ? itemTitle(item, index) : `Item ${index + 1}`}
            </RepeaterItemTitle>
            <RepeaterItemControls>
              <IconButton
                type="button"
                onClick={() => moveItem(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
              >
                <FiChevronUp aria-hidden="true" size={15} />
              </IconButton>
              <IconButton
                type="button"
                onClick={() => moveItem(index, 1)}
                disabled={index === items.length - 1}
                aria-label="Move down"
              >
                <FiChevronDown aria-hidden="true" size={15} />
              </IconButton>
              <IconButton
                type="button"
                $danger
                onClick={() => removeItem(index)}
                aria-label="Remove item"
              >
                <FiTrash2 aria-hidden="true" size={15} />
              </IconButton>
            </RepeaterItemControls>
          </RepeaterItemHeader>
          <RepeaterItemBody>
            {renderItem(item, index, {
              update: (patch) => patchItem(index, patch),
              replace: (nextItem) => replaceItem(index, nextItem),
              remove: () => removeItem(index),
              moveUp: () => moveItem(index, -1),
              moveDown: () => moveItem(index, 1),
            })}
          </RepeaterItemBody>
        </RepeaterItem>
      ))}
      {createItem ? (
        <RepeaterFooter>
          <Button type="button" variant="outline" onClick={handleAdd}>
            <FiPlus aria-hidden="true" size={15} />
            {addLabel}
          </Button>
        </RepeaterFooter>
      ) : null}
    </RepeaterShell>
  )
}

export default Repeater