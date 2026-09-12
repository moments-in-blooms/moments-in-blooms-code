/* eslint-disable react-refresh/only-export-components */
import { FIELD_TERMS, SECTION_TERMS } from '../../../constants/adminTerms.js'
import { FieldRow, SelectField, TextAreaField, TextField } from '../../../components/FormField/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import Repeater from '../../../components/admin/Repeater/index.js'

const GALLERY_VARIANTS = ['feature', 'portrait', 'detail']

const createGalleryId = () => `gallery-${Date.now()}`
const createTestimonialId = () => `testimonial-${Date.now()}`

const StringsRepeater = ({ label, items, onChange, addLabel, placeholder }) => (
  <Repeater
    items={items}
    onChange={onChange}
    createItem={() => ''}
    addLabel={addLabel}
    itemTitle={(item, index) => item || `${label} ${index + 1}`}
    renderItem={(item, index, { replace }) => (
      <TextField
        label={`${label} ${index + 1}`}
        value={item ?? ''}
        onChange={(event) => replace(event.target.value)}
        placeholder={placeholder}
      />
    )}
  />
)

export const homepageSections = [
  {
    key: 'hero',
    title: SECTION_TERMS.hero.label,
    description: SECTION_TERMS.hero.hint,
    type: 'object',
    form: HeroForm,
  },
  {
    key: 'trustMarks',
    title: SECTION_TERMS.trustMarks.label,
    description: SECTION_TERMS.trustMarks.hint,
    type: 'flatList',
    sectionMeta: (values) => [`${(values.trustMarks ?? []).length} badges`],
    form: TrustMarksForm,
  },
  {
    key: 'servicesHeading',
    title: SECTION_TERMS.servicesHeading.label,
    description: SECTION_TERMS.servicesHeading.hint,
    type: 'object',
    sectionMeta: (values) => [values.servicesHeading?.title].filter(Boolean),
    form: SectionHeadingForm,
  },
  {
    key: 'galleryHeading',
    title: SECTION_TERMS.galleryHeading.label,
    description: SECTION_TERMS.galleryHeading.hint,
    type: 'object',
    sectionMeta: (values) => [values.galleryHeading?.title].filter(Boolean),
    form: SectionHeadingForm,
  },
  {
    key: 'galleryItems',
    title: SECTION_TERMS.galleryItems.label,
    description: SECTION_TERMS.galleryItems.hint,
    type: 'list',
    itemLabel: 'image',
    sectionMeta: (values) => [`${(values.galleryItems ?? []).length} images`],
    createInitial: () => ({
      id: createGalleryId(),
      variant: 'detail',
      image: { src: '', alt: '' },
    }),
    itemTitle: (item) => item.image?.alt?.slice(0, 60) || 'Untitled image',
    itemDescription: (item) => `Photo arrangement: ${item.variant ?? 'detail'}`,
    itemMeta: (item) => [item.variant ?? 'detail'],
    itemThumb: (item) => ({ src: item.image?.src, alt: item.image?.alt }),
    validate: (draft) => {
      const errors = {}
      if (!draft?.image?.src?.trim()) {
        errors.image = 'An image URL is required.'
      }
      return errors
    },
    itemForm: GalleryPreviewItemForm,
  },
  {
    key: 'reasons',
    title: SECTION_TERMS.reasons.label,
    description: SECTION_TERMS.reasons.hint,
    type: 'flatList',
    sectionMeta: (values) => [`${(values.reasons ?? []).length} reasons`],
    form: ReasonsForm,
  },
  {
    key: 'testimonials',
    title: SECTION_TERMS.testimonials.label,
    description: SECTION_TERMS.testimonials.hint,
    type: 'list',
    itemLabel: 'review',
    sectionMeta: (values) => [`${(values.testimonials ?? []).length} reviews`],
    createInitial: () => ({
      id: createTestimonialId(),
      quote: '',
      name: 'A happy client',
      event: 'Wedding celebration',
      location: 'Melbourne, VIC',
      image: { src: '', alt: '' },
    }),
    itemTitle: (item) => item.name || 'Untitled review',
    itemDescription: (item) => item.quote,
    itemMeta: (item) => [item.event, item.location].filter(Boolean),
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
    itemForm: TestimonialItemForm,
  },
  {
    key: 'instagramItems',
    title: SECTION_TERMS.instagramItems.label,
    description: SECTION_TERMS.instagramItems.hint,
    type: 'flatList',
    sectionMeta: (values) => [`${(values.instagramItems ?? []).length} images`],
    form: InstagramItemsForm,
  },
  {
    key: 'cta',
    title: SECTION_TERMS.cta.label,
    description: SECTION_TERMS.cta.hint,
    type: 'object',
    form: CtaForm,
  },
]

function HeroForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...next }))
  return (
    <>
      <TextField
        label={FIELD_TERMS.eyebrow.label}
        hint={FIELD_TERMS.eyebrow.hint}
        value={value?.eyebrow ?? ''}
        onChange={(event) => patch({ eyebrow: event.target.value })}
      />
      <TextField
        label={FIELD_TERMS.headline.label}
        value={value?.title ?? ''}
        onChange={(event) => patch({ title: event.target.value })}
      />
      <TextAreaField
        label="Description"
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
      />
      <TextAreaField
        label={FIELD_TERMS.floatingWords.label}
        rows={3}
        value={value?.sideNote ?? ''}
        onChange={(event) => patch({ sideNote: event.target.value })}
        hint={FIELD_TERMS.floatingWords.hint}
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

function SectionHeadingForm({ value, onChange }) {
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
        rows={3}
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
      />
    </>
  )
}

function TrustMarksForm({ value, onChange }) {
  return (
    <StringsRepeater
      label={FIELD_TERMS.mark.label}
      items={value ?? []}
      onChange={onChange}
      addLabel="Add badge"
      placeholder="e.g. Weddings"
    />
  )
}

function GalleryPreviewItemForm({ value, onChange, errors }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <SelectField
        label={FIELD_TERMS.layoutVariant.label}
        hint={FIELD_TERMS.layoutVariant.hint}
        value={value?.variant ?? 'detail'}
        onChange={(event) => patch({ variant: event.target.value })}
        options={GALLERY_VARIANTS}
      />
      <ImageField
        label="Image"
        value={value?.image?.src ?? ''}
        onChange={(src) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), src } }))}
        alt={value?.image?.alt ?? ''}
        onAltChange={(event) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), alt: event.target.value } }))}
        error={errors.image}
      />
    </>
  )
}

function ReasonsForm({ value, onChange }) {
  return (
    <Repeater
      items={value ?? []}
      onChange={onChange}
      createItem={() => ({ number: '06', title: 'New reason', description: '' })}
      addLabel="Add reason"
      itemTitle={(item) => item.title || 'New reason'}
      renderItem={(item, index, { update: patch }) => (
        <>
          <TextField
            label="Number"
            value={item.number ?? ''}
            onChange={(event) => patch({ number: event.target.value })}
          />
          <TextField
            label="Title"
            value={item.title ?? ''}
            onChange={(event) => patch({ title: event.target.value })}
          />
          <TextAreaField
            label="Description"
            rows={3}
            value={item.description ?? ''}
            onChange={(event) => patch({ description: event.target.value })}
          />
        </>
      )}
    />
  )
}

function TestimonialItemForm({ value, onChange, errors }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <TextAreaField
        label="Quote"
        value={value?.quote ?? ''}
        onChange={(event) => patch({ quote: event.target.value })}
        error={errors.quote}
      />
      <FieldRow>
        <TextField
          label="Name"
          value={value?.name ?? ''}
          onChange={(event) => patch({ name: event.target.value })}
          error={errors.name}
        />
        <TextField
          label="Event"
          value={value?.event ?? ''}
          onChange={(event) => patch({ event: event.target.value })}
        />
      </FieldRow>
      <TextField
        label="Location"
        value={value?.location ?? ''}
        onChange={(event) => patch({ location: event.target.value })}
      />
      <ImageField
        label="Portrait image"
        value={value?.image?.src ?? ''}
        onChange={(src) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), src } }))}
        alt={value?.image?.alt ?? ''}
        onAltChange={(event) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), alt: event.target.value } }))}
      />
    </>
  )
}

function InstagramItemsForm({ value, onChange }) {
  const items = value ?? []
  return (
    <Repeater
      items={items}
      onChange={onChange}
      createItem={() => ({ id: `insta-${Date.now()}`, image: { src: '', alt: '' } })}
      addLabel="Add image"
      itemTitle={(item, index) => item.image?.alt?.slice(0, 40) || `Image ${index + 1}`}
      renderItem={(item, index) => (
        <ImageField
          label="Image"
          value={item.image?.src ?? ''}
          onChange={(src) => {
            const next = [...items]
            next[index] = { ...next[index], image: { src, alt: next[index]?.image?.alt ?? '' } }
            onChange(next)
          }}
          alt={item.image?.alt ?? ''}
          onAltChange={(event) => {
            const next = [...items]
            next[index] = { ...next[index], image: { src: next[index]?.image?.src ?? '', alt: event.target.value } }
            onChange(next)
          }}
        />
      )}
    />
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

