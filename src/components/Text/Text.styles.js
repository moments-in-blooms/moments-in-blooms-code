import styled from 'styled-components'

export const Text = styled.p`
  margin: 0;
  color: ${({ $muted, theme }) =>
    $muted ? theme.colors.textSecondary : theme.colors.textPrimary};
  font-size: ${({ $size }) => $size || '1rem'};
  line-height: 1.7;
`
