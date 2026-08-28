const imageUrl = (source, width = 1600) =>
  `${source}?auto=format&fit=crop&w=${width}&q=85`;

export const servicesSeo = Object.freeze({
  title: "Event Decor Hire, Photobooth & Claw Machines Melbourne",
  description:
    "Discover Moments in Blooms services in Melbourne — event decor hire, the Luxe Photobooth, Blissful Nest claw machines, and professional setup and styling for hired items.",
  url: "https://momentsinblooms.vercel.app/services",
  image: imageUrl(
    "https://images.unsplash.com/photo-1519741497674-611481863552",
    1800,
  ),
});

export const SERVICES_SECTION_IDS = Object.freeze({
  HERO: "services-hero",
  INTRO: "services-intro",
  FEATURED: "services-featured",
  EXPERIENCE: "services-experience",
  GALLERY: "services-gallery",
  WHY_US: "services-why-us",
  TESTIMONIALS: "services-testimonials",
  FAQ: "services-faq",
  CTA: "services-cta",
});

export const servicesHero = Object.freeze({
  eyebrow: "Event Decor Hire & Entertainment · Melbourne",
  title: "The Art of Extraordinary Celebrations.",
  description:
    "From curated floral installations and decor hire to the Luxe Photobooth and Blissful Nest claw machines — beautiful pieces, professionally set up and styled for your celebration.",
  primaryCta: {
    label: "Reserve Your Date",
    path: "/contact",
  },
  secondaryCta: {
    label: "Explore Our Portfolio",
    path: "/gallery",
  },
  badge: {
    title: "Melbourne",
    subtitle: "Decor Hire & Entertainment",
  },
  image: {
    src: imageUrl(
      "https://images.unsplash.com/photo-1519741497674-611481863552",
      2200,
    ),
    alt: "Luxury wedding reception with candlelight and floral arrangements",
    credit: "Photo by Secret Garden on Unsplash",
  },
});

export const servicesIntro = Object.freeze({
  subtitle: "The Moments in Blooms Philosophy",
  title: "Where architectural elegance meets romantic floral storytelling.",
  paragraph1:
    "We believe an event is more than a gathering — it is a living canvas where light, texture, flora, and laughter converge. Our studio designs bespoke atmospheres that feel effortlessly refined, intimate, and deeply personal.",
  paragraph2:
    "Whether you are planning a grand Yarra Valley wedding, a milestone birthday in South Yarra, or an exclusive brand showcase, every petal, linen, and detail is selected with uncompromising intent.",
  quote: {
    text: "True luxury lies in the feeling a space evokes long after the candles have flickered out.",
    author: "Creative Director",
    role: "Moments in Blooms Melbourne",
  },
  primaryImage: {
    src: imageUrl(
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf",
      1200,
    ),
    alt: "Elegant floral tablescape with fine dinnerware and tall candles",
  },
  secondaryImage: {
    src: imageUrl(
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
      800,
    ),
    alt: "Close-up of luxury bridal bouquet with pastel roses",
  },
});

export const photoboothPackages = Object.freeze([
  {
    id: "signature-package",
    name: "SIGNATURE",
    tagline: "Essential Luxury Photo Experience",
    price: "$600",
    hireDuration: "3 Hour Hire Period",
    popular: false,
    badge: "3 Hours",
    description:
      "Our foundation photo studio experience — a sleek mirror booth with an interactive touch display, unlimited prints, and fun props for every guest.",
    inclusions: [
      "Sleek mirror booth with interactive touch display",
      "Unlimited prints throughout the event",
      "Choice of photobooth strips or 4x6 sizes",
      "Choice of template from our designs",
      "Fun props",
      "Studio white backdrop",
    ],
    addOns: [
      "Dedicated on-site attendant",
      "Elegant photobooth frames",
      "Digital gallery of all photos",
      "Email feature",
      "Floral decor",
      "Additional hour $100",
    ],
    travelNotes: "Travel fees may apply depending on the event location.",
    ctaText: "Reserve Your Date",
  },
  {
    id: "glam-package",
    name: "GLAM",
    tagline: "Extended Hire With Premium Styling",
    price: "$850",
    hireDuration: "4 Hour Hire Period",
    popular: false,
    badge: "4 Hours",
    description:
      "Extended coverage with custom templates, a premium backdrop selection, and red carpet arrival styling for your guests.",
    inclusions: [
      "Sleek mirror booth with interactive touch display",
      "Unlimited prints throughout the event",
      "Choice of photobooth strips or 4x6 sizes",
      "Digital gallery of all photos",
      "Custom templates",
      "Fun props",
      "Red carpet and gold bollards",
      "Choice of premium backdrop",
      "Email feature",
    ],
    addOns: [
      "Dedicated on-site attendant",
      "Elegant photobooth frames",
      "Floral decor",
      "Additional hour $150",
    ],
    travelNotes: "Travel fees may apply depending on the event location.",
    ctaText: "Reserve Your Date",
  },
  {
    id: "vip-package",
    name: "VIP",
    tagline: "The Ultimate All-Inclusive Photobooth Suite",
    price: "$1200",
    hireDuration: "4 Hour Hire Period",
    popular: true,
    badge: "Most Popular",
    description:
      "Our flagship all-inclusive experience, featuring a dedicated on-site attendant and a set of 100 elegant take-home photobooth frames for your guests.",
    inclusions: [
      "Sleek mirror booth with interactive touch display",
      "Unlimited prints throughout the event",
      "Choice of photobooth strips or 4x6 sizes",
      "Digital gallery of all photos",
      "Custom templates",
      "Fun props",
      "Red carpet and gold bollards",
      "Floral decor",
      "Choice of premium backdrop",
      "Email feature",
      "Dedicated on-site attendant",
      "Elegant photobooth frames (100 pcs)",
    ],
    addOns: ["Additional hour $150", "Additional photobooth frames"],
    travelNotes: "Travel fees may apply depending on the event location.",
    ctaText: "Reserve Your Date",
  },
]);

export const photoboothHighlights = Object.freeze({
  framesFeature: {
    badge: "Exclusive Keepsake",
    title: "Australia's First Take-Home Photobooth Frames",
    description:
      "We are proud to introduce an exclusive luxury touch for your guests — bespoke take-home photo frames crafted specifically to fit your instant prints. Guests leave with a stunning physical memento ready to be displayed in their home as a lasting memory of your celebration.",
    highlights: [
      "Custom acrylic and timber frame finishes tailored to your aesthetic",
      "Precision cut to perfectly fit instant 2x6 and 4x6 photobooth prints",
      "Personalized with gold leaf monograms or event dates on request",
      "The ultimate wedding and party favor loved by guests of all ages",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
      alt: "Luxury custom photo frame with elegant event print inside",
    },
  },
  studioGrade: {
    badge: "Uncompromising Quality",
    title: "Studio-Grade Photobooth Moments",
    description:
      "We treat every booth capture as a magazine-worthy portrait studio. Combining high-resolution DSLR sensors, softbox studio beauty lighting, and lab-quality dye-sublimation printing, your guests receive flawless prints that never fade.",
    features: [
      {
        title: "Professional Cameras",
        desc: "High-resolution cameras providing razor-sharp clarity and rich natural skin tones.",
      },
      {
        title: "Studio Lighting",
        desc: "Diffused studio lighting engineered to eliminate harsh shadows and flatter every guest.",
      },
      {
        title: "Unlimited Prints",
        desc: "Unlimited prints available throughout the event for every guest.",
      },
      {
        title: "Personalised Templates",
        desc: "Bespoke print graphic artwork tailored with your names, event date, monogram, or branding.",
      },
      {
        title: "Elegant Backdrops",
        desc: "Curated collection of premium backdrops for a refined studio setting.",
      },
      {
        title: "High-Quality Prints",
        desc: "Crisp, high-quality prints delivered on the spot for every guest to keep.",
      },
    ],
  },
});

export const blissfulNestIntro = Object.freeze({
  paragraph:
    "Our Blissful Nest Claw Machines add a playful yet polished touch to your celebration, a crowd-favourite feature of irresistible fun. Creating moments of excitement and connection, they make every event an experience to remember.",
});

export const blissfulNestPackages = Object.freeze([
  {
    id: "standard",
    name: "Standard",
    tagline: "Playful Nostalgia & Soft Keepsakes",
    description:
      "Curated pastel plush toys, custom keychains, soft plush keepsakes, and traditional metallic event tokens.",
    badge: "Classic Choice",
    items: [
      "Pastel plush companions",
      "Custom acrylic keyrings",
      "Metallic play tokens",
    ],
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Artisan Confectionery & Favors",
    description:
      "Custom boxed wedding favor gifts, gourmet artisan chocolates, bespoke scented candles, and monogrammed keepsakes.",
    badge: "Host Favorite",
    items: [
      "Bespoke scented mini candles",
      "Artisan boxed chocolates",
      "Monogrammed favors",
    ],
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "deluxe",
    name: "Deluxe",
    tagline: "Luxury Beauty & Mini Champagne",
    description:
      "Designer beauty and skincare miniatures, mini Moët or Bottega champagne bottles, and high-value prize capsules.",
    badge: "VIP Luxury",
    items: [
      "Mini champagne bottles",
      "Designer beauty miniatures",
      "VIP prize capsules",
    ],
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "custom-order",
    name: "Custom Order",
    tagline: "Tailored for Brand & Theme",
    description:
      "Completely tailored prizes sourced, packaged, and branded specifically for your wedding color palette, theme, or corporate sponsors.",
    badge: "Bespoke Sourcing",
    items: [
      "Custom corporate merchandise",
      "Bespoke branded packaging",
      "Theme-matched items",
    ],
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=85",
  },
]);

// NOTE: These three collections carry navigation and hero metadata only. The
// Luxe Photobooth and Blissful Nest renderers read their packages, highlights,
// and intro from the top-level sections above, not from the collection entry.
export const serviceCollections = Object.freeze([
  {
    id: "decor-hire",
    type: "collection",
    brand: "Moments in Blooms",
    order: 1,
    featured: true,
    title: "Decor Hire",
    navSub: "Event Decor Hire",
    navMeta: "4 Collections",
    description:
      "Curated decorative collections for hire — floral arrangements, backdrops, plinths, and feature pieces, professionally set up and styled for your event.",
    tagline: "Curated Decor Collections",
    coverImage: {
      src: "https://images.unsplash.com/photo-1707333512411-3fd0773d15ce?auto=format&fit=crop&w=1400&q=85",
      alt: "Curated event decor hire setup with plinths and flower arrangements",
    },
    sections: [
      {
        id: "flower-arrangements",
        title: "Flower Arrangements",
        subtitle: "Bespoke Floral Sculptures & Focal Centerpieces",
        description:
          "Couture artificial and fresh botanical arrangements crafted for maximum visual impact. Highlighted by our signature Red Romance collection.",
        featuredItem: {
          name: "Red Romance Collection",
          tagline: "Signature High-Impact Botanical Feature",
          description:
            "Deep crimson roses, velvety wine blooms, and lush trailing foliage designed to create dramatic romantic focal points.",
          options: [
            {
              name: "Grand Arrangement",
              specs: "2.1m Height · High-Impact Floor or Entrance Statement",
              desc: "Architectural 2.1m high floral tower ideal for ceremony altars, grand venue entrances, or stage framing.",
              image:
                "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=85",
            },
            {
              name: "Small Hanging Arrangement",
              specs: "Suspended Ceiling / Archway Accent",
              desc: "Elegantly proportioned hanging arrangement for arbors, backdrop corners, or ceiling light installations.",
              image:
                "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=85",
            },
            {
              name: "Surface Set",
              specs: "Table & Plinth Accent Collection",
              desc: "Coordinated trio of surface arrangements designed for welcome tables, cake plinths, and guest dining.",
              image:
                "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=85",
            },
          ],
        },
      },
      {
        id: "whimsical-garden",
        title: "Whimsical Garden Collection",
        subtitle: "Enchanted Lighting & Botanical Artistry",
        description:
          "Ethereal garden elements designed to infuse magical atmosphere and warm glow into evening receptions and cocktail hours.",
        featuredItem: {
          name: "Light Up Butterflies",
          tagline: "Illuminated Enchanted Sculpture Features",
          description:
            "Delicate, glowing butterfly sculptures crafted with soft interior LED lighting, ideal for garden paths, photo backdrops, and dancefloor corners.",
          gallery: [
            {
              src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
              title: "Illuminated Garden Pathway",
            },
            {
              src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85",
              title: "Glow Butterfly Canopy",
            },
            {
              src: "https://images.unsplash.com/photo-1682376932031-c62735732f6b?auto=format&fit=crop&w=800&q=85",
              title: "Ethereal Reception Lounge",
            },
          ],
        },
      },
      {
        id: "backdrops-collection",
        title: "Backdrops & Architectural Walls",
        subtitle: "Statement Focal Walls & Photo Backdrops",
        description:
          "Architectural arches, ribbed plaster panels, and curved walls designed to elevate stage areas, photo moments, and ceremony altars.",
        featuredItem: {
          name: "Ripple Arch Backdrop",
          dimensions: "2m Height × 1m Width",
          tagline: "Textured Ribbed Architectural Feature Wall",
          description:
            "A modern 2m x 1m ribbed arch backdrop in warm off-white plaster finish. Easily customized with floral sprays, neon signage, or vinyl monograms.",
          image:
            "https://images.unsplash.com/photo-1682376932031-c62735732f6b?auto=format&fit=crop&w=1000&q=85",
        },
      },
      {
        id: "plinths-props",
        title: "Plinths & Props Collection",
        subtitle: "Display Pedestals & Custom Furniture Hire",
        description:
          "Multi-height display pedestals, cake plinths, easels, and velvet seating crafted for cohesive event styling.",
        featuredItem: {
          name: "White Ripple Plinths",
          tagline: "Fluted Architectural Display Pedestals",
          description:
            "Classic white fluted ripple plinths available in sets of 3 varying heights (90cm, 70cm, 50cm). Perfect for displaying cakes, floral arrangements, or prize items.",
          image:
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
        },
      },
    ],
  },
  {
    id: "luxe-photobooth",
    type: "collection",
    brand: "Moments in Blooms",
    order: 2,
    featured: true,
    title: "Luxe Photobooth",
    navSub: "Premium Mirror Booth Experiences",
    navMeta: "3 Packages",
    description:
      "Premium mirror photobooth experiences designed for unforgettable celebrations.",
    tagline: "Premium Mirror Booths",
    coverImage: {
      src: "https://images.pexels.com/photos/8602142/pexels-photo-8602142.jpeg?auto=compress&cs=tinysrgb&w=1200&q=85",
      alt: "Minimal luxury photobooth studio backdrop with soft lighting",
    },
  },
  {
    id: "blissful-nest",
    type: "sub-brand",
    brand: "Moments in Blooms",
    order: 3,
    featured: true,
    title: "Blissful Nest",
    navSub: "Claw Machine Hire",
    navMeta: "4 Prize Options",
    description:
      "Beautifully presented claw machine experiences with curated prizes — a playful, polished highlight for your celebration.",
    tagline: "Playful Luxury",
    coverImage: {
      src: "https://images.unsplash.com/photo-1763076703663-8d28a686612f?auto=format&fit=crop&w=1200&q=85",
      alt: "Pastel claw machines filled with plush toys and gifts",
    },
    productCategories: [
      {
        id: "claw-machine-hire",
        type: "product-category",
        name: "Claw Machine Hire",
        description:
          "Beautifully presented claw machines filled with curated prizes — a playful yet polished highlight for your celebration.",
      },
    ],
  },
]);

export const serviceCollectionsShowcase = Object.freeze({
  subtitle: "Explore Our Services",
  title: "Bespoke Collections & Experiences",
  description:
    "Select a service category below to explore our decor hire catalogue, the Luxe Photobooth, and Blissful Nest claw machines.",
  subcategoryLabel: "Choose a Collection Here",
  allCollectionsLabel: "All Collections",
});

export const servicesExperienceTimeline = Object.freeze({
  subtitle: "Our Thoughtful Process",
  title: "The Journey to Your Unforgettable Event",
  description:
    "Six deliberate steps ensuring a calm, inspiring, and flawless creative partnership from start to finish.",
  steps: [
    {
      number: "01",
      title: "Discovery & Consultation",
      description:
        "We begin with an intimate discussion about your event vision, guest count, venue specs, and aesthetic aspirations.",
    },
    {
      number: "02",
      title: "Concept & Proposal",
      description:
        "Our design team curates a detailed visual moodboard, color palette, and itemized transparent investment proposal.",
    },
    {
      number: "03",
      title: "Curation & Preparation",
      description:
        "We secure custom props, order premium blooms directly from local growers, and design custom print graphics.",
    },
    {
      number: "04",
      title: "Precision Installation",
      description:
        "On event day, our styling crew arrives early to build floral clouds, set tables, and position lighting flawlessly.",
    },
    {
      number: "05",
      title: "The Celebration",
      description:
        "You step into an enchanting room where every detail is taken care of, allowing you to celebrate effortlessly.",
    },
    {
      number: "06",
      title: "Seamless Aftercare",
      description:
        "After the music stops, we manage complete pack-down, leaving the venue pristine with zero stress for you.",
    },
  ],
});

export const servicesGallery = Object.freeze({
  subtitle: "Visual Portfolio",
  title: "Curated Celebrations in Melbourne",
  description:
    "A glimpse into real weddings, milestones, and brand activations designed and styled by Moments in Blooms.",
  items: [
    // NOTE: Placeholder gallery titles — generic until the client provides
    // approved event names/venues, at which point this becomes dynamic CMS content.
    {
      id: "gal-1",
      variant: "large",
      title: "Elegant Wedding Reception",
      category: "Wedding Styling",
      image: {
        src: imageUrl(
          "https://images.unsplash.com/photo-1519741497674-611481863552",
          1600,
        ),
        alt: "Elegant wedding reception with candlelight and floral arrangements",
      },
    },
    {
      id: "gal-2",
      variant: "tall",
      title: "Romantic Reception Setup",
      category: "Milestone Celebration",
      image: {
        src: imageUrl(
          "https://images.unsplash.com/photo-1780593194924-35f0343e738b",
          1000,
        ),
        alt: "Champagne tower at a luxury event",
      },
    },
    {
      id: "gal-3",
      variant: "square",
      title: "Luxury Floral Installation",
      category: "Floral Installation",
      image: {
        src: imageUrl(
          "https://images.unsplash.com/photo-1682376932031-c62735732f6b",
          1000,
        ),
        alt: "Blush pink and cream floral arch detail",
      },
    },
    {
      id: "gal-4",
      variant: "square",
      title: "Modern Event Styling",
      category: "Interactive Experience",
      image: {
        src: imageUrl(
          "https://images.unsplash.com/photo-1661030220966-f1223eeafb5c",
          1000,
        ),
        alt: "Guests taking photos in a styled photobooth",
      },
    },
  ],
});

// NOTE: Placeholder testimonials — clearly fictional until the client supplies
// approved reviews, at which point this becomes dynamic CMS content.
export const servicesTestimonials = Object.freeze([
  {
    quote:
      "Moments in Blooms turned our venue into an ethereal dreamscape. The photobooth was a huge hit with our guests, and the floral styling was breathtaking!",
    name: "Emily & James",
    event: "Wedding Celebration",
    rating: 5,
    image: {
      src: imageUrl(
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        400,
      ),
      alt: "Portrait of Emily & James",
    },
  },
  {
    quote:
      "The attention to detail was beyond anything we imagined. The claw machine brought so much joy to our guests, and every styling detail felt magazine-worthy.",
    name: "Sophia & Daniel",
    event: "Engagement Party",
    rating: 5,
    image: {
      src: imageUrl(
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        400,
      ),
      alt: "Portrait of Sophia & Daniel",
    },
  },
  {
    quote:
      "Our celebration needed to feel luxurious, warm, and inviting. Moments in Blooms delivered a turnkey styling solution that blew our guests away.",
    name: "Olivia & Ethan",
    event: "Private Celebration",
    rating: 5,
    image: {
      src: imageUrl(
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        400,
      ),
      alt: "Portrait of Olivia & Ethan",
    },
  },
  {
    quote:
      "From concept to execution, the styling elevated our event beyond expectations. Every guest commented on the atmosphere and the level of polish.",
    name: "Harper Events",
    event: "Corporate Event",
    rating: 5,
    image: {
      src: imageUrl(
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        400,
      ),
      alt: "Portrait representing Harper Events",
    },
  },
]);

export const servicesCta = Object.freeze({
  eyebrow: "Reserve Your Celebration Date",
  title: "Let’s bring your dream event to life.",
  description:
    "Tell us about your date, venue, and vision. Our creative team will curate a bespoke proposal tailored to your celebration.",
  primaryCta: "Enquire Now",
  secondaryCta: "View Our Gallery",
  path: "/contact",
});
