import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import ConfirmDialog from '../../../components/admin/ConfirmDialog/index.js'
import ContentDetailHeader from '../../../components/admin/ContentDetailHeader/index.js'
import ContentFormSection from '../../../components/admin/ContentFormSection/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import { TextAreaField, TextField } from '../../../components/FormField/index.js'
import { ErrorText, HelpText } from '../../../components/FormField/FormField.styles.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import Repeater from '../../../components/admin/Repeater/index.js'
import SaveActions from '../../../components/admin/SaveActions/index.js'
import Toast from '../../../components/admin/Toast/index.js'
import ToggleSwitch from '../../../components/admin/ToggleSwitch/index.js'
import Button from '../../../components/Button/index.js'
import { useContent } from '../../../hooks/useContent.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import { deleteImage, isStorageUrl } from '../../../services/storage.js'
import { BlissfulNestPackageForm, PhotoboothPackageForm } from './itemForms.jsx'
import {
  SERVICE_KINDS,
  blankFeaturedItem,
  createServiceDraft,
  deleteService,
  getServiceForEdit,
  serviceEditorPath,
  upsertService,
} from './catalog.js'
import { ServiceCatalogStyles } from './ServiceCatalogPage.styles.js'

const clone = (value) => (value == null ? null : JSON.parse(JSON.stringify(value)))

/**
 * Single service editor. One page per service; the field set adapts to the
 * category (decor sections, photobooth packages, blissful-nest prize
 * options) and edits map back onto the native shapes the public site reads.
 */
function ServiceCatalogPage() {
  const { categoryId, serviceId } = useParams()
  const navigate = useNavigate()
  const { values, savedAt, update, save } = useContent('services')

  const creating = serviceId === 'new'
  const resolved = useMemo(
    () => getServiceForEdit(values, categoryId, serviceId),
    [values, categoryId, serviceId],
  )
  const { collection, kind } = resolved

  const initialDraft = useMemo(() => {
    if (creating) return createServiceDraft(categoryId)
    if (!resolved.record) return null
    const cloned = clone(resolved.record)
    // Decor services always edit their primary item inline; seed one when the
    // section has no featured items so the form never binds to nothing.
    if (kind === SERVICE_KINDS.DECOR && !Array.isArray(cloned.featuredItems)) {
      cloned.featuredItems = []
    }
    return cloned
  }, [creating, resolved, categoryId, kind])

  const [draft, setDraft] = useState(() => clone(initialDraft))
  const [dirty, setDirty] = useState(false)
  const syncedRef = useRef({ resolved, initialDraft, creating })

  useEffect(() => {
    const previous = syncedRef.current
    if (
      previous.resolved !== resolved ||
      previous.initialDraft !== initialDraft ||
      previous.creating !== creating
    ) {
      syncedRef.current = { resolved, initialDraft, creating }
      setDraft(clone(initialDraft))
      setDirty(false)
    }
  }, [resolved, initialDraft, creating])

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

  if (!collection) {
    return (
      <ServiceCatalogStyles.Page>
        <EmptyState
          title="Category not found"
          description="The service category you are trying to edit no longer exists."
          action={
            <Button variant="outline" onClick={() => navigate('/admin/services')}>
              Back to Services
            </Button>
          }
        />
      </ServiceCatalogStyles.Page>
    )
  }

  if (!creating && !resolved.record) {
    return (
      <ServiceCatalogStyles.Page>
        <EmptyState
          title="Service not found"
          description="The service you are trying to edit no longer exists."
          action={
            <Button variant="outline" onClick={() => navigate('/admin/services')}>
              Back to Services
            </Button>
          }
        />
      </ServiceCatalogStyles.Page>
    )
  }

  if (!draft) {
    return (
      <ServiceCatalogStyles.Page>
        <EmptyState title="Loading" description="Preparing service editor." />
      </ServiceCatalogStyles.Page>
    )
  }

  const handleSave = async () => {
    const nextErrors = {}
    if (kind === SERVICE_KINDS.DECOR) {
      if (!draft?.title?.trim()) nextErrors.title = 'A service title is required.'
      if (!draft?.featuredItems?.[0]?.name?.trim()) {
        nextErrors.name = 'A display name is required.'
      }
    } else if (!draft?.name?.trim()) {
      nextErrors.name = 'A service name is required.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return { ok: false }
    setSaving(true)
    const oldRecord = creating ? null : getServiceForEdit(values, categoryId, serviceId).record
    update((current) => upsertService(current, categoryId, draft))
    const result = await save('services')
    setSaving(false)
    if (result?.error) {
      setToast({ tone: 'error', message: result.error.message || "We couldn't save your changes." })
      return { ok: false, message: result.error.message }
    }
    if (oldRecord) {
      const oldUrls = collectUrls(oldRecord)
      const newUrls = collectUrls(draft)
      oldUrls.forEach((url) => {
        if (!newUrls.has(url)) deleteImage(url).catch(() => {})
      })
    }
    setDirty(false)
    setToast({ tone: 'success', message: 'Changes saved successfully.' })
    if (creating) {
      bypass()
      navigate(serviceEditorPath(categoryId, draft.id), { replace: true })
    }
    return { ok: true }
  }

  const handleDelete = async () => {
    setConfirmDelete(false)
    const removed = creating
      ? null
      : getServiceForEdit(values, categoryId, serviceId).record
    update((current) => deleteService(current, categoryId, serviceId))
    const result = await save('services')
    if (result?.error) {
      setToast({ tone: 'error', message: result.error.message || "We couldn't delete the service." })
      return
    }
    if (removed) {
      collectUrls(removed).forEach((url) => deleteImage(url).catch(() => {}))
    }
    bypass()
    navigate('/admin/services')
  }

  const displayName =
    kind === SERVICE_KINDS.DECOR
      ? draft.featuredItems?.[0]?.name || draft.title
      : draft.name

  return (
    <ServiceCatalogStyles.Page>
      <ContentDetailHeader
        backTo="/admin/services"
        backLabel="Back to Services"
        eyebrow={collection?.title ?? 'Services'}
        title={creating ? 'New service' : displayName || 'Untitled service'}
        lastUpdated={savedAt}
      />

      {kind === SERVICE_KINDS.DECOR ? (
        <DecorServiceForm draft={draft} patch={patch} errors={errors} />
      ) : kind === SERVICE_KINDS.PACKAGE ? (
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
      ) : (
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
          {errors.name ? <ErrorText role="alert">{errors.name}</ErrorText> : null}
        </ContentFormSection>
      )}

      <SaveActions
        dirty={dirty}
        saving={saving}
        onCancel={() => navigate('/admin/services')}
        onSave={handleSave}
        onDelete={!creating ? () => setConfirmDelete(true) : undefined}
        deleteLabel="Delete service"
        submitLabel={creating ? 'Add service' : 'Save Changes'}
      />
      <ConfirmDialog
        open={confirmDelete}
        title={`Delete ${displayName || 'this service'}?`}
        description="This will permanently delete this service. This cannot be undone and any stored images will be removed."
        confirmLabel="Delete service"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
      {toast && (
        <Toast visible tone={toast.tone} message={toast.message} position="fixed" />
      )}
      {guard}
    </ServiceCatalogStyles.Page>
  )
}

function DecorServiceForm({ draft, patch, errors }) {
  const items = Array.isArray(draft.featuredItems) ? draft.featuredItems : []
  const primary = items[0] ?? null

  const patchPrimary = (next) => {
    const current = primary ?? blankFeaturedItem(draft.title || 'New service')
    const updated =
      typeof next === 'function' ? next(current) : { ...current, ...next }
    const nextItems = [...items]
    nextItems[0] = updated
    patch({ ...draft, featuredItems: nextItems })
  }

  return (
    <>
      <ContentFormSection
        title="Service details"
        description="How this service appears as a block on the public services page."
      >
        <TextField
          label="Service title"
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
        title="Service card"
        description="The featured card shown inside this service block."
      >
        <TextField
          label="Display name"
          value={primary?.name ?? ''}
          onChange={(event) => patchPrimary({ name: event.target.value })}
          error={errors.name}
        />
        <TextField
          label="Tagline"
          value={primary?.tagline ?? ''}
          onChange={(event) => patchPrimary({ tagline: event.target.value })}
        />
        <TextField
          label="Dimensions"
          value={primary?.dimensions ?? ''}
          onChange={(event) => patchPrimary({ dimensions: event.target.value })}
          placeholder="2m Height x 1m Width"
        />
        <TextAreaField
          label="Card description"
          rows={4}
          value={primary?.description ?? ''}
          onChange={(event) => patchPrimary({ description: event.target.value })}
        />
        <ToggleSwitch
          label="Featured"
          hint="Featured services are highlighted on the public site."
          checked={Boolean(primary?.isFeatured)}
          onChange={(checked) => patchPrimary({ isFeatured: checked })}
        />
        <ImageField
          label="Service photo"
          value={primary?.image?.src ?? (typeof primary?.image === 'string' ? primary.image : '')}
          onChange={(src) =>
            patchPrimary({
              image: {
                ...(primary?.image && typeof primary.image === 'object' ? primary.image : {}),
                src,
              },
            })
          }
          alt={primary?.image?.alt ?? ''}
          onAltChange={(event) =>
            patchPrimary({
              image: {
                ...(primary?.image && typeof primary.image === 'object' ? primary.image : {}),
                src: primary?.image?.src ?? '',
                alt: event.target.value,
              },
            })
          }
        />
        {items.length > 1 ? (
          <HelpText>
            {`This service has ${items.length} featured items — the first is edited here, the rest are kept unchanged when you save.`}
          </HelpText>
        ) : null}
      </ContentFormSection>

      <ContentFormSection
        title="Variants"
        description="Sizes, styles or hire options shown under this service."
      >
        <Repeater
          items={primary?.options ?? []}
          onChange={(options) => patchPrimary({ options })}
          createItem={() => ({ name: 'New variant', specs: '', desc: '', image: { src: '', alt: '' } })}
          addLabel="Add variant"
          itemTitle={(opt) => opt.name || 'New variant'}
          renderItem={(opt, optIndex, { update: patchOpt }) => (
            <>
              <TextField
                label="Variant name"
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
                label="Variant photo"
                value={opt.image?.src ?? (typeof opt.image === 'string' ? opt.image : '')}
                onChange={(src) =>
                  patchOpt({
                    image: {
                      ...(opt.image && typeof opt.image === 'object' ? opt.image : {}),
                      src,
                    },
                  })
                }
                alt={opt.image?.alt ?? ''}
                onAltChange={(event) =>
                  patchOpt({
                    image: {
                      ...(opt.image && typeof opt.image === 'object' ? opt.image : {}),
                      src: opt.image?.src ?? (typeof opt.image === 'string' ? opt.image : ''),
                      alt: event.target.value,
                    },
                  })
                }
              />
            </>
          )}
        />
      </ContentFormSection>

      <ContentFormSection
        title="Gallery"
        description="Supporting photos shown alongside this service."
      >
        <Repeater
          items={primary?.gallery ?? []}
          onChange={(gallery) => patchPrimary({ gallery })}
          createItem={() => ({ src: '', title: '', alt: '' })}
          addLabel="Add photo"
          itemTitle={(g) => g.title || 'New photo'}
          renderItem={(g, gIndex, { update: patchG }) => (
            <>
              <TextField
                label="Photo title"
                value={g.title ?? ''}
                onChange={(event) => patchG({ title: event.target.value })}
              />
              <ImageField
                label="Photo"
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
  )
}

export default ServiceCatalogPage
