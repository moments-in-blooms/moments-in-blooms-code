import styled from 'styled-components'
import { pageShellStyles } from '../../pageStyles.js'

export const HomepageCMSPage = styled.div`
  ${pageShellStyles}
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`

export const OrphanRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};

  strong {
    display: block;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.95rem;
  }

  span {
    display: block;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.85rem;
  }
`