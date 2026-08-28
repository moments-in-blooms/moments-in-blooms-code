import { Heading as StyledHeading } from './Heading.styles.js'

function Heading({ children, level = 2, ...props }) {
  return (
    <StyledHeading as={`h${level}`} {...props}>
      {children}
    </StyledHeading>
  )
}

export default Heading
