type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  loadGoogleAnalytics?: () => void;
  googleAnalyticsLoaded?: boolean;
};

const CONSENT_STORAGE_KEY = 'jomo_analytics_consent';

export type AnalyticsConsent = 'accepted' | 'rejected' | null;

export function getAnalyticsConsent(): AnalyticsConsent {
  try {
    const consent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return consent === 'accepted' || consent === 'rejected' ? consent : null;
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(consent: Exclude<AnalyticsConsent, null>) {
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.gtag?.('consent', 'update', {
    analytics_storage: consent === 'accepted' ? 'granted' : 'denied',
  });

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, consent);
  } catch {
    // The consent choice still applies for the current page if storage is unavailable.
  }

  if (consent === 'accepted') {
    analyticsWindow.loadGoogleAnalytics?.();
  }
}

/** Record a lead only after the related form submission has succeeded. */
export function trackLeadSubmission(formType: 'onboarding' | 'cv_builder_waitlist') {
  const analyticsWindow = window as AnalyticsWindow;
  if (getAnalyticsConsent() !== 'accepted' || !analyticsWindow.googleAnalyticsLoaded) return;

  analyticsWindow.gtag?.('event', 'generate_lead', {
    form_type: formType,
  });
}
