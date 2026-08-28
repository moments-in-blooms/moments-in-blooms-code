import Container from '../Container/index.js'

function PageContainer({ children, ...props }) {
  return <Container {...props}>{children}</Container>
}

export default PageContainer
