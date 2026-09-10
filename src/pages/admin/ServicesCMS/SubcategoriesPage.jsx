import { useMemo, useRef, useState } from 'react'
import { FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi'
import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import Button from '../../../components/Button/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { useContent } from '../../../hooks/useContent.js'
import { showError, showSuccess } from '../../../utils/sweetAlert.js'
import {
  CardRow,
  CardRowMain,
  CatalogPage,
  FilterTab,
  FilterTabCount,
  FilterTabs,
  MoveButton,
  MoveButtons,
} from './CatalogPages.styles.js'
import {
  listCategories,
  moveSubcategory,
  newSubcategoryPath,
  subcategoryPath,
} from './catalog.js'

const byDisplayOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0)

function SubcategoriesPage() {
  const { values, savedAt, update, save } = useContent('services')
  const [activeId, setActiveId] = useState(null)
  const [busy, setBusy] = useState(false)
  const tabRefs = useRef({})

  const categories = useMemo(
    () => [...listCategories(values)].sort(byDisplayOrder),
    [values],
  )
  // Defaults to the first category in display order; falls back there if
  // the selected category disappears.
  const activeCategory =
    categories.find((entry) => String(entry.id) === String(activeId)) ?? categories[0] ?? null
  const subcategories = activeCategory
    ? [...(activeCategory.subcategories ?? [])].sort(byDisplayOrder)
    : []

  const handleMove = async (subcategoryId, direction) => {
    if (busy || !activeCategory) return
    setBusy(true)
    update((current) => moveSubcategory(current, activeCategory.id, subcategoryId, direction))
    const result = await save('services')
    setBusy(false)
    if (result?.error) {
      showError('Reorder failed', result.error.message || "We couldn't reorder the sub-categories.")
      return
    }
    showSuccess('Moved', 'Sub-category order updated.')
  }

  const focusTab = (id) => {
    setActiveId(id)
    tabRefs.current[id]?.focus()
  }

  const handleTabKeyDown = (event, index) => {
    let nextIndex = null
    if (event.key === 'ArrowRight') nextIndex = index + 1
    else if (event.key === 'ArrowLeft') nextIndex = index - 1
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = categories.length - 1
    if (nextIndex === null) return
    event.preventDefault()
    const clamped = (nextIndex + categories.length) % categories.length
    focusTab(String(categories[clamped].id))
  }

  return (
    <CatalogPage>
      <AdminPageHeader
        {...adminPageMeta.serviceSubcategories}
        actions={
          <Button to={newSubcategoryPath(activeCategory?.id)} variant="primary">
            <FiPlus aria-hidden="true" size={15} />
            Add sub-category
          </Button>
        }
      />

      {categories.length > 0 ? (
        <FilterTabs role="tablist" aria-label="Filter sub-categories by category">
          {categories.map((category, index) => {
            const count = Array.isArray(category.subcategories) ? category.subcategories.length : 0
            const isActive = activeCategory && String(category.id) === String(activeCategory.id)
            return (
              <FilterTab
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                $active={isActive}
                tabIndex={isActive ? 0 : -1}
                ref={(node) => {
                  tabRefs.current[String(category.id)] = node
                }}
                onClick={() => setActiveId(String(category.id))}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {category.title || 'Untitled category'}
                <FilterTabCount $active={isActive}>{count}</FilterTabCount>
              </FilterTab>
            )
          })}
        </FilterTabs>
      ) : null}

      <ContentList
        title="Sub-categories"
        description={
          activeCategory
            ? `Sub-categories in ${activeCategory.title || 'this category'}. Each sub-category belongs to exactly one category.`
            : 'Each sub-category belongs to exactly one category.'
        }
        emptyState={
          <EmptyState
            title={
              categories.length === 0
                ? 'No categories yet'
                : `No sub-categories in ${activeCategory?.title || 'this category'} yet`
            }
            description={
              categories.length === 0
                ? 'Create a category first — every sub-category belongs to exactly one category.'
                : 'Add the first sub-category to get started.'
            }
            action={
              categories.length === 0 ? (
                <Button to="/admin/services/categories/new" variant="outline">
                  <FiPlus aria-hidden="true" size={15} />
                  Add category
                </Button>
              ) : (
                <Button to={newSubcategoryPath(activeCategory?.id)} variant="outline">
                  <FiPlus aria-hidden="true" size={15} />
                  Add sub-category
                </Button>
              )
            }
          />
        }
      >
        {subcategories.map((subcategory, index) => {
          const itemCount = Array.isArray(subcategory.items) ? subcategory.items.length : 0
          const label = subcategory.title || 'Untitled sub-category'
          return (
            <CardRow key={subcategory.id}>
              <MoveButtons>
                <MoveButton
                  type="button"
                  title="Move up"
                  aria-label={`Move ${label} up`}
                  disabled={busy || index === 0}
                  onClick={() => handleMove(subcategory.id, -1)}
                >
                  <FiChevronUp aria-hidden="true" size={16} />
                </MoveButton>
                <MoveButton
                  type="button"
                  title="Move down"
                  aria-label={`Move ${label} down`}
                  disabled={busy || index === subcategories.length - 1}
                  onClick={() => handleMove(subcategory.id, 1)}
                >
                  <FiChevronDown aria-hidden="true" size={16} />
                </MoveButton>
              </MoveButtons>
              <CardRowMain>
                <ContentCard
                  to={subcategoryPath(subcategory.id)}
                  title={label}
                  description={subcategory.description}
                  meta={[`${itemCount} item${itemCount === 1 ? '' : 's'}`]}
                  lastUpdated={savedAt}
                />
              </CardRowMain>
            </CardRow>
          )
        })}
      </ContentList>
    </CatalogPage>
  )
}

export default SubcategoriesPage
