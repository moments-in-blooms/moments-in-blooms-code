import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { routeMetadata } from '../../constants/navigation.js'

const SITE_URL = 'https://momentsinblooms.vercel.app'

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
      {image ? <meta property="og:image" content={image} /> : null}
      {image ? <meta property="og:image:width" content="1200" /> : null}
      {image ? <meta property="og:image:height" content="630" /> : null}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      {image ? <meta name="twitter:image" content={image} /> : null}
      {jsonLd ? (Array.isArray(jsonLd) ? jsonLd.map((item, i) => (
        <script key={item['@type'] || i} type="application/ld+json">{JSON.stringify(item)}</script>
      )) : (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )) : null}
    </Helmet>
  )
}

export default SEO
