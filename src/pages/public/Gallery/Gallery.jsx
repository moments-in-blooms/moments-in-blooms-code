import { useContent } from '../../../hooks/useContent.js'
import SEO from '../../../components/SEO/index.js'
import { buildBreadcrumbJsonLd } from '../../../utils/seo.js'
import { useGallery } from './hooks/index.js'
import { useLightbox } from './hooks/index.js'

import {
  EditorialGallery,
  FeaturedStory,
  GalleryCTA,
  GalleryHero,
  GalleryLightbox,
  InstagramPreview,
  Introduction,
} from './components/index.js'

import * as S from './Gallery.styles.js'

function Gallery() {
  const { values, loading } = useContent('gallery')
  const { values: seoValues } = useContent('seo')
  const seo = seoValues.gallery ?? seoValues.site ?? {}

  const categories = values.categories ?? []
  const items = values.items ?? []
  const hero = values.hero ?? {}
  const introduction = values.introduction ?? {}
  const instagramContent = values.instagram ?? {}
  const instagramPosts = values.instagramPosts ?? []
  const cta = values.cta ?? {}
  const featuredStories = values.featuredStories ?? []
  const featuredStoriesSection = values.featuredStoriesSection ?? {}

  const { visibleItems, hasMore, loadMore } = useGallery(items, categories)

  const {
    isOpen,
    currentIndex,
    currentItem,
    openLightbox,
    closeLightbox,
    navigateLightbox,
    totalItems,
  } = useLightbox(visibleItems)

  const featuredStoryContent =
    featuredStories.length > 0
      ? {
          eyebrow: featuredStoriesSection.eyebrow,
          title: featuredStoriesSection.title,
          stories: featuredStories,
        }
      : null

  return (
    <S.GalleryPage aria-busy={loading ? 'true' : undefined}>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        image={seo.image}
        keywords={seo.keywords}
        url={seo.url}
        jsonLd={buildBreadcrumbJsonLd('/gallery')}
      />

      <GalleryHero content={hero} />

      <Introduction content={introduction} />

      <EditorialGallery
        items={visibleItems}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onImageClick={openLightbox}
      />

      {featuredStoryContent ? <FeaturedStory content={featuredStoryContent} /> : null}

      <InstagramPreview content={instagramContent} posts={instagramPosts} />

      <GalleryCTA content={cta} />

      <GalleryLightbox
        isOpen={isOpen}
        currentItem={currentItem}
        currentIndex={currentIndex}
        totalItems={totalItems}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </S.GalleryPage>
  )
}

export default Gallery
