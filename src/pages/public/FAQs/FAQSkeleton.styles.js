import styled from 'styled-components'

export const SkeletonBar = styled.span`
  display: block;
  height: ${({ $height }) => $height ?? '0.95rem'};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ $onDark, theme }) =>
    $onDark ? 'rgba(245, 240, 232, 0.14)' : theme.colors.secondary};
  width: ${({ $width }) => $width ?? '100%'};
`

export const HeroSkeleton = styled.div`
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`

export const NavSkeleton = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const NavSkeletonPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: ${({ theme }) => theme.controls.tapTarget};
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.secondary};
`

export const ListSkeleton = styled.div`
  display: grid;
  gap: 0;
`

export const ListSkeletonRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`