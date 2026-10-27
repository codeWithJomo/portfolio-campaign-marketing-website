import React, { useState } from 'react';
import { joinCVWaitlist } from '../services/submissionService';
import { Sparkles, Check, Send, Loader2, AlertCircle } from 'lucide-react';
import { BrandButton } from './BrandButton';
import { SectionDecorations } from './SectionDecorations';

export const CVBuilderWaitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await joinCVWaitlist(email.trim());
      setJoined(true);
    } catch (err: any) {
      setError(err.message || 'Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cv-builder" className="relative isolate overflow-hidden py-16 bg-neutral-100/50 border-b border-neutral-200/80">
      <SectionDecorations className="-z-10" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Left: Text & Pitch */}
            <div className="space-y-2 max-w-lg text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Upcoming Free Tool</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                Your next application could be easier.
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                I'm also building a free automated CV builder to make creating a professional CV easier. Join the early-access waitlist if you'd like to try it.
              </p>
            </div>

            {/* Right: Form or Success */}
            <div className="w-full md:w-auto md:min-w-[320px]">
              {joined ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-800 flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>You're on the list! We'll notify you as soon as early access opens.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2" noValidate>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="Enter your email"
                      required
                      className="rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 flex-1"
                    />
                    <BrandButton
                      type="submit"
                      disabled={isSubmitting}
                      className="min-h-11 px-4 text-xs whitespace-nowrap"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <>
                          <span>Join the Waitlist</span>
                          <Send className="w-3 h-3" />
                        </>
                      )}
                    </BrandButton>
                  </div>
                  {error && (
                    <div className="text-[11px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{error}</span>
                    </div>
                  )}
                  <p className="text-[10px] text-neutral-400 text-left">
                    Zero spam. Just one notification when early access is ready.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
