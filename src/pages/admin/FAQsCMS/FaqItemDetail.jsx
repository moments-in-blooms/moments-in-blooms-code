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
  SelectField,
  TextAreaField,
  TextField,
} from '../../../components/FormField/index.js'
import ToggleSwitch from '../../../components/admin/ToggleSwitch/index.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import {
  archiveFaq,
  createFaq,
  fetchFaqsAdmin,
  restoreFaq,
  updateFaq,
} from '../../../services/faqs.js'
import {
  FaqArchivedBanner,
  FaqFormGrid,
  FaqInfoNotice,
  FaqLoadError,
  FaqLoadErrorMessage,
} from './FAQsCMS.styles.js'
import { FaqDetailSkeleton } from './FaqListParts.jsx'
import { DetailPageShell } from '../../../components/admin/ItemDetailPage/ItemDetailPage.styles.js'

const isActive = (row) => !row.deleted_at

function FaqItemDetail() {
  const { faqId } = useParams()
  const navigate = useNavigate()
  const creating = faqId === 'new' || faqId === undefined

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
    () => data?.faqs.find((faq) => faq.id === faqId),
    [data, faqId],
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
            question: '',
            answer: '',
            category_id: data.categories.find(isActive)?.id ?? '',
            display_order:
              Math.max(0, ...data.faqs.map((faq) => faq.display_order ?? 0)) + 1,
            is_published: true,
          }
        : existing
          ? {
              question: existing.question,
              answer: existing.answer,
              category_id: existing.category_id,
              display_order: existing.display_order,
              is_published: existing.is_published,
            }
          : null
      setDraft(nextDraft)
      setDirty(false)
    }
  }, [data, creating, existing, faqId])

  const patch = (updater) => {
    setDraft((current) =>
      typeof updater === 'function' ? updater(current) : updater,
    )
    setDirty(true)
  }

  const resetDraft = () => {
    if (creating) {
      setDraft({
        question: '',
        answer: '',
        category_id: data.categories.find(isActive)?.id ?? '',
        display_order:
          Math.max(0, ...data.faqs.map((faq) => faq.display_order ?? 0)) + 1,
        is_published: true,
      })
    } else if (existing) {
      setDraft({
        question: existing.question,
        answer: existing.answer,
        category_id: existing.category_id,
        display_order: existing.display_order,
        is_published: existing.is_published,
      })
    }
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
          title="FAQ not found"
          description="This question does not exist or has been removed."
          action={
            <Button to="/admin/faqs/content/items" variant="outline">
              Back to FAQ Items
            </Button>
          }
        />
      </DetailPageShell>
    )
  }

  const categoryOptions = data.categories.map((category) => ({
    value: category.id,
    label: category.deleted_at ? `${category.name} (archived)` : category.name,
  }))
  const activeCategories = data.categories.filter(isActive)

  const QUESTION_MAX_LENGTH = 160

  const errors = {}
  if (!draft.question.trim()) {
    errors.question = 'Please enter the FAQ question.'
  } else if (draft.question.trim().length > QUESTION_MAX_LENGTH) {
    errors.question = `Keep the question under ${QUESTION_MAX_LENGTH} characters.`
  }
  if (!draft.answer.trim()) {
    errors.answer = 'Please enter the FAQ answer.'
  }
  if (!draft.category_id) {
    errors.category_id = 'Choose a category.'
  }

  const handleSave = async () => {
    if (Object.keys(errors).length > 0) {
      return { ok: false }
    }
    const result = creating
      ? await createFaq(draft)
      : await updateFaq(faqId, draft)
    if (result.error) {
      return { ok: false, message: result.error.message }
    }
    setSavedAt(new Date().toISOString())
    setDirty(false)
    if (creating) {
      const created = result.data
      setData((current) =>
        current ? { ...current, faqs: [...current.faqs, created] } : current,
      )
      bypass()
      navigate(`/admin/faqs/content/items/${created.id}`, { replace: true })
    }
    return { ok: true }
  }

  const handleDelete = async () => {
    setBusy(true)
    const result = await archiveFaq(faqId)
    setBusy(false)
    setConfirmDelete(false)
    if (result.error) {
      showFeedback(result.error.message, 'error')
      return
    }
    showFeedback('FAQ archived.')
    navigate('/admin/faqs/content/items')
  }

  const handleRestore = async () => {
    setBusy(true)
    const result = await restoreFaq(faqId)
    setBusy(false)
    if (result.error) {
      showFeedback(result.error.message, 'error')
      return
    }
    setReloadKey((key) => key + 1)
    setSavedAt(new Date().toISOString())
    showFeedback('FAQ restored.')
  }

  const archived = Boolean(existing?.deleted_at)

  return (
    <DetailPageShell>
      <ContentDetailHeader
        backTo="/admin/faqs/content/items"
        backLabel="Back to FAQ Items"
        eyebrow="FAQs · FAQ items"
        title={
          creating
            ? 'New FAQ'
            : draft.question || 'Untitled question'
        }
        description={
          creating
            ? 'Create a new question for the FAQ page.'
            : 'Edit the question, answer and publication settings.'
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
        meta={[
          `Order ${draft.display_order ?? 0}`,
          categoryOptions.find((entry) => entry.value === draft.category_id)
            ?.label ?? 'Uncategorised',
        ]}
      />

      {archived ? (
        <FaqArchivedBanner>
          <span>
            This FAQ is archived and hidden from visitors. Restore it to bring
            it back.
          </span>
          <Button
            type="button"
            variant="outline"
            disabled={busy}
            onClick={handleRestore}
          >
            <FiRotateCcw aria-hidden="true" size={14} />
            Restore FAQ
          </Button>
        </FaqArchivedBanner>
      ) : null}

      <ContentFormSection
        title="FAQ details"
        description="The question and answer visitors will read on the FAQ page."
      >
        <FaqFormGrid>
          <TextField
            label="Question"
            value={draft.question}
            onChange={(event) =>
              patch({ ...draft, question: event.target.value })
            }
            placeholder="e.g. How far in advance should we book?"
            error={errors.question}
          />
          <TextAreaField
            label="Answer"
            rows={6}
            value={draft.answer}
            onChange={(event) =>
              patch({ ...draft, answer: event.target.value })
            }
            placeholder="The answer your guests will see…"
            error={errors.answer}
          />
          {activeCategories.length === 0 ? (
            <FaqInfoNotice>
              <span>
                {errors.category_id
                  ? errors.category_id
                  : 'No FAQ categories available yet. Create a category to organise your questions.'}
              </span>
              <Button to="/admin/faqs/content/categories/new" variant="outline">
                Add category
              </Button>
            </FaqInfoNotice>
          ) : (
            <FieldRow>
              <SelectField
                label="Category"
                value={draft.category_id}
                onChange={(event) =>
                  patch({ ...draft, category_id: event.target.value })
                }
                options={categoryOptions}
                placeholder="Select a category"
                hint={errors.category_id}
              />
              <TextField
                label="Display order"
                type="number"
                value={draft.display_order}
                onChange={(event) =>
                  patch({ ...draft, display_order: Number(event.target.value) })
                }
                hint="Lower numbers appear first within the category."
              />
            </FieldRow>
          )}
          <ToggleSwitch
            label="Published"
            hint="Unpublished questions are hidden from visitors."
            checked={draft.is_published}
            onChange={(checked) => patch({ ...draft, is_published: checked })}
          />
        </FaqFormGrid>
      </ContentFormSection>

      <SaveActions
        dirty={dirty}
        savedAt={savedAt}
        onSave={handleSave}
        onCancel={() => navigate('/admin/faqs/content/items')}
        onReset={resetDraft}
        submitLabel={creating ? 'Create FAQ' : 'Save Changes'}
        successMessage="FAQ updated successfully."
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
            Delete FAQ
          </Button>
        </div>
      ) : null}

      <ConfirmDialog
        open={confirmDelete}
        title="Delete FAQ?"
        description="This archives the question and hides it from visitors. You can restore it later."
        confirmLabel="Delete FAQ"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
      <Toast visible={Boolean(feedback)} message={feedback} tone={feedbackTone} />
      {guard}
    </DetailPageShell>
  )
}

export default FaqItemDetail