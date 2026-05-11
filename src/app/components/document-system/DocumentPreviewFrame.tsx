/**
 * Document Preview Frame
 * Main container for legal document templates with standardized layout
 * Supports US Letter (8.5 × 11 in) and A4 (210 × 297 mm) formats
 */

import React from 'react';
import { DocumentMetadata, PaperSize } from './types';

interface DocumentPreviewFrameProps {
  metadata: DocumentMetadata;
  paperSize?: PaperSize;
  currentPage: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Single page frame with header, footer, and 1-inch margins
 */
export function DocumentPreviewFrame({
  metadata,
  paperSize = 'us-letter',
  currentPage,
  children,
  className = '',
}: DocumentPreviewFrameProps) {
  const dimensions =
    paperSize === 'us-letter'
      ? 'w-[816px] min-h-[1056px]' // 8.5 × 11 in @ 96dpi
      : 'w-[794px] min-h-[1123px]'; // 210 × 297 mm @ 96dpi

  return (
    <div
      className={`document-page ${dimensions} bg-white dark:bg-[#1a1a1a] mx-auto mb-6 shadow-theme-2 dark:shadow-none dark:border dark:border-theme-border-1 print:shadow-none print:border-none print:mb-0 ${className}`}
      data-page={currentPage}
    >
      {/* Header - 1 inch from top */}
      <div className="document-header flex items-center justify-between px-[72px] pt-[48px] pb-[12px] border-b border-[#e5e5e5] dark:border-[#2d2d2d] print:border-[#e5e5e5]">
        <span className="text-[9pt] text-[#737373] dark:text-[#a3a3a3] print:text-[#737373]">Guardrail HR</span>
        <span className="text-[9pt] text-[#737373] dark:text-[#a3a3a3] print:text-[#737373]">
          {metadata.docId} • {metadata.version}
        </span>
      </div>

      {/* Content - 1 inch margins (72px @ 96dpi), safe content area */}
      <div className="document-content px-[72px] py-[32px] min-h-[864px] print:min-h-0">{children}</div>

      {/* Footer - 1 inch from bottom */}
      <div className="document-footer flex items-center justify-between px-[72px] py-[12px] pt-[12px] border-t border-[#e5e5e5] dark:border-[#2d2d2d] print:border-[#e5e5e5]">
        <span className="text-[9pt] text-[#737373] dark:text-[#a3a3a3] print:text-[#737373]">
          Reviewed {metadata.reviewedDate}
        </span>
        <span className="text-[9pt] text-[#737373] dark:text-[#a3a3a3] print:text-[#737373]">
          Page {currentPage} of {metadata.totalPages}
        </span>
      </div>
    </div>
  );
}

/**
 * Multi-page document container
 */
interface DocumentProps {
  metadata: DocumentMetadata;
  paperSize?: PaperSize;
  children: React.ReactNode;
}

export function Document({ metadata, paperSize = 'us-letter', children }: DocumentProps) {
  // Split children into pages
  const pages = React.Children.toArray(children);

  return (
    <div className="document-container">
      {pages.map((pageContent, index) => (
        <DocumentPreviewFrame
          key={index}
          metadata={metadata}
          paperSize={paperSize}
          currentPage={index + 1}
        >
          {pageContent}
        </DocumentPreviewFrame>
      ))}
    </div>
  );
}

/**
 * Page component for manual page breaks
 */
export function Page({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`document-page-content ${className}`}>{children}</div>;
}
