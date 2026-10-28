import { useEffect, useState } from "react";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsent,
} from "../utils/analytics";

export function ConsentBanner() {
  const [consent, setConsent] = useState<AnalyticsConsent>(null);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const savedConsent = getAnalyticsConsent();
    setConsent(savedConsent);

    if (savedConsent === "accepted") {
      setAnalyticsConsent("accepted");
    }
  }, []);

  const chooseConsent = (choice: Exclude<AnalyticsConsent, null>) => {
    setAnalyticsConsent(choice);
    setConsent(choice);
    setShowPreferences(false);
  };

  if (consent !== null && !showPreferences) {
    return (
      <button
        type="button"
        onClick={() => setShowPreferences(true)}
        className="fixed bottom-4 left-4 z-[60] rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 shadow-lg transition hover:border-indigo-400 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label="Open analytics cookie preferences"
      >
        Cookie settings
      </button>
    );
  }

  return (
    <section
      aria-label="Analytics cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-neutral-200 bg-white/95 shadow-[0_-12px_40px_rgba(15,23,42,0.12)] backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between md:py-6">
        <div className="max-w-2xl">
          <p className="text-base font-bold text-neutral-900">
            Your privacy matters
          </p>
          <p className="mt-1 text-sm leading-6 text-neutral-600">
            We use Google Analytics to understand website visits and successful
            form submissions. <br /> Analytics is optional and remains off
            unless you opt in. We never send your form details to Google
            Analytics.  Our website also tracks visits using first-party
            software. This tracking only collects visit counts and
            timestamps.{" "}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => chooseConsent("rejected")}
            className="rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Reject analytics
          </button>
          <button
            type="button"
            onClick={() => chooseConsent("accepted")}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Accept analytics
          </button>
          {showPreferences && (
            <button
              type="button"
              onClick={() => setShowPreferences(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
