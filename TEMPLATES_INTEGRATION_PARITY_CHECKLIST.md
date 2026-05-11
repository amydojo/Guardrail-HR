# Templates Integration - Homepage Parity Checklist

## ✅ FILES UPDATED

### New Files Created:
1. `/src/app/data/templatesData.ts` - Template data structure with 6 complete templates
2. `/src/app/pages/resources/TemplateDetail.tsx` - Template detail page component
3. `/TEMPLATES_INTEGRATION_PARITY_CHECKLIST.md` - This parity report

### Files Modified:
1. `/src/app/pages/resources/ResourcesHub.tsx` - Added 2-tab interface (Library + Templates)
2. `/src/app/routes.tsx` - Added route for `/resources/templates/:slug`
3. `/src/app/data/index.ts` - Exported template data structures

---

## ✅ HOMEPAGE PARITY STANDARDIZATION

### Container Width + Padding
**Standard Applied:**
- ✅ Max width: `max-w-[1080px]` (ResourcesHub uses PageContainer)
- ✅ Horizontal padding: `px-6 xl:px-8`
- ✅ Vertical padding: `py-12 sm:py-16`
- ✅ Template detail page: `max-w-[800px]` (matches ResourceDetail)

**Files Enforcing:**
- ResourcesHub.tsx: Uses `<PageContainer>` component
- TemplateDetail.tsx: `max-w-[800px] px-6 xl:px-8 py-12 sm:py-16`

---

### Section Spacing
**Standard Applied:**
- ✅ Large sections: `mb-16` (using `<Section spacing="large">`)
- ✅ Medium sections: `mb-12` 
- ✅ Small sections: `mb-10`
- ✅ Subsection spacing: `mb-6`

**Files Enforcing:**
- ResourcesHub.tsx: Uses `<Section spacing="large">` wrapper
- TemplateDetail.tsx: Consistent `mb-10` between major sections

---

### CardShell Pattern
**Standard Applied:**
- ✅ Primary cards: `bg-white/[0.03] border border-white/[0.08] rounded-2xl`
- ✅ Subtle cards: `bg-white/[0.02] border border-white/[0.04] rounded-xl`
- ✅ Hover states: `hover:bg-white/[0.05] hover:border-white/[0.1]`
- ✅ Padding: `p-5` or `p-6` depending on content density

**Files Enforcing:**
- ResourcesHub.tsx:
  - Template rows: `bg-white/[0.03] border-white/[0.08] rounded-2xl p-5`
  - Empty state: `bg-white/[0.02] border-white/[0.04] rounded-2xl p-8`
- TemplateDetail.tsx:
  - Hero card: `bg-white/[0.03] border-white/[0.08] rounded-2xl p-6`
  - 3-min version: `bg-white/[0.03] border-white/[0.08] rounded-2xl p-6`
  - Ask counsel: `bg-white/[0.02] border-white/[0.04] rounded-xl p-5`
  - Accordion items: `bg-white/[0.03] border-white/[0.08] rounded-2xl`

---

### Typography System
**Standard Applied:**

**Page Headers:**
- ✅ H1: `text-[28px] sm:text-[32px] font-semibold text-white tracking-tight leading-tight`
- ✅ Subtitle: `text-[15px] sm:text-[16px] text-gray-400 leading-[1.65]`

**Section Headers:**
- ✅ H2: `text-[20px] sm:text-[24px] font-semibold text-white tracking-tight leading-tight`
- ✅ H3: `text-[17px] font-semibold text-white tracking-tight leading-tight`

**Body Text:**
- ✅ Primary: `text-[15px] text-gray-400 leading-[1.65]`
- ✅ Secondary: `text-[14px] text-gray-400 leading-[1.65]`
- ✅ Tertiary: `text-[13px] text-gray-500`
- ✅ Small: `text-[12px] text-gray-600`
- ✅ Uppercase labels: `text-[14px] font-medium text-gray-400 uppercase tracking-wide`

**Files Enforcing:**
- All typography scales match homepage exactly
- No new font sizes introduced
- No font weight deviations from homepage

---

### Chips Pattern
**Standard Applied:**
- ✅ Default: `px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-[13px] text-gray-500`
- ✅ Small: `px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-lg text-[12px] text-gray-500`
- ✅ Status chips (updated): `bg-[#5b6ff5]/8 text-[#5b6ff5]/90`
- ✅ Status chips (new): `bg-emerald-500/8 text-emerald-400/90`

**Files Enforcing:**
- ResourcesHub.tsx: Template metadata chips (jurisdiction, module, type, version)
- TemplateDetail.tsx: Header chips row (5 chips total)

---

### Button Styles
**Standard Applied:**

**Primary:**
- ✅ `bg-[#5b6ff5] text-white hover:bg-[#4a5ee0] rounded-xl px-5 py-2.5 text-[15px] font-medium`

**Secondary:**
- ✅ `border border-white/[0.08] text-gray-400 hover:bg-white/[0.03] rounded-xl px-5 py-2.5 text-[15px] font-medium`

**State Active (in plan):**
- ✅ `bg-[#5b6ff5]/10 border-[#5b6ff5]/30 text-[#5b6ff5]`

**State Complete:**
- ✅ `bg-emerald-500/10 border-emerald-500/20 text-emerald-400`

**Files Enforcing:**
- TemplateDetail.tsx: Download (primary), Add to plan (secondary/active), Upload proof (secondary/complete)

---

### Link Styles
**Standard Applied:**
- ✅ Default: `text-[14px] text-[#5b6ff5] hover:text-[#4a5ee0] transition-colors`
- ✅ With arrow: Uses `ArrowRight` icon (not ChevronRight)
- ✅ Back links: `text-[13px] text-gray-500 hover:text-gray-300` with `ArrowLeft`
- ✅ Small links: `text-[13px] text-gray-500`

**Files Enforcing:**
- ResourcesHub.tsx: Template rows use `ArrowRight`
- TemplateDetail.tsx: Back link, related resources links

---

### Tab Control (Segmented Control)
**Standard Applied:**
- ✅ Container: `inline-flex items-center gap-1 p-1 bg-white/[0.03] rounded-xl border border-white/[0.06]`
- ✅ Tab button: `px-5 py-2 rounded-lg text-[14px] font-medium`
- ✅ Active: `bg-white/[0.08] text-white`
- ✅ Inactive: `text-gray-500 hover:text-gray-300`

**Design Note:** Uses existing chip styling system, no new component styles created

**Files Enforcing:**
- ResourcesHub.tsx: Library/Templates tab switcher

---

### Toast Notifications
**Standard Applied:**
- ✅ `fixed top-6 right-6 z-50`
- ✅ `bg-white/[0.08] backdrop-blur-xl rounded-xl border border-white/[0.12] px-5 py-3`
- ✅ Text: `text-[14px] text-white font-medium`
- ✅ Auto-dismiss: 3 seconds

**Files Enforcing:**
- TemplateDetail.tsx: Download, add to plan, upload proof toasts

---

### Filter Bar Pattern
**Standard Applied:**
- ✅ Sticky state: `sticky top-0 z-40 -mx-6 xl:-mx-8 px-6 xl:px-8 py-4 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.08]`
- ✅ Default state: No background, natural flow
- ✅ Filter pills: Existing `<FilterPill>` component (unchanged)
- ✅ Result count: `text-[13px] text-gray-500 ml-auto`

**Files Enforcing:**
- ResourcesHub.tsx: Both Library and Templates tabs use identical filter bar pattern

---

### Accordion Pattern
**Standard Applied:**
- ✅ Container: `bg-white/[0.03] rounded-2xl border border-white/[0.08] overflow-hidden`
- ✅ Trigger: `w-full px-6 py-5 flex items-start justify-between hover:bg-white/[0.02]`
- ✅ Icon: `ChevronDown` with `rotate-180` when expanded
- ✅ Content: `px-6 pb-6 pt-2` with `max-h` transition

**Files Enforcing:**
- TemplateDetail.tsx: Implementation steps accordion

---

### List Rows Pattern
**Standard Applied:**
- ✅ Row: `block bg-white/[0.03] rounded-2xl border border-white/[0.08] p-5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all group`
- ✅ Title: `text-[17px] font-semibold text-white mb-2 tracking-tight leading-tight`
- ✅ Description: `text-[14px] text-gray-500 leading-[1.65] mb-3`
- ✅ Arrow: `ArrowRight w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0`

**Files Enforcing:**
- ResourcesHub.tsx: Template list rows (both recommended and all templates)
- TemplateDetail.tsx: Related resources rows

---

### Icon Usage
**Standard Applied:**
- ✅ Primary icons: `w-4 h-4` for inline actions
- ✅ Arrow icons: `w-5 h-5` for link affordances
- ✅ Chevron icons: `w-5 h-5` for accordions, `w-3.5 h-3.5` for small controls
- ✅ Status icons: `w-4 h-4` for CheckCircle, AlertCircle, etc.
- ✅ All icons from lucide-react (no new library)

**Files Enforcing:**
- Consistent icon sizing across all components
- ArrowRight for navigation (not ChevronRight)
- ChevronDown/Up for expand/collapse only

---

### Mobile Optimization
**Standard Applied:**
- ✅ Tap targets: Minimum `py-4` (48px height)
- ✅ Text wrapping: `min-w-0` on flex children to prevent overflow
- ✅ Button stacking: `flex-wrap gap-3` on action rows
- ✅ Chip wrapping: `flex-wrap gap-2` on chip rows
- ✅ No horizontal scroll: All content flows naturally

**Files Enforcing:**
- ResourcesHub.tsx: Template rows stack properly, chips wrap
- TemplateDetail.tsx: Action buttons wrap, all sections mobile-friendly

---

### Empty States
**Standard Applied:**
- ✅ Container: `bg-white/[0.02] rounded-2xl border border-white/[0.04] p-8 text-center`
- ✅ Heading: `text-[17px] font-semibold text-white mb-3`
- ✅ Body: `text-[14px] text-gray-500 leading-[1.65] mb-6 max-w-lg mx-auto`
- ✅ CTA: Primary button style

**Files Enforcing:**
- ResourcesHub.tsx: Templates tab empty state (no scan completed)

---

## ✅ INTERACTION PATTERNS

### State Management
**Pattern Applied:**
- ✅ localStorage for persistence: `template-plan-{slug}`, `template-proof-{slug}`
- ✅ React state for UI: `useState` hooks
- ✅ Toast feedback on all actions
- ✅ Button state changes on action (border/background/text color)

### URL State
**Pattern Applied:**
- ✅ Tab state in URL: `?tab=templates`
- ✅ From param preserved: `?from=results` or `?from=dashboard`
- ✅ URL updates without navigation: `setSearchParams` with `replace: true`

### Progressive Disclosure
**Pattern Applied:**
- ✅ Accordions default collapsed
- ✅ Change log collapsed by default
- ✅ Implementation steps collapsible
- ✅ Expand all / collapse all controls where appropriate

---

## ✅ LEGAL/COMPLIANCE FRAMING

### Disclaimers
**Standard Applied:**
- ✅ "Educational tools — not legal advice" on all template pages
- ✅ No claims of "compliant" or "legally sufficient"
- ✅ Jurisdiction, scope, version, reviewed date always visible
- ✅ "Ask counsel if..." triggers prominent on detail pages

**Files Enforcing:**
- TemplateDetail.tsx: Disclaimer footer, ask counsel section, jurisdiction chips

---

## ✅ SUBSCRIPTION VALUE MECHANICS

### Progress Tracking
**Implemented:**
- ✅ "Add to plan" button (localStorage + state change)
- ✅ "Upload proof" button (localStorage + state change)
- ✅ Toast notifications on actions
- ✅ Visual state changes (border/background color)
- ✅ Integration ready for Dashboard display

### Retention Hooks
**Implemented:**
- ✅ Templates trackable (in plan / proof uploaded)
- ✅ Version tracking (users return for updates)
- ✅ Related resources cross-linking
- ✅ Recommended templates based on scan results

---

## ✅ NAVIGATION FLOW

### Routes Preserved:
- ✅ `/resources` - Hub with tabs (no breaking changes)
- ✅ `/resources/:slug` - Resource detail (existing)
- ✅ `/resources/templates/:slug` - Template detail (new)
- ✅ `/resources?tab=templates` - Templates view (new)
- ✅ `/resources?from=results` - Preserved from results page
- ✅ `/resources?from=dashboard` - Preserved from dashboard

### Back Navigation:
- ✅ Template detail → Back to templates (with tab state)
- ✅ Resources hub → Back to results/dashboard (if applicable)
- ✅ All back links use ArrowLeft icon

---

## ❌ REMAINING OUTLIERS

### None Detected
All pages now match homepage parity. The following files remain with known acceptable drift:

**Intentionally Different (Not Outliers):**
1. `WageHourDisclosurePage.tsx` - Assessment flow, different pattern by design
2. `PricingPage.tsx` - Pricing grid, different pattern by design
3. `UnlockPlusPage.tsx` - Upgrade flow, different pattern by design
4. `RelatedAnswersDrawer.tsx` - Drawer component, not full page
5. `ScoreBreakdownDrawer.tsx` - Drawer component, not full page

**These are not outliers** - they serve different UX purposes and should not match resources page patterns.

---

## 📊 STANDARDIZATION SUMMARY

### Container System:
- ✅ PageContainer: `max-w-[1080px]` for index/hub pages
- ✅ Detail pages: `max-w-[800px]` for focused reading
- ✅ Consistent padding: `px-6 xl:px-8`

### Spacing Rhythm:
- ✅ Page padding: `py-12 sm:py-16`
- ✅ Large sections: `mb-16` (Section component)
- ✅ Medium sections: `mb-12`
- ✅ Small sections: `mb-10`
- ✅ Subsections: `mb-6`

### Typography Scale:
- ✅ H1: 28px → 32px
- ✅ H2: 20px → 24px  
- ✅ H3: 17px
- ✅ Body: 15px / 14px / 13px
- ✅ Small: 12px
- ✅ All using homepage weights and leading

### Color System:
- ✅ Primary: `#5b6ff5` (blue)
- ✅ Success: `emerald-500` (green)
- ✅ Warning: `yellow-500` (yellow)
- ✅ Text: `white` / `gray-400` / `gray-500` / `gray-600`
- ✅ Borders: `white/[0.08]` / `white/[0.06]` / `white/[0.04]`
- ✅ Backgrounds: `white/[0.03]` / `white/[0.02]`

### Component Reuse:
- ✅ PageContainer, PageHeader (DesignSystem.tsx)
- ✅ Section (DesignSystem.tsx)
- ✅ FilterPill (existing component)
- ✅ BackToTop (existing component)
- ✅ All icons from lucide-react

---

## ✅ DELIVERABLES COMPLETE

1. ✅ `/resources` converted to 2-tab hub (Library + Templates)
2. ✅ Segmented control using existing chip styling
3. ✅ Templates tab with recommended + all templates sections
4. ✅ Template detail page (`/resources/templates/:slug`)
5. ✅ 6 complete template examples with full data
6. ✅ Progress tracking (add to plan, upload proof, localStorage)
7. ✅ Homepage parity enforced across all components
8. ✅ Mobile-friendly with generous tap targets
9. ✅ Legal disclaimers on all templates
10. ✅ This comprehensive parity checklist

---

## 🎯 ZERO DRIFT ACHIEVED

**No new visual styles introduced:**
- ✅ Typography: Reuses homepage scales exactly
- ✅ Colors: No new color values
- ✅ Shadows: None added (homepage has none)
- ✅ Radii: Uses existing rounded-xl/2xl system
- ✅ Spacing: Uses homepage 8px grid
- ✅ Components: Reuses existing primitives only

**Result:** Templates seamlessly integrated into resources hub with complete homepage parity and zero design system drift.
