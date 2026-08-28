const imageUrl = (source, width = 1600) => `${source}?auto=format&fit=crop&w=${width}&q=85`

export const ABOUT_SECTION_IDS = Object.freeze({
  HERO: 'hero',
  BRAND_STORY: 'story',
  MISSION_VISION: 'mission-vision',
  CORE_VALUES: 'core-values',
  WHY_US: 'why-us',
  BEHIND_EXPERIENCE: 'experience',
  STATS: 'stats',
  TESTIMONIAL: 'testimonial',
  CTA: 'cta',
})

export const aboutSeo = Object.freeze({
  title: 'About Us',
  description:
    'Meet Moments in Blooms, Melbourne\'s studio for beautiful event decor hire, the Luxe Photobooth, and Blissful Nest claw machine entertainment — with professional setup and styling for hired pieces.',
  url: 'https://momentsinblooms.vercel.app/about',
  image: imageUrl('https://images.unsplash.com/photo-1519225421980-715cb0215aed', 1200),
})

export const aboutHero = Object.freeze({
  eyebrow: 'Our Heritage & Philosophy',
  title: 'Designing moments that bloom into memories.',
  description:
    'A Melbourne studio for beautiful decor hire and playful, polished entertainment — professionally set up and styled for your celebration.',
  primaryCta: {
    label: 'Explore Our Services',
    path: '/services',
  },
  secondaryCta: {
    label: 'Get in Touch',
    path: '/contact',
  },
  image: {
    src: imageUrl('https://images.unsplash.com/photo-1519225421980-715cb0215aed', 1600),
    alt: 'Luxury floral installation with warm candlelit table setup',
    credit: 'Photo on Unsplash',
  },
})

export const aboutBrandStory = Object.freeze({
  subtitle: 'Our Story',
  title: 'Rooted in passion, cultivated with intention.',
  paragraphs: Object.freeze([
    'Moments in Blooms began with a simple yet profound realization: extraordinary celebrations are born from the seamless union of artistic floral design and thoughtful atmosphere.',
    'Over the years, our studio has grown around a love of botanical artistry — curating decor collections, floral arrangements, and playful experiences that help celebrations feel warm, considered, and beautifully put together.',
    'Whether it’s a wedding, a milestone birthday, or a private celebration, our team brings meticulous attention to detail to every hired piece — from the final bloom to the last backdrop.',
  ]),
  quote: {
    text: 'We believe flowers speak a quiet language of luxury—transforming spaces into unforgettable emotional experiences.',
    author: 'Elena Vance',
    role: 'Founder & Creative Director',
  },
  image: {
    src: imageUrl('https://images.unsplash.com/photo-1561181286-d3fee7d55364', 1200),
    alt: 'Floral artist carefully arranging fresh luxury roses and greenery for a center piece',
    credit: 'Photo on Unsplash',
  },
})

export const aboutMissionVision = Object.freeze({
  subtitle: 'Purpose & Perspective',
  title: 'What drives our creative pursuit',
  mission: {
    tag: 'Our Mission',
    title: 'Curating Beautiful Celebrations',
    description:
      'To curate beautiful decor collections, botanical arrangements, and entertainment experiences — set up and styled with care — so every celebration feels considered, joyful, and entirely your own.',
  },
  vision: {
    tag: 'Our Vision',
    title: 'Pioneering Timeless Floral Artistry',
    description:
      'To grow into Australia’s premier luxury event styling studio—setting benchmarks in sustainable botanical practices, artistic innovation, and emotionally resonant event design.',
  },
})

export const aboutCoreValues = Object.freeze([
  {
    id: 'artistic-mastery',
    iconName: 'FiStar',
    title: 'Artistic Mastery',
    description:
      'We treat every arrangement as a bespoke piece of art, combining unexpected textures, organic silhouettes, and fine color palettes.',
  },
  {
    id: 'uncompromising-quality',
    iconName: 'FiAward',
    title: 'Uncompromising Quality',
    description:
      'Only the finest locally grown blooms and premium materials make it into our installations, ensuring fresh and breathtaking displays.',
  },
  {
    id: 'intentional-elegance',
    iconName: 'FiFeather',
    title: 'Intentional Elegance',
    description:
      'Every candle place setting, draped linen, and floral arch is curated with visual balance and subtle luxury in mind.',
  },
  {
    id: 'personal-connection',
    iconName: 'FiHeart',
    title: 'Personal Connection',
    description:
      'We work closely with couples and hosts to translate personal stories and event visions into authentic, emotional atmospheres.',
  },
])

export const aboutWhyChooseUs = Object.freeze({
  subtitle: 'The Distinction',
  title: 'Why couples & hosts choose Moments in Blooms',
  description:
    'Our comprehensive approach blends creative direction, bespoke botanical artistry, and logistics so you can savor every moment.',
  highlights: Object.freeze([
    {
      number: '01',
      title: 'Full-Service Creative Direction',
      description:
        'From initial moodboards and spatial layouts to flower selection and on-site setup, we oversee every aesthetic detail.',
    },
    {
      number: '02',
      title: 'Curated Props & Decor Collection',
      description:
        'Access our private collection of bespoke decor, artisan pottery, custom photo booths, and premium linens.',
    },
    {
      number: '03',
      title: 'Sustainable Botanical Sourcing',
      description:
        'We prioritize eco-conscious practices, foam-free floral techniques, and locally grown seasonal blooms from Victorian growers.',
    },
    {
      number: '04',
      title: 'Seamless On-Site Execution',
      description:
        'Our dedicated installation team ensures flawless setup and timely bump-out, allowing you to be a guest at your own event.',
    },
  ]),
})

export const aboutBehindExperience = Object.freeze({
  subtitle: 'Thoughtful Execution',
  title: 'Behind the Experience',
  description:
    'Every celebration is crafted through a refined multi-stage journey designed to eliminate stress and deliver flawless botanical beauty.',
  steps: Object.freeze([
    {
      stepNumber: '01',
      title: 'Discovery & Creative Direction',
      description:
        'We begin with a deep exploration of your aesthetic preferences, venue architecture, color stories, and moodboard curation.',
    },
    {
      stepNumber: '02',
      title: 'Bespoke Floral & Prop Curation',
      description:
        'Sourcing fresh Victorian seasonal blooms and hand-selecting artisan tableware, linens, and custom photobooths.',
    },
    {
      stepNumber: '03',
      title: 'Spatial Planning & Logistics',
      description:
        'Collaborating with venue managers, lighting teams, and planners to align timelines and spatial layouts for maximum visual impact.',
    },
    {
      stepNumber: '04',
      title: 'On-Site Master Styling',
      description:
        'Our expert installation team hand-places archways, hanging installations, and candlelit centerpieces on your event morning.',
    },
    {
      stepNumber: '05',
      title: 'After-Event Care & Repurposing',
      description:
        'Discreet and timely bump-out service, including wrapping bouquets for guests to take home and sustainable flower composting.',
    },
  ]),
})

export const aboutStats = Object.freeze({
  subtitle: 'Proven Excellence',
  title: 'Our Craft in Numbers',
  description:
    'Years of dedicated floral artistry and luxury event styling defined by quality and unforgettable celebrations.',
  items: Object.freeze([
    {
      value: '350+',
      label: 'Luxury Events Styled',
      description: 'Weddings, galas, and high-profile brand activations across Victoria.',
    },
    {
      value: '100%',
      label: 'Five-Star Praise',
      description: 'Overwhelming praise from couples and event planners for our reliability.',
    },
    {
      value: '8+ Yrs',
      label: 'Artistic Craftsmanship',
      description: 'Years perfecting organic floral techniques and bespoke event design.',
    },
    {
      value: '25+',
      label: 'Venue Partners',
      description: 'Trusted partnerships with Melbourne’s top luxury wedding and event venues.',
    },
  ]),
})

export const aboutTestimonialHighlight = Object.freeze({
  subtitle: 'Client Praise',
  title: 'A Moment to Remember',
  quote:
    'Working with Moments in Blooms was the single best decision we made for our wedding day. The floral installations were an absolute dream that elevated our entire reception. Elena and her team executed everything with grace and perfection.',
  author: 'Charlotte & James',
  role: 'Yarra Valley Vineyard Wedding',
  image: {
    src: imageUrl('https://images.unsplash.com/photo-1519741497674-611481863552', 800),
    alt: 'Charlotte and James at their Yarra Valley vineyard wedding',
  },
})

export const aboutCta = Object.freeze({
  subtitle: 'Begin Your Journey',
  title: 'Let’s bring your celebration to life.',
  description:
    'Whether you have a detailed vision or need creative guidance, we invite you to share your event details with our design team.',
  primaryCta: {
    label: 'Request Consultation',
    path: '/contact',
  },
  secondaryCta: {
    label: 'Browse Portfolio',
    path: '/gallery',
  },
})
