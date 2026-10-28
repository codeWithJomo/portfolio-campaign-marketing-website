import { OnboardingFormData, SubmissionRecord } from '../types';
import { supabase } from './supabase';

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

  if (!supabase) throw new Error('Submissions are temporarily unavailable. Please try again later.');
  const { error } = await supabase.from('portfolio_submissions').insert({
    reference_id: record.referenceId,
    submitted_at: record.submittedAt,
    full_name: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    career_field: data.careerField.trim(),
    preferred_design: data.preferredDesign,
    color_option: data.colorOption,
    custom_primary_color: data.customPrimaryColor ?? null,
    custom_accent_color: data.customAccentColor ?? null,
    contact_method: data.contactMethod.trim(),
    project_notes: data.projectNotes ?? null,
    cv_builder_waitlist: data.cvBuilderWaitlist,
    agreed_to_terms: data.agreedToTerms,
  });

  if (error) throw new Error(`Could not save your submission: ${error.message}`);

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

  const normalizedEmail = email.trim().toLowerCase();
  if (!supabase) throw new Error('The waitlist is temporarily unavailable. Please try again later.');
  const { error } = await supabase
    .from('cv_builder_waitlist')
    .upsert({ email: normalizedEmail }, { onConflict: 'email', ignoreDuplicates: true });

  if (error) throw new Error(`Could not join the waitlist: ${error.message}`);

  return {
    success: true,
    message: "You're on the early access waitlist! Jomo will email you as soon as the CV builder goes live.",
  };
}
