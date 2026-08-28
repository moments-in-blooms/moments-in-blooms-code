import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { adminPulse } from '../../../styles/animations.js'
import { pageShellStyles } from '../../pageStyles.js'

export const DashboardPage = styled.div`
  ${pageShellStyles}
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`

export const DemoNotice = styled.p`
  margin: 0;
  padding: 0.9rem 1.1rem;
  border: 1px solid rgba(200, 154, 94, 0.45);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(200, 154, 94, 0.09);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.82rem;
  line-height: 1.7;

  strong {
    color: ${({ theme }) => theme.colors.warning};
    font-family: ${({ theme }) => theme.typography.uiFont};
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    margin-right: ${({ theme }) => theme.spacing.sm};
    text-transform: uppercase;
  }
`

export const StatBlocks = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

export const StatBlock = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};

  svg {
    grid-row: 1 / -1;
    color: ${({ theme }) => theme.colors.taupe};
  }
`

export const StatValue = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.1;
`

export const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.72rem;
`

export const StatSkeleton = styled.span`
  display: block;
  width: 2.4rem;
  height: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.border};
  animation: ${adminPulse} 1.4s ease-in-out infinite;
`

export const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`

export const PageSection = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

export const PageSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`

export const PageSectionTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`

export const ContentLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radii.md};
  }
`

export const ContentRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0.85rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  > svg:last-child {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.taupe};
    background: ${({ theme }) => theme.colors.secondary};

    > svg:last-child {
      transform: translateX(2px);
    }
  }
`

export const ContentLabel = styled.span`
  flex: 0 0 auto;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 700;
  font-size: 0.86rem;
`

export const ContentIcon = styled.span`
  flex: 0 0 auto;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.taupe};
`

export const ContentStatus = styled.span`
  min-width: 0;
  margin-left: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme, $tone }) =>
    $tone === 'dirty'
      ? theme.colors.warning
      : $tone === 'saved'
        ? theme.colors.success
        : theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.72rem;
`