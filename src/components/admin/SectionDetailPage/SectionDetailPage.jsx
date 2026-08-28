import { FiPlus } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../Button/index.js'
import ContentCard from '../ContentCard/index.js'
import ContentDetailHeader from '../ContentDetailHeader/index.js'
import ContentFormSection from '../ContentFormSection/index.js'
import ContentList from '../ContentList/index.js'
import EmptyState from '../EmptyState/index.js'
import SaveActions from '../SaveActions/index.js'
import { useContentDetail } from '../../../hooks/useContentDetail.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import { DetailPageShell } from './SectionDetailPage.styles.js'

/**
 * Generic detail page for one section of a content page.
 *
 * `object` / `flatList` sections render the section form; `list` /
 * `collections` sections render the item sub-list with an "Add" action.
 */
function SectionDetailPage({ pageKey, basePath, pageTitle, sections }) {
  const { sectionKey } = useParams()
  const navigate = useNavigate()
  const section = sections.find((entry) => entry.key === sectionKey)

  const { values, savedAt, draft, dirty, patch, saveDraft, discardDraft, exists } =
    useContentDetail(pageKey, { sectionKey })

  const { guard } = useUnsavedGuard({ active: dirty })

  if (!section || !exists) {
    return (
      <DetailPageShell>
        <EmptyState
          icon={<FiPlus aria-hidden="true" />}
          title="Section not found"
          description="This content section does not exist or has not been saved yet."
          action={
            <Button to={basePath} variant="outline">
              Back to {pageTitle}
            </Button>
          }
        />
      </DetailPageShell>
    )
  }

  if (section.type === 'list' || section.type === 'collections') {
    const items = values[section.key] ?? []
    return (
      <DetailPageShell>
        <ContentDetailHeader
          backTo={basePath}
          backLabel={`Back to ${pageTitle}`}
          eyebrow={`${pageTitle} content`}
          title={section.title}
          description={section.description}
          actions={
            <Button to={`${basePath}/${section.key}/new`} variant="primary">
              <FiPlus aria-hidden="true" size={15} />
              Add {section.itemLabel}
            </Button>
          }
        />
        {items.length > 0 ? (
          <ContentList>
            {items.map((item, index) => (
              <ContentCard
                key={item.id ?? index}
                to={`${basePath}/${section.key}/${item.id}`}
                title={section.itemTitle?.(item, values) ?? 'Untitled'}
                description={section.itemDescription?.(item, values)}
                meta={section.itemMeta?.(item, values)}
                status={section.itemStatus?.(item, values)}
                thumbnail={section.itemThumb?.(item, values)}
                lastUpdated={savedAt}
              />
            ))}
          </ContentList>
        ) : (
          <EmptyState
            icon={<FiPlus aria-hidden="true" />}
            title={`No ${section.itemLabel}s yet`}
            description={`Add your first ${section.itemLabel} to get started.`}
            action={
              <Button to={`${basePath}/${section.key}/new`} variant="outline">
                <FiPlus aria-hidden="true" size={15} />
                Add {section.itemLabel}
              </Button>
            }
          />
        )}
        {guard}
      </DetailPageShell>
    )
  }

  const handleSave = async () => {
    const errors = section.validate?.(draft) ?? {}
    if (Object.keys(errors).length > 0) {
      return { ok: false }
    }
    const result = await saveDraft(draft)
    return { ok: result?.ok ?? true, message: result?.message }
  }

  return (
    <DetailPageShell>
      <ContentDetailHeader
        backTo={basePath}
        backLabel={`Back to ${pageTitle}`}
        eyebrow={`${pageTitle} content`}
        title={`Edit ${section.title}`}
        description={section.description}
      />
      <ContentFormSection title={section.title} description={section.description}>
        {section.form({
          value: draft,
          onChange: patch,
          errors: section.validate?.(draft) ?? {},
          values,
        })}
      </ContentFormSection>
      <SaveActions
        dirty={dirty}
        savedAt={savedAt}
        onSave={handleSave}
        onCancel={() => navigate(basePath)}
        onReset={discardDraft}
      />
      {guard}
    </DetailPageShell>
  )
}

export default SectionDetailPage