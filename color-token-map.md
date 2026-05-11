# Guardrail HR Color Token Conversion Map

## Background Colors

### Page Background
- `bg-[#0a0a0a]` → `bg-theme-bg`
- `bg-[#0A0A0A]` → `bg-theme-bg`

### Surface Layers (Cards, Panels)
- `bg-white/[0.03]` → `bg-theme-surface-1`
- `bg-white/[0.02]` → `bg-theme-surface-2`
- `bg-[#0a0a0a]` (for drawers/modals) → `bg-theme-surface-3`
- `bg-[#1a1a1a]` → `bg-theme-surface-1`
- `bg-[#161616]` → `bg-theme-surface-1`

## Border Colors
- `border-white/[0.08]` → `border-theme-border-1`
- `border-white/[0.12]` → `border-theme-border-1`
- `border-white/[0.06]` → `border-theme-border-2`
- `border-white/[0.04]` → `border-theme-border-2`
- `border-gray-800` → `border-theme-border-1`
- `border-gray-900` → `border-theme-border-1`

## Text Colors
- `text-white` → `text-theme-text-1`
- `text-gray-300` → `text-theme-text-1`
- `text-gray-400` → `text-theme-text-2`
- `text-gray-500` → `text-theme-text-3`
- `text-gray-600` → `text-theme-text-3`

## Icon Colors
- Icon primary: use `text-theme-icon-1`
- Icon secondary: use `text-theme-icon-2`

## Accent/Primary (Blue)
- `bg-[#5b6ff5]` → `bg-theme-accent`
- `text-[#5b6ff5]` → `text-theme-accent`
- `hover:bg-[#4a5ee0]` → `hover:bg-theme-accent-hover`
- `border-[#5b6ff5]` → `border-theme-accent`
- Soft accent backgrounds: use `bg-theme-accent-soft`

## Chips/Badges (Non-status)
- Background: `bg-theme-chip-bg`
- Text: `text-theme-chip-text`  
- Border: `border-theme-chip-border`

## Status Colors

### Danger/Error (Red)
- Text: `text-theme-danger`
- Background: `bg-theme-danger-bg`
- Border: `border-theme-danger-border`
- Examples: `text-red-400`, `text-red-500`, `bg-red-500/10`

### Warning (Yellow/Amber)
- Text: `text-theme-warning`
- Background: `bg-theme-warning-bg`
- Border: `border-theme-warning-border`
- Examples: `text-yellow-500`, `bg-yellow-500/10`

### Success (Green)
- Text: `text-theme-success`
- Background: `bg-theme-success-bg`
- Border: `border-theme-success-border`
- Examples: `text-emerald-400`, `bg-emerald-500/10`

## Special Cases

### Hover States on Surfaces
- `hover:bg-white/[0.04]` → `hover:bg-theme-surface-1`
- `hover:bg-white/[0.05]` → `hover:bg-theme-surface-1`

### Active/Selected States
- `bg-white/[0.06]` (for nav active) → `bg-theme-surface-1`
- `bg-white/[0.08]` (for selected) → `bg-theme-surface-1`

### Dividers
- `bg-white/[0.08]` → `bg-theme-border-1`
- `bg-white/[0.06]` → `bg-theme-border-2`
- Vertical dividers: same as above

### Focus Rings
- `ring-[#5b6ff5]` → `ring-theme-focus`
- `focus:ring-[#5b6ff5]/40` → `focus:ring-theme-focus/40`

## Examples of Full Conversions

### Before
```tsx
<div className="bg-[#0a0a0a] border border-white/[0.08]">
  <h1 className="text-white">Title</h1>
  <p className="text-gray-400">Description</p>
  <button className="bg-[#5b6ff5] text-white">Click</button>
</div>
```

### After
```tsx
<div className="bg-theme-bg border border-theme-border-1">
  <h1 className="text-theme-text-1">Title</h1>
  <p className="text-theme-text-2">Description</p>
  <button className="bg-theme-accent text-white">Click</button>
</div>
```
