import React from 'react';
import { PortfolioStyle } from '../types';
import { ExternalLink, Github, Sparkles, Terminal, Briefcase, Award, ArrowRight } from 'lucide-react';

interface PortfolioPreviewProps {
  style: PortfolioStyle;
  viewMode?: 'desktop' | 'mobile';
  accentColor?: string;
  className?: string;
}

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({
  style,
  viewMode = 'desktop',
  accentColor,
  className = '',
}) => {
  if (style === 'developer') {
    const accent = accentColor || '#6366f1';
    return (
      <div
        className={`w-full h-full text-left font-sans select-none overflow-hidden flex flex-col bg-[#0b0f19] text-neutral-200 ${className}`}
      >
        {/* Terminal / Browser Chrome Top */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 bg-[#0e1424] text-[11px] text-neutral-400">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-[10px] text-neutral-400 hidden sm:inline">
              adebayo.dev · portfolio
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-emerald-400">available for hire</span>
            <Github className="w-3.5 h-3.5 text-neutral-400" />
          </div>
        </div>

        {/* Portfolio Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4 overflow-y-auto">
          {/* Hero Section */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-indigo-400">
              <Terminal className="w-3 h-3" />
              <span>Full-Stack Software Engineer</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
              Adebayo Ogunlesi
            </h3>
            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
              Building scalable cloud backends, distributed microservices, and reactive TypeScript frontends.
            </p>

            {/* Quick Skills / Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] font-mono rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Project Card */}
          <div className="rounded-lg border border-neutral-800 bg-[#12192c] p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono text-neutral-300 font-semibold">PayFlow API Engine</span>
              <span className="text-[10px] text-emerald-400 font-mono">99.98% SLA</span>
            </div>
            <p className="text-[11px] text-neutral-400 line-clamp-2">
              High-throughput payment reconciliation service processing 14k events/sec with Redis queues.
            </p>
            <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-400">
              <span className="font-mono text-indigo-400">Go · Redis · Kafka</span>
              <span className="flex items-center gap-1 text-white hover:underline">
                View Project <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>

          {/* Experience Strip */}
          <div className="pt-1 border-t border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-400">
            <span>5+ Years Experience</span>
            <span>·</span>
            <span>24 GitHub Repos</span>
            <span>·</span>
            <span className="text-indigo-400 font-medium">Download Resume</span>
          </div>
        </div>
      </div>
    );
  }

  if (style === 'creative') {
    return (
      <div
        className={`w-full h-full text-left font-sans select-none overflow-hidden flex flex-col bg-[#faf7f2] text-neutral-800 ${className}`}
      >
        {/* Editorial Top bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-amber-900/10 bg-[#f4efe6] text-[11px] text-neutral-600">
          <span className="font-serif tracking-widest uppercase font-semibold text-neutral-900 text-[10px]">
            CHIOMA OKAFOR
          </span>
          <span className="text-[10px] tracking-wide text-amber-800 uppercase font-medium">
            SELECTED WORKS 2026
          </span>
        </div>

        {/* Portfolio Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 overflow-y-auto">
          {/* Hero Statement */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-amber-800 font-semibold">
              Brand & Product Designer
            </span>
            <h3 className="text-base sm:text-xl font-serif text-neutral-900 leading-tight">
              Crafting emotional digital identities & tactile user interfaces.
            </h3>
            <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
              Transforming ambitious brands through typography, human psychology, and refined visual craft.
            </p>
          </div>

          {/* Visual Showcase Card */}
          <div className="rounded-lg border border-amber-900/10 bg-[#f0eade] p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-serif font-bold text-neutral-900">Kora Skincare Identity</span>
              <span className="text-[10px] text-amber-900 uppercase tracking-wider font-semibold">Editorial</span>
            </div>
            <div className="h-16 w-full rounded bg-gradient-to-tr from-amber-700/20 via-orange-500/15 to-stone-200 flex items-center justify-center border border-amber-900/5">
              <span className="text-[11px] font-serif italic text-amber-950 font-medium">
                Art Direction & Packaging System
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-neutral-600 pt-0.5">
              <span>Brand Strategy & Design</span>
              <span className="font-semibold text-neutral-900 flex items-center gap-1">
                Read Story <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>

          {/* Bottom proof strip */}
          <div className="pt-1 border-t border-amber-900/10 flex items-center justify-between text-[10px] text-neutral-500">
            <span>Featured in DesignWeek</span>
            <span>·</span>
            <span>Lagos & London</span>
            <span>·</span>
            <span className="text-amber-900 font-serif font-semibold">Get in Touch</span>
          </div>
        </div>
      </div>
    );
  }

  // Professional style
  return (
    <div
      className={`w-full h-full text-left font-sans select-none overflow-hidden flex flex-col bg-white text-neutral-900 ${className}`}
    >
      {/* Clean Corporate Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-200 bg-neutral-50/70 text-[11px] text-neutral-600">
        <span className="font-semibold tracking-tight text-neutral-900">TUNDE BELLO</span>
        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
          Open to Leadership Roles
        </span>
      </div>

      {/* Portfolio Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 overflow-y-auto">
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">
            Senior Product Manager · Fintech
          </span>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 leading-tight">
            Driving $18M ARR growth with data-driven fintech products.
          </h3>
          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
            Ex-Flutterwave product lead specializing in payments infrastructure, merchant acquisition, and retention.
          </p>
        </div>

        {/* Quantified Metrics Highlight */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-2.5 space-y-0.5">
            <span className="text-[10px] text-neutral-500 block uppercase font-medium">Merchant Growth</span>
            <span className="text-base font-bold text-neutral-900 font-mono tracking-tight">+240%</span>
            <span className="text-[9px] text-emerald-600 block">Scaled to 52,000 users</span>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-2.5 space-y-0.5">
            <span className="text-[10px] text-neutral-500 block uppercase font-medium">Onboarding Drop-off</span>
            <span className="text-base font-bold text-neutral-900 font-mono tracking-tight">-38%</span>
            <span className="text-[9px] text-emerald-600 block">Streamlined KYC UX</span>
          </div>
        </div>

        {/* Case Study Card */}
        <div className="rounded-lg border border-neutral-200 p-2.5 bg-white text-[11px] space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-900">Cross-Border FX Liquidity Engine</span>
            <span className="text-[10px] text-neutral-500">Case Study</span>
          </div>
          <p className="text-[10px] text-neutral-600 line-clamp-1">
            Re-architected instant settlement corridor between Nigeria, Kenya, and Ghana.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-1 border-t border-neutral-200 flex items-center justify-between text-[10px] text-neutral-500">
          <span>7+ Years Product Strategy</span>
          <span>·</span>
          <span>BSc Computer Science</span>
          <span>·</span>
          <span className="text-emerald-700 font-medium">View Resume (PDF)</span>
        </div>
      </div>
    </div>
  );
};
