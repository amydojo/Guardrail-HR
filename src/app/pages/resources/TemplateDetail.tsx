import { Link, useParams } from 'react-router';
import { ArrowLeft, Settings, CheckCircle, Plus, Upload, ChevronDown, ChevronUp, AlertCircle, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import { TEMPLATES_DATA } from '@/app/data/templatesData';
import { SavedToggle } from '@/app/components/saved/SavedToggle';
import { isSaved } from '@/app/saved/savedStorage';

export function TemplateDetail() {
  const { slug } = useParams();
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasProof, setHasProof] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showChangeLog, setShowChangeLog] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  // Get template data
  const template = slug ? TEMPLATES_DATA[slug] : null;

  // Load state from localStorage
  useEffect(() => {
    if (slug) {
      const proofState = localStorage.getItem(`template-proof-${slug}`);
      
      if (proofState === 'true') setHasProof(true);
    }
  }, [slug]);

  // 404 if template not found
  if (!template) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[32px] sm:text-[48px] font-semibold text-theme-text-1 mb-4 tracking-tight leading-tight">Template not found</h1>
          <p className="text-[15px] text-theme-text-3 mb-8">The template you're looking for doesn't exist.</p>
          <Link
            to="/resources?tab=templates"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-accent text-white text-[15px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to templates
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    setIsDownloading(true);
    // Mock download
    setTimeout(() => {
      setIsDownloading(false);
      showToastMessage('Download started');
    }, 800);
  };

  const handleUploadProof = () => {
    // Mock file upload
    const newState = !hasProof;
    setHasProof(newState);
    if (slug) {
      localStorage.setItem(`template-proof-${slug}`, String(newState));
    }
    showToastMessage(newState ? 'Proof uploaded' : 'Proof removed');
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }));
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
          to="/resources?tab=templates"
          className="inline-flex items-center gap-2 text-[13px] text-theme-text-3 hover:text-theme-text-2 mb-8 md:mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to templates
        </Link>

        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-[28px] sm:text-[32px] font-semibold text-theme-text-1 mb-4 md:mb-3 tracking-tight leading-[1.25] md:leading-tight max-w-[600px]">
            {template.title}
          </h1>
          <p className="text-[15px] sm:text-[16px] text-theme-text-2 leading-[1.7] md:leading-[1.65] mb-5 md:mb-3">
            {template.subtitle}
          </p>
          
          {/* Save state indicator */}
          {slug && isSaved('template', slug) && (
            <Link
              to="/saved"
              className="inline-flex items-center gap-1.5 text-[13px] text-theme-text-3 hover:text-theme-text-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded mb-6"
            >
              <Bookmark className="w-3.5 h-3.5" />
              saved · view saved
            </Link>
          )}
          {(!slug || !isSaved('template', slug)) && (
            <div className="mb-6" />
          )}

          {/* Metadata - single muted line on mobile */}
          <p className="text-[13px] text-theme-text-3 md:hidden">
            {template.jurisdiction} · {template.module} · {template.type} · Reviewed {template.reviewedDate} · v{template.version}
          </p>
          
          {/* Chips row - desktop only */}
          <div className="hidden md:flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-theme-surface-1 border border-theme-border-1 rounded-md text-[12px] text-theme-text-3">
              {template.jurisdiction}
            </span>
            <span className="px-2.5 py-1 bg-theme-surface-1 border border-theme-border-1 rounded-md text-[12px] text-theme-text-3">
              {template.module}
            </span>
            <span className="px-2.5 py-1 bg-theme-surface-1 border border-theme-border-1 rounded-md text-[12px] text-theme-text-3">
              {template.type}
            </span>
            <span className="px-2.5 py-1 bg-theme-surface-1 border border-theme-border-1 rounded-md text-[12px] text-theme-text-3">
              Reviewed {template.reviewedDate} · v{template.version}
            </span>
          </div>
        </div>

        {/* Hero Action Card */}
        <div className="mb-12 md:mb-10">
          <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6 md:p-6">
            {/* In ~10 min you'll have */}
            <div className="mb-8 md:mb-6">
              <h2 className="text-[15px] font-medium text-theme-text-1 mb-5 md:mb-4">
                In {template.estimatedTime} you'll have
              </h2>
              <ul className="space-y-3 md:space-y-2.5">
                {template.inTenMinutes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] max-w-[520px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customize these fields */}
            <div className="border-t border-theme-border-2 pt-6 mb-8 md:mb-6">
              <h3 className="text-[15px] font-medium text-theme-text-1 mb-5 md:mb-4">
                Customize these fields
              </h3>
              <ul className="space-y-3 md:space-y-2">
                {template.customizeFields.map((field, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-theme-accent mt-1 flex-shrink-0 text-[10px]">●</span>
                    <span className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] max-w-[520px]">{field}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions - Primary + Secondary */}
            <div className="space-y-3 md:space-y-0 md:flex md:flex-wrap md:gap-3 border-t border-theme-border-2 pt-6">
              <Link
                to={`/resources/templates/${slug}/customize`}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 md:py-2.5 rounded-xl bg-theme-accent text-white text-[15px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-surface-1"
              >
                <Settings className="w-4 h-4" />
                Customize & generate
              </Link>
              <div className="flex gap-2 md:contents">
                <SavedToggle
                  kind="template"
                  slug={slug || ''}
                  title={template.title}
                  meta={template.jurisdiction}
                  variant="button"
                  className="flex-1 md:flex-none px-5 py-3 md:py-2.5 rounded-xl text-[15px]"
                />
                <button 
                  onClick={handleUploadProof}
                  className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 md:py-2.5 rounded-xl border text-[15px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-surface-1 ${
                    hasProof
                      ? 'bg-theme-surface-2 border-theme-border-1 text-theme-text-1'
                      : 'bg-theme-surface-1 border-theme-border-1 text-theme-text-2 hover:bg-theme-surface-2'
                  }`}
                >
                  <Upload className="w-4 h-4" strokeWidth={2} />
                  <span className="hidden md:inline">{hasProof ? 'Proof uploaded' : 'Upload proof'}</span>
                  <span className="md:hidden">{hasProof ? 'Uploaded' : 'Upload'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3-minute version */}
        <div className="mb-12 md:mb-10">
          <h2 className="text-[13px] font-semibold text-theme-text-2 uppercase tracking-wide mb-3">3-minute version</h2>
          <div className="border-b border-theme-border-2 mb-5" />
          <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6 md:p-6">
            <div className="space-y-6 md:space-y-4">
              <div>
                <h3 className="text-[14px] font-medium text-theme-text-2 mb-3 md:mb-2 uppercase tracking-wide">What this is</h3>
                <p className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] max-w-[560px]">
                  {template.type} template for {template.module.toLowerCase()} compliance in {template.jurisdiction}. 
                  Attorney-reviewed as of {template.reviewedDate}. Customize fields marked in brackets, then implement following the steps below.
                </p>
              </div>
              <div>
                <h3 className="text-[14px] font-medium text-theme-text-2 mb-3 md:mb-2 uppercase tracking-wide">Why you need it</h3>
                <p className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] max-w-[560px]">
                  This template provides standardized language covering legal requirements. Using reviewed templates 
                  reduces risk compared to creating documents from scratch or using outdated samples.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation steps - collapsible */}
        <div className="mb-12 md:mb-10">
          <h2 className="text-[13px] font-semibold text-theme-text-2 uppercase tracking-wide mb-3">
            Implementation steps
          </h2>
          <div className="border-b border-theme-border-2 mb-5" />
          <div className="space-y-4 md:space-y-3">
            {template.implementationSteps.map((step) => (
              <div key={step.id} className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 overflow-hidden">
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full px-6 md:px-5 py-5 md:py-4 flex items-start justify-between text-left hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="text-[15px] font-medium text-theme-text-1 mb-2 md:mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-theme-text-3 leading-[1.7] md:leading-[1.65]">{step.summary}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-theme-text-3 flex-shrink-0 transition-transform duration-200 ${
                      expandedSteps[step.id] ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    expandedSteps[step.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 md:px-5 pb-5 pt-2 border-t border-theme-border-2">
                    <p className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] max-w-[540px]">{step.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ask counsel if */}
        <div className="mb-12 md:mb-10">
          <div className="bg-theme-surface-2 rounded-xl border border-theme-border-2 p-6 md:p-5">
            <h3 className="text-[14px] font-medium text-theme-text-2 mb-4 md:mb-3 uppercase tracking-wide">
              Ask counsel if
            </h3>
            <ul className="space-y-3 md:space-y-2.5">
              {template.askCounselIf.map((trigger, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-theme-text-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-theme-text-2 leading-[1.7] md:leading-[1.65] max-w-[520px]">{trigger}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Change log - collapsed by default */}
        <div className="mb-12 md:mb-10">
          <button
            onClick={() => setShowChangeLog(!showChangeLog)}
            className="w-full flex items-center justify-between px-6 md:px-5 py-5 md:py-4 bg-theme-surface-2 rounded-xl border border-theme-border-2 hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
          >
            <h3 className="text-[15px] font-medium text-theme-text-2">Change log</h3>
            <ChevronDown
              className={`w-4 h-4 text-theme-text-3 transition-transform duration-200 ${
                showChangeLog ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {showChangeLog && (
            <div className="mt-3 bg-theme-surface-1 rounded-xl border border-theme-border-1 p-6 md:p-5">
              <div className="space-y-5 md:space-y-4">
                {template.changeLog.map((log) => (
                  <div key={log.version}>
                    <div className="flex items-center gap-2 mb-3 md:mb-2">
                      <span className="text-[14px] font-medium text-theme-text-1">v{log.version}</span>
                      <span className="text-[13px] text-theme-text-3">· {log.date}</span>
                    </div>
                    <ul className="space-y-2 md:space-y-1.5">
                      {log.changes.map((change, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-theme-text-3 mt-1.5 flex-shrink-0 text-[8px]">●</span>
                          <span className="text-[13px] text-theme-text-3 leading-[1.65]">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related resources */}
        {template.relatedResources.length > 0 && (
          <div className="mb-12 md:mb-10">
            <h2 className="text-[13px] font-semibold text-theme-text-2 uppercase tracking-wide mb-3">Related resources</h2>
            <div className="border-b border-theme-border-2 mb-5" />
            <div className="space-y-3 md:space-y-2">
              {template.relatedResources.map((related) => (
                <Link
                  key={related.slug}
                  to={`/resources/${related.slug}`}
                  className="flex items-start md:items-center justify-between px-5 py-4 rounded-xl bg-theme-surface-1 border border-theme-border-1 hover:bg-theme-surface-2 hover:border-theme-border-2 transition-all group focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="text-[15px] font-medium text-theme-text-1 mb-1.5 md:mb-0.5 line-clamp-1">
                      {related.title}
                    </h3>
                    <p className="text-[13px] text-theme-text-3 leading-[1.65] line-clamp-2 md:line-clamp-1">{related.description}</p>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-theme-text-3 group-hover:text-theme-text-2 transition-colors flex-shrink-0 mt-1 md:mt-0 rotate-180" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-5">
          <p className="text-[13px] text-theme-text-3 leading-[1.65]">
            Educational tools — not legal advice. Templates provide standardized language but do not guarantee compliance. 
            Consult with qualified legal counsel before implementing policies or making employment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}