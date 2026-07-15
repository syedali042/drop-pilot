import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "DropPilot — Find your next winning product",
  description:
    "Tell DropPilot what you're interested in and it researches the market for you — demand, competition, profit and risk — then ranks the best product opportunities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <header className="sticky top-0 z-20 border-b hairline bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-6 h-16 flex items-center gap-3">
            <div className="grid place-items-center w-9 h-9 rounded-xl brand-gradient shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 3 7l9 5 9-5-9-5Z" /><path d="m3 17 9 5 9-5M3 12l9 5 9-5" /></svg>
            </div>
            <div className="leading-tight">
              <div className="font-bold tracking-tight text-slate-900">DropPilot</div>
              <div className="text-[11px] text-slate-500 -mt-0.5">Product research, done for you</div>
            </div>
            <nav className="ml-auto hidden sm:flex items-center gap-6 text-sm text-slate-500">
              <span className="hover:text-slate-800 cursor-default">How it works</span>
              <span className="hover:text-slate-800 cursor-default">Pricing</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[12px] text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" /> Demo
              </span>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mx-auto max-w-6xl px-6 py-10 text-center text-xs text-slate-400">
          DropPilot · sample product research on demonstration data. Final launch decisions stay with you.
        </footer>
      </body>
    </html>
  );
}
