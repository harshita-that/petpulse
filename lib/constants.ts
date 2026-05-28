// PetPulse — Constants & Content
// All copy, data, and configuration centralized here

export const SITE_CONFIG = {
  name: "PetPulse",
  tagline: "AI-powered pet health tracking",
  description:
    "AI-assisted pet health tracking through simple photo check-ins between vet visits.",
  url: "https://petpulse.ai",
} as const;

export const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#scan-demo" },
  { label: "Timeline", href: "#timeline" },
  { label: "Pricing", href: "#pricing" },
] as const;

export const HERO_CONTENT = {
  brand: "petpulse",
  headline: "notice health changes\nbefore they become emergencies",
  subtext:
    "AI-assisted pet health tracking through simple photo check-ins between vet visits.",
  cta: {
    primary: "Start free",
    secondary: "Watch demo",
  },
} as const;

export const SMALL_CHANGES_CONTENT = {
  headline: "Small changes matter",
  subtext: "Most issues don't appear overnight. They build slowly.",
  comparisons: [
    {
      id: "eyes",
      label: "Eye Clarity",
      before: "Clear, bright cornea",
      after: "Early cloudiness detected",
      annotation: "Corneal opacity +12%",
      severity: "moderate",
    },
    {
      id: "gums",
      label: "Gum Health",
      before: "Healthy pink gums",
      after: "Early inflammation signs",
      annotation: "Gingival index elevated",
      severity: "mild",
    },
    {
      id: "coat",
      label: "Coat Condition",
      before: "Glossy, even coat",
      after: "Subtle thinning pattern",
      annotation: "Fur density -8% over 6 weeks",
      severity: "early",
    },
  ],
} as const;

export const SCAN_DEMO_CONTENT = {
  headline: "See what AI sees",
  subtext: "Upload a photo. Get instant health insights.",
  dropzoneText: "Drop a pet photo or click to scan",
  scanRegions: [
    {
      id: "eyes",
      label: "Eye Health",
      confidence: 94,
      status: "Healthy",
      x: 35,
      y: 25,
      detail: "Clear cornea, normal pupil response",
    },
    {
      id: "coat",
      label: "Coat Analysis",
      confidence: 91,
      status: "Good",
      x: 55,
      y: 50,
      detail: "Even distribution, healthy sheen",
    },
    {
      id: "posture",
      label: "Body Posture",
      confidence: 88,
      status: "Normal",
      x: 50,
      y: 70,
      detail: "Balanced weight distribution",
    },
    {
      id: "ears",
      label: "Ear Condition",
      confidence: 96,
      status: "Healthy",
      x: 25,
      y: 18,
      detail: "No inflammation or discharge",
    },
  ],
  healthScore: 92,
} as const;

export const TIMELINE_DATA = [
  {
    week: "Week 1",
    title: "First Scan",
    description: "Baseline health profile established",
    score: 92,
    metrics: {
      weight: "12.4 kg",
      activity: "High",
      appetite: "Normal",
      mood: "Happy",
    },
    highlight: "Baseline established",
  },
  {
    week: "Week 4",
    title: "Subtle Shift",
    description: "AI detects minor coat density change",
    score: 87,
    metrics: {
      weight: "12.2 kg",
      activity: "Moderate",
      appetite: "Slight decrease",
      mood: "Calm",
    },
    highlight: "Coat density -3%",
  },
  {
    week: "Week 10",
    title: "Early Alert",
    description: "Vet visit recommended — potential allergy detected",
    score: 78,
    metrics: {
      weight: "11.8 kg",
      activity: "Low",
      appetite: "Decreased",
      mood: "Lethargic",
    },
    highlight: "Vet visit recommended",
  },
] as const;

export const PRICING_TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic health tracking",
    features: [
      "2 pet profiles",
      "Monthly photo check-ins",
      "Basic health score",
      "Community access",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Plus",
    price: "$9",
    period: "per month",
    description: "Advanced insights for proactive pet parents",
    features: [
      "5 pet profiles",
      "Weekly photo check-ins",
      "Advanced AI analysis",
      "Health trend reports",
      "Vet sharing portal",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$19",
    period: "per month",
    description: "Complete care for multi-pet families",
    features: [
      "Unlimited pet profiles",
      "Daily photo check-ins",
      "Real-time health monitoring",
      "Predictive health alerts",
      "Vet direct connect",
      "Family sharing",
      "API access",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
] as const;

export const EMOTIONAL_CONTENT = {
  line1: "Because 'Is she okay?'",
  line2: "is a question every pet owner asks.",
} as const;

export const FINAL_CTA_CONTENT = {
  headline: "Start noticing the things\nyou normally miss.",
  subtext: "Join the waitlist for early access.",
  placeholder: "Enter your email",
  cta: "Join waitlist",
} as const;
