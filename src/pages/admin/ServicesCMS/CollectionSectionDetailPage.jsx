import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import ConfirmDialog from '../../../components/admin/ConfirmDialog/index.js'
import ContentDetailHeader from '../../../components/admin/ContentDetailHeader/index.js'
import ContentFormSection from '../../../components/admin/ContentFormSection/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import { TextAreaField, TextField } from '../../../components/FormField/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import Repeater from '../../../components/admin/Repeater/index.js'
import SaveActions from '../../../components/admin/SaveActions/index.js'
import Toast from '../../../components/admin/Toast/index.js'
import ToggleSwitch from '../../../components/admin/ToggleSwitch/index.js'
import Button from '../../../components/Button/index.js'
import { useContent } from '../../../hooks/useContent.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import { deleteImage, isStorageUrl } from '../../../services/storage.js'
import { CollectionSectionDetailStyles } from './CollectionSectionDetailPage.styles.js'

const clone = (value) => (value == null ? null : JSON.parse(JSON.stringify(value)))

const normalizeImage = (value) => {
  if (typeof value === 'string') return { src: value, alt: '' }
  if (value && typeof value === 'object' && typeof value.src === 'string') return { src: value.src, alt: value.alt ?? '' }
  return value
}

const createNewSection = () => ({
  id: `section-${Date.now()}`,
  title: 'New section',
  subtitle: '',
  description: '',
  featuredItems: [],
  // keep legacy featuredItem undefined; adapter will handle
})

const createNewFeaturedItem = () => ({
  id: `featured-${Date.now()}`,
  name: 'New item',
  tagline: '',
  dimensions: '',
  description: '',
  isFeatured: true,
  image: { src: '', alt: '' },
  options: [],
  gallery: [],
})

function CollectionSectionDetailPage() {
  const { collectionId, sectionId } = useParams()
  const navigate = useNavigate()
  const { values, savedAt, update, save } = useContent('services')

  const collection = useMemo(
    () => (values.serviceCollections ?? []).find((entry) => entry.id === collectionId),
    [values, collectionId],
  )
  const creating = sectionId === 'new'
  const existing = useMemo(
    () => (creating ? null : collection?.sections?.find((entry) => entry.id === sectionId)),
    [collection, sectionId, creating],
  )

  const initialDraft = useMemo(() => {
    if (creating) return createNewSection()
    if (existing) {
      const cloned = clone(existing)
      // ensure featuredItems array exists via adapter fallback
      if (!Array.isArray(cloned.featuredItems)) {
        if (cloned.featuredItem) {
          cloned.featuredItems = [clone(cloned.featuredItem)]
          // normalize legacy image strings
          cloned.featuredItems = cloned.featuredItems.map((fi) => ({
            ...fi,
            image: normalizeImage(fi.image),
            options: Array.isArray(fi.options) ? fi.options.map((o) => ({ ...o, image: normalizeImage(o.image) })) : fi.options,
            gallery: fi.gallery,
          }))
        } else {
          cloned.featuredItems = []
        }
      } else {
        cloned.featuredItems = cloned.featuredItems.map((fi) => ({
          ...fi,
          image: normalizeImage(fi.image),
          options: Array.isArray(fi.options) ? fi.options.map((o) => ({ ...o, image: normalizeImage(o.image) })) : fi.options,
        }))
      }
      return cloned
    }
    return null
  }, [creating, existing])

  const [draft, setDraft] = useState(() => clone(initialDraft))
  const [dirty, setDirty] = useState(false)
  const syncedRef = useRef({ existing, initialDraft, creating })

  useEffect(() => {
    const previous = syncedRef.current
    if (previous.existing !== existing || previous.initialDraft !== initialDraft || previous.creating !== creating) {
      syncedRef.current = { existing, initialDraft, creating }
      setDraft(clone(initialDraft))
      setDirty(false)
    }
  }, [existing, initialDraft, creating])

  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { guard, bypass } = useUnsavedGuard({ active: dirty })

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const patch = (next) => {
    setDraft(next)
    setDirty(true)
  }

  const backPath = `/admin/services/serviceCollections/${collectionId}`

  const collectUrls = (value, acc = new Set()) => {
    if (!value) return acc
    if (typeof value === 'string') {
      if (isStorageUrl(value)) acc.add(value)
      return acc
    }
    if (Array.isArray(value)) {
      value.forEach((entry) => collectUrls(entry, acc))
      return acc
    }
    if (typeof value === 'object') {
      Object.values(value).forEach((entry) => collectUrls(entry, acc))
    }
    return acc
  }

  const handleSave = async () => {
    const nextErrors = {}
    if (!draft?.title?.trim()) {
      nextErrors.title = 'A section title is required.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return { ok: false }
    setSaving(true)
    // keep legacy featuredItem in sync with first featuredItem for backward public render
    const toSave = { ...draft }
    if (Array.isArray(toSave.featuredItems) && toSave.featuredItems.length > 0) {
      toSave.featuredItem = toSave.featuredItems[0]
    } else if (toSave.featuredItems?.length === 0) {
      // keep featuredItem undefined if no items
      delete toSave.featuredItem
    }
    let nextSections
    if (creating) {
      nextSections = [...(collection?.sections ?? []), toSave]
    } else {
      nextSections = (collection?.sections ?? []).map((entry) => (entry.id === toSave.id ? toSave : entry))
    }
    const oldSection = existing
    const newSection = toSave
    const updatedCollections = (values.serviceCollections ?? []).map((entry) =>
      entry.id === collectionId ? { ...entry, sections: nextSections } : entry,
    )
    update((current) => ({ ...current, serviceCollections: updatedCollections }))
    const result = await save('services')
    setSaving(false)
    if (result?.error) {
      setToast({ tone: 'error', message: result.error.message || "We couldn't save your changes." })
      return { ok: false, message: result.error.message }
    }
    // storage cleanup for replaced images
    if (oldSection && newSection) {
      const oldUrls = collectUrls(oldSection)
      const newUrls = collectUrls(newSection)
      oldUrls.forEach((url) => {
        if (!newUrls.has(url)) deleteImage(url).catch(() => {})
      })
    }
    setDirty(false)
    setToast({ tone: 'success', message: 'Changes saved successfully.' })
    if (creating) {
      bypass()
      navigate(`/admin/services/serviceCollections/${collectionId}/sections/${toSave.id}`, { replace: true })
    }
    return { ok: true }
  }

  const handleDelete = async () => {
    setConfirmDelete(false)
    const nextSections = (collection?.sections ?? []).filter((entry) => entry.id !== sectionId)
    const oldSection = existing
    const updatedCollections = (values.serviceCollections ?? []).map((entry) =>
      entry.id === collectionId ? { ...entry, sections: nextSections } : entry,
    )
    update((current) => ({ ...current, serviceCollections: updatedCollections }))
    const result = await save('services')
    if (result?.error) {
      setToast({ tone: 'error', message: result.error.message || "We couldn't delete the section." })
      return
    }
    if (oldSection) {
      const oldUrls = collectUrls(oldSection)
      oldUrls.forEach((url) => deleteImage(url).catch(() => {}))
    }
    bypass()
    navigate(backPath)
  }

  if (!collection) {
    return (
      <CollectionSectionDetailStyles.Page>
        <EmptyState
          title="Collection not found"
          description="The collection you are trying to edit no longer exists."
          action={
            <Button variant="outline" onClick={() => navigate('/admin/services')}>
              Back to Services
            </Button>
          }
        />
      </CollectionSectionDetailStyles.Page>
    )
  }

  if (!creating && !existing) {
    return (
      <CollectionSectionDetailStyles.Page>
        <EmptyState
          title="Section not found"
          description="The section you are trying to edit no longer exists."
          action={
            <Button variant="outline" onClick={() => navigate(backPath)}>
              Back to collection
            </Button>
          }
        />
      </CollectionSectionDetailStyles.Page>
    )
  }

  if (!draft) {
    return (
      <CollectionSectionDetailStyles.Page>
        <EmptyState title="Loading" description="Preparing section editor." />
      </CollectionSectionDetailStyles.Page>
    )
  }

  const featuredItems = Array.isArray(draft.featuredItems) ? draft.featuredItems : []

  return (
    <CollectionSectionDetailStyles.Page>
      <ContentDetailHeader
        backTo={backPath}
        backLabel="Back to collection"
        eyebrow={collection?.title ?? 'Collection'}
        title={creating ? 'New section' : draft?.title || 'Untitled section'}
        lastUpdated={savedAt}
      />
      <ContentFormSection
        title="Section details"
        description="The title and intro for this collection section."
      >
        <TextField
          label="Title"
          value={draft?.title ?? ''}
          onChange={(event) => patch({ ...draft, title: event.target.value })}
          error={errors.title}
        />
        <TextField
          label="Subtitle"
          value={draft?.subtitle ?? ''}
          onChange={(event) => patch({ ...draft, subtitle: event.target.value })}
        />
        <TextAreaField
          label="Description"
          rows={4}
          value={draft?.description ?? ''}
          onChange={(event) => patch({ ...draft, description: event.target.value })}
        />
      </ContentFormSection>

      <ContentFormSection
        title="Featured items"
        description="Each featured item is a hero product within this section. Multiple items can be marked featured — only featured items are highlighted on the public site."
      >
        <Repeater
          items={featuredItems}
          onChange={(nextItems) => patch({ ...draft, featuredItems: nextItems })}
          createItem={createNewFeaturedItem}
          addLabel="Add featured item"
          itemTitle={(item) => item.name || 'New item'}
          renderItem={(item, index, { update: patchItem }) => (
            <>
              <TextField
                label="Item name"
                value={item.name ?? ''}
                onChange={(event) => patchItem({ name: event.target.value })}
              />
              <TextField
                label="Item tagline"
                value={item.tagline ?? ''}
                onChange={(event) => patchItem({ tagline: event.target.value })}
              />
              <TextField
                label="Dimensions"
                value={item.dimensions ?? ''}
                onChange={(event) => patchItem({ dimensions: event.target.value })}
                placeholder="2m Height x 1m Width"
              />
              <TextAreaField
                label="Item description"
                rows={4}
                value={item.description ?? ''}
                onChange={(event) => patchItem({ description: event.target.value })}
              />
              <ToggleSwitch
                label="Featured"
                hint="Featured items are highlighted on the public site. You can feature multiple items at once."
                checked={Boolean(item.isFeatured)}
                onChange={(checked) => patchItem({ isFeatured: checked })}
              />
              <ImageField
                label="Featured image"
                value={item.image?.src ?? (typeof item.image === 'string' ? item.image : '')}
                onChange={(src) => patchItem({ image: { ...(item.image && typeof item.image === 'object' ? item.image : {}), src } })}
                alt={item.image?.alt ?? ''}
                onAltChange={(event) => patchItem({ image: { ...(item.image && typeof item.image === 'object' ? item.image : {}), src: item.image?.src ?? '', alt: event.target.value } })}
              />
              <ContentFormSection
                title="Options"
                description="Variations offered within this featured item."
              >
                <Repeater
                  items={item.options ?? []}
                  onChange={(options) => patchItem({ options })}
                  createItem={() => ({ name: 'New option', specs: '', desc: '', image: { src: '', alt: '' } })}
                  addLabel="Add option"
                  itemTitle={(opt) => opt.name || 'New option'}
                  renderItem={(opt, optIndex, { update: patchOpt }) => (
                    <>
                      <TextField
                        label="Option name"
                        value={opt.name ?? ''}
                        onChange={(event) => patchOpt({ name: event.target.value })}
                      />
                      <TextField
                        label="Specs"
                        value={opt.specs ?? ''}
                        onChange={(event) => patchOpt({ specs: event.target.value })}
                        placeholder="2.1m Height - High-Impact Statement"
                      />
                      <TextAreaField
                        label="Description"
                        rows={3}
                        value={opt.desc ?? ''}
                        onChange={(event) => patchOpt({ desc: event.target.value })}
                      />
                      <ImageField
                        label="Option image"
                        value={opt.image?.src ?? (typeof opt.image === 'string' ? opt.image : '')}
                        onChange={(src) => patchOpt({ image: { ...(opt.image && typeof opt.image === 'object' ? opt.image : {}), src } })}
                        alt={opt.image?.alt ?? ''}
                        onAltChange={(event) => patchOpt({ image: { ...(opt.image && typeof opt.image === 'object' ? opt.image : {}), src: opt.image?.src ?? (typeof opt.image === 'string' ? opt.image : ''), alt: event.target.value } })}
                      />
                    </>
                  )}
                />
              </ContentFormSection>
              <ContentFormSection
                title="Gallery"
                description="Supporting images shown alongside this featured item."
              >
                <Repeater
                  items={item.gallery ?? []}
                  onChange={(gallery) => patchItem({ gallery })}
                  createItem={() => ({ src: '', title: '', alt: '' })}
                  addLabel="Add image"
                  itemTitle={(g) => g.title || 'New image'}
                  renderItem={(g, gIndex, { update: patchG }) => (
                    <>
                      <TextField
                        label="Image title"
                        value={g.title ?? ''}
                        onChange={(event) => patchG({ title: event.target.value })}
                      />
                      <ImageField
                        label="Image"
                        value={g.src ?? ''}
                        onChange={(src) => patchG({ src })}
                        alt={g.alt ?? ''}
                        onAltChange={(event) => patchG({ alt: event.target.value })}
                      />
                    </>
                  )}
                />
              </ContentFormSection>
            </>
          )}
        />
      </ContentFormSection>

      <SaveActions
        dirty={dirty}
        saving={saving}
        onCancel={() => navigate(backPath)}
        onSave={handleSave}
        onDelete={!creating ? () => setConfirmDelete(true) : undefined}
        deleteLabel="Delete section"
        submitLabel={creating ? 'Create section' : 'Save Changes'}
      />
      <ConfirmDialog
        open={confirmDelete}
        title={`Delete ${draft?.title || 'this section'}?`}
        description={`This will permanently delete this section and its ${featuredItems.length} featured item${featuredItems.length !== 1 ? 's' : ''}. This cannot be undone.`}
        confirmLabel="Delete section"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
      {toast && <Toast visible tone={toast.tone} message={toast.message} position="fixed" />}
      {guard}
    </CollectionSectionDetailStyles.Page>
  )
}

export default CollectionSectionDetailPage
