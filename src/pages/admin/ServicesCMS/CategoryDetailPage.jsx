import { useEffect, useMemo, useRef, useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmDialog from '../../../components/admin/ConfirmDialog/index.js'
import ContentDetailHeader from '../../../components/admin/ContentDetailHeader/index.js'
import ContentFormSection from '../../../components/admin/ContentFormSection/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import Modal from '../../../components/admin/Modal/index.js'
import SaveActions from '../../../components/admin/SaveActions/index.js'
import ToggleSwitch from '../../../components/admin/ToggleSwitch/index.js'
import Button from '../../../components/Button/index.js'
import { FieldRow, SelectField, TextAreaField, TextField } from '../../../components/FormField/index.js'
import { useContent } from '../../../hooks/useContent.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import { deleteImage, isStorageUrl } from '../../../services/storage.js'
import { showError, showSuccess } from '../../../utils/sweetAlert.js'
import { CatalogPage } from './CatalogPages.styles.js'
import {
  categoriesPath,
  categoryCounts,
  categoryPath,
  collectStorageUrls,
  createCategoryDraft,
  getCategory,
  listCategories,
  moveCategory,
  moveCategoryChildren,
  removeCategory,
  slugify,
  upsertCategory,
  validateCategory,
} from './catalog.js'

const clone = (value) => (value == null ? null : JSON.parse(JSON.stringify(value)))

function CategoryDetailPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { values, savedAt, update, save } = useContent('services')

  const creating = categoryId === 'new' || categoryId === undefined
  const categories = listCategories(values)
  const stored = creating ? null : getCategory(values, categoryId)

  const initialDraft = useMemo(() => {
    if (creating) return createCategoryDraft(categories.length + 1)
    return stored ? clone(stored) : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creating, categoryId, values])

  const [draft, setDraft] = useState(() => clone(initialDraft))
  const [dirty, setDirty] = useState(false)
  const syncedRef = useRef({ initialDraft, creating })

  useEffect(() => {
    // Never clobber unsaved edits: an upstream values change (mount fetch
    // settling, realtime event) while the form is dirty leaves the draft
    // alone. It re-syncs on the next settled change after save/discard.
    if (!dirty) {
      const previous = syncedRef.current
      if (previous.initialDraft !== initialDraft || previous.creating !== creating) {
        syncedRef.current = { initialDraft, creating }
        setDraft(clone(initialDraft))
        setDirty(false)
      }
    }
  }, [initialDraft, creating, dirty])

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [moving, setMoving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [reassignOpen, setReassignOpen] = useState(false)
  const [subcategoryTargetId, setSubcategoryTargetId] = useState('')
  const [itemTargetValue, setItemTargetValue] = useState('')
  const { guard, bypass } = useUnsavedGuard({ active: dirty })

  if (!creating && !stored) {
    return (
      <CatalogPage>
        <EmptyState
          title="Category not found"
          description="This category is missing from the saved Services content."
          action={
            <Button variant="outline" onClick={() => navigate(categoriesPath)}>
              Back to Categories
            </Button>
          }
        />
      </CatalogPage>
    )
  }

  if (!draft) {
    return (
      <CatalogPage>
        <EmptyState title="Loading" description="Preparing category editor." />
      </CatalogPage>
    )
  }

  const patch = (next) => {
    setDraft(typeof next === 'function' ? next(draft) : next)
    setDirty(true)
  }

  const counts = categoryCounts(draft)
  const otherCategories = categories.filter((entry) => String(entry?.id) !== String(draft.id))
  const siblingIndex = categories.findIndex((entry) => String(entry?.id) === String(draft.id))

  const itemTargetOptions = otherCategories.flatMap((category) => [
    { value: String(category.id), label: `${category.title || 'Untitled'} › Top level` },
    ...(Array.isArray(category.subcategories) ? category.subcategories : []).map((sub) => ({
      value: `${category.id}/${sub.id}`,
      label: `${category.title || 'Untitled'} › ${sub.title || 'Untitled'}`,
    })),
  ])

  const parseItemTarget = (value) => {
    if (!value) return null
    const [targetCategoryId, targetSubcategoryId] = String(value).split('/')
    if (!targetCategoryId) return null
    return { categoryId: targetCategoryId, subcategoryId: targetSubcategoryId ?? null }
  }

  // Reordering this category among its siblings persists immediately (same
  // as the Categories list). Blocked while the form is dirty so the
  // post-save draft sync below can never wipe unsaved edits.
  const handleMoveSelf = async (direction) => {
    if (moving || creating || dirty) return
    setMoving(true)
    update((current) => moveCategory(current, draft.id, direction))
    const result = await save('services')
    setMoving(false)
    if (result?.error) {
      showError('Reorder failed', result.error.message || "We couldn't reorder the categories.")
      return
    }
    // The move renumbers every sibling — sync the draft so a later form
    // save cannot write a stale order back. Already persisted, not dirty.
    setDraft((prev) => (prev ? { ...prev, order: siblingIndex + direction + 1 } : prev))
    showSuccess('Moved', 'Category order updated.')
  }

  const persist = async (mutate) => {
    update(mutate)
    return save('services')
  }

  const cleanupReplacedCover = (oldRecord, nextRecord) => {
    const oldSrc = oldRecord?.coverImage?.src
    const newSrc = nextRecord?.coverImage?.src
    if (oldSrc && oldSrc !== newSrc && isStorageUrl(oldSrc)) {
      deleteImage(oldSrc).catch(() => {})
    }
  }

  const handleSave = async () => {
    const toSave = { ...draft }
    if (!String(toSave.slug ?? '').trim()) {
      toSave.slug = slugify(toSave.title ?? '')
    } else {
      toSave.slug = String(toSave.slug).trim()
    }
    const nextErrors = validateCategory(toSave, categories)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return { ok: false }
    setSaving(true)
    const oldRecord = creating ? null : getCategory(values, categoryId)
    const result = await persist((current) => upsertCategory(current, toSave))
    setSaving(false)
    if (result?.error) {
      return { ok: false, message: result.error.message }
    }
    if (oldRecord) cleanupReplacedCover(oldRecord, toSave)
    setDraft(clone(toSave))
    setDirty(false)
    if (creating) {
      bypass()
      navigate(categoryPath(toSave.id), { replace: true })
    }
    return { ok: true }
  }

  const handleDeleteConfirm = async ({ move } = {}) => {
    setConfirmDelete(false)
    setReassignOpen(false)
    const oldRecord = getCategory(values, categoryId)
    const result = await persist((current) => {
      let next = current
      if (move) {
        next = moveCategoryChildren(current, categoryId, move)
      }
      return removeCategory(next, categoryId)
    })
    if (result?.error) {
      showError('Delete failed', result.error.message || "We couldn't delete the category.")
      return
    }
    if (oldRecord) {
      if (move) {
        const coverSrc = oldRecord.coverImage?.src
        if (coverSrc && isStorageUrl(coverSrc)) deleteImage(coverSrc).catch(() => {})
      } else {
        collectStorageUrls(oldRecord).forEach((url) => deleteImage(url).catch(() => {}))
      }
    }
    bypass()
    navigate(categoriesPath)
  }

  const handleDeleteRequest = () => {
    if (counts.subcategories > 0 || counts.items > 0) {
      setSubcategoryTargetId('')
      setItemTargetValue('')
      setReassignOpen(true)
    } else {
      setConfirmDelete(true)
    }
  }

  const handleReassignConfirm = () => {
    if (counts.subcategories > 0 && !subcategoryTargetId) return
    if (counts.directItems > 0 && !itemTargetValue) return
    const itemTarget = counts.directItems > 0 ? parseItemTarget(itemTargetValue) : null
    if (counts.directItems > 0 && !itemTarget) return
    handleDeleteConfirm({
      move: {
        subcategoryTargetId: counts.subcategories > 0 ? subcategoryTargetId : undefined,
        itemTarget: itemTarget ?? undefined,
      },
    })
  }

  return (
    <CatalogPage>
      <ContentDetailHeader
        backTo={categoriesPath}
        backLabel="Back to Categories"
        eyebrow="Services · Categories"
        title={creating ? 'New category' : draft.title || 'Untitled category'}
        status={draft.featured ? 'featured' : undefined}
        lastUpdated={savedAt}
        actions={
          creating ? null : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                type="button"
                variant="outline"
                size="small"
                title={dirty ? 'Save or discard your changes first' : 'Move category up'}
                aria-label={`Move ${draft.title || 'this category'} up`}
                disabled={moving || dirty || siblingIndex <= 0}
                onClick={() => handleMoveSelf(-1)}
              >
                <FiChevronUp aria-hidden="true" size={15} />
                <span>Move up</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="small"
                title={dirty ? 'Save or discard your changes first' : 'Move category down'}
                aria-label={`Move ${draft.title || 'this category'} down`}
                disabled={moving || dirty || siblingIndex < 0 || siblingIndex >= categories.length - 1}
                onClick={() => handleMoveSelf(1)}
              >
                <FiChevronDown aria-hidden="true" size={15} />
                <span>Move down</span>
              </Button>
            </div>
          )
        }
      />

      <ContentFormSection
        title="Category overview"
        description="How this category appears in the services navigation and on its page."
      >
        <TextField
          label="Title"
          value={draft.title ?? ''}
          onChange={(event) => patch({ ...draft, title: event.target.value })}
          error={errors.title}
          required
        />
        <FieldRow>
          <TextField
            label="URL slug"
            value={draft.slug ?? ''}
            onChange={(event) => patch({ ...draft, slug: event.target.value })}
            error={errors.slug}
            hint="Unique per category. Leave blank to generate it from the title."
          />
          <SelectField
            label="Type"
            value={draft.type ?? 'collection'}
            onChange={(event) => patch({ ...draft, type: event.target.value })}
            options={['collection', 'sub-brand']}
            hint="Sub-brand is e.g. Blissful Nest."
          />
        </FieldRow>
        <FieldRow>
          <TextField
            label="Navigation subtitle"
            value={draft.navSub ?? ''}
            onChange={(event) => patch({ ...draft, navSub: event.target.value })}
          />
          <TextField
            label="Navigation meta"
            value={draft.navMeta ?? ''}
            onChange={(event) => patch({ ...draft, navMeta: event.target.value })}
            placeholder="4 Collections"
          />
        </FieldRow>
        <TextField
          label="Tagline"
          value={draft.tagline ?? ''}
          onChange={(event) => patch({ ...draft, tagline: event.target.value })}
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
        <ToggleSwitch
          label="Featured"
          hint="Adds a Featured badge to this category inside the admin content lists."
          checked={Boolean(draft.featured)}
          onChange={(checked) => patch({ ...draft, featured: checked })}
        />
        <ImageField
          label="Cover image"
          value={draft.coverImage?.src ?? ''}
          onChange={(src) =>
            patch({ ...draft, coverImage: { ...(draft.coverImage ?? {}), src } })
          }
          alt={draft.coverImage?.alt ?? ''}
          onAltChange={(event) =>
            patch({
              ...draft,
              coverImage: { ...(draft.coverImage ?? {}), alt: event.target.value },
            })
          }
        />
      </ContentFormSection>

      <SaveActions
        dirty={dirty}
        saving={saving}
        onCancel={() => navigate(categoriesPath)}
        onSave={handleSave}
        onDelete={!creating ? handleDeleteRequest : undefined}
        deleteLabel="Delete category"
        submitLabel={creating ? 'Create category' : 'Save Changes'}
      />

      <ConfirmDialog
        open={confirmDelete}
        title={`Delete ${draft.title || 'this category'}?`}
        description="This will permanently delete this category. This cannot be undone and any stored images will be removed."
        confirmLabel="Delete category"
        cancelLabel="Cancel"
        onConfirm={() => handleDeleteConfirm()}
        onCancel={() => setConfirmDelete(false)}
      />

      <Modal
        open={reassignOpen}
        title={`Delete ${draft.title || 'this category'}?`}
        description={`This category still holds ${counts.subcategories} sub-categor${counts.subcategories === 1 ? 'y' : 'ies'} and ${counts.directItems} direct item${counts.directItems === 1 ? '' : 's'}. Move them elsewhere first — nothing is orphaned.`}
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
              disabled={
                (counts.subcategories > 0 && !subcategoryTargetId) ||
                (counts.directItems > 0 && !itemTargetValue)
              }
            >
              Move &amp; delete category
            </Button>
          </>
        }
      >
        {counts.subcategories > 0 ? (
          <SelectField
            label="Move sub-categories to"
            value={subcategoryTargetId}
            onChange={(event) => setSubcategoryTargetId(event.target.value)}
            options={otherCategories.map((entry) => ({
              value: String(entry.id),
              label: entry.title || 'Untitled category',
            }))}
            placeholder="Choose a category"
            required
          />
        ) : null}
        {counts.directItems > 0 ? (
          <SelectField
            label="Move items to"
            value={itemTargetValue}
            onChange={(event) => setItemTargetValue(event.target.value)}
            options={itemTargetOptions}
            placeholder="Choose a destination"
            required
          />
        ) : null}
      </Modal>
      {guard}
    </CatalogPage>
  )
}

export default CategoryDetailPage
