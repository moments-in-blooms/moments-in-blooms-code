import styled from 'styled-components'

export const Container = styled.div`
  width: min(100% - 2rem, ${({ theme }) => theme.layout.containerMaxWidth});
  margin-inline: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.tabletMin}) {
    width: min(100% - 4rem, ${({ theme }) => theme.layout.containerMaxWidth});
  }
`
