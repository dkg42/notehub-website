import { ArrowRight, Chrome, Shield, Zap } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/8 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Glow card */}
        <div className="glass-card rounded-3xl p-10 sm:p-16 border border-blue-500/15 shadow-2xl shadow-blue-600/10">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-7 shadow-xl shadow-blue-600/30">
            <Zap className="w-8 h-8 text-white" aria-hidden="true" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Ready to unlock your{" "}
            <span className="gradient-text">NotebookLM</span>?
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Join thousands of researchers, students, and knowledge workers who
            use NoteHub to get more out of their AI tools every day.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-10 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 cursor-pointer group"
            >
              <Chrome className="w-5 h-5 mr-2" aria-hidden="true" />
              Add to Chrome — Free
              <ArrowRight
                className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all duration-200 cursor-pointer"
            >
              See Pricing
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-600" aria-hidden="true" />
              No credit card required
            </div>
            <span className="hidden sm:block text-white/10">·</span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-600" aria-hidden="true" />
              Cancel anytime
            </div>
            <span className="hidden sm:block text-white/10">·</span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-600" aria-hidden="true" />
              Free forever plan
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
