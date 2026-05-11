/**
 * Document System Demo Page
 * Showcase for the DocumentPreviewFrame system with all three demo templates
 */

import React, { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import {
  DemoMealRestBreakPolicy,
  DemoTimekeepingPolicy,
  DemoIndependentContractorAgreement,
  DocumentDownloadActions,
} from '@/app/components/document-system';

type TemplateType = 'meal-rest-break' | 'timekeeping' | 'contractor-agreement';

const TEMPLATES = [
  {
    id: 'meal-rest-break' as TemplateType,
    title: 'Meal & Rest Break Policy',
    jurisdiction: 'California',
    docId: 'GR-WH-001',
    version: 'v2.1',
    reviewedDate: 'January 2026',
    totalPages: 3,
    description: 'California-compliant policy template with timing requirements and acknowledgment form',
  },
  {
    id: 'timekeeping' as TemplateType,
    title: 'Timekeeping Policy',
    jurisdiction: 'CA + Federal',
    docId: 'GR-WH-002',
    version: 'v1.8',
    reviewedDate: 'January 2026',
    totalPages: 3,
    description: 'Best practices for accurate time tracking and record retention requirements',
  },
  {
    id: 'contractor-agreement' as TemplateType,
    title: 'Independent Contractor Agreement',
    jurisdiction: 'California',
    docId: 'GR-IC-001',
    version: 'v1.3',
    reviewedDate: 'January 2026',
    totalPages: 3,
    description: 'ABC test-compliant agreement template with proper classification factors',
  },
];

export function DocumentSystemDemo() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('meal-rest-break');
  const [paperSize, setPaperSize] = useState<'us-letter' | 'a4'>('us-letter');

  const currentTemplate = TEMPLATES.find((t) => t.id === selectedTemplate);

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'meal-rest-break':
        return <DemoMealRestBreakPolicy />;
      case 'timekeeping':
        return <DemoTimekeepingPolicy />;
      case 'contractor-agreement':
        return <DemoIndependentContractorAgreement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      {/* Header - no print */}
      <div className="print:hidden sticky top-0 z-40 bg-theme-bg/95 backdrop-blur-xl border-b border-theme-border-1">
        <div className="max-w-[1440px] mx-auto px-6 xl:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to home
                </Link>
              </div>

              {currentTemplate && (
                <DocumentDownloadActions
                  metadata={{
                    title: currentTemplate.title,
                    docId: currentTemplate.docId,
                    version: currentTemplate.version,
                    jurisdiction: currentTemplate.jurisdiction,
                    reviewedDate: currentTemplate.reviewedDate,
                    totalPages: currentTemplate.totalPages,
                  }}
                />
              )}
            </div>

            {/* Paper Size Toggle */}
            <div className="flex items-center gap-4">
              <span className="text-[13px] text-theme-text-3">Paper size:</span>
              <div className="flex items-center gap-1 bg-theme-surface-1 border border-theme-border-1 rounded-lg p-1">
                <button
                  onClick={() => setPaperSize('us-letter')}
                  className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                    paperSize === 'us-letter'
                      ? 'bg-theme-bg text-theme-text-1 shadow-theme-1'
                      : 'text-theme-text-3 hover:text-theme-text-1'
                  }`}
                >
                  US Letter
                </button>
                <button
                  onClick={() => setPaperSize('a4')}
                  className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                    paperSize === 'a4'
                      ? 'bg-theme-bg text-theme-text-1 shadow-theme-1'
                      : 'text-theme-text-3 hover:text-theme-text-1'
                  }`}
                >
                  A4
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Selector - no print */}
      <div className="print:hidden">
        <div className="max-w-[1440px] mx-auto px-6 xl:px-8">
          <div className="py-8">
            <h1 className="text-[24px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-2">
              Document System Demo
            </h1>
            <p className="text-[14px] text-theme-text-3 mb-6 max-w-[640px]">
              Production-ready document templates with 1-inch margins, standardized headers/footers, and premium print
              CSS. Select a template below to preview.
            </p>

            <div className="flex flex-wrap gap-3">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`px-4 py-2.5 rounded-xl border text-[14px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
                    selectedTemplate === template.id
                      ? 'bg-theme-surface-1 border-theme-border-1 text-theme-text-1 shadow-theme-1'
                      : 'bg-theme-surface-2 border-theme-border-2 text-theme-text-3 hover:text-theme-text-1 hover:border-theme-border-1'
                  }`}
                >
                  <div className="text-left">
                    <div>{template.title}</div>
                    <div className="text-[11px] text-theme-text-3 mt-0.5">
                      {template.jurisdiction} • {template.version}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Template Content */}
      <div className={`pb-24 print:pb-0 ${paperSize === 'a4' ? 'paper-a4' : ''}`}>
        <div className="flex justify-center print:block print:max-w-none">
          <div className="w-full max-w-[840px]">{renderTemplate()}</div>
        </div>
      </div>

      {/* Footer notice - no print */}
      <div className="print:hidden fixed bottom-0 left-0 right-0 bg-theme-surface-1 border-t border-theme-border-1 py-3 z-30">
        <div className="max-w-[1440px] mx-auto px-6 xl:px-8">
          <p className="text-[12px] text-theme-text-3 text-center">
            Preview mode • Tokens like{' '}
            <span className="text-theme-accent font-mono">[COMPANY_NAME]</span> are placeholders for
            customization • Print-optimized with proper page breaks
          </p>
        </div>
      </div>
    </div>
  );
}
