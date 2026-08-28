import { useContext } from 'react'
import { ContentContext } from '../context/ContentContext.jsx'
import { CONTENT_PAGE_KEYS, getSeedContent } from '../services/content.js'

function useContent(pageKey) {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }

  const entry = context.stored[pageKey]
  const values = entry?.values ?? getSeedContent(pageKey)
  const savedAt = entry?.savedAt ?? null
  const dirty = context.dirtyPages.has(pageKey)
  const loading = context.loadingPages?.has(pageKey) ?? false

  return {
    values,
    savedAt,
    dirty,
    loading,
    update: (updater) => context.updatePage(pageKey, updater),
    save: () => context.savePage(pageKey),
    reset: () => context.resetPage(pageKey),
  }
}

function useContentOverview() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContentOverview must be used within a ContentProvider')
  }

  return CONTENT_PAGE_KEYS.map((pageKey) => ({
    pageKey,
    savedAt: context.stored[pageKey]?.savedAt ?? null,
    dirty: context.dirtyPages.has(pageKey),
    loading: context.loadingPages?.has(pageKey) ?? false,
  }))
}

export { useContent, useContentOverview }