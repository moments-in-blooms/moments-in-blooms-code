// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import {
  Outlet,
  RouterProvider,
  createMemoryRouter,
  useNavigate,
} from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ScrollRestore from './ScrollRestore.jsx'

// jsdom has no real scrolling: window.scrollY stays 0 and the document has
// no height, so both are stubbed to model a scrolled, scrollable page.
let fakeScrollY = 0
const scrollToCalls = []

const stubScrolling = () => {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    get: () => fakeScrollY,
  })
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 })
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    configurable: true,
    get: () => 2000,
  })
  vi.spyOn(window, 'scrollTo').mockImplementation((options) => {
    if (options && typeof options === 'object' && typeof options.top === 'number') {
      scrollToCalls.push(options.top)
      // Model the browser: a programmatic scroll moves scrollY and fires scroll.
      fakeScrollY = options.top
      window.dispatchEvent(new Event('scroll'))
    }
  })
  // Synchronous rAF: the restore waits for the document to be tall enough
  // via requestAnimationFrame, which must settle inside the test's act().
  window.requestAnimationFrame = (callback) => {
    callback(Date.now())
    return 0
  }
  window.cancelAnimationFrame = () => {}
}

const scrollPageTo = (top) => {
  fakeScrollY = top
  window.dispatchEvent(new Event('scroll'))
}

function ListPage({ to }) {
  const navigate = useNavigate()
  return (
    <button type="button" onClick={() => navigate(to)}>
      Open item
    </button>
  )
}

function DetailPage({ to }) {
  const navigate = useNavigate()
  return (
    <button type="button" onClick={() => navigate(to)}>
      Cancel
    </button>
  )
}

function AdminShell() {
  return (
    <>
      <ScrollRestore />
      <Outlet />
    </>
  )
}

// Unique pathnames per test: scroll memory is module-level and shared.
const makeRouter = (basePath, detailPath, initialPath = basePath) =>
  createMemoryRouter(
    [
      {
        element: <AdminShell />,
        children: [
          { path: basePath, element: <ListPage to={detailPath} /> },
          { path: detailPath, element: <DetailPage to={basePath} /> },
        ],
      },
    ],
    { initialEntries: [initialPath] },
  )

beforeEach(() => {
  fakeScrollY = 0
  scrollToCalls.length = 0
  stubScrolling()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('ScrollRestore admin back-navigation', () => {
  it('restores the list position after the layout remounted on the way in', async () => {
    const basePath = '/admin/homepage'
    const detailPath = '/admin/homepage/hero'
    const router = makeRouter(basePath, detailPath)
    const { unmount } = render(<RouterProvider router={router} />)
    expect(screen.getByText('Open item')).not.toBeNull()

    scrollPageTo(450)

    // First visit to a lazy chunk: the AppShell Suspense fallback unmounts
    // the layout before any pathname effect could record the leaving page,
    // then the layout remounts on the detail route.
    unmount()
    await act(async () => {
      await router.navigate(detailPath)
    })
    render(<RouterProvider router={router} />)
    expect(screen.getByText('Cancel')).not.toBeNull()

    await act(async () => {
      fireEvent.click(screen.getByText('Cancel'))
    })

    expect(scrollToCalls.at(-1)).toBe(450)
  })

  it('restores the list position when the layout stays mounted', async () => {
    const basePath = '/admin/about'
    const detailPath = '/admin/about/story'
    const router = makeRouter(basePath, detailPath)
    render(<RouterProvider router={router} />)

    scrollPageTo(450)
    await act(async () => {
      fireEvent.click(screen.getByText('Open item'))
    })
    await act(async () => {
      fireEvent.click(screen.getByText('Cancel'))
    })

    expect(scrollToCalls.at(-1)).toBe(450)
  })

  it('starts a first-visit page at the top', async () => {
    const basePath = '/admin/gallery'
    const detailPath = '/admin/gallery/items'
    const router = makeRouter(basePath, detailPath)
    render(<RouterProvider router={router} />)

    scrollPageTo(450)
    await act(async () => {
      fireEvent.click(screen.getByText('Open item'))
    })

    expect(scrollToCalls.at(-1)).toBe(0)
  })
})
