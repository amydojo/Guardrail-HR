import { Link } from 'react-router';
import { Activity } from 'lucide-react';

interface Module {
  name: string;
  recommended?: boolean;
}

interface DashboardEmptyStateProps {
  title?: string;
  description?: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    onClick: () => void;
  };
  modules?: Module[];
  showDisclaimer?: boolean;
}

export function DashboardEmptyState({
  title = 'No assessments yet',
  description = 'Run your first module to see risk signals and recommended next steps. Results are informational and based on rule-based checks.',
  primaryCTA = {
    label: 'Run Wage & Hour Scan',
    href: '/modules/wage-hour'
  },
  secondaryCTA = {
    label: 'What this includes',
    onClick: () => {}
  },
  modules = [
    { name: 'Wage & Hour', recommended: true },
    { name: 'Harassment Prevention' },
    { name: 'Worker Classification' }
  ],
  showDisclaimer = true
}: DashboardEmptyStateProps) {
  return (
    <>
      {/* Page Header */}
      <div className="mb-10 sm:mb-12">
        <h1 className="text-[28px] sm:text-[32px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">
          Dashboard
        </h1>
        <p className="text-[15px] text-theme-text-3 leading-[1.65]">
          A high-level view of your HR compliance assessments.
        </p>
      </div>

      {/* Primary Empty State Card */}
      <div className="mb-10 sm:mb-12 px-6 py-8 rounded-2xl bg-theme-surface-1 border border-theme-border-1 max-w-[560px]">
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-theme-chip-bg border border-theme-chip-border mb-5">
          <Activity className="w-6 h-6 text-theme-icon-2" strokeWidth={1.5} />
        </div>

        {/* Card Content */}
        <h2 className="text-[20px] sm:text-[22px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
          {title}
        </h2>
        
        <p className="text-[14px] sm:text-[15px] text-theme-text-2 leading-[1.65] mb-6">
          {description}
        </p>

        {/* Primary CTA */}
        <Link
          to={primaryCTA.href}
          className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl bg-theme-accent text-theme-text-1 text-[15px] font-medium hover:bg-theme-accent-hover transition-colors mb-4 focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
        >
          {primaryCTA.label}
        </Link>

        {/* Secondary Link */}
        {secondaryCTA && (
          <button
            onClick={secondaryCTA.onClick}
            className="text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
          >
            {secondaryCTA.label}
          </button>
        )}
      </div>

      {/* Modules Available List */}
      {modules && modules.length > 0 && (
        <div className="mb-10 sm:mb-12">
          <h3 className="text-[15px] text-theme-text-3 mb-4">
            Modules available
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {modules.map((module, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-lg bg-theme-chip-bg border border-theme-chip-border text-[13px] text-theme-chip-text"
              >
                {module.name}
                {module.recommended && (
                  <span className="text-theme-text-3"> · recommended</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer Disclaimer */}
      {showDisclaimer && (
        <p className="text-[12px] text-theme-text-3">
          Results are informational and not legal advice.
        </p>
      )}
    </>
  );
}
