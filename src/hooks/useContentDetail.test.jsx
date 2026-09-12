// @vitest-environment jsdom
import { act, render } from '@testing-library/react'
import { useEffect, useMemo, useState } from 'react'
import { describe, expect, it } from 'vitest'
import { ContentContext } from '../context/ContentContext.jsx'
import { useContentDetail } from './useContentDetail.js'

const clone = (value) => JSON.parse(JSON.stringify(value))

function StubProvider({ initialValues, children, registerPush }) {
  const [stored, setStored] = useState({ homepage: { values: initialValues, savedAt: null } })

  useEffect(() => {
    registerPush((values) =>
      setStored({ homepage: { values: clone(values), savedAt: 'upstream' } }),
    )
  }, [registerPush])

  const value = useMemo(
    () => ({
      stored,
      dirtyPages: new Set(),
      loadingPages: new Set(),
      updatePage: (pageKey, updater) =>
        setStored((prev) => {
          const current = prev[pageKey]?.values ?? {}
          const nextValues =
            typeof updater === 'function' ? updater(clone(current)) : clone(updater)
          return { ...prev, [pageKey]: { ...prev[pageKey], values: nextValues } }
        }),
      savePage: async () => ({ error: null }),
      resetPage: async () => ({ error: null }),
    }),
    [stored],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

function Harness({ onApi }) {
  const detail = useContentDetail('homepage', { sectionKey: 'hero' })
  useEffect(() => {
    onApi(detail)
  })
  return null
}

describe('useContentDetail', () => {
  it('keeps an unsaved draft when upstream values change', () => {
    let pushUpstream
    let api
    render(
      <StubProvider
        initialValues={{ hero: { title: 'T', sideNote: 'Old' } }}
        registerPush={(fn) => { pushUpstream = fn }}
      >
        <Harness onApi={(a) => { api = a }} />
      </StubProvider>,
    )

    expect(api.draft.sideNote).toBe('Old')

    act(() => {
      api.patch((prev) => ({ ...prev, sideNote: 'Typed' }))
    })
    expect(api.dirty).toBe(true)
    expect(api.draft.sideNote).toBe('Typed')

    // Upstream content changes (slow fetch settling, realtime event).
    act(() => {
      pushUpstream({ hero: { title: 'T', sideNote: 'Upstream' } })
    })

    expect(api.draft.sideNote).toBe('Typed')
    expect(api.dirty).toBe(true)
  })
})
