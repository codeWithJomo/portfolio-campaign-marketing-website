import React, { useState, useRef } from 'react';
import { PortfolioStyle } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioExamples } from './components/PortfolioExamples';
import { HowItWorks } from './components/HowItWorks';
import { WhatsIncluded } from './components/WhatsIncluded';
import { GuaranteeSection } from './components/GuaranteeSection';
import { OnboardingForm } from './components/OnboardingForm';
import { CVBuilderWaitlist } from './components/CVBuilderWaitlist';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { LiveDemoModal } from './components/LiveDemoModal';
import { StickyMobileCTA } from './components/StickyMobileCTA';

export default function App() {
  const [selectedStyle, setSelectedStyle] = useState<PortfolioStyle>('developer');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoModalStyle, setDemoModalStyle] = useState<PortfolioStyle>('developer');

  const formRef = useRef<HTMLDivElement | null>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('onboarding-form');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExamples = () => {
    const el = document.getElementById('examples');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectStyle = (style: PortfolioStyle) => {
    setSelectedStyle(style);
    scrollToForm();
  };

  const handleOpenDemo = (style: PortfolioStyle) => {
    setDemoModalStyle(style);
    setIsDemoModalOpen(true);
  };

  const handleModalSelectAndProceed = (style: PortfolioStyle) => {
    setSelectedStyle(style);
    setIsDemoModalOpen(false);
    scrollToForm();
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Navigation */}
      <Navbar onGetStartedClick={scrollToForm} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onGetStartedClick={scrollToForm}
          onExploreClick={scrollToExamples}
          onOpenDemo={handleOpenDemo}
        />

        {/* 2. Portfolio Examples Section */}
        <PortfolioExamples
        />

        {/* 3. How It Works */}
        <HowItWorks onStartClick={scrollToForm} />

        {/* 4. What's Included */}
        <WhatsIncluded onGetStartedClick={scrollToForm} />

        {/* 5. Money-Back Guarantee */}
        <GuaranteeSection />

        {/* 6. Onboarding Form */}
        <OnboardingForm
          selectedStyle={selectedStyle}
          onSelectStyle={setSelectedStyle}
          formRef={formRef}
        />

        {/* 7. CV Builder Waitlist */}
        <CVBuilderWaitlist />

        {/* 8. Frequently Asked Questions */}
        <FAQSection />

        {/* 9. Final CTA */}
        <FinalCTA onGetStartedClick={scrollToForm} />
      </main>

      {/* Footer */}
      <Footer
        onSelectStyleAndScroll={handleSelectStyle}
        onOpenDemo={handleOpenDemo}
      />

      {/* Full Live Demo Modal */}
      <LiveDemoModal
        isOpen={isDemoModalOpen}
        activeStyle={demoModalStyle}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectAndProceed={handleModalSelectAndProceed}
      />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA
        onGetStartedClick={scrollToForm}
        formRef={formRef}
      />
    </div>
  );
}
