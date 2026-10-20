import React from 'react';
import { Check, X, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

interface WhatsIncludedProps {
  onGetStartedClick: () => void;
}

export const WhatsIncluded: React.FC<WhatsIncludedProps> = ({ onGetStartedClick }) => {
  const includedItems = [
    'A personalized, one-page portfolio website built for your career track',
    'Your choice of one of three designs (Developer, Creative, or Professional)',
    'Preferred color customization (curated presets or your own custom hex codes)',
    'About, skills, projects, experience, education, and contact sections as appropriate',
    'Responsive design optimized for phones, tablets, and desktop computers',
    'Free permanent hosting on a fast Vercel subdomain (yourname.vercel.app)',
    'Five rounds of revisions within the agreed layout scope',
    'A clearly explained money-back guarantee if requirements are unmet',
  ];

  const notIncludedItems = [
    'Custom domain purchases (e.g. .com, .dev registrar registration costs, though we connect your domain for free if you own one)',
    'Multi-page complex website architecture or custom CMS databases',
    'Complex custom backend functionality, payment gateways, or user login systems',
    'Unlimited redesigns or scope changes outside the 5 revision rounds',
  ];

  return (
    <section id="whats-included" className="py-20 bg-white border-b border-neutral-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Transparent Pricing & Scope
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 text-balance">
            Everything you need to get started online.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed">
            A complete, professional presence for less than the price of lunch. Honest deliverables with zero hidden recurring fees.
          </p>
        </div>

        {/* Pricing Card Grid */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-neutral-200/90 bg-neutral-50/50 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Price & Callout */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  One-Time Service Offer
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-mono">
                    ₦1,000
                  </span>
                  <span className="text-sm font-medium text-neutral-500">
                    one-time payment
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                  Pay only once. Free hosting forever on Vercel with zero server renewal charges.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2 font-semibold text-neutral-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Low-Risk Guarantee</span>
                </div>
                <p>
                  5 revision rounds included to get your copy and styling right. If we can't resolve agreed mismatches, you can request a full refund.
                </p>
              </div>

              <button
                type="button"
                onClick={onGetStartedClick}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 active:scale-[0.99] transition-all"
              >
                <span>Get My Portfolio — ₦1,000</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Right: Included & Excluded Checklist */}
            <div className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200">
              
              {/* What is included */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>What's Included</span>
                </h3>
                <ul className="space-y-2.5">
                  {includedItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                      <div className="mt-0.5 rounded-full p-0.5 bg-emerald-50 text-emerald-600 shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What is NOT included (Honest boundaries) */}
              <div className="pt-4 border-t border-neutral-100 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-400" />
                  <span>What's Not Included (Available separately if needed)</span>
                </h3>
                <ul className="space-y-2">
                  {notIncludedItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-500">
                      <div className="mt-0.5 rounded-full p-0.5 bg-neutral-100 text-neutral-400 shrink-0">
                        <X className="w-3 h-3 stroke-[2]" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
