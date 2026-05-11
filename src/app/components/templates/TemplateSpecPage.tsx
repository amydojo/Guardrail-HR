/**
 * Templates — Spec + Mockups
 * Premium information architecture page for template design system
 * Apple/Linear aesthetic with clean hierarchy
 */

import React from 'react';

export function TemplateSpecPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f]">
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-[32px] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] tracking-tight mb-3">
            Templates — Spec + Mockups
          </h1>
          <p className="text-[15px] text-[#737373] dark:text-[#a3a3a3] leading-relaxed max-w-[640px]">
            Production-ready design system for Guardrail HR legal templates. Premium compliance documentation
            with Apple/Linear-caliber precision and restraint.
          </p>
        </div>

        {/* Section 1: Typography Scale */}
        <section className="mb-24">
          <h2 className="text-[20px] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] tracking-tight mb-8">
            Typography scale
          </h2>
          
          <div className="grid grid-cols-12 gap-8">
            {/* Left: Spec Tokens */}
            <div className="col-span-5">
              <div className="bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-[16px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <TypeToken name="Doc Title" size="24pt" weight="600" lineHeight="1.2" tracking="-0.02em" />
                <TypeToken name="H1" size="18pt" weight="600" lineHeight="1.3" tracking="-0.015em" />
                <TypeToken name="H2" size="14pt" weight="600" lineHeight="1.4" tracking="-0.01em" />
                <TypeToken name="H3" size="12pt" weight="600" lineHeight="1.4" tracking="0" />
                <TypeToken name="Body" size="11.5pt" weight="400" lineHeight="1.5" tracking="0" />
                <TypeToken name="Meta" size="9pt" weight="400" lineHeight="1.4" tracking="0.01em" uppercase />
                <TypeToken name="Field Label" size="10pt" weight="500" lineHeight="1.4" tracking="0.005em" />
                <TypeToken name="Field Value" size="11.5pt" weight="400" lineHeight="1.5" tracking="0" />
                <TypeToken name="Callout" size="10pt" weight="400" lineHeight="1.6" tracking="0" />
                <TypeToken name="Footer" size="9pt" weight="400" lineHeight="1.4" tracking="0" last />
              </div>
            </div>

            {/* Right: Live Examples */}
            <div className="col-span-7">
              <div className="bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-[16px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="space-y-6">
                  <div>
                    <div className="text-[9px] text-[#737373] dark:text-[#a3a3a3] uppercase tracking-wider mb-2">Doc Title</div>
                    <h1 className="text-[24pt] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] tracking-[-0.02em] leading-[1.2]">
                      Independent Contractor Agreement
                    </h1>
                  </div>
                  <div>
                    <div className="text-[9px] text-[#737373] dark:text-[#a3a3a3] uppercase tracking-wider mb-2">H1</div>
                    <h2 className="text-[18pt] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] tracking-[-0.015em] leading-[1.3]">
                      1. Services & Scope of Work
                    </h2>
                  </div>
                  <div>
                    <div className="text-[9px] text-[#737373] dark:text-[#a3a3a3] uppercase tracking-wider mb-2">Body</div>
                    <p className="text-[11.5pt] font-normal text-[#2d2d2d] dark:text-[#e0e0e0] leading-[1.5]">
                      This agreement establishes the terms under which Contractor will provide services to Company.
                      All work shall be performed as an independent business with full control over methods and schedule.
                    </p>
                  </div>
                  <div>
                    <div className="text-[9px] text-[#737373] dark:text-[#a3a3a3] uppercase tracking-wider mb-2">Field Pair</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0] tracking-[0.005em]">Effective Date:</span>
                      <span className="text-[11.5pt] font-normal text-[#5b6ff5] dark:text-[#7b8fff]">[EFFECTIVE_DATE]</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Document Layout Rules */}
        <section className="mb-24">
          <h2 className="text-[20px] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] tracking-tight mb-8">
            Document layout rules
          </h2>
          
          <div className="grid grid-cols-12 gap-8">
            {/* Left: Layout Specs */}
            <div className="col-span-5">
              <div className="bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-[16px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="space-y-6">
                  <LayoutRule label="Page margins" value="1 inch (72pt) all sides" />
                  <LayoutRule label="Header layout" value="Left: 'Guardrail HR' • Right: 'Doc ID • Version'" />
                  <LayoutRule label="Footer layout" value="Left: 'Reviewed Month YYYY' • Right: 'Page X of Y'" />
                  <LayoutRule label="Token format" value="Bracket tokens: [COMPANY_NAME], [EFFECTIVE_DATE]" />
                  <LayoutRule label="Signature style" value="Single lines only, no tables" />
                  <LayoutRule label="Safe zones" value="Content: 6.5 × 9 in (US Letter)" last />
                </div>
              </div>
            </div>

            {/* Right: Visual Diagram */}
            <div className="col-span-7">
              <div className="bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-[16px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="aspect-[8.5/11] max-w-[280px] mx-auto relative bg-white dark:bg-[#0f0f0f] border-2 border-[#e5e5e5] dark:border-[#2d2d2d] rounded-[4px]">
                  {/* 1-inch margin guides */}
                  <div className="absolute inset-0 border-[12px] border-dashed border-[#5b6ff5]/30 dark:border-[#7b8fff]/30 pointer-events-none" />
                  
                  {/* Header zone */}
                  <div className="absolute top-[12px] left-[12px] right-[12px] h-[16px] bg-[#5b6ff5]/10 dark:bg-[#7b8fff]/10 rounded-[2px] flex items-center justify-between px-2">
                    <span className="text-[6px] text-[#5b6ff5] dark:text-[#7b8fff]">Header</span>
                    <span className="text-[6px] text-[#5b6ff5] dark:text-[#7b8fff]">48px</span>
                  </div>
                  
                  {/* Content zone */}
                  <div className="absolute top-[40px] left-[12px] right-[12px] bottom-[40px] bg-[#f9fafb] dark:bg-[#1a1a1a] rounded-[2px] flex items-center justify-center">
                    <span className="text-[8px] text-[#737373] dark:text-[#a3a3a3]">Content area<br/>6.5 × 9 in</span>
                  </div>
                  
                  {/* Footer zone */}
                  <div className="absolute bottom-[12px] left-[12px] right-[12px] h-[16px] bg-[#5b6ff5]/10 dark:bg-[#7b8fff]/10 rounded-[2px] flex items-center justify-between px-2">
                    <span className="text-[6px] text-[#5b6ff5] dark:text-[#7b8fff]">Footer</span>
                    <span className="text-[6px] text-[#5b6ff5] dark:text-[#7b8fff]">40px</span>
                  </div>
                  
                  {/* Margin labels */}
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2">
                    <span className="text-[8px] text-[#737373] dark:text-[#a3a3a3] rotate-[-90deg] inline-block">1"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Component Library */}
        <section className="mb-24">
          <h2 className="text-[20px] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] tracking-tight mb-8">
            Document primitives
          </h2>
          
          <div className="space-y-4">
            {/* Header Band */}
            <ComponentPrimitive
              name="Header band"
              spacing="48px height, 12px padding"
              usage="Appears on every page, contains Guardrail HR branding and page info"
            >
              <div className="flex items-center justify-between py-3 px-4 border-b border-[#e5e5e5] dark:border-[#2d2d2d]">
                <span className="text-[9pt] text-[#737373] dark:text-[#a3a3a3]">Guardrail HR</span>
                <span className="text-[9pt] text-[#737373] dark:text-[#a3a3a3]">Page 1 of 3</span>
              </div>
            </ComponentPrimitive>

            {/* Footer Band */}
            <ComponentPrimitive
              name="Footer band"
              spacing="40px height, 10px padding"
              usage="Appears on every page, contains review date and pagination"
            >
              <div className="flex items-center justify-between py-2.5 px-4 border-t border-[#e5e5e5] dark:border-[#2d2d2d]">
                <span className="text-[9pt] text-[#737373] dark:text-[#a3a3a3]">Reviewed January 2026</span>
                <span className="text-[9pt] text-[#737373] dark:text-[#a3a3a3]">GR-WH-001 • v2.1</span>
              </div>
            </ComponentPrimitive>

            {/* Section Header */}
            <ComponentPrimitive
              name="Section header"
              spacing="32px margin-top, 16px margin-bottom"
              usage="Major section divider with optional rule below"
            >
              <div className="px-4 py-3">
                <h3 className="text-[18pt] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] tracking-[-0.015em] leading-[1.3]">
                  1. Policy Statement
                </h3>
                <div className="mt-2 h-[0.5px] bg-[#e5e5e5] dark:bg-[#2d2d2d]" />
              </div>
            </ComponentPrimitive>

            {/* Callout Box */}
            <ComponentPrimitive
              name="Callout box"
              spacing="16px padding, 16px margin"
              usage="Important notices, disclaimers, or legal highlights"
            >
              <div className="px-4 py-3">
                <div className="bg-[#f9fafb] dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2d2d2d] border-l-[3px] border-l-[#5b6ff5] dark:border-l-[#7b8fff] rounded-[8px] p-4">
                  <div className="text-[10pt] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] mb-1.5">Important</div>
                  <p className="text-[10pt] text-[#2d2d2d] dark:text-[#e0e0e0] leading-[1.6]">
                    This policy applies to all non-exempt employees working in California.
                  </p>
                </div>
              </div>
            </ComponentPrimitive>

            {/* Field Pair */}
            <ComponentPrimitive
              name="Field pair"
              spacing="12px vertical spacing between pairs"
              usage="Editable fields for user customization with token placeholders"
            >
              <div className="px-4 py-3 space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0]">Company Name:</span>
                  <span className="text-[11.5pt] text-[#5b6ff5] dark:text-[#7b8fff] font-mono">[COMPANY_NAME]</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0]">Effective Date:</span>
                  <span className="text-[11.5pt] text-[#5b6ff5] dark:text-[#7b8fff] font-mono">[EFFECTIVE_DATE]</span>
                </div>
              </div>
            </ComponentPrimitive>

            {/* Checklist */}
            <ComponentPrimitive
              name="Checklist"
              spacing="12px vertical spacing between items"
              usage="Acknowledgment lists, compliance checklists, or requirement tracking"
            >
              <div className="px-4 py-3 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[12pt] text-[#737373] dark:text-[#a3a3a3]">☐</span>
                  <span className="text-[11.5pt] text-[#2d2d2d] dark:text-[#e0e0e0] leading-[1.5]">
                    Schedule work to allow employees to take all required breaks
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[12pt] text-[#737373] dark:text-[#a3a3a3]">☐</span>
                  <span className="text-[11.5pt] text-[#2d2d2d] dark:text-[#e0e0e0] leading-[1.5]">
                    Never pressure or encourage employees to skip breaks
                  </span>
                </div>
              </div>
            </ComponentPrimitive>

            {/* Signature Block */}
            <ComponentPrimitive
              name="Signature block"
              spacing="24px between signature pairs, 32px margin-top"
              usage="Attestation and acknowledgment — no tables, lines only"
            >
              <div className="px-4 py-3 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <span className="text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0]">Employee Signature:</span>
                      <div className="mt-1 border-b border-[#d4d4d4] dark:border-[#404040] w-full h-[24px]" />
                    </div>
                    <div className="w-[120px]">
                      <span className="text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0]">Date:</span>
                      <div className="mt-1 border-b border-[#d4d4d4] dark:border-[#404040] w-full h-[24px]" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0]">Printed Name:</span>
                    <span className="text-[11.5pt] text-[#5b6ff5] dark:text-[#7b8fff] font-mono">[EMPLOYEE_NAME]</span>
                  </div>
                </div>
              </div>
            </ComponentPrimitive>
          </div>
        </section>

        {/* Section 4: Paper Frames */}
        <section className="mb-24">
          <h2 className="text-[20px] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] tracking-tight mb-8">
            Paper formats
          </h2>
          
          <div className="grid grid-cols-2 gap-8">
            <PaperFrame title="US Letter" dimensions="8.5 × 11 in" contentArea="6.5 × 9 in" />
            <PaperFrame title="A4" dimensions="210 × 297 mm" contentArea="165 × 247 mm" />
          </div>
        </section>

        {/* Section 5: Template Mockups */}
        <section className="mb-24">
          <h2 className="text-[20px] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] tracking-tight mb-8">
            Template mockups
          </h2>
          
          <div className="space-y-16">
            <TemplateMockup
              title="Meal & Rest Break Policy"
              jurisdiction="California"
              docId="GR-WH-001"
              version="v2.1"
              reviewed="Jan 2026"
              pages={3}
            />
            
            <TemplateMockup
              title="Timekeeping Policy"
              jurisdiction="CA + Federal"
              docId="GR-WH-002"
              version="v1.8"
              reviewed="Jan 2026"
              pages={3}
            />
            
            <TemplateMockup
              title="Independent Contractor Agreement"
              jurisdiction="California"
              docId="GR-IC-001"
              version="v1.3"
              reviewed="Jan 2026"
              pages={3}
            />
          </div>
        </section>

        {/* Section 6: Export Notes */}
        <section className="mb-16">
          <h2 className="text-[20px] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] tracking-tight mb-8">
            Export notes
          </h2>
          
          <div className="bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-[16px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="space-y-4">
              <ExportNote
                label="DOCX + Google Docs compatibility"
                value="Layout must survive conversion to Word format with proper spacing and formatting preserved"
              />
              <ExportNote
                label="Avoid layout breaks"
                value="No widows/orphans, nested tables, manual spacing, or inconsistent list indents"
              />
              <ExportNote
                label="Callout structure"
                value="Keep callouts as single-container blocks to prevent breaking across pages"
              />
              <ExportNote
                label="Print optimization"
                value="All templates must render cleanly via window.print() with proper page breaks and margins"
                last
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Helper Components

function TypeToken({ 
  name, 
  size, 
  weight, 
  lineHeight, 
  tracking, 
  uppercase = false,
  last = false 
}: { 
  name: string; 
  size: string; 
  weight: string; 
  lineHeight: string; 
  tracking: string;
  uppercase?: boolean;
  last?: boolean;
}) {
  return (
    <div className={`pb-4 ${!last ? 'mb-4 border-b border-[#f0f0f0] dark:border-[#262626]' : ''}`}>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[12px] font-medium text-[#1a1a1a] dark:text-[#f5f5f5]">{name}</span>
        <span className="text-[11px] text-[#737373] dark:text-[#a3a3a3] font-mono">{size}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-[10px] text-[#737373] dark:text-[#a3a3a3]">
        <div>Weight: {weight}</div>
        <div>LH: {lineHeight}</div>
        <div>Track: {tracking}</div>
      </div>
      {uppercase && <div className="text-[9px] text-[#5b6ff5] dark:text-[#7b8fff] mt-1">UPPERCASE</div>}
    </div>
  );
}

function LayoutRule({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`${!last ? 'pb-4 mb-4 border-b border-[#f0f0f0] dark:border-[#262626]' : ''}`}>
      <div className="text-[11px] font-medium text-[#1a1a1a] dark:text-[#f5f5f5] mb-1">{label}</div>
      <div className="text-[12px] text-[#737373] dark:text-[#a3a3a3] leading-relaxed">{value}</div>
    </div>
  );
}

function ComponentPrimitive({ 
  name, 
  spacing, 
  usage, 
  children 
}: { 
  name: string; 
  spacing: string; 
  usage: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-[16px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="p-6 border-b border-[#e5e5e5] dark:border-[#2d2d2d]">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-[14px] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5]">{name}</h4>
          <span className="text-[10px] text-[#737373] dark:text-[#a3a3a3] font-mono">{spacing}</span>
        </div>
        <p className="text-[12px] text-[#737373] dark:text-[#a3a3a3] leading-relaxed">{usage}</p>
      </div>
      <div className="bg-[#fafafa] dark:bg-[#0f0f0f]">
        {children}
      </div>
    </div>
  );
}

function PaperFrame({ title, dimensions, contentArea }: { title: string; dimensions: string; contentArea: string }) {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-[16px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="mb-4">
        <h4 className="text-[14px] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] mb-1">{title}</h4>
        <div className="text-[11px] text-[#737373] dark:text-[#a3a3a3]">
          {dimensions} • Content: {contentArea}
        </div>
      </div>
      <div className={`${title === 'US Letter' ? 'aspect-[8.5/11]' : 'aspect-[210/297]'} bg-white dark:bg-[#0f0f0f] border-2 border-[#e5e5e5] dark:border-[#2d2d2d] rounded-[4px] relative`}>
        <div className="absolute inset-[16px] border border-dashed border-[#5b6ff5]/30 dark:border-[#7b8fff]/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] text-[#737373] dark:text-[#a3a3a3]">1" margins</span>
        </div>
      </div>
    </div>
  );
}

function TemplateMockup({ 
  title, 
  jurisdiction, 
  docId, 
  version, 
  reviewed, 
  pages 
}: { 
  title: string; 
  jurisdiction: string; 
  docId: string; 
  version: string; 
  reviewed: string; 
  pages: number;
}) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-[16px] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] mb-2">{title}</h3>
        <div className="flex items-center gap-3 text-[12px] text-[#737373] dark:text-[#a3a3a3]">
          <span className="px-3 py-1 bg-[#f5f5f5] dark:bg-[#262626] rounded-full">{jurisdiction}</span>
          <span>{docId} • {version}</span>
          <span>Reviewed: {reviewed}</span>
        </div>
      </div>
      
      {/* 3-page stack with offset */}
      <div className="relative max-w-[680px]">
        {/* Page 3 (back) */}
        <div className="absolute top-[20px] left-[20px] right-[-20px] aspect-[8.5/11] bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]" />
        
        {/* Page 2 (middle) */}
        <div className="absolute top-[10px] left-[10px] right-[-10px] aspect-[8.5/11] bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]" />
        
        {/* Page 1 (front - fully visible) */}
        <div className="relative aspect-[8.5/11] bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#e5e5e5] dark:border-[#2d2d2d]">
            <span className="text-[9pt] text-[#737373] dark:text-[#a3a3a3]">Guardrail HR</span>
            <span className="text-[9pt] text-[#737373] dark:text-[#a3a3a3]">Page 1 of {pages}</span>
          </div>
          
          {/* Content */}
          <div className="px-12 py-16">
            {/* Cover style */}
            <div className="text-center">
              <h1 className="text-[24pt] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] tracking-[-0.02em] leading-[1.2] mb-6">
                {title}
              </h1>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="px-3 py-1.5 bg-[#f5f5f5] dark:bg-[#262626] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-full text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0]">
                  {jurisdiction}
                </span>
                <span className="px-3 py-1.5 bg-[#f5f5f5] dark:bg-[#262626] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-full text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0]">
                  {version}
                </span>
                <span className="px-3 py-1.5 bg-[#f5f5f5] dark:bg-[#262626] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-full text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0]">
                  Policy
                </span>
                <span className="px-3 py-1.5 bg-[#f5f5f5] dark:bg-[#262626] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-full text-[10pt] font-medium text-[#2d2d2d] dark:text-[#e0e0e0]">
                  Reviewed {reviewed}
                </span>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-2.5 border-t border-[#e5e5e5] dark:border-[#2d2d2d]">
            <span className="text-[9pt] text-[#737373] dark:text-[#a3a3a3]">{title} • {version}</span>
            <span className="text-[9pt] text-[#737373] dark:text-[#a3a3a3]">Reviewed {reviewed}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExportNote({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`${!last ? 'pb-4 mb-4 border-b border-[#f0f0f0] dark:border-[#262626]' : ''}`}>
      <div className="text-[12px] font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] mb-1.5">{label}</div>
      <div className="text-[13px] text-[#737373] dark:text-[#a3a3a3] leading-relaxed">{value}</div>
    </div>
  );
}
