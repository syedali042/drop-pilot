import { PRODUCTS, RUBRIC } from "./mockData";

// ===========================================================================
// Helpers
// ===========================================================================
function slope(series) {
  const n = series.length;
  const first = (series[0] + series[1]) / 2;
  const last = (series[n - 1] + series[n - 2]) / 2;
  return (last - first) / Math.max(first, last, 1);
}
function clamp(n) {
  return Math.max(0, Math.min(100, Math.round(n)));
}
function trendKind(series) {
  const s = slope(series);
  const max = Math.max(...series);
  const peakIdx = series.indexOf(max);
  const interiorPeak = peakIdx >= 2 && peakIdx <= series.length - 3;
  const fellFromPeak = series[series.length - 1] < max * 0.8;
  if (interiorPeak && fellFromPeak) return "spiked";
  if (s > 0.12) return "rising";
  if (s < -0.08) return "cooling";
  return "flat";
}
function fmtVol(v) {
  return v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`;
}

// ===========================================================================
// Scoring — five criteria, each 0-100, combined by rubric weight
// ===========================================================================
export function scoreProduct(p) {
  const s = slope(p.trend);
  const volFactor = Math.min(1, p.monthlySearchVolume / 200000);
  const demand = clamp(50 + s * 55 + volFactor * 18 - 9);
  const competition = clamp(100 - p.competitionDensity * 0.85 - p.adSaturation * 0.15);
  const marginPct = (p.suggestedPrice - p.supplierCost) / p.suggestedPrice;
  const margin = clamp(marginPct * 118 - 8);

  const high = p.complaintPatterns.filter((c) => c.severity === "high");
  const solvable = p.complaintPatterns.filter((c) => c.severity !== "high");
  const differentiation = clamp(38 + solvable.length * 14 - high.length * 6);
  const defectShare = high.reduce((a, c) => a + c.share, 0);
  const risk = clamp(100 - defectShare * 1.25);

  const scores = { demand, competition, margin, differentiation, risk };
  const total = Math.round(RUBRIC.reduce((acc, r) => acc + scores[r.key] * r.weight, 0));
  return {
    scores, total,
    marginPct: Math.round(marginPct * 100),
    unitProfit: +(p.suggestedPrice - p.supplierCost).toFixed(2),
    slopePct: Math.round(s * 100),
    kind: trendKind(p.trend),
    defectShare: Math.round(defectShare),
    high, solvable,
  };
}

// ===========================================================================
// Plain-English analysis — this is what the client actually reads
// ===========================================================================
function grade(total) {
  if (total >= 74) return { letter: "A", label: "Excellent opportunity", tone: "emerald" };
  if (total >= 64) return { letter: "B", label: "Good opportunity", tone: "sky" };
  if (total >= 55) return { letter: "C", label: "Worth a test", tone: "amber" };
  return { letter: "D", label: "Better options exist", tone: "rose" };
}
const verdictAction = {
  strong: "Strong pick — a great place to start testing.",
  test: "Promising — worth a small, careful test run.",
  caution: "Only if you're ready to handle returns and quality issues.",
  pass: "We'd skip this one for now — the numbers don't favor you.",
};

function metricWord(key, score, m) {
  switch (key) {
    case "demand":
      return m.kind === "rising" ? "Growing fast" : m.kind === "cooling" ? "Fading" : m.kind === "spiked" ? "Past its peak" : "Steady";
    case "competition":
      return score >= 65 ? "Wide open" : score >= 45 ? "Manageable" : score >= 30 ? "Competitive" : "Very crowded";
    case "margin":
      return m.marginPct >= 75 ? "Excellent" : m.marginPct >= 55 ? "Healthy" : m.marginPct >= 40 ? "Slim" : "Thin";
    case "differentiation":
      return score >= 65 ? "Easy to improve" : score >= 45 ? "Some room" : "Hard to stand out";
    case "risk":
      return score >= 75 ? "Low risk" : score >= 55 ? "Some risk" : "High risk";
    default:
      return "";
  }
}

export function analyzeProduct(p, market = "GLOBAL") {
  const m = scoreProduct(p);
  const g = grade(m.total);

  // The 4 headline metrics clients care about
  const metrics = [
    { key: "demand", label: "Demand", score: m.scores.demand, word: metricWord("demand", m.scores.demand, m), tone: toneFor(m.scores.demand) },
    { key: "competition", label: "Competition", score: m.scores.competition, word: metricWord("competition", m.scores.competition, m), tone: toneFor(m.scores.competition) },
    { key: "margin", label: "Profit margin", score: m.scores.margin, word: metricWord("margin", m.scores.margin, m), tone: toneFor(m.scores.margin) },
    { key: "risk", label: "Reliability", score: m.scores.risk, word: metricWord("risk", m.scores.risk, m), tone: toneFor(m.scores.risk) },
  ];

  // Plain-English pros
  const pros = [];
  if (m.kind === "rising") pros.push("Interest is climbing month over month — demand is growing, not fading.");
  if (m.scores.competition >= 55) pros.push("Few sellers are on this — you have room to stand out.");
  if (m.marginPct >= 70) pros.push(`Strong margin: you keep about $${m.unitProfit} on every $${p.suggestedPrice.toFixed(0)} sale.`);
  else if (m.marginPct >= 55) pros.push(`Workable margin: roughly $${m.unitProfit} profit per sale.`);
  p.positives.slice(0, 2).forEach((x) => pros.push(x));

  // Plain-English cautions
  const cautions = [];
  if (m.high.length) cautions.push(`Buyers often complain "${m.high[0].label}" — you'd be handling those returns.`);
  if (m.kind === "cooling" || m.kind === "spiked") cautions.push("The trend has peaked and is cooling — you'd be arriving late.");
  if (m.scores.competition < 40) cautions.push("The market is crowded, so ads will cost more and margins get squeezed.");
  if (m.marginPct < 45) cautions.push("Margins are thin — advertising could eat most of the profit.");

  return {
    id: p.id, name: p.name, niche: p.niche, image: p.image, market,
    total: m.total, grade: g, verdict: p.verdict,
    headline: p.angle,
    action: verdictAction[p.verdict] || verdictAction.test,
    metrics,
    pros: pros.slice(0, 4),
    cautions: cautions.slice(0, 3),
    sources: p.sources,
    stats: {
      unitProfit: m.unitProfit,
      marginPct: m.marginPct,
      price: p.suggestedPrice,
      cost: p.supplierCost,
      searches: fmtVol(p.monthlySearchVolume),
      competitors: p.sellerCount,
      rating: p.incumbentRating,
      reviews: fmtVol(p.reviewCount),
    },
    complaints: p.complaintPatterns,
    trend: p.trend,
    scores: m.scores,
  };
}

function toneFor(score) {
  return score >= 65 ? "good" : score >= 45 ? "ok" : "bad";
}

// ===========================================================================
// The search the client runs
// ===========================================================================
export function runSearch({ categories = [], count = 5, market = "GLOBAL", maxPrice = 0 } = {}) {
  let pool = PRODUCTS.slice();
  if (categories.length) pool = pool.filter((p) => categories.includes(p.niche));
  if (maxPrice) pool = pool.filter((p) => p.suggestedPrice <= maxPrice);

  const analyzed = pool
    .map((p) => analyzeProduct(p, market))
    .sort((a, b) => b.total - a.total)
    .slice(0, count);

  const best = analyzed[0] || null;
  const avgMargin = analyzed.length
    ? Math.round(analyzed.reduce((a, p) => a + p.stats.marginPct, 0) / analyzed.length)
    : 0;
  const worthTesting = analyzed.filter((p) => p.verdict === "strong" || p.verdict === "test").length;

  return {
    products: analyzed,
    summary: {
      found: analyzed.length,
      scanned: pool.length,
      best: best ? { name: best.name, image: best.image, grade: best.grade } : null,
      avgMargin,
      worthTesting,
    },
    query: { categories, count, market, maxPrice },
  };
}
