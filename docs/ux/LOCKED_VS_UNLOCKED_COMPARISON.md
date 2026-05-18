# Locked vs Unlocked State — Visual Comparison

## Side-by-Side Layout Comparison

### LOCKED STATE (Free User)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your compliance score: 72/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Deeper analysis and actionable tools

AVAILABLE WITH GUARDRAIL PLUS

  ┌─────────────────────────────────────┐
  │ Full traceability              🔓   │
  │                                     │
  │ See exactly how each answer shaped  │
  │ your compliance score               │
  │                                     │
  │ [BLUR: 12 questions · 8 impact]    │
  │ [GRADIENT FADE →→→]                 │
  │                                     │
  │ Unlock to view breakdown            │
  └─────────────────────────────────────┘
    ↑ Hover: elevate, blur reduces

  ┌─────────────────────────────────────┐
  │ Prioritized actions            🔓   │
  │                                     │
  │ Focus on changes that improve score │
  │                                     │
  │ [BLUR: Quick wins: 3 · Impact +12]  │
  │ [GRADIENT FADE →→→]                 │
  │                                     │
  │ Unlock to view priorities           │
  └─────────────────────────────────────┘

  ┌─────────────────────────────────────┐
  │ Reassessment tracking          🔓   │
  │                                     │
  │ Monitor score changes over time     │
  │                                     │
  │ [BLUR: Latest 72 · Previous 68]     │
  │ [GRADIENT FADE →→→]                 │
  │                                     │
  │ Unlock to view history              │
  └─────────────────────────────────────┘

  ┌─────────────────────────────────────┐
  │ Export & sharing               🔓   │
  │                                     │
  │ Generate reports for legal counsel  │
  │                                     │
  │ [BLUR: PDF · CSV · JSON · Print]    │
  │ [GRADIENT FADE →→→]                 │
  │                                     │
  │ Unlock to generate reports          │
  └─────────────────────────────────────┘

  Learn about Guardrail Plus →

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### UNLOCKED STATE (Plus User)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your compliance score: 72/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Unlock deeper analysis and actionable tools

INCLUDED WITH GUARDRAIL PLUS

  ┌─────────────────────────────────────┐
  │ Full traceability                   │
  │                                     │
  │ See exactly how each answer shaped  │
  │ your compliance score               │
  │                                     │
  │ 12 questions evaluated              │
  │ 8 high-impact factors               │
  │ 4 moderate contributors             │
  └─────────────────────────────────────┘

  ┌─────────────────────────────────────┐
  │ Prioritized actions                 │
  │                                     │
  │ Focus on changes that improve score │
  │                                     │
  │ Quick wins: 3 items                 │
  │ High effort: 5 items                │
  │ Potential impact: +12 points        │
  └─────────────────────────────────────┘

  ┌─────────────────────────────────────┐
  │ Reassessment tracking               │
  │                                     │
  │ Monitor score changes over time     │
  │                                     │
  │ Latest: 72/100                      │
  │ Previous: 68/100                    │
  │ Delta: +4 points                    │
  │ Trend: Improving                    │
  └─────────────────────────────────────┘

  ┌─────────────────────────────────────┐
  │ Export & sharing                    │
  │                                     │
  │ Generate reports for legal counsel  │
  │                                     │
  │ PDF · CSV · JSON                    │
  │ Printable summary                   │
  │ Branded templates                   │
  └─────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Element-by-Element Comparison

### 1. SECTION HEADING

| Element | Locked State | Unlocked State |
|---------|--------------|----------------|
| **Bridging line** | "Deeper analysis and actionable tools" | "Unlock deeper analysis and actionable tools" |
| **Eyebrow** | "AVAILABLE WITH GUARDRAIL PLUS" | "INCLUDED WITH GUARDRAIL PLUS" |
| **Color** | gray-600 | gray-600 |
| **Intent** | Shows what's possible | Shows what you have |

**Key Difference:**
- Locked: "Available with" (invitation)
- Unlocked: "Included with" (confirmation)

---

### 2. CARD STRUCTURE

| Element | Locked State | Unlocked State |
|---------|--------------|----------------|
| **Layout** | max-w-[600px], space-y-2.5 | max-w-[600px], space-y-2.5 |
| **Padding** | p-6 md:p-7 | p-6 md:p-7 |
| **Background** | bg-[#161616] | bg-[#161616] |
| **Border** | border-gray-900/50 | border-gray-900/50 |
| **Hover** | Elevation + shadow | Subtle border lighten |

**Key Difference:**
- Locked: More dramatic hover (invitation to click)
- Unlocked: Subtle hover (content focus)

---

### 3. CARD TITLE

| Element | Locked State | Unlocked State |
|---------|--------------|----------------|
| **Text** | "Full traceability" | "Full traceability" |
| **Size** | 15px semibold | 15px semibold |
| **Color** | text-gray-200 | text-gray-200 |
| **Lock icon** | ✓ Visible (4x4, gray-600) | ✗ None |

**Key Difference:**
- Locked: Lock icon on right (visual cue)
- Unlocked: No icon (content is accessible)

---

### 4. CARD DESCRIPTION

| Element | Locked State | Unlocked State |
|---------|--------------|----------------|
| **Text** | "See exactly how..." | "See exactly how..." |
| **Size** | 14px regular | 14px regular |
| **Color** | text-gray-500 | text-gray-500 |
| **Visibility** | Fully visible | Fully visible |

**Key Difference:**
- NONE — Description identical
- Helps user understand value before and after

---

### 5. PREVIEW CONTENT / DATA

| Element | Locked State | Unlocked State |
|---------|--------------|----------------|
| **Content** | "12 questions · 8 high-impact · 4 moderate" | "12 questions evaluated<br>8 high-impact factors<br>4 moderate contributors" |
| **Blur** | blur-[4px] default, blur-[3px] hover | No blur |
| **Gradient** | opacity-80 default, opacity-60 hover | No gradient |
| **Font** | font-mono, 13px | font-mono, 13px |
| **Layout** | Single line (compressed) | Multi-line (readable) |

**Key Difference:**
- Locked: Blurred + gradient + compressed (teaser)
- Unlocked: Clear + expanded (full data)

---

### 6. HINT TEXT / METADATA

| Element | Locked State | Unlocked State |
|---------|--------------|----------------|
| **Text** | "Unlock to view breakdown" | [None] |
| **Size** | 12px | — |
| **Color** | gray-600 → gray-500 on hover | — |
| **Purpose** | Call-to-action hint | Not needed |

**Key Difference:**
- Locked: Hint guides user to unlock
- Unlocked: No hint (content is visible)

---

### 7. INTERACTION BEHAVIOR

| Action | Locked State | Unlocked State |
|--------|--------------|----------------|
| **Hover** | Elevation, blur reduction, shadow | Subtle border lighten |
| **Click** | Opens unified modal | No modal (content visible) |
| **Cursor** | cursor-pointer (button) | cursor-default |
| **Feel** | Interactive, clickable | Informational, readable |

**Key Difference:**
- Locked: Cards are buttons (open modal)
- Unlocked: Cards are content displays

---

## Hover State Details

### LOCKED CARD HOVER

```
Default:
┌───────────────────────────────────┐
│ Full traceability            🔓   │
│                                   │
│ Description here                  │
│                                   │
│ [BLUR-4PX: content]               │
│ [GRADIENT: opacity-80]            │
│                                   │
│ Unlock to view breakdown          │
└───────────────────────────────────┘

↓ User hovers ↓

Hover:
┌───────────────────────────────────┐ ← Elevated (-translate-y-0.5)
│ Full traceability            🔓↗  │ ← Lock scales (scale-110)
│                                   │ ← Shadow appears
│ Description here                  │
│                                   │
│ [BLUR-3PX: content]               │ ← Blur reduces
│ [GRADIENT: opacity-60]            │ ← Fade reduces
│                                   │
│ Unlock to view breakdown          │ ← Lightens (gray-500)
└───────────────────────────────────┘
```

**Effect:**
- Content becomes more readable
- User gets a "peek" at what's inside
- Lock icon "unlocks" slightly
- Feels premium, not frustrating

---

### UNLOCKED CARD HOVER

```
Default:
┌───────────────────────────────────┐
│ Full traceability                 │
│                                   │
│ Description here                  │
│                                   │
│ 12 questions evaluated            │
│ 8 high-impact factors             │
│ 4 moderate contributors           │
└───────────────────────────────────┘

↓ User hovers ↓

Hover:
┌───────────────────────────────────┐
│ Full traceability                 │ ← Border slightly lighter
│                                   │
│ Description here                  │
│                                   │
│ 12 questions evaluated            │
│ 8 high-impact factors             │
│ 4 moderate contributors           │
└───────────────────────────────────┘
```

**Effect:**
- Subtle interaction only
- Content is focus (not interaction)
- No elevation (not clickable)

---

## Modal Comparison

### LOCKED STATE → CLICK → MODAL

```
User clicks any locked card
         ↓
┌─────────────────────────────────────────┐
│ [X]                                     │
│                                         │
│ Guardrail Plus                          │
│                                         │
│ Extended visibility and documentation   │
│                                         │
│ [Description of Plus]                   │
│                                         │
├─────────────────────────────────────────┤
│ WHAT'S INCLUDED                         │
│                                         │
│ ✓ Score component breakdown             │
│   Per-question weights                  │
│                                         │
│ ✓ Printable reports                     │
│   PDF documents                         │
│                                         │
│ ✓ Version history                       │
│   Track changes                         │
│                                         │
│ ✓ Answer-level editing                  │
│   Update with re-scoring                │
│                                         │
│ ✓ Unlimited assessments                 │
│   No limits                             │
│                                         │
│ ✓ Priority support                      │
│   Direct access                         │
│                                         │
├─────────────────────────────────────────┤
│ $599 / year                             │
│ Billed annually · Cancel anytime        │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ View full details                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Not right now                           │
│                                         │
├─────────────────────────────────────────┤
│ [Reassurance about scope]               │
└─────────────────────────────────────────┘
```

**Unified Modal:**
- Shows ALL 6 capabilities
- Single decision point
- No modal spam
- Calm, comprehensive

---

### UNLOCKED STATE → NO MODAL

**When Plus user:**
- Cards show full content
- No click interaction needed
- No modal appears
- Content is the destination

---

## Color & Opacity Comparison

### LOCKED STATE COLORS

```
Lock icon:        text-gray-600 (hover: gray-500)
Blur content:     text-gray-400 (behind blur-[4px])
Gradient:         bg-[#161616]/40 to /80
Hint text:        text-gray-600 (hover: gray-500)
Card border:      border-gray-900/50 (hover: gray-800/60)
```

**Visual Effect:**
- Muted, mysterious
- Partial visibility
- Intriguing, not frustrating

---

### UNLOCKED STATE COLORS

```
Content text:     text-gray-400 (no blur)
Background:       bg-[#161616] (no gradient)
Card border:      border-gray-900/50
```

**Visual Effect:**
- Clear, readable
- Full visibility
- Informational, not interactive

---

## Typography Hierarchy

### LOCKED STATE

```
Card title:       15px semibold gray-200
Card description: 14px regular gray-500
Preview content:  13px mono gray-400 (BLURRED)
Hint text:        12px gray-600
Lock icon:        4x4 (visual weight: minimal)
```

**Hierarchy:**
1. Title (clearest)
2. Description (clear)
3. Preview (intriguing)
4. Hint (guide)
5. Lock (subtle cue)

---

### UNLOCKED STATE

```
Card title:       15px semibold gray-200
Card description: 14px regular gray-500
Content data:     13px mono gray-400 (CLEAR)
```

**Hierarchy:**
1. Title (clearest)
2. Description (clear)
3. Data (readable focus)

---

## Spacing Comparison

### Both States Use Same Spacing

```
Section margin:     mb-20 (80px)
Card gaps:          space-y-2.5 (10px)
Card padding:       p-6 md:p-7 (24-28px)
Content width:      max-w-[600px]
Title margin:       mb-2.5
Description margin: mb-4 (locked), mb-4 (unlocked)
```

**Why:**
- Consistent layout
- No jarring shift when upgrading
- Premium feel maintained
- Visual continuity

---

## Content Density Comparison

### LOCKED STATE
```
┌───────────────────────────────┐
│ Full traceability        🔓   │  ← 1 line
│                               │
│ Description (2 lines)         │  ← 2 lines
│                               │
│ [BLUR: Single line preview]   │  ← 1 line (compressed)
│                               │
│ Hint text                     │  ← 1 line
└───────────────────────────────┘

Total visible lines: ~5
Actual data: Hidden behind blur
```

---

### UNLOCKED STATE
```
┌───────────────────────────────┐
│ Full traceability             │  ← 1 line
│                               │
│ Description (2 lines)         │  ← 2 lines
│                               │
│ Data line 1                   │  ← 3 lines
│ Data line 2                   │    (expanded)
│ Data line 3                   │
└───────────────────────────────┘

Total visible lines: ~6
All data: Fully visible
```

**Key Difference:**
- Locked: Compressed + blurred preview
- Unlocked: Expanded + clear data
- Similar visual weight (doesn't break layout)

---

## User Journey Comparison

### FREE USER (Locked State)

```
1. Complete assessment
   ↓
2. See results: 72/100
   ↓
3. Scroll to "Deeper analysis..." section
   ↓
4. See 4 blurred teaser cards
   ↓
5. Think: "What's in there?"
   ↓
6. Hover: blur reduces, content hints appear
   ↓
7. Think: "I can almost read it..."
   ↓
8. Click: unified modal opens
   ↓
9. Read: All 6 Plus capabilities
   ↓
10. See: $599/year pricing
    ↓
11. Either:
    A. "View full details" → /unlock-plus
    B. "Not right now" → Close, continue free
```

**Feeling:**
- Intrigued (not blocked)
- Informed (clear value)
- Respected (can decline)

---

### PLUS USER (Unlocked State)

```
1. Complete assessment
   ↓
2. See results: 72/100
   ↓
3. Scroll to "Unlock deeper analysis..." section
   ↓
4. See 4 full data cards (no blur)
   ↓
5. Read: "12 questions evaluated"
   ↓
6. Read: "Quick wins: 3 items"
   ↓
7. Read: "Latest: 72/100, Delta: +4"
   ↓
8. Read: "PDF · CSV · JSON"
   ↓
9. Use data to make decisions
```

**Feeling:**
- Empowered (full access)
- Informed (complete data)
- Valued (premium experience)

---

## Key Design Differences Summary

| Aspect | Locked (Free) | Unlocked (Plus) |
|--------|---------------|-----------------|
| **Eyebrow** | "Available with..." | "Included with..." |
| **Lock icon** | Visible (gray-600) | Hidden |
| **Preview** | Blurred + gradient | Clear + expanded |
| **Hover** | Dramatic (invitation) | Subtle (focus) |
| **Click** | Opens modal | No modal |
| **Hint text** | "Unlock to view X" | None |
| **Cursor** | pointer (clickable) | default |
| **Content** | Single-line preview | Multi-line data |
| **Feel** | Intriguing invitation | Empowered access |

---

## Psychological Effect

### FREE USER EXPERIENCE

**Locked State Feeling:**
```
Before hover:  "There's something here..."
During hover:  "I can almost see it..."
After click:   "Ah, here's what Plus offers"
Decision:      "Do I need this depth?"
```

**Outcome:**
- ✅ Understands value
- ✅ Not frustrated
- ✅ Feels respected
- ✅ Can make informed choice

---

### PLUS USER EXPERIENCE

**Unlocked State Feeling:**
```
Scrolls to section: "Here's my detailed analysis"
Reads data:         "12 questions, 8 high-impact"
Uses information:   "I should prioritize these 3"
Feels:              "This upgrade was worth it"
```

**Outcome:**
- ✅ Gets immediate value
- ✅ Feels premium experience
- ✅ Validates upgrade decision
- ✅ Increases retention

---

## The Critical Design Choice

### WHY PARTIAL BLUR (Not Full Hide)

**Full Hide (Bad):**
```
┌───────────────────────────────┐
│ Full traceability        🔒   │
│                               │
│ See detailed breakdown...     │
│                               │
│ [LOCKED - UPGRADE TO VIEW]    │
│                               │
│ [UPGRADE NOW →]               │
└───────────────────────────────┘
```
**User thinks:** "This is blocking me"

---

**Partial Blur (Good):**
```
┌───────────────────────────────┐
│ Full traceability        🔓   │
│                               │
│ See detailed breakdown...     │
│                               │
│ [BLUR: 12 questions · 8 im…]  │
│ [GRADIENT FADE →→→]           │
│                               │
│ Unlock to view breakdown      │
└───────────────────────────────┘
```
**User thinks:** "There's actual data in there I could access"

---

### WHY UNIFIED MODAL (Not Per-Card)

**Per-Card Modal (Bad):**
```
Click "Full traceability"
  → Modal shows only that feature
Click "Prioritized actions"
  → Another modal for that feature
Click "Export & sharing"
  → Yet another modal

Result: Modal fatigue, feels spammy
```

---

**Unified Modal (Good):**
```
Click any locked card
  → One modal showing all 6 capabilities
  → Single decision point
  → Comprehensive view
  → One CTA

Result: Informed decision, not overwhelmed
```

---

## Testing Scenarios

### Scenario 1: Free User Exploring
```
✓ Can see card titles clearly
✓ Can read descriptions fully
✓ Can tell content exists (blur hints)
✓ Hover reduces blur (peek effect)
✓ Click opens calm modal
✓ Modal shows all capabilities
✓ Can decline without pressure
✓ Free experience still valuable
```

### Scenario 2: Free User Converting
```
✓ Understands value before upgrade
✓ Sees all 6 capabilities in modal
✓ Knows pricing up front ($599)
✓ Can view full details page
✓ No surprises after upgrade
✓ Clear what they're getting
```

### Scenario 3: Plus User Using
```
✓ No blur, sees all data
✓ No lock icons
✓ No modal interruptions
✓ Direct access to metrics
✓ Premium experience delivered
✓ Upgrade validated
```

---

## Success Metrics

### For Locked State
- ✅ Free users understand Plus value (clarity)
- ✅ Hover engagement rate (intrigue)
- ✅ Modal open rate (exploration)
- ✅ Low frustration signals (calm UX)
- ✅ "View full details" click rate (interest)

### For Unlocked State
- ✅ Plus users use data regularly (value)
- ✅ Data comprehension (readability)
- ✅ Feature adoption rate (utilization)
- ✅ Upgrade satisfaction (validation)
- ✅ Low churn (retention)

---

## Key Takeaway

**Locked State Philosophy:**
> "Show value through partial reveal — don't hide it behind a wall"

**Unlocked State Philosophy:**
> "Deliver immediate, clear access to premium data"

**Together:**
> "Free users see the invitation. Plus users see the value."

---

**Demo both states at `/locked-state-demo`**
