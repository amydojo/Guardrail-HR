/**
 * Document Download Actions
 * Export controls for PDF, DOCX, and Google Docs
 */

import React, { useState } from 'react';
import { Download, FileText, Printer } from 'lucide-react';
import { DocumentMetadata } from './types';

interface DocumentDownloadActionsProps {
  metadata: DocumentMetadata;
  className?: string;
}

/**
 * Download action buttons for exporting documents
 */
export function DocumentDownloadActions({ metadata, className = '' }: DocumentDownloadActionsProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    
    // Stub: In production, this would call a PDF generation service
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('PDF Download initiated:', {
      title: metadata.title,
      docId: metadata.docId,
      version: metadata.version,
    });
    
    alert(
      `PDF Download\n\nIn production, this would generate:\n• ${metadata.title}\n• ${metadata.docId} • ${metadata.version}\n• ${metadata.totalPages} pages\n\nFormat: PDF with embedded fonts and proper margins`
    );
    
    setIsExporting(false);
  };

  const handleDownloadDOCX = async () => {
    setIsExporting(true);
    
    // Stub: In production, this would call a DOCX generation service
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('DOCX Download initiated:', {
      title: metadata.title,
      docId: metadata.docId,
      version: metadata.version,
    });
    
    alert(
      `DOCX Download\n\nIn production, this would generate:\n• ${metadata.title}\n• ${metadata.docId} • ${metadata.version}\n• ${metadata.totalPages} pages\n\nFormat: Microsoft Word (.docx) with editable fields and proper formatting`
    );
    
    setIsExporting(false);
  };

  const handleCopyToGoogleDocs = async () => {
    setIsExporting(true);
    
    // Stub: In production, this would use Google Docs API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('Google Docs Copy initiated:', {
      title: metadata.title,
      docId: metadata.docId,
      version: metadata.version,
    });
    
    alert(
      `Copy to Google Docs\n\nIn production, this would:\n1. Create a new Google Doc in your Drive\n2. Copy all content with formatting preserved\n3. Open the document in a new tab\n\nDocument: ${metadata.title}\nPages: ${metadata.totalPages}`
    );
    
    setIsExporting(false);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={handlePrint}
        disabled={isExporting}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-theme-border-1 bg-theme-surface-1 text-[14px] font-medium text-theme-text-1 hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Print document"
      >
        <Printer className="w-4 h-4" />
        Print
      </button>

      <button
        onClick={handleDownloadPDF}
        disabled={isExporting}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-accent text-white text-[14px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 shadow-theme-2 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Download as PDF"
      >
        <Download className="w-4 h-4" />
        {isExporting ? 'Generating...' : 'Download PDF'}
      </button>

      <DownloadMenu
        onDownloadDOCX={handleDownloadDOCX}
        onCopyToGoogleDocs={handleCopyToGoogleDocs}
        disabled={isExporting}
      />
    </div>
  );
}

/**
 * Dropdown menu for additional export options
 */
function DownloadMenu({
  onDownloadDOCX,
  onCopyToGoogleDocs,
  disabled,
}: {
  onDownloadDOCX: () => void;
  onCopyToGoogleDocs: () => void;
  disabled: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-theme-border-1 bg-theme-surface-1 text-[14px] font-medium text-theme-text-1 hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 disabled:opacity-50 disabled:cursor-not-allowed"
        title="More export options"
      >
        <FileText className="w-4 h-4" />
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-[240px] bg-theme-bg border border-theme-border-1 rounded-lg shadow-theme-2 z-20 overflow-hidden">
            <button
              onClick={() => {
                onDownloadDOCX();
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-[14px] text-theme-text-1 hover:bg-theme-surface-1 transition-colors flex items-center gap-3"
            >
              <Download className="w-4 h-4" />
              <div>
                <div className="font-medium">Download as DOCX</div>
                <div className="text-[12px] text-theme-text-3">Editable Microsoft Word format</div>
              </div>
            </button>
            <button
              onClick={() => {
                onCopyToGoogleDocs();
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-[14px] text-theme-text-1 hover:bg-theme-surface-1 transition-colors flex items-center gap-3 border-t border-theme-border-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.727 6.727H14V6H7.273v.727h-.728V6c0-.4.327-.727.728-.727h7.454c.401 0 .728.327.728.727v.727zM7.273 17.273h7.454V18H7.273v-.727zm0-2.182h7.454v.727H7.273v-.727zm9.09-7.364h.728c.401 0 .728.328.728.728v10.909c0 .4-.327.727-.728.727H6.545a.727.727 0 01-.727-.727V8.455c0-.4.326-.728.727-.728h.728v.728h-.728v10.909h10.909V8.455h-.091v-.728z" />
              </svg>
              <div>
                <div className="font-medium">Copy to Google Docs</div>
                <div className="text-[12px] text-theme-text-3">Open in Google Drive</div>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Compact download button group (for inline use)
 */
export function CompactDownloadActions({ metadata, className = '' }: DocumentDownloadActionsProps) {
  const handlePrint = () => window.print();

  const handleDownload = () => {
    alert(
      `Download initiated:\n${metadata.title}\n${metadata.docId} • ${metadata.version}\n\nIn production, this would generate a PDF.`
    );
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        onClick={handlePrint}
        className="p-2 rounded-lg border border-theme-border-1 bg-theme-surface-1 text-theme-text-1 hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
        title="Print"
      >
        <Printer className="w-4 h-4" />
      </button>
      <button
        onClick={handleDownload}
        className="p-2 rounded-lg bg-theme-accent text-white hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
        title="Download PDF"
      >
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
}
