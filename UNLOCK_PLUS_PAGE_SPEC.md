# Unlock Guardrail Plus — Page Specification

## Design Philosophy

**Core Principle:** This is not a sales page. It's a diagnostic extension page that shows users what restrictions they can remove.

The page should feel like:
- ✅ Unlocking advanced visibility tools
- ✅ Removing usage limits
- ✅ Gaining documentation control

The page should NOT feel like:
- ❌ Buying premium features
- ❌ Upgrading to get more value
- ❌ Missing out on something critical

---

## Structure

### 1. HEADER (No Hero)
**Purpose:** Neutral explanation of what Plus is

```
[Small label]
Guardrail Plus

[Heading - 32px]
Extended visibility and documentation

[Body]
Guardrail Plus removes usage limits and adds detailed 
breakdowns, exportable summaries, and historical tracking. 
Core diagnostic functionality remains identical.
```

**Tone:**
- ✅ "Extended visibility" (factual)
- ✅ "Core functionality remains identical" (reassuring)
- ❌ No "Unlock your full potential"
- ❌ No "Take your compliance to the next level"

---

### 2. WHAT'S CURRENTLY LOCKED
**Purpose:** Show advanced capabilities users already encountered in limited form

**6 Capabilities:**

#### Score component breakdown
```
See how each assessment question contributed to your 
final score, with per-question weights and impact analysis.
```

#### Printable reports
```
Generate formatted PDF documents suitable for sharing 
with legal counsel, accounting, or payroll providers.
```

#### Version history and diffs
```
Track changes to your compliance posture over time with 
side-by-side comparison views and timestamp tracking.
```

#### Answer-level edit and re-score
```
Update individual responses without retaking the full 
assessment, with automatic score recalculation.
```

#### Unlimited assessments
```
Run diagnostics across all available modules without 
monthly limits or reset periods.
```

#### Priority email support
```
Direct access to compliance specialists for questions 
about assessment results or interpretation.
```

**Design:**
- bg-[#161616] cards
- p-5 (mobile), p-6 (desktop)
- rounded-[16px]
- border-gray-900/50
- space-y-3 (tight spacing)

**Key Points:**
- Each capability is something they've already seen or encountered
- Descriptions are factual, not benefits-oriented
- No "Get access to..." language
- No exclamation points

---

### 3. QUIET REASSURANCE
**Purpose:** Clarify scope of Plus (visibility, not advice)

```
[Muted card bg-[#161616]/50]

Guardrail Plus provides deeper visibility and 
documentation control. It does not include legal review, 
compliance certification, or remediation services. All 
output remains informational and does not constitute 
legal advice.
```

**Why This Matters:**
- Sets realistic expectations
- Preserves trust
- Prevents upsell regret
- Clarifies what Plus is NOT

---

### 4. SINGLE PRICING BLOCK
**Purpose:** One plan, clear pricing, no games

```
━━━━━━━━━━━━━━━━━━━━━━━━
Guardrail Plus
Annual billing only

$599 / year
Billed annually at $599 · No monthly option

✓ All locked capabilities above
✓ Unlimited assessments and re-scoring
✓ Priority email support

[Unlock Guardrail Plus]

Payment processed via Stripe · Cancel anytime
━━━━━━━━━━━━━━━━━━━━━━━━
```

**Design:**
- bg-[#161616]
- rounded-[20px]
- p-6 (mobile), p-8 (desktop)
- border-gray-900/50
- $599 in 40px font

**Pricing Philosophy:**
- Annual only (no monthly complexity)
- Clear total ($599/year)
- No tiers, no feature comparison
- Cancel anytime (trust-preserving)

**What's NOT Here:**
- ❌ No "Most popular" badge
- ❌ No strike-through pricing
- ❌ No "Save 20%" urgency
- ❌ No feature comparison table

---

### 5. PRIMARY CTA + SECONDARY LINK
**Purpose:** Clear path forward, with option to stay free

```
[Primary button]
Unlock Guardrail Plus

[Secondary text link]
Continue with free account
```

**Button Design:**
- w-full
- py-3.5, px-6
- bg-[#5b6ff5]
- rounded-[14px]
- hover:bg-[#4a5ee0]

**Secondary Link:**
- text-[14px]
- text-gray-500
- hover:text-gray-400
- Centered below pricing

**Why This Works:**
- Primary action is clear
- Secondary option prevents pressure
- "Continue with free account" validates their current choice

---

## Tone Guidelines

### ✅ GOOD Examples

**Factual:**
- "Extended visibility and documentation"
- "Removes usage limits"
- "Core functionality remains identical"

**Calm:**
- "What's currently locked"
- "Guardrail Plus provides deeper visibility"
- "Priority email support"

**Optional:**
- "Continue with free account"
- "Cancel anytime"
- "Does not include legal review"

**Trust-Preserving:**
- "All output remains informational"
- "Does not constitute legal advice"
- "Payment processed via Stripe"

---

### ❌ BAD Examples (Avoid)

**Marketing:**
- ❌ "Unlock your full potential"
- ❌ "Take compliance to the next level"
- ❌ "Everything you need to stay compliant"

**Urgency:**
- ❌ "Limited time offer"
- ❌ "Join 1,000+ businesses"
- ❌ "Don't miss out"

**Comparison:**
- ❌ "Get 5x more features"
- ❌ "Most popular plan"
- ❌ "Best value"

**Benefit Stacking:**
- ❌ "Save hours of manual work!"
- ❌ "Reduce risk by 80%!"
- ❌ "Sleep better at night!"

---

## Design Language

### Apple / Linear Internal Quality

**Typography:**
```
Header: 32px semibold
Section heading: 17px medium, gray-400
Card heading: 15px medium, gray-300
Card body: 14px, gray-500, leading-relaxed
Price: 40px semibold
Price meta: 17px, gray-500
```

**Spacing:**
```
py-16 (mobile), py-20 (desktop) - page padding
mb-16 - section margins
space-y-3 - card grid
p-5 (mobile), p-6 (desktop) - card padding
```

**Colors:**
```
Background: bg-[#0a0a0a]
Cards: bg-[#161616]
Muted cards: bg-[#161616]/50
Borders: border-gray-900/50
Muted borders: border-gray-900/30
Text heading: text-gray-300
Text body: text-gray-400 / text-gray-500
Text meta: text-gray-600
Accent: bg-[#5b6ff5]
Check icon: text-gray-500
```

**Borders & Radii:**
```
Cards: rounded-[16px]
Pricing block: rounded-[20px]
Button: rounded-[14px]
Borders: border-gray-900/50
Muted borders: border-gray-900/30
```

---

## Mobile-First Layout

### Single-Column Stacking
```
[Header]
  ↓
[What's Currently Locked]
  Card 1
  Card 2
  Card 3
  Card 4
  Card 5
  Card 6
  ↓
[Quiet Reassurance]
  ↓
[Pricing Block]
  ↓
[Secondary Link]
```

**Mobile Optimizations:**
- Max-width: 680px (comfortable reading)
- px-5 padding (breathes on mobile)
- One capability per card (no grid)
- Full-width pricing button
- Generous vertical spacing (mb-16)

**Desktop Behavior:**
- Same single-column layout
- Centered at max-width: 680px
- Slightly larger padding (md:py-20)
- No multi-column grid (intentionally focused)

---

## Component Hierarchy

### Information Architecture
```
1. What is Plus? (Header)
2. What do I get? (Locked capabilities)
3. What don't I get? (Reassurance)
4. How much? (Pricing)
5. Do I need it? (Optional secondary link)
```

### Visual Hierarchy
```
Largest: Price ($599)
  ↓
Large: Page heading (32px)
  ↓
Medium: Capability headings (15px)
  ↓
Small: Body copy (14px)
  ↓
Smallest: Meta text (12-13px)
```

---

## Psychological Design

### Removing Restrictions (Not Selling Features)

**Language Pattern:**
```
✅ "What's currently locked"
❌ "Premium features"

✅ "Unlock Guardrail Plus"
❌ "Upgrade now"

✅ "Extended visibility"
❌ "Advanced features"

✅ "Removes usage limits"
❌ "Get unlimited access"
```

**Why This Works:**
- Frames Plus as removing artificial limits
- Not as adding value you're missing
- Validates free tier as sufficient baseline
- Makes Plus feel optional, not essential

---

### Trust-Preserving Honesty

**Explicit Limitations:**
```
"Does not include legal review"
"Does not include compliance certification"
"Does not include remediation services"
"All output remains informational"
"Does not constitute legal advice"
```

**Why This Works:**
- Sets realistic expectations
- Prevents buyer's remorse
- Maintains product credibility
- Differentiates from competitors who oversell

---

### Optional Framing

**Secondary Link:**
```
"Continue with free account"
```

**Why This Works:**
- Validates free tier choice
- Reduces pressure
- Builds trust through optionality
- Creates positive brand association

---

## Comparison: What This Is NOT

### NOT a Sales Page
```
❌ Hero with product shot
❌ "Join 10,000+ companies"
❌ Customer testimonials
❌ "Transform your business"
❌ Feature comparison tables
❌ "Most popular" badges
❌ Countdown timers
```

### NOT a Pricing Page
```
❌ Multiple tiers (Free / Pro / Enterprise)
❌ Feature checkmarks per tier
❌ "Contact sales" for enterprise
❌ Monthly vs. Annual toggle
❌ Strike-through pricing
❌ "Save 20%" urgency
```

### NOT a Marketing Page
```
❌ Benefit-stacking
❌ ROI calculators
❌ "See how much you'll save"
❌ Case studies
❌ Logos of customers
❌ "Schedule a demo"
```

---

## What This IS

### A Diagnostic Extension Page
```
✅ Shows what's locked
✅ Explains what Plus does
✅ Sets realistic scope
✅ Offers single clear option
✅ Allows opting out
```

### An Internal Tool Upgrade
```
✅ Feels like Figma Pro unlock
✅ Feels like Linear paid features
✅ Feels like GitHub private repos
✅ Removing restrictions on tool you already use
✅ Not buying something new
```

---

## Usage Context

### Entry Points
```
1. Dashboard upgrade nudge
   "Unlock deeper breakdowns"
   
2. Results page locked feature
   "Available with Guardrail Plus"
   
3. Account page
   "Manage subscription"
   
4. Direct link
   /unlock-plus
```

### Exit Points
```
1. Primary: Unlock button → Payment flow
2. Secondary: "Continue with free" → Dashboard
3. Tertiary: Back button → Previous page
```

---

## Testing Checklist

### ✅ Content
- [ ] No hero section
- [ ] No marketing language
- [ ] No feature comparison
- [ ] One plan only
- [ ] 6 locked capabilities listed
- [ ] Reassurance block present
- [ ] Single pricing block
- [ ] Primary + secondary CTAs

### ✅ Tone
- [ ] Factual descriptions
- [ ] Calm language
- [ ] Optional framing
- [ ] Trust-preserving honesty
- [ ] No urgency cues
- [ ] No exclamation points

### ✅ Design
- [ ] Dark theme (#0a0a0a / #161616)
- [ ] Apple/Linear quality
- [ ] Generous spacing (mb-16)
- [ ] Muted emphasis (gray scale)
- [ ] Restrained accent (#5b6ff5)

### ✅ Mobile
- [ ] Single-column layout
- [ ] One card per capability
- [ ] Full-width button
- [ ] Comfortable padding (px-5)
- [ ] Readable typography (14-15px body)

### ✅ Behavior
- [ ] Routes to /unlock-plus
- [ ] Primary button actionable
- [ ] Secondary link works
- [ ] No external marketing pixels
- [ ] No countdown timers

---

## File Location

```
/src/app/pages/UnlockPlusPage.tsx
```

---

## Integration Points

### Dashboard Upgrade Nudge
```tsx
<Link to="/unlock-plus">
  Unlock Guardrail Plus
</Link>
```

### Results Page Locked Feature
```tsx
{!isPlusUser && (
  <div className="locked-feature">
    <Link to="/unlock-plus">
      Available with Guardrail Plus
    </Link>
  </div>
)}
```

### Account Page
```tsx
<Link to="/unlock-plus">
  View Plus features
</Link>
```

---

## Success Metrics

### Qualitative
- ✅ Feels like removing restrictions, not buying features
- ✅ No pressure or urgency
- ✅ Trust maintained or increased
- ✅ Clear what Plus does and doesn't do
- ✅ Optional framing preserved

### Quantitative
- Free-to-Plus conversion rate
- Time on page (longer = reading carefully)
- Bounce rate from secondary link (validation)
- Support tickets about Plus scope (should be low)

---

## Maintenance Notes

### When Adding Capabilities
1. Add to "What's currently locked" section
2. Keep descriptions factual (not benefit-oriented)
3. Update "What's included" in pricing block
4. Test mobile layout (one card per row)

### When Changing Price
1. Update pricing block ($599 → new price)
2. Update meta text ("Billed annually at...")
3. Keep annual-only (no monthly complexity)
4. No urgency messaging

### When Adding Plans
**Don't.** Keep single plan model.

If absolutely necessary:
1. Create separate pricing comparison page
2. Keep this page as "Plus overview"
3. Link to comparison from here

---

## Design Principles Summary

1. **Not a sales page** — It's a diagnostic extension page
2. **Show what's locked** — Not what they're missing
3. **Trust-preserving honesty** — Explicit about limitations
4. **Single plan** — No comparison complexity
5. **Optional framing** — "Continue with free" validates choice
6. **Calm tone** — No urgency, no hype, no pressure
7. **Apple/Linear quality** — Dark, generous, restrained
8. **Mobile-first** — Single column, one card per capability
9. **Removing restrictions** — Not buying features
10. **System extension** — Not product transformation

---

**Generated:** January 24, 2026  
**Product:** Guardrail HR  
**Page:** Unlock Guardrail Plus  
**Version:** 1.0
