import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export function PrimaryActionShowcase() {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-1 flex items-center justify-center">
      <div className="mx-auto max-w-[600px] px-5 text-center">
        
        {/* Deprecated Notice */}
        <div className="mb-8 inline-block px-4 py-2 bg-amber-900/20 border border-amber-800/40 rounded-[12px]">
          <p className="text-[13px] text-amber-400 font-medium">
            ⚠️ Deprecated Documentation
          </p>
        </div>

        <h1 className="text-[40px] md:text-[56px] font-semibold mb-6">
          PrimaryAction
        </h1>
        
        <p className="text-[17px] text-theme-text-2 leading-relaxed mb-8">
          This showcase documented the flexible version of PrimaryAction with custom labels.
        </p>

        <div className="p-8 bg-theme-surface-1 rounded-[16px] border border-theme-border-1 mb-8">
          <h2 className="text-[18px] font-semibold mb-3 text-theme-text-1">
            This component has been refactored
          </h2>
          <p className="text-[15px] text-theme-text-3 leading-relaxed">
            PrimaryAction now uses <strong className="text-theme-text-2">global copy logic</strong> with 
            hardcoded copy based on state. Custom labels are no longer supported to ensure 
            consistency across the product.
          </p>
        </div>

        {/* Redirect to new showcase */}
        <Link 
          to="/global-primary-action"
          className="inline-flex items-center gap-3 px-6 py-4 bg-theme-surface-1 hover:bg-theme-surface-2 border border-blue-900/60 hover:border-blue-800/70 rounded-[14px] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg"
        >
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[16px] font-medium text-theme-text-1">
              View Current Documentation
            </span>
            <span className="text-[13px] text-theme-text-3">
              Global copy logic implementation
            </span>
          </div>
          <ArrowRight className="w-5 h-5 text-theme-text-3" strokeWidth={2} />
        </Link>

        <div className="mt-12 pt-8 border-t border-theme-border-1">
          <p className="text-[14px] text-theme-text-3 mb-4">
            Key changes in the new implementation:
          </p>
          <div className="grid gap-3 text-left max-w-[480px] mx-auto">
            <div className="flex items-start gap-3 p-3 bg-theme-surface-2 rounded-[8px]">
              <span className="text-red-500 text-[12px] mt-0.5">✗</span>
              <div>
                <p className="text-[13px] text-theme-text-2">
                  <code className="text-theme-text-3">label</code> and <code className="text-theme-text-3">secondaryLabel</code> props removed
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-theme-surface-2 rounded-[8px]">
              <span className="text-green-500 text-[12px] mt-0.5">✓</span>
              <div>
                <p className="text-[13px] text-theme-text-2">
                  Copy is hardcoded based on <code className="text-theme-text-3">state</code> prop only
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-theme-surface-2 rounded-[8px]">
              <span className="text-green-500 text-[12px] mt-0.5">✓</span>
              <div>
                <p className="text-[13px] text-theme-text-2">
                  Enforces consistency across entire product
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
