import React, { useState } from "react";
import { joinCVWaitlist } from "../services/submissionService";
import {
  Sparkles,
  Check,
  Send,
  Loader2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { BrandButton } from "./BrandButton";
import { SectionDecorations } from "./SectionDecorations";

export const CVBuilderWaitlist: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await joinCVWaitlist(email.trim());
      setJoined(true);
    } catch (err: any) {
      setError(err.message || "Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="cv-builder"
      className="relative isolate overflow-hidden py-16 bg-yellow-100 border-b border-yellow-200"
    >
      <SectionDecorations className="-z-10" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Text & Animated Launching Soon Pitch */}
            <div className="space-y-3 max-w-lg text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                <span>Launching Soon • Free Early Access</span>
              </div>

              {/* Animated Shouty Title */}
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 uppercase transition-all duration-1000 animate-pulse text-indigo-950">
                Automated CV Builder
              </h3>

              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                This upcoming{" "}
                <strong className="text-neutral-900">free CV builder</strong> is
                currently in development and not yet available. Join the
                waitlist to secure free priority access the moment it drops!
              </p>
            </div>

            {/* Right: Form or Success (Button under input) */}
            <div className="w-full md:w-auto md:min-w-[340px]">
              {joined ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-800 flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    You're on the list! We'll notify you as soon as early access
                    opens.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  <div className="space-y-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="Enter your email address"
                      required
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    />

                    <BrandButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-12 py-3 text-xs justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Joining Waitlist...</span>
                        </>
                      ) : (
                        <>
                          <span>Get Free Early Access</span>
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