/**
 * HeroResultsPreview - Product Screenshot Component
 * 
 * DESIGN SYSTEM:
 * Light Mode Frame Treatment:
 * - Outer container: surface-2 background with border-1
 * - Preview content: charcoal gradient (not pure black)
 * - Shadow: softer, wider, less opaque for light backgrounds
 * - "Example results" chip: strengthened visibility
 * 
 * Dark Mode:
 * - Minimal frame (just border)
 * - Dark content matches page background
 * - Tighter shadow
 * 
 * DESIGN TOKENS (8pt Grid System):
 * - Card radius: rounded-2xl (16px)
 * - Content padding: p-6 (24px) mobile, p-7 (28px) desktop
 * - Row heights: 40px mobile, 44px desktop
 * - Chip height: 20px (consistent across breakpoints)
 * - Section spacing: 24px (space-y-6) mobile, 28px desktop
 * 
 * TYPOGRAPHY:
 * - All numeric values use tabular-nums for alignment
 * - Section headers: 10-11px uppercase
 * - Row labels: 13-14px semibold
 * - Meta text: 11-12px
 */

import { ArrowRight } from 'lucide-react';

interface PreviewRiskRowProps {
  color: 'orange' | 'yellow';
  title: string;
  subtitle: string;
}

function PreviewRiskRow({ color, title, subtitle }: PreviewRiskRowProps) {
  const dotColor = color === 'orange' ? 'bg-orange-500' : 'bg-yellow-500';
  
  return (
    <div className="flex items-start gap-2.5 sm:gap-3 min-h-[40px] sm:min-h-[44px] py-2 sm:py-2.5 border-b border-white/[0.04] last:border-0">
      <div className={`w-1.5 h-1.5 rounded-full ${dotColor} mt-[6px] flex-shrink-0`} />
      <div className="flex flex-col flex-1 min-w-0 text-left">
        <span className="text-[13px] sm:text-[14px] font-semibold text-white leading-tight mb-0.5 sm:mb-1 truncate">
          {title}
        </span>
        <span className="text-[12px] text-gray-500 leading-tight truncate">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

interface PreviewStepRowProps {
  label: string;
  effort: 'Low' | 'Med' | 'High';
}

function PreviewStepRow({ label, effort }: PreviewStepRowProps) {
  return (
    <div className="flex items-center justify-between gap-2.5 sm:gap-3 min-h-[40px] sm:min-h-[44px] py-2 sm:py-2.5 border-b border-white/[0.04] last:border-0">
      <span className="text-[13px] sm:text-[14px] font-semibold text-white leading-none text-left flex-1 truncate">
        {label}
      </span>
      <span className="inline-flex items-center justify-center h-5 px-1.5 sm:px-2 rounded sm:rounded-lg border border-white/[0.06] bg-white/[0.02] text-[10px] sm:text-[11px] font-medium uppercase tracking-wider leading-none min-w-[36px] sm:min-w-[44px] text-gray-500 flex-shrink-0">
        {effort}
      </span>
    </div>
  );
}

export function HeroResultsPreview() {
  return (
    <div className="w-full max-w-[420px] sm:max-w-[920px] mx-auto">
      {/* "Example Results" Chip - Above Preview */}
      <div className="flex items-center justify-center mb-3 sm:mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-theme-chip-bg border border-theme-chip-border">
          <div className="w-1.5 h-1.5 rounded-full bg-theme-accent animate-pulse" />
          <span className="text-[11px] sm:text-[12px] font-medium text-theme-chip-text tracking-wide">
            EXAMPLE RESULTS
          </span>
        </div>
      </div>

      {/* Light Mode Frame Container */}
      <div className="
        bg-theme-surface-2 rounded-[20px] p-2 sm:p-3
        border border-theme-border-1
        shadow-theme-2
        dark:bg-transparent dark:p-0 dark:border-0
        dark:shadow-none
      ">
        {/* Main Card - Intentional Dark Preview */}
        <div className="
          bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]
          dark:bg-[#121212]
          rounded-2xl border border-white/[0.06] 
          shadow-theme-1
          dark:shadow-theme-1
          overflow-hidden text-left
        ">
          {/* Top Bar - Fixed Height */}
          <div className="flex items-center justify-between h-11 px-6 sm:px-7 border-b border-white/[0.04]">
            <span className="text-[13px] font-medium text-gray-400 leading-none">
              Wage & Hour Scan
            </span>
            <span className="hidden sm:block text-[12px] text-gray-600 leading-none">
              Updated Jan 24, 2026
            </span>
          </div>

          {/* Main Content */}
          <div className="p-6 sm:p-7">
            {/* Score Section */}
            <div className="mb-6 sm:mb-7 pb-6 sm:pb-7 border-b border-white/[0.04]">
              <div className="flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:gap-6">
                {/* Score Cluster */}
                <div className="sm:col-span-5">
                  <div className="flex items-end gap-2">
                    <span className="text-[52px] sm:text-[64px] font-semibold leading-none tracking-[-0.02em] text-white tabular-nums">
                      72
                    </span>
                    <div className="flex flex-col pb-0.5 sm:pb-1">
                      <span className="text-[16px] sm:text-[20px] text-gray-500 leading-none mb-0.5 tabular-nums">
                        / 100
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-gray-600 leading-none uppercase tracking-wider font-medium">
                        Risk Score
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary Text */}
                <div className="sm:col-span-7 sm:flex sm:items-end">
                  <p className="text-[13px] sm:text-[15px] text-gray-400 leading-tight text-left">
                    Elevated exposure under CA wage & hour rules
                  </p>
                </div>
              </div>
            </div>

            {/* MOBILE: Stacked Sections */}
            <div className="sm:hidden space-y-6">
              {/* Top Risks */}
              <div>
                <h3 className="text-[10px] font-semibold text-white uppercase tracking-wider mb-3 leading-none">
                  Top Risks
                </h3>
                <div className="space-y-0">
                  <PreviewRiskRow
                    color="orange"
                    title="Employee classification"
                    subtitle="Exemption documentation gaps"
                  />
                  <PreviewRiskRow
                    color="yellow"
                    title="Overtime tracking"
                    subtitle="Break policy enforcement needs review"
                  />
                  <PreviewRiskRow
                    color="yellow"
                    title="Break documentation"
                    subtitle="Attestation/record gaps"
                  />
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <h3 className="text-[10px] font-semibold text-white uppercase tracking-wider mb-3 leading-none">
                  Next Steps
                </h3>
                <div className="space-y-0">
                  <PreviewStepRow label="Review exemption docs" effort="Low" />
                  <PreviewStepRow label="Document break policies" effort="Med" />
                  <PreviewStepRow label="Update handbook" effort="Med" />
                </div>
              </div>
            </div>

            {/* DESKTOP: Two-Column Layout */}
            <div className="hidden sm:block mb-7">
              <div className="grid grid-cols-12 gap-6">
                {/* Left Column: Top Risks */}
                <div className="col-span-6">
                  <h3 className="text-[11px] font-semibold text-white uppercase tracking-wider mb-3.5 leading-none">
                    Top Risks
                  </h3>
                  <div className="space-y-0">
                    <PreviewRiskRow
                      color="orange"
                      title="Employee classification"
                      subtitle="Exemption documentation gaps"
                    />
                    <PreviewRiskRow
                      color="yellow"
                      title="Overtime tracking"
                      subtitle="Break policy enforcement needs review"
                    />
                    <PreviewRiskRow
                      color="yellow"
                      title="Break documentation"
                      subtitle="Attestation/record gaps"
                    />
                  </div>
                </div>

                {/* Right Column: Next Steps */}
                <div className="col-span-6">
                  <h3 className="text-[11px] font-semibold text-white uppercase tracking-wider mb-3.5 leading-none">
                    Next Steps
                  </h3>
                  <div className="space-y-0">
                    <PreviewStepRow label="Review exemption docs" effort="Low" />
                    <PreviewStepRow label="Document break policies" effort="Med" />
                    <PreviewStepRow label="Update handbook" effort="Med" />
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Row */}
            <div className="pt-6 sm:pt-6 border-t border-white/[0.04]">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-[11px] sm:text-[12px] text-gray-500 font-medium leading-none whitespace-nowrap">
                  Overall exposure
                </span>
                <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#5b6ff5] to-[#7b8ff8] rounded-full"
                    style={{ width: '72%' }}
                  />
                </div>
                <span className="text-[11px] sm:text-[12px] text-white font-semibold leading-none tabular-nums whitespace-nowrap">
                  72%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}