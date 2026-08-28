import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/index.js'
import ContentDetailHeader from '../../../components/admin/ContentDetailHeader/index.js'
import ContentFormSection from '../../../components/admin/ContentFormSection/index.js'
import SaveActions from '../../../components/admin/SaveActions/index.js'
import { TextField, TextAreaField, FieldRow } from '../../../components/FormField/index.js'
import { useUnsavedGuard } from '../../../hooks/useUnsavedGuard.jsx'
import { fetchFaqPageAdmin, saveFaqPage } from '../../../services/faqs.js'
import {
  FaqFormGrid,
  FaqLoadError,
  FaqLoadErrorMessage,
} from './FAQsCMS.styles.js'
import { FaqDetailSkeleton } from './FaqListParts.jsx'
import { DetailPageShell } from '../../../components/admin/ItemDetailPage/ItemDetailPage.styles.js'

function FaqPageDetail({ section }) {
  const navigate = useNavigate()

  const showSection = !section || section === 'heading'
  const showHero = !section || section === 'hero'
  const showCta = !section || section === 'cta'

  const [draft, setDraft] = useState(null)
  const [loadError, setLoadError] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [dirty, setDirty] = useState(false)
  const [savedAt, setSavedAt] = useState(null)
  const initialRef = useRef(null)

  const { guard } = useUnsavedGuard({ active: dirty })

  useEffect(() => {
    let cancelled = false
    fetchFaqPageAdmin()
      .then((result) => {
        if (cancelled) return
        if (result.error) {
          setLoadError(true)
          return
        }
        const loaded = {
          section: { ...result.data.section },
          hero: { ...result.data.hero },
          cta: { ...result.data.cta },
        }
        initialRef.current = loaded
        setDraft(loaded)
      })
      .catch(() => {
        if (!cancelled) setLoadError(true)
      })
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const retry = useCallback(() => {
    setLoadError(false)
    setReloadKey((key) => key + 1)
  }, [])

  const patch = (updater) => {
    setDraft((current) =>
      typeof updater === 'function' ? updater(current) : updater,
    )
    setDirty(true)
  }

  const patchSection = (section, field) => (event) => {
    patch((current) => ({
      ...current,
      [section]: { ...current[section], [field]: event.target.value },
    }))
  }

  if (loadError) {
    return (
      <DetailPageShell>
        <FaqLoadError>
          <FaqLoadErrorMessage>
            We couldn't load the FAQ page content right now.
          </FaqLoadErrorMessage>
          <Button type="button" variant="outline" onClick={retry}>
            Try again
          </Button>
        </FaqLoadError>
      </DetailPageShell>
    )
  }

  if (!draft) {
    return (
      <DetailPageShell>
        <FaqDetailSkeleton />
      </DetailPageShell>
    )
  }

  const errors = {}
  if (showSection) {
    if (!draft.section.title.trim())
      errors.sectionTitle = 'A section title is required.'
    if (!draft.section.description.trim())
      errors.sectionDescription = 'A section description is required.'
  }
  if (showHero) {
    if (!draft.hero.title.trim()) errors.heroTitle = 'A hero title is required.'
    if (!draft.hero.description.trim())
      errors.heroDescription = 'A hero description is required.'
  }
  if (showCta) {
    if (!draft.cta.title.trim()) errors.ctaTitle = 'A heading is required.'
    if (!draft.cta.primaryLabel.trim())
      errors.primaryLabel = 'A button label is required.'
    if (!draft.cta.primaryUrl.trim())
      errors.primaryUrl = 'A button destination is required.'
    if (!draft.cta.secondaryLabel.trim())
      errors.secondaryLabel = 'A button label is required.'
    if (!draft.cta.secondaryUrl.trim())
      errors.secondaryUrl = 'A button destination is required.'
  }

  const handleSave = async () => {
    if (Object.keys(errors).length > 0) {
      return { ok: false }
    }
    const result = await saveFaqPage(draft)
    if (result.error) {
      return { ok: false, message: result.error.message }
    }
    setSavedAt(new Date().toISOString())
    setDirty(false)
    return { ok: true }
  }

  return (
    <DetailPageShell>
      <ContentDetailHeader
        backTo={section === 'heading' ? '/admin/faqs/content' : '/admin/faqs'}
        backLabel={section === 'heading' ? 'Back to FAQ Content' : 'Back to FAQs'}
        eyebrow={
          section === 'hero'
            ? 'FAQs · Hero'
            : section === 'heading'
              ? 'FAQs · Section heading'
              : section === 'cta'
                ? 'FAQs · Call-to-action'
                : 'FAQs · Page content'
        }
        title={
          section === 'hero'
            ? 'FAQ hero'
            : section === 'heading'
              ? 'FAQ section heading'
              : section === 'cta'
                ? 'FAQ call-to-action'
                : 'FAQ page content'
        }
        description={
          section === 'hero'
            ? 'The dark welcome section at the top of the public FAQ page.'
            : section === 'heading'
              ? 'The intro copy shown above the category filter on the public FAQ page.'
              : section === 'cta'
                ? 'The call-to-action section at the bottom of the public FAQ page.'
                : 'The hero, section heading and call-to-action copy of the public FAQ page.'
        }
      />

      {showSection ? (
        <ContentFormSection
          title="Section heading"
          description="The intro copy above the category filter on the FAQ page."
        >
          <FaqFormGrid>
            <TextField
              label="Eyebrow"
              value={draft.section.eyebrow}
              onChange={patchSection('section', 'eyebrow')}
              placeholder="e.g. Browse by topic"
            />
            <TextField
              label="Title"
              value={draft.section.title}
              onChange={patchSection('section', 'title')}
              placeholder="e.g. Find the answer you need."
              error={errors.sectionTitle}
            />
            <TextAreaField
              label="Description"
              rows={3}
              value={draft.section.description}
              onChange={patchSection('section', 'description')}
              placeholder="The supporting sentence under the heading…"
              error={errors.sectionDescription}
            />
          </FaqFormGrid>
        </ContentFormSection>
      ) : null}

      {showHero ? (
        <ContentFormSection
          title="Hero section"
          description="The dark welcome section at the top of the FAQ page."
        >
          <FaqFormGrid>
            <TextField
              label="Eyebrow"
              value={draft.hero.eyebrow}
              onChange={patchSection('hero', 'eyebrow')}
              placeholder="e.g. Frequently Asked Questions"
            />
            <TextField
              label="Title"
              value={draft.hero.title}
              onChange={patchSection('hero', 'title')}
              placeholder="e.g. Everything you need to know."
              error={errors.heroTitle}
            />
            <TextAreaField
              label="Description"
              rows={3}
              value={draft.hero.description}
              onChange={patchSection('hero', 'description')}
              placeholder="A short paragraph summarising the page…"
              error={errors.heroDescription}
            />
          </FaqFormGrid>
        </ContentFormSection>
      ) : null}

      {showCta ? (
        <ContentFormSection
          title="Call-to-action section"
          description="The taupe section at the bottom of the FAQ page."
        >
          <FaqFormGrid>
            <TextField
              label="Eyebrow"
              value={draft.cta.eyebrow}
              onChange={patchSection('cta', 'eyebrow')}
              placeholder="e.g. Still have questions?"
            />
            <TextField
              label="Heading"
              value={draft.cta.title}
              onChange={patchSection('cta', 'title')}
              placeholder="e.g. Let's talk about your celebration."
              error={errors.ctaTitle}
            />
            <TextAreaField
              label="Description"
              rows={3}
              value={draft.cta.description}
              onChange={patchSection('cta', 'description')}
              placeholder="The supporting sentence under the heading…"
            />
            <FieldRow>
              <TextField
                label="Primary button label"
                value={draft.cta.primaryLabel}
                onChange={patchSection('cta', 'primaryLabel')}
                placeholder="e.g. Enquire Now"
                error={errors.primaryLabel}
              />
              <TextField
                label="Primary button link"
                value={draft.cta.primaryUrl}
                onChange={patchSection('cta', 'primaryUrl')}
                placeholder="e.g. /contact"
                error={errors.primaryUrl}
              />
            </FieldRow>
            <FieldRow>
              <TextField
                label="Secondary button label"
                value={draft.cta.secondaryLabel}
                onChange={patchSection('cta', 'secondaryLabel')}
                placeholder="e.g. Explore Services"
                error={errors.secondaryLabel}
              />
              <TextField
                label="Secondary button link"
                value={draft.cta.secondaryUrl}
                onChange={patchSection('cta', 'secondaryUrl')}
                placeholder="e.g. /services"
                error={errors.secondaryUrl}
              />
            </FieldRow>
          </FaqFormGrid>
        </ContentFormSection>
      ) : null}

      <SaveActions
        dirty={dirty}
        savedAt={savedAt}
        onSave={handleSave}
        onCancel={() =>
          navigate(section === 'heading' ? '/admin/faqs/content' : '/admin/faqs')
        }
        onReset={() => {
          if (initialRef.current) {
            setDraft({
              section: { ...initialRef.current.section },
              hero: { ...initialRef.current.hero },
              cta: { ...initialRef.current.cta },
            })
          }
          setDirty(false)
        }}
        successMessage="FAQ page updated successfully."
      />
      {guard}
    </DetailPageShell>
  )
}

export default FaqPageDetail