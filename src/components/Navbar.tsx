import React from "react";
import { PortfolioButton } from "./PortfolioButton";

interface NavbarProps {
  onGetStartedClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onGetStartedClick }) => {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-2xl font-extrabold tracking-tight text-neutral-900 whitespace-nowrap shrink-0 transition-opacity hover:opacity-85"
        >
          jomo<span className="text-blue-600">Code</span><span className="text-yellow-400 text-3xl">.</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <PortfolioButton onClick={onGetStartedClick} showAccents />
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={onGetStartedClick}
            className="rounded-full border border-indigo-500/45 bg-gradient-to-br from-indigo-300/80 via-indigo-100/95 to-indigo-200/85 px-3.5 py-1.5 text-sm font-bold text-indigo-950 shadow-[0_7px_18px_rgba(17,24,39,0.32),0_2px_5px_rgba(79,70,229,0.2),inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(79,70,229,0.2)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:from-indigo-300 hover:to-indigo-200 hover:shadow-[0_10px_24px_rgba(17,24,39,0.38),0_3px_8px_rgba(79,70,229,0.24),inset_0_1px_1px_rgba(255,255,255,1)] active:translate-y-0 active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            ₦1,000
          </button>
        </div>
      </div>
    </header>
  );
};
