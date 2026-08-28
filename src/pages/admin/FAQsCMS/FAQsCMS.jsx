import { useEffect, useState } from 'react'
import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import { adminPageMeta } from '../../../constants/admin.js'
import { fetchFaqPageAdmin, fetchFaqsAdmin } from '../../../services/faqs.js'
import {
  FaqHubAction,
  FaqHubArrow,
  FaqHubCard,
  FaqHubCardDescription,
  FaqHubCardTitle,
  FaqHubFooter,
  FaqHubGrid,
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

function FAQsCMS() {
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
  const heroTitle = summary?.page.hero.title
  const ctaTitle = summary?.page.cta.title

  const cards = [
    {
      to: '/admin/faqs/hero',
      title: 'FAQ Hero',
      description:
        'Manage the hero section displayed at the top of the public FAQ page.',
      action: 'Manage Hero',
      summary: heroTitle ? `Currently: ${heroTitle}` : null,
    },
    {
      to: '/admin/faqs/content',
      title: 'FAQ Content',
      description:
        'Manage the main FAQ section, including its section heading, categories, and FAQ questions.',
      action: 'Manage FAQ Content',
      summary: `${categoryCount} categories · ${itemCount} FAQs`,
    },
    {
      to: '/admin/faqs/cta',
      title: 'FAQ CTA',
      description:
        'Manage the call-to-action section displayed at the bottom of the FAQ page.',
      action: 'Manage CTA',
      summary: ctaTitle ? `Currently: ${ctaTitle}` : null,
    },
  ]

  return (
    <FAQsCMSPage>
      <AdminPageHeader {...adminPageMeta.faqsHub} />
      <FaqHubGrid>
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
      </FaqHubGrid>
    </FAQsCMSPage>
  )
}

export default FAQsCMS
