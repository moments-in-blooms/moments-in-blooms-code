import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Input } from '../../../components/FormField/index.js'

export const LoginShell = styled.main`
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.gradients.blissNestPanel};
`

export const LoginCard = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 26rem;
  padding: clamp(2rem, 5vw, 3rem);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`

export const LoginBrand = styled.div`
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  text-align: center;
`

export const LoginBrandLogo = styled.img`
  width: 4rem;
  height: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  object-fit: contain;
`

export const LoginEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.gold};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`

export const LoginTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: clamp(2rem, 5vw, 2.6rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
`

export const LoginForm = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const PasswordFieldWrap = styled.div`
  position: relative;
`

export const LoginPasswordInput = styled(Input)`
  padding-right: 3rem;
`

export const PasswordToggle = styled.button`
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radii.sm};
  }
`

export const LoginError = styled.p`
  margin: 0;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(201, 74, 70, 0.4);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(201, 74, 70, 0.07);
  color: ${({ theme }) => theme.colors.danger};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.8rem;
  line-height: 1.6;
`

export const LoginDemoNote = styled.p`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  padding: 0.85rem 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.74rem;
  line-height: 1.6;

  svg {
    flex: 0 0 auto;
    margin-top: 0.15rem;
    color: ${({ theme }) => theme.colors.gold};
  }
`

export const LoginBackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.uiFont};
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`