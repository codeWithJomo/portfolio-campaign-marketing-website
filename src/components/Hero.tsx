import React, { useState } from 'react';
import { PortfolioStyle } from '../types';
import { PortfolioPreview } from './PortfolioPreviews';
import { ArrowUpRight, Sparkles, Check, Smartphone, Laptop, Eye } from 'lucide-react';

interface HeroProps {
  onGetStartedClick: () => void;
  onExploreClick: () => void;
  onOpenDemo: (style: PortfolioStyle) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onGetStartedClick,
  onExploreClick,
  onOpenDemo,
}) => {
  const [activeHeroStyle, setActiveHeroStyle] = useState<PortfolioStyle>('developer');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-neutral-200/60 bg-gradient-to-b from-white via-neutral-50/50 to-neutral-100/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Offer Callout */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-indigo-700 bg-indigo-50/80 border border-indigo-200/60 px-3.5 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Your personal portfolio website · ₦1,000 one-time</span>
            </div>

            {/* Benefit-Focused Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-neutral-900 leading-[1.08] text-balance">
              Your work deserves more than a CV.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              Get a clean, personalized portfolio website to showcase your skills, projects, and experience — without spending a fortune.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onGetStartedClick}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-neutral-800 active:scale-[0.99] transition-all whitespace-nowrap"
              >
                <span>Get My Portfolio</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-neutral-300 px-6 py-3.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 active:scale-[0.99] transition-all whitespace-nowrap shadow-xs"
              >
                <span>Explore Examples</span>
              </button>
            </div>

            {/* Trust Statement (Clean unboxed typographic metadata) */}
            <div className="pt-3 border-t border-neutral-200/80">
              <p className="text-xs text-neutral-500 font-medium leading-normal flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-neutral-700">Mobile-friendly</span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span className="text-neutral-700">Free hosting</span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span className="text-neutral-700">5 revision rounds</span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span className="text-neutral-700">Money-back guarantee under our stated terms</span>
              </p>
            </div>

            {/* Social / Direct Proof Micro-Note */}
            <div className="flex items-center gap-3 pt-1 text-xs text-neutral-500">
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white">
                  J
                </span>
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-600 text-[10px] font-bold text-white ring-2 ring-white">
                  A
                </span>
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-600 text-[10px] font-bold text-white ring-2 ring-white">
                  T
                </span>
              </div>
              <span>Built by Jomo for Nigerian & global job seekers on X & LinkedIn</span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Laptop & Mobile Device Mockup */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Style Selector Toolbar */}
            <div className="w-full flex items-center justify-between gap-2 mb-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-xl border border-neutral-200 shadow-xs max-w-lg">
              <span className="text-[11px] font-medium text-neutral-500 pl-2 hidden sm:inline">
                Style preview:
              </span>
              <div className="flex items-center gap-1 w-full sm:w-auto justify-end">
                {(['developer', 'creative', 'professional'] as PortfolioStyle[]).map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setActiveHeroStyle(style)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                      activeHeroStyle === style
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Device Frames Container */}
            <div className="relative w-full max-w-lg lg:max-w-none pt-4">
              
              {/* Laptop Frame */}
              <div className="relative mx-auto w-full rounded-2xl bg-neutral-900 p-2 sm:p-3 shadow-2xl border border-neutral-700/50">
                {/* Camera notch */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neutral-800 border border-neutral-700" />
                
                {/* Laptop Screen Content */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-950 shadow-inner">
                  <PortfolioPreview style={activeHeroStyle} viewMode="desktop" />
                  
                  {/* Floating Action to View Full Live Demo */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <button
                      type="button"
                      onClick={() => onOpenDemo(activeHeroStyle)}
                      className="inline-flex items-center gap-1.5 bg-neutral-900/90 hover:bg-neutral-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md border border-neutral-700 shadow-lg active:scale-95 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full Demo</span>
                    </button>
                  </div>
                </div>

                {/* Laptop Base Stand */}
                <div className="relative -bottom-2 -mx-4 h-3.5 rounded-b-xl bg-gradient-to-b from-neutral-300 to-neutral-400 border-t border-neutral-400/80 shadow-md">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-b bg-neutral-500/60" />
                </div>
              </div>

              {/* Overlapping Mobile Device Frame */}
              <div className="absolute -bottom-6 -left-2 sm:-left-6 w-36 sm:w-44 aspect-[9/18.5] rounded-3xl bg-neutral-900 p-1.5 shadow-2xl border-2 border-neutral-700 hidden xs:block">
                {/* Speaker pill */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-2.5 rounded-full bg-neutral-800 flex items-center justify-center">
                  <div className="w-2 h-1 rounded-full bg-neutral-700" />
                </div>
                {/* Mobile screen */}
                <div className="h-full w-full rounded-2xl overflow-hidden bg-neutral-950 pt-3">
                  <PortfolioPreview style={activeHeroStyle} viewMode="mobile" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
