import React from 'react';
import { ArrowRight, BriefcaseBusiness } from 'lucide-react';

interface BrandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  showPortfolioIcon?: boolean;
}

const base = 'inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-7 text-sm font-bold tracking-[-0.02em] transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';
const variants = {
  primary: 'border border-blue-400/50 bg-gradient-to-b from-[#1765f5] to-[#0751e8] text-white shadow-[0_12px_24px_rgba(22,93,225,0.24),inset_0_1px_1px_rgba(255,255,255,0.32)] hover:-translate-y-0.5 hover:shadow-[0_15px_28px_rgba(22,93,225,0.3)]',
  outline: 'border border-blue-500 bg-white text-blue-700 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-[0_10px_20px_rgba(22,93,225,0.12)]',
};

export const BrandButton: React.FC<BrandButtonProps> = ({
  variant = 'primary', showPortfolioIcon = false, className = '', children, ...props
}) => (
  <button {...props} className={`${base} ${variants[variant]} ${className}`}>
    {showPortfolioIcon && <BriefcaseBusiness aria-hidden="true" className="h-[18px] w-[18px] fill-white stroke-[#1765f5] stroke-[2.4]" />}
    <span>{children}</span>
    {variant === 'primary' && <ArrowRight aria-hidden="true" className="h-[17px] w-[17px] stroke-[2.4]" />}
  </button>
);
