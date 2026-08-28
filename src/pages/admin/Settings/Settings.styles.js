import styled from 'styled-components'
import { pageShellStyles } from '../../pageStyles.js'

export const SettingsPage = styled.div`
  ${pageShellStyles}
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`