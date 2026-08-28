import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

const backgroundByTone = {
  default: 'background',
  soft: 'beige',
  surface: 'surface',
  ivory: 'ivory',
  beige: 'beige',
  blush: 'blushSoft',
  ink: 'ink',
}

export const darkSectionTokens = css`
  color: #f5f0e8;
  --section-heading: #f5f0e8;
  --section-text: #f5f0e8;
  --section-text-secondary: rgba(245, 240, 232, 0.72);
  --section-eyebrow: ${({ theme }) => theme.colors.goldLight};
  --section-border: rgba(245, 240, 232, 0.14);
`

const inkTone = darkSectionTokens

export const SectionRoot = styled.section`
  padding-block: ${({ theme }) => theme.spacing.section};
  background: ${({ $tone, theme }) =>
    theme.colors[backgroundByTone[$tone] || backgroundByTone.default]};
  border-bottom: 1px solid
    ${({ $tone }) => ($tone === 'ink' ? 'rgba(245, 240, 232, 0.08)' : 'transparent')};
  ${({ $tone }) => ($tone === 'ink' ? inkTone : null)};
`

export const SectionHeader = styled.div`
  display: grid;
  width: min(100% - 2rem, ${({ theme }) => theme.layout.containerMaxWidth});
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin-right: auto;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  margin-left: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.tabletMin}) {
    width: min(100% - 4rem, ${({ theme }) => theme.layout.containerMaxWidth});
  }
`

export const SectionSubtitle = styled.span`
  display: block;
  color: var(--section-eyebrow, ${({ theme }) => theme.colors.primaryHover});
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

export const SectionTitleMask = styled.div`
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
`

export const SectionDescription = styled.p`
  max-width: 46rem;
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
  color: var(--section-text-secondary, ${({ theme }) => theme.colors.textSecondary});
  font-size: 0.95rem;
  line-height: 1.75;
`

export const SectionAction = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing.md};
`
