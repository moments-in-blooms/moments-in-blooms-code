import styled from 'styled-components'

export const EmptyShell = styled.div`
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};

    > * {
      width: 100%;
    }
  }
`

export const EmptyIcon = styled.div`
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primaryHover};

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

export const EmptyTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.15rem;
  font-weight: 500;
`

export const EmptyText = styled.p`
  margin: 0;
  max-width: 26rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  line-height: 1.6;
`