import { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { fetchFaqPageAdmin, fetchFaqsAdmin } from '../../../services/faqs.js'
import {
  FaqBackLink,
  FaqEqualGrid,
  FaqHubAction,
  FaqHubArrow,
  FaqHubCard,
  FaqHubCardDescription,
  FaqHubCardTitle,
  FaqHubFooter,
  FaqHubSummary,
  FaqSkeletonBar,
  FAQsCMSPage,
} from './FAQsCMS.styles.js'

const isActive = (row) => !row.deleted_at

function FaqHubSummarySlot({ status, children }) {
  if (status === 'loading') {
    return <FaqSkeletonBar $width="55%" />
  }
  if (status === 'error') {
    return <FaqHubSummary>Summary unavailable</FaqHubSummary>
  }
  return <FaqHubSummary>{children}</FaqHubSummary>
}

function FaqContent() {
  const [summary, setSummary] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    Promise.all([fetchFaqsAdmin(), fetchFaqPageAdmin()])
      .then(([faqs, page]) => {
        if (cancelled) return
        if (faqs.error || page.error) {
          setStatus('error')
          return
        }
        setSummary({ faqs: faqs.data, page: page.data })
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const categoryCount =
    summary?.faqs.categories.filter(isActive).length ?? 0
  const itemCount = summary?.faqs.faqs.filter(isActive).length ?? 0
  const sectionTitle = summary?.page.section.title

  const cards = [
    {
      to: '/admin/faqs/content/heading',
      title: 'Section Heading',
      description:
        'Manage the heading shown above the category filter on the public FAQ page.',
      action: 'Manage Heading',
      summary: sectionTitle ? `Currently: ${sectionTitle}` : null,
    },
    {
      to: '/admin/faqs/content/categories',
      title: 'FAQ Categories',
      description:
        'Manage the categories used to organise and filter your FAQ questions.',
      action: 'Manage Categories',
      summary: `${categoryCount} categor${categoryCount === 1 ? 'y' : 'ies'}`,
    },
    {
      to: '/admin/faqs/content/items',
      title: 'FAQ Items',
      description:
        'Manage the questions and answers shown within each category.',
      action: 'Manage FAQ Items',
      summary: `${itemCount} FAQ${itemCount === 1 ? '' : 's'}`,
    },
  ]

  return (
    <FAQsCMSPage>
      <FaqBackLink to="/admin/faqs">
        <FiArrowLeft aria-hidden="true" size={14} />
        FAQ Management
      </FaqBackLink>

      <AdminPageHeader {...adminPageMeta.faqsContent} />

      <FaqEqualGrid>
        {cards.map((card) => (
          <FaqHubCard key={card.to} to={card.to}>
            <FaqHubCardTitle>{card.title}</FaqHubCardTitle>
            <FaqHubCardDescription>{card.description}</FaqHubCardDescription>
            <FaqHubFooter>
              <FaqHubSummarySlot status={status}>
                {card.summary}
              </FaqHubSummarySlot>
              <FaqHubAction>
                {card.action}
                <FaqHubArrow aria-hidden="true" size={15} />
              </FaqHubAction>
            </FaqHubFooter>
          </FaqHubCard>
        ))}
      </FaqEqualGrid>
    </FAQsCMSPage>
  )
}

export default FaqContent