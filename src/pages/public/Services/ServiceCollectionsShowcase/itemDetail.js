/**
 * Normalizers mapping clickable Services collection items to the shared
 * detail model consumed by ItemDetailModal:
 * { imageSrc, imageAlt, badge, name, tagline, price, specs, description, items[], ctaLabel }
 */

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

export const toDecorOptionDetail = (option, defaultCta = 'Request a Quote') => ({
  imageSrc: getImageSrc(option?.image),
  imageAlt: getImageAlt(option?.image, option?.name),
  badge: null,
  name: option?.name ?? '',
  tagline: null,
  price: null,
  specs: option?.specs ?? null,
  description: option?.desc ?? null,
  items: [],
  ctaLabel: defaultCta,
})

export const toDecorGalleryDetail = (galleryItem, defaultCta = 'Request a Quote') => ({
  imageSrc: galleryItem?.src ?? '',
  imageAlt: galleryItem?.alt || galleryItem?.title || '',
  badge: null,
  name: galleryItem?.title ?? '',
  tagline: null,
  price: null,
  specs: null,
  description: galleryItem?.alt ?? null,
  items: [],
  ctaLabel: defaultCta,
})

/**
 * Detail model for a featured item itself. `mainImage` ({src, alt}) is an
 * optional override for the modal image — used when the visible main photo
 * falls back to the first option's image.
 */
export const toDecorFeatureDetail = (item, mainImage, defaultCta = 'Request a Quote') => ({
  imageSrc: mainImage?.src ?? getImageSrc(item?.image),
  imageAlt: mainImage?.alt ?? getImageAlt(item?.image, item?.name),
  badge: null,
  name: item?.name ?? '',
  tagline: item?.tagline ?? null,
  price: item?.price ?? null,
  specs: item?.dimensions ?? null,
  description: item?.description ?? null,
  items: [],
  ctaLabel: defaultCta,
})

export const toBlissfulPackageDetail = (pkg, defaultCta = 'Enquire Now', featuredBadge = 'Featured') => ({
  imageSrc: getImageSrc(pkg?.image),
  imageAlt: getImageAlt(pkg?.image, pkg?.name),
  badge: pkg?.badge ?? (pkg?.isFeatured ? featuredBadge : null),
  name: pkg?.name ?? '',
  tagline: pkg?.tagline ?? null,
  price: pkg?.price ?? null,
  specs: null,
  description: pkg?.description ?? null,
  items: Array.isArray(pkg?.items) ? pkg.items : [],
  ctaLabel: defaultCta,
})
