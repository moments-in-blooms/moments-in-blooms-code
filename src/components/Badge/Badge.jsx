import { Badge as StyledBadge } from './Badge.styles.js'

function Badge({ children, ...props }) {
  return <StyledBadge {...props}>{children}</StyledBadge>
}

export default Badge
