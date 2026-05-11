/**
 * Template Preview Wrapper
 * Renders template components with token replacement via context
 */

import React, { createContext, useContext } from 'react';
import type { ComponentType } from 'react';

// ============================================================================
// TOKEN CONTEXT
// ============================================================================

interface TokenContextValue {
  values: Record<string, string>;
}

const TokenContext = createContext<TokenContextValue>({ values: {} });

/**
 * Hook to access token values in template components
 */
export function useTokenValue(tokenName: string): string {
  const { values } = useContext(TokenContext);
  const value = values[tokenName];
  
  if (value && value.trim()) {
    return value;
  }
  
  // Return placeholder for missing values
  return `[[${tokenName}]]`;
}

// ============================================================================
// TEMPLATE PREVIEW WRAPPER
// ============================================================================

interface TemplatePreviewWrapperProps {
  Component: ComponentType;
  values: Record<string, string>;
}

/**
 * Wrapper that provides token values to template component via context
 */
export function TemplatePreviewWrapper({
  Component,
  values,
}: TemplatePreviewWrapperProps) {
  return (
    <TokenContext.Provider value={{ values }}>
      <div className="template-preview-wrapper">
        <Component />
      </div>
    </TokenContext.Provider>
  );
}

// ============================================================================
// TOKEN REPLACEMENT FOR EXPORTS
// ============================================================================

/**
 * Replace tokens in HTML string for export purposes
 * This is used when exporting to PDF/DOCX
 */
export function replaceTokensInHtml(
  html: string,
  values: Record<string, string>
): string {
  // Replace all {{TOKEN}} occurrences
  return html.replace(/\{\{([A-Z_]+)\}\}|\[\[([A-Z_]+)\]\]/g, (match, token1, token2) => {
    const tokenName = token1 || token2;
    const value = values[tokenName];
    
    if (value && value.trim()) {
      // Escape HTML entities in user input
      return escapeHtml(value);
    }
    
    // Missing value - show placeholder
    return `<span class="token-missing" data-token="${tokenName}">[[${tokenName}]]</span>`;
  });
}

/**
 * Escape HTML entities to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
