import { useState } from 'react';
import { LockedCapabilitiesTeaser } from '@/app/components/LockedCapabilitiesTeaser';
import { PremiumPricingModal } from '@/app/components/PremiumPricingModal';
import { Check } from 'lucide-react';

export function LockedStateDemoPage() {
  const [showLocked, setShowLocked] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-[680px] px-5 py-16 md:py-20">
        
        {/* Demo Controls */}
        <div className="mb-12 p-5 bg-[#161616]/50 rounded-[12px] border border-gray-900/30">
          <p className="text-[13px] text-gray-500 mb-3">Demo Controls</p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowLocked(true)}
              className={`px-4 py-2 text-[14px] rounded-[8px] transition-all ${
                showLocked 
                  ? 'bg-[#5b6ff5] text-white' 
                  : 'bg-[#161616] text-gray-400 hover:text-gray-300'
              }`}
            >
              Locked State (Free User)
            </button>
            <button
              onClick={() => setShowLocked(false)}
              className={`px-4 py-2 text-[14px] rounded-[8px] transition-all ${
                !showLocked 
                  ? 'bg-[#5b6ff5] text-white' 
                  : 'bg-[#161616] text-gray-400 hover:text-gray-300'
              }`}
            >
              Unlocked State (Plus User)
            </button>
          </div>
        </div>

        {/* Header - Always Visible */}
        <div className="mb-16">
          <p className="text-[13px] text-gray-600 mb-3">
            Compliance Assessment Results
          </p>
          <h1 className="text-[28px] md:text-[32px] font-semibold mb-4 leading-tight">
            Your compliance score: 72/100
          </h1>
          <p className="text-[15px] md:text-[16px] text-gray-400 leading-relaxed max-w-[560px]">
            Your assessment is complete. Based on your responses, we've identified several areas where your compliance posture can be strengthened.
          </p>
        </div>

        {/* Conditional Render: Locked vs Unlocked */}
        {showLocked ? (
          // LOCKED STATE - Teaser
          <LockedCapabilitiesTeaser />
        ) : (
          // UNLOCKED STATE - Full Content
          <div className="mb-20">
            {/* Bridging Line */}
            <div className="mb-8 pb-8">
              <p className="text-[14px] text-gray-600 leading-relaxed max-w-[520px]">
                Unlock deeper analysis and actionable tools
              </p>
            </div>

            {/* Eyebrow Label */}
            <p className="text-[12px] text-gray-600 mb-5 tracking-wide uppercase">
              Included with Guardrail Plus
            </p>

            {/* Narrowed Content Width */}
            <div className="max-w-[600px]">
              <div className="space-y-2.5">
                {/* Full Traceability */}
                <div className="bg-[#161616] rounded-[16px] p-6 md:p-7 border border-gray-900/50">
                  <h3 className="text-[15px] font-semibold text-gray-200 mb-2.5">
                    Full traceability
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                    See exactly how each answer shaped your compliance score
                  </p>
                  <div className="text-[13px] text-gray-400 leading-relaxed font-mono space-y-1">
                    <p>12 questions evaluated</p>
                    <p>8 high-impact factors</p>
                    <p>4 moderate contributors</p>
                  </div>
                </div>

                {/* Prioritized Actions */}
                <div className="bg-[#161616] rounded-[16px] p-6 md:p-7 border border-gray-900/50">
                  <h3 className="text-[15px] font-semibold text-gray-200 mb-2.5">
                    Prioritized actions
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                    Focus on changes that improve your score most efficiently
                  </p>
                  <div className="text-[13px] text-gray-400 leading-relaxed font-mono space-y-1">
                    <p>Quick wins: 3 items</p>
                    <p>High effort: 5 items</p>
                    <p>Potential impact: +12 points</p>
                  </div>
                </div>

                {/* Reassessment Tracking */}
                <div className="bg-[#161616] rounded-[16px] p-6 md:p-7 border border-gray-900/50">
                  <h3 className="text-[15px] font-semibold text-gray-200 mb-2.5">
                    Reassessment tracking
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                    Monitor score changes over time as you implement fixes
                  </p>
                  <div className="text-[13px] text-gray-400 leading-relaxed font-mono space-y-1">
                    <p>Latest: 72/100</p>
                    <p>Previous: 68/100</p>
                    <p>Delta: +4 points</p>
                    <p>Trend: Improving</p>
                  </div>
                </div>

                {/* Export & Sharing */}
                <div className="bg-[#161616] rounded-[16px] p-6 md:p-7 border border-gray-900/50">
                  <h3 className="text-[15px] font-semibold text-gray-200 mb-2.5">
                    Export & sharing
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                    Generate reports for legal counsel, accountants, or advisors
                  </p>
                  <div className="text-[13px] text-gray-400 leading-relaxed font-mono space-y-1">
                    <p>PDF · CSV · JSON</p>
                    <p>Printable summary</p>
                    <p>Branded templates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiet Reassurance - Always Visible */}
        <div className="mb-20">
          <div className="bg-[#161616]/40 rounded-[16px] p-5 md:p-6 border border-gray-900/30">
            <p className="text-[14px] text-gray-500 leading-relaxed">
              {showLocked 
                ? "Guardrail Plus provides deeper visibility and documentation control. Core diagnostic functionality remains identical for free accounts."
                : "All analysis and recommendations are based on your assessment responses. This does not constitute legal advice."
              }
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-[13px] text-gray-600">
            {showLocked 
              ? "Using free account — upgrade to access advanced features"
              : "Guardrail Plus active"
            }
          </p>
        </div>

      </div>
    </div>
  );
}