import React from 'react';
import { PortfolioStyle } from '../types';
import { PORTFOLIO_STYLES } from '../data/portfolioStyles';
import { PortfolioPreview } from './PortfolioPreviews';
import { Check, Eye, ArrowRight, Sparkles } from 'lucide-react';
import { SectionDecorations } from './SectionDecorations';

interface PortfolioExamplesProps {
  selectedStyle: PortfolioStyle;
  onSelectStyle: (style: PortfolioStyle) => void;
  onOpenDemo: (style: PortfolioStyle) => void;
}

export const PortfolioExamples: React.FC<PortfolioExamplesProps> = ({
  selectedStyle,
  onSelectStyle,
  onOpenDemo,
}) => {
  return (
    <section id="examples" className="relative isolate overflow-hidden py-20 bg-white border-b border-neutral-200/80">
      <SectionDecorations className="-z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Portfolio Demos
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 text-balance">
            Pick the style that feels like you.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed">
            Choose a design you like. We'll personalize it with your details, projects, and preferred colors.
          </p>
        </div>

        {/* 3 Portfolio Demo Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PORTFOLIO_STYLES.map((item) => {
            const isSelected = selectedStyle === item.id;
            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl border transition-all duration-200 flex flex-col bg-white overflow-hidden ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-xl'
                    : 'border-neutral-200/90 hover:border-neutral-300 hover:shadow-lg'
                }`}
              >
                {/* Selected Indicator Ribbon */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-indigo-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Selected</span>
                  </div>
                )}

                {/* Interactive Preview Container */}
                <div className="relative aspect-[16/11] w-full border-b border-neutral-200/80 overflow-hidden bg-neutral-100">
                  <PortfolioPreview style={item.id} viewMode="desktop" />
                  
                  {/* Hover Overlay with Live Demo Trigger */}
                  <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      type="button"
                      onClick={() => onOpenDemo(item.id)}
                      className="inline-flex items-center gap-2 bg-white text-neutral-900 px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:bg-neutral-100 active:scale-95 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Open Full Interactive Demo</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Style Label (Unboxed text metadata) */}
                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                      <span className="text-indigo-600 font-mono text-[11px] uppercase tracking-wider">
                        {item.styleLabel}
                      </span>
                      <span className="text-[11px] text-neutral-400">{item.badge}</span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-neutral-900">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features list */}
                    <ul className="pt-2 space-y-1.5 text-xs text-neutral-600">
                      {item.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold shrink-0">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => onSelectStyle(item.id)}
                      className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-neutral-900 text-white hover:bg-neutral-800'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Design Selected</span>
                        </>
                      ) : (
                        <>
                          <span>Choose This Design</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenDemo(item.id)}
                      className="w-full sm:w-auto py-2.5 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1"
                      title="View live demo preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Demo</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help text below cards */}
        <div className="mt-8 text-center text-xs text-neutral-500">
          <span>Not sure which one fits? Choose any design now — Jomo can help you tweak the style and colors during your 5 revision rounds.</span>
        </div>

      </div>
    </section>
  );
};
