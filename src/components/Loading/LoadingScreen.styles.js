import { motion } from 'framer-motion'
import styled from 'styled-components'

export const LoadingScreenRoot = styled(motion.div)`
  position: fixed;
  z-index: ${({ theme }) => theme.layers.loading};
  inset: 0;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.background};
`

export const LoadingScreenContent = styled.div`
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
`

export const LoadingScreenBrand = styled(motion.span)`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  letter-spacing: -0.02em;
`

export const LoadingRule = styled(motion.span)`
  display: block;
  width: 1px;
  height: 3.5rem;
  background: ${({ theme }) => theme.colors.primary};
  transform-origin: top;
`
