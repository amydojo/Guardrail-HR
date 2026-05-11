# Locked State Teaser — Design Specification

## Design Philosophy

**Core Principle:** Create a premium, Apple/Linear-style partial reveal that communicates value without feeling like a paywall.

The locked state should feel like:
- ✅ A glimpse into available capabilities
- ✅ An intentional, premium experience
- ✅ A logical next step (not a forced one)
- ✅ Calm and confident (not urgent or salesy)

The locked state should NOT feel like:
- ❌ A hard paywall blocking content
- ❌ Frustrating or punishing
- ❌ Urgent or aggressive
- ❌ A bait-and-switch

---

## Structure

### 1. SECTION HEADING

**Changed From:**
```
"What's currently locked"
```

**Changed To:**
```
Bridging line: "Deeper analysis and actionable tools"
Eyebrow label: "AVAILABLE WITH GUARDRAIL PLUS"
```

**Why This Works:**
- Positive framing ("available" not "locked")
- Emphasizes value addition (not restriction)
- Calm, factual tone
- Premium editorial pattern

---

### 2. TEASER CARD LAYOUT

**Same Layout as Unlocked State:**
```
max-w-[600px] (narrowed content width)
space-y-2.5 (tight vertical spacing)
p-6 md:p-7 (generous internal padding)
```

**Why This Works:**
- Consistent visual language
- No jarring layout shift when upgrading
- Premium spacing maintained

---

### 3. EACH TEASER CARD INCLUDES

#### A. Visible Title and Description
```tsx
<h3 className="text-[15px] font-semibold text-gray-200">
  Full traceability
</h3>
<p className="text-[14px] text-gray-500 leading-relaxed">
  See exactly how each answer shaped your compliance score
</p>
```

**Fully Visible:**
- Card title (15px semibold)
- Description (14px regular)
- No blur, no mask

**Why:**
- User understands what capability exists
- Clear value proposition
- No confusion about what's being offered

---

#### B. Subtle Lock Icon
```tsx
<Lock 
  className="w-4 h-4 text-gray-600 flex-shrink-0 ml-3 transition-all duration-300"
  strokeWidth={2}
/>
```

**Design:**
- 4x4 icon (small, not dominant)
- gray-600 (low emphasis)
- Top-right position
- Subtle scale on hover (scale-110)

**Why:**
- Indicates locked state without aggression
- Doesn't compete with content
- Gentle visual cue
- Premium restraint

---

#### C. Masked Preview Content (Blur + Gradient)
```tsx
<div className="relative">
  {/* Content with blur */}
  <div className="text-[13px] text-gray-400 font-mono blur-[4px]">
    12 questions evaluated · 8 high-impact · 4 moderate
  </div>
  
  {/* Gradient fade overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#161616]/40 to-[#161616]/80 opacity-80" />
</div>
```

**Dual Masking Strategy:**

1. **Blur Filter:**
   - Default: `blur-[4px]`
   - Hover: `blur-[3px]` (reduction)
   - Partial visibility maintained

2. **Gradient Overlay:**
   - `from-transparent` → `via-[#161616]/40` → `to-[#161616]/80`
   - Default: `opacity-80`
   - Hover: `opacity-60` (reduction)
   - Soft fade effect

**Why This Works:**
- User can see that content exists
- Not fully hidden (no hard block)
- Blur creates intrigue
- Gradient adds depth
- Hover reduces both → premium interaction
- Apple-style partial reveal

---

#### D. Quiet Hint Text
```tsx
<p className="text-[12px] text-gray-600 mt-3">
  Unlock to view breakdown
</p>
```

**Design:**
- 12px (small)
- gray-600 (low emphasis)
- Factual phrasing ("Unlock to view X")
- Transitions to gray-500 on hover

**Why:**
- Clarifies next step
- No urgency ("Upgrade now!")
- Calm, informational
- Doesn't dominate card

---

### 4. TEASER CARD CONTENT

**Four Specific Cards:**

#### Card 1: Full Traceability
```
Title: "Full traceability"
Description: "See exactly how each answer shaped your compliance score"
Preview: "12 questions evaluated · 8 high-impact · 4 moderate"
Hint: "Unlock to view breakdown"
```

#### Card 2: Prioritized Actions
```
Title: "Prioritized actions"
Description: "Focus on changes that improve your score most efficiently"
Preview: "Quick wins: 3 items · High effort: 5 items · Impact: +12 points"
Hint: "Unlock to view priorities"
```

#### Card 3: Reassessment Tracking
```
Title: "Reassessment tracking"
Description: "Monitor score changes over time as you implement fixes"
Preview: "Latest: 72/100 · Previous: 68/100 · Delta: +4 · Trend: Improving"
Hint: "Unlock to view history"
```

#### Card 4: Export & Sharing
```
Title: "Export & sharing"
Description: "Generate reports for legal counsel, accountants, or advisors"
Preview: "PDF · CSV · JSON · Printable summary · Branded templates"
Hint: "Unlock to generate reports"
```

**Design Principles:**
- Show labels, mask counts (e.g., "8 high-impact" visible but blurred)
- Show effort/impact labels, mask specifics
- Show concept, mask deltas
- Show formats, mask examples
- User understands value without seeing full data

---

## Interactions

### 1. HOVER STATE

**Visual Changes:**
```tsx
// Entire card
hover:-translate-y-0.5        // Slight elevation
hover:shadow-lg               // Subtle shadow
hover:shadow-black/20         // Dark shadow
hover:border-gray-800/60      // Lighter border

// Lock icon
hover:scale-110               // Gentle motion
hover:text-gray-500           // Lighter color

// Blur
blur-[4px] → blur-[3px]       // Reduction

// Gradient
opacity-80 → opacity-60       // More visible

// Hint text
text-gray-600 → text-gray-500 // Lighter
```

**Effect:**
- Card feels explorable
- Blur reduction teases content
- Lock icon "unlocks" slightly
- Premium, subtle interaction
- No jarring animations

---

### 2. TAP/CLICK STATE

**Behavior:**
```tsx
onClick={() => setIsModalOpen(true)}
```

**Opens Single Unified Modal:**
- NOT individual paywalls per card
- One modal for all capabilities
- Explains full Plus offering
- Calm, comprehensive view

**Why:**
- No modal spam
- User sees full picture
- One decision point
- Premium UX pattern

---

## Unified Unlock Modal

### Structure

```
┌────────────────────────────────────────┐
│ [X]                                    │ ← Close button
│                                        │
│ Guardrail Plus (label)                 │
│                                        │
│ Extended visibility and                │ ← 28px heading
│ documentation                          │
│                                        │
│ [Description paragraph]                │
│                                        │
├────────────────────────────────────────┤
│                                        │
│ WHAT'S INCLUDED                        │
│                                        │
│ ✓ Score component breakdown            │
│   Per-question weights and impact      │
│                                        │
│ ✓ Printable reports                    │
│   PDF documents for legal review       │
│                                        │
│ ✓ Version history and diffs            │
│   Track changes over time              │
│                                        │
│ ✓ Answer-level editing                 │
│   Update responses with re-scoring     │
│                                        │
│ ✓ Unlimited assessments                │
│   No monthly limits                    │
│                                        │
│ ✓ Priority email support               │
│   Direct access to specialists         │
│                                        │
├────────────────────────────────────────┤
│                                        │
│ $599 / year                            │ ← 32px price
│ Billed annually · Cancel anytime       │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ View full details                  │ │ ← Primary CTA
│ └────────────────────────────────────┘ │
│                                        │
│ Not right now                          │ ← Secondary CTA
│                                        │
├────────────────────────────────────────┤
│ [Reassurance text about scope]        │
└────────────────────────────────────────┘
```

---

### Modal Design Details

#### Backdrop
```tsx
bg-black/80 backdrop-blur-sm
```
- 80% black overlay
- Subtle backdrop blur
- Premium modal presentation

#### Modal Container
```tsx
bg-[#0a0a0a]
border border-gray-900/50
rounded-[20px]
max-w-[520px]
```
- Dark theme maintained
- Generous border radius
- Constrained width (focused)

#### Close Button
```tsx
<X className="w-5 h-5" />
top-5 right-5
text-gray-600 hover:text-gray-400
```
- Top-right position
- Low emphasis
- Clear affordance

#### Content Sections

**1. Header**
- Label: 13px gray-600 "Guardrail Plus"
- Heading: 28px semibold
- Description: 15px gray-400

**2. What's Included**
- Condensed checkmark list
- Two-line items (title + meta)
- 14px title, 13px meta
- Border-bottom separator

**3. Pricing**
- 32px price (smaller than full page)
- "Billed annually · Cancel anytime"
- No feature bullets (above section covers)

**4. CTAs**
- Primary: "View full details" → `/unlock-plus`
- Secondary: "Not right now" → Close modal
- Full-width buttons
- Clear hierarchy

**5. Reassurance**
- Border-top separator
- 12px gray-600
- Scope clarification

---

## Tone & Style

### ✅ CALM, CONFIDENT, NON-SALESY

**Language Examples:**

**Header:**
- ✅ "Deeper analysis and actionable tools"
- ✅ "Available with Guardrail Plus"
- ❌ "Upgrade to unlock premium features!"

**Hint Text:**
- ✅ "Unlock to view breakdown"
- ✅ "Unlock to view priorities"
- ❌ "Upgrade now to see this!"
- ❌ "Subscribe to unlock!"

**Modal:**
- ✅ "Extended visibility and documentation"
- ✅ "View full details"
- ✅ "Not right now"
- ❌ "Get started today!"
- ❌ "Limited time offer!"
- ❌ "Don't miss out!"

---

### ❌ NO RED WARNINGS, NO URGENCY

**Avoided Patterns:**

**Visual:**
- ❌ Red lock icons
- ❌ Red borders
- ❌ Yellow "Premium" badges
- ❌ Flashing animations

**Language:**
- ❌ "UPGRADE NOW!"
- ❌ "Limited time only"
- ❌ "Only 3 spots left"
- ❌ "Don't miss out"
- ❌ "Unlock your potential"

**Modal:**
- ❌ No countdown timers
- ❌ No "Most popular" badges
- ❌ No feature comparison tables
- ❌ No customer testimonials

---

### ✅ USE SPACING AND PARTIAL VISIBILITY

**Spacing Maintains Premium Feel:**
```
Section margin:   mb-20 (generous)
Card gaps:        space-y-2.5 (tight)
Card padding:     p-6 md:p-7 (increased)
Narrowed width:   max-w-[600px]
```

**Partial Visibility Communicates Value:**
```
Blur:             blur-[4px] (partial, not opaque)
Gradient:         opacity-80 (allows some reading)
Hover reduction:  blur-[3px], opacity-60 (more visible)
Font:             font-mono (suggests data/metrics)
```

**Why This Works:**
- User sees value exists
- Not frustrated by hard block
- Intrigued, not annoyed
- Premium, intentional design

---

## Left-Aligned Layout

**All Content Left-Aligned:**
```tsx
// Cards
text-left (no text-center)

// Modal
text-left (no centered text)

// Buttons
w-full (full-width, but content left-aligned)
```

**Why:**
- Easier to scan
- More credible (business documents)
- Better for multi-line text
- Premium editorial pattern

---

## Dark Theme Maintained

**Color Palette:**
```
Background:       bg-[#0a0a0a]
Cards:            bg-[#161616]
Borders:          border-gray-900/50
Hover borders:    border-gray-800/60
Lock icon:        text-gray-600
Hover lock:       text-gray-500
Titles:           text-gray-200
Body:             text-gray-500
Hint:             text-gray-600
Gradient:         bg-[#161616]/40 to /80
```

**Consistent with Unlocked State:**
- Same color system
- Same contrast ratios
- Same hover behaviors
- Seamless transition when upgrading

---

## Component Architecture

### Files Created

```
/src/app/components/LockedCapabilitiesTeaser.tsx
  ├─ Teaser cards with blur + gradient
  ├─ Hover states
  ├─ Click to open modal
  └─ "Learn about Guardrail Plus" link

/src/app/components/UnlockPlusModal.tsx
  ├─ Unified modal (not per-card)
  ├─ Condensed what's included
  ├─ Pricing display
  ├─ Primary + secondary CTAs
  └─ Escape key to close

/src/app/pages/LockedStateDemoPage.tsx
  ├─ Demo toggle (locked vs unlocked)
  ├─ Shows both states
  └─ Same context/header
```

---

## Usage Context

### When to Show Locked State

**Free Users See:**
- LockedCapabilitiesTeaser component
- Partial blur/gradient previews
- Lock icons on cards
- "Available with Guardrail Plus" label
- Modal on click

**Plus Users See:**
- Full unlocked content
- No blur, no gradient
- No lock icons
- "Included with Guardrail Plus" label
- Full data/metrics visible

---

### Integration Points

**1. Results Page**
```tsx
{isPlusUser ? (
  <UnlockedCapabilities />
) : (
  <LockedCapabilitiesTeaser />
)}
```

**2. Dashboard**
```tsx
{isPlusUser ? (
  <FullAnalytics />
) : (
  <LockedCapabilitiesTeaser />
)}
```

**3. Module Pages**
```tsx
{isPlusUser ? (
  <DetailedBreakdown />
) : (
  <LockedCapabilitiesTeaser />
)}
```

---

## Comparison: Before vs After

### BEFORE (Hard Paywall)

```
┌───────────────────────────────────┐
│ 🔒 PREMIUM FEATURE                │
│                                   │
│ This feature is only available    │
│ with Guardrail Plus.              │
│                                   │
│ [UPGRADE NOW →]                   │
└───────────────────────────────────┘
```

**Problems:**
- ❌ Hard block (frustrating)
- ❌ No preview (user doesn't know value)
- ❌ Aggressive CTA
- ❌ Feels like punishment

---

### AFTER (Premium Teaser)

```
┌───────────────────────────────────┐
│ Full traceability            🔓   │
│                                   │
│ See exactly how each answer       │
│ shaped your compliance score      │
│                                   │
│ [BLURRED BUT VISIBLE:             │
│  12 questions · 8 high-impact]    │
│                                   │
│ Unlock to view breakdown          │
└───────────────────────────────────┘
  ↓ Hover: elevation, blur reduction
  ↓ Click: unified modal
```

**Improvements:**
- ✅ Partial visibility (intrigue)
- ✅ Clear value proposition
- ✅ Calm, premium feel
- ✅ Logical next step

---

## Psychological Design

### Traditional Paywall
```
User sees: [LOCKED CONTENT]
User feels: "I'm blocked from something"
User action: Frustrated / Leaves
```

### Premium Teaser
```
User sees: [Partial preview with blur]
User thinks: "Oh, there's something valuable here"
User hovers: [Blur reduces slightly]
User thinks: "I can almost see it..."
User clicks: [Calm modal explaining Plus]
User feels: "This is a logical upgrade, not a requirement"
```

**Key Difference:**
- Paywall = Punishment
- Teaser = Invitation

---

## Interaction Flow

```
1. User completes assessment
   ↓
2. Sees results score (72/100)
   ↓
3. Scrolls to "Deeper analysis..." section
   ↓
4. Sees 4 teaser cards with partial blur
   ↓
5. Hovers on "Full traceability"
   → Card elevates
   → Blur reduces (4px → 3px)
   → Lock icon scales
   → Hint text lightens
   ↓
6. Clicks card
   → Unified modal opens
   → Sees all 6 Plus capabilities
   → Sees pricing ($599/year)
   → Two CTAs: "View full details" or "Not right now"
   ↓
7. Either:
   A. Clicks "View full details" → Goes to /unlock-plus
   B. Clicks "Not right now" → Modal closes, continues free
```

**No Pressure:**
- User can close modal anytime
- No urgency language
- Free option explicitly offered
- Can explore without commitment

---

## Testing Checklist

### ✅ Visual
- [ ] Eyebrow: "AVAILABLE WITH GUARDRAIL PLUS"
- [ ] Lock icons: 4x4, gray-600, top-right
- [ ] Blur: 4px default, 3px hover
- [ ] Gradient: opacity-80 default, opacity-60 hover
- [ ] Hint text: 12px gray-600
- [ ] Card elevation on hover
- [ ] Same layout as unlocked state

### ✅ Interaction
- [ ] Hover: card elevates, blur reduces, lock scales
- [ ] Click: opens unified modal (not per-card)
- [ ] Modal: escape key closes
- [ ] Modal: backdrop click closes
- [ ] Primary CTA: goes to /unlock-plus
- [ ] Secondary CTA: closes modal

### ✅ Tone
- [ ] No red warnings
- [ ] No urgency language
- [ ] No "Upgrade now!"
- [ ] Calm, factual descriptions
- [ ] "Available" not "Locked"
- [ ] "Not right now" option visible

### ✅ Content
- [ ] 4 teaser cards present
- [ ] Each has: title, description, preview, hint
- [ ] Preview content uses font-mono
- [ ] Preview shows labels, masks specifics
- [ ] Modal has all 6 capabilities
- [ ] Modal shows pricing clearly

### ✅ Layout
- [ ] Left-aligned text (no centering)
- [ ] max-w-[600px] (narrowed)
- [ ] space-y-2.5 (tight gaps)
- [ ] p-6 md:p-7 (generous padding)
- [ ] Dark theme maintained
- [ ] Mobile responsive

---

## Key Takeaway

**Traditional paywall feeling:**
> "I'm blocked from content I need"

**Premium teaser feeling:**
> "There's valuable analysis here if I want deeper visibility"

The locked state feels like:
- ✅ An intentional, premium reveal
- ✅ A glimpse into available value
- ✅ A calm invitation (not a barrier)
- ✅ A logical next step (not a forced one)

---

**Demo available at `/locked-state-demo`**  
**Toggle between locked (free) and unlocked (Plus) states**

---

**Generated:** January 24, 2026  
**Product:** Guardrail HR  
**Feature:** Locked State Teaser  
**Status:** Complete
