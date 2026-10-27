import React from 'react';

/** Reusable, purely decorative blue and yellow shapes for section backgrounds. */
type SectionDecorationsProps = { className?: string; variant?: 'default' | 'hero' };

export const SectionDecorations: React.FC<SectionDecorationsProps> = ({ className = '', variant = 'default' }) => (
  <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
    {variant === 'hero' ? (
      <>
        <span className="absolute -left-16 bottom-[-100px] h-72 w-72 rounded-[42%] bg-blue-600/[0.07] after:absolute after:-right-14 after:bottom-[-10px] after:h-40 after:w-40 after:rounded-full after:bg-yellow-300/[0.10]" />
        <span className="absolute -right-14 bottom-[-100px] h-52 w-52 rounded-full bg-yellow-300/[0.10]" />
        <span className="absolute -right-8 top-16 h-12 w-24 rotate-[-20deg] rounded-full bg-yellow-300/[0.12]" />
      </>
    ) : (
      <>
        <span className="absolute -left-24 bottom-[-7rem] h-64 w-64 rounded-[42%] bg-blue-500/[0.045]" />
        <span className="absolute -left-10 bottom-[-9rem] h-40 w-40 rounded-full bg-yellow-300/[0.10]" />
        <span className="absolute -right-20 top-[-6rem] h-52 w-52 rounded-full bg-blue-500/[0.035]" />
        <span className="absolute -right-5 top-12 h-8 w-16 rotate-[-22deg] rounded-full bg-yellow-300/[0.12]" />
      </>
    )}
  </div>
);
