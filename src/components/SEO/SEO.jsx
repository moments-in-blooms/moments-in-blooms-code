import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { routeMetadata } from '../../constants/navigation.js'

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://momentsinblooms.vercel.app'

const DEFAULT_OG_IMAGE = `${SITE_URL}/pwa-512x512.png`

function SEO({
  title,
  description,
  canonical,
  image,
  url,
  keywords,
  type = 'website',
  siteName = routeMetadata.public.title,
  jsonLd,
  noIndex = false,
}) {
  const location = useLocation()
  const resolvedTitle = title ? `${title} | ${routeMetadata.public.title}` : routeMetadata.public.title
  const resolvedDescription = description || routeMetadata.public.description
  const canonicalPath = (canonical && canonical.startsWith('http'))
    ? canonical
    : `${SITE_URL}${canonical || location.pathname}`
  const resolvedUrl = url || canonicalPath
  const resolvedImage = image || DEFAULT_OG_IMAGE
  // Dimensions match the admin's 1200×630 share-image guidance, so only
  // claim them for a CMS-provided image — never for the fallback icon.
  const hasShareImage = Boolean(image)

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}
      <link rel="canonical" href={canonicalPath} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_AU" />
      <meta property="og:url" content={resolvedUrl} />
      {resolvedImage ? <meta property="og:image" content={resolvedImage} /> : null}
      {hasShareImage ? <meta property="og:image:width" content="1200" /> : null}
      {hasShareImage ? <meta property="og:image:height" content="630" /> : null}
      <meta name="twitter:card" content={resolvedImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      {resolvedImage ? <meta name="twitter:image" content={resolvedImage} /> : null}
      {jsonLd ? (Array.isArray(jsonLd) ? jsonLd.map((item, i) => (
        <script key={item['@type'] || i} type="application/ld+json">{JSON.stringify(item)}</script>
      )) : (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )) : null}
    </Helmet>
  )
}

export default SEO
