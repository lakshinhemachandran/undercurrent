import Link from "next/link";
import { Github } from "lucide-react"; 

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <Link href="/" className="font-display text-xl tracking-[0.26em] text-slate-50 uppercase">
        Undercurrent
      </Link>
      <nav className="flex items-center gap-3 text-sm text-slate-300">
        <Link href="/quiz" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-teal-300/40 hover:text-slate-50">
          Quiz
        </Link>
        <Link href="/dashboard" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-teal-300/40 hover:text-slate-50">
          Dashboard
        </Link>
                      <Link 
                        href="https://github.com/lakshinhemachandran/undercurrent" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3.5 text-slate-300 transition hover:border-teal-300/40 hover:bg-white/10 hover:text-slate-100"
                        aria-label="View source on GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
      </nav>
    </header>
  );
}
