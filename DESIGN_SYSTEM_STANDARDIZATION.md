# Guardrail HR Design System Standardization

## Design System Enforcer Report

This document tracks the standardization of all pages to match the homepage design system.

---

## ✅ GLOBAL FRAME STANDARDIZATION

### **Navigation (RootLayout.tsx)** ✅ COMPLETE

**Parity Checklist:**
- ✅ Nav height: `h-[72px]` (72px)
- ✅ Nav max-width: `max-w-[1200px]` (1200px)
- ✅ Nav padding: `px-6 xl:px-8`
- ✅ Sticky positioning: `sticky top-0 z-50`
- ✅ Border: `border-b border-white/[0.08]`
- ✅ Background: `bg-[#0a0a0a]/80 backdrop-blur-xl`
- ✅ Active nav state: `bg-white/[0.06]`
- ✅ Hover nav state: `hover:bg-white/[0.04]`
- ✅ Typography: `text-[14px] font-medium`
- ✅ Mobile menu spacing: `px-6 py-4`
- ✅ Mobile menu items: `px-4 py-3 rounded-xl text-[15px]`

### **Global Layout Rules** ✅ ENFORCED

**All Pages Must Follow:**
- ✅ Page max-width: `max-w-[1080px]` (consistent across all pages)
- ✅ Page horizontal padding: `px-6 xl:px-8`
- ✅ First section top spacing: `pt-16 sm:pt-20 xl:pt-24`
- ✅ Section vertical spacing: `py-16 sm:py-20 xl:py-24`
- ✅ Last section bottom spacing: `pb-16 sm:pb-20 xl:py-24`
- ✅ Breadcrumb: `py-4` with same max-width/padding as page
- ✅ Consistent breathing room top and bottom

---

## ✅ CORE DESIGN SYSTEM COMPONENTS

Created `/src/app/components/shared/DesignSystem.tsx` with the following reusable components:

### **Component Library**

1. **PageHeader** - Consistent page header (eyebrow + title + subtitle + optional action)
2. **SectionHeader** - Section headers matching homepage "Product capabilities" style
3. **CardShell** - Standard card container with homepage styling
4. **CardGrid** - Grid layouts (1col mobile, 2/3col desktop, optional divider)
5. **LinkRow** - Inline text links with arrow-right (no chevrons)
6. **Chip/Badge** - Status badges with consistent sizing
7. **Section** - Page section wrapper with standard spacing
8. **EmptyState** - Standard empty state pattern
9. **StatRow** - Two-column stat display for data rows

### **Design Tokens (Extracted from Homepage)**

**Spacing (8pt Grid):**
- Component padding: 24px (px-6), 32px (px-8), 40px (px-10)
- Section spacing: 64px (py-16), 80px (py-20), 96px (py-24)
- Row spacing: 16px (space-y-4), 20px (space-y-5), 24px (space-y-6)

**Typography Hierarchy:**
- Page title: `text-[24px] sm:text-[28px] xl:text-[32px]`
- Section title: `text-[17px]`
- Body: `text-[14px] sm:text-[15px]`
- Caption/eyebrow: `text-[11px] uppercase tracking-wider`
- Link: `text-[13px]`

**Color Tokens:**
- Primary: `#5b6ff5`
- Background: `#0a0a0a`
- Card background: `bg-white/[0.03]`
- Border: `border-white/[0.08]`
- Text: `white` (primary), `gray-400` (secondary), `gray-500` (tertiary)

**Interaction:**
- Card hover: `hover:bg-white/[0.02]`
- Active state: `bg-white/[0.03] border-l-2 border-l-[#5b6ff5]/40`
- Link hover: `hover:text-gray-400`
- Active press: `active:bg-white/[0.02]`

**Shadows:**
- Card: `shadow-[0_2px_8px_rgba(0,0,0,0.4)]`
- Card hover: `shadow-[0_4px_16px_rgba(0,0,0,0.5)]`

**Radii:**
- Small: `rounded-lg` (8px)
- Medium: `rounded-xl` (12px)
- Large: `rounded-2xl` (16px)

---

## ✅ PAGE STANDARDIZATION STATUS

### **1. WageHourModule.tsx** ✅ COMPLETE

**Parity Checklist:**
- ✅ Replaced custom max-width with `Section` component (1080px standard)
- ✅ Standardized breadcrumb styling (text-gray-500, border-white/[0.08])
- ✅ Updated header to use `PageHeader` component
- ✅ Replaced custom cards with `CardShell` component
- ✅ Updated "View all →" link to use `LinkRow` component
- ✅ Standardized grid spacing (gap-4, gap-5)
- ✅ Fixed typography hierarchy to match homepage
- ✅ Updated Check icon color to `#5b6ff5` (was `/50 opacity)
- ✅ Consistent `tracking-tight` and `leading-tight` usage
- ✅ Mobile-first padding: px-6 xl:px-8

**Before → After:**
- Custom padding `px-5 xl:px-8` → Standard `px-6 xl:px-8`
- Custom cards `bg-[#161616] border-gray-900/50` → `CardShell` with `bg-white/[0.03] border-white/[0.08]`
- Custom hover states → `CardShell hover` prop
- Custom link `text-gray-500 hover:text-gray-400` → `LinkRow` component
- Inconsistent spacing → 8pt grid rhythm

---

### **2. WageHourResultsPage.tsx** ✅ COMPLETE

**Parity Checklist:**
- ✅ Uses `PageContainer` component for consistent wrapper
- ✅ Uses `Breadcrumb` component with standardized styling
- ✅ Updated max-width from `960px` → `1080px` (ResultsPage component)
- ✅ Updated padding from `px-5` → `px-6 xl:px-8`
- ✅ Updated vertical spacing to `py-12 sm:py-16 xl:py-20`
- ✅ Consistent border: `border-white/[0.08]`
- ✅ All breadcrumb items follow standard pattern

**Before → After:**
- Custom breadcrumb markup → `Breadcrumb` component
- Custom page wrapper → `PageContainer` component
- ResultsPage max-width `960px` → `1080px` (matches homepage)
- Padding `px-5 xl:px-8` → `px-6 xl:px-8` (consistent)

---

### **3. ModuleDashboard.tsx** ✅ COMPLETE

**Parity Checklist:**
- ✅ Uses `PageContainer` for consistent wrapper
- ✅ Uses `Section` component (1080px max-width, standard padding)
- ✅ Uses `PageHeader` component for title/subtitle
- ✅ Updated all cards to use standardized styling:
  - `bg-white/[0.03]` instead of `bg-[#161616]`
  - `border-white/[0.08]` instead of `border-gray-900/50`
  - `rounded-2xl` (consistent radius)
- ✅ Updated grid spacing: `gap-5` (instead of `gap-4`)
- ✅ Fixed typography with `tracking-tight` and `leading-tight/relaxed`
- ✅ Standardized badge colors: `bg-white/[0.04]` instead of `bg-gray-800/50`
- ✅ Updated hover states to match homepage card hover
- ✅ Updated padding from `px-5` → `px-6 xl:px-8`

**Before → After:**
- Max-width `960px` → `1080px` (via Section component)
- Custom cards → Standardized card styling
- Padding `px-5 xl:px-8` → `px-6 xl:px-8`
- Typography sizes now match hierarchy
- Grid gap `4` → `5` (homepage standard)

---

### **4. LandingPage.tsx** ✅ REFERENCE STANDARD

This page defines the design system. All other pages must match its:
- Section spacing rhythm
- Card styling
- Typography hierarchy
- Interaction patterns
- Color usage
- Border/shadow treatment

---

## 📋 STANDARDIZATION RULES

### **Typography**
- ✅ No new font sizes allowed
- ✅ Always use `tracking-tight` on headings
- ✅ Always use `leading-tight` or `leading-relaxed` on body text
- ✅ Eyebrows: `text-[11px] uppercase tracking-wider font-medium text-gray-500`

### **Colors**
- ✅ No new color values allowed
- ✅ Primary blue: `#5b6ff5` only
- ✅ Backgrounds: `#0a0a0a` (page), `white/[0.03]` (card)
- ✅ Borders: `white/[0.08]` (default), `white/[0.06]` (subtle divider)
- ✅ Text: `white`, `gray-400`, `gray-500` only

### **Spacing**
- ✅ All spacing must follow 8pt grid
- ✅ Section vertical: `py-16 sm:py-20 xl:py-24`
- ✅ Card padding: `p-6 sm:p-8`
- ✅ Row gaps: `gap-4`, `gap-5`, `gap-6` only

### **Cards**
- ✅ Always use `CardShell` component
- ✅ Border radius: `rounded-2xl` (16px)
- ✅ No custom card backgrounds allowed
- ✅ Hover: Use `CardShell hover` prop, not custom hover states

### **Links**
- ✅ Always use `LinkRow` component for inline links
- ✅ Arrow right only (no chevrons in text links)
- ✅ Size: `text-[13px]`
- ✅ Colors: `text-gray-600 hover:text-gray-400`

### **Grids**
- ✅ Mobile: 1 column
- ✅ Desktop: 2 or 3 columns with `md:` breakpoint
- ✅ Gap: `gap-4` or `gap-5` only
- ✅ Divider grids: `gap-px bg-white/[0.08]`

---

## 🎯 NEXT PAGES TO STANDARDIZE

**Priority Order:**

1. **WageHourDisclosurePage.tsx** - Critical user flow
2. **Dashboard.tsx** - Main navigation hub
3. **AccountPage.tsx** - Settings
4. **PricingPage.tsx** - Marketing

**For Each Page:**
1. Import design system components
2. Replace custom cards with `CardShell`
3. Update headers to `PageHeader` or `SectionHeader`
4. Fix typography to match hierarchy
5. Update links to use `LinkRow`
6. Fix spacing to 8pt grid
7. Document changes in parity checklist

---

## ✅ ACCEPTANCE CRITERIA

For a page to be considered "standardized":

- [ ] Uses `Section` wrapper with standard max-width (1080px)
- [ ] All cards use `CardShell` component
- [ ] Headers use `PageHeader` or `SectionHeader`
- [ ] All inline links use `LinkRow`
- [ ] No custom typography sizes (must use existing hierarchy)
- [ ] No custom colors (must use design tokens)
- [ ] Spacing follows 8pt grid
- [ ] Mobile padding: `px-6 xl:px-8`
- [ ] No visual drift from homepage at any breakpoint
- [ ] No cramped text on mobile (proper line-height, padding)

---

## 📝 NOTES

- **DO NOT** introduce new visual styles
- **DO NOT** create new spacing values
- **DO NOT** add new color variations
- **ALWAYS** derive from homepage patterns
- **ALWAYS** test mobile and desktop breakpoints
- **ALWAYS** check alignment and spacing rhythm

---

## 🔍 DESIGN SYSTEM HEALTH CHECK

Run this checklist on any page:

1. **Color Audit**: Only `#5b6ff5`, `white`, `gray-400`, `gray-500`, `white/[0.03]`, `white/[0.08]`?
2. **Typography Audit**: Only standard sizes from hierarchy?
3. **Spacing Audit**: All spacing divisible by 8px?
4. **Component Audit**: Using shared components instead of custom markup?
5. **Mobile Audit**: No cramped text, proper touch targets, readable without zoom?
6. **Interaction Audit**: Hover/active states match homepage patterns?

If any check fails → Fix immediately before shipping.

---

**Last Updated:** January 27, 2026  
**Enforcer:** Design Systems Team  
**Status:** Active Standardization in Progress