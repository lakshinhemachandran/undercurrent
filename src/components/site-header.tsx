import Link from "next/link"; 
import { Github } from "lucide-react"; 

export function SiteHeader() { 
  return ( 
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-4 max-w-7xl mx-auto w-full"> 
      <Link 
        href="/" 
        className="font-display text-lg sm:text-xl tracking-[0.26em] text-slate-50 uppercase whitespace-nowrap"
      > 
        Undercurrent 
      </Link> 
      
      <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-300"> 
        <Link 
          href="/quiz" 
          className="rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 transition hover:border-teal-300/40 hover:text-slate-50"
        > 
          Quiz 
        </Link> 
        
        <Link 
          href="/dashboard" 
          className="rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 transition hover:border-teal-300/40 hover:text-slate-50"
        > 
          Dashboard 
        </Link> 
        
        <Link 
          href="https://github.com/lakshinhemachandran/undercurrent" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 sm:p-3.5 text-slate-300 transition hover:border-teal-300/40 hover:bg-white/10 hover:text-slate-100" 
          aria-label="View source on GitHub" 
        > 
          <Github className="h-4 w-4 sm:h-5 sm:w-5" /> 
        </Link> 
      </nav> 
    </header> 
  ); 
}
