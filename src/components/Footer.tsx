import React, { useState } from 'react';
import { PortfolioStyle } from '../types';
import { FileText, Shield, X, Mail } from 'lucide-react';

interface FooterProps {
  onSelectStyleAndScroll: (style: PortfolioStyle) => void;
  onOpenDemo: (style: PortfolioStyle) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectStyleAndScroll,
  onOpenDemo,
}) => {
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  const contactHandle = (import.meta as any).env?.VITE_CONTACT_HANDLE || '@jomoCode';
  const contactEmail = (import.meta as any).env?.VITE_CONTACT_EMAIL || 'hello@jomocode.dev';

  return (
    <>
      <footer className="bg-white border-t border-neutral-200/90 py-14 text-neutral-600 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Brand & Description */}
            <div className="md:col-span-5 space-y-3">
              <span className="text-xl font-bold tracking-tight text-neutral-900 block">
                jomoCode<span className="text-indigo-600">.</span>
              </span>
              <p className="text-neutral-500 leading-relaxed max-w-sm">
                Personalized, high-converting portfolio websites for job seekers, developers, and creatives. Built with care, hosted free forever on Vercel, for a one-time fee of ₦1,000.
              </p>
              <div className="pt-1 text-neutral-500 flex items-center gap-2">
                <span>Direct contact:</span>
                <span className="font-mono text-neutral-800">{contactEmail}</span>
              </div>
            </div>

            {/* Portfolio Demos Navigation */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                Portfolio Styles
              </span>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenDemo('developer')}
                    className="hover:text-indigo-600 transition-colors text-left"
                  >
                    Developer Style (Terminal & Slate)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenDemo('creative')}
                    className="hover:text-indigo-600 transition-colors text-left"
                  >
                    Creative Style (Editorial & Canvas)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenDemo('professional')}
                    className="hover:text-indigo-600 transition-colors text-left"
                  >
                    Professional Style (Executive & Clarity)
                  </button>
                </li>
              </ul>
            </div>

            {/* Quick Links & Legal */}
            <div className="md:col-span-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                Offer Terms & Transparency
              </span>
              <ul className="space-y-2">
                <li>
                  <a href="#how-it-works" className="hover:text-neutral-900 transition-colors">
                    How the 3-Step Process Works
                  </a>
                </li>
                <li>
                  <a href="#whats-included" className="hover:text-neutral-900 transition-colors">
                    Full Scope & Deliverables
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setLegalModal('terms')}
                    className="hover:text-neutral-900 transition-colors text-left"
                  >
                    Service Terms & Guarantee Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setLegalModal('privacy')}
                    className="hover:text-neutral-900 transition-colors text-left"
                  >
                    Privacy Notice
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Guarantee Summary */}
          <div className="mt-12 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px]">
            <p>© {new Date().getFullYear()} jomoCode. Built by Jomo for job seekers.</p>
            <p>100% money-back guarantee under stated terms · Free Vercel hosting</p>
          </div>
        </div>
      </footer>

      {/* Legal & Policy Modals */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-xl border border-neutral-200 flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="text-base font-bold text-neutral-900">
                {legalModal === 'terms' ? 'Service Terms & Guarantee Policy' : 'Privacy Notice'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="p-1 rounded-md text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto text-xs text-neutral-600 space-y-4 leading-relaxed">
              {legalModal === 'terms' ? (
                <>
                  <p>
                    <strong>1. Service Deliverables:</strong> For the one-time payment of ₦1,000, Jomo builds and deploys a single-page responsive portfolio website on a free Vercel subdomain based on your chosen design and submitted profile content.
                  </p>
                  <p>
                    <strong>2. Revisions:</strong> Up to five (5) revision cycles are included to adjust copy, layout spacing, links, images, and color themes within the chosen design template.
                  </p>
                  <p>
                    <strong>3. Hosting:</strong> Free hosting is provided permanently via Vercel's standard tier. If you wish to connect a custom domain (.com, .dev, etc.), you are responsible for purchasing the domain, and we will connect it for free.
                  </p>
                  <p>
                    <strong>4. Money-Back Guarantee:</strong> If the delivered website fails to meet the agreed-upon design structure or functional specifications submitted in your form, and Jomo is unable to rectify the issue within the 5 revision rounds, you can request a 100% refund of the ₦1,000 fee.
                  </p>
                  <p>
                    <strong>5. Scope Exclusions:</strong> Custom backends, e-commerce integrations, multi-page custom builds, and ongoing monthly content maintenance are not included in the ₦1,000 package.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Information Collection:</strong> The information you submit (Name, Email, Professional Title, Project Links, and Contact Method) is strictly used to evaluate your portfolio requirements and communicate directly with you regarding your setup.
                  </p>
                  <p>
                    <strong>No Unsolicited Marketing:</strong> We will never sell, lease, or share your contact details with any third parties or advertisers.
                  </p>
                  <p>
                    <strong>Payment Data:</strong> No credit card or banking details are collected on this landing page. Any future ₦1,000 payment is coordinated directly via standard bank transfer or certified payment gateways (e.g., Paystack).
                  </p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
