import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
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
  const [stored, setStored] = useState(() => getStoredContent())
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

  // On mount, overlay any Supabase-backed (pilot) page on top of the seed/local
  // state so public visitors and the admin both see the live saved content.
  // Fetches run in parallel and each page settles independently; errors fall
  // back to seed (public) — never clobber a page the admin started editing.
  useEffect(() => {
    if (!isSupabaseConfigured()) return undefined
    let cancelled = false
    const pilotKeys = [...SUPABASE_CONTENT_PAGES]
    // Ensure loading state is correct if the set changed since initial state.
    pilotKeys.forEach((key) => {
      if (!loadingPagesRef.current.has(key)) markLoading(key, true)
    })
    Promise.all(
      pilotKeys.map(async (pageKey) => {
        const { data, error } = await fetchPageContent(pageKey)
        if (cancelled) return
        if (error || !hasValues(data?.values)) {
          markLoading(pageKey, false)
          return
        }
        if (dirtyPagesRef.current.has(pageKey)) {
          markLoading(pageKey, false)
          return
        }
        commit({
          ...storedRef.current,
          [pageKey]: { values: data.values, savedAt: data.savedAt },
        })
        markLoading(pageKey, false)
      }),
    )
    return () => {
      cancelled = true
    }
  }, [commit, markLoading])

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
      const values = storedRef.current[pageKey]?.values ?? {}

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
