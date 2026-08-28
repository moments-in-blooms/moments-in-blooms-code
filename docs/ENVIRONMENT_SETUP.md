# Environment Setup

## Purpose
To get any developer from a fresh machine to a running local instance of the project with no guesswork.

## Overview
The project requires Node.js, npm, a Supabase project (or access to the shared one), and Git. No other services or accounts are required for local development.

## Current Status
Accurate as of current tooling; update this file immediately if the toolchain (Node version, package manager, etc.) changes.

## Responsibilities

**Node**
- Node.js 20.x LTS or later recommended (matches Vite's current minimum requirements). Verify with:
```bash
node -v
```

**npm**
- npm 10.x or later (ships with Node 20). Verify with:
```bash
npm -v
```

**React**
- No global install needed — React is a project dependency, installed via `npm install`.

**Supabase**
- Requires access to the project's Supabase instance:
  1. Request an invite to the Supabase project from the developer, or create a personal Supabase project for local-only development against a matching schema (see `supabase/` folder for migrations).
  2. Copy the project URL and anon public key into a local `.env` file (see below).

**Git**
- Git installed and configured with a name/email matching your GitHub account. Clone via SSH where possible:
```bash
git clone git@github.com:<org>/moments-in-blooms.git
```

## Implementation Notes

**Step-by-step setup**
```bash
git clone git@github.com:<org>/moments-in-blooms.git
cd moments-in-blooms
npm install
cp .env.example .env
# edit .env and set:
#   VITE_SUPABASE_URL=...
#   VITE_SUPABASE_ANON_KEY=...
npm run dev
```
The dev server runs at `http://localhost:5173` by default.

**Applying database migrations locally (if using a personal Supabase project)**
```bash
cd supabase
# apply SQL migration files in order via the Supabase SQL editor,
# or the Supabase CLI if configured for this project
```

## Checklist
- [x] Node/npm version requirements documented
- [x] `.env.example` referenced (must exist at repo root with placeholder values)
- [ ] Supabase CLI workflow documented once adopted (currently manual SQL editor application)

## Future Improvements
Adopt the Supabase CLI for migration management once the schema stabilizes, replacing manual SQL editor application with versioned, scriptable migrations.

## Related Documents
`README.md`, `DEPLOYMENT.md`, `CONTRIBUTING.md`
