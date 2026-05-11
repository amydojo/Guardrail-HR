/**
 * HowItWorksDrawer - Capability Details Panel
 * 
 * DESIGN PHILOSOPHY:
 * - Unified "details panel" component with two presentations
 * - Desktop: Right-side drawer (460px)
 * - Mobile: Bottom sheet (max 86vh) - airy, scannable, minimal
 * - Progressive disclosure: Core steps visible, examples collapsible
 * 
 * SPACING (8pt Grid):
 * - Mobile: px-6 (24px), generous vertical rhythm (16-20px between sections)
 * - Desktop: px-8 (32px), 24px between sections
 * - Step rows: 12-16px vertical padding
 * 
 * CONTENT STRUCTURE:
 * - Max 3 core steps on initial view (scannable without scrolling)
 * - Example content behind collapsible "See an example" row
 * - Footer: One primary CTA + optional text link secondary
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Link2, ListOrdered, RotateCw, FileDown, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

type CapabilityType = 'traceability' | 'prioritized' | 'reassessment' | 'export';

interface HowItWorksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  capability: CapabilityType;
}

const CAPABILITY_CONTENT = {
  traceability: {
    icon: Link2,
    overline: 'How it works',
    title: 'Full traceability',
    subtitle: 'Every score component links to specific assessment responses',
    steps: [
      {
        number: '1',
        title: 'Answers are tagged with compliance factors',
        description: 'Each response weighted by exposure severity'
      },
      {
        number: '2',
        title: 'Score traces to source questions',
        description: 'Risk drivers link directly to flagged answers'
      },
      {
        number: '3',
        title: 'Track changes and recalculations',
        description: 'Version history shows score deltas over time'
      }
    ],
    example: {
      title: 'See an example',
      items: [
        'Risk flagged from: Q7, Q12, Q18',
        'Deep-link to related answers',
        'Change tracking with score delta'
      ]
    }
  },
  prioritized: {
    icon: ListOrdered,
    overline: 'How it works',
    title: 'Prioritized actions',
    subtitle: 'Remediation steps ranked by impact and estimated effort',
    steps: [
      {
        number: '1',
        title: 'Actions scored by impact',
        description: 'Compliance improvement and exposure reduction'
      },
      {
        number: '2',
        title: 'Effort tagged as Low/Med/High',
        description: 'Based on typical implementation complexity'
      },
      {
        number: '3',
        title: 'High-impact, low-effort items surface first',
        description: 'Context included for each recommended step'
      }
    ],
    example: {
      title: 'See effort scale',
      items: [
        'Low: Document review (< 2 hours)',
        'Med: Process updates (2–8 hours)',
        'High: System changes (> 8 hours)'
      ]
    }
  },
  reassessment: {
    icon: RotateCw,
    overline: 'How it works',
    title: 'Re-assessment',
    subtitle: 'Update individual answers or retake in full to track changes',
    steps: [
      {
        number: '1',
        title: 'Update individual answers selectively',
        description: 'Fix specific issues without full retake'
      },
      {
        number: '2',
        title: 'Score recalculates instantly',
        description: 'Before/after comparison with change breakdown'
      },
      {
        number: '3',
        title: 'Each version saved as snapshot',
        description: 'Timestamp and delta tracking included'
      }
    ],
    example: {
      title: 'See update flow',
      items: [
        'View results → Update this answer',
        'Revise response → Preview new score',
        'Confirm → Version saved with delta'
      ]
    }
  },
  export: {
    icon: FileDown,
    overline: 'How it works',
    title: 'Export for review',
    subtitle: 'Generate formatted reports for advisors and stakeholders',
    steps: [
      {
        number: '1',
        title: 'Report includes score and risk areas',
        description: 'Formatted with supporting detail'
      },
      {
        number: '2',
        title: 'Review-ready for legal/accounting',
        description: 'No extra context needed'
      },
      {
        number: '3',
        title: 'Each export timestamped',
        description: 'Assessment version included for tracking'
      }
    ],
    example: {
      title: 'What\'s included',
      items: [
        'Summary score and risk drivers',
        'Next steps with descriptions',
        'All assessment answers'
      ]
    }
  }
};

export function HowItWorksDrawer({ isOpen, onClose, capability }: HowItWorksDrawerProps) {
  const content = CAPABILITY_CONTENT[capability];
  const Icon = content.icon;
  const [exampleExpanded, setExampleExpanded] = useState(false);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setExampleExpanded(false); // Reset on open
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black/10 z-40"
            onClick={onClose}
          />

          {/* Desktop Drawer */}
          <motion.div
            initial={{ x: 460 }}
            animate={{ x: 0 }}
            exit={{ x: 460 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block fixed top-0 right-0 bottom-0 w-[460px] bg-[#0d0d0d] border-l border-white/[0.08] z-50 overflow-y-auto rounded-l-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.06] transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>

            {/* Content */}
            <div className="px-8 pt-20 pb-8">
              {/* Header */}
              <div className="mb-10">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] mb-6">
                  <Icon className="w-5 h-5 text-gray-400" strokeWidth={2} />
                </div>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-3 leading-none">
                  {content.overline}
                </p>
                <h2 className="text-[24px] font-semibold text-white mb-4 tracking-tight leading-tight">
                  {content.title}
                </h2>
                <p className="text-[15px] text-gray-400 leading-[1.65]">
                  {content.subtitle}
                </p>
              </div>

              {/* Steps */}
              <div className="mb-8">
                <div className="space-y-6">
                  {content.steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold text-gray-500 tabular-nums">
                        {step.number}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <h3 className="text-[14px] font-semibold text-white mb-1.5 leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-[14px] text-gray-500 leading-[1.5]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collapsible Example */}
              <div className="mb-10">
                <button
                  onClick={() => setExampleExpanded(!exampleExpanded)}
                  className="flex items-center justify-between w-full py-4 px-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-[13px] font-medium text-gray-300">
                    {content.example.title}
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${exampleExpanded ? 'rotate-180' : ''}`} 
                    strokeWidth={2} 
                  />
                </button>
                <AnimatePresence>
                  {exampleExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 px-5">
                        <ul className="space-y-2.5">
                          {content.example.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2.5">
                              <div className="w-1 h-1 rounded-full bg-[#5b6ff5]/60 mt-2 flex-shrink-0" />
                              <span className="text-[13px] text-gray-400 leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <div>
                <Link
                  to="/modules/wage-hour"
                  className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-[#5b6ff5] text-white text-[15px] font-medium hover:bg-[#4a5ee0] transition-colors"
                  onClick={onClose}
                >
                  Start scan
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Mobile Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-x-0 bottom-0 bg-[#0d0d0d] border-t border-white/[0.08] z-50 rounded-t-[20px] max-h-[86vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grabber */}
            <div className="flex items-center justify-center py-3 flex-shrink-0">
              <div className="w-10 h-1 bg-white/[0.2] rounded-full" />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {/* Header */}
              <div className="mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] mb-5">
                  <Icon className="w-5 h-5 text-gray-400" strokeWidth={2} />
                </div>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-2.5 leading-none">
                  {content.overline}
                </p>
                <h2 className="text-[22px] font-semibold text-white mb-3 tracking-tight leading-tight">
                  {content.title}
                </h2>
                <p className="text-[15px] text-gray-400 leading-[1.6]">
                  {content.subtitle}
                </p>
              </div>

              {/* Steps - Scannable List */}
              <div className="mb-6">
                <div className="space-y-5">
                  {content.steps.map((step, index) => (
                    <div key={index} className="flex gap-3.5 py-1">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold text-gray-500 tabular-nums">
                        {step.number}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <h3 className="text-[14px] font-semibold text-white mb-1.5 leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-[13px] text-gray-500 leading-[1.5]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collapsible Example */}
              <div className="mb-6">
                <button
                  onClick={() => setExampleExpanded(!exampleExpanded)}
                  className="flex items-center justify-between w-full py-4 px-5 rounded-xl bg-white/[0.02] border border-white/[0.06] active:bg-white/[0.03] transition-colors"
                >
                  <span className="text-[13px] font-medium text-gray-300">
                    {content.example.title}
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${exampleExpanded ? 'rotate-180' : ''}`} 
                    strokeWidth={2} 
                  />
                </button>
                <AnimatePresence>
                  {exampleExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 px-5">
                        <ul className="space-y-2.5">
                          {content.example.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2.5">
                              <div className="w-1 h-1 rounded-full bg-[#5b6ff5]/60 mt-2 flex-shrink-0" />
                              <span className="text-[13px] text-gray-400 leading-[1.55]">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sticky Bottom CTA */}
            <div className="flex-shrink-0 border-t border-white/[0.06] bg-[#0d0d0d] px-6 pt-5 pb-6">
              <Link
                to="/modules/wage-hour"
                className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-[#5b6ff5] text-white text-[15px] font-medium active:bg-[#4a5ee0] transition-colors"
                onClick={onClose}
              >
                Start scan
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}