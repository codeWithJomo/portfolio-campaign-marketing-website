import React, { useState, useEffect } from "react";
import { Check, X, ShieldCheck } from "lucide-react";
import { BrandButton } from "./BrandButton";
import { SectionDecorations } from "./SectionDecorations";

interface WhatsIncludedProps {
  onGetStartedClick: () => void;
}

export const WhatsIncluded: React.FC<WhatsIncludedProps> = ({
  onGetStartedClick,
}) => {
  const includedItems = [
    "A personalized, one-page portfolio website built for your career track",
    "Your choice of one of three designs (Developer, Creative, or Professional)",
    "Preferred color customization (curated presets or your own custom hex codes)",
    "About, skills, projects, experience, education, and contact sections as appropriate",
    "Responsive design optimized for phones, tablets, and desktop computers",
    "Free permanent hosting on a fast Vercel subdomain (yourname.vercel.app)",
    "Five rounds of revisions within the agreed layout scope",
    "A clearly explained money-back guarantee if requirements are unmet",
  ];

  const notIncludedItems = [
    "Custom domain purchases (e.g. .com, .dev registrar registration costs, though we connect your domain for free if you own one)",
    "Multi-page complex website architecture or custom CMS databases",
    "Complex custom backend functionality, payment gateways, or user login systems",
    "Unlimited redesigns or scope changes outside the 5 revision rounds",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Animation state for the One-Time Service Offer: 'visible', 'hiding', 'hidden', 'showing'
  const [offerState, setOfferState] = useState<"visible" | "hidden">("visible");

  // List looping effect
  useEffect(() => {
    const maxLen = Math.max(includedItems.length, notIncludedItems.length);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % maxLen);
    }, 1800); // 1.8 seconds per item

    return () => clearInterval(interval);
  }, [includedItems.length, notIncludedItems.length]);

  // Offer slide-in / slide-out loop effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runAnimationCycle = () => {
      // Step 1: Visible for 5 seconds
      setOfferState("visible");
      timeout = setTimeout(() => {
        // Step 2: Slide out / Hide
        setOfferState("hidden");
        timeout = setTimeout(() => {
          // Step 3: Wait 1 second away before restarting cycle
          runAnimationCycle();
        }, 1000); // 1 second away
      }, 5000); // 5 seconds visible
    };

    runAnimationCycle();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="whats-included"
      className="relative isolate overflow-hidden py-20 bg-white border-b border-neutral-200/80"
    >
      <SectionDecorations className="-z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <p className="text-2xl font-bold uppercase tracking-wider text-black">
            Pay only if you like it
          </p>
        </div>

        {/* Side-by-Side Lists (No Cards) */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          {/* What is included (Longer list - cycles through all items) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
              <span>What's Included</span>
            </h3>
            <ul className="space-y-2.5">
              {includedItems.map((item, i) => {
                const isActive = activeIndex === i;
                const isExtendedPhase = i >= notIncludedItems.length;

                let activeBg = "bg-yellow-100";
                if (isActive && isExtendedPhase) {
                  activeBg = "bg-yellow-200 border border-yellow-300";
                }

                return (
                  <li
                    key={i}
                    style={{ willChange: "transform, background-color" }}
                    className={`flex items-start gap-2.5 p-2 rounded-xl transition-all duration-500 ease-out transform ${
                      isActive
                        ? `${activeBg} -translate-y-1 scale-[1.02] shadow-sm`
                        : "bg-transparent translate-y-0 scale-100"
                    }`}
                  >
                    <div className="mt-0.5 rounded-full p-0.5 bg-emerald-100 text-emerald-700 shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span
                      className={`leading-snug text-xs sm:text-sm transition-colors duration-300 ${
                        isActive
                          ? "text-cyan-950 font-extrabold"
                          : "text-black font-normal"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* What is NOT included (Shorter list) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>What's Not Included (Available separately if needed)</span>
            </h3>
            <ul className="space-y-2.5">
              {notIncludedItems.map((item, i) => {
                const isActive = activeIndex === i;

                return (
                  <li
                    key={i}
                    style={{ willChange: "transform, background-color" }}
                    className={`flex items-start gap-2.5 p-2 rounded-xl transition-all duration-500 ease-out transform ${
                      isActive
                        ? "bg-yellow-100 -translate-y-1 scale-[1.02] shadow-sm"
                        : "bg-transparent translate-y-0 scale-100"
                    }`}
                  >
                    <div className="mt-0.5 rounded-full p-0.5 bg-neutral-200 text-neutral-700 shrink-0">
                      <X className="w-3.5 h-3.5 stroke-[2]" />
                    </div>
                    <span
                      className={`leading-snug text-xs sm:text-sm transition-colors duration-300 ${
                        isActive
                          ? "text-cyan-950 font-extrabold"
                          : "text-black font-normal"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Offer details, Guarantee & CTA with Slide Animation */}
        <div className="max-w-xl mx-auto text-center space-y-6 pt-8 border-t border-neutral-200 overflow-hidden">
          {/* Animated One-Time Service Offer Container */}
          <div
            className={`transition-all duration-700 ease-in-out transform ${
              offerState === "visible"
                ? "opacity-100 translate-y-0 scale-100 max-h-40"
                : "opacity-0 -translate-y-8 scale-95 max-h-0 pointer-events-none overflow-hidden"
            }`}
          >
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                One-Time Service Offer
              </span>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight font-mono">
                  ₦1,000
                </span>
                <span className="text-sm font-bold text-neutral-600">
                  one-time payment
                </span>
              </div>
              <p className="text-xs font-medium text-neutral-600 leading-relaxed">
                Pay only once. Free hosting forever on Vercel with zero server
                renewal charges.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1.5 text-xs text-neutral-800 text-left">
            <div className="flex items-center gap-2 font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Low-Risk Guarantee</span>
            </div>
            <p className="text-neutral-600">
              5 revision rounds included to get your copy and styling right. If
              we can't resolve agreed mismatches, you can request a full refund.
            </p>
          </div>

          <BrandButton
            type="button"
            onClick={onGetStartedClick}
            showPortfolioIcon
            className="w-full"
          >
            Get My Portfolio — ₦1,000
          </BrandButton>
        </div>
      </div>
    </section>
  );
};
