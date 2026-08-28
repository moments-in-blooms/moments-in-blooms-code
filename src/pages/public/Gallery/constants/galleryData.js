import { GALLERY_IMAGE_IDS, imageUrl } from './galleryImages.js'

// Gallery categories for filtering
export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Collections' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'engagements', label: 'Engagements' },
  { id: 'birthdays', label: 'Birthdays' },
  { id: 'corporate', label: 'Corporate Events' },
  { id: 'luxury-booth', label: 'Luxury Booth' },
  { id: 'decor-hire', label: 'Decor Hire' },
  { id: 'blissful-nest', label: 'Blissful Nest' },
]

// Gallery items - temporary editorial images until CMS integration
export const GALLERY_ITEMS = [
  {
    id: 1,
    src: imageUrl(GALLERY_IMAGE_IDS.WEDDING_AISLE, 1600),
    title: 'Ethereal Garden Wedding',
    subtitle: 'Event Decor & Styling',
    category: 'weddings',
    size: 'large',
  },
  {
    id: 2,
    src: imageUrl(GALLERY_IMAGE_IDS.WEDDING_CEREMONY, 800),
    title: 'Intimate Engagement',
    subtitle: 'Floral Arrangement',
    category: 'engagements',
    size: 'portrait',
  },
  {
    id: 3,
    src: imageUrl(GALLERY_IMAGE_IDS.WEDDING_SPARKLERS, 800),
    title: 'Golden Hour Celebration',
    subtitle: 'Styled Table Setting',
    category: 'weddings',
    size: 'medium',
  },
  {
    id: 4,
    src: imageUrl(GALLERY_IMAGE_IDS.VENUE_DECOR, 800),
    title: 'Modern Minimalist',
    subtitle: 'Decor Hire',
    category: 'decor-hire',
    size: 'small',
  },
  {
    id: 5,
    src: imageUrl(GALLERY_IMAGE_IDS.WEDDING_RECEPTION, 1200),
    title: 'Romantic Tablescape',
    subtitle: 'Styled Tablescape',
    category: 'weddings',
    size: 'wide',
  },
  {
    id: 6,
    src: imageUrl(GALLERY_IMAGE_IDS.CELEBRATION, 800),
    title: 'Boho Chic Birthday',
    subtitle: 'Celebration Decor',
    category: 'birthdays',
    size: 'medium',
  },
  {
    id: 7,
    src: imageUrl(GALLERY_IMAGE_IDS.CORPORATE_GALA, 800),
    title: 'Corporate Gala',
    subtitle: 'Event Decor',
    category: 'corporate',
    size: 'portrait',
  },
  {
    id: 8,
    src: imageUrl(GALLERY_IMAGE_IDS.CHAMPAGNE_TOAST, 800),
    title: 'Luxury Photobooth',
    subtitle: 'Luxe Photobooth',
    category: 'luxury-booth',
    size: 'small',
  },
  {
    id: 9,
    src: imageUrl(GALLERY_IMAGE_IDS.HOME_TABLE, 800),
    title: 'Cozy Blissful Nest',
    subtitle: 'Blissful Nest',
    category: 'blissful-nest',
    size: 'medium',
  },
  {
    id: 10,
    src: imageUrl(GALLERY_IMAGE_IDS.RECEPTION_DETAIL, 1600),
    title: 'Enchanted Evening',
    subtitle: 'Styled Reception',
    category: 'weddings',
    size: 'large',
  },
  {
    id: 11,
    src: imageUrl(GALLERY_IMAGE_IDS.WEDDING_SPARKLERS, 800),
    title: 'Sparkler Send-Off',
    subtitle: 'Golden Hour',
    category: 'weddings',
    size: 'small',
  },
  {
    id: 12,
    src: imageUrl(GALLERY_IMAGE_IDS.VENUE_DECOR, 1200),
    title: 'Garden Pavilion',
    subtitle: 'Decor Installation',
    category: 'engagements',
    size: 'wide',
  },
  {
    id: 13,
    src: imageUrl(GALLERY_IMAGE_IDS.CELEBRATION, 1200),
    title: 'Pastel Dream Party',
    subtitle: 'Balloon & Floral',
    category: 'birthdays',
    size: 'portrait',
  },
  {
    id: 14,
    src: imageUrl(GALLERY_IMAGE_IDS.CHAMPAGNE_TOAST, 800),
    title: 'Celebration Toast',
    subtitle: 'Premium Beverage Bar',
    category: 'luxury-booth',
    size: 'medium',
  },
  {
    id: 15,
    src: imageUrl(GALLERY_IMAGE_IDS.HOME_TABLE, 1200),
    title: 'Sunday Brunch Table',
    subtitle: 'Blissful Nest',
    category: 'blissful-nest',
    size: 'wide',
  },
  {
    id: 16,
    src: imageUrl(GALLERY_IMAGE_IDS.CORPORATE_GALA, 1200),
    title: 'Industry Awards Night',
    subtitle: 'Event Decor',
    category: 'corporate',
    size: 'wide',
  },
  {
    id: 17,
    src: imageUrl(GALLERY_IMAGE_IDS.WEDDING_CEREMONY, 1200),
    title: 'Vineyard Vows',
    subtitle: 'Ceremony Decor',
    category: 'engagements',
    size: 'medium',
  },
  {
    id: 18,
    src: imageUrl(GALLERY_IMAGE_IDS.RECEPTION_DETAIL, 800),
    title: 'Candlelit Banquet',
    subtitle: 'Tablescape',
    category: 'decor-hire',
    size: 'small',
  },
  {
    id: 19,
    src: imageUrl(GALLERY_IMAGE_IDS.WEDDING_AISLE, 1200),
    title: 'Dancing Under the Stars',
    subtitle: 'Evening Reception',
    category: 'weddings',
    size: 'medium',
  },
  {
    id: 20,
    src: imageUrl(GALLERY_IMAGE_IDS.CELEBRATION, 800),
    title: 'High Tea Soiree',
    subtitle: 'Event Hire',
    category: 'decor-hire',
    size: 'small',
  },
]

// Featured event stories - temporary editorial images until CMS integration
export const FEATURED_STORIES = [
  {
    id: 1,
    image: imageUrl(GALLERY_IMAGE_IDS.WEDDING_AISLE, 1200),
    tag: 'Featured Wedding',
    title: 'Sarah & James • Royal Botanic Gardens',
    description: 'A breathtaking celebration featuring cascading florals, crystal elegance, and an ethereal color palette that perfectly captured their love story.',
    eventType: 'Wedding',
    location: 'Royal Botanic Gardens, Melbourne',
    narrative:
      'Sarah and James dreamed of a celebration that felt effortless and ethereal — a garden wedding that moved like poetry. From the moment guests passed through the floral archway, they were transported into a world of soft blush blooms, drifting wisteria, and the golden light of late summer. The ceremony aisle was lined with overgrown arrangements that seemed to grow organically from the landscape, while the reception unfolded beneath a canopy of fairy lights and crystal chandeliers.',
    gallery: [
      imageUrl(GALLERY_IMAGE_IDS.WEDDING_AISLE, 800),
      imageUrl(GALLERY_IMAGE_IDS.WEDDING_CEREMONY, 800),
      imageUrl(GALLERY_IMAGE_IDS.WEDDING_RECEPTION, 800),
      imageUrl(GALLERY_IMAGE_IDS.WEDDING_SPARKLERS, 800),
    ],
    highlights: [
      'A hand-built archway of cascading garden roses and wisteria',
      'Custom ceramic tableware in ivory and blush',
      'Candlelit long tables with organic centerpiece design',
      'Bespoke calligraphy stationery suite',
    ],
    services: ['Event Decor Hire', 'Floral Arrangements', 'Setup & Styling'],
  },
  {
    id: 2,
    image: imageUrl(GALLERY_IMAGE_IDS.WEDDING_SPARKLERS, 1200),
    tag: 'Luxury Event',
    title: 'Victoria\'s 30th • Crown Pavilion',
    description: 'An unforgettable milestone birthday transformed into a glamorous affair with gold accents, lush greenery, and bespoke lighting design.',
    eventType: 'Milestone Birthday',
    location: 'Crown Pavilion, Southbank',
    narrative:
      'Turning thirty called for something unforgettable. We transformed the Crown Pavilion into a golden garden of celebration — lush greenery walls, champagne-gold accents, and a custom lighting rig that bathed every corner in warmth. Guests danced beneath a canopy of hanging botanicals, while a marble dessert bar and vintage cocktail trolley kept the party moving until the early hours.',
    gallery: [
      imageUrl(GALLERY_IMAGE_IDS.WEDDING_SPARKLERS, 800),
      imageUrl(GALLERY_IMAGE_IDS.CHAMPAGNE_TOAST, 800),
      imageUrl(GALLERY_IMAGE_IDS.CELEBRATION, 800),
      imageUrl(GALLERY_IMAGE_IDS.VENUE_DECOR, 800),
    ],
    highlights: [
      'Floor-to-ceiling greenery installation',
      'Custom neon statement piece',
      'Marble dessert bar and champagne tower',
      'Ambient uplighting and floral chandeliers',
    ],
    services: ['Event Decor Hire', 'Luxe Photobooth', 'Setup & Styling'],
  },
  {
    id: 3,
    image: imageUrl(GALLERY_IMAGE_IDS.CORPORATE_GALA, 1200),
    tag: 'Corporate Excellence',
    title: 'Tech Innovators Gala • Melbourne Convention Centre',
    description: 'A sophisticated corporate event blending modern aesthetics with warm hospitality, featuring custom installations and immersive experiences.',
    eventType: 'Corporate Gala',
    location: 'Melbourne Convention Centre',
    narrative:
      'When a leading tech company wanted to thank their partners, they turned to us for an evening that balanced sophistication with warmth. We designed a modern, monochrome palette punctuated by sculptural floral installations, state-of-the-art immersive brand moments, and a welcoming hospitality program. The result was a gala that felt every bit as considered as the innovation it celebrated.',
    gallery: [
      imageUrl(GALLERY_IMAGE_IDS.CORPORATE_GALA, 800),
      imageUrl(GALLERY_IMAGE_IDS.WEDDING_RECEPTION, 800),
      imageUrl(GALLERY_IMAGE_IDS.RECEPTION_DETAIL, 800),
      imageUrl(GALLERY_IMAGE_IDS.HOME_TABLE, 800),
    ],
    highlights: [
      'Sculptural floral centerpieces at podium height',
      'Immersive brand activation spaces',
      'Curated multi-course dining program',
      'Interactive guest experience design',
    ],
    services: ['Event Decor Hire', 'Decor & Styling', 'Luxe Photobooth'],
  },
]

// Instagram preview posts - temporary editorial images until CMS integration
export const INSTAGRAM_POSTS = [
  { id: 1, src: imageUrl(GALLERY_IMAGE_IDS.WEDDING_AISLE, 600) },
  { id: 2, src: imageUrl(GALLERY_IMAGE_IDS.WEDDING_CEREMONY, 600) },
  { id: 3, src: imageUrl(GALLERY_IMAGE_IDS.WEDDING_SPARKLERS, 600) },
  { id: 4, src: imageUrl(GALLERY_IMAGE_IDS.WEDDING_RECEPTION, 600) },
  { id: 5, src: imageUrl(GALLERY_IMAGE_IDS.VENUE_DECOR, 600) },
  { id: 6, src: imageUrl(GALLERY_IMAGE_IDS.CELEBRATION, 600) },
  { id: 7, src: imageUrl(GALLERY_IMAGE_IDS.CHAMPAGNE_TOAST, 600) },
  { id: 8, src: imageUrl(GALLERY_IMAGE_IDS.HOME_TABLE, 600) },
]

// Hero section content
export const HERO_CONTENT = {
  eyebrow: 'Our Portfolio',
  title: 'Moments That Take Your Breath Away',
  description: 'Discover our curated collection of unforgettable celebrations, each thoughtfully designed to reflect the unique love stories and special moments we\'ve had the privilege to create.',
  primaryCTA: 'Start Your Journey',
  secondaryCTA: 'Explore Services',
  primaryLink: '/contact',
  secondaryLink: '/services',
  backgroundImage: imageUrl(GALLERY_IMAGE_IDS.WEDDING_AISLE, 1920),
}

// Introduction section content
export const INTRODUCTION_CONTENT = {
  eyebrow: 'Our Philosophy',
  title: 'Creating Unforgettable Celebrations',
  text: 'At Moments in Blooms, we believe every celebration tells a story. Our approach combines artistic vision with meticulous attention to detail, transforming spaces into immersive experiences that captivate hearts and create lasting memories. From intimate gatherings to grand affairs, each element is carefully curated to reflect your unique narrative.',
}

// CTA section content
export const CTA_CONTENT = {
  eyebrow: 'Begin Your Story',
  title: 'Let\'s Create Something Beautiful Together',
  description: 'Ready to bring your dream celebration to life? We\'d love to hear about your vision and help you create moments that will be cherished forever.',
  primaryCTA: 'Enquire Now',
  secondaryCTA: 'Learn More About Us',
  primaryLink: '/contact',
  secondaryLink: '/about',
  backgroundImage: imageUrl(GALLERY_IMAGE_IDS.WEDDING_RECEPTION, 1920),
}

// Instagram section content
export const INSTAGRAM_CONTENT = {
  eyebrow: 'Follow Us',
  title: '@momentsinblooms',
}

// Featured stories section content
export const FEATURED_STORIES_SECTION_CONTENT = {
  eyebrow: 'Portfolio Highlights',
  title: 'Featured Event Stories',
}
