import { Link, useSearchParams } from 'react-router';
import { ArrowRight, Search, X, FileText, Calculator, Download, Plus, Check, ChevronDown, ChevronUp, SlidersHorizontal, BookOpen, ClipboardList, FileCheck } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ALL_TEMPLATES, Template } from '@/app/data/templatesData';
import { TemplatePreviewModalV2 } from '@/app/components/resources/TemplatePreviewModalV2';
import { SaveButton } from '@/app/components/SaveButton';
import { MobileFilterDrawer } from '@/app/components/resources/MobileFilterDrawer';

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
  format?: 'PDF' | 'DOC' | 'Tool';
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
    bestFor: 'Reviewing salary-based roles',
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
    bestFor: 'Setting up or auditing payroll',
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
    bestFor: 'Training managers on break timing',
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
    bestFor: 'Verifying weekly pay calculations',
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
    bestFor: 'Setting up time tracking systems',
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
    bestFor: 'Reviewing contractor relationships',
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
    bestFor: 'Processing terminations correctly',
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
    bestFor: 'Setting up record-keeping systems',
    reviewedDate: 'Nov 2025',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getUniqueValues<T>(items: T[], key: keyof T): string[] {
  const values = items.flatMap(item => {
    const value = item[key];
    return Array.isArray(value) ? value : [value];
  });
  return Array.from(new Set(values.filter(Boolean))).sort();
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ResourcesHubRedesigned() {
  const [searchParams] = useSearchParams();
  const hasCompletedScan = searchParams.get('from') === 'results' || searchParams.get('from') === 'dashboard';

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

  // Mobile filter modal
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Recently updated section
  const [recentlyUpdatedExpanded, setRecentlyUpdatedExpanded] = useState(false);

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
  const filteredResources = RESOURCES.filter(resource => {
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (typeFilters.length > 0 && !typeFilters.includes(resource.type)) return false;
    if (topicFilters.length > 0 && !resource.topics.some(t => topicFilters.includes(t))) return false;
    if (stageFilters.length > 0 && !resource.stages.some(s => stageFilters.includes(s))) return false;
    return true;
  });

  const filteredTemplates = ALL_TEMPLATES.filter(template => {
    if (searchQuery && !template.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !template.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (templateModuleFilters.length > 0 && !templateModuleFilters.includes(template.module)) return false;
    if (templateTypeFilters.length > 0 && !templateTypeFilters.includes(template.type)) return false;
    return true;
  });

  const activeFiltersCount = activeTab === 'library'
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
  const recommendedResourceSlugs = hasCompletedScan ? ['exemption-checklist', 'wage-statement-guide', 'overtime-calculator'] : [];
  const recommendedResources = RESOURCES.filter(r => recommendedResourceSlugs.includes(r.slug));

  const recommendedTemplateSlugs = hasCompletedScan ? ['meal-break-waiver', 'exemption-worksheet', 'timekeeping-policy'] : [];
  const recommendedTemplates = ALL_TEMPLATES.filter(t => recommendedTemplateSlugs.includes(t.slug));

  // Recently updated (last 3 items based on reviewedDate)
  const recentlyUpdatedResources = [...RESOURCES]
    .sort((a, b) => (b.reviewedDate || '').localeCompare(a.reviewedDate || ''))
    .slice(0, 3);

  const recentlyUpdatedTemplates = [...ALL_TEMPLATES]
    .sort((a, b) => (b.reviewedDate || '').localeCompare(a.reviewedDate || ''))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-theme-bg">
      {/* Header */}
      <div className="border-b border-theme-border-2 bg-theme-bg">
        <div className="mx-auto max-w-[1280px] px-6 xl:px-8 py-8">
          <h1 className="text-[28px] font-semibold text-theme-text-1 mb-2 tracking-tight">
            Resources
          </h1>
          <p className="text-[15px] text-theme-text-2 leading-relaxed max-w-[680px]">
            Guides, checklists, calculators, and customizable templates for California wage & hour compliance.
          </p>

          {/* Tabs */}
          <div className="flex gap-1 mt-6">
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-2.5 text-[15px] font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg ${
                activeTab === 'library'
                  ? 'border-theme-accent text-theme-text-1'
                  : 'border-transparent text-theme-text-2 hover:text-theme-text-1'
              }`}
            >
              Guides & tools
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2.5 text-[15px] font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg ${
                activeTab === 'templates'
                  ? 'border-theme-accent text-theme-text-1'
                  : 'border-transparent text-theme-text-2 hover:text-theme-text-1'
              }`}
            >
              Templates
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Search + Filter Bar */}
      <div
        ref={controlBarRef}
        className={`sticky top-0 z-30 border-b border-theme-border-2 transition-all ${
          isSticky ? 'bg-theme-surface-1/95 backdrop-blur-md shadow-sm' : 'bg-theme-bg'
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-6 xl:px-8 py-3 md:py-4">
          {/* Search row */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search - primary, full width */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources and templates"
                className="w-full pl-10 pr-10 py-2.5 text-[14px] bg-theme-surface-1 border border-theme-border-1 rounded-lg text-theme-text-1 placeholder:text-theme-text-3 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:border-theme-focus"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-text-3 hover:text-theme-text-1 transition-colors p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile: Filter button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className={`md:hidden flex items-center gap-2 px-3 py-2.5 text-[13px] font-medium rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
                activeFiltersCount > 0
                  ? 'bg-theme-surface-1 border-theme-border-2 text-theme-text-1'
                  : 'bg-theme-surface-1 text-theme-text-3 border-theme-border-1 hover:text-theme-text-2'
              }`}
              aria-label={`Filter results${activeFiltersCount > 0 ? ` (${activeFiltersCount} active)` : ''}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {activeFiltersCount > 0 && (
                <span className="text-[12px] text-theme-text-3">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Desktop: Inline filters */}
            <div className="hidden md:flex items-center gap-2">
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
            </div>

            {/* Results count (desktop only) */}
            <span className="hidden md:inline text-[13px] text-theme-text-3 whitespace-nowrap ml-auto">
              {resultCount} {resultCount === 1 ? 'result' : 'results'}
            </span>
          </div>

          {/* Active filters summary (when filters are active) */}
          {activeFiltersCount > 0 && (
            <div className="mt-2 flex items-center gap-2 text-[12px] text-theme-text-3">
              <span>Filtered by:</span>
              <span className="text-theme-text-2">
                {activeTab === 'library' ? (
                  <>
                    {typeFilters.length > 0 && `${typeFilters.join(', ')}`}
                    {typeFilters.length > 0 && (topicFilters.length > 0 || stageFilters.length > 0) && ' · '}
                    {topicFilters.length > 0 && `${topicFilters.join(', ')}`}
                    {topicFilters.length > 0 && stageFilters.length > 0 && ' · '}
                    {stageFilters.length > 0 && `${stageFilters.join(', ')}`}
                  </>
                ) : (
                  <>
                    {templateModuleFilters.length > 0 && `${templateModuleFilters.join(', ')}`}
                    {templateModuleFilters.length > 0 && templateTypeFilters.length > 0 && ' · '}
                    {templateTypeFilters.length > 0 && `${templateTypeFilters.join(', ')}`}
                  </>
                )}
              </span>
              <button
                onClick={clearAllFilters}
                className="text-theme-accent hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded px-1"
              >
                clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1280px] px-6 xl:px-8 py-6 md:py-8">
        {/* Compact Scan Banner - hint style */}
        <div className="mb-8">
          {hasCompletedScan ? (
            <div className="flex items-center justify-between px-4 py-3 bg-theme-accent-soft border border-theme-accent/20 rounded-xl">
              <p className="text-[13px] text-theme-text-2">
                Recommendations updated from your last scan
              </p>
              <Link
                to="#recommended"
                className="inline-flex items-center gap-1.5 text-[13px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
              >
                View recommended
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <>
              {/* Mobile: Quiet, assistive suggestion */}
              <div className="md:hidden border-l-2 border-theme-border-2 pl-3 py-2">
                <p className="text-[13px] text-theme-text-3 mb-1.5">
                  Not sure what applies?
                </p>
                <Link
                  to="/modules/wage-hour"
                  className="inline-flex items-center gap-1.5 text-[13px] text-theme-text-2 font-medium hover:text-theme-accent transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
                >
                  Run scan
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Desktop: Original card-style */}
              <div className="hidden md:flex items-center justify-between px-4 py-3 bg-theme-surface-2 border border-theme-border-2/60 rounded-xl">
                <p className="text-[13px] text-theme-text-3">
                  Want resources matched to your risk areas?
                </p>
                <Link
                  to="/modules/wage-hour"
                  className="inline-flex items-center gap-1.5 text-[13px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
                >
                  Run a wage & hour scan
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Recommended for you (conditional) */}
        {hasCompletedScan && (
          <div id="recommended" className="mb-12">
            <h2 className="text-[17px] font-medium text-theme-text-1 mb-4">
              Recommended for you
            </h2>
            {activeTab === 'library' ? (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-theme">
                {recommendedResources.map(resource => (
                  <RecommendedResourceCard
                    key={resource.slug}
                    resource={resource}
                    isInPlan={planItems.includes(resource.slug)}
                    onTogglePlan={() => {
                      setPlanItems(prev =>
                        prev.includes(resource.slug)
                          ? prev.filter(id => id !== resource.slug)
                          : [...prev, resource.slug]
                      );
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-theme">
                {recommendedTemplates.map(template => (
                  <RecommendedTemplateCard
                    key={template.slug}
                    template={template}
                    isInPlan={templatePlanItems.includes(template.slug)}
                    onTogglePlan={() => {
                      setTemplatePlanItems(prev =>
                        prev.includes(template.slug)
                          ? prev.filter(id => id !== template.slug)
                          : [...prev, template.slug]
                      );
                    }}
                    onPreview={() => {
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
            {hasActiveFilters ? 'Filtered results' : activeTab === 'library' ? 'All guides & tools' : 'All templates'}
          </h2>

          {activeTab === 'library' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {filteredResources.map(resource => (
                <LibraryCard
                  key={resource.slug}
                  resource={resource}
                  isInPlan={planItems.includes(resource.slug)}
                  onTogglePlan={() => {
                    setPlanItems(prev =>
                      prev.includes(resource.slug)
                        ? prev.filter(id => id !== resource.slug)
                        : [...prev, resource.slug]
                    );
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4 md:space-y-2">
              {filteredTemplates.map(template => (
                <TemplateRow
                  key={template.slug}
                  template={template}
                  isInPlan={templatePlanItems.includes(template.slug)}
                  onTogglePlan={() => {
                    setTemplatePlanItems(prev =>
                      prev.includes(template.slug)
                        ? prev.filter(id => id !== template.slug)
                        : [...prev, template.slug]
                    );
                  }}
                  onPreview={() => {
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
                className="text-[14px] text-theme-accent hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Recently Updated */}
        <div>
          <button
            onClick={() => setRecentlyUpdatedExpanded(!recentlyUpdatedExpanded)}
            className="flex items-center gap-2 text-[17px] font-medium text-theme-text-1 mb-4 hover:text-theme-accent transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
          >
            Recently updated
            {recentlyUpdatedExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {recentlyUpdatedExpanded && (
            activeTab === 'library' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentlyUpdatedResources.map(resource => (
                  <LibraryCard
                    key={resource.slug}
                    resource={resource}
                    isInPlan={planItems.includes(resource.slug)}
                    onTogglePlan={() => {
                      setPlanItems(prev =>
                        prev.includes(resource.slug)
                          ? prev.filter(id => id !== resource.slug)
                          : [...prev, resource.slug]
                      );
                    }}
                    compact
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {recentlyUpdatedTemplates.map(template => (
                  <TemplateRow
                    key={template.slug}
                    template={template}
                    isInPlan={templatePlanItems.includes(template.slug)}
                    onTogglePlan={() => {
                      setTemplatePlanItems(prev =>
                        prev.includes(template.slug)
                          ? prev.filter(id => id !== template.slug)
                          : [...prev, template.slug]
                      );
                    }}
                    onPreview={() => {
                      setSelectedTemplate(template);
                      setPreviewModalOpen(true);
                    }}
                  />
                ))}
              </div>
            )
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
            setTemplatePlanItems(prev =>
              prev.includes(selectedTemplate.slug)
                ? prev.filter(id => id !== selectedTemplate.slug)
                : [...prev, selectedTemplate.slug]
            );
          }}
        />
      )}

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        activeTab={activeTab}
        // Library filters
        typeFilters={typeFilters}
        setTypeFilters={setTypeFilters}
        topicFilters={topicFilters}
        setTopicFilters={setTopicFilters}
        stageFilters={stageFilters}
        setStageFilters={setStageFilters}
        // Template filters
        templateModuleFilters={templateModuleFilters}
        setTemplateModuleFilters={setTemplateModuleFilters}
        templateTypeFilters={templateTypeFilters}
        setTemplateTypeFilters={setTemplateTypeFilters}
        // Options
        typeOptions={getUniqueValues(RESOURCES, 'type')}
        topicOptions={getUniqueValues(RESOURCES, 'topics')}
        stageOptions={getUniqueValues(RESOURCES, 'stages')}
        moduleOptions={getUniqueValues(ALL_TEMPLATES, 'module')}
        templateTypeOptions={getUniqueValues(ALL_TEMPLATES, 'type')}
        onClearAll={() => {
          setTypeFilters([]);
          setTopicFilters([]);
          setStageFilters([]);
          setTemplateModuleFilters([]);
          setTemplateTypeFilters([]);
        }}
      />
    </div>
  );
}

// ============================================================================
// FILTER DROPDOWN COMPONENT
// ============================================================================

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}

function FilterDropdown({ label, options, selected, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    onChange(
      selected.includes(option)
        ? selected.filter(o => o !== option)
        : [...selected, option]
    );
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
          selected.length > 0
            ? 'bg-theme-surface-1 border-theme-accent/30 text-theme-text-1'
            : 'bg-theme-surface-1 text-theme-text-2 border-theme-border-1 hover:bg-theme-surface-2'
        }`}
      >
        {label}
        {selected.length > 0 && (
          <span className="ml-0.5 px-1.5 py-0.5 bg-theme-accent text-white text-[11px] rounded">
            {selected.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 left-0 min-w-[180px] max-h-[280px] overflow-auto bg-theme-surface-1 border border-theme-border-1 rounded-lg shadow-theme-2 py-2 z-40">
          {selected.length > 0 && (
            <>
              <button
                onClick={() => onChange([])}
                className="w-full px-3 py-2 text-left text-[13px] text-theme-accent hover:bg-theme-surface-2 transition-colors focus:outline-none focus:bg-theme-surface-2 font-medium"
              >
                Clear
              </button>
              <div className="border-t border-theme-border-2 my-1" />
            </>
          )}
          {options.map(option => (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className="w-full px-3 py-2 text-left text-[13px] text-theme-text-2 hover:bg-theme-surface-2 transition-colors flex items-center gap-2 focus:outline-none focus:bg-theme-surface-2"
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                selected.includes(option)
                  ? 'bg-theme-accent border-theme-accent'
                  : 'border-theme-border-1'
              }`}>
                {selected.includes(option) && (
                  <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                )}
              </div>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// LIBRARY CARD COMPONENT
// ============================================================================

interface LibraryCardProps {
  resource: Resource;
  isInPlan: boolean;
  onTogglePlan: () => void;
  compact?: boolean;
}

function LibraryCard({ resource, isInPlan, onTogglePlan, compact = false }: LibraryCardProps) {
  // Content-type specific icons
  const getIcon = () => {
    switch (resource.type) {
      case 'calculator': return Calculator;
      case 'checklist': return ClipboardList;
      case 'guide': return BookOpen;
      case 'policy': return FileCheck;
      default: return FileText;
    }
  };
  const Icon = getIcon();

  return (
    <div className="bg-theme-surface-1 border border-theme-border-1 rounded-xl p-5 md:p-5 hover:border-theme-border-2 transition-all">
      {/* Mobile: Refined structure with left-aligned primary CTA */}
      <div className="md:hidden">
        {/* Header row: icon + title */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="w-5 h-5 text-theme-text-3" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-medium text-theme-text-1 line-clamp-2 leading-[1.35] mb-1.5">
              {resource.title}
            </h3>
            <p className="text-[12px] text-theme-text-3 capitalize">
              {resource.type}
            </p>
          </div>
        </div>

        {/* Action row - primary left, secondary right */}
        <div className="pt-4 border-t border-theme-border-2/50">
          <div className="flex items-center justify-between gap-3">
            <Link
              to={`/resources/${resource.slug}`}
              className="flex-1 px-4 py-2.5 bg-theme-surface-1 border border-theme-border-1 text-theme-text-1 text-[13px] font-medium rounded-lg hover:bg-theme-surface-2 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
            >
              View
            </Link>
            <SaveButton
              type="resource"
              slug={resource.slug}
              title={resource.title}
              category={resource.type}
              variant="compact"
            />
          </div>
        </div>
      </div>

      {/* Desktop: Final-form Apple/Linear polish */}
      <div className="hidden md:block">
        {/* Icon + Title anchor */}
        <div className="flex items-start gap-3 mb-2">
          <div className="flex items-center justify-center flex-shrink-0 mt-1">
            <Icon className="w-5 h-5 text-theme-text-3" />
          </div>
          <div className="flex-1 min-w-0">
            {/* Title - visual anchor, 2-line max */}
            <h3 className="text-[15px] font-semibold text-theme-text-1 line-clamp-2 leading-[1.4] tracking-tight mb-1.5">
              {resource.title}
            </h3>

            {/* Context metadata - single line */}
            {!compact && (
              <p className="text-[12px] text-theme-text-2 capitalize mb-1.5">
                {resource.type}
                {resource.topics.length > 0 && <span className="text-theme-text-3"> · {resource.topics[0]}</span>}
              </p>
            )}

            {/* Glance-only metadata - duration */}
            {!compact && resource.readTime && (
              <p className="text-[11px] text-theme-text-3">
                {resource.readTime}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-theme-border-2/50 mt-1.5 pt-2.5">
          {/* Actions - lighter hierarchy */}
          <div className="flex items-center justify-between">
            <Link
              to={`/resources/${resource.slug}`}
              className="inline-flex items-center gap-1.5 text-[13px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
            >
              View
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <SaveButton
              type="resource"
              slug={resource.slug}
              title={resource.title}
              category={resource.type}
              variant="compact"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// RECOMMENDED RESOURCE CARD COMPONENT
// ============================================================================

interface RecommendedResourceCardProps {
  resource: Resource;
  isInPlan: boolean;
  onTogglePlan: () => void;
}

function RecommendedResourceCard({ resource, isInPlan, onTogglePlan }: RecommendedResourceCardProps) {
  // Content-type specific icons
  const getIcon = () => {
    switch (resource.type) {
      case 'calculator': return Calculator;
      case 'checklist': return ClipboardList;
      case 'guide': return BookOpen;
      case 'policy': return FileCheck;
      default: return FileText;
    }
  };
  const Icon = getIcon();

  return (
    <div className="min-w-[280px] bg-theme-surface-1 border border-theme-border-1 rounded-xl p-4 hover:border-theme-accent/40 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-theme-accent-soft border border-theme-accent/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4.5 h-4.5 text-theme-accent" />
        </div>
        <h3 className="text-[14px] font-medium text-theme-text-1 line-clamp-2 flex-1">
          {resource.title}
        </h3>
      </div>

      <Link
        to={`/resources/${resource.slug}`}
        className="block w-full px-3 py-2 bg-theme-accent text-white text-[13px] font-medium rounded-lg hover:bg-theme-accent-hover transition-colors text-center focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
      >
        View
      </Link>
    </div>
  );
}

// ============================================================================
// TEMPLATE ROW COMPONENT
// ============================================================================

interface TemplateRowProps {
  template: Template;
  isInPlan: boolean;
  onTogglePlan: () => void;
  onPreview: () => void;
}

function TemplateRow({ template, isInPlan, onTogglePlan, onPreview }: TemplateRowProps) {
  return (
    <div className="bg-theme-surface-2 border border-theme-border-1 rounded-xl p-5 md:py-3 md:px-4 hover:border-theme-border-2 transition-all">
      {/* Mobile: Anchored structure with template emphasis */}
      <div className="md:hidden">
        {/* Header row: icon + title + subtext */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex items-center justify-center flex-shrink-0 mt-0.5">
            <FileText className="w-5 h-5 text-theme-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-medium text-theme-text-1 line-clamp-2 leading-[1.35] mb-1.5">
              {template.title}
            </h3>
            <p className="text-[12px] text-theme-text-3 capitalize">
              {template.type}
            </p>
          </div>
        </div>

        {/* Value hint - creates context for actions */}
        <div className="mb-4">
          <p className="text-[13px] text-theme-text-2 line-clamp-1">
            {template.bestFor}
          </p>
        </div>

        {/* Action row - anchored with accent separation */}
        <div className="pt-4 border-t border-theme-accent/10">
          <div className="flex items-center justify-between gap-3">
            <Link
              to={`/resources/templates/${template.slug}/customize`}
              className="flex-1 px-4 py-2.5 bg-theme-accent text-white text-[13px] font-medium rounded-lg hover:bg-theme-accent-hover transition-colors text-center focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
            >
              Customize
            </Link>
            <SaveButton
              type="template"
              slug={template.slug}
              title={template.title}
              category={template.module}
              version={template.version}
              variant="compact"
            />
          </div>
        </div>
      </div>

      {/* Desktop: Artifact-style card with vertical content block + action rail */}
      <div className="hidden md:flex gap-5">
        {/* Left: Icon + Content block (stacked) */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className="flex items-center justify-center flex-shrink-0 mt-1">
            <FileText className="w-5 h-5 text-theme-accent" />
          </div>

          {/* Content block - stacked vertically */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-[15px] font-medium text-theme-text-1 line-clamp-2 leading-[1.4] mb-2">
              {template.title}
            </h3>

            {/* Context metadata - single line */}
            <p className="text-[12px] text-theme-text-3 capitalize mb-2">
              {template.type}
            </p>

            {/* Best for - grouped guidance */}
            <p className="text-[13px] text-theme-text-3 line-clamp-1 mb-1">
              {template.bestFor}
            </p>

            {/* Meta - separated */}
            <p className="text-[11px] text-theme-text-3">
              Reviewed {template.reviewedDate} · v{template.version}
            </p>
          </div>
        </div>

        {/* Right: Action rail (fixed width, vertically centered) */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to={`/resources/templates/${template.slug}/customize`}
            className="px-4 py-2 bg-theme-accent text-white text-[13px] font-medium rounded-lg hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 whitespace-nowrap">
            Customize
          </Link>
          <button
            onClick={onPreview}
            className="text-[13px] text-theme-text-3 font-medium hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 whitespace-nowrap">
            Preview
          </button>
          <SaveButton
            type="template"
            slug={template.slug}
            title={template.title}
            category={template.module}
            version={template.version}
            variant="compact"
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// RECOMMENDED TEMPLATE CARD COMPONENT
// ============================================================================

interface RecommendedTemplateCardProps {
  template: Template;
  isInPlan: boolean;
  onTogglePlan: () => void;
  onPreview: () => void;
}

function RecommendedTemplateCard({ template, isInPlan, onTogglePlan, onPreview }: RecommendedTemplateCardProps) {
  return (
    <div className="min-w-[280px] bg-theme-surface-1 border border-theme-border-1 rounded-xl p-4 hover:border-theme-accent/40 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-theme-accent-soft border border-theme-accent/20 flex items-center justify-center flex-shrink-0">
          <FileText className="w-4.5 h-4.5 text-theme-accent" />
        </div>
        <h3 className="text-[14px] font-medium text-theme-text-1 line-clamp-2 flex-1">
          {template.title}
        </h3>
      </div>

      <p className="text-[12px] text-theme-text-3 mb-3 line-clamp-1">
        Best for: {template.bestFor}
      </p>

      <button
        onClick={onPreview}
        className="block w-full px-3 py-2 bg-theme-accent text-white text-[13px] font-medium rounded-lg hover:bg-theme-accent-hover transition-colors text-center focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
      >
        View
      </button>
    </div>
  );
}