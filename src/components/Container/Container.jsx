import { Container as StyledContainer } from './Container.styles.js'

function Container({ children, ...props }) {
  return <StyledContainer {...props}>{children}</StyledContainer>
}

export default Container
