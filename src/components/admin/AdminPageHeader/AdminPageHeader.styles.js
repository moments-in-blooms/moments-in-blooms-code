import styled from 'styled-components'

export const PageHeaderShell = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

export const PageHeaderCopy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`

export const PageHeaderEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.taupe};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`

export const PageHeaderTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.5rem, 2.5vw, 1.9rem);
  font-weight: 500;
  line-height: 1.15;
`

export const PageHeaderDescription = styled.p`
  margin: 0;
  max-width: 44rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.85rem;
  line-height: 1.7;
`

export const PageHeaderActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;

    > * {
      flex: 1 1 auto;
    }
  }
`