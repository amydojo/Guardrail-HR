import { X, ZoomIn, ZoomOut, Maximize2, Check, ChevronDown, Download, Plus, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Template } from '@/app/data/templatesData';
import { motion, AnimatePresence } from 'motion/react';
import { PrimaryAction } from '@/app/components/PrimaryAction';

// ============================================================================
// TEMPLATE PREVIEW MODAL — PREMIUM DOCUMENT PREVIEW
// ============================================================================
// Purpose: High-fidelity template preview with versioning and trust signals
// Design: Apple/Linear-grade modal with two-column layout
// 
// Left column: Document preview with zoom controls
// Right column: Details, recommendations, compatibility, version history
// Bottom: Sticky action bar with download/save
// ============================================================================

interface TemplatePreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (templateSlug: string) => void;
  onAddToPlan?: (templateSlug: string) => void;
  isInPlan?: boolean;
}

export function TemplatePreviewModal({
  template,
  isOpen,
  onClose,
  onDownload,
  onAddToPlan,
  isInPlan = false,
}: TemplatePreviewModalProps) {
  const [zoomLevel, setZoomLevel] = useState<'fit' | 'in' | 'out'>('fit');
  const [currentPage, setCurrentPage] = useState(1);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setZoomLevel('fit');
      setCurrentPage(1);
      setVersionHistoryOpen(false);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!template) return null;

  const totalPages = 3; // Mock page count

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[1040px] max-h-[90vh] bg-theme-surface-1 rounded-2xl border border-theme-border-1 shadow-theme-2 overflow-hidden flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="flex-shrink-0 px-8 pt-8 pb-6 border-b border-theme-border-2">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    {/* Template name */}
                    <h2 className="text-[24px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-2">
                      {template.title}
                    </h2>
                    
                    {/* Quiet meta line */}
                    <p className="text-[13px] text-theme-text-3">
                      Reviewed {template.reviewedDate} • v{template.version} • {template.jurisdiction}
                    </p>
                  </div>

                  {/* Status chips + close button */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                      {template.jurisdiction}
                    </span>
                    <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                      {template.module}
                    </span>
                    <button
                      onClick={onClose}
                      className="ml-2 p-2 rounded-lg text-theme-text-3 hover:text-theme-text-1 hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Two-column content */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 p-8">
                  {/* LEFT COLUMN: Document Preview */}
                  <div className="space-y-6">
                    {/* Preview Area */}
                    <DocumentPreviewFrame
                      templateTitle={template.title}
                      zoomLevel={zoomLevel}
                      onZoomIn={() => setZoomLevel('in')}
                      onZoomOut={() => setZoomLevel('out')}
                      onZoomFit={() => setZoomLevel('fit')}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />

                    {/* What this template covers */}
                    <div>
                      <h3 className="text-[13px] font-medium text-theme-text-2 mb-3 uppercase tracking-wider">
                        What this template covers
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {template.inTenMinutes.slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-theme-surface-2 border border-theme-border-2 rounded-lg text-[13px] text-theme-text-2"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Details + Actions */}
                  <div className="space-y-6">
                    {/* 1. Recommended for */}
                    <div className="bg-theme-surface-2 rounded-xl p-6 border border-theme-border-2">
                      <h3 className="text-[13px] font-medium text-theme-text-1 mb-3 tracking-tight">
                        Recommended for
                      </h3>
                      <p className="text-[14px] text-theme-text-2 leading-[1.65] mb-4">
                        Best for employers with gaps in break policy documentation and enforcement tracking.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                          Break documentation
                        </span>
                        <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                          Timekeeping policy
                        </span>
                      </div>
                      <p className="text-[11px] text-theme-text-3 leading-[1.7]">
                        Personalized recommendations improve after your scan
                      </p>
                    </div>

                    {/* 2. What you'll customize */}
                    <div className="bg-theme-surface-2 rounded-xl p-6 border border-theme-border-2">
                      <h3 className="text-[13px] font-medium text-theme-text-1 mb-4 tracking-tight">
                        What you'll customize
                      </h3>
                      <div className="space-y-3">
                        {template.customizeFields.map((field, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" strokeWidth={2} />
                            <span className="text-[13px] text-theme-text-2 leading-[1.6]">
                              {field}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Compatibility */}
                    <div className="bg-theme-surface-2 rounded-xl p-6 border border-theme-border-2">
                      <h3 className="text-[13px] font-medium text-theme-text-1 mb-4 tracking-tight">
                        Compatibility
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                          PDF
                        </span>
                        <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                          DOCX
                        </span>
                        <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                          Google Docs
                        </span>
                      </div>
                      <p className="text-[12px] text-theme-text-3 leading-[1.7]">
                        Works with payroll provider review • attorney review
                      </p>
                    </div>

                    {/* 4. Version history (accordion) */}
                    <div className="bg-theme-surface-2 rounded-xl border border-theme-border-2 overflow-hidden">
                      <button
                        onClick={() => setVersionHistoryOpen(!versionHistoryOpen)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-inset"
                      >
                        <h3 className="text-[13px] font-medium text-theme-text-1 tracking-tight">
                          Version history
                        </h3>
                        <ChevronDown
                          className={`w-4 h-4 text-theme-text-3 transition-transform duration-200 ${
                            versionHistoryOpen ? 'rotate-180' : ''
                          }`}
                          strokeWidth={2}
                        />
                      </button>

                      {versionHistoryOpen && (
                        <div className="px-6 pb-6 space-y-4 border-t border-theme-border-2 pt-4">
                          {template.changeLog.map((entry, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-[13px] font-medium text-theme-text-1">
                                  v{entry.version}
                                </span>
                                <span className="text-[11px] text-theme-text-3">
                                  {entry.date}
                                </span>
                              </div>
                              <ul className="space-y-1 pl-4">
                                {entry.changes.map((change, changeIdx) => (
                                  <li
                                    key={changeIdx}
                                    className="text-[12px] text-theme-text-3 leading-[1.7] list-disc"
                                  >
                                    {change}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Action Bar */}
              <StickyModalActionBar
                onDownload={() => onDownload?.(template.slug)}
                onAddToPlan={() => onAddToPlan?.(template.slug)}
                isInPlan={isInPlan}
                templateSlug={template.slug}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// DOCUMENT PREVIEW FRAME
// ============================================================================

interface DocumentPreviewFrameProps {
  templateTitle: string;
  zoomLevel: 'fit' | 'in' | 'out';
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomFit: () => void;
  currentPage: number;
  totalPages: number;
}

function DocumentPreviewFrame({
  templateTitle,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onZoomFit,
  currentPage,
  totalPages,
}: DocumentPreviewFrameProps) {
  const getZoomScale = () => {
    switch (zoomLevel) {
      case 'in': return 'scale-110';
      case 'out': return 'scale-90';
      case 'fit':
      default: return 'scale-100';
    }
  };

  return (
    <div className="space-y-4">
      {/* Preview container with pages */}
      <div className="relative bg-theme-surface-2 rounded-xl p-8 border border-theme-border-2 overflow-hidden">
        {/* Page stack with depth effect */}
        <div className="relative mx-auto" style={{ maxWidth: '600px' }}>
          {/* Second page (behind) */}
          <div className="absolute top-3 left-3 right-[-12px] h-full bg-white rounded-lg shadow-theme-1 opacity-40 pointer-events-none" />
          
          {/* First page (front) */}
          <div
            className={`relative bg-white rounded-lg shadow-theme-2 border border-gray-200 p-8 transition-transform duration-300 ${getZoomScale()}`}
          >
            {/* Document header */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                  Guardrail HR
                </div>
                <div className="text-[10px] text-gray-400">
                  v2.1 • January 2026
                </div>
              </div>
              <h1 className="text-[18px] font-semibold text-gray-900 tracking-tight leading-tight">
                {templateTitle}
              </h1>
            </div>

            {/* Document content - placeholder lines */}
            <div className="space-y-6">
              {/* Section 1 */}
              <div>
                <div className="h-3 bg-gray-900 rounded w-[140px] mb-3" />
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-full" />
                  <div className="h-2 bg-gray-200 rounded w-full" />
                  <div className="h-2 bg-gray-200 rounded w-[85%]" />
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <div className="h-3 bg-gray-900 rounded w-[180px] mb-3" />
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-full" />
                  <div className="h-2 bg-gray-200 rounded w-full" />
                  <div className="h-2 bg-gray-200 rounded w-[92%]" />
                  <div className="h-2 bg-gray-200 rounded w-full" />
                  <div className="h-2 bg-gray-200 rounded w-[78%]" />
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <div className="h-3 bg-gray-900 rounded w-[160px] mb-3" />
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-full" />
                  <div className="h-2 bg-gray-200 rounded w-full" />
                  <div className="h-2 bg-gray-200 rounded w-[88%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between">
        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onZoomOut}
            disabled={zoomLevel === 'out'}
            className="p-2 rounded-lg border border-theme-border-1 bg-theme-surface-1 text-theme-text-2 hover:text-theme-text-1 hover:bg-theme-surface-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" strokeWidth={2} />
          </button>
          <button
            onClick={onZoomFit}
            className="p-2 rounded-lg border border-theme-border-1 bg-theme-surface-1 text-theme-text-2 hover:text-theme-text-1 hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
            aria-label="Fit to view"
          >
            <Maximize2 className="w-4 h-4" strokeWidth={2} />
          </button>
          <button
            onClick={onZoomIn}
            disabled={zoomLevel === 'in'}
            className="p-2 rounded-lg border border-theme-border-1 bg-theme-surface-1 text-theme-text-2 hover:text-theme-text-1 hover:bg-theme-surface-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        {/* Page indicator */}
        <span className="text-[12px] text-theme-text-3">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// STICKY MODAL ACTION BAR
// ============================================================================

interface StickyModalActionBarProps {
  onDownload: () => void;
  onAddToPlan: () => void;
  isInPlan: boolean;
  templateSlug: string;
}

function StickyModalActionBar({
  onDownload,
  onAddToPlan,
  isInPlan,
  templateSlug,
}: StickyModalActionBarProps) {
  return (
    <div className="flex-shrink-0 border-t border-theme-border-2 bg-theme-surface-1">
      <div className="px-8 py-6">
        {/* Actions row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
          {/* Primary: Download */}
          <button
            onClick={onDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-theme-accent text-white text-[15px] font-medium hover:bg-theme-accent-hover transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-surface-1 shadow-theme-2"
          >
            <Download className="w-4 h-4" strokeWidth={2} />
            Download template
          </button>

          {/* Secondary: save */}
          <button
            onClick={onAddToPlan}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-theme-border-1 bg-theme-surface-2 text-[15px] font-medium text-theme-text-1 hover:bg-theme-surface-2 hover:border-theme-border-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-surface-1"
          >
            {isInPlan ? (
              <>
                <Check className="w-4 h-4" strokeWidth={2} />
                saved
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" strokeWidth={2} />
                save
              </>
            )}
          </button>

          {/* Tertiary: View in Resources (optional) */}
          <a
            href={`/resources/templates/${templateSlug}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-3.5 text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded-lg"
          >
            View in Resources
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
          </a>
        </div>

        {/* Confidence line */}
        <p className="text-[11px] text-theme-text-3 text-center leading-[1.7] tracking-[0.01em]">
          Templates are maintained and versioned. Not legal advice.
        </p>
      </div>
    </div>
  );
}