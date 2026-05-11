# Overtime Calculator Component - Theme Token Conversion Example

This document shows before/after examples of converting the OvertimeCalculatorRefined component to use theme tokens.

## Key Conversions Made

### 1. Container & Card Backgrounds
**Before:**
```tsx
<div className="bg-white/[0.03] rounded-2xl border border-white/[0.08]">
```

**After:**
```tsx
<div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1">
```

### 2. Section Dividers
**Before:**
```tsx
<div className="border-b lg:border-b-0 lg:border-r border-white/[0.06]">
```

**After:**
```tsx
<div className="border-b lg:border-b-0 lg:border-r border-theme-border-2">
```

### 3. Text Hierarchy
**Before:**
```tsx
<h3 className="text-[15px] font-semibold text-white mb-4">Pay settings</h3>
<label className="block text-[13px] text-gray-400 mb-2">Hourly rate</label>
<span className="text-gray-500">$</span>
```

**After:**
```tsx
<h3 className="text-[15px] font-semibold text-theme-text-1 mb-4">Pay settings</h3>
<label className="block text-[13px] text-theme-text-2 mb-2">Hourly rate</label>
<span className="text-theme-text-3">$</span>
```

### 4. Input Fields
**Before:**
```tsx
<input
  className="bg-white/[0.03] border border-white/[0.08] text-white focus:ring-[#5b6ff5]/40 focus:border-[#5b6ff5]/40"
/>
```

**After:**
```tsx
<input
  className="bg-theme-surface-1 border border-theme-border-1 text-theme-text-1 focus:ring-theme-focus/40 focus:border-theme-accent/40"
/>
```

### 5. Buttons with Accent Color
**Before:**
```tsx
<button className="text-gray-500 hover:text-[#5b6ff5]">
  Fill weekdays (8h)
</button>
```

**After:**
```tsx
<button className="text-theme-text-3 hover:text-theme-accent">
  Fill weekdays (8h)
</button>
```

### 6. Warning/Status Badges
**Before:**
```tsx
<div className="bg-yellow-500/5 border border-yellow-500/20">
  <p className="text-yellow-500/90">...</p>
</div>
```

**After:**
```tsx
<div className="bg-theme-warning-bg border border-theme-warning-border">
  <p className="text-theme-warning">...</p>
</div>
```

### 7. Tooltips/Popovers
**Before:**
```tsx
<div className="bg-[#1a1a1a] border border-white/[0.12]">
  <p className="text-gray-400">...</p>
</div>
```

**After:**
```tsx
<div className="bg-theme-surface-3 border border-theme-border-1">
  <p className="text-theme-text-2">...</p>
</div>
```

### 8. Empty State
**Before:**
```tsx
<div className="bg-white/[0.03] border border-white/[0.06]">
  <Info className="text-gray-500" />
  <h4 className="text-white">Instant breakdown</h4>
  <p className="text-gray-500">...</p>
  <button className="text-[#5b6ff5] hover:text-[#4a5ee0]">...</button>
</div>
```

**After:**
```tsx
<div className="bg-theme-surface-1 border border-theme-border-2">
  <Info className="text-theme-icon-2" />
  <h4 className="text-theme-text-1">Instant breakdown</h4>
  <p className="text-theme-text-3">...</p>
  <button className="text-theme-accent hover:text-theme-accent-hover">...</button>
</div>
```

### 9. Results Panel with Accent
**Before:**
```tsx
<div className="bg-white/[0.02] border border-white/[0.06]">
  <div className="text-white text-[32px]">$1,234.56</div>
  <div className="text-gray-500">Regular</div>
  <div className="text-gray-300">$890.00</div>
</div>

<div className="bg-blue-500/5 border border-blue-500/20">
  <p className="text-gray-400">...</p>
</div>
```

**After:**
```tsx
<div className="bg-theme-surface-2 border border-theme-border-2">
  <div className="text-theme-text-1 text-[32px]">$1,234.56</div>
  <div className="text-theme-text-3">Regular</div>
  <div className="text-theme-text-1">$890.00</div>
</div>

<div className="bg-theme-accent-soft border border-theme-accent/20">
  <p className="text-theme-text-2">...</p>
</div>
```

### 10. Chips/Tags
**Before:**
```tsx
<span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
  Estimate
</span>
```

**After:**
```tsx
<span className="bg-theme-success-bg border border-theme-success-border text-theme-success">
  Estimate
</span>
```

---

## Complete Systematic Replacement List

Use find-and-replace (regex or literal) for these patterns:

### Backgrounds
```
bg-white/[0.03]          → bg-theme-surface-1
bg-white/[0.02]          → bg-theme-surface-2
bg-[#1a1a1a]             → bg-theme-surface-3
hover:bg-white/[0.03]    → hover:bg-theme-surface-1
hover:bg-white/[0.04]    → hover:bg-theme-surface-1
hover:bg-white/[0.05]    → hover:bg-theme-surface-1
```

### Borders
```
border-white/[0.08]      → border-theme-border-1
border-white/[0.12]      → border-theme-border-1
border-white/[0.06]      → border-theme-border-2
border-white/[0.04]      → border-theme-border-2
```

### Text
```
text-white               → text-theme-text-1
text-gray-300            → text-theme-text-1
text-gray-400            → text-theme-text-2
text-gray-500            → text-theme-text-3
text-gray-600            → text-theme-text-3
text-gray-700            → text-theme-text-3
hover:text-gray-300      → hover:text-theme-text-1
```

### Accent (Blue)
```
text-[#5b6ff5]           → text-theme-accent
bg-[#5b6ff5]             → bg-theme-accent
border-[#5b6ff5]         → border-theme-accent
hover:text-[#4a5ee0]     → hover:text-theme-accent-hover
hover:bg-[#4a5ee0]       → hover:bg-theme-accent-hover
ring-[#5b6ff5]           → ring-theme-focus
focus:ring-[#5b6ff5]     → focus:ring-theme-focus
bg-[#5b6ff5]/10          → bg-theme-accent-soft
```

### Status - Success
```
text-emerald-400         → text-theme-success
bg-emerald-500/10        → bg-theme-success-bg
border-emerald-500/20    → border-theme-success-border
```

### Status - Warning
```
text-yellow-500          → text-theme-warning
bg-yellow-500/5          → bg-theme-warning-bg
border-yellow-500/20     → border-theme-warning-border
```

### Status - Danger
```
text-red-400             → text-theme-danger
text-red-500             → text-theme-danger
bg-red-500/10            → bg-theme-danger-bg
border-red-500/40        → border-theme-danger-border
```

---

## Testing After Conversion

1. **Dark Mode Test:**
   - Set theme to Dark
   - Component should look identical to before conversion
   - No visual regressions

2. **Light Mode Test:**
   - Set theme to Light
   - Verify:
     - White cards on off-white background
     - Text is highly readable
     - Borders are subtle but visible
     - Blue accent pops
     - Status colors (green/yellow/red) are clear

3. **Interaction Test:**
   - Focus states visible (blue ring)
   - Hover states change color appropriately
   - Error states show red clearly
   - All text remains legible in both themes

---

## Notes

- Keep all spacing, sizing, and layout identical
- Only change color-related classes
- Don't add new styling or features during conversion
- If a hardcoded color doesn't have a direct token equivalent, document it and decide on the best semantic token to use
