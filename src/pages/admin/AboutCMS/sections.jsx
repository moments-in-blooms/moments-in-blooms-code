/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components'
import { FieldRow, SelectField, TextAreaField, TextField } from '../../../components/FormField/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import Repeater from '../../../components/admin/Repeater/index.js'

const CORE_VALUE_ICONS = ['FiStar', 'FiAward', 'FiFeather', 'FiHeart', 'FiShield', 'FiGift', 'FiSun']

const PanelFieldset = styled.fieldset`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  margin: 0;
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

const SubtitleTitleFields = ({ value, onChange }) => (
  <>
    <TextField
      label="Eyebrow"
      value={value?.subtitle ?? ''}
      onChange={(event) => onChange({ ...value, subtitle: event.target.value })}
    />
    <TextField
      label="Title"
      value={value?.title ?? ''}
      onChange={(event) => onChange({ ...value, title: event.target.value })}
    />
  </>
)

const ParagraphsRepeater = ({ value, onChange }) => (
  <Repeater
    items={value?.paragraphs ?? []}
    onChange={(paragraphs) => onChange({ ...value, paragraphs })}
    createItem={() => ''}
    addLabel="Add paragraph"
    itemTitle={(paragraph) => paragraph.slice(0, 48) || 'New paragraph'}
    renderItem={(paragraph, index, { replace }) => (
      <TextAreaField
        label={`Paragraph ${index + 1}`}
        value={paragraph ?? ''}
        onChange={(event) => replace(event.target.value)}
      />
    )}
  />
)

const TriFieldsRepeater = ({ items, onChange, createItem, addLabel, numberKey = 'number' }) => (
  <Repeater
    items={items ?? []}
    onChange={onChange}
    createItem={createItem}
    addLabel={addLabel}
    itemTitle={(item) => item.title || 'New item'}
    renderItem={(item, index, { update: patch }) => (
      <>
        <TextField
          label="Number"
          value={item[numberKey] ?? ''}
          onChange={(event) => patch({ [numberKey]: event.target.value })}
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

export const aboutSections = [
  {
    key: 'hero',
    title: 'Hero',
    description: 'The opening of your About page.',
    type: 'object',
    form: HeroForm,
  },
  {
    key: 'brandStory',
    title: 'Brand story',
    description: 'The narrative that introduces your studio.',
    type: 'object',
    form: BrandStoryForm,
  },
  {
    key: 'missionVision',
    title: 'Mission & vision',
    description: "Your studio's purpose and where it is heading.",
    type: 'object',
    form: MissionVisionForm,
  },
  {
    key: 'coreValues',
    title: 'Core values',
    description: 'The values that guide your work, with an icon for each.',
    type: 'flatList',
    sectionMeta: (values) => [`${(values.coreValues ?? []).length} values`],
    form: CoreValuesForm,
  },
  {
    key: 'whyChooseUs',
    title: 'Why choose us',
    description: 'The highlights that set your studio apart.',
    type: 'object',
    form: WhyChooseUsForm,
  },
  {
    key: 'behindExperience',
    title: 'Behind the experience',
    description: 'The steps clients move through with your studio.',
    type: 'object',
    form: BehindExperienceForm,
  },
  {
    key: 'stats',
    title: 'Stats',
    description: "The figures that show your studio's track record.",
    type: 'object',
    form: StatsForm,
  },
  {
    key: 'testimonialHighlight',
    title: 'Featured testimonial',
    description: 'The standout quote highlighted on the About page.',
    type: 'object',
    form: TestimonialHighlightForm,
  },
  {
    key: 'cta',
    title: 'Call to action',
    description: 'The closing invitation on the About page.',
    type: 'object',
    form: CtaForm,
  },
]

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
          label="Primary button label"
          value={value?.primaryCta?.label ?? ''}
          onChange={(event) => patch({ primaryCta: { ...value.primaryCta, label: event.target.value } })}
        />
        <TextField
          label="Secondary button label"
          value={value?.secondaryCta?.label ?? ''}
          onChange={(event) => patch({ secondaryCta: { ...value.secondaryCta, label: event.target.value } })}
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

function BrandStoryForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <SubtitleTitleFields value={value} onChange={patch} />
      <ParagraphsRepeater value={value} onChange={patch} />
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
        label="Story image"
        value={value?.image?.src ?? ''}
        onChange={(src) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), src } }))}
        alt={value?.image?.alt ?? ''}
        onAltChange={(event) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), alt: event.target.value } }))}
      />
    </>
  )
}

function MissionVisionForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  const panel = (key, label) => (
    <PanelFieldset>
      <strong>{label}</strong>
      <TextField
        label="Tag"
        value={value?.[key]?.tag ?? ''}
        onChange={(event) => patch({ [key]: { ...value[key], tag: event.target.value } })}
      />
      <TextField
        label="Title"
        value={value?.[key]?.title ?? ''}
        onChange={(event) => patch({ [key]: { ...value[key], title: event.target.value } })}
      />
      <TextAreaField
        label="Description"
        value={value?.[key]?.description ?? ''}
        onChange={(event) => patch({ [key]: { ...value[key], description: event.target.value } })}
      />
    </PanelFieldset>
  )
  return (
    <>
      <SubtitleTitleFields value={value} onChange={patch} />
      {panel('mission', 'Mission')}
      {panel('vision', 'Vision')}
    </>
  )
}

function CoreValuesForm({ value, onChange }) {
  return (
    <Repeater
      items={value ?? []}
      onChange={onChange}
      createItem={() => ({ id: `value-${Date.now()}`, iconName: 'FiHeart', title: 'New value', description: '' })}
      addLabel="Add value"
      itemTitle={(item) => item.title || 'New value'}
      renderItem={(item, index, { update: patch }) => (
        <>
          <SelectField
            label="Icon"
            value={item.iconName ?? 'FiHeart'}
            onChange={(event) => patch({ iconName: event.target.value })}
            options={CORE_VALUE_ICONS}
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

function WhyChooseUsForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <SubtitleTitleFields value={value} onChange={patch} />
      <TextAreaField
        label="Description"
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
      />
      <TriFieldsRepeater
        items={value?.highlights}
        onChange={(highlights) => patch({ highlights })}
        createItem={() => ({ number: '01', title: 'New highlight', description: '' })}
        addLabel="Add highlight"
      />
    </>
  )
}

function BehindExperienceForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <SubtitleTitleFields value={value} onChange={patch} />
      <TextAreaField
        label="Description"
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
      />
      <TriFieldsRepeater
        items={value?.steps}
        onChange={(steps) => patch({ steps })}
        createItem={() => ({ stepNumber: '01', title: 'New step', description: '' })}
        addLabel="Add step"
        numberKey="stepNumber"
      />
    </>
  )
}

function StatsForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <SubtitleTitleFields value={value} onChange={patch} />
      <TextAreaField
        label="Description"
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
      />
      <Repeater
        items={value?.items ?? []}
        onChange={(items) => patch({ items })}
        createItem={() => ({ value: '150+', label: 'Celebrations', description: '' })}
        addLabel="Add stat"
        itemTitle={(item) => `${item.value ?? ''} ${item.label ?? ''}`.trim() || 'New stat'}
        renderItem={(item, index, { update: patchItem }) => (
          <>
            <FieldRow>
              <TextField
                label="Value"
                value={item.value ?? ''}
                onChange={(event) => patchItem({ value: event.target.value })}
              />
              <TextField
                label="Label"
                value={item.label ?? ''}
                onChange={(event) => patchItem({ label: event.target.value })}
              />
            </FieldRow>
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

function TestimonialHighlightForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <SubtitleTitleFields value={value} onChange={patch} />
      <TextAreaField
        label="Quote"
        value={value?.quote ?? ''}
        onChange={(event) => patch({ quote: event.target.value })}
      />
      <FieldRow>
        <TextField
          label="Author"
          value={value?.author ?? ''}
          onChange={(event) => patch({ author: event.target.value })}
        />
        <TextField
          label="Role"
          value={value?.role ?? ''}
          onChange={(event) => patch({ role: event.target.value })}
        />
      </FieldRow>
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

function CtaForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <SubtitleTitleFields value={value} onChange={patch} />
      <TextAreaField
        label="Description"
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
      />
      <FieldRow>
        <TextField
          label="Primary button label"
          value={value?.primaryCta?.label ?? ''}
          onChange={(event) => patch({ primaryCta: { ...value.primaryCta, label: event.target.value } })}
        />
        <TextField
          label="Secondary button label"
          value={value?.secondaryCta?.label ?? ''}
          onChange={(event) => patch({ secondaryCta: { ...value.secondaryCta, label: event.target.value } })}
        />
      </FieldRow>
    </>
  )
}

