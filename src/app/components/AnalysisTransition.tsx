export function AnalysisTransition() {
  return (
    <div className="fixed inset-0 bg-theme-bg z-50 flex items-center justify-center px-5">
      <div className="max-w-[480px] text-center">
        {/* Title */}
        <h2 className="text-[24px] md:text-[28px] font-semibold text-theme-text-1 mb-3">
          Analyzing your responses
        </h2>

        {/* Subtext */}
        <p className="text-[15px] text-theme-text-2 mb-8">
          Applying rule-based checks to your answers.
        </p>

        {/* Pulsing Dots Animation */}
        <div className="flex items-center justify-center gap-2 mb-16">
          <div className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>

        {/* Compliance Guardrail */}
        <p className="text-[12px] text-theme-text-3 leading-relaxed max-w-[420px] mx-auto">
          Results are informational and based on rule-based checks. They do not confirm compliance or non-compliance.
        </p>
      </div>
    </div>
  );
}