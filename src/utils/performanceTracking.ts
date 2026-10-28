import { supabase } from '../services/supabase';

const VISITOR_ID_KEY = 'jomo_visitor_id';
const VISIT_SEEN_KEY = 'jomo_visit_seen';
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

export type EventName = 'visit' | 'return_visit' | 'conversion_click' | 'footer_reached';

function isTrackableEnvironment() {
  return import.meta.env.PROD && !LOCAL_HOSTS.has(window.location.hostname);
}

function getVisitorId(): string | null {
  try {
    let visitorId = window.localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
      visitorId = window.crypto.randomUUID();
      window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }
    return visitorId;
  } catch {
    return null;
  }
}

export function recordPerformanceEvent(eventName: EventName, eventLabel?: string) {
  if (!isTrackableEnvironment() || !supabase) return;

  const visitorId = getVisitorId();
  if (!visitorId) return;

  void supabase.from('performance_events').insert({
    visitor_id: visitorId,
    event_name: eventName,
    event_label: eventLabel ?? null,
  }).then(({ error }) => {
    if (error && import.meta.env.DEV) console.warn('Could not record analytics event:', error.message);
  });
}

export function trackVisit() {
  if (!isTrackableEnvironment()) return;
  try {
    const isReturnVisit = window.localStorage.getItem(VISIT_SEEN_KEY) === 'true';
    recordPerformanceEvent(isReturnVisit ? 'return_visit' : 'visit');
    window.localStorage.setItem(VISIT_SEEN_KEY, 'true');
  } catch {
    // Tracking is skipped when browser storage is unavailable.
  }
}

export function trackConversionClick(label: string) {
  recordPerformanceEvent('conversion_click', label);
}

export function trackFooterReach() {
  recordPerformanceEvent('footer_reached');
}
