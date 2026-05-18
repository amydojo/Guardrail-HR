# Brand Implementation - Guardrail HR Logo Swap

## Overview
Complete brand polish pass replacing all generic/placeholder logos with Guardrail HR brand assets across the entire application.

---

## Files Changed

### 1. **Brand Assets Created** (`/public/brand/`)

#### SVG Assets (Production-ready)
- **`logo-mark.svg`** - Icon-only mark (32×32px)
  - Checkmark within rounded square
  - Used in mobile nav and as favicon base
  - Supports `currentColor` for dynamic theming

- **`logo-lockup.svg`** - Full wordmark + icon (160×32px)
  - Icon + "Guardrail HR" text
  - Used in desktop navigation
  - Supports `currentColor` for white-on-dark display

- **`favicon.svg`** - Browser tab icon
  - Filled blue background (#5b6ff5)
  - White icon mark
  - Optimized for small sizes (16×16, 32×32)

#### PNG Assets (Placeholders - require conversion)
> **Note:** These files contain placeholder comments. In production, convert `favicon.svg` to proper PNG formats using an image tool.

- **`favicon-16x16.png`** - Small favicon fallback
- **`favicon-32x32.png`** - Standard favicon fallback
- **`apple-touch-icon.png`** - iOS home screen icon (180×180)
- **`icon-192.png`** - PWA installable icon (192×192)
- **`icon-512.png`** - PWA installable icon (512×512)
- **`og-image.png`** - Social share preview (1200×630)
  - Should include: Guardrail HR branding, tagline, dark background