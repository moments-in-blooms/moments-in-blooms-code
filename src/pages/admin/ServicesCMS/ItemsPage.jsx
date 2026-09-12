import { useMemo, useRef, useState } from 'react'
import { FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi'
import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import Button from '../../../components/Button/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { CATALOG_TERMS } from '../../../constants/adminTerms.js'
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
  inferCatalogKind,
  itemDescription,
  itemDisplayName,
  itemIsFeatured,
  itemPath,
  itemPrice,
  itemSubtitle,
  itemThumbnail,
  listCategories,
  moveItem,
  newItemPath,
} from './catalog.js'

const SUB_TOP_LEVEL = 'top-level'

const byDisplayOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0)

function ItemsPage() {
  const { values, savedAt, update, save } = useContent('services')
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [activeSubId, setActiveSubId] = useState(null)
  const [busy, setBusy] = useState(false)
  const categoryTabRefs = useRef({})
  const subTabRefs = useRef({})

  const categories = useMemo(
    () => [...listCategories(values)].sort(byDisplayOrder),
    [values],
  )
  // Defaults to the first category in display order; falls back there if
  // the selected category disappears.
  const activeCategory =
    categories.find((entry) => String(entry.id) === String(activeCategoryId)) ??
    categories[0] ??
    null
  const subcategories = useMemo(
    () =>
      activeCategory
        ? [...(activeCategory.subcategories ?? [])].sort(byDisplayOrder)
        : [],
    [activeCategory],
  )
  // Defaults to the first sub-category in display order (top level when the
  // category has none); falls back there if the selection disappears.
  const validSubIds = useMemo(
    () =>
      new Set([
        SUB_TOP_LEVEL,
        ...subcategories.map((sub) => String(sub.id)),
      ]),
    [subcategories],
  )
  const defaultSubId = subcategories[0] ? String(subcategories[0].id) : SUB_TOP_LEVEL
  const effectiveSubId = validSubIds.has(activeSubId) ? activeSubId : defaultSubId

  const visibleItems = useMemo(() => {
    if (!activeCategory) return []
    if (effectiveSubId === SUB_TOP_LEVEL) {
      return Array.isArray(activeCategory.items) ? activeCategory.items : []
    }
    const sub = subcategories.find((entry) => String(entry.id) === effectiveSubId)
    return Array.isArray(sub?.items) ? sub.items : []
  }, [activeCategory, subcategories, effectiveSubId])

  const countIn = (category) =>
    (Array.isArray(category?.items) ? category.items.length : 0) +
    (Array.isArray(category?.subcategories) ? category.subcategories : []).reduce(
      (total, sub) => total + (Array.isArray(sub?.items) ? sub.items.length : 0),
      0,
    )

  // The visible list is always exactly one parent list, so reorder
  // controls always apply.
  const reorderScope = activeCategory
    ? {
        categoryId: String(activeCategory.id),
        subcategoryId: effectiveSubId === SUB_TOP_LEVEL ? null : effectiveSubId,
      }
    : null

  const handleMove = async (itemId, direction) => {
    if (busy || !reorderScope) return
    setBusy(true)
    update((current) =>
      moveItem(current, reorderScope.categoryId, reorderScope.subcategoryId, itemId, direction),
    )
    const result = await save('services')
    setBusy(false)
    if (result?.error) {
      showError('Reorder failed', result.error.message || "We couldn't reorder the items.")
      return
    }
    showSuccess('Moved', 'Item order updated.')
  }

  const selectCategory = (id) => {
    setActiveCategoryId(String(id))
    setActiveSubId(null)
  }

  const focusTab = (refs, id, select) => {
    select(id)
    refs.current[id]?.focus()
  }

  const handleKeyDown = (event, index, list, refs, select) => {
    let nextIndex = null
    if (event.key === 'ArrowRight') nextIndex = index + 1
    else if (event.key === 'ArrowLeft') nextIndex = index - 1
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = list.length - 1
    if (nextIndex === null) return
    event.preventDefault()
    const clamped = (nextIndex + list.length) % list.length
    focusTab(refs, String(list[clamped].id ?? list[clamped].key), select)
  }

  const subTabs = [
    ...subcategories.map((sub) => ({ key: String(sub.id), label: sub.title || 'Untitled sub-category' })),
    { key: SUB_TOP_LEVEL, label: CATALOG_TERMS.noSubcategory.label },
  ]

  const subCount = (key) => {
    if (key === SUB_TOP_LEVEL) {
      return Array.isArray(activeCategory?.items) ? activeCategory.items.length : 0
    }
    const sub = subcategories.find((entry) => String(entry.id) === key)
    return Array.isArray(sub?.items) ? sub.items.length : 0
  }

  const addItemHref =
    reorderScope && reorderScope.subcategoryId
      ? newItemPath({ categoryId: reorderScope.categoryId, subcategoryId: reorderScope.subcategoryId })
      : newItemPath({ categoryId: activeCategory ? String(activeCategory.id) : undefined })

  const addItemKind = activeCategory ? inferCatalogKind(activeCategory) : 'decor'
  const addItemLabel =
    addItemKind === 'package'
      ? 'Add package'
      : addItemKind === 'prize'
        ? 'Add prize option'
        : 'Add item'

  return (
    <CatalogPage>
      <AdminPageHeader
        {...adminPageMeta.serviceItems}
        actions={
          <Button to={addItemHref} variant="primary">
            <FiPlus aria-hidden="true" size={15} />
            {addItemLabel}
          </Button>
        }
      />

      {categories.length > 0 ? (
        <FilterTabs role="tablist" aria-label="Filter items by category">
          {categories.map((category, index) => {
            const isActive =
              activeCategory && String(category.id) === String(activeCategory.id)
            return (
              <FilterTab
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                $active={isActive}
                tabIndex={isActive ? 0 : -1}
                ref={(node) => {
                  categoryTabRefs.current[String(category.id)] = node
                }}
                onClick={() => selectCategory(category.id)}
                onKeyDown={(event) =>
                  handleKeyDown(event, index, categories, categoryTabRefs, selectCategory)
                }
              >
                {category.title || 'Untitled category'}
                <FilterTabCount $active={isActive}>{countIn(category)}</FilterTabCount>
              </FilterTab>
            )
          })}
        </FilterTabs>
      ) : null}

      {activeCategory ? (
        <FilterTabs role="tablist" aria-label="Filter items by sub-category">
          {subTabs.map((tab, index) => {
            const isActive = effectiveSubId === tab.key
            return (
              <FilterTab
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                $active={isActive}
                tabIndex={isActive ? 0 : -1}
                ref={(node) => {
                  subTabRefs.current[tab.key] = node
                }}
                onClick={() => setActiveSubId(tab.key)}
                onKeyDown={(event) =>
                  handleKeyDown(event, index, subTabs, subTabRefs, setActiveSubId)
                }
              >
                {tab.label}
                <FilterTabCount $active={isActive}>{subCount(tab.key)}</FilterTabCount>
              </FilterTab>
            )
          })}
        </FilterTabs>
      ) : null}

      <ContentList
        title="Items"
        description="Services, packages and prize options. Every item belongs to a category, optionally inside a sub-category."
        emptyState={
          <EmptyState
            title={categories.length === 0 ? 'No categories yet' : 'No items here yet'}
            description={
              categories.length === 0
                ? 'Create a category first — every item belongs to a category.'
                : 'Add the first item to get started.'
            }
            action={
              categories.length === 0 ? (
                <Button to="/admin/services/categories/new" variant="outline">
                  <FiPlus aria-hidden="true" size={15} />
                  Add category
                </Button>
              ) : (
                <Button to={addItemHref} variant="outline">
                  <FiPlus aria-hidden="true" size={15} />
                  {addItemLabel}
                </Button>
              )
            }
          />
        }
      >
        {visibleItems.map((item, index) => {
          const label = itemDisplayName(item)
          const sub = (activeCategory?.subcategories ?? []).find((entry) =>
            (entry.items ?? []).some((entryItem) => String(entryItem?.id) === String(item.id)),
          )
          const card = (
            <ContentCard
              key={item.id}
              to={itemPath(item.id)}
              title={label}
              description={itemSubtitle(item) || itemDescription(item)}
              meta={[
                sub ? sub.title || 'Untitled sub-category' : CATALOG_TERMS.noSubcategory.label,
                itemPrice(item) || null,
              ].filter(Boolean)}
              status={itemIsFeatured(item) ? 'featured' : undefined}
              thumbnail={itemThumbnail(item)}
              lastUpdated={savedAt}
            />
          )
          return (
            <CardRow key={item.id}>
              <MoveButtons>
                <MoveButton
                  type="button"
                  title="Move up"
                  aria-label={`Move ${label} up`}
                  disabled={busy || index === 0}
                  onClick={() => handleMove(item.id, -1)}
                >
                  <FiChevronUp aria-hidden="true" size={16} />
                </MoveButton>
                <MoveButton
                  type="button"
                  title="Move down"
                  aria-label={`Move ${label} down`}
                  disabled={busy || index === visibleItems.length - 1}
                  onClick={() => handleMove(item.id, 1)}
                >
                  <FiChevronDown aria-hidden="true" size={16} />
                </MoveButton>
              </MoveButtons>
              <CardRowMain>{card}</CardRowMain>
            </CardRow>
          )
        })}
      </ContentList>
    </CatalogPage>
  )
}

export default ItemsPage
