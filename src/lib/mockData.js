// ---------------------------------------------------------------------------
// DropPilot — product catalog (mock)
// Stands in for what the research agent would gather from Google Trends,
// Amazon/Keepa, AliExpress/Apify, TikTok, and competitor storefronts.
// ---------------------------------------------------------------------------

export const CATEGORIES = [
  { id: "Beauty & Personal Care", label: "Beauty & Personal Care", emoji: "💄" },
  { id: "Health & Wellness", label: "Health & Wellness", emoji: "🧘" },
  { id: "Fitness", label: "Fitness", emoji: "🏋️" },
  { id: "Home & Decor", label: "Home & Decor", emoji: "🛋️" },
  { id: "Kitchen", label: "Kitchen", emoji: "🍳" },
  { id: "Pet Supplies", label: "Pet Supplies", emoji: "🐾" },
  { id: "Electronics", label: "Electronics", emoji: "🎧" },
  { id: "Auto Accessories", label: "Auto Accessories", emoji: "🚗" },
  { id: "Baby & Kids", label: "Baby & Kids", emoji: "🍼" },
  { id: "Office & Desk", label: "Office & Desk", emoji: "🖥️" },
];

export const MARKETS = [
  { id: "PK", label: "Pakistan", emoji: "🇵🇰" },
  { id: "US", label: "United States", emoji: "🇺🇸" },
  { id: "GLOBAL", label: "Global", emoji: "🌍" },
];

export const PRICE_CAPS = [
  { id: 0, label: "Any price" },
  { id: 25, label: "Under $25" },
  { id: 50, label: "Under $50" },
  { id: 100, label: "Under $100" },
];

export const PRODUCTS = [
  {
    id: "cable-tray", name: "Under-Desk Cable Organizer Tray", niche: "Office & Desk", image: "🖥️",
    supplierCost: 3.1, suggestedPrice: 21.99,
    trend: [40, 42, 44, 47, 50, 54, 58, 62, 66, 70, 75, 80], trendLabel: "Rising steadily",
    sellerCount: 7, competitionDensity: 44, incumbentRating: 4.3, monthlySearchVolume: 61000, adSaturation: 36, reviewCount: 2600,
    complaintPatterns: [
      { label: "adhesive weak on some desks", share: 22, severity: "medium" },
      { label: "too small for thick cables", share: 16, severity: "low" },
    ],
    positives: ["Work-from-home trend still growing", "Very high profit margin", "Easy to demo in a short video"],
    angle: "Ride the tidy-desk / work-from-home wave with a clean before-and-after video.",
    sources: ["Google Trends", "TikTok", "Competitor stores"], verdict: "strong",
  },
  {
    id: "car-headrest-hook", name: "Car Headrest Storage Hooks (4-pack)", niche: "Auto Accessories", image: "🚗",
    supplierCost: 1.6, suggestedPrice: 12.99,
    trend: [40, 41, 43, 44, 46, 48, 51, 53, 56, 58, 61, 64], trendLabel: "Slow steady rise",
    sellerCount: 6, competitionDensity: 46, incumbentRating: 4.2, monthlySearchVolume: 39000, adSaturation: 38, reviewCount: 2450,
    complaintPatterns: [
      { label: "snaps under heavy bags", share: 25, severity: "medium" },
      { label: "doesn't fit every headrest", share: 20, severity: "low" },
    ],
    positives: ["Very high margin", "Easy to sell as a multi-pack", "Low competition and ad cost"],
    angle: "Sell as a 4-pack bundle — tiny cost, easy add-on purchase, low ad competition.",
    sources: ["Amazon", "AliExpress", "Competitor stores"], verdict: "strong",
  },
  {
    id: "pet-hair-remover", name: "Reusable Pet Hair Remover Roller", niche: "Pet Supplies", image: "🐾",
    supplierCost: 2.9, suggestedPrice: 16.99,
    trend: [44, 46, 45, 48, 50, 53, 57, 60, 63, 67, 71, 76], trendLabel: "Rising 12 months",
    sellerCount: 9, competitionDensity: 58, incumbentRating: 4.0, monthlySearchVolume: 74000, adSaturation: 49, reviewCount: 3380,
    complaintPatterns: [
      { label: "misses short, embedded hair", share: 31, severity: "medium" },
      { label: "compartment hard to empty", share: 22, severity: "low" },
    ],
    positives: ["High margin", "People buy multiples (sofa, car, bed)", "Low ad saturation"],
    angle: "Bundle for sofa + car + bed. High repeat-purchase potential, cheap to source.",
    sources: ["AliExpress", "TikTok", "Google Trends"], verdict: "strong",
  },
  {
    id: "resistance-bands", name: "Resistance Bands Set (5-pack)", niche: "Fitness", image: "🏋️",
    supplierCost: 4.0, suggestedPrice: 22.5,
    trend: [50, 51, 53, 54, 57, 59, 61, 63, 66, 68, 71, 74], trendLabel: "Rising with New-Year demand",
    sellerCount: 14, competitionDensity: 66, incumbentRating: 4.1, monthlySearchVolume: 165000, adSaturation: 62, reviewCount: 8800,
    complaintPatterns: [
      { label: "bands snap over time", share: 28, severity: "medium" },
      { label: "smell of rubber out of box", share: 18, severity: "low" },
    ],
    positives: ["Huge, steady search volume", "Strong January spike each year", "Good margin"],
    angle: "Lean into home-workout content; time a push for the New-Year resolution wave.",
    sources: ["Google Trends", "Amazon", "TikTok"], verdict: "test",
  },
  {
    id: "ice-roller", name: "Ice Roller Face Massager", niche: "Beauty & Personal Care", image: "🧊",
    supplierCost: 2.2, suggestedPrice: 15.99,
    trend: [42, 45, 47, 51, 54, 58, 62, 65, 69, 72, 76, 81], trendLabel: "Rising fast",
    sellerCount: 11, competitionDensity: 61, incumbentRating: 3.8, monthlySearchVolume: 92000, adSaturation: 58, reviewCount: 4100,
    complaintPatterns: [
      { label: "leaks gel after a few weeks", share: 26, severity: "medium" },
      { label: "doesn't stay cold long", share: 21, severity: "low" },
    ],
    positives: ["Very photogenic for short video", "Strong margin", "Popular skincare trend"],
    angle: "Skincare-routine videos convert well; source a leak-proof version to beat the #1 gripe.",
    sources: ["TikTok", "AliExpress", "Google Trends"], verdict: "test",
  },
  {
    id: "posture-corrector", name: "Adjustable Posture Corrector", niche: "Health & Wellness", image: "🧍",
    supplierCost: 4.2, suggestedPrice: 24.99,
    trend: [38, 41, 40, 46, 52, 55, 61, 66, 72, 78, 85, 91], trendLabel: "Rising 12 months",
    sellerCount: 12, competitionDensity: 74, incumbentRating: 3.6, monthlySearchVolume: 148000, adSaturation: 68, reviewCount: 5120,
    complaintPatterns: [
      { label: "uncomfortable after 30 minutes", share: 41, severity: "high" },
      { label: "sizing runs small", share: 27, severity: "medium" },
      { label: "velcro wears out", share: 18, severity: "medium" },
    ],
    positives: ["Big and growing demand", "Discreet under clothing"],
    angle: "Include a simple sizing guide and a 'break-in schedule' card to soften the comfort complaint.",
    sources: ["Google Trends", "TikTok"], verdict: "test",
  },
  {
    id: "slow-feeder-bowl", name: "Slow-Feeder Dog Bowl", niche: "Pet Supplies", image: "🐕",
    supplierCost: 2.6, suggestedPrice: 17.5,
    trend: [46, 47, 49, 50, 52, 55, 57, 59, 62, 64, 67, 70], trendLabel: "Rising steadily",
    sellerCount: 10, competitionDensity: 55, incumbentRating: 4.2, monthlySearchVolume: 58000, adSaturation: 47, reviewCount: 3020,
    complaintPatterns: [
      { label: "slides on the floor", share: 24, severity: "medium" },
      { label: "hard to clean grooves", share: 19, severity: "low" },
    ],
    positives: ["Solves a real vet-recommended problem", "Healthy margin", "Emotional pet-owner appeal"],
    angle: "Health-angle marketing (stops bloating/gulping). Add a non-slip base to beat the top complaint.",
    sources: ["Amazon", "Google Trends", "Competitor stores"], verdict: "test",
  },
  {
    id: "baby-bib", name: "Silicone Baby Bib with Food Catcher", niche: "Baby & Kids", image: "🍼",
    supplierCost: 2.3, suggestedPrice: 14.99,
    trend: [52, 52, 53, 54, 54, 56, 57, 58, 59, 60, 62, 63], trendLabel: "Flat, steady demand",
    sellerCount: 13, competitionDensity: 60, incumbentRating: 4.4, monthlySearchVolume: 47000, adSaturation: 50, reviewCount: 6100,
    complaintPatterns: [
      { label: "neck strap too tight for toddlers", share: 20, severity: "medium" },
      { label: "retains smell", share: 15, severity: "low" },
    ],
    positives: ["Evergreen, reliable demand", "High incumbent ratings = happy buyers", "Repeat gifting purchase"],
    angle: "Evergreen basic — steady rather than viral. Compete on colors, bundles and reviews.",
    sources: ["Amazon", "Competitor stores"], verdict: "test",
  },
  {
    id: "car-charger-mount", name: "Magnetic Wireless Car Charger Mount", niche: "Electronics", image: "🔌",
    supplierCost: 6.8, suggestedPrice: 29.99,
    trend: [48, 50, 51, 53, 55, 56, 58, 60, 61, 63, 65, 67], trendLabel: "Steady rise",
    sellerCount: 19, competitionDensity: 78, incumbentRating: 3.7, monthlySearchVolume: 134000, adSaturation: 72, reviewCount: 7400,
    complaintPatterns: [
      { label: "charges slowly / overheats", share: 33, severity: "high" },
      { label: "magnet weak with heavy phones", share: 24, severity: "medium" },
    ],
    positives: ["Strong, consistent demand", "Higher price point"],
    angle: "Demand is real but the market is crowded and quality complaints are high — tread carefully.",
    sources: ["Amazon", "AliExpress"], verdict: "caution",
  },
  {
    id: "pepper-grinder", name: "Electric Salt & Pepper Grinder Set", niche: "Kitchen", image: "🧂",
    supplierCost: 5.4, suggestedPrice: 26.99,
    trend: [44, 46, 47, 49, 51, 53, 54, 56, 58, 60, 61, 63], trendLabel: "Gentle rise",
    sellerCount: 12, competitionDensity: 59, incumbentRating: 3.9, monthlySearchVolume: 68000, adSaturation: 52, reviewCount: 4300,
    complaintPatterns: [
      { label: "grinder jams with coarse salt", share: 27, severity: "medium" },
      { label: "battery door flimsy", share: 19, severity: "low" },
    ],
    positives: ["Great gift-season product", "Nice margin at a mid price", "Demo-friendly (one-hand grinding)"],
    angle: "Position as a gift set; push hard in the Nov–Dec gifting window.",
    sources: ["Amazon", "Competitor stores", "TikTok"], verdict: "test",
  },
  {
    id: "mini-projector", name: "Portable Mini Projector 1080p", niche: "Electronics", image: "📽️",
    supplierCost: 31.0, suggestedPrice: 89.99,
    trend: [55, 57, 58, 60, 59, 61, 63, 64, 66, 68, 69, 71], trendLabel: "Steady rise",
    sellerCount: 21, competitionDensity: 82, incumbentRating: 3.4, monthlySearchVolume: 210000, adSaturation: 77, reviewCount: 9900,
    complaintPatterns: [
      { label: "much dimmer than advertised", share: 47, severity: "high" },
      { label: "loud fan noise", share: 26, severity: "medium" },
      { label: "stopped working within a month", share: 19, severity: "high" },
    ],
    positives: ["High price = fewer sales needed", "Strong gift-season demand"],
    angle: "Tempting high ticket, but heavy defect complaints make returns a real headache.",
    sources: ["Amazon", "AliExpress"], verdict: "caution",
  },
  {
    id: "heatless-curl", name: "Heatless Curling Rod Set", niche: "Beauty & Personal Care", image: "💁",
    supplierCost: 1.8, suggestedPrice: 13.5,
    trend: [30, 36, 45, 58, 70, 80, 74, 63, 54, 47, 42, 39], trendLabel: "Spiked, now fading",
    sellerCount: 22, competitionDensity: 72, incumbentRating: 3.9, monthlySearchVolume: 88000, adSaturation: 70, reviewCount: 5600,
    complaintPatterns: [
      { label: "curls drop out quickly", share: 30, severity: "medium" },
      { label: "rod too short for long hair", share: 22, severity: "low" },
    ],
    positives: ["Cheap to source", "Was a viral hit"],
    angle: "The viral wave has already peaked and is fading — you'd be arriving late.",
    sources: ["TikTok", "AliExpress"], verdict: "pass",
  },
  {
    id: "collagen-cup", name: "Self-Stirring Collagen Coffee Mug", niche: "Kitchen", image: "☕",
    supplierCost: 3.4, suggestedPrice: 18.5,
    trend: [30, 33, 39, 48, 60, 71, 66, 58, 50, 44, 40, 37], trendLabel: "Spiked, then faded",
    sellerCount: 14, competitionDensity: 63, incumbentRating: 3.9, monthlySearchVolume: 52000, adSaturation: 55, reviewCount: 1870,
    complaintPatterns: [
      { label: "motor dies after a few weeks", share: 38, severity: "high" },
      { label: "not dishwasher safe despite listing", share: 24, severity: "medium" },
    ],
    positives: ["Novelty gift appeal", "Good margin"],
    angle: "The trend already peaked and quality complaints are high — better to skip.",
    sources: ["TikTok", "AliExpress"], verdict: "pass",
  },
  {
    id: "led-strip", name: "Music-Sync RGB LED Strip (5m)", niche: "Home & Decor", image: "💡",
    supplierCost: 6.5, suggestedPrice: 21.99,
    trend: [80, 78, 74, 70, 66, 60, 55, 52, 49, 47, 44, 42], trendLabel: "Cooling off",
    sellerCount: 31, competitionDensity: 91, incumbentRating: 4.1, monthlySearchVolume: 301000, adSaturation: 88, reviewCount: 22400,
    complaintPatterns: [
      { label: "adhesive fails on textured walls", share: 34, severity: "medium" },
      { label: "app is buggy and ad-heavy", share: 29, severity: "medium" },
    ],
    positives: ["Cheap to source", "Impulse-buy appeal"],
    angle: "Extremely saturated and demand is falling — very hard to win on ads now.",
    sources: ["Amazon", "AliExpress"], verdict: "pass",
  },
  {
    id: "sunset-lamp", name: "Sunset Projection Lamp", niche: "Home & Decor", image: "🌇",
    supplierCost: 4.6, suggestedPrice: 19.99,
    trend: [70, 74, 78, 80, 72, 62, 54, 49, 45, 42, 40, 38], trendLabel: "Spiked, now declining",
    sellerCount: 26, competitionDensity: 84, incumbentRating: 4.0, monthlySearchVolume: 120000, adSaturation: 80, reviewCount: 9100,
    complaintPatterns: [
      { label: "colors weaker than in videos", share: 28, severity: "medium" },
      { label: "short cable", share: 17, severity: "low" },
    ],
    positives: ["Very photogenic", "Cheap to source"],
    angle: "Had its viral moment last year; interest and margins are both under pressure now.",
    sources: ["TikTok", "AliExpress"], verdict: "pass",
  },
  {
    id: "smart-rope", name: "Smart Skipping Rope (counts jumps)", niche: "Fitness", image: "🤸",
    supplierCost: 5.2, suggestedPrice: 24.0,
    trend: [48, 49, 50, 52, 53, 54, 56, 57, 58, 60, 61, 63], trendLabel: "Slow, steady rise",
    sellerCount: 9, competitionDensity: 52, incumbentRating: 4.0, monthlySearchVolume: 43000, adSaturation: 44, reviewCount: 2100,
    complaintPatterns: [
      { label: "counter miscounts sometimes", share: 24, severity: "medium" },
      { label: "battery not replaceable", share: 18, severity: "low" },
    ],
    positives: ["Fun gadget angle", "Moderate competition", "Healthy margin"],
    angle: "Gadget-y fitness angle with room to stand out; content-friendly for short video.",
    sources: ["Google Trends", "TikTok", "Amazon"], verdict: "test",
  },
];

// Scoring rubric — the five things that decide a good product. Weights sum to 1.
export const RUBRIC = [
  { key: "demand", label: "Demand", weight: 0.28, hint: "Is interest growing?" },
  { key: "competition", label: "Competition", weight: 0.22, hint: "How crowded is it?" },
  { key: "margin", label: "Profit", weight: 0.22, hint: "What you keep per sale" },
  { key: "differentiation", label: "Standout", weight: 0.16, hint: "Can you improve on it?" },
  { key: "risk", label: "Reliability", weight: 0.12, hint: "Quality / returns risk" },
];
