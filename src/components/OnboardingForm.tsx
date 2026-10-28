import React, { useState, useEffect, useRef } from "react";
import { PortfolioStyle, OnboardingFormData, SubmissionRecord } from "../types";
import { COLOR_PRESETS } from "../data/portfolioStyles";
import { BrandButton } from "./BrandButton";
import { SectionDecorations } from "./SectionDecorations";
import { submitOnboardingDetails } from "../services/submissionService";
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
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  X,
} from "lucide-react";

interface OnboardingFormProps {
  selectedStyle: PortfolioStyle;
  onSelectStyle: (style: PortfolioStyle) => void;
  formRef?: React.RefObject<HTMLDivElement | null>;
}

type ResumeInputMode = "upload" | "image" | "text" | "link";

export const OnboardingForm: React.FC<OnboardingFormProps> = ({
  selectedStyle,
  onSelectStyle,
  formRef,
}) => {
  const [formData, setFormData] = useState<OnboardingFormData>({
    fullName: "",
    email: "",
    careerField: "",
    preferredDesign: selectedStyle,
    colorOption: "indigo-violet",
    customPrimaryColor: "#4f46e5",
    customAccentColor: "#818cf8",
    contactMethod: "",
    projectNotes: "",
    cvBuilderWaitlist: true,
    agreedToTerms: false,
  });

  // Carousel & Resume mode state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [resumeMode, setResumeMode] = useState<ResumeInputMode>("upload");
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  // Touch swipe support for mobile carousel
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] =
    useState<SubmissionRecord | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Sync when prop selectedStyle changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      preferredDesign: selectedStyle,
    }));
  }, [selectedStyle]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setFormData((prev) => ({
        ...prev,
        projectNotes: prev.projectNotes
          ? `${prev.projectNotes}\n[Attached File: ${file.name}]`
          : `[Attached File: ${file.name}]`,
      }));
      if (errorMessage) setErrorMessage(null);
    }
  };

  const handleDesignSelect = (style: PortfolioStyle) => {
    setFormData((prev) => ({ ...prev, preferredDesign: style }));
    onSelectStyle(style);
  };

  // Step validation check before proceeding forward
  const validateCurrentStep = (): boolean => {
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        setErrorMessage("Please enter your full name.");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setErrorMessage("Please enter a valid email address.");
        return false;
      }
      if (!formData.careerField.trim()) {
        setErrorMessage(
          "Please enter your career field or professional title.",
        );
        return false;
      }
    } else if (currentStep === 2) {
      // Step 2 design & resume checks (all optional/pre-selected, so no strict blocker needed here)
    } else if (currentStep === 3) {
      if (!formData.contactMethod.trim()) {
        setErrorMessage(
          "Please provide a preferred contact method or social profile link.",
        );
        return false;
      }
    }
    setErrorMessage(null);
    return true;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Touch event handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Go Forward if valid
      if (currentStep < totalSteps && validateCurrentStep()) {
        setCurrentStep((prev) => prev + 1);
      }
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Go Back always allowed
      if (currentStep > 1) {
        setErrorMessage(null);
        setCurrentStep((prev) => prev - 1);
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.contactMethod.trim()) {
      setErrorMessage(
        "Please provide a preferred contact method or social profile link.",
      );
      return;
    }

    if (!formData.agreedToTerms) {
      setErrorMessage(
        "Please confirm that you have reviewed the service scope and separate payment step.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitOnboardingDetails(formData);
      if (result.success) {
        setSubmissionSuccess(result.record);
      }
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          "An error occurred while submitting your details. Please try again.",
      );
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
    setCurrentStep(1);
    setSelectedFileName(null);
    setFormData({
      fullName: "",
      email: "",
      careerField: "",
      preferredDesign: selectedStyle,
      colorOption: "indigo-violet",
      customPrimaryColor: "#4f46e5",
      customAccentColor: "#818cf8",
      contactMethod: "",
      projectNotes: "",
      cvBuilderWaitlist: true,
      agreedToTerms: false,
    });
  };

  return (
    <section
      id="onboarding-form"
      ref={formRef as any}
      className="relative isolate overflow-hidden py-20 bg-neutral-50/50 border-b border-neutral-200/80 scroll-mt-12"
    >
      <SectionDecorations className="-z-10" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 text-balance">
            Let's build your portfolio.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed">
            Tell us a little about yourself. Swipe through or use the steps
            below.
          </p>
        </div>

        {/* Confirmation Screen on Successful Submission */}
        {submissionSuccess ? (
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12 shadow-sm space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                Details Received!
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto">
                Thank you,{" "}
                <strong className="text-neutral-900">
                  {submissionSuccess.data.fullName}
                </strong>
                . Your portfolio inquiry has been recorded.
              </p>

              {/* Reference ID Pill */}
              <div className="inline-flex items-center gap-2 bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-2 text-xs font-mono text-neutral-700 mt-2">
                <span>Reference:</span>
                <span className="font-bold text-neutral-900">
                  {submissionSuccess.referenceId}
                </span>
                <button
                  type="button"
                  onClick={copyReferenceId}
                  className="p-1 hover:text-neutral-900 text-neutral-500 transition-colors"
                  title="Copy reference code"
                >
                  {copiedRef ? (
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
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
                  <span className="font-semibold text-neutral-900">
                    {submissionSuccess.data.careerField}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">
                    Selected Design:
                  </span>
                  <span className="font-semibold capitalize text-indigo-600">
                    {submissionSuccess.data.preferredDesign} Style
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">
                    Contact Channel:
                  </span>
                  <span className="font-semibold text-neutral-900">
                    {submissionSuccess.data.contactMethod}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">
                    Notification Email:
                  </span>
                  <span className="font-semibold text-neutral-900">
                    {submissionSuccess.data.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Roadmap */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>What Happens Next (Order Roadmap)</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-600">
                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1.5">
                  <span className="font-mono text-[10px] font-bold text-indigo-600 block">
                    01 · Review
                  </span>
                  <strong className="text-neutral-900 block text-xs">
                    Jomo reviews your submission
                  </strong>
                  <p className="text-[11px] leading-relaxed">
                    Within 24 hours, Jomo inspects your details and selected
                    design.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1.5">
                  <span className="font-mono text-[10px] font-bold text-indigo-600 block">
                    02 · Confirmation
                  </span>
                  <strong className="text-neutral-900 block text-xs">
                    Direct Contact & Payment
                  </strong>
                  <p className="text-[11px] leading-relaxed">
                    You receive a message with payment instructions (₦1,000
                    one-time fee).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1.5">
                  <span className="font-mono text-[10px] font-bold text-indigo-600 block">
                    03 · Delivery
                  </span>
                  <strong className="text-neutral-900 block text-xs">
                    Preview & 5 Revisions
                  </strong>
                  <p className="text-[11px] leading-relaxed">
                    You get a live staging link on Vercel with 5 revision rounds
                    included.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-amber-50 border border-amber-200/80 p-4 text-xs text-amber-900 flex items-start gap-3">
              <Shield className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Notice:</strong> Submitting
                this form does not charge your card. Payment is completed after
                Jomo connects with you.
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Submit another inquiry</span>
              </button>

              <button
                type="button"
                onClick={copyReferenceId}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                {copiedRef ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      Copied Reference #{submissionSuccess.referenceId}
                    </span>
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
          /* Cute Carousel Interactive Form */
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-10 shadow-sm space-y-6 relative overflow-hidden"
            noValidate
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Cute Carousel Header & Step Indicators */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center justify-center border border-indigo-100 shadow-sm">
                  {currentStep}
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                    {currentStep === 1 && "Step 1: Basic Information"}
                    {currentStep === 2 && "Step 2: Design & Resume"}
                    {currentStep === 3 && "Step 3: Contact & Review"}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    {currentStep === 1 && "Name, email & career focus"}
                    {currentStep === 2 && "Portfolio template, colors & resume"}
                    {currentStep === 3 && "Final contact details & terms"}
                  </span>
                </div>
              </div>

              {/* Step Dots */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => {
                      if (step < currentStep || validateCurrentStep()) {
                        setCurrentStep(step);
                      }
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentStep === step
                        ? "w-6 bg-indigo-600"
                        : "w-2 bg-neutral-200 hover:bg-neutral-300"
                    }`}
                    title={`Go to step ${step}`}
                  />
                ))}
              </div>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* --- CAROUSEL STEP 1: Basic Info --- */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in-50 duration-300 text-left">
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold text-neutral-800"
                  >
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

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-neutral-800"
                  >
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

                <div className="space-y-1.5">
                  <label
                    htmlFor="careerField"
                    className="block text-xs font-bold text-neutral-800"
                  >
                    Career Field or Professional Title{" "}
                    <span className="text-rose-500">*</span>
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
                  <span className="text-[11px] text-neutral-500 block">
                    Fill in these compulsory fields to proceed to the next step.
                  </span>
                </div>
              </div>
            )}

            {/* --- CAROUSEL STEP 2: Design & Resume Upload --- */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in-50 duration-300 text-left">
                {/* Preferred Portfolio Design */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    Preferred Portfolio Design{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "developer" as PortfolioStyle,
                        name: "Developer",
                        desc: "Dark navy canvas & technical matrix.",
                      },
                      {
                        id: "creative" as PortfolioStyle,
                        name: "Creative",
                        desc: "Warm cream & editorial serif gallery.",
                      },
                      {
                        id: "professional" as PortfolioStyle,
                        name: "Professional",
                        desc: "Clean white & emerald impact timeline.",
                      },
                    ].map((design) => {
                      const isCurrent = formData.preferredDesign === design.id;
                      return (
                        <button
                          key={design.id}
                          type="button"
                          onClick={() => handleDesignSelect(design.id)}
                          className={`p-3 rounded-xl border text-left transition-all relative ${
                            isCurrent
                              ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20"
                              : "border-neutral-200 bg-white hover:border-neutral-300"
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
                          <span className="text-[10px] text-neutral-500 leading-snug mt-1 block">
                            {design.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Colors */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-neutral-800">
                    Preferred Colors
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {COLOR_PRESETS.slice(0, 3).map((preset) => {
                      const isChecked = formData.colorOption === preset.id;
                      return (
                        <label
                          key={preset.id}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                            isChecked
                              ? "border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600"
                              : "border-neutral-200 bg-white"
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
                              className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                              style={{ backgroundColor: preset.primary }}
                            />
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                              style={{ backgroundColor: preset.accent }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-neutral-900 truncate">
                            {preset.name}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Flexible Resume Upload Section */}
                <div className="space-y-3 pt-2 border-t border-neutral-100">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-neutral-800">
                      Resume / CV Input{" "}
                      <span className="text-neutral-400 font-normal">
                        (Choose your preferred format)
                      </span>
                    </label>
                  </div>

                  {/* Mode Selector Tabs */}
                  <div className="grid grid-cols-4 gap-1.5 p-1 bg-neutral-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setResumeMode("upload")}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                        resumeMode === "upload"
                          ? "bg-white text-indigo-600 shadow-sm"
                          : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">PDF / Docx</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setResumeMode("image")}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                        resumeMode === "image"
                          ? "bg-white text-indigo-600 shadow-sm"
                          : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Image</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setResumeMode("text")}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                        resumeMode === "text"
                          ? "bg-white text-indigo-600 shadow-sm"
                          : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Raw Text</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setResumeMode("link")}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                        resumeMode === "link"
                          ? "bg-white text-indigo-600 shadow-sm"
                          : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Drive Link</span>
                    </button>
                  </div>

                  {/* Active Mode Input Area */}
                  <div className="pt-1">
                    {resumeMode === "upload" && (
                      <label className="border-2 border-dashed border-neutral-300 hover:border-indigo-500 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-neutral-50/50 transition-all text-center group">
                        <Upload className="w-6 h-6 text-neutral-400 group-hover:text-indigo-600 mb-1.5 transition-colors" />
                        <span className="text-xs font-semibold text-neutral-800">
                          {selectedFileName
                            ? selectedFileName
                            : "Click to upload PDF or DOCX resume"}
                        </span>
                        <span className="text-[10px] text-neutral-500 mt-0.5">
                          Maximum file size 10MB
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.docx,.doc"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}

                    {resumeMode === "image" && (
                      <label className="border-2 border-dashed border-neutral-300 hover:border-indigo-500 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-neutral-50/50 transition-all text-center group">
                        <ImageIcon className="w-6 h-6 text-neutral-400 group-hover:text-indigo-600 mb-1.5 transition-colors" />
                        <span className="text-xs font-semibold text-neutral-800">
                          {selectedFileName
                            ? selectedFileName
                            : "Click to upload screenshot or image of resume"}
                        </span>
                        <span className="text-[10px] text-neutral-500 mt-0.5">
                          PNG, JPG or WEBP
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}

                    {resumeMode === "text" && (
                      <textarea
                        name="projectNotes"
                        rows={3}
                        value={formData.projectNotes}
                        onChange={handleInputChange}
                        placeholder="Paste your experience summary, work history, or bio notes directly here..."
                        className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-all resize-y"
                      />
                    )}

                    {resumeMode === "link" && (
                      <input
                        type="url"
                        name="projectNotes"
                        value={formData.projectNotes}
                        onChange={handleInputChange}
                        placeholder="Paste Google Drive, Dropbox, or LinkedIn URL link..."
                        className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-all"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* --- CAROUSEL STEP 3: Contact & Terms --- */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-in fade-in-50 duration-300 text-left">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contactMethod"
                    className="block text-xs font-bold text-neutral-800"
                  >
                    Preferred Contact Method or Social Profile Link{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactMethod"
                    name="contactMethod"
                    required
                    value={formData.contactMethod}
                    onChange={handleInputChange}
                    placeholder="e.g. WhatsApp: +234 801 234 5678, X: @myusername, or LinkedIn"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-all"
                  />
                  <span className="text-[11px] text-neutral-500 block">
                    Jomo will use this to contact you directly to confirm
                    requirements.
                  </span>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-3 border-t border-neutral-100">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="cvBuilderWaitlist"
                      checked={formData.cvBuilderWaitlist}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs text-neutral-700 leading-relaxed">
                      I'd also like early access to Jomo's free automated CV
                      builder when it launches.
                    </span>
                  </label>

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
                      <span className="text-rose-500 mr-1">*</span>I confirm
                      that I have reviewed the service scope (1-page portfolio,
                      3 template designs, 5 revision rounds, free Vercel
                      subdomain) and understand payment (₦1,000) is a separate
                      step after Jomo reviews my inquiry.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Carousel Navigation Buttons */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm ml-auto"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <BrandButton
                  type="submit"
                  disabled={isSubmitting}
                  showPortfolioIcon
                  className="w-full sm:w-auto min-h-12 ml-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      <span>Submitting Your Details...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit My Details</span>
                    </>
                  )}
                </BrandButton>
              )}
            </div>

            {/* Swipe hint for mobile */}
            <p className="text-center text-[10px] text-neutral-400 sm:hidden">
              💡 Tip: You can swipe left/right on mobile to navigate steps.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
