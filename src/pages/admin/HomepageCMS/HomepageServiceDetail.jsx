import { useEffect, useMemo, useRef, useState } from 'react'
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
import { SelectField, TextAreaField, TextField } from '../../../components/FormField/index.js'
import { CATALOG_TERMS, FIELD_TERMS } from '../../../constants/adminTerms.js'
import { useContent } from '../../../hooks/useContent.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import { findServiceOverride } from '../../../services/homepageCards.js'
import { deleteImage, isStorageUrl } from '../../../services/storage.js'
import { showError, showSuccess } from '../../../utils/sweetAlert.js'
import {
  categoryCounts,
  categoryPath,
  collectStorageUrls,
  getCategory,
  listCategories,
  moveCategoryChildren,
  removeCategory,
} from '../ServicesCMS/catalog.js'
import { HomepageCMSPage } from './HomepageCMS.styles.js'

const SERVICES_PATH = '/admin/homepage/services'

const clone = (value) => (value == null ? null : JSON.parse(JSON.stringify(value)))

const blankOverride = (categoryId) => ({
  id: String(categoryId),
  collectionId: String(categoryId),
  eyebrow: '',
  title: '',
  description: '',
  image: { src: '', alt: '' },
})

/** Identity keys of a stored override (its own id and/or its category link). */
const storedKeys = (stored) =>
  new Set([stored?.id, stored?.collectionId].filter(Boolean).map((key) => String(key)))

function HomepageServiceDetail() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const home = useContent('homepage')
  const services = useContent('services')

  const categories = listCategories(services.values)
  const category = getCategory(services.values, itemId)
  const overrides = Array.isArray(home.values.services) ? home.values.services : []
  const stored = category ? findServiceOverride(overrides, categories, category) : null

  const initialDraft = useMemo(() => {
    if (!category) return null
    return stored ? clone(stored) : blankOverride(category.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, home.values, services.values])

  const [draft, setDraft] = useState(() => clone(initialDraft))
  const [dirty, setDirty] = useState(false)
  const syncedRef = useRef({ initialDraft })

  useEffect(() => {
    // Never clobber unsaved edits: an upstream values change (mount fetch
    // settling, realtime event) while the form is dirty leaves the draft
    // alone. It re-syncs on the next settled change after save/discard.
    if (!dirty && syncedRef.current.initialDraft !== initialDraft) {
      syncedRef.current = { initialDraft }
      setDraft(clone(initialDraft))
      setDirty(false)
    }
  }, [initialDraft, dirty])

  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [reassignOpen, setReassignOpen] = useState(false)
  const [subcategoryTargetId, setSubcategoryTargetId] = useState('')
  const [itemTargetValue, setItemTargetValue] = useState('')
  const { guard, bypass } = useUnsavedGuard({ active: dirty })

  if (!category) {
    const orphan = overrides.find(
      (entry) => entry && typeof entry === 'object' && String(entry.collectionId || entry.id || '') === String(itemId),
    )
    return (
      <HomepageCMSPage>
        <EmptyState
          title="Category not found"
          description={
            orphan
              ? 'This homepage entry no longer matches a service category, so it does not appear on the website.'
              : 'This service category is missing from the saved Services content.'
          }
          action={
            orphan ? (
              <Button
                variant="danger"
                onClick={async () => {
                  const orphanKey = String(orphan.collectionId || orphan.id || '')
                  home.update((current) => ({
                    ...current,
                    services: (current.services ?? []).filter(
                      (entry) => String(entry?.collectionId || entry?.id || '') !== orphanKey,
                    ),
                  }))
                  const result = await home.save('homepage')
                  if (result?.error) {
                    showError('Delete failed', result.error.message || "We couldn't delete this entry.")
                    return
                  }
                  bypass()
                  navigate(SERVICES_PATH)
                }}
              >
                Delete unlinked entry
              </Button>
            ) : (
              <Button variant="outline" onClick={() => navigate(SERVICES_PATH)}>
                Back to Services
              </Button>
            )
          }
        />
      </HomepageCMSPage>
    )
  }

  if (!draft) {
    return (
      <HomepageCMSPage>
        <EmptyState title="Loading" description="Preparing service editor." />
      </HomepageCMSPage>
    )
  }

  const patch = (next) => {
    setDraft(typeof next === 'function' ? next(draft) : next)
    setDirty(true)
  }

  const counts = categoryCounts(category)
  const otherCategories = categories.filter((entry) => String(entry?.id) !== String(category.id))

  const itemTargetOptions = otherCategories.flatMap((entry) => [
    { value: String(entry.id), label: `${entry.title || 'Untitled'} › ${CATALOG_TERMS.noSubcategory.label}` },
    ...(Array.isArray(entry.subcategories) ? entry.subcategories : []).map((sub) => ({
      value: `${entry.id}/${sub.id}`,
      label: `${entry.title || 'Untitled'} › ${sub.title || 'Untitled'}`,
    })),
  ])

  const parseItemTarget = (value) => {
    if (!value) return null
    const [targetCategoryId, targetSubcategoryId] = String(value).split('/')
    if (!targetCategoryId) return null
    return { categoryId: targetCategoryId, subcategoryId: targetSubcategoryId ?? null }
  }

  const persistOverride = async (toSave) => {
    const keys = stored ? storedKeys(stored) : new Set()
    home.update((current) => {
      const items = Array.isArray(current.services) ? current.services : []
      const exists = stored && items.some((entry) => keys.has(String(entry?.id)) || keys.has(String(entry?.collectionId)))
      const nextItems = exists
        ? items.map((entry) =>
            keys.has(String(entry?.id)) || keys.has(String(entry?.collectionId)) ? toSave : entry,
          )
        : [...items, toSave]
      return { ...current, services: nextItems }
    })
    return home.save('homepage')
  }

  const handleSave = async () => {
    const toSave = {
      ...draft,
      id: stored?.id ?? draft?.id ?? category.id,
      collectionId: category.id,
    }
    setSaving(true)
    const oldRecord = stored ? clone(stored) : null
    const result = await persistOverride(toSave)
    setSaving(false)
    if (result?.error) {
      return { ok: false, message: result.error.message }
    }
    const oldSrc = oldRecord?.image?.src
    const newSrc = toSave.image?.src
    if (oldSrc && oldSrc !== newSrc && isStorageUrl(oldSrc)) {
      deleteImage(oldSrc).catch(() => {})
    }
    setDraft(clone(toSave))
    setDirty(false)
    showSuccess('Saved', 'Homepage card updated.')
    return { ok: true }
  }

  const cleanupRemoved = (oldCategory, oldOverride) => {
    if (oldCategory) {
      collectStorageUrls(oldCategory).forEach((url) => deleteImage(url).catch(() => {}))
    }
    if (oldOverride?.image?.src && isStorageUrl(oldOverride.image.src)) {
      deleteImage(oldOverride.image.src).catch(() => {})
    }
  }

  const handleDeleteConfirm = async ({ move } = {}) => {
    setConfirmDelete(false)
    setReassignOpen(false)
    const oldCategory = getCategory(services.values, itemId)
    const oldOverride = stored ? clone(stored) : null
    services.update((current) => {
      let next = current
      if (move) {
        next = moveCategoryChildren(current, itemId, move)
      }
      return removeCategory(next, itemId)
    })
    const servicesResult = await services.save('services')
    if (servicesResult?.error) {
      showError('Delete failed', servicesResult.error.message || "We couldn't delete the category.")
      return
    }
    if (oldOverride) {
      const keys = storedKeys(oldOverride)
      home.update((current) => ({
        ...current,
        services: (current.services ?? []).filter(
          (entry) => !keys.has(String(entry?.id)) && !keys.has(String(entry?.collectionId)),
        ),
      }))
      const homeResult = await home.save('homepage')
      if (homeResult?.error) {
        showError(
          'Partial delete',
          'The category was deleted, but the homepage entry could not be removed. Please try again.',
        )
        return
      }
    }
    cleanupRemoved(oldCategory, oldOverride)
    bypass()
    navigate(SERVICES_PATH)
  }

  const handleDeleteRequest = () => {
    if (counts.subcategories > 0 || counts.directItems > 0) {
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
    <HomepageCMSPage>
      <ContentDetailHeader
        backTo={SERVICES_PATH}
        backLabel="Back to Services"
        eyebrow="Homepage · Services"
        title={draft.title?.trim() || category.title || 'Untitled service'}
        lastUpdated={home.savedAt}
      />

      <ContentFormSection
        title="Homepage display"
        description="How this service appears as a card on the homepage. Blank fields fall back to the category’s own title, description and cover image."
      >
        <TextField
          label={FIELD_TERMS.linkedCategory.label}
          value={category.title || 'Untitled category'}
          readOnly
          hint={FIELD_TERMS.linkedCategory.hint}
        />
        <TextField
          label={FIELD_TERMS.eyebrow.label}
          hint={FIELD_TERMS.eyebrow.hint}
          value={draft.eyebrow ?? ''}
          onChange={(event) => patch({ ...draft, eyebrow: event.target.value })}
          placeholder="01 · Atmosphere"
        />
        <TextField
          label="Title"
          value={draft.title ?? ''}
          onChange={(event) => patch({ ...draft, title: event.target.value })}
          placeholder={category.title ?? ''}
        />
        <TextAreaField
          label="Description"
          rows={4}
          value={draft.description ?? ''}
          onChange={(event) => patch({ ...draft, description: event.target.value })}
          placeholder={category.description ?? ''}
        />
        <ToggleSwitch
          label={FIELD_TERMS.offsetLayout.label}
          hint={FIELD_TERMS.offsetLayout.hint}
          checked={Boolean(draft.offset)}
          onChange={(offset) => patch({ ...draft, offset })}
        />
        <ImageField
          label={FIELD_TERMS.cardImage.label}
          value={draft.image?.src ?? ''}
          onChange={(src) =>
            patch({ ...draft, image: { ...(draft.image ?? {}), src } })
          }
          alt={draft.image?.alt ?? ''}
          onAltChange={(event) =>
            patch({
              ...draft,
              image: { ...(draft.image ?? {}), alt: event.target.value },
            })
          }
        />
      </ContentFormSection>

      <SaveActions
        dirty={dirty}
        saving={saving}
        onCancel={() => navigate(SERVICES_PATH)}
        onSave={handleSave}
        onDelete={handleDeleteRequest}
        deleteLabel="Delete service"
        submitLabel="Save Changes"
      />

      <div>
        <Button to={categoryPath(category.id)} variant="outline" size="small">
          Manage category content
        </Button>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title={`Delete ${draft.title?.trim() || category.title || 'this service'}?`}
        description="This removes the homepage card and permanently deletes the service category. This cannot be undone and any stored images will be removed."
        confirmLabel="Delete service"
        cancelLabel="Cancel"
        onConfirm={() => handleDeleteConfirm()}
        onCancel={() => setConfirmDelete(false)}
      />

      <Modal
        open={reassignOpen}
        title={`Delete ${draft.title?.trim() || category.title || 'this service'}?`}
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
              Move &amp; delete service
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
    </HomepageCMSPage>
  )
}

export default HomepageServiceDetail
