/**
 * Generate Sheet
 * Bottom sheet modal for exporting template to PDF or DOCX
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Printer, Download, CheckCircle, Loader2 } from 'lucide-react';
import type { ComponentType } from 'react';
import { exportTemplateToPdf, generatePdfFilename } from '@/app/templates/exportToPdf';
import { exportTemplateToDocx, generateDocxFilename } from '@/app/templates/exportToDocx';
import { addGenerationRecord } from '@/app/templates/templateStorage';

// ============================================================================
// TYPES
// ============================================================================

interface GenerateSheetProps {
  isOpen: boolean;
  onClose: () => void;
  templateComponent: ComponentType;
  templateSlug: string;
  templateVersion: string;
  templateTitle: string;
  values: Record<string, string>;
  onSuccess?: () => void;
}

type ExportStatus = 'idle' | 'exporting' | 'success' | 'error';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function GenerateSheet({
  isOpen,
  onClose,
  templateComponent,
  templateSlug,
  templateVersion,
  templateTitle,
  values,
  onSuccess,
}: GenerateSheetProps) {
  const [pdfStatus, setPdfStatus] = useState<ExportStatus>('idle');
  const [docxStatus, setDocxStatus] = useState<ExportStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleExportPdf = () => {
    setPdfStatus('exporting');
    setError(null);

    try {
      exportTemplateToPdf(
        templateComponent,
        values,
        templateSlug,
        templateVersion
      );

      // Save generation record
      addGenerationRecord(templateSlug, templateVersion, values, { pdf: true });

      setPdfStatus('success');
      onSuccess?.();

      // Reset status after delay
      setTimeout(() => setPdfStatus('idle'), 3000);
    } catch (err) {
      console.error('PDF export failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to export PDF');
      setPdfStatus('error');
      setTimeout(() => setPdfStatus('idle'), 3000);
    }
  };

  const handleExportDocx = async () => {
    setDocxStatus('exporting');
    setError(null);

    try {
      await exportTemplateToDocx(
        templateComponent,
        values,
        templateSlug,
        templateVersion,
        templateTitle
      );

      // Save generation record
      addGenerationRecord(templateSlug, templateVersion, values, { docx: true });

      setDocxStatus('success');
      onSuccess?.();

      // Reset status after delay
      setTimeout(() => setDocxStatus('idle'), 3000);
    } catch (err) {
      console.error('DOCX export failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to export DOCX');
      setDocxStatus('error');
      setTimeout(() => setDocxStatus('idle'), 3000);
    }
  };

  const pdfFilename = generatePdfFilename(templateSlug, templateVersion);
  const docxFilename = generateDocxFilename(templateSlug, templateVersion);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full lg:max-w-[560px] bg-theme-surface-1 border-0 lg:border lg:border-theme-border-1 lg:rounded-2xl shadow-theme-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 lg:px-6 py-4 border-b border-theme-border-1">
              <h2 className="text-[17px] font-semibold text-theme-text-1">
                Generate & Download
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-theme-text-3 hover:text-theme-text-1 hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 lg:px-6 py-5 space-y-4">
              {/* Intro */}
              <p className="text-[14px] text-theme-text-2 leading-relaxed">
                Choose your preferred format to download. You can generate both formats if needed.
              </p>

              {/* Export Options */}
              <div className="space-y-3">
                {/* PDF Option */}
                <ExportOption
                  icon={<Printer className="w-5 h-5" />}
                  title="PDF (Print)"
                  description="Opens print dialog to save as PDF"
                  filename={pdfFilename}
                  status={pdfStatus}
                  onExport={handleExportPdf}
                />

                {/* DOCX Option */}
                <ExportOption
                  icon={<FileText className="w-5 h-5" />}
                  title="Microsoft Word"
                  description="Download editable .docx file"
                  filename={docxFilename}
                  status={docxStatus}
                  onExport={handleExportDocx}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-[13px] text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Footer Note */}
              <div className="mt-6 pt-4 border-t border-theme-border-2">
                <p className="text-[12px] text-theme-text-3 leading-relaxed">
                  This template is informational only and does not constitute legal advice.
                  Generated documents are saved to your local device only.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// EXPORT OPTION
// ============================================================================

interface ExportOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  filename: string;
  status: ExportStatus;
  onExport: () => void;
}

function ExportOption({
  icon,
  title,
  description,
  filename,
  status,
  onExport,
}: ExportOptionProps) {
  const isExporting = status === 'exporting';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <button
      onClick={onExport}
      disabled={isExporting}
      className="w-full flex items-start gap-4 p-4 bg-theme-surface-2 border border-theme-border-1 rounded-xl hover:bg-theme-surface-3 transition-colors text-left disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
    >
      {/* Icon */}
      <div className="flex-shrink-0 text-theme-text-2 mt-0.5">{icon}</div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[14px] font-semibold text-theme-text-1 mb-0.5">
          {title}
        </h3>
        <p className="text-[13px] text-theme-text-3 mb-2">{description}</p>
        <p className="text-[12px] font-mono text-theme-text-3 truncate">
          {filename}
        </p>
      </div>

      {/* Status */}
      <div className="flex-shrink-0">
        {isExporting && (
          <Loader2 className="w-5 h-5 text-theme-accent animate-spin" />
        )}
        {isSuccess && (
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500" />
        )}
        {!isExporting && !isSuccess && (
          <Download className="w-5 h-5 text-theme-text-3" />
        )}
      </div>
    </button>
  );
}