import { FiChevronDown, FiChevronUp, FiEdit2, FiExternalLink, FiRotateCcw, FiTrash2 } from 'react-icons/fi'
import ContentStatus from '../../../components/admin/ContentStatus/index.js'
import Button from '../../../components/Button/index.js'
import {
  FaqActionButton,
  FaqActionDanger,
  FaqActionLink,
  FaqCard,
  FaqCardActions,
  FaqCardMain,
  FaqCardAnswerPreview,
  FaqCardMeta,
  FaqCardSide,
  FaqCardTitle,
  FaqCardTitleRow,
  FaqListSkeleton,
  FaqLoadError,
  FaqLoadErrorMessage,
  FaqSkeletonBar,
  FaqCardSkeleton,
} from './FAQsCMS.styles.js'

export function FaqStatus({ row }) {
  if (row.deleted_at) {
    return <ContentStatus status="inactive" label="Archived" tone="danger" />
  }
  return row.is_published ? (
    <ContentStatus status="published" />
  ) : (
    <ContentStatus status="inactive" label="Unpublished" />
  )
}

export function FaqRow({ faq, categoryName, categorySlug, first, last, busy, onMove, onDelete, onRestore }) {
  const label = faq.question || 'Untitled question'
  const archived = Boolean(faq.deleted_at)
  const previewHref = categorySlug ? `/faqs?category=${categorySlug}#${faq.id}` : '/faqs'
  return (
    <FaqCard>
      <FaqCardMain>
        <FaqCardTitleRow>
          <FaqCardTitle to={`/admin/faqs/content/items/${faq.id}`}>
            {label}
          </FaqCardTitle>
          <FaqStatus row={faq} />
        </FaqCardTitleRow>
        <FaqCardAnswerPreview>
          {faq.answer || 'No answer yet'}
        </FaqCardAnswerPreview>
        <FaqCardMeta>
          {categoryName} · Order {faq.display_order ?? 0}
        </FaqCardMeta>
      </FaqCardMain>
      <FaqCardSide>
        <FaqCardActions>
          {!archived ? (
            <>
              <FaqActionButton
                type="button"
                title="Move up"
                aria-label={`Move ${label} up`}
                disabled={busy || first}
                onClick={() => onMove(faq, -1)}
              >
                <FiChevronUp aria-hidden="true" size={16} />
              </FaqActionButton>
              <FaqActionButton
                type="button"
                title="Move down"
                aria-label={`Move ${label} down`}
                disabled={busy || last}
                onClick={() => onMove(faq, 1)}
              >
                <FiChevronDown aria-hidden="true" size={16} />
              </FaqActionButton>
            </>
          ) : (
            <FaqActionButton
              type="button"
              title="Restore FAQ"
              aria-label={`Restore ${label}`}
              disabled={busy}
              onClick={() => onRestore(faq)}
            >
              <FiRotateCcw aria-hidden="true" size={15} />
            </FaqActionButton>
          )}
          <FaqActionLink
            to={`/admin/faqs/content/items/${faq.id}`}
            title="Edit FAQ"
            aria-label={`Edit ${label}`}
          >
            <FiEdit2 aria-hidden="true" size={15} />
          </FaqActionLink>
          <a
            href={previewHref}
            target="_blank"
            rel="noreferrer"
            title="View on site"
            aria-label={`View ${label} on site`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2rem',
              height: '2rem',
              borderRadius: '0.5rem',
              color: '#6E6761',
              textDecoration: 'none',
            }}
          >
            <FiExternalLink aria-hidden="true" size={15} />
          </a>
          <FaqActionDanger
            type="button"
            title="Archive FAQ"
            aria-label={`Archive ${label}`}
            disabled={busy || archived}
            onClick={() => onDelete(faq)}
          >
            <FiTrash2 aria-hidden="true" size={15} />
          </FaqActionDanger>
        </FaqCardActions>
      </FaqCardSide>
    </FaqCard>
  )
}

export function CategoryRow({ category, count, first, last, busy, onMove, onDelete, onRestore }) {
  const label = category.name || 'Unnamed category'
  const archived = Boolean(category.deleted_at)
  return (
    <FaqCard>
      <FaqCardMain>
        <FaqCardTitleRow>
          <FaqCardTitle to={`/admin/faqs/content/categories/${category.id}`}>
            {label}
          </FaqCardTitle>
          <FaqStatus row={category} />
        </FaqCardTitleRow>
        {category.description ? (
          <FaqCardMeta>{category.description}</FaqCardMeta>
        ) : null}
        <FaqCardMeta>
          {count} FAQ{count === 1 ? '' : 's'} · /{category.slug}
        </FaqCardMeta>
      </FaqCardMain>
      <FaqCardSide>
        <FaqCardActions>
          {!archived ? (
            <>
              <FaqActionButton
                type="button"
                title="Move up"
                aria-label={`Move ${label} up`}
                disabled={busy || first}
                onClick={() => onMove(category, -1)}
              >
                <FiChevronUp aria-hidden="true" size={16} />
              </FaqActionButton>
              <FaqActionButton
                type="button"
                title="Move down"
                aria-label={`Move ${label} down`}
                disabled={busy || last}
                onClick={() => onMove(category, 1)}
              >
                <FiChevronDown aria-hidden="true" size={16} />
              </FaqActionButton>
            </>
          ) : (
            <FaqActionButton
              type="button"
              title="Restore category"
              aria-label={`Restore ${label}`}
              disabled={busy}
              onClick={() => onRestore(category)}
            >
              <FiRotateCcw aria-hidden="true" size={15} />
            </FaqActionButton>
          )}
          <FaqActionLink
            to={`/admin/faqs/content/categories/${category.id}`}
            title="Edit category"
            aria-label={`Edit ${label}`}
          >
            <FiEdit2 aria-hidden="true" size={15} />
          </FaqActionLink>
          <FaqActionDanger
            type="button"
            title="Delete category"
            aria-label={`Delete ${label}`}
            disabled={busy || archived}
            onClick={() => onDelete(category)}
          >
            <FiTrash2 aria-hidden="true" size={15} />
          </FaqActionDanger>
        </FaqCardActions>
      </FaqCardSide>
    </FaqCard>
  )
}

export function FaqListSkeletonRows({ rows = 3 }) {
  return (
    <FaqListSkeleton>
      {Array.from({ length: rows }, (_, index) => (
        <FaqCardSkeleton key={index}>
          <FaqSkeletonBar $width="70%" />
          <FaqSkeletonBar $width="40%" />
        </FaqCardSkeleton>
      ))}
    </FaqListSkeleton>
  )
}

export function FaqDetailSkeleton() {
  return (
    <FaqCardSkeleton>
      <FaqSkeletonBar $width="30%" />
      <FaqSkeletonBar $width="60%" />
      <FaqSkeletonBar $width="45%" />
      <FaqSkeletonBar $width="75%" />
    </FaqCardSkeleton>
  )
}

export function FaqErrorState({ onRetry }) {
  return (
    <FaqLoadError>
      <FaqLoadErrorMessage>
        We couldn't load the FAQ content right now.
      </FaqLoadErrorMessage>
      <Button type="button" variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </FaqLoadError>
  )
}