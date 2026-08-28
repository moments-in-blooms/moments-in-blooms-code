import { motion } from 'framer-motion'
import styled from 'styled-components'
import PageContainer from '../../../../components/PageContainer/index.js'

export const ServicesRoot = styled.section`
  padding-block: ${({ theme }) => theme.spacing.sectionStandard};
  background: ${({ theme }) => theme.colors.surface};
`

export const ServicesContainer = styled(PageContainer)``

export const ServicesIntro = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: clamp(3rem, 7vw, 6rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: start;
    flex-direction: column;
  }
`

export const ServicesEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

export const ServicesTitle = styled.h2`
  max-width: 10ch;
  margin-top: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2.75rem, 7vw, 6rem);
  font-weight: 500;
  letter-spacing: -0.065em;
  line-height: 0.9;
`

export const ServicesIntroCopy = styled.p`
  max-width: 25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.8;
`

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.9fr) minmax(0, 0.95fr);
  align-items: start;
  gap: clamp(1.25rem, 3vw, 3rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

export const ServiceImageLink = styled.a`
  display: block;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: box-shadow ${({ theme }) => theme.transitions.standard};
`

export const ServiceCard = styled(motion.article)`
  position: relative;
  min-width: 0;
  margin-top: ${({ $offset }) => ($offset ? 'clamp(2rem, 5vw, 5rem)' : 0)};

  &:hover img,
  &:focus-within img {
    transform: scale(1.05);
  }

  &:hover ${ServiceImageLink},
  &:focus-within ${ServiceImageLink} {
    box-shadow: ${({ theme }) => theme.shadows.soft};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 0;
  }
`

export const ServiceImageFrame = styled.div`
  aspect-ratio: 3 / 4;
  overflow: hidden;
  position: relative;
`

export const ServiceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ${({ theme }) => theme.transitions.easing};
`

export const ServiceBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.lg};
`

export const ServiceEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
`

export const ServiceTitle = styled.h3`
  position: relative;
  display: inline-flex;
  width: fit-content;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  font-weight: 500;
  letter-spacing: -0.04em;

  &::after {
    position: absolute;
    right: 0;
    bottom: -0.25rem;
    left: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.gold};
    content: '';
    transform: scaleX(0.25);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.transitions.standard};
  }

  a:hover &::after,
  a:focus-visible &::after {
    transform: scaleX(1);
  }
`

export const ServiceDescription = styled.p`
  max-width: 18rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.75;
`

export const ServiceLink = styled.a`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  svg {
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};

    svg {
      transform: translate(2px, -2px);
    }
  }
`
