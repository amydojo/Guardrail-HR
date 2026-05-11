import { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Link } from 'react-router';

interface UnlockPlusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UnlockPlusModal({ isOpen, onClose }: UnlockPlusModalProps) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-theme-bg border border-theme-border-2 rounded-[20px] w-full max-w-[520px] mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-theme-text-3 hover:text-theme-text-2 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <p className="text-[13px] text-theme-text-3 mb-3">
              Guardrail Plus
            </p>
            <h2 className="text-[24px] md:text-[28px] font-semibold mb-4 leading-tight">
              Extended visibility and documentation
            </h2>
            <p className="text-[15px] text-theme-text-2 leading-relaxed">
              Guardrail Plus removes usage limits and adds detailed breakdowns, exportable summaries, and historical tracking. Core diagnostic functionality remains identical.
            </p>
          </div>

          {/* What's Included (Condensed) */}
          <div className="mb-8 pb-8 border-b border-theme-border-2">
            <p className="text-[13px] text-theme-text-3 mb-4 uppercase tracking-wide">
              What's included
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-theme-icon-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <div>
                  <p className="text-[14px] text-theme-text-1 font-medium">Score component breakdown</p>
                  <p className="text-[13px] text-theme-text-3 mt-0.5">Per-question weights and impact analysis</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-theme-icon-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <div>
                  <p className="text-[14px] text-theme-text-1 font-medium">Printable reports</p>
                  <p className="text-[13px] text-theme-text-3 mt-0.5">PDF documents for legal/accounting review</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-theme-icon-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <div>
                  <p className="text-[14px] text-theme-text-1 font-medium">Version history and diffs</p>
                  <p className="text-[13px] text-theme-text-3 mt-0.5">Track changes over time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-theme-icon-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <div>
                  <p className="text-[14px] text-theme-text-1 font-medium">Answer-level editing</p>
                  <p className="text-[13px] text-theme-text-3 mt-0.5">Update responses with automatic re-scoring</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-theme-icon-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <div>
                  <p className="text-[14px] text-theme-text-1 font-medium">Unlimited assessments</p>
                  <p className="text-[13px] text-theme-text-3 mt-0.5">No monthly limits or reset periods</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-theme-icon-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <div>
                  <p className="text-[14px] text-theme-text-1 font-medium">Priority email support</p>
                  <p className="text-[13px] text-theme-text-3 mt-0.5">Direct access to compliance specialists</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-8">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[32px] font-semibold leading-none">
                $599
              </span>
              <span className="text-[15px] text-theme-text-3">
                / year
              </span>
            </div>
            <p className="text-[13px] text-theme-text-3">
              Billed annually · Cancel anytime
            </p>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <Link
              to="/unlock-plus"
              onClick={onClose}
              className="block w-full py-3.5 px-6 bg-theme-accent text-theme-text-1 text-[15px] font-medium rounded-[14px] hover:bg-theme-accent-hover transition-colors text-center focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
            >
              View full details
            </Link>
            <button
              onClick={onClose}
              className="block w-full py-3.5 px-6 text-[14px] text-theme-text-3 hover:text-theme-text-2 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
            >
              Not right now
            </button>
          </div>

          {/* Reassurance */}
          <div className="mt-8 pt-8 border-t border-theme-border-2">
            <p className="text-[12px] text-theme-text-3 leading-relaxed">
              Guardrail Plus provides deeper visibility and documentation control. It does not include legal review, compliance certification, or remediation services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
