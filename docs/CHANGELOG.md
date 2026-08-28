# Changelog

## Purpose
To provide a chronological, human-readable record of notable changes to the project, following [Keep a Changelog](https://keepachangelog.com/) conventions.

## Overview
Every merged change that affects behavior, scope, or the public/admin experience should be reflected here, grouped under a version or date heading. This complements `CLIENT_DECISIONS.md` (why) and `CHANGE_REQUESTS.md` (scope) — this file is strictly about what shipped.

## Current Status
Active. Updated as part of each milestone or notable merge.

## Responsibilities
Maintained by the developer; reviewed at each milestone checkpoint.

## Implementation Notes
Entries are grouped as `Added`, `Changed`, `Fixed`, `Removed` under each version/date heading. Pre-1.0 (pre-launch) entries are dated rather than semver-tagged, since there is no public release yet.

## Checklist
- [x] Changelog file created
- [ ] Populated retroactively with foundational work completed to date
- [ ] Kept current at each milestone going forward

## Version History

### Unreleased
#### Added
- Project scaffold (Vite + React + Styled Components + Supabase client setup).
- Shared design token theme (`src/styles/theme.js`).
- Shared animation architecture (`src/animations/`).
- Hero, About, and Projects/Gallery-pattern sections implemented with shared animation patterns.
- Full documentation system (this `docs/` folder).

## Future Improvements
Once the site reaches its first production deployment, begin semantic versioning (`v1.0.0` at launch) for clearer client-facing release communication.

## Related Documents
`ROADMAP.md`, `CHANGE_REQUESTS.md`, `CLIENT_DECISIONS.md`
