import { supabase } from './supabaseClient.js'
import {
  ADMIN_DEMO_CREDENTIALS,
  ADMIN_SESSION_KEY,
  ADMIN_SESSION_TTL_MS,
} from '../constants/admin.js'

const DEMO_SIGN_IN_ERROR = 'Invalid email or password. Please try again.'
const SUPABASE_SIGN_IN_ERROR = 'Invalid email or password. Please try again.'
const SUPABASE_SIGN_OUT_ERROR = 'We couldn\'t sign you out right now. Please try again.'
const PASSWORD_RESET_ERROR = "We couldn't send the reset email. Please try again."
const PASSWORD_RESET_RATE_LIMIT_ERROR =
  'Too many reset emails have been sent recently. Please wait about an hour, then try again.'
const PASSWORD_UPDATE_ERROR = "We couldn't update your password. Please try again."

const normalizeSupabaseSession = (session) =>
  session?.user
    ? {
        id: session.user.id ?? null,
        email: session.user.email ?? '',
        displayName: session.user.user_metadata?.display_name ?? session.user.user_metadata?.displayName ?? '',
        signedInAt: new Date().toISOString(),
      }
    : null

function readSession() {
  try {
    const raw = window.localStorage.getItem(ADMIN_SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    if (!session?.email || !session?.expiresAt) return null
    if (Date.now() > session.expiresAt) {
      window.localStorage.removeItem(ADMIN_SESSION_KEY)
      return null
    }
    return session
  } catch {
    return null
  }
}

function writeSession(session) {
  try {
    window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
  } catch (error) {
    console.warn('[auth] session storage unavailable', error)
  }
}

/**
 * Synchronous session read. Returns the demo session immediately when
 * Supabase is not configured; returns null otherwise (the real session is
 * resolved asynchronously via getSupabaseSession).
 */
export const getSession = () => (!supabase ? readSession() : null)

export async function getSupabaseSession() {
  if (!supabase) {
    return { session: readSession(), error: null }
  }

  const { data, error } = await supabase.auth.getSession()
  if (error) {
    console.error('[auth] getSession failed', error)
    return { session: null, error: { message: SUPABASE_SIGN_IN_ERROR } }
  }
  const session = normalizeSupabaseSession(data.session)
  if (session?.id) {
    const active = await checkIsActive(session.id)
    if (!active) {
      await supabase.auth.signOut()
      return { session: null, error: { message: 'Your account has been disabled.' } }
    }
  }
  return { session, error: null }
}

async function checkIsActive(userId) {
  if (!userId || !supabase) return true
  try {
    const { data } = await supabase.from('admin_profiles').select('is_active').eq('id', userId).maybeSingle()
    if (data && data.is_active === false) return false
    return true
  } catch {
    return true
  }
}

export async function signIn(email, password) {
  const normalizedEmail = String(email ?? '').trim().toLowerCase()

  if (!supabase) {
    const isValid =
      normalizedEmail === ADMIN_DEMO_CREDENTIALS.email &&
      String(password ?? '') === ADMIN_DEMO_CREDENTIALS.password

    if (!isValid) {
      return { session: null, error: { message: DEMO_SIGN_IN_ERROR } }
    }

    const session = {
      email: normalizedEmail,
      signedInAt: new Date().toISOString(),
      expiresAt: Date.now() + ADMIN_SESSION_TTL_MS,
    }
    writeSession(session)
    return { session, error: null }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password: String(password ?? ''),
  })

  if (error) {
    console.warn('[auth] signInWithPassword failed', error)
    return { session: null, error: { message: SUPABASE_SIGN_IN_ERROR } }
  }

  const active = await checkIsActive(data.session?.user?.id)
  if (!active) {
    await supabase.auth.signOut()
    return { session: null, error: { message: 'Your account has been disabled. Please contact the owner.' } }
  }

  return { session: normalizeSupabaseSession(data.session), error: null }
}

export async function signOut() {
  if (!supabase) {
    try {
      window.localStorage.removeItem(ADMIN_SESSION_KEY)
    } catch (error) {
      console.warn('[auth] session removal failed', error)
    }
    return { error: null }
  }

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.warn('[auth] signOut failed', error)
    return { error: { message: SUPABASE_SIGN_OUT_ERROR } }
  }
  return { error: null }
}

export async function sendPasswordResetEmail(email) {
  const normalizedEmail = String(email ?? '').trim().toLowerCase()
  if (!normalizedEmail) {
    return { error: { message: 'Please enter your email address.' } }
  }

  if (!supabase) {
    return {
      error: {
        message:
          'Password reset requires Supabase to be configured. Please set up your environment variables.',
      },
    }
  }

  // Redirect back to THIS deployment (localhost, preview or production) —
  // a hardcoded domain breaks the flow on every other environment.
  const redirectTo = `${window.location.origin}/admin/reset-password`
  const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
    redirectTo,
  })

  if (error) {
    console.warn('[auth] resetPasswordForEmail failed', error)
    const rateLimited = error?.status === 429 || /rate limit/i.test(error?.message ?? '')
    return { error: { message: rateLimited ? PASSWORD_RESET_RATE_LIMIT_ERROR : PASSWORD_RESET_ERROR } }
  }

  return { error: null }
}

export async function updatePassword(newPassword, currentPassword) {
  if (!supabase) {
    return {
      error: { message: 'Password update requires Supabase to be configured.' },
    }
  }

  if (!newPassword || String(newPassword).length < 6) {
    return {
      error: { message: 'Your password must be at least 6 characters.' },
    }
  }

  // Require current password re-entry for security
  if (currentPassword) {
    const { data: userData } = await supabase.auth.getUser()
    const currentEmail = userData?.user?.email
    if (currentEmail) {
      const { error: reAuthError } = await supabase.auth.signInWithPassword({
        email: currentEmail,
        password: String(currentPassword),
      })
      if (reAuthError) {
        return { error: { message: 'Current password is incorrect.' } }
      }
    }
  }

  const { error } = await supabase.auth.updateUser({
    password: String(newPassword),
  })

  if (error) {
    console.warn('[auth] updateUser password failed', error)
    return { error: { message: PASSWORD_UPDATE_ERROR } }
  }

  return { error: null }
}

export async function updateProfile({ displayName, email, currentPassword }) {
  if (!supabase) {
    return { error: { message: 'Profile update requires Supabase to be configured.' } }
  }

  // Require re-auth for sensitive changes (email or displayName + email)
  const needsReAuth = email !== undefined && String(email).trim()
  if (needsReAuth) {
    if (!currentPassword) {
      return { error: { message: 'Please enter your current password to change your email.' } }
    }
    const { data: userData } = await supabase.auth.getUser()
    const currentEmail = userData?.user?.email
    if (currentEmail) {
      const { error: reAuthError } = await supabase.auth.signInWithPassword({
        email: currentEmail,
        password: String(currentPassword),
      })
      if (reAuthError) {
        return { error: { message: 'Current password is incorrect.' } }
      }
    }
  }

  const updates = {}
  if (displayName !== undefined) {
    updates.data = { display_name: String(displayName).trim() }
  }
  if (email !== undefined && String(email).trim()) {
    const normalized = String(email).trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return { error: { message: 'Please enter a valid email address.' } }
    }
    updates.email = normalized
  }

  if (Object.keys(updates).length === 0) return { error: null }

  const { error } = await supabase.auth.updateUser(updates)
  if (error) {
    console.warn('[auth] updateUser profile failed', error)
    return { error: { message: error.message || PASSWORD_UPDATE_ERROR } }
  }

  // Mirror to admin_profiles for team list display (best-effort)
  try {
    const { data: sessionData } = await supabase.auth.getUser()
    const userId = sessionData?.user?.id
    if (userId) {
      const profilePatch = {}
      if (displayName !== undefined) profilePatch.display_name = String(displayName).trim() || null
      if (email !== undefined) profilePatch.email = String(email).trim().toLowerCase()
      if (Object.keys(profilePatch).length > 0) {
        await supabase.from('admin_profiles').update(profilePatch).eq('id', userId)
      }
    }
  } catch (profileError) {
    console.warn('[auth] admin_profiles sync failed', profileError)
  }

  return { error: null }
}

export async function signUpStaff({ email, password, displayName, role = 'staff' }) {
  if (!supabase) {
    return { error: { message: 'Staff creation requires Supabase to be configured.' } }
  }
  const normalizedEmail = String(email ?? '').trim().toLowerCase()
  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { error: { message: 'Please enter a valid email address.' } }
  }
  if (!password || String(password).length < 6) {
    return { error: { message: 'Password must be at least 6 characters.' } }
  }

  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password: String(password),
    options: {
      data: { display_name: String(displayName ?? '').trim() || splitEmail(normalizedEmail) },
      emailRedirectTo: `${window.location.origin}/admin/login`,
    },
  })
  if (error) {
    console.warn('[auth] signUp failed', error)
    return { error: { message: error.message || PASSWORD_UPDATE_ERROR } }
  }

  // Upsert profile role if provided (trigger creates row as staff by default; owner can be promoted)
  try {
    const newUserId = data.user?.id
    if (newUserId && role !== 'staff') {
      await supabase.from('admin_profiles').update({ role, display_name: String(displayName ?? '').trim() || null, email: normalizedEmail }).eq('id', newUserId)
    }
  } catch (profileError) {
    console.warn('[auth] staff role sync failed', profileError)
  }

  return { error: null }
}

export async function inviteStaff({ email, displayName, role = 'staff' }) {
  if (!supabase) {
    return { error: { message: 'Invite requires Supabase to be configured.' } }
  }
  const normalizedEmail = String(email ?? '').trim().toLowerCase()
  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { error: { message: 'Please enter a valid email address.' } }
  }
  if (!displayName || !String(displayName).trim()) {
    return { error: { message: 'Display name is required.' } }
  }
  // v1 invite is informational — staff self-registers at /admin/register with the invited email.
  // We store the invite intent in localStorage for demo, no DB FK needed; real access is granted when they sign up.
  try {
    const key = 'mib_pending_invites'
    const raw = window.localStorage.getItem(key)
    const list = raw ? JSON.parse(raw) : []
    list.push({ email: normalizedEmail, displayName: String(displayName).trim(), role, invitedAt: new Date().toISOString() })
    window.localStorage.setItem(key, JSON.stringify(list))
  } catch {
    // storage unavailable — ignore, invite is still valid via sign-up
  }
  return { error: null }
}

function splitEmail(email) {
  return String(email).split('@')[0] || 'staff'
}

export async function listAdminProfiles() {
  if (!supabase) return { data: [], error: null, demo: true }
  const { data, error } = await supabase.from('admin_profiles').select('*').order('created_at', { ascending: true })
  if (error) {
    console.warn('[auth] listAdminProfiles failed', error)
    return { data: null, error: { message: 'Could not load team.' } }
  }
  return { data, error: null }
}

export async function updateAdminProfile(id, patch) {
  if (!supabase) return { error: { message: 'Supabase not configured.' } }
  const allowed = {}
  if (patch.display_name !== undefined) allowed.display_name = patch.display_name
  if (patch.role !== undefined) allowed.role = patch.role
  if (patch.is_active !== undefined) allowed.is_active = patch.is_active
  const { error } = await supabase.from('admin_profiles').update(allowed).eq('id', id)
  if (error) {
    console.warn('[auth] updateAdminProfile failed', error)
    return { error: { message: 'Could not update profile.' } }
  }
  return { error: null }
}

/**
 * Subscribes to Supabase auth state changes (sign-in, token refresh,
 * sign-out). Returns an unsubscribe function. No-op in demo mode.
 */
export function subscribeToAuthChanges(callback) {
  if (!supabase) return () => {}

  const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
    const normalized = normalizeSupabaseSession(session)
    if (normalized?.id) {
      const active = await checkIsActive(normalized.id)
      if (!active) {
        await supabase.auth.signOut()
        callback(null)
        return
      }
    }
    callback(normalized)
  })
  return () => data.subscription.unsubscribe()
}