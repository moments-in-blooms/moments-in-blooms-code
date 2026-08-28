import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  getSession,
  getSupabaseSession,
  signIn as signInService,
  signOut as signOutService,
  subscribeToAuthChanges,
} from '../services/auth.js'
import { isSupabaseConfigured } from '../services/supabaseClient.js'
import { AuthContext } from './AuthContext.jsx'

function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getSession())

  useEffect(() => {
    if (!isSupabaseConfigured()) return undefined

    let mounted = true
    getSupabaseSession().then(({ session: nextSession }) => {
      if (mounted) setSession(nextSession)
    })

    const unsubscribe = subscribeToAuthChanges((nextSession) => {
      if (mounted) setSession(nextSession)
    })

    return () => {
      mounted = false
      unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email, password) => {
    const result = await signInService(email, password)
    if (result.session) {
      setSession(result.session)
    }
    return result
  }, [])

  const signOut = useCallback(async () => {
    const result = await signOutService()
    if (!result.error) {
      setSession(null)
    }
    return result
  }, [])

  const value = useMemo(
    () => ({ session, signIn, signOut }),
    [session, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider