import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router';

interface Action {
  id: string;
  title: string;
  effort: string;
  impact: string;
  whyMatters: string;
  steps: string[];
  appliesTo: string[];
  relatedDrivers: string[];
}

interface Driver {
  id: string;
  title: string;
  summary: string;
}

interface ActionDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  action: Action;
  relatedDrivers: Driver[];
}

export function ActionDetailDrawer({
  isOpen,
  onClose,
  action,
  relatedDrivers
}: ActionDetailDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-theme-bg border-t border-theme-border-1 rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-theme-border-1 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-6 xl:px-8 pb-8 pt-4">
          <div className="mx-auto max-w-[720px]">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-3">
                  {action.title}
                </h2>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                    {action.effort} effort
                  </span>
                  <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                    {action.impact} impact
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-2 rounded-lg hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
              >
                <X className="w-5 h-5 text-theme-icon-2" />
              </button>
            </div>

            {/* Why this matters */}
            <div className="mb-6">
              <h3 className="text-[15px] font-semibold text-theme-text-1 mb-3">
                Why this matters
              </h3>
              <p className="text-[14px] text-theme-text-2 leading-[1.65]">
                {action.whyMatters}
              </p>
            </div>

            {/* Steps to take */}
            <div className="mb-6">
              <h3 className="text-[15px] font-semibold text-theme-text-1 mb-3">
                Steps to take
              </h3>
              <ul className="space-y-3">
                {action.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-2.5 text-[14px] text-theme-text-2">
                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-theme-surface-2 border border-theme-border-2 text-[11px] text-theme-text-3">
                      {idx + 1}
                    </span>
                    <span className="flex-1">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applies to */}
            <div className="mb-6">
              <h3 className="text-[15px] font-semibold text-theme-text-1 mb-3">
                Applies to
              </h3>
              <div className="flex flex-wrap gap-2">
                {action.appliesTo.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Related drivers */}
            {relatedDrivers.length > 0 && (
              <div className="mb-6">
                <h3 className="text-[15px] font-semibold text-theme-text-1 mb-3">
                  Addresses these risk drivers
                </h3>
                <div className="space-y-2">
                  {relatedDrivers.map((driver) => (
                    <div
                      key={driver.id}
                      className="px-4 py-3 bg-theme-surface-1 rounded-xl border border-theme-border-1"
                    >
                      <div className="text-[14px] text-theme-text-1 mb-0.5">{driver.title}</div>
                      <div className="text-[13px] text-theme-text-3">{driver.summary}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources */}
            <div>
              <h3 className="text-[15px] font-semibold text-theme-text-1 mb-3">
                Helpful resources
              </h3>
              <Link
                to="/resources?from=results"
                className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded-lg"
              >
                View matched templates and guides
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
