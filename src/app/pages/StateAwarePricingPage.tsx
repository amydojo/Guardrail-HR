import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router';

// Mock user state - in real app, this would come from context/auth
interface UserAssessment {
  completed: boolean;
  score?: number;
  topRiskDrivers?: string[];
  lastUpdated?: string;
  riskLevel?: 'low' | 'moderate' | 'elevated';
}

interface StateAwarePricingPageProps {
  userAssessment?: UserAssessment;
}

export function StateAwarePricingPage({ userAssessment }: StateAwarePricingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Determine if user has completed scan
  const hasCompletedScan = userAssessment?.completed ?? false;
  const score = userAssessment?.score;
  const riskLevel = userAssessment?.riskLevel;
  const topRiskDrivers = userAssessment?.topRiskDrivers || [];
  const lastUpdated = userAssessment?.lastUpdated;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Score-aware microcopy
  const getScoreAwareMicrocopy = () => {
    if (!hasCompletedScan || !riskLevel) return null;

    if (riskLevel === 'elevated') {
      return 'Most teams with flagged risk areas upgrade to support remediation and documentation.';
    } else if (riskLevel === 'low') {
      return 'Plus is commonly used for documentation, exports, and ongoing monitoring.';
    }
    return null;
  };

  const faqs = [
    {
      question: 'Is this legal advice?',
      answer: 'No. Guardrail surfaces compliance risk and provides practical guidance. It does not replace legal counsel.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes. Cancel immediately from your account page. No penalties, no questions asked.'
    },
    {
      question: 'What happens if laws change?',
      answer: 'Guardrail modules are updated when federal regulations change. You can reassess to see updated risk.'
    },
    {
      question: 'Can I reassess after fixing issues?',
      answer: 'Yes. Plus users can reassess unlimited times and track score changes over time.'
    },
    {
      question: 'Who is this best for?',
      answer: 'US small businesses (5–100 employees) who need clarity on wage & hour compliance without hiring legal teams.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-[1040px] px-5 py-16 md:py-24">
        
        {/* CONDITIONAL HEADER: Pre-scan vs Post-scan */}
        {!hasCompletedScan ? (
          // STATE 1: PRE-SCAN HERO
          <div className="mb-20 md:mb-32 text-center">
            <h1 className="text-[40px] md:text-[56px] font-semibold mb-6 leading-tight">
              Simple pricing. Clear outcomes.
            </h1>
            <p className="text-[17px] md:text-[19px] text-gray-400 leading-relaxed max-w-[600px] mx-auto">
              Start with a free compliance diagnostic.<br />
              Upgrade only when you're ready to take action.
            </p>
          </div>
        ) : (
          // STATE 2: POST-SCAN SNAPSHOT HEADER
          <div className="mb-20 md:mb-24">
            <div className="text-center mb-8">
              <h1 className="text-[32px] md:text-[40px] font-semibold mb-4 leading-tight">
                Based on your latest assessment
              </h1>
              <p className="text-[15px] md:text-[17px] text-gray-500 leading-relaxed">
                This pricing reflects what becomes available after your Wage & Hour scan.
              </p>
            </div>

            {/* Compact Summary Row */}
            <div className="max-w-[720px] mx-auto bg-[#161616]/40 rounded-[16px] p-5 md:p-6 border border-gray-900/30">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Score */}
                <div>
                  <p className="text-[12px] text-gray-600 mb-1">Latest score</p>
                  <p className="text-[20px] font-semibold text-gray-300">
                    {score}/100
                  </p>
                </div>

                {/* Top Risk Drivers */}
                {topRiskDrivers.length > 0 && (
                  <div className="flex-1">
                    <p className="text-[12px] text-gray-600 mb-2">Top risk drivers</p>
                    <div className="flex flex-wrap gap-2">
                      {topRiskDrivers.slice(0, 2).map((driver, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#161616] border border-gray-900/50 rounded-[8px] text-[13px] text-gray-400"
                        >
                          {driver}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Last Updated */}
                {lastUpdated && (
                  <div className="text-right">
                    <p className="text-[12px] text-gray-600 mb-1">Last updated</p>
                    <p className="text-[13px] text-gray-500">{lastUpdated}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PRICING TIERS */}
        <div className="mb-24 md:mb-32">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-[14px] rounded-[10px] transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#161616] text-gray-300 border border-gray-900/50'
                  : 'text-gray-600 hover:text-gray-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-[14px] rounded-[10px] transition-all ${
                billingCycle === 'annual'
                  ? 'bg-[#161616] text-gray-300 border border-gray-900/50'
                  : 'text-gray-600 hover:text-gray-500'
              }`}
            >
              Annual
            </button>
          </div>

          {/* Two Tiers */}
          <div className="grid md:grid-cols-2 gap-6 max-w-[880px] mx-auto">
            
            {/* LEFT — Free Diagnostic */}
            <div className="bg-[#161616]/40 rounded-[20px] p-8 md:p-10 border border-gray-900/30 flex flex-col">
              {/* Title */}
              <p className="text-[16px] font-medium text-gray-400 mb-3">
                Free
                {hasCompletedScan && (
                  <span className="ml-2 text-[12px] text-gray-600">(current)</span>
                )}
              </p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[48px] font-semibold leading-none">
                    $0
                  </span>
                </div>
              </div>

              {/* Description - STATE AWARE */}
              <p className="text-[15px] text-gray-400 mb-2">
                {hasCompletedScan 
                  ? "You've identified where risk exists."
                  : "Understand where risk exists."
                }
              </p>

              {/* Muted helper line (post-scan only) */}
              {hasCompletedScan && (
                <p className="text-[13px] text-gray-600 mb-8">
                  Limited detail for follow-through.
                </p>
              )}

              {/* Includes */}
              <div className={`space-y-3 mb-8 flex-1 ${hasCompletedScan ? '' : 'mt-6'}`}>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-400">Wage & Hour risk score</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-400">High-level exposure categories</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-400">Limited recommended actions</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-400">One completed assessment</span>
                </div>
              </div>

              {/* Footer Note */}
              <p className="text-[12px] text-gray-600 mb-6">
                For initial understanding only.
              </p>

              {/* CTA - STATE AWARE */}
              {!hasCompletedScan ? (
                <Link
                  to="/modules/wage-hour/assessment"
                  className="block w-full py-3.5 px-6 bg-[#161616] border border-gray-900/50 text-gray-300 text-[15px] font-medium rounded-[14px] hover:bg-[#1a1a1a] hover:border-gray-800/60 transition-colors text-center"
                >
                  Run free scan
                </Link>
              ) : (
                <div className="py-3.5 px-6 border border-gray-900/30 rounded-[14px] text-center">
                  <span className="text-[14px] text-gray-600">Currently active</span>
                </div>
              )}
            </div>

            {/* RIGHT — Guardrail Plus */}
            <div className="bg-[#161616] rounded-[20px] p-8 md:p-10 border border-gray-900/50 flex flex-col">
              {/* Title */}
              <p className="text-[16px] font-medium text-gray-300 mb-3">
                Guardrail Plus
              </p>

              {/* Price */}
              <div className="mb-6">
                {billingCycle === 'monthly' ? (
                  <>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-[48px] font-semibold leading-none">
                        $49
                      </span>
                      <span className="text-[18px] text-gray-500">
                        / month
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-600">
                      Billed monthly
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-[48px] font-semibold leading-none">
                        $499
                      </span>
                      <span className="text-[18px] text-gray-500">
                        / year
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-600">
                      Billed annually · 2 months free
                    </p>
                  </>
                )}
              </div>

              {/* Description - STATE AWARE */}
              <p className="text-[15px] text-gray-300 mb-2">
                {hasCompletedScan
                  ? "See exactly why risk exists — and what to do next."
                  : "For acting with confidence."
                }
              </p>

              {/* Context line (post-scan only) */}
              {hasCompletedScan && (
                <p className="text-[13px] text-gray-500 mb-8">
                  Plus unlocks the details behind the signals already identified.
                </p>
              )}

              {/* Includes */}
              <div className={`space-y-3 mb-8 flex-1 ${hasCompletedScan ? '' : 'mt-6'}`}>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-300">Answer-level traceability</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-300">Prioritized action plan (effort × impact)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-300">Reassessment & score tracking</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-300">Exportable reports (PDF, CSV)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-300">Templates & implementation guides</span>
                </div>
              </div>

              {/* Score-aware microcopy (subtle) */}
              {getScoreAwareMicrocopy() && (
                <p className="text-[12px] text-gray-600 mb-6 leading-relaxed">
                  {getScoreAwareMicrocopy()}
                </p>
              )}

              {/* Footer Note */}
              {!hasCompletedScan && (
                <p className="text-[12px] text-gray-500 mb-6">
                  Designed for ongoing compliance management.
                </p>
              )}

              {/* CTAs */}
              <div className="space-y-3">
                <Link
                  to="/unlock-plus"
                  className="block w-full py-3.5 px-6 bg-[#5b6ff5] text-white text-[15px] font-medium rounded-[14px] hover:bg-[#4a5ee0] transition-colors text-center"
                >
                  Upgrade to Plus
                </Link>
                <button className="w-full text-[13px] text-gray-600 hover:text-gray-500 transition-colors">
                  View example report
                </button>
              </div>
            </div>

          </div>

          {/* Footer reassurance (pre-scan only) */}
          {!hasCompletedScan && (
            <p className="text-[13px] text-gray-600 text-center mt-8">
              You can upgrade at any time after seeing your results.
            </p>
          )}
        </div>

        {/* WHAT CHANGES WITH PLUS - STATE AWARE */}
        <div className="mb-24 md:mb-32 max-w-[840px] mx-auto">
          <h2 className="text-[24px] md:text-[28px] font-semibold mb-10 text-center">
            {hasCompletedScan 
              ? "What becomes clearer with Guardrail Plus"
              : "What changes when you upgrade"
            }
          </h2>

          {/* Desktop: Two Columns */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 mb-8">
            {/* Free */}
            <div>
              <p className="text-[15px] font-medium text-gray-400 mb-4">
                {hasCompletedScan ? "What you have" : "Free diagnostic"}
              </p>
              <div className="space-y-2 text-[14px] text-gray-500 leading-relaxed">
                <p>– {hasCompletedScan ? "Risk exists" : "See where risk exists"}</p>
                <p>– Broad categories</p>
                <p>– {hasCompletedScan ? "Snapshot view" : "One-time snapshot"}</p>
              </div>
            </div>

            {/* Plus */}
            <div>
              <p className="text-[15px] font-medium text-gray-300 mb-4">
                {hasCompletedScan ? "What unlocks" : "Guardrail Plus"}
              </p>
              <div className="space-y-2 text-[14px] text-gray-300 leading-relaxed">
                <p>– {hasCompletedScan ? "Why risk exists (answer-level)" : "See why risk exists"}</p>
                <p>– {hasCompletedScan ? "What to fix first (effort × impact)" : "Answer-level drivers"}</p>
                <p>– {hasCompletedScan ? "How things change over time" : "Clear next steps"}</p>
                <p>– {hasCompletedScan ? "How to document and share" : "Track improvement over time"}</p>
                {!hasCompletedScan && <p>– Share with payroll or advisors</p>}
              </div>
            </div>
          </div>

          {/* Mobile: Stacked */}
          <div className="md:hidden space-y-6 mb-8">
            {/* Free */}
            <div>
              <p className="text-[15px] font-medium text-gray-400 mb-3">
                {hasCompletedScan ? "What you have" : "Free diagnostic"}
              </p>
              <div className="space-y-2 text-[14px] text-gray-500 leading-relaxed">
                <p>– {hasCompletedScan ? "Risk exists" : "See where risk exists"}</p>
                <p>– Broad categories</p>
                <p>– {hasCompletedScan ? "Snapshot view" : "One-time snapshot"}</p>
              </div>
            </div>

            {/* Plus */}
            <div>
              <p className="text-[15px] font-medium text-gray-300 mb-3">
                {hasCompletedScan ? "What unlocks" : "Guardrail Plus"}
              </p>
              <div className="space-y-2 text-[14px] text-gray-300 leading-relaxed">
                <p>– {hasCompletedScan ? "Why risk exists (answer-level)" : "See why risk exists"}</p>
                <p>– {hasCompletedScan ? "What to fix first (effort × impact)" : "Answer-level drivers"}</p>
                <p>– {hasCompletedScan ? "How things change over time" : "Clear next steps"}</p>
                <p>– {hasCompletedScan ? "How to document and share" : "Track improvement over time"}</p>
                {!hasCompletedScan && <p>– Share with payroll or advisors</p>}
              </div>
            </div>
          </div>

          {/* Neutral Line - STATE AWARE */}
          <p className="text-[14px] text-gray-600 text-center">
            {hasCompletedScan
              ? "Upgrade when you're ready to move from insight to action."
              : "Most teams upgrade once they're ready to take action."
            }
          </p>
        </div>

        {/* TRUST & BOUNDARIES */}
        <div className="mb-24 md:mb-32 max-w-[680px] mx-auto">
          <h2 className="text-[20px] md:text-[22px] font-medium text-gray-400 mb-8 text-center">
            What Guardrail Plus does — and doesn't do
          </h2>

          <div className="bg-[#161616]/30 rounded-[16px] p-8 border border-gray-900/30">
            <div className="grid md:grid-cols-2 gap-6">
              {/* What it does */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-400">Deeper analysis and documentation</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-400">Ongoing reassessment tools</span>
                </div>
              </div>

              {/* What it doesn't */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <X className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-500">Not legal advice</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-gray-500">Not a substitute for counsel</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-24 md:mb-32 max-w-[720px] mx-auto">
          <h2 className="text-[24px] md:text-[28px] font-semibold mb-10 text-center">
            Frequently asked
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => toggleFaq(index)}
                className="w-full text-left bg-[#161616]/40 rounded-[14px] p-5 md:p-6 border border-gray-900/30 hover:border-gray-900/50 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[15px] font-medium text-gray-300">
                    {faq.question}
                  </h3>
                  <span className="text-gray-600 text-[20px] leading-none mt-[-2px]">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </div>
                {openFaq === index && (
                  <p className="text-[14px] text-gray-500 mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* FOOTER CTA - STATE AWARE */}
        <div className="text-center max-w-[600px] mx-auto">
          <h2 className="text-[28px] md:text-[32px] font-semibold mb-8">
            {hasCompletedScan
              ? "Ready to upgrade?"
              : "Start free. Upgrade when it's useful."
            }
          </h2>

          {!hasCompletedScan ? (
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                to="/modules/wage-hour/assessment"
                className="px-8 py-4 bg-[#5b6ff5] text-white text-[15px] font-medium rounded-[14px] hover:bg-[#4a5ee0] transition-colors"
              >
                Run free wage & hour scan
              </Link>
              <Link
                to="/modules"
                className="px-8 py-4 bg-[#161616] border border-gray-900/50 text-gray-300 text-[15px] font-medium rounded-[14px] hover:bg-[#1a1a1a] hover:border-gray-800/60 transition-colors"
              >
                View modules
              </Link>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                to="/unlock-plus"
                className="px-8 py-4 bg-[#5b6ff5] text-white text-[15px] font-medium rounded-[14px] hover:bg-[#4a5ee0] transition-colors"
              >
                Unlock Guardrail Plus
              </Link>
              <Link
                to="/modules/wage-hour/results"
                className="px-8 py-4 text-gray-500 hover:text-gray-400 text-[15px] transition-colors"
              >
                Continue with free version
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
