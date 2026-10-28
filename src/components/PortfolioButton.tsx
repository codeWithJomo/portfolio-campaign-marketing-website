import React from 'react';
import { ArrowRight, BriefcaseBusiness } from 'lucide-react';

interface PortfolioButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  showAccents?: boolean;
}

export const PortfolioButton: React.FC<PortfolioButtonProps> = ({
  onClick,
  children = 'Get My Portfolio',
  className = '',
  showAccents = false,
}) => (
  <span className={`relative inline-flex ${className}`}>
    {showAccents && (
      <>
        <span aria-hidden="true" className="pointer-events-none absolute -left-6 top-1/2 h-10 w-4 -translate-y-1/2">
          <i className="absolute right-0 top-1 h-[3px] w-3 rotate-[25deg] rounded-full bg-yellow-400" />
          <i className="absolute right-1 top-1/2 h-[3px] w-3 rounded-full bg-yellow-400" />
          <i className="absolute right-0 bottom-1 h-[3px] w-3 -rotate-[25deg] rounded-full bg-yellow-400" />
        </span>
        <span aria-hidden="true" className="pointer-events-none absolute -right-6 top-1/2 h-10 w-4 -translate-y-1/2">
          <i className="absolute left-0 top-1 h-[3px] w-3 -rotate-[25deg] rounded-full bg-yellow-400" />
          <i className="absolute left-1 top-1/2 h-[3px] w-3 rounded-full bg-yellow-400" />
          <i className="absolute left-0 bottom-1 h-[3px] w-3 rotate-[25deg] rounded-full bg-yellow-400" />
        </span>
      </>
    )}
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[58px] min-w-[236px] items-center justify-center gap-3 rounded-full border border-cyan-300/60 bg-gradient-to-b from-cyan-500 to-cyan-700 px-7 text-[16px] font-semibold tracking-[-0.02em] text-white shadow-[0_12px_24px_rgba(8,145,178,0.24),inset_0_1px_1px_rgba(255,255,255,0.32),inset_0_-2px_3px_rgba(8,80,100,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_28px_rgba(8,145,178,0.3),inset_0_1px_1px_rgba(255,255,255,0.38)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 whitespace-nowrap"
    >
      <BriefcaseBusiness aria-hidden="true" className="h-[19px] w-[19px] fill-white stroke-cyan-600 stroke-[2.4]" />
      <span>{children}</span>
      <ArrowRight aria-hidden="true" className="h-[17px] w-[17px] stroke-[2.4]" />
    </button>
  </span>
);
