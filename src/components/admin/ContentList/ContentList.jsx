import { Children } from 'react'
import { ContentGroupBody, ContentGroupDescription, ContentGroupHeading, ContentGroupShell, ContentGroupTitle } from './ContentList.styles.js'

function ContentList({ title, description, emptyState, children }) {
  const isEmpty = Children.count(children) === 0
  return (
    <ContentGroupShell>
      {title ? (
        <ContentGroupHeading>
          <ContentGroupTitle>{title}</ContentGroupTitle>
          {description ? (
            <ContentGroupDescription>{description}</ContentGroupDescription>
          ) : null}
        </ContentGroupHeading>
      ) : null}
      {emptyState && isEmpty ? (
        emptyState
      ) : (
        <ContentGroupBody>{children}</ContentGroupBody>
      )}
    </ContentGroupShell>
  )
}

export default ContentList