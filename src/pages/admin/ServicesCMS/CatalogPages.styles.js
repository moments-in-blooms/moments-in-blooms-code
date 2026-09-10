import styled from 'styled-components'
import { pageShellStyles } from '../../pageStyles.js'

export const CatalogPage = styled.div`
  ${pageShellStyles}
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  align-content: start;
`

export const CardRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
`

export const CardRowMain = styled.div`
  flex: 1;
  min-width: 0;
`

export const MoveButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: center;
`

export const MoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    border-color: ${({ theme, $danger }) => ($danger ? theme.colors.danger : theme.colors.taupe)};
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme, $danger }) => ($danger ? theme.colors.danger : theme.colors.primaryHover)};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const FilterTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const FilterTab = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? theme.colors.surface : theme.colors.textSecondary)};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.taupe)};
    color: ${({ theme, $active }) => ($active ? theme.colors.surface : theme.colors.primaryHover)};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const FilterTabCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  padding: 0.1rem 0.4rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $active }) => ($active ? 'rgba(255, 255, 255, 0.25)' : theme.colors.secondary)};
  color: inherit;
  font-size: 0.72rem;
  font-weight: 700;
`

export const MediaStack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`

export const MediaEntry = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`

export const MediaThumb = styled.img`
  flex: 0 0 auto;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.secondary};
`

export const MediaEntryText = styled.div`
  flex: 1;
  min-width: 0;
  display: grid;
  gap: 0.15rem;
`

export const MediaEntryTitle = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.85rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const MediaEntryMeta = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const MediaActions = styled.div`
  display: flex;
  gap: 0.25rem;
  flex: 0 0 auto;
`

export const MediaAddRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.md};
`
