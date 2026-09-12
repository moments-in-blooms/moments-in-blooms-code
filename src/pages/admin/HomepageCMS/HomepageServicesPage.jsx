import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentCard from '../../../components/admin/ContentCard/index.js'
import ContentList from '../../../components/admin/ContentList/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import Button from '../../../components/Button/index.js'
import { useContent } from '../../../hooks/useContent.js'
import { buildServiceCards } from '../../../services/homepageCards.js'
import { showError, showSuccess } from '../../../utils/sweetAlert.js'
import { categoryCounts, listCategories, newCategoryPath } from '../ServicesCMS/catalog.js'
import { HomepageCMSPage, OrphanRow } from './HomepageCMS.styles.js'

const overrideKey = (override) =>
  override && typeof override === 'object'
    ? String(override.collectionId || override.id || '')
    : ''

const normalizeTitle = (value) => String(value ?? '').trim().toLowerCase()

/** Homepage entries that resolve to no live category — kept editable here for cleanup. */
function findOrphanOverrides(overrides, categories) {
  const list = Array.isArray(overrides) ? overrides : []
  const categoryIds = new Set(
    (Array.isArray(categories) ? categories : []).map((entry) => String(entry?.id ?? '')),
  )
  const categoryTitles = new Set(
    (Array.isArray(categories) ? categories : []).map((entry) => normalizeTitle(entry?.title)),
  )
  return list.filter(
    (entry) =>
      entry &&
      typeof entry === 'object' &&
      !categoryIds.has(overrideKey(entry)) &&
      !categoryTitles.has(normalizeTitle(entry.title)),
  )
}

function HomepageServicesPage() {
  const home = useContent('homepage')
  const services = useContent('services')
  const [busy, setBusy] = useState(false)

  const categories = listCategories(services.values)
  const cards = buildServiceCards(categories, home.values.services ?? [])
  const orphans = findOrphanOverrides(home.values.services, categories)

  const handleDeleteOrphan = async (orphan) => {
    if (busy) return
    setBusy(true)
    const orphanKey = overrideKey(orphan)
    const orphanTitle = normalizeTitle(orphan.title)
    home.update((current) => ({
      ...current,
      services: (current.services ?? []).filter((entry) => {
        if (overrideKey(entry) !== orphanKey) return true
        // Keyless entries share the empty key — only remove this exact one.
        if (orphanKey !== '') return false
        return normalizeTitle(entry?.title) !== orphanTitle
      }),
    }))
    const result = await home.save('homepage')
    setBusy(false)
    if (result?.error) {
      showError('Delete failed', result.error.message || "We couldn't delete this entry.")
      return
    }
    showSuccess('Deleted', 'Unlinked entry removed.')
  }

  return (
    <HomepageCMSPage>
      <AdminPageHeader
        eyebrow="Homepage · Content"
        title="Services"
        description="Homepage service cards are the live catalog categories — one card per category. Adding a service creates a category, and editing a card sets its homepage display without changing the category itself."
        actions={
          <Button to={newCategoryPath} variant="primary">
            <FiPlus aria-hidden="true" size={15} />
            Add service
          </Button>
        }
      />

      <ContentList
        title="Homepage service cards"
        description="Click a card to adjust its homepage headline, copy, image and layout."
        emptyState={
          <EmptyState
            title={categories.length === 0 ? 'No services yet' : 'No cards to show'}
            description={
              categories.length === 0
                ? 'Add your first service category to get started.'
                : 'Try adjusting your services catalog.'
            }
            action={
              categories.length === 0 ? (
                <Button to={newCategoryPath} variant="outline">
                  <FiPlus aria-hidden="true" size={15} />
                  Add service
                </Button>
              ) : null
            }
          />
        }
      >
        {cards.map((card) => {
          const category = categories.find((entry) => String(entry?.id) === String(card.id))
          const counts = category ? categoryCounts(category) : { subcategories: 0, items: 0 }
          return (
            <ContentCard
              key={card.id}
              to={`/admin/homepage/services/${card.id}`}
              title={card.title || 'Untitled service'}
              description={card.description}
              meta={[
                card.eyebrow,
                `${counts.subcategories} sub-categor${counts.subcategories === 1 ? 'y' : 'ies'}`,
                `${counts.items} item${counts.items === 1 ? '' : 's'}`,
              ].filter(Boolean)}
              thumbnail={card.image?.src ? { src: card.image.src, alt: card.image.alt } : undefined}
              lastUpdated={home.savedAt ?? services.savedAt}
            />
          )
        })}
      </ContentList>

      {orphans.length > 0 ? (
        <ContentList
          title="Unlinked entries"
          description="These homepage entries match no service category, so they no longer appear on the website. Remove them to keep things tidy."
        >
          {orphans.map((orphan, index) => (
            <OrphanRow key={orphan.id ?? index}>
              <div>
                <strong>{orphan.title || 'Untitled entry'}</strong>
                {orphan.description ? <span>{orphan.description}</span> : null}
              </div>
              <Button
                type="button"
                variant="danger"
                size="small"
                disabled={busy}
                onClick={() => handleDeleteOrphan(orphan)}
              >
                Delete
              </Button>
            </OrphanRow>
          ))}
        </ContentList>
      ) : null}
    </HomepageCMSPage>
  )
}

export default HomepageServicesPage
