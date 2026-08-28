/* eslint-disable react-refresh/only-export-components */
import { FieldRow, SelectField, TextAreaField, TextField } from '../../../components/FormField/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import Repeater from '../../../components/admin/Repeater/index.js'

const GALLERY_SIZES = ['large', 'portrait', 'medium', 'small', 'wide']

const createItemId = () => `item-${Date.now()}`
const createCategoryId = () => `cat-${Date.now()}`
const createStoryId = () => `story-${Date.now()}`

const categoryLabel = (values, categoryId) =>
  (values.categories ?? []).find((category) => category.id === categoryId)?.label ??
  categoryId

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

// Aligned to public website order: Hero → Introduction → Gallery (categories + items) → Featured Stories (heading + stories) → Instagram (heading + posts) → CTA
export const gallerySections = [
  {
    key: 'hero',
    title: 'Hero section',
    description: 'The opening of the gallery page.',
    type: 'object',
    form: HeroForm,
  },
  {
    key: 'introduction',
    title: 'Introduction section',
    description: 'The philosophy text shown below the hero.',
    type: 'object',
    form: IntroductionForm,
  },
  {
    key: 'categories',
    title: 'Gallery categories',
    description: 'The filters visitors use to browse the gallery.',
    type: 'list',
    itemLabel: 'category',
    createInitial: () => ({ id: createCategoryId(), label: 'New category' }),
    itemTitle: (item) => item.label || 'Unnamed category',
    itemMeta: (item, values) => [
      `${(values.items ?? []).filter((entry) => entry.category === item.id).length} images`,
    ],
    validate: (draft) => {
      const errors = {}
      if (!draft?.label?.trim()) {
        errors.label = 'A category label is required.'
      }
      return errors
    },
    itemForm: GalleryCategoryForm,
  },
  {
    key: 'items',
    title: 'Gallery items',
    description: 'The images in your gallery grid.',
    type: 'list',
    itemLabel: 'image',
    createInitial: (values) => ({
      id: createItemId(),
      src: '',
      alt: '',
      title: '',
      subtitle: '',
      category: values?.categories?.[0]?.id ?? '',
      size: 'medium',
    }),
    itemTitle: (item) => item.title || 'Untitled image',
    itemDescription: (item) => item.subtitle,
    itemMeta: (item, values) => [
      categoryLabel(values, item.category),
      item.size ?? 'medium',
    ],
    itemThumb: (item) => ({ src: item.src, alt: item.alt ?? item.title }),
    validate: (draft) => {
      const errors = {}
      if (!draft?.title?.trim()) {
        errors.title = 'A title is required.'
      }
      return errors
    },
    itemForm: GalleryItemForm,
  },
  {
    key: 'featuredStoriesSection',
    title: 'Featured stories section',
    description: 'The heading above the featured stories.',
    type: 'object',
    form: FeaturedStoriesSectionForm,
  },
  {
    key: 'featuredStories',
    title: 'Featured stories',
    description: 'The long-form event stories shown on the gallery page.',
    type: 'list',
    itemLabel: 'story',
    sectionMeta: (values) => [`${(values.featuredStories ?? []).length} stories`],
    createInitial: () => ({
      id: createStoryId(),
      image: '',
      tag: 'Featured Wedding',
      title: '',
      description: '',
      eventType: 'Wedding',
      location: '',
      narrative: '',
      gallery: [],
      highlights: [],
      services: [],
    }),
    itemTitle: (item) => item.title || 'Untitled story',
    itemDescription: (item) => item.description,
    itemMeta: (item) => [item.tag, item.eventType, item.location].filter(Boolean),
    itemThumb: (item) => ({ src: item.image, alt: item.title }),
    validate: (draft) => {
      const errors = {}
      if (!draft?.title?.trim()) {
        errors.title = 'A title is required.'
      }
      return errors
    },
    itemForm: FeaturedStoryForm,
  },
  {
    key: 'instagram',
    title: 'Instagram section',
    description: 'The follow-us heading.',
    type: 'object',
    form: InstagramSectionForm,
  },
  {
    key: 'instagramPosts',
    title: 'Instagram preview',
    description: 'The square posts in the follow-us strip.',
    type: 'flatList',
    sectionMeta: (values) => [`${(values.instagramPosts ?? []).length} posts`],
    form: InstagramPostsForm,
  },
  {
    key: 'cta',
    title: 'Call to action',
    description: 'The closing invitation on the gallery page.',
    type: 'object',
    form: CtaForm,
  },
]

function GalleryItemForm({ value, onChange, errors, values }) {
  return (
    <>
      <TextField
        label="Title"
        value={value?.title ?? ''}
        onChange={(event) => onChange({ ...value, title: event.target.value })}
        error={errors.title}
      />
      <TextField
        label="Subtitle"
        value={value?.subtitle ?? ''}
        onChange={(event) => onChange({ ...value, subtitle: event.target.value })}
      />
      <FieldRow>
        <SelectField
          label="Category"
          value={value?.category ?? ''}
          onChange={(event) => onChange({ ...value, category: event.target.value })}
          options={(values.categories ?? []).map((category) => ({
            value: category.id,
            label: category.label,
          }))}
          placeholder="Select a category"
        />
        <SelectField
          label="Grid size"
          value={value?.size ?? 'medium'}
          onChange={(event) => onChange({ ...value, size: event.target.value })}
          options={GALLERY_SIZES}
        />
      </FieldRow>
      <ImageField
        label="Image"
        value={value?.src ?? ''}
        onChange={(src) => onChange({ ...value, src })}
        alt={value?.alt ?? ''}
        onAltChange={(event) => onChange({ ...value, alt: event.target.value })}
      />
    </>
  )
}

function GalleryCategoryForm({ value, onChange, errors }) {
  return (
    <>
      <TextField
        label="Category label"
        value={value?.label ?? ''}
        onChange={(event) => onChange({ ...value, label: event.target.value })}
        placeholder="e.g. Weddings"
        error={errors.label}
      />
      <TextField
        label="Category id"
        value={value?.id ?? ''}
        onChange={(event) => onChange({ ...value, id: event.target.value })}
        hint="Used to link gallery items to this category."
      />
    </>
  )
}

function FeaturedStoryForm({ value, onChange, errors }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <FieldRow>
        <TextField
          label="Tag"
          value={value?.tag ?? ''}
          onChange={(event) => patch({ tag: event.target.value })}
        />
        <TextField
          label="Event type"
          value={value?.eventType ?? ''}
          onChange={(event) => patch({ eventType: event.target.value })}
        />
      </FieldRow>
      <TextField
        label="Title"
        value={value?.title ?? ''}
        onChange={(event) => patch({ title: event.target.value })}
        error={errors.title}
      />
      <TextField
        label="Location"
        value={value?.location ?? ''}
        onChange={(event) => patch({ location: event.target.value })}
      />
      <TextAreaField
        label="Description"
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
      />
      <TextAreaField
        label="Narrative"
        rows={6}
        value={value?.narrative ?? ''}
        onChange={(event) => patch({ narrative: event.target.value })}
      />
      <ImageField
        label="Cover image"
        value={value?.image ?? ''}
        onChange={(image) => patch({ image })}
      />
      <Repeater
        items={value?.gallery ?? []}
        onChange={(gallery) => patch({ gallery })}
        createItem={() => ''}
        addLabel="Add gallery image"
        itemTitle={(image, index) => `Gallery image ${index + 1}`}
        renderItem={(image, index, { replace }) => (
          <ImageField
            label={`Gallery image ${index + 1}`}
            value={image ?? ''}
            onChange={(nextUrl) => replace(nextUrl)}
          />
        )}
      />
      <StringsRepeater
        label="Highlight"
        items={value?.highlights ?? []}
        onChange={(highlights) => patch({ highlights })}
        addLabel="Add highlight"
        placeholder="e.g. A hand-built floral archway"
      />
      <StringsRepeater
        label="Service"
        items={value?.services ?? []}
        onChange={(services) => patch({ services })}
        addLabel="Add service"
        placeholder="e.g. Event Decor Hire"
      />
    </>
  )
}

function InstagramPostsForm({ value, onChange }) {
  return (
    <Repeater
      items={value ?? []}
      onChange={onChange}
      createItem={() => ({ id: `post-${Date.now()}`, src: '' })}
      addLabel="Add post"
      itemTitle={(item, index) => `Post ${index + 1}`}
      renderItem={(item, index, { update: patch }) => (
        <ImageField
          label={`Post ${index + 1} image`}
          value={item.src ?? ''}
          onChange={(src) => patch({ src })}
        />
      )}
    />
  )
}

function HeroForm({ value, onChange }) {
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
          value={value?.primaryCTA ?? ''}
          onChange={(event) => patch({ primaryCTA: event.target.value })}
        />
        <TextField
          label="Secondary button"
          value={value?.secondaryCTA ?? ''}
          onChange={(event) => patch({ secondaryCTA: event.target.value })}
        />
      </FieldRow>
      <ImageField
        label="Background image"
        value={value?.backgroundImage ?? ''}
        onChange={(backgroundImage) => patch({ backgroundImage })}
      />
    </>
  )
}

function IntroductionForm({ value, onChange }) {
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
        label="Intro text"
        value={value?.text ?? ''}
        onChange={(event) => patch({ text: event.target.value })}
      />
    </>
  )
}

function InstagramSectionForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <TextField
        label="Eyebrow"
        value={value?.eyebrow ?? ''}
        onChange={(event) => patch({ eyebrow: event.target.value })}
      />
      <TextField
        label="Handle"
        value={value?.title ?? ''}
        onChange={(event) => patch({ title: event.target.value })}
      />
    </>
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
          value={value?.primaryCTA ?? ''}
          onChange={(event) => patch({ primaryCTA: event.target.value })}
        />
        <TextField
          label="Secondary button"
          value={value?.secondaryCTA ?? ''}
          onChange={(event) => patch({ secondaryCTA: event.target.value })}
        />
      </FieldRow>
      <ImageField
        label="Background image"
        value={value?.backgroundImage ?? ''}
        onChange={(backgroundImage) => patch({ backgroundImage })}
      />
    </>
  )
}

function FeaturedStoriesSectionForm({ value, onChange }) {
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
    </>
  )
}
