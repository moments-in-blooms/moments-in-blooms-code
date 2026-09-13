// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import theme from '../../../../styles/theme.js'
import TrustedBy from './TrustedBy.jsx'

afterEach(() => {
  cleanup()
})

// framer-motion `whileInView` needs IntersectionObserver, which jsdom lacks.
beforeAll(() => {
  if (typeof window.IntersectionObserver === 'undefined') {
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    vi.stubGlobal('IntersectionObserver', window.IntersectionObserver)
  }
})

const renderTrustedBy = (marks, content) =>
  render(
    <ThemeProvider theme={theme}>
      <TrustedBy marks={marks} content={content} />
    </ThemeProvider>,
  )

describe('TrustedBy', () => {
  it('renders each trust mark', () => {
    renderTrustedBy(['Weddings', 'Birthdays'])

    expect(screen.queryByText('Weddings')).not.toBeNull()
    expect(screen.queryByText('Birthdays')).not.toBeNull()
  })

  it('renders the statement without crashing when marks are missing', () => {
    renderTrustedBy(undefined)

    expect(screen.queryByText(/Trusted by beautiful celebrations/)).not.toBeNull()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('renders CMS-provided heading copy', () => {
    renderTrustedBy(['Weddings'], {
      eyebrow: 'Loved by Melbourne',
      statementLead: 'We believe every party deserves',
      statementRest: 'a little sparkle.',
    })

    expect(screen.queryByText('Loved by Melbourne')).not.toBeNull()
    expect(screen.queryByText('We believe every party deserves')).not.toBeNull()
    expect(screen.queryByText('a little sparkle.')).not.toBeNull()
    expect(screen.queryByText(/Trusted by beautiful celebrations/)).toBeNull()
  })
})
