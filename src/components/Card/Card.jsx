import { Card as StyledCard } from './Card.styles.js'

function Card({ children, ...props }) {
  return <StyledCard {...props}>{children}</StyledCard>
}

export default Card
