/**
 * Template Document System — Premium Legal Templates
 * 
 * Production-ready React components for Guardrail HR's downloadable templates
 * Matches specification in /GUARDRAIL_TEMPLATE_SPEC.md
 * 
 * Features:
 * - Print-optimized CSS with proper page breaks
 * - Token replacement system for customizable fields
 * - Light/dark mode support
 * - PDF/DOCX export-ready layout
 */

import React from 'react';
import { useTokenValue } from '@/app/templates/TemplatePreviewWrapper';

// ============================================================================
// BASE TEMPLATE DOCUMENT WRAPPER
// ============================================================================

interface TemplateDocumentProps {
  children: React.ReactNode;
  pageSize?: 'letter' | 'a4';
}

export function TemplateDocument({ children, pageSize = 'letter' }: TemplateDocumentProps) {
  return (
    <div className={`template-document template-document--${pageSize}`}>
      {children}
    </div>
  );
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

interface PageProps {
  pageNumber: number;
  totalPages: number;
  documentTitle: string;
  version: string;
  reviewedDate: string;
  children: React.ReactNode;
}

export function Page({
  pageNumber,
  totalPages,
  documentTitle,
  version,
  reviewedDate,
  children,
}: PageProps) {
  return (
    <div className="template-page">
      {/* Header */}
      <div className="template-header">
        <div className="template-header__left">Guardrail HR</div>
        <div className="template-header__right">
          Page {pageNumber} of {totalPages}
        </div>
      </div>

      {/* Content */}
      <div className="template-content">{children}</div>

      {/* Footer */}
      <div className="template-footer">
        <div className="template-footer__left">
          {documentTitle} • Version {version}
        </div>
        <div className="template-footer__right">Reviewed {reviewedDate}</div>
      </div>
    </div>
  );
}

// ============================================================================
// COVER PAGE
// ============================================================================

interface CoverPageProps {
  title: string;
  jurisdiction: string;
  version: string;
  reviewedDate: string;
  documentType: string;
  totalPages: number;
}

export function CoverPage({
  title,
  jurisdiction,
  version,
  reviewedDate,
  documentType,
  totalPages,
}: CoverPageProps) {
  return (
    <div className="template-page template-page--cover">
      {/* Header */}
      <div className="template-header">
        <div className="template-header__left">Guardrail HR</div>
        <div className="template-header__right">Page 1 of {totalPages}</div>
      </div>

      {/* Cover content */}
      <div className="template-content template-content--cover">
        <div className="template-cover">
          <h1 className="template-cover__title">{title}</h1>
          <div className="template-cover__meta">
            <span className="template-pill">{jurisdiction}</span>
            <span className="template-pill">Version {version}</span>
            <span className="template-pill">{documentType}</span>
            <span className="template-pill">Reviewed {reviewedDate}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="template-footer">
        <div className="template-footer__left">
          {title} • Version {version}
        </div>
        <div className="template-footer__right">Reviewed {reviewedDate}</div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION HEADER
// ============================================================================

interface SectionHeaderProps {
  number?: string;
  title: string;
  level?: 1 | 2 | 3;
  rule?: boolean;
}

export function SectionHeader({ number, title, level = 1, rule = false }: SectionHeaderProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const className = `template-section-header template-section-header--level-${level}`;

  return (
    <div className={className}>
      <Tag className="template-section-header__title">
        {number && (
          <>
            <span className="template-section-header__number">{number}</span>
            {' '}
          </>
        )}
        {title}
      </Tag>
      {rule && <div className="template-section-header__rule" />}
    </div>
  );
}

// ============================================================================
// CALLOUT BOX
// ============================================================================

interface CalloutProps {
  label?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Callout({ label, children, icon }: CalloutProps) {
  return (
    <div className="template-callout">
      {(label || icon) && (
        <div className="template-callout__header">
          {icon && <span className="template-callout__icon">{icon}</span>}
          {label && <span className="template-callout__label">{label}</span>}
        </div>
      )}
      <div className="template-callout__content">{children}</div>
    </div>
  );
}

// ============================================================================
// EDITABLE FIELD ROW
// ============================================================================

interface FieldRowProps {
  label: string;
  token: string;
}

export function FieldRow({ label, token }: FieldRowProps) {
  const value = useTokenValue(token);
  const isEmpty = !value || value === `[[${token}]]`;
  
  return (
    <div className="template-field-row">
      <span className="template-field-row__label">{label}:</span>
      <span 
        className={isEmpty ? "template-field-row__token template-field-row__token--empty" : "template-field-row__token"}
        data-token={token}
      >
        {value}
      </span>
    </div>
  );
}

// ============================================================================
// CHECKBOX ROW
// ============================================================================

interface CheckboxRowProps {
  children: React.ReactNode;
}

export function CheckboxRow({ children }: CheckboxRowProps) {
  return (
    <div className="template-checkbox-row">
      <span className="template-checkbox-row__box">☐</span>
      <span className="template-checkbox-row__label">{children}</span>
    </div>
  );
}

// ============================================================================
// SIGNATURE BLOCK
// ============================================================================

interface SignatureBlockProps {
  fields: {
    label: string;
    type: 'signature' | 'date' | 'name';
    token?: string;
  }[];
}

export function SignatureBlock({ fields }: SignatureBlockProps) {
  return (
    <div className="template-signature-block">
      {fields.map((field, idx) => (
        <div key={idx} className="template-signature-block__row">
          {field.type === 'signature' && (
            <>
              <div className="template-signature-block__field">
                <span className="template-signature-block__label">{field.label}:</span>
                <span className="template-signature-block__line template-signature-block__line--signature" />
              </div>
              {/* Date field on same row */}
            </>
          )}
          {field.type === 'date' && (
            <div className="template-signature-block__field template-signature-block__field--date">
              <span className="template-signature-block__label">Date:</span>
              <span className="template-signature-block__line template-signature-block__line--date" />
            </div>
          )}
          {field.type === 'name' && field.token && (
            <SignatureNameField token={field.token} />
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Signature name field with token value population
 */
function SignatureNameField({ token }: { token: string }) {
  const value = useTokenValue(token);
  const isEmpty = !value || value === `[[${token}]]`;
  
  return (
    <div className="template-signature-block__name">
      <span className="template-signature-block__label">Printed Name:</span>
      <span 
        className={isEmpty ? "template-field-row__token template-field-row__token--empty" : "template-field-row__token"}
        data-token={token}
      >
        {value}
      </span>
    </div>
  );
}

// ============================================================================
// VERSION HISTORY TABLE
// ============================================================================

interface VersionHistoryEntry {
  version: string;
  date: string;
  changes: string[];
}

interface VersionHistoryProps {
  entries: VersionHistoryEntry[];
}

export function VersionHistory({ entries }: VersionHistoryProps) {
  return (
    <div className="template-version-history">
      <h3 className="template-version-history__title">Version History</h3>
      <table className="template-version-history__table">
        <thead>
          <tr>
            <th>Version</th>
            <th>Date</th>
            <th>Changes</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <tr key={idx}>
              <td className="template-version-history__version">{entry.version}</td>
              <td className="template-version-history__date">{entry.date}</td>
              <td className="template-version-history__changes">
                <ul>
                  {entry.changes.map((change, changeIdx) => (
                    <li key={changeIdx}>{change}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// TOKEN INLINE
// ============================================================================

interface TokenProps {
  name: string;
}

/**
 * Inline token component - renders the actual value from context
 * Falls back to [[TOKEN]] placeholder if value is missing
 */
export function Token({ name }: TokenProps) {
  const value = useTokenValue(name);
  const isEmpty = !value || value === `[[${name}]]`;
  
  return (
    <span 
      className={isEmpty ? "template-token template-token--empty" : "template-token"}
      data-token={name}
    >
      {value}
    </span>
  );
}

// ============================================================================
// PARAGRAPH
// ============================================================================

interface ParagraphProps {
  children: React.ReactNode;
}

export function Paragraph({ children }: ParagraphProps) {
  return <p className="template-paragraph">{children}</p>;
}

// ============================================================================
// ORDERED LIST
// ============================================================================

interface OrderedListProps {
  children: React.ReactNode;
}

export function OrderedList({ children }: OrderedListProps) {
  return <ol className="template-ordered-list">{children}</ol>;
}

// ============================================================================
// UNORDERED LIST
// ============================================================================

interface UnorderedListProps {
  children: React.ReactNode;
}

export function UnorderedList({ children }: UnorderedListProps) {
  return <ul className="template-unordered-list">{children}</ul>;
}

// ============================================================================
// LIST ITEM
// ============================================================================

interface ListItemProps {
  children: React.ReactNode;
}

export function ListItem({ children }: ListItemProps) {
  return <li className="template-list-item">{children}</li>;
}
