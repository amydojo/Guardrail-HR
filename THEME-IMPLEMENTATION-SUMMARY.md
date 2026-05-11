# Guardrail HR Light Mode Implementation Summary

## ✅ COMPLETED

### 1. Theme Token System (`/src/styles/theme-tokens.css`)
**Created comprehensive semantic color tokens:**

```css
/* Supports 3 modes: system, light, dark */
html[data-theme="light"]  /* Off-white bg, white surfaces, strong contrast */
html[data-theme="dark"]   /* True black bg, alpha surfaces, premium feel */
html[data-theme="system"] /* Follows prefers-color-scheme */
```

**Token categories:**
- **Backgrounds:** `--bg`, `--surface-1/2/3`
- **Borders:** `--border-1/2`
- **Text:** `--text-1/2/3`
- **Icons:** `--icon-1/2`
- **Accent:** `--accent-primary/hover/pressed/soft`
- **Chips:** `--chip-bg/text/border`
- **Status:** `--danger/warning/success` (text/bg/border variants)
- **Shadows:** `--shadow-1/2` (minimal in light, very subtle in dark)
- **Focus:** `--focus-ring`

**Tailwind integration:**
All tokens mapped to `--color-theme-*` utilities for use in className like:
- `bg-theme-bg`
- `text-theme-text-1`
- `border-theme-border-1`
- etc.

### 2. Theme Provider (`/src/app/context/ThemeContext.tsx`)
**Functionality:**
- React context for theme state management
- localStorage persistence (`guardrail-theme` key)
- System preference detection via `prefers-color-scheme`
- Listens for system theme changes
- Auto-applies `data-theme` attribute to `<html>`

**API:**
```tsx
const { theme, setTheme, resolvedTheme } = useTheme();
// theme: 'system' | 'light' | 'dark'
// resolvedTheme: 'light' | 'dark' (computed value)
```

### 3. Theme Toggle Component (`/src/app/components/ThemeToggle.tsx`)
**Features:**
- Dropdown menu with 3 options: System / Light / Dark
- Icons: Monitor / Sun / Moon
- Active state indicator
- Helper text explaining functionality
- Click-outside to close
- Mobile-friendly

**Usage:**
```tsx
import { ThemeToggle } from '@/app/components/ThemeToggle';
<ThemeToggle />
```

### 4. Navigation Integration (`/src/app/pages/RootLayout.tsx`)
**Changes:**
- ThemeProvider wraps entire app in `/src/app/App.tsx`
- ThemeToggle added to desktop nav (after Account link)
- ThemeToggle added to mobile menu
- Root layout uses theme tokens:
  - `bg-theme-bg`
  - `border-theme-border-1`
  - `text-theme-text-1`

### 5. Styles Import (`/src/styles/index.css`)
Added `@import './theme-tokens.css';` to load token definitions.

---

## ⚠️ IN PROGRESS / TODO

### Color Token Conversion (Critical)

The theme system is **fully functional**, but most components still use hardcoded colors. They need systematic conversion to theme tokens.

**Conversion pattern example:**
```tsx
// BEFORE
<div className="bg-[#0a0a0a] border border-white/[0.08]">
  <h1 className="text-white">Title</h1>
  <p className="text-gray-400">Body text</p>
  <button className="bg-[#5b6ff5] hover:bg-[#4a5ee0]">Click</button>
</div>

// AFTER
<div className="bg-theme-bg border border-theme-border-1">
  <h1 className="text-theme-text-1">Title</h1>
  <p className="text-theme-text-2">Body text</p>
  <button className="bg-theme-accent hover:bg-theme-accent-hover">Click</button>
</div>
```

**Files requiring conversion (Priority Order):**

#### HIGH PRIORITY (User-Facing Pages)
1. `/src/app/components/resources/OvertimeCalculatorRefined.tsx` ⚠️
2. `/src/app/pages/resources/OvertimeCalculatorPage.tsx` ⚠️
3. `/src/app/components/resources/OvertimeBreakdownDrawer.tsx` ⚠️
4. `/src/app/pages/Dashboard.tsx` ⚠️
5. `/src/app/pages/resources/ResourcesHub.tsx` ⚠️
6. `/src/app/components/ResultsPage.tsx` ⚠️

#### MEDIUM PRIORITY (Assessment Flow)
7. `/src/app/components/WageHourAssessment.tsx`
8. `/src/app/components/AssessmentTransition.tsx`
9. `/src/app/components/ScoreBreakdownDrawer.tsx`
10. `/src/app/components/AssessmentDiffView.tsx`

#### LOWER PRIORITY (Supporting Pages)
11. All resource detail pages in `/src/app/pages/resources/`
12. `/src/app/pages/LandingPage.tsx`
13. `/src/app/pages/ModuleDashboard.tsx`
14. `/src/app/pages/AccountPage.tsx`
15. `/src/app/pages/ActionPlan.tsx`
16. All UI components in `/src/app/components/ui/`

---

## 📋 CONVERSION CHECKLIST (Per File)

For each file, replace:

### Backgrounds
- [ ] `bg-[#0a0a0a]` → `bg-theme-bg`
- [ ] `bg-white/[0.03]` → `bg-theme-surface-1`
- [ ] `bg-white/[0.02]` → `bg-theme-surface-2`
- [ ] `bg-[#1a1a1a]` or `bg-[#161616]` → `bg-theme-surface-1`

### Borders
- [ ] `border-white/[0.08]` or `border-white/[0.12]` → `border-theme-border-1`
- [ ] `border-white/[0.06]` or `border-white/[0.04]` → `border-theme-border-2`
- [ ] `border-gray-800` or `border-gray-900` → `border-theme-border-1`

### Text
- [ ] `text-white` or `text-gray-300` → `text-theme-text-1`
- [ ] `text-gray-400` → `text-theme-text-2`
- [ ] `text-gray-500` or `text-gray-600` → `text-theme-text-3`

### Accent (Blue)
- [ ] `bg-[#5b6ff5]` → `bg-theme-accent`
- [ ] `text-[#5b6ff5]` → `text-theme-accent`
- [ ] `border-[#5b6ff5]` → `border-theme-accent`
- [ ] `hover:bg-[#4a5ee0]` → `hover:bg-theme-accent-hover`
- [ ] `bg-[#5b6ff5]/10` → `bg-theme-accent-soft`

### Hover States
- [ ] `hover:bg-white/[0.03]` → `hover:bg-theme-surface-1`
- [ ] `hover:bg-white/[0.04]` → `hover:bg-theme-surface-1`
- [ ] `hover:text-gray-300` → `hover:text-theme-text-1`

### Status Colors
- [ ] `text-emerald-400` → `text-theme-success`
- [ ] `bg-emerald-500/10` → `bg-theme-success-bg`
- [ ] `border-emerald-500/20` → `border-theme-success-border`
- [ ] `text-yellow-500` → `text-theme-warning`
- [ ] `text-red-400` → `text-theme-danger`

---

## 🎨 THEME TOKEN REFERENCE

### Quick Copy-Paste Tokens

**Backgrounds:**
```
bg-theme-bg          /* Page background */
bg-theme-surface-1   /* Cards, primary surfaces */
bg-theme-surface-2   /* Secondary/nested surfaces */
bg-theme-surface-3   /* Drawers, modals, elevated */
```

**Borders:**
```
border-theme-border-1  /* Standard borders */
border-theme-border-2  /* Subtle/faint borders */
```

**Text:**
```
text-theme-text-1  /* Headings, primary text */
text-theme-text-2  /* Body text, secondary */
text-theme-text-3  /* Muted, tertiary, labels */
```

**Accent:**
```
bg-theme-accent        /* Primary button bg */
text-theme-accent      /* Links, primary color text */
hover:bg-theme-accent-hover
bg-theme-accent-soft   /* Soft accent backgrounds */
```

**Chips/Badges:**
```
bg-theme-chip-bg
text-theme-chip-text
border-theme-chip-border
```

**Status:**
```
/* Success (Green) */
text-theme-success
bg-theme-success-bg
border-theme-success-border

/* Warning (Yellow) */
text-theme-warning
bg-theme-warning-bg
border-theme-warning-border

/* Danger (Red) */
text-theme-danger
bg-theme-danger-bg
border-theme-danger-border
```

---

## 🧪 TESTING CHECKLIST

After converting each file, verify:

### Functionality
- [ ] Theme toggle switches between System/Light/Dark
- [ ] Selection persists after page reload
- [ ] System mode follows OS preference
- [ ] No console errors

### Visual (Dark Mode)
- [ ] Looks identical to before conversion
- [ ] No broken layouts
- [ ] All text readable
- [ ] Borders visible
- [ ] Hover states work

### Visual (Light Mode)
- [ ] Off-white page background (not pure white)
- [ ] White cards stand out from background
- [ ] Text has strong contrast (readable)
- [ ] Borders are subtle but visible
- [ ] Focus rings visible on inputs/buttons
- [ ] Disabled states not washed out
- [ ] Status colors (red/yellow/green) clear

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus rings visible in both themes
- [ ] Text meets WCAG contrast requirements
- [ ] No "gray on gray" illegibility

---

## 🚀 NEXT STEPS

1. **Batch convert high-priority files** using find-replace:
   - Use your code editor's multi-file search/replace
   - Or create a script using `sed` for bulk replacements

2. **Test each converted page** in both light and dark mode

3. **Fix edge cases** where automatic replacement breaks layouts

4. **Polish light mode** if any colors feel off:
   - Adjust token values in `/src/styles/theme-tokens.css`
   - NOT in individual components

5. **Document any design decisions** for future reference

---

## 📝 NOTES

- **DO NOT** redesign layouts or spacing during conversion
- **DO NOT** add new arbitrary hex values (`bg-[#...]`)
- **DO NOT** create new token categories without documenting them
- **ALWAYS** use semantic tokens, not color-specific names
- **TEST** both themes after every significant change

---

## ✨ ACCEPTANCE CRITERIA (Final Check)

- [ ] Theme toggle visible and functional in nav
- [ ] Preference persists across sessions
- [ ] System mode respects OS preference
- [ ] Dark mode looks pixel-identical to original
- [ ] Light mode feels premium (Apple/Linear caliber)
- [ ] No hardcoded colors remain in converted files
- [ ] All pages work in both themes
- [ ] Text is readable in both themes
- [ ] Focus states visible in both themes
- [ ] Disabled states clear in both themes
- [ ] No accessibility regressions

---

## 🎯 CURRENT STATUS

**Infrastructure:** ✅ Complete (100%)
- Theme tokens defined
- Theme provider active
- Toggle component built
- Navigation integrated

**Color Conversion:** ⚠️ In Progress (~5%)
- RootLayout partially converted
- Most components still use hardcoded colors
- Need systematic conversion of 50+ files

**Estimated Remaining Work:** 4-6 hours
- High-priority pages: 2 hours
- Medium-priority pages: 2 hours
- UI components: 1-2 hours
- Testing & polish: 1 hour
