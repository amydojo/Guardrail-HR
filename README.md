
# Guardrail HR

A high-fidelity MVP web application for Guardrail HR — a compliance and wage-hour guidance tool designed for HR professionals and small business owners.

---

## What Guardrail HR Is

Guardrail HR is an informational tool that helps users:

- Assess wage and hour compliance risks
- Calculate overtime exposure
- Access templated HR documents and resources
- Navigate common employment law scenarios with guided workflows

It is built as a React + Vite SPA with a Tailwind CSS design system and shadcn/ui component library.

## What Guardrail HR Is Not

- **Not a law firm.** Guardrail HR does not provide legal advice.
- **Not a substitute for a licensed employment attorney.**
- Content is informational only and should not be relied upon as legal counsel.
- Assessment results and scores are guidance tools, not legal determinations.

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

## Project Structure

```
src/          # All application source code (React, TypeScript, styles)
public/       # Static assets served at root
docs/         # Internal documentation (product, UX, engineering, design, pricing, legal-safety, archive)
dist/         # Production build output (generated — do not edit manually)
```

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
- Guardrail HR content is informational only. Do not represent it as legal advice in any user-facing copy.

---

## Current Repo Notes

- Package manager is standardized on **pnpm**. `pnpm-lock.yaml` is the authoritative lock file.
- `dist/` is present in the repository. Do not remove it until deployment pipeline behavior is confirmed.
- Source code cleanup (`src/`) has not been performed. No dead code removal or refactoring has been done.
