import { motion } from 'framer-motion'
import styled from 'styled-components'
import PageContainer from '../../../../components/PageContainer/index.js'

export const WhyRoot = styled.section`
  padding-block: ${({ theme }) => theme.spacing.sectionStandard};
  background: ${({ theme }) => theme.colors.surface};
`

export const WhyContainer = styled(PageContainer)`
  display: grid;
  grid-template-columns: minmax(14rem, 0.75fr) minmax(0, 1.25fr);
  gap: clamp(3rem, 8vw, 9rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`

export const WhyLead = styled.div`
  position: sticky;
  top: 8rem;
  align-self: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: static;
  }
`

export const WhyEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

export const WhyTitle = styled.h2`
  max-width: 7ch;
  margin-top: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(3.25rem, 9vw, 8rem);
  font-weight: 500;
  letter-spacing: -0.08em;
  line-height: 0.82;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(2.75rem, 16vw, 4.5rem);
    letter-spacing: -0.06em;
  }
`

export const WhyCopy = styled.p`
  max-width: 22rem;
  margin-top: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.8;
`

export const ReasonsList = styled(motion.ol)`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const ReasonRow = styled(motion.li)`
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  transition: background ${({ theme }) => theme.transitions.standard};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 3rem minmax(0, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.lg} 0;
  }
`

export const ReasonNumber = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: -0.06em;
  line-height: 0.9;
`

export const ReasonContent = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const ReasonTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 500;
  letter-spacing: -0.04em;
`

export const ReasonDescription = styled.p`
  max-width: 31rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.75;
`
