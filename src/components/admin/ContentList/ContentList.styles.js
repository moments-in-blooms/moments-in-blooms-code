import styled from 'styled-components'

export const ContentGroupShell = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

export const ContentGroupHeading = styled.header`
  display: grid;
  gap: 0.2rem;
`

export const ContentGroupTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`

export const ContentGroupDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  line-height: 1.6;
`

export const ContentGroupBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`