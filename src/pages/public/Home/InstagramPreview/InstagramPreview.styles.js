import { motion } from 'framer-motion'
import styled from 'styled-components'
import PageContainer from '../../../../components/PageContainer/index.js'

export const InstagramRoot = styled.section`
  overflow: hidden;
  padding-block: ${({ theme }) => theme.spacing.sectionStandard};
  background: ${({ theme }) => theme.colors.background};
`

export const InstagramContainer = styled(PageContainer)`
  display: grid;
  justify-items: center;
`

export const InstagramEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

export const InstagramTitle = styled.h2`
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2.75rem, 7vw, 6rem);
  font-weight: 500;
  letter-spacing: -0.07em;
  line-height: 0.88;
  text-align: center;
`

export const InstagramStrip = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding-inline: ${({ theme }) => theme.spacing.xs};
  width: max-content;
  will-change: transform;
`

export const InstagramStripViewport = styled.div`
  width: 100%;
  margin-top: clamp(3rem, 7vw, 6rem);
  overflow: hidden;

  &:hover ${InstagramStrip}, &:focus-within ${InstagramStrip} {
    animation-play-state: paused;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const InstagramItemOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(46, 46, 46, 0.35);
  color: ${({ theme }) => theme.colors.surface};
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.standard};
  z-index: 1;

  svg {
    transform: scale(0.8);
    transition: transform ${({ theme }) => theme.transitions.standard};
  }
`

export const InstagramItem = styled.a`
  position: relative;
  display: block;
  width: clamp(10rem, 19vw, 18rem);
  aspect-ratio: 1;
  flex: 0 0 auto;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.card};
  scroll-snap-align: start;

  &:hover img,
  &:focus-visible img {
    transform: scale(1.08);
  }

  &:hover ${InstagramItemOverlay}, &:focus-visible ${InstagramItemOverlay} {
    opacity: 1;

    svg {
      transform: scale(1);
    }
  }
`

export const InstagramImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ${({ theme }) => theme.transitions.easing};
`

export const InstagramAction = styled.div`
  position: relative;
  z-index: 1;
  margin-top: -1.5rem;
`
