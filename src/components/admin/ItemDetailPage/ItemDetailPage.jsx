import { useEffect, useMemo, useState } from 'react'
import { FiAlertTriangle, FiPlus } from 'react-icons/fi'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from '../../Button/index.js'
import ConfirmDialog from '../ConfirmDialog/index.js'
import ContentDetailHeader from '../ContentDetailHeader/index.js'
import ContentFormSection from '../ContentFormSection/index.js'
import EmptyState from '../EmptyState/index.js'
import SaveActions from '../SaveActions/index.js'
import { useContentDetail } from '../../../hooks/useContentDetail.js'
import { showSuccess } from '../../../utils/sweetAlert.js'
import { useContent } from '../../../hooks/useContent.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import { DetailPageShell } from './ItemDetailPage.styles.js'

/**
 * Generic detail page for one item inside a list section. Handles viewing,
 * editing, creating (`itemId === "new"`) and deleting list items.
 */
function ItemDetailPage({ pageKey, basePath, pageTitle, sections }) {
  const { sectionKey, itemId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const section = sections.find((entry) => entry.key === sectionKey)

  useEffect(() => {
    if (location.state?.mibSaved) {
      showSuccess('Created', 'Changes saved successfully.')
    }
  }, [location.state?.mibSaved])

  const { values } = useContent(pageKey)
  const initialValue = useMemo(
    () => (itemId === 'new' ? section?.createInitial?.(values) : undefined),
    [itemId, section, values],
  )

  const {
    draft,
    dirty,
    savedAt,
    creating,
    exists,
    patch,
    saveDraft,
    discardDraft,
    removeItem,
  } = useContentDetail(pageKey, {
    listKey: sectionKey,
    itemId,
    initialValue,
  })

  const [confirmDelete, setConfirmDelete] = useState(false)
  const { guard, bypass } = useUnsavedGuard({ active: dirty })

  if (!section || (section.type !== 'list' && section.type !== 'collections')) {
    return <Navigate replace to={basePath} />
  }

  if (section.type === 'collections' && section.collectionDetail) {
    const CollectionDetail = section.collectionDetail
    return (
      <CollectionDetail
        pageKey={pageKey}
        basePath={basePath}
        pageTitle={pageTitle}
        section={section}
        itemId={itemId}
      />
    )
  }

  if (!exists) {
    return (
      <DetailPageShell>
        <EmptyState
          icon={<FiPlus aria-hidden="true" />}
          title="Item not found"
          description="This item does not exist or has been removed."
          action={
            <Button to={`${basePath}/${sectionKey}`} variant="outline">
              Back to {section.title}
            </Button>
          }
        />
      </DetailPageShell>
    )
  }

  const errors = section.validate?.(draft) ?? {}

  const handleSave = async () => {
    if (Object.keys(errors).length > 0) {
      return { ok: false }
    }
    const result = await saveDraft(draft)
    if (result?.ok && creating) {
      bypass()
      navigate(`${basePath}/${sectionKey}/${draft.id}`, {
        state: { mibSaved: true },
      })
    }
    return { ok: result?.ok ?? true, message: result?.message }
  }

  const handleDelete = () => {
    setConfirmDelete(false)
    removeItem()
    showSuccess('Deleted', `${section.itemLabel} deleted.`)
    navigate(`${basePath}/${sectionKey}`)
  }

  const title = creating
    ? `New ${section.itemLabel}`
    : section.itemTitle?.(draft, values) || 'Untitled'

  const itemForm = section.itemForm({
    value: draft,
    onChange: patch,
    errors,
    values,
  })

  return (
    <DetailPageShell>
      <ContentDetailHeader
        backTo={`${basePath}/${sectionKey}`}
        backLabel={`Back to ${section.title}`}
        eyebrow={`${pageTitle} · ${section.title}`}
        title={title}
        description={
          creating
            ? `Create a new ${section.itemLabel} for the ${section.title} section.`
            : section.itemDescription?.(draft, values)
        }
        status={section.itemStatus?.(draft, values)}
        meta={section.itemMeta?.(draft, values)}
      />
      <ContentFormSection
        title={section.itemLabel}
        description={
          creating
            ? `Fill in the details for this new ${section.itemLabel}.`
            : section.description
        }
      >
        {itemForm}
      </ContentFormSection>
      <SaveActions
        dirty={dirty}
        savedAt={savedAt}
        onSave={handleSave}
        onCancel={() => navigate(`${basePath}/${sectionKey}`)}
        onReset={discardDraft}
        submitLabel={creating ? `Create ${section.itemLabel}` : 'Save Changes'}
      />
      {!creating ? (
        <div>
          <Button type="button" variant="ghost" onClick={() => setConfirmDelete(true)}>
            <FiAlertTriangle aria-hidden="true" size={15} />
            Delete {section.itemLabel}
          </Button>
        </div>
      ) : null}
      <ConfirmDialog
        open={confirmDelete}
        title={`Delete ${title}?`}
        description={`This removes the ${section.itemLabel} permanently. This cannot be undone.`}
        confirmLabel={`Delete ${section.itemLabel}`}
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
      {guard}
    </DetailPageShell>
  )
}

export default ItemDetailPage