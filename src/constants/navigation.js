import { serviceCollections } from './services.js'
import { NAVBAR_THEMES } from './ui.js'

export const publicNavigation = Object.freeze([
  { label: 'Home', path: '/', navbarTheme: NAVBAR_THEMES.LIGHT },
  { label: 'About', path: '/about', navbarTheme: NAVBAR_THEMES.LIGHT },
  { label: 'Services', path: '/services', navbarTheme: NAVBAR_THEMES.DARK },
  { label: 'Gallery', path: '/gallery', navbarTheme: NAVBAR_THEMES.DARK },
  { label: 'FAQs', path: '/faqs', navbarTheme: NAVBAR_THEMES.DARK },
  { label: 'Contact', path: '/contact', navbarTheme: NAVBAR_THEMES.DARK },
])

// Groups flagged `collapsible` render as a dropdown section in the admin
// sidebar (see Sidebar.jsx): the header toggles the child links, and the
// group auto-expands when the active route lives inside it. In collapsed
// (icon-only) sidebar mode children render flat with tooltips.
export const adminNavigationGroups = Object.freeze([
  {
    id: 'overview',
    label: 'Overview',
    items: [{ label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' }],
  },
  {
    id: 'content',
    label: 'Website Pages',
    icon: 'websitePages',
    collapsible: true,
    items: [
      { label: 'Homepage', path: '/admin/homepage', icon: 'homepage' },
      { label: 'About', path: '/admin/about', icon: 'about' },
      { label: 'Services', path: '/admin/services/page', icon: 'pageSections' },
      { label: 'Gallery', path: '/admin/gallery', icon: 'gallery' },
      { label: 'FAQs', path: '/admin/faqs', icon: 'faqs' },
      { label: 'Contact', path: '/admin/contact', icon: 'contact' },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    icon: 'services',
    collapsible: true,
    matchPrefix: '/admin/services',
    items: [
      { label: 'Categories', path: '/admin/services/categories', icon: 'categories' },
      { label: 'Sub-Categories', path: '/admin/services/subcategories', icon: 'subcategories' },
      { label: 'Items', path: '/admin/services/items', icon: 'items' },
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

// Footer Services links are derived from the same service collections the
// homepage service cards link to, so the two can never drift apart.
const footerServiceLinks = Object.freeze(
  serviceCollections.map((collection) =>
    Object.freeze({
      label: collection.title,
      path: `/services?collection=${collection.id}`,
    }),
  ),
)

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
    links: footerServiceLinks,
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
