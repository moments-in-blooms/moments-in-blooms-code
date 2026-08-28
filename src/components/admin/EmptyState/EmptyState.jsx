import { EmptyIcon, EmptyShell, EmptyText, EmptyTitle } from './EmptyState.styles.js'

function EmptyState({ icon, title, description, action }) {
  return (
    <EmptyShell>
      {icon ? <EmptyIcon>{icon}</EmptyIcon> : null}
      <EmptyTitle>{title}</EmptyTitle>
      {description ? <EmptyText>{description}</EmptyText> : null}
      {action}
    </EmptyShell>
  )
}

export default EmptyState