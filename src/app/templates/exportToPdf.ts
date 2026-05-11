/**
 * Export Template to PDF
 * Uses browser's native print dialog to generate PDF
 */

import type { ComponentType } from 'react';
import { getTemplateHtml } from './renderTemplateToHtml';

/**
 * Export template to PDF via browser print dialog
 * Opens a new window with the rendered template and triggers print
 */
export function exportTemplateToPdf(
  TemplateComponent: ComponentType,
  values: Record<string, string>,
  templateSlug: string,
  templateVersion: string
): void {
  try {
    // Get HTML from the current rendered template
    const html = getTemplateHtml(true);
    
    // Create a blob with the HTML content
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Open in new window
    const printWindow = window.open(url, '_blank');
    
    if (!printWindow) {
      // Fallback: Create iframe for printing if popup is blocked
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);
      
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();
        
        // Wait for content to load, then print
        iframe.onload = () => {
          iframe.contentWindow?.focus();
          setTimeout(() => {
            iframe.contentWindow?.print();
            // Clean up after a delay
            setTimeout(() => {
              document.body.removeChild(iframe);
              URL.revokeObjectURL(url);
            }, 1000);
          }, 250);
        };
      }
      return;
    }
    
    // Wait for content to load, then trigger print
    printWindow.addEventListener('load', () => {
      printWindow.focus();
      
      // Small delay to ensure styles are applied
      setTimeout(() => {
        printWindow.print();
        
        // Clean up after print
        printWindow.addEventListener('afterprint', () => {
          URL.revokeObjectURL(url);
        });
      }, 250);
    });
  } catch (error) {
    console.error('PDF export error:', error);
    throw new Error('Failed to export PDF. Please try again.');
  }
}

/**
 * Generate a suggested filename for PDF export
 */
export function generatePdfFilename(
  templateSlug: string,
  templateVersion: string
): string {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return `guardrail-${templateSlug}-v${templateVersion}-${date}.pdf`;
}
