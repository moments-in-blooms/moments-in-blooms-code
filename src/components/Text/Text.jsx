import { Text as StyledText } from './Text.styles.js'

function Text({ children, ...props }) {
  return <StyledText {...props}>{children}</StyledText>
}

export default Text
