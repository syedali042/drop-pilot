import { NextResponse } from "next/server";
import { runSearch } from "@/lib/engine";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  // Simulate the research taking a moment (gathering + analysing).
  await new Promise((r) => setTimeout(r, 1500));
  const result = runSearch({
    categories: Array.isArray(body.categories) ? body.categories : [],
    count: [3, 5, 8].includes(body.count) ? body.count : 5,
    market: body.market || "GLOBAL",
    maxPrice: Number(body.maxPrice) || 0,
  });
  return NextResponse.json(result);
}
