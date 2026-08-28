import { useState } from 'react'
import { FiImage, FiPlus, FiTrash2 } from 'react-icons/fi'
import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ConfirmDialog from '../../../components/admin/ConfirmDialog/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import ContentToolbar from '../../../components/admin/ContentToolbar/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import Button from '../../../components/Button/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { useContent } from '../../../hooks/useContent.js'
import { deleteImage, isStorageUrl } from '../../../services/storage.js'
import { showError, showSuccess } from '../../../utils/sweetAlert.js'
import { gallerySections } from './sections.jsx'
import { GalleryCMSPage } from './GalleryCMS.styles.js'

function GalleryItemsPage() {
  const { values, savedAt, update, save } = useContent('gallery')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [selectedIds, setSelectedIds] = useState(() => new Set())
  const [bulkConfirm, setBulkConfirm] = useState(false)
  const [busy, setBusy] = useState(false)

  const categories = values.categories ?? []
  const items = values.items ?? []
  const itemsSection = gallerySections.find((section) => section.key === 'items')

  const normalizedSearch = search.trim().toLowerCase()
  const filteredItems = items.filter((item) => {
    if (
      normalizedSearch &&
      !`${item.title ?? ''} ${item.subtitle ?? ''}`.toLowerCase().includes(normalizedSearch)
    ) {
      return false
    }
    if (category && item.category !== category) return false
    return true
  })

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      const key = String(id)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredItems.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredItems.map((item) => String(item.id))))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0 || busy) return
    setBusy(true)
    const idsToDelete = new Set(selectedIds)
    const toDeleteItems = items.filter((item) => idsToDelete.has(String(item.id)))
    const remaining = items.filter((item) => !idsToDelete.has(String(item.id)))

    // Optimistic update
    update((current) => ({ ...current, items: remaining }))
    const result = await save()
    setBusy(false)
    setBulkConfirm(false)
    if (result?.error) {
      showError('Delete failed', result.error.message || "We couldn't delete the images.")
      // Revert by reloading? For simplicity, keep as is and let user refresh; or we could refetch
      return
    }
    // Delete storage files for deleted items (best-effort, after Save)
    toDeleteItems.forEach((item) => {
      const src = item.src ?? item.image
      if (isStorageUrl(src)) deleteImage(src).catch(() => {})
    })
    setSelectedIds(new Set())
    showSuccess('Deleted', `${idsToDelete.size} images deleted permanently.`)
  }

  return (
    <GalleryCMSPage>
      <AdminPageHeader
        title="Gallery images"
        description="The images in your gallery grid."
        eyebrow={adminPageMeta.gallery.eyebrow}
        actions={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {selectedIds.size > 0 ? (
              <Button variant="danger" onClick={() => setBulkConfirm(true)} disabled={busy}>
                <FiTrash2 aria-hidden="true" size={15} />
                Delete {selectedIds.size}
              </Button>
            ) : null}
            <Button to="/admin/gallery/items/new" variant="primary">
              <FiPlus aria-hidden="true" size={15} />
              Add image
            </Button>
          </div>
        }
      />

      <ContentToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search images…"
        count={filteredItems.length}
        countLabel="images"
        filters={[
          {
            key: 'category',
            label: 'Filter by category',
            value: category,
            onChange: setCategory,
            placeholder: 'All categories',
            options: categories.map((entry) => ({
              value: entry.id,
              label: entry.label,
            })),
          },
        ]}
      />

      {filteredItems.length > 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <input
            type="checkbox"
            checked={selectedIds.size === filteredItems.length && filteredItems.length > 0}
            onChange={toggleSelectAll}
            aria-label="Select all images"
          />
          <span style={{ fontSize: '0.82rem', color: '#6E6761' }}>Select all ({filteredItems.length})</span>
          {selectedIds.size > 0 ? (
            <span style={{ fontSize: '0.82rem', color: '#6E6761' }}>{selectedIds.size} selected</span>
          ) : null}
        </div>
      ) : null}

      <ContentList
        title="Gallery images"
        description="The images in your gallery grid."
        emptyState={
          <EmptyState
            icon={<FiImage aria-hidden="true" />}
            title={items.length === 0 ? 'No gallery images yet' : 'No images match your search'}
            description={
              items.length === 0
                ? 'Add your first gallery image to get started.'
                : 'Try adjusting your search or filters.'
            }
            action={
              items.length === 0 ? (
                <Button to="/admin/gallery/items/new" variant="outline">
                  <FiPlus aria-hidden="true" size={15} />
                  Add image
                </Button>
              ) : null
            }
          />
        }
      >
        {filteredItems.map((item, index) => (
          <div key={item.id ?? index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input
              type="checkbox"
              checked={selectedIds.has(String(item.id))}
              onChange={() => toggleSelect(item.id)}
              aria-label={`Select ${item.title}`}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <ContentCard
                to={`/admin/gallery/items/${item.id}`}
                title={itemsSection.itemTitle(item, values)}
                description={itemsSection.itemDescription(item, values)}
                meta={itemsSection.itemMeta(item, values)}
                thumbnail={itemsSection.itemThumb(item, values)}
                lastUpdated={savedAt}
              />
            </div>
          </div>
        ))}
      </ContentList>

      <ConfirmDialog
        open={bulkConfirm}
        title={`Delete ${selectedIds.size} images?`}
        description="This permanently deletes the selected images and their files from storage. This cannot be undone."
        confirmLabel={`Delete ${selectedIds.size} images`}
        cancelLabel="Cancel"
        onConfirm={handleBulkDelete}
        onCancel={() => setBulkConfirm(false)}
      />
    </GalleryCMSPage>
  )
}

export default GalleryItemsPage
