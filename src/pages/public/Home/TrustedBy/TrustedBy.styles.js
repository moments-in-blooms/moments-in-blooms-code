import { motion } from 'framer-motion'
import styled from 'styled-components'
import PageContainer from '../../../../components/PageContainer/index.js'

export const TrustedByRoot = styled.section`
  padding-block: ${({ theme }) => theme.spacing.sectionGenerous};
  background: ${({ theme }) => theme.colors.beige};
`

export const TrustedByContainer = styled(PageContainer)`
  display: grid;
  justify-items: center;
  text-align: center;
`

export const TrustEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

export const TrustStatement = styled(motion.p)`
  max-width: 58rem;
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2rem, 5.8vw, 5.5rem);
  font-style: italic;
  letter-spacing: -0.055em;
  line-height: 0.98;
`

export const TrustStatementLead = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-style: normal;
`

export const TrustMarks = styled(motion.ul)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  margin: clamp(4rem, 8vw, 7rem) 0 0;
  padding: ${({ theme }) => theme.spacing.lg} 0 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  list-style: none;

  li {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 40%;
    }
  }
`
