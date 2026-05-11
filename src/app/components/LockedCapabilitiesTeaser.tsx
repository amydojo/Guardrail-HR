import { useState } from 'react';
import { Lock } from 'lucide-react';
import { UnlockPlusModal } from '@/app/components/UnlockPlusModal';

interface LockedCapability {
  title: string;
  description: string;
  previewContent: string;
  hintText?: string;
}

const capabilities: LockedCapability[] = [
  {
    title: 'Full traceability',
    description: 'See exactly how each answer shaped your compliance score',
    previewContent: '12 questions evaluated · 8 high-impact · 4 moderate',
    hintText: 'Unlock to view breakdown'
  },
  {
    title: 'Prioritized actions',
    description: 'Focus on changes that improve your score most efficiently',
    previewContent: 'Quick wins: 3 items · High effort: 5 items · Impact: +12 points',
    hintText: 'Unlock to view priorities'
  },
  {
    title: 'Reassessment tracking',
    description: 'Monitor score changes over time as you implement fixes',
    previewContent: 'Latest: 72/100 · Previous: 68/100 · Delta: +4 · Trend: Improving',
    hintText: 'Unlock to view history'
  },
  {
    title: 'Export & sharing',
    description: 'Generate reports for legal counsel, accountants, or advisors',
    previewContent: 'PDF · CSV · JSON · Printable summary · Branded templates',
    hintText: 'Unlock to generate reports'
  }
];

export function LockedCapabilitiesTeaser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mb-20">
        {/* Bridging Line */}
        <div className="mb-8 pb-8">
          <p className="text-[14px] text-theme-text-3 leading-relaxed max-w-[520px]">
            Deeper analysis and actionable tools
          </p>
        </div>

        {/* Eyebrow Label */}
        <p className="text-[12px] text-theme-text-3 mb-5 tracking-wide uppercase">
          Available with Guardrail Plus
        </p>

        {/* Narrowed Content Width - Visual Mode Shift */}
        <div className="max-w-[600px]">
          <div className="space-y-2.5">
            {capabilities.map((capability, index) => (
              <button
                key={index}
                onClick={() => setIsModalOpen(true)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="w-full text-left bg-theme-surface-elevated rounded-[16px] p-6 md:p-7 border border-theme-border-2 transition-all duration-300 hover:border-theme-border-1 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
              >
                {/* Header with Lock Icon */}
                <div className="flex items-start justify-between mb-2.5">
                  <h3 className="text-[15px] font-semibold text-theme-text-2 flex-1">
                    {capability.title}
                  </h3>
                  <Lock 
                    className={`w-4 h-4 text-theme-icon-2 flex-shrink-0 ml-3 transition-all duration-300 ${
                      hoveredIndex === index ? 'scale-110 text-theme-icon-1' : ''
                    }`}
                    strokeWidth={2}
                  />
                </div>

                {/* Description */}
                <p className="text-[14px] text-theme-text-3 leading-relaxed mb-4">
                  {capability.description}
                </p>

                {/* Masked Preview Content */}
                <div className="relative">
                  {/* Content with blur */}
                  <div 
                    className={`text-[13px] text-theme-text-2 leading-relaxed font-mono transition-all duration-300 ${
                      hoveredIndex === index ? 'blur-[3px]' : 'blur-[4px]'
                    }`}
                  >
                    {capability.previewContent}
                  </div>

                  {/* Gradient fade overlay */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r from-transparent via-theme-surface-elevated/40 to-theme-surface-elevated/80 transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-60' : 'opacity-80'
                    }`}
                  />
                </div>

                {/* Hint Text */}
                {capability.hintText && (
                  <p className={`text-[12px] text-theme-text-3 mt-3 transition-colors duration-300 ${
                    hoveredIndex === index ? 'text-theme-text-2' : ''
                  }`}>
                    {capability.hintText}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Subtle Call-to-Action */}
        <div className="mt-6 max-w-[600px]">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[13px] text-theme-text-3 hover:text-theme-text-2 transition-colors inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
          >
            Learn about Guardrail Plus
            <span className="text-theme-text-3">→</span>
          </button>
        </div>
      </div>

      {/* Unified Unlock Modal */}
      <UnlockPlusModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
