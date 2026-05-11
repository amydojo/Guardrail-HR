import { Link, useSearchParams } from 'react-router';
import { ArrowLeft, Download, CheckCircle, ArrowRight, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CollapsibleSection } from '@/app/components/resources/CollapsibleSection';
import { OvertimeCalculatorRefined } from '@/app/components/resources/OvertimeCalculatorRefined';
import { OvertimeCalculatorMobile } from '@/app/components/resources/OvertimeCalculatorMobile';
import { OvertimeBreakdownDrawer } from '@/app/components/resources/OvertimeBreakdownDrawer';
import { generateResourcePDF } from '@/app/utils/pdfGenerator';
import { ALL_RESOURCES } from '@/app/data';

export function OvertimeCalculatorPage() {
  const [searchParams] = useSearchParams();
  const fromResults = searchParams.get('from') === 'results';
  const [isDownloading, setIsDownloading] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [allExpanded, setAllExpanded] = useState(false);
  const [sectionStates, setSectionStates] = useState<Record<string, boolean>>({});
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);
  const [breakdownData, setBreakdownData] = useState<any>(null);
  
  // Progress tracking state
  const [isDone, setIsDone] = useState(false);
  const [completedDate, setCompletedDate] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const slug = 'overtime-calculator';
  const resource = ALL_RESOURCES[slug];

  // Load state from localStorage
  useEffect(() => {
    const doneState = localStorage.getItem(`resource-done-${slug}`);
    const doneDate = localStorage.getItem(`resource-done-date-${slug}`);
    
    if (doneState === 'true') {
      setIsDone(true);
      setCompletedDate(doneDate);
    }
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      generateResourcePDF(resource);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setTimeout(() => setIsDownloading(false), 1500);
    }
  };

  const handleMarkDone = () => {
    const newState = !isDone;
    setIsDone(newState);
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    localStorage.setItem(`resource-done-${slug}`, String(newState));
    if (newState) {
      setCompletedDate(date);
      localStorage.setItem(`resource-done-date-${slug}`, date);
    } else {
      setCompletedDate(null);
      localStorage.removeItem(`resource-done-date-${slug}`);
    }
    showToastMessage(newState ? 'Marked as complete' : 'Unmarked as complete');
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleExpandAll = () => {
    const newState = !allExpanded;
    setAllExpanded(newState);
    const states: Record<string, boolean> = {};
    resource.sections.forEach(section => {
      states[section.id] = newState;
    });
    setSectionStates(states);
  };

  const handleOpenBreakdown = (data: any) => {
    setBreakdownData(data);
    setIsBreakdownOpen(true);
  };

  // Get first paragraph of overview
  const overviewFirstParagraph = resource.overview.split(/\.\s+/)[0] + '.';
  const hasMoreOverview = resource.overview.length > overviewFirstParagraph.length + 50;

  // Custom content for overtime calculator
  const tldrBullets = [
    'California overtime can trigger by day (>8 hours) and by week (>40 hours)',
    'Double-time applies for hours over 12 in a day or over 8 on the 7th consecutive day',
    'Weekly overtime only applies to hours not already counted as daily overtime'
  ];

  const commonMistakes = [
    'Counting weekly overtime on hours already treated as daily overtime ("double counting")',
    'Forgetting 7th consecutive day rules when employees work all 7 days',
    'Missing off-the-clock time (texts, closing tasks, remote work)'
  ];

  const oneThingAction = {
    text: 'Run last week\'s hours through this calculator and save the breakdown',
    section: null
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="mx-auto max-w-[800px] px-6 xl:px-8 py-12 sm:py-16">
        {/* Toast notification */}
        {showToast && (
          <div className="fixed top-6 right-6 z-50 animate-slideUp">
            <div className="bg-theme-surface-1 backdrop-blur-xl rounded-xl border border-theme-border-1 px-5 py-3 shadow-lg">
              <p className="text-[14px] text-theme-text-1 font-medium">{toastMessage}</p>
            </div>
          </div>
        )}

        {/* Back link */}
        <Link
          to={`/resources${fromResults ? '?from=results' : ''}`}
          className="inline-flex items-center gap-2 text-[13px] text-theme-text-3 hover:text-theme-text-1 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to resources
        </Link>

        {/* Compact Header */}
        <div className="mb-10">
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-3">
              <h1 className="text-[28px] sm:text-[32px] font-semibold text-theme-text-1 tracking-tight leading-tight flex-1">
                {resource.title}
              </h1>
              {isDone && (
                <span className="px-3 py-1.5 bg-theme-success-bg border border-theme-success-border rounded-lg text-[13px] text-theme-success flex-shrink-0">
                  Completed {completedDate && `· ${completedDate}`}
                </span>
              )}
            </div>
            <p className="text-[15px] sm:text-[16px] text-theme-text-2 leading-[1.65]">
              {resource.subtitle}
            </p>
          </div>

          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[13px] text-theme-chip-text">
              {resource.estimatedTime}
            </span>
            <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[13px] text-theme-chip-text">
              Tool
            </span>
            <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[13px] text-theme-chip-text">
              {resource.lastUpdated}
            </span>
          </div>
        </div>

        {/* HERO CALCULATOR */}
        <div className="mb-10">
          <div className="mb-5">
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
              Calculate overtime
            </h2>
            <p className="text-[14px] sm:text-[15px] text-theme-text-2 leading-[1.65]">
              Get accurate California overtime calculations in under 60 seconds
            </p>
          </div>
          
          {/* Mobile-optimized version for screens < 1024px */}
          <div className="block lg:hidden">
            <OvertimeCalculatorMobile onOpenBreakdown={handleOpenBreakdown} />
          </div>

          {/* Desktop version for screens >= 1024px */}
          <div className="hidden lg:block">
            <OvertimeCalculatorRefined onOpenBreakdown={handleOpenBreakdown} />
          </div>

          {/* Secondary actions - Download + Save/Done */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-theme-border-1 text-theme-text-2 text-[14px] font-medium hover:bg-theme-surface-1 transition-colors"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Downloading...' : 'Download spreadsheet version'}
            </button>
            <button 
              onClick={handleMarkDone}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[14px] font-medium transition-colors ${
                isDone
                  ? 'bg-theme-success-bg border-theme-success-border text-theme-success'
                  : 'border-theme-border-1 text-theme-text-2 hover:bg-theme-surface-1'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              {isDone ? 'Completed' : 'Mark done'}
            </button>
          </div>
        </div>

        {/* 3-MINUTE VERSION - Quick Rules */}
        <div className="mb-10">
          <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6">
            <h2 className="text-[17px] font-semibold text-theme-text-1 mb-5 tracking-tight leading-tight">
              Quick rules (3-minute version)
            </h2>

            {/* TL;DR */}
            <div className="mb-6">
              <h3 className="text-[14px] font-medium text-theme-text-2 mb-3 uppercase tracking-wide">TL;DR</h3>
              <ul className="space-y-2.5">
                {tldrBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-theme-accent mt-1 flex-shrink-0 text-[10px]">●</span>
                    <span className="text-[14px] text-theme-text-2 leading-[1.65]">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* If you do only 1 thing */}
            <div className="mb-6 pb-6 border-b border-theme-border-2">
              <h3 className="text-[14px] font-medium text-theme-text-2 mb-3 uppercase tracking-wide">
                If you do only 1 thing
              </h3>
              <p className="text-[14px] text-theme-text-2 leading-[1.65]">
                {oneThingAction.text}
              </p>
            </div>

            {/* Common mistakes */}
            <div>
              <h3 className="text-[14px] font-medium text-theme-text-2 mb-3 uppercase tracking-wide">
                Common mistakes
              </h3>
              <ul className="space-y-3">
                {commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-theme-warning mt-0.5 flex-shrink-0" />
                    <span className="text-[14px] text-theme-text-2 leading-[1.65]">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Overview - collapsed by default */}
        <div className="mb-10">
          <h2 className="text-[17px] font-semibold text-theme-text-1 mb-4 tracking-tight leading-tight">Overview</h2>
          <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6">
            <p className="text-[15px] text-theme-text-2 leading-[1.65]">
              {showFullOverview || !hasMoreOverview ? resource.overview : overviewFirstParagraph}
            </p>
            {hasMoreOverview && !showFullOverview && (
              <button
                onClick={() => setShowFullOverview(true)}
                className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent hover:text-theme-accent-hover transition-colors mt-4"
              >
                Read more
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
            {hasMoreOverview && showFullOverview && (
              <button
                onClick={() => setShowFullOverview(false)}
                className="inline-flex items-center gap-1.5 text-[14px] text-theme-text-3 hover:text-theme-text-2 transition-colors mt-4"
              >
                Show less
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Detailed Steps Accordion - Retitled sections */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-semibold text-theme-text-1 tracking-tight leading-tight">Detailed steps</h2>
            <button
              onClick={handleExpandAll}
              className="inline-flex items-center gap-1.5 text-[13px] text-theme-text-3 hover:text-theme-text-1 transition-colors"
            >
              {allExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  Collapse all
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  Expand all
                </>
              )}
            </button>
          </div>
          <div className="space-y-3">
            {resource.sections.map((section) => {
              // Add special labels for certain sections
              let sectionTitle = section.title;
              if (section.id === 'ca-overtime-rules') {
                sectionTitle = 'Overtime triggers (daily vs weekly)';
              } else if (section.id === 'calculation-examples') {
                sectionTitle = 'Worked examples';
              }

              return (
                <div key={section.id} id={`section-${section.id}`}>
                  <CollapsibleSection
                    title={sectionTitle}
                    summary={section.summary}
                    effort={section.effort}
                    defaultOpen={sectionStates[section.id] ?? false}
                    onToggle={(isOpen) => {
                      setSectionStates(prev => ({ ...prev, [section.id]: isOpen }));
                    }}
                  >
                    <div className="prose prose-invert prose-sm max-w-none">
                      <p className="text-[14px] text-theme-text-2 leading-[1.65] mb-4">
                        {section.content.overview}
                      </p>
                      
                      {section.content.subsections?.map((subsection, idx) => (
                        <div key={idx} className="mb-5">
                          <h4 className="text-[15px] font-medium text-theme-text-1 mb-2">
                            {subsection.title}
                          </h4>
                          {subsection.content && (
                            <p className="text-[14px] text-theme-text-2 leading-[1.65] mb-2">
                              {subsection.content}
                            </p>
                          )}
                          {subsection.bullets && (
                            <ul className="space-y-2 ml-5">
                              {subsection.bullets.map((bullet, bulletIdx) => (
                                <li key={bulletIdx} className="text-[14px] text-theme-text-2 leading-[1.65] list-disc">
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                </div>
              );
            })}
          </div>
        </div>

        {/* Related Resources */}
        {resource.relatedResources && resource.relatedResources.length > 0 && (
          <div className="mb-10">
            <h2 className="text-[17px] font-semibold text-theme-text-1 mb-4 tracking-tight leading-tight">
              Related resources
            </h2>
            <div className="space-y-3">
              {resource.relatedResources.map((relatedSlug) => {
                const related = ALL_RESOURCES[relatedSlug];
                if (!related) return null;
                
                return (
                  <Link
                    key={relatedSlug}
                    to={`/resources/${relatedSlug}`}
                    className="block p-4 bg-theme-surface-1 border border-theme-border-1 rounded-xl hover:border-theme-border-1 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[15px] font-medium text-theme-text-1 mb-1 group-hover:text-theme-accent transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-[13px] text-theme-text-3">
                          {related.category} · {related.estimatedTime}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-theme-text-3 group-hover:text-theme-accent group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Breakdown Drawer */}
      {isBreakdownOpen && breakdownData && (
        <OvertimeBreakdownDrawer
          isOpen={isBreakdownOpen}
          onClose={() => setIsBreakdownOpen(false)}
          data={breakdownData}
        />
      )}
    </div>
  );
}