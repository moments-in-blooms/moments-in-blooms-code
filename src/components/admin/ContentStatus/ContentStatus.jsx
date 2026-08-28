import { StatusPill } from './ContentStatus.styles.js'

const STATUS_META = Object.freeze({
  active: { label: 'Active', tone: 'success' },
  inactive: { label: 'Inactive', tone: 'muted' },
  draft: { label: 'Draft', tone: 'neutral' },
  published: { label: 'Published', tone: 'success' },
  featured: { label: 'Featured', tone: 'gold' },
})

function ContentStatus({ status, label, tone }) {
  const meta = STATUS_META[status]
  const resolvedLabel = label ?? meta?.label ?? status
  const resolvedTone = tone ?? meta?.tone ?? 'muted'
  return (
    <StatusPill $tone={resolvedTone}>
      {resolvedLabel}
    </StatusPill>
  )
}

export default ContentStatus