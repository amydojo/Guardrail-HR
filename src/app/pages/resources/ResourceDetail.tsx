import { Link, useParams, useSearchParams } from 'react-router';
import { ArrowLeft, Download, CheckCircle, Plus, ArrowRight, ChevronDown, ChevronUp, AlertTriangle, X, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CollapsibleSection } from '@/app/components/resources/CollapsibleSection';
import { SectionContent } from '@/app/components/resources/SectionContent';
import { ALL_RESOURCES } from '@/app/data';
import { generateResourcePDF } from '@/app/utils/pdfGenerator';
import { SavedToggle } from '@/app/components/saved/SavedToggle';
import { isSaved } from '@/app/saved/savedStorage';

export function ResourceDetail() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const fromResults = searchParams.get('from') === 'results';
  const [isDownloading, setIsDownloading] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [allExpanded, setAllExpanded] = useState(false);
  const [sectionStates, setSectionStates] = useState<Record<string, boolean>>({});
  
  // Progress tracking state
  const [isDone, setIsDone] = useState(false);
  const [completedDate, setCompletedDate] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Get resource data based on slug
  const resource = slug ? ALL_RESOURCES[slug] : null;

  // Load state from localStorage
  useEffect(() => {
    if (slug) {
      const doneState = localStorage.getItem(`resource-done-${slug}`);
      const doneDate = localStorage.getItem(`resource-done-date-${slug}`);
      
      if (doneState === 'true') {
        setIsDone(true);
        setCompletedDate(doneDate);
      }
    }
  }, [slug]);

  // Redirect to 404 if resource not found
  if (!resource) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[32px] sm:text-[48px] font-semibold text-theme-text-1 mb-4 tracking-tight leading-tight">Resource not found</h1>
          <p className="text-[15px] text-theme-text-3 mb-8">The resource you're looking for doesn't exist.</p>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-accent text-white text-[15px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to resources
          </Link>
        </div>
      </div>
    );
  }

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
    
    if (slug) {
      localStorage.setItem(`resource-done-${slug}`, String(newState));
      if (newState) {
        setCompletedDate(date);
        localStorage.setItem(`resource-done-date-${slug}`, date);
      } else {
        setCompletedDate(null);
        localStorage.removeItem(`resource-done-date-${slug}`);
      }
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

  // Get first paragraph of overview
  const overviewFirstParagraph = resource.overview.split(/\.\s+/)[0] + '.';
  const hasMoreOverview = resource.overview.length > overviewFirstParagraph.length + 50;

  // Mock data - in production would come from resource metadata
  const exposureAreas = ['Classification', 'Pay stubs', 'Recordkeeping'];
  const relatedDrivers = ['Missing exemption documentation', 'Incomplete employee records'];
  
  const tldrBullets = [
    'California requires exempt employees earn 2x minimum wage ($66,560/year as of 2026)',
    'Employees must spend >50% time on exempt duties (stricter than federal law)',
    'Maintain salary basis records and job descriptions to defend classifications'
  ];

  const commonMistakes = [
    'Assuming job titles determine exemption status (they don\'t — duties do)',
    'Forgetting California\'s 50% rule is stricter than federal law',
    'Missing documentation when audit happens (burden of proof is on you)'
  ];

  const oneThingAction = {
    text: 'Verify salary thresholds for all current exempt employees',
    section: resource.sections[0]?.id
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="mx-auto max-w-[800px] px-6 xl:px-8 py-12 sm:py-16">
        {/* Toast notification */}
        {showToast && (
          <div className="fixed top-6 right-6 z-50 animate-slideUp">
            <div className="bg-theme-surface-1 border border-theme-border-1 rounded-xl px-5 py-3 shadow-theme-2">
              <p className="text-[14px] text-theme-text-1 font-medium">{toastMessage}</p>
            </div>
          </div>
        )}

        {/* Back link */}
        <Link
          to={`/resources${fromResults ? '?from=results' : ''}`}
          className="inline-flex items-center gap-2 text-[13px] text-theme-text-3 hover:text-theme-text-2 mb-8 md:mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to resources
        </Link>

        {/* Compact Header */}
        <div className="mb-8 md:mb-10">
          <div className="mb-8 md:mb-6">
            <div className="flex items-start gap-3 mb-4 md:mb-3">
              <h1 className="text-[28px] sm:text-[32px] font-semibold text-theme-text-1 tracking-tight leading-[1.25] md:leading-tight flex-1 max-w-[600px]">
                {resource.title}
              </h1>
              {isDone && (
                <span className="px-3 py-1.5 bg-theme-surface-2 border border-theme-border-2 rounded-lg text-[13px] text-theme-text-2 flex-shrink-0 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} />
                  Completed {completedDate && `· ${completedDate}`}
                </span>
              )}
            </div>
            <p className="text-[15px] sm:text-[16px] text-theme-text-2 leading-[1.7] md:leading-[1.65] mb-5 md:mb-3">
              {resource.subtitle}
            </p>
            
            {/* Save state indicator */}
            {slug && isSaved('resource', slug) && (
              <Link
                to="/saved"
                className="inline-flex items-center gap-1.5 text-[13px] text-theme-text-3 hover:text-theme-text-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
              >
                <Bookmark className="w-3.5 h-3.5" />
                saved · view saved
              </Link>
            )}
          </div>

          {/* Inline metadata - single muted line */}
          <p className="text-[13px] md:text-[13px] text-theme-text-3">
            {resource.estimatedTime} · {resource.format} · {resource.lastUpdated}
          </p>
        </div>

        {/* QUICK START */}
        <div className="mb-12 md:mb-10">
          <h2 className="text-[13px] font-semibold text-theme-text-2 uppercase tracking-wide mb-3">Quick Start</h2>
          <div className="border-b border-theme-border-2 mb-5" />
          <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6 md:p-6">
            <div className="mb-8 md:mb-6">
              <h3 className="text-[15px] font-medium text-theme-text-1 mb-5 md:mb-4">
                In {resource.estimatedTime} you'll have
              </h3>
              <ul className="space-y-3 md:space-y-2.5">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] max-w-[520px]">
                    Clear understanding of {resource.title.toLowerCase()} requirements
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] max-w-[520px]">
                    Step-by-step verification framework for your specific situation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] max-w-[520px]">
                    Downloadable checklist to track completion and maintain records
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-t border-theme-border-2 pt-6 mb-8 md:mb-6">
              <h3 className="text-[15px] font-medium text-theme-text-1 mb-5 md:mb-4">
                Do this first
              </h3>
              <ol className="space-y-4 md:space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-theme-surface-2 text-[13px] font-medium text-theme-text-1 flex-shrink-0">
                    1
                  </span>
                  <span className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] pt-0.5 max-w-[520px]">
                    Download the {resource.format.split(' + ')[0]} to work through each section
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-theme-surface-2 text-[13px] font-medium text-theme-text-1 flex-shrink-0">
                    2
                  </span>
                  <span className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] pt-0.5 max-w-[520px]">
                    Review "3-minute version" below for key points and common mistakes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-theme-surface-2 text-[13px] font-medium text-theme-text-1 flex-shrink-0">
                    3
                  </span>
                  <span className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] pt-0.5 max-w-[520px]">
                    Work through detailed steps, using decision checkpoints to guide action
                  </span>
                </li>
              </ol>
            </div>

            {/* Primary action + secondary actions */}
            <div className="space-y-3 md:space-y-0 md:flex md:flex-wrap md:gap-3 border-t border-theme-border-2 pt-6">
              <button
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 md:py-2.5 rounded-xl bg-theme-accent text-white text-[15px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-surface-1"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
                {isDownloading ? 'Opening...' : 'Open resource'}
              </button>
              <div className="flex gap-2 md:contents">
                <SavedToggle
                  kind="resource"
                  slug={slug || ''}
                  title={resource.title}
                  meta={resource.category || 'Compliance'}
                  variant="button"
                  className="flex-1 md:flex-none px-5 py-3 md:py-2.5 rounded-xl text-[15px]"
                />
                <button 
                  onClick={handleMarkDone}
                  className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 md:py-2.5 rounded-xl border text-[15px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-surface-1 ${
                    isDone
                      ? 'bg-theme-surface-2 border-theme-border-2 text-theme-text-2'
                      : 'bg-theme-surface-1 border-theme-border-1 text-theme-text-2 hover:bg-theme-surface-2'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" strokeWidth={2} />
                  {isDone ? 'Done' : 'Mark done'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3-MINUTE VERSION */}
        <div className="mb-12 md:mb-10">
          <h2 className="text-[13px] font-semibold text-theme-text-2 uppercase tracking-wide mb-3">3-minute version</h2>
          <div className="border-b border-theme-border-2 mb-5" />
          <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6 md:p-6">
            {/* TL;DR */}
            <div className="mb-8 md:mb-6">
              <h3 className="text-[14px] font-medium text-theme-text-2 mb-4 md:mb-3 uppercase tracking-wide">TL;DR</h3>
              <ul className="space-y-3 md:space-y-2.5">
                {tldrBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-theme-accent mt-1 flex-shrink-0 text-[10px]">●</span>
                    <span className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] max-w-[520px]">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* If you do only 1 thing */}
            <div className="mb-8 md:mb-6 pb-6 border-b border-theme-border-2">
              <h3 className="text-[14px] font-medium text-theme-text-2 mb-3 uppercase tracking-wide">
                If you do only 1 thing
              </h3>
              <p className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] mb-4 md:mb-3 max-w-[520px]">
                {oneThingAction.text}
              </p>
              {oneThingAction.section && (
                <button
                  onClick={() => {
                    setSectionStates(prev => ({ ...prev, [oneThingAction.section]: true }));
                    // Scroll to section
                    setTimeout(() => {
                      const element = document.getElementById(`section-${oneThingAction.section}`);
                      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
                >
                  Start here
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Common mistakes */}
            <div>
              <h3 className="text-[14px] font-medium text-theme-text-2 mb-4 md:mb-3 uppercase tracking-wide">
                Common mistakes
              </h3>
              <ul className="space-y-3">
                {commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-theme-text-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] max-w-[520px]">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* REDUCES EXPOSURE IN */}
        <div className="mb-12 md:mb-10">
          <div className="bg-theme-surface-2 rounded-xl border border-theme-border-2 p-6 md:p-5">
            <h3 className="text-[14px] font-medium text-theme-text-2 mb-4 md:mb-3">
              This reduces exposure in
            </h3>
            <div className="flex flex-wrap gap-2 mb-5 md:mb-4">
              {exposureAreas.map((area) => (
                <span
                  key={area}
                  className="px-2.5 py-1 bg-theme-surface-1 border border-theme-border-1 rounded-md text-[12px] text-theme-text-2"
                >
                  {area}
                </span>
              ))}
            </div>
            <button className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded">
              See related risk drivers
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Overview - collapsed by default */}
        <div className="mb-12 md:mb-10">
          <h2 className="text-[13px] font-semibold text-theme-text-2 uppercase tracking-wide mb-3">Overview</h2>
          <div className="border-b border-theme-border-2 mb-5" />
          <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6 md:p-6">
            <p className="text-[15px] text-theme-text-2 leading-[1.7] md:leading-[1.65] max-w-[560px]">
              {showFullOverview || !hasMoreOverview ? resource.overview : overviewFirstParagraph}
            </p>
            {hasMoreOverview && !showFullOverview && (
              <button
                onClick={() => setShowFullOverview(true)}
                className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent hover:text-theme-accent-hover transition-colors mt-5 md:mt-4 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
              >
                Read more
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
            {hasMoreOverview && showFullOverview && (
              <button
                onClick={() => setShowFullOverview(false)}
                className="inline-flex items-center gap-1.5 text-[14px] text-theme-text-3 hover:text-theme-text-2 transition-colors mt-5 md:mt-4 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
              >
                Show less
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Sections with decision checkpoints */}
        <div className="mb-12 md:mb-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[13px] font-semibold text-theme-text-2 uppercase tracking-wide">Detailed steps</h2>
            <button
              onClick={handleExpandAll}
              className="inline-flex items-center gap-1.5 text-[13px] text-theme-text-3 hover:text-theme-text-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
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
          <div className="border-b border-theme-border-2 mb-5" />
          <div className="space-y-4 md:space-y-3">
            {resource.sections.map((section, index) => (
              <div key={section.id} id={`section-${section.id}`}>
                <CollapsibleSection
                  title={section.title}
                  summary={section.summary}
                  effort={section.effort}
                  defaultOpen={sectionStates[section.id] ?? false}
                  onToggle={(isOpen) => {
                    setSectionStates(prev => ({ ...prev, [section.id]: isOpen }));
                  }}
                >
                  {/* Decision checkpoint - removed legacy button */}
                  
                  <SectionContent section={section} />
                </CollapsibleSection>
              </div>
            ))}
          </div>
        </div>

        {/* Related resources */}
        {resource.relatedResources.length > 0 && (
          <div className="mb-12 md:mb-10">
            <h2 className="text-[13px] font-semibold text-theme-text-2 uppercase tracking-wide mb-3">Related resources</h2>
            <div className="border-b border-theme-border-2 mb-5" />
            <div className="space-y-3 md:space-y-2">
              {resource.relatedResources.slice(0, 3).map((related) => (
                <Link
                  key={related.slug}
                  to={`/resources/${related.slug}${fromResults ? '?from=results' : ''}`}
                  className="flex items-start md:items-center justify-between px-5 py-4 rounded-xl bg-theme-surface-1 border border-theme-border-1 hover:bg-theme-surface-2 hover:border-theme-border-2 transition-all group focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="text-[15px] font-medium text-theme-text-1 mb-1.5 md:mb-0.5 line-clamp-1">
                      {related.title}
                    </h3>
                    <p className="text-[13px] text-theme-text-3 leading-[1.65] line-clamp-2 md:line-clamp-1">{related.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-theme-text-3 group-hover:text-theme-text-2 transition-colors flex-shrink-0 mt-1 md:mt-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-5">
          <p className="text-[13px] text-theme-text-3 leading-[1.65]">
            Educational information only. Not legal advice. Consult with qualified legal counsel for guidance specific to your situation.
          </p>
        </div>
      </div>
    </div>
  );
}