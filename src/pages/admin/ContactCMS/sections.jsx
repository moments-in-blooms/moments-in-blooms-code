/* eslint-disable react-refresh/only-export-components */
import { TextAreaField, TextField } from '../../../components/FormField/index.js'
import { HelpText } from '../../../components/FormField/FormField.styles.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import Repeater from '../../../components/admin/Repeater/index.js'

export const contactSections = [
  {
    key: 'hero',
    title: 'Hero',
    description: 'The opening of your Contact page.',
    type: 'object',
    form: HeroForm,
  },
  {
    key: 'information',
    title: 'Contact information',
    description: 'The introduction and response note shown on the contact page.',
    type: 'object',
    form: InformationForm,
  },
  {
    key: 'enquiryFormRail',
    title: 'Enquiry form rail',
    description: "The 'What happens after you send it?' steps beside the form.",
    type: 'object',
    sectionMeta: (values) => [
      `${(values.enquiryFormRail?.steps ?? []).length} steps`,
    ],
    form: EnquiryFormRailForm,
  },
  {
    key: 'cta',
    title: 'Call to action',
    description: 'The closing invitation at the bottom of the contact page.',
    type: 'object',
    form: CtaForm,
  },
  {
    key: 'enquiryFormOptions',
    title: 'Enquiry form options',
    description: 'The choices offered to clients in the enquiry form.',
    type: 'object',
    sectionMeta: (values) => [
      `${(values.eventTypeOptions ?? []).length} event types`,
      `${(values.serviceInterestOptions ?? []).length} services`,
      `${(values.guestCountOptions ?? []).length} guest`,
      `${(values.setupRequirementOptions ?? []).length} setup`,
    ],
    form: EnquiryFormOptionsForm,
  },
]

function HeroForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <TextField
        label="Eyebrow"
        hint="Small label above the title (e.g. 'Let's create something beautiful')."
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
      <TextField
        label="Note"
        hint="Short reassurance shown below the description (e.g. 'Every enquiry is reviewed personally')."
        value={value?.note ?? ''}
        onChange={(event) => patch({ note: event.target.value })}
      />
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

function InformationForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <TextField
        label="Eyebrow"
        hint="Small label above the title (e.g. 'Prefer a conversation?')."
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
      <TextField
        label="Response note"
        hint="Shown below the description — sets expectations about reply timing."
        value={value?.responseNote ?? ''}
        onChange={(event) => patch({ responseNote: event.target.value })}
      />
    </>
  )
}

function EnquiryFormRailForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <TextField
        label="Eyebrow"
        hint="Small label above the title (e.g. 'Your enquiry, in good hands')."
        value={value?.eyebrow ?? ''}
        onChange={(event) => patch({ eyebrow: event.target.value })}
      />
      <TextField
        label="Title"
        value={value?.title ?? ''}
        onChange={(event) => patch({ title: event.target.value })}
      />
      <TextField
        label="Note"
        hint="Closing remark shown below the steps (e.g. 'The team usually replies within one to two business days')."
        value={value?.note ?? ''}
        onChange={(event) => patch({ note: event.target.value })}
      />
      <HelpText>
        Step numbers are generated automatically from the order below. Drag to reorder.
      </HelpText>
      <Repeater
        items={value?.steps ?? []}
        onChange={(steps) => patch({ steps })}
        createItem={() => ({ title: 'New step', description: '' })}
        addLabel="Add step"
        itemTitle={(step, index) => {
          const num = String(index + 1).padStart(2, '0')
          return `${num} — ${step.title || 'New step'}`
        }}
        renderItem={(step, index, { update: patchStep }) => (
          <>
            <TextField
              label={`Step ${String(index + 1).padStart(2, '0')} title`}
              value={step.title ?? ''}
              onChange={(event) => patchStep({ title: event.target.value })}
            />
            <TextAreaField
              label="Description"
              value={step.description ?? ''}
              onChange={(event) => patchStep({ description: event.target.value })}
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
        label="Eyebrow"
        hint="Small label above the title (e.g. 'Feeling inspired?')."
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
    </>
  )
}

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

function EnquiryFormOptionsForm({ value, onChange }) {
  const eventTypes = value?.eventTypeOptions ?? []
  const serviceOptions = value?.serviceInterestOptions ?? []

  const isDuplicateEventType = (current) => {
    const normalized = String(current ?? '').trim().toLowerCase()
    if (!normalized) return false
    return eventTypes.filter((entry) => String(entry ?? '').trim().toLowerCase() === normalized).length > 1
  }

  const isDuplicateServiceValue = (current) => {
    const normalized = String(current ?? '').trim().toLowerCase()
    if (!normalized) return false
    return serviceOptions.filter((entry) => String(entry.value ?? '').trim().toLowerCase() === normalized).length > 1
  }

  return (
    <>
      <HelpText>
        These are the choices shown in the enquiry form on the public Contact page.
        Add or remove options to match the services and events you offer. Drag to reorder — order here is the order in the public dropdown.
      </HelpText>
      <Repeater
        items={eventTypes}
        onChange={(eventTypeOptions) => onChange({ ...value, eventTypeOptions })}
        createItem={() => ''}
        addLabel="Add event type"
        itemTitle={(item, index) => item || `Event type ${index + 1}`}
        renderItem={(item, index, { replace }) => (
          <TextField
            label={`Event type ${index + 1}`}
            value={item ?? ''}
            onChange={(event) => replace(event.target.value)}
            placeholder="e.g. Wedding"
            error={isDuplicateEventType(item, index) ? 'Duplicate — must be unique.' : undefined}
            hint={index === 0 ? 'Order = dropdown order. Drag to reorder.' : undefined}
          />
        )}
      />
      <HelpText style={{ marginTop: '1.5rem' }}>
        Options shown in the Service Interest step — clients can select multiple. <strong>Label</strong> is shown to clients,{' '}
        <strong>value</strong> is stored in the database (use <code>kebab-case</code>, unique, e.g. <code>event-decor-hire</code>).
      </HelpText>
      <Repeater
        items={serviceOptions}
        onChange={(serviceInterestOptions) => onChange({ ...value, serviceInterestOptions })}
        createItem={() => ({ value: 'new-service', label: 'New service' })}
        addLabel="Add service option"
        itemTitle={(item) => item.label || 'New option'}
        renderItem={(item, index, { update: patch }) => (
          <>
            <TextField
              label="Label"
              value={item.label ?? ''}
              onChange={(event) => patch({ label: event.target.value })}
              placeholder="e.g. Event Decor Hire"
            />
            <TextField
              label="Value"
              value={item.value ?? ''}
              onChange={(event) => patch({ value: event.target.value })}
              placeholder="e.g. event-decor-hire"
              hint="kebab-case, unique"
              error={isDuplicateServiceValue(item.value, index) ? 'Duplicate value — must be unique.' : undefined}
            />
          </>
        )}
      />
      <HelpText style={{ marginTop: '1.5rem' }}>
        Options shown in the Guest Count dropdown during event details. Drag to reorder.
      </HelpText>
      <StringsRepeater
        label="Guest count"
        items={value?.guestCountOptions ?? []}
        onChange={(guestCountOptions) => onChange({ ...value, guestCountOptions })}
        addLabel="Add guest count"
        placeholder="e.g. 51–100"
      />
      <HelpText style={{ marginTop: '1.5rem' }}>
        Options shown in the Setup &amp; Styling step — clients pick one. Drag to reorder.
      </HelpText>
      <StringsRepeater
        label="Setup option"
        items={value?.setupRequirementOptions ?? []}
        onChange={(setupRequirementOptions) => onChange({ ...value, setupRequirementOptions })}
        addLabel="Add setup option"
        placeholder="e.g. Yes"
      />
      <HelpText style={{ marginTop: '1.5rem' }}>
        Preview: <a href="/contact" target="_blank" rel="noreferrer">View Contact form</a> (opens public form with your options).
      </HelpText>
    </>
  )
}
