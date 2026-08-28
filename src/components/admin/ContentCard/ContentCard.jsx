import { FiArrowRight } from 'react-icons/fi'
import { formatShortDate } from '../../../utils/formatDate.js'
import ContentStatus from '../ContentStatus/index.js'
import {
  CardArrow,
  CardBody,
  CardFooter,
  CardLink,
  CardMeta,
  CardMetaRow,
  CardThumb,
  CardTitle,
  CardTitleRow,
} from './ContentCard.styles.js'

function ContentCard({
  to,
  title,
  description,
  meta,
  status,
  statusLabel,
  statusTone,
  lastUpdated,
  thumbnail,
  footer,
}) {
  return (
    <CardLink to={to}>
      <CardBody>
        <CardTitleRow>
          {thumbnail ? (
            <CardThumb
              src={thumbnail.src}
              alt={thumbnail.alt ?? ''}
              loading="lazy"
            />
          ) : null}
          <CardTitle>{title}</CardTitle>
          {status ? (
            <ContentStatus
              status={status}
              label={statusLabel}
              tone={statusTone}
            />
          ) : null}
        </CardTitleRow>
        {description ? <p>{description}</p> : null}
        {meta && meta.length > 0 ? (
          <CardMetaRow>
            {meta.map((item, index) => (
              <CardMeta key={index}>{item}</CardMeta>
            ))}
          </CardMetaRow>
        ) : null}
      </CardBody>
      <CardFooter>
        {footer ??
          (lastUpdated ? (
            <span>Last updated: {formatShortDate(lastUpdated)}</span>
          ) : (
            <span>Not saved yet</span>
          ))}
        <CardArrow>
          <span>View details</span>
          <FiArrowRight aria-hidden="true" size={15} />
        </CardArrow>
      </CardFooter>
    </CardLink>
  )
}

export default ContentCard