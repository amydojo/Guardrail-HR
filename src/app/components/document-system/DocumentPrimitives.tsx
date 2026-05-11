/**
 * Document Primitives
 * Reusable components for legal document templates
 * All components are theme-aware and print-optimized
 */

import React from 'react';
import { FieldPair, SignatureLine, CalloutContent } from './types';

/**
 * Document Title
 * Main title for cover pages or section starts
 */
export function DocTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h1
      className={`text-[24pt] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] print:text-[#1a1a1a] tracking-[-0.02em] leading-[1.2] ${className}`}
    >
      {children}
    </h1>
  );
}

/**
 * Heading 1
 * Major sections (e.g., "1. Services & Scope")
 */
export function H1({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-[18pt] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] print:text-[#1a1a1a] tracking-[-0.015em] leading-[1.3] mt-[32px] mb-[16px] first:mt-0 ${className}`}
    >
      {children}
    </h2>
  );
}

/**
 * Heading 2
 * Subsections
 */
export function H2({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h3
      className={`text-[14pt] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] print:text-[#1a1a1a] tracking-[-0.01em] leading-[1.4] mt-[24px] mb-[12px] first:mt-0 ${className}`}
    >
      {children}
    </h3>
  );
}

/**
 * Heading 3
 * Minor subsections
 */
export function H3({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h4
      className={`text-[12pt] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] print:text-[#1a1a1a] tracking-[0] leading-[1.4] mt-[16px] mb-[8px] first:mt-0 ${className}`}
    >
      {children}
    </h4>
  );
}

/**
 * Body Text
 * Standard paragraph text
 */
export function Body({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`text-[11.5pt] font-normal text-[#2d2d2d] dark:text-[#e0e0e0] print:text-[#2d2d2d] leading-[1.5] mb-[12px] last:mb-0 ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * Meta Text
 * Small caps with tracking for labels and metadata
 */
export function Meta({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`text-[9pt] font-normal text-[#737373] dark:text-[#a3a3a3] print:text-[#737373] tracking-[0.01em] leading-[1.4] uppercase ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Field Pair
 * Label + Value with optional placeholder token
 */
export function FieldPairComponent({ label, value, placeholder, className = '' }: FieldPair & { className?: string }) {
  return (
    <div className={`flex items-baseline gap-2 mb-[12px] last:mb-0 ${className}`}>
      <span className="text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0] print:text-[#2d2d2d] tracking-[0.005em] leading-[1.4]">
        {label}:
      </span>
      <span className="text-[11.5pt] font-normal text-[#5b6ff5] dark:text-[#7b8fff] print:text-[#5b6ff5] font-mono leading-[1.5]">
        {placeholder || value}
      </span>
    </div>
  );
}

/**
 * Callout Box
 * Highlighted notices, disclaimers, or important information
 */
export function Callout({ title, content, variant = 'info', className = '' }: CalloutContent & { className?: string }) {
  const borderColor =
    variant === 'warning'
      ? 'border-l-[#f59e0b] dark:border-l-[#fbbf24]'
      : variant === 'important'
        ? 'border-l-[#ef4444] dark:border-l-[#f87171]'
        : 'border-l-[#5b6ff5] dark:border-l-[#7b8fff]';

  return (
    <div
      className={`bg-[#f9fafb] dark:bg-[#1a1a1a] print:bg-[#f9fafb] border border-[#e5e5e5] dark:border-[#2d2d2d] print:border-[#e5e5e5] border-l-[3px] ${borderColor} rounded-[8px] p-[16px] my-[16px] break-inside-avoid ${className}`}
    >
      {title && (
        <div className="text-[10pt] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] print:text-[#1a1a1a] mb-[6px]">
          {title}
        </div>
      )}
      <div className="text-[10pt] text-[#2d2d2d] dark:text-[#e0e0e0] print:text-[#2d2d2d] leading-[1.6]">
        {content}
      </div>
    </div>
  );
}

/**
 * Checklist Item
 * Checkbox with label for acknowledgment lists
 */
export function ChecklistItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-start gap-3 mb-[12px] last:mb-0 ${className}`}>
      <span className="text-[12pt] text-[#737373] dark:text-[#a3a3a3] print:text-[#737373] select-none">☐</span>
      <span className="text-[11.5pt] text-[#2d2d2d] dark:text-[#e0e0e0] print:text-[#2d2d2d] leading-[1.5] flex-1">
        {children}
      </span>
    </div>
  );
}

/**
 * Ordered List
 * Numbered list for sequences or requirements
 */
export function OrderedList({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <ol
      className={`list-decimal list-outside ml-[20px] space-y-[8px] text-[11.5pt] text-[#2d2d2d] dark:text-[#e0e0e0] print:text-[#2d2d2d] leading-[1.5] mb-[12px] ${className}`}
    >
      {children}
    </ol>
  );
}

/**
 * Unordered List
 * Bulleted list for general items
 */
export function UnorderedList({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <ul
      className={`list-disc list-outside ml-[20px] space-y-[8px] text-[11.5pt] text-[#2d2d2d] dark:text-[#e0e0e0] print:text-[#2d2d2d] leading-[1.5] mb-[12px] ${className}`}
    >
      {children}
    </ul>
  );
}

/**
 * Signature Block
 * Single signature line with date (no tables)
 */
export function SignatureBlock({ lines, className = '' }: { lines: SignatureLine[]; className?: string }) {
  return (
    <div className={`space-y-[24px] mt-[32px] break-inside-avoid ${className}`}>
      {lines.map((line, index) => (
        <div key={index} className="space-y-[8px]">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <span className="text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0] print:text-[#2d2d2d]">
                {line.label}:
              </span>
              <div className="mt-[4px] border-b border-[#d4d4d4] dark:border-[#404040] print:border-[#d4d4d4] h-[24px]" />
            </div>
            <div className="w-[120px]">
              <span className="text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0] print:text-[#2d2d2d]">
                Date:
              </span>
              <div className="mt-[4px] border-b border-[#d4d4d4] dark:border-[#404040] print:border-[#d4d4d4] h-[24px]" />
            </div>
          </div>
          {line.name && (
            <div className="flex items-baseline gap-2">
              <span className="text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0] print:text-[#2d2d2d]">
                Printed Name:
              </span>
              <span className="text-[11.5pt] text-[#5b6ff5] dark:text-[#7b8fff] print:text-[#5b6ff5] font-mono">
                {line.name}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Section Divider
 * Subtle horizontal rule with spacing
 */
export function Divider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-[0.5px] bg-[#e5e5e5] dark:bg-[#2d2d2d] print:bg-[#e5e5e5] my-[24px] ${className}`}
    />
  );
}

/**
 * Field Group
 * Container for multiple field pairs
 */
export function FieldGroup({ children, title, className = '' }: { children: React.ReactNode; title?: string; className?: string }) {
  return (
    <div className={`mb-[24px] break-inside-avoid ${className}`}>
      {title && <Meta className="mb-[12px]">{title}</Meta>}
      <div className="space-y-[12px]">{children}</div>
    </div>
  );
}

/**
 * Cover Pills
 * Metadata pills for cover pages
 */
export function CoverPills({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 flex-wrap ${className}`}>
      {items.map((item, index) => (
        <span
          key={index}
          className="px-3 py-1.5 bg-[#f5f5f5] dark:bg-[#262626] print:bg-[#f5f5f5] border border-[#e5e5e5] dark:border-[#2d2d2d] print:border-[#e5e5e5] rounded-full text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0] print:text-[#2d2d2d]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

/**
 * Spacer
 * Explicit vertical spacing
 */
export function Spacer({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const heights = {
    sm: 'h-[12px]',
    md: 'h-[24px]',
    lg: 'h-[32px]',
    xl: 'h-[48px]',
  };

  return <div className={heights[size]} />;
}
