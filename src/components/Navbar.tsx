import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onGetStartedClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onGetStartedClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
  //   { label: 'Portfolio Examples', href: '#examples' },
  //   { label: 'How It Works', href: '#how-it-works' },
  //   { label: "What's Included", href: '#whats-included' },
  //   { label: 'CV Builder Waitlist', href: '#cv-builder' },
  //   { label: 'FAQ', href: '#faq' },
  //
   ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0 transition-opacity hover:opacity-85"
        >
          jomoCode<span className="text-indigo-600">.</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onGetStartedClick}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-neutral-800 active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
          >
            <span>Get My Portfolio — ₦1,000</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={onGetStartedClick}
            className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white whitespace-nowrap shrink-0"
          >
            ₦1,000
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100 focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-200 bg-white px-4 pt-2 pb-6 sm:hidden">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="rounded-md px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGetStartedClick();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500"
              >
                <span>Get My Portfolio — ₦1,000</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
