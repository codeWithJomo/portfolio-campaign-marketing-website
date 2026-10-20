import React, { useState } from "react";
import { PortfolioStyle } from "../types";
import { PortfolioPreview } from "./PortfolioPreviews";
import {
  ArrowUpRight,
  Sparkles,
  Check,
  Smartphone,
  Laptop,
  Eye,
} from "lucide-react";

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
  const [activeHeroStyle, setActiveHeroStyle] =
    useState<PortfolioStyle>("developer");

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-neutral-200/60 bg-gradient-to-b from-white via-neutral-50/50 to-neutral-100/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center gap-12 lg:gap-12 items-center">
          {/* Left Column: Copy & Value Proposition */}
          <div className="space-y-10 text-left">
            {/* Benefit-Focused Headline */}
            <h1 className="text-center text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-neutral-900 leading-[1.08] text-balance">
              It's Almost Free
            </h1>

            {/* Supporting Text */}
            <p className="text-base text-center sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              Get your own clean, personalized portfolio website to showcase
              your skills, projects, and experience — for just ₦1,000.
            </p>

            {/* CTAs */}
            <div className="flex flex-col justify-center sm:flex-row items-stretch sm:items-center gap-3 pt-2">
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
            <div className="flex pt-3 border-t border-neutral-200/80 justify-center">
              <p className="text-center text-xs text-neutral-500 font-medium leading-normal flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-neutral-700">Mobile-friendly</span>
                <span aria-hidden="true" className="text-neutral-300">
                  ·
                </span>
                <span className="text-neutral-700">Free hosting</span>
                <span aria-hidden="true" className="text-neutral-300">
                  ·
                </span>
                <span className="text-neutral-700">5 revision rounds</span>
                <span aria-hidden="true" className="text-neutral-300">
                  ·
                </span>
                <span className="text-neutral-700">
                  Money-back guarantee under our stated terms
                </span>
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
              <span>
                By JomoCode — helping you access the technology you deserve.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
