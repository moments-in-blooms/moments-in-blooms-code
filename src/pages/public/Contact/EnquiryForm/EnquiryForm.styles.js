import styled from 'styled-components'

export { ChoiceGroup, ChoiceInput, ChoiceLabel, ChoicePill, ErrorText, Field, FieldLabel, FieldRow, HelpText, Input, RequiredMark, Textarea } from '../../../../components/FormField/index.js'

export const FormSection = styled.section`
  padding-block: ${({ theme }) => theme.spacing.section};
  background: ${({ theme }) => theme.colors.ivory};
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`

export const Rail = styled.div`
  position: sticky;
  top: calc(${({ theme }) => theme.layout.headerHeight} + 2rem);
  padding-block: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    position: static;
    padding-block: 0;
  }
`

export const RailEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &::before {
    content: '';
    width: 2.5rem;
    height: 1px;
    background: ${({ theme }) => theme.colors.gold};
  }
`

export const RailTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  overflow: hidden;
  padding-bottom: 0.1em;
  margin-bottom: calc(${({ theme }) => theme.spacing.lg} - 0.1em);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.75rem, 3.2vw, 2.4rem);
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: -0.02em;
`

export const RailSteps = styled.ol`
  list-style: none;
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const RailStep = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: start;
`

export const RailStepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.7rem;
  font-weight: 700;
`

export const RailStepTitle = styled.p`
  margin: 0 0 0.2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 1.1rem;
`

export const RailStepDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  line-height: 1.7;
`

export const RailNote = styled.p`
  margin: 0;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.75rem;
  line-height: 1.7;
`

export const FormPanel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: clamp(1.5rem, 4vw, 2.5rem);
`

export const Fieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};

  & + & {
    margin-top: ${({ theme }) => theme.spacing.xxl};
    padding-top: ${({ theme }) => theme.spacing.xxl};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`

export const FieldsetHeading = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const FieldsetKicker = styled.span`
  color: ${({ theme }) => theme.colors.gold};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`

export const FieldsetTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.3rem, 2.4vw, 1.6rem);
  font-weight: 400;
  line-height: 1.15;
`

export const FieldsetHint = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  line-height: 1.7;
`

export const StepPanel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};

  &[hidden] {
    display: none;
  }
`

export const NavRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  flex-wrap: wrap;
`

export const NavForward = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1 1 auto;
  min-width: 0;
  margin-left: auto;

  button {
    flex: 0 0 auto;
  }
`

export const SubmitRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`

export const SubmitNote = styled.p`
  margin: ${({ theme }) => theme.spacing.md} 0 0;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.72rem;
  line-height: 1.6;
`

export const ErrorBanner = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 1rem 1.25rem;
  border: 1px solid rgba(201, 74, 70, 0.4);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(201, 74, 70, 0.07);
  color: ${({ theme }) => theme.colors.danger};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.82rem;
  line-height: 1.65;

  a {
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`

export const SuccessPanel = styled.div`
  display: grid;
  justify-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};

  .success-icon {
    display: grid;
    place-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.ivory};
    color: ${({ theme }) => theme.colors.primaryHover};

    svg {
      width: 1.75rem;
      height: 1.75rem;
    }
  }
`

export const SuccessEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primaryHover};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`

export const SuccessTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 400;
  line-height: 1.15;
`

export const SuccessText = styled.p`
  margin: 0;
  max-width: 34rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.8;
`

export const SuccessActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`