import styled from 'styled-components'

export const ContentGroupShell = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

export const ContentGroupHeading = styled.header`
  display: grid;
  gap: 0.35rem;
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`

export const ContentGroupTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.25;
`

export const ContentGroupDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.85rem;
  line-height: 1.6;
`

export const ContentGroupBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`