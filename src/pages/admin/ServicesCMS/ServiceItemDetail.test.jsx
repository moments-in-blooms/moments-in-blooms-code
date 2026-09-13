// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react'
import { Outlet, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ContentProvider from '../../../context/ContentProvider.jsx'
import theme from '../../../styles/theme.js'
import ItemsPage from './ItemsPage.jsx'
import ServiceItemDetail from './ServiceItemDetail.jsx'

// Demo mode: useContent('services') falls back to the seed catalog, whose
// Luxe Photobooth category holds the signature-package item.
vi.mock('../../../services/supabaseClient.js', () => ({
  isSupabaseConfigured: () => false,
  supabase: null,
  publicSupabase: null,
}))

function Shell() {
  return (
    <ThemeProvider theme={theme}>
      <ContentProvider>
        <Outlet />
      </ContentProvider>
    </ThemeProvider>
  )
}

// useBlocker (the unsaved-changes guard) needs a data router.
const makeRouter = (entry) =>
  createMemoryRouter(
    [
      {
        element: <Shell />,
        children: [
          { path: '/admin/services/items', element: <ItemsPage /> },
          { path: '/admin/services/items/:itemId', element: <ServiceItemDetail /> },
        ],
      },
    ],
    { initialEntries: [entry] },
  )

const renderAt = (entry) => render(<RouterProvider router={makeRouter(entry)} />)

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  cleanup()
})

describe('ServiceItemDetail back navigation', () => {
  it('points Back to Items at the category the item belongs to', () => {
    renderAt('/admin/services/items/signature-package')

    const backLink = screen.getByRole('link', { name: /Back to Items/ })
    expect(backLink.getAttribute('href')).toContain('category=luxe-photobooth')
  })

  it('reopens the Luxe Photobooth tab when Cancel is clicked', async () => {
    renderAt('/admin/services/items/signature-package')

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    })

    const luxeTab = screen.getByRole('tab', { name: /Luxe Photobooth/ })
    expect(luxeTab.getAttribute('aria-selected')).toBe('true')
  })
})
