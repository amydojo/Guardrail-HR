# Next Steps

## Remaining Cleanup Work

1. **Human-Review Docs**:
   - Review and classify the 9 `NEEDS_HUMAN_REVIEW` files still in the root directory.

2. **README Polish**:
   - Improve the root `README.md` for public-facing clarity.

3. **Docs Indexing**:
   - Refine `docs/README.md` to ensure all documentation is properly indexed and categorized.

4. **.gitignore Proposal**:
   - Propose updates to `.gitignore` to include generated files like `dist/` and other unnecessary files.

5. **Package Manager Decision**:
   - Resolve the conflict between `pnpm` usage and the presence of `package-lock.json`.
   - Consider generating a `pnpm-lock.yaml` file.

6. **Typecheck/Lint Scripts**:
   - Add missing `typecheck` and `lint` scripts to `package.json`.

7. **dist/**:
   - Leave `dist/` untouched until the deployment path is confirmed.

8. **public/**:
   - Defer cleaning `public/` assets until an audit of referenced assets is completed.

9. **src/**:
   - Explicitly defer cleanup of `src/` until all other tasks are completed.

## Do Not Touch Yet

- `src/`
- `public/`
- `dist/`
- `index.html`
- `package.json`
- `package-lock.json`
- `.gitignore`
- Config files
- Human-review docs