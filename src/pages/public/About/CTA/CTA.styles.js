import { motion } from 'framer-motion'
import styled from 'styled-components'
import { darkSectionTokens } from '../../../../components/Section/Section.styles.js'

export const CTARoot = styled.section`
  position: relative;
  padding-block: clamp(5rem, 9vw, 8rem);
  background: ${({ theme }) => theme.colors.ink};
  ${darkSectionTokens}
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -20%;
    width: 60vw;
    height: 60vw;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(245, 240, 232, 0.1) 0%,
      rgba(245, 240, 232, 0) 70%
    );
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -50%;
    right: -20%;
    width: 60vw;
    height: 60vw;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(165, 137, 116, 0.18) 0%,
      rgba(0, 0, 0, 0) 70%
    );
    pointer-events: none;
    z-index: 1;
  }
`

export const CTAContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 48rem;
  margin-inline: auto;
`

export const CTASubtitle = styled.span`
  color: ${({ theme }) => theme.colors.goldLight};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const CTATitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: calc(${({ theme }) => theme.spacing.md} - 0.1em);
  color: var(--section-heading, ${({ theme }) => theme.colors.textPrimary});
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2.25rem, 5.5vw, 3.75rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1.05;
`

export const CTADescription = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  color: var(--section-text-secondary, ${({ theme }) => theme.colors.textSecondary});
  font-size: clamp(1.05rem, 1.5vw, 1.2rem);
  line-height: 1.7;
  max-width: 42ch;
`

export const CTAActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
`
