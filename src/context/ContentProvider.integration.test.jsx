// @vitest-environment jsdom
import { act, render } from '@testing-library/react'
import { useEffect } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useContent } from '../hooks/useContent.js'
import { useContentDetail } from '../hooks/useContentDetail.js'
import {
  fetchPageContent,
  savePageContentRemote,
  subscribeToPageContent,
} from '../services/pageContent.js'
import ContentProvider from './ContentProvider.jsx'

vi.mock('../services/pageContent.js', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    fetchPageContent: vi.fn(),
    savePageContentRemote: vi.fn(),
    subscribeToPageContent: vi.fn(),
  }
})

vi.mock('../services/supabaseClient.js', () => ({
  isSupabaseConfigured: () => true,
  supabase: null,
  publicSupabase: null,
}))

const clone = (value) => JSON.parse(JSON.stringify(value))
const flush = (ms = 30) => new Promise((resolve) => setTimeout(resolve, ms))

const DEFAULT_SIDE_NOTE = 'Floral design\nthoughtful details\njoyful gatherings'
const oldHomepage = () => ({
  hero: { eyebrow: 'E', title: 'T', description: 'D', sideNote: 'Old words' },
  services: [],
})

function Harness({ onApi }) {
  const content = useContent('homepage')
  const detail = useContentDetail('homepage', { sectionKey: 'hero' })
  useEffect(() => {
    onApi({ content, detail })
  })
  return null
}

beforeEach(() => {
  window.localStorage.clear()
  vi.clearAllMocks()
  subscribeToPageContent.mockReturnValue(() => {})
  savePageContentRemote.mockImplementation(async (pageKey, values) => ({
    data: { values: clone(values), savedAt: '2026-09-11T00:00:00.000Z' },
    error: null,
  }))
})

describe('ContentProvider homepage persistence', () => {
  it('keeps a saved hero when the initial fetch resolves late with stale content', async () => {
    let resolveFetch
    fetchPageContent.mockImplementation((pageKey) => {
      if (pageKey !== 'homepage') return Promise.resolve({ data: null, error: null })
      return new Promise((resolve) => {
        resolveFetch = () =>
          resolve({ data: { values: oldHomepage(), savedAt: '2020-01-01T00:00:00.000Z' }, error: null })
      })
    })

    let api
    render(
      <ContentProvider>
        <Harness onApi={(a) => { api = a }} />
      </ContentProvider>,
    )

    // Edit and save before the slow initial fetch resolves.
    act(() => {
      api.detail.patch((prev) => ({ ...prev, sideNote: 'New words' }))
    })
    expect(api.detail.dirty).toBe(true)

    await act(async () => {
      const result = await api.detail.saveDraft()
      expect(result.ok).toBe(true)
    })
    expect(api.content.values.hero.sideNote).toBe('New words')

    // The stale initial fetch now resolves.
    await act(async () => {
      resolveFetch()
      await flush()
    })

    expect(api.content.values.hero.sideNote).toBe('New words')
    expect(api.detail.draft.sideNote).toBe('New words')
  })

  it('ignores a stale localStorage homepage when no remote row exists', async () => {
    window.localStorage.setItem(
      'mib_admin_content_v1',
      JSON.stringify({
        homepage: {
          values: { hero: { title: 'T', sideNote: 'Stale words' } },
          savedAt: null,
        },
      }),
    )
    fetchPageContent.mockResolvedValue({ data: null, error: null })

    let api
    render(
      <ContentProvider>
        <Harness onApi={(a) => { api = a }} />
      </ContentProvider>,
    )
    await act(async () => {
      await flush()
    })

    expect(api.content.values.hero.sideNote).toBe(DEFAULT_SIDE_NOTE)
  })
})
