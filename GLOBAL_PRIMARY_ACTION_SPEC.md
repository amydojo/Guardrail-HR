# PrimaryAction — Global Copy Logic Implementation

## Executive Summary

**PrimaryAction is a single adaptive UI primitive with hardcoded copy based on scan lifecycle and access level.**

This implementation enforces:
- ✅ **No custom labels allowed** — copy is controlled globally by state
- ✅ **One per screen** — only one PrimaryAction may appear per view
- ✅ **Consistent language** — same state = same copy everywhere
- ✅ **Tone enforcement** — factual, not persuasive

**Key Philosophical Shift:**
```
Before: Flexible button with custom labels
After:  Opinionated primitive with enforced copy
```

---

## Component Purpose

**PrimaryAction guides users through compliance scans without overwhelming or upselling prematurely.**

It is:
- ❌ NOT a generic button component
- ❌ NOT customizable per-page
- ❌ NOT a marketing CTA

It is:
- ✅ A workflow control
- ✅ State-driven with hardcoded copy
- ✅ System-aware, not designer-dependent
- ✅ Consistent across entire product

---

## State Logic (Exclusive)

**Five states control all copy and visual treatment:**

```typescript
type State = 
  | 'pre_scan'      // User hasn't started
  | 'in_progress'   // User actively working
  | 'post_scan'     // User completed scan
  | 'locked'        // Feature behind paywall
  | 'upgrade'       // Explicit conversion moment
```

**Only one PrimaryAction may appear per page.**

---

## Copy Rules by State (Hard Rules)

### State 1: Pre-Scan

**Purpose:** Invite action, low commitment

**Hardcoded Copy:**
```
Label:   "Run wage & hour scan"
Subtext: "Takes 5–10 minutes"
```

**Visual:**
- Icon: Arrow right →
- Background: `bg-[#161616]`
- Border: `border-gray-900/50`

**Tone:**
- Neutral, informative
- Non-salesy
- No urgency language
- Clear time estimate

**When to use:**
- Landing page
- Dashboard (no scan started)
- Module entry (first-time)

**Code:**
```tsx
<PrimaryAction 
  state="pre_scan"
  onClick={() => navigate('/assessment')}
/>
```

---

### State 2: In-Progress

**Purpose:** Reassure + preserve momentum

**Hardcoded Copy:**

**With progress data:**
```
Label:   "Continue scan"
Subtext: "Question X of Y"
```

**Without progress data:**
```
Label:   "Continue scan"
Subtext: "Progress saved"
```

**Visual:**
- Icon: Progress ring (if progress available) or spinner
- Background: `bg-[#161616]`
- Border: `border-blue-900/50` (stronger accent)

**Tone:**
- Active, reassuring
- Preserves momentum
- Shows concrete progress

**When to use:**
- Dashboard (scan started, not completed)
- Assessment flow (mid-process)
- Resume workflow

**Code:**
```tsx
// With question progress
<PrimaryAction 
  state="in_progress"
  questionProgress={{ current: 12, total: 28 }}
  onClick={() => navigate('/assessment/continue')}
/>

// Without progress data
<PrimaryAction 
  state="in_progress"
  onClick={() => navigate('/assessment/continue')}
/>
```

---

### State 3: Post-Scan

**Purpose:** Direct attention to insight

**Hardcoded Copy:**
```
Label:   "Review results"
Subtext: "See your compliance score"
```

**Visual:**
- Icon: Chevron right ›
- Background: `bg-[#1a1a1a]` (elevated — strongest state)
- Border: `border-blue-900/60` (strongest accent)

**Tone:**
- Confident, analytical
- Not celebratory
- Authority tone

**When to use:**
- Dashboard (scan completed)
- Results page (primary action)
- Post-completion flow

**Code:**
```tsx
<PrimaryAction 
  state="post_scan"
  onClick={() => navigate('/results')}
/>
```

---

### State 4: Locked

**Purpose:** Reveal value without pressure

**Hardcoded Copy:**
```
Label:   "Unlock full analysis"
Subtext: "Risk drivers, next steps, export"
```

**Visual:**
- Icon: Lock 🔒 (subtle, small)
- Background: `bg-[#161616]`
- Border: `border-gray-900/50` (restrained)

**Tone:**
- Calm, capability-forward
- No urgency
- Does NOT reference pricing
- Informative, not salesy

**When to use:**
- Results page (locked sections)
- Module pages (premium features)
- Anywhere free user hits paywall

**Critical Rule:**
```
Locked state does NOT mention pricing.
Use "upgrade" state for explicit pricing moments.
```

**Code:**
```tsx
<PrimaryAction 
  state="locked"
  onClick={() => navigate('/unlock-plus')}
/>
```

---

### State 5: Upgrade

**Purpose:** Explicit conversion moment

**Hardcoded Copy:**
```
Label:   "Upgrade to Guardrail Plus"
Subtext: "Full access + exports"
```

**Visual:**
- Icon: Plus +
- Background: `bg-[#161616]`
- Border: `border-gray-900/50`

**Tone:**
- Clear, direct
- Transactional
- Not urgent or hyped
- Explicit about product name

**When to use:**
- Pricing page
- Upgrade modal
- Explicit conversion flow
- After user explored locked state

**Code:**
```tsx
<PrimaryAction 
  state="upgrade"
  onClick={() => navigate('/pricing')}
/>
```

---

## Copy Matrix

| State | Label | Subtext | Pricing Mention? |
|-------|-------|---------|------------------|
| **pre_scan** | Run wage & hour scan | Takes 5–10 minutes | No |
| **in_progress** | Continue scan | Question X of Y | No |
| **post_scan** | Review results | See your compliance score | No |
| **locked** | Unlock full analysis | Risk drivers, next steps, export | No |
| **upgrade** | Upgrade to Guardrail Plus | Full access + exports | Yes |

**Only "upgrade" state mentions product/pricing explicitly.**

---

## Visual Hierarchy by State

### Background Progression

```
pre_scan:    bg-[#161616]   ← Baseline
in_progress: bg-[#161616]   ← Same
post_scan:   bg-[#1a1a1a]   ← Elevated (strongest)
locked:      bg-[#161616]   ← Baseline
upgrade:     bg-[#161616]   ← Baseline
```

**Post-scan is visually strongest** because it represents completed work and authoritative analysis.

---

### Border Strength

```
pre_scan:    border-gray-900/50  → hover: blue-900/40
in_progress: border-blue-900/50  → hover: blue-900/60
post_scan:   border-blue-900/60  → hover: blue-800/70  ← Strongest
locked:      border-gray-900/50  → hover: gray-800/60
upgrade:     border-gray-900/50  → hover: blue-900/50
```

---

### Icon System

| State | Icon | Behavior |
|-------|------|----------|
| pre_scan | Arrow → | Nudges 0.5px right on hover |
| in_progress | Progress ring or spinner | Animates smoothly |
| post_scan | Chevron › | Nudges 0.5px right on hover |
| locked | Lock 🔒 | Static, muted |
| upgrade | Plus + | Scales 1.1x on hover |

---

## Component API

### Props (TypeScript)

```typescript
interface PrimaryActionProps {
  /** Current user/system state - determines ALL copy */
  state: 'pre_scan' | 'in_progress' | 'post_scan' | 'locked' | 'upgrade';
  
  /** Progress indicator for in_progress state */
  questionProgress?: {
    current: number;  // Current question number
    total: number;    // Total questions
  };
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Additional CSS classes */
  className?: string;
}
```

### Props That DO NOT Exist

```typescript
// ❌ NOT ALLOWED - No custom labels
label?: string;
secondaryLabel?: string;
text?: string;
children?: ReactNode;
```

**Copy is controlled globally. Pages cannot override.**

---

## Usage Examples

### Pre-Scan (Landing Page)

```tsx
import { PrimaryAction } from '@/app/components/PrimaryAction';

function LandingPage() {
  return (
    <div>
      <h1>Guardrail HR</h1>
      <p>Understand your compliance risk</p>
      
      <PrimaryAction 
        state="pre_scan"
        onClick={() => navigate('/modules/wage-hour/assessment')}
      />
      {/* Renders: "Run wage & hour scan" / "Takes 5–10 minutes" */}
    </div>
  );
}
```

---

### In-Progress (Dashboard)

```tsx
function Dashboard() {
  const assessment = useAssessment();
  
  if (assessment.status === 'in_progress') {
    return (
      <div>
        <h2>Wage & Hour Assessment</h2>
        <p>You're making progress</p>
        
        <PrimaryAction 
          state="in_progress"
          questionProgress={{
            current: assessment.currentQuestion,
            total: assessment.totalQuestions
          }}
          onClick={() => navigate('/modules/wage-hour/assessment/continue')}
        />
        {/* Renders: "Continue scan" / "Question 12 of 28" */}
      </div>
    );
  }
}
```

---

### Post-Scan (Results Page)

```tsx
function ResultsPage() {
  return (
    <div>
      <h1>Your Compliance Score</h1>
      <div className="score">72/100</div>
      
      <PrimaryAction 
        state="post_scan"
        onClick={() => scrollToResults()}
      />
      {/* Renders: "Review results" / "See your compliance score" */}
    </div>
  );
}
```

---

### Locked (Free User)

```tsx
function ResultsLockedSection() {
  const user = useUser();
  
  if (!user.isPlusUser) {
    return (
      <div className="locked-teaser">
        <h3>Detailed Risk Drivers</h3>
        <p>See which specific answers contribute to your score</p>
        
        <PrimaryAction 
          state="locked"
          onClick={() => navigate('/unlock-plus')}
        />
        {/* Renders: "Unlock full analysis" / "Risk drivers, next steps, export" */}
        
        <a href="/pricing">Compare plans</a>
      </div>
    );
  }
}
```

---

### Upgrade (Pricing Page)

```tsx
function PricingPage() {
  return (
    <div>
      <h1>Guardrail Plus</h1>
      <div className="pricing-card">
        <p>$49/month or $499/year</p>
        
        <PrimaryAction 
          state="upgrade"
          onClick={() => navigate('/checkout')}
        />
        {/* Renders: "Upgrade to Guardrail Plus" / "Full access + exports" */}
        
        <a href="/modules">Continue with free version</a>
      </div>
    </div>
  );
}
```

---

## Design Constraints (Do Not Violate)

### Fixed Silhouette

```
Height:      44px (desktop) / 52px (mobile) — NEVER CHANGES
Radius:      12px (desktop) / 14px (mobile) — NEVER CHANGES
Padding:     16–20px horizontal — FIXED
Layout:      Left: text stack | Right: icon slot — FIXED
```

**Only copy and accent colors change between states.**

---

### One Per Screen Rule

**Only one PrimaryAction may appear per page.**

**Bad:**
```tsx
❌ Multiple PrimaryActions competing
<PrimaryAction state="post_scan" />
<PrimaryAction state="upgrade" />
```

**Good:**
```tsx
✅ One PrimaryAction + secondary text links
<PrimaryAction state="post_scan" />
<a href="/export">Export report</a>
<a href="/reassess">Run another scan</a>
```

---

### No Stacked CTAs

**Bad:**
```tsx
❌ Stacked primary buttons
<div>
  <PrimaryAction state="upgrade" />
  <PrimaryAction state="locked" />
</div>
```

**Good:**
```tsx
✅ One primary + secondary action
<div>
  <PrimaryAction state="upgrade" />
  <button className="secondary">Learn more</button>
</div>
```

---

### Color Constraints

**Allowed colors:**
```
Primary:  Brand blue (accent borders, icons)
Neutral:  Grays (backgrounds, borders, icons)
```

**Not allowed:**
```
❌ Red (urgency)
❌ Green (success/celebration)
❌ Yellow (warning)
❌ Gradients
❌ Patterns
```

---

## Motion Principles

### State Changes

**When state prop changes:**
```
Method:     Opacity crossfade
Duration:   120–150ms
Easing:     ease-out
```

**What changes:**
- Label text (fade out → fade in)
- Subtext (fade out → fade in)
- Icon (crossfade)
- Background color (smooth transition)
- Border color (smooth transition)

**What doesn't change:**
- Height (always fixed)
- Padding (always fixed)
- Corner radius (always fixed)

**Critical:**
```
No scale transforms
No bounce
No spring animations
No snapping
```

---

### Hover (Desktop Only)

```
Transform:   translateY(-2px)
Shadow:      shadow-lg (increases)
Icon:        Nudge or scale (depending on icon)
Duration:    200ms
Easing:      ease-out
```

---

### Active Press

```
Transform:   translateY(0)
Shadow:      shadow-md (decreases)
Feel:        Compression
Duration:    150ms
```

---

### Disabled State

```
Opacity:     50%
Cursor:      not-allowed
Hover:       No effect
Transform:   No lift
```

---

## Global Enforcement

### Migration Strategy

**Phase 1: Identify**
```
1. Audit all primary buttons across product
2. Map each to appropriate state
3. Document current copy variations
```

**Phase 2: Replace**
```
1. Replace all primary buttons with PrimaryAction
2. Set appropriate state for each location
3. Remove custom copy overrides
4. Remove custom button components
```

**Phase 3: Enforce**
```
1. Delete old primary button components
2. Add lint rules to prevent custom labels
3. Update design system documentation
4. Train team on state-based system
```

---

### Code Review Checklist

When reviewing code that uses PrimaryAction:

- [ ] Only one PrimaryAction per screen?
- [ ] State is appropriate for user journey?
- [ ] No custom label props attempted?
- [ ] questionProgress provided if in_progress state?
- [ ] onClick handler properly implemented?
- [ ] No competing primary buttons?

---

### Lint Rules (Recommended)

```javascript
// ESLint rule to enforce PrimaryAction usage
{
  "rules": {
    "no-custom-primary-buttons": "error",
    "no-primary-action-label-prop": "error",
    "one-primary-action-per-file": "warn"
  }
}
```

---

## Validation Checklist

**Before marking implementation complete:**

### Component Level
- [ ] No `label` or `secondaryLabel` props exist
- [ ] Copy is hardcoded based on state
- [ ] All 5 states implemented correctly
- [ ] questionProgress works for in_progress
- [ ] Icons render correctly for each state
- [ ] Visual hierarchy matches spec (post_scan strongest)
- [ ] Motion timing: 120–150ms for state changes
- [ ] Hover effects only on desktop
- [ ] Mobile sizes: 52px height, 14px radius

### Product Level
- [ ] All existing primary CTAs replaced
- [ ] No page defines its own CTA copy
- [ ] Switching state updates instances consistently
- [ ] Mobile and desktop share same logic
- [ ] Locked views don't show pricing unless upgrade state
- [ ] Only one PrimaryAction per screen enforced
- [ ] Secondary actions use text links, not buttons

### Documentation Level
- [ ] States documented in design system
- [ ] Copy matrix published
- [ ] Usage examples provided
- [ ] Migration guide written
- [ ] Team trained on state system

---

## User Journey Copy Evolution

### Complete Flow Example

```
1. User lands on homepage
   → State: pre_scan
   → Copy: "Run wage & hour scan" / "Takes 5–10 minutes"

2. User starts assessment
   → State: in_progress
   → Copy: "Continue scan" / "Question 5 of 28"

3. User saves and exits
   → State: in_progress
   → Copy: "Continue scan" / "Progress saved"

4. User returns and completes
   → State: post_scan
   → Copy: "Review results" / "See your compliance score"

5. User views results, hits locked section
   → State: locked
   → Copy: "Unlock full analysis" / "Risk drivers, next steps, export"

6. User clicks "Compare plans" link
   → State: upgrade
   → Copy: "Upgrade to Guardrail Plus" / "Full access + exports"
```

**Copy automatically adapts. No manual intervention required.**

---

## Secondary Actions (Not Primary)

**PrimaryAction is for the primary path only.**

For secondary actions, use:

### Text Links
```tsx
<a href="/export" className="text-link">
  Export report
</a>
```

### Secondary Buttons
```tsx
<button className="secondary-button">
  Learn more
</button>
```

### Icon Buttons
```tsx
<button className="icon-button">
  <Share />
</button>
```

**These are NOT PrimaryAction. They're supporting actions.**

---

## Tone Guidelines by State

### Pre-Scan: Invitational
```
✅ "Run wage & hour scan"
✅ "Takes 5–10 minutes"

❌ "Discover your risks now!"
❌ "Get started free!"
❌ "Don't wait — scan today!"
```

---

### In-Progress: Reassuring
```
✅ "Continue scan"
✅ "Question 12 of 28"
✅ "Progress saved"

❌ "Keep going!"
❌ "Almost there!"
❌ "Finish your scan!"
```

---

### Post-Scan: Analytical
```
✅ "Review results"
✅ "See your compliance score"

❌ "View your results!"
❌ "Check out your score!"
❌ "Discover what we found!"
```

---

### Locked: Capability-Forward
```
✅ "Unlock full analysis"
✅ "Risk drivers, next steps, export"

❌ "Upgrade now!"
❌ "Get full access!"
❌ "Unlock premium features!"
```

---

### Upgrade: Transactional
```
✅ "Upgrade to Guardrail Plus"
✅ "Full access + exports"

❌ "Go premium!"
❌ "Unlock everything!"
❌ "Join Plus today!"
```

---

## Mobile Considerations

### Size Adjustments

```
Desktop:
  Height:        44px
  Radius:        12px
  Font (label):  15px
  Font (subtext): 12px

Mobile:
  Height:        52px (larger tap target)
  Radius:        14px
  Font (label):  16px
  Font (subtext): 13px
```

**Copy remains identical. Only sizes change.**

---

### Touch Behavior

```
Hover:   Disabled on touch devices
Press:   Slight compression feedback
Lift:    No translateY on mobile
```

---

## Accessibility

### Screen Reader Announcement

```
State: pre_scan
Announces: "Run wage & hour scan. Takes 5–10 minutes"

State: in_progress
Announces: "Continue scan. Question 12 of 28"

State: post_scan
Announces: "Review results. See your compliance score"

State: locked
Announces: "Unlock full analysis. Risk drivers, next steps, export"

State: upgrade
Announces: "Upgrade to Guardrail Plus. Full access + exports"
```

---

### Keyboard Navigation

```
Tab:    Focuses button
Enter:  Activates action
Space:  Activates action
Esc:    (no effect, button doesn't capture)
```

---

### Focus Ring

```
outline: 2px solid currentColor
outline-offset: 2px
Visible on keyboard focus
Hidden on mouse click
```

---

## Key Differences from Original PrimaryAction

| Aspect | Original | Global Copy Logic |
|--------|----------|-------------------|
| **Labels** | Custom per-instance | Hardcoded by state |
| **Flexibility** | Highly flexible | Strictly enforced |
| **Props** | `label`, `secondaryLabel` | No label props |
| **Context** | Context property | No context (not needed) |
| **Copy control** | Designer/developer | System/product manager |
| **Consistency** | Relies on discipline | Enforced by code |
| **Overrides** | Possible | Impossible |

---

## When to Use Each State

### Use pre_scan when:
- User has not started any assessment
- Landing on homepage
- First visit to module page
- New user onboarding

### Use in_progress when:
- User started but not completed
- Resuming from saved state
- Mid-assessment flow
- Dashboard showing active scan

### Use post_scan when:
- User completed assessment
- Results are available
- Primary action is to view/review
- Analysis is ready

### Use locked when:
- Free user encounters Plus feature
- Viewing locked content teaser
- Feature requires upgrade
- NOT on pricing page

### Use upgrade when:
- Explicit pricing/upgrade page
- Upgrade modal/dialog
- Checkout flow entry
- Clear conversion moment

---

## Testing Checklist

### Visual Regression
- [ ] All 5 states render correctly
- [ ] Height fixed at 44px (desktop) / 52px (mobile)
- [ ] Radius fixed at 12px (desktop) / 14px (mobile)
- [ ] Copy matches hardcoded values
- [ ] Icons correct for each state
- [ ] Progress ring animates (in_progress)
- [ ] Post-scan has elevated background
- [ ] Border strength hierarchy correct

### Interaction
- [ ] Hover lifts +2px (desktop only)
- [ ] Active press compresses
- [ ] Disabled prevents interaction
- [ ] onClick fires correctly
- [ ] Keyboard navigation works
- [ ] Focus ring visible

### Copy
- [ ] No custom labels possible
- [ ] State changes update copy
- [ ] questionProgress updates subtext
- [ ] in_progress without progress shows "Progress saved"
- [ ] Locked state doesn't mention pricing
- [ ] Upgrade state mentions "Guardrail Plus"

### Motion
- [ ] State transitions smooth (120–150ms)
- [ ] No scale transforms
- [ ] No bounce or spring
- [ ] Crossfade clean
- [ ] Respects prefers-reduced-motion

---

## Success Metrics

### Quantitative
- Number of custom primary buttons removed
- Consistency score (same state = same copy)
- Reduced time to implement new flows
- Fewer copy variations across product

### Qualitative
- User confusion decreased
- Product feels more cohesive
- Design system clearer
- Easier onboarding for new designers/devs

---

## Key Takeaway

**Traditional approach:**
> "Designers create custom copy for each button based on their interpretation of the moment."

**Global copy logic approach:**
> "System determines copy based on user state. No interpretation needed."

**The difference:**
- Traditional: Inconsistent copy across product
- Global: Same state = same copy always
- Traditional: Designer-dependent
- Global: System-driven
- Traditional: Flexible but chaotic
- Global: Strict but consistent

**Result:**
- Predictable user experience
- Reduced cognitive load
- Faster implementation
- Easier maintenance
- Stronger brand voice
- Professional consistency

---

**Live showcase:** `/global-primary-action`  
**Component:** `/src/app/components/PrimaryAction.tsx`  

**Status:** Complete ✅
