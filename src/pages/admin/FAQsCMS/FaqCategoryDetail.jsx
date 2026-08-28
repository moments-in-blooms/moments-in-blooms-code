import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiAlertTriangle, FiRotateCcw } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/Button/index.js'
import ConfirmDialog from '../../../components/admin/ConfirmDialog/index.js'
import ContentDetailHeader from '../../../components/admin/ContentDetailHeader/index.js'
import ContentFormSection from '../../../components/admin/ContentFormSection/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import SaveActions from '../../../components/admin/SaveActions/index.js'
import Toast from '../../../components/admin/Toast/index.js'
import {
  FieldRow,
  TextAreaField,
  TextField,
} from '../../../components/FormField/index.js'
import ToggleSwitch from '../../../components/admin/ToggleSwitch/index.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import {
  archiveCategory,
  createCategory,
  fetchFaqsAdmin,
  restoreCategory,
  slugify,
  updateCategory,
} from '../../../services/faqs.js'
import {
  FaqArchivedBanner,
  FaqFormGrid,
  FaqLoadError,
  FaqLoadErrorMessage,
} from './FAQsCMS.styles.js'
import { FaqDetailSkeleton } from './FaqListParts.jsx'
import { DetailPageShell } from '../../../components/admin/ItemDetailPage/ItemDetailPage.styles.js'

const CATEGORY_NAME_MAX_LENGTH = 60

const isActive = (row) => !row.deleted_at

function FaqCategoryDetail() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const creating = categoryId === 'new' || categoryId === undefined

  const [data, setData] = useState(null)
  const [loadError, setLoadError] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [draft, setDraft] = useState(null)
  const [dirty, setDirty] = useState(false)
  const [savedAt, setSavedAt] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [feedbackTone, setFeedbackTone] = useState('success')
  const feedbackTimer = useRef(null)
  const slugEdited = useRef(false)
  const syncedDataRef = useRef({ data: null, creating: null, existing: null })

  const { guard, bypass } = useUnsavedGuard({ active: dirty })

  const showFeedback = useCallback((message, tone = 'success') => {
    setFeedback(message)
    setFeedbackTone(tone)
    if (feedbackTimer.current) {
      window.clearTimeout(feedbackTimer.current)
    }
    feedbackTimer.current = window.setTimeout(() => setFeedback(null), 3200)
  }, [])

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) {
        window.clearTimeout(feedbackTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    fetchFaqsAdmin()
      .then((result) => {
        if (cancelled) return
        if (result.error) {
          setLoadError(true)
          return
        }
        setData(result.data)
      })
      .catch(() => {
        if (!cancelled) setLoadError(true)
      })
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const retry = useCallback(() => {
    setLoadError(false)
    setReloadKey((key) => key + 1)
  }, [])

  const existing = useMemo(
    () => data?.categories.find((category) => category.id === categoryId),
    [data, categoryId],
  )

  useEffect(() => {
    if (data === null) return undefined
    const previous = syncedDataRef.current
    if (
      previous.data !== data ||
      previous.creating !== creating ||
      previous.existing !== existing
    ) {
      syncedDataRef.current = { data, creating, existing }
      const nextDraft = creating
        ? {
            name: '',
            slug: '',
            description: '',
            display_order:
              Math.max(
                0,
                ...data.categories.map((category) => category.display_order ?? 0),
              ) + 1,
            is_published: true,
          }
        : existing
          ? {
              name: existing.name,
              slug: existing.slug,
              description: existing.description ?? '',
              display_order: existing.display_order,
              is_published: existing.is_published,
            }
          : null
      setDraft(nextDraft)
      slugEdited.current = false
      setDirty(false)
    }
  }, [data, creating, existing, categoryId])

  const patch = (updater) => {
    setDraft((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      return next
    })
    setDirty(true)
  }

  const handleNameChange = (name) => {
    patch((current) => ({
      ...current,
      name,
      slug: slugEdited.current ? current.slug : slugify(name),
    }))
  }

  const resetDraft = () => {
    if (creating) {
      setDraft({
        name: '',
        slug: '',
        description: '',
        display_order:
          Math.max(0, ...data.categories.map((category) => category.display_order ?? 0)) + 1,
        is_published: true,
      })
    } else if (existing) {
      setDraft({
        name: existing.name,
        slug: existing.slug,
        description: existing.description ?? '',
        display_order: existing.display_order,
        is_published: existing.is_published,
      })
    }
    slugEdited.current = false
    setDirty(false)
  }

  if (loadError) {
    return (
      <DetailPageShell>
        <FaqLoadError>
          <FaqLoadErrorMessage>
            We couldn't load the FAQ content right now.
          </FaqLoadErrorMessage>
          <Button type="button" variant="outline" onClick={retry}>
            Try again
          </Button>
        </FaqLoadError>
      </DetailPageShell>
    )
  }

  if (!data || draft === null) {
    return (
      <DetailPageShell>
        <FaqDetailSkeleton />
      </DetailPageShell>
    )
  }

  if (!creating && !existing) {
    return (
      <DetailPageShell>
        <EmptyState
          icon={<FiAlertTriangle aria-hidden="true" />}
          title="Category not found"
          description="This category does not exist or has been removed."
          action={
            <Button to="/admin/faqs/content/categories" variant="outline">
              Back to FAQ Categories
            </Button>
          }
        />
      </DetailPageShell>
    )
  }

  const assignedCount = data.faqs.filter(
    (faq) => faq.category_id === categoryId && isActive(faq),
  ).length

  const nameTaken = data.categories.some(
    (category) =>
      category.id !== categoryId &&
      isActive(category) &&
      category.name.trim().toLowerCase() === draft.name.trim().toLowerCase(),
  )

  const slugTaken = data.categories.some(
    (category) =>
      category.id !== categoryId &&
      isActive(category) &&
      category.slug === draft.slug,
  )

  const errors = {}
  if (!draft.name.trim()) {
    errors.name = 'A category name is required.'
  } else if (draft.name.trim().length > CATEGORY_NAME_MAX_LENGTH) {
    errors.name = `Keep the category name under ${CATEGORY_NAME_MAX_LENGTH} characters.`
  } else if (nameTaken) {
    errors.name = 'Another category already uses this name.'
  }
  if (!draft.slug.trim()) {
    errors.slug = 'A slug is required.'
  } else if (slugTaken) {
    errors.slug = 'Another category already uses this slug.'
  }

  const handleSave = async () => {
    if (Object.keys(errors).length > 0) {
      return { ok: false }
    }
    const result = creating
      ? await createCategory(draft)
      : await updateCategory(categoryId, draft)
    if (result.error) {
      return { ok: false, message: result.error.message }
    }
    setSavedAt(new Date().toISOString())
    setDirty(false)
    slugEdited.current = false
    if (creating) {
      const created = result.data
      setData((current) =>
        current
          ? { ...current, categories: [...current.categories, created] }
          : current,
      )
      bypass()
      navigate(`/admin/faqs/content/categories/${created.id}`, {
        replace: true,
      })
    }
    return { ok: true }
  }

  const handleDelete = async () => {
    setBusy(true)
    const result = await archiveCategory(categoryId)
    setBusy(false)
    setConfirmDelete(false)
    if (result.error) {
      showFeedback(result.error.message, 'error')
      return
    }
    showFeedback('Category archived.')
    navigate('/admin/faqs/content/categories')
  }

  const handleRestore = async () => {
    setBusy(true)
    const result = await restoreCategory(categoryId)
    setBusy(false)
    if (result.error) {
      showFeedback(result.error.message, 'error')
      return
    }
    setReloadKey((key) => key + 1)
    setSavedAt(new Date().toISOString())
    showFeedback('Category restored.')
  }

  const archived = Boolean(existing?.deleted_at)

  return (
    <DetailPageShell>
      <ContentDetailHeader
        backTo="/admin/faqs/content/categories"
        backLabel="Back to FAQ Categories"
        eyebrow="FAQs · FAQ categories"
        title={creating ? 'New category' : draft.name || 'Unnamed category'}
        description={
          creating
            ? 'Create a new group for the FAQ page filter.'
            : 'Edit the category name, slug and publication settings.'
        }
        status={
          archived ? (
            'archived'
          ) : draft.is_published ? (
            'published'
          ) : (
            'inactive'
          )
        }
        statusLabel={
          archived
            ? 'Archived'
            : draft.is_published
              ? 'Published'
              : 'Unpublished'
        }
        statusTone={archived ? 'danger' : undefined}
        meta={[`Order ${draft.display_order ?? 0}`, `${assignedCount} FAQs`]}
      />

      {archived ? (
        <FaqArchivedBanner>
          <span>
            This category is archived and hidden from visitors. Restore it to
            bring it back.
          </span>
          <Button
            type="button"
            variant="outline"
            disabled={busy}
            onClick={handleRestore}
          >
            <FiRotateCcw aria-hidden="true" size={14} />
            Restore category
          </Button>
        </FaqArchivedBanner>
      ) : null}

      <ContentFormSection
        title="Category details"
        description="How this group appears in the filter on the FAQ page."
      >
        <FaqFormGrid>
          <TextField
            label="Category name"
            value={draft.name}
            onChange={(event) => handleNameChange(event.target.value)}
            placeholder="e.g. Booking & availability"
            error={errors.name}
          />
          <TextField
            label="Slug"
            value={draft.slug}
            onChange={(event) => {
              slugEdited.current = true
              patch((current) => ({
                ...current,
                slug: slugify(event.target.value),
              }))
            }}
            placeholder="e.g. booking-availability"
            hint={
              errors.slug
                ? undefined
                : 'Used in the URL. Lowercase letters, numbers and dashes.'
            }
            error={errors.slug}
          />
          <TextAreaField
            label="Description (optional)"
            rows={3}
            value={draft.description}
            onChange={(event) =>
              patch({ ...draft, description: event.target.value })
            }
            placeholder="A short description of what this category covers…"
          />
          <FieldRow>
            <TextField
              label="Display order"
              type="number"
              value={draft.display_order}
              onChange={(event) =>
                patch({ ...draft, display_order: Number(event.target.value) })
              }
              hint="Lower numbers appear first in the filter."
            />
          </FieldRow>
          <ToggleSwitch
            label="Published"
            hint="Unpublished categories are hidden from visitors."
            checked={draft.is_published}
            onChange={(checked) => patch({ ...draft, is_published: checked })}
          />
        </FaqFormGrid>
      </ContentFormSection>

      <SaveActions
        dirty={dirty}
        savedAt={savedAt}
        onSave={handleSave}
        onCancel={() => navigate('/admin/faqs/content/categories')}
        onReset={resetDraft}
        submitLabel={creating ? 'Create category' : 'Save Changes'}
        successMessage="Category updated successfully."
      />

      {!creating && !archived ? (
        <div>
          <Button
            type="button"
            variant="ghost"
            disabled={busy}
            onClick={() => setConfirmDelete(true)}
          >
            <FiAlertTriangle aria-hidden="true" size={15} />
            Delete category
          </Button>
        </div>
      ) : null}

      <ConfirmDialog
        open={confirmDelete}
        title="Delete category?"
        description={
          assignedCount > 0
            ? `This category still has ${assignedCount} FAQ${assignedCount === 1 ? '' : 's'}. Reassign them first — use the category card actions on the FAQs page to move them safely.`
            : 'This archives the category and hides it from visitors. You can restore it later.'
        }
        confirmLabel="Delete category"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
      <Toast visible={Boolean(feedback)} message={feedback} tone={feedbackTone} />
      {guard}
    </DetailPageShell>
  )
}

export default FaqCategoryDetail