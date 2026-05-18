# Template Preview Modal V2 — Visual Specification

## 🎨 Complete Design Specification

Apple-grade premium modal for template preview with document frame and sticky action bar.

---

## 📐 Dimensions & Layout

### Modal Container
```
Max Width:    1040px
Responsive:   92vw (mobile/tablet)
Max Height:   86vh
Padding:      16px (viewport edge)
Border Radius: 16px (rounded-2xl)
Background:   theme-bg
Border:       1px theme-border-1
Z-Index:      50
```

### Backdrop
```
Background:   rgba(0, 0, 0, 0.6)
Backdrop:     blur(8px) - backdrop-blur-sm
Behavior:     Click to close
```

---

## 🎬 Entry/Exit Animation

### Entry (150ms, ease-out)
```javascript
initial={{
  opacity: 0,
  scale: 0.98
}}
animate={{
  opacity: 1,
  scale: 1
}}
transition={{
  duration: 0.15,
  ease: 'easeOut'
}}
```

### Exit (150ms, ease-out)
```javascript
exit={{
  opacity: 0,
  scale: 0.98
}}
```

### Backdrop Animation
```javascript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
```

---

## 📋 Structure Breakdown

### 1. Header Bar
```
Height:       Auto (content-based)
Padding:      24px (p-6)
Background:   theme-surface-1/80 + backdrop-blur-xl
Border:       Bottom 1px theme-border-1
Position:     Flex-shrink-0 (sticky at top)

Layout:
┌─────────────────────────────────────────────────────┐
│ Title (20px semibold)          Doc ID • v2.1    [X] │
│ [CA] [Wage & Hour] [Policy]                         │
└─────────────────────────────────────────────────────┘

Components:
- Left: Template title (20px, 600, tight tracking)
- Right top: Doc ID + version (12px, mono) + Close button
- Below: Jurisdiction, Module, Type chips (12px)
```

**Close Button:**
```css
Size:         40px × 40px (p-2)
Icon:         X (20px, w-5 h-5)
Color:        theme-text-3
Hover:        theme-text-1 + bg-theme-surface-2
Border:       rounded-lg
Focus:        ring-2 ring-theme-focus/40
```

**Chips:**
```css
Padding:      10px 12px (px-2.5 py-1)
Background:   theme-surface-2
Border:       1px theme-border-2
Radius:       6px (rounded-md)
Text:         12px, 500, theme-text-2
Gap:          8px between chips
```

---

### 2. Body (Two-Column Layout)

```
Padding:      24px all sides (p-6)
Background:   Transparent
Overflow:     Auto (scroll when needed)
Min Height:   Full available space

Grid:
- 12 columns total
- Left:  7/12 (65%)
- Right: 5/12 (35%)
- Gap:   24px (gap-6)
```

#### Left Column: Document Preview

**Preview Container:**
```css
Position:     sticky top-0
Background:   Transparent
```

**Zoom Controls Bar:**
```
Height:       Auto
Margin:       0 0 16px 0 (mb-4)
Layout:       Flex justify-between

Left Side:
[−] 75% [+]
  ↓    ↓   ↓
 btn  text btn

Right Side:
"Page 1 of 3"
```

**Zoom Buttons:**
```css
Size:         36px × 36px (p-2)
Icon:         ZoomOut/ZoomIn (16px)
Border:       1px theme-border-1
Background:   theme-surface-1
Hover:        bg-theme-surface-2
Disabled:     opacity-50 + cursor-not-allowed
Radius:       8px (rounded-lg)
```

**Zoom Text:**
```css
Size:         13px, 500
Color:        theme-text-2
Min Width:    60px
Align:        center
```

**Document Frame Container:**
```css
Background:   theme-surface-2
Border:       1px theme-border-1
Radius:       12px (rounded-xl)
Padding:      24px (p-6)
```

**Document Paper:**
```css
Background:   #ffffff (always white, both modes)
Shadow:       0 2px 12px rgba(0, 0, 0, 0.08)
Radius:       8px (rounded-lg)
Aspect:       8.5 / 11 (US Letter)
Max Width:    100%
Width:        ${zoomLevel}% (75%-150%)
Margin:       0 auto
```

**Document Header:**
```css
Padding:      12px 24px (py-3 px-6)
Border:       Bottom 1px #e5e5e5
Flex:         justify-between
Font:         9pt (text-[9pt])
Color:        #6b7280 (text-gray-500)

Left:  "Guardrail HR"
Right: "DOC-ID-001 • v2.1"
```

**Document Content:**
```css
Padding:      64px 48px (py-16 px-12)
Min Height:   400px
Background:   white

Title:        24pt, 600, #111827, tight tracking
Body:         11.5pt, 400, #374151, 1.5 line-height

Callout:
  Background: #eff6ff (blue-50)
  Border L:   3px #3b82f6 (blue-500)
  Padding:    16px (p-4)
  Margin:     16px 0 (my-4)
  Title:      10pt, 600, #111827
  Text:       10pt, 400, #374151, 1.6 line-height
```

**Document Footer:**
```css
Padding:      10px 24px (py-2.5 px-6)
Border:       Top 1px #e5e5e5
Flex:         justify-between
Font:         9pt (text-[9pt])
Color:        #6b7280 (text-gray-500)

Left:  "Reviewed January 2026"
Right: "Page 1 of 3"
```

**Page Navigation Dots:**
```css
Container:    flex justify-center gap-2 mt-4

Dot (inactive):
  Width:      8px
  Height:     8px
  Radius:     full (rounded-full)
  Background: theme-border-2
  Hover:      bg-theme-border-1

Dot (active):
  Width:      24px (w-6)
  Height:     8px
  Background: theme-accent
  Transition: all 200ms
```

#### Right Column: Detail Cards

**Card Stack:**
```css
Layout:       flex flex-col gap-4 (space-y-4)
```

**Single Detail Card:**
```css
Background:   theme-surface-1
Border:       1px theme-border-1
Radius:       12px (rounded-xl)
Padding:      16px (p-4)
```

**Card Header:**
```css
Display:      flex items-center gap-2
Margin:       0 0 12px 0 (mb-3)

Icon:         16px (w-4 h-4), theme-text-3
Title:        14px, 600, theme-text-1
```

**Card Content:**

*In 10 Minutes List:*
```css
Layout:       flex items-start gap-2
Spacing:      8px between items (space-y-2)

Check Icon:   16px, theme-accent, flex-shrink-0, mt-0.5
Text:         13px, theme-text-2, leading-relaxed
```

*What You'll Customize List:*
```css
Layout:       flex items-start gap-2
Spacing:      8px between items

Bullet:       "•", theme-text-3
Text:         13px, theme-text-2, leading-relaxed
```

*Format Compatibility:*
```css
Layout:       flex items-center justify-between
Spacing:      8px between items (space-y-2)

Left:         13px, theme-text-2
Right:        Check icon 16px, theme-accent
```

**Version History Accordion:**

*Closed State:*
```css
Background:   theme-surface-1
Border:       1px theme-border-1
Radius:       12px (rounded-xl)
Padding:      16px (p-4)
Hover:        bg-theme-surface-2
Cursor:       pointer
Focus:        ring-2 ring-theme-focus/40

Header:       flex justify-between items-center
  Left Icon:  Shield 16px, theme-text-3
  Title:      14px, 500, theme-text-1
  Right:      ChevronDown 16px, theme-text-3
```

*Open State:*
```css
Container:    Same as closed + content below
Animation:    opacity 0→1, height 0→auto (200ms)

Content:
  Background: theme-surface-1
  Border:     1px theme-border-1
  Radius:     12px
  Padding:    16px (p-4)
  Margin Top: 0 (directly below button)

Version Entry:
  Border Top: 1px theme-border-2 (except first)
  Padding:    16px 0 (pt-4)
  
  Version:    13px, 600, theme-text-1
  Date:       12px, theme-text-3
  
  Changes:
    List:     space-y-1
    Bullet:   "•", theme-text-3
    Text:     12px, theme-text-2, leading-relaxed
```

---

### 3. Sticky Action Bar

```css
Position:     flex-shrink-0 (sticky at bottom)
Padding:      16px 24px (px-6 py-4)
Background:   theme-surface-1/95 + backdrop-blur-xl
Border:       Top 1px theme-border-1
Layout:       flex items-center justify-between gap-4
```

**Left Side: Actions**
```css
Layout:       flex items-center gap-3

Primary Button (Download):
  Padding:    12px 24px (px-6 py-2.5)
  Background: theme-accent
  Text:       14px, 500, white
  Radius:     8px (rounded-lg)
  Shadow:     shadow-theme-2
  Icon:       Download 16px
  Hover:      bg-theme-accent-hover
  Focus:      ring-2 ring-theme-focus/40

Secondary Button (Add to Plan):
  Padding:    10px 16px (px-4 py-2.5)
  Background: theme-surface-1 (or theme-surface-2 when added)
  Border:     1px theme-border-1
  Text:       14px, 500, theme-text-1 (or theme-text-2)
  Radius:     8px (rounded-lg)
  Icon:       Plus 16px (or Check when added)
  Hover:      bg-theme-surface-2 (or bg-theme-surface-3)
  Focus:      ring-2 ring-theme-focus/40

Tertiary Link:
  Text:       13px, theme-text-3
  Icon:       ExternalLink 12px (w-3 h-3)
  Hover:      text-theme-text-1
  Gap:        4px
```

**Right Side: Confidence Line**
```css
Text:         12px, theme-text-3
Align:        right
Content:      "Templates are maintained and versioned. Not legal advice."
```

---

## 🎨 Theme Variations

### Light Mode
```css
Modal Background:       #ffffff (theme-bg)
Modal Border:           #e5e5e5 (theme-border-1)
Modal Shadow:           0 8px 32px rgba(0, 0, 0, 0.12)

Surface 1:              #ffffff
Surface 2:              #f9fafb
Border 1:               #e5e5e5
Border 2:               #d4d4d4

Document Paper:         #ffffff (white)
Document Shadow:        0 2px 12px rgba(0, 0, 0, 0.08)

Callout Background:     #eff6ff
Callout Border:         #3b82f6

Shadow Strategy:        Subtle, shadow-theme-1/2 only
```

### Dark Mode
```css
Modal Background:       #0f0f0f (theme-bg)
Modal Border:           #2d2d2d (theme-border-1)
Modal Shadow:           0 8px 32px rgba(0, 0, 0, 0.4)

Surface 1:              #1a1a1a (glass)
Surface 2:              #262626
Border 1:               #2d2d2d
Border 2:               #404040

Document Paper:         #ffffff (still white!)
Document Shadow:        0 2px 12px rgba(0, 0, 0, 0.08)

Callout Background:     #eff6ff (same, on white paper)
Callout Border:         #3b82f6 (same)

Shadow Strategy:        Minimal, border-focused + faint inner glow
```

---

## 🔧 Interaction Spec

### Close Behavior
```
Triggers:
1. X button click
2. Escape key press
3. Backdrop click (anywhere outside modal)

Animation:
- Same as exit animation (fade + scale)
- 150ms duration
- Body scroll restored
```

### Zoom Controls
```
Range:        75% - 150%
Increment:    10% per click
Disabled:
  - Zoom Out when at 75%
  - Zoom In when at 150%

Effect:
- Changes document paper width
- Smooth transition (200ms)
- Maintains aspect ratio
```

### Page Navigation
```
Total Pages:  1-3 (from template data)
Current:      Tracked in state
Indicators:   Dot navigation below paper

Interaction:
- Click dot to jump to page
- Active dot expands width (8px → 24px)
- Smooth transition
```

### Version History Accordion
```
State:        Open/Closed (toggle)
Animation:
  Open:       opacity 0→1, height 0→auto
  Close:      opacity 1→0, height auto→0
  Duration:   200ms

Icon:         ChevronDown (closed) → ChevronUp (open)
```

### Add to Plan Toggle
```
States:
  Not Added:  Plus icon + "Add to plan"
  Added:      Check icon + "Added to plan"

Styling:
  Not Added:  bg-surface-1, text-theme-text-1
  Added:      bg-surface-2, text-theme-text-2

Interaction:
  Click:      Toggle state immediately
  Effect:     Updates parent component state
```

---

## 📱 Responsive Behavior

### Desktop (1040px+)
```
Modal:        Full 1040px width
Columns:      65/35 split
Preview:      Full document visible
Details:      Sidebar cards
```

### Tablet (768px - 1039px)
```
Modal:        92vw width
Columns:      65/35 split (maintained)
Preview:      Scaled document
Details:      Compact sidebar
```

### Mobile (<768px)
```
Modal:        92vw width, max-h-86vh
Columns:      Stacked (col-span-12)
Preview:      Above details
Details:      Full width below
Scroll:       Vertical through all content
```

---

## 🎯 Focus Management

### Tab Order
```
1. Close button (X)
2. Zoom Out button
3. Zoom In button
4. Page dots (if multiple pages)
5. Version history accordion
6. Download button
7. Add to plan button
8. View in resources link
```

### Focus Rings
```css
Style:        ring-2 ring-theme-focus/40
Radius:       Inherits from component
Offset:       2px (ring-offset-2)
Color:        theme-focus (typically blue/accent)
```

### Keyboard Shortcuts
```
Escape:       Close modal
Tab:          Next focusable element
Shift+Tab:    Previous focusable element
Enter/Space:  Activate focused button
```

---

## 📏 Measurements Reference

### Spacing Scale
```
4px   →  gap-1
8px   →  gap-2
12px  →  gap-3
16px  →  gap-4
24px  →  gap-6
32px  →  gap-8
48px  →  gap-12
64px  →  gap-16
```

### Border Radius
```
4px   →  rounded
6px   →  rounded-md
8px   →  rounded-lg
12px  →  rounded-xl
16px  →  rounded-2xl
999px →  rounded-full
```

### Font Sizes
```
9pt   →  text-[9pt]
10pt  →  text-[10pt]
11.5pt → text-[11.5pt]
12px  →  text-[12px]
13px  →  text-[13px]
14px  →  text-[14px]
16px  →  text-[16px]
18pt  →  text-[18pt]
20px  →  text-[20px]
24pt  →  text-[24pt]
```

---

## ✅ Implementation Checklist

Modal Structure:
- [ ] Backdrop with blur and click-to-close
- [ ] Modal container with max dimensions
- [ ] Header bar with title, chips, close button
- [ ] Two-column body layout (65/35)
- [ ] Sticky action bar at bottom

Document Preview:
- [ ] Zoom controls (75%-150%)
- [ ] White paper frame (both themes)
- [ ] Document header/footer
- [ ] Page navigation dots
- [ ] Callout styling

Detail Cards:
- [ ] In 10 minutes list
- [ ] What you'll customize list
- [ ] Format compatibility checks
- [ ] Version history accordion

Interactions:
- [ ] Entry/exit animations (150ms)
- [ ] Close on X/Escape/backdrop
- [ ] Zoom in/out functionality
- [ ] Page navigation
- [ ] Add to plan toggle
- [ ] Download trigger

Theme Support:
- [ ] Light mode (subtle shadows)
- [ ] Dark mode (border-focused)
- [ ] Paper always white
- [ ] Token-based colors only

Accessibility:
- [ ] Focus management
- [ ] Keyboard navigation
- [ ] ARIA labels
- [ ] Screen reader support

---

**Complete specification for Apple/Linear-grade template preview modal**
