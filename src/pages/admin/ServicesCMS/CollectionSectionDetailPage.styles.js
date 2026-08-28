import styled from 'styled-components'
import { pageShellStyles } from '../../pageStyles.js'

const Page = styled.div`
  ${pageShellStyles}
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`

export const CollectionSectionDetailStyles = { Page }