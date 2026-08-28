import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import PageContainer from '../../../../components/PageContainer/index.js'

export const GalleryRoot = styled.section`
  padding-block: ${({ theme }) => theme.spacing.sectionGenerous};
  background: ${({ theme }) => theme.colors.background};
`

export const GalleryContainer = styled(PageContainer)``

export const GalleryHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(14rem, 0.65fr);
  align-items: end;
  gap: ${({ theme }) => theme.spacing.xxl};
  margin-bottom: clamp(3rem, 7vw, 6rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

export const GalleryEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

export const GalleryTitle = styled.h2`
  max-width: 11ch;
  margin-top: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2.75rem, 7vw, 6rem);
  font-weight: 500;
  letter-spacing: -0.07em;
  line-height: 0.87;
`

export const GalleryCopy = styled.p`
  max-width: 26rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.8;
`

export const GalleryCollage = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(10rem, 0.75fr);
  grid-template-rows: 1.15fr 0.85fr;
  aspect-ratio: 1.3 / 1;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-rows: 1.1fr 0.9fr;
    aspect-ratio: 1.15 / 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    aspect-ratio: auto;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

export const GalleryItem = styled(NavLink)`
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.imageCard};
  background: ${({ theme }) => theme.colors.secondary};

  &:hover img,
  &:focus-visible img {
    transform: scale(1.045);
  }
`

export const GalleryFeature = styled(GalleryItem)`
  grid-row: 1 / span 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    aspect-ratio: 4 / 5;
  }
`

export const GallerySide = styled(GalleryItem)`
  ${({ $overlap }) =>
    $overlap &&
    css`
      z-index: 2;
      margin-left: -15%;
      margin-bottom: 8%;
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ${({ $overlap }) =>
      $overlap &&
      css`
        margin: 0;
      `}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    aspect-ratio: 4 / 3;

    ${({ $overlap }) => $overlap && css`margin: 0;`}
  }
`

export const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.9s ${({ theme }) => theme.transitions.easing};
`

export const GallerySpark = styled(motion.span)`
  position: absolute;
  z-index: 3;
  right: 46%;
  top: 47%;
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.gold};
  transform: rotate(12deg);
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 1rem;
    top: 38%;
    width: 3rem;
    height: 3rem;
  }
`

export const GalleryAction = styled.div`
  display: flex;
  justify-content: center;
  margin-top: clamp(3rem, 7vw, 5rem);
`
