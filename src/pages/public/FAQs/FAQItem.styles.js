import { motion } from 'framer-motion'
import styled from 'styled-components'

export const FaqItemRoot = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`

export const FaqTrigger = styled.button`
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
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 4px;
  }
`

export const FaqQuestion = styled.span`
  padding-right: ${({ theme }) => theme.spacing.md};
`

export const FaqIcon = styled.span`
  display: inline-grid;
  flex: 0 0 auto;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 1px solid
    ${({ $isOpen, theme }) => ($isOpen ? theme.colors.gold : theme.colors.border)};
  border-radius: 50%;
  color: ${({ $isOpen, theme }) =>
    $isOpen ? theme.colors.gold : theme.colors.primaryHover};
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};
`

export const FaqPanel = styled(motion.div)`
  overflow: hidden;
`

export const FaqAnswer = styled.p`
  max-width: 42rem;
  padding: 0 3.25rem ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.8;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-right: 0;
  }
`
