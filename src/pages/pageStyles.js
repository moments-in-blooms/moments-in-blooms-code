import { css } from 'styled-components'

export const pageShellStyles = css`
  min-height: 100%;
`

export const pageSectionStyles = css`
  display: grid;
  place-items: center;
  min-height: min(60vh, 38rem);
  text-align: center;
`

export const pageCopyStyles = css`
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin: ${({ theme }) => theme.spacing.lg} auto 0;
`
