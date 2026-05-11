/**
 * Document System Types
 * Type definitions for the document preview frame system
 */

export type PaperSize = 'us-letter' | 'a4';

export interface DocumentMetadata {
  title: string;
  docId: string;
  version: string;
  jurisdiction: string;
  reviewedDate: string; // e.g., "January 2026"
  totalPages: number;
}

export interface PageBreakProps {
  avoid?: boolean;
  before?: boolean;
  after?: boolean;
}

export interface FieldPair {
  label: string;
  value: string;
  placeholder?: string; // e.g., "[COMPANY_NAME]"
}

export interface SignatureLine {
  label: string;
  name?: string; // Placeholder like "[EMPLOYEE_NAME]"
}

export interface CalloutContent {
  title?: string;
  content: string | React.ReactNode;
  variant?: 'info' | 'warning' | 'important';
}
