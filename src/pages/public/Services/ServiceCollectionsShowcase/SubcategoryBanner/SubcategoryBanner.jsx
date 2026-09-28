import ImageReveal from '../../../../../components/Reveal/ImageReveal.jsx'
import SafeReveal from '../../../../../components/Reveal/SafeReveal.jsx'
import {
  Banner,
  BannerContent,
  BannerMedia,
  BannerScrim,
  Description,
  Eyebrow,
  FallbackContent,
  Price,
  Subtitle,
  Title,
} from './SubcategoryBanner.styles.js'

const getImageSrc = (image) => {
  if (!image) return ''
  if (typeof image === 'string') return image
  return image.src ?? ''
}

const getImageAlt = (image, fallback = '') => {
  if (!image) return fallback
  if (typeof image === 'string') return fallback
  return image.alt || fallback
}

/**
 * Editorial banner for a service sub-category on the public Services page.
 *
 * With an image: a full-width banner with a legibility scrim and the
 * sub-category's copy overlaid in white (ImageReveal entrance, hover zoom).
 * Without an image: the same copy on a neutral gradient panel (SafeReveal),
 * so future categories never look broken when the image isn't set yet.
 */
function SubcategoryBanner({
  eyebrow,
  title,
  subtitle,
  description,
  priceFrom,
  image,
  priceLabel = 'Price starts at',
}) {
  const src = getImageSrc(image)
  const hasImage = Boolean(src)
  const tone = { $onImage: hasImage }

  const hasCopy = Boolean(
    String(eyebrow ?? '').trim() ||
      String(title ?? '').trim() ||
      String(subtitle ?? '').trim() ||
      String(description ?? '').trim() ||
      String(priceFrom ?? '').trim(),
  )

  // Nothing to show (e.g. a booth group with only direct packages) — render
  // nothing rather than an empty panel.
  if (!hasImage && !hasCopy) return null

  const body = (
    <>
      {eyebrow ? <Eyebrow {...tone}>{eyebrow}</Eyebrow> : null}
      {title ? <Title {...tone}>{title}</Title> : null}
      {subtitle ? <Subtitle {...tone}>{subtitle}</Subtitle> : null}
      {description ? <Description {...tone}>{description}</Description> : null}
      {priceFrom ? (
        <Price {...tone}>
          {priceLabel} {priceFrom}
        </Price>
      ) : null}
    </>
  )

  if (!hasImage) {
    return (
      <SafeReveal>
        <Banner>
          <FallbackContent>{body}</FallbackContent>
        </Banner>
      </SafeReveal>
    )
  }

  return (
    <ImageReveal>
      <Banner $onImage>
        <BannerMedia>
          <img src={src} alt={getImageAlt(image, title)} loading="lazy" />
        </BannerMedia>
        <BannerScrim />
        <BannerContent>{body}</BannerContent>
      </Banner>
    </ImageReveal>
  )
}

export default SubcategoryBanner