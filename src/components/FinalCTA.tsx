import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onGetStartedClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onGetStartedClick }) => {
  return (
    <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 bg-neutral-800 border border-neutral-700 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Launch Your Website This Week</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
          Ready to put your work online?
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Choose your style, share your details, and take the first step toward a professional online presence.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={onGetStartedClick}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-neutral-950 px-8 py-4 text-sm font-bold shadow-lg hover:bg-neutral-100 active:scale-[0.99] transition-all"
          >
            <span>Get My Portfolio — ₦1,000</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-400 pt-2">
          ₦1,000 one-time · Free Vercel hosting forever · Money-back guarantee
        </p>

      </div>
    </section>
  );
};
