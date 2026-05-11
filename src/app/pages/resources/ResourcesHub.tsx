import { Link, useSearchParams } from 'react-router';
import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ALL_TEMPLATES, Template } from '@/app/data/templatesData';
import { TemplatePreviewModalV2 } from '@/app/components/resources/TemplatePreviewModalV2';
import { CompactScanBanner } from '@/app/components/resources/CompactScanBanner';
import { LibraryCard } from '@/app/components/resources/LibraryCard';
import { TemplateRow } from '@/app/components/resources/TemplateRow';
import { FilterDropdown } from '@/app/components/resources/FilterDropdown';

// ============================================================================
// TYPES
// ============================================================================

interface Resource {
  slug: string;
  title: string;
  description: string;
  type: 'checklist' | 'guide' | 'policy' | 'calculator';
  topics: string[];
  stages: string[];
  readTime?: string;
  format?: string;
  bestFor: string;
  reviewedDate?: string;
}

// ============================================================================
// DATA
// ============================================================================

const RESOURCES: Resource[] = [
  {
    slug: 'exemption-checklist',
    title: 'Exemption checklist',
    description: 'Step-by-step verification for exempt employee classification documentation under CA and federal rules',
    type: 'checklist',
    topics: ['Classification', 'Overtime'],
    stages: ['Prevent', 'Audit'],
    readTime: '6 min',
    format: 'PDF',
    bestFor: 'reviewing salary-based roles',
    reviewedDate: 'Jan 2026',
  },
  {
    slug: 'wage-statement-guide',
    title: 'Wage statement requirements',
    description: 'Complete list of required fields and common compliance errors to avoid on paystubs',
    type: 'guide',
    topics: ['Pay', 'Records'],
    stages: ['Prevent', 'Fix'],
    readTime: '5 min',
    format: 'PDF',
    bestFor: 'setting up or auditing payroll',
    reviewedDate: 'Jan 2026',
  },
  {
    slug: 'meal-rest-breaks',
    title: 'Meal & rest breaks policy',
    description: 'California meal and rest break requirements with timing rules and waiver conditions',
    type: 'policy',
    topics: ['Breaks'],
    stages: ['Prevent', 'Train'],
    readTime: '7 min',
    format: 'DOC',
    bestFor: 'training managers on break timing',
    reviewedDate: 'Jan 2026',
  },
  {
    slug: 'overtime-calculator',
    title: 'Overtime calculator',
    description: 'Calculate daily, weekly, and double-time overtime under California and federal rules',
    type: 'calculator',
    topics: ['Overtime', 'Pay'],
    stages: ['Prevent', 'Audit'],
    readTime: '3 min',
    format: 'Tool',
    bestFor: 'verifying weekly pay calculations',
    reviewedDate: 'Jan 2026',
  },
  {
    slug: 'timekeeping-best-practices',
    title: 'Timekeeping best practices',
    description: 'Guidelines for accurate time tracking and avoiding rounding errors',
    type: 'guide',
    topics: ['Timekeeping', 'Records'],
    stages: ['Prevent'],
    readTime: '8 min',
    format: 'PDF',
    bestFor: 'setting up time tracking systems',
    reviewedDate: 'Dec 2025',
  },
  {
    slug: 'contractor-classification',
    title: 'Contractor classification guide',
    description: 'ABC test walkthrough for California independent contractor relationships',
    type: 'guide',
    topics: ['Classification'],
    stages: ['Prevent', 'Audit'],
    readTime: '9 min',
    format: 'PDF',
    bestFor: 'reviewing contractor relationships',
    reviewedDate: 'Dec 2025',
  },
  {
    slug: 'final-paycheck-rules',
    title: 'Final paycheck timing rules',
    description: 'California requirements for final pay based on termination type',
    type: 'checklist',
    topics: ['Pay', 'Termination'],
    stages: ['Fix', 'Prevent'],
    readTime: '4 min',
    format: 'PDF',
    bestFor: 'processing terminations correctly',
    reviewedDate: 'Nov 2025',
  },
  {
    slug: 'payroll-records-retention',
    title: 'Payroll records retention',
    description: 'Required records and retention periods under California law',
    type: 'checklist',
    topics: ['Records'],
    stages: ['Prevent'],
    readTime: '5 min',
    format: 'PDF',
    bestFor: 'setting up record-keeping systems',
    reviewedDate: 'Nov 2025',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getUniqueValues<T>(items: T[], key: keyof T): string[] {
  const values = items.flatMap((item) => {
    const value = item[key];
    return Array.isArray(value) ? value : [value];
  });
  return Array.from(new Set(values.filter(Boolean))).sort();
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ResourcesHub() {
  const [searchParams] = useSearchParams();
  const hasScan = searchParams.get('from') === 'results' || searchParams.get('from') === 'dashboard';

  // Tab state
  const [activeTab, setActiveTab] = useState<'library' | 'templates'>('library');

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [topicFilters, setTopicFilters] = useState<string[]>([]);
  const [stageFilters, setStageFilters] = useState<string[]>([]);
  const [templateModuleFilters, setTemplateModuleFilters] = useState<string[]>([]);
  const [templateTypeFilters, setTemplateTypeFilters] = useState<string[]>([]);

  // Sticky control bar
  const [isSticky, setIsSticky] = useState(false);
  const controlBarRef = useRef<HTMLDivElement>(null);

  // Plan state
  const [planItems, setPlanItems] = useState<string[]>([]);
  const [templatePlanItems, setTemplatePlanItems] = useState<string[]>([]);

  // Template preview modal
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Sticky observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 1 }
    );

    if (controlBarRef.current) {
      observer.observe(controlBarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Filter logic
  const filteredResources = RESOURCES.filter((resource) => {
    if (
      searchQuery &&
      !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (typeFilters.length > 0 && !typeFilters.includes(resource.type)) return false;
    if (topicFilters.length > 0 && !resource.topics.some((t) => topicFilters.includes(t))) return false;
    if (stageFilters.length > 0 && !resource.stages.some((s) => stageFilters.includes(s))) return false;
    return true;
  });

  const filteredTemplates = ALL_TEMPLATES.filter((template) => {
    if (
      searchQuery &&
      !template.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !template.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (templateModuleFilters.length > 0 && !templateModuleFilters.includes(template.module)) return false;
    if (templateTypeFilters.length > 0 && !templateTypeFilters.includes(template.type)) return false;
    return true;
  });

  const activeFiltersCount =
    activeTab === 'library'
      ? typeFilters.length + topicFilters.length + stageFilters.length
      : templateModuleFilters.length + templateTypeFilters.length;

  const hasActiveFilters = activeFiltersCount > 0 || searchQuery.length > 0;
  const resultCount = activeTab === 'library' ? filteredResources.length : filteredTemplates.length;

  const clearAllFilters = () => {
    setSearchQuery('');
    setTypeFilters([]);
    setTopicFilters([]);
    setStageFilters([]);
    setTemplateModuleFilters([]);
    setTemplateTypeFilters([]);
  };

  // Recommended items (mock - would come from scan results)
  const recommendedResourceSlugs = hasScan ? ['exemption-checklist', 'wage-statement-guide', 'overtime-calculator'] : [];
  const recommendedResources = RESOURCES.filter((r) => recommendedResourceSlugs.includes(r.slug));

  const recommendedTemplateSlugs = hasScan ? ['meal-break-waiver', 'exemption-worksheet', 'timekeeping-policy'] : [];
  const recommendedTemplates = ALL_TEMPLATES.filter((t) => recommendedTemplateSlugs.includes(t.slug));

  const hasPlan = planItems.length > 0 || templatePlanItems.length > 0;
  const showRecommended = hasScan || hasPlan;

  return (
    <div className="min-h-screen bg-theme-bg">
      {/* Header */}
      <div className="border-b border-theme-border-2 bg-theme-bg">
        <div className="mx-auto max-w-[1280px] px-6 xl:px-8 py-8">
          <h1 className="text-[28px] font-semibold text-theme-text-1 mb-2 tracking-tight">
            Resources
          </h1>
          <p className="text-[15px] text-theme-text-2 leading-relaxed max-w-[680px]">
            Guides, checklists, calculators, and downloadable templates for California wage & hour compliance.
          </p>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 border-b border-theme-border-2" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'library'}
              aria-controls="library-panel"
              onClick={() => setActiveTab('library')}
              className={`px-4 py-2.5 text-[15px] font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg ${
                activeTab === 'library'
                  ? 'border-theme-accent text-theme-text-1'
                  : 'border-transparent text-theme-text-3 hover:text-theme-text-2'
              }`}
            >
              Library
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'templates'}
              aria-controls="templates-panel"
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2.5 text-[15px] font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg ${
                activeTab === 'templates'
                  ? 'border-theme-accent text-theme-text-1'
                  : 'border-transparent text-theme-text-3 hover:text-theme-text-2'
              }`}
            >
              Templates
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Control Bar */}
      <div
        ref={controlBarRef}
        className={`sticky top-0 z-30 border-b border-theme-border-2 transition-all ${
          isSticky ? 'bg-theme-surface-1/95 backdrop-blur-md shadow-theme-1' : 'bg-theme-bg'
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-6 xl:px-8 py-4">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px] max-w-[400px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources and templates"
                className="w-full pl-10 pr-10 py-2 text-[14px] bg-theme-surface-1 border border-theme-border-1 rounded-lg text-theme-text-1 placeholder:text-theme-text-3 focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
                aria-label="Search resources and templates"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-text-3 hover:text-theme-text-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filters */}
            {activeTab === 'library' ? (
              <>
                <FilterDropdown
                  label="Type"
                  options={getUniqueValues(RESOURCES, 'type')}
                  selected={typeFilters}
                  onChange={setTypeFilters}
                />
                <FilterDropdown
                  label="Topic"
                  options={getUniqueValues(RESOURCES, 'topics')}
                  selected={topicFilters}
                  onChange={setTopicFilters}
                />
                <FilterDropdown
                  label="Stage"
                  options={getUniqueValues(RESOURCES, 'stages')}
                  selected={stageFilters}
                  onChange={setStageFilters}
                />
              </>
            ) : (
              <>
                <FilterDropdown
                  label="Module"
                  options={getUniqueValues(ALL_TEMPLATES, 'module')}
                  selected={templateModuleFilters}
                  onChange={setTemplateModuleFilters}
                />
                <FilterDropdown
                  label="Type"
                  options={getUniqueValues(ALL_TEMPLATES, 'type')}
                  selected={templateTypeFilters}
                  onChange={setTemplateTypeFilters}
                />
              </>
            )}

            {/* Results count + Clear */}
            <div className="ml-auto flex items-center gap-3">
              <span className="text-[13px] text-theme-text-3">
                {resultCount} {resultCount === 1 ? 'result' : 'results'}
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[13px] text-theme-accent hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded px-1"
                >
                  clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1280px] px-6 xl:px-8 py-8">
        {/* Compact Scan Banner */}
        <div className="mb-8">
          <CompactScanBanner hasScan={hasScan} />
        </div>

        {/* Recommended Section (conditional) */}
        {showRecommended && (
          <div id="recommended" className="mb-12">
            <h2 className="text-[17px] font-medium text-theme-text-1 mb-4">recommended for you</h2>
            {activeTab === 'library' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedResources.slice(0, 5).map((resource) => (
                  <LibraryCard
                    key={resource.slug}
                    slug={resource.slug}
                    title={resource.title}
                    type={resource.type}
                    topics={resource.topics}
                    bestFor={resource.bestFor}
                    readTime={resource.readTime}
                    format={resource.format}
                    isInPlan={planItems.includes(resource.slug)}
                    onTogglePlan={() => {
                      setPlanItems((prev) =>
                        prev.includes(resource.slug)
                          ? prev.filter((id) => id !== resource.slug)
                          : [...prev, resource.slug]
                      );
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {recommendedTemplates.slice(0, 5).map((template) => (
                  <TemplateRow
                    key={template.slug}
                    slug={template.slug}
                    title={template.title}
                    type={template.type}
                    module={template.module}
                    bestFor={template.bestFor}
                    reviewedDate={template.reviewedDate}
                    version={template.version}
                    isInPlan={templatePlanItems.includes(template.slug)}
                    onTogglePlan={() => {
                      setTemplatePlanItems((prev) =>
                        prev.includes(template.slug)
                          ? prev.filter((id) => id !== template.slug)
                          : [...prev, template.slug]
                      );
                    }}
                    onDownload={() => {
                      setSelectedTemplate(template);
                      setPreviewModalOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* All Results */}
        <div className="mb-12">
          <h2 className="text-[17px] font-medium text-theme-text-1 mb-4">
            {activeTab === 'library' ? 'all resources' : 'all templates'}
          </h2>

          {activeTab === 'library' ? (
            <div 
              role="tabpanel" 
              id="library-panel" 
              aria-labelledby="library-tab"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredResources.map((resource) => (
                <LibraryCard
                  key={resource.slug}
                  slug={resource.slug}
                  title={resource.title}
                  type={resource.type}
                  topics={resource.topics}
                  bestFor={resource.bestFor}
                  readTime={resource.readTime}
                  format={resource.format}
                  isInPlan={planItems.includes(resource.slug)}
                  onTogglePlan={() => {
                    setPlanItems((prev) =>
                      prev.includes(resource.slug) ? prev.filter((id) => id !== resource.slug) : [...prev, resource.slug]
                    );
                  }}
                />
              ))}
            </div>
          ) : (
            <div 
              role="tabpanel" 
              id="templates-panel" 
              aria-labelledby="templates-tab"
              className="space-y-2"
            >
              {filteredTemplates.map((template) => (
                <TemplateRow
                  key={template.slug}
                  slug={template.slug}
                  title={template.title}
                  type={template.type}
                  module={template.module}
                  bestFor={template.bestFor}
                  reviewedDate={template.reviewedDate}
                  version={template.version}
                  isInPlan={templatePlanItems.includes(template.slug)}
                  onTogglePlan={() => {
                    setTemplatePlanItems((prev) =>
                      prev.includes(template.slug)
                        ? prev.filter((id) => id !== template.slug)
                        : [...prev, template.slug]
                    );
                  }}
                  onDownload={() => {
                    setSelectedTemplate(template);
                    setPreviewModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}

          {resultCount === 0 && (
            <div className="text-center py-12">
              <p className="text-[15px] text-theme-text-3 mb-4">
                No {activeTab === 'library' ? 'resources' : 'templates'} match your filters
              </p>
              <button
                onClick={clearAllFilters}
                className="text-[14px] text-theme-accent hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded px-2 py-1"
              >
                clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <TemplatePreviewModalV2
          template={selectedTemplate}
          isOpen={previewModalOpen}
          onClose={() => {
            setPreviewModalOpen(false);
            setSelectedTemplate(null);
          }}
          isInPlan={templatePlanItems.includes(selectedTemplate.slug)}
          onTogglePlan={() => {
            setTemplatePlanItems((prev) =>
              prev.includes(selectedTemplate.slug)
                ? prev.filter((id) => id !== selectedTemplate.slug)
                : [...prev, selectedTemplate.slug]
            );
          }}
        />
      )}
    </div>
  );
}
