"use client";

import { useState, useEffect, useRef } from "react";
import { Badge, Meter, GradeRing, Sparkline } from "@/components/ui";
import { CATEGORIES, MARKETS, PRICE_CAPS } from "@/lib/mockData";

const COUNTS = [3, 5, 8];
const STEPS = [
  { t: "Discovering trending products", d: "Scanning Google Trends, Amazon, TikTok & AliExpress" },
  { t: "Measuring real demand", d: "Is interest growing or fading?" },
  { t: "Sizing up the competition", d: "How many sellers, how crowded, how pricey the ads" },
  { t: "Reading customer reviews", d: "What buyers love and complain about" },
  { t: "Working out your profit margins", d: "What you'd keep after supplier costs" },
  { t: "Ranking your best opportunities", d: "Scoring every product against what matters" },
];

export default function Home() {
  const [step, setStep] = useState("setup"); // setup | analyzing | results
  const [selected, setSelected] = useState([]);
  const [count, setCount] = useState(5);
  const [market, setMarket] = useState("PK");
  const [maxPrice, setMaxPrice] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [data, setData] = useState(null);

  const startSearch = async () => {
    setStep("analyzing");
    setStepIdx(0);
    setData(null);
    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: selected, count, market, maxPrice }),
      });
      setData(await res.json());
    } catch {
      setData({ products: [], summary: { found: 0 } });
    }
  };

  // drive the analysing animation
  useEffect(() => {
    if (step !== "analyzing") return;
    if (stepIdx >= STEPS.length) return;
    const t = setTimeout(() => setStepIdx((i) => i + 1), stepIdx === 0 ? 500 : 620);
    return () => clearTimeout(t);
  }, [step, stepIdx]);

  useEffect(() => {
    if (step === "analyzing" && data && stepIdx >= STEPS.length) {
      const t = setTimeout(() => setStep("results"), 350);
      return () => clearTimeout(t);
    }
  }, [step, data, stepIdx]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
      {step === "setup" && (
        <Setup
          {...{ selected, setSelected, count, setCount, market, setMarket, maxPrice, setMaxPrice }}
          onStart={startSearch}
        />
      )}
      {step === "analyzing" && <Analyzing stepIdx={stepIdx} market={market} selected={selected} />}
      {step === "results" && data && <Results data={data} onReset={() => setStep("setup")} onRefine={() => setStep("setup")} />}
    </div>
  );
}

/* ------------------------------------------------------------------ Setup */
function Setup({ selected, setSelected, count, setCount, market, setMarket, maxPrice, setMaxPrice, onStart }) {
  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="rise-in">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-white border hairline px-3 py-1.5 text-[12px] text-slate-600 shadow-sm mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> AI-powered product research
        </div>
        <h1 className="text-3xl sm:text-[42px] leading-[1.1] font-extrabold tracking-tight text-slate-900">
          Find your next <span className="brand-text">winning product</span>
        </h1>
        <p className="text-slate-500 mt-4 text-[15px] sm:text-base leading-relaxed">
          Tell us what you're interested in and how many ideas you'd like. We'll research the market — demand,
          competition, profit and quality — and hand you a ranked shortlist worth testing.
        </p>
      </div>

      {/* Form */}
      <div className="card p-6 sm:p-8 max-w-3xl mx-auto">
        <Section num="1" title="What kind of products interest you?" hint="Pick any that apply — or leave blank to search everything.">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const on = selected.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  className={`focus-ring inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition ${
                    on
                      ? "border-indigo-300 bg-indigo-50 text-indigo-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base">{c.emoji}</span>
                  {c.label}
                  {on && <span className="text-indigo-500">✓</span>}
                </button>
              );
            })}
          </div>
          {selected.length > 0 && (
            <button onClick={() => setSelected([])} className="mt-3 text-[13px] text-slate-400 hover:text-slate-600">
              Clear selection
            </button>
          )}
        </Section>

        <Divider />

        <Section num="2" title="How many product ideas should we bring back?">
          <div className="inline-flex rounded-xl border border-slate-200 p-1 bg-slate-50">
            {COUNTS.map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`focus-ring rounded-lg px-5 py-2 text-sm font-semibold transition ${
                  count === n ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </Section>

        <Divider />

        <div className="grid sm:grid-cols-2 gap-6">
          <Section num="3" title="Where will you sell?">
            <div className="flex flex-wrap gap-2">
              {MARKETS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMarket(m.id)}
                  className={`focus-ring inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition ${
                    market === m.id
                      ? "border-indigo-300 bg-indigo-50 text-indigo-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base">{m.emoji}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </Section>

          <Section num="4" title="Budget per item (optional)">
            <div className="flex flex-wrap gap-2">
              {PRICE_CAPS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setMaxPrice(p.id)}
                  className={`focus-ring rounded-xl border px-3.5 py-2.5 text-sm font-medium transition ${
                    maxPrice === p.id
                      ? "border-indigo-300 bg-indigo-50 text-indigo-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </Section>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            onClick={onStart}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl brand-gradient px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition sm:w-auto w-full"
          >
            Research products
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
          <span className="text-[13px] text-slate-400">Takes about 10 seconds · nothing to install</span>
        </div>
      </div>
    </div>
  );
}

function Section({ num, title, hint, children }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="grid place-items-center w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 text-[12px] font-bold">{num}</span>
        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>
      {hint && <p className="text-[13px] text-slate-400 -mt-2 mb-3.5 ml-8">{hint}</p>}
      <div className="ml-0 sm:ml-8">{children}</div>
    </div>
  );
}
function Divider() {
  return <div className="h-px bg-slate-100 my-7" />;
}

/* -------------------------------------------------------------- Analyzing */
function Analyzing({ stepIdx, market, selected }) {
  const marketLabel = MARKETS.find((m) => m.id === market)?.label || "your market";
  return (
    <div className="max-w-xl mx-auto rise-in">
      <div className="text-center mb-8">
        <div className="relative mx-auto w-16 h-16 mb-5">
          <div className="absolute inset-0 rounded-2xl brand-gradient opacity-20 blur-lg" />
          <div className="relative w-16 h-16 rounded-2xl brand-gradient grid place-items-center">
            <svg className="animate-spin" width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="white" strokeOpacity="0.35" strokeWidth="3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Researching the market for you</h2>
        <p className="text-slate-500 text-sm mt-1.5">
          Analyzing {selected.length ? `${selected.length} categor${selected.length > 1 ? "ies" : "y"}` : "all categories"} for {marketLabel}
        </p>
      </div>

      <div className="card p-2">
        {STEPS.map((s, i) => {
          const done = i < stepIdx;
          const active = i === stepIdx;
          return (
            <div key={i} className={`flex items-center gap-3.5 rounded-xl px-4 py-3 transition ${active ? "bg-indigo-50/60" : ""}`}>
              <span className={`grid place-items-center w-7 h-7 rounded-full text-[12px] font-bold shrink-0 transition ${
                done ? "bg-emerald-500 text-white" : active ? "brand-gradient text-white" : "bg-slate-100 text-slate-400"
              }`}>
                {done ? "✓" : active ? <Dot /> : i + 1}
              </span>
              <div className="min-w-0">
                <div className={`text-sm font-medium ${done || active ? "text-slate-800" : "text-slate-400"}`}>{s.t}</div>
                <div className="text-[12px] text-slate-400 truncate">{s.d}</div>
              </div>
              {active && <span className="ml-auto text-[12px] text-indigo-500 font-medium">Working…</span>}
              {done && <span className="ml-auto text-emerald-500"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg></span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function Dot() {
  return <span className="w-2 h-2 rounded-full bg-white pulse-dot" />;
}

/* ---------------------------------------------------------------- Results */
function Results({ data, onReset }) {
  const { products, summary, query } = data;
  const catLabel = query.categories?.length
    ? query.categories.map((c) => CATEGORIES.find((x) => x.id === c)?.label || c).join(", ")
    : "All categories";
  const marketLabel = MARKETS.find((m) => m.id === query.market)?.label || "Global";

  if (!products.length) {
    return (
      <div className="max-w-xl mx-auto text-center card p-10 rise-in">
        <div className="text-4xl mb-3">🔍</div>
        <h2 className="text-lg font-bold text-slate-900">No products matched those filters</h2>
        <p className="text-slate-500 text-sm mt-1.5">Try widening your categories or budget.</p>
        <button onClick={onReset} className="mt-5 rounded-xl brand-gradient px-5 py-2.5 text-sm font-semibold text-white">New search</button>
      </div>
    );
  }

  return (
    <div className="rise-in">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-[12px] uppercase tracking-wider text-indigo-500 font-semibold mb-1.5">Your results</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {summary.found} product {summary.found === 1 ? "opportunity" : "opportunities"} for you
          </h1>
          <p className="text-slate-500 text-sm mt-1.5">
            {catLabel} · {marketLabel} · {summary.worthTesting} worth testing · avg. margin {summary.avgMargin}%
          </p>
        </div>
        <button onClick={onReset} className="focus-ring shrink-0 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
          New search
        </button>
      </div>

      {/* Best pick highlight */}
      {summary.best && (
        <div className="card p-4 mb-6 flex items-center gap-3 border-l-4 border-l-emerald-400">
          <span className="text-2xl">🏆</span>
          <div className="text-sm">
            <span className="font-semibold text-slate-900">Top pick: {summary.best.name}</span>
            <span className="text-slate-500"> — our highest-scoring opportunity in this search. Start here.</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {products.map((p, i) => (
          <OpportunityCard key={p.id} p={p} rank={i + 1} />
        ))}
      </div>

      <p className="text-center text-[13px] text-slate-400 mt-8 max-w-xl mx-auto">
        These are researched suggestions, not guarantees. The final call on what to launch — your budget, your brand —
        stays with you.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------ Opportunity */
const WORD_COLOR = { good: "text-emerald-600", ok: "text-amber-600", bad: "text-rose-500" };

function OpportunityCard({ p, rank }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card card-hover overflow-hidden rise-in" style={{ animationDelay: `${rank * 60}ms` }}>
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="relative">
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-slate-50 border hairline text-2xl">{p.image}</div>
              <span className="absolute -top-2 -left-2 grid place-items-center w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] font-bold shadow">{rank}</span>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 leading-snug truncate">{p.name}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-[12px] text-slate-500">{p.niche}</span>
                <span className="text-slate-300">·</span>
                <span className="text-[12px] text-slate-400">Spotted on {p.sources.slice(0, 3).join(", ")}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <Badge tone={p.grade.tone}>{p.grade.label}</Badge>
              <div className="text-[11px] text-slate-400 mt-1">Score {p.total}/100</div>
            </div>
            <GradeRing score={p.total} tone={p.grade.tone} letter={p.grade.letter} />
          </div>
        </div>

        {/* Headline */}
        <p className="text-[14px] text-slate-600 mt-4 leading-relaxed">{p.headline}</p>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          {p.metrics.map((m) => (
            <div key={m.key} className="rounded-xl border hairline bg-slate-50/50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-slate-500">{m.label}</span>
              </div>
              <div className={`text-sm font-bold mt-0.5 ${WORD_COLOR[m.tone]}`}>{m.word}</div>
              <div className="mt-2"><Meter value={m.score} tone={m.tone} /></div>
            </div>
          ))}
        </div>

        {/* Key numbers */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-sm">
          <KeyNum label="Profit / sale" value={`$${p.stats.unitProfit}`} strong />
          <KeyNum label="Margin" value={`${p.stats.marginPct}%`} />
          <KeyNum label="Sell price" value={`$${p.stats.price}`} />
          <KeyNum label="Monthly searches" value={p.stats.searches} />
          <KeyNum label="Competitors" value={`~${p.stats.competitors}`} />
        </div>

        {/* Expand */}
        <button onClick={() => setOpen((o) => !o)} className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-indigo-600 hover:text-indigo-700">
          {open ? "Hide the details" : "Why we ranked it here"}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={`transition-transform ${open ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
        </button>
      </div>

      {open && (
        <div className="border-t hairline bg-slate-50/40 p-5 sm:p-6 grid md:grid-cols-2 gap-6 rise-in">
          <div className="space-y-4">
            {p.pros.length > 0 && (
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-wide text-emerald-600 mb-2">In its favour</div>
                <ul className="space-y-2">
                  {p.pros.map((x, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-slate-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500 shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5" /></svg>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {p.cautions.length > 0 && (
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-wide text-amber-600 mb-2">Watch out for</div>
                <ul className="space-y-2">
                  {p.cautions.map((x, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-slate-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500 shrink-0 mt-0.5"><path d="M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.42 0Z" /></svg>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-white border hairline p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold text-slate-500">12-month interest</span>
                <span className="text-[12px] text-slate-400">customers searching</span>
              </div>
              <Sparkline points={p.trend} width={260} height={48} color="#6366f1" />
            </div>
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-wide text-slate-500 mb-2">Top customer complaints</div>
              <div className="space-y-2">
                {p.complaints.map((c) => (
                  <div key={c.label} className="flex items-center gap-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.severity === "high" ? "bg-rose-500" : c.severity === "medium" ? "bg-amber-500" : "bg-slate-300"}`} />
                    <span className="text-[13px] text-slate-600 flex-1 truncate capitalize">{c.label}</span>
                    <span className="text-[12px] text-slate-400 tabular-nums">{c.share}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl brand-gradient p-4 text-white">
              <div className="text-[11px] font-semibold uppercase tracking-wide opacity-80 mb-1">Our recommendation</div>
              <div className="text-sm font-medium">{p.action}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KeyNum({ label, value, strong }) {
  return (
    <div>
      <div className={`tabular-nums ${strong ? "text-emerald-600 font-bold" : "text-slate-800 font-semibold"}`}>{value}</div>
      <div className="text-[11px] text-slate-400">{label}</div>
    </div>
  );
}
