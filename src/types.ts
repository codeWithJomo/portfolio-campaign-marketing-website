export type PortfolioStyle = 'developer' | 'creative' | 'professional';

export interface ColorPreset {
  id: string;
  name: string;
  primary: string;
  accent: string;
  background: string;
  label: string;
}

export interface OnboardingFormData {
  fullName: string;
  email: string;
  careerField: string;
  preferredDesign: PortfolioStyle;
  colorOption: string;
  customPrimaryColor?: string;
  customAccentColor?: string;
  contactMethod: string;
  projectNotes?: string;
  cvBuilderWaitlist: boolean;
  agreedToTerms: boolean;
}

export interface SubmissionRecord {
  referenceId: string;
  submittedAt: string;
  data: OnboardingFormData;
}

export interface PortfolioStyleInfo {
  id: PortfolioStyle;
  title: string;
  subtitle: string;
  styleLabel: string;
  description: string;
  badge: string;
  targetAudience: string;
  accentHex: string;
  bgHex: string;
  highlights: string[];
}
