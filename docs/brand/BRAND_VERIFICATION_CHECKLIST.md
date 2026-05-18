# Brand Implementation Verification Checklist

Use this checklist to verify the brand polish pass is working correctly across all touchpoints.

---

## 🖥️ Visual Verification

### Desktop Navigation (≥768px)
- [ ] Logo lockup appears in top-left corner
- [ ] Logo is white/high-contrast on dark background
- [ ] Logo is clickable and links to "/"
- [ ] Logo has proper focus ring when tabbing
- [ ] Logo maintains consistent height across pages
- [ ] No layout shift when logo loads

### Mobile Navigation (<768px)
- [ ] Compact logo (icon + "Guardrail") appears
- [ ] Logo is appropriately sized for mobile
- [ ] Logo is clickable and links to "/"
- [ ] Logo doesn't crowd other nav elements

### All Pages Check
Visit each page and verify logo consistency:
- [ ] `/` - Landing page
- [ ] `/modules` - Module dashboard
- [ ] `/modules/wage-hour` - Wage & Hour module
- [ ] `/modules/wage-hour/results` - Results page
- [ ] `/resources` - Resources hub
- [ ] `/resources/exemption-checklist` - Resource detail
- [ ] `/brand` - Brand kit
- [ ] `/components` - Components showcase
- [ ] `/brand-logo` - Logo showcase (new)

---

## 🌐 Browser Tab & Favicon

### Desktop Browsers
- [ ] Chrome: Custom icon appears in tab
- [ ] Firefox: Custom icon appears in tab
- [ ] Safari: Custom icon appears in tab
- [ ] Edge: Custom icon appears in tab
- [ ] Opera: Custom icon appears in tab

### Mobile Browsers
- [ ] Chrome mobile: Icon in tab/bookmark
- [ ] Safari iOS: Icon in tab/bookmark
- [ ] Samsung Internet: Icon in tab/bookmark

### Favicon Tests
- [ ] Appears when bookmarking page
- [ ] Appears in browser history
- [ ] Appears in search bar suggestions
- [ ] Appears in pinned tabs (if supported)
- [ ] Icon is recognizable at 16×16px

---

## 📱 PWA & Home Screen Icons

### iOS (Safari)
- [ ] Add to Home Screen
- [ ] Custom icon appears (not website screenshot)
- [ ] Icon has proper name "Guardrail HR" or "Guardrail"
- [ ] Icon has rounded corners (iOS auto-applies)
- [ ] No white/black border around icon

### Android (Chrome)
- [ ] Install app prompt appears
- [ ] Custom icon appears in app drawer
- [ ] Icon has proper name "Guardrail HR"
- [ ] Icon displays correctly in launcher
- [ ] Icon matches brand colors

### Desktop PWA
- [ ] Chrome: Install as app available
- [ ] Edge: Install as app available
- [ ] App window shows custom icon
- [ ] Taskbar/dock shows custom icon

---

## 🔗 Social Media Previews

### Open Graph Testing
Use: https://developers.facebook.com/tools/debug/

- [ ] Enter your site URL
- [ ] OG image loads (1200×630)
- [ ] Title: "Guardrail HR - Compliance diagnostics for small businesses"
- [ ] Description shows correctly
- [ ] Image is properly cropped
- [ ] No errors in debugger

### Twitter Card Testing
Use: https://cards-dev.twitter.com/validator

- [ ] Enter your site URL
- [ ] Card type: "summary_large_image"
- [ ] Image displays correctly
- [ ] Title and description match
- [ ] Image meets Twitter specs

### LinkedIn Testing
Use: https://www.linkedin.com/post-inspector/

- [ ] Enter your site URL
- [ ] Preview image displays
- [ ] Title and description correct
- [ ] No cached/old preview

### Slack/Discord Testing
- [ ] Paste URL in Slack channel
- [ ] Rich preview appears with image
- [ ] Paste URL in Discord
- [ ] Embed shows correct image

---

## 🛠️ DevTools Verification

### Network Tab
- [ ] No 404 errors for brand assets
- [ ] `/brand/logo-mark.svg` loads (if used)
- [ ] `/brand/logo-lockup.svg` loads
- [ ] `/brand/favicon.svg` loads
- [ ] No duplicate logo requests
- [ ] SVGs load quickly (<50ms)

### Console
- [ ] No errors related to logo component
- [ ] No warnings about missing images
- [ ] No React key warnings

### Lighthouse Audit
- [ ] Performance: Logo doesn't impact LCP
- [ ] Accessibility: Logo has proper alt text
- [ ] SEO: Favicon and meta tags present
- [ ] Best Practices: Images properly sized

### Responsive Design Mode
- [ ] 320px (iPhone SE): Mobile logo works
- [ ] 375px (iPhone 12): Mobile logo works
- [ ] 768px (iPad portrait): Desktop logo appears
- [ ] 1024px (iPad landscape): Desktop logo works
- [ ] 1440px (Desktop): Desktop logo works
- [ ] 1920px (Large desktop): Desktop logo works

---

## ♿ Accessibility Testing

### Screen Reader
Test with VoiceOver (Mac) or NVDA/JAWS (Windows):
- [ ] Logo announces "Guardrail HR"
- [ ] Logo identifies as link
- [ ] Logo is first interactive element in nav
- [ ] Logo can be focused with Tab key
- [ ] Logo can be activated with Enter/Space

### Keyboard Navigation
- [ ] Tab key focuses logo first
- [ ] Logo has visible focus ring
- [ ] Focus ring matches brand accent (#5b6ff5)
- [ ] Enter key navigates to home
- [ ] Tab moves to next nav item

### Contrast
- [ ] Logo meets WCAG AAA (7:1) on dark background
- [ ] Logo is visible to colorblind users
- [ ] Focus ring is visible (not just color)

---

## 🎨 Design Consistency

### Logo Sizing
- [ ] Desktop nav: h-8 (32px)
- [ ] Mobile nav: h-7 (28px)
- [ ] Consistent across all pages
- [ ] No distortion or stretching

### Spacing
- [ ] Adequate clear space around logo
- [ ] Aligned with other nav items
- [ ] Doesn't overlap mobile menu button
- [ ] Maintains rhythm with typography

### Color
- [ ] Logo is white on dark background
- [ ] No unintended color shifts
- [ ] Looks good in dark mode
- [ ] SVG `currentColor` works correctly

---

## 📄 Metadata Verification

### HTML Head Tags
View page source and verify:
- [ ] `<title>` is "Guardrail HR - Compliance diagnostics..."
- [ ] Favicon links present (SVG + PNG fallbacks)
- [ ] Apple touch icon link present
- [ ] Manifest link present
- [ ] Theme color meta tags present
- [ ] OG meta tags present (type, title, description, image)
- [ ] Twitter meta tags present (card, title, description, image)

### Manifest.json
- [ ] Accessible at `/manifest.json`
- [ ] Valid JSON (no syntax errors)
- [ ] Name: "Guardrail HR"
- [ ] Short name: "Guardrail"
- [ ] Icons point to correct paths
- [ ] Background and theme colors correct

---

## 🔧 Component Tests

### Import Test
```tsx
import { BrandLogo, BrandLogoMobile } from '@/app/components/BrandLogo';
```
- [ ] No TypeScript errors
- [ ] Imports resolve correctly
- [ ] Component renders without errors

### Props Test
```tsx
<BrandLogo variant="lockup" size="md" />
<BrandLogo variant="mark" size="sm" linkTo="" />
<BrandLogoMobile className="custom-class" />
```
- [ ] All variants render
- [ ] All sizes work
- [ ] className prop applies
- [ ] linkTo prop works (including empty string)

### Edge Cases
- [ ] Logo works without JavaScript
- [ ] Logo works with slow connection
- [ ] Logo doesn't break on error
- [ ] Logo works in print styles

---

## 📸 Screenshots for Approval

Take screenshots for client/stakeholder review:
- [ ] Desktop nav (light and dark if applicable)
- [ ] Mobile nav
- [ ] Browser tab favicon
- [ ] iOS home screen icon
- [ ] Android home screen icon
- [ ] Facebook share preview
- [ ] Twitter share preview
- [ ] LinkedIn share preview

---

## 🚀 Pre-Launch Final Check

Before deploying to production:
- [ ] ⚠️ Convert all PNG placeholders to actual images
- [ ] ⚠️ Create OG image (1200×630)
- [ ] Compress PNG files for web
- [ ] Test on staging environment
- [ ] Run full Lighthouse audit
- [ ] Get client/stakeholder approval
- [ ] Update CDN/cache if applicable
- [ ] Monitor for 404s post-launch

---

## ✅ Sign-Off

**Developer:**  
- [ ] All checks passed
- [ ] No console errors
- [ ] No visual issues
- [ ] Documentation reviewed

**QA/Tester:**  
- [ ] Manual testing complete
- [ ] Cross-browser testing done
- [ ] Mobile testing done
- [ ] Accessibility testing done

**Designer:**  
- [ ] Logo placement approved
- [ ] Sizing consistent
- [ ] Colors correct
- [ ] Spacing appropriate

**Stakeholder:**  
- [ ] Brand representation accurate
- [ ] Social previews approved
- [ ] Ready for production

---

## 🐛 Known Issues & Workarounds

### Issue: PNG placeholders
- **Status:** Requires manual conversion
- **Impact:** iOS home screen, PWA install, social previews
- **Priority:** High
- **Workaround:** Use SVG favicon fallback

### Issue: OG image not created
- **Status:** Requires design work
- **Impact:** Social media shares show no image
- **Priority:** Medium
- **Workaround:** Fallback to site metadata

---

**Last Updated:** [Date]  
**Tested By:** [Name]  
**Status:** In Progress / Complete
