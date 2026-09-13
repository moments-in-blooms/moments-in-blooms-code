// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ContentProvider from '../../../context/ContentProvider.jsx'
import theme from '../../../styles/theme.js'
import ItemsPage from './ItemsPage.jsx'

// Demo mode: useContent('services') falls back to the seed catalog, whose
// first category is Decor Hire and which holds the Luxe Photobooth packages.
vi.mock('../../../services/supabaseClient.js', () => ({
  isSupabaseConfigured: () => false,
  supabase: null,
  publicSupabase: null,
}))

const renderItems = (entry) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[entry]}>
        <ContentProvider>
          <Routes>
            <Route path="/admin/services/items" element={<ItemsPage />} />
          </Routes>
        </ContentProvider>
      </MemoryRouter>
    </ThemeProvider>,
  )

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  cleanup()
})

describe('ItemsPage category context', () => {
  it('opens the category from the URL instead of defaulting to the first one', () => {
    renderItems('/admin/services/items?category=luxe-photobooth')

    const luxeTab = screen.getByRole('tab', { name: /Luxe Photobooth/ })
    expect(luxeTab.getAttribute('aria-selected')).toBe('true')
    const decorTab = screen.getByRole('tab', { name: /Decor Hire/ })
    expect(decorTab.getAttribute('aria-selected')).toBe('false')
  })

  it('defaults to the first category when the URL carries no context', () => {
    renderItems('/admin/services/items')

    const decorTab = screen.getByRole('tab', { name: /Decor Hire/ })
    expect(decorTab.getAttribute('aria-selected')).toBe('true')
  })

  it('carries the list category on item card links so Back returns here', () => {
    renderItems('/admin/services/items?category=luxe-photobooth')

    const cardLink = document.querySelector('a[href*="signature-package"]')
    expect(cardLink).not.toBeNull()
    expect(cardLink.getAttribute('href')).toContain('category=luxe-photobooth')
  })
})
