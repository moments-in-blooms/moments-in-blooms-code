/* eslint-disable react-refresh/only-export-components */
import { FieldRow, SelectField, TextAreaField, TextField } from '../../../components/FormField/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import Repeater from '../../../components/admin/Repeater/index.js'
import ToggleSwitch from '../../../components/admin/ToggleSwitch/index.js'

const GALLERY_VARIANTS = ['feature', 'portrait', 'detail']

const createServiceId = () => `service-${Date.now()}`
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
    title: 'Hero',
    description: 'The very first words visitors see on your homepage.',
    type: 'object',
    form: HeroForm,
  },
  {
    key: 'trustMarks',
    title: 'Trusted-by marks',
    description: "The short phrases shown near the hero, e.g. 'Weddings'.",
    type: 'flatList',
    sectionMeta: (values) => [`${(values.trustMarks ?? []).length} marks`],
    form: TrustMarksForm,
  },
  {
    key: 'services',
    title: 'Services',
    description: 'The three service cards that link to your services page.',
    type: 'list',
    itemLabel: 'service',
    sectionMeta: (values) => [`${(values.services ?? []).length} services`],
    createInitial: () => ({
      id: createServiceId(),
      eyebrow: 'New service',
      title: 'New service',
      description: '',
      path: '/services',
      offset: false,
      image: { src: '', alt: '' },
    }),
    itemTitle: (item) => item.title || 'Untitled service',
    itemDescription: (item) => item.description,
    itemMeta: (item) => [item.eyebrow].filter(Boolean),
    itemThumb: (item) => ({ src: item.image?.src, alt: item.image?.alt }),
    validate: (draft) => {
      const errors = {}
      if (!draft?.title?.trim()) {
        errors.title = 'A title is required.'
      }
      return errors
    },
    itemForm: ServiceItemForm,
  },
  {
    key: 'galleryItems',
    title: 'Gallery preview',
    description: 'The three images shown in the homepage gallery strip.',
    type: 'list',
    itemLabel: 'image',
    sectionMeta: (values) => [`${(values.galleryItems ?? []).length} images`],
    createInitial: () => ({
      id: createGalleryId(),
      variant: 'detail',
      image: { src: '', alt: '' },
    }),
    itemTitle: (item) => item.image?.alt?.slice(0, 60) || 'Untitled image',
    itemDescription: (item) => `Layout: ${item.variant ?? 'detail'}`,
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
    title: 'Why choose us',
    description: 'The numbered reasons your clients choose Moments in Blooms.',
    type: 'flatList',
    sectionMeta: (values) => [`${(values.reasons ?? []).length} reasons`],
    form: ReasonsForm,
  },
  {
    key: 'testimonials',
    title: 'Testimonials',
    description: 'The client quotes shown on the homepage.',
    type: 'list',
    itemLabel: 'testimonial',
    sectionMeta: (values) => [`${(values.testimonials ?? []).length} testimonials`],
    createInitial: () => ({
      id: createTestimonialId(),
      quote: '',
      name: 'A happy client',
      event: 'Wedding celebration',
      location: 'Melbourne, VIC',
      image: { src: '', alt: '' },
    }),
    itemTitle: (item) => item.name || 'Untitled testimonial',
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
    title: 'Instagram preview',
    description: 'The six images in the follow-us strip.',
    type: 'flatList',
    sectionMeta: (values) => [`${(values.instagramItems ?? []).length} images`],
    form: InstagramItemsForm,
  },
  {
    key: 'cta',
    title: 'Call to action',
    description: 'The closing invitation at the bottom of the homepage.',
    type: 'object',
    form: CtaForm,
  },
]

function HeroForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...next }))
  return (
    <>
      <TextField
        label="Eyebrow"
        value={value?.eyebrow ?? ''}
        onChange={(event) => patch({ eyebrow: event.target.value })}
      />
      <TextField
        label="Headline"
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
          label="Primary button"
          value={value?.primaryCta ?? ''}
          onChange={(event) => patch({ primaryCta: event.target.value })}
        />
        <TextField
          label="Secondary button"
          value={value?.secondaryCta ?? ''}
          onChange={(event) => patch({ secondaryCta: event.target.value })}
        />
      </FieldRow>
      <ImageField
        label="Hero image"
        value={value?.image?.src ?? ''}
        onChange={(src) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), src } }))}
        alt={value?.image?.alt ?? ''}
        onAltChange={(event) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), alt: event.target.value } }))}
      />
    </>
  )
}

function TrustMarksForm({ value, onChange }) {
  return (
    <StringsRepeater
      label="Mark"
      items={value ?? []}
      onChange={onChange}
      addLabel="Add mark"
      placeholder="e.g. Weddings"
    />
  )
}

function ServiceItemForm({ value, onChange, errors }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <TextField
        label="Eyebrow"
        value={value?.eyebrow ?? ''}
        onChange={(event) => patch({ eyebrow: event.target.value })}
      />
      <TextField
        label="Title"
        value={value?.title ?? ''}
        onChange={(event) => patch({ title: event.target.value })}
        error={errors.title}
      />
      <TextAreaField
        label="Description"
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
      />
      <ToggleSwitch
        label="Offset layout"
        hint="Alternates the card layout on the homepage."
        checked={value?.offset}
        onChange={(offset) => patch({ offset })}
      />
      <ImageField
        label="Card image"
        value={value?.image?.src ?? ''}
        onChange={(src) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), src } }))}
        alt={value?.image?.alt ?? ''}
        onAltChange={(event) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), alt: event.target.value } }))}
      />
    </>
  )
}

function GalleryPreviewItemForm({ value, onChange, errors }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <SelectField
        label="Layout variant"
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
        label="Eyebrow"
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
          label="Primary button"
          value={value?.primaryCta ?? ''}
          onChange={(event) => patch({ primaryCta: event.target.value })}
        />
        <TextField
          label="Secondary button"
          value={value?.secondaryCta ?? ''}
          onChange={(event) => patch({ secondaryCta: event.target.value })}
        />
      </FieldRow>
    </>
  )
}

