import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiArrowLeft, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import logoPrimary from '../../../assets/images/logo-old-primary.png'
import Button from '../../../components/Button/index.js'
import { ErrorText, Field, FieldLabel, RequiredMark } from '../../../components/FormField/index.js'
import { updatePassword } from '../../../services/auth.js'
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
} from '../Login/Login.styles.js'
import { SuccessNote } from '../ForgotPassword/ForgotPassword.styles.js'

function ResetPassword() {
  const navigate = useNavigate()
  const [authError, setAuthError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [visible, setVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const newPasswordId = useId()
  const confirmId = useId()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  // eslint-disable-next-line react-hooks/incompatible-library
  const newPassword = watch('password')

  const onSubmit = async (values) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    setAuthError(null)

    const result = await updatePassword(values.password)
    setIsSubmitting(false)

    if (result.error) {
      setAuthError(result.error.message)
      return
    }

    setSuccess(true)
    window.setTimeout(() => navigate('/admin/login', { replace: true }), 1800)
  }

  if (success) {
    return (
      <LoginShell>
        <LoginCard>
          <LoginBrand>
            <LoginBrandLogo src={logoPrimary} alt="" aria-hidden="true" />
            <LoginEyebrow>Password updated</LoginEyebrow>
            <LoginTitle>All set.</LoginTitle>
          </LoginBrand>
          <SuccessNote role="status">
            <FiCheckCircle aria-hidden="true" size={18} />
            <span>Your password has been updated. Redirecting you to sign in…</span>
          </SuccessNote>
          <LoginBackLink to="/admin/login">
            <FiArrowLeft aria-hidden="true" size={15} />
            Back to sign in
          </LoginBackLink>
        </LoginCard>
      </LoginShell>
    )
  }

  return (
    <LoginShell>
      <LoginCard>
        <LoginBrand>
          <LoginBrandLogo src={logoPrimary} alt="" aria-hidden="true" />
          <LoginEyebrow>Reset password</LoginEyebrow>
          <LoginTitle>Choose a new password.</LoginTitle>
        </LoginBrand>

        <LoginForm noValidate onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel htmlFor={newPasswordId}>
              New password
              <RequiredMark aria-hidden="true"> *</RequiredMark>
            </FieldLabel>
            <PasswordFieldWrap>
              <LoginPasswordInput
                id={newPasswordId}
                type={visible ? 'text' : 'password'}
                required
                $error={Boolean(errors.password)}
                {...register('password', {
                  required: 'Please enter a new password.',
                  minLength: { value: 6, message: 'Your password must be at least 6 characters.' },
                })}
              />
              <PasswordToggle
                type="button"
                aria-label={visible ? 'Hide password' : 'Show password'}
                aria-pressed={visible}
                onClick={() => setVisible((v) => !v)}
              >
                {visible ? <FiEyeOff aria-hidden="true" size={18} /> : <FiEye aria-hidden="true" size={18} />}
              </PasswordToggle>
            </PasswordFieldWrap>
            {errors.password?.message ? <ErrorText>{errors.password.message}</ErrorText> : null}
          </Field>

          <Field>
            <FieldLabel htmlFor={confirmId}>
              Confirm password
              <RequiredMark aria-hidden="true"> *</RequiredMark>
            </FieldLabel>
            <PasswordFieldWrap>
              <LoginPasswordInput
                id={confirmId}
                type={confirmVisible ? 'text' : 'password'}
                required
                $error={Boolean(errors.confirmPassword)}
                {...register('confirmPassword', {
                  required: 'Please confirm your password.',
                  validate: (value) => value === newPassword || 'Passwords do not match.',
                })}
              />
              <PasswordToggle
                type="button"
                aria-label={confirmVisible ? 'Hide password' : 'Show password'}
                aria-pressed={confirmVisible}
                onClick={() => setConfirmVisible((v) => !v)}
              >
                {confirmVisible ? <FiEyeOff aria-hidden="true" size={18} /> : <FiEye aria-hidden="true" size={18} />}
              </PasswordToggle>
            </PasswordFieldWrap>
            {errors.confirmPassword?.message ? <ErrorText>{errors.confirmPassword.message}</ErrorText> : null}
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
            {isSubmitting ? 'Updating…' : 'Update password'}
          </Button>
        </LoginForm>

        <div style={{ textAlign: 'center' }}>
          <Link
            to="/admin/login"
            style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary, #666)', textDecoration: 'underline' }}
          >
            Back to sign in
          </Link>
        </div>
      </LoginCard>
    </LoginShell>
  )
}

export default ResetPassword
