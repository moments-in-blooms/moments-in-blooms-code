import styled from 'styled-components'

export const NotFoundShell = styled.div`
  min-height: calc(100vh - 5rem);
  padding-block: clamp(4rem, 10vw, 8rem);
`

export const NotFoundContent = styled.div`
  position: relative;
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

export const NotFoundNumber = styled.span`
  position: absolute;
  z-index: 0;
  top: -2rem;
  color: ${({ theme }) => theme.colors.greige};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(10rem, 35vw, 22rem);
  letter-spacing: -0.08em;
  line-height: 0.8;
  pointer-events: none;
  user-select: none;
`

export const NotFoundImageFrame = styled.div`
  position: relative;
  z-index: 1;
  width: min(100%, 18rem);
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 9rem 9rem 0 0;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`

export const NotFoundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const NotFoundCopy = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 34rem;
`
