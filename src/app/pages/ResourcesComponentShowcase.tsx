import { useState } from 'react';
import { FilterPill, ResetFilterButton } from '@/app/components/resources/FilterPill';
import { ResourceCard } from '@/app/components/resources/ResourceCard';
import { CollapsibleSection } from '@/app/components/resources/CollapsibleSection';
import { BackToTop } from '@/app/components/resources/BackToTop';

export function ResourcesComponentShowcase() {
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [topicFilters, setTopicFilters] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12">
      <div className="mx-auto max-w-[1200px] px-5 xl:px-8">
        <h1 className="text-[48px] font-semibold mb-3 tracking-tight">
          Resources Components
        </h1>
        <p className="text-[17px] text-gray-500 mb-16">
          Reusable components for Apple-caliber Resources Hub and Detail pages
        </p>

        {/* Filter Pills */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-4">Filter Pills</h2>
          <p className="text-[15px] text-gray-500 mb-8">
            Interactive dropdown filters with multi-select support, active states, and reset functionality
          </p>
          
          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-8 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <FilterPill
                label="Type"
                options={['Checklist', 'Template', 'Guide', 'Policy', 'Calculator']}
                selected={typeFilters}
                onChange={setTypeFilters}
              />
              <FilterPill
                label="Topic"
                options={['Pay', 'Overtime', 'Breaks', 'Timekeeping']}
                selected={topicFilters}
                onChange={setTopicFilters}
              />
              <FilterPill
                label="Stage"
                options={['Prevent', 'Fix', 'Audit', 'Train']}
                selected={[]}
                onChange={() => {}}
              />
              <ResetFilterButton
                onClick={() => {
                  setTypeFilters([]);
                  setTopicFilters([]);
                }}
                disabled={typeFilters.length === 0 && topicFilters.length === 0}
              />
            </div>
          </div>

          <div className="space-y-3 text-[14px] text-gray-400">
            <p><strong>States:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Default: Subtle border, gray text</li>
              <li>Active: Blue accent background with counter badge</li>
              <li>Hover: Lighter background</li>
              <li>Open: Dropdown with checkmarks for selected items</li>
              <li>Focus: Accessible focus ring</li>
            </ul>
          </div>
        </section>

        {/* Resource Cards */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-4">Resource Cards</h2>
          <p className="text-[15px] text-gray-500 mb-8">
            Topic cards with icon tiles, status labels, metadata, and "Read more" links
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
            <ResourceCard
              slug="exemption-checklist"
              title="Exemption checklist"
              description="Step-by-step verification for exempt employee classification documentation"
              type="checklist"
              status="updated"
              readTime="6 min"
              format="PDF"
            />
            <ResourceCard
              slug="meal-rest-breaks"
              title="Meal & rest breaks policy"
              description="California meal and rest break requirements with timing rules"
              type="policy"
              status="new"
              readTime="7 min"
              format="DOC"
            />
            <ResourceCard
              slug="overtime-calculator"
              title="Overtime calculator"
              description="Calculate daily, weekly, and double-time overtime"
              type="calculator"
              readTime="4 min"
              format="XLS"
            />
          </div>

          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-6 mb-6">
            <h3 className="text-[19px] font-semibold mb-4">Featured Variant (larger)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ResourceCard
                slug="wage-statement-guide"
                title="Wage statement requirements"
                description="Complete list of required fields and common compliance errors to avoid on paystubs"
                type="guide"
                readTime="5 min"
                format="PDF"
                featured
              />
              <ResourceCard
                slug="contractor-documentation"
                title="Contractor documentation checklist"
                description="Key elements for compliant independent contractor agreements and ABC test verification"
                type="checklist"
                readTime="6 min"
                format="PDF"
                featured
              />
            </div>
          </div>

          <div className="space-y-3 text-[14px] text-gray-400">
            <p><strong>Features:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Icon tile with type-specific icon in blue accent color</li>
              <li>Optional status label (Updated/New) in top-right</li>
              <li>Title (1-2 lines with line-clamp)</li>
              <li>Description (1 line for regular, 2 lines for featured)</li>
              <li>"Read more" link with arrow that shifts on hover</li>
              <li>Metadata chips (read time, format)</li>
              <li>Hover: 2px lift, brighter border, shadow</li>
              <li>Focus: Accessible ring</li>
              <li>Active/Pressed: Reduced lift, darker background</li>
            </ul>
          </div>
        </section>

        {/* Collapsible Sections */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-4">Collapsible Sections</h2>
          <p className="text-[15px] text-gray-500 mb-8">
            Expandable content sections with effort tags and smooth animations
          </p>

          <div className="space-y-4 mb-6">
            <CollapsibleSection
              title="Salary basis test"
              summary="Verify minimum salary threshold and payment consistency requirements"
              effort="low"
              defaultOpen
            >
              <p>
                <strong>California minimum:</strong> $66,560 per year ($5,546.67/month, $1,280/week).
                Computer software employees have a separate test.
              </p>
              <p>
                <strong>Federal minimum:</strong> $43,888 per year ($844/week). Use the higher of CA or federal thresholds.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Employee's actual annual salary meets or exceeds threshold</li>
                <li>Salary is predetermined and not subject to reduction</li>
                <li>No improper deductions have been made</li>
              </ul>
            </CollapsibleSection>

            <CollapsibleSection
              title="Duties test"
              summary="Confirm primary duties meet executive, administrative, or professional criteria"
              effort="medium"
            >
              <p>
                The employee must spend more than 50% of their work time performing exempt duties.
                California applies a stricter quantitative test than federal law.
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="Red flags"
              summary="Common misclassification indicators and high-risk scenarios"
              effort="high"
            >
              <p>Watch for these common misclassification indicators:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Title doesn't match duties</li>
                <li>Performing same work as non-exempt employees</li>
                <li>Little discretion in decision-making</li>
              </ul>
            </CollapsibleSection>
          </div>

          <div className="space-y-3 text-[14px] text-gray-400">
            <p><strong>Features:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Header with title and one-line summary</li>
              <li>Optional effort tag (Low/Medium/High) with color coding</li>
              <li>Chevron icon rotates on expand/collapse</li>
              <li>Smooth height animation (200ms)</li>
              <li>Hover state on header</li>
              <li>Focus ring for keyboard accessibility</li>
              <li>Can be set to default open</li>
            </ul>
          </div>
        </section>

        {/* Breadcrumbs & Links */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-4">Navigation Elements</h2>
          <p className="text-[15px] text-gray-500 mb-8">
            Breadcrumbs, back links, and "Go deeper" related resource rows
          </p>

          <div className="space-y-6">
            {/* Breadcrumb example */}
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-6">
              <p className="text-[13px] text-gray-600 mb-3">Breadcrumb (back link):</p>
              <button className="inline-flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-300 transition-colors">
                <span>←</span>
                Back to resources
              </button>
            </div>

            {/* Context banner */}
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-4 flex items-center justify-between">
              <span className="text-[13px] text-gray-500">From wage & hour results</span>
              <button className="inline-flex items-center gap-2 text-[13px] text-[#5b6ff5] hover:underline font-medium">
                <span>←</span>
                Back to results
              </button>
            </div>

            {/* Go deeper links */}
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50">
              <p className="text-[13px] text-gray-600 p-6 pb-4">Related resource rows ("Go deeper"):</p>
              <div className="divide-y divide-gray-900/50">
                <div className="flex items-center justify-between p-6 hover:bg-[#1a1a1a] transition-colors group">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#5b6ff5]/10 rounded-[10px] border border-[#5b6ff5]/20">
                      <span className="text-[#5b6ff5]">📄</span>
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold mb-1 group-hover:text-[#5b6ff5] transition-colors">
                        Wage statement requirements
                      </h3>
                      <p className="text-[13px] text-gray-500">Complete list of required paystub fields</p>
                    </div>
                  </div>
                  <span className="text-gray-600 group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <div className="flex items-center justify-between p-6 hover:bg-[#1a1a1a] transition-colors group">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#5b6ff5]/10 rounded-[10px] border border-[#5b6ff5]/20">
                      <span className="text-[#5b6ff5]">📋</span>
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold mb-1 group-hover:text-[#5b6ff5] transition-colors">
                        Timekeeping audit checklist
                      </h3>
                      <p className="text-[13px] text-gray-500">Review accurate time tracking practices</p>
                    </div>
                  </div>
                  <span className="text-gray-600 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Rail Navigation */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-4">Right Rail Navigation</h2>
          <p className="text-[15px] text-gray-500 mb-8">
            Sticky "On this page" anchor navigation (desktop only)
          </p>

          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-6">
            <div className="max-w-[240px]">
              <h3 className="text-[13px] font-semibold text-gray-600 uppercase tracking-wide mb-4">
                On this page
              </h3>
              <nav className="space-y-1">
                <button className="block w-full text-left px-3 py-2 text-[14px] rounded-[8px] text-[#5b6ff5] bg-[#5b6ff5]/10">
                  Overview
                </button>
                <button className="block w-full text-left px-3 py-2 text-[14px] rounded-[8px] text-gray-500 hover:text-gray-300 hover:bg-gray-900/30 transition-colors">
                  Salary basis test
                </button>
                <button className="block w-full text-left px-3 py-2 text-[14px] rounded-[8px] text-gray-500 hover:text-gray-300 hover:bg-gray-900/30 transition-colors">
                  Duties test
                </button>
                <button className="block w-full text-left px-3 py-2 text-[14px] rounded-[8px] text-gray-500 hover:text-gray-300 hover:bg-gray-900/30 transition-colors">
                  Documentation
                </button>
                <button className="block w-full text-left px-3 py-2 text-[14px] rounded-[8px] text-gray-500 hover:text-gray-300 hover:bg-gray-900/30 transition-colors">
                  Red flags
                </button>
              </nav>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-[14px] text-gray-400">
            <p><strong>Behavior:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Sticky positioning (top-8) on desktop only</li>
              <li>Active section highlighted in blue with background</li>
              <li>Smooth scroll to section on click</li>
              <li>Updates based on scroll position</li>
            </ul>
          </div>
        </section>

        {/* Back to Top (demo) */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-4">Back to Top Button</h2>
          <p className="text-[15px] text-gray-500 mb-8">
            Floating pill that appears after scrolling 400px
          </p>

          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-6">
            <div className="flex items-center gap-4">
              <button className="p-3 bg-[#161616] border border-gray-900/50 rounded-full shadow-lg shadow-black/40 hover:bg-[#1a1a1a] hover:border-gray-800 transition-all">
                <span className="block w-5 h-5 text-gray-400">↑</span>
              </button>
              <div className="text-[14px] text-gray-400">
                <p>Fixed position: bottom-8, right-8</p>
                <p>Appears with fade-in after 400px scroll</p>
                <p>Smooth scroll to top on click</p>
              </div>
            </div>
          </div>
        </section>

        {/* Design Tokens */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-4">Design Tokens</h2>
          <p className="text-[15px] text-gray-500 mb-8">
            Consistent spacing, typography, and interaction patterns
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spacing */}
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-6">
              <h3 className="text-[19px] font-semibold mb-4">Spacing Scale</h3>
              <ul className="space-y-2 text-[14px] text-gray-400">
                <li>Card padding: 24px (p-6)</li>
                <li>Featured padding: 32px (p-8)</li>
                <li>Grid gaps: 20px (gap-5)</li>
                <li>Section margins: 40-64px (mb-10 to mb-16)</li>
                <li>Internal spacing: 8/12/16px rhythm</li>
              </ul>
            </div>

            {/* Typography */}
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-6">
              <h3 className="text-[19px] font-semibold mb-4">Typography</h3>
              <ul className="space-y-2 text-[14px] text-gray-400">
                <li>Page title: 48px semibold, tight tracking</li>
                <li>Section heading: 32px semibold</li>
                <li>Card title: 17px semibold (19px featured)</li>
                <li>Body text: 15px, relaxed leading</li>
                <li>Metadata: 13px, gray-600</li>
                <li>Microtext: 11-12px</li>
              </ul>
            </div>

            {/* Interactions */}
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-6">
              <h3 className="text-[19px] font-semibold mb-4">Interactions</h3>
              <ul className="space-y-2 text-[14px] text-gray-400">
                <li>Transition duration: 200ms</li>
                <li>Easing: ease / ease-in-out</li>
                <li>Card lift: -2px translate-y</li>
                <li>Shadows: subtle, black/20-40 opacity</li>
                <li>Focus rings: 2px, blue/40 opacity</li>
              </ul>
            </div>

            {/* Colors */}
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-6">
              <h3 className="text-[19px] font-semibold mb-4">Colors</h3>
              <ul className="space-y-2 text-[14px] text-gray-400">
                <li>Accent: #5b6ff5 (primary blue)</li>
                <li>Background: #0a0a0a (near-black)</li>
                <li>Cards: #161616</li>
                <li>Borders: gray-900/50</li>
                <li>Text: white, gray-400, gray-500, gray-600</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <BackToTop />
    </div>
  );
}
