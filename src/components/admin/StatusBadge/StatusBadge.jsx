import { enquiryStatusLabels } from '../../../constants/admin.js'
import { StatusPill } from './StatusBadge.styles.js'

function StatusBadge({ status }) {
  const label = enquiryStatusLabels[status] ?? status
  return <StatusPill $status={status}>{label}</StatusPill>
}

export default StatusBadge