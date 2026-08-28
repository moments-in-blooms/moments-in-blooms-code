import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import ConfirmDialog from '../../../components/admin/ConfirmDialog/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentDetailHeader from '../../../components/admin/ContentDetailHeader/index.js'
import ContentFormSection from '../../../components/admin/ContentFormSection/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import { FieldRow, SelectField, TextAreaField, TextField } from '../../../components/FormField/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import SaveActions from '../../../components/admin/SaveActions/index.js'
import ToggleSwitch from '../../../components/admin/ToggleSwitch/index.js'
import Toast from '../../../components/admin/Toast/index.js'
import Button from '../../../components/Button/index.js'
import { useContent } from '../../../hooks/useContent.js'
import { useContentDetail } from '../../../hooks/useContentDetail.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import { deleteImage, isStorageUrl } from '../../../services/storage.js'
import { servicesSections } from './sections.jsx'
import { CollectionDetailStyles } from './CollectionDetailPage.styles.js'

const managedElsewhere = {
  'luxe-photobooth': {
    note: 'The packages and highlights for this collection are managed in their own page sections.',
    links: [
      { label: 'Photobooth packages', to: '/admin/services/photoboothPackages' },
      { label: 'Photobooth highlights', to: '/admin/services/photoboothHighlights' },
    ],
  },
  'blissful-nest': {
    note: 'The introduction and prize options for this collection are managed in their own page sections.',
    links: [
      { label: 'Blissful Nest introduction', to: '/admin/services/blissfulNestIntro' },
      { label: 'Blissful Nest prize options', to: '/admin/services/blissfulNestPackages' },
    ],
  },
}

function CollectionDetailPage({ itemId }) {
  const params = useParams()
  const collectionId = params.collectionId ?? itemId
  const navigate = useNavigate()
  const section = servicesSections.find((entry) => entry.key === 'serviceCollections')
  const initialValue = useMemo(() => section.createInitial?.(), [section])
  const { draft, dirty, savedAt, exists, patch, saveDraft, removeItem, creating } = useContentDetail(
    'services',
    { listKey: 'serviceCollections', itemId: collectionId, initialValue },
  )
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmSectionDeleteId, setConfirmSectionDeleteId] = useState(null)
  const { guard, bypass } = useUnsavedGuard({ active: dirty })
  const { values: contentValues, update, save } = useContent('services')

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  if (!exists) {
    return (
      <CollectionDetailStyles.Page>
        <EmptyState
          title="Collection not found"
          description="This collection is missing from the saved Services content."
          action={
            <Button variant="outline" onClick={() => navigate('/admin/services')}>
              Back to Services
            </Button>
          }
        />
      </CollectionDetailStyles.Page>
    )
  }

  const collection = draft
  const managedBy = collection?.id ? managedElsewhere[collection.id] : undefined
  const sections = Array.isArray(collection?.sections) ? collection.sections : []

  const handleSave = async () => {
    const nextErrors = section.validate?.(draft) ?? {}
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return { ok: false }
    setSaving(true)
    const result = await saveDraft(draft)
    setSaving(false)
    if (result?.ok === false) {
      setToast({ tone: 'error', message: result.message || "We couldn't save your changes." })
      return { ok: false, message: result.message }
    }
    if (creating) {
      bypass()
      navigate(`/admin/services/serviceCollections/${draft.id}`, { replace: true })
    }
    setToast({ tone: 'success', message: 'Changes saved successfully.' })
    return { ok: true }
  }

  const handleDelete = async () => {
    setConfirmDelete(false)
    await removeItem()
    bypass()
    navigate('/admin/services')
  }

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

  const handleDeleteSection = async () => {
    const sectionId = confirmSectionDeleteId
    if (!sectionId) return
    const target = sections.find((s) => s.id === sectionId)
    setConfirmSectionDeleteId(null)
    // If draft is dirty, apply to draft; otherwise update content directly with immediate save
    if (dirty) {
      patch((prev) => ({ ...prev, sections: (prev.sections ?? []).filter((s) => s.id !== sectionId) }))
      setToast({ tone: 'success', message: 'Section removed — save to confirm.' })
      return
    }
    const nextSections = (contentValues.serviceCollections ?? [])
      .find((c) => c.id === collectionId)?.sections?.filter((s) => s.id !== sectionId) ?? []
    const updatedCollections = (contentValues.serviceCollections ?? []).map((entry) =>
      entry.id === collectionId ? { ...entry, sections: nextSections } : entry,
    )
    update((current) => ({ ...current, serviceCollections: updatedCollections }))
    const result = await save('services')
    if (result?.error) {
      setToast({ tone: 'error', message: result.error.message || "We couldn't delete the section." })
      return
    }
    if (target) {
      const urls = collectUrls(target)
      urls.forEach((url) => deleteImage(url).catch(() => {}))
    }
    setToast({ tone: 'success', message: 'Section deleted.' })
  }

  const getAddLabel = (col) => {
    const title = (col?.title || '').toLowerCase()
    const id = col?.id || ''
    if (id === 'decor-hire' || title.includes('decor')) return 'Add Collection'
    if (id === 'luxe-photobooth' || title.includes('luxe') || title.includes('booth') || title.includes('photo')) return 'Add Booth'
    if (id === 'blissful-nest' || title.includes('blissful') || title.includes('nest') || col?.type === 'sub-brand') return 'Add Category'
    return 'Add Collection'
  }
  const addLabel = getAddLabel(collection)

  const sectionsCount = sections.length
  const itemsCount = sections.reduce((acc, s) => {
    const fi = Array.isArray(s.featuredItems) ? s.featuredItems.length : s.featuredItem ? 1 : 0
    const opts = Array.isArray(s.featuredItems)
      ? s.featuredItems.reduce((a, fi2) => a + (fi2.options?.length ?? 0), 0)
      : s.featuredItem?.options?.length ?? 0
    return acc + fi + opts
  }, 0)

  return (
    <CollectionDetailStyles.Page>
      <ContentDetailHeader
        backTo="/admin/services"
        backLabel="Back to Services"
        eyebrow="Collections"
        title={creating ? 'New collection' : collection?.title || 'Untitled collection'}
        status={section.itemStatus?.(collection)}
        lastUpdated={savedAt}
      />
      <ContentFormSection
        title="Collection overview"
        description="How this collection appears in the services navigation and on its page."
      >
        <SelectField
          label="Type"
          value={collection?.type ?? 'collection'}
          onChange={(event) => patch((prev) => ({ ...prev, type: event.target.value }))}
          options={['collection', 'sub-brand']}
          hint="Collection is a service category; sub-brand is e.g. Blissful Nest."
        />
        <TextField
          label="Title"
          value={collection?.title ?? ''}
          onChange={(event) => patch((prev) => ({ ...prev, title: event.target.value }))}
          error={errors.title}
        />
        <FieldRow>
          <TextField
            label="Navigation subtitle"
            value={collection?.navSub ?? ''}
            onChange={(event) => patch((prev) => ({ ...prev, navSub: event.target.value }))}
          />
          <TextField
            label="Navigation meta"
            value={collection?.navMeta ?? ''}
            onChange={(event) => patch((prev) => ({ ...prev, navMeta: event.target.value }))}
            placeholder="4 Collections"
          />
        </FieldRow>
        <TextAreaField
          label="Description"
          rows={4}
          value={collection?.description ?? ''}
          onChange={(event) => patch((prev) => ({ ...prev, description: event.target.value }))}
        />
        <TextField
          label="Tagline"
          value={collection?.tagline ?? ''}
          onChange={(event) => patch((prev) => ({ ...prev, tagline: event.target.value }))}
        />
        <ToggleSwitch
          label="Featured"
          hint="Adds a Featured badge to this collection inside the admin content lists."
          checked={Boolean(collection?.featured)}
          onChange={(checked) => patch((prev) => ({ ...prev, featured: checked }))}
        />
        <ImageField
          label="Cover image"
          value={collection?.coverImage?.src ?? ''}
          onChange={(src) => patch((prev) => ({ ...prev, coverImage: { ...(prev.coverImage ?? {}), src } }))}
          alt={collection?.coverImage?.alt ?? ''}
          onAltChange={(event) =>
            patch((prev) => ({ ...prev, coverImage: { ...(prev.coverImage ?? {}), alt: event.target.value } }))
          }
        />
      </ContentFormSection>
      <ContentFormSection
        title="Collection sections"
        description={
          managedBy
            ? `${managedBy.note} You can also add custom sections below.`
            : 'Add sections to this collection — each section can hold multiple featured items with images and options.'
        }
      >
        {managedBy ? (
          <EmptyState
            title="Managed separately"
            description="This collection has dedicated page sections for its primary content."
            action={managedBy.links.map((link) => (
              <Button key={link.to} variant="outline" as={Link} to={link.to}>
                {link.label}
              </Button>
            ))}
          />
        ) : null}
      </ContentFormSection>

      <ContentList
        title={`Sections within ${collection?.title ?? 'this collection'}`}
        description="Click a section to review and update its featured items and gallery."
        emptyState={
          <EmptyState
            title="No sections yet"
            description="Add your first section to this collection."
            action={
              creating ? null : (
                <Button to={`/admin/services/serviceCollections/${collection.id}/sections/new`} variant="outline">
                  <FiPlus aria-hidden="true" size={15} />
                  {addLabel}
                </Button>
              )
            }
          />
        }
      >
        {sections.map((entry, index) => {
          const featuredCount = Array.isArray(entry.featuredItems)
            ? entry.featuredItems.length
            : entry.featuredItem
              ? 1
              : 0
          return (
            <div key={entry.id ?? index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <ContentCard
                  to={`/admin/services/serviceCollections/${collection.id}/sections/${entry.id}`}
                  title={entry.title || 'Untitled section'}
                  description={entry.description}
                  meta={[entry.subtitle, `${featuredCount} featured item${featuredCount !== 1 ? 's' : ''}`].filter(Boolean)}
                  lastUpdated={savedAt}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                radius="md"
                aria-label={`Delete ${entry.title || 'section'}`}
                onClick={() => setConfirmSectionDeleteId(entry.id)}
                title="Delete section"
              >
                <FiTrash2 aria-hidden="true" size={16} />
              </Button>
            </div>
          )
        })}
      </ContentList>
      {!creating ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button to={`/admin/services/serviceCollections/${collection.id}/sections/new`} variant="outline">
            <FiPlus aria-hidden="true" size={15} />
            {addLabel}
          </Button>
        </div>
      ) : null}
      <SaveActions
        dirty={dirty}
        saving={saving}
        onCancel={() => navigate('/admin/services')}
        onSave={handleSave}
        onDelete={!creating ? () => setConfirmDelete(true) : undefined}
        deleteLabel="Delete collection"
        submitLabel={creating ? 'Create collection' : 'Save Changes'}
      />
      <ConfirmDialog
        open={confirmDelete}
        title={`Delete ${collection?.title || 'this collection'}?`}
        description={
          sectionsCount > 0
            ? `This will permanently delete this collection and its ${sectionsCount} section${sectionsCount !== 1 ? 's' : ''}${itemsCount > 0 ? ` and ${itemsCount} nested item${itemsCount !== 1 ? 's' : ''}` : ''}. This cannot be undone and any stored images will be removed.`
            : 'This will permanently delete this collection. This cannot be undone.'
        }
        confirmLabel="Delete collection"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
      <ConfirmDialog
        open={Boolean(confirmSectionDeleteId)}
        title={`Delete ${sections.find((s) => s.id === confirmSectionDeleteId)?.title || 'this section'}?`}
        description="This will permanently delete this section and its featured items. This cannot be undone."
        confirmLabel="Delete section"
        cancelLabel="Cancel"
        onConfirm={handleDeleteSection}
        onCancel={() => setConfirmSectionDeleteId(null)}
      />
      {toast && (
        <Toast
          visible
          tone={toast.tone}
          message={toast.message}
          position="fixed"
        />
      )}
      {guard}
    </CollectionDetailStyles.Page>
  )
}

export default CollectionDetailPage