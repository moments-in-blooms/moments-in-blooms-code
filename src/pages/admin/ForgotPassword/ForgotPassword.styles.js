import styled from 'styled-components'

export const SuccessNote = styled.p`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(46, 125, 50, 0.25);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(46, 125, 50, 0.07);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  line-height: 1.6;

  svg {
    flex: 0 0 auto;
    margin-top: 0.15rem;
    color: #2e7d32;
  }
`
