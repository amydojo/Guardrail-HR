import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ScoreBreakdownDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  scoreHistory?: any[];
  userAnswers?: Record<string, boolean>;
}

export function ScoreBreakdownDrawer({
  isOpen,
  onClose,
  score,
  scoreHistory = [],
  userAnswers = {}
}: ScoreBreakdownDrawerProps) {
  // Close drawer on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const startingScore = 100;
  
  // Mock deductions - in production, calculate from actual assessment data
  const deductions = [
    { amount: 18, reason: "Overtime eligibility rules may be unclear" },
    { amount: 7, reason: "Meal & rest break policy missing or undocumented" },
    { amount: 3, reason: "Wage statement or pay timing gaps identified" }
  ];
  
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-theme-bg border-t border-theme-border-1 rounded-t-[24px] z-50 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '85vh' }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1 bg-theme-border-1 rounded-full" />
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-5 xl:px-8 pb-8" style={{ maxHeight: 'calc(85vh - 60px)' }}>
          <div className="mx-auto max-w-[540px]">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 pt-4">
              <h2 className="text-[24px] font-semibold leading-tight pr-4">
                How your Wage & Hour score was calculated
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-theme-surface-2 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-theme-icon-2" />
              </button>
            </div>

            {/* Score calculation */}
            <div className="space-y-4 mb-8">
              {/* Starting score */}
              <div className="flex items-center justify-between py-3 border-b border-theme-border-2">
                <span className="text-[15px] text-theme-text-2">Starting score</span>
                <span className="text-[17px] font-medium">{startingScore}</span>
              </div>

              {/* Deductions */}
              <div className="space-y-3">
                <p className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide">
                  Deductions applied
                </p>
                {deductions.map((deduction, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 py-3 border-b border-theme-border-2"
                  >
                    <span className="text-[17px] font-medium text-red-400 flex-shrink-0">
                      −{deduction.amount}
                    </span>
                    <span className="text-[15px] text-theme-text-2 leading-relaxed">
                      {deduction.reason}
                    </span>
                  </div>
                ))}
              </div>

              {/* Final score */}
              <div className="flex items-center justify-between py-4 border-t border-theme-border-1 mt-4">
                <span className="text-[17px] font-medium">Final score</span>
                <span className="text-[28px] font-semibold">{score}</span>
              </div>

              {/* Inline explanatory note */}
              <p className="text-[14px] text-theme-text-3 leading-relaxed mt-4">
                Scores reflect common enforcement risk factors and are weighted by severity, not by likelihood of enforcement.
              </p>
            </div>

            {/* Footer disclaimer */}
            <div className="bg-theme-surface-elevated rounded-[16px] p-5 border border-theme-border-2">
              <p className="text-[13px] text-theme-text-3 leading-relaxed">
                This score is generated using rule-based checks aligned with California wage & hour requirements. It does not confirm compliance or non-compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
