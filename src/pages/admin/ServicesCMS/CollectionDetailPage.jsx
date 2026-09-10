import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
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
import {
  listCategoryServices,
  newServicePath,
  serviceEditorPath,
} from './catalog.js'
import { servicesSections } from './sections.jsx'
import { CollectionDetailStyles } from './CollectionDetailPage.styles.js'

/**
 * Category settings: overview fields for one service category plus its
 * service list. Individual services are added/edited in the service
 * catalog editor — this page never edits them inline.
 */
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
  const { guard, bypass } = useUnsavedGuard({ active: dirty })
  const { values: contentValues } = useContent('services')

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  if (!exists) {
    return (
      <CollectionDetailStyles.Page>
        <EmptyState
          title="Category not found"
          description="This category is missing from the saved Services content."
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
  // Show live draft sections for decor categories; packages read from saved
  // content (they are edited in the service catalog editor).
  const serviceEntries = listCategoryServices(contentValues, collection, collection?.sections)

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

  const servicesCount = serviceEntries.length

  return (
    <CollectionDetailStyles.Page>
      <ContentDetailHeader
        backTo="/admin/services"
        backLabel="Back to Services"
        eyebrow="Categories"
        title={creating ? 'New category' : collection?.title || 'Untitled category'}
        status={section.itemStatus?.(collection)}
        lastUpdated={savedAt}
      />
      <ContentFormSection
        title="Category overview"
        description="How this category appears in the services navigation and on its page."
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
          hint="Adds a Featured badge to this category inside the admin content lists."
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

      {!creating ? (
        <ContentList
          title={`Services in ${collection?.title ?? 'this category'}`}
          description="Open a service to edit it, or add a new one."
          emptyState={
            <EmptyState
              title="No services yet"
              description={`Add the first service in ${collection?.title ?? 'this category'}.`}
              action={
                <Button to={newServicePath(collection.id)} variant="outline">
                  <FiPlus aria-hidden="true" size={15} />
                  Add service
                </Button>
              }
            />
          }
        >
          {serviceEntries.map((entry) => (
            <ContentCard
              key={entry.id}
              to={serviceEditorPath(collection.id, entry.id)}
              title={entry.title}
              description={entry.description}
              meta={entry.meta}
              status={entry.featured ? 'featured' : undefined}
              thumbnail={entry.imageSrc ? { src: entry.imageSrc, alt: entry.imageAlt } : undefined}
              lastUpdated={savedAt}
            />
          ))}
        </ContentList>
      ) : null}
      {!creating ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button to={newServicePath(collection.id)} variant="outline">
            <FiPlus aria-hidden="true" size={15} />
            Add service
          </Button>
        </div>
      ) : null}
      <SaveActions
        dirty={dirty}
        saving={saving}
        onCancel={() => navigate('/admin/services')}
        onSave={handleSave}
        onDelete={!creating ? () => setConfirmDelete(true) : undefined}
        deleteLabel="Delete category"
        submitLabel={creating ? 'Create category' : 'Save Changes'}
      />
      <ConfirmDialog
        open={confirmDelete}
        title={`Delete ${collection?.title || 'this category'}?`}
        description={
          servicesCount > 0
            ? `This will permanently delete this category and its ${servicesCount} service${servicesCount !== 1 ? 's' : ''}. This cannot be undone and any stored images will be removed.`
            : 'This will permanently delete this category. This cannot be undone.'
        }
        confirmLabel="Delete category"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
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
