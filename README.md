# DropPilot — Find your next winning product

A client-facing product-research app for dropshippers, built with Next.js + Tailwind. You tell it what you're interested in; it researches the market and hands back a ranked shortlist of product opportunities in plain business language. Runs on demonstration data (no real API keys needed).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

## How it works (3 steps)

1. **Setup** — the client chooses product categories (or leaves it blank for all), how many ideas to bring back (3 / 5 / 8), the market (Pakistan / US / Global), and an optional per-item budget.
2. **Analyzing** — a friendly progress view: discovering trending products → measuring demand → sizing up competition → reading customer reviews → working out margins → ranking.
3. **Results** — a ranked list of **opportunity cards**. Each shows a letter grade + score, a one-line take, four plain metrics (Demand, Competition, Profit margin, Reliability), the key numbers (profit per sale, margin, monthly searches, competitors), and an expandable "Why we ranked it here" with what's in its favour, what to watch out for, the 12-month interest trend, top customer complaints, and a recommendation.

## Under the hood

- `src/lib/mockData.js` — 16 demo products across 10 categories, plus the scoring rubric.
- `src/lib/engine.js` — `scoreProduct` (five weighted criteria) and `analyzeProduct` (turns scores into plain-English grades, pros, cautions and actions); `runSearch` applies the client's filters.
- `src/app/api/research/route.js` — accepts the search parameters and returns the ranked results.
- `src/app/page.js` — the Setup → Analyzing → Results flow.

Swapping the mock for production means wiring the discovery/data functions to real feeds (Google Trends, Keepa, Apify/AliExpress, TikTok) and Claude for the analysis — the plain-English output the client sees stays the same. The final "launch this" decision is left to the client on purpose.
