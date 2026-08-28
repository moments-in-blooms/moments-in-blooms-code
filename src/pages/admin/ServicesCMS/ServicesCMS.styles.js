import styled from 'styled-components'
import { pageShellStyles } from '../../pageStyles.js'

export const ServicesCMSPage = styled.div`
  ${pageShellStyles}
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`