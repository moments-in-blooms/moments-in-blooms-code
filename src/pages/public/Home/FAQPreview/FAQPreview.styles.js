import { motion } from 'framer-motion'
import styled from 'styled-components'
import PageContainer from '../../../../components/PageContainer/index.js'

export const FAQRoot = styled.section`
  padding-block: ${({ theme }) => theme.spacing.sectionStandard};
  background: ${({ $tone, theme }) =>
    $tone === 'surface' ? theme.colors.surface : theme.colors.beige};
`

export const FAQContainer = styled(PageContainer)`
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
`

export const FAQHeader = styled.div`
  display: grid;
  justify-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`

export const FAQEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

export const FAQTitle = styled.h2`
  margin-top: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  font-weight: 500;
  letter-spacing: -0.07em;
  line-height: 0.88;
`

export const FAQList = styled(motion.div)`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const FAQItem = styled(motion.div)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const FAQTrigger = styled.button`
  display: flex;
  width: 100%;
  min-height: ${({ theme }) => theme.controls.tapTarget};
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.25;
  text-align: left;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`

export const FAQIcon = styled(motion.span)`
  display: inline-grid;
  width: 2rem;
  height: 2rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.primaryHover};
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1;
`

export const FAQPanel = styled(motion.div)`
  overflow: hidden;
`

export const FAQAnswer = styled.p`
  max-width: 42rem;
  padding: 0 3rem ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.8;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-right: 0;
  }
`

export const FAQAction = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xxl};
`
