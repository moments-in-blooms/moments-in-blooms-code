import { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi'
import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import ContentToolbar from '../../../components/admin/ContentToolbar/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import Button from '../../../components/Button/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { useContent } from '../../../hooks/useContent.js'
import { showError, showSuccess } from '../../../utils/sweetAlert.js'
import {
  CardRow,
  CardRowMain,
  CatalogPage,
  MoveButton,
  MoveButtons,
} from './CatalogPages.styles.js'
import {
  categoryCounts,
  categoryPath,
  listCategories,
  moveCategory,
  newCategoryPath,
} from './catalog.js'

function CategoriesPage() {
  const { values, savedAt, update, save } = useContent('services')
  const [search, setSearch] = useState('')
  const [busy, setBusy] = useState(false)

  const categories = listCategories(values)
  const normalizedSearch = search.trim().toLowerCase()
  const filtered = categories.filter((category) => {
    if (
      normalizedSearch &&
      !`${category.title ?? ''} ${category.navSub ?? ''} ${category.description ?? ''}`
        .toLowerCase()
        .includes(normalizedSearch)
    ) {
      return false
    }
    return true
  })

  // Reorder controls only make sense in natural full order — with search
  // active the visible neighbors are not adjacent in storage.
  const canReorder = !normalizedSearch

  const handleMove = async (categoryId, direction) => {
    if (busy) return
    setBusy(true)
    update((current) => moveCategory(current, categoryId, direction))
    const result = await save('services')
    setBusy(false)
    if (result?.error) {
      showError('Reorder failed', result.error.message || "We couldn't reorder the categories.")
      return
    }
    showSuccess('Moved', 'Category order updated.')
  }

  return (
    <CatalogPage>
      <AdminPageHeader
        {...adminPageMeta.serviceCategories}
        actions={
          <Button to={newCategoryPath} variant="primary">
            <FiPlus aria-hidden="true" size={15} />
            Add category
          </Button>
        }
      />

      <ContentToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search categories…"
        count={filtered.length}
        countLabel="categories"
      />

      <ContentList
        title="Categories"
        description="Top-level service categories. Each category can hold sub-categories and items."
        emptyState={
          <EmptyState
            title={categories.length === 0 ? 'No categories yet' : 'No categories match your search'}
            description={
              categories.length === 0
                ? 'Add your first category to get started.'
                : 'Try adjusting your search.'
            }
            action={
              categories.length === 0 ? (
                <Button to={newCategoryPath} variant="outline">
                  <FiPlus aria-hidden="true" size={15} />
                  Add category
                </Button>
              ) : null
            }
          />
        }
      >
        {filtered.map((category, index) => {
          const counts = categoryCounts(category)
          const label = category.title || 'Untitled category'
          return (
            <CardRow key={category.id}>
              {canReorder ? (
                <MoveButtons>
                  <MoveButton
                    type="button"
                    title="Move up"
                    aria-label={`Move ${label} up`}
                    disabled={busy || index === 0}
                    onClick={() => handleMove(category.id, -1)}
                  >
                    <FiChevronUp aria-hidden="true" size={16} />
                  </MoveButton>
                  <MoveButton
                    type="button"
                    title="Move down"
                    aria-label={`Move ${label} down`}
                    disabled={busy || index === filtered.length - 1}
                    onClick={() => handleMove(category.id, 1)}
                  >
                    <FiChevronDown aria-hidden="true" size={16} />
                  </MoveButton>
                </MoveButtons>
              ) : null}
              <CardRowMain>
                <ContentCard
                  to={categoryPath(category.id)}
                  title={label}
                  description={category.description}
                  meta={[
                    `${counts.subcategories} sub-categor${counts.subcategories === 1 ? 'y' : 'ies'}`,
                    `${counts.items} item${counts.items === 1 ? '' : 's'}`,
                    category.priceFrom ? `Price starts at ${category.priceFrom}` : null,
                  ].filter(Boolean)}
                  status={category.featured ? 'featured' : undefined}
                  thumbnail={
                    category.coverImage?.src
                      ? { src: category.coverImage.src, alt: category.coverImage.alt }
                      : undefined
                  }
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

export default CategoriesPage
