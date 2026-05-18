
# Guardrail HR

A high-fidelity MVP web application for Guardrail HR — an informational compliance workflow tool for small business owners and HR operators, starting with wage and hour risk visibility.

---

## What Guardrail HR Is

Guardrail HR is an informational tool that helps users:

- Assess wage and hour compliance risks
- Calculate overtime exposure
- Access templated HR documents and resources
- Navigate common employment law scenarios with guided workflows

Content is informational only. Scores and results are guidance tools, not legal determinations.

## What Guardrail HR Is Not

- **Not a law firm.** Guardrail HR does not provide legal advice.
- **Not a substitute for a licensed employment attorney.**
- Assessment results are informational only and should not be relied upon as legal counsel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Package Manager | pnpm |

---

## App Entry

| Path | Purpose |
|---|---|
| `index.html` | Vite entry file |
| `src/` | Active application source (React, TypeScript, styles) |
| `public/` | Static assets served at root |
| `dist/` | Generated build output — do not edit manually |

---

## Local Setup

This project uses **pnpm** as its package manager. Do not use `npm install` or `yarn`.

```bash
pnpm install
```

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start the local development server |
| `pnpm build` | Build for production (output to `dist/`) |

---

## Documentation Guide

All internal documentation lives under `docs/`:

| Folder | Contents |
|---|---|
| `docs/product/` | Product specs, template specs, feature definitions |
| `docs/ux/` | UX specs, accessibility updates, design comparisons |
| `docs/engineering/` | API docs, implementation guides, system READMEs |
| `docs/design/` | Design system, theme tokens, color maps |
| `docs/pricing/` | Pricing page and modal specs |
| `docs/legal-safety/` | Legal disclaimer and safety integration docs |
| `docs/brand/` | Brand guidelines and polish summaries |
| `docs/archive/` | Completed/superseded documents retained for reference |

---

## Safety Notes

- **Do not edit legal or disclaimer language** without explicit review from a licensed attorney or product lead.
- **Do not modify assessment scoring logic** (`src/`) without a documented review pass.
- All compliance-adjacent content (overtime calculations, risk scores) must be validated before any production change.
- Do not represent Guardrail HR content as legal advice in any user-facing copy.

---

## Pending Engineering Review

The following items require a deliberate engineering decision before action is taken:

- **`dist/` tracking** — Confirm whether `dist/` should remain tracked in git or be generated only during deployment (CI/CD). Do not remove until deployment behavior is confirmed.
- **`src/` audit** — Active routes, demo components, and cleanup candidates have not been reviewed. No dead code removal has been performed.
- **Typecheck / lint scripts** — Do not add `typecheck` or `lint` scripts to `package.json` until TypeScript and ESLint configurations are confirmed present and correct.

---

## Current Repo Notes

- Package manager is standardized on **pnpm**. `pnpm-lock.yaml` is the authoritative lock file.
- `dist/` is present in the repository. Do not remove it until deployment pipeline behavior is confirmed.
- Source code cleanup (`src/`) has not been performed. No dead code removal or refactoring has been done.
