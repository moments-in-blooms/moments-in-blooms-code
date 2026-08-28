import { useState } from 'react'
import {
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiInfo,
  FiRotateCcw,
  FiTrash2,
  FiX,
} from 'react-icons/fi'
import Button from '../../Button/index.js'
import { formatSavedAt } from '../../../utils/formatDate.js'
import { showError as showSwalError, showSuccess } from '../../../utils/sweetAlert.js'
import {
  SaveActionsError,
  SaveActionsRow,
  SaveBarDeleteZone,
  SaveBarShell,
  SaveStatus,
} from './SaveActions.styles.js'

const MIN_SAVING_MS = 350

function SaveActions({
  dirty = false,
  savedAt,
  saving: savingProp,
  onSave,
  onCancel,
  onReset,
  onDelete,
  deleteLabel = 'Delete',
  submitLabel = 'Save Changes',
  cancelLabel = 'Cancel',
  resetLabel = 'Discard',
  successMessage = 'Changes saved successfully.',
}) {
  const [saving, setSaving] = useState(false)
  const [inlineError, setInlineError] = useState(null)

  const handleSave = async () => {
    if (!dirty || saving || savingProp) return
    setSaving(true)
    setInlineError(null)
    const startedAt = Date.now()
    let result
    try {
      result = (await onSave()) ?? { ok: true }
    } catch {
      result = { ok: false }
    }
    const elapsed = Date.now() - startedAt
    if (elapsed < MIN_SAVING_MS) {
      await new Promise((resolve) => window.setTimeout(resolve, MIN_SAVING_MS - elapsed))
    }
    setSaving(false)
    if (result.ok) {
      showSuccess('Saved', successMessage)
    } else {
      const message =
        result.message ??
        'Unable to save changes. Please review the highlighted fields.'
      setInlineError(message)
      showSwalError('Save failed', message)
    }
  }

  const handleReset = () => {
    setInlineError(null)
    onReset?.()
    showSuccess('Discarded', 'Changes discarded.')
  }

  const isSaving = saving || savingProp

  return (
    <SaveBarShell>
      {onDelete ? (
        <SaveBarDeleteZone>
          <Button
            type="button"
            variant="ghost"
            radius="md"
            disabled={isSaving}
            onClick={onDelete}
            aria-label={deleteLabel}
            title={deleteLabel}
          >
            <FiTrash2 aria-hidden="true" size={16} />
            <span className="btn-label">{deleteLabel}</span>
          </Button>
        </SaveBarDeleteZone>
      ) : null}
      <div>
        <SaveStatus $dirty={dirty} role="status" aria-live="polite">
          {dirty ? (
            <>
              <span className="status-dot" aria-hidden="true" />
              <span className="status-label">Unsaved changes</span>
            </>
          ) : savedAt ? (
            <>
              <FiCheckCircle aria-hidden="true" size={15} />
              <span className="status-label">Saved {formatSavedAt(savedAt)}</span>
            </>
          ) : (
            <>
              <FiInfo aria-hidden="true" size={15} />
              <span className="status-label">No changes yet</span>
            </>
          )}
        </SaveStatus>
        {inlineError ? (
          <SaveActionsError role="alert">
            <FiAlertCircle aria-hidden="true" size={15} />
            {inlineError}
          </SaveActionsError>
        ) : null}
      </div>
      <SaveActionsRow>
        {onReset ? (
          <Button
            type="button"
            variant="ghost"
            radius="md"
            disabled={!dirty || isSaving}
            onClick={handleReset}
            aria-label={resetLabel}
            title={resetLabel}
          >
            <FiRotateCcw aria-hidden="true" size={16} />
            <span className="btn-label">{resetLabel}</span>
          </Button>
        ) : null}
        {onCancel ? (
          <Button
            type="button"
            variant="outline"
            radius="md"
            disabled={isSaving}
            onClick={onCancel}
            aria-label={cancelLabel}
            title={cancelLabel}
          >
            <FiX aria-hidden="true" size={16} />
            <span className="btn-label">{cancelLabel}</span>
          </Button>
        ) : null}
        <Button
          type="button"
          variant="primary"
          radius="md"
          disabled={!dirty || isSaving}
          loading={isSaving}
          onClick={handleSave}
          aria-busy={isSaving}
          aria-label={isSaving ? 'Saving' : submitLabel}
          title={isSaving ? 'Saving' : submitLabel}
        >
          <FiCheck aria-hidden="true" size={16} />
          <span className="btn-label">{isSaving ? 'Saving…' : submitLabel}</span>
        </Button>
      </SaveActionsRow>
    </SaveBarShell>
  )
}

export default SaveActions