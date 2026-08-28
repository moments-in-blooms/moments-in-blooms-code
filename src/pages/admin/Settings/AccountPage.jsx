import { useId, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Field, FieldLabel, RequiredMark, TextField } from '../../../components/FormField/index.js'
import { LoginPasswordInput, PasswordFieldWrap, PasswordToggle } from '../Login/Login.styles.js'
import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ContentFormSection from '../../../components/admin/ContentFormSection/index.js'
import Button from '../../../components/Button/index.js'
import useAuth from '../../../hooks/useAuth.js'
import { updatePassword, updateProfile } from '../../../services/auth.js'
import { showError, showSuccess } from '../../../utils/sweetAlert.js'
import { SettingsPage } from './Settings.styles.js'

function AccountPage() {
  const { session } = useAuth()
  const [displayName, setDisplayName] = useState(session?.displayName ?? '')
  const [email, setEmail] = useState(session?.email ?? '')
  const signedInEmail = session?.email ?? ''
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentVisible, setCurrentVisible] = useState(false)
  const [newVisible, setNewVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const currentId = useId()
  const newId = useId()
  const confirmId = useId()
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const handleSave = async () => {
    setBusy(true)
    setError(null)
    setMessage(null)

    const emailChanged = email.trim().toLowerCase() !== (session?.email ?? '').toLowerCase()
    const displayNameChanged = displayName.trim() !== (session?.displayName ?? '')
    const passwordChanged = Boolean(newPassword)

    if (passwordChanged && newPassword !== confirmPassword) {
      const msg = 'New passwords do not match.'
      setError(msg)
      showError('Validation failed', msg)
      setBusy(false)
      return
    }

    if ((emailChanged || displayNameChanged || passwordChanged) && !currentPassword) {
      const msg = 'Please enter your current password to confirm changes.'
      setError(msg)
      showError('Validation failed', msg)
      setBusy(false)
      return
    }

    if (emailChanged || displayNameChanged) {
      const result = await updateProfile({
        displayName: displayNameChanged ? displayName : undefined,
        email: emailChanged ? email : undefined,
        currentPassword,
      })
      if (result.error) {
        setError(result.error.message)
        showError('Update failed', result.error.message)
        setBusy(false)
        return
      }
    }

    if (passwordChanged) {
      const result = await updatePassword(newPassword, currentPassword)
      if (result.error) {
        setError(result.error.message)
        showError('Update failed', result.error.message)
        setBusy(false)
        return
      }
    }

    if (emailChanged) {
      const msg = 'Verification sent to your new email — please check your inbox and spam folder and click the link, then sign in with your new email.'
      setMessage(msg)
      showSuccess('Account updated', msg)
    } else {
      const msg = 'Account updated.'
      setMessage(msg)
      showSuccess('Saved', msg)
    }
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setBusy(false)
  }

  return (
    <SettingsPage>
      <AdminPageHeader
        eyebrow="System"
        title="My account"
        description="Your display name, email and password for admin access."
      />
      <ContentFormSection title="My account" description="Update your personal admin credentials.">
        {signedInEmail ? (
          <p style={{ margin: 0, fontSize: '0.78rem', color: '#6E6761' }}>
            You are signed in as <strong style={{ color: '#1A1A1A' }}>{signedInEmail}</strong>
          </p>
        ) : null}
        <TextField
          label="Display name"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          placeholder="Your name"
        />
        <TextField
          label="Email address"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          hint="Changing your email requires your current password and confirmation via email."
        />
        <Field>
          <FieldLabel htmlFor={currentId}>
            Current password <RequiredMark aria-hidden="true"> *</RequiredMark>
          </FieldLabel>
          <PasswordFieldWrap>
            <LoginPasswordInput
              id={currentId}
              type={currentVisible ? 'text' : 'password'}
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              placeholder="Required to save changes"
            />
            <PasswordToggle
              type="button"
              aria-label={currentVisible ? 'Hide password' : 'Show password'}
              aria-pressed={currentVisible}
              onClick={() => setCurrentVisible((v) => !v)}
            >
              {currentVisible ? <FiEyeOff aria-hidden="true" size={18} /> : <FiEye aria-hidden="true" size={18} />}
            </PasswordToggle>
          </PasswordFieldWrap>
          <span style={{ fontSize: '0.72rem', color: '#6E6761' }}>Re-enter your current password to confirm.</span>
        </Field>
        <Field>
          <FieldLabel htmlFor={newId}>New password</FieldLabel>
          <PasswordFieldWrap>
            <LoginPasswordInput
              id={newId}
              type={newVisible ? 'text' : 'password'}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Leave blank to keep current password"
            />
            <PasswordToggle
              type="button"
              aria-label={newVisible ? 'Hide password' : 'Show password'}
              aria-pressed={newVisible}
              onClick={() => setNewVisible((v) => !v)}
            >
              {newVisible ? <FiEyeOff aria-hidden="true" size={18} /> : <FiEye aria-hidden="true" size={18} />}
            </PasswordToggle>
          </PasswordFieldWrap>
          <span style={{ fontSize: '0.72rem', color: '#6E6761' }}>At least 6 characters</span>
        </Field>
        <Field>
          <FieldLabel htmlFor={confirmId}>Confirm new password</FieldLabel>
          <PasswordFieldWrap>
            <LoginPasswordInput
              id={confirmId}
              type={confirmVisible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat new password"
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
        </Field>
        {error ? (
          <p role="alert" style={{ color: '#b42318', fontSize: '0.82rem' }}>
            {error}
          </p>
        ) : null}
        {message ? (
          <p role="status" style={{ color: '#027a48', fontSize: '0.82rem' }}>
            {message}
          </p>
        ) : null}
        <Button type="button" variant="primary" onClick={handleSave} disabled={busy} aria-busy={busy}>
          {busy ? 'Saving…' : 'Save account'}
        </Button>
      </ContentFormSection>
    </SettingsPage>
  )
}

export default AccountPage
