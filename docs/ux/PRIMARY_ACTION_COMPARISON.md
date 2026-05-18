# PrimaryAction: Flexible vs. Global Copy Logic

## Overview

This document compares two approaches to the PrimaryAction component:

1. **Flexible Component** (`/primary-action`) — Custom labels per instance
2. **Global Copy Logic** (`/global-primary-action`) — Hardcoded copy by state

---

## Philosophical Difference

### Flexible Component Philosophy

**"Give designers and developers the tools to craft appropriate copy for each context."**

- Labels are props
- Context influences tone
- Flexibility valued
- Trust in implementers

### Global Copy Logic Philosophy

**"System controls copy. Pages adapt to states, not vice versa."**

- Labels are hardcoded
- State determines everything
- Consistency enforced
- System over individuals

---

## API Comparison

### Flexible Component API

```typescript
interface PrimaryActionProps {
  state: 'pre-scan' | 'in-progress' | 'post-scan' | 'locked' | 'upgrade';
  context?: 'home' | 'dashboard' | 'module' | 'results' | 'pricing';
  label: string;                    // ← Custom
  secondaryLabel?: string;          // ← Custom
  progress?: number;
  disabled?: boolean;
  onClick?: () => void;
}
```

### Global Copy Logic API

```typescript
interface PrimaryActionProps {
  state: 'pre_scan' | 'in_progress' | 'post_scan' | 'locked' | 'upgrade';
  questionProgress?: {              // ← Structured data only
    current: number;
    total: number;
  };
  disabled?: boolean;
  onClick?: () => void;
  // ❌ No label props
  // ❌ No context prop
}
```

---

## Usage Comparison

### Flexible Component Usage

```tsx
// Developer writes custom copy
<PrimaryAction 
  state="pre-scan"
  context="home"
  label="Get your compliance score"
  secondaryLabel="Free diagnostic"
  onClick={handleClick}
/>

// Another developer writes different copy for same state
<PrimaryAction 
  state="pre-scan"
  context="dashboard"
  label="Run wage & hour scan"
  secondaryLabel="~5–10 minutes"
  onClick={handleClick}
/>
```

**Result:** Same state, different copy. Relies on designer/developer judgment.

---

### Global Copy Logic Usage

```tsx
// Developer only sets state
<PrimaryAction 
  state="pre_scan"
  onClick={handleClick}
/>
// Automatically renders: "Run wage & hour scan" / "Takes 5–10 minutes"

// Another developer uses same state
<PrimaryAction 
  state="pre_scan"
  onClick={handleClick}
/>
// Renders IDENTICAL copy everywhere
```

**Result:** Same state = same copy. Enforced by system.

---

## Copy Consistency

### Flexible Component

**Potential Variations for `state="pre-scan"`:**

Developer A:
```
"Run wage & hour scan"
"~5–10 minutes"
```

Developer B:
```
"Start assessment"
"First-time diagnostic"
```

Developer C:
```
"Get your compliance score"
"Free diagnostic"
```

**All valid, all different, all on same state.**

---

### Global Copy Logic

**One Copy for `state="pre_scan"`:**

```
"Run wage & hour scan"
"Takes 5–10 minutes"
```

**Appears identically everywhere. No variations possible.**

---

## State Names

### Flexible Component

```typescript
'pre-scan'     // Kebab-case
'in-progress'
'post-scan'
'locked'
'upgrade'
```

### Global Copy Logic

```typescript
'pre_scan'     // Snake_case (to emphasize states are fixed)
'in_progress'
'post_scan'
'locked'
'upgrade'
```

**Naming change emphasizes the shift in philosophy.**

---

## Pros & Cons

### Flexible Component

**Pros:**
- ✅ Contextual copy tuning
- ✅ Designer freedom
- ✅ Adapts to edge cases
- ✅ Feels less rigid
- ✅ Context-aware tone

**Cons:**
- ❌ Inconsistent copy across product
- ❌ Relies on individual judgment
- ❌ Harder to maintain brand voice
- ❌ Copy drift over time
- ❌ Onboarding confusion ("What should I write?")

---

### Global Copy Logic

**Pros:**
- ✅ Consistent copy everywhere
- ✅ Predictable user experience
- ✅ Faster implementation (no copy decisions)
- ✅ System enforces standards
- ✅ Easier maintenance
- ✅ Stronger brand voice

**Cons:**
- ❌ Less flexible for edge cases
- ❌ May not fit every context perfectly
- ❌ Requires careful copy design upfront
- ❌ Can feel rigid
- ❌ No context-specific tuning

---

## When to Use Each

### Use Flexible Component When:
- Product is early-stage (copy evolving)
- Many edge cases and contexts
- Designers need creative freedom
- Copy testing is ongoing
- Brand voice not yet solidified
- Small team with good communication

### Use Global Copy Logic When:
- Product is scaling (need consistency)
- Brand voice is established
- Copy decisions are finalized
- Large team (consistency critical)
- User research validates copy
- System-driven approach valued

---

## Migration Path

### From Flexible → Global

**Step 1: Audit**
```
1. Identify all PrimaryAction instances
2. Document copy variations by state
3. Identify most common/best copy
```

**Step 2: Standardize**
```
1. Choose canonical copy for each state
2. Update component to hardcode copy
3. Remove label props from interface
```

**Step 3: Refactor**
```
1. Update all instances to remove label props
2. Ensure correct state is set
3. Test consistency across product
```

**Step 4: Enforce**
```
1. Add lint rules to prevent custom labels
2. Update documentation
3. Train team on new system
```

---

### From Global → Flexible

**Step 1: Add Props**
```
1. Add label and secondaryLabel props
2. Make them optional (fall back to hardcoded)
3. Update TypeScript interface
```

**Step 2: Allow Overrides**
```
1. Check if label prop exists
2. If yes, use custom label
3. If no, use hardcoded copy
```

**Step 3: Migrate Gradually**
```
1. Keep hardcoded copy as defaults
2. Allow custom labels where needed
3. Document when to override
```

**Step 4: Document**
```
1. Update design system with both options
2. Create guidelines for custom copy
3. Train team on when to customize
```

---

## Real-World Scenarios

### Scenario 1: New Developer Joins Team

**Flexible Component:**
```
Developer: "What should the button say?"
Designer: "Hmm, let me think... maybe 'Start your scan'?"
Developer: "But the other page says 'Run wage & hour scan'"
Designer: "That's fine, this is a different context"
Developer: "How do I know which to use?"
Designer: "Use your judgment based on the page"
```

**Global Copy Logic:**
```
Developer: "What should the button say?"
PM: "Use state='pre_scan'"
Developer: "What does that render?"
PM: "'Run wage & hour scan' / 'Takes 5–10 minutes'"
Developer: "Got it, done"
```

**Winner:** Global (faster onboarding, no decisions)

---

### Scenario 2: Copy Testing Reveals Better Wording

**Flexible Component:**
```
1. Update label in one place
2. Realize it's used elsewhere too
3. Search codebase for all instances
4. Update each individually
5. Miss a few instances
6. Inconsistent copy in production
```

**Global Copy Logic:**
```
1. Update hardcoded copy in component
2. Automatically applies everywhere
3. Deploy
4. All instances updated
```

**Winner:** Global (single source of truth)

---

### Scenario 3: Edge Case Needs Different Copy

**Flexible Component:**
```
// Easy to handle
<PrimaryAction 
  state="pre-scan"
  label="Custom edge case copy"
  secondaryLabel="Specific context"
/>
```

**Global Copy Logic:**
```
// Two options:

Option A: Add new state
state="pre_scan_edge_case"

Option B: Use different component
<SecondaryAction label="Custom copy" />

Option C: Accept the constraint
Use standard pre_scan copy
```

**Winner:** Flexible (more adaptable)

---

### Scenario 4: Product Scales to 20+ Pages

**Flexible Component:**
```
Page 1:  "Run scan" / "5–10 min"
Page 2:  "Start assessment" / "Quick diagnostic"
Page 3:  "Begin compliance check" / "Free"
Page 4:  "Get your score" / "Takes 5-10 minutes"
Page 5:  "Run wage & hour scan" / "~5–10 min"
...
Page 20: "Start scan" / "5 to 10 minutes"
```

**Result:** Copy chaos

**Global Copy Logic:**
```
All pages: "Run wage & hour scan" / "Takes 5–10 minutes"
```

**Result:** Perfect consistency

**Winner:** Global (scales better)

---

## Visual Comparison

### Flexible Component Showcase

- Shows all 5 states
- Each state has multiple examples with different copy
- Demonstrates context property
- Emphasizes flexibility
- Real-world examples show copy variations

**URL:** `/primary-action`

---

### Global Copy Logic Showcase

- Shows all 5 states
- Each state has ONE fixed copy example
- No context property shown
- Emphasizes consistency
- User journey shows copy evolution

**URL:** `/global-primary-action`

---

## Code Comparison

### Flexible Component Implementation

```typescript
// Component accepts custom labels
export const PrimaryAction = ({ 
  state, 
  context, 
  label,              // ← Prop
  secondaryLabel,     // ← Prop
  progress,
  ...props 
}) => {
  // Use provided labels directly
  return (
    <button>
      <span>{label}</span>
      {secondaryLabel && <span>{secondaryLabel}</span>}
      {/* ... */}
    </button>
  );
};
```

---

### Global Copy Logic Implementation

```typescript
// Component hardcodes copy based on state
const getCopyForState = (state, questionProgress) => {
  switch (state) {
    case 'pre_scan':
      return {
        label: 'Run wage & hour scan',
        subtext: 'Takes 5–10 minutes'
      };
    case 'in_progress':
      return {
        label: 'Continue scan',
        subtext: questionProgress 
          ? `Question ${questionProgress.current} of ${questionProgress.total}`
          : 'Progress saved'
      };
    // ... other states
  }
};

export const PrimaryAction = ({ 
  state,
  questionProgress,
  ...props 
}) => {
  // Get hardcoded copy
  const { label, subtext } = getCopyForState(state, questionProgress);
  
  return (
    <button>
      <span>{label}</span>
      {subtext && <span>{subtext}</span>}
      {/* ... */}
    </button>
  );
};
```

---

## Decision Matrix

### Choose Flexible Component If:

- [ ] Product is early-stage
- [ ] Copy is still being tested/validated
- [ ] Team is small (< 5 people)
- [ ] Brand voice is evolving
- [ ] Many unique contexts need custom copy
- [ ] Designer involvement in each implementation
- [ ] Edge cases are common
- [ ] Copy variation is valued

---

### Choose Global Copy Logic If:

- [ ] Product is scaling
- [ ] Copy has been validated through research
- [ ] Team is large (> 10 people)
- [ ] Brand voice is established
- [ ] Consistency is critical
- [ ] System-driven approach preferred
- [ ] Fast implementation matters
- [ ] Onboarding speed important
- [ ] Copy maintenance is a concern
- [ ] Single source of truth needed

---

## Guardrail HR Recommendation

**For Guardrail HR: Use Global Copy Logic**

**Rationale:**

1. **Compliance product = trust**
   - Consistency builds credibility
   - Users expect professional polish
   - Copy variations feel unfinished

2. **Clear user journey**
   - Pre-scan → In-progress → Post-scan → Locked → Upgrade
   - States are well-defined
   - Copy can be standardized

3. **Scaling considerations**
   - Multiple modules planned
   - Team will grow
   - Maintenance matters

4. **Brand voice established**
   - Calm, factual tone defined
   - Copy principles documented
   - Ready to enforce

5. **User research complete**
   - Current copy tested
   - No major changes expected
   - Safe to lock in

---

## Hybrid Approach (Not Recommended)

**Possible but dangerous:**

```typescript
interface PrimaryActionProps {
  state: 'pre_scan' | 'in_progress' | 'post_scan' | 'locked' | 'upgrade';
  label?: string;              // ← Optional override
  secondaryLabel?: string;     // ← Optional override
  // ...
}

// Implementation
const { label, subtext } = getCopyForState(state);
const finalLabel = props.label || label;          // ← Override if provided
const finalSubtext = props.secondaryLabel || subtext;
```

**Why avoid:**
- Defeats purpose of global copy logic
- Creates inconsistency
- "Optional" overrides become common
- Back to flexible component problems
- Worst of both worlds

**If you need flexibility, commit to flexible component.**
**If you need consistency, commit to global copy logic.**

---

## Migration Timeline

### Guardrail HR Migration Plan

**Week 1: Audit**
- Identify all PrimaryAction usage
- Document current copy variations
- Validate states are correct

**Week 2: Standardize**
- Choose canonical copy for each state
- Update component to hardcode copy
- Remove label props from interface

**Week 3: Refactor**
- Update all instances across codebase
- Remove custom label props
- Test consistency

**Week 4: Enforce**
- Add lint rules
- Update documentation
- Train team

**Week 5: Monitor**
- Watch for edge cases
- Validate user experience
- Iterate on copy if needed

---

## Final Recommendation

**For Guardrail HR: Implement Global Copy Logic**

**Use:**
- `/src/app/components/PrimaryAction.tsx` (Global Copy Logic version)
- Showcase at `/global-primary-action`
- Documentation in `/GLOBAL_PRIMARY_ACTION_SPEC.md`

**Archive:**
- Old flexible version for reference
- Keep `/primary-action` showcase for comparison
- Document decision in design system

**Enforce:**
- Lint rules to prevent label props
- Code review checklist
- Design system documentation
- Team training

---

**Status:** Global Copy Logic Implemented ✅

**Live Comparison:**
- Flexible: `/primary-action`
- Global: `/global-primary-action`
