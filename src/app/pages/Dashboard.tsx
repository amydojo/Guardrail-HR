import { Link } from 'react-router';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { DashboardEmptyState } from '@/app/components/DashboardEmptyState';
import { PremiumPricingModal } from '@/app/components/PremiumPricingModal';
import { useEffect, useState } from 'react';
import { useSavedItems } from '@/app/context/SavedItemsContext';
import { SavedSection } from '@/app/components/dashboard/SavedSection';

export function Dashboard() {
  const [resourceProgress, setResourceProgress] = useState({ inPlan: 0, completed: 0 });
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const { savedItems } = useSavedItems();

  // Calculate stats from localStorage
  useEffect(() => {
    const keys = Object.keys(localStorage);
    const doneCount = keys.filter(k => k.startsWith('resource-done-') && localStorage.getItem(k) === 'true').length;
    
    setResourceProgress({ inPlan: 0, completed: doneCount });
  }, []);

  // Mock data - would come from database in production
  const dashboardData = {
    lastUpdated: 'January 24, 2026',
    currentPlan: 'free' as 'free' | 'plus',
    latestAssessment: {
      id: 'wage-hour',
      name: 'Wage & Hour',
      score: 72,
      maxScore: 100,
      riskLevel: 'Elevated exposure',
      lastUpdated: 'January 24, 2026',
      resultsHref: '/modules/wage-hour/results',
      reassessmentHref: '/modules/wage-hour'
    },
    modules: [
      {
        id: 'harassment-prevention',
        name: 'Harassment Prevention',
        status: 'not-started' as const,
        lastUpdated: null,
        href: '/modules/harassment-prevention',
        action: 'Start assessment'
      },
      {
        id: 'classification',
        name: 'Worker Classification',
        status: 'not-started' as const,
        lastUpdated: null,
        href: '/modules/classification',
        action: 'Start assessment'
      }
    ],
    recentActivity: [
      {
        module: 'Wage & Hour',
        action: 'Assessment completed',
        when: '2 hours ago',
        timestamp: 'Today at 2:34 PM'
      },
      {
        module: 'Resources',
        action: 'Saved 3 items',
        when: '1 day ago',
        timestamp: 'Yesterday at 4:12 PM'
      },
      {
        module: 'Templates',
        action: 'Downloaded meal break policy',
        when: '2 days ago',
        timestamp: 'Jan 22 at 10:45 AM'
      }
    ],
    recommendedResource: {
      title: 'Meal & rest breaks policy',
      type: 'policy',
      href: '/resources/meal-rest-breaks'
    }
  };

  const completedModules = dashboardData.latestAssessment ? 1 : 0;
  const availableModules = dashboardData.modules.filter(m => m.status === 'not-started');

  // Empty state: no completed assessments
  const isEmpty = !dashboardData.latestAssessment;

  // Get most recent 3 saved items
  const recentlySaved = savedItems.slice(0, 3);

  // Helper to get URL for saved item
  const getSavedItemUrl = (item: typeof savedItems[0]) => {
    if (item.type === 'template') {
      return `/resources/templates/${item.slug}`;
    }
    return `/resources/${item.slug}`;
  };

  // Helper to format saved timestamp
  const formatSavedTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Saved today';
    if (diffDays === 1) return 'Saved yesterday';
    if (diffDays < 7) return `Saved ${diffDays} days ago`;
    if (diffDays < 30) return `Saved ${Math.floor(diffDays / 7)} weeks ago`;
    return `Saved ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="mx-auto max-w-[1080px] px-6 xl:px-8 py-12 sm:py-16 xl:py-20">
        
        {isEmpty ? (
          // EMPTY STATE
          <DashboardEmptyState />
        ) : (
          // POPULATED STATE
          <>
            {/* Dashboard Header - Clear Status */}
            <div className="mb-8 sm:mb-10 xl:mb-12">
              <h1 className="text-[24px] sm:text-[28px] xl:text-[32px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-3">
                Compliance overview
              </h1>
              <p className="text-[14px] sm:text-[15px] text-theme-text-2 leading-[1.65] mb-6">
                Last updated {dashboardData.lastUpdated}
              </p>
              
              {/* Status Chips */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-theme-surface-1 border border-theme-border-1 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-theme-accent" />
                  <span className="text-[13px] sm:text-[14px] text-theme-text-1 font-medium">
                    {completedModules} {completedModules === 1 ? 'module' : 'modules'} completed
                  </span>
                </div>
                {resourceProgress.inPlan > 0 && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-theme-surface-1 border border-theme-border-1 rounded-xl">
                    <span className="text-[13px] sm:text-[14px] text-theme-text-1 font-medium">
                      {resourceProgress.inPlan} {resourceProgress.inPlan === 1 ? 'resource' : 'resources'} saved
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Latest Assessment Score - Prominent card with risk level */}
            {dashboardData.latestAssessment && (
              <section className="mb-8 sm:mb-10 xl:mb-12">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-6">
                  Latest assessment
                </h2>
                
                <div className="bg-theme-surface-1 border border-theme-border-1 rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
                    <div className="flex-1">
                      <h3 className="text-[20px] sm:text-[24px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-2">
                        {dashboardData.latestAssessment.name}
                      </h3>
                      <p className="text-[13px] sm:text-[14px] text-theme-text-3">
                        Last updated {dashboardData.latestAssessment.lastUpdated}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-start sm:items-end gap-2">
                      <div className="text-[32px] sm:text-[40px] font-semibold text-theme-text-1 tracking-tight leading-none">
                        {dashboardData.latestAssessment.score}
                        <span className="text-[20px] sm:text-[24px] text-theme-text-3 ml-1">/{dashboardData.latestAssessment.maxScore}</span>
                      </div>
                      <span className="px-3 py-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-lg text-[12px] sm:text-[13px] font-medium">
                        {dashboardData.latestAssessment.riskLevel}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-theme-border-2">
                    <Link
                      to={dashboardData.latestAssessment.resultsHref}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-theme-accent text-white rounded-lg text-[14px] font-medium hover:bg-theme-accent-hover transition-colors shadow-theme-2"
                    >
                      View detailed results
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to={dashboardData.latestAssessment.reassessmentHref}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-theme-surface-1 border border-theme-border-1 text-theme-text-1 rounded-lg text-[14px] font-medium hover:bg-theme-surface-2 transition-colors"
                    >
                      Reassess
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Recommended Resource - Single recommendation */}
            {dashboardData.recommendedResource && (
              <section className="mb-8 sm:mb-10 xl:mb-12">
                <h2 className="text-[17px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-4">
                  Recommended for you
                </h2>
                
                <div className="bg-theme-surface-1 border border-theme-border-1 rounded-2xl p-6">
                  {dashboardData.recommendedResource && (
                    <div className="mb-5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-[14px] sm:text-[15px] text-theme-text-2">{dashboardData.recommendedResource.title}</div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text capitalize">
                            {dashboardData.recommendedResource.type}
                          </span>
                          <Link
                            to={dashboardData.recommendedResource.href}
                            className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors"
                          >
                            Open
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  <Link
                    to="/resources?from=dashboard"
                    className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors"
                  >
                    View all resources
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </section>
            )}

            {/* Your modules - Restructured (completed + available) */}
            <section className="mb-8 sm:mb-10 xl:mb-12">
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-6">
                Your modules
              </h2>
              
              {/* Completed modules */}
              {completedModules > 0 && (
                <div className="mb-6">
                  <h3 className="text-[15px] font-medium text-theme-text-3 mb-3">Completed</h3>
                  <div className="bg-theme-surface-1 border border-theme-border-1 rounded-2xl p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                          <h4 className="text-[17px] font-semibold text-theme-text-1 tracking-tight leading-tight">
                            {dashboardData.latestAssessment.name}
                          </h4>
                          <span className="px-2.5 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                            Completed
                          </span>
                        </div>
                        <p className="text-[13px] text-theme-text-3">
                          Last updated {dashboardData.latestAssessment.lastUpdated}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:flex-shrink-0">
                        <Link
                          to={dashboardData.latestAssessment.resultsHref}
                          className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors"
                        >
                          View results
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Available modules */}
              {availableModules.length > 0 && (
                <div>
                  <h3 className="text-[15px] font-medium text-theme-text-3 mb-3">Available</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableModules.map((module) => (
                      <div
                        key={module.id}
                        className="bg-theme-surface-1 border border-theme-border-1 rounded-2xl p-6 hover:bg-theme-surface-1 hover:border-theme-border-1 transition-all"
                      >
                        <h4 className="text-[17px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-2">
                          {module.name}
                        </h4>
                        <p className="text-[14px] text-theme-text-3 leading-[1.65] mb-4">
                          Assess your compliance exposure and get actionable guidance.
                        </p>
                        <Link
                          to={module.href}
                          className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors"
                        >
                          Start assessment
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Recent Activity - Compact 3-row log */}
            {dashboardData.recentActivity.length > 0 && (
              <section className="mb-8 sm:mb-10 xl:mb-12">
                <h2 className="text-[17px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-4">
                  Recent activity
                </h2>
                
                <div className="bg-theme-surface-2 border border-theme-border-2 rounded-2xl divide-y divide-theme-border-2">
                  {dashboardData.recentActivity.slice(0, 3).map((activity, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 px-5 sm:px-6 py-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] sm:text-[14px] text-theme-text-2 mb-1">
                          <span className="text-theme-text-1">{activity.module}</span>
                          <span className="text-theme-text-3 mx-2">·</span>
                          <span>{activity.action}</span>
                        </div>
                        <div className="text-[12px] sm:text-[13px] text-theme-text-3">{activity.timestamp}</div>
                      </div>
                      <span className="text-[12px] sm:text-[13px] text-theme-text-3 sm:flex-shrink-0">{activity.when}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Saved items - New SavedSection component */}
            <section className="mb-8 sm:mb-10 xl:mb-12">
              <SavedSection />
            </section>

            {/* Unlock deeper breakdowns - Quieter, at bottom */}
            {dashboardData.currentPlan === 'free' && completedModules > 0 && (
              <section className="mb-12">
                <div className="bg-theme-surface-2 border border-theme-border-2 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-[14px] text-theme-text-3 leading-[1.65]">
                      Unlock deeper breakdowns with detailed explanations, templates, and exportable summaries.
                    </p>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Link
                        to="/pricing"
                        className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors whitespace-nowrap"
                      >
                        Unlock Guardrail Plus
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setIsPricingModalOpen(true)}
                        className="inline-flex items-center gap-1.5 text-[13px] text-theme-text-3 hover:text-theme-text-2 transition-colors whitespace-nowrap"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* Premium Pricing Modal */}
      <PremiumPricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </div>
  );
}