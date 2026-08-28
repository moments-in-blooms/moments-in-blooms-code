import styled from 'styled-components'
import { adminPulse } from '../../../styles/animations.js'

export const TableShell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

export const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`

export const Table = styled.table`
  width: 100%;
  min-width: 34rem;
  border-collapse: collapse;
  font-size: 0.85rem;

  caption {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  th {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-family: ${({ theme }) => theme.typography.uiFont};
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-align: left;
    text-transform: uppercase;
    white-space: nowrap;
  }

  td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textPrimary};
    vertical-align: middle;

    &:last-child {
      text-align: right;
    }
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`

export const DataTableEmpty = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  text-align: center;
`

export const LoadingRow = styled.tr`
  td {
    pointer-events: none;
  }
`

export const LoadingCell = styled.span`
  display: block;
  width: 85%;
  height: 0.9rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.secondary};
  animation: ${adminPulse} 1.4s ease-in-out infinite;
`