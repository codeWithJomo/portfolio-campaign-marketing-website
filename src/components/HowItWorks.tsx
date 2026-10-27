import React from "react";
import { Palette, FileText, Globe2 } from "lucide-react";
import { BrandButton } from "./BrandButton";
import { SectionDecorations } from "./SectionDecorations";

interface HowItWorksProps {
  onStartClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartClick }) => {
  const steps = [
    {
      num: "01",
      title: "Choose your design",
      desc: "Pick one of the three portfolio styles and your preferred colors that best match your professional identity.",
      icon: Palette,
      highlight: "Developer, Creative, or Professional",
    },
    {
      num: "02",
      title: "Share your details",
      desc: "Tell us about yourself, your skills, projects, experience, resume link, and preferred contact channels.",
      icon: FileText,
      highlight: "Simple 3-minute onboarding form",
    },
    {
      num: "03",
      title: "Get your website",
      desc: "We'll personalize the design, publish your website on a free Vercel subdomain, and give you the live link.",
      icon: Globe2,
      highlight: "Free lifetime hosting & 5 revisions",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative isolate overflow-hidden py-20 bg-neutral-50/70 border-b border-neutral-200/80"
    >
      <SectionDecorations className="-z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 text-balance">
            How it works.
          </h2>
          <p className="text-lg text-black leading-relaxed">
            No technical knowledge required. We handle setup, formatting, and
            deployment so you can focus on landing interviews.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative rounded-2xl bg-purple-600 border border-purple-700 p-8 shadow-xs flex flex-col justify-between space-y-6 text-white font-bold hover:bg-green-600 hover:border-green-700 hover:scale-105 hover:z-10 hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white bg-white/15 border border-white/25 px-2.5 py-1 rounded">
                      Step {step.num}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-white text-purple-700 flex items-center justify-center group-hover:bg-green-100 group-hover:text-green-800">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-blue-950 group-hover:text-green-950">
                    {step.num} — {step.title}
                  </h3>

                  <p className="text-sm font-bold text-white leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/25">
                  <span className="text-xs font-bold text-white">
                    {step.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA below steps */}
        <div className="mt-12 text-center">
          <BrandButton type="button" onClick={onStartClick} className="px-8">
            Start My Portfolio
          </BrandButton>
        </div>
      </div>
    </section>
  );
};
