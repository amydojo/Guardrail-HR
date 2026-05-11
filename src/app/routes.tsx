import { createBrowserRouter } from 'react-router';
import { RootLayout } from '@/app/pages/RootLayout';
import { LandingPage } from '@/app/pages/LandingPage';
import { HomeDemoPage } from '@/app/pages/HomeDemoPage';
import { UnlockPlusPage } from '@/app/pages/UnlockPlusPage';
import { LockedStateDemoPage } from '@/app/pages/LockedStateDemoPage';
import { PricingModalDemoPage } from '@/app/pages/PricingModalDemoPage';
import { PricingPage } from '@/app/pages/PricingPage';
import { StateAwarePricingPage } from '@/app/pages/StateAwarePricingPage';
import { StateAwarePricingDemoPage } from '@/app/pages/StateAwarePricingDemoPage';
import { Dashboard } from '@/app/pages/Dashboard';
import { ModuleDashboard } from '@/app/pages/ModuleDashboard';
import { WageHourModule } from '@/app/pages/modules/WageHourModule';
import { WageHourDisclosurePage } from '@/app/pages/modules/WageHourDisclosurePage';
import { WageHourAssessmentPage } from '@/app/pages/modules/WageHourAssessmentPage';
import { WageHourResultsPage } from '@/app/pages/modules/WageHourResultsPage';
import { ResourcesHubRedesigned } from '@/app/pages/resources/ResourcesHubRedesigned';
import { ResourceDetail } from '@/app/pages/resources/ResourceDetail';
import { TemplateDetail } from '@/app/pages/resources/TemplateDetail';
import { OvertimeCalculatorPage } from '@/app/pages/resources/OvertimeCalculatorPage';
import { TemplatePreviewPage } from '@/app/pages/TemplatePreviewPage';
import { BrandKit } from '@/app/pages/BrandKit';
import { AccountPage } from '@/app/pages/AccountPage';
import { ResourcesComponentShowcase } from '@/app/pages/ResourcesComponentShowcase';
import { BrandLogoShowcase } from '@/app/pages/BrandLogoShowcase';
import { PrimaryActionShowcase } from '@/app/pages/PrimaryActionShowcase';
import { GlobalPrimaryActionShowcase } from '@/app/pages/GlobalPrimaryActionShowcase';
import { SecondaryActionShowcase } from '@/app/pages/SecondaryActionShowcase';
import { DocumentSystemDemo } from '@/app/pages/DocumentSystemDemo';
import { TemplateCustomizePage } from '@/app/pages/TemplateCustomizePage';
import { SavedPage } from '@/app/pages/SavedPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'home-demo',
        element: <HomeDemoPage />
      },
      {
        path: 'unlock-plus',
        element: <UnlockPlusPage />
      },
      {
        path: 'locked-state-demo',
        element: <LockedStateDemoPage />
      },
      {
        path: 'pricing-modal-demo',
        element: <PricingModalDemoPage />
      },
      {
        path: 'pricing',
        element: <PricingPage />
      },
      {
        path: 'state-aware-pricing',
        element: <StateAwarePricingPage />
      },
      {
        path: 'state-aware-pricing-demo',
        element: <StateAwarePricingDemoPage />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'modules',
        element: <ModuleDashboard />
      },
      {
        path: 'modules/wage-hour',
        element: <WageHourModule />
      },
      {
        path: 'modules/wage-hour/disclosure',
        element: <WageHourDisclosurePage />
      },
      {
        path: 'modules/wage-hour/assessment',
        element: <WageHourAssessmentPage />
      },
      {
        path: 'modules/wage-hour/results',
        element: <WageHourResultsPage />
      },
      {
        path: 'resources',
        element: <ResourcesHubRedesigned />
      },
      {
        path: 'resources/wage-hour',
        element: <ResourcesHubRedesigned />
      },
      {
        path: 'resources/overtime-calculator',
        element: <OvertimeCalculatorPage />
      },
      {
        path: 'resources/:slug',
        element: <ResourceDetail />
      },
      {
        path: 'resources/templates/:slug',
        element: <TemplateDetail />
      },
      {
        path: 'resources/templates/:slug/customize',
        element: <TemplateCustomizePage />
      },
      {
        path: 'templates/preview',
        element: <TemplatePreviewPage />
      },
      {
        path: 'templates/:slug/customize',
        element: <TemplateCustomizePage />
      },
      {
        path: 'saved',
        element: <SavedPage />
      },
      {
        path: 'account',
        element: <AccountPage />
      },
      {
        path: 'brand',
        element: <BrandKit />
      },
      {
        path: 'components',
        element: <ResourcesComponentShowcase />
      },
      {
        path: 'brand-logo',
        element: <BrandLogoShowcase />
      },
      {
        path: 'primary-action',
        element: <PrimaryActionShowcase />
      },
      {
        path: 'global-primary-action',
        element: <GlobalPrimaryActionShowcase />
      },
      {
        path: 'secondary-action',
        element: <SecondaryActionShowcase />
      },
      {
        path: 'document-system-demo',
        element: <DocumentSystemDemo />
      }
    ]
  }
]);