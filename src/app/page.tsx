import Link from "next/link";

import { Users, ArrowRight, ShieldCheck, Zap } from "lucide-react";

function Page() {
  return (
    <div className="relative w-full min-h-screen bg-background overflow-hidden selection:bg-primary/30">

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-primary uppercase tracking-wider">Next Gen Contact Management</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 max-w-4xl leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Simplify your <span className="text-primary">connections</span> with Obsidian Elite
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          The most sophisticated way to manage, organize, and grow your professional network. 
          Experience a UI built for speed and elegance.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <Link
            href="/contact"
            className="group relative flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-primary/20"
          >
            <Users className="w-5 h-5 transition-transform" />
            Launch Dashboard
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <button className="flex items-center gap-2 px-8 py-4 bg-secondary/10 text-foreground border border-secondary/20 rounded-2xl font-semibold transition-all hover:bg-secondary/20">
            <ShieldCheck className="w-5 h-5 text-secondary" />
            Documentation
          </button>
        </div>

        {/* Feature badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
          {[
            { title: "Lightning Fast", desc: "Optimized for speed and efficiency.", icon: Zap },
            { title: "Secure Cloud", desc: "Your data is encrypted and safe.", icon: ShieldCheck },
            { title: "Smart Tags", desc: "Automatic categorization logic.", icon: Users },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center p-6 rounded-3xl bg-card border border-border transition-colors hover:border-primary/30">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="absolute bottom-8 left-0 w-full text-center text-sm text-muted-foreground/60">
        © 2026 Obsidian Elite. Built for modern professionals.
      </footer>
    </div>
  );
}

export default Page;
