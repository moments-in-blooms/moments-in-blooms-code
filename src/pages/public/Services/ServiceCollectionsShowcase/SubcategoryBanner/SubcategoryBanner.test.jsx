// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import theme from '../../../../../styles/theme.js'
import SubcategoryBanner from './SubcategoryBanner.jsx'

afterEach(() => {
  cleanup()
})

// framer-motion `useInView` needs IntersectionObserver, which jsdom lacks.
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

const renderBanner = (props) =>
  render(
    <ThemeProvider theme={theme}>
      <SubcategoryBanner {...props} />
    </ThemeProvider>,
  )

const bannerProps = {
  eyebrow: 'Collection',
  title: 'Luxe Mirror Booth',
  subtitle: 'Interactive mirror',
  description: 'Our flagship mirror experience',
  priceFrom: '$600',
  image: { src: 'https://example.com/mirror.jpg', alt: 'Mirror booth' },
}

describe('SubcategoryBanner', () => {
  it('renders the subcategory image with its alt', () => {
    renderBanner(bannerProps)

    const image = screen.getByRole('img')
    expect(image.getAttribute('src')).toBe('https://example.com/mirror.jpg')
    expect(image.getAttribute('alt')).toBe('Mirror booth')
  })

  it('renders the subcategory copy over the banner', () => {
    renderBanner(bannerProps)

    expect(screen.getByText('Collection')).not.toBeNull()
    expect(screen.getByText('Luxe Mirror Booth')).not.toBeNull()
    expect(screen.getByText('Interactive mirror')).not.toBeNull()
    expect(screen.getByText('Our flagship mirror experience')).not.toBeNull()
    expect(screen.getByText('Price starts at $600')).not.toBeNull()
  })

  it('falls back to a text panel when there is no image', () => {
    renderBanner({ title: 'Decor Hire', description: 'Curated pieces', image: null })

    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.getByText('Decor Hire')).not.toBeNull()
    expect(screen.getByText('Curated pieces')).not.toBeNull()
  })

  it('accepts a string image and custom price label', () => {
    renderBanner({
      title: 'Studio Booth',
      priceFrom: '$850',
      priceLabel: 'From',
      image: 'https://example.com/studio.jpg',
    })

    const image = screen.getByRole('img')
    expect(image.getAttribute('src')).toBe('https://example.com/studio.jpg')
    expect(screen.getByText('From $850')).not.toBeNull()
  })

  it('renders nothing but the frame when all copy is missing', () => {
    const { container } = renderBanner({ title: '', image: 'https://example.com/empty.jpg' })

    expect(container.querySelector('img')).not.toBeNull()
  })

  it('renders nothing when there is no image and no copy', () => {
    const { container } = renderBanner({ title: '' })

    expect(container.querySelector('img')).toBeNull()
    expect(container.firstChild).toBeNull()
  })
})