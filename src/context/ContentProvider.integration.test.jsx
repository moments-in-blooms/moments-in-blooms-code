// @vitest-environment jsdom
import { act, render } from '@testing-library/react'
import { useEffect } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useContent } from '../hooks/useContent.js'
import { useContentDetail } from '../hooks/useContentDetail.js'
import { getSeedContent, savePageContent } from '../services/content.js'
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
  isSupabaseConfigured: () => supabaseConfigured,
  supabase: null,
  publicSupabase: null,
}))

let supabaseConfigured = true

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
  supabaseConfigured = true
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

  it('saves seed values instead of an empty blob when the page never loaded', async () => {
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

    // No edit happened first, so the store has no entry for the page. The
    // save must fall back to the seed — never persist `{}` over the row.
    let result
    await act(async () => {
      result = await api.content.save()
    })
    expect(result.error).toBeNull()
    expect(savePageContentRemote).toHaveBeenCalledWith(
      'homepage',
      expect.objectContaining({
        hero: expect.objectContaining({ sideNote: DEFAULT_SIDE_NOTE }),
        trustMarks: expect.any(Array),
      }),
    )
    expect(api.content.values.trustMarks.length).toBeGreaterThan(0)
  })
})

describe('ContentProvider demo-mode cross-tab sync', () => {
  it('adopts another tab’s localStorage write without a refresh', async () => {
    supabaseConfigured = false

    let api
    render(
      <ContentProvider>
        <Harness onApi={(a) => { api = a }} />
      </ContentProvider>,
    )
    await act(async () => {
      await flush()
    })
    expect(api.content.values.trustMarks.length).toBeGreaterThan(0)

    // Another tab (e.g. the admin) saves new marks; jsdom does not fire
    // `storage` events for setItem, so dispatch the event the browser would.
    act(() => {
      savePageContent('homepage', {
        ...getSeedContent('homepage'),
        trustMarks: ['Rooftop dinners', 'Garden parties'],
      })
      window.dispatchEvent(new StorageEvent('storage', { key: 'mib_admin_content_v1' }))
    })

    expect(api.content.values.trustMarks).toEqual(['Rooftop dinners', 'Garden parties'])
  })

  it('ignores another tab’s write while this tab has unsaved edits', async () => {
    supabaseConfigured = false

    let api
    render(
      <ContentProvider>
        <Harness onApi={(a) => { api = a }} />
      </ContentProvider>,
    )
    await act(async () => {
      await flush()
    })
    act(() => {
      api.content.update((current) => ({
        ...current,
        hero: { ...current.hero, sideNote: 'Local edit' },
      }))
    })
    expect(api.content.dirty).toBe(true)

    act(() => {
      savePageContent('homepage', {
        ...getSeedContent('homepage'),
        trustMarks: ['Rooftop dinners'],
      })
      window.dispatchEvent(new StorageEvent('storage', { key: 'mib_admin_content_v1' }))
    })

    expect(api.content.values.hero.sideNote).toBe('Local edit')
    expect(api.content.values.trustMarks).not.toEqual(['Rooftop dinners'])
  })
})

describe('ContentProvider focus re-sync', () => {
  it('re-syncs a page when the tab regains focus after another session saved', async () => {
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
    const seedMarkCount = api.content.values.trustMarks.length
    expect(seedMarkCount).toBeGreaterThan(0)

    // The realtime event was missed (offline, blocked socket); when the
    // visitor returns to the tab the provider re-fetches and catches up.
    fetchPageContent.mockImplementation((pageKey) =>
      pageKey === 'homepage'
        ? Promise.resolve({
            data: {
              values: { ...getSeedContent('homepage'), trustMarks: ['Evening soirees'] },
              savedAt: '2026-09-12T00:00:00.000Z',
            },
            error: null,
          })
        : Promise.resolve({ data: null, error: null }),
    )
    await act(async () => {
      window.dispatchEvent(new Event('focus'))
      await flush()
    })

    expect(api.content.values.trustMarks).toEqual(['Evening soirees'])
  })

  it('does not clobber unsaved edits when the tab regains focus', async () => {
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
    act(() => {
      api.content.update((current) => ({
        ...current,
        hero: { ...current.hero, sideNote: 'Local edit' },
      }))
    })
    expect(api.content.dirty).toBe(true)

    fetchPageContent.mockImplementation((pageKey) =>
      pageKey === 'homepage'
        ? Promise.resolve({
            data: {
              values: { ...getSeedContent('homepage'), trustMarks: ['Evening soirees'] },
              savedAt: '2026-09-12T00:00:00.000Z',
            },
            error: null,
          })
        : Promise.resolve({ data: null, error: null }),
    )
    await act(async () => {
      window.dispatchEvent(new Event('focus'))
      await flush()
    })

    expect(api.content.values.hero.sideNote).toBe('Local edit')
    expect(api.content.values.trustMarks).not.toEqual(['Evening soirees'])
  })
})
