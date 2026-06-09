// ─── Navigation ─────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#scan-demo" },
  { label: "Timeline", href: "#timeline" },
  { label: "Pricing", href: "#pricing" },
] as const;

// ─── Hero ───────────────────────────────────────────
export const HERO_CONTENT = {
  brand: "petpulse",
  headline: ["Notice what changes.", "Before it becomes", "a problem."],
  subtext:
    "AI-assisted health check-ins between vet visits — through photos you already take.",
  cta: { primary: "Start for free", secondary: "See how it works" },
  photoCards: [
    { src: "/images/hero-dog.png", alt: "Golden retriever", chip: "Dental ✓", rotation: -6 },
    { src: "/images/dog-eye.png", alt: "Dog eye health", chip: "Eyes ✓", rotation: 0 },
    { src: "/images/dog-posture.png", alt: "Dog posture", chip: "Coat ✓", rotation: 5 },
  ],
};

export const BREED_MARQUEE = [
  { name: "Golden Retriever", emoji: "🐕", note: "Monitor hip joints after age 5" },
  { name: "Labrador", emoji: "🐶", note: "Watch for eye cloudiness early" },
  { name: "Persian Cat", emoji: "🐱", note: "Regular dental checks essential" },
  { name: "Corgi", emoji: "🐾", note: "Back health is critical" },
  { name: "Beagle", emoji: "🐕‍🦺", note: "Ear infections common — check weekly" },
  { name: "Dachshund", emoji: "🌭", note: "Spine health monitoring recommended" },
  { name: "Maine Coon", emoji: "🐈", note: "Heart screening after age 3" },
  { name: "German Shepherd", emoji: "🦮", note: "Hip dysplasia — early detection matters" },
  { name: "Poodle", emoji: "🐩", note: "Skin & coat require close monitoring" },
  { name: "Siamese", emoji: "😸", note: "Dental disease prone — scan monthly" },
] as const;

// ─── Small Changes ──────────────────────────────────
export const SMALL_CHANGES_CONTENT = {
  headline: "Most health changes whisper before they shout.",
  cards: [
    {
      id: "eyes",
      image: "/images/dog-eye.png",
      label: "Slight cloudiness. Easy to miss.",
    },
    {
      id: "gums",
      image: "/images/dog-gums.png",
      label: "Pale gums. Often ignored.",
    },
    {
      id: "posture",
      image: "/images/dog-posture.png",
      label: "Subtle posture shift. Joint pain starting.",
    },
  ],
};

// ─── Scan Demo ──────────────────────────────────────
export const SCAN_DEMO_CONTENT = {
  headline: "See it in action",
  subtext: "Upload a photo. Get instant AI-powered health insights.",
  image: "/images/scan-dog.png",
  thinkingTexts: [
    "Checking retinal clarity...",
    "Measuring gum saturation...",
    "Mapping coat density...",
  ],
  hotspots: [
    { id: "eye", x: 35, y: 30, label: "Eye clarity", status: "Good ✓", color: "#2D9B6F" },
    { id: "gum", x: 50, y: 65, label: "Gum color", status: "Monitor ⚠", color: "#F4845F" },
    { id: "coat", x: 72, y: 42, label: "Coat texture", status: "Healthy ✓", color: "#2D9B6F" },
  ],
  healthScore: 87,
};

// ─── Timeline ───────────────────────────────────────
export const TIMELINE_DATA = [
  {
    week: "Week 1",
    date: "Jan 6",
    image: "/images/hero-dog.png",
    sparkline: [82, 84, 83, 85, 87, 86, 88],
    metrics: [
      { label: "Dental", score: 89 },
      { label: "Eyes", score: 95 },
      { label: "Coat", score: 91 },
    ],
    trend: "+8pts this month",
    trendUp: true,
  },
  {
    week: "Week 4",
    date: "Jan 27",
    image: "/images/dog-eye.png",
    sparkline: [88, 87, 85, 86, 84, 83, 82],
    metrics: [
      { label: "Dental", score: 85 },
      { label: "Eyes", score: 88 },
      { label: "Coat", score: 90 },
    ],
    trend: "−3pts slight dip",
    trendUp: false,
  },
  {
    week: "Week 8",
    date: "Feb 17",
    image: "/images/scan-dog.png",
    sparkline: [82, 84, 87, 89, 91, 92, 94],
    metrics: [
      { label: "Dental", score: 92 },
      { label: "Eyes", score: 96 },
      { label: "Coat", score: 93 },
    ],
    trend: "+12pts recovery",
    trendUp: true,
  },
] as const;

// ─── Emotional ──────────────────────────────────────
export const EMOTIONAL_CONTENT = {
  line1: "Because 'Is she okay?'",
  line2: "deserves a real answer.",
  bgImage: "/images/emotional-bg.png",
};

// ─── Pricing ────────────────────────────────────────
export const PRICING_TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "mo",
    description: "Get started with basic health insights.",
    features: ["5 scans per month", "2 pet profiles", "Basic health scores", "Scan history"],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Plus",
    price: "$9",
    period: "mo",
    description: "Smarter monitoring for dedicated pet parents.",
    features: [
      "Unlimited scans",
      "5 pet profiles",
      "Breed-specific monitoring",
      "Vet chat (3x/month)",
      "Health trend alerts",
      "Export reports",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$19",
    period: "mo",
    description: "Complete care for your whole family of pets.",
    features: [
      "Everything in Plus",
      "Unlimited pet profiles",
      "Priority vet chat",
      "Insurance claim reports",
      "Family sharing",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
] as const;

// ─── Final CTA ──────────────────────────────────────
export const FINAL_CTA_CONTENT = {
  headline: "Start noticing the things you normally miss.",
  placeholder: "Enter your email",
  cta: "Start for free",
  disclaimer: "No commitment. Cancel anytime. First scan free.",
};

// ─── Toast notifications ────────────────────────────
export const TOAST_MESSAGES = [
  { emoji: "🐕", title: "Max completed his weekly scan", body: "All clear — no changes detected", accent: "#2D9B6F" },
  { emoji: "🐱", title: "Luna's dental score improved 12pts", body: "Keep up the brushing routine!", accent: "#2D9B6F" },
  { emoji: "⚠️", title: "Buddy's gum color needs monitoring", body: "Tap to see full report", accent: "#F4845F" },
  { emoji: "🎉", title: "Charlie — 6 months perfect scores!", body: "Share your streak →", accent: "#2D9B6F" },
] as const;

// ─── Stats ──────────────────────────────────────────
export const STATS = [
  { value: 94, suffix: "%", label: "Detection accuracy" },
  { value: 2.3, suffix: "s", label: "Average scan time" },
  { value: 1200, prefix: "$", label: "Avg savings per catch" },
  { value: 50000, suffix: "+", label: "Pets monitored" },
] as const;
