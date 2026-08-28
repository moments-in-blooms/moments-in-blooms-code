import { useEffect, useState } from 'react'
import { fetchPublicFaqPage } from '../../../../services/faqs.js'
import FAQPreview from '../../Home/FAQPreview/FAQPreview.jsx'
import {
  FAQContainer,
  FAQRoot,
} from '../../Home/FAQPreview/FAQPreview.styles.js'
import { FaqListSkeleton } from '../../FAQs/FAQSkeleton.jsx'
import { SkeletonBar } from '../../FAQs/FAQSkeleton.styles.js'
import { FaqLoadingHeader } from './FaqSection.styles.js'

/**
 * The services page shows only the live "services" FAQ category, sourced from
 * the same Supabase-backed service the public /faqs page uses. Publishing,
 * ordering, category and content changes made in the FAQ CMS therefore flow
 * straight through to /services — no hardcoded ids, no static seed fallback.
 *
 * FAQ data is asynchronous and intentionally kept out of the synchronous
 * `useContent('services')` store, so this section loads independently and never
 * blocks the hero, collections, experience or CTA.
 */
const SERVICES_FAQ_CATEGORY = 'services'

function FaqSection({ id }) {
  const [faqs, setFaqs] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    fetchPublicFaqPage()
      .then(({ data, error }) => {
        if (cancelled) return
        if (error || !data) {
          setStatus('error')
          return
        }
        const category = (data.categories ?? []).find(
          (entry) =>
            entry.slug === SERVICES_FAQ_CATEGORY ||
            entry.id === SERVICES_FAQ_CATEGORY,
        )
        setFaqs(category?.faqs ?? [])
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (status === 'loading') {
    return (
      <FAQRoot id={id} $tone="surface" aria-busy="true">
        <FAQContainer>
          <FaqLoadingHeader aria-hidden="true">
            <SkeletonBar $width="10rem" />
            <SkeletonBar $width="min(22rem, 80%)" $height="2.75rem" />
          </FaqLoadingHeader>
          <FaqListSkeleton />
        </FAQContainer>
      </FAQRoot>
    )
  }

  // Fail and empty states are handled the same way: never fall back to stale
  // static FAQs and never fabricate copy — simply omit the preview when there
  // is nothing live to show, leaving the rest of the page intact.
  if (status === 'error' || faqs.length === 0) {
    return null
  }

  return <FAQPreview items={faqs} id={id} tone="surface" />
}

export default FaqSection
