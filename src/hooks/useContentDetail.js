import { useEffect, useMemo, useRef, useState } from 'react'
import { useContent } from './useContent.js'
import { deleteImage, isStorageUrl } from '../services/storage.js'

const clone = (value) =>
  value == null ? null : JSON.parse(JSON.stringify(value))

/**
 * Draft-first editing for a single slice of a content page.
 *
 * Pass `sectionKey` to edit an object section (e.g. `hero`), or `listKey` +
 * `itemId` to edit one item inside a list section. When `itemId` is `"new"`
 * the draft starts from `initialValue` and saving appends it to the list.
 *
 * Edits stay local (`draft`) until `saveDraft` is called, which pushes the
 * change into the shared content store and persists it.
 */
function useContentDetail(pageKey, { sectionKey, listKey, itemId, initialValue }) {
  const { values, savedAt, update, save } = useContent(pageKey)

  const item = useMemo(() => {
    if (listKey) {
      const items = values[listKey] ?? []
      return items.find((entry) => String(entry.id) === String(itemId))
    }
    return values[sectionKey]
  }, [values, listKey, sectionKey, itemId])

  const creating = Boolean(listKey && itemId === 'new')
  const exists = Boolean(creating || item)

  const [draft, setDraft] = useState(() =>
    clone(creating ? initialValue : item ?? null),
  )
  const [dirty, setDirty] = useState(false)
  const syncedRef = useRef({ item, initialValue })

  useEffect(() => {
    const previous = syncedRef.current
    if (previous.item !== item || previous.initialValue !== initialValue) {
      syncedRef.current = { item, initialValue }
      setDraft(clone(creating ? initialValue : item ?? null))
      setDirty(false)
    }
  }, [item, initialValue, creating])

  const patch = (updater) => {
    setDraft((current) =>
      typeof updater === 'function' ? updater(current) : updater,
    )
    setDirty(true)
  }

  const collectStorageUrls = (value, acc = new Set()) => {
    if (!value) return acc
    if (typeof value === 'string') {
      if (isStorageUrl(value)) acc.add(value)
      return acc
    }
    if (Array.isArray(value)) {
      value.forEach((entry) => collectStorageUrls(entry, acc))
      return acc
    }
    if (typeof value === 'object') {
      Object.values(value).forEach((entry) => collectStorageUrls(entry, acc))
    }
    return acc
  }

  const persist = (nextValue) => {
    update((current) => {
      if (listKey) {
        return { ...current, [listKey]: nextValue }
      }
      return { ...current, [sectionKey]: nextValue }
    })
    return save()
  }

  const cleanupStorage = (oldValue, newValue) => {
    const oldUrls = collectStorageUrls(oldValue)
    const newUrls = collectStorageUrls(newValue)
    oldUrls.forEach((url) => {
      if (!newUrls.has(url)) {
        deleteImage(url).catch(() => {})
      }
    })
  }

  const saveDraft = async (next = draft) => {
    let result
    let oldForCleanup
    let newForCleanup
    if (listKey) {
      const items = values[listKey] ?? []
      const existsInList = items.some((entry) => String(entry.id) === String(next.id))
      const nextItems = existsInList
        ? items.map((entry) => (String(entry.id) === String(next.id) ? next : entry))
        : [...items, next]
      oldForCleanup = existsInList ? items.find((entry) => String(entry.id) === String(next.id)) : null
      newForCleanup = next
      result = await persist(nextItems)
    } else {
      oldForCleanup = values[sectionKey]
      newForCleanup = next
      result = await persist(next)
    }
    // Only settle the draft as "saved" when the write actually succeeded, so a
    // failed save keeps the page dirty and the editor can retry.
    if (!result?.error) {
      if (oldForCleanup && newForCleanup) {
        cleanupStorage(oldForCleanup, newForCleanup)
      }
      setDraft(clone(next))
      setDirty(false)
    }
    return { ok: !result?.error, message: result?.error?.message }
  }

  const discardDraft = () => {
    setDraft(clone(creating ? initialValue : item ?? null))
    setDirty(false)
  }

  const removeItem = async () => {
    if (!listKey || creating) return
    const oldItem = (values[listKey] ?? []).find((entry) => String(entry.id) === String(itemId))
    const result = await persist((values[listKey] ?? []).filter((entry) => String(entry.id) !== String(itemId)))
    if (!result?.error && oldItem) {
      const oldUrls = collectStorageUrls(oldItem)
      oldUrls.forEach((url) => deleteImage(url).catch(() => {}))
    }
    setDirty(false)
    return result
  }

  return {
    values,
    item,
    draft,
    dirty,
    savedAt,
    creating,
    exists,
    patch,
    saveDraft,
    discardDraft,
    removeItem,
  }
}

export default useContentDetail
export { useContentDetail }