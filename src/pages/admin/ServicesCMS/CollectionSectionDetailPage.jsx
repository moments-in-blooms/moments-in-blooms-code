import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import ContentDetailHeader from '../../../components/admin/ContentDetailHeader/index.js'
import ContentFormSection from '../../../components/admin/ContentFormSection/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import { TextAreaField, TextField } from '../../../components/FormField/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import Repeater from '../../../components/admin/Repeater/index.js'
import SaveActions from '../../../components/admin/SaveActions/index.js'
import Toast from '../../../components/admin/Toast/index.js'
import Button from '../../../components/Button/index.js'
import { useContent } from '../../../hooks/useContent.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import { isFixedCollectionId } from './fixedCollections.js'
import { CollectionSectionDetailStyles } from './CollectionSectionDetailPage.styles.js'

const clone = (value) => (value == null ? null : JSON.parse(JSON.stringify(value)))

function CollectionSectionDetailPage() {
  const { collectionId, sectionId } = useParams()
  const navigate = useNavigate()
  const { values, savedAt, update, save } = useContent('services')

  const collection = useMemo(
    () => (values.serviceCollections ?? []).find((entry) => entry.id === collectionId),
    [values, collectionId],
  )
  const existing = useMemo(
    () => collection?.sections?.find((entry) => entry.id === sectionId),
    [collection, sectionId],
  )

  const [draft, setDraft] = useState(() => clone(existing ?? null))
  const [dirty, setDirty] = useState(false)
  const syncedRef = useRef({ existing })

  useEffect(() => {
    const previous = syncedRef.current
    if (previous.existing !== existing) {
      syncedRef.current = { existing }
      setDraft(clone(existing ?? null))
      setDirty(false)
    }
  }, [existing])

  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)
  const [saving, setSaving] = useState(false)
  const { guard } = useUnsavedGuard({ active: dirty })

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const patch = (next) => {
    setDraft(next)
    setDirty(true)
  }
  const patchFeatured = (next) => patch({ ...draft, featuredItem: { ...draft.featuredItem, ...next } })

  const backPath = `/admin/services/serviceCollections/${collectionId}`

  const handleSave = async () => {
    const nextErrors = {}
    if (!draft?.title?.trim()) {
      nextErrors.title = 'A section title is required.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 350))
    const nextSections = (collection?.sections ?? []).map((entry) =>
      entry.id === draft.id ? draft : entry,
    )
    const updatedCollections = (values.serviceCollections ?? []).map((entry) =>
      entry.id === collectionId ? { ...entry, sections: nextSections } : entry,
    )
    update((current) => ({ ...current, serviceCollections: updatedCollections }))
    save('services')
    setDirty(false)
    setSaving(false)
    setToast({ tone: 'success', message: 'Changes saved successfully.' })
  }

  // Collection sections are rendered by the fixed Decor Hire catalogue, which
  // only understands the section ids that ship with the page, so sections can
  // be edited here but never created or removed.
  if (!isFixedCollectionId(collectionId)) {
    return <Navigate replace to="/admin/services" />
  }

  if (sectionId === 'new') {
    return <Navigate replace to={backPath} />
  }

  if (!collection || !existing) {
    return (
      <CollectionSectionDetailStyles.Page>
        <EmptyState
          title={collection ? 'Section not found' : 'Collection not found'}
          description={
            collection
              ? 'The section you are trying to edit no longer exists.'
              : 'The collection you are trying to edit no longer exists.'
          }
          action={
            <Button
              variant="outline"
              onClick={() => navigate(collection ? backPath : '/admin/services')}
            >
              {collection ? 'Back to collection' : 'Back to Services'}
            </Button>
          }
        />
      </CollectionSectionDetailStyles.Page>
    )
  }

  return (
    <CollectionSectionDetailStyles.Page>
      <ContentDetailHeader
        backTo={backPath}
        backLabel="Back to collection"
        eyebrow={collection?.title ?? 'Collection'}
        title={draft?.title || 'Untitled section'}
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
        title="Featured item"
        description="The hero product or experience within this section."
      >
        <TextField
          label="Item name"
          value={draft?.featuredItem?.name ?? ''}
          onChange={(event) => patchFeatured({ name: event.target.value })}
        />
        <TextField
          label="Item tagline"
          value={draft?.featuredItem?.tagline ?? ''}
          onChange={(event) => patchFeatured({ tagline: event.target.value })}
        />
        <TextField
          label="Dimensions"
          value={draft?.featuredItem?.dimensions ?? ''}
          onChange={(event) => patchFeatured({ dimensions: event.target.value })}
          placeholder="2m Height x 1m Width"
        />
        <TextAreaField
          label="Item description"
          rows={4}
          value={draft?.featuredItem?.description ?? ''}
          onChange={(event) => patchFeatured({ description: event.target.value })}
        />
        <ImageField
          label="Featured image"
          value={draft?.featuredItem?.image ?? ''}
          onChange={(image) => patchFeatured({ image })}
        />
      </ContentFormSection>
      <ContentFormSection
        title="Options"
        description="The variations or configurations offered within this featured item."
      >
        <Repeater
          items={draft?.featuredItem?.options ?? []}
          onChange={(options) => patchFeatured({ options })}
          createItem={() => ({ name: 'New option', specs: '', desc: '', image: '' })}
          addLabel="Add option"
          itemTitle={(item) => item.name || 'New option'}
          renderItem={(item, index, { update: patchItem }) => (
            <>
              <TextField
                label="Option name"
                value={item.name ?? ''}
                onChange={(event) => patchItem({ name: event.target.value })}
              />
              <TextField
                label="Specs"
                value={item.specs ?? ''}
                onChange={(event) => patchItem({ specs: event.target.value })}
                placeholder="2.1m Height - High-Impact Statement"
              />
              <TextAreaField
                label="Description"
                rows={3}
                value={item.desc ?? ''}
                onChange={(event) => patchItem({ desc: event.target.value })}
              />
              <ImageField
                label="Option image"
                value={item.image ?? ''}
                onChange={(image) => patchItem({ image })}
              />
            </>
          )}
        />
      </ContentFormSection>
      <ContentFormSection
        title="Gallery"
        description="Supporting images shown alongside this section."
      >
        <Repeater
          items={draft?.featuredItem?.gallery ?? []}
          onChange={(gallery) => patchFeatured({ gallery })}
          createItem={() => ({ src: '', title: '' })}
          addLabel="Add image"
          itemTitle={(item) => item.title || 'New image'}
          renderItem={(item, index, { update: patchItem }) => (
            <>
              <TextField
                label="Image title"
                value={item.title ?? ''}
                onChange={(event) => patchItem({ title: event.target.value })}
              />
              <ImageField
                label="Image"
                value={item.src ?? ''}
                onChange={(src) => patchItem({ src })}
              />
            </>
          )}
        />
      </ContentFormSection>
      <SaveActions
        dirty={dirty}
        saving={saving}
        onCancel={() => navigate(backPath)}
        onSave={handleSave}
      />
      {toast && (
        <Toast
          visible
          tone={toast.tone}
          message={toast.message}
        />
      )}
      {guard}
    </CollectionSectionDetailStyles.Page>
  )
}

export default CollectionSectionDetailPage