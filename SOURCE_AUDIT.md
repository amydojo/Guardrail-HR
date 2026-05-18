# Source Audit — Guardrail HR

This is a read-only inventory of the current source structure. No code changes were made during this audit. Source cleanup and refactoring are intentionally deferred until the route map and product-sensitive files are confirmed.

This audit identifies structure and risk areas. It does not validate legal correctness, scoring correctness, accessibility compliance, or production security. 

Confirm demo/showcase routes are removed, hidden, or clearly inaccessible before public launch.

---

## 1. App Entry & Build Surface

| Path | Purpose | Status | Risk if Modified | Notes |
|---|---|---|---|---|
| `index.html` | Vite entry point; mounts `#root` div | Confirmed active | High | Do not remove or rename root div |
| `src/main.tsx` | React root; calls `createRoot`, loads `App`, imports `styles/index.css` | Confirmed active | High | App will not render if broken |
| `src/app/App.tsx` | Root React component; wraps `ThemeProvider`, `SavedItemsProvider`, `RouterProvider`, `Toaster` | Confirmed active | High | Provider order affects all context consumers |
| `src/app/routes.tsx` | Defines all app routes via `createBrowserRouter`; imports all page components | Confirmed active | High | All navigation depends on this file |
| `src/styles/index.css` | Imported by `main.tsx`; presumed to compose other CSS files | Confirmed active | Medium | Entry point for all styles |

---

## 2. Route Map

| Route | Source File | Purpose | Active/Demo/Unknown | Risk if Modified | Notes |
|---|---|---|---|---|---|
| `/` | `pages/LandingPage.tsx` | Marketing/home; state-aware (pre/post scan) | Unknown | High | Uses mock scan data; real state not yet wired |
| `/dashboard` | `pages/Dashboard.tsx` | User dashboard; shows assessment score, saved items | Unknown | High | Mock data; PremiumPricingModal wired |
| `/modules` | `pages/ModuleDashboard.tsx` | Module selection hub | Unknown | Medium | — |
| `/modules/wage-hour` | `pages/modules/WageHourModule.tsx` | Wage & Hour module entry; mock re-run state | Unknown | High | Mock `isRerun` flag |
| `/modules/wage-hour/disclosure` | `pages/modules/WageHourDisclosurePage.tsx` | Pre-assessment legal disclosure | Unknown | High | Contains product legal/safety copy |
| `/modules/wage-hour/assessment` | `pages/modules/WageHourAssessmentPage.tsx` | Assessment flow (23 questions) | Unknown | High | Many questions are mock placeholders — see Section 5 |
| `/modules/wage-hour/results` | `pages/modules/WageHourResultsPage.tsx` | Results display | Unknown | High | Hardcoded mock score (72) and answers |
| `/resources` | `pages/resources/ResourcesHubRedesigned.tsx` | Resources and templates hub | Unknown | Medium | Appears to be active redesigned version |
| `/resources/wage-hour` | `pages/resources/ResourcesHubRedesigned.tsx` | Filtered resources view | Unknown | Low | Same component as `/resources` |
| `/resources/overtime-calculator` | `pages/resources/OvertimeCalculatorPage.tsx` | Overtime calculator tool | Unknown | Medium | — |
| `/resources/:slug` | `pages/resources/ResourceDetail.tsx` | Individual resource detail | Unknown | Medium | — |
| `/resources/templates/:slug` | `pages/resources/TemplateDetail.tsx` | Individual template detail | Unknown | Medium | — |
| `/resources/templates/:slug/customize` | `pages/TemplateCustomizePage.tsx` | Template field customization | Unknown | Medium | — |
| `/templates/preview` | `pages/TemplatePreviewPage.tsx` | Template preview | Unknown | Medium | Separate route from resources path |
| `/templates/:slug/customize` | `pages/TemplateCustomizePage.tsx` | Template customization (duplicate route) | Unknown | Low | Appears to duplicate `/resources/templates/:slug/customize` |
| `/saved` | `pages/SavedPage.tsx` | User's saved resources and templates | Unknown | Low | Depends on `SavedItemsContext` |
| `/account` | `pages/AccountPage.tsx` | Account/settings page | Unknown | Low | — |
| `/unlock-plus` | `pages/UnlockPlusPage.tsx` | Guardrail Plus upgrade page | Unknown | High | Gating/pricing surface |
| `/pricing` | `pages/PricingPage.tsx` | Pricing page with FAQ; legal disclaimer present | Unknown | High | Contains "Is this legal advice?" FAQ answer |
| `/state-aware-pricing` | `pages/StateAwarePricingPage.tsx` | Pricing page that adapts to assessment state | Unknown | High | Gating logic present |
| `/home-demo` | `pages/HomeDemoPage.tsx` | Pre/post scan home demo with toggle controls | **Demo/Showcase** | Low | Explicit demo purpose; has demo toggle UI |
| `/locked-state-demo` | `pages/LockedStateDemoPage.tsx` | Locked/unlocked state demo with controls | **Demo/Showcase** | Low | Explicit "Demo Controls" UI |
| `/pricing-modal-demo` | `pages/PricingModalDemoPage.tsx` | PremiumPricingModal demo; `alert()` on unlock | **Demo/Showcase** | Low | Uses `alert()` placeholder for Stripe |
| `/state-aware-pricing-demo` | `pages/StateAwarePricingDemoPage.tsx` | StateAwarePricingPage demo with mock data | **Demo/Showcase** | Low | Wraps StateAwarePricingPage with demo controls |
| `/brand` | `pages/BrandKit.tsx` | Brand/logo concept exploration | **Demo/Showcase** | Low | Logo SVG variants; not a product page |
| `/brand-logo` | `pages/BrandLogoShowcase.tsx` | Brand logo showcase | **Demo/Showcase** | Low | — |
| `/components` | `pages/ResourcesComponentShowcase.tsx` | Resource component showcase | **Demo/Showcase** | Low | — |
| `/primary-action` | `pages/PrimaryActionShowcase.tsx` | PrimaryAction component showcase | **Demo/Showcase** | Low | — |
| `/global-primary-action` | `pages/GlobalPrimaryActionShowcase.tsx` | GlobalPrimaryAction showcase | **Demo/Showcase** | Low | — |
| `/secondary-action` | `pages/SecondaryActionShowcase.tsx` | SecondaryAction showcase | **Demo/Showcase** | Low | — |
| `/document-system-demo` | `pages/DocumentSystemDemo.tsx` | Document system showcase with demo templates | **Demo/Showcase** | Low | Uses Demo* document components |

---

## 3. Page Inventory

| Path | Purpose | Active/Demo/Unknown | Risk if Modified | Recommendation |
|---|---|---|---|---|
| `src/app/pages/LandingPage.tsx` | Home/marketing page | Unknown | High | Confirm state-awareness wiring before touching |
| `src/app/pages/Dashboard.tsx` | User dashboard | Unknown | High | Mock data; confirm before any data wiring |
| `src/app/pages/ModuleDashboard.tsx` | Module hub | Unknown | Medium | Confirm if other modules are planned |
| `src/app/pages/modules/WageHourModule.tsx` | W&H module intro | Unknown | High | Entry to assessment flow |
| `src/app/pages/modules/WageHourDisclosurePage.tsx` | Legal disclosure before assessment | Unknown | High | Review before changing any copy |
| `src/app/pages/modules/WageHourAssessmentPage.tsx` | Assessment flow | Unknown | High | Most questions are mock — confirm before launch |
| `src/app/pages/modules/WageHourResultsPage.tsx` | Results display | Unknown | High | Hardcoded mock score; confirm before launch |
| `src/app/pages/resources/ResourcesHubRedesigned.tsx` | Resources/templates hub | Unknown | Medium | Appears to be the active version |
| `src/app/pages/resources/ResourceDetail.tsx` | Resource detail | Unknown | Medium | — |
| `src/app/pages/resources/TemplateDetail.tsx` | Template detail | Unknown | Medium | — |
| `src/app/pages/resources/OvertimeCalculatorPage.tsx` | Overtime calculator | Unknown | Medium | — |
| `src/app/pages/TemplatePreviewPage.tsx` | Template preview | Unknown | Medium | — |
| `src/app/pages/TemplateCustomizePage.tsx` | Template customization | Unknown | Medium | — |
| `src/app/pages/SavedPage.tsx` | Saved items | Unknown | Low | Depends on localStorage via context |
| `src/app/pages/AccountPage.tsx` | Account | Unknown | Low | Unclear if wired to real auth |
| `src/app/pages/UnlockPlusPage.tsx` | Upgrade/gating | Unknown | High | Gating surface; review before touching |
| `src/app/pages/PricingPage.tsx` | Pricing | Unknown | High | Legal disclaimer copy; review before touching |
| `src/app/pages/StateAwarePricingPage.tsx` | State-aware pricing | Unknown | High | Gating logic; review before touching |
| `src/app/pages/RootLayout.tsx` | App shell/nav | Unknown | High | Navigation affects all routes |
| `src/app/pages/HomeDemoPage.tsx` | Demo: home states | Demo/Showcase | Low | Safe to remove after product confirms |
| `src/app/pages/LockedStateDemoPage.tsx` | Demo: locked states | Demo/Showcase | Low | Safe to review for removal |
| `src/app/pages/PricingModalDemoPage.tsx` | Demo: pricing modal | Demo/Showcase | Low | Safe to review for removal |
| `src/app/pages/StateAwarePricingDemoPage.tsx` | Demo: pricing states | Demo/Showcase | Low | Safe to review for removal |
| `src/app/pages/BrandKit.tsx` | Brand exploration | Demo/Showcase | Low | Likely removable after brand is finalized |
| `src/app/pages/BrandLogoShowcase.tsx` | Logo showcase | Demo/Showcase | Low | — |
| `src/app/pages/ResourcesComponentShowcase.tsx` | Component showcase | Demo/Showcase | Low | — |
| `src/app/pages/PrimaryActionShowcase.tsx` | Component showcase | Demo/Showcase | Low | — |
| `src/app/pages/GlobalPrimaryActionShowcase.tsx` | Component showcase | Demo/Showcase | Low | — |
| `src/app/pages/SecondaryActionShowcase.tsx` | Component showcase | Demo/Showcase | Low | — |
| `src/app/pages/DocumentSystemDemo.tsx` | Document system showcase | Demo/Showcase | Low | — |

---

## 4. Layout & Navigation

| Path | Purpose | Risk if Modified | Notes |
|---|---|---|---|
| `src/app/pages/RootLayout.tsx` | App shell; sticky nav, mobile menu, `<Outlet />` for routes | High | All routes render inside this layout |
| `src/app/App.tsx` | Root component; provider tree (`ThemeProvider` → `SavedItemsProvider` → `RouterProvider`) | High | Provider order matters for context consumers |
| `src/app/context/ThemeContext.tsx` | Theme state (light/dark/system); persists to `localStorage` under `guardrail-theme` | Medium | Changing key breaks persisted user preference |
| `src/app/context/SavedItemsContext.tsx` | Saved resources/templates state; persists to `localStorage` under `gr-saved-items` | Medium | Changing key loses persisted saved items |
| `src/app/components/BrandLogo.tsx` | Logo component (desktop + mobile variants) | Medium | Used in `RootLayout` nav |
| `src/app/components/shared/Footer.tsx` | Footer; used in `LandingPage` | Low | — |

---

## 5. Assessment / Scoring / Results Logic

| Path | Purpose | Risk if Modified | Product-Sensitive? | Notes |
|---|---|---|---|---|
| `src/app/pages/modules/WageHourAssessmentPage.tsx` | Assessment flow UI; 23-question flow with transitions | High | Yes | **Questions 3–11 and 13–23 are mock placeholders** (`Sample question N for assessment flow demonstration`). Only Q1, Q2, Q12 have real content. Assessment flow is not launch-ready yet |
| `src/app/components/WageHourAssessment.tsx` | Core assessment component; question/answer interface, score calculation | High | Yes | Contains scoring logic; weight-based; review before any changes |
| `src/app/types/assessment.ts` | Type definitions: `AssessmentAnswer`, `AssessmentScore`, `AssessmentState`; version constant `ASSESSMENT_VERSION = 'Wage & Hour v1'` | High | Yes | Version string affects score history keying |
| `src/app/types/drivers.ts` | `DRIVERS` array (risk driver definitions); `QUESTION_TO_SECTION` map; `ASSESSMENT_SECTIONS`; `QuestionMapping` | High | Yes | Drivers define results copy; section map affects scoring breakdown |
| `src/app/components/ResultsPage.tsx` | Original results page component | High | Yes | May be superseded by `ResultsPageRefined`; confirm before removing |
| `src/app/components/ResultsPageRefined.tsx` | Refined results page; imported by `WageHourResultsPage` | High | Yes | Active in production path |
| `src/app/pages/modules/WageHourResultsPage.tsx` | Results page route; **hardcoded mock score of 72 and mock answers** | High | Yes | Not wired to real assessment state |
| `src/app/components/ScoreChangePreview.tsx` | Shows projected vs. current score when answers change | High | Yes | Score interpretation surface |
| `src/app/components/AssessmentDiffView.tsx` | Diff between two assessment runs | High | Yes | Score history display |
| `src/app/components/ScoreBreakdownDrawer.tsx` | Score breakdown by section | High | Yes | Risk interpretation surface |
| `src/app/components/DriverDetailDrawer.tsx` | Detail view for a risk driver | High | Yes | Compliance-adjacent copy |
| `src/app/components/RelatedAnswersDrawer.tsx` | Shows which answers contributed to a driver | High | Yes | Results interpretation surface |
| `src/app/components/HeroResultsPreview.tsx` | Hero-level results preview on landing page | High | Yes | Score display on marketing surface |
| `src/app/utils/assessmentStorage.ts` | Assessment data persistence (localStorage) | Medium | Yes | Changing storage key loses user state |

---

## 6. Pricing / Unlock / Gating

| Path | Purpose | Risk if Modified | Notes |
|---|---|---|---|
| `src/app/pages/PricingPage.tsx` | Full pricing page; monthly/annual toggle; FAQ with legal disclaimer copy | High | Legal disclaimer present ("Is this legal advice?"); review before changing |
| `src/app/pages/UnlockPlusPage.tsx` | Guardrail Plus upgrade page; lists locked capabilities | High | Gating surface; copy should be reviewed |
| `src/app/pages/StateAwarePricingPage.tsx` | Pricing page that adapts to user's assessment state | High | Gating logic; confirm how assessment state is passed |
| `src/app/components/PremiumPricingModal.tsx` | Modal for upgrading to premium; used in Dashboard, ResultsPage, LockedStateDemoPage | High | Core gating UI; used across multiple surfaces |
| `src/app/components/LockedCapabilitiesTeaser.tsx` | Shows locked feature teasers to free users | Medium | Gating UI; confirm locked state logic |

---

## 7. Templates / Resources / Document System

| Path | Purpose | Risk if Modified | Notes |
|---|---|---|---|
| `src/app/pages/resources/ResourcesHubRedesigned.tsx` | Active resources and templates hub; search, filter, save | Medium | Appears to be the live version (`ResourcesHub.tsx` may be older) |
| `src/app/pages/resources/ResourceDetail.tsx` | Individual resource detail page | Medium | — |
| `src/app/pages/resources/TemplateDetail.tsx` | Individual template detail page | Medium | — |
| `src/app/pages/resources/OvertimeCalculatorPage.tsx` | Overtime calculator page | Medium | — |
| `src/app/pages/TemplateCustomizePage.tsx` | Template field customization and generation | Medium | Wires to template export pipeline |
| `src/app/pages/TemplatePreviewPage.tsx` | Template preview (standalone route) | Medium | — |
| `src/app/templates/templateRegistry.ts` | Maps template slugs to components and metadata | High | Central registry; breaking this breaks all template rendering |
| `src/app/templates/renderTemplateToHtml.ts` | Renders template component to HTML for export | High | Core export pipeline step |
| `src/app/templates/exportToDocx.ts` | Exports rendered HTML to `.docx` | High | — |
| `src/app/templates/exportToPdf.ts` | Exports rendered HTML to PDF | High | — |
| `src/app/templates/htmlToDocx.ts` | HTML-to-DOCX conversion utility | High | — |
| `src/app/templates/templateStorage.ts` | Template field value persistence | Medium | Uses localStorage |
| `src/app/templates/TemplatePreviewWrapper.tsx` | Wraps template component for preview rendering | Medium | — |
| `src/app/components/templates/MealRestBreakPolicy.tsx` | Meal & Rest Break Policy template document | High | Policy document copy — product/legal-sensitive |
| `src/app/components/templates/IndependentContractorAgreement.tsx` | Independent Contractor Agreement template | High | Legal document — product/legal-sensitive |
| `src/app/components/templates/TimekeepingPolicy.tsx` | Timekeeping Policy template | High | Policy document — product/legal-sensitive |
| `src/app/components/templates/FieldsPanel.tsx` | Form fields panel for template customization | Medium | — |
| `src/app/components/templates/GenerateSheet.tsx` | Template generation output sheet | Medium | — |
| `src/app/components/templates/TemplateDocument.tsx` | Template document base component | Medium | — |
| `src/app/components/templates/TemplateSpecPage.tsx` | Template spec display page | Medium | — |
| `src/app/components/resources/TemplatePreviewModalV2.tsx` | Active template preview modal (V2); used by `ResourcesHubRedesigned` | Medium | V2 is in active use |
| `src/app/components/resources/TemplatePreviewModal.tsx` | Older template preview modal | Unknown | Possibly superseded by V2 |
| `src/app/components/resources/TemplateCardV2.tsx` | Template card component (V2) | Medium | — |
| `src/app/components/resources/TemplateCardLegal.tsx` | Legal-specific template card variant | Medium | — |
| `src/app/components/resources/OvertimeCalculator.tsx` | Overtime calculator component | Medium | — |
| `src/app/components/resources/OvertimeCalculatorMobile.tsx` | Mobile variant of calculator | Unknown | Possibly superseded by Refined variant |
| `src/app/components/resources/OvertimeCalculatorRefined.tsx` | Refined overtime calculator | Unknown | Three variants exist; active one unconfirmed |
| `src/app/components/PrintableResultsReport.tsx` | Printable results report component | High | May contain disclaimer copy |
| `src/app/data/resourcesData.ts` | Resource content data (part 1) | Medium | Content data |
| `src/app/data/resourcesDataPart2.ts` | Resource content data (part 2) | Medium | Content data |
| `src/app/data/resourcesDataPart3.ts` | Resource content data (part 3) | Medium | Content data |
| `src/app/data/templatesData.ts` | Template definitions and metadata | Medium | Adding/removing templates here changes what appears in the hub |
| `src/utils/templateExport.ts` | Top-level template export utility | High | Export pipeline |

---

## 8. Legal / Disclaimer / Product Safety Copy

| Path | Purpose | Product-Sensitive? | Notes |
|---|---|---|---|
| `src/app/pages/modules/WageHourDisclosurePage.tsx` | "Before you begin" — explains what the assessment provides; explicitly states risk score is informational (0–100), not legal advice | Yes | Do not edit this copy without attorney/product review |
| `src/app/pages/PricingPage.tsx` | FAQ item: "Is this legal advice?" — answer states Guardrail surfaces risk and does not replace legal counsel | Yes | Do not change this answer casually |
| `src/app/components/templates/MealRestBreakPolicy.tsx` | California policy template document | Yes | Policy copy; review before changes |
| `src/app/components/templates/IndependentContractorAgreement.tsx` | Contractor agreement template document | Yes | Legal agreement copy; high risk |
| `src/app/components/templates/TimekeepingPolicy.tsx` | Timekeeping policy template | Yes | Policy copy; review before changes |
| `src/app/components/PrintableResultsReport.tsx` | Printable report; likely includes disclaimer language | Yes | Review before modifying |
| `src/app/components/document-system/DemoMealRestBreakPolicy.tsx` | Demo version of Meal & Rest Break policy | Yes | Demo, but contains policy copy |
| `src/app/components/document-system/DemoTimekeepingPolicy.tsx` | Demo version of Timekeeping policy | Yes | Demo, but contains policy copy |
| `src/app/components/document-system/DemoIndependentContractorAgreement.tsx` | Demo version of contractor agreement | Yes | Demo, but contains legal copy |

---

## 9. Shared Components

| Path | Purpose | Used By / Evidence | Risk if Modified | Notes |
|---|---|---|---|---|
| `src/app/components/shared/DesignSystem.tsx` | Layout primitives: `PageHeader`, `Section`, `CardShell`, `LinkRow`, `Breadcrumb`, `PageContainer` | Used by `WageHourModule`, `WageHourResultsPage`, many others | High | Changing layout primitives breaks all consumers; file explicitly warns "DO NOT modify without updating homepage first" |
| `src/app/components/PrimaryAction.tsx` | Primary CTA button component | `LandingPage`, `WageHourModule`, `RootLayout`, others | High | Core navigation CTA |
| `src/app/components/SecondaryAction.tsx` | Secondary CTA | `WageHourDisclosurePage`, others | Medium | — |
| `src/app/components/BrandLogo.tsx` | Logo (desktop + mobile variants) | `RootLayout` | Medium | — |
| `src/app/components/ThemeToggle.tsx` | Light/dark/system theme toggle | `RootLayout` | Low | — |
| `src/app/components/SaveButton.tsx` | Save/unsave toggle for resources and templates | `ResourcesHubRedesigned`, resource cards | Medium | Depends on `SavedItemsContext` |
| `src/app/components/shared/Footer.tsx` | Footer | `LandingPage` | Low | — |
| `src/app/components/ui/` | shadcn/ui primitives (accordion, button, card, dialog, sheet, table, etc.) | Broadly used across app | High | These are the component library base; changes cascade widely |

---

## 10. Theme / Styling / Design System

| Path | Purpose | Risk if Modified | Notes |
|---|---|---|---|
| `src/styles/index.css` | Style entry point; loaded in `main.tsx` | High | Entry for all styles |
| `src/styles/theme-tokens.css` | Semantic CSS custom properties for light and dark mode (`--bg`, `--surface-*`, `--text-*`, `--accent`, etc.) | High | Changing token names breaks all `theme-*` Tailwind classes |
| `src/styles/theme.css` | Theme styles | High | — |
| `src/styles/tailwind.css` | Tailwind base setup | High | — |
| `src/styles/fonts.css` | Font imports | Low | — |
| `src/styles/templates.css` | Template-specific styles (print/layout for template documents) | Medium | Affects template rendering and export |
| `src/styles/document-print.css` | Print styles for document export | Medium | Affects print and PDF export layout |
| `src/app/components/shared/DesignSystem.tsx` | Design token documentation + shared layout components | High | Includes explicit layout constraints (nav height, max-widths, spacing) |

---

## 11. Data / Constants / Config

| Path | Purpose | Risk if Modified | Notes |
|---|---|---|---|
| `src/app/data/index.ts` | Data barrel; re-exports all resources and templates | Medium | Changing exports breaks consumers |
| `src/app/data/resourcesData.ts` | Resource content (part 1) | Medium | Content changes affect what appears in resources hub |
| `src/app/data/resourcesDataPart2.ts` | Resource content (part 2) | Medium | — |
| `src/app/data/resourcesDataPart3.ts` | Resource content (part 3) | Medium | — |
| `src/app/data/templatesData.ts` | Template definitions and `ALL_TEMPLATES` map | Medium | Changes affect template hub and registry |
| `src/app/types/assessment.ts` | Assessment types; `ASSESSMENT_VERSION = 'Wage & Hour v1'` constant | High | Version affects score history keying |
| `src/app/types/drivers.ts` | `DRIVERS` (risk driver definitions), `QUESTION_TO_SECTION` map, `ASSESSMENT_SECTIONS` | High | Drives results copy and score breakdown logic |
| `src/app/templates/templateRegistry.ts` | Central registry: maps slugs to template components | High | Breaking this breaks all template rendering |
| `src/app/saved/savedStorage.ts` | Saved items localStorage utility | Medium | Changing key loses persisted data |
| `src/app/utils/assessmentStorage.ts` | Assessment data localStorage utility | Medium | Changing key loses persisted assessment state |
| `src/app/utils/pdfGenerator.ts` | PDF generation utility | Medium | Part of export pipeline |
| `src/utils/templateExport.ts` | Template export utility (top-level utils) | High | Part of export pipeline |
| `vite.config.ts` | Vite build configuration | High | Do not modify without understanding build implications |
| `postcss.config.mjs` | PostCSS configuration | Medium | Tailwind processing |

---

## 12. Demo / Showcase / Possibly Unused Files

| Path | Why It Looks Demo/Unused | Evidence | Risk if Removed | Recommendation |
|---|---|---|---|---|
| `src/app/pages/HomeDemoPage.tsx` | Explicit demo purpose; has toggle controls | JSDoc: "Demo page to showcase pre-scan and post-scan states"; route `/home-demo` | Low | Review before removal; confirm `/` covers same states |
| `src/app/pages/LockedStateDemoPage.tsx` | Has "Demo Controls" UI for toggling locked/unlocked | Explicit "Demo Controls" label in component | Low | Review before removal |
| `src/app/pages/PricingModalDemoPage.tsx` | Uses `alert()` placeholder for unlock flow | `alert('Unlock flow would trigger here (Stripe integration)')` | Low | Review before removal; Stripe not integrated |
| `src/app/pages/StateAwarePricingDemoPage.tsx` | Wraps StateAwarePricingPage with mock controls | "Mock assessment data" comment; demo toggle UI | Low | Review before removal |
| `src/app/pages/BrandKit.tsx` | Contains SVG logo concept exploration | Multiple named `LogoA1`, `LogoA2`, etc. SVG variants | Low | Review before removal; brand may not be finalized |
| `src/app/pages/BrandLogoShowcase.tsx` | Logo showcase route `/brand-logo` | Name and route | Low | Review before removal |
| `src/app/pages/ResourcesComponentShowcase.tsx` | Component showcase route `/components` | Name and route | Low | Review before removal |
| `src/app/pages/PrimaryActionShowcase.tsx` | Component showcase | Name and route `/primary-action` | Low | Review before removal |
| `src/app/pages/GlobalPrimaryActionShowcase.tsx` | Component showcase | Name and route `/global-primary-action` | Low | Review before removal |
| `src/app/pages/SecondaryActionShowcase.tsx` | Component showcase | Name and route `/secondary-action` | Low | Review before removal |
| `src/app/pages/DocumentSystemDemo.tsx` | Uses Demo* document components explicitly | JSDoc: "Showcase for the DocumentPreviewFrame system"; uses `DemoMealRestBreakPolicy`, etc. | Low | Review before removal |
| `src/app/components/ResultsPage.tsx` | May be superseded by `ResultsPageRefined.tsx` | `WageHourResultsPage` imports from `ResultsPageRefined`; both exist | Medium | Confirm which is canonical before removing |
| `src/app/components/resources/TemplatePreviewModal.tsx` | V1 modal; V2 is in active use | `ResourcesHubRedesigned` imports `TemplatePreviewModalV2` | Low | Confirm no other consumers before removing |
| `src/app/components/resources/OvertimeCalculatorMobile.tsx` | Three calculator variants exist | `OvertimeCalculator.tsx`, `OvertimeCalculatorMobile.tsx`, `OvertimeCalculatorRefined.tsx` all present | Medium | Confirm which is active before removing any |
| `src/app/components/resources/OvertimeCalculatorRefined.tsx` | Same as above | — | Medium | Review before removal |
| `src/app/components/document-system/DemoMealRestBreakPolicy.tsx` | Explicitly named Demo*; used only in `DocumentSystemDemo` | File prefix "Demo"; only imported in demo page | Low | Safe to remove with demo page; contains policy copy |
| `src/app/components/document-system/DemoTimekeepingPolicy.tsx` | Same as above | — | Low | Same as above |
| `src/app/components/document-system/DemoIndependentContractorAgreement.tsx` | Same as above | — | Low | Same as above |
| `src/app/components/figma/ImageWithFallback.tsx` | Figma-origin component; isolated in `figma/` subfolder | Folder name; unclear if used | Low | Check for imports before removing |
| `src/app/pages/resources/ResourcesHub.tsx` | Possibly superseded by `ResourcesHubRedesigned.tsx` | Route uses `ResourcesHubRedesigned`; both files exist | Medium | Confirm no active consumers before removing |

---

## 13. Risk Register

| Area | Risk | Why It Matters | Recommended Next Step |
|---|---|---|---|
| Assessment questions | Most questions (3–11, 13–23) are mock placeholders | Assessment will not produce valid results with placeholder questions | Confirm full question set before any launch |
| Results / score | `WageHourResultsPage` uses hardcoded mock score (72) and hardcoded answers | Results shown to users are not based on their actual answers | Wire results to real assessment state |
| Scoring logic | Score calculation lives in `WageHourAssessment.tsx` and `types/drivers.ts`; not yet confirmed as deterministic | Inconsistent scoring would produce unreliable compliance guidance | Review and document scoring algorithm |
| Legal/disclaimer copy | Present in `WageHourDisclosurePage`, `PricingPage`, template documents | Copy is compliance-adjacent; wrong framing could create legal exposure | Review all surfaces before launch; do not edit casually |
| Pricing/gating | `PricingPage`, `UnlockPlusPage`, `StateAwarePricingPage`, `PremiumPricingModal` contain gating logic | Gating behavior determines what free vs. paid users see | Confirm whether gating is UI-only or wired to real entitlements |
| `dist/` tracking | `dist/` is committed to the repo | If deployment reads from committed `dist/`, stale builds could reach production | Confirm deployment pipeline before removing `dist/` from git |
| Demo/showcase routes | 11+ demo routes are accessible in the built app | Demo routes with placeholder data and `alert()` stubs could be reached by real users | Confirm whether demo routes are protected or should be removed before launch |
| TypeScript/lint | No `typecheck` or `lint` scripts in `package.json` | Type errors and lint issues are not caught in CI | Confirm TypeScript and ESLint configs before adding scripts |
| State management | Assessment state is not wired end-to-end; answers do not flow to results | Core product flow is incomplete | Full flow integration required before launch |

---

## 14. Recommended Next Engineering Steps

1. **Confirm active route map** — classify every route as Active/Demo/Deprecated with product owner input
2. **Confirm MVP flow** — verify the end-to-end path from `/` → assessment → results is complete and not mock
3. **Replace mock assessment questions** — `WageHourAssessmentPage` has placeholder questions 3–11 and 13–23; confirm the full question set
4. **Wire results to real state** — `WageHourResultsPage` uses hardcoded score 72; confirm state management approach
5. **Review scoring and results logic** — confirm `WageHourAssessment.tsx` scoring is deterministic and results copy is non-advisory
6. **Confirm legal/disclaimer surfaces** — audit all pages with legal-adjacent copy before launch
7. **Confirm pricing/gating behavior** — determine if gating is UI-only or backend-enforced
8. **Decide `dist/` and deployment behavior** — then update `.gitignore` accordingly
9. **Add `typecheck`/`lint` scripts** only after confirming TypeScript and ESLint configurations
10. **Identify safe cleanup candidates** — demo pages, superseded components, and `figma/` contents are lowest risk after product confirms

---

## 15. Do Not Refactor Yet

No source refactor, dead-code removal, or route deletion should happen until the route map and product-sensitive files are confirmed with the product owner. The assessment question data, scoring logic, results state wiring, and legal/disclaimer copy are all unverified for production readiness.
