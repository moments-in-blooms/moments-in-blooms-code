import {
  SectionBody,
  SectionDescription,
  SectionShell,
  SectionTitle,
} from './ContentFormSection.styles.js'

/**
 * A non-collapsible card that groups related form fields.
 * Replaces the accordion-style EditorCard in detail pages.
 */
function ContentFormSection({ title, description, children, actions }) {
  return (
    <SectionShell>
      {(title || description) && (
        <header>
          {title ? <SectionTitle>{title}</SectionTitle> : null}
          {description ? (
            <SectionDescription>{description}</SectionDescription>
          ) : null}
        </header>
      )}
      <SectionBody>{children}</SectionBody>
      {actions ? <footer>{actions}</footer> : null}
    </SectionShell>
  )
}

export default ContentFormSection