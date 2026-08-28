import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const HeaderShell = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

export const HeaderBack = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  justify-self: start;
  padding: 0.4rem 0;
  color: ${({ theme }) => theme.colors.taupeText};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  font-weight: 700;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};

    svg {
      transform: translateX(-3px);
    }
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radii.sm};
  }

  svg {
    transition: transform ${({ theme }) => theme.transitions.fast};
  }
`

export const HeaderCopy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};

  > span:first-child {
    color: ${({ theme }) => theme.colors.taupe};
    font-family: ${({ theme }) => theme.typography.uiFont};
    font-size: 0.64rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }
`

export const HeaderTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.9rem, 3.2vw, 2.4rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.015em;
`

export const HeaderDescription = styled.p`
  margin: 0;
  max-width: 44rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.85rem;
  line-height: 1.7;
`

export const HeaderMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const HeaderMeta = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.65rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 600;
`

export const HeaderActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;

    > * {
      flex: 1 1 auto;
    }
  }
`