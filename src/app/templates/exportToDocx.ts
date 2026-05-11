/**
 * Export Template to DOCX
 * Generates real Office Open XML (.docx) files using the docx library
 * 
 * This implementation:
 * - Parses HTML from the rendered template preview
 * - Converts to proper DOCX elements (headings, paragraphs, lists, formatting)
 * - Generates a real .docx file that opens in Microsoft Word and Google Docs
 * - Handles Unicode correctly (no btoa/Latin1 issues)
 * - Downloads via Blob (not data URIs)
 */

import { Document, Packer, Paragraph, TextRun, AlignmentType, convertInchesToTwip } from 'docx';
import { saveAs } from 'file-saver';
import type { ComponentType } from 'react';
import { htmlToDocxParagraphs } from './htmlToDocx';
import { validateTokenReplacement } from './renderTemplateToHtml';

// ============================================================================
// MAIN EXPORT FUNCTION
// ============================================================================

/**
 * Export template to DOCX format
 * 
 * @param TemplateComponent - React component (kept for signature compatibility, not used)
 * @param values - Template values (kept for signature compatibility, tokens should already be populated)
 * @param templateSlug - Template identifier for filename
 * @param templateVersion - Template version for filename
 * @param templateTitle - Document title
 */
export async function exportTemplateToDocx(
  TemplateComponent: ComponentType,
  values: Record<string, string>,
  templateSlug: string,
  templateVersion: string,
  templateTitle: string
): Promise<void> {
  try {
    // Step 1: Get HTML from the rendered template preview
    const wrapper = document.querySelector('.template-preview-wrapper');
    
    if (!wrapper) {
      throw new Error(
        'Template preview not found. Please ensure the template is rendered before exporting.'
      );
    }
    
    const html = wrapper.innerHTML;
    
    if (!html || html.trim().length === 0) {
      throw new Error('Template preview is empty. Cannot export empty document.');
    }
    
    // Step 2: Validate that all tokens have been replaced
    validateTokenReplacement(html);
    
    // Step 3: Convert HTML to docx paragraphs
    const paragraphs = htmlToDocxParagraphs(html);
    
    if (paragraphs.length === 0) {
      throw new Error('No content to export. Template appears to be empty.');
    }
    
    // Step 4: Create the document
    const doc = new Document({
      creator: 'Guardrail HR',
      title: templateTitle,
      description: `Generated from template ${templateSlug} v${templateVersion}`,
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(0.75),
                right: convertInchesToTwip(1),
                bottom: convertInchesToTwip(0.75),
                left: convertInchesToTwip(1),
              },
            },
          },
          children: paragraphs,
        },
      ],
    });
    
    // Step 5: Generate the blob
    const blob = await Packer.toBlob(doc);
    
    // Step 6: Download with correct MIME type
    const filename = generateDocxFilename(templateSlug, templateVersion);
    saveAs(blob, filename);
    
  } catch (error) {
    console.error('DOCX export error:', error);
    
    // Provide helpful error messages
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Failed to export DOCX. Please try again.');
  }
}

/**
 * Generate a suggested filename for DOCX export
 * Format: guardrail-{slug}-v{version}-{YYYY-MM-DD}.docx
 */
export function generateDocxFilename(
  templateSlug: string,
  templateVersion: string
): string {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return `guardrail-${templateSlug}-v${templateVersion}-${date}.docx`;
}