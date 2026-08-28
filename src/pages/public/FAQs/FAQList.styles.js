import styled from 'styled-components'

export const ListRoot = styled.div``

export const ListGroup = styled.div``

export const ListHeading = styled.h2`
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primaryHover};
  margin: ${({ theme }) => theme.spacing.xxl} 0 ${({ theme }) => theme.spacing.sm};

  &:first-child {
    margin-top: 0;
  }
`
