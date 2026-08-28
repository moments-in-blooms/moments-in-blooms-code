import styled from 'styled-components'

// Mirrors the FAQ preview header spacing so the loading placeholder occupies
// the same vertical rhythm as the live section and there is no layout jump.
export const FaqLoadingHeader = styled.div`
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`
