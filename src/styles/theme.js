const nearWhite = "#FEFEFE"
const white = "#FFFFFF"
const charcoal = "#1A1A1A"
const greige = "#D6C9C1"
const taupe = "#A58974"
const taupeText = "#7D5F49"
const gold = "#C89A5E"
const goldLight = "#D8BC8E"
const softNeutral = "#EFE9E3"

const garamond = "'Garamond', serif"
const montserrat = "'Montserrat', 'Segoe UI', sans-serif"

const theme = {
  colors: {
    // Client-approved palette
    nearWhite: nearWhite,
    white: white,
    charcoal: charcoal,
    greige: greige,
    taupe: taupe,
    gold: gold,
    goldLight: goldLight,
    // Explicit semantic accents
    accentGold: gold,
    accentTaupe: taupe,
    taupeText: taupeText,
    // Legacy names remapped to the approved palette (no cream/pink)
    background: nearWhite,
    surface: white,
    ink: charcoal,
    ivory: greige,
    beige: greige,
    blush: taupe,
    blushSoft: softNeutral,
    // Semantic roles
    primary: charcoal,
    primaryHover: taupeText,
    hover: "#000000",
    secondary: "#F1ECE6",
    textPrimary: charcoal,
    textSecondary: "#6E6761",
    border: "#E6DFD7",
    success: "#3F7D54",
    warning: "#C98A2E",
    danger: "#C94A46",
    info: "#3B6E8F",
    focus: taupe,
    // Semantic status tones (shared by badges, toasts and alerts)
    status: {
      success: "#3F7D54",
      warning: "#C98A2E",
      danger: "#C94A46",
      info: "#3B6E8F",
      neutral: "#6E6761",
      gold: "#C89A5E",
    },
  },
  typography: {
    headingFont: garamond,
    bodyFont: garamond,
    uiFont: montserrat,
    baseSize: "16px",
    bodyLineHeight: 1.6,
    headingLineHeight: 1.15,
    letterSpacing: "0.01em",
  },
  spacing: {
    xxs: "0.25rem",
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
    section: "5rem",
    sectionCompact: "clamp(4rem, 8vw, 6rem)",
    sectionStandard: "clamp(5rem, 10vw, 8rem)",
    sectionGenerous: "clamp(6rem, 12vw, 10rem)",
  },
  radii: {
    sm: "0.375rem",
    md: "0.75rem",
    lg: "1.25rem",
    xl: "1.75rem",
    "2xl": "2.25rem",
    pill: "999px",
    // Admin control radius — replaces the marketing-style pill for application UI
    control: "0.5rem",
  },
  transitions: {
    fast: "150ms ease",
    standard: "250ms ease",
    slow: "400ms ease",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  shadows: {
    soft: "0 12px 36px rgba(26, 26, 26, 0.08)",
    card: "0 4px 18px rgba(26, 26, 26, 0.06)",
    focus: "0 0 0 4px rgba(165, 137, 116, 0.28)",
    header: "0 8px 30px rgba(26, 26, 26, 0.07)",
    ctaHover: "0 4px 18px rgba(26, 26, 26, 0.25)",
    imageCard: "0 18px 45px rgba(26, 26, 26, 0.16)",
    dialog: "0 24px 64px rgba(26, 26, 26, 0.18)",
    drawer: "0 0 48px rgba(26, 26, 26, 0.22)",
    popover: "0 8px 24px rgba(26, 26, 26, 0.12)",
  },
  gradients: {
    darkSection: "linear-gradient(135deg, #262626 0%, #1A1A1A 100%)",
    packagePopular: "linear-gradient(180deg, #2A2622 0%, #141210 100%)",
    blissNestPanel: "linear-gradient(160deg, #EFE9E3 0%, #FEFEFE 45%, #D6C9C1 100%)",
    storyHero: "linear-gradient(135deg, #FEFEFE 0%, #FFFFFF 100%)",
    exclusiveFrames: "linear-gradient(135deg, #1A1A1A 0%, #262422 100%)",
    redRomance:
      "linear-gradient(135deg, rgba(120, 20, 50, 0.04) 0%, rgba(255, 255, 255, 0.9) 100%)",
  },
  surfaces: {
    headerScrolled: "rgba(254, 254, 254, 0.88)",
    menu: nearWhite,
    overlay: "rgba(26, 26, 26, 0.4)",
  },
  effects: {
    headerBlur: "16px",
    menuBackdropBlur: "8px",
    heroOverlay: "rgba(254, 254, 254, 0.74)",
    ctaGhostHover: "rgba(254, 254, 254, 0.12)",
    watermarkOpacity: 0.03,
  },
  layers: {
    header: 100,
    menuBackdrop: 110,
    menu: 120,
    backToTop: 90,
    socialContact: 80,
    loading: 200,
  },
  controls: {
    height: {
      sm: "2.25rem",
      md: "2.75rem",
      lg: "3.25rem",
    },
    tapTarget: "44px",
    dotHitTarget: "44px",
    backToTopSize: "48px",
    socialContactSize: "3.5rem",
  },
  layout: {
    containerMaxWidth: "1200px",
    contentMaxWidth: "760px",
    adminSidebarWidth: "260px",
    adminContentMaxWidth: "72rem",
    adminPageGap: "2.5rem",
    adminCardPadding: "1.5rem",
    headerHeight: "5rem",
    mobileHeaderHeight: "4.5rem",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    tabletMin: "769px",
    desktop: "1024px",
    wide: "1280px",
  },
}

export default theme
