import styled from 'styled-components'
import { motion } from 'framer-motion'

export const LightboxOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.95);
  z-index: ${({ theme }) => theme.layers.loading + 10};
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
`

export const LightboxContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`

export const LightboxImage = styled(motion.img)`
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radii.sm};
`

export const LightboxClose = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  width: ${({ theme }) => theme.controls.tapTarget};
  height: ${({ theme }) => theme.controls.tapTarget};
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  z-index: 3;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`

export const LightboxNav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.controls.tapTarget};
  height: ${({ theme }) => theme.controls.tapTarget};
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  z-index: 3;
  
  ${(props) => props.$direction === 'prev' ? 'left: 2rem;' : 'right: 2rem;'}
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ${(props) => props.$direction === 'prev' ? 'left: 1rem;' : 'right: 1rem;'}
  }
`

export const LightboxCounter = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  font-family: ${({ theme }) => theme.typography.bodyFont};
  font-size: 0.875rem;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.pill};
  z-index: 3;
`

export const LightboxCaption = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xxl};
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  max-width: 600px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`

export const LightboxCaptionTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const LightboxCaptionSubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.bodyFont};
  font-size: 0.875rem;
  opacity: 0.9;
`
