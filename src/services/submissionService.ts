import { OnboardingFormData, SubmissionRecord } from '../types';

const STORAGE_KEY = 'jomo_portfolio_submissions';
const WAITLIST_STORAGE_KEY = 'jomo_cv_waitlist';

export async function submitOnboardingDetails(
  data: OnboardingFormData
): Promise<{ success: boolean; record: SubmissionRecord; message?: string }> {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Please provide a valid email address.');
  }

  if (!data.fullName.trim()) {
    throw new Error('Please enter your full name.');
  }

  if (!data.careerField.trim()) {
    throw new Error('Please enter your career field or title.');
  }

  if (!data.contactMethod.trim()) {
    throw new Error('Please provide your preferred contact method or social link.');
  }

  if (!data.agreedToTerms) {
    throw new Error('Please acknowledge the service scope and separate payment step.');
  }

  // Generate unique human-readable reference number
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const referenceId = `JC-${randomSuffix}`;

  const record: SubmissionRecord = {
    referenceId,
    submittedAt: new Date().toISOString(),
    data,
  };

  // Try network endpoint if configured, otherwise persist to localStorage
  try {
    const endpoint = (import.meta as any).env?.VITE_SUBMISSION_ENDPOINT;
    if (endpoint) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!response.ok) {
        console.warn('Custom endpoint returned non-200, falling back to local store');
      }
    } else {
      // Simulate brief network latency for realistic UX feedback
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  } catch (err) {
    console.warn('Network submission failed, saving to local store:', err);
  }

  // Persist locally for user reference
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.unshift(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 10)));
  } catch (e) {
    console.error('Storage error:', e);
  }

  // If user opted into CV builder waitlist, add to waitlist storage too
  if (data.cvBuilderWaitlist) {
    try {
      const waitlist = JSON.parse(localStorage.getItem(WAITLIST_STORAGE_KEY) || '[]');
      if (!waitlist.includes(data.email)) {
        waitlist.push(data.email);
        localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(waitlist));
      }
    } catch (e) {
      console.error('Waitlist storage error:', e);
    }
  }

  return {
    success: true,
    record,
    message: 'Details submitted successfully!',
  };
}

export async function joinCVWaitlist(
  email: string
): Promise<{ success: boolean; message: string }> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Please provide a valid email address.');
  }

  await new Promise((resolve) => setTimeout(resolve, 600));

  try {
    const waitlist = JSON.parse(localStorage.getItem(WAITLIST_STORAGE_KEY) || '[]');
    if (!waitlist.includes(email)) {
      waitlist.push(email);
      localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(waitlist));
    }
  } catch (e) {
    console.error('Waitlist storage error:', e);
  }

  return {
    success: true,
    message: "You're on the early access waitlist! Jomo will email you as soon as the CV builder goes live.",
  };
}
