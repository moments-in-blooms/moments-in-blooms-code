/* eslint-disable react-refresh/only-export-components */
import { TextAreaField, TextField } from '../../../components/FormField/index.js'
import ImageField from '../../../components/admin/ImageField/index.js'

function SeoForm({ value, onChange }) {
  const patch = (next) => onChange((prev) => ({ ...prev, ...(typeof next === 'function' ? next(prev) : next) }))
  const titleLen = String(value?.title ?? '').length
  const descLen = String(value?.description ?? '').length
  return (
    <>
      <TextField
        label="SEO title"
        value={value?.title ?? ''}
        onChange={(event) => patch({ title: event.target.value })}
        hint={`50-60 chars ideal — ${titleLen}/60${titleLen > 60 ? ' (too long)' : ''}`}
        error={titleLen > 70 ? 'Title is too long for search results.' : undefined}
      />
      <TextAreaField
        label="SEO description"
        rows={4}
        value={value?.description ?? ''}
        onChange={(event) => patch({ description: event.target.value })}
        hint={`150-160 chars ideal — ${descLen}/160${descLen > 160 ? ' (too long)' : ''}`}
        error={descLen > 200 ? 'Description is too long.' : undefined}
      />
      <TextField
        label="Keywords"
        value={value?.keywords ?? ''}
        onChange={(event) => patch({ keywords: event.target.value })}
        hint="Comma-separated, 3-5 keywords, e.g. wedding styling Melbourne, florals"
      />
      <TextField
        label="URL"
        type="url"
        value={value?.url ?? ''}
        onChange={(event) => patch({ url: event.target.value })}
        hint="Canonical URL, e.g. https://momentsinblooms.vercel.app/about"
      />
      <ImageField
        label="Share image"
        value={value?.image ?? ''}
        onChange={(image) => patch({ image })}
        hint="1200×630 recommended for social previews"
      />
    </>
  )
}

export const seoSections = [
  {
    key: 'site',
    title: 'Site-wide metadata',
    description: 'The default title and description shown when no page metadata applies.',
    type: 'object',
    form: SeoForm,
  },
  {
    key: 'home',
    title: 'Homepage',
    description: 'How the homepage appears in search results.',
    type: 'object',
    form: SeoForm,
  },
  {
    key: 'about',
    title: 'About',
    description: 'How the About page appears in search results.',
    type: 'object',
    form: SeoForm,
  },
  {
    key: 'services',
    title: 'Services',
    description: 'How the Services page appears in search results.',
    type: 'object',
    form: SeoForm,
  },
  {
    key: 'gallery',
    title: 'Gallery',
    description: 'How the Gallery page appears in search results.',
    type: 'object',
    form: SeoForm,
  },
  {
    key: 'contact',
    title: 'Contact',
    description: 'How the Contact page appears in search results.',
    type: 'object',
    form: SeoForm,
  },
  {
    key: 'faqs',
    title: 'FAQs',
    description: 'How the FAQs page appears in search results.',
    type: 'object',
    form: SeoForm,
  },
]