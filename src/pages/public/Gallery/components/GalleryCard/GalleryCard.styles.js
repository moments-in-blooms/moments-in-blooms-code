import styled from 'styled-components'
import { motion } from 'framer-motion'

export const GalleryItem = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: box-shadow ${({ theme }) => theme.transitions.standard};

  &:hover {
    box-shadow: 0 18px 44px rgba(26, 24, 23, 0.16);
  }
`

export const GalleryImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);

  ${GalleryItem}:hover & {
    transform: scale(1.07);
  }
`

export const GalleryOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(180deg, rgba(26, 24, 23, 0) 32%, rgba(26, 24, 23, 0.6) 100%);
  transition: background ${({ theme }) => theme.transitions.standard};

  ${GalleryItem}:hover & {
    background: linear-gradient(180deg, rgba(26, 24, 23, 0.08) 0%, rgba(26, 24, 23, 0.82) 100%);
  }
`

export const GalleryCaption = styled.div`
  color: white;
`

export const GalleryCaptionTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.125rem, 1.6vw, 1.375rem);
  line-height: ${({ theme }) => theme.typography.headingLineHeight};
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`

export const GalleryCaptionSubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity ${({ theme }) => theme.transitions.standard},
    transform ${({ theme }) => theme.transitions.standard};

  ${GalleryItem}:hover & {
    opacity: 0.9;
    transform: translateY(0);
  }
`

export const GalleryNumber = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.bodyFont};
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: white;
  background: rgba(26, 24, 23, 0.45);
  padding: ${({ theme }) => theme.spacing.xxs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.pill};
`

export const GalleryViewIcon = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: ${({ theme }) => theme.colors.textPrimary};
  opacity: 0;
  transform: scale(0.8);
  transition: opacity ${({ theme }) => theme.transitions.standard},
    transform ${({ theme }) => theme.transitions.standard};

  ${GalleryItem}:hover & {
    opacity: 1;
    transform: scale(1);
  }
`

export const GalleryHitArea = styled.button`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: -4px;
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`
