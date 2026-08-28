import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiArrowLeft, FiCheckCircle, FiMail } from 'react-icons/fi'
import logoPrimary from '../../../assets/images/logo-old-primary.png'
import Button from '../../../components/Button/index.js'
import { RequiredMark, TextField } from '../../../components/FormField/index.js'
import { sendPasswordResetEmail } from '../../../services/auth.js'
import { EMAIL_PATTERN } from '../../../utils/validation.js'
import {
  LoginBackLink,
  LoginBrand,
  LoginBrandLogo,
  LoginCard,
  LoginError,
  LoginEyebrow,
  LoginForm,
  LoginShell,
  LoginTitle,
} from '../Login/Login.styles.js'
import { SuccessNote } from './ForgotPassword.styles.js'

function ForgotPassword() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const onSubmit = async (values) => {
    if (status === 'submitting') return
    setStatus('submitting')
    setError(null)

    const result = await sendPasswordResetEmail(values.email)
    if (result.error) {
      setError(result.error.message)
      setStatus('idle')
      return
    }

    setStatus('success')
  }

  if (status === 'success') {
    return (
      <LoginShell>
        <LoginCard>
          <LoginBrand>
            <LoginBrandLogo src={logoPrimary} alt="" aria-hidden="true" />
            <LoginEyebrow>Check your email</LoginEyebrow>
            <LoginTitle>Reset link sent.</LoginTitle>
          </LoginBrand>
          <SuccessNote role="status">
            <FiCheckCircle aria-hidden="true" size={18} />
            <span>
              If an account exists for that email, a password reset link has been sent. Please check your inbox and spam folder.
            </span>
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
          <LoginTitle>Forgot your password?</LoginTitle>
        </LoginBrand>

        <LoginForm noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={
              <>
                Email address
                <RequiredMark aria-hidden="true"> *</RequiredMark>
              </>
            }
            type="email"
            required
            placeholder="you@momentsinblooms.com"
            error={errors.email?.message}
            {...register('email', {
              required: 'Please enter your email address.',
              pattern: { value: EMAIL_PATTERN, message: 'Please enter a valid email address.' },
            })}
          />

          {error ? <LoginError role="alert">{error}</LoginError> : null}

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            disabled={status === 'submitting'}
            aria-busy={status === 'submitting'}
          >
            <FiMail aria-hidden="true" size={16} />
            {status === 'submitting' ? 'Sending…' : 'Send reset link'}
          </Button>
        </LoginForm>

        <LoginBackLink to="/admin/login">
          <FiArrowLeft aria-hidden="true" size={15} />
          Back to sign in
        </LoginBackLink>
      </LoginCard>
    </LoginShell>
  )
}

export default ForgotPassword
