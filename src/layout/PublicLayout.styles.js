import styled from 'styled-components'

export const PublicShell = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

export const PublicMain = styled.main`
  flex: 1;
  padding-top: ${({ theme }) => theme.layout.headerHeight};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.layout.mobileHeaderHeight};
  }
`
