import { Link, useNavigate } from 'react-router';
import { Check } from 'lucide-react';
import { PrimaryAction } from '@/app/components/PrimaryAction';
import { PageHeader, Section, CardShell, LinkRow } from '@/app/components/shared/DesignSystem';

export function WageHourModule() {
  // Mock data - would come from database
  const isRerun = false; // Change to true for re-run variant
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-1">
      {/* Breadcrumb */}
      <div className="bg-theme-bg border-b border-theme-border-1">
        <div className="mx-auto max-w-[1080px] px-6 xl:px-8 py-4">
          <div className="flex items-center gap-2 text-[13px] text-theme-text-3">
            <Link to="/modules" className="hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0">Modules</Link>
            <span>/</span>
            <span className="text-theme-text-1">Wage & Hour</span>
          </div>
        </div>
      </div>

      <Section>
        {/* Header */}
        <PageHeader
          title="Wage & Hour Risk Assessment"
          subtitle="Assess your California wage & hour compliance across pay rates, overtime, breaks, timekeeping, paydays, and contractor relationships."
        />

        {/* Start Assessment Card */}
        <div className="mb-16">
          <CardShell className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-[20px] md:text-[22px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
                {isRerun ? 'Re-run assessment' : 'Start assessment'}
              </h2>
              <p className="text-[13px] md:text-[14px] text-theme-text-3">
                23 questions · ~15 minutes
              </p>
            </div>
            <PrimaryAction
              context="inline"
              state="pre_scan"
              onClick={() => navigate('/modules/wage-hour/disclosure')}
            />
          </CardShell>
        </div>

        {/* What's covered */}
        <div className="mb-16">
          <h3 className="text-[15px] font-medium text-theme-text-3 mb-6 tracking-tight">
            What's covered
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Minimum wage and overtime calculation',
              'Meal and rest break compliance',
              'Timekeeping and pay timing',
              'Wage statement requirements',
              'Employee classification verification',
              'Contractor relationship documentation'
            ].map((item, idx) => (
              <CardShell key={idx} className="flex items-start gap-3 p-5">
                <Check className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                <span className="text-[14px] text-theme-text-2 leading-relaxed">{item}</span>
              </CardShell>
            ))}
          </div>
        </div>

        {/* Top resources */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[15px] font-medium text-theme-text-3 tracking-tight">
              Top resources
            </h3>
            <LinkRow href="/resources/wage-hour">
              View all
            </LinkRow>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link to="/resources/exemption-checklist">
              <CardShell hover>
                <h4 className="text-[15px] font-medium mb-2 text-theme-text-1 tracking-tight leading-tight">
                  Exemption checklist
                </h4>
                <p className="text-[13px] text-theme-text-3 leading-relaxed">
                  Step-by-step classification verification
                </p>
              </CardShell>
            </Link>
            <Link to="/resources/wage-statement-guide">
              <CardShell hover>
                <h4 className="text-[15px] font-medium mb-2 text-theme-text-1 tracking-tight leading-tight">
                  Wage statement guide
                </h4>
                <p className="text-[13px] text-theme-text-3 leading-relaxed">
                  Required fields and common errors
                </p>
              </CardShell>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
