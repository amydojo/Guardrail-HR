import { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';

interface PremiumPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock?: () => void;
}

export function PremiumPricingModal({ isOpen, onClose, onUnlock }: PremiumPricingModalProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleUnlock = () => {
    onUnlock?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-theme-bg/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-theme-surface-1 border border-theme-border-1 rounded-[24px] w-full max-w-[680px] max-h-[90vh] overflow-y-auto shadow-theme-2 animate-in fade-in slide-in-from-bottom-4 duration-300 scrollbar-theme">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-theme-text-3 hover:text-theme-text-2 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-surface-1 rounded-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Content */}
        <div className="px-8 py-10 md:px-12 md:py-12">
          
          {/* HEADER */}
          <div className="mb-10">
            <h2 className="text-[28px] md:text-[32px] font-semibold text-theme-text-1 mb-4 leading-tight max-w-[520px]">
              Unlock deeper insight with Guardrail Plus
            </h2>
            <p className="text-[16px] md:text-[17px] text-theme-text-2 leading-relaxed max-w-[520px]">
              You've identified where risk exists.<br />
              Plus gives you the clarity and tools to act with confidence.
            </p>
          </div>

          {/* BODY - VALUE EXPLANATION */}
          <div className="mb-10 pb-10 border-b border-theme-border-2">
            <p className="text-[14px] text-theme-text-3 mb-5">
              With Guardrail Plus, you can:
            </p>
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-theme-border-1 mt-2.5 flex-shrink-0" />
                <p className="text-[15px] text-theme-text-2 leading-relaxed">
                  See exactly which answers drive each risk signal
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-theme-border-1 mt-2.5 flex-shrink-0" />
                <p className="text-[15px] text-theme-text-2 leading-relaxed">
                  Follow a prioritized action plan ranked by effort and impact
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-theme-border-1 mt-2.5 flex-shrink-0" />
                <p className="text-[15px] text-theme-text-2 leading-relaxed">
                  Track score changes as your policies or workforce evolve
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-theme-border-1 mt-2.5 flex-shrink-0" />
                <p className="text-[15px] text-theme-text-2 leading-relaxed">
                  Export clean reports for payroll, advisors, or internal review
                </p>
              </div>
            </div>
            
            {/* Disclaimer */}
            <p className="text-[13px] text-theme-text-3 mt-6 leading-relaxed">
              No legal advice. Just structured, practical clarity.
            </p>
          </div>

          {/* FREE VS PLUS COMPARISON */}
          <div className="mb-10 pb-10 border-b border-theme-border-2">
            <h3 className="text-[17px] font-medium text-theme-text-2 mb-6">
              What changes with Guardrail Plus
            </h3>

            {/* Desktop: Two Columns */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {/* FREE Column */}
              <div className="bg-theme-surface-2 rounded-[16px] p-6 border border-theme-border-2">
                <p className="text-[14px] font-medium text-theme-text-2 mb-4">
                  Free diagnostic
                </p>
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-theme-text-3 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[14px] text-theme-text-3">Overall risk score</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-theme-text-3 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[14px] text-theme-text-3">High-level risk categories</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-theme-text-3 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[14px] text-theme-text-3">Limited recommended actions</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-theme-text-3 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[14px] text-theme-text-3">One-time assessment view</span>
                  </div>
                </div>
                <p className="text-[12px] text-theme-text-3 leading-relaxed">
                  Enough to spot risk. Limited detail for follow-through.
                </p>
              </div>

              {/* PLUS Column */}
              <div className="bg-theme-accent-soft rounded-[16px] p-6 border border-theme-accent/20">
                <p className="text-[14px] font-medium text-theme-text-1 mb-4">
                  Guardrail Plus
                </p>
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-theme-text-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[14px] text-theme-text-1">Answer-level traceability</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-theme-text-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[14px] text-theme-text-1">Prioritized action plan (effort × impact)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-theme-text-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[14px] text-theme-text-1">Reassessment & score tracking</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-theme-text-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[14px] text-theme-text-1">Exportable reports (PDF, CSV, summary)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-theme-text-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[14px] text-theme-text-1">Ongoing access to templates & guides</span>
                  </div>
                </div>
                <p className="text-[12px] text-theme-text-2 leading-relaxed">
                  Built for acting, documenting, and reassessing over time.
                </p>
              </div>
            </div>

            {/* Mobile: Stacked Cards */}
            <div className="md:hidden space-y-4">
              {/* FREE Card */}
              <div className="bg-theme-surface-2 rounded-[16px] p-5 border border-theme-border-2">
                <p className="text-[14px] font-medium text-theme-text-2 mb-3">
                  Free diagnostic
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-theme-text-3 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[13px] text-theme-text-3">Overall risk score</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-theme-text-3 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[13px] text-theme-text-3">High-level risk categories</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-theme-text-3 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[13px] text-theme-text-3">Limited actions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-theme-text-3 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[13px] text-theme-text-3">One-time view</span>
                  </div>
                </div>
                <p className="text-[11px] text-theme-text-3 leading-relaxed">
                  Enough to spot risk. Limited detail for follow-through.
                </p>
              </div>

              {/* PLUS Card */}
              <div className="bg-theme-accent-soft rounded-[16px] p-5 border border-theme-accent/20">
                <p className="text-[14px] font-medium text-theme-text-1 mb-3">
                  Guardrail Plus
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-theme-text-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[13px] text-theme-text-1">Answer-level traceability</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-theme-text-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[13px] text-theme-text-1">Prioritized action plan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-theme-text-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[13px] text-theme-text-1">Score tracking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-theme-text-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[13px] text-theme-text-1">Exportable reports</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-theme-text-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[13px] text-theme-text-1">Templates & guides</span>
                  </div>
                </div>
                <p className="text-[11px] text-theme-text-2 leading-relaxed">
                  Built for acting, documenting, and reassessing over time.
                </p>
              </div>
            </div>

            {/* Optional Nudge */}
            <p className="text-[13px] text-theme-text-3 mt-6 text-center leading-relaxed">
              Most teams upgrade when they're ready to take action — not just observe.
            </p>
          </div>

          {/* PRICING BLOCK */}
          <div className="mb-8">
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 text-[14px] rounded-[10px] transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
                  billingCycle === 'monthly'
                    ? 'bg-theme-surface-2 text-theme-text-1 border border-theme-border-1'
                    : 'text-theme-text-3 hover:text-theme-text-2'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 text-[14px] rounded-[10px] transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
                  billingCycle === 'annual'
                    ? 'bg-theme-surface-2 text-theme-text-1 border border-theme-border-1'
                    : 'text-theme-text-3 hover:text-theme-text-2'
                }`}
              >
                Annual
              </button>
            </div>

            {/* Price Display */}
            <div className="text-center mb-6">
              {billingCycle === 'monthly' ? (
                <>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-[48px] font-semibold leading-none text-theme-text-1">
                      $49
                    </span>
                    <span className="text-[18px] text-theme-text-3">
                      / month
                    </span>
                  </div>
                  <p className="text-[13px] text-theme-text-3">
                    Billed monthly · Cancel anytime
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-[48px] font-semibold leading-none text-theme-text-1">
                      $499
                    </span>
                    <span className="text-[18px] text-theme-text-3">
                      / year
                    </span>
                  </div>
                  <p className="text-[13px] text-theme-text-3">
                    Billed annually · 2 months free
                  </p>
                </>
              )}
              <p className="text-[12px] text-theme-text-3 mt-2">
                Designed for small teams. Cancel anytime.
              </p>
            </div>
          </div>

          {/* CTA AREA */}
          <div className="space-y-3 mb-8">
            <button
              onClick={handleUnlock}
              className="w-full py-4 px-6 bg-theme-accent text-white text-[15px] font-medium rounded-[14px] hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-surface-1"
            >
              Unlock Guardrail Plus
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 px-6 text-[14px] text-theme-text-3 hover:text-theme-text-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-surface-1 rounded-[14px]"
            >
              Continue with free version
            </button>
          </div>

          {/* FOOTER TRUST LINE */}
          <p className="text-[11px] text-theme-text-3 text-center leading-relaxed">
            Guardrail provides informational guidance only and does not replace legal counsel.
          </p>

        </div>
      </div>
    </div>
  );
}
