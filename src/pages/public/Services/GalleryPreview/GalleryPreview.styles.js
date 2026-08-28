import { motion } from 'framer-motion'
import styled from 'styled-components'

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 3vw, 2.5rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(12, 1fr);
  }
`

export const GalleryItem = styled(motion.article)`
  position: relative;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.imageCard};
  aspect-ratio: ${({ $variant }) =>
    $variant === 'large' ? '16 / 10' : $variant === 'tall' ? '3 / 4' : '1'};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: ${({ $variant }) =>
      $variant === 'large'
        ? 'span 7'
        : $variant === 'tall'
        ? 'span 5'
        : 'span 6'};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  &:hover img {
    transform: scale(1.06);
  }
`

export const ItemOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(18, 12, 15, 0) 40%,
    rgba(18, 12, 15, 0.85) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  opacity: 0.9;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  ${GalleryItem}:hover & {
    opacity: 1;
  }
`

export const ItemCategory = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
`

export const ItemTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  font-weight: 500;
  line-height: 1.2;
`
