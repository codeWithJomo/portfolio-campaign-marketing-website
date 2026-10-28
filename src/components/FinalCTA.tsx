import React from 'react';
import { Sparkles } from 'lucide-react';
import { BrandButton } from './BrandButton';
import { SectionDecorations } from './SectionDecorations';

interface FinalCTAProps {
  onGetStartedClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onGetStartedClick }) => {
  return (
    <section className="py-20 bg-neutral-900 text-white relative isolate overflow-hidden">
      <SectionDecorations className="-z-0 opacity-40" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
          Ready to put your work online?
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Choose your style, share your details, and take the first step toward a professional online presence.
        </p>

        <div className="pt-2">
          <BrandButton
            type="button"
            onClick={onGetStartedClick}
            showPortfolioIcon
            className="px-8 py-2"
          >
            Get My Portfolio — ₦5,000
          </BrandButton>
        </div>

        <p className="text-xs text-neutral-400 pt-2">
          ₦5,000 one-time · Free Vercel hosting forever · Money-back guarantee
        </p>

      </div>
    </section>
  );
};
