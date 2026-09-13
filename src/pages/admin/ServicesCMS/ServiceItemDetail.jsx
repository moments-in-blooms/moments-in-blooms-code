import { useEffect, useMemo, useRef, useState } from 'react'
import { FiChevronDown, FiChevronUp, FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ConfirmDialog from '../../../components/admin/ConfirmDialog/index.js'
import ContentDetailHeader from '../../../components/admin/ContentDetailHeader/index.js'
import ContentFormSection from '../../../components/admin/ContentFormSection/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import Modal from '../../../components/admin/Modal/index.js'
import SaveActions from '../../../components/admin/SaveActions/index.js'
import ToggleSwitch from '../../../components/admin/ToggleSwitch/index.js'
import Button from '../../../components/Button/index.js'
import { SelectField, TextAreaField, TextField } from '../../../components/FormField/index.js'
import { ErrorText } from '../../../components/FormField/FormField.styles.js'
import { CATALOG_TERMS } from '../../../constants/adminTerms.js'
import { useContent } from '../../../hooks/useContent.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import { deleteImage } from '../../../services/storage.js'
import { showError } from '../../../utils/sweetAlert.js'
import {
  CatalogPage,
  FilterTab,
  FilterTabCount,
  FilterTabs,
  MediaActions,
  MediaAddRow,
  MediaEntry,
  MediaEntryMeta,
  MediaEntryText,
  MediaEntryTitle,
  MediaStack,
  MediaThumb,
  MoveButton,
} from './CatalogPages.styles.js'
import {
  collectStorageUrls,
  createItemDraft,
  deleteItem,
  getItem,
  inferCatalogKind,
  itemDisplayName,
  itemPath,
  itemsPath,
  itemsPathWithContext,
  listCategories,
  upsertItem,
  validateItem,
} from './catalog.js'
import { BlissfulNestPackageForm, PhotoboothPackageForm } from './itemForms.jsx'

const clone = (value) => (value == null ? null : JSON.parse(JSON.stringify(value)))

function resolveInitialParent(values, stored, searchParams) {
  const categories = listCategories(values)
  if (stored) {
    return {
      categoryId: String(stored.category.id),
      subcategoryId: stored.subcategory ? String(stored.subcategory.id) : '',
    }
  }
  const hintedCategory = searchParams.get('category')
  const hintedSubcategory = searchParams.get('subcategory')
  const category = categories.find((entry) => String(entry.id) === hintedCategory)
  if (category) {
    const sub = (category.subcategories ?? []).find(
      (entry) => String(entry.id) === hintedSubcategory,
    )
    return {
      categoryId: String(category.id),
      subcategoryId: sub ? String(sub.id) : '',
    }
  }
  const first = categories[0]
  return { categoryId: first ? String(first.id) : '', subcategoryId: '' }
}

function ServiceItemDetail() {
  const { itemId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { values, savedAt, update, save } = useContent('services')

  const creating = itemId === 'new' || itemId === undefined
  const categories = listCategories(values)
  const stored = creating ? null : getItem(values, itemId)

  const initialParent = useMemo(
    () => resolveInitialParent(values, stored, searchParams),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [creating, itemId, values],
  )

  const initialDraft = useMemo(() => {
    if (creating) {
      const category = categories.find(
        (entry) => String(entry.id) === String(initialParent.categoryId),
      )
      return createItemDraft(category ? inferCatalogKind(category) : 'decor')
    }
    return stored ? clone(stored.item) : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creating, itemId, values])

  const [draft, setDraft] = useState(() => clone(initialDraft))
  const [categoryId, setCategoryId] = useState(initialParent.categoryId)
  const [subcategoryId, setSubcategoryId] = useState(initialParent.subcategoryId)
  const [originalLocation] = useState(initialParent)
  const [dirty, setDirty] = useState(false)
  const syncedRef = useRef({ initialDraft, initialParent, creating })

  useEffect(() => {
    // Never clobber unsaved edits: an upstream values change (mount fetch
    // settling, realtime event) while the form is dirty leaves the draft
    // alone. It re-syncs on the next settled change after save/discard.
    if (!dirty) {
      const previous = syncedRef.current
      if (
        previous.initialDraft !== initialDraft ||
        previous.initialParent !== initialParent ||
        previous.creating !== creating
      ) {
        syncedRef.current = { initialDraft, initialParent, creating }
        setDraft(clone(initialDraft))
        setCategoryId(initialParent.categoryId)
        setSubcategoryId(initialParent.subcategoryId)
        setDirty(false)
      }
    }
  }, [initialDraft, initialParent, creating, dirty])

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { guard, bypass } = useUnsavedGuard({ active: dirty })

  if (!creating && !stored) {
    return (
      <CatalogPage>
        <EmptyState
          title="Item not found"
          description="The item you are trying to edit no longer exists."
          action={
            <Button variant="outline" onClick={() => navigate(itemsPath)}>
              Back to Items
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
          description="Create a category first — every item belongs to a category."
          action={
            <Button to="/admin/services/categories/new" variant="outline">
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
        <EmptyState title="Loading" description="Preparing item editor." />
      </CatalogPage>
    )
  }

  const patch = (next) => {
    setDraft(typeof next === 'function' ? next(draft) : next)
    setDirty(true)
  }

  const selectedCategory = categories.find((entry) => String(entry.id) === String(categoryId))
  const kind = selectedCategory ? inferCatalogKind(selectedCategory) : 'decor'
  const subcategoryOptions = selectedCategory?.subcategories ?? []

  const handleCategoryChange = (nextCategoryId) => {
    setCategoryId(nextCategoryId)
    // The sub-category select is dependent: a sub-category from another
    // category is never kept. The draft itself is preserved (items are a
    // field superset); only the visible form adapts to the new kind.
    const nextCategory = categories.find((entry) => String(entry.id) === String(nextCategoryId))
    const stillValid = (nextCategory?.subcategories ?? []).some(
      (sub) => String(sub?.id) === String(subcategoryId),
    )
    if (!stillValid) setSubcategoryId('')
    setDirty(true)
  }

  const handleSubcategoryChange = (nextSubcategoryId) => {
    setSubcategoryId(nextSubcategoryId)
    setDirty(true)
  }

  const handleSave = async () => {
    const nextErrors = validateItem(draft, categoryId, subcategoryId, categories)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return { ok: false }
    setSaving(true)
    const oldRecord = creating ? null : getItem(values, itemId)?.item ?? null
    const result = await (async () => {
      update((current) =>
        upsertItem(current, categoryId, subcategoryId || null, draft, {
          from: creating
            ? undefined
            : {
                categoryId: originalLocation.categoryId,
                subcategoryId: originalLocation.subcategoryId || null,
              },
        }),
      )
      return save('services')
    })()
    setSaving(false)
    if (result?.error) {
      return { ok: false, message: result.error.message }
    }
    if (oldRecord) {
      const oldUrls = collectStorageUrls(oldRecord)
      const newUrls = collectStorageUrls(draft)
      oldUrls.forEach((url) => {
        if (!newUrls.has(url)) deleteImage(url).catch(() => {})
      })
    }
    setDirty(false)
    if (creating) {
      bypass()
      navigate(itemPath(draft.id), { replace: true })
    }
    return { ok: true }
  }

  const handleDelete = async () => {
    setConfirmDelete(false)
    const removed = creating ? null : getItem(values, itemId)?.item ?? null
    const result = await (async () => {
      update((current) => deleteItem(current, categoryId, subcategoryId || null, itemId))
      return save('services')
    })()
    if (result?.error) {
      showError('Delete failed', result.error.message || "We couldn't delete the item.")
      return
    }
    if (removed) {
      collectStorageUrls(removed).forEach((url) => deleteImage(url).catch(() => {}))
    }
    bypass()
    navigate(itemsPathWithContext({ categoryId, subcategoryId }))
  }

  const displayName = itemDisplayName(draft)

  // Returning to the list reopens the current placement scope. The Items
  // list reads the same context from the URL (see catalog.js).
  const backToItems = itemsPathWithContext({ categoryId, subcategoryId })

  return (
    <CatalogPage>
      <ContentDetailHeader
        backTo={backToItems}
        backLabel="Back to Items"
        eyebrow={selectedCategory?.title ?? 'Services'}
        title={creating ? 'New item' : displayName || 'Untitled item'}
        lastUpdated={savedAt}
      />

      <ContentFormSection
        title={CATALOG_TERMS.placement.label}
        description={CATALOG_TERMS.placement.hint}
      >
        <SelectField
          label="Category"
          value={categoryId}
          onChange={(event) => handleCategoryChange(event.target.value)}
          options={categories.map((entry) => ({
            value: String(entry.id),
            label: entry.title || 'Untitled category',
          }))}
          error={errors.categoryId}
          required
        />
        <SelectField
          label="Sub-category"
          value={subcategoryId}
          onChange={(event) => handleSubcategoryChange(event.target.value)}
          options={subcategoryOptions.map((sub) => ({
            value: String(sub.id),
            label: sub.title || 'Untitled sub-category',
          }))}
          placeholder={CATALOG_TERMS.noSubcategory.label}
          error={errors.subcategoryId}
        />
      </ContentFormSection>

      {kind === 'package' ? (
        <>
          <ContentFormSection
            title="Package details"
            description="Pricing, inclusions and add-ons shown on the public Luxe Photobooth pricing cards."
          >
            <PhotoboothPackageForm
              value={draft}
              onChange={(next) =>
                patch(typeof next === 'function' ? next(draft) : { ...draft, ...next })
              }
            />
            {errors.name ? <ErrorText role="alert">{errors.name}</ErrorText> : null}
          </ContentFormSection>
          <PackageListsSection draft={draft} patch={patch} />
        </>
      ) : kind === 'prize' ? (
        <ContentFormSection
          title="Prize option details"
          description="The prize option shown in the Blissful Nest claw-machine grid."
        >
          <BlissfulNestPackageForm
            value={draft}
            onChange={(next) =>
              patch(typeof next === 'function' ? next(draft) : { ...draft, ...next })
            }
          />
          <TextField
            label="Price"
            value={draft.price ?? ''}
            onChange={(event) => patch({ ...draft, price: event.target.value })}
            placeholder="$850"
            hint="Optional. Shown on the public site when present."
          />
          {errors.name ? <ErrorText role="alert">{errors.name}</ErrorText> : null}
        </ContentFormSection>
      ) : (
        <DecorItemForm draft={draft} patch={patch} errors={errors} />
      )}

      <SaveActions
        dirty={dirty}
        saving={saving}
        onCancel={() => navigate(backToItems)}
        onSave={handleSave}
        onDelete={!creating ? () => setConfirmDelete(true) : undefined}
        deleteLabel="Delete item"
        submitLabel={creating ? 'Add item' : 'Save Changes'}
      />
      <ConfirmDialog
        open={confirmDelete}
        title={`Delete ${displayName || 'this item'}?`}
        description="This will permanently delete this item. This cannot be undone and any stored images will be removed."
        confirmLabel="Delete item"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
      {guard}
    </CatalogPage>
  )
}

function DecorItemForm({ draft, patch, errors }) {
  return (
    <>
      <ContentFormSection
        title="Item details"
        description="How this item appears on the public services page."
      >
        <TextField
          label="Display name"
          value={draft?.name ?? draft?.title ?? ''}
          onChange={(event) => patch({ ...draft, name: event.target.value })}
          error={errors.name}
          required
        />
        <TextField
          label="Tagline"
          value={draft?.tagline ?? ''}
          onChange={(event) => patch({ ...draft, tagline: event.target.value })}
        />
        <TextField
          label="Dimensions"
          value={draft?.dimensions ?? ''}
          onChange={(event) => patch({ ...draft, dimensions: event.target.value })}
          placeholder="2m Height x 1m Width"
        />
        <TextAreaField
          label="Description"
          rows={4}
          value={draft?.description ?? ''}
          onChange={(event) => patch({ ...draft, description: event.target.value })}
        />
        <TextField
          label="Price"
          value={draft?.price ?? ''}
          onChange={(event) => patch({ ...draft, price: event.target.value })}
          placeholder="$450"
          hint="Optional. Shown on the public site when present."
        />
        <ToggleSwitch
          label={CATALOG_TERMS.featured.label}
          hint="Featured items appear in the public services catalogue. Turning this off hides the item from the public site."
          checked={Boolean(draft?.isFeatured ?? draft?.popular)}
          onChange={(checked) => patch({ ...draft, isFeatured: checked })}
        />
        <ImageField
          label="Item photo"
          value={draft?.image?.src ?? (typeof draft?.image === 'string' ? draft.image : '')}
          onChange={(src) =>
            patch({
              ...draft,
              image: {
                ...(draft?.image && typeof draft.image === 'object' ? draft.image : {}),
                src,
              },
            })
          }
          alt={draft?.image?.alt ?? ''}
          onAltChange={(event) =>
            patch({
              ...draft,
              image: {
                ...(draft?.image && typeof draft.image === 'object' ? draft.image : {}),
                src: draft?.image?.src ?? '',
                alt: event.target.value,
              },
            })
          }
        />
      </ContentFormSection>

      <ItemMediaSection draft={draft} patch={patch} />
    </>
  )
}

const MEDIA_TABS = [
  { key: 'options', label: 'Variants' },
  { key: 'gallery', label: 'Gallery' },
]

const blankVariant = () => ({
  name: 'New variant',
  specs: '',
  desc: '',
  image: { src: '', alt: '' },
})

const blankPhoto = () => ({ src: '', title: '', alt: '' })

function ItemMediaSection({ draft, patch }) {
  const [activeTab, setActiveTab] = useState('options')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [entryDraft, setEntryDraft] = useState(null)
  const [entryError, setEntryError] = useState('')
  const tabRefs = useRef({})

  const isGallery = activeTab === 'gallery'
  const rows = isGallery
    ? (Array.isArray(draft?.gallery) ? draft.gallery : [])
    : (Array.isArray(draft?.options) ? draft.options : [])
  const listKey = isGallery ? 'gallery' : 'options'

  const openAdd = () => {
    setEntryDraft(isGallery ? blankPhoto() : blankVariant())
    setEditingIndex(null)
    setEntryError('')
    setModalOpen(true)
  }

  const openEdit = (index) => {
    setEntryDraft(clone(rows[index]))
    setEditingIndex(index)
    setEntryError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingIndex(null)
    setEntryDraft(null)
    setEntryError('')
  }

  const saveEntry = () => {
    const title = isGallery ? entryDraft?.title?.trim() : entryDraft?.name?.trim()
    if (!title) {
      setEntryError(isGallery ? 'A photo title is required.' : 'A variant name is required.')
      return
    }
    const next =
      editingIndex == null
        ? [...rows, entryDraft]
        : rows.map((entry, entryIndex) => (entryIndex === editingIndex ? entryDraft : entry))
    patch({ ...draft, [listKey]: next })
    closeModal()
  }

  const deleteEntry = (index) => {
    patch({ ...draft, [listKey]: rows.filter((_, entryIndex) => entryIndex !== index) })
  }

  const moveEntry = (index, delta) => {
    const target = index + delta
    if (target < 0 || target >= rows.length) return
    const next = [...rows]
    const [moved] = next.splice(index, 1)
    next.splice(target, 0, moved)
    patch({ ...draft, [listKey]: next })
  }

  const focusTab = (key) => {
    setActiveTab(key)
    tabRefs.current[key]?.focus()
  }

  const handleTabKeyDown = (event, index) => {
    let nextIndex = null
    if (event.key === 'ArrowRight') nextIndex = index + 1
    else if (event.key === 'ArrowLeft') nextIndex = index - 1
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = MEDIA_TABS.length - 1
    if (nextIndex === null) return
    event.preventDefault()
    const clamped = (nextIndex + MEDIA_TABS.length) % MEDIA_TABS.length
    focusTab(MEDIA_TABS[clamped].key)
  }

  const entryTitle = (entry) =>
    isGallery ? entry?.title || 'New photo' : entry?.name || 'New variant'

  const entryMeta = (entry) => {
    if (isGallery) return entry?.alt || 'No alt text yet'
    return [entry?.specs, entry?.desc].filter(Boolean).join(' · ') || 'No details yet'
  }

  const entryImage = (entry) => {
    const image = isGallery ? entry?.src : entry?.image
    if (typeof image === 'string') return { src: image, alt: entryTitle(entry) }
    return { src: image?.src ?? '', alt: image?.alt || entryTitle(entry) }
  }

  return (
    <ContentFormSection
      title="Variants & Gallery"
      description="Sizes, styles or hire options, plus supporting photos shown alongside this item."
    >
      <FilterTabs role="tablist" aria-label="Item media">
        {MEDIA_TABS.map((tab, index) => {
          const isActive = activeTab === tab.key
          const count =
            tab.key === 'gallery'
              ? (Array.isArray(draft?.gallery) ? draft.gallery.length : 0)
              : (Array.isArray(draft?.options) ? draft.options.length : 0)
          return (
            <FilterTab
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              $active={isActive}
              tabIndex={isActive ? 0 : -1}
              ref={(node) => {
                tabRefs.current[tab.key] = node
              }}
              onClick={() => setActiveTab(tab.key)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {tab.label}
              <FilterTabCount $active={isActive}>{count}</FilterTabCount>
            </FilterTab>
          )
        })}
      </FilterTabs>

      <MediaStack>
        {rows.length === 0 ? (
          <MediaEntryMeta>{isGallery ? 'No photos yet.' : 'No variants yet.'}</MediaEntryMeta>
        ) : (
          rows.map((entry, index) => {
            const title = entryTitle(entry)
            const image = entryImage(entry)
            return (
              <MediaEntry key={index}>
                {image.src ? (
                  <MediaThumb src={image.src} alt={image.alt} loading="lazy" />
                ) : null}
                <MediaEntryText>
                  <MediaEntryTitle>{title}</MediaEntryTitle>
                  <MediaEntryMeta>{entryMeta(entry)}</MediaEntryMeta>
                </MediaEntryText>
                <MediaActions>
                  <MoveButton
                    type="button"
                    title="Move up"
                    aria-label={`Move ${title} up`}
                    disabled={index === 0}
                    onClick={() => moveEntry(index, -1)}
                  >
                    <FiChevronUp aria-hidden="true" size={15} />
                  </MoveButton>
                  <MoveButton
                    type="button"
                    title="Move down"
                    aria-label={`Move ${title} down`}
                    disabled={index === rows.length - 1}
                    onClick={() => moveEntry(index, 1)}
                  >
                    <FiChevronDown aria-hidden="true" size={15} />
                  </MoveButton>
                  <MoveButton
                    type="button"
                    title={`Edit ${title}`}
                    aria-label={`Edit ${title}`}
                    onClick={() => openEdit(index)}
                  >
                    <FiEdit2 aria-hidden="true" size={15} />
                  </MoveButton>
                  <MoveButton
                    type="button"
                    $danger
                    title={`Delete ${title}`}
                    aria-label={`Delete ${title}`}
                    onClick={() => deleteEntry(index)}
                  >
                    <FiTrash2 aria-hidden="true" size={15} />
                  </MoveButton>
                </MediaActions>
              </MediaEntry>
            )
          })
        )}
      </MediaStack>

      <MediaAddRow>
        <Button type="button" variant="outline" onClick={openAdd}>
          <FiPlus aria-hidden="true" size={15} />
          {isGallery ? 'Add photo' : 'Add variant'}
        </Button>
      </MediaAddRow>

      <Modal
        open={modalOpen}
        title={
          editingIndex == null
            ? isGallery
              ? 'Add photo'
              : 'Add variant'
            : isGallery
              ? `Edit ${entryDraft?.title || 'photo'}`
              : `Edit ${entryDraft?.name || 'variant'}`
        }
        description={
          isGallery
            ? 'Supporting photo shown alongside this item.'
            : 'Size, style or hire option shown under this item.'
        }
        onClose={closeModal}
        footer={
          <>
            <Button type="button" variant="outline" radius="md" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="button" variant="primary" radius="md" onClick={saveEntry}>
              {editingIndex == null ? (isGallery ? 'Add photo' : 'Add variant') : 'Save changes'}
            </Button>
          </>
        }
      >
        {isGallery ? (
          <>
            <TextField
              label="Photo title"
              value={entryDraft?.title ?? ''}
              onChange={(event) => setEntryDraft({ ...entryDraft, title: event.target.value })}
              error={entryError}
              required
            />
            <ImageField
              label="Photo"
              value={entryDraft?.src ?? ''}
              onChange={(src) => setEntryDraft({ ...entryDraft, src })}
              alt={entryDraft?.alt ?? ''}
              onAltChange={(event) => setEntryDraft({ ...entryDraft, alt: event.target.value })}
            />
          </>
        ) : (
          <>
            <TextField
              label="Variant name"
              value={entryDraft?.name ?? ''}
              onChange={(event) => setEntryDraft({ ...entryDraft, name: event.target.value })}
              error={entryError}
              required
            />
            <TextField
              label="Specs"
              value={entryDraft?.specs ?? ''}
              onChange={(event) => setEntryDraft({ ...entryDraft, specs: event.target.value })}
              placeholder="2.1m Height - High-Impact Statement"
            />
            <TextAreaField
              label="Description"
              rows={3}
              value={entryDraft?.desc ?? ''}
              onChange={(event) => setEntryDraft({ ...entryDraft, desc: event.target.value })}
            />
            <ImageField
              label="Variant photo"
              value={
                entryDraft?.image?.src ??
                (typeof entryDraft?.image === 'string' ? entryDraft.image : '')
              }
              onChange={(src) =>
                setEntryDraft({
                  ...entryDraft,
                  image: {
                    ...(entryDraft?.image && typeof entryDraft.image === 'object'
                      ? entryDraft.image
                      : {}),
                    src,
                  },
                })
              }
              alt={entryDraft?.image?.alt ?? ''}
              onAltChange={(event) =>
                setEntryDraft({
                  ...entryDraft,
                  image: {
                    ...(entryDraft?.image && typeof entryDraft.image === 'object'
                      ? entryDraft.image
                      : {}),
                    src:
                      entryDraft?.image?.src ??
                      (typeof entryDraft?.image === 'string' ? entryDraft.image : ''),
                    alt: event.target.value,
                  },
                })
              }
            />
          </>
        )}
      </Modal>
    </ContentFormSection>
  )
}

const PACKAGE_LIST_TABS = [
  { key: 'inclusions', label: 'Inclusions' },
  { key: 'addOns', label: 'Add-ons' },
]

function PackageListsSection({ draft, patch }) {
  const [activeTab, setActiveTab] = useState('inclusions')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [entryDraft, setEntryDraft] = useState('')
  const [entryError, setEntryError] = useState('')
  const tabRefs = useRef({})

  const isAddOns = activeTab === 'addOns'
  const rows = Array.isArray(draft?.[activeTab]) ? draft[activeTab] : []

  const openAdd = () => {
    setEntryDraft('')
    setEditingIndex(null)
    setEntryError('')
    setModalOpen(true)
  }

  const openEdit = (index) => {
    setEntryDraft(rows[index] ?? '')
    setEditingIndex(index)
    setEntryError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingIndex(null)
    setEntryDraft('')
    setEntryError('')
  }

  const saveEntry = () => {
    const text = String(entryDraft ?? '').trim()
    if (!text) {
      setEntryError(
        isAddOns ? 'An add-on description is required.' : 'An inclusion description is required.',
      )
      return
    }
    const next =
      editingIndex == null
        ? [...rows, text]
        : rows.map((entry, entryIndex) => (entryIndex === editingIndex ? text : entry))
    patch({ ...draft, [activeTab]: next })
    closeModal()
  }

  const deleteEntry = (index) => {
    patch({ ...draft, [activeTab]: rows.filter((_, entryIndex) => entryIndex !== index) })
  }

  const moveEntry = (index, delta) => {
    const target = index + delta
    if (target < 0 || target >= rows.length) return
    const next = [...rows]
    const [moved] = next.splice(index, 1)
    next.splice(target, 0, moved)
    patch({ ...draft, [activeTab]: next })
  }

  const focusTab = (key) => {
    setActiveTab(key)
    tabRefs.current[key]?.focus()
  }

  const handleTabKeyDown = (event, index) => {
    let nextIndex = null
    if (event.key === 'ArrowRight') nextIndex = index + 1
    else if (event.key === 'ArrowLeft') nextIndex = index - 1
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = PACKAGE_LIST_TABS.length - 1
    if (nextIndex === null) return
    event.preventDefault()
    const clamped = (nextIndex + PACKAGE_LIST_TABS.length) % PACKAGE_LIST_TABS.length
    focusTab(PACKAGE_LIST_TABS[clamped].key)
  }

  const singular = isAddOns ? 'add-on' : 'inclusion'

  return (
    <ContentFormSection
      title="Inclusions & Add-ons"
      description="What's included in the package price, plus optional extras shown on the pricing card."
    >
      <FilterTabs role="tablist" aria-label="Package lists">
        {PACKAGE_LIST_TABS.map((tab, index) => {
          const isActive = activeTab === tab.key
          const count = Array.isArray(draft?.[tab.key]) ? draft[tab.key].length : 0
          return (
            <FilterTab
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              $active={isActive}
              tabIndex={isActive ? 0 : -1}
              ref={(node) => {
                tabRefs.current[tab.key] = node
              }}
              onClick={() => setActiveTab(tab.key)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {tab.label}
              <FilterTabCount $active={isActive}>{count}</FilterTabCount>
            </FilterTab>
          )
        })}
      </FilterTabs>

      <MediaStack>
        {rows.length === 0 ? (
          <MediaEntryMeta>
            {isAddOns ? 'No add-ons yet.' : 'No inclusions yet.'}
          </MediaEntryMeta>
        ) : (
          rows.map((entry, index) => {
            const title = String(entry || (isAddOns ? 'New add-on' : 'New inclusion'))
            return (
              <MediaEntry key={index}>
                <MediaEntryText>
                  <MediaEntryTitle>{title}</MediaEntryTitle>
                </MediaEntryText>
                <MediaActions>
                  <MoveButton
                    type="button"
                    title="Move up"
                    aria-label={`Move ${title} up`}
                    disabled={index === 0}
                    onClick={() => moveEntry(index, -1)}
                  >
                    <FiChevronUp aria-hidden="true" size={15} />
                  </MoveButton>
                  <MoveButton
                    type="button"
                    title="Move down"
                    aria-label={`Move ${title} down`}
                    disabled={index === rows.length - 1}
                    onClick={() => moveEntry(index, 1)}
                  >
                    <FiChevronDown aria-hidden="true" size={15} />
                  </MoveButton>
                  <MoveButton
                    type="button"
                    title={`Edit ${title}`}
                    aria-label={`Edit ${title}`}
                    onClick={() => openEdit(index)}
                  >
                    <FiEdit2 aria-hidden="true" size={15} />
                  </MoveButton>
                  <MoveButton
                    type="button"
                    $danger
                    title={`Delete ${title}`}
                    aria-label={`Delete ${title}`}
                    onClick={() => deleteEntry(index)}
                  >
                    <FiTrash2 aria-hidden="true" size={15} />
                  </MoveButton>
                </MediaActions>
              </MediaEntry>
            )
          })
        )}
      </MediaStack>

      <MediaAddRow>
        <Button type="button" variant="outline" onClick={openAdd}>
          <FiPlus aria-hidden="true" size={15} />
          {isAddOns ? 'Add add-on' : 'Add inclusion'}
        </Button>
      </MediaAddRow>

      <Modal
        open={modalOpen}
        title={
          editingIndex == null
            ? isAddOns
              ? 'Add add-on'
              : 'Add inclusion'
            : `Edit ${singular}`
        }
        description={
          isAddOns
            ? 'Optional extra shown on the package pricing card.'
            : 'Inclusion shown on the package pricing card.'
        }
        onClose={closeModal}
        footer={
          <>
            <Button type="button" variant="outline" radius="md" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="button" variant="primary" radius="md" onClick={saveEntry}>
              {editingIndex == null
                ? isAddOns
                  ? 'Add add-on'
                  : 'Add inclusion'
                : 'Save changes'}
            </Button>
          </>
        }
      >
        <TextField
          label={isAddOns ? 'Add-on' : 'Inclusion'}
          value={entryDraft ?? ''}
          onChange={(event) => setEntryDraft(event.target.value)}
          placeholder={isAddOns ? 'Additional hour $150' : 'Unlimited photo prints'}
          error={entryError}
          required
        />
      </Modal>
    </ContentFormSection>
  )
}
export default ServiceItemDetail
