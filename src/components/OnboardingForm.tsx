import React, { useState, useEffect } from 'react';
import { PortfolioStyle, OnboardingFormData, SubmissionRecord } from '../types';
import { COLOR_PRESETS } from '../data/portfolioStyles';
import { submitOnboardingDetails } from '../services/submissionService';
import {
  Check,
  Send,
  Loader2,
  AlertCircle,
  Copy,
  CheckCheck,
  Shield,
  FileCheck,
  Clock,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

interface OnboardingFormProps {
  selectedStyle: PortfolioStyle;
  onSelectStyle: (style: PortfolioStyle) => void;
  formRef?: React.RefObject<HTMLDivElement | null>;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({
  selectedStyle,
  onSelectStyle,
  formRef,
}) => {
  const [formData, setFormData] = useState<OnboardingFormData>({
    fullName: '',
    email: '',
    careerField: '',
    preferredDesign: selectedStyle,
    colorOption: 'indigo-violet',
    customPrimaryColor: '#4f46e5',
    customAccentColor: '#818cf8',
    contactMethod: '',
    projectNotes: '',
    cvBuilderWaitlist: true,
    agreedToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<SubmissionRecord | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Sync when prop selectedStyle changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      preferredDesign: selectedStyle,
    }));
  }, [selectedStyle]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handleDesignSelect = (style: PortfolioStyle) => {
    setFormData((prev) => ({ ...prev, preferredDesign: style }));
    onSelectStyle(style);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.careerField.trim()) {
      setErrorMessage('Please enter your career field or professional title.');
      return;
    }
    if (!formData.contactMethod.trim()) {
      setErrorMessage('Please provide a preferred contact method or social profile link.');
      return;
    }
    if (!formData.agreedToTerms) {
      setErrorMessage('Please confirm that you have reviewed the service scope and separate payment step.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitOnboardingDetails(formData);
      if (result.success) {
        setSubmissionSuccess(result.record);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while submitting your details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReferenceId = () => {
    if (submissionSuccess?.referenceId) {
      navigator.clipboard.writeText(submissionSuccess.referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  const resetForm = () => {
    setSubmissionSuccess(null);
    setFormData({
      fullName: '',
      email: '',
      careerField: '',
      preferredDesign: selectedStyle,
      colorOption: 'indigo-violet',
      customPrimaryColor: '#4f46e5',
      customAccentColor: '#818cf8',
      contactMethod: '',
      projectNotes: '',
      cvBuilderWaitlist: true,
      agreedToTerms: false,
    });
  };

  return (
    <section
      id="onboarding-form"
      ref={formRef as any}
      className="py-20 bg-neutral-50/50 border-b border-neutral-200/80 scroll-mt-12"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Get Started
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 text-balance">
            Let's build your portfolio.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed">
            Tell us a little about yourself to get started. It only takes a few minutes.
          </p>
        </div>

        {/* Confirmation Screen on Successful Submission */}
        {submissionSuccess ? (
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12 shadow-sm space-y-8 animate-in fade-in duration-300">
            
            {/* Header / Reference */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                Details Received!
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto">
                Thank you, <strong className="text-neutral-900">{submissionSuccess.data.fullName}</strong>. Your portfolio inquiry has been recorded.
              </p>

              {/* Reference ID Pill */}
              <div className="inline-flex items-center gap-2 bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-2 text-xs font-mono text-neutral-700 mt-2">
                <span>Reference:</span>
                <span className="font-bold text-neutral-900">{submissionSuccess.referenceId}</span>
                <button
                  type="button"
                  onClick={copyReferenceId}
                  className="p-1 hover:text-neutral-900 text-neutral-500 transition-colors"
                  title="Copy reference code"
                >
                  {copiedRef ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Submission Summary Card */}
            <div className="rounded-2xl bg-neutral-50 border border-neutral-200/80 p-5 space-y-3 text-xs text-neutral-700">
              <span className="font-bold uppercase tracking-wider text-neutral-500 text-[10px] block">
                Submission Summary
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-neutral-500 block">Career Field:</span>
                  <span className="font-semibold text-neutral-900">{submissionSuccess.data.careerField}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Selected Design:</span>
                  <span className="font-semibold capitalize text-indigo-600">
                    {submissionSuccess.data.preferredDesign} Style
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Contact Channel:</span>
                  <span className="font-semibold text-neutral-900">{submissionSuccess.data.contactMethod}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Notification Email:</span>
                  <span className="font-semibold text-neutral-900">{submissionSuccess.data.email}</span>
                </div>
              </div>
            </div>

            {/* What Happens Next - 4 Step Roadmap */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>What Happens Next (Order Roadmap)</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-600">
                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1.5">
                  <span className="font-mono text-[10px] font-bold text-indigo-600 block">01 · Review</span>
                  <strong className="text-neutral-900 block text-xs">Jomo reviews your submission</strong>
                  <p className="text-[11px] leading-relaxed">
                    Within 24 hours, Jomo inspects your title, links, and selected design to ensure all assets are ready.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1.5">
                  <span className="font-mono text-[10px] font-bold text-indigo-600 block">02 · Confirmation</span>
                  <strong className="text-neutral-900 block text-xs">Direct Contact & Payment</strong>
                  <p className="text-[11px] leading-relaxed">
                    You receive a message via your preferred contact channel with payment instructions (₦1,000 one-time fee via Bank Transfer / Paystack).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1.5">
                  <span className="font-mono text-[10px] font-bold text-indigo-600 block">03 · Delivery</span>
                  <strong className="text-neutral-900 block text-xs">Preview & 5 Revisions</strong>
                  <p className="text-[11px] leading-relaxed">
                    You get a live staging link on Vercel to inspect, with 5 revision rounds included before final handover.
                  </p>
                </div>
              </div>
            </div>

            {/* Explicit payment clarification */}
            <div className="rounded-xl bg-amber-50 border border-amber-200/80 p-4 text-xs text-amber-900 flex items-start gap-3">
              <Shield className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Notice:</strong> Your website order is pending confirmation. Submitting this form does not charge your card, and no payment details were collected. Payment is completed only after Jomo connects with you to confirm your requirements.
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Submit another inquiry or edit details</span>
              </button>

              <button
                type="button"
                onClick={copyReferenceId}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                {copiedRef ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied Reference #{submissionSuccess.referenceId}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Reference ID</span>
                  </>
                )}
              </button>
            </div>

          </div>
        ) : (
          /* Actual Interactive Form */
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-10 shadow-sm space-y-8"
            noValidate
          >
            {/* Error Notification */}
            {errorMessage && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. Basic Info: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5 text-left">
                <label htmlFor="fullName" className="block text-xs font-bold text-neutral-800">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Adebayo Ogunlesi"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-all"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="email" className="block text-xs font-bold text-neutral-800">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@domain.com"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-all"
                />
              </div>
            </div>

            {/* 2. Career Field / Title */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="careerField" className="block text-xs font-bold text-neutral-800">
                Career Field or Professional Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="careerField"
                name="careerField"
                required
                value={formData.careerField}
                onChange={handleInputChange}
                placeholder="e.g. Junior Frontend Developer, Product Designer, Data Analyst"
                className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-all"
              />
            </div>

            {/* 3. Preferred Portfolio Design (Developer, Creative, or Professional) */}
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-neutral-800">
                  Preferred Portfolio Design <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-neutral-500">
                  Automatically populated from selection
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'developer' as PortfolioStyle,
                    name: 'Developer',
                    desc: 'Dark navy canvas, technical skills matrix & code accents.',
                  },
                  {
                    id: 'creative' as PortfolioStyle,
                    name: 'Creative',
                    desc: 'Warm cream, expressive editorial serif & rich gallery.',
                  },
                  {
                    id: 'professional' as PortfolioStyle,
                    name: 'Professional',
                    desc: 'Clean white/slate, emerald impact metrics & career timeline.',
                  },
                ].map((design) => {
                  const isCurrent = formData.preferredDesign === design.id;
                  return (
                    <button
                      key={design.id}
                      type="button"
                      onClick={() => handleDesignSelect(design.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative ${
                        isCurrent
                          ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      {isCurrent && (
                        <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                      <strong className="text-xs font-bold text-neutral-900 block">
                        {design.name}
                      </strong>
                      <span className="text-[11px] text-neutral-500 leading-snug mt-1 block">
                        {design.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Preferred Colors: Presets + Custom Option */}
            <div className="space-y-3 text-left">
              <label htmlFor="colorOption" className="block text-xs font-bold text-neutral-800">
                Preferred Colors
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {COLOR_PRESETS.map((preset) => {
                  const isChecked = formData.colorOption === preset.id;
                  return (
                    <label
                      key={preset.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="colorOption"
                        value={preset.id}
                        checked={isChecked}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center -space-x-1 shrink-0">
                        <span
                          className="w-4 h-4 rounded-full border border-neutral-300"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-neutral-300"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                      <div className="text-left leading-none">
                        <span className="text-xs font-semibold text-neutral-900 block">
                          {preset.name}
                        </span>
                        <span className="text-[10px] text-neutral-500 mt-0.5 block truncate max-w-[170px]">
                          {preset.label}
                        </span>
                      </div>
                    </label>
                  );
                })}

                {/* Custom Color Option */}
                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.colorOption === 'custom'
                      ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="colorOption"
                    value="custom"
                    checked={formData.colorOption === 'custom'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="w-5 h-5 rounded-full border border-neutral-300 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 shrink-0" />
                  <div className="text-left leading-none">
                    <span className="text-xs font-semibold text-neutral-900 block">
                      Custom Color Palette
                    </span>
                    <span className="text-[10px] text-neutral-500 mt-0.5 block">
                      Specify your own hex codes
                    </span>
                  </div>
                </label>
              </div>

              {/* Custom Color Inputs if selected */}
              {formData.colorOption === 'custom' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200 mt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-700 block">
                      Primary Brand Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.customPrimaryColor || '#4f46e5'}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, customPrimaryColor: e.target.value }))
                        }
                        className="h-8 w-8 rounded border border-neutral-300 cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={formData.customPrimaryColor || '#4f46e5'}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, customPrimaryColor: e.target.value }))
                        }
                        placeholder="#4f46e5"
                        className="font-mono text-xs px-2.5 py-1.5 rounded border border-neutral-300 bg-white w-28 uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-700 block">
                      Accent Highlight Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.customAccentColor || '#818cf8'}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, customAccentColor: e.target.value }))
                        }
                        className="h-8 w-8 rounded border border-neutral-300 cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={formData.customAccentColor || '#818cf8'}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, customAccentColor: e.target.value }))
                        }
                        placeholder="#818cf8"
                        className="font-mono text-xs px-2.5 py-1.5 rounded border border-neutral-300 bg-white w-28 uppercase"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Contact Method / Social Profile Link */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="contactMethod" className="block text-xs font-bold text-neutral-800">
                Preferred Contact Method or Social Profile Link <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="contactMethod"
                name="contactMethod"
                required
                value={formData.contactMethod}
                onChange={handleInputChange}
                placeholder="e.g. WhatsApp: +234 801 234 5678, X: @myusername, or LinkedIn: in/myname"
                className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-all"
              />
              <span className="text-[11px] text-neutral-500 block">
                Jomo will use this to contact you directly to confirm requirements.
              </span>
            </div>

            {/* 6. Optional: Project links / Bio summary */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="projectNotes" className="block text-xs font-bold text-neutral-800">
                Projects, Resume link, or Bio Notes <span className="text-neutral-400 font-normal">(Optional)</span>
              </label>
              <textarea
                id="projectNotes"
                name="projectNotes"
                rows={3}
                value={formData.projectNotes}
                onChange={handleInputChange}
                placeholder="Share any GitHub repos, Behance/Figma links, Google Drive CV, or specific sections you'd like highlighted..."
                className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-all resize-y"
              />
            </div>

            {/* 7. Checkboxes: CV Builder Waitlist & Agreement */}
            <div className="space-y-3 pt-2 border-t border-neutral-100 text-left">
              {/* Optional CV Builder Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="cvBuilderWaitlist"
                  checked={formData.cvBuilderWaitlist}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs text-neutral-700 leading-relaxed">
                  I'd also like early access to Jomo's free automated CV builder when it launches.
                </span>
              </label>

              {/* Required Terms Acknowledgement Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  required
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs text-neutral-800 leading-relaxed font-medium">
                  <span className="text-rose-500 mr-1">*</span>
                  I confirm that I have reviewed the service scope (1-page portfolio, 3 template designs, 5 revision rounds, free Vercel subdomain) and understand that payment (₦1,000) and order confirmation are separate steps handled after Jomo reviews my inquiry.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-4 text-sm font-semibold text-white shadow-md hover:bg-neutral-800 active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Submitting Your Details...</span>
                  </>
                ) : (
                  <>
                    <span>Submit My Details</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              {/* Privacy Reassurance underneath */}
              <p className="text-center text-[11px] text-neutral-500 leading-normal max-w-md mx-auto">
                🔒 Your information is private and will only be used by Jomo to respond to your inquiry and prepare your personalized portfolio website. No spam or unsolicited marketing.
              </p>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
