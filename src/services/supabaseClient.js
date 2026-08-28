import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

/**
 * Session-less client for PUBLIC operations (the contact form insert).
 * A real admin sign-in would otherwise attach a JWT to the form's request,
 * running it as `authenticated` — which has no INSERT policy on enquiries.
 * persistSession: false keeps it anon forever; no service_role anywhere.
 */
export const publicSupabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        storageKey: 'mib-public-auth',
      },
    })
  : null

export const isSupabaseConfigured = () => isConfigured