import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import logoPrimary from '../../../assets/images/logo-old-primary.png'
import Button from '../../../components/Button/index.js'
import {
  ErrorText,
  Field,
  FieldLabel,
  RequiredMark,
  TextField,
} from '../../../components/FormField/index.js'
import { adminLogin } from '../../../constants/admin.js'
import useAuth from '../../../hooks/useAuth.js'
import { EMAIL_PATTERN } from '../../../utils/validation.js'
import {
  LoginBackLink,
  LoginBrand,
  LoginBrandLogo,
  LoginCard,
  LoginError,
  LoginEyebrow,
  LoginForm,
  LoginPasswordInput,
  LoginShell,
  LoginTitle,
  PasswordFieldWrap,
  PasswordToggle,
} from './Login.styles.js'

function Login() {
  const { session, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [authError, setAuthError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const passwordId = useId()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  if (session) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const onSubmit = async (values) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    setAuthError(null)

    const result = await signIn(values.email, values.password)
    setIsSubmitting(false)

    if (result.error) {
      setAuthError(result.error.message)
      return
    }

    try {
      window.sessionStorage.setItem('mib_pwa_show_after_login', '1')
    } catch {
      void 0
    }
    const from = location.state?.from
    navigate(from || '/admin/dashboard', { replace: true })
  }

  return (
    <LoginShell>
      <LoginCard>
        <LoginBrand>
          <LoginBrandLogo src={logoPrimary} alt="" aria-hidden="true" />
          <LoginEyebrow>{adminLogin.eyebrow}</LoginEyebrow>
          <LoginTitle>{adminLogin.title}</LoginTitle>
        </LoginBrand>

        <LoginForm noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={
              <>
                {adminLogin.emailLabel}
                <RequiredMark aria-hidden="true"> *</RequiredMark>
              </>
            }
            type="email"
            required
            placeholder={adminLogin.emailPlaceholder}
            error={errors.email?.message}
            {...register('email', {
              required: 'Please enter your email address.',
              pattern: { value: EMAIL_PATTERN, message: 'Please enter a valid email address.' },
            })}
          />
          <Field>
            <FieldLabel htmlFor={passwordId}>
              {adminLogin.passwordLabel}
              <RequiredMark aria-hidden="true"> *</RequiredMark>
            </FieldLabel>
            <PasswordFieldWrap>
              <LoginPasswordInput
                id={passwordId}
                type={passwordVisible ? 'text' : 'password'}
                required
                $error={Boolean(errors.password)}
                {...register('password', {
                  required: 'Please enter your password.',
                  minLength: { value: 6, message: 'Your password must be at least 6 characters.' },
                })}
              />
              <PasswordToggle
                type="button"
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                aria-pressed={passwordVisible}
                onClick={() => setPasswordVisible((visible) => !visible)}
              >
                {passwordVisible ? (
                  <FiEyeOff aria-hidden="true" size={18} />
                ) : (
                  <FiEye aria-hidden="true" size={18} />
                )}
              </PasswordToggle>
            </PasswordFieldWrap>
            {errors.password?.message ? (
              <ErrorText>{errors.password.message}</ErrorText>
            ) : null}
          </Field>

          {authError ? <LoginError role="alert">{authError}</LoginError> : null}

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? adminLogin.loadingLabel : adminLogin.submitLabel}
          </Button>

          <div style={{ textAlign: 'right', marginTop: '0.75rem' }}>
            <Link
              to="/admin/forgot-password"
              style={{
                fontSize: '0.82rem',
                color: 'var(--color-primary, #8b6f47)',
                textDecoration: 'underline',
              }}
            >
              {adminLogin.forgotPasswordLabel}
            </Link>
          </div>
        </LoginForm>

        <LoginBackLink to="/">
          <FiArrowLeft aria-hidden="true" size={15} />
          {adminLogin.backToSiteLabel}
        </LoginBackLink>
      </LoginCard>
    </LoginShell>
  )
}

export default Login