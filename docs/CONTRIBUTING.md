# Contributing

## Purpose
To define coding standards, git workflow, and commit conventions so the codebase stays consistent even if more than one developer ever touches it.

## Overview
This project follows the same conventions established across the developer's other client projects: strict component structure, styled-components-only styling, and a disciplined, small-commit git workflow.

## Current Status
In effect for all current and future work on this repository.

## Responsibilities

**Coding Standards**
- Functional components and hooks only.
- Every component follows the 4-file pattern described in `COMPONENT_GUIDE.md`.
- All styling via Styled Components, referencing shared tokens from `src/styles/theme.js` — no inline styles except for genuinely dynamic, per-instance values (e.g., a computed transform).
- No `console.log` left in committed code; use proper error handling and, where needed, a clearly-labeled debug log removed before merge.
- Prefer complete, self-contained file rewrites over partial patches when a change touches most of a file — partial diffs that leave a file in an inconsistent state are harder to review and more error-prone.
- Error handling must surface meaningful messages, never silently swallow exceptions (see `SECURITY.md` implementation notes) — this has been a recurring issue on prior projects and is treated as a hard rule here.

**Git Workflow**
- `main` is always deployable.
- Feature work happens on branches named `feature/<short-description>`, fixes on `fix/<short-description>`.
- Pull requests required for all changes to `main`, even single-developer ones, so CI (`lint.yml`) runs and there's a reviewable record of each change.
- Rebase (not merge commits) preferred when bringing a feature branch up to date with `main`, to keep history readable.

**Commit Conventions**
Conventional Commits format:
```
<type>(<scope>): <short description>

[optional body]
```
Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
Examples:
```
feat(gallery): add image reordering in admin CMS
fix(contact-form): correct validation on phone field
docs(database): document enquiry_notes table relationships
```

**File Organization**
- New files must be placed in the correct location per `README.md`'s folder structure and `COMPONENT_GUIDE.md`'s component hierarchy — misplaced files should be corrected before merge, not left for a future cleanup pass.

## Implementation Notes
Given this is currently a solo-developer project, these standards exist primarily so the codebase remains legible to a future collaborator or the client's next developer, per the objective stated at the top of this documentation system.

## Checklist
- [x] Coding standards documented
- [x] Git workflow and commit conventions documented
- [ ] `lint.yml` CI workflow enforcing standards automatically (ESLint/Prettier config)

## Future Improvements
Add a pre-commit hook (e.g., Husky + lint-staged) once the project has more than one contributor, to catch standard violations before they reach CI.

## Related Documents
`COMPONENT_GUIDE.md`, `README.md`, `.github/workflows/lint.yml`
