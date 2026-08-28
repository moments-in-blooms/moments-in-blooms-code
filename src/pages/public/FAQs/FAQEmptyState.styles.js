import styled from 'styled-components'

export const EmptyRoot = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  text-align: center;
`

export const EmptyTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const EmptyMessage = styled.p`
  max-width: 42rem;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.8;
`

export const EmptyHint = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`
