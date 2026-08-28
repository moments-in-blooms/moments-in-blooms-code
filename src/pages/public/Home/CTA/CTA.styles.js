import { motion } from 'framer-motion'
import styled from 'styled-components'
import PageContainer from '../../../../components/PageContainer/index.js'

export const CTARoot = styled.section`
  position: relative;
  overflow: hidden;
  padding-block: ${({ theme }) => theme.spacing.sectionGenerous};
  background: ${({ theme }) => theme.colors.blushSoft};
  color: ${({ theme }) => theme.colors.textPrimary};
  isolation: isolate;
`

export const CTAContainer = styled(PageContainer)`
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  text-align: center;
`

export const CTAEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

export const CTATitle = styled.h2`
  max-width: 10ch;
  margin-top: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(3rem, 9vw, 8.5rem);
  font-weight: 500;
  letter-spacing: -0.08em;
  line-height: 0.85;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(2.75rem, 15vw, 4.5rem);
    letter-spacing: -0.06em;
  }
`

export const CTADescription = styled.p`
  max-width: 32rem;
  margin-top: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: clamp(1rem, 1.7vw, 1.2rem);
  line-height: 1.75;
`

export const CTAActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    width: min(100%, 22rem);

    a {
      width: 100%;
    }
  }
`

export const CTAOrb = styled(motion.span)`
  position: absolute;
  z-index: -1;
  top: 12%;
  right: 9%;
  width: clamp(8rem, 18vw, 17rem);
  aspect-ratio: 1;
  border: 1px solid rgba(165, 137, 116, 0.3);
  border-radius: 50%;

  &::after {
    position: absolute;
    inset: 18%;
    border: 1px solid rgba(165, 137, 116, 0.18);
    border-radius: 50%;
    content: '';
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 8%;
    right: -3rem;
  }
`

export const CTABottomLine = styled(motion.span)`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: min(76rem, 90%);
  height: 1px;
  background: rgba(26, 24, 23, 0.12);
  content: '';
  transform: translateX(-50%);
  transform-origin: left;
`
