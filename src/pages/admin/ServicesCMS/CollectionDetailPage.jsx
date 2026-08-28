import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentDetailHeader from '../../../components/admin/ContentDetailHeader/index.js'
import ContentFormSection from '../../../components/admin/ContentFormSection/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import { FieldRow, TextAreaField, TextField } from '../../../components/FormField/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import SaveActions from '../../../components/admin/SaveActions/index.js'
import ToggleSwitch from '../../../components/admin/ToggleSwitch/index.js'
import Toast from '../../../components/admin/Toast/index.js'
import Button from '../../../components/Button/index.js'
import { useContentDetail } from '../../../hooks/useContentDetail.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import { isFixedCollectionId } from './fixedCollections.js'
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
  const { draft, dirty, savedAt, exists, patch, saveDraft } = useContentDetail(
    'services',
    { listKey: 'serviceCollections', itemId: collectionId, initialValue },
  )
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)
  const [saving, setSaving] = useState(false)
  const { guard } = useUnsavedGuard({ active: dirty })

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  // The public Services page only renders the three fixed collections, so any
  // other id — including the "new" creation route — is not editable here.
  if (!isFixedCollectionId(collectionId)) {
    return <Navigate replace to="/admin/services" />
  }

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
  const hasSections = Boolean(collection?.sections?.length)

  const handleSave = async () => {
    const nextErrors = section.validate?.(draft) ?? {}
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 350))
    saveDraft()
    setSaving(false)
    setToast({ tone: 'success', message: 'Changes saved successfully.' })
  }

  return (
    <CollectionDetailStyles.Page>
      <ContentDetailHeader
        backTo="/admin/services"
        backLabel="Back to Services"
        eyebrow="Collections"
        title={collection?.title || 'Untitled collection'}
        status={section.itemStatus?.(collection)}
        lastUpdated={savedAt}
      />
      <ContentFormSection
        title="Collection overview"
        description="How this collection appears in the services navigation and on its page."
      >
        <TextField
          label="Type"
          value={collection?.type ?? 'collection'}
          readOnly
          hint="Set by the Services page layout — this collection type cannot be changed."
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
      {hasSections && (
        <ContentList
          title={`Sections within ${collection?.title ?? 'this collection'}`}
          description="Click a section to review and update its featured item and gallery."
        >
          {collection.sections.map((entry, index) => (
            <ContentCard
              key={entry.id ?? index}
              to={`/admin/services/serviceCollections/${collection.id}/sections/${entry.id}`}
              title={entry.title}
              description={entry.description}
              meta={[entry.subtitle, entry.featuredItem?.name].filter(Boolean)}
              lastUpdated={savedAt}
            />
          ))}
        </ContentList>
      )}
      {!hasSections && managedBy && (
        <ContentFormSection
          title="Collection sections"
          description={managedBy.note}
        >
          <EmptyState
            title="Managed separately"
            description="This collection does not use collection sections — its content lives in dedicated page sections."
            action={managedBy.links.map((link) => (
              <Button key={link.to} variant="outline" as={Link} to={link.to}>
                {link.label}
              </Button>
            ))}
          />
        </ContentFormSection>
      )}
      <SaveActions
        dirty={dirty}
        saving={saving}
        onCancel={() => navigate('/admin/services')}
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
    </CollectionDetailStyles.Page>
  )
}

export default CollectionDetailPage