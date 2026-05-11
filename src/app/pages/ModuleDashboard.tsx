import { Link } from 'react-router';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { PageContainer, PageHeader, Section } from '@/app/components/shared/DesignSystem';

export function ModuleDashboard() {
  // Mock data - would come from database in production
  const moduleData = {
    wageHourCompleted: true, // Change to false for pre-scan state
    wageHourScore: 72,
    wageHourMaxScore: 100,
    wageHourRiskLevel: 'Elevated exposure' as const,
    wageHourLastUpdated: 'January 24, 2026',
    allModulesCompleted: false // Change to true for all-completed state
  };

  return (
    <PageContainer>
      <Section>
        {/* Page Header */}
        <div className="mb-12 sm:mb-14">
          <h1 className="text-[24px] sm:text-[28px] xl:text-[32px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-3">
            Assessment modules
          </h1>
          <p className="text-[15px] text-theme-text-2 leading-[1.65] mb-4">
            Diagnostic assessments identifying compliance gaps and risk exposure in California employment law.
          </p>
          {/* Chip row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[13px] text-theme-chip-text">
              California-first
            </span>
            <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[13px] text-theme-chip-text">
              5–10 min
            </span>
            <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[13px] text-theme-chip-text">
              Not legal advice
            </span>
          </div>
        </div>

        {/* Module Cards - 2-column grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {/* Wage & Hour Module - Completed */}
          <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6 transition-all hover:bg-theme-surface-1 hover:border-theme-border-1">
            {/* Top row: title + status chip */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h2 className="text-[20px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-1">
                  Wage & Hour
                </h2>
                <p className="text-[14px] text-theme-text-3 leading-[1.65]">
                  California wage & hour compliance assessment
                </p>
              </div>
              {moduleData.wageHourCompleted && (
                <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text flex-shrink-0">
                  Completed
                </span>
              )}
            </div>

            {/* Score snapshot row - only if completed */}
            {moduleData.wageHourCompleted && (
              <div className="mt-4 mb-5 pb-5 border-b border-theme-border-2">
                <div className="flex items-center gap-6">
                  {/* Risk score */}
                  <div>
                    <div className="text-[24px] font-semibold text-theme-text-1 tracking-tight leading-none">
                      {moduleData.wageHourScore}
                      <span className="text-[16px] text-theme-text-3"> / {moduleData.wageHourMaxScore}</span>
                    </div>
                  </div>
                  {/* Risk level + date */}
                  <div className="flex-1">
                    <div className="text-[14px] text-theme-text-2 mb-1">
                      {moduleData.wageHourRiskLevel}
                    </div>
                    <div className="text-[12px] text-theme-text-3">
                      Last updated {moduleData.wageHourLastUpdated}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions row */}
            <div className="flex items-center gap-4">
              <Link
                to="/modules/wage-hour/results"
                className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
              >
                View report
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              
            </div>
          </div>

          {/* Classification Module - Coming Soon */}
          <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6">
            <h2 className="text-[20px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">
              Worker Classification
            </h2>
            <p className="text-[14px] text-theme-text-3 leading-[1.65] mb-4">
              Employee vs. contractor determination framework
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                Coming soon
              </span>
              <span className="text-[12px] text-theme-text-3">Q2 2026</span>
            </div>
            <button className="inline-flex items-center gap-1.5 text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0">
              Learn what it covers
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Workplace Safety Module - Coming Soon */}
          <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6">
            <h2 className="text-[20px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">
              Workplace Safety
            </h2>
            <p className="text-[14px] text-theme-text-3 leading-[1.65] mb-4">
              OSHA and Cal/OSHA compliance baseline
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                Coming soon
              </span>
              <span className="text-[12px] text-theme-text-3">Q3 2026</span>
            </div>
            <button className="inline-flex items-center gap-1.5 text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0">
              Learn what it covers
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Harassment Prevention Module - Coming Soon */}
          <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6">
            <h2 className="text-[20px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">
              Harassment Prevention
            </h2>
            <p className="text-[14px] text-theme-text-3 leading-[1.65] mb-4">
              AB 1825 training requirements and policy verification
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                Coming soon
              </span>
              <span className="text-[12px] text-theme-text-3">Q3 2026</span>
            </div>
            <button className="inline-flex items-center gap-1.5 text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0">
              Learn what it covers
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Coming Soon Section Header - Only show if completed */}
        {moduleData.wageHourCompleted && !moduleData.allModulesCompleted && (
          <div className="mb-4">
            <h3 className="text-[17px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">
              Coming soon
            </h3>
            <p className="text-[14px] text-theme-text-3 leading-[1.65]">
              Additional modules are released quarterly. Complete them as your business evolves or when you want broader coverage.
            </p>
          </div>
        )}

        {/* All Modules Completed State */}
        {moduleData.allModulesCompleted && (
          <div className="bg-theme-surface-2 rounded-xl border border-theme-border-2 p-6 text-center">
            <h3 className="text-[17px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">
              All available modules completed
            </h3>
            <p className="text-[14px] text-theme-text-3 leading-[1.65]">
              Re-run assessments as your business changes or quarterly to catch new risks.
            </p>
          </div>
        )}
      </Section>
    </PageContainer>
  );
}
