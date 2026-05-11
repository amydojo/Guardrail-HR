/**
 * Template Preview Modal V2 — Production Ready
 * 
 * Features:
 * - Full accessibility (focus trap, ARIA, keyboard shortcuts)
 * - Token-only colors (no hardcoded hex)
 * - Responsive (2-col desktop, bottom-sheet mobile)
 * - Toast notifications
 * - White paper preview in both themes
 * - Zoom + page navigation
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  X,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  ChevronUp,
  Check,
  Plus,
  ExternalLink,
  Settings,
  ArrowLeft,
  Calendar,
  Edit3,
  FileText,
  Shield,
  CheckCircle,
} from 'lucide-react';
import { Template } from '@/app/data/templatesData';
import { Link } from 'react-router';
import { SaveButton } from '@/app/components/SaveButton';

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Prevents body scroll while modal is open
 */
function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isLocked]);
}

/**
 * Traps focus within an element
 */
function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive, containerRef]);
}

/**
 * Restores focus to the element that opened the modal
 */
function useRestoreFocus(isOpen: boolean) {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [isOpen]);
}

// ============================================================================
// TOAST COMPONENT
// ============================================================================

interface ToastProps {
  message: string;
  icon?: React.ReactNode;
}

function Toast({ message, icon }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="fixed top-6 right-6 z-[60] pointer-events-none"
    >
      <div className="bg-theme-surface-1 border border-theme-border-1 rounded-xl px-5 py-3 shadow-theme-2 flex items-center gap-2">
        {icon}
        <p className="text-[14px] text-theme-text-1 font-medium">{message}</p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN MODAL COMPONENT
// ============================================================================

interface TemplatePreviewModalV2Props {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (templateSlug: string) => void;
  onAddToPlan?: (templateSlug: string) => void;
  isInPlan?: boolean;
  onTogglePlan?: (templateSlug: string) => void;
}

export function TemplatePreviewModalV2({
  template,
  isOpen,
  onClose,
  onDownload,
  onAddToPlan,
  isInPlan: externalIsInPlan,
  onTogglePlan,
}: TemplatePreviewModalV2Props) {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [toast, setToast] = useState<{ message: string; icon?: React.ReactNode } | null>(null);
  const [internalPlanState, setInternalPlanState] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);

  // Determine saved state (external or internal)
  const isInPlan = externalIsInPlan ?? internalPlanState;

  // Custom hooks
  useBodyScrollLock(isOpen);
  useFocusTrap(isOpen, modalRef);
  useRestoreFocus(isOpen);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(100);
      setCurrentPage(1);
      setVersionHistoryOpen(false);
      setDetailsExpanded(false);
    }
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Arrow keys for page navigation
      if (e.key === 'ArrowLeft') {
        setCurrentPage((p) => Math.max(p - 1, 1));
        return;
      }
      if (e.key === 'ArrowRight') {
        const totalPages = 3; // Mock: would come from template data
        setCurrentPage((p) => Math.min(p + 1, totalPages));
        return;
      }

      // +/- for zoom (also Cmd/Ctrl + +/-)
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoomLevel((z) => Math.min(z + 10, 150));
        return;
      }
      if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setZoomLevel((z) => Math.max(z - 10, 75));
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!template) return null;

  const totalPages = 3; // Mock: would come from template data

  const showToast = (message: string, icon?: React.ReactNode) => {
    setToast({ message, icon });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownload = () => {
    onDownload?.(template.slug);
    showToast('Downloaded', <CheckCircle className="w-4 h-4 text-theme-accent" />);
    // Modal stays open
  };

  const handleAddToPlan = () => {
    if (onTogglePlan) {
      onTogglePlan(template.slug);
    } else {
      setInternalPlanState(!isInPlan);
    }
    onAddToPlan?.(template.slug);
    if (!isInPlan) {
      showToast('saved', <Check className="w-4 h-4 text-theme-accent" />);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Toast */}
          <AnimatePresence>
            {toast && <Toast message={toast.message} icon={toast.icon} />}
          </AnimatePresence>

          {/* Modal */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-0 lg:p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label={`Preview: ${template.title}`}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full h-full lg:h-auto lg:max-w-[1040px] lg:max-h-[86vh] bg-theme-surface-1 border-0 lg:border lg:border-theme-border-1 lg:rounded-2xl shadow-theme-2 overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <Header template={template} onClose={onClose} />

              {/* Body: Responsive Layout */}
              <div className="flex-1 overflow-y-auto">
                {/* Desktop: Two-Column */}
                <div className="hidden lg:grid grid-cols-12 gap-6 p-6 min-h-full">
                  {/* Left Column: Document Preview (65%) */}
                  <div className="col-span-7">
                    <DocumentPreviewFrame
                      template={template}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      zoomLevel={zoomLevel}
                      onZoomIn={() => setZoomLevel((z) => Math.min(z + 10, 150))}
                      onZoomOut={() => setZoomLevel((z) => Math.max(z - 10, 75))}
                      onPageChange={setCurrentPage}
                    />
                  </div>

                  {/* Right Column: Details (35%) */}
                  <div className="col-span-5">
                    <DetailsColumn template={template} versionHistoryOpen={versionHistoryOpen} setVersionHistoryOpen={setVersionHistoryOpen} />
                  </div>
                </div>

                {/* Mobile: Single Column Bottom Sheet */}
                <div className="lg:hidden flex flex-col">
                  {/* Preview First */}
                  <div className="p-4">
                    <DocumentPreviewFrame
                      template={template}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      zoomLevel={zoomLevel}
                      onZoomIn={() => setZoomLevel((z) => Math.min(z + 10, 150))}
                      onZoomOut={() => setZoomLevel((z) => Math.max(z - 10, 75))}
                      onPageChange={setCurrentPage}
                    />
                  </div>

                  {/* Details Accordion */}
                  <div className="border-t border-theme-border-1 bg-theme-surface-1">
                    <button
                      onClick={() => setDetailsExpanded(!detailsExpanded)}
                      className="w-full px-4 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-theme-focus/40"
                    >
                      <span className="text-[15px] font-semibold text-theme-text-1">Template details</span>
                      {detailsExpanded ? (
                        <ChevronUp className="w-5 h-5 text-theme-text-3" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-theme-text-3" />
                      )}
                    </button>
                    <AnimatePresence>
                      {detailsExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 pb-4"
                        >
                          <DetailsColumn template={template} versionHistoryOpen={versionHistoryOpen} setVersionHistoryOpen={setVersionHistoryOpen} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Sticky Action Bar */}
              <ActionBar
                template={template}
                isInPlan={isInPlan}
                onDownload={handleDownload}
                onAddToPlan={handleAddToPlan}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// HEADER COMPONENT
// ============================================================================

interface HeaderProps {
  template: Template;
  onClose: () => void;
}

function Header({ template, onClose }: HeaderProps) {
  return (
    <div className="flex-shrink-0 border-b border-theme-border-1 bg-theme-surface-1/80 backdrop-blur-xl">
      <div className="px-4 lg:px-6 py-4">
        {/* Back to templates link */}
        <Link
          to="/resources?tab=templates"
          className="inline-flex items-center gap-1.5 text-[12px] text-theme-text-3 hover:text-theme-text-2 mb-3 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to templates
        </Link>

        <div className="flex items-start justify-between gap-4 mb-3">
          {/* Left: Title */}
          <div className="flex-1 min-w-0">
            <h2 className="text-[18px] lg:text-[20px] font-semibold text-theme-text-1 tracking-tight leading-tight">
              {template.title}
            </h2>
          </div>

          {/* Right: Meta + Close */}
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden sm:block text-right">
              <div className="text-[11px] lg:text-[12px] text-theme-text-3 font-mono">
                {template.slug.toUpperCase().replace(/-/g, '-')} • v{template.version}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-theme-text-3 hover:text-theme-text-1 hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chips Row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[11px] lg:text-[12px] font-medium text-theme-text-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {template.jurisdiction}
          </span>
          <span className="px-2.5 py-1 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[11px] lg:text-[12px] font-medium text-theme-text-2">
            {template.module}
          </span>
          <span className="px-2.5 py-1 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[11px] lg:text-[12px] font-medium text-theme-text-2">
            {template.type}
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// DETAILS COLUMN COMPONENT
// ============================================================================

interface DetailsColumnProps {
  template: Template;
  versionHistoryOpen: boolean;
  setVersionHistoryOpen: (open: boolean) => void;
}

function DetailsColumn({ template, versionHistoryOpen, setVersionHistoryOpen }: DetailsColumnProps) {
  return (
    <div className="space-y-4">
      {/* In 10 minutes */}
      <DetailCard title="In 10 minutes" icon={<Calendar className="w-4 h-4" />}>
        <ul className="space-y-2">
          {template.inTenMinutes.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-[13px] text-theme-text-2 leading-relaxed">
              <Check className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </DetailCard>

      {/* What You'll Customize */}
      <DetailCard title="What you'll customize" icon={<Edit3 className="w-4 h-4" />}>
        <ul className="space-y-2">
          {template.customizeFields.map((field, index) => (
            <li key={index} className="flex items-start gap-2 text-[13px] text-theme-text-2 leading-relaxed">
              <span className="text-theme-text-3">•</span>
              <span>{field}</span>
            </li>
          ))}
        </ul>
      </DetailCard>

      {/* Compatibility */}
      <DetailCard title="Format compatibility" icon={<FileText className="w-4 h-4" />}>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-theme-text-2">Microsoft Word</span>
            <Check className="w-4 h-4 text-theme-accent" />
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-theme-text-2">Google Docs</span>
            <Check className="w-4 h-4 text-theme-accent" />
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-theme-text-2">PDF (read-only)</span>
            <Check className="w-4 h-4 text-theme-accent" />
          </div>
        </div>
      </DetailCard>

      {/* Version History Accordion */}
      <VersionHistoryAccordion
        template={template}
        isOpen={versionHistoryOpen}
        onToggle={() => setVersionHistoryOpen(!versionHistoryOpen)}
      />
    </div>
  );
}

// ============================================================================
// ACTION BAR COMPONENT
// ============================================================================

interface ActionBarProps {
  template: Template;
  isInPlan: boolean;
  onDownload: () => void;
  onAddToPlan: () => void;
}

function ActionBar({ template, isInPlan, onDownload, onAddToPlan }: ActionBarProps) {
  return (
    <div className="flex-shrink-0 border-t border-theme-border-1 bg-theme-surface-1/95 backdrop-blur-xl">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Left: Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            {/* Primary action */}
            <Link
              to={`/resources/templates/${template.slug}/customize`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-theme-accent text-white rounded-lg text-[14px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 whitespace-nowrap"
            >
              <Settings className="w-4 h-4" />
              Customize
            </Link>

            {/* Secondary actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onDownload}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-theme-surface-1 border border-theme-border-1 text-theme-text-1 rounded-lg text-[14px] font-medium hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
                <span className="sm:hidden">Download blank</span>
              </button>
              
              <SaveButton
                type="template"
                slug={template.slug}
                title={template.title}
                category={template.module}
                version={template.version}
                variant="compact"
              />
            </div>

            {/* Tertiary link */}
            <Link
              to={`/resources/templates/${template.slug}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-[13px] text-theme-text-3 hover:text-theme-accent transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded px-2 ml-auto"
            >
              Details
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Right: Confidence Line */}
          <div className="hidden lg:block text-[12px] text-theme-text-3 text-right whitespace-nowrap">
            Templates are maintained and versioned. Not legal advice.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// DETAIL CARD COMPONENT
// ============================================================================

interface DetailCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function DetailCard({ title, icon, children }: DetailCardProps) {
  return (
    <div className="bg-theme-surface-1 border border-theme-border-1 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-theme-text-3">{icon}</div>
        <h3 className="text-[14px] font-semibold text-theme-text-1">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ============================================================================
// VERSION HISTORY ACCORDION COMPONENT
// ============================================================================

interface VersionHistoryAccordionProps {
  template: Template;
  isOpen: boolean;
  onToggle: () => void;
}

function VersionHistoryAccordion({ template, isOpen, onToggle }: VersionHistoryAccordionProps) {
  return (
    <div className="bg-theme-surface-1 border border-theme-border-1 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-theme-focus/40"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-theme-text-3" />
            <span className="text-[14px] font-semibold text-theme-text-1">Version history</span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-theme-text-3" />
          ) : (
            <ChevronDown className="w-4 h-4 text-theme-text-3" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-t border-theme-border-2"
          >
            <div className="p-4 space-y-4">
              {template.changeLog.map((version, index) => (
                <div key={version.version} className={index > 0 ? 'pt-4 border-t border-theme-border-2' : ''}>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-[13px] font-semibold text-theme-text-1">v{version.version}</span>
                    <span className="text-[12px] text-theme-text-3">{version.date}</span>
                  </div>
                  <ul className="space-y-1">
                    {version.changes.map((change, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12px] text-theme-text-2 leading-relaxed">
                        <span className="text-theme-text-3">•</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// DOCUMENT PREVIEW FRAME COMPONENT
// ============================================================================

interface DocumentPreviewFrameProps {
  template: Template;
  currentPage: number;
  totalPages: number;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPageChange: (page: number) => void;
}

function DocumentPreviewFrame({
  template,
  currentPage,
  totalPages,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onPageChange,
}: DocumentPreviewFrameProps) {
  // Paper palette CSS variables - document stays white in both themes
  const paperStyle = {
    '--paper-bg': '255 255 255',
    '--paper-border': '228 228 231',
    '--paper-text': '17 24 39',
    '--paper-muted': '107 114 128',
  } as React.CSSProperties;

  return (
    <div className="lg:sticky lg:top-0">
      {/* Zoom Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onZoomOut}
            disabled={zoomLevel <= 75}
            className="p-2 rounded-lg border border-theme-border-1 bg-theme-surface-1 text-theme-text-1 hover:bg-theme-surface-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[13px] text-theme-text-2 font-medium min-w-[60px] text-center">
            {zoomLevel}%
          </span>
          <button
            onClick={onZoomIn}
            disabled={zoomLevel >= 150}
            className="p-2 rounded-lg border border-theme-border-1 bg-theme-surface-1 text-theme-text-1 hover:bg-theme-surface-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <div className="text-[13px] text-theme-text-3">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Document Paper Frame */}
      <div className="bg-theme-surface-2 rounded-xl p-4 lg:p-6 border border-theme-border-2/60">
        <div
          className="mx-auto shadow-theme-2 rounded-lg overflow-hidden transition-transform"
          style={{
            ...paperStyle,
            width: `${zoomLevel}%`,
            aspectRatio: '8.5 / 11',
            maxWidth: '100%',
            backgroundColor: 'rgb(var(--paper-bg))',
          }}
        >
          {/* Document Header */}
          <div
            className="flex items-center justify-between px-4 lg:px-6 py-3"
            style={{
              borderBottom: '1px solid rgb(var(--paper-border))',
            }}
          >
            <span className="text-[9pt]" style={{ color: 'rgb(var(--paper-muted))' }}>
              Guardrail HR
            </span>
            <span className="text-[9pt]" style={{ color: 'rgb(var(--paper-muted))' }}>
              {template.slug.toUpperCase().replace(/-/g, '-')} • v{template.version}
            </span>
          </div>

          {/* Document Content Preview */}
          <div className="px-8 lg:px-12 py-12 lg:py-16 min-h-[400px]">
            <h1
              className="text-[20pt] lg:text-[24pt] font-semibold tracking-tight leading-tight mb-6 text-center"
              style={{ color: 'rgb(var(--paper-text))' }}
            >
              {template.title}
            </h1>
            <div className="space-y-4">
              <p className="text-[10.5pt] lg:text-[11.5pt] leading-relaxed" style={{ color: 'rgb(var(--paper-text))' }}>
                {template.subtitle}
              </p>
              <div
                className="rounded p-4 my-4"
                style={{
                  backgroundColor: 'rgb(var(--accent-primary) / 0.08)',
                  borderLeft: '3px solid rgb(var(--accent-primary))',
                }}
              >
                <p className="text-[10pt] font-semibold mb-1" style={{ color: 'rgb(var(--paper-text))' }}>
                  Important
                </p>
                <p className="text-[10pt] leading-relaxed" style={{ color: 'rgb(var(--paper-text))' }}>
                  This template has been reviewed and updated for {template.reviewedDate} requirements.
                </p>
              </div>
              <p className="text-[10.5pt] lg:text-[11.5pt] leading-relaxed" style={{ color: 'rgb(var(--paper-text))' }}>
                This document provides comprehensive guidance on {template.module.toLowerCase()} compliance for{' '}
                {template.jurisdiction} jurisdictions.
              </p>
            </div>
          </div>

          {/* Document Footer */}
          <div
            className="flex items-center justify-between px-4 lg:px-6 py-2.5"
            style={{
              borderTop: '1px solid rgb(var(--paper-border))',
            }}
          >
            <span className="text-[9pt]" style={{ color: 'rgb(var(--paper-muted))' }}>
              Reviewed {template.reviewedDate}
            </span>
            <span className="text-[9pt]" style={{ color: 'rgb(var(--paper-muted))' }}>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        {/* Page Navigation */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
                  page === currentPage ? 'bg-theme-accent w-6' : 'bg-theme-border-2 hover:bg-theme-border-1'
                }`}
                aria-label={`Go to page ${page}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}