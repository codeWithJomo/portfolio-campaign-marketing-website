import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface StickyMobileCTAProps {
  onGetStartedClick: () => void;
  formRef?: React.RefObject<HTMLDivElement | null>;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({
  onGetStartedClick,
  formRef,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show after scrolling down 300px
      const scrolledEnough = window.scrollY > 300;

      // Check if form is visible in viewport
      let formInView = false;
      if (formRef?.current) {
        const rect = formRef.current.getBoundingClientRect();
        formInView = rect.top < window.innerHeight && rect.bottom > 0;
      }

      setIsVisible(scrolledEnough && !formInView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [formRef]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2 duration-200">
      <div className="leading-tight">
        <span className="text-xs font-bold text-neutral-900 block">Personal Portfolio</span>
        <span className="text-[11px] font-medium text-indigo-600">₦1,000 one-time</span>
      </div>

      <button
        type="button"
        onClick={onGetStartedClick}
        className="rounded-lg bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm flex items-center gap-1 active:scale-95 transition-transform"
      >
        <span>Get Started</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
