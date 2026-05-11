import { Link } from 'react-router';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useState } from 'react';

/**
 * Demo page to showcase pre-scan and post-scan states
 * Toggle between states using the button at the top
 */
export function HomeDemoPage() {
  const [hasScan, setHasScan] = useState(false);
  const [scanData] = useState({
    score: 72,
    completedAt: Date.now(),
    riskBand: 'elevated' as 'elevated' | 'moderate' | 'lower',
    riskAreasCount: 4,
    highestPriorityIssue: {
      label: 'Employee misclassification exposure',
      severity: 'high' as 'high' | 'moderate' | 'low'
    },
    hasActionableItems: true
  });

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getRiskBandLabel = (band: string) => {
    switch (band) {
      case 'elevated': return 'Elevated exposure';
      case 'moderate': return 'Moderate exposure';
      case 'lower': return 'Lower exposure';
      default: return 'Unknown exposure';
    }
  };

  const getRiskBandColor = (band: string) => {
    switch (band) {
      case 'elevated': return 'text-orange-400';
      case 'moderate': return 'text-yellow-400';
      case 'lower': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* State Toggle - Demo Only */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setHasScan(!hasScan)}
          className="px-4 py-2 bg-[#5b6ff5] text-white text-[13px] font-medium rounded-[12px] hover:bg-[#4a5ee0] transition-colors shadow-xl"
        >
          {hasScan ? 'Show Pre-Scan State' : 'Show Post-Scan State'}
        </button>
      </div>

      {hasScan ? (
        // POST-SCAN STATE
        <>
          {/* Current Exposure Summary */}
          <section className="mx-auto max-w-[1200px] px-5 xl:px-8 pt-12 xl:pt-16 pb-8">
            <div className="max-w-[840px]">
              {/* Header */}
              <div className="mb-8">
                <p className="text-[13px] text-gray-600 mb-2">
                  Wage & Hour Compliance
                </p>
                <h1 className="text-[28px] xl:text-[36px] font-semibold mb-3">
                  Current exposure
                </h1>
              </div>

              {/* Score Card */}
              <div className="bg-[#161616] rounded-[20px] p-6 xl:p-8 border border-gray-900/50 mb-6">
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-[64px] xl:text-[72px] font-semibold leading-none tracking-tight">
                      {scanData.score}
                    </span>
                    <span className="text-[36px] xl:text-[42px] font-normal text-gray-600 leading-none">
                      / 100
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[15px] font-medium ${getRiskBandColor(scanData.riskBand)}`}>
                      {getRiskBandLabel(scanData.riskBand)}
                    </span>
                    <span className="text-[13px] text-gray-600">
                      under California wage & hour rules
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-600">
                    Last updated {formatDate(scanData.completedAt)}
                  </p>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-900/50">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[14px] text-gray-500">Risk areas identified</span>
                    <span className="text-[14px] text-gray-300 font-medium">{scanData.riskAreasCount}</span>
                  </div>
                  {scanData.highestPriorityIssue && (
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[14px] text-gray-500">Highest priority</span>
                      <div className="text-right">
                        <div className="text-[14px] text-gray-300 font-medium mb-0.5">
                          {scanData.highestPriorityIssue.label}
                        </div>
                        <div className="text-[12px] text-gray-600 capitalize">
                          {scanData.highestPriorityIssue.severity} severity
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/modules/wage-hour/results"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[14px] bg-[#5b6ff5] text-white text-[15px] font-medium hover:bg-[#4a5ee0] transition-colors"
                  >
                    View full report
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  {scanData.hasActionableItems && (
                    <Link
                      to="/modules/wage-hour/results#next-steps"
                      className="flex-1 inline-flex items-center justify-center px-5 py-3 rounded-[14px] border border-gray-800 text-[15px] font-medium text-gray-300 hover:bg-gray-900/30 transition-colors"
                    >
                      Start fixing issues
                    </Link>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#161616] rounded-[14px] p-4 border border-gray-900/50">
                  <p className="text-[12px] text-gray-600 mb-1">Assessment version</p>
                  <p className="text-[15px] text-gray-300 font-medium">Jan 2026</p>
                </div>
                <div className="bg-[#161616] rounded-[14px] p-4 border border-gray-900/50">
                  <p className="text-[12px] text-gray-600 mb-1">Jurisdiction</p>
                  <p className="text-[15px] text-gray-300 font-medium">California</p>
                </div>
              </div>
            </div>
          </section>

          {/* Product Capabilities */}
          <section className="mx-auto max-w-[1200px] px-5 xl:px-8 py-12 xl:py-16 border-t border-gray-900/50">
            <div className="mb-10">
              <h2 className="text-[17px] font-medium text-gray-500 mb-1">Product capabilities</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[960px]">
              <div className="bg-[#161616] rounded-[16px] p-6 border border-gray-900/50">
                <h3 className="text-[16px] font-medium mb-2 text-gray-300">Full traceability</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Every score component links to specific assessment responses with change tracking.
                </p>
              </div>

              <div className="bg-[#161616] rounded-[16px] p-6 border border-gray-900/50">
                <h3 className="text-[16px] font-medium mb-2 text-gray-300">Prioritized actions</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Remediation steps ranked by estimated effort and compliance impact.
                </p>
              </div>

              <div className="bg-[#161616] rounded-[16px] p-6 border border-gray-900/50">
                <h3 className="text-[16px] font-medium mb-2 text-gray-300">Re-assessment</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Update answers individually or retake in full to track compliance changes over time.
                </p>
              </div>

              <div className="bg-[#161616] rounded-[16px] p-6 border border-gray-900/50">
                <h3 className="text-[16px] font-medium mb-2 text-gray-300">Export for review</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Generate formatted reports suitable for legal, accounting, or payroll provider review.
                </p>
              </div>
            </div>
          </section>

          {/* State-Aware Footer */}
          <section className="mx-auto max-w-[1200px] px-5 xl:px-8 py-16 xl:py-20 border-t border-gray-900/50">
            <div className="text-center max-w-[480px] mx-auto">
              <Link
                to="/modules/wage-hour/results"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[16px] border border-gray-800 text-white text-[15px] font-medium hover:bg-gray-900/30 transition-colors"
              >
                View full report
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </>
      ) : (
        // PRE-SCAN STATE
        <>
          {/* Calm Hero */}
          <section className="mx-auto max-w-[1200px] px-5 xl:px-8 py-20 xl:py-28">
            <div className="max-w-[680px] mx-auto text-center">
              <div className="inline-block px-3 py-1 bg-[#161616] border border-gray-900/50 rounded-full text-[13px] text-gray-400 mb-6">
                Compliance diagnostics for small businesses
              </div>

              <h1 className="text-[40px] xl:text-[52px] font-semibold leading-[1.1] tracking-tight mb-5">
                Know your compliance exposure
              </h1>

              <p className="text-[16px] xl:text-[17px] text-gray-400 leading-relaxed mb-10 max-w-[560px] mx-auto">
                Run a diagnostic assessment to identify wage & hour risk areas under California law. 
                Get a traceable score, risk drivers, and prioritized next steps.
              </p>

              <Link
                to="/modules/wage-hour"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[16px] bg-[#5b6ff5] text-white text-[15px] font-medium hover:bg-[#4a5ee0] transition-colors"
              >
                Run wage & hour scan
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-[13px] text-gray-600 mt-5">
                5-10 minutes · Not legal advice · Free diagnostic
              </p>
            </div>
          </section>

          {/* After Scanning */}
          <section className="mx-auto max-w-[1200px] px-5 xl:px-8 py-12 xl:py-16 border-t border-gray-900/50">
            <div className="text-center mb-10">
              <h2 className="text-[17px] font-medium text-gray-500 mb-2">After scanning</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
              <div className="bg-[#161616] rounded-[16px] p-6 border border-gray-900/50">
                <div className="text-[32px] font-semibold mb-2 leading-none">
                  72
                  <span className="text-[20px] text-gray-600"> / 100</span>
                </div>
                <h3 className="text-[15px] font-medium text-gray-300 mb-2">Your score</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  Numeric risk assessment based on California wage & hour rules
                </p>
              </div>

              <div className="bg-[#161616] rounded-[16px] p-6 border border-gray-900/50">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-7 h-7 text-gray-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-[15px] font-medium text-gray-300 mb-2">Risk drivers</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  Specific exposure areas identified from your responses
                </p>
              </div>

              <div className="bg-[#161616] rounded-[16px] p-6 border border-gray-900/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="space-y-1">
                    <div className="h-1 w-12 bg-[#5b6ff5] rounded-full" />
                    <div className="h-1 w-8 bg-gray-800 rounded-full" />
                    <div className="h-1 w-10 bg-gray-800 rounded-full" />
                  </div>
                </div>
                <h3 className="text-[15px] font-medium text-gray-300 mb-2">Next steps</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  Prioritized actions ranked by effort and impact
                </p>
              </div>
            </div>
          </section>

          {/* Product Capabilities */}
          <section className="mx-auto max-w-[1200px] px-5 xl:px-8 py-12 xl:py-16 border-t border-gray-900/50">
            <div className="mb-10">
              <h2 className="text-[17px] font-medium text-gray-500 mb-1">Product capabilities</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[960px]">
              <div className="bg-[#161616] rounded-[16px] p-6 border border-gray-900/50">
                <h3 className="text-[16px] font-medium mb-2 text-gray-300">Full traceability</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Every score component links to specific assessment responses with change tracking.
                </p>
              </div>

              <div className="bg-[#161616] rounded-[16px] p-6 border border-gray-900/50">
                <h3 className="text-[16px] font-medium mb-2 text-gray-300">Prioritized actions</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Remediation steps ranked by estimated effort and compliance impact.
                </p>
              </div>

              <div className="bg-[#161616] rounded-[16px] p-6 border border-gray-900/50">
                <h3 className="text-[16px] font-medium mb-2 text-gray-300">Re-assessment</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Update answers individually or retake in full to track compliance changes over time.
                </p>
              </div>

              <div className="bg-[#161616] rounded-[16px] p-6 border border-gray-900/50">
                <h3 className="text-[16px] font-medium mb-2 text-gray-300">Export for review</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Generate formatted reports suitable for legal, accounting, or payroll provider review.
                </p>
              </div>
            </div>
          </section>

          {/* Soft divider */}
          <div className="mx-auto max-w-[1200px] px-5 xl:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-900/30 to-transparent" />
          </div>

          {/* State-Aware Footer */}
          <section className="mx-auto max-w-[1200px] px-5 xl:px-8 py-16 xl:py-20">
            <div className="text-center max-w-[480px] mx-auto">
              <h2 className="text-[17px] font-medium text-gray-400 mb-6">
                Run your first scan
              </h2>
              <Link
                to="/modules/wage-hour"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[16px] bg-[#5b6ff5] text-white text-[15px] font-medium hover:bg-[#4a5ee0] transition-colors"
              >
                Run wage & hour scan
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </>
      )}

      {/* Footer spacer */}
      <div className="h-20" />
    </div>
  );
}
