# PrimaryAction — Design System Primitive

## Purpose

**PrimaryAction is the single source of truth for all primary CTAs across Guardrail HR.**

This component:
- ✅ Replaces ALL primary buttons across the product
- ✅ Adapts to user state while maintaining consistency
- ✅ Feels like a workflow control, not a marketing button
- ✅ Enforces system-level constraints

**There must be no alternative "primary button" styles elsewhere in the system.**

---

## Philosophy

### Component Role

**PrimaryAction represents "what the system wants the user to do next."**

It is:
- ❌ NOT a generic button
- ❌ NOT a marketing CTA
- ❌ NOT style-first, content-agnostic

It is:
- ✅ A workflow control
- ✅ State-aware and context-sensitive
- ✅ Inevitable, calm, engineered
- ✅ Apple-quality internal control

**Inspiration:**
- Apple's internal macOS/iOS workflow controls
- Linear's task action buttons
- Stripe's billing flow CTAs
- Not: SaaS marketing landing pages

---

## Component Anatomy (Fixed)

**The silhouette never changes. All states adapt within this constraint.**

### Container

```
Shape:       Rounded rectangle
Radius:      12px (desktop) / 14px (mobile)
Height:      44px (desktop) / 52px (mobile) — FIXED
Width:       Full-width (responsive to container)
Padding:     16–20px horizontal
Background:  Elevated dark surface (not flat black)
Border:      1px, low opacity, state-adaptive color
```

**Why fixed height:**
- Predictable layout
- Professional consistency
- Easy to scan
- No visual noise from size changes

---

### Layout Structure

```
┌────────────────────────────────────────────┐
│                                            │
│  [TEXT STACK]              [ICON SLOT]    │
│                                            │
└────────────────────────────────────────────┘
```

**Left: Text Stack**
```
Primary Label (always present)
  ↓
Secondary Label (optional, muted)
```

**Right: Icon/Indicator Slot**
```
State-specific icon
Progress indicator
Lock symbol
Directional arrow
```

---

### Text Structure (Required)

**Primary Label:**
- Always present
- 15–16px font size
- Font weight: medium (500)
- Color: gray-200
- Max 1 line (truncate with ellipsis)
- Text-align: left

**Secondary Label (Optional):**
- 12–13px font size
- Color: gray-600 (muted)
- Max 1 line (truncate with ellipsis)
- Text-align: left

**Combined Constraint:**
```
Text must never wrap into more than two lines total.
```

**Example:**
```
✅ "Run wage & hour scan"
   "~5–10 minutes"

❌ "Run a comprehensive wage and hour compliance scan to identify risks"
   (Too long, will wrap)
```

---

## State System (Variants)

**Create using component properties, not duplicates.**

### Available States

```typescript
type State = 
  | 'pre-scan'      // User hasn't started
  | 'in-progress'   // User actively working
  | 'post-scan'     // User completed scan
  | 'locked'        // Feature behind paywall
  | 'upgrade'       // Explicit upgrade moment
```

---

### State 1: Pre-Scan

**When to use:**
- User has NOT started assessment
- Inviting them to begin
- First-time experience

**Visual Treatment:**
```
Background:  bg-[#161616]
Border:      border-gray-900/50
Hover:       border-blue-900/40
Icon:        ArrowRight (low opacity, gray-600)
```

**Icon Behavior:**
- Arrow points right →
- Nudges 0.5px right on hover
- Suggests forward motion

**Copy Tone:**
- Invitation, not urgency
- Calm, neutral
- Clear time estimate

**Examples:**
```
Label:      "Run wage & hour scan"
Secondary:  "~5–10 minutes"

Label:      "Start assessment"
Secondary:  "First-time diagnostic"

Label:      "Get your compliance score"
Secondary:  "Free diagnostic"
```

---

### State 2: In-Progress

**When to use:**
- User actively in assessment
- Progress saved, can resume
- Ongoing workflow

**Visual Treatment:**
```
Background:  bg-[#161616]
Border:      border-blue-900/50 (stronger accent)
Hover:       border-blue-900/60
Icon:        Progress ring OR spinner
```

**Icon Behavior:**

**Option A: Progress Ring (if progress % available)**
```
Circular progress indicator
0–100% mapped to circle stroke
Blue accent color
Smooth animation (300ms)
```

**Option B: Spinner (if progress unavailable)**
```
Rotating loader
Gray-600 color
Steady animation
```

**Copy Tone:**
- Active, reassuring
- Shows progress explicitly
- "Continue" not "Start"

**Examples:**
```
Label:      "Continue scan"
Secondary:  "Question 12 of 28"
Progress:   43%

Label:      "Resume assessment"
Secondary:  "Progress saved"

Label:      "Complete remaining questions"
Secondary:  "16 left"
Progress:   57%
```

---

### State 3: Post-Scan

**When to use:**
- User completed assessment
- Results available
- Analysis ready

**Visual Treatment:**
```
Background:  bg-[#1a1a1a] (slightly elevated)
Border:      border-blue-900/60 (stronger than pre-scan)
Hover:       border-blue-800/70
Icon:        ChevronRight (suggests depth)
```

**Icon Behavior:**
- Chevron points right ›
- Nudges 0.5px right on hover
- Suggests going deeper

**Copy Tone:**
- Authoritative, analytical
- "Review" not "See"
- Emphasizes value (score, drivers, actions)

**Examples:**
```
Label:      "Review results"
Secondary:  "Score, drivers, next steps"

Label:      "View full analysis"
Secondary:  "Answer-level breakdown"

Label:      "See your compliance status"
Secondary:  "Updated Jan 24"
```

---

### State 4: Locked

**When to use:**
- Feature behind Guardrail Plus
- Free user viewing premium content
- Upgrade teaser (not aggressive)

**Visual Treatment:**
```
Background:  bg-[#161616]
Border:      border-gray-900/50 (restrained)
Hover:       border-gray-800/60
Icon:        Lock (subtle, 3.5px size)
```

**Icon Behavior:**
- Small lock symbol 🔒
- Static (no animation)
- Muted color (gray-600)
- Not aggressive or bright

**Copy Tone:**
- Informative, not salesy
- "Unlock" not "Upgrade Now!"
- Mentions "Guardrail Plus" calmly
- No urgency

**Examples:**
```
Label:      "Unlock full analysis"
Secondary:  "Guardrail Plus"

Label:      "Unlock detailed drivers"
Secondary:  "See answer-level breakdown"

Label:      "Unlock export capabilities"
Secondary:  "PDF and CSV reports"
```

---

### State 5: Upgrade

**When to use:**
- Pricing page
- Explicit upgrade moment
- User considering Plus

**Visual Treatment:**
```
Background:  bg-[#161616]
Border:      border-gray-900/50
Hover:       border-blue-900/50
Icon:        Plus (+)
```

**Icon Behavior:**
- Plus symbol +
- Scales 1.1x on hover
- Suggests addition
- Gray-600 color

**Copy Tone:**
- Controlled emphasis
- Never louder than post-scan state
- Context-aware secondary copy
- No urgency or scarcity

**Examples:**
```
Label:      "Upgrade to Guardrail Plus"
Secondary:  "Export reports, track changes"

Label:      "Unlock Guardrail Plus"
Secondary:  "See risk drivers, export data"

Label:      "Upgrade to Plus"
Secondary:  "$49/month or $499/year"
```

**Critical:**
```
Upgrade state is NOT visually louder than post-scan.
Both are important workflow moments.
Visual hierarchy must be equivalent.
```

---

## Context Property

**Context influences copy tone, NOT visual treatment.**

```typescript
type Context = 
  | 'home'       // Landing page
  | 'dashboard'  // Main dashboard
  | 'module'     // Module entry point
  | 'results'    // Results page
  | 'pricing'    // Pricing page
```

### Context Examples

**Same state, different contexts:**

**Pre-scan state:**
```
Context: home
  → "Get your compliance score" / "Free diagnostic"

Context: dashboard  
  → "Run wage & hour scan" / "~5–10 minutes"

Context: module
  → "Start assessment" / "First-time diagnostic"
```

**Post-scan state:**
```
Context: dashboard
  → "Review latest results" / "Updated Jan 24"

Context: results
  → "Export full report" / "PDF format"

Context: module
  → "Reassess compliance" / "Track improvements"
```

**Why context matters:**
- Helps developers write appropriate copy
- Maintains tone consistency within sections
- Not exposed to users (internal prop)
- Visual treatment remains identical

---

## Visual Behavior by State

### Background Progression

```
pre-scan:    bg-[#161616]     (baseline)
in-progress: bg-[#161616]     (same, border changes)
post-scan:   bg-[#1a1a1a]     (elevated)
locked:      bg-[#161616]     (baseline)
upgrade:     bg-[#161616]     (baseline)
```

**Only post-scan gets elevated background.**
- Represents completed work
- Authoritative moment
- Highest visual weight

---

### Border Progression

```
pre-scan:    border-gray-900/50 → hover: border-blue-900/40
in-progress: border-blue-900/50 → hover: border-blue-900/60
post-scan:   border-blue-900/60 → hover: border-blue-800/70
locked:      border-gray-900/50 → hover: border-gray-800/60
upgrade:     border-gray-900/50 → hover: border-blue-900/50
```

**Post-scan has strongest default border.**
- Emphasizes completion
- Draws attention appropriately
- Not aggressive, just clear

---

### Icon Behavior

| State | Icon | Behavior |
|-------|------|----------|
| **pre-scan** | Arrow right → | Nudges 0.5px right on hover |
| **in-progress** | Progress ring or spinner | Animates progress smoothly |
| **post-scan** | Chevron right › | Nudges 0.5px right on hover |
| **locked** | Lock 🔒 | Static, muted |
| **upgrade** | Plus + | Scales 1.1x on hover |

**All icons:**
- 4x4px size (3.5px for lock)
- Muted colors (gray-500 to gray-600)
- Subtle, not prominent
- Support the text, don't compete

---

## Motion Rules

### State Changes

**When state prop changes:**
```
Opacity crossfade:         150–220ms
Text interpolation:        Fade out → fade in
Elevation change:          Smooth background transition
Border color shift:        Gradual, no snap
Icon swap:                 Crossfade
```

**Easing:**
```
ease-out (no bounce, no spring)
```

**Why no snapping:**
- Professional, polished feel
- Reduces visual jarring
- Calm, considered transitions

---

### Hover (Desktop Only)

**Hover behavior:**
```
Transform:     translateY(-2px)
Shadow:        Increase (shadow-lg)
Border:        Shift to hover color
Icon:          Nudge or scale
Duration:      200ms
```

**Why +2px lift:**
- Subtle affordance
- Clear interactive feedback
- Not aggressive
- Apple-quality polish

---

### Active Press

**Active behavior:**
```
Transform:     translateY(0)
Shadow:        Reduce (shadow-md)
Visual:        Slight compression feel
Duration:      150ms
```

**No bounce:**
- Mechanical precision
- Professional control
- Not playful or casual

---

### Disabled State

**Disabled behavior:**
```
Opacity:       50%
Cursor:        not-allowed
Hover:         No effect
Transform:     No lift
```

**When to disable:**
- Prerequisites not met
- Action temporarily unavailable
- System processing

**Copy adjustment:**
```
Secondary label explains why disabled:
"Complete setup first"
"Processing previous scan"
"Available after results"
```

---

## Usage Rules (Hard Constraints)

### Rule 1: One Per Screen

**Only one PrimaryAction may appear per screen.**

**Why:**
- Forces clarity of intent
- Reduces decision paralysis
- Maintains visual hierarchy
- System knows what's next

**Enforcement:**
```
✅ Dashboard: One PrimaryAction for next step
❌ Dashboard: Multiple PrimaryActions competing

✅ Results: One clear next action
❌ Results: "Export" + "Share" + "Reassess" all as primary
```

**If you need multiple actions:**
```
One PrimaryAction (system's recommendation)
+ Secondary text links
+ Tertiary icon buttons
+ Menu items
```

---

### Rule 2: Next Logical Step

**PrimaryAction must always reflect the next logical system step.**

**Examples:**

**User State: Not started**
```
→ PrimaryAction: "Run wage & hour scan"
```

**User State: In progress (question 12 of 28)**
```
→ PrimaryAction: "Continue scan"
```

**User State: Completed, viewing results**
```
→ PrimaryAction: "Export report" or "Reassess"
```

**User State: Free user, viewing locked section**
```
→ PrimaryAction: "Unlock full analysis"
```

---

### Rule 3: Factual, Not Persuasive

**Copy must be factual, not marketing-driven.**

**Good (Factual):**
```
✅ "Run wage & hour scan"
✅ "Review results"
✅ "Unlock full analysis"
✅ "Upgrade to Guardrail Plus"
```

**Bad (Persuasive):**
```
❌ "Discover your compliance gaps now!"
❌ "Get instant peace of mind!"
❌ "Don't miss out — upgrade today!"
❌ "Join thousands of protected businesses!"
```

**Tone:**
- Direct, clear action verbs
- Concrete outcomes
- No hype, no urgency
- Professional, calm

---

### Rule 4: Never Stack

**Never place two PrimaryActions vertically or horizontally.**

**Bad Pattern:**
```
❌ [Run scan] [View demo]  ← Both primary weight
❌ [Upgrade]
   [Start free]             ← Both competing
```

**Good Pattern:**
```
✅ [Run wage & hour scan]   ← Primary
   Continue with free version ← Text link

✅ [Unlock full analysis]    ← Primary
   Learn more about Plus     ← Text link
```

---

## System Enforcement

### Migration Strategy

**Phase 1: Audit**
```
1. Identify all primary buttons across product
2. Map to appropriate PrimaryAction states
3. Document context and copy
```

**Phase 2: Replace**
```
1. Replace all primary buttons with PrimaryAction
2. Remove custom primary button styles
3. Update component library
```

**Phase 3: Enforce**
```
1. Flag any new primary button attempts in code review
2. Reject designs with multiple primary actions
3. Maintain single source of truth
```

---

### Linting / Code Review

**Create lint rule:**
```
❌ Reject: <button className="primary">
❌ Reject: <PrimaryButton>
❌ Reject: <CTAButton>

✅ Allow only: <PrimaryAction state="..." label="...">
```

**Design review checklist:**
```
[ ] Does this screen have exactly one PrimaryAction?
[ ] Is the state appropriate for user journey?
[ ] Is the copy factual, not persuasive?
[ ] Does the action represent next logical step?
```

---

## Real-World Usage Examples

### Home Page (Pre-Scan User)

```tsx
<PrimaryAction
  state="pre-scan"
  context="home"
  label="Run wage & hour scan"
  secondaryLabel="~5–10 minutes"
  onClick={() => navigate('/modules/wage-hour/assessment')}
/>
```

**Screen:**
- Hero section
- Above the fold
- Clear first action
- No competing CTAs

---

### Dashboard (In-Progress)

```tsx
<PrimaryAction
  state="in-progress"
  context="dashboard"
  label="Continue scan"
  secondaryLabel="Question 12 of 28"
  progress={43}
  onClick={() => navigate('/modules/wage-hour/assessment/continue')}
/>
```

**Screen:**
- Dashboard overview
- "In Progress" section
- Progress indicator visible
- Resuming workflow

---

### Results Page (Post-Scan, Free User)

```tsx
<PrimaryAction
  state="post-scan"
  context="results"
  label="Review full results"
  secondaryLabel="Score, drivers, next steps"
  onClick={() => scrollToResults()}
/>
```

**Screen:**
- Top of results page
- After score display
- Before detailed breakdown
- Anchors attention

---

### Results Page (Locked Section)

```tsx
<PrimaryAction
  state="locked"
  context="results"
  label="Unlock full analysis"
  secondaryLabel="Guardrail Plus"
  onClick={() => navigate('/unlock-plus')}
/>
```

**Screen:**
- Within locked content teaser
- Not aggressive or urgent
- Informative about requirement
- Clear upgrade path

---

### Pricing Page (Upgrade Moment)

```tsx
<PrimaryAction
  state="upgrade"
  context="pricing"
  label="Upgrade to Guardrail Plus"
  secondaryLabel="$49/month or $499/year"
  onClick={() => navigate('/checkout')}
/>
```

**Screen:**
- Pricing tier card
- Clean, direct
- Price information visible
- Not hyped or urgent

---

## Accessibility

### Keyboard Navigation

```
Tab:    Focuses button
Enter:  Activates action
Space:  Activates action
```

**Focus ring:**
```
outline: 2px solid currentColor
outline-offset: 2px
```

---

### Screen Readers

**Label structure:**
```
Announces primary label first
Then secondary label
Then state (if relevant)
```

**ARIA attributes:**
```tsx
aria-label={`${label}. ${secondaryLabel || ''}`}
aria-disabled={disabled}
role="button"
```

---

### Motion Preferences

**Respect prefers-reduced-motion:**
```css
@media (prefers-reduced-motion: reduce) {
  transition-duration: 0.01ms !important;
  animation: none !important;
}
```

---

## Mobile Considerations

### Size Adjustments

```
Desktop:
  Height:        44px
  Radius:        12px
  Font (primary): 15px
  Font (secondary): 12px

Mobile:
  Height:        52px (larger tap target)
  Radius:        14px (more prominent)
  Font (primary): 16px
  Font (secondary): 13px
```

**Why larger on mobile:**
- Better tap targets (52px)
- More prominent (mobile-first)
- Easier to read
- Thumb-friendly

---

### Hover States (Mobile)

**No hover on mobile:**
```
Hover effects disabled
Only active press feedback
No translateY on touch
```

**Active press:**
```
Slight scale down (0.98)
Visual feedback immediate
No lift animation
```

---

## Component Props (TypeScript)

```typescript
interface PrimaryActionProps {
  /** Current user/system state */
  state: 'pre-scan' | 'in-progress' | 'post-scan' | 'locked' | 'upgrade';
  
  /** Page/section context (influences copy tone) */
  context?: 'home' | 'dashboard' | 'module' | 'results' | 'pricing';
  
  /** Primary label (always visible, max 1 line) */
  label: string;
  
  /** Secondary label (optional, muted, max 1 line) */
  secondaryLabel?: string;
  
  /** Progress value (0-100) for in-progress state */
  progress?: number;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Additional CSS classes */
  className?: string;
}
```

---

## Design Tokens

```typescript
// Container
const RADIUS_DESKTOP = '12px';
const RADIUS_MOBILE = '14px';
const HEIGHT_DESKTOP = '44px';
const HEIGHT_MOBILE = '52px';
const PADDING_X = '16px–20px';

// Typography
const FONT_PRIMARY_DESKTOP = '15px';
const FONT_PRIMARY_MOBILE = '16px';
const FONT_SECONDARY_DESKTOP = '12px';
const FONT_SECONDARY_MOBILE = '13px';
const FONT_WEIGHT = 500; // medium

// Colors
const BG_BASELINE = 'bg-[#161616]';
const BG_ELEVATED = 'bg-[#1a1a1a]';
const BORDER_MUTED = 'border-gray-900/50';
const BORDER_ACCENT = 'border-blue-900/60';
const TEXT_PRIMARY = 'text-gray-200';
const TEXT_SECONDARY = 'text-gray-600';

// Motion
const DURATION_STATE = '150–220ms';
const DURATION_HOVER = '200ms';
const EASING = 'ease-out';
const LIFT_DISTANCE = '-2px';
```

---

## Testing Checklist

### Visual Regression

- [ ] All 5 states render correctly
- [ ] Container height consistent (44px desktop / 52px mobile)
- [ ] Border radius correct (12px desktop / 14px mobile)
- [ ] Text truncates properly (max 2 lines)
- [ ] Icons display at correct size (4x4px)
- [ ] Progress ring animates smoothly (in-progress state)

### Interaction

- [ ] Hover lifts +2px (desktop only)
- [ ] Active press compresses
- [ ] Disabled prevents interaction
- [ ] Click handler fires correctly
- [ ] Keyboard navigation works (Tab, Enter, Space)

### Motion

- [ ] State changes crossfade smoothly (150–220ms)
- [ ] Hover animations are subtle (200ms)
- [ ] No snapping or jarring transitions
- [ ] Respects prefers-reduced-motion

### Accessibility

- [ ] Focus ring visible
- [ ] Screen reader announces labels correctly
- [ ] aria-disabled works when disabled
- [ ] Keyboard navigation complete

### Mobile

- [ ] Touch target adequate (52px)
- [ ] No hover effects on touch devices
- [ ] Active press provides feedback
- [ ] Text readable at mobile sizes

---

## Key Takeaway

**Traditional approach:**
> "We have many primary buttons with different styles across the product."

**PrimaryAction approach:**
> "One component. One visual language. Adapts to context, not to design whims."

**The difference:**
- Traditional: Inconsistent, designer-dependent
- PrimaryAction: Systematic, state-driven
- Traditional: Marketing-led ("Sign up now!")
- PrimaryAction: Workflow-led ("Next logical step")
- Traditional: Multiple competing CTAs
- PrimaryAction: One clear path forward

**Result:**
- Visual consistency across product
- Clear user intent
- Professional, engineered feel
- Reduced decision paralysis
- Easier to maintain
- Enforced design standards

---

**Live showcase:** `/primary-action`  
**Component:** `/src/app/components/PrimaryAction.tsx`

**Status:** Complete ✅
