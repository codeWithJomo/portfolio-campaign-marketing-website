import React, { useState, useEffect } from 'react';
import { PortfolioStyle } from '../types';
import { PORTFOLIO_STYLES } from '../data/portfolioStyles';
import {
  X,
  Laptop,
  Smartphone,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  Twitter,
  ArrowRight,
  Check,
  Download,
  Terminal,
  FolderGit2,
  Briefcase,
  Layers,
} from 'lucide-react';

interface LiveDemoModalProps {
  isOpen: boolean;
  activeStyle: PortfolioStyle;
  onClose: () => void;
  onSelectAndProceed: (style: PortfolioStyle) => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({
  isOpen,
  activeStyle,
  onClose,
  onSelectAndProceed,
}) => {
  const [currentStyle, setCurrentStyle] = useState<PortfolioStyle>(activeStyle);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    setCurrentStyle(activeStyle);
  }, [activeStyle]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentInfo = PORTFOLIO_STYLES.find((s) => s.id === currentStyle) || PORTFOLIO_STYLES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-6xl h-[92vh] flex flex-col rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-neutral-950 border-b border-neutral-800 text-white shrink-0">
          
          {/* Style Selector Tabs */}
          <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            {PORTFOLIO_STYLES.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setCurrentStyle(style.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  currentStyle === style.id
                    ? 'bg-neutral-800 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {style.id}
              </button>
            ))}
          </div>

          {/* Viewport switch: Desktop vs Mobile */}
          <div className="hidden sm:flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-neutral-400">
            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                deviceMode === 'desktop' ? 'bg-neutral-800 text-white shadow-xs' : 'hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                deviceMode === 'mobile' ? 'bg-neutral-800 text-white shadow-xs' : 'hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Actions: Choose & Close */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectAndProceed(currentStyle)}
              className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Choose This Design (₦1,000)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Browser Mockup Preview Area */}
        <div className="flex-1 bg-neutral-950/70 p-2 sm:p-4 overflow-y-auto flex items-center justify-center">
          
          <div
            className={`transition-all duration-300 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col ${
              deviceMode === 'mobile'
                ? 'w-full max-w-[390px] h-[78vh] border-4 border-neutral-800'
                : 'w-full h-full max-w-5xl border border-neutral-700/80'
            }`}
          >
            {/* Browser Address Bar */}
            <div className="bg-neutral-100 border-b border-neutral-200 px-3 py-2 flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 max-w-sm mx-auto bg-white border border-neutral-200 rounded px-2.5 py-0.5 text-[11px] font-mono text-neutral-500 truncate text-center">
                https://{currentStyle === 'developer' ? 'adebayo-dev' : currentStyle === 'creative' ? 'chioma-atelier' : 'tunde-bello'}.vercel.app
              </div>
            </div>

            {/* Simulated Live Website Content */}
            <div className="flex-1 overflow-y-auto">
              {currentStyle === 'developer' && <DeveloperFullPortfolio />}
              {currentStyle === 'creative' && <CreativeFullPortfolio />}
              {currentStyle === 'professional' && <ProfessionalFullPortfolio />}
            </div>

          </div>

        </div>

        {/* Modal Bottom Banner */}
        <div className="px-4 py-2.5 bg-neutral-900 border-t border-neutral-800 text-xs text-neutral-400 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-200">{currentInfo.title}</span>
            <span>·</span>
            <span>{currentInfo.targetAudience}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Free Vercel Subdomain · 5 Revision Rounds</span>
            <button
              type="button"
              onClick={() => onSelectAndProceed(currentStyle)}
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline text-xs"
            >
              Select & Fill Form →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

/* =========================================================
   SIMULATED FULL PORTFOLIO WEBSITES FOR INTERACTIVE PREVIEWS
   ========================================================= */

const DeveloperFullPortfolio: React.FC = () => {
  return (
    <div className="bg-[#0b0f19] text-neutral-200 min-h-full font-sans selection:bg-indigo-500 selection:text-white">
      {/* Dev Navigation */}
      <nav className="border-b border-neutral-800/80 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0b0f19]/90 backdrop-blur-md z-10">
        <div className="flex items-center gap-2 font-mono text-sm font-bold text-white">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span>adebayo.dev</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-xs text-neutral-400 font-mono">
          <a href="#about" className="hover:text-white transition-colors">/about</a>
          <a href="#projects" className="hover:text-white transition-colors">/projects</a>
          <a href="#stack" className="hover:text-white transition-colors">/stack</a>
          <a href="#contact" className="hover:text-white transition-colors">/contact</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs flex items-center gap-1.5">
            <Download className="w-3 h-3" />
            <span>Resume</span>
          </button>
        </div>
      </nav>

      {/* Dev Hero */}
      <header className="px-6 py-12 sm:py-16 max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Open to Full-Stack Engineering roles</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Hi, I'm Adebayo Ogunlesi.
          </h1>
          <p className="text-base sm:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed">
            Senior Full-Stack Engineer crafting resilient backend services and high-performance Web applications with Go, TypeScript, and cloud-native architecture.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#projects"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-2 hover:bg-indigo-500"
          >
            <span>View Featured Works</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold flex items-center gap-2 hover:text-white"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Profile</span>
          </a>
        </div>
      </header>

      {/* Technical Stack */}
      <section className="px-6 py-10 max-w-4xl mx-auto border-t border-neutral-900">
        <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-6">
          // Core Competencies & Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { cat: 'Languages', items: ['TypeScript', 'Go', 'Python', 'SQL'] },
            { cat: 'Frontend', items: ['React', 'Next.js', 'Tailwind', 'Zustand'] },
            { cat: 'Backend', items: ['Node.js', 'Express', 'gRPC', 'GraphQL'] },
            { cat: 'DevOps & Cloud', items: ['Docker', 'AWS ECS', 'PostgreSQL', 'Redis'] },
          ].map((group) => (
            <div key={group.cat} className="p-3.5 rounded-lg bg-[#12192c] border border-neutral-800/80 space-y-2">
              <span className="text-[11px] font-mono text-neutral-400 block">{group.cat}</span>
              <ul className="text-xs space-y-1 font-mono text-neutral-200">
                {group.items.map((it) => (
                  <li key={it} className="flex items-center gap-1.5">
                    <span className="text-indigo-400 text-[10px]">›</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 py-10 max-w-4xl mx-auto border-t border-neutral-900 space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400">
          // Featured Projects
        </h2>
        <div className="space-y-4">
          {[
            {
              title: 'PayFlow Real-Time Ledger',
              desc: 'Double-entry distributed bookkeeping API processing 14,000 tx/sec with idempotency keys and cryptographic reconciliation.',
              tech: ['Go', 'PostgreSQL', 'Redis', 'Docker'],
              stats: '99.99% Availability',
            },
            {
              title: 'DevPulse Microservice Metrics',
              desc: 'Telemetry aggregator client and dashboard visualizing container memory utilization and p99 query latency in real time.',
              tech: ['React', 'TypeScript', 'WebSockets', 'Tailwind'],
              stats: '1.2k Stars on GitHub',
            },
          ].map((proj) => (
            <div key={proj.title} className="p-5 rounded-xl bg-[#12192c] border border-neutral-800 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{proj.title}</h3>
                  <p className="text-xs text-neutral-400 mt-1">{proj.desc}</p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  {proj.stats}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-800/60 text-xs">
                <div className="flex gap-1.5 font-mono text-[10px] text-neutral-400">
                  {proj.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 cursor-pointer">
                    Live Demo <ExternalLink className="w-3 h-3" />
                  </span>
                  <span className="flex items-center gap-1 text-neutral-400 hover:text-white cursor-pointer">
                    Code <Github className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dev Footer */}
      <footer className="px-6 py-8 border-t border-neutral-900 text-center text-xs text-neutral-500 font-mono">
        <p>Adebayo Ogunlesi · Lagos, Nigeria · adebayo@example.com</p>
      </footer>
    </div>
  );
};

const CreativeFullPortfolio: React.FC = () => {
  return (
    <div className="bg-[#faf7f2] text-neutral-900 min-h-full font-sans selection:bg-amber-800 selection:text-white">
      {/* Creative Header */}
      <nav className="border-b border-amber-900/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#faf7f2]/95 backdrop-blur-sm z-10">
        <span className="font-serif tracking-widest uppercase font-bold text-sm text-neutral-900">
          Chioma Okafor
        </span>
        <div className="flex items-center gap-6 text-xs uppercase tracking-wider text-neutral-600 font-medium">
          <span className="hover:text-neutral-900 cursor-pointer">Works</span>
          <span className="hover:text-neutral-900 cursor-pointer">About</span>
          <span className="hover:text-neutral-900 cursor-pointer">Contact</span>
        </div>
      </nav>

      {/* Editorial Hero */}
      <header className="px-6 py-12 sm:py-16 max-w-4xl mx-auto space-y-6 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
          Brand Strategy & Visual Direction
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-neutral-900 leading-[1.15]">
          Shaping memorable identities for forward-looking brands.
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 max-w-2xl font-light leading-relaxed">
          Based between Lagos and London. Specializing in brand identity systems, editorial design, digital product art direction, and packaging.
        </p>
      </header>

      {/* Works Gallery */}
      <section className="px-6 py-10 max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
          <h2 className="text-sm font-serif italic text-neutral-900 font-bold">Selected Projects (2024–2026)</h2>
          <span className="text-xs text-neutral-500 uppercase tracking-wider">04 Cases</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Kora Organic Botanicals',
              cat: 'Identity & Packaging',
              gradient: 'from-amber-200 via-stone-200 to-amber-100',
              client: 'Kora Wellness UK',
            },
            {
              title: 'Aura Fintech Banking UI',
              cat: 'Digital Product Design',
              gradient: 'from-orange-100 via-rose-100 to-stone-200',
              client: 'Aura Capital',
            },
            {
              title: 'Nollywood Archive Pavilion',
              cat: 'Exhibition & Spatial Design',
              gradient: 'from-stone-300 via-amber-100 to-stone-200',
              client: 'Arts Council Lagos',
            },
            {
              title: 'Verve Artisan Roasters',
              cat: 'Packaging & E-Commerce',
              gradient: 'from-amber-100 via-orange-100 to-stone-300',
              client: 'Verve Coffee Co.',
            },
          ].map((item) => (
            <div key={item.title} className="group rounded-xl border border-amber-900/10 bg-[#f4efe6] overflow-hidden space-y-3 p-4">
              <div className={`aspect-[4/3] w-full rounded-lg bg-gradient-to-tr ${item.gradient} flex items-center justify-center p-6 text-center border border-amber-900/5 group-hover:scale-[1.01] transition-transform`}>
                <span className="font-serif italic text-sm text-neutral-800 font-medium">
                  {item.title}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 className="font-serif font-bold text-sm text-neutral-900">{item.title}</h3>
                  <p className="text-[11px] text-neutral-600">{item.cat} · {item.client}</p>
                </div>
                <span className="text-xs font-semibold text-amber-900 flex items-center gap-1">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creative Footer */}
      <footer className="px-6 py-10 border-t border-amber-900/10 text-center text-xs text-neutral-600 font-serif">
        <p>Chioma Okafor · Available for Select Commissions</p>
      </footer>
    </div>
  );
};

const ProfessionalFullPortfolio: React.FC = () => {
  return (
    <div className="bg-white text-neutral-900 min-h-full font-sans selection:bg-emerald-600 selection:text-white">
      {/* Professional Header */}
      <nav className="border-b border-neutral-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <span className="font-extrabold tracking-tight text-sm text-neutral-900 uppercase">
          Tunde Bello
        </span>
        <div className="flex items-center gap-6 text-xs text-neutral-600 font-medium">
          <span className="hover:text-neutral-900 cursor-pointer">Experience</span>
          <span className="hover:text-neutral-900 cursor-pointer">Impact</span>
          <span className="hover:text-neutral-900 cursor-pointer">Education</span>
          <span className="hover:text-neutral-900 cursor-pointer">Contact</span>
        </div>
      </nav>

      {/* Professional Hero */}
      <header className="px-6 py-12 sm:py-16 max-w-4xl mx-auto space-y-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
          Senior Product Manager · Fintech & Payments
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          Scaling high-growth payment products across emerging markets.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed">
          7+ years leading cross-functional squads of engineers, data scientists, and designers. Proven track record growing B2B payments, user retention, and regulatory compliance.
        </p>

        {/* Quantified Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50">
            <span className="text-[10px] text-neutral-500 uppercase font-semibold">ARR Managed</span>
            <span className="text-xl font-extrabold text-neutral-900 block font-mono">$18.4M</span>
            <span className="text-[10px] text-emerald-600 font-medium">+82% YoY</span>
          </div>
          <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50">
            <span className="text-[10px] text-neutral-500 uppercase font-semibold">Active Merchants</span>
            <span className="text-xl font-extrabold text-neutral-900 block font-mono">52,000+</span>
            <span className="text-[10px] text-emerald-600 font-medium">Across 4 countries</span>
          </div>
          <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50">
            <span className="text-[10px] text-neutral-500 uppercase font-semibold">KYC Drop-off</span>
            <span className="text-xl font-extrabold text-neutral-900 block font-mono">-38%</span>
            <span className="text-[10px] text-emerald-600 font-medium">UX redesign</span>
          </div>
          <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50">
            <span className="text-[10px] text-neutral-500 uppercase font-semibold">Product Releases</span>
            <span className="text-xl font-extrabold text-neutral-900 block font-mono">14 Major</span>
            <span className="text-[10px] text-emerald-600 font-medium">On-schedule</span>
          </div>
        </div>
      </header>

      {/* Career Experience Timeline */}
      <section className="px-6 py-10 max-w-4xl mx-auto border-t border-neutral-200 space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
          Career Milestones & Leadership
        </h2>
        <div className="space-y-4">
          {[
            {
              role: 'Lead Product Manager',
              company: 'Kuda Technologies',
              period: '2023 — Present',
              desc: 'Spearheading SME merchant acquiring products. Grew monthly active merchant accounts by 140% while cutting fraud disputes by 24%.',
            },
            {
              role: 'Senior Product Manager',
              company: 'Flutterwave',
              period: '2021 — 2023',
              desc: 'Managed cross-border FX payout infrastructure. Handled settlements exceeding $120M quarterly volume.',
            },
          ].map((exp) => (
            <div key={exp.role} className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-neutral-900 text-sm">{exp.role} · {exp.company}</span>
                <span className="text-xs text-neutral-500 font-mono">{exp.period}</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="px-6 py-8 border-t border-neutral-200 text-center text-xs text-neutral-500">
        <p>Tunde Bello · Lagos, Nigeria · linkedin.com/in/tundebello</p>
      </footer>
    </div>
  );
};
