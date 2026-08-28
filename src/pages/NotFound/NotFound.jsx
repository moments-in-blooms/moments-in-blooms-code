import { NavLink } from 'react-router-dom'
import Button from '../../components/Button/index.js'
import Heading from '../../components/Heading/index.js'
import PageContainer from '../../components/PageContainer/index.js'
import SEO from '../../components/SEO/index.js'
import Text from '../../components/Text/index.js'
import {
  NotFoundContent,
  NotFoundCopy,
  NotFoundImage,
  NotFoundImageFrame,
  NotFoundNumber,
  NotFoundShell,
} from './NotFound.styles.js'

const notFoundImageUrl =
  'https://images.unsplash.com/photo-1714805170293-a024fb8bf73a?crop=entropy&cs=srgb&fm=jpg&q=85&ixlib=rb-4.1.0'

function NotFound() {
  return (
    <NotFoundShell>
      <SEO title="Page not found" description="The requested Moments in Blooms page could not be found." noIndex />
      <PageContainer>
        <NotFoundContent>
          <NotFoundNumber aria-hidden="true">404</NotFoundNumber>
          <NotFoundImageFrame>
            <NotFoundImage
              src={notFoundImageUrl}
              alt="Single red rose in dramatic editorial light, Raihan Ullah on Unsplash"
            />
          </NotFoundImageFrame>
          <NotFoundCopy>
            <Heading level={1}>This moment has passed.</Heading>
            <Text $muted>The page you are looking for cannot be found.</Text>
            <Button as={NavLink} to="/">
              Return to Homepage
            </Button>
          </NotFoundCopy>
        </NotFoundContent>
      </PageContainer>
    </NotFoundShell>
  )
}

export default NotFound
