import { Link } from 'react-router';
import { ArrowRight, AlertCircle, Link2, ListOrdered, RotateCw, FileDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PrimaryAction } from '@/app/components/PrimaryAction';
import { motion } from 'motion/react';
import { HeroResultsPreview } from '@/app/components/HeroResultsPreview';
import { HowItWorksDrawer } from '@/app/components/HowItWorksDrawer';
import { Footer } from '@/app/components/shared/Footer';

type CapabilityType = 'traceability' | 'prioritized' | 'reassessment' | 'export';

export function LandingPage() {
  // Check if user has completed a scan
  // In a real app, this would come from context/state management
  const [hasScan, setHasScan] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCapability, setActiveCapability] = useState<CapabilityType>('traceability');
  const [scanData, setScanData] = useState({
    score: 72,
    completedAt: Date.now(),
    riskBand: 'elevated' as 'elevated' | 'moderate' | 'lower',
    riskAreasCount: 4,
    highestPriorityIssue: {
      label: 'Employee misclassification exposure',
      severity: 'high' as 'high' | 'moderate' | 'low'
    },
    hasActionableItems: true,
    drivers: [
      {
        id: 'classification',
        label: 'Employee classification',
        exposure: 'Moderate exposure',
        description: 'Exemption documentation may be incomplete'
      },
      {
        id: 'overtime',
        label: 'Overtime & break tracking',
        exposure: 'Moderate exposure',
        description: 'Meal break processes may need documentation'
      }
    ]
  });

  // Simulate checking for scan completion
  useEffect(() => {
    // In real implementation, check localStorage or context
    // Set to true to see post-scan state
    const hasCompletedScan = false;
    setHasScan(hasCompletedScan);
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getRiskBandLabel = (band: string) => {
    switch (band) {
      case 'elevated': return 'Elevated exposure';
      case 'moderate': return 'Moderate exposure';
      case 'lower': return 'Lower exposure';
      default: return 'Unknown exposure';
    }
  };

  const getRiskBandColor = (band: string) => {
    switch (band) {
      case 'elevated': return 'text-theme-status-warning';
      case 'moderate': return 'text-theme-status-warning';
      case 'lower': return 'text-theme-status-success';
      default: return 'text-theme-text-2';
    }
  };

  // POST-SCAN STATE - Living Snapshot
  if (hasScan) {
    return (
      <div className="min-h-screen bg-theme-bg text-theme-text-1">
        {/* Current Exposure Summary - Replaces Hero */}
        <section className="mx-auto max-w-[1080px] px-6 xl:px-8 pt-16 xl:pt-24 pb-12">
          <div className="max-w-[840px]">
            {/* Header */}
            <div className="mb-10">
              <p className="text-[11px] text-theme-text-3 mb-3 font-medium tracking-wider uppercase">
                Wage & Hour Compliance
              </p>
              <h1 className="text-[32px] xl:text-[40px] font-semibold tracking-tight leading-tight">
                Current exposure
              </h1>
            </div>

            {/* Score Card - Primary Mobile Anchor */}
            <div className="bg-theme-surface-1 rounded-2xl p-8 border border-theme-border-1 mb-6">
              {/* Score Display */}
              <div className="mb-8">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-[64px] xl:text-[72px] font-semibold leading-none tracking-tight">
                    {scanData.score}
                  </span>
                  <span className="text-[36px] xl:text-[40px] font-normal text-theme-text-3 leading-none">
                    / 100
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[15px] font-medium ${getRiskBandColor(scanData.riskBand)}`}>
                    {getRiskBandLabel(scanData.riskBand)}
                  </span>
                  <span className="text-[14px] text-theme-text-3">
                    under California wage & hour rules
                  </span>
                </div>
                <p className="text-[13px] text-theme-text-3">
                  Last updated {formatDate(scanData.completedAt)}
                </p>
              </div>

              {/* System Readout */}
              <div className="space-y-4 mb-8 pb-8 border-t border-theme-border-1 pt-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[14px] text-theme-text-3">Risk areas identified</span>
                  <span className="text-[14px] text-theme-text-1 font-medium">{scanData.riskAreasCount}</span>
                </div>
                {scanData.highestPriorityIssue && (
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[14px] text-theme-text-3">Highest priority</span>
                    <div className="text-right">
                      <div className="text-[14px] text-theme-text-1 font-medium mb-1">
                        {scanData.highestPriorityIssue.label}
                      </div>
                      <div className="text-[13px] text-theme-text-3 capitalize">
                        {scanData.highestPriorityIssue.severity} severity
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/modules/wage-hour/results"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-theme-accent text-theme-text-1 text-[15px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                >
                  View full report
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
                {scanData.hasActionableItems && (
                  <Link
                    to="/modules/wage-hour/results#next-steps"
                    className="flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-theme-border-1 text-[15px] font-medium text-theme-text-1 hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                  >
                    Start fixing issues
                  </Link>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-theme-surface-1 rounded-2xl p-6 border border-theme-border-1 shadow-theme-1 transition-all duration-300 ease-out hover:-translate-y-[1px] hover:shadow-theme-2 hover:border-theme-border-1">
                <p className="text-[11px] text-theme-text-3 mb-2 font-medium uppercase tracking-wider">Assessment version</p>
                <p className="text-[15px] text-theme-text-1 font-medium">Jan 2026</p>
              </div>
              <div className="bg-theme-surface-1 rounded-2xl p-6 border border-theme-border-1 shadow-theme-1 transition-all duration-300 ease-out hover:-translate-y-[1px] hover:shadow-theme-2 hover:border-theme-border-1">
                <p className="text-[11px] text-theme-text-3 mb-2 font-medium uppercase tracking-wider">Jurisdiction</p>
                <p className="text-[15px] text-theme-text-1 font-medium">California</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Capabilities */}
        <section className="mx-auto max-w-[1080px] px-6 xl:px-8 py-24 xl:py-32">
          <div className="max-w-[900px] mx-auto md:ml-auto md:mr-0 md:max-w-[592px]">
            <div className="mb-20">
              <h2 className="text-[11px] font-medium text-theme-text-3 tracking-wider uppercase mb-5">Product capabilities</h2>
              <p className="text-[17px] text-theme-text-2 leading-relaxed">
                Built for transparency and control
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Capability 1 */}
              <div className="group bg-theme-surface-1 rounded-2xl p-6 border border-theme-border-1 shadow-theme-1 h-full flex flex-col transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-theme-surface-1 hover:border-theme-border-1 hover:shadow-theme-2">
                <h3 className="text-[16px] font-semibold mb-2 text-theme-text-1 tracking-tight leading-tight">Full traceability</h3>
                <p className="text-[14px] text-theme-text-3 leading-[1.65]">
                  Every score component links to specific assessment responses with change tracking.
                </p>
              </div>

              {/* Capability 2 */}
              <div className="group bg-theme-surface-1 rounded-2xl p-6 border border-theme-border-1 shadow-theme-1 h-full flex flex-col transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-theme-surface-1 hover:border-theme-border-1 hover:shadow-theme-2">
                <h3 className="text-[16px] font-semibold mb-2 text-theme-text-1 tracking-tight leading-tight">Prioritized actions</h3>
                <p className="text-[14px] text-theme-text-3 leading-[1.65]">
                  Remediation steps ranked by estimated effort and compliance impact.
                </p>
              </div>

              {/* Capability 3 */}
              <div className="group bg-theme-surface-1 rounded-2xl p-6 border border-theme-border-1 shadow-theme-1 h-full flex flex-col transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-theme-surface-1 hover:border-theme-border-1 hover:shadow-theme-2">
                <h3 className="text-[16px] font-semibold mb-2 text-theme-text-1 tracking-tight leading-tight">Re-assessment</h3>
                <p className="text-[14px] text-theme-text-3 leading-[1.65]">
                  Update answers individually or retake in full to track compliance changes over time.
                </p>
              </div>

              {/* Capability 4 */}
              <div className="group bg-theme-surface-1 rounded-2xl p-6 border border-theme-border-1 shadow-theme-1 h-full flex flex-col transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-theme-surface-1 hover:border-theme-border-1 hover:shadow-theme-2">
                <h3 className="text-[16px] font-semibold mb-2 text-theme-text-1 tracking-tight leading-tight">Export for review</h3>
                <p className="text-[14px] text-theme-text-3 leading-[1.65]">
                  Generate formatted reports suitable for legal, accounting, or payroll provider review.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  // PRE-SCAN STATE - Minimal, Trust-Focused
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-1">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-[1080px] px-6 xl:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16 xl:pt-32 xl:pb-20 overflow-hidden">
        {/* Subtle near-black gradient - barely perceptible depth */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="w-[700px] h-[700px] bg-gradient-radial from-[#0d0d0d] via-[#0b0b0b] to-transparent opacity-40 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-[720px] mx-auto text-center">
          {/* Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[44px] sm:text-[64px] xl:text-[80px] font-semibold leading-[1.06] sm:leading-[1.05] tracking-[-0.04em] mb-6 sm:mb-7 text-theme-text-1"
          >
            Know your compliance
            <br />
            exposure
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[16px] sm:text-[17px] xl:text-[18px] text-theme-text-2 leading-[1.6] mb-8 sm:mb-10 max-w-[340px] sm:max-w-[560px] mx-auto"
          >
            Identify wage & hour exposure under California law with a traceable score and prioritized next steps.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 sm:mb-12"
          >
            <div className="flex flex-col items-center w-full sm:w-auto">
              <Link to="/modules/wage-hour" className="inline-block w-full sm:w-auto">
                <PrimaryAction
                  context="hero"
                  state="pre_scan"
                  onClick={() => {}}
                  className="w-full sm:w-auto"
                />
              </Link>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-4 text-[13px] text-theme-text-3 font-normal text-center leading-none"
              >
                5–10 minutes • Not legal advice • Free diagnostic
              </motion.p>
            </div>
          </motion.div>

          {/* Hero Preview - Realistic Product UI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroResultsPreview />
          </motion.div>
        </div>
      </section>

      {/* After Scanning Section - VALUE/OUTCOME FIRST */}
      <section className="relative mx-auto max-w-[1080px] px-6 xl:px-8 py-16 sm:py-20 xl:py-24">
        {/* Subtle near-black gradient - barely perceptible depth */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="w-[900px] h-[700px] bg-gradient-radial from-[#0e0e0e] via-[#0b0b0b] to-transparent opacity-35 rounded-full blur-[140px]" />
        </div>

        {/* Section Header - Standardized */}
        <div className="relative mb-12 sm:mb-14">
          <p className="text-[11px] font-medium text-theme-text-3 tracking-wider uppercase mb-3">
            After scanning
          </p>
          <h2 className="text-[24px] sm:text-[28px] xl:text-[32px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-3">
            What you'll see in under 10 minutes
          </h2>
          <p className="text-[15px] sm:text-[16px] text-theme-text-2 leading-relaxed max-w-[560px]">
            A traceable risk score, prioritized exposure areas, and clear next steps.
          </p>
        </div>

        {/* Card Grid - Tight Vertical Stack on Mobile */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Card 1: Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="bg-theme-surface-1 rounded-2xl p-6 sm:p-8 border border-theme-border-1 shadow-theme-1 h-full flex flex-col
            transition-all duration-200 ease-out
            hover:-translate-y-[1px] hover:border-theme-border-1 hover:shadow-theme-2
            focus-within:outline-none focus-within:ring-2 focus-within:ring-theme-focus/40 focus-within:ring-offset-2 focus-within:ring-offset-theme-bg"
          >
            {/* Header Row */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-[15px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-1">Risk score</h3>
              <p className="text-[11px] text-theme-text-3 uppercase tracking-wider font-medium leading-tight">Primary metric</p>
            </div>

            {/* Big Number with Scale */}
            <div className="flex-1 flex flex-col justify-center mb-6 sm:mb-8">
              <div className="relative">
                {/* Score */}
                <div className="flex items-baseline gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-[56px] sm:text-[72px] font-semibold leading-none tracking-[-0.02em] text-theme-text-1">
                    72
                  </span>
                  <span className="text-[28px] sm:text-[32px] text-theme-text-3 leading-none">
                    / 100
                  </span>
                </div>
                
                {/* Subtle Scale Indicator */}
                <div className="flex items-center gap-1.5 mb-2.5 sm:mb-3">
                  <div className="flex-1 h-1 rounded-full bg-theme-border-1">
                    <div 
                      className="h-full bg-gradient-to-r from-theme-accent to-[#7b8ff8] rounded-full" 
                      style={{ width: '72%' }}
                    />
                  </div>
                </div>
                
                {/* Label */}
                <p className="text-[12px] sm:text-[13px] text-theme-text-3 leading-relaxed">
                  Elevated exposure under California wage & hour rules
                </p>
              </div>
            </div>

            {/* Footer Meta */}
            <div className="pt-5 sm:pt-6 border-t border-theme-border-2">
              <p className="text-[11px] text-theme-text-3 leading-relaxed">
                Based on 18 compliance factors across 4 risk categories
              </p>
            </div>
          </motion.div>

          {/* Card 2: Risk Drivers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-theme-surface-1 rounded-2xl p-6 sm:p-8 border border-theme-border-1 shadow-theme-1 h-full flex flex-col
            transition-all duration-200 ease-out
            hover:-translate-y-[1px] hover:border-theme-border-1 hover:shadow-theme-2
            focus-within:outline-none focus-within:ring-2 focus-within:ring-theme-focus/40 focus-within:ring-offset-2 focus-within:ring-offset-theme-bg"
          >
            {/* Header Row */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-[15px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-1">Risk drivers</h3>
              <p className="text-[11px] text-theme-text-3 uppercase tracking-wider font-medium leading-tight">Exposure areas</p>
            </div>

            {/* Driver Items */}
            <div className="flex-1 space-y-4 sm:space-y-5">
              <div>
                <div className="flex items-start gap-2.5 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500/80 mt-2 flex-shrink-0" />
                  <h4 className="text-[14px] text-theme-text-1 font-medium leading-tight">
                    Employee classification
                  </h4>
                </div>
                <p className="text-[13px] text-theme-text-3 leading-relaxed ml-4">
                  Exemption documentation gaps identified
                </p>
              </div>

              <div>
                <div className="flex items-start gap-2.5 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80 mt-2 flex-shrink-0" />
                  <h4 className="text-[14px] text-theme-text-1 font-medium leading-tight">
                    Overtime tracking
                  </h4>
                </div>
                <p className="text-[13px] text-theme-text-3 leading-relaxed ml-4">
                  Break policy enforcement needs review
                </p>
              </div>
            </div>

            {/* Footer Meta */}
            <div className="pt-5 sm:pt-6 border-t border-theme-border-2">
              <p className="text-[11px] text-theme-text-3 leading-relaxed">
                Each driver links to specific assessment responses
              </p>
            </div>
          </motion.div>

          {/* Card 3: Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-theme-surface-1 rounded-2xl p-6 sm:p-8 border border-theme-border-1 shadow-theme-1 h-full flex flex-col
            transition-all duration-200 ease-out
            hover:-translate-y-[1px] hover:border-theme-border-1 hover:shadow-theme-2
            focus-within:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg"
          >
            {/* Header Row */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-[15px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-1">Next steps</h3>
              <p className="text-[11px] text-theme-text-3 uppercase tracking-wider font-medium leading-tight">Prioritized actions</p>
            </div>

            {/* Action Items */}
            <div className="flex-1 space-y-4 sm:space-y-5">
              <div>
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h4 className="text-[14px] text-theme-text-1 font-medium leading-tight flex-1">
                    Review exemption docs
                  </h4>
                  <span className="inline-flex items-center flex-shrink-0 px-2 py-0.5 rounded bg-theme-chip-bg border border-theme-chip-border text-[10px] font-medium text-theme-chip-text uppercase tracking-wider">
                    Low
                  </span>
                </div>
                <p className="text-[13px] text-theme-text-3 leading-relaxed">
                  Verify classification criteria alignment
                </p>
              </div>

              <div>
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h4 className="text-[14px] text-theme-text-1 font-medium leading-tight flex-1">
                    Document break policies
                  </h4>
                  <span className="inline-flex items-center flex-shrink-0 px-2 py-0.5 rounded bg-theme-chip-bg border border-theme-chip-border text-[10px] font-medium text-theme-chip-text uppercase tracking-wider">
                    Med
                  </span>
                </div>
                <p className="text-[13px] text-theme-text-3 leading-relaxed">
                  Create written procedures and attestations
                </p>
              </div>
            </div>

            {/* Footer Meta */}
            <div className="pt-5 sm:pt-6 border-t border-theme-border-2">
              <p className="text-[11px] text-theme-text-3 leading-relaxed">
                Ranked by compliance impact and estimated effort
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Capabilities Section - CAPABILITIES SECOND */}
      <section className="mx-auto max-w-[1080px] px-6 xl:px-8 py-16 sm:py-20 xl:py-24">
        {/* Section Header - Standardized */}
        <div className="mb-12 sm:mb-14">
          <p className="text-[11px] font-medium text-theme-text-3 tracking-wider uppercase mb-3">
            Product capabilities
          </p>
          <h2 className="text-[24px] sm:text-[28px] xl:text-[32px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-3">
            Built for transparency and control
          </h2>
          <p className="text-[15px] sm:text-[16px] text-theme-text-2 leading-relaxed max-w-[560px]">
            Every compliance decision links to traceable logic and source data.
          </p>
        </div>

        {/* Unified 2x2 Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-theme-border-1 rounded-2xl overflow-hidden border border-theme-border-1">
          {/* Tile 1: Full Traceability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={`group bg-theme-bg p-8 xl:p-10 flex flex-col transition-all duration-200
            lg:hover:bg-theme-surface-2
            ${drawerOpen && activeCapability === 'traceability' ? 'bg-theme-surface-1 border-l-2 border-l-theme-accent/40' : ''}
            lg:cursor-default cursor-pointer active:bg-theme-surface-2`}
            onClick={(e) => {
              // Mobile: make entire tile tappable
              if (window.innerWidth < 1024) {
                setActiveCapability('traceability');
                setDrawerOpen(true);
              }
            }}
          >
            {/* Icon Tile */}
            <div className="mb-6 pointer-events-none">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-theme-chip-bg border border-theme-chip-border transition-colors duration-200 group-hover:bg-theme-surface-1 group-hover:border-theme-border-1">
                <Link2 className="w-5 h-5 text-theme-icon-2" strokeWidth={2} />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 mb-6 pointer-events-none">
              <h3 className="text-[17px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
                Full traceability
              </h3>
              <p className="text-[14px] text-theme-text-3 leading-[1.65]">
                Every score component links to specific assessment responses with change tracking.
              </p>
            </div>

            {/* Link - Desktop only interactive, Mobile shows affordance */}
            <div className="pointer-events-none lg:pointer-events-auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveCapability('traceability');
                  setDrawerOpen(true);
                }}
                className="inline-flex items-center gap-1.5 text-[13px] text-theme-text-3 hover:text-theme-text-2 transition-colors duration-200 group/link focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                aria-expanded={drawerOpen && activeCapability === 'traceability'}
              >
                <span className="hidden lg:inline">Learn how this works</span>
                <span className="lg:hidden">How it works</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" strokeWidth={2} />
              </button>
            </div>
          </motion.div>

          {/* Tile 2: Prioritized Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`group bg-theme-bg p-8 xl:p-10 flex flex-col transition-all duration-200
            lg:hover:bg-theme-surface-2
            ${drawerOpen && activeCapability === 'prioritized' ? 'bg-theme-surface-1 border-l-2 border-l-theme-accent/40' : ''}
            lg:cursor-default cursor-pointer active:bg-theme-surface-2`}
            onClick={(e) => {
              // Mobile: make entire tile tappable
              if (window.innerWidth < 1024) {
                setActiveCapability('prioritized');
                setDrawerOpen(true);
              }
            }}
          >
            {/* Icon Tile */}
            <div className="mb-6 pointer-events-none">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-theme-chip-bg border border-theme-chip-border transition-colors duration-200 group-hover:bg-theme-surface-1 group-hover:border-theme-border-1">
                <ListOrdered className="w-5 h-5 text-theme-icon-2" strokeWidth={2} />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 mb-6 pointer-events-none">
              <h3 className="text-[17px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
                Prioritized actions
              </h3>
              <p className="text-[14px] text-theme-text-3 leading-[1.65]">
                Remediation steps ranked by estimated effort and compliance impact.
              </p>
            </div>

            {/* Link - Desktop only interactive, Mobile shows affordance */}
            <div className="pointer-events-none lg:pointer-events-auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveCapability('prioritized');
                  setDrawerOpen(true);
                }}
                className="inline-flex items-center gap-1.5 text-[13px] text-theme-text-3 hover:text-theme-text-2 transition-colors duration-200 group/link focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                aria-expanded={drawerOpen && activeCapability === 'prioritized'}
              >
                <span className="hidden lg:inline">Learn how this works</span>
                <span className="lg:hidden">How it works</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" strokeWidth={2} />
              </button>
            </div>
          </motion.div>

          {/* Tile 3: Re-assessment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`group bg-theme-bg p-8 xl:p-10 flex flex-col transition-all duration-200
            lg:hover:bg-theme-surface-2
            ${drawerOpen && activeCapability === 'reassessment' ? 'bg-theme-surface-1 border-l-2 border-l-theme-accent/40' : ''}
            lg:cursor-default cursor-pointer active:bg-theme-surface-2`}
            onClick={(e) => {
              // Mobile: make entire tile tappable
              if (window.innerWidth < 1024) {
                setActiveCapability('reassessment');
                setDrawerOpen(true);
              }
            }}
          >
            {/* Icon Tile */}
            <div className="mb-6 pointer-events-none">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-theme-chip-bg border border-theme-chip-border transition-colors duration-200 group-hover:bg-theme-surface-1 group-hover:border-theme-border-1">
                <RotateCw className="w-5 h-5 text-theme-icon-2" strokeWidth={2} />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 mb-6 pointer-events-none">
              <h3 className="text-[17px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
                Re-assessment
              </h3>
              <p className="text-[14px] text-theme-text-3 leading-[1.65]">
                Update answers individually or retake in full to track changes over time.
              </p>
            </div>

            {/* Link - Desktop only interactive, Mobile shows affordance */}
            <div className="pointer-events-none lg:pointer-events-auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveCapability('reassessment');
                  setDrawerOpen(true);
                }}
                className="inline-flex items-center gap-1.5 text-[13px] text-theme-text-3 hover:text-theme-text-2 transition-colors duration-200 group/link focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                aria-expanded={drawerOpen && activeCapability === 'reassessment'}
              >
                <span className="hidden lg:inline">Learn how this works</span>
                <span className="lg:hidden">How it works</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" strokeWidth={2} />
              </button>
            </div>
          </motion.div>

          {/* Tile 4: Export for Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`group bg-theme-bg p-8 xl:p-10 flex flex-col transition-all duration-200
            lg:hover:bg-theme-surface-2
            ${drawerOpen && activeCapability === 'export' ? 'bg-theme-surface-1 border-l-2 border-l-theme-accent/40' : ''}
            lg:cursor-default cursor-pointer active:bg-theme-surface-2`}
            onClick={(e) => {
              // Mobile: make entire tile tappable
              if (window.innerWidth < 1024) {
                setActiveCapability('export');
                setDrawerOpen(true);
              }
            }}
          >
            {/* Icon Tile */}
            <div className="mb-6 pointer-events-none">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-theme-chip-bg border border-theme-chip-border transition-colors duration-200 group-hover:bg-theme-surface-1 group-hover:border-theme-border-1">
                <FileDown className="w-5 h-5 text-theme-icon-2" strokeWidth={2} />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 mb-6 pointer-events-none">
              <h3 className="text-[17px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
                Export for review
              </h3>
              <p className="text-[14px] text-theme-text-3 leading-[1.65]">
                Generate formatted reports for legal, accounting, or payroll provider review.
              </p>
            </div>

            {/* Link - Desktop only interactive, Mobile shows affordance */}
            <div className="pointer-events-none lg:pointer-events-auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveCapability('export');
                  setDrawerOpen(true);
                }}
                className="inline-flex items-center gap-1.5 text-[13px] text-theme-text-3 hover:text-theme-text-2 transition-colors duration-200 group/link focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                aria-expanded={drawerOpen && activeCapability === 'export'}
              >
                <span className="hidden lg:inline">Learn how this works</span>
                <span className="lg:hidden">How it works</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Understanding Guardrail Section */}
      <section className="mx-auto max-w-[1080px] px-6 xl:px-8 py-16 sm:py-20 xl:py-24">
        {/* Section Header - Standardized */}
        <div className="mb-12 sm:mb-14 text-center">
          <h2 className="text-[11px] font-medium text-theme-text-3 tracking-wider uppercase mb-5">
            Understanding Guardrail
          </h2>
          <p className="text-[16px] sm:text-[17px] text-theme-text-2 leading-relaxed max-w-[480px] mx-auto px-4 sm:px-0">
            What this platform does — and what it doesn't.
          </p>
        </div>

        {/* Trust Panel */}
        <div className="max-w-[920px] mx-auto bg-theme-surface-2 backdrop-blur-sm rounded-2xl border border-theme-border-1 p-8 sm:p-10 xl:p-12">
          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 xl:gap-16">
            {/* What This Provides */}
            <div>
              <div className="mb-7">
                <h3 className="text-[13px] font-medium text-theme-text-1 tracking-tight">What this provides</h3>
              </div>
              <ul className="space-y-7">
                <li className="flex items-start gap-3.5">
                  <div className="w-1 h-1 rounded-full bg-theme-accent/60 mt-[9px] flex-shrink-0" />
                  <div>
                    <p className="text-[15px] font-medium text-theme-text-1 leading-snug mb-2">
                      Risk assessment
                    </p>
                    <p className="text-[14px] text-theme-text-3 leading-[1.75]">
                      Score based on your responses to compliance questions
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-1 h-1 rounded-full bg-theme-accent/60 mt-[9px] flex-shrink-0" />
                  <div>
                    <p className="text-[15px] font-medium text-theme-text-1 leading-snug mb-2">
                      Exposure identification
                    </p>
                    <p className="text-[14px] text-theme-text-3 leading-[1.75]">
                      Areas where your practices may not align with requirements
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-1 h-1 rounded-full bg-theme-accent/60 mt-[9px] flex-shrink-0" />
                  <div>
                    <p className="text-[15px] font-medium text-theme-text-1 leading-snug mb-2">
                      Prioritization framework
                    </p>
                    <p className="text-[14px] text-theme-text-3 leading-[1.75]">
                      Suggested order for addressing identified gaps
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* What This Doesn't Provide */}
            <div>
              <div className="mb-7">
                <h3 className="text-[13px] font-medium text-theme-text-1 tracking-tight">What this doesn't provide</h3>
              </div>
              <ul className="space-y-7">
                <li className="flex items-start gap-3.5">
                  <div className="w-1 h-1 rounded-full bg-theme-text-3/60 mt-[9px] flex-shrink-0" />
                  <div>
                    <p className="text-[15px] font-medium text-theme-text-2 leading-snug mb-2">
                      Legal advice
                    </p>
                    <p className="text-[14px] text-theme-text-3 leading-[1.75]">
                      Not a substitute for consultation with an attorney
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-1 h-1 rounded-full bg-theme-text-3/60 mt-[9px] flex-shrink-0" />
                  <div>
                    <p className="text-[15px] font-medium text-theme-text-2 leading-snug mb-2">
                      Compliance certification
                    </p>
                    <p className="text-[14px] text-theme-text-3 leading-[1.75]">
                      Does not verify or certify your compliance status
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-1 h-1 rounded-full bg-theme-text-3/60 mt-[9px] flex-shrink-0" />
                  <div>
                    <p className="text-[15px] font-medium text-theme-text-2 leading-snug mb-2">
                      Professional representation
                    </p>
                    <p className="text-[14px] text-theme-text-3 leading-[1.75]">
                      No attorney-client relationship is created
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Apple-Style Fine Print */}
          <div className="mt-10 sm:mt-12 pt-8 border-t border-theme-border-2">
            <p className="text-[11px] text-theme-text-3 leading-[1.9] text-center max-w-[680px] mx-auto font-normal">
              Rule-based checks for California wage and hour law. For guidance specific to your situation, consult a qualified professional.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* How It Works Drawer */}
      <HowItWorksDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        capability={activeCapability}
      />
    </div>
  );
}