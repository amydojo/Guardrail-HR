import { Link, useNavigate } from 'react-router';
import { AlertCircle, Check, X } from 'lucide-react';
import { PrimaryAction } from '@/app/components/PrimaryAction';
import { SecondaryAction } from '@/app/components/SecondaryAction';

export function WageHourDisclosurePage() {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/modules/wage-hour/assessment');
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-1">
      <div className="mx-auto max-w-[680px] px-5 py-12 md:py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-theme-text-3 mb-8">
          <Link to="/modules" className="hover:text-theme-text-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0">Modules</Link>
          <span>/</span>
          <Link to="/modules/wage-hour" className="hover:text-theme-text-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0">Wage & Hour</Link>
          <span>/</span>
          <span className="text-theme-text-3">Before you begin</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[32px] md:text-[36px] font-semibold mb-4 leading-tight">
            Before you begin
          </h1>
          <p className="text-[17px] text-theme-text-2 leading-relaxed">
            Please review the following information about how this assessment works and what it provides.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-theme-surface-elevated rounded-[18px] p-6 md:p-8 border border-theme-border-2 mb-6">
          <h2 className="text-[17px] font-medium text-theme-text-1 mb-5">
            How this assessment works
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-theme-accent/70 mt-1 flex-shrink-0" />
              <span className="text-[15px] text-theme-text-2 leading-relaxed">
                You'll answer 23 questions about your California wage & hour practices
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-theme-accent/70 mt-1 flex-shrink-0" />
              <span className="text-[15px] text-theme-text-2 leading-relaxed">
                Your responses generate an informational risk score (0-100)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-theme-accent/70 mt-1 flex-shrink-0" />
              <span className="text-[15px] text-theme-text-2 leading-relaxed">
                Results identify potential exposure areas based on California requirements
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-theme-accent/70 mt-1 flex-shrink-0" />
              <span className="text-[15px] text-theme-text-2 leading-relaxed">
                Your answers are saved automatically — you can pause anytime
              </span>
            </li>
          </ul>
          
          <div className="mt-6 pt-6 border-t border-theme-border-2">
            <p className="text-[13px] text-theme-text-3">
              Estimated time: 10-15 minutes
            </p>
          </div>
        </div>

        {/* What you'll receive (Free tier boundary) */}
        <div className="bg-theme-surface-elevated rounded-[18px] p-6 md:p-8 border border-theme-border-2 mb-6">
          <h2 className="text-[17px] font-medium text-theme-text-1 mb-5">
            What you'll receive (free)
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-theme-icon-2 mt-1 flex-shrink-0" />
              <span className="text-[15px] text-theme-text-2">
                Overall risk score and high-level exposure categories
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-theme-icon-2 mt-1 flex-shrink-0" />
              <span className="text-[15px] text-theme-text-2">
                Key risk drivers based on your responses
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-theme-icon-2 mt-1 flex-shrink-0" />
              <span className="text-[15px] text-theme-text-2">
                Limited recommended next steps
              </span>
            </li>
          </ul>
          
          <div className="mt-5 pt-5 border-t border-theme-border-2">
            <p className="text-[13px] text-theme-text-3">
              Detailed actions, unlimited reassessments, and score tracking require{' '}
              <Link to="/pricing" className="text-theme-accent hover:text-theme-accent-hover focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0">
                Guardrail Plus
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Important Disclaimer - Prominent */}
        <div className="bg-theme-surface-1 rounded-[18px] p-6 md:p-8 border border-theme-border-1 mb-10">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-400/90 mt-0.5 flex-shrink-0" />
            <h2 className="text-[17px] font-medium text-orange-400/90">
              Important disclaimer
            </h2>
          </div>
          
          <p className="text-[15px] text-theme-text-2 leading-relaxed mb-5">
            This assessment provides <span className="text-theme-text-1 font-medium">informational guidance only</span>. It does not:
          </p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <X className="w-4 h-4 text-theme-icon-2 mt-1 flex-shrink-0" />
              <span className="text-[15px] text-theme-text-2">
                Constitute legal advice or interpretation of laws
              </span>
            </li>
            <li className="flex items-start gap-3">
              <X className="w-4 h-4 text-theme-icon-2 mt-1 flex-shrink-0" />
              <span className="text-[15px] text-theme-text-2">
                Confirm compliance or non-compliance with regulations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <X className="w-4 h-4 text-theme-icon-2 mt-1 flex-shrink-0" />
              <span className="text-[15px] text-theme-text-2">
                Replace consultation with qualified legal counsel
              </span>
            </li>
          </ul>
          
          <div className="bg-theme-bg rounded-[12px] p-4 border border-theme-border-2">
            <p className="text-[14px] text-theme-text-3 leading-relaxed">
              Results are based on rule-based checks and the information you provide. 
              For specific guidance on your circumstances, consult with qualified legal 
              or compliance professionals.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Secondary Action - Go back (left on desktop) */}
          <Link 
            to="/modules/wage-hour"
            className="text-[14px] text-theme-text-2 hover:text-theme-text-1 transition-colors text-center sm:text-left focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
          >
            ← Go back
          </Link>

          {/* Primary Action - Continue (right on desktop, top on mobile) */}
          <PrimaryAction
            context="inline"
            state="pre_scan"
            onClick={handleProceed}
          />
        </div>

        {/* Subtle reassurance */}
        <p className="text-[13px] text-theme-text-3 text-center mt-6">
          Your progress is saved automatically. You can exit and return anytime.
        </p>
      </div>
    </div>
  );
}
