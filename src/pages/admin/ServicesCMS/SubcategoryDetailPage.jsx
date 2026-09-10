import { useEffect, useMemo, useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ConfirmDialog from '../../../components/admin/ConfirmDialog/index.js'
import ContentDetailHeader from '../../../components/admin/ContentDetailHeader/index.js'
import ContentFormSection from '../../../components/admin/ContentFormSection/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import Modal from '../../../components/admin/Modal/index.js'
import SaveActions from '../../../components/admin/SaveActions/index.js'
import Button from '../../../components/Button/index.js'
import { SelectField, TextAreaField, TextField } from '../../../components/FormField/index.js'
import { useContent } from '../../../hooks/useContent.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import { deleteImage } from '../../../services/storage.js'
import { showError } from '../../../utils/sweetAlert.js'
import { CatalogPage } from './CatalogPages.styles.js'
import {
  collectStorageUrls,
  createSubcategoryDraft,
  getSubcategory,
  listCategories,
  moveSubcategoryItems,
  removeSubcategory,
  subcategoriesPath,
  subcategoryPath,
  upsertSubcategory,
  validateSubcategory,
} from './catalog.js'

const clone = (value) => (value == null ? null : JSON.parse(JSON.stringify(value)))

function SubcategoryDetailPage() {
  const { subcategoryId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { values, savedAt, update, save } = useContent('services')

  const creating = subcategoryId === 'new' || subcategoryId === undefined
  const categories = listCategories(values)
  const stored = creating ? null : getSubcategory(values, subcategoryId)
  const storedParentId = stored ? String(stored.category.id) : null

  // Parent category: from the stored location, the `?category=` hint for new
  // sub-categories, or the first category as a fallback.
  const initialParentId = useMemo(() => {
    if (storedParentId) return storedParentId
    const hinted = searchParams.get('category')
    if (hinted && categories.some((entry) => String(entry.id) === hinted)) return hinted
    return categories[0] ? String(categories[0].id) : ''
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedParentId, subcategoryId, values])

  const initialDraft = useMemo(() => {
    if (creating) {
      const parent = categories.find((entry) => String(entry.id) === initialParentId)
      return createSubcategoryDraft((parent?.subcategories ?? []).length + 1)
    }
    return stored ? clone(stored.subcategory) : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creating, subcategoryId, values])

  const [draft, setDraft] = useState(() => clone(initialDraft))
  const [parentId, setParentId] = useState(initialParentId)
  const [originalParentId] = useState(initialParentId)
  const [dirty, setDirty] = useState(false)
  const syncedRef = useRef({ initialDraft, initialParentId, creating })

  useEffect(() => {
    // Never clobber unsaved edits: an upstream values change (mount fetch
    // settling, realtime event) while the form is dirty leaves the draft
    // alone. It re-syncs on the next settled change after save/discard.
    if (!dirty) {
      const previous = syncedRef.current
      if (
        previous.initialDraft !== initialDraft ||
        previous.initialParentId !== initialParentId ||
        previous.creating !== creating
      ) {
        syncedRef.current = { initialDraft, initialParentId, creating }
        setDraft(clone(initialDraft))
        setParentId(initialParentId)
        setDirty(false)
      }
    }
  }, [initialDraft, initialParentId, creating, dirty])

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [reassignOpen, setReassignOpen] = useState(false)
  const [itemTargetValue, setItemTargetValue] = useState('')
  const { guard, bypass } = useUnsavedGuard({ active: dirty })

  if (!creating && !stored) {
    return (
      <CatalogPage>
        <EmptyState
          title="Sub-category not found"
          description="This sub-category is missing from the saved Services content."
          action={
            <Button variant="outline" onClick={() => navigate(subcategoriesPath)}>
              Back to Sub-Categories
            </Button>
          }
        />
      </CatalogPage>
    )
  }

  if (categories.length === 0) {
    return (
      <CatalogPage>
        <EmptyState
          title="No categories yet"
          description="Create a category first — every sub-category belongs to exactly one category."
          action={
            <Button to="/admin/services/categories/new" variant="outline">
              <FiPlus aria-hidden="true" size={15} />
              Add category
            </Button>
          }
        />
      </CatalogPage>
    )
  }

  if (!draft) {
    return (
      <CatalogPage>
        <EmptyState title="Loading" description="Preparing sub-category editor." />
      </CatalogPage>
    )
  }

  const patch = (next) => {
    setDraft(typeof next === 'function' ? next(draft) : next)
    setDirty(true)
  }

  const handleParentChange = (nextParentId) => {
    setParentId(nextParentId)
    setDirty(true)
  }

  const items = Array.isArray(draft.items) ? draft.items : []
  const otherCategories = categories.filter((entry) => String(entry.id) !== String(parentId))
  const itemTargetOptions = otherCategories.flatMap((category) => [
    { value: String(category.id), label: `${category.title || 'Untitled'} › Top level` },
    ...(Array.isArray(category.subcategories) ? category.subcategories : []).map((sub) => ({
      value: `${category.id}/${sub.id}`,
      label: `${category.title || 'Untitled'} › ${sub.title || 'Untitled'}`,
    })),
  ])

  const handleSave = async () => {
    const nextErrors = validateSubcategory(draft, parentId, categories)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return { ok: false }
    setSaving(true)
    const result = await (async () => {
      update((current) =>
        upsertSubcategory(current, parentId, draft, {
          fromCategoryId: creating ? undefined : originalParentId,
        }),
      )
      return save('services')
    })()
    setSaving(false)
    if (result?.error) {
      return { ok: false, message: result.error.message }
    }
    setDirty(false)
    if (creating) {
      bypass()
      navigate(subcategoryPath(draft.id), { replace: true })
    }
    return { ok: true }
  }

  const handleDeleteConfirm = async ({ move } = {}) => {
    setConfirmDelete(false)
    setReassignOpen(false)
    const oldRecord = getSubcategory(values, subcategoryId)?.subcategory ?? null
    const result = await (async () => {
      update((current) => {
        let next = current
        if (move) {
          next = moveSubcategoryItems(next, parentId, subcategoryId, move.itemTarget)
        }
        return removeSubcategory(next, parentId, subcategoryId)
      })
      return save('services')
    })()
    if (result?.error) {
      showError('Delete failed', result.error.message || "We couldn't delete the sub-category.")
      return
    }
    if (oldRecord && !move) {
      collectStorageUrls(oldRecord).forEach((url) => deleteImage(url).catch(() => {}))
    }
    bypass()
    navigate(subcategoriesPath)
  }

  const handleDeleteRequest = () => {
    if (items.length > 0) {
      setItemTargetValue('')
      setReassignOpen(true)
    } else {
      setConfirmDelete(true)
    }
  }

  const handleReassignConfirm = () => {
    if (!itemTargetValue) return
    const [targetCategoryId, targetSubcategoryId] = String(itemTargetValue).split('/')
    if (!targetCategoryId) return
    handleDeleteConfirm({
      move: {
        itemTarget: { categoryId: targetCategoryId, subcategoryId: targetSubcategoryId ?? null },
      },
    })
  }

  return (
    <CatalogPage>
      <ContentDetailHeader
        backTo={subcategoriesPath}
        backLabel="Back to Sub-Categories"
        eyebrow="Services · Sub-Categories"
        title={creating ? 'New sub-category' : draft.title || 'Untitled sub-category'}
        lastUpdated={savedAt}
      />

      <ContentFormSection
        title="Sub-category details"
        description="How this sub-category appears inside its parent category."
      >
        <SelectField
          label="Parent category"
          value={parentId}
          onChange={(event) => handleParentChange(event.target.value)}
          options={categories.map((entry) => ({
            value: String(entry.id),
            label: entry.title || 'Untitled category',
          }))}
          error={errors.categoryId}
          required
        />
        <TextField
          label="Title"
          value={draft.title ?? ''}
          onChange={(event) => patch({ ...draft, title: event.target.value })}
          error={errors.title}
          required
        />
        <TextField
          label="Subtitle"
          value={draft.subtitle ?? ''}
          onChange={(event) => patch({ ...draft, subtitle: event.target.value })}
        />
        <TextAreaField
          label="Description"
          rows={4}
          value={draft.description ?? ''}
          onChange={(event) => patch({ ...draft, description: event.target.value })}
        />
        <TextField
          label="Starting price"
          value={draft.priceFrom ?? ''}
          onChange={(event) => patch({ ...draft, priceFrom: event.target.value })}
          placeholder="$450"
          hint="Optional. Shown as “Price starts at …” on the public site."
        />
        <ImageField
          label="Image"
          value={draft.image?.src ?? (typeof draft.image === 'string' ? draft.image : '')}
          onChange={(src) =>
            patch({
              ...draft,
              image: {
                ...(draft.image && typeof draft.image === 'object' ? draft.image : {}),
                src,
              },
            })
          }
          alt={draft.image?.alt ?? ''}
          onAltChange={(event) =>
            patch({
              ...draft,
              image: {
                ...(draft.image && typeof draft.image === 'object' ? draft.image : {}),
                src:
                  draft.image?.src ?? (typeof draft.image === 'string' ? draft.image : ''),
                alt: event.target.value,
              },
            })
          }
        />
      </ContentFormSection>

      <SaveActions
        dirty={dirty}
        saving={saving}
        onCancel={() => navigate(subcategoriesPath)}
        onSave={handleSave}
        onDelete={!creating ? handleDeleteRequest : undefined}
        deleteLabel="Delete sub-category"
        submitLabel={creating ? 'Create sub-category' : 'Save Changes'}
      />

      <ConfirmDialog
        open={confirmDelete}
        title={`Delete ${draft.title || 'this sub-category'}?`}
        description="This will permanently delete this sub-category. This cannot be undone."
        confirmLabel="Delete sub-category"
        cancelLabel="Cancel"
        onConfirm={() => handleDeleteConfirm()}
        onCancel={() => setConfirmDelete(false)}
      />

      <Modal
        open={reassignOpen}
        title={`Delete ${draft.title || 'this sub-category'}?`}
        description={`This sub-category still holds ${items.length} item${items.length === 1 ? '' : 's'}. Move them elsewhere first — nothing is orphaned.`}
        onClose={() => setReassignOpen(false)}
        footer={
          <>
            <Button variant="outline" radius="md" onClick={() => setReassignOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              radius="md"
              onClick={handleReassignConfirm}
              disabled={!itemTargetValue}
            >
              Move &amp; delete sub-category
            </Button>
          </>
        }
      >
        <SelectField
          label="Move items to"
          value={itemTargetValue}
          onChange={(event) => setItemTargetValue(event.target.value)}
          options={itemTargetOptions}
          placeholder="Choose a destination"
          required
        />
      </Modal>
      {guard}
    </CatalogPage>
  )
}

export default SubcategoryDetailPage
