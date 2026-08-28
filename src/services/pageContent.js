import {
  getStoredContent,
  resetPageContent,
  savePageContent,
} from './content.js'
import { isSupabaseConfigured, publicSupabase, supabase } from './supabaseClient.js'

/**
 * Page content service — persists the CMS page editors to Supabase so admin
 * edits go live for every public visitor.
 *
 *   Public: anon session-less client (publicSupabase), read-only.
 *   Admin:  session client (supabase), full CRUD (authenticated RLS).
 *
 * Storage shape mirrors the existing local store (src/services/content.js):
 * one row per page key, `content` holding the whole page's values object as a
 * JSON blob. The public page renders `getSeedContent(pageKey)` by default and
 * this service overlays the saved blob on top when a row exists.
 *
 * PILOT GATE — only pages in `SUPABASE_CONTENT_PAGES` use Supabase; every other
 * page keeps the localStorage behaviour untouched (see ContentProvider). Roll
 * out by adding page keys to the set — no schema or service change required.
 *
 * When Supabase is not configured (.env missing) every call falls back to the
 * localStorage store, so the admin → public flow keeps working in demo mode
 * exactly as before.
 */

/** Page keys that read/write Supabase. Everything else stays on localStorage. */
export const SUPABASE_CONTENT_PAGES = new Set([
  'homepage',
  'about',
  'services',
  'contact',
  'gallery',
  'seo',
  'settings',
])

export const isSupabaseContentPage = (pageKey) =>
  SUPABASE_CONTENT_PAGES.has(pageKey)

const FETCH_ERROR_MESSAGE = "We couldn't load the latest content. Please try again."
const SAVE_ERROR_MESSAGE = "We couldn't save your changes. Please try again."
const DELETE_ERROR_MESSAGE = "We couldn't reset this content. Please try again."

const hasValues = (values) =>
  Boolean(values) && typeof values === 'object' && Object.keys(values).length > 0

/**
 * Read one page's saved content. Returns `{ data, error }` where `data` is
 * `{ values, savedAt }` when a saved row exists, or `null` when the page has
 * never been saved (the caller then falls back to the seed constants).
 */
export async function fetchPageContent(pageKey) {
  if (!isSupabaseConfigured()) {
    const entry = getStoredContent()[pageKey]
    return {
      data: entry ? { values: entry.values, savedAt: entry.savedAt ?? null } : null,
      error: null,
    }
  }

  const result = await publicSupabase
    .from('page_content')
    .select('content, updated_at')
    .eq('page_key', pageKey)
    .maybeSingle()

  if (result.error) {
    console.error('[pageContent] fetch failed', result.error)
    return { data: null, error: { message: FETCH_ERROR_MESSAGE } }
  }

  const row = result.data
  return {
    data: row ? { values: row.content, savedAt: row.updated_at } : null,
    error: null,
  }
}

/**
 * Upsert one page's content blob. Returns `{ data: { values, savedAt }, error }`
 * so the caller can reflect the server's `updated_at` as the saved timestamp.
 */
export async function savePageContentRemote(pageKey, values) {
  if (!isSupabaseConfigured()) {
    const entry = savePageContent(pageKey, values)
    return { data: entry, error: null }
  }

  const result = await supabase
    .from('page_content')
    .upsert({ page_key: pageKey, content: values }, { onConflict: 'page_key' })
    .select('content, updated_at')
    .single()

  if (result.error) {
    console.error('[pageContent] save failed', result.error)
    return { data: null, error: { message: SAVE_ERROR_MESSAGE } }
  }

  return {
    data: { values: result.data.content, savedAt: result.data.updated_at },
    error: null,
  }
}

/** Delete one page's saved content, reverting the public site to seed content. */
export async function resetPageContentRemote(pageKey) {
  if (!isSupabaseConfigured()) {
    resetPageContent(pageKey)
    return { error: null }
  }

  const result = await supabase
    .from('page_content')
    .delete()
    .eq('page_key', pageKey)

  if (result.error) {
    console.error('[pageContent] reset failed', result.error)
    return { error: { message: DELETE_ERROR_MESSAGE } }
  }

  return { error: null }
}

export function subscribeToPageContent(onChange) {
  if (!isSupabaseConfigured() || !publicSupabase) return () => {}
  const channel = publicSupabase
    .channel('page-content-all')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'page_content' },
      (payload) => {
        if (payload.eventType === 'DELETE') {
          const oldKey = payload.old?.page_key
          if (!oldKey || !SUPABASE_CONTENT_PAGES.has(oldKey)) return
          onChange({ pageKey: oldKey, values: null, savedAt: null, deleted: true })
          return
        }
        const row = payload.new
        if (!row?.page_key || !SUPABASE_CONTENT_PAGES.has(row.page_key)) return
        onChange({ pageKey: row.page_key, values: row.content, savedAt: row.updated_at })
      },
    )
    .subscribe()
  return () => {
    publicSupabase.removeChannel(channel)
  }
}

export { hasValues }
