import styled from 'styled-components'

export const CategoryNav = styled.nav`
  position: relative;
  display: flex;
  align-items: flex-end;
`

export const CategoryList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tabletMin}) {
    flex-wrap: wrap;
    overflow-x: visible;
    justify-content: center;
  }
`

export const CategoryOption = styled.button`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-height: ${({ theme }) => theme.controls.tapTarget};
  padding: 0 ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover:not([aria-selected='true']) {
    border-color: ${({ theme }) => theme.colors.taupe};
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  &[aria-selected='true'] {
    background: ${({ theme }) => theme.colors.charcoal};
    border-color: ${({ theme }) => theme.colors.charcoal};
    color: #f5f0e8;
  }
`

export const CategoryLabel = styled.span`
  white-space: nowrap;
`

export const CategoryCount = styled.span`
  display: inline-grid;
  min-width: 1.4rem;
  height: 1.4rem;
  place-items: center;
  border-radius: 50%;
  font-size: 0.65rem;
  font-weight: 700;
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.goldLight : theme.colors.textSecondary};
`
