import styled from 'styled-components'

export const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  border: 0;
  background: ${({ theme }) => theme.colors.border};
`
