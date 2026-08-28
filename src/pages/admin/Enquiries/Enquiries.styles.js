import styled from 'styled-components'
import { adminPulse } from '../../../styles/animations.js'
import { pageShellStyles } from '../../pageStyles.js'

const mobileBreak = ({ theme }) => `@media (max-width: ${theme.breakpoints.tablet})`

export const EnquiriesPage = styled.div`
  ${pageShellStyles}
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`

export const SearchWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 22rem;

  > svg {
    position: absolute;
    top: 50%;
    left: 0.85rem;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
    pointer-events: none;
  }

  input {
    padding-left: 2.4rem;
  }
`

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const FilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 0.55rem 0.95rem;
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.surface : theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.74rem;
  font-weight: 700;
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.25rem;
    height: 1.25rem;
    padding: 0 0.3rem;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme, $active }) =>
      $active ? 'rgba(255, 255, 255, 0.22)' : theme.colors.secondary};
    font-size: 0.68rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.taupe};
  }
`

export const LoadError = styled.p`
  margin: 0;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(201, 74, 70, 0.4);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(201, 74, 70, 0.07);
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.85rem;
  line-height: 1.6;
`

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

export const DetailLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

export const DetailValue = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.88rem;
  line-height: 1.6;
  overflow-wrap: anywhere;
`

export const TableCellActions = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const TableOnly = styled.div`
  ${mobileBreak} {
    display: none;
  }
`

export const CardList = styled.div`
  display: none;
  gap: ${({ theme }) => theme.spacing.md};

  ${mobileBreak} {
    display: grid;
  }
`

export const EnquiryCard = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`

export const EnquiryCardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;

  strong {
    min-width: 0;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }
`

export const EnquiryCardMeta = styled.div`
  display: grid;
  gap: 0.2rem;
  min-width: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.82rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
`

export const EnquiryCardGrid = styled.dl`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.7rem ${({ theme }) => theme.spacing.lg};
  margin: 0;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`

export const EnquiryCardPair = styled.div`
  display: grid;
  gap: 0.15rem;
  min-width: 0;
`

export const EnquiryCardTerm = styled.dt`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

export const EnquiryCardDetail = styled.dd`
  margin: 0;
  min-width: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
`

export const EnquiryCardServices = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    max-width: 100%;
    padding: 0.32rem 0.75rem;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.typography.uiFont};
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }
`

export const EnquiryCardMessage = styled.div`
  display: grid;
  gap: 0.25rem;
  min-width: 0;

  strong {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-family: ${({ theme }) => theme.typography.uiFont};
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.85rem;
    line-height: 1.6;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }
`

export const EnquiryCardFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  > span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.72rem;
  }
`

export const EnquiryCardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const EnquiryCardSkeletonLine = styled.span`
  display: block;
  width: ${({ $width }) => $width ?? '100%'};
  height: 0.9rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.secondary};
  animation: ${adminPulse} 1.4s ease-in-out infinite;
`