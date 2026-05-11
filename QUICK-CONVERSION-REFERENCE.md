# Theme Token Conversion - Quick Reference Card

## 🎯 Find & Replace Patterns (Most Common)

### Backgrounds (In Order of Frequency)
```
bg-white/[0.03]       →  bg-theme-surface-1
bg-white/[0.02]       →  bg-theme-surface-2  
bg-[#0a0a0a]          →  bg-theme-bg
bg-[#1a1a1a]          →  bg-theme-surface-1
bg-[#161616]          →  bg-theme-surface-1
hover:bg-white/[0.03] →  hover:bg-theme-surface-1
hover:bg-white/[0.04] →  hover:bg-theme-surface-1
```

### Borders (In Order of Frequency)
```
border-white/[0.08]   →  border-theme-border-1
border-white/[0.06]   →  border-theme-border-2
border-white/[0.12]   →  border-theme-border-1
border-white/[0.04]   →  border-theme-border-2
border-gray-800       →  border-theme-border-1
border-gray-900       →  border-theme-border-1
```

### Text (In Order of Frequency)
```
text-white            →  text-theme-text-1
text-gray-400         →  text-theme-text-2
text-gray-500         →  text-theme-text-3
text-gray-300         →  text-theme-text-1
text-gray-600         →  text-theme-text-3
hover:text-gray-300   →  hover:text-theme-text-1
```

### Accent/Primary Blue
```
text-[#5b6ff5]        →  text-theme-accent
bg-[#5b6ff5]          →  bg-theme-accent
border-[#5b6ff5]      →  border-theme-accent
hover:text-[#4a5ee0]  →  hover:text-theme-accent-hover
hover:bg-[#4a5ee0]    →  hover:bg-theme-accent-hover
bg-[#5b6ff5]/10       →  bg-theme-accent-soft
border-[#5b6ff5]/30   →  border-theme-accent/30
ring-[#5b6ff5]        →  ring-theme-focus
focus:ring-[#5b6ff5]  →  focus:ring-theme-focus
```

### Status Colors - Success (Green)
```
text-emerald-400      →  text-theme-success
bg-emerald-500/10     →  bg-theme-success-bg
border-emerald-500/20 →  border-theme-success-border
```

### Status Colors - Warning (Yellow)
```
text-yellow-500       →  text-theme-warning
bg-yellow-500/5       →  bg-theme-warning-bg
border-yellow-500/20  →  border-theme-warning-border
```

### Status Colors - Danger (Red)
```
text-red-400          →  text-theme-danger
text-red-500          →  text-theme-danger
bg-red-500/10         →  bg-theme-danger-bg
border-red-500/40     →  border-theme-danger-border
border-red-500/20     →  border-theme-danger-border
```

---

## 🔍 Search Patterns (Regex)

If your editor supports regex search:

```regex
bg-white\/\[0\.\d+\]           Match: bg-white/[0.03], etc.
border-white\/\[0\.\d+\]       Match: border-white/[0.08], etc.
text-gray-\d+                  Match: text-gray-400, text-gray-500, etc.
bg-\[#[0-9a-fA-F]+\]          Match: bg-[#0a0a0a], bg-[#5b6ff5], etc.
```

---

## ⚡ Common Component Patterns

### Card Container
```tsx
/* Before */
<div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-6">

/* After */
<div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6">
```

### Input Field
```tsx
/* Before */
<input className="bg-white/[0.03] border border-white/[0.08] text-white focus:ring-[#5b6ff5]/40" />

/* After */
<input className="bg-theme-surface-1 border border-theme-border-1 text-theme-text-1 focus:ring-theme-focus/40" />
```

### Button (Primary)
```tsx
/* Before */
<button className="bg-[#5b6ff5] hover:bg-[#4a5ee0] text-white">

/* After */
<button className="bg-theme-accent hover:bg-theme-accent-hover text-white">
```

### Button (Ghost/Outline)
```tsx
/* Before */
<button className="border border-white/[0.08] text-gray-400 hover:bg-white/[0.03]">

/* After */
<button className="border border-theme-border-1 text-theme-text-2 hover:bg-theme-surface-1">
```

### Link
```tsx
/* Before */
<a className="text-[#5b6ff5] hover:text-[#4a5ee0]">

/* After */
<a className="text-theme-accent hover:text-theme-accent-hover">
```

### Heading + Body
```tsx
/* Before */
<h2 className="text-white">Title</h2>
<p className="text-gray-400">Description</p>

/* After */
<h2 className="text-theme-text-1">Title</h2>
<p className="text-theme-text-2">Description</p>
```

### Badge/Chip (Neutral)
```tsx
/* Before */
<span className="bg-white/[0.03] border border-white/[0.06] text-gray-500">

/* After */
<span className="bg-theme-chip-bg border border-theme-chip-border text-theme-chip-text">
```

### Badge (Success)
```tsx
/* Before */
<span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">

/* After */
<span className="bg-theme-success-bg border border-theme-success-border text-theme-success">
```

### Divider (Horizontal)
```tsx
/* Before */
<div className="border-t border-white/[0.06]" />

/* After */
<div className="border-t border-theme-border-2" />
```

### Divider (Vertical)
```tsx
/* Before */
<div className="w-px h-5 bg-white/[0.08]" />

/* After */
<div className="w-px h-5 bg-theme-border-1" />
```

---

## 🎨 Token Mental Model

**Think Semantically, Not Literally:**

| Old (Literal) | New (Semantic) | Why |
|---------------|----------------|-----|
| `bg-white/[0.03]` | `bg-theme-surface-1` | It's a surface layer, not "white at 3%" |
| `text-gray-400` | `text-theme-text-2` | It's secondary text, not "gray 400" |
| `bg-[#5b6ff5]` | `bg-theme-accent` | It's the primary accent, not "blue" |

**Hierarchy:**
- `text-1` = Most important (headings, primary actions)
- `text-2` = Body text, descriptions
- `text-3` = Labels, captions, muted info

**Surfaces:**
- `surface-1` = Primary card layer
- `surface-2` = Nested or secondary surfaces
- `surface-3` = Elevated (modals, drawers, tooltips)

---

## ✅ Quick Test After Converting

1. **Dark Mode Check:**
   - Switch to dark → looks same as before? ✅

2. **Light Mode Check:**
   - Switch to light → text readable? ✅
   - Cards visible against background? ✅
   - Blue accent pops? ✅

3. **Interaction:**
   - Tab through inputs → focus rings visible? ✅
   - Hover buttons → state changes? ✅

---

## 🚨 Common Mistakes

❌ **Don't do this:**
```tsx
/* Mixing old and new */
<div className="bg-theme-surface-1 border border-white/[0.08]">
```

✅ **Do this:**
```tsx
/* Consistent token usage */
<div className="bg-theme-surface-1 border border-theme-border-1">
```

---

❌ **Don't do this:**
```tsx
/* Creating new arbitrary colors */
<div className="bg-[#f5f5f5]">
```

✅ **Do this:**
```tsx
/* Use existing tokens */
<div className="bg-theme-surface-2">
```

---

❌ **Don't do this:**
```tsx
/* Changing layout during conversion */
<div className="bg-theme-surface-1 p-8"> {/* was p-6 */}
```

✅ **Do this:**
```tsx
/* Only change colors */
<div className="bg-theme-surface-1 p-6">
```

---

## 📍 Where to Find Help

1. **Full token list:** `/src/styles/theme-tokens.css`
2. **Complete guide:** `/LIGHT-MODE-FINAL-DELIVERABLE.md`
3. **Examples:** `/OVERTIME-CALCULATOR-CONVERSION-EXAMPLE.md`
4. **Current status:** `/THEME-IMPLEMENTATION-SUMMARY.md`

---

## 💡 Pro Tips

- **Convert in batches:** Do all `bg-*` first, then all `text-*`, etc.
- **Use multi-cursor:** Select all instances of a pattern and edit simultaneously
- **Test incrementally:** Don't convert 10 files before testing
- **Keep dark mode open:** Switch back often to ensure no regressions
- **When in doubt:** Use text-2 for body text, surface-1 for cards, border-1 for borders

---

**Remember:** You're not redesigning, just swapping colors for tokens. Layout stays the same!
