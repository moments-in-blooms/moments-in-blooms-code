import styled from 'styled-components'
import PageContainer from '../../../components/PageContainer/index.js'

export const FaqPage = styled.div`
  min-width: 0;
`

export const FaqCategorySection = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: clamp(1.75rem, 3.5vw, 3rem) 0 clamp(2.5rem, 5vw, 4rem);
`

export const FaqFilterIntro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 640px;
  margin: 0 auto;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`

export const FaqFilterEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

export const FaqFilterTitle = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  line-height: 1.2;
`

export const FaqFilterDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.7;
`

export const FaqContentSection = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding-bottom: ${({ theme }) => theme.spacing.sectionStandard};
`

export const FaqContainer = styled(PageContainer)``

export const FaqErrorBlock = styled.div`
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 420px;
  margin: 0 auto;
  text-align: center;
`

export const FaqErrorMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.7;
`

export const FaqSearchWrap = styled.div`
  max-width: 420px;
  margin: 0 auto 1.25rem;
`

export const FaqSearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.9rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`
