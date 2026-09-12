/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components'
import { FIELD_TERMS, SECTION_TERMS } from '../../../constants/adminTerms.js'
import { FieldRow, TextAreaField, TextField } from '../../../components/FormField/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import Repeater from '../../../components/admin/Repeater/index.js'
import {
  ServicesGalleryItemForm,
  ServicesTestimonialForm,
} from './itemForms.jsx'

const HighlightBlock = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};

  > strong {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.typography.uiFont};
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
`

// Aligned to public Services page order: Hero → catalog (managed under the
// Services group: Categories / Sub-Categories / Items) → Experience → CTA.
// Package/prize lists moved into the catalog; legacy blocks stay hidden.
export const servicesSections = [
  {
    key: 'hero',
    title: SECTION_TERMS.hero.label,
    description: 'The opening of the services page.',
    type: 'object',
    form: HeroForm,
  },
  {
    key: 'photoboothHighlights',
    title: 'Photobooth highlights',
    description: 'The two feature blocks below the packages.',
    type: 'object',
    form: HighlightsForm,
  },
  {
    key: 'blissfulNestIntro',
    title: 'Blissful Nest introduction',
    description: 'The intro paragraph for the claw machine experience.',
    type: 'object',
    form: BlissfulNestIntroForm,
  },
  {
    key: 'experienceTimeline',
    title: 'Experience timeline',
    description: "The six-step journey clients move through.",
    type: 'object',
    form: ExperienceTimelineForm,
  },
  {
    key: 'cta',
    title: SECTION_TERMS.cta.label,
    description: 'The closing invitation on the services page.',
    type: 'object',
    form: CtaForm,
  },
  // Legacy — not rendered on public Services page (kept for data preservation, hidden from the admin landing)
  {
    key: 'intro',
    legacy: true,
    title: 'Introduction',
    description:
      'Legacy CMS-managed philosophy content — not currently rendered on the public services page.',
    type: 'object',
    form: IntroForm,
  },
  {
    key: 'gallery',
    legacy: true,
    title: 'Services gallery',
    description:
      'Legacy CMS-managed images — not currently rendered on the public services page.',
    type: 'list',
    itemLabel: 'image',
    sectionMeta: (values) => [`${(values.gallery?.items ?? []).length} images`],
    createInitial: () => ({
      id: `gal-${Date.now()}`,
      variant: 'square',
      title: 'New image',
      category: 'Wedding Styling',
      image: { src: '', alt: '' },
    }),
    itemTitle: (item) => item.title || 'Untitled image',
    itemDescription: (item) => item.category,
    itemMeta: (item) => [item.category, item.variant].filter(Boolean),
    itemThumb: (item) =>
      item.image?.src ? { src: item.image.src, alt: item.image.alt } : undefined,
    validate: (draft) => {
      const errors = {}
      if (!draft?.title?.trim()) {
        errors.title = 'A title is required.'
      }
      return errors
    },
    itemForm: ServicesGalleryItemForm,
  },
  {
    key: 'testimonials',
    legacy: true,
    title: 'Client reviews',
    description:
      'Legacy CMS-managed client reviews — not currently rendered on the public services page.',
    type: 'list',
    itemLabel: 'review',
    sectionMeta: (values) => [`${(values.testimonials ?? []).length} reviews`],
    createInitial: () => ({
      id: `testimonial-${Date.now()}`,
      quote: '',
      name: 'A happy client',
      event: 'Wedding Celebration',
      rating: 5,
      image: { src: '', alt: '' },
    }),
    itemTitle: (item) => item.name || 'Untitled review',
    itemDescription: (item) => item.quote,
    itemMeta: (item) => [item.event].filter(Boolean),
    validate: (draft) => {
      const errors = {}
      if (!draft?.quote?.trim()) {
        errors.quote = 'A quote is required.'
      }
      if (!draft?.name?.trim()) {
        errors.name = 'A name is required.'
      }
      return errors
    },
    itemForm: ServicesTestimonialForm,
  },
]

function HeroForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <TextField
        label={FIELD_TERMS.eyebrow.label}
        hint={FIELD_TERMS.eyebrow.hint}
        value={value?.eyebrow ?? ''}
        onChange={(event) => patch({ eyebrow: event.target.value })}
      />
      <TextField
        label="Title"
        value={value?.title ?? ''}
        onChange={(event) => patch({ title: event.target.value })}
      />
      <TextAreaField
        label="Description"
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
      />
      <FieldRow>
        <TextField
          label={FIELD_TERMS.primaryButton.label}
          hint={FIELD_TERMS.primaryButton.hint}
          value={value?.primaryCta?.label ?? ''}
          onChange={(event) => patch({ primaryCta: { ...value.primaryCta, label: event.target.value } })}
        />
        <TextField
          label={FIELD_TERMS.secondaryButton.label}
          hint={FIELD_TERMS.secondaryButton.hint}
          value={value?.secondaryCta?.label ?? ''}
          onChange={(event) => patch({ secondaryCta: { ...value.secondaryCta, label: event.target.value } })}
        />
      </FieldRow>
      <FieldRow>
        <TextField
          label="Badge title"
          value={value?.badge?.title ?? ''}
          onChange={(event) => patch({ badge: { ...value.badge, title: event.target.value } })}
        />
        <TextField
          label="Badge subtitle"
          value={value?.badge?.subtitle ?? ''}
          onChange={(event) => patch({ badge: { ...value.badge, subtitle: event.target.value } })}
        />
      </FieldRow>
      <ImageField
        label={FIELD_TERMS.heroImage.label}
        value={value?.image?.src ?? ''}
        onChange={(src) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), src } }))}
        alt={value?.image?.alt ?? ''}
        onAltChange={(event) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), alt: event.target.value } }))}
      />
    </>
  )
}

function IntroForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <TextField
        label={FIELD_TERMS.eyebrow.label}
        hint={FIELD_TERMS.eyebrow.hint}
        value={value?.subtitle ?? ''}
        onChange={(event) => patch({ subtitle: event.target.value })}
      />
      <TextField
        label="Title"
        value={value?.title ?? ''}
        onChange={(event) => patch({ title: event.target.value })}
      />
      <TextAreaField
        label="Paragraph one"
        value={value?.paragraph1 ?? ''}
        onChange={(event) => patch({ paragraph1: event.target.value })}
      />
      <TextAreaField
        label="Paragraph two"
        value={value?.paragraph2 ?? ''}
        onChange={(event) => patch({ paragraph2: event.target.value })}
      />
      <FieldRow>
        <TextField
          label="Quote text"
          value={value?.quote?.text ?? ''}
          onChange={(event) => patch({ quote: { ...value.quote, text: event.target.value } })}
        />
      </FieldRow>
      <FieldRow>
        <TextField
          label="Quote author"
          value={value?.quote?.author ?? ''}
          onChange={(event) => patch({ quote: { ...value.quote, author: event.target.value } })}
        />
        <TextField
          label="Quote role"
          value={value?.quote?.role ?? ''}
          onChange={(event) => patch({ quote: { ...value.quote, role: event.target.value } })}
        />
      </FieldRow>
      <ImageField
        label="Primary image"
        value={value?.primaryImage?.src ?? ''}
        onChange={(src) => onChange((prev) => ({ ...prev, primaryImage: { ...(prev.primaryImage ?? {}), src } }))}
        alt={value?.primaryImage?.alt ?? ''}
        onAltChange={(event) => onChange((prev) => ({ ...prev, primaryImage: { ...(prev.primaryImage ?? {}), alt: event.target.value } }))}
      />
      <ImageField
        label="Secondary image"
        value={value?.secondaryImage?.src ?? ''}
        onChange={(src) => onChange((prev) => ({ ...prev, secondaryImage: { ...(prev.secondaryImage ?? {}), src } }))}
        alt={value?.secondaryImage?.alt ?? ''}
        onAltChange={(event) => onChange((prev) => ({ ...prev, secondaryImage: { ...(prev.secondaryImage ?? {}), alt: event.target.value } }))}
      />
    </>
  )
}

function HighlightsForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  const baseFields = (key) => (
    <>
      <TextField
        label="Badge"
        value={value?.[key]?.badge ?? ''}
        onChange={(event) => onChange((prev) => ({ ...prev, [key]: { ...(prev[key] ?? {}), badge: event.target.value } }))}
      />
      <TextField
        label="Title"
        value={value?.[key]?.title ?? ''}
        onChange={(event) => onChange((prev) => ({ ...prev, [key]: { ...(prev[key] ?? {}), title: event.target.value } }))}
      />
      <TextAreaField
        label="Description"
        value={value?.[key]?.description ?? ''}
        onChange={(event) => onChange((prev) => ({ ...prev, [key]: { ...(prev[key] ?? {}), description: event.target.value } }))}
      />
      <ImageField
        label="Image"
        value={value?.[key]?.image?.src ?? ''}
        onChange={(src) => onChange((prev) => ({ ...prev, [key]: { ...(prev[key] ?? {}), image: { ...((prev[key]?.image) ?? {}), src } } }))}
        alt={value?.[key]?.image?.alt ?? ''}
        onAltChange={(event) => onChange((prev) => ({ ...prev, [key]: { ...(prev[key] ?? {}), image: { ...((prev[key]?.image) ?? {}), alt: event.target.value } } }))}
      />
    </>
  )
  return (
    <>
      <HighlightBlock>
        <strong>Frames feature</strong>
        {baseFields('framesFeature')}
        <StringRepeater
          label="Highlight"
          items={value?.framesFeature?.highlights ?? []}
          onChange={(highlights) => patch({ framesFeature: { ...value.framesFeature, highlights } })}
        />
      </HighlightBlock>
      <HighlightBlock>
        <strong>Pricing heading</strong>
        <TextField
          label="Tag"
          value={value?.pricing?.tag ?? ''}
          onChange={(event) => onChange((prev) => ({ ...prev, pricing: { ...(prev.pricing ?? {}), tag: event.target.value } }))}
        />
        <TextField
          label="Title"
          value={value?.pricing?.title ?? ''}
          onChange={(event) => onChange((prev) => ({ ...prev, pricing: { ...(prev.pricing ?? {}), title: event.target.value } }))}
        />
        <TextAreaField
          label="Description"
          value={value?.pricing?.description ?? ''}
          onChange={(event) => onChange((prev) => ({ ...prev, pricing: { ...(prev.pricing ?? {}), description: event.target.value } }))}
        />
      </HighlightBlock>
      <HighlightBlock>
        <strong>Studio grade</strong>
        {baseFields('studioGrade')}
        <Repeater
          items={value?.studioGrade?.features ?? []}
          onChange={(features) => patch({ studioGrade: { ...value.studioGrade, features } })}
          createItem={() => ({ title: 'New feature', desc: '' })}
          addLabel="Add feature"
          itemTitle={(item) => item.title || 'New feature'}
          renderItem={(item, index, { update: patchItem }) => (
            <>
              <TextField
                label="Feature title"
                value={item.title ?? ''}
                onChange={(event) => patchItem({ title: event.target.value })}
              />
              <TextAreaField
                label="Feature description"
                value={item.desc ?? ''}
                onChange={(event) => patchItem({ desc: event.target.value })}
              />
            </>
          )}
        />
      </HighlightBlock>
    </>
  )
}

const StringRepeater = ({ label, items, onChange }) => (
  <Repeater
    items={items}
    onChange={onChange}
    createItem={() => ''}
    addLabel={`Add ${label.toLowerCase()}`}
    itemTitle={(item, index) => item || `${label} ${index + 1}`}
    renderItem={(item, index, { replace }) => (
      <TextField
        label={`${label} ${index + 1}`}
        value={item ?? ''}
        onChange={(event) => replace(event.target.value)}
      />
    )}
  />
)

function BlissfulNestIntroForm({ value, onChange }) {
  return (
    <TextAreaField
      label="Introduction paragraph"
      rows={5}
      value={value?.paragraph ?? ''}
      onChange={(event) => onChange({ ...value, paragraph: event.target.value })}
    />
  )
}

function ExperienceTimelineForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <TextField
        label={FIELD_TERMS.eyebrow.label}
        hint={FIELD_TERMS.eyebrow.hint}
        value={value?.subtitle ?? ''}
        onChange={(event) => patch({ subtitle: event.target.value })}
      />
      <TextField
        label="Title"
        value={value?.title ?? ''}
        onChange={(event) => patch({ title: event.target.value })}
      />
      <TextAreaField
        label="Description"
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
      />
      <Repeater
        items={value?.steps ?? []}
        onChange={(steps) => patch({ steps })}
        createItem={() => ({ number: '07', title: 'New step', description: '' })}
        addLabel="Add step"
        itemTitle={(item) => item.title || 'New step'}
        renderItem={(item, index, { update: patchItem }) => (
          <>
            <TextField
              label="Number"
              value={item.number ?? ''}
              onChange={(event) => patchItem({ number: event.target.value })}
            />
            <TextField
              label="Title"
              value={item.title ?? ''}
              onChange={(event) => patchItem({ title: event.target.value })}
            />
            <TextAreaField
              label="Description"
              value={item.description ?? ''}
              onChange={(event) => patchItem({ description: event.target.value })}
            />
          </>
        )}
      />
    </>
  )
}

function CtaForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <TextField
        label={FIELD_TERMS.eyebrow.label}
        hint={FIELD_TERMS.eyebrow.hint}
        value={value?.eyebrow ?? ''}
        onChange={(event) => patch({ eyebrow: event.target.value })}
      />
      <TextField
        label="Title"
        value={value?.title ?? ''}
        onChange={(event) => patch({ title: event.target.value })}
      />
      <TextAreaField
        label="Description"
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
      />
      <FieldRow>
        <TextField
          label={FIELD_TERMS.primaryButton.label}
          hint={FIELD_TERMS.primaryButton.hint}
          value={value?.primaryCta ?? ''}
          onChange={(event) => patch({ primaryCta: event.target.value })}
        />
        <TextField
          label={FIELD_TERMS.secondaryButton.label}
          hint={FIELD_TERMS.secondaryButton.hint}
          value={value?.secondaryCta ?? ''}
          onChange={(event) => patch({ secondaryCta: event.target.value })}
        />
      </FieldRow>
    </>
  )
}
