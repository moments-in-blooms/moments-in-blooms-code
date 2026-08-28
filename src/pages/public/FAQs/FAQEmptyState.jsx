import { NavLink } from 'react-router-dom'
import Button from '../../../components/Button/index.js'
import { BUTTON_VARIANTS } from '../../../constants/ui.js'
import {
  EmptyHint,
  EmptyMessage,
  EmptyRoot,
  EmptyTitle,
} from './FAQEmptyState.styles.js'

function FAQEmptyState() {
  return (
    <EmptyRoot>
      <EmptyTitle>Nothing here just yet.</EmptyTitle>
      <EmptyMessage>
        We are still writing the answers for this category. In the meantime, our team
        is happy to help personally.
      </EmptyMessage>
      <EmptyHint>
        <Button as={NavLink} to="/contact" variant={BUTTON_VARIANTS.OUTLINE}>
          Ask us directly
        </Button>
      </EmptyHint>
    </EmptyRoot>
  )
}

export default FAQEmptyState
