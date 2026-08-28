import { motion } from 'framer-motion'
import styled from 'styled-components'

export const LoadingRegion = styled.div`
  display: grid;
  min-height: ${({ $inline }) => ($inline ? '4rem' : '40vh')};
  place-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const LoadingIndicator = styled(motion.span)`
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.pill};
`
