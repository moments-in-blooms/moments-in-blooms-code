import { FiArrowLeft } from 'react-icons/fi'
import ContentStatus from '../ContentStatus/index.js'
import {
  HeaderActions,
  HeaderBack,
  HeaderCopy,
  HeaderDescription,
  HeaderMeta,
  HeaderMetaRow,
  HeaderShell,
  HeaderTitle,
} from './ContentDetailHeader.styles.js'

function ContentDetailHeader({
  backTo,
  backLabel,
  eyebrow,
  title,
  description,
  status,
  statusLabel,
  statusTone,
  meta,
  actions,
}) {
  return (
    <HeaderShell>
      {backTo ? (
        <HeaderBack to={backTo}>
          <FiArrowLeft aria-hidden="true" size={15} />
          {backLabel ?? 'Back'}
        </HeaderBack>
      ) : null}
      <HeaderCopy>
        {eyebrow ? <span>{eyebrow}</span> : null}
        <HeaderTitle>{title}</HeaderTitle>
        {description ? (
          <HeaderDescription>{description}</HeaderDescription>
        ) : null}
        {status || (meta && meta.length > 0) ? (
          <HeaderMetaRow>
            {status ? (
              <ContentStatus
                status={status}
                label={statusLabel}
                tone={statusTone}
              />
            ) : null}
            {meta
              ? meta.map((item, index) => (
                  <HeaderMeta key={index}>{item}</HeaderMeta>
                ))
              : null}
          </HeaderMetaRow>
        ) : null}
      </HeaderCopy>
      {actions ? <HeaderActions>{actions}</HeaderActions> : null}
    </HeaderShell>
  )
}

export default ContentDetailHeader