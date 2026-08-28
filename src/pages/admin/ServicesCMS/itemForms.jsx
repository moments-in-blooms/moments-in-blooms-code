import { FieldRow, TextAreaField, TextField } from '../../../components/FormField/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'
import Repeater from '../../../components/admin/Repeater/index.js'
import ToggleSwitch from '../../../components/admin/ToggleSwitch/index.js'

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

export function PhotoboothPackageForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <TextField
        label="Package name"
        value={value?.name ?? ''}
        onChange={(event) => patch({ name: event.target.value })}
      />
      <TextField
        label="Tagline"
        value={value?.tagline ?? ''}
        onChange={(event) => patch({ tagline: event.target.value })}
      />
      <FieldRow>
        <TextField
          label="Price"
          value={value?.price ?? ''}
          onChange={(event) => patch({ price: event.target.value })}
          placeholder="$1,850"
        />
        <TextField
          label="Hire duration"
          value={value?.hireDuration ?? ''}
          onChange={(event) => patch({ hireDuration: event.target.value })}
          placeholder="3-hour hire"
        />
      </FieldRow>
      <TextField
        label="Badge"
        value={value?.badge ?? ''}
        onChange={(event) => patch({ badge: event.target.value })}
        placeholder="Most Popular"
      />
      <TextAreaField
        label="Description"
        rows={4}
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
      />
      <ToggleSwitch
        label="Popular"
        hint="Highlights this package on the pricing cards."
        checked={Boolean(value?.popular)}
        onChange={(checked) => patch({ popular: checked })}
      />
      <StringsRepeater
        label="Inclusion"
        items={value?.inclusions ?? []}
        onChange={(inclusions) => patch({ inclusions })}
        addLabel="Add inclusion"
        placeholder="Unlimited photo prints"
      />
      <StringsRepeater
        label="Add-on"
        items={value?.addOns ?? []}
        onChange={(addOns) => patch({ addOns })}
        addLabel="Add add-on"
        placeholder="Additional hour $150"
      />
      <TextAreaField
        label="Travel notes"
        rows={3}
        value={value?.travelNotes ?? ''}
        onChange={(event) => patch({ travelNotes: event.target.value })}
      />
      <TextField
        label="Call to action text"
        value={value?.ctaText ?? ''}
        onChange={(event) => patch({ ctaText: event.target.value })}
      />
    </>
  )
}

export function BlissfulNestPackageForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  const imageSrc = typeof value?.image === 'string' ? value.image : value?.image?.src ?? ''
  const imageAlt = typeof value?.image === 'string' ? '' : value?.image?.alt ?? ''
  return (
    <>
      <TextField
        label="Package name"
        value={value?.name ?? ''}
        onChange={(event) => patch({ name: event.target.value })}
      />
      <TextField
        label="Tagline"
        value={value?.tagline ?? ''}
        onChange={(event) => patch({ tagline: event.target.value })}
      />
      <TextField
        label="Badge"
        value={value?.badge ?? ''}
        onChange={(event) => patch({ badge: event.target.value })}
        placeholder="Most Popular"
      />
      <TextAreaField
        label="Description"
        rows={4}
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
      />
      <ToggleSwitch
        label="Featured"
        hint="Featured prize options are highlighted on the public site. Multiple can be featured."
        checked={Boolean(value?.isFeatured)}
        onChange={(checked) => patch({ isFeatured: checked })}
      />
      <StringsRepeater
        label="Prize"
        items={value?.items ?? []}
        onChange={(items) => patch({ items })}
        addLabel="Add prize"
        placeholder="Premium plush toy"
      />
      <ImageField
        label="Package image"
        value={imageSrc}
        onChange={(src) => patch({ image: { src, alt: imageAlt } })}
        alt={imageAlt}
        onAltChange={(event) => patch({ image: { src: imageSrc, alt: event.target.value } })}
      />
    </>
  )
}

export function ServicesGalleryItemForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <TextField
        label="Title"
        value={value?.title ?? ''}
        onChange={(event) => patch({ title: event.target.value })}
      />
      <FieldRow>
        <TextField
          label="Category"
          value={value?.category ?? ''}
          onChange={(event) => patch({ category: event.target.value })}
        />
        <TextField
          label="Variant"
          value={value?.variant ?? ''}
          onChange={(event) => patch({ variant: event.target.value })}
        />
      </FieldRow>
      <ImageField
        label="Image"
        value={value?.image?.src ?? ''}
        onChange={(src) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), src } }))}
        alt={value?.image?.alt ?? ''}
        onAltChange={(event) => onChange((prev) => ({ ...prev, image: { ...(prev.image ?? {}), alt: event.target.value } }))}
      />
    </>
  )
}

export function ServicesTestimonialForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  return (
    <>
      <TextAreaField
        label="Quote"
        rows={5}
        value={value?.quote ?? ''}
        onChange={(event) => patch({ quote: event.target.value })}
      />
      <FieldRow>
        <TextField
          label="Name"
          value={value?.name ?? ''}
          onChange={(event) => patch({ name: event.target.value })}
        />
        <TextField
          label="Event"
          value={value?.event ?? ''}
          onChange={(event) => patch({ event: event.target.value })}
        />
      </FieldRow>
      <TextField
        label="Rating"
        type="number"
        min={1}
        max={5}
        value={value?.rating ?? 5}
        onChange={(event) => patch({ rating: Number(event.target.value) })}
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