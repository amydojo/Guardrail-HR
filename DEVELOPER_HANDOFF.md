# Developer Handoff — Guardrail HR

The repo has been cleaned for navigation and documentation hygiene. Application source code has not been audited or refactored as part of this cleanup. Guardrail HR is informational compliance workflow tooling — not a legal advice product.

---

## 1. Current State

**Confirmed**
- Root documentation organized into `docs/` subfolders
- Package manager standardized on pnpm; `pnpm-lock.yaml` is authoritative
- `package-lock.json` removed
- `pnpm build` passes (exit 0)
- README updated for setup and repo structure
- No app source logic intentionally changed during cleanup

**Not Yet Confirmed**
- Whether `dist/` should remain tracked or be generated during deployment
- Which `src/` files are active MVP paths vs. demo/showcase files
- Whether TypeScript/ESLint configs support safe typecheck/lint scripts
- Whether scoring/assessment logic is production-ready
- Whether current routes match intended MVP launch flow

---

## 2. Local Development

```bash
pnpm install   # Install dependencies
pnpm dev       # Start local dev server
pnpm build     # Production build → dist/
```

Do not use `npm install` or `yarn`.

---

## 3. Repo Map

| Path | Purpose | Notes |
|---|---|---|
| `src/` | Application source | Not audited; do not refactor until inventory is complete |
| `public/` | Static assets | Do not clean until asset references are audited |
| `docs/` | Internal documentation | Organized by product/UX/engineering/pricing/brand/archive |
| `dist/` | Build output | Present in repo; deployment behavior not yet confirmed |

---

## 4. What Changed During Cleanup

- Root markdown docs moved into categorized `docs/` folders
- Stale progress and status notes archived to `docs/archive/`
- Theme, reference, and guideline files moved into `docs/`
- Mixed npm/pnpm state resolved to pnpm
- README updated for pnpm setup and repo structure
- Build confirmed after cleanup

**No app source logic was intentionally changed.**

---

## 5. Product-Sensitive Areas — Do Not Modify Casually

- Assessment / scoring logic
- Results page logic
- Legal / disclaimer copy
- Pricing, paywall, unlock, and gating logic
- Template / document generation logic
- App routes and navigation
- `dist/` tracking and deployment behavior
- `public/` assets

Any change that affects compliance interpretation, scoring, user guidance, or legal positioning should be treated as product/legal-sensitive.

---

## 6. Product Safety Rules

Guardrail HR should always be framed as:
- Informational and workflow-oriented
- Risk-visibility focused
- Not legal advice and not a substitute for qualified counsel
- Not a legal determination engine

Avoid language that implies: guaranteed compliance, legal conclusions, attorney-client relationship, prediction of legal outcomes, or automated legal advice.

---

## 7. Engineering Review Priorities

**A. Confirm App Flow**
Map the following routes to active vs. demo status: landing/home, assessment flow, results page, resources/templates, pricing/unlock flows, demo/showcase routes. Output: a route map with confirmed status per route.

**B. Audit Source Structure**
Inventory `src/` without refactoring. Identify: active pages, shared components, scoring/data files, template/document files, pricing/gating files, legal/disclaimer components, and unused-looking demo/showcase files.

**C. Confirm Build and Deploy Behavior**
Decide: whether `dist/` stays tracked, whether deployment builds from source or serves committed static files, and whether environment variables are required.

**D. Add Basic Dev Checks**
Only after config review: typecheck if TypeScript config supports it, lint if ESLint is installed and configured, minimal smoke test checklist for core routes.

**E. Review Assessment / Results Logic**
Before launch: confirm scoring is deterministic, results copy is non-advisory, risk drivers map clearly to user answers, legal disclaimers appear on critical surfaces, and no result implies legal advice or certainty.

---

## 8. Recommended First Engineering Task

Run a source inventory audit. Do not refactor until this inventory is complete.

| Path | Purpose | Active/Demo/Unknown | Risk if Modified | Recommendation |
|---|---|---|---|---|
| `src/` | (fill in per file/folder) | Unknown | High until audited | Audit before touching |

---

## 9. Open Questions

- Which routes are active MVP routes vs. demo/showcase routes?
- Is `dist/` required for current deployment?
- Are pricing/unlock flows wired to real gating or UI-only?
- Where does scoring logic live, and is it deterministic?
- Which components are safe to remove later?
- What minimum checks should exist before launch?
- Are any environment variables or deployment assumptions missing from README?

---

## 10. Handoff Summary

Docs organized. Package manager cleaned. Build passing. Source audit pending.
