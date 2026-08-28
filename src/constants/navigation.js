import { NAVBAR_THEMES } from './ui.js'

export const publicNavigation = Object.freeze([
  { label: 'Home', path: '/', navbarTheme: NAVBAR_THEMES.LIGHT },
  { label: 'About', path: '/about', navbarTheme: NAVBAR_THEMES.LIGHT },
  { label: 'Services', path: '/services', navbarTheme: NAVBAR_THEMES.DARK },
  { label: 'Gallery', path: '/gallery', navbarTheme: NAVBAR_THEMES.DARK },
  { label: 'FAQs', path: '/faqs', navbarTheme: NAVBAR_THEMES.DARK },
  { label: 'Contact', path: '/contact', navbarTheme: NAVBAR_THEMES.DARK },
])

export const adminNavigationGroups = Object.freeze([
  {
    id: 'overview',
    label: 'Overview',
    items: [{ label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' }],
  },
  {
    id: 'content',
    label: 'Content',
    items: [
      { label: 'Homepage', path: '/admin/homepage', icon: 'homepage' },
      { label: 'About', path: '/admin/about', icon: 'about' },
      { label: 'Services', path: '/admin/services', icon: 'services' },
      { label: 'Gallery', path: '/admin/gallery', icon: 'gallery' },
      { label: 'FAQs', path: '/admin/faqs', icon: 'faqs' },
      { label: 'Contact', path: '/admin/contact', icon: 'contact' },
    ],
  },
  {
    id: 'business',
    label: 'Business',
    items: [{ label: 'Enquiries', path: '/admin/enquiries', icon: 'enquiries' }],
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { label: 'SEO', path: '/admin/seo', icon: 'seo' },
      { label: 'Settings', path: '/admin/settings', icon: 'settings' },
    ],
  },
])

export const footerNavigationGroups = Object.freeze([
  {
    title: 'Explore',
    links: [
      { label: 'About us', path: '/about' },
      { label: 'Our services', path: '/services' },
      { label: 'View gallery', path: '/gallery' },
      { label: 'Contact us', path: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Event styling', path: '/services' },
      { label: 'Floral design', path: '/services' },
      { label: 'Tablescapes', path: '/services' },
      { label: 'Private celebrations', path: '/services' },
    ],
  },
])

export const footerContact = Object.freeze({
  location: 'Melbourne, Australia',
  email: 'hello@momentsinblooms.com',
  phone: '+61 3 0000 0000',
})

export const footerSocialLinks = Object.freeze([
  {
    label: 'Instagram',
    href: 'https://ig.me/m/momentsinblooms',
  },
  {
    label: 'Facebook',
    href: 'https://m.me/61575145079420',
  },
])

export const routeMetadata = Object.freeze({
  public: {
    title: 'Moments in Blooms',
    description: 'Luxury event styling and floral design in Melbourne, Australia.',
  },
  admin: {
    title: 'Moments in Blooms Admin',
    description: 'Content management foundation for Moments in Blooms.',
  },
})
