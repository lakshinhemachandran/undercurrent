import Link from "next/link"; 
import { ArrowRight, Sparkles, ShieldCheck, Waves, } from "lucide-react"; 
import { MedicalDisclaimer } from "@/components/medical-disclaimer"; 
import { SiteHeader } from "@/components/site-header"; 

const highlights = [ 
  { title: "Anonymous first pass", body: "Start with a private, low-pressure reflection before creating an account." }, 
  { title: "Therapy journey memory", body: "Keep upcoming appointments, moods, and journal notes in one secure hub." }, 
  { title: "Gentle retention", body: "Use progress waves and milestone badges without adding pressure." } 
]; 

export default function HomePage() { 
  return ( 
    <main className="mx-auto min-h-screen max-w-6xl px-4 pb-16 sm:px-6 lg:px-8 flex flex-col justify-between"> 
      <div>
        <SiteHeader /> 
        <section className="grid gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-20"> 
          <div className="space-y-8"> 
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-sm text-teal-100"> 
              <Sparkles className="h-4 w-4" /> Private self-reflection for teens </div> 
            <div className="space-y-5"> 
              <h1 className="max-w-3xl font-display text-5xl leading-[0.95] tracking-tight text-slate-50 sm:text-6xl lg:text-7xl"> 
                Find the current under the noise. 
              </h1> 
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"> 
                Undercurrent helps teens explore what is driving stress, anxiety, and emotional overload, keep progress safe before registration, and track real therapy with a calm, premium interface. 
              </p> 
            </div> 
            
            <div className="flex flex-wrap items-center gap-3"> 
              <Link href="/quiz" className="inline-flex items-center gap-2 rounded-full bg-teal-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-200"> 
                Start the quiz <ArrowRight className="h-4 w-4" /> 
              </Link> 
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-100 transition hover:border-teal-300/40 hover:bg-white/10"> 
                View dashboard 
              </Link> 
            </div> 
            <MedicalDisclaimer /> 
          </div> 
          
          <div className="glass-card relative overflow-hidden rounded-[2rem] p-6"> 
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-400/20 blur-3xl" /> 
            <div className="absolute -bottom-12 left-6 h-36 w-36 rounded-full bg-indigo-400/20 blur-3xl" /> 
            <div className="relative space-y-4"> 
              <div className="flex items-center gap-3 text-sm text-slate-300"> 
                <ShieldCheck className="h-5 w-5 text-teal-300" /> No diagnosis. No clinical label. Just reflection. </div> 
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"> 
                <div className="flex items-center justify-between"> 
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Wave Streak</p> 
                  <Waves className="h-5 w-5 text-cyan-300" /> 
                </div> 
                <div className="mt-4 grid grid-cols-8 gap-2"> 
                  {Array.from({ length: 8 }).map((_, index) => ( 
                    <span key={index} className="rounded-full bg-gradient-to-t from-cyan-400/20 via-cyan-300/40 to-teal-200/80" style={{ height: `${36 + index * 8}px` }} /> 
                  ))} 
                </div> 
              </div> 
              <div className="grid gap-3 sm:grid-cols-3"> 
                {highlights.map((highlight) => ( 
                  <article key={highlight.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"> 
                    <h2 className="font-semibold text-slate-50">{highlight.title}</h2> 
                    <p className="mt-2 text-sm leading-6 text-slate-300">{highlight.body}</p> 
                  </article> 
                ))} 
              </div> 
            </div> 
          </div> 
        </section> 
      </div>

      <footer className="mt-12 text-center text-sm text-slate-500">
        Created by{" "}
        <Link 
          href="https://github.com/lakshinhemachandran" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate-400 transition hover:text-teal-300 underline underline-offset-4"
        >
          Lakshin Hemachandran
        </Link>
      </footer>
    </main> 
  ); 
}
