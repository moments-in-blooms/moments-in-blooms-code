import styled from 'styled-components'

export const FaqHeroRoot = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 62vh;
  background: ${({ theme }) => theme.colors.charcoal};
  margin-top: calc(-1 * ${({ theme }) => theme.layout.headerHeight});
  padding: clamp(8rem, 16vh, 10rem) 0 clamp(4rem, 8vh, 6rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: calc(-1 * ${({ theme }) => theme.layout.mobileHeaderHeight});
  }
`

export const FaqHeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`

export const FaqHeroEyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldLight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const FaqHeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 400;
  line-height: ${({ theme }) => theme.typography.headingLineHeight};
  color: #f5f0e8;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: calc(${({ theme }) => theme.spacing.lg} - 0.1em);
`

export const FaqHeroDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.bodyFont};
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.8;
  color: rgba(245, 240, 232, 0.72);
  max-width: 620px;
  margin: 0 auto;
`
