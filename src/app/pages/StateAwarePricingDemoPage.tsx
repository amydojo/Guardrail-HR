import { useState } from 'react';
import { StateAwarePricingPage } from '@/app/pages/StateAwarePricingPage';

export function StateAwarePricingDemoPage() {
  const [showPostScan, setShowPostScan] = useState(false);

  // Mock assessment data
  const mockAssessment = {
    completed: true,
    score: 72,
    topRiskDrivers: ['Classification issues', 'Overtime calculation'],
    lastUpdated: 'Jan 24, 2026',
    riskLevel: 'elevated' as const
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Demo Controls */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-900/50">
        <div className="mx-auto max-w-[1040px] px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] text-gray-500 mb-1">State-Aware Pricing Demo</p>
              <p className="text-[11px] text-gray-600">
                Toggle between pre-scan and post-scan states
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPostScan(false)}
                className={`px-4 py-2 text-[14px] rounded-[10px] transition-all ${
                  !showPostScan
                    ? 'bg-[#5b6ff5] text-white'
                    : 'bg-[#161616] text-gray-400 hover:text-gray-300 border border-gray-900/50'
                }`}
              >
                Pre-Scan User
              </button>
              <button
                onClick={() => setShowPostScan(true)}
                className={`px-4 py-2 text-[14px] rounded-[10px] transition-all ${
                  showPostScan
                    ? 'bg-[#5b6ff5] text-white'
                    : 'bg-[#161616] text-gray-400 hover:text-gray-300 border border-gray-900/50'
                }`}
              >
                Post-Scan User
              </button>
            </div>
          </div>

          {/* State Indicator */}
          <div className="mt-3 p-3 bg-[#161616]/40 rounded-[10px] border border-gray-900/30">
            <div className="flex items-center gap-3 text-[12px]">
              <span className="text-gray-600">Current state:</span>
              <span className="text-gray-300 font-medium">
                {showPostScan ? 'User has completed Wage & Hour assessment' : 'User has not completed assessment'}
              </span>
              {showPostScan && (
                <>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-500">Score: 72/100</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-500">Risk: Elevated</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render State-Aware Pricing Page */}
      <StateAwarePricingPage 
        userAssessment={showPostScan ? mockAssessment : { completed: false }}
      />
    </div>
  );
}
