import {
  PageHeaderActions,
  PageHeaderCopy,
  PageHeaderDescription,
  PageHeaderEyebrow,
  PageHeaderShell,
  PageHeaderTitle,
} from './AdminPageHeader.styles.js'

function AdminPageHeader({ eyebrow, title, description, actions }) {
  return (
    <PageHeaderShell>
      <PageHeaderCopy>
        {eyebrow ? <PageHeaderEyebrow>{eyebrow}</PageHeaderEyebrow> : null}
        <PageHeaderTitle>{title}</PageHeaderTitle>
        {description ? <PageHeaderDescription>{description}</PageHeaderDescription> : null}
      </PageHeaderCopy>
      {actions ? <PageHeaderActions>{actions}</PageHeaderActions> : null}
    </PageHeaderShell>
  )
}

export default AdminPageHeader