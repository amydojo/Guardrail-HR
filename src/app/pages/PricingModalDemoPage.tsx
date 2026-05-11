import { useState } from 'react';
import { PremiumPricingModal } from '@/app/components/PremiumPricingModal';
import { Lock } from 'lucide-react';

export function PricingModalDemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUnlock = () => {
    alert('Unlock flow would trigger here (Stripe integration)');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-[680px] px-5 py-16 md:py-20">
        
        {/* Demo Header */}
        <div className="mb-12">
          <p className="text-[13px] text-gray-600 mb-3">
            Premium Pricing Modal Demo
          </p>
          <h1 className="text-[28px] md:text-[32px] font-semibold mb-4 leading-tight">
            Apple/Linear-Style Upgrade Modal
          </h1>
          <p className="text-[15px] md:text-[16px] text-gray-400 leading-relaxed max-w-[560px]">
            A calm, credible upgrade moment that feels optional and inevitable. Click any locked feature below to trigger the modal.
          </p>
        </div>

        {/* Simulated Results Context */}
        <div className="mb-16 p-8 bg-[#161616]/50 rounded-[16px] border border-gray-900/30">
          <p className="text-[13px] text-gray-600 mb-3">
            Wage & Hour Assessment
          </p>
          <h2 className="text-[24px] font-semibold mb-4">
            Your compliance score: 72/100
          </h2>
          <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
            Your assessment is complete. You've identified where risk exists. Some deeper features are locked.
          </p>

          {/* Locked Features Grid */}
          <div className="space-y-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full text-left bg-[#161616] rounded-[12px] p-5 border border-gray-900/50 hover:border-gray-800/60 transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[15px] font-semibold text-gray-200">
                  Answer-level traceability
                </h3>
                <Lock className="w-4 h-4 text-gray-600 group-hover:text-gray-500 transition-colors" strokeWidth={2} />
              </div>
              <p className="text-[13px] text-gray-500 mb-3">
                See which specific answers drove each risk signal
              </p>
              <div className="text-[12px] text-gray-400 blur-[3px]">
                12 questions evaluated · 8 high-impact · 4 moderate
              </div>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full text-left bg-[#161616] rounded-[12px] p-5 border border-gray-900/50 hover:border-gray-800/60 transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[15px] font-semibold text-gray-200">
                  Prioritized action plan
                </h3>
                <Lock className="w-4 h-4 text-gray-600 group-hover:text-gray-500 transition-colors" strokeWidth={2} />
              </div>
              <p className="text-[13px] text-gray-500 mb-3">
                Focus on changes ranked by effort and impact
              </p>
              <div className="text-[12px] text-gray-400 blur-[3px]">
                Quick wins: 3 items · High effort: 5 · Impact: +12 pts
              </div>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full text-left bg-[#161616] rounded-[12px] p-5 border border-gray-900/50 hover:border-gray-800/60 transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[15px] font-semibold text-gray-200">
                  Score tracking over time
                </h3>
                <Lock className="w-4 h-4 text-gray-600 group-hover:text-gray-500 transition-colors" strokeWidth={2} />
              </div>
              <p className="text-[13px] text-gray-500 mb-3">
                Monitor changes as your policies evolve
              </p>
              <div className="text-[12px] text-gray-400 blur-[3px]">
                Latest: 72/100 · Previous: 68/100 · Delta: +4
              </div>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full text-left bg-[#161616] rounded-[12px] p-5 border border-gray-900/50 hover:border-gray-800/60 transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[15px] font-semibold text-gray-200">
                  Exportable reports
                </h3>
                <Lock className="w-4 h-4 text-gray-600 group-hover:text-gray-500 transition-colors" strokeWidth={2} />
              </div>
              <p className="text-[13px] text-gray-500 mb-3">
                Generate clean reports for payroll or advisors
              </p>
              <div className="text-[12px] text-gray-400 blur-[3px]">
                PDF · CSV · JSON · Printable summary · Templates
              </div>
            </button>
          </div>
        </div>

        {/* Manual Trigger Button */}
        <div className="text-center mb-20">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-[#5b6ff5] text-white text-[14px] font-medium rounded-[12px] hover:bg-[#4a5ee0] transition-colors"
          >
            Open Pricing Modal
          </button>
          <p className="text-[12px] text-gray-600 mt-3">
            Opens the premium pricing modal
          </p>
        </div>

        {/* Design Notes */}
        <div className="p-6 bg-[#161616]/30 rounded-[16px] border border-gray-900/30">
          <p className="text-[13px] text-gray-500 mb-3 uppercase tracking-wide">
            Design Principles
          </p>
          <ul className="text-[14px] text-gray-400 space-y-2 leading-relaxed">
            <li>• Calm, non-salesy upgrade moment</li>
            <li>• Clear value communication without hype</li>
            <li>• Free vs Plus comparison (subtle, not loud)</li>
            <li>• "Continue with free" feels valid</li>
            <li>• Dark theme, generous spacing</li>
            <li>• No urgency, no pressure, no countdowns</li>
            <li>• Feels like Apple Settings or Linear billing</li>
          </ul>
        </div>

      </div>

      {/* Premium Pricing Modal */}
      <PremiumPricingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUnlock={handleUnlock}
      />
    </div>
  );
}
