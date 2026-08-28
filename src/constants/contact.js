const imageUrl = (source, width = 1600) => `${source}?auto=format&fit=crop&w=${width}&q=85`

export const CONTACT_SECTION_IDS = Object.freeze({
  HERO: 'contact-hero',
  FORM: 'contact-enquiry-form',
  INFORMATION: 'contact-information',
  CTA: 'contact-cta',
})

export const contactSeo = Object.freeze({
  title: 'Get in Touch',
  description:
    'Enquire with Moments in Blooms about event decor hire, the Luxe Photobooth, Blissful Nest claw machines, and professional setup and styling of hired items across Melbourne.',
  url: 'https://momentsinblooms.vercel.app/contact',
  image: imageUrl('https://images.unsplash.com/photo-1519741497674-611481863552', 1800),
})

export const contactHero = Object.freeze({
  eyebrow: "Let's create something beautiful",
  title: 'Tell us about your celebration.',
  description:
    "Share the date, the venue and the feeling you're hoping to create. The Moments in Blooms team reviews every enquiry personally and comes back with considered ideas for your event.",
  note: 'Every enquiry is reviewed personally — never an automated confirmation.',
  image: {
    src: imageUrl('https://images.unsplash.com/photo-1519741497674-611481863552', 1400),
    alt: 'Elegant event reception styled with tall candles and floral arrangements',
    credit: 'Photo by Secret Garden on Unsplash',
  },
})

export const eventTypeOptions = Object.freeze([
  'Wedding',
  'Birthday',
  'Private Celebration',
  'Corporate Event',
  'Brand Event',
  'Other',
])

export const serviceInterestOptions = Object.freeze([
  { value: 'event-decor-hire', label: 'Event Decor Hire' },
  { value: 'luxe-photobooth', label: 'Luxe Photobooth' },
  { value: 'blissful-nest', label: 'Blissful Nest' },
  { value: 'setup-styling', label: 'Setup / Styling of hired items' },
  { value: 'not-sure', label: 'Not sure yet' },
])

export const guestCountOptions = Object.freeze([
  'Under 30',
  '30–50',
  '51–100',
  '101–150',
  '150+',
  'Not sure yet',
])

export const setupRequirementOptions = Object.freeze(['Yes', 'No', 'Not sure yet'])

export const enquiryFormRail = Object.freeze({
  eyebrow: 'Your enquiry, in good hands',
  title: 'What happens after you send it?',
  steps: [
    {
      title: 'We review your enquiry',
      description: 'Your details are read by the team, not an automated system.',
    },
    {
      title: 'We respond thoughtfully',
      description: 'Expect considered ideas and a clear next step, tailored to your event.',
    },
    {
      title: 'You decide',
      description: 'Nothing is locked in until you choose to move forward.',
    },
  ],
  note: 'The team usually replies within one to two business days.',
})

export const contactInformation = Object.freeze({
  eyebrow: 'Prefer a conversation?',
  title: 'Reach out to the studio.',
  description:
    'Call, write or follow along on social — we would love to hear about your celebration.',
  responseNote: 'We generally respond within one to two business days.',
})

export const contactCta = Object.freeze({
  eyebrow: 'Feeling inspired?',
  title: 'Explore what we create.',
  description:
    'Browse our services and recent celebrations for a little inspiration before you write to us.',
  primaryCta: 'Explore our services',
  primaryPath: '/services',
  secondaryCta: 'View the gallery',
  secondaryPath: '/gallery',
})