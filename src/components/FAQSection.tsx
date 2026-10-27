import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { SectionDecorations } from './SectionDecorations';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative isolate overflow-hidden py-20 bg-white border-b border-neutral-200/80">
      <SectionDecorations className="-z-10" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Got Questions?
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 text-balance">
            Frequently asked questions.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed">
            Honest, straightforward answers about hosting, revisions, domains, and our guarantee.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-neutral-200/80 border-y border-neutral-200/80">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-5 transition-colors">
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left focus:outline-none group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors">
                    {item.question}
                  </span>
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200'
                    }`}
                  >
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pb-1 text-sm text-neutral-600 leading-relaxed animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact fallback note */}
        <div className="mt-10 rounded-2xl bg-neutral-50 border border-neutral-200 p-5 text-center text-xs text-neutral-600">
          <span>Still have a question not listed here? Submit your details with a note in the form, and Jomo will clarify everything before you confirm.</span>
        </div>

      </div>
    </section>
  );
};
