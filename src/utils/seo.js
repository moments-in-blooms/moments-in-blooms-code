const SITE_URL = 'https://momentsinblooms.vercel.app'

const breadcrumbNames = {
  '/': 'Home',
  '/about': 'About',
  '/services': 'Services',
  '/gallery': 'Gallery',
  '/faqs': 'FAQs',
  '/contact': 'Contact',
}

export function buildBreadcrumbJsonLd(pathname) {
  const segments = pathname.split('/').filter(Boolean)
  const itemList = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    },
  ]

  let accumulatedPath = ''
  segments.forEach((segment, index) => {
    accumulatedPath += `/${segment}`
    const name = breadcrumbNames[accumulatedPath] || segment.charAt(0).toUpperCase() + segment.slice(1)
    itemList.push({
      '@type': 'ListItem',
      position: index + 2,
      name,
      item: `${SITE_URL}${accumulatedPath}`,
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemList,
  }
}
