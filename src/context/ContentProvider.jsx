import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  dropStoredPages,
  getSeedContent,
  getStoredContent,
  resetPageContent,
  savePageContent,
} from '../services/content.js'
import {
  SUPABASE_CONTENT_PAGES,
  fetchPageContent,
  hasValues,
  isSupabaseContentPage,
  resetPageContentRemote,
  savePageContentRemote,
  subscribeToPageContent,
} from '../services/pageContent.js'
import { isSupabaseConfigured } from '../services/supabaseClient.js'
import { ContentContext } from './ContentContext.jsx'

const cloneValues = (value) => JSON.parse(JSON.stringify(value))

function ContentProvider({ children }) {
  const [stored, setStored] = useState(() => {
    if (isSupabaseConfigured()) {
      // Remote-backed pages are authoritative from Supabase. Drop any
      // demo-mode leftovers in localStorage so a stale entry can never
      // shadow the seed/remote value before the first fetch settles.
      dropStoredPages(SUPABASE_CONTENT_PAGES)
    }
    return getStoredContent()
  })
  const [dirtyPages, setDirtyPages] = useState(() => new Set())
  const [loadingPages, setLoadingPages] = useState(() => {
    if (!isSupabaseConfigured()) return new Set()
    return new Set(SUPABASE_CONTENT_PAGES)
  })

  // Synchronous mirrors of the state values. `savePage` runs async and must
  // read the freshest full page blob (including the edit that was applied in the
  // same event tick) without waiting for a state flush — so every write goes
  // through `commit` / `markDirty`, which update the ref first, then the state.
  const storedRef = useRef(stored)
  const dirtyPagesRef = useRef(dirtyPages)
  const loadingPagesRef = useRef(loadingPages)
  // Pages saved locally since mount. A slow initial fetch must never commit
  // pre-save remote content over them, or the editor would revert.
  const savedSinceMountRef = useRef(new Set())

  const commit = useCallback((nextStored) => {
    storedRef.current = nextStored
    setStored(nextStored)
  }, [])

  const markDirty = useCallback((pageKey, dirty) => {
    const next = new Set(dirtyPagesRef.current)
    if (dirty) {
      next.add(pageKey)
    } else {
      next.delete(pageKey)
    }
    dirtyPagesRef.current = next
    setDirtyPages(next)
  }, [])

  const markLoading = useCallback((pageKey, isLoading) => {
    const next = new Set(loadingPagesRef.current)
    if (isLoading) {
      next.add(pageKey)
    } else {
      next.delete(pageKey)
    }
    loadingPagesRef.current = next
    setLoadingPages(next)
  }, [])

  // Re-fetch every Supabase-backed page with the same save guards as the
  // initial load: settled edits (dirty) and pages saved since mount are
  // never overwritten by an upstream read.
  const refreshRemotePages = useCallback(
    async (isCancelled = () => false) => {
      const pilotKeys = [...SUPABASE_CONTENT_PAGES]
      // Ensure loading state is correct if the set changed since initial state.
      pilotKeys.forEach((key) => {
        if (!loadingPagesRef.current.has(key)) markLoading(key, true)
      })
      const results = await Promise.all(
        pilotKeys.map((pageKey) =>
          fetchPageContent(pageKey).then(
            (result) => ({ pageKey, data: result.data, error: result.error }),
            () => ({ pageKey, data: null, error: { message: 'fetch failed' } }),
          ),
        ),
      )
      if (isCancelled()) return
      results.forEach(({ pageKey, data, error }) => {
        if (error || !hasValues(data?.values)) {
          markLoading(pageKey, false)
          return
        }
        if (dirtyPagesRef.current.has(pageKey) || savedSinceMountRef.current.has(pageKey)) {
          markLoading(pageKey, false)
          return
        }
        commit({
          ...storedRef.current,
          [pageKey]: { values: data.values, savedAt: data.savedAt },
        })
        markLoading(pageKey, false)
      })
    },
    [commit, markLoading],
  )

  // On mount, overlay any Supabase-backed (pilot) page on top of the seed/local
  // state so public visitors and the admin both see the live saved content.
  // Fetches run in parallel and each page settles independently; errors fall
  // back to seed (public) — never clobber a page the admin started editing.
  useEffect(() => {
    if (!isSupabaseConfigured()) return undefined
    let cancelled = false
    void refreshRemotePages(() => cancelled)
    return () => {
      cancelled = true
    }
  }, [refreshRemotePages])

  // Realtime misses happen (offline tabs, blocked sockets, unpublished
  // migrations): when a visitor returns to the tab, re-fetch so the public
  // site catches up without a manual refresh.
  useEffect(() => {
    if (!isSupabaseConfigured()) return undefined
    const resync = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return
      void refreshRemotePages()
    }
    document.addEventListener('visibilitychange', resync)
    window.addEventListener('focus', resync)
    return () => {
      document.removeEventListener('visibilitychange', resync)
      window.removeEventListener('focus', resync)
    }
  }, [refreshRemotePages])

  // Realtime: keep all 7 pages in sync across tabs/devices without refresh.
  // Supabase Realtime pushes INSERT/UPDATE/DELETE on page_content to every client.
  useEffect(() => {
    if (!isSupabaseConfigured()) return undefined
    const unsubscribe = subscribeToPageContent(({ pageKey, values, savedAt, deleted }) => {
      if (dirtyPagesRef.current.has(pageKey)) return
      if (deleted || !hasValues(values)) {
        const next = { ...storedRef.current }
        delete next[pageKey]
        commit(next)
        markLoading(pageKey, false)
        return
      }
      commit({
        ...storedRef.current,
        [pageKey]: { values, savedAt },
      })
      markLoading(pageKey, false)
    })
    return unsubscribe
  }, [commit, markLoading])

  // Demo mode fallback: without Supabase there is no realtime channel, so
  // localStorage writes from another tab (admin in one tab, public site in
  // another) arrive as `storage` events instead. Adopt them with the same
  // never-clobber-dirty-drafts guard as the realtime path — no refresh
  // required to see another tab's saves.
  useEffect(() => {
    if (isSupabaseConfigured()) return undefined
    const adoptStoredContent = () => {
      const fresh = getStoredContent()
      const next = { ...storedRef.current }
      let changed = false
      for (const [pageKey, entry] of Object.entries(fresh)) {
        if (dirtyPagesRef.current.has(pageKey)) continue
        if (
          JSON.stringify(storedRef.current[pageKey] ?? null) ===
          JSON.stringify(entry ?? null)
        ) {
          continue
        }
        next[pageKey] = entry
        changed = true
      }
      for (const pageKey of Object.keys(storedRef.current)) {
        if (pageKey in fresh || dirtyPagesRef.current.has(pageKey)) continue
        delete next[pageKey]
        changed = true
      }
      if (changed) commit(next)
    }
    window.addEventListener('storage', adoptStoredContent)
    return () => window.removeEventListener('storage', adoptStoredContent)
  }, [commit])

  const updatePage = useCallback(
    (pageKey, updater) => {
      const prev = storedRef.current
      const current = prev[pageKey]?.values ?? getSeedContent(pageKey)
      const nextValues =
        typeof updater === 'function'
          ? updater(cloneValues(current))
          : cloneValues(updater)
      commit({ ...prev, [pageKey]: { ...prev[pageKey], values: nextValues } })
      markDirty(pageKey, true)
    },
    [commit, markDirty],
  )

  const savePage = useCallback(
    async (pageKey) => {
      // Start from the seed when the page never loaded (fetch still pending
      // or failed) — persisting `{}` would blank the public page for every
      // visitor until the next save.
      const values = storedRef.current[pageKey]?.values ?? cloneValues(getSeedContent(pageKey))

      let entry
      if (isSupabaseContentPage(pageKey)) {
        const { data, error } = await savePageContentRemote(pageKey, values)
        if (error) {
          // Keep the page dirty so the editor can retry; surface the message.
          return { error }
        }
        entry = data
      } else {
        entry = savePageContent(pageKey, values)
      }

      savedSinceMountRef.current.add(pageKey)
      commit({ ...storedRef.current, [pageKey]: entry })
      markDirty(pageKey, false)
      return { error: null }
    },
    [commit, markDirty],
  )

  const resetPage = useCallback(
    async (pageKey) => {
      if (isSupabaseContentPage(pageKey)) {
        const { error } = await resetPageContentRemote(pageKey)
        if (error) {
          return { error }
        }
      } else {
        resetPageContent(pageKey)
      }

      const next = { ...storedRef.current }
      delete next[pageKey]
      commit(next)
      markDirty(pageKey, false)
      return { error: null }
    },
    [commit, markDirty],
  )

  const value = useMemo(
    () => ({ stored, dirtyPages, loadingPages, updatePage, savePage, resetPage }),
    [stored, dirtyPages, loadingPages, updatePage, savePage, resetPage],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export default ContentProvider
