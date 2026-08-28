import styled from 'styled-components'

export const ConfirmOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.layers.loading};
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  background: rgba(26, 26, 26, 0.45);
  backdrop-filter: blur(4px);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
    align-items: end;
  }
`

export const ConfirmCard = styled.div`
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 24rem;
  margin: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: none;
    margin: 0;
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.radii.lg} ${({ theme }) => theme.radii.lg} 0 0;
    box-shadow: ${({ theme }) => theme.shadows.drawer};
  }
`

export const ConfirmIcon = styled.div`
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: rgba(201, 74, 70, 0.1);
  color: ${({ theme }) => theme.colors.danger};
`

export const ConfirmTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.4rem;
  font-weight: 500;
`

export const ConfirmDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.88rem;
  line-height: 1.7;
`

export const ConfirmActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    flex-direction: column;

    > * {
      width: 100%;
    }
  }
`