# Standalone Pricing Page — Design Specification

## Philosophy

**This is NOT a sales page.**

This is a calm, credible, decision-oriented page that feels like:
- ✅ Apple / Stripe / Linear internal billing pages
- ✅ Quiet confidence, not persuasion
- ✅ Clarity, not hype
- ✅ Settings page, not promo page

**Core Principle:**
> "Make the value obvious without overselling."

---

## Audience

**US small business owners (5–100 employees)**

Characteristics:
- Risk-averse
- Time-poor
- Non-legal background
- Want clarity, not hype
- Need to understand value quickly
- Skeptical of "growth SaaS" tactics

Decision mode:
- Intentional (not interruptive)
- Research-oriented
- Comparison shopping
- Need to justify cost
- Want honest limitations

---

## Page Structure

### 1. HERO (Very Restrained)

**Headline:**
```
Simple pricing. Clear outcomes.
```
- 56px semibold (40px mobile)
- Direct, factual
- "Simple" + "Clear" (values)
- No hype, no promises

**Subhead:**
```
Start with a free compliance diagnostic.
Upgrade only when you're ready to take action.
```
- 19px (17px mobile), gray-400
- 2 lines max
- Validates free tier
- "Only when ready" (no pressure)
- Action-oriented trigger

**Visual Treatment:**
```
✅ Whitespace and typography do the work
❌ No screenshots
❌ No gradients
❌ No marketing illustrations
❌ No background patterns
```

**Why This Works:**
- Extreme restraint = credibility
- Typography hierarchy = professionalism
- Breathing room = confidence
- No decoration = no bullshit

---

### 2. PRICING TIERS (Two Tiers Only)

**Billing Toggle (Optional, Subtle):**
```
[Monthly] [Annual]
```
- Centered above tiers
- 14px text
- Muted when inactive (gray-600)
- Active: bg-[#161616], border
- Not prominent (not the focus)

**Layout:**
```
Desktop: 2-column grid, equal width
Mobile:  Stacked, equal visual weight
```

**Neither tier should feel like a trap.**

---

#### LEFT TIER: Free Diagnostic

**Title:**
```
Free
```
- 16px medium, gray-400
- Simple, factual

**Price:**
```
$0
```
- 48px semibold
- No "/month" needed
- Clean, clear

**Description:**
```
Understand where risk exists.
```
- 15px gray-400
- One sentence
- Clear purpose

**Includes (4 items):**
```
✔ Wage & Hour risk score
✔ High-level exposure categories
✔ Limited recommended actions
✔ One completed assessment
```
- Check icon: 4x4, gray-600 (muted)
- Text: 14px gray-400
- Honest ("limited", "one")
- No hiding limitations

**Footer Note:**
```
For initial understanding only.
```
- 12px gray-600
- Sets expectations
- Clear scope

**CTA:**
```
[Run free scan]
```
- Full-width button
- bg-[#161616], border
- Gray-300 text
- Not de-emphasized
- Feels valid, not inferior

**Card Style:**
```
bg-[#161616]/40 (semi-transparent)
border-gray-900/30 (subtle)
rounded-[20px]
p-10 (generous padding)
```

---

#### RIGHT TIER: Guardrail Plus (Primary)

**Title:**
```
Guardrail Plus
```
- 16px medium, gray-300
- Product name (not "Premium")

**Price (Toggles):**

**Monthly:**
```
$49 / month
Billed monthly
```

**Annual:**
```
$499 / year
Billed annually · 2 months free
```
- 48px semibold price
- 18px gray-500 "/month" or "/year"
- 13px gray-600 meta
- "2 months free" (not "SAVE 20%!")

**Description:**
```
For acting with confidence.
```
- 15px gray-300
- One sentence
- Outcome-focused
- Confidence = key value

**Includes (5 items):**
```
✔ Answer-level traceability
✔ Prioritized action plan (effort × impact)
✔ Reassessment & score tracking
✔ Exportable reports (PDF, CSV)
✔ Templates & implementation guides
```
- Check icon: 4x4, gray-400
- Text: 14px gray-300
- More items than free (5 vs 4)
- Specific capabilities

**Footer Note:**
```
Designed for ongoing compliance management.
```
- 12px gray-500
- Long-term value
- "Ongoing" (not one-time)

**Primary CTA:**
```
[Upgrade to Plus]
```
- Full-width button
- bg-[#5b6ff5] (brand blue)
- White text, 15px medium
- "Upgrade" (clear action)

**Secondary CTA:**
```
View example report
```
- Text button (very subtle)
- 13px gray-600
- Exploration option
- No pressure

**Card Style:**
```
bg-[#161616] (solid)
border-gray-900/50 (more defined)
rounded-[20px]
p-10 (same as free)
```

**Visual Weight:**
- Slightly more prominent than free
- But not dramatically different
- Equal respect for both options
- No "recommended" badge

---

### 3. WHAT CHANGES WITH PLUS

**Section Title:**
```
What changes when you upgrade
```
- 28px semibold (24px mobile)
- Centered
- Neutral framing (not "Why upgrade")

**Layout:**
```
Desktop: Two columns, side-by-side
Mobile:  Stacked vertically
```

**NOT an aggressive comparison table.**

---

**LEFT COLUMN: Free Diagnostic**

**Header:**
```
Free diagnostic
```
- 15px medium, gray-400

**Items:**
```
– See where risk exists
– Broad categories
– One-time snapshot
```
- Simple bullets (em dashes)
- 14px gray-500
- 3 items (concise)
- Honest framing

---

**RIGHT COLUMN: Guardrail Plus**

**Header:**
```
Guardrail Plus
```
- 15px medium, gray-300

**Items:**
```
– See why risk exists
– Answer-level drivers
– Clear next steps
– Track improvement over time
– Share with payroll or advisors
```
- Simple bullets (em dashes)
- 14px gray-300
- 5 items (more depth)
- Specific capabilities

**Key Contrast:**
- Free: "where" → Plus: "why"
- Free: broad → Plus: specific
- Free: snapshot → Plus: over time
- Free: observe → Plus: act + share

---

**Neutral Line Beneath:**
```
Most teams upgrade once they're ready to take action.
```
- 14px gray-600, centered
- Social proof (soft)
- "Once they're ready" (no urgency)
- Action = trigger (reinforced)

---

### 4. TRUST & BOUNDARIES

**Section Title:**
```
What Guardrail is — and isn't
```
- 22px medium (20px mobile)
- Gray-400
- Centered
- Em dash usage (—)

**Layout:**
```
Single card with 2-column grid inside
bg-[#161616]/30
border-gray-900/30
rounded-[16px]
p-8
```

**LEFT COLUMN: What It Is**

```
✔ Informational compliance guidance
✔ Designed to surface risk and prioritize action
```
- Check icon: 4x4, gray-500
- Text: 14px gray-400
- Positive framing
- Clear scope

**RIGHT COLUMN: What It Isn't**

```
✖ Not legal advice
✖ Not a replacement for counsel
```
- X icon: 4x4, gray-600
- Text: 14px gray-500
- Honest limitations
- Trust-building

**Why This Section Is Critical:**
- Reduces anxiety (clear boundaries)
- Builds trust (honesty about limits)
- Manages expectations (no overselling)
- Increases conversion (clarity → confidence)

**Psychological Effect:**
- User: "They're not pretending to be lawyers"
- User: "This is honest about what it does"
- User: "I can trust this for what it is"
- Result: Higher conversion, lower churn

---

### 5. FAQ (Short, Practical)

**Section Title:**
```
Frequently asked
```
- 28px semibold (24px mobile)
- Centered
- Simple, direct

**5 Questions (Expandable):**

**Q1:**
```
Is this legal advice?
```
**A1:**
```
No. Guardrail surfaces compliance risk and provides practical guidance. It does not replace legal counsel.
```
- 1 sentence, then clarification
- Honest, clear

---

**Q2:**
```
Can I cancel anytime?
```
**A2:**
```
Yes. Cancel immediately from your account page. No penalties, no questions asked.
```
- Simple yes
- How to cancel
- No friction mentioned

---

**Q3:**
```
What happens if laws change?
```
**A3:**
```
Guardrail modules are updated when federal regulations change. You can reassess to see updated risk.
```
- Product commitment
- Ongoing value
- User control

---

**Q4:**
```
Can I reassess after fixing issues?
```
**A4:**
```
Yes. Plus users can reassess unlimited times and track score changes over time.
```
- Simple yes
- Plus feature callout
- Value reinforcement

---

**Q5:**
```
Who is this best for?
```
**A5:**
```
US small businesses (5–100 employees) who need clarity on wage & hour compliance without hiring legal teams.
```
- Specific audience
- Clear use case
- "Without hiring legal teams" (cost comparison)

---

**Interaction Design:**
```
Accordion-style
Click question to expand/collapse
+ / − indicator (right side)
One answer open at a time (optional)
bg-[#161616]/40
rounded-[14px]
p-5 md:p-6
```

**Why Only 5 FAQs:**
- Focused, not overwhelming
- Addresses core objections
- Keeps page scannable
- More would dilute impact

---

### 6. FOOTER CTA (Soft Landing)

**Headline:**
```
Start free. Upgrade when it's useful.
```
- 32px semibold (28px mobile)
- Centered
- Two sentences (period-separated)
- Calm, non-urgent
- Reinforces free value
- "When it's useful" (user timing)

**Buttons (Side-by-Side):**

**Primary:**
```
[Run free wage & hour scan]
```
- px-8 py-4
- bg-[#5b6ff5] (brand blue)
- White text, 15px medium
- Specific action (not vague "Get started")

**Secondary:**
```
[View modules]
```
- px-8 py-4
- bg-[#161616], border
- Gray-300 text, 15px medium
- Exploration option
- Equal visual weight

**Layout:**
```
Desktop: Side-by-side (flex-row)
Mobile:  Stacked (flex-col)
gap-4
```

**Why Two CTAs:**
- Accommodates different intents
- No single forced path
- Exploration encouraged
- Reduces friction

**No Urgency:**
- ❌ No "Limited time!"
- ❌ No "Sign up now!"
- ❌ No countdown timers
- ❌ No scarcity tactics

---

## Visual Style

### Dark Theme Consistency

**Background:**
```
bg-[#0a0a0a]
```

**Cards:**
```
Free:  bg-[#161616]/40, border-gray-900/30
Plus:  bg-[#161616], border-gray-900/50
Trust: bg-[#161616]/30, border-gray-900/30
FAQ:   bg-[#161616]/40, border-gray-900/30
```

**Text Hierarchy:**
```
Hero title:     56px semibold
Section title:  28px semibold
Card title:     16px medium
Body:           15px, 14px
Meta:           13px, 12px
Price:          48px semibold
```

**Color Palette:**
```
Text primary:   text-white
Text secondary: text-gray-300
Text tertiary:  text-gray-400
Text muted:     text-gray-500
Text subtle:    text-gray-600

Accent:         bg-[#5b6ff5]
Border light:   border-gray-900/30
Border medium:  border-gray-900/50
```

---

### Generous Spacing

**Page Padding:**
```
Desktop: py-24
Mobile:  py-16
max-w-[1040px] (narrower than typical)
px-5 (consistent)
```

**Section Spacing:**
```
mb-32 (desktop)
mb-24 (mobile)
```

**Card Padding:**
```
p-10 (desktop)
p-8 (mobile)
```

**Internal Spacing:**
```
Tier includes:  space-y-3
FAQ items:      space-y-3
Columns:        gap-8 (desktop), gap-6 (mobile)
```

**Why Generous:**
- Premium feel
- Easy scanning
- Not cramped
- Confidence through space

---

### No Bright Dividers

**Avoided:**
```
❌ Heavy borders (2px+)
❌ Bright accent lines
❌ Colored section breaks
❌ Gradient dividers
```

**Used Instead:**
```
✅ Subtle borders (border-gray-900/30)
✅ Whitespace separation
✅ Typography hierarchy
✅ Card elevation
```

**Result:**
- Calm, unified page
- No visual noise
- Professional presentation
- Settings page feel

---

### Typography Does the Work

**No Visual Gimmicks:**
```
❌ Illustrations
❌ Icons (except checks/X)
❌ Gradients
❌ Animations
❌ Decorative elements
```

**Hierarchy Through:**
```
✅ Font size (56px → 12px)
✅ Font weight (semibold → regular)
✅ Color (white → gray-600)
✅ Spacing (generous whitespace)
✅ Alignment (centered vs left)
```

**Result:**
- Clean, focused page
- Information architecture clear
- No distractions
- Professional credibility

---

## Interaction Notes

### Annual Toggle

**Behavior:**
```
Subtle, optional
Centered above tiers
Click to toggle
Price updates immediately
No page reload
```

**Default:**
```
Annual (shows better value)
```

**Why Not Prominent:**
- Not the main decision
- Doesn't distract from tier choice
- Available but not pushy
- Calm presentation

---

### No Popups or Modals

**On This Page:**
```
❌ Exit-intent popups
❌ Chat widgets
❌ "Limited time!" banners
❌ Cookie consent overlays
❌ Email capture modals
```

**Why:**
- Feels safe to explore
- No interruptions
- Respectful of user
- Builds trust

---

### Page Should Feel Safe

**User Should Feel:**
- ✅ Can skim without commitment
- ✅ Can leave and return
- ✅ No pressure to decide now
- ✅ Information is complete
- ✅ No hidden catches

**Design Supports This:**
- FAQ addresses concerns
- Trust section sets boundaries
- Free tier validated
- Multiple CTAs available
- No urgency language

---

## Mobile Optimization

### Layout Adjustments

**Hero:**
```
Desktop: 56px title, 19px subhead
Mobile:  40px title, 17px subhead
```

**Tiers:**
```
Desktop: 2-column grid
Mobile:  Stacked (vertical)
```

**Comparison:**
```
Desktop: 2-column grid
Mobile:  Stacked (vertical)
```

**Footer CTAs:**
```
Desktop: Side-by-side (flex-row)
Mobile:  Stacked (flex-col)
```

**Trust Section:**
```
Desktop: 2-column grid
Mobile:  2-column grid (keeps structure)
```

---

### Touch Targets

**All Buttons:**
```
py-4 (minimum 48px height)
Full-width on mobile
Clear tap zones
No tiny buttons
```

**FAQ Items:**
```
p-5 md:p-6 (comfortable tap)
Full-width clickable
Clear expand/collapse
```

**Billing Toggle:**
```
px-4 py-2 (adequate tap area)
Clear active state
```

---

### Typography Scaling

**Responsive Sizes:**
```
Hero:     40px → 56px
Section:  24px → 28px
Price:    48px (same, important)
Body:     14px → 15px
```

**Maintains Hierarchy:**
- Proportions consistent
- Readability preserved
- Impact maintained
- Mobile-optimized

---

## Copy Principles

### ✅ CALM, CREDIBLE, DECISION-ORIENTED

**Headline Examples:**

**Hero:**
- ✅ "Simple pricing. Clear outcomes."
- ❌ "The smartest pricing in compliance!"

**Tiers:**
- ✅ "Understand where risk exists."
- ✅ "For acting with confidence."
- ❌ "Everything you need to stay compliant!"
- ❌ "Premium features for serious businesses!"

**Comparison:**
- ✅ "What changes when you upgrade"
- ❌ "Why upgrade to Plus?"
- ❌ "Don't settle for basic!"

**Trust:**
- ✅ "What Guardrail is — and isn't"
- ❌ "Why trust Guardrail?"

**Footer:**
- ✅ "Start free. Upgrade when it's useful."
- ❌ "Get started today!"
- ❌ "Don't wait — try it now!"

---

### ❌ NO URGENCY, NO HYPE

**Avoided Language:**

**Urgency:**
- ❌ "Limited time offer!"
- ❌ "Sale ends soon!"
- ❌ "Act now!"
- ❌ "Don't miss out!"

**Hype:**
- ❌ "Revolutionary compliance platform!"
- ❌ "Transform your business!"
- ❌ "10x your compliance!"
- ❌ "Game-changing solution!"

**Pressure:**
- ❌ "Everyone is upgrading!"
- ❌ "Join thousands of teams!"
- ❌ "Most popular plan!"
- ❌ "Limited spots available!"

**Fear:**
- ❌ "Avoid costly mistakes!"
- ❌ "Protect your business!"
- ❌ "Don't get sued!"
- ❌ "Stay compliant or pay the price!"

---

### ✅ PLAIN LANGUAGE, SPECIFIC

**Value Bullets:**

**Good (Specific):**
- ✅ "Answer-level traceability"
- ✅ "Prioritized action plan (effort × impact)"
- ✅ "Exportable reports (PDF, CSV)"

**Bad (Vague):**
- ❌ "Advanced analytics"
- ❌ "Powerful insights"
- ❌ "Premium features"

**FAQ Answers:**

**Good (Concrete):**
- ✅ "Cancel immediately from your account page."
- ✅ "Plus users can reassess unlimited times."
- ✅ "US small businesses (5–100 employees)"

**Bad (Vague):**
- ❌ "Easy cancellation process"
- ❌ "Flexible reassessment options"
- ❌ "Perfect for growing businesses"

---

## Page Flow

### User Journey

```
1. Lands on /pricing (intentional visit)
   ↓
2. Reads hero: "Simple pricing. Clear outcomes."
   ↓
3. Sees billing toggle (annual selected)
   ↓
4. Scans two tiers side-by-side
   → Free: "$0, understand where risk exists"
   → Plus: "$499/year, for acting with confidence"
   ↓
5. Reads "What changes when you upgrade"
   → Free: See where
   → Plus: See why + act + track + share
   ↓
6. Reads "What Guardrail is — and isn't"
   → ✔ Informational guidance
   → ✖ Not legal advice
   → Feels: "Okay, I know what this is"
   ↓
7. Expands FAQ questions
   → "Is this legal advice?" → No
   → "Can I cancel?" → Yes, anytime
   → Feels: "No hidden catches"
   ↓
8. Either:
   A. "Run free scan" → /assessment
   B. "Upgrade to Plus" → /unlock-plus
   C. "View modules" → /modules
   D. Leaves (to think/research)
```

---

### Decision Moments

**Moment 1: Free vs Plus**
- Side-by-side comparison
- Equal visual weight
- Clear value difference
- No pressure to upgrade

**Moment 2: Monthly vs Annual**
- Toggle above tiers
- "2 months free" (factual)
- Not aggressive (no "SAVE 20%!")

**Moment 3: Trust Section**
- "What it is — and isn't"
- Reduces anxiety
- Increases confidence
- Enables decision

**Moment 4: FAQ**
- Addresses objections
- Provides clarity
- Removes barriers
- Confirms understanding

**Moment 5: Footer CTA**
- "Start free" (low commitment)
- "Upgrade when useful" (user timing)
- Two paths available
- No pressure

---

## Design References

### Apple Pricing Pages

**Similar:**
- Restrained hero (typography-focused)
- Clean tier cards (equal weight)
- Generous spacing
- Dark mode option
- No gimmicks

**Different:**
- We're more explicit about limitations
- We include trust boundaries section
- We use em dashes (editorial style)
- We're even more minimal

---

### Stripe Billing Page

**Similar:**
- Professional presentation
- Clear pricing tiers
- FAQ section
- No urgency tactics
- Clean dark theme

**Different:**
- We emphasize free tier value more
- We include "What it is/isn't" section
- We're more editorial (less technical)

---

### Linear Pricing Page

**Similar:**
- Minimal design
- Calm confidence
- Typography-driven
- No marketing speak
- Professional credibility

**Different:**
- We have fewer tiers (2 vs 3+)
- We're more explicit about outcomes
- We include trust boundaries
- We're compliance-focused

---

## Testing Checklist

### ✅ Content
- [ ] Hero: "Simple pricing. Clear outcomes."
- [ ] Subhead: 2 lines max
- [ ] Two tiers: Free + Plus
- [ ] Free tier: 4 includes
- [ ] Plus tier: 5 includes
- [ ] Comparison: "What changes..."
- [ ] Trust: "What it is — and isn't"
- [ ] FAQ: 5 questions
- [ ] Footer: "Start free. Upgrade when useful."

### ✅ Visual
- [ ] Dark theme (bg-[#0a0a0a])
- [ ] Generous spacing (not cramped)
- [ ] Clean tier cards (equal respect)
- [ ] No bright dividers
- [ ] Typography hierarchy clear
- [ ] No gimmicks or decorations

### ✅ Interaction
- [ ] Billing toggle works (monthly/annual)
- [ ] FAQ expands/collapses
- [ ] All CTAs functional
- [ ] No popups or modals
- [ ] Page feels safe to explore

### ✅ Tone
- [ ] Calm, not urgent
- [ ] Credible, not hype
- [ ] Decision-oriented, not sales-driven
- [ ] Plain language, specific
- [ ] No "growth SaaS" energy

### ✅ Mobile
- [ ] Tiers stack gracefully
- [ ] Text scales appropriately
- [ ] Touch targets adequate (48px min)
- [ ] FAQ comfortable to use
- [ ] Footer CTAs stack

---

## Success Metrics

### Qualitative
- ✅ Feels like internal billing page (not sales)
- ✅ Free tier feels valuable (not trap)
- ✅ Plus tier value is clear
- ✅ Trust boundaries reduce anxiety
- ✅ User feels informed (not sold)

### Quantitative
- Page time (longer = good, reading)
- Free scan conversion rate
- Plus upgrade rate
- FAQ expansion rate (engagement)
- Bounce rate (lower = better)
- Return visitors (decision time)

---

## Key Takeaway

**Traditional pricing page:**
> "BUY NOW! Limited time! Don't miss out! Premium features! Best value!"

**Guardrail pricing page:**
> "Simple pricing. Clear outcomes. Start free. Upgrade when it's useful."

**The difference:**
- Calm confidence vs aggressive sales
- Information vs persuasion
- User timing vs artificial urgency
- Honest boundaries vs overselling
- Settings page vs promo page

**Result:**
- Higher quality conversions
- Lower churn (expectations set)
- Stronger trust
- Better fit customers
- Professional credibility

---

**Live page:** `/pricing`

**Status:** Complete ✅
