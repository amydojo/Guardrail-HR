/**
 * Template to HTML Renderer with Token Replacement
 * Extracts HTML from rendered template for export
 */

import type { ComponentType } from 'react';

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validate that all tokens have been replaced in the HTML
 * Throws an error if any unreplaced tokens are found
 */
export function validateTokenReplacement(html: string): void {
  // Match both {{TOKEN}} and [[TOKEN]] patterns
  const tokenPattern = /\{\{([A-Z_]+)\}\}|\[\[([A-Z_]+)\]\]/g;
  const matches = Array.from(html.matchAll(tokenPattern));
  
  if (matches.length > 0) {
    const unreplacedTokens = matches.map(m => m[1] || m[2]);
    const uniqueTokens = [...new Set(unreplacedTokens)];
    
    throw new Error(
      `Cannot export: The following fields are missing values: ${uniqueTokens.join(', ')}. ` +
      `Please fill in all required fields before exporting.`
    );
  }
}

// ============================================================================
// HTML GENERATION
// ============================================================================

/**
 * Get the current rendered HTML from the template preview
 * This assumes the template is already rendered in the DOM
 */
export function getTemplateHtml(includeStyles: boolean = true, validate: boolean = true): string {
  // Find the template preview wrapper in the DOM
  const wrapper = document.querySelector('.template-preview-wrapper');
  
  if (!wrapper) {
    throw new Error('Template preview not found. Please ensure the template is rendered before exporting.');
  }
  
  // Get the HTML content
  const bodyHtml = wrapper.innerHTML;
  
  // Validate token replacement if requested
  if (validate) {
    validateTokenReplacement(bodyHtml);
  }
  
  // Wrap in full HTML document if styles are included
  if (includeStyles) {
    return wrapInHtmlDocument(bodyHtml);
  }
  
  return bodyHtml;
}

/**
 * Wrap rendered template in a complete HTML document with styles
 * This ensures proper styling when exported to PDF or DOCX
 */
function wrapInHtmlDocument(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guardrail HR Template</title>
  <style>
    /* ===================================================================== */
    /* TEMPLATE DOCUMENT SYSTEM STYLES */
    /* ===================================================================== */
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      font-size: 11.5pt;
      line-height: 1.6;
      color: #111827;
      background: white;
    }
    
    /* Page container */
    .template-document {
      background: white;
    }
    
    .template-preview-wrapper {
      background: white;
    }
    
    /* Individual pages */
    .template-page {
      position: relative;
      width: 8.5in;
      min-height: 11in;
      margin: 0 auto;
      padding: 0.75in 1in;
      background: white;
      page-break-after: always;
    }
    
    .template-page--cover {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    
    /* Headers & Footers */
    .template-header,
    .template-footer {
      display: flex;
      justify-content: space-between;
      font-size: 9pt;
      color: #6b7280;
      padding: 8pt 0;
      border-bottom: 0.5pt solid #e5e7eb;
    }
    
    .template-footer {
      border-top: 0.5pt solid #e5e7eb;
      border-bottom: none;
      margin-top: 24pt;
    }
    
    .template-content {
      margin-top: 24pt;
      margin-bottom: 24pt;
    }
    
    /* Cover page elements */
    .template-cover__logo {
      font-size: 14pt;
      font-weight: 600;
      color: #3b82f6;
      margin-bottom: 48pt;
    }
    
    .template-cover__title {
      font-size: 32pt;
      font-weight: 600;
      color: #111827;
      margin-bottom: 16pt;
      line-height: 1.2;
    }
    
    .template-cover__jurisdiction {
      font-size: 16pt;
      color: #6b7280;
      margin-bottom: 48pt;
    }
    
    .template-cover__meta {
      display: flex;
      gap: 32pt;
      font-size: 10pt;
      color: #6b7280;
      margin-top: 64pt;
    }
    
    /* Typography */
    .template-section-header {
      margin-top: 24pt;
      margin-bottom: 12pt;
    }
    
    .template-section-header__number {
      margin-right: 0.25em;
    }
    
    .template-section-header--level-1 {
      font-size: 14pt;
      font-weight: 600;
      color: #111827;
    }
    
    .template-section-header--level-2 {
      font-size: 12pt;
      font-weight: 600;
      color: #374151;
    }
    
    .template-section-header--with-rule {
      padding-bottom: 8pt;
      border-bottom: 0.5pt solid #e5e7eb;
    }
    
    .template-paragraph {
      margin-bottom: 12pt;
      line-height: 1.6;
    }
    
    /* Lists */
    .template-list {
      margin-left: 24pt;
      margin-bottom: 12pt;
    }
    
    .template-list-item {
      margin-bottom: 6pt;
      line-height: 1.6;
    }
    
    /* Callouts */
    .template-callout {
      margin: 16pt 0;
      padding: 12pt;
      border-left: 3px solid #3b82f6;
      background: rgba(59, 130, 246, 0.08);
      border-radius: 4pt;
    }
    
    .template-callout__label {
      font-weight: 600;
      margin-bottom: 4pt;
      color: #111827;
    }
    
    .template-callout p {
      margin: 0;
      font-size: 10pt;
      line-height: 1.5;
    }
    
    /* Field rows */
    .template-field-row {
      display: flex;
      margin-bottom: 8pt;
      padding-bottom: 8pt;
      border-bottom: 0.5pt solid #e5e7eb;
    }
    
    .template-field-row__label {
      min-width: 120pt;
      font-weight: 500;
      color: #374151;
    }
    
    .template-field-row__value {
      flex: 1;
      color: #111827;
    }
    
    /* Checkboxes */
    .template-checkbox-row {
      display: flex;
      align-items: flex-start;
      gap: 8pt;
      margin-bottom: 8pt;
    }
    
    .template-checkbox {
      width: 12pt;
      height: 12pt;
      border: 1pt solid #9ca3af;
      border-radius: 2pt;
      flex-shrink: 0;
      margin-top: 2pt;
    }
    
    /* Signature block */
    .template-signature-block {
      margin-top: 32pt;
      display: flex;
      flex-direction: column;
      gap: 24pt;
    }
    
    .template-signature-field {
      display: flex;
      flex-direction: column;
      gap: 4pt;
    }
    
    .template-signature-field__label {
      font-size: 10pt;
      color: #6b7280;
    }
    
    .template-signature-field__line {
      border-bottom: 0.5pt solid #9ca3af;
      min-height: 24pt;
    }
    
    /* Version history */
    .template-version-history {
      margin-top: 32pt;
      padding-top: 16pt;
      border-top: 0.5pt solid #e5e7eb;
    }
    
    .template-version-history__title {
      font-size: 10pt;
      font-weight: 600;
      color: #374151;
      margin-bottom: 12pt;
    }
    
    .template-version-entry {
      margin-bottom: 12pt;
    }
    
    .template-version-entry__header {
      font-size: 10pt;
      font-weight: 600;
      color: #111827;
      margin-bottom: 4pt;
    }
    
    .template-version-entry__date {
      font-size: 9pt;
      color: #6b7280;
      margin-left: 8pt;
    }
    
    .template-version-entry__changes {
      list-style: none;
      margin-left: 12pt;
      font-size: 9pt;
      color: #374151;
    }
    
    .template-version-entry__changes li {
      margin-bottom: 2pt;
    }
    
    .template-version-entry__changes li:before {
      content: "•";
      margin-right: 8pt;
      color: #9ca3af;
    }
    
    /* Token placeholder for missing values */
    .token-missing {
      font-family: 'SF Mono', Monaco, 'Courier New', monospace;
      font-size: 10pt;
      color: #6b7280;
      background: rgba(107, 114, 128, 0.08);
      padding: 1pt 4pt;
      border-radius: 2pt;
      text-decoration: underline;
      text-decoration-style: dotted;
      text-decoration-color: #9ca3af;
    }
    
    /* Print styles */
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      
      .template-page {
        margin: 0;
        page-break-after: always;
      }
      
      .template-page:last-child {
        page-break-after: auto;
      }
      
      @page {
        size: letter;
        margin: 0;
      }
    }
    
    /* Screen-only styles (for preview) */
    @media screen {
      body {
        background: #f3f4f6;
        padding: 24pt 0;
      }
      
      .template-page {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 16pt;
      }
    }
  </style>
</head>
<body>
  ${bodyHtml}
</body>
</html>`;
}