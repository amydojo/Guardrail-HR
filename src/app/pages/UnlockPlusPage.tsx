import { Link } from 'react-router';
import { Check } from 'lucide-react';

export function UnlockPlusPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-[680px] px-5 py-16 md:py-20">
        
        {/* Header - Neutral Explanation */}
        <div className="mb-16">
          <p className="text-[13px] text-gray-600 mb-3">
            Guardrail Plus
          </p>
          <h1 className="text-[28px] md:text-[32px] font-semibold mb-4 leading-tight">
            Extended visibility and documentation
          </h1>
          <p className="text-[15px] md:text-[16px] text-gray-400 leading-relaxed max-w-[560px]">
            Guardrail Plus removes usage limits and adds detailed breakdowns, exportable summaries, and historical tracking. Core diagnostic functionality remains identical.
          </p>
        </div>

        {/* What's Currently Locked */}
        <div className="mb-20">
          {/* Bridging Line - Subtle Reframe */}
          <div className="mb-8 pb-8">
            <p className="text-[14px] text-gray-600 leading-relaxed max-w-[520px]">
              Unlock deeper analysis and actionable tools
            </p>
          </div>

          {/* Eyebrow Label */}
          <p className="text-[12px] text-gray-600 mb-5 tracking-wide uppercase">
            Included with Guardrail Plus
          </p>

          {/* Narrowed Content Width - Visual Mode Shift */}
          <div className="max-w-[600px]">
            <div className="space-y-2.5">
              {/* Capability 1 */}
              <div className="bg-[#161616] rounded-[16px] p-6 md:p-7 border border-gray-900/50 transition-colors hover:border-gray-800/60">
                <h3 className="text-[15px] font-semibold text-gray-200 mb-2.5">
                  Score component breakdown
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  See how each assessment question contributed to your final score, with per-question weights and impact analysis.
                </p>
              </div>

              {/* Capability 2 */}
              <div className="bg-[#161616] rounded-[16px] p-6 md:p-7 border border-gray-900/50 transition-colors hover:border-gray-800/60">
                <h3 className="text-[15px] font-semibold text-gray-200 mb-2.5">
                  Printable reports
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Generate formatted PDF documents suitable for sharing with legal counsel, accounting, or payroll providers.
                </p>
              </div>

              {/* Capability 3 */}
              <div className="bg-[#161616] rounded-[16px] p-6 md:p-7 border border-gray-900/50 transition-colors hover:border-gray-800/60">
                <h3 className="text-[15px] font-semibold text-gray-200 mb-2.5">
                  Version history and diffs
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Track changes to your compliance posture over time with side-by-side comparison views and timestamp tracking.
                </p>
              </div>

              {/* Capability 4 */}
              <div className="bg-[#161616] rounded-[16px] p-6 md:p-7 border border-gray-900/50 transition-colors hover:border-gray-800/60">
                <h3 className="text-[15px] font-semibold text-gray-200 mb-2.5">
                  Answer-level edit and re-score
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Update individual responses without retaking the full assessment, with automatic score recalculation.
                </p>
              </div>

              {/* Capability 5 */}
              <div className="bg-[#161616] rounded-[16px] p-6 md:p-7 border border-gray-900/50 transition-colors hover:border-gray-800/60">
                <h3 className="text-[15px] font-semibold text-gray-200 mb-2.5">
                  Unlimited assessments
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Run diagnostics across all available modules without monthly limits or reset periods.
                </p>
              </div>

              {/* Capability 6 */}
              <div className="bg-[#161616] rounded-[16px] p-6 md:p-7 border border-gray-900/50 transition-colors hover:border-gray-800/60">
                <h3 className="text-[15px] font-semibold text-gray-200 mb-2.5">
                  Priority email support
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Direct access to compliance specialists for questions about assessment results or interpretation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Reassurance */}
        <div className="mb-20">
          <div className="bg-[#161616]/40 rounded-[16px] p-5 md:p-6 border border-gray-900/30">
            <p className="text-[14px] text-gray-500 leading-relaxed">
              Guardrail Plus provides deeper visibility and documentation control. It does not include legal review, compliance certification, or remediation services. All output remains informational and does not constitute legal advice.
            </p>
          </div>
        </div>

        {/* Single Pricing Block */}
        <div className="mb-10">
          <div className="bg-[#161616] rounded-[20px] p-6 md:p-8 border border-gray-900/50">
            {/* Plan Name */}
            <div className="mb-6">
              <h3 className="text-[20px] font-semibold mb-2">
                Guardrail Plus
              </h3>
              <p className="text-[14px] text-gray-500">
                Annual billing only
              </p>
            </div>

            {/* Pricing */}
            <div className="mb-6 pb-6 border-b border-gray-900/50">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[40px] font-semibold leading-none">
                  $599
                </span>
                <span className="text-[17px] text-gray-500">
                  / year
                </span>
              </div>
              <p className="text-[13px] text-gray-600">
                Billed annually at $599 · No monthly option
              </p>
            </div>

            {/* What's Included (Minimal) */}
            <div className="space-y-2.5 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span className="text-[14px] text-gray-400">
                  All locked capabilities above
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span className="text-[14px] text-gray-400">
                  Unlimited assessments and re-scoring
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span className="text-[14px] text-gray-400">
                  Priority email support
                </span>
              </div>
            </div>

            {/* Primary CTA */}
            <button className="w-full py-3.5 px-6 bg-[#5b6ff5] text-white text-[15px] font-medium rounded-[14px] hover:bg-[#4a5ee0] transition-colors mb-3">
              Unlock Guardrail Plus
            </button>

            {/* Terms */}
            <p className="text-[12px] text-gray-600 text-center">
              Payment processed via Stripe · Cancel anytime
            </p>
          </div>
        </div>

        {/* Secondary Link */}
        <div className="text-center">
          <Link
            to="/dashboard"
            className="text-[14px] text-gray-500 hover:text-gray-400 transition-colors"
          >
            Continue with free account
          </Link>
        </div>

        {/* Footer Spacer */}
        <div className="h-20" />

      </div>
    </div>
  );
}