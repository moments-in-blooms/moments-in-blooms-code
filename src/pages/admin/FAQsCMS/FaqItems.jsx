import { useCallback, useEffect, useMemo, useState } from 'react'
import { FiArrowLeft, FiHelpCircle, FiPlus, FiTrash2 } from 'react-icons/fi'
import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ConfirmDialog from '../../../components/admin/ConfirmDialog/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import ContentToolbar from '../../../components/admin/ContentToolbar/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import Button from '../../../components/Button/index.js'
import { showError, showSuccess } from '../../../utils/sweetAlert.js'
import { adminPageMeta } from '../../../constants/admin.js'
import {
  deleteFaq,
  deleteFaqs,
  fetchFaqsAdmin,
  restoreFaq,
  setFaqOrder,
} from '../../../services/faqs.js'
import {
  FaqBackLink,
  FAQsCMSPage,
} from './FAQsCMS.styles.js'
import {
  FaqErrorState,
  FaqListSkeletonRows,
  FaqRow,
} from './FaqListParts.jsx'
import { byOrder, isActive } from './faqListUtils.js'

function FaqItems() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [reloadKey, setReloadKey] = useState(0)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [busy, setBusy] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [selectedIds, setSelectedIds] = useState(() => new Set())
  const [bulkConfirm, setBulkConfirm] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchFaqsAdmin()
      .then((result) => {
        if (cancelled) return
        if (result.error) {
          setData(null)
          setStatus('error')
          return
        }
        setData(result.data)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) {
          setData(null)
          setStatus('error')
        }
      })
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const loadData = useCallback(() => {
    setStatus('loading')
    setReloadKey((key) => key + 1)
    setSelectedIds(new Set())
  }, [])

  const categories = useMemo(() => data?.categories ?? [], [data])
  const faqs = data?.faqs ?? []
  const activeCategories = useMemo(() => categories.filter(isActive), [categories])
  const categoryName = useCallback(
    (categoryId) =>
      categories.find((category) => category.id === categoryId)?.name ??
      'Uncategorised',
    [categories],
  )
  const categorySlug = useCallback(
    (categoryId) =>
      categories.find((category) => category.id === categoryId)?.slug ?? null,
    [categories],
  )

  const normalizedSearch = search.trim().toLowerCase()
  const filteredFaqs = faqs.filter((faq) => {
    if (
      normalizedSearch &&
      !`${faq.question ?? ''} ${faq.answer ?? ''}`
        .toLowerCase()
        .includes(normalizedSearch)
    ) {
      return false
    }
    if (categoryFilter && faq.category_id !== categoryFilter) {
      return false
    }
    if (statusFilter === 'published' && (!faq.is_published || faq.deleted_at)) {
      return false
    }
    if (statusFilter === 'unpublished' && (faq.is_published || faq.deleted_at)) {
      return false
    }
    if (statusFilter === 'archived' && !faq.deleted_at) return false
    return true
  })

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredFaqs.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredFaqs.map((f) => f.id)))
    }
  }

  const runOrderSwap = async (first, second) => {
    setBusy(true)
    const [firstResult, secondResult] = await Promise.all([
      setFaqOrder(first.id, second.display_order),
      setFaqOrder(second.id, first.display_order),
    ])
    setBusy(false)
    if (firstResult.error || secondResult.error) {
      showError(
        'Reorder failed',
        firstResult.error?.message ??
          secondResult.error?.message ??
          "We couldn't reorder the items. Please try again.",
      )
      return false
    }
    await loadData()
    return true
  }

  const handleMoveFaq = async (faq, direction) => {
    if (busy) return
    const siblings = faqs
      .filter((entry) => entry.category_id === faq.category_id && isActive(entry))
      .sort(byOrder)
    const index = siblings.findIndex((entry) => entry.id === faq.id)
    const neighbor = siblings[index + direction]
    if (!neighbor) return
    if (await runOrderSwap(faq, neighbor)) {
      showSuccess('Moved', 'FAQ order updated.')
    }
  }

  const handleDeleteFaq = async () => {
    if (!deleteTarget) return
    setBusy(true)
    const result = await deleteFaq(deleteTarget.id)
    setBusy(false)
    setDeleteTarget(null)
    if (result.error) {
      showError('Delete failed', result.error.message)
      return
    }
    await loadData()
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.delete(deleteTarget.id)
      return next
    })
    showSuccess('Deleted', 'FAQ deleted permanently.')
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    setBusy(true)
    const ids = [...selectedIds]
    const result = await deleteFaqs(ids)
    setBusy(false)
    setBulkConfirm(false)
    if (result.error) {
      showError('Delete failed', result.error.message)
      return
    }
    await loadData()
    setSelectedIds(new Set())
    showSuccess('Deleted', `${ids.length} FAQs deleted permanently.`)
  }

  const handleRestoreFaq = async (faq) => {
    if (busy) return
    setBusy(true)
    const result = await restoreFaq(faq.id)
    setBusy(false)
    if (result.error) {
      showError('Restore failed', result.error.message)
      return
    }
    await loadData()
    showSuccess('Restored', 'FAQ restored.')
  }

  return (
    <FAQsCMSPage>
      <FaqBackLink to="/admin/faqs/content">
        <FiArrowLeft aria-hidden="true" size={14} />
        FAQ Content
      </FaqBackLink>

      <AdminPageHeader
        {...adminPageMeta.faqsItems}
        actions={
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {selectedIds.size > 0 ? (
              <Button variant="danger" onClick={() => setBulkConfirm(true)} disabled={busy}>
                <FiTrash2 aria-hidden="true" size={15} />
                Delete {selectedIds.size}
              </Button>
            ) : null}
            <Button to="/admin/faqs/content/items/new" variant="primary">
              <FiPlus aria-hidden="true" size={15} />
              Add FAQ
            </Button>
          </div>
        }
      />

      {status === 'loading' ? <FaqListSkeletonRows rows={4} /> : null}
      {status === 'error' ? <FaqErrorState onRetry={loadData} /> : null}

      {status === 'ready' ? (
        <>
          <ContentToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search questions…"
            count={filteredFaqs.length}
            countLabel="FAQs"
            filters={[
              {
                key: 'category',
                label: 'Filter by category',
                value: categoryFilter,
                onChange: setCategoryFilter,
                placeholder: 'All categories',
                options: categories.map((category) => ({
                  value: category.id,
                  label: category.deleted_at
                    ? `${category.name} (archived)`
                    : category.name,
                })),
              },
              {
                key: 'status',
                label: 'Filter by status',
                value: statusFilter,
                onChange: setStatusFilter,
                placeholder: 'All statuses',
                options: [
                  { value: 'published', label: 'Published' },
                  { value: 'unpublished', label: 'Unpublished' },
                  { value: 'archived', label: 'Archived' },
                ],
              },
            ]}
          />

          {filteredFaqs.length > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="checkbox"
                checked={selectedIds.size === filteredFaqs.length && filteredFaqs.length > 0}
                onChange={toggleSelectAll}
                aria-label="Select all FAQs"
                style={{ width: '1.2rem', height: '1.2rem', accentColor: '#1A1A1A' }}
              />
              <span style={{ fontSize: '0.82rem', color: '#6E6761' }}>
                Select all ({filteredFaqs.length})
              </span>
              {selectedIds.size > 0 ? (
                <span style={{ fontSize: '0.82rem', color: '#6E6761' }}>{selectedIds.size} selected</span>
              ) : null}
            </div>
          ) : null}

          <ContentList
            title="FAQ items"
            description="Questions, answers and whether each one is published. Ordering is applied within each category."
            emptyState={
              faqs.length === 0 ? (
                activeCategories.length === 0 ? (
                  <EmptyState
                    icon={<FiHelpCircle aria-hidden="true" />}
                    title="Create a category first"
                    description="FAQ items are organised by category. Add your first category, then come back to write your questions and answers."
                    action={
                      <Button
                        to="/admin/faqs/content/categories"
                        variant="outline"
                      >
                        <FiPlus aria-hidden="true" size={15} />
                        Manage categories
                      </Button>
                    }
                  />
                ) : (
                  <EmptyState
                    icon={<FiHelpCircle aria-hidden="true" />}
                    title="No FAQ items yet"
                    description="Add your first question and answer to start building your FAQ section."
                    action={
                      <Button to="/admin/faqs/content/items/new" variant="outline">
                        <FiPlus aria-hidden="true" size={15} />
                        Add FAQ
                      </Button>
                    }
                  />
                )
              ) : filteredFaqs.length === 0 ? (
                <EmptyState
                  icon={<FiHelpCircle aria-hidden="true" />}
                  title="No FAQs match your search"
                  description="Try adjusting your search or filters."
                />
              ) : null
            }
          >
            {filteredFaqs.map((faq) => {
              const siblings = faqs
                .filter(
                  (entry) =>
                    entry.category_id === faq.category_id && isActive(entry),
                )
                .sort(byOrder)
              const index = siblings.findIndex((entry) => entry.id === faq.id)
              return (
                <div key={faq.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', minWidth: 0, overflow: 'hidden' }}>
                  <input
                    type="checkbox"
                    checked={selectedIds.has(faq.id)}
                    onChange={() => toggleSelect(faq.id)}
                    aria-label={`Select ${faq.question}`}
                    style={{ width: '1.2rem', height: '1.2rem', accentColor: '#1A1A1A', marginTop: '1.1rem', flex: '0 0 auto' }}
                  />
                  <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                    <FaqRow
                      faq={faq}
                      categoryName={categoryName(faq.category_id)}
                      categorySlug={categorySlug(faq.category_id)}
                      first={index === 0}
                      last={index === siblings.length - 1}
                      busy={busy}
                      onMove={handleMoveFaq}
                      onDelete={setDeleteTarget}
                      onRestore={handleRestoreFaq}
                    />
                  </div>
                </div>
              )
            })}
          </ContentList>
        </>
      ) : null}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete FAQ?"
        description="This permanently deletes the question. This cannot be undone."
        confirmLabel="Delete FAQ"
        cancelLabel="Cancel"
        onConfirm={handleDeleteFaq}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        open={bulkConfirm}
        title={`Delete ${selectedIds.size} FAQs?`}
        description="This permanently deletes the selected questions. This cannot be undone."
        confirmLabel={`Delete ${selectedIds.size} FAQs`}
        cancelLabel="Cancel"
        onConfirm={handleBulkDelete}
        onCancel={() => setBulkConfirm(false)}
      />
    </FAQsCMSPage>
  )
}

export default FaqItems
