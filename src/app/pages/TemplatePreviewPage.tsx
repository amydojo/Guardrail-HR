/**
 * Template Preview Page
 * View and download Guardrail HR premium legal templates
 */

import { useState } from 'react';
import { MealRestBreakPolicy } from '@/app/components/templates/MealRestBreakPolicy';
import { TimekeepingPolicy } from '@/app/components/templates/TimekeepingPolicy';
import { IndependentContractorAgreement } from '@/app/components/templates/IndependentContractorAgreement';
import { TemplateSpecPage } from '@/app/components/templates/TemplateSpecPage';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { Link } from 'react-router';

type TemplateType = 'meal-rest-break' | 'timekeeping' | 'contractor-agreement';
type ViewMode = 'preview' | 'spec';

const TEMPLATES = [
  {
    id: 'meal-rest-break' as TemplateType,
    title: 'Meal & rest break policy',
    jurisdiction: 'California',
    version: '2.1',
    description: 'California-compliant policy template with timing requirements and acknowledgment form',
  },
  {
    id: 'timekeeping' as TemplateType,
    title: 'Timekeeping policy',
    jurisdiction: 'CA + Federal',
    version: '2.0',
    description: 'Best practices for accurate time tracking and record retention requirements',
  },
  {
    id: 'contractor-agreement' as TemplateType,
    title: 'Independent contractor agreement',
    jurisdiction: 'California',
    version: '1.8',
    description: 'ABC test-compliant agreement template with proper classification factors',
  },
];

export function TemplatePreviewPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('meal-rest-break');
  const [viewMode, setViewMode] = useState<ViewMode>('preview');

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In production, this would trigger PDF generation
    alert('Template download would start here. In production, this generates a PDF.');
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'meal-rest-break':
        return <MealRestBreakPolicy />;
      case 'timekeeping':
        return <TimekeepingPolicy />;
      case 'contractor-agreement':
        return <IndependentContractorAgreement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      {/* Header - no print */}
      <div className="print:hidden sticky top-0 z-40 bg-theme-bg/95 backdrop-blur-xl border-b border-theme-border-1">
        <div className="max-w-[1440px] mx-auto px-6 xl:px-8">
          <div className="py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                to="/resources?tab=templates"
                className="inline-flex items-center gap-2 text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to templates
              </Link>
              
              {/* View Mode Switcher */}
              <div className="ml-4 flex items-center gap-1 bg-theme-surface-1 border border-theme-border-1 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                    viewMode === 'preview'
                      ? 'bg-theme-bg text-theme-text-1 shadow-theme-1'
                      : 'text-theme-text-3 hover:text-theme-text-1'
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setViewMode('spec')}
                  className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                    viewMode === 'spec'
                      ? 'bg-theme-bg text-theme-text-1 shadow-theme-1'
                      : 'text-theme-text-3 hover:text-theme-text-1'
                  }`}
                >
                  Spec + Mockups
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-theme-border-1 bg-theme-surface-1 text-[14px] font-medium text-theme-text-1 hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-accent text-white text-[14px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 shadow-theme-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Template Selector - no print */}
      {viewMode === 'preview' && (
        <div className="print:hidden">
          <div className="max-w-[1440px] mx-auto px-6 xl:px-8">
            <div className="py-8">
              <h1 className="text-[24px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-6">
                Template preview
              </h1>
              <div className="flex flex-wrap gap-3">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`px-4 py-2.5 rounded-xl border text-[14px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
                      selectedTemplate === template.id
                        ? 'bg-theme-surface-1 border-theme-border-1 text-theme-text-1'
                        : 'bg-theme-surface-2 border-theme-border-2 text-theme-text-3 hover:text-theme-text-1 hover:border-theme-border-1'
                    }`}
                  >
                    <div className="text-left">
                      <div>{template.title}</div>
                      <div className="text-[11px] text-theme-text-3 mt-0.5">
                        {template.jurisdiction} • v{template.version}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Content */}
      <div className="pb-24 print:pb-0">
        <div className="flex justify-center print:block print:max-w-none">
          {viewMode === 'preview' ? renderTemplate() : <TemplateSpecPage />}
        </div>
      </div>

      {/* Footer notice - no print */}
      <div className="print:hidden fixed bottom-0 left-0 right-0 bg-theme-surface-1 border-t border-theme-border-1 py-3 z-30">
        <div className="max-w-[1440px] mx-auto px-6 xl:px-8">
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-theme-text-3">
              Preview mode • Tokens like <span className="text-theme-accent font-mono">{'{{COMPANY_NAME}}'}</span> are
              placeholders for customization
            </p>
            <Link
              to="/document-system-demo"
              className="text-[12px] text-theme-accent hover:text-theme-accent-hover transition-colors font-medium"
            >
              View Document System Demo →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}