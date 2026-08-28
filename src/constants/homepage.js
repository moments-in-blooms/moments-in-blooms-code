const imageUrl = (source, width = 1600) => `${source}?auto=format&fit=crop&w=${width}&q=85`

export const homepageHero = Object.freeze({
  eyebrow: 'Luxury event styling · Melbourne, Australia',
  title: 'The art of gathering beautifully.',
  description:
    'Floral design, considered styling and joyful details for celebrations that feel entirely your own.',
  primaryCta: 'Enquire Now',
  secondaryCta: 'View Gallery',
  image: {
    src: imageUrl('https://images.unsplash.com/photo-1553705426-c702161740bb', 2200),
    alt: 'Pink and white floral installation at an elegant event, Ivo Raeber on Unsplash',
    credit: 'Hero floral installation by Ivo Raeber on Unsplash',
  },
})

export const homepageTrustMarks = Object.freeze([
  'Weddings',
  'Private celebrations',
  'Brand events',
  'Melbourne venues',
])

export const homepageServices = Object.freeze([
  {
    id: 'decor-hire',
    eyebrow: '01 · Atmosphere',
    title: 'Decor Hire',
    description: 'Layered linens, sculptural details and candlelight that make a room feel unforgettable.',
    path: '/services',
    offset: false,
    image: {
      src: imageUrl('https://images.unsplash.com/photo-1707333512411-3fd0773d15ce', 1200),
      alt: 'Elegant wedding table with tall floral centrepieces, Francesco Liotti on Unsplash',
      credit: 'Decor hire image by Francesco Liotti on Unsplash',
    },
  },
  {
    id: 'luxe-photobooth',
    eyebrow: '02 · Playful luxury',
    title: 'Luxe Photobooth',
    description: 'A refined photo moment with soft draping, flattering light and memories worth keeping.',
    path: '/services',
    offset: true,
    image: {
      src: 'https://images.pexels.com/photos/8602142/pexels-photo-8602142.jpeg?auto=compress&cs=tinysrgb&w=1200&q=85',
      alt: 'Minimal draped event studio setup with soft lighting, Ivan Xolod on Pexels',
      credit: 'Luxe Photobooth image by Ivan Xolod on Pexels',
    },
  },
  {
    id: 'blissful-nest',
    eyebrow: '03 · A little unexpected',
    title: 'Blissful Nest',
    description: 'Our playful sister experience — beautifully presented claw machines and curated prizes for guests of every age.',
    path: '/services',
    offset: false,
    image: {
      src: imageUrl('https://images.unsplash.com/photo-1763076703663-8d28a686612f', 1200),
      alt: 'Pastel claw machines filled with plush toys, Branden Skeli on Unsplash',
      credit: 'Blissful Nest image by Branden Skeli on Unsplash',
    },
  },
])

export const homepageGalleryItems = Object.freeze([
  {
    id: 'floral-installation',
    variant: 'feature',
    image: {
      src: imageUrl('https://images.unsplash.com/photo-1682376932031-c62735732f6b', 1600),
      alt: 'Close floral installation with pink and white blooms, Gabrielle Triquet on Unsplash',
      credit: 'Floral installation by Gabrielle Triquet on Unsplash',
    },
  },
  {
    id: 'petal-walk',
    variant: 'portrait',
    image: {
      src: imageUrl('https://images.unsplash.com/photo-1695138888447-d269e1652a92', 1000),
      alt: 'Couple walking through falling petals, Lauren Mitchell on Unsplash',
      credit: 'Petal walk by Lauren Mitchell on Unsplash',
    },
  },
  {
    id: 'place-card',
    variant: 'detail',
    image: {
      src: imageUrl('https://images.unsplash.com/photo-1614350993663-90b228738611', 1000),
      alt: 'Luxury place card on a textured plate, Dmitry Mashkin on Unsplash',
      credit: 'Place card detail by Dmitry Mashkin on Unsplash',
    },
  },
])

export const homepageReasons = Object.freeze([
  {
    number: '01',
    title: 'Premium styling',
    description: 'A considered point of view from the first moodboard to the final candle lit on the table.',
  },
  {
    number: '02',
    title: 'Stress-free planning',
    description: 'Clear communication, thoughtful guidance and a calm creative partner in your corner.',
  },
  {
    number: '03',
    title: 'Fully customisable',
    description: 'Nothing off the shelf in spirit — every detail is shaped around your people and place.',
  },
  {
    number: '04',
    title: 'Melbourne based',
    description: 'Local knowledge, trusted suppliers and a deep appreciation for the city we call home.',
  },
  {
    number: '05',
    title: 'Reliable service',
    description: 'Beautiful design is only half the story; we bring dependable delivery and on-the-day care.',
  },
])

export const homepageTestimonials = Object.freeze([
  {
    id: 'testimonial-amelia-james',
    quote:
      'Moments in Blooms understood the feeling we wanted before we could put it into words. Our reception felt intimate, generous and completely ours.',
    name: 'Amelia & James',
    event: 'Wedding celebration',
    location: 'Yarra Valley, VIC',
    image: {
      src: 'https://i.pravatar.cc/180?img=47',
      alt: 'Portrait placeholder for Amelia and James',
    },
  },
  {
    id: 'testimonial-sophie-m',
    quote:
      'Every detail was beautiful, but it was the calm and care behind the scenes that made the whole experience feel effortless.',
    name: 'Sophie M.',
    event: 'Milestone birthday',
    location: 'Richmond, VIC',
    image: {
      src: 'https://i.pravatar.cc/180?img=32',
      alt: 'Portrait placeholder for Sophie M.',
    },
  },
  {
    id: 'testimonial-olivia-hart',
    quote:
      'The styling gave our launch a sense of occasion without ever feeling overdone. Guests are still talking about the floral details.',
    name: 'Olivia Hart',
    event: 'Brand launch',
    location: 'Southbank, VIC',
    image: {
      src: 'https://i.pravatar.cc/180?img=44',
      alt: 'Portrait placeholder for Olivia Hart',
    },
  },
])

export const homepageInstagramItems = Object.freeze([
  {
    id: 'champagne-tower',
    image: {
      src: imageUrl('https://images.unsplash.com/photo-1780593194924-35f0343e738b', 900),
      alt: 'Champagne tower at an elegant event, Lucas T Photography on Unsplash',
      credit: 'Champagne tower by Lucas T Photography on Unsplash',
    },
  },
  {
    id: 'pink-ranunculus',
    image: {
      src: imageUrl('https://images.unsplash.com/photo-1712135596996-3dda241aa9bc', 900),
      alt: 'Close detail of pink ranunculus flowers, micheile henderson on Unsplash',
      credit: 'Pink ranunculus by micheile henderson on Unsplash',
    },
  },
  {
    id: 'pearl-cake',
    image: {
      src: imageUrl('https://images.unsplash.com/photo-1764269710986-0b69be00d7ca', 900),
      alt: 'Elegant white wedding cake with floral detail, Fotógrafo Samuel Cruz on Unsplash',
      credit: 'Wedding cake by Fotógrafo Samuel Cruz on Unsplash',
    },
  },
  {
    id: 'photo-booth-moment',
    image: {
      src: imageUrl('https://images.unsplash.com/photo-1661030220966-f1223eeafb5c', 900),
      alt: 'Guests enjoying a photo booth moment, Rapha Wilde on Unsplash',
      credit: 'Photo booth moment by Rapha Wilde on Unsplash',
    },
  },
  {
    id: 'welcome-sign',
    image: {
      src: imageUrl('https://images.unsplash.com/photo-1746021375365-da2f9fe40131', 900),
      alt: 'Styled welcome sign for an event, Deliberate Directions on Unsplash',
      credit: 'Welcome sign by Deliberate Directions on Unsplash',
    },
  },
  {
    id: 'candlelight-dinner',
    image: {
      src: imageUrl('https://images.unsplash.com/photo-1536392706976-e486e2ba97af', 900),
      alt: 'Romantic candlelight dinner setting, M F on Unsplash',
      credit: 'Candlelight dinner by M F on Unsplash',
    },
  },
])

export const homepageCta = Object.freeze({
  eyebrow: 'Your moment starts here',
  title: "Let's create something beautiful.",
  description:
    'From the first idea to the final flourish, we are here to make your Melbourne celebration feel effortless, personal and unforgettable.',
  primaryCta: 'Enquire Now',
  secondaryCta: 'View Gallery',
})

export const homepageSeo = Object.freeze({
  title: 'Luxury Event Styling Melbourne',
  description:
    'Moments in Blooms creates luxury event styling, floral design, decor hire and joyful event details across Melbourne, Australia.',
  url: 'https://momentsinblooms.vercel.app/',
  image: homepageHero.image.src,
})

export const HOME_SECTION_IDS = Object.freeze({
  HERO: 'home-hero',
  TRUST: 'home-trusted-by',
  SERVICES: 'home-services',
  GALLERY: 'home-gallery-preview',
  WHY_US: 'home-why-choose-us',
  TESTIMONIALS: 'home-testimonials',
  INSTAGRAM: 'home-instagram',
  CTA: 'home-cta',
})
