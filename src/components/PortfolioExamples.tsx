import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SectionDecorations } from './SectionDecorations';

const samples = [
  { name: 'Hair by Remix', description: 'A polished portfolio and brand website for a hair and beauty business.', url: 'https://hairbyremix.vercel.app/' },
  { name: 'Jomo Code', description: 'A developer portfolio showcasing projects, technical skills, and contact details.', url: 'https://jomocode.vercel.app/' },
  { name: 'Splendid Communications', description: 'A professional communications portfolio highlighting services and work.', url: 'https://splendidcomm.vercel.app/' },
  { name: 'Stanlee', description: 'A personal portfolio presenting creative work and professional experience.', url: 'https://stanlee.vercel.app/' },
];

export const PortfolioExamples: React.FC = () => (
  <section id="examples" className="relative isolate overflow-hidden border-b border-neutral-200/80 bg-white py-20">
    <SectionDecorations className="-z-10" />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-14 max-w-2xl space-y-3 text-center">
<h2 className="text-balance text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">Portfolio Website Examples</h2>
        <p className="text-lg leading-relaxed text-neutral-600">Explore websites we've created. Select a preview to visit the live website.</p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2">
        {samples.map((sample) => (
          <a
            key={sample.url}
            href={sample.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${sample.name} website (opens in a new tab)`}
            className="group overflow-hidden rounded-2xl border border-neutral-200/90 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
              <iframe
                src={sample.url}
                title={`${sample.name} website preview`}
                loading="lazy"
                tabIndex={-1}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-white"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/0 transition-colors group-hover:bg-neutral-950/30 group-focus-visible:bg-neutral-950/30">
                <span className="inline-flex translate-y-2 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-neutral-900 opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <ExternalLink className="h-4 w-4" /> Visit website
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold tracking-tight text-neutral-900">{sample.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">{sample.description}</p>
              <ExternalLink className="h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-indigo-600" />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
