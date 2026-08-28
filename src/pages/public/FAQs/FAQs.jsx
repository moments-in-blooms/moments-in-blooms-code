import { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '../../../components/Button/index.js'
import SEO from '../../../components/SEO/index.js'
import { BUTTON_VARIANTS } from '../../../constants/ui.js'
import { useContent } from '../../../hooks/useContent.js'
import { buildBreadcrumbJsonLd } from '../../../utils/seo.js'
import {
  fetchPublicFaqPage,
  getPublicPageFallback,
} from '../../../services/faqs.js'

import FAQCategoryNav from './FAQCategoryNav.jsx'
import FAQCTA from './FAQCTA.jsx'
import FAQHero from './FAQHero.jsx'
import FAQList from './FAQList.jsx'
import { FaqListSkeleton, FaqNavSkeleton } from './FAQSkeleton.jsx'

import {
  FaqCategorySection,
  FaqContainer,
  FaqContentSection,
  FaqErrorBlock,
  FaqErrorMessage,
  FaqFilterDescription,
  FaqFilterEyebrow,
  FaqFilterIntro,
  FaqFilterTitle,
  FaqPage,
  FaqSearchInput,
  FaqSearchWrap,
} from './FAQs.styles.js'

const defaultFaqsSeo = Object.freeze({
  title: 'Frequently Asked Questions',
  description:
    'Answers about our Melbourne event styling, florals, decor hire, Luxe Photobooth, Blissful Nest and the journey from first enquiry to your celebration.',
  url: 'https://momentsinblooms.vercel.app/faqs',
})

function buildFaqStructuredData(categories) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((category) =>
      category.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    ),
  }
}

function FAQs() {
  const [pageData, setPageData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [search, setSearch] = useState('')
  const { values: seoValues } = useContent('seo')
  const faqsSeo = seoValues.faqs ?? seoValues.site ?? defaultFaqsSeo

  useEffect(() => {
    let cancelled = false
    fetchPublicFaqPage()
      .then(({ data }) => {
        if (cancelled) return
        if (data) {
          setPageData(data)
          setStatus('ready')
        } else {
          setStatus('error')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const categories = useMemo(
    () => (status === 'ready' ? pageData?.categories ?? [] : []),
    [status, pageData],
  )

  // Deep-link support for admin preview: /faqs?category=slug
  useEffect(() => {
    if (status !== 'ready' || !categories.length) return
    if (selectedCategory) return
    const params = new URLSearchParams(window.location.search)
    const slug = params.get('category')
    if (slug) {
      const match = categories.find((c) => c.slug === slug || c.id === slug)
      if (match) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- external URL param sync
        setSelectedCategory(match.id)
      }
    }
  }, [status, categories, selectedCategory])

  const normalizedSearch = search.trim().toLowerCase()
  const filteredCategories = useMemo(() => {
    if (!normalizedSearch) return categories
    return categories
      .map((category) => ({
        ...category,
        faqs: category.faqs.filter(
          (faq) =>
            `${faq.question ?? ''} ${faq.answer ?? ''}`.toLowerCase().includes(normalizedSearch),
        ),
      }))
      .filter((category) => category.faqs.length > 0)
  }, [categories, normalizedSearch])
  const fallback = useMemo(() => getPublicPageFallback(), [])
  const ready = status === 'ready'
  const failed = status === 'error'

  const handleRetry = useCallback(() => {
    setStatus('loading')
    setReloadKey((key) => key + 1)
  }, [])

  const displayCategories = normalizedSearch ? filteredCategories : categories

  const activeCategory = normalizedSearch
    ? null
    : categories.some((category) => category.id === selectedCategory)
      ? selectedCategory
      : categories[0]?.id ?? null

  const handleSelectCategory = useCallback((categoryId) => {
    setSelectedCategory(categoryId)
  }, [])

  const clearSearch = useCallback(() => setSearch(''), [])

  const heroContent = ready
    ? pageData.hero
    : failed
      ? fallback.hero
      : null

  const sectionContent = ready
    ? pageData.section
    : failed
      ? fallback.section
      : null

  return (
    <FaqPage>
      <SEO
        title={faqsSeo.title}
        description={faqsSeo.description}
        canonical={faqsSeo.url}
        url={faqsSeo.url}
        keywords={faqsSeo.keywords}
        jsonLd={ready ? [buildFaqStructuredData(categories), buildBreadcrumbJsonLd('/faqs')] : buildBreadcrumbJsonLd('/faqs')}
      />

      <FAQHero
        loading={status === 'loading'}
        eyebrow={heroContent?.eyebrow ?? ''}
        title={heroContent?.title ?? ''}
        description={heroContent?.description ?? ''}
      />

      <FaqCategorySection>
        <FaqContainer>
          <FaqFilterIntro>
            {sectionContent ? (
              <>
                <FaqFilterEyebrow>
                  {sectionContent.eyebrow}
                </FaqFilterEyebrow>
                <FaqFilterTitle>{sectionContent.title}</FaqFilterTitle>
                <FaqFilterDescription>
                  {sectionContent.description}
                </FaqFilterDescription>
              </>
            ) : null}
          </FaqFilterIntro>

          <FaqSearchWrap role="search" aria-label="Search FAQs">
            <FaqSearchInput
              type="search"
              aria-label="Search questions and answers"
              placeholder="Search questions…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              disabled={status === 'loading'}
            />
          </FaqSearchWrap>

          {status === 'loading' ? <FaqNavSkeleton /> : null}
          {ready && displayCategories.length > 0 ? (
            <FAQCategoryNav
              categories={displayCategories}
              selected={activeCategory}
              onSelect={handleSelectCategory}
            />
          ) : null}
          {ready && normalizedSearch && filteredCategories.length === 0 ? (
            <FaqErrorBlock>
              <FaqErrorMessage>No questions match your search.</FaqErrorMessage>
              <Button type="button" variant={BUTTON_VARIANTS.OUTLINE} onClick={clearSearch}>
                Clear search
              </Button>
            </FaqErrorBlock>
          ) : null}
          {failed ? (
            <FaqErrorBlock>
              <FaqErrorMessage>
                We couldn't load the FAQs right now. Please try again shortly.
              </FaqErrorMessage>
              <Button
                type="button"
                variant={BUTTON_VARIANTS.OUTLINE}
                onClick={handleRetry}
              >
                Try again
              </Button>
            </FaqErrorBlock>
          ) : null}
          {ready && normalizedSearch ? (
            <p aria-live="polite" style={{ textAlign: 'center', fontSize: '0.82rem', color: '#6E6761', marginTop: '1rem' }}>
              {filteredCategories.reduce((count, category) => count + category.faqs.length, 0)} results
            </p>
          ) : null}
        </FaqContainer>
      </FaqCategorySection>

      <FaqContentSection>
        <FaqContainer>
          {status === 'loading' ? <FaqListSkeleton /> : null}
          {failed ? (
            <FaqErrorBlock>
              <FaqErrorMessage>
                We couldn't load the FAQs right now. Please try again shortly.
              </FaqErrorMessage>
              <Button type="button" variant={BUTTON_VARIANTS.OUTLINE} onClick={handleRetry}>
                Try again
              </Button>
            </FaqErrorBlock>
          ) : null}
          {ready ? (
            <FAQList categories={filteredCategories} selected={activeCategory} />
          ) : null}
        </FaqContainer>
      </FaqContentSection>

      {heroContent ? (
        <FAQCTA cta={ready ? pageData.cta : fallback.cta} />
      ) : null}
    </FaqPage>
  )
}

export default FAQs