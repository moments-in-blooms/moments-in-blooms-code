import { motion } from 'framer-motion'
import styled from 'styled-components'

export const CtaRoot = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.spacing.sectionGenerous} 0;
  background: ${({ theme }) => theme.colors.taupe};
  overflow: hidden;
`

export const CtaContent = styled.div`
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin: 0 auto;
  text-align: center;
`

export const CtaEyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.charcoal};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const CtaTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 400;
  line-height: ${({ theme }) => theme.typography.headingLineHeight};
  color: ${({ theme }) => theme.colors.charcoal};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: calc(${({ theme }) => theme.spacing.md} - 0.1em);
`

export const CtaDescription = styled.p`
  max-width: 560px;
  margin: 0 auto;
  color: rgba(26, 26, 26, 0.78);
  font-family: ${({ theme }) => theme.typography.bodyFont};
  font-size: 1rem;
  line-height: 1.8;
`

export const CtaActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`

export const CtaBottomLine = styled(motion.span)`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: min(76rem, 90%);
  height: 1px;
  background: rgba(26, 26, 26, 0.2);
  transform: translateX(-50%);
  transform-origin: left;
`
