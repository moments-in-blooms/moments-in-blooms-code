import { css } from 'styled-components'

export const pageShellStyles = css`
  min-height: 100%;
  padding-bottom: calc(${({ theme }) => theme.spacing.xl} + env(safe-area-inset-bottom));
`
