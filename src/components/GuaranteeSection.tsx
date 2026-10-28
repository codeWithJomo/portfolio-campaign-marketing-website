import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { BrandButton } from './BrandButton';
import { SectionDecorations } from './SectionDecorations';

export const GuaranteeSection: React.FC = () => {
  const [showFullTerms, setShowFullTerms] = useState(false);

  return (
    <section className="relative isolate overflow-hidden py-16 bg-yellow-100 border-b border-yellow-200">
      <SectionDecorations className="-z-10" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-10 shadow-xs space-y-6">
          
          <div className="flex items-center gap-3 text-emerald-700">
            <div className="rounded-xl bg-emerald-50 p-2.5 border border-emerald-100">
              <ShieldCheck className="h-6 w-6 stroke-[2]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Guarantee & Peace of Mind
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 text-balance">
              A straightforward, low-risk offer.
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
              If the delivered website doesn't match the design and requirements we agreed on, I'll work with you to correct it. If I can't resolve those issues after a reasonable opportunity to do so, you can request a full refund under the guarantee terms.
            </p>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-neutral-500">
              No hidden loopholes or fine print tricks. You only pay for a site that matches your brief.
            </p>

            <BrandButton
              type="button"
              onClick={() => setShowFullTerms(!showFullTerms)}
              variant="outline"
              className="min-h-10 px-4 text-xs shrink-0"
            >
              <span>{showFullTerms ? 'Hide Guarantee Terms' : 'View Full Guarantee Terms'}</span>
              {showFullTerms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </BrandButton>
          </div>

          {/* Collapsible Guarantee Terms Drawer */}
          {showFullTerms && (
            <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-6 text-xs text-neutral-600 space-y-4 animate-in fade-in duration-200">
              <h4 className="font-bold text-neutral-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-neutral-700" />
                <span>Guarantee Terms & Refund Procedure</span>
              </h4>

              <div className="space-y-3 leading-relaxed">
                <p>
                  <strong>1. Agreed Requirements:</strong> The benchmark for delivery is the specifications submitted in your onboarding form (chosen design style, submitted copy/experience, and requested color theme).
                </p>
                <p>
                  <strong>2. Opportunity to Rectify:</strong> If any element differs from what you specified, you are entitled to 5 revision rounds during which I will promptly make the necessary corrections.
                </p>
                <p>
                  <strong>3. Refund Eligibility:</strong> If, after utilizing reasonable revision efforts within 14 days of initial delivery, the site still fundamentally fails to meet the agreed-upon design structure or functional link expectations, a 100% refund of ₦1,000 will be issued to your bank account or payment method within 3 business days.
                </p>
                <p>
                  <strong>4. Exclusions:</strong> Refunds are not applicable for subjective changes of mind where work has already met the initial submission brief, or for requested features that were clearly noted as not included (e.g., custom paid domains or multi-page systems).
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
