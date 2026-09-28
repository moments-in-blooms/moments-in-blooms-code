import styled from 'styled-components'
import { css } from 'styled-components'

export const Banner = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(165, 137, 116, 0.35);
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.gradients.blissNestPanel};
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);

  ${({ $onImage }) =>
    $onImage &&
    css`
      min-height: clamp(300px, 42vw, 480px);

      &:hover img {
        transform: scale(1.04);
      }
    `}
`

export const BannerMedia = styled.div`
  position: absolute;
  inset: 0;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
`

export const BannerScrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(20, 18, 16, 0.82) 0%,
    rgba(20, 18, 16, 0.45) 45%,
    rgba(20, 18, 16, 0.2) 100%
  );
`

export const BannerContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  max-width: 720px;
  padding: clamp(1.75rem, 3.5vw, 3rem);
`

export const FallbackContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  max-width: 720px;
  padding: clamp(1.75rem, 3.5vw, 3rem);
`

export const Eyebrow = styled.span`
  color: ${({ $onImage, theme }) =>
    $onImage ? theme.colors.goldLight : theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.675rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`

export const Title = styled.h4`
  margin: 0;
  color: ${({ $onImage, theme }) =>
    $onImage ? theme.colors.surface : theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.8rem, 3.2vw, 2.7rem);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.01em;
`

export const Subtitle = styled.p`
  margin: 0;
  color: ${({ $onImage, theme }) =>
    $onImage ? 'rgba(255, 255, 255, 0.85)' : theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

export const Description = styled.p`
  margin: 0;
  max-width: 560px;
  color: ${({ $onImage, theme }) =>
    $onImage ? 'rgba(255, 255, 255, 0.86)' : theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.7;
`

export const Price = styled.p`
  margin: 0.25rem 0 0;
  color: ${({ $onImage, theme }) =>
    $onImage ? theme.colors.goldLight : theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`