type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

/** Record a lead only after the related form submission has succeeded. */
export function trackLeadSubmission(formType: 'onboarding' | 'cv_builder_waitlist') {
  (window as AnalyticsWindow).gtag?.('event', 'generate_lead', {
    form_type: formType,
  });
}
