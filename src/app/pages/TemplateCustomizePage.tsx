/**
 * Template Customize Page
 * Premium customize & generate experience for templates
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import {
  ArrowLeft,
  Save,
  RotateCcw,
  FileCheck,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getTemplate,
  validateRequiredFields,
  getAllFields,
} from '@/app/templates/templateRegistry';
import { saveDraft, loadDraft, hasDraft } from '@/app/templates/templateStorage';
import { TemplatePreviewWrapper } from '@/app/templates/TemplatePreviewWrapper';
import { FieldsPanel } from '@/app/components/templates/FieldsPanel';
import { GenerateSheet } from '@/app/components/templates/GenerateSheet';

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
// MAIN COMPONENT
// ============================================================================

export function TemplateCustomizePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Get template from registry
  const templateEntry = slug ? getTemplate(slug) : undefined;

  // State
  const [values, setValues] = useState<Record<string, string>>({});
  const [scrollToField, setScrollToField] = useState<string | null>(null);
  const [generateSheetOpen, setGenerateSheetOpen] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [mobilePreviewExpanded, setMobilePreviewExpanded] = useState(false);
  const [mobileFieldsExpanded, setMobileFieldsExpanded] = useState(true);

  // Load draft on mount
  useEffect(() => {
    if (templateEntry) {
      const draft = loadDraft(slug!, templateEntry.meta.version);
      if (draft) {
        setValues(draft);
      } else {
        // Initialize with empty values for all fields
        const allFields = getAllFields(templateEntry.tokensSchema);
        const initialValues: Record<string, string> = {};
        allFields.forEach((field) => {
          initialValues[field.key] = field.defaultValue || '';
        });
        setValues(initialValues);
      }
    }
  }, [templateEntry, slug]);

  // Validation
  const validation = useMemo(() => {
    if (!templateEntry) return { valid: true, missingFields: [] };
    return validateRequiredFields(templateEntry.tokensSchema, values);
  }, [templateEntry, values]);

  // Handlers
  const handleSaveDraft = () => {
    if (!templateEntry) return;
    saveDraft(slug!, templateEntry.meta.version, values);
    showToast('Draft saved', <Save className="w-4 h-4 text-theme-accent" />);
  };

  const handleReset = () => {
    if (confirm('Reset all fields? This cannot be undone.')) {
      const allFields = getAllFields(templateEntry!.tokensSchema);
      const resetValues: Record<string, string> = {};
      allFields.forEach((field) => {
        resetValues[field.key] = field.defaultValue || '';
      });
      setValues(resetValues);
      showToast('Fields reset', <RotateCcw className="w-4 h-4 text-theme-text-3" />);
    }
  };

  const handleGenerate = () => {
    if (!validation.valid) {
      // Jump to first missing field
      if (validation.missingFields.length > 0) {
        setScrollToField(validation.missingFields[0].key);
        showToast(
          `${validation.missingFields.length} required field${
            validation.missingFields.length > 1 ? 's' : ''
          } missing`,
          <AlertCircle className="w-4 h-4 text-red-500" />
        );
      }
      return;
    }

    setGenerateSheetOpen(true);
  };

  const handleJumpToMissing = () => {
    if (validation.missingFields.length > 0) {
      setScrollToField(validation.missingFields[0].key);
      // On mobile, expand fields section
      setMobileFieldsExpanded(true);
    }
  };

  const showToast = (message: string, icon?: React.ReactNode) => {
    setToast({ message, icon });
    setTimeout(() => setToast(null), 3000);
  };

  // Not found
  if (!templateEntry) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-[24px] font-semibold text-theme-text-1 mb-2">
            Template not found
          </h1>
          <p className="text-[14px] text-theme-text-3 mb-6">
            The template "{slug}" could not be found.
          </p>
          <Link
            to="/resources?tab=templates"
            className="inline-flex items-center gap-2 px-4 py-2 bg-theme-accent text-white rounded-lg text-[14px] font-medium hover:bg-theme-accent-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to templates
          </Link>
        </div>
      </div>
    );
  }

  const { Component, meta, tokensSchema } = templateEntry;
  const missingCount = validation.missingFields.length;
  const hasDraftSaved = hasDraft(slug!, meta.version);

  return (
    <>
      {/* Toast */}
      <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>

      {/* Generate Sheet */}
      <GenerateSheet
        isOpen={generateSheetOpen}
        onClose={() => setGenerateSheetOpen(false)}
        templateComponent={Component}
        templateSlug={slug!}
        templateVersion={meta.version}
        templateTitle={meta.title}
        values={values}
        onSuccess={() => {
          showToast('Template generated', <FileCheck className="w-4 h-4 text-theme-accent" />);
        }}
      />

      {/* Main Layout */}
      <div className="min-h-screen bg-theme-bg flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-theme-surface-1/95 backdrop-blur-xl border-b border-theme-border-1">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between gap-4 mb-3">
              <Link
                to={`/resources/templates/${slug}`}
                className="inline-flex items-center gap-2 text-[13px] text-theme-text-3 hover:text-theme-text-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to template
              </Link>

              {hasDraftSaved && (
                <span className="text-[12px] text-theme-text-3">Draft saved</span>
              )}
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-[20px] lg:text-[24px] font-semibold text-theme-text-1 mb-1">
                  {meta.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-[12px] text-theme-text-3">
                  <span>{meta.jurisdiction}</span>
                  <span>•</span>
                  <span>v{meta.version}</span>
                </div>
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-3">
                <button
                  onClick={handleSaveDraft}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-theme-surface-2 border border-theme-border-1 text-theme-text-1 rounded-lg text-[14px] font-medium hover:bg-theme-surface-3 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
                >
                  <Save className="w-4 h-4" />
                  Save draft
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-theme-surface-2 border border-theme-border-1 text-theme-text-1 rounded-lg text-[14px] font-medium hover:bg-theme-surface-3 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1">
          {/* Desktop: Two-Column */}
          <div className="hidden lg:block max-w-[1400px] mx-auto px-6 py-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Left: Preview (65%) */}
              <div className="col-span-7">
                <PreviewPane component={Component} values={values} />
              </div>

              {/* Right: Fields (35%) */}
              <div className="col-span-5">
                <FieldsPanel
                  schema={tokensSchema}
                  values={values}
                  onChange={setValues}
                  missingRequired={validation.missingFields}
                  scrollToField={scrollToField}
                />
              </div>
            </div>
          </div>

          {/* Mobile: Stacked with Accordions */}
          <div className="lg:hidden">
            {/* Preview Section */}
            <div className="border-b border-theme-border-1 bg-theme-surface-1">
              <button
                onClick={() => setMobilePreviewExpanded(!mobilePreviewExpanded)}
                className="w-full px-4 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-theme-focus/40"
              >
                <span className="text-[15px] font-semibold text-theme-text-1">
                  Preview
                </span>
                {mobilePreviewExpanded ? (
                  <ChevronUp className="w-5 h-5 text-theme-text-3" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-theme-text-3" />
                )}
              </button>
              <AnimatePresence>
                {mobilePreviewExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4"
                  >
                    <PreviewPane component={Component} values={values} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Fields Section */}
            <div className="border-b border-theme-border-1 bg-theme-surface-1">
              <button
                onClick={() => setMobileFieldsExpanded(!mobileFieldsExpanded)}
                className="w-full px-4 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-theme-focus/40"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-theme-text-1">
                    Customize fields
                  </span>
                  {missingCount > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-[11px] font-semibold rounded-full">
                      {missingCount} missing
                    </span>
                  )}
                </div>
                {mobileFieldsExpanded ? (
                  <ChevronUp className="w-5 h-5 text-theme-text-3" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-theme-text-3" />
                )}
              </button>
              <AnimatePresence>
                {mobileFieldsExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4"
                  >
                    <FieldsPanel
                      schema={tokensSchema}
                      values={values}
                      onChange={setValues}
                      missingRequired={validation.missingFields}
                      scrollToField={scrollToField}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>

        {/* Sticky Action Bar */}
        <div className="sticky bottom-0 z-40 bg-theme-surface-1/95 backdrop-blur-xl border-t border-theme-border-1">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Left: Generate Button + Missing Badge */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                <button
                  onClick={handleGenerate}
                  disabled={!validation.valid}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-theme-accent text-white rounded-lg text-[14px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 shadow-theme-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileCheck className="w-4 h-4" />
                  Generate
                </button>

                {missingCount > 0 && (
                  <button
                    onClick={handleJumpToMissing}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-[13px] text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {missingCount} field{missingCount > 1 ? 's' : ''} missing
                  </button>
                )}

                {/* Mobile: Save & Reset */}
                <div className="flex sm:hidden items-center gap-2">
                  <button
                    onClick={handleSaveDraft}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-theme-surface-2 border border-theme-border-1 text-theme-text-1 rounded-lg text-[13px] font-medium hover:bg-theme-surface-3 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-theme-surface-2 border border-theme-border-1 text-theme-text-1 rounded-lg text-[13px] font-medium hover:bg-theme-surface-3 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>

              {/* Right: Confidence Line */}
              <div className="hidden lg:block text-[12px] text-theme-text-3 text-right">
                Not legal advice. Templates are maintained and versioned.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// PREVIEW PANE
// ============================================================================

function PreviewPane({ component: Component, values }: { component: React.ComponentType; values: Record<string, string> }) {
  return (
    <div className="sticky top-24">
      <div className="bg-theme-surface-2 rounded-xl p-4 lg:p-6 border border-theme-border-2/60">
        {/* Desktop: Full-width preview with scroll */}
        <div
          className="hidden lg:block mx-auto bg-white shadow-theme-2 rounded-lg overflow-auto max-h-[70vh]"
          style={{
            maxWidth: '100%',
          }}
        >
          <TemplatePreviewWrapper Component={Component} values={values} />
        </div>

        {/* Mobile: Scaled-down preview to fit viewport */}
        <div className="lg:hidden relative w-full overflow-hidden rounded-lg bg-white shadow-theme-2">
          {/* Container with proper aspect ratio (letter size: 8.5:11 = ~0.773) */}
          <div 
            className="relative w-full"
            style={{ paddingBottom: '141.18%' }} /* 11/8.5 * 100 = 129.4% for letter aspect ratio, adjusted for better mobile fit */
          >
            {/* Scaled content wrapper */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="origin-top-left"
                style={{
                  transform: 'scale(0.38)', /* Scale to fit mobile viewport ~360px / ~950px template width */
                  transformOrigin: 'top left',
                  width: '263.16%', /* Inverse of scale to maintain layout: 100 / 0.38 */
                  height: '263.16%',
                }}
              >
                <TemplatePreviewWrapper Component={Component} values={values} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}