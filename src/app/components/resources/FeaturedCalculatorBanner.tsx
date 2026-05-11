import { Link } from 'react-router';
import { ArrowRight, Calculator, Clock } from 'lucide-react';

export function FeaturedCalculatorBanner() {
  return (
    <div className="mb-8">
      <Link
        to="/resources/overtime-calculator"
        className="block group"
      >
        {/* Desktop & Tablet: Compact horizontal card */}
        <div className="hidden sm:block">
          <div className="relative overflow-hidden rounded-2xl border border-theme-border-1 bg-theme-surface-1 hover:border-theme-accent-border transition-all duration-300 shadow-theme-1 hover:shadow-theme-2">
            <div className="flex items-center justify-between gap-6 p-6">
              {/* Left: Content */}
              <div className="flex-1 min-w-0">
                {/* Badge */}
                <div className="mb-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-theme-accent-soft border border-theme-accent-border">
                    <Calculator className="w-3 h-3 text-theme-accent" />
                    <span className="text-[11px] font-medium text-theme-accent uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-[20px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-2">
                  Overtime calculator
                </h3>
                <p className="text-[14px] text-theme-text-2 leading-[1.6] mb-4 max-w-[600px]">
                  Get accurate California overtime calculations in under 60 seconds. Daily, weekly, and double-time rules with an intuitive stepper interface.
                </p>

                {/* Features - Horizontal */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-theme-accent-soft flex items-center justify-center flex-shrink-0">
                      <Calculator className="w-2.5 h-2.5 text-theme-accent" />
                    </div>
                    <span className="text-[13px] text-theme-text-3">CA overtime rules built-in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-theme-accent-soft flex items-center justify-center flex-shrink-0">
                      <Clock className="w-2.5 h-2.5 text-theme-accent" />
                    </div>
                    <span className="text-[13px] text-theme-text-3">Quick presets included</span>
                  </div>
                </div>
              </div>

              {/* Right: Compact CTA Section */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right">
                  <div className="text-[13px] text-theme-text-3 mb-1">Takes ~2 minutes</div>
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-theme-accent text-white font-medium text-[14px] group-hover:bg-theme-accent-hover transition-all shadow-theme-1">
                    <span>Try it now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Single column */}
        <div className="block sm:hidden">
          <div className="relative overflow-hidden rounded-2xl border border-theme-border-1 bg-theme-surface-1 p-5 shadow-theme-1">
            {/* Badge */}
            <div className="mb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-theme-accent-soft border border-theme-accent-border">
                <Calculator className="w-3 h-3 text-theme-accent" />
                <span className="text-[11px] font-medium text-theme-accent uppercase tracking-wider">
                  Featured
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-[22px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-3">
              Overtime calculator
            </h3>

            {/* Description */}
            <p className="text-[15px] text-theme-text-2 leading-[1.6] mb-4">
              Get accurate California overtime calculations in under 60 seconds. Daily, weekly, and double-time rules with an intuitive stepper interface.
            </p>

            {/* Features - Stacked */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded bg-theme-accent-soft flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-3 h-3 text-theme-accent" />
                </div>
                <span className="text-[14px] text-theme-text-2">CA overtime rules built-in</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded bg-theme-accent-soft flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3 h-3 text-theme-accent" />
                </div>
                <span className="text-[14px] text-theme-text-2">Quick presets included</span>
              </div>
            </div>

            {/* CTA - Full width on mobile */}
            <div className="space-y-3">
              <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-theme-accent text-white font-medium text-[15px] active:scale-[0.98] transition-transform shadow-theme-1">
                <span>Try it now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[13px] text-theme-text-3 text-center">
                Takes ~2 minutes
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
