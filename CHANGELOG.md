# Release changelog

## 2026-10-10 - Phase 1 taxonomy reconciliation

- Corrected Model 6 family classification: removed PRJ-010 from the Enawuga family in `public-projection.json` and `capability-map.json`; established Model 6 as a separate independent backend infrastructure family.
- Added three new evidence records: PRJ-016 (BERHANE OS — E-PSM Architecture and Prototyping), PRJ-014 (PISCES 2.0 — E-PSM Institutional Market Prototype, Vercel public demo), PRJ-015 (BERHANE OS Sovereign Studio, Vercel public demo).
- Updated RES-003 description to accurately reflect the E-PSM manuscript's submission to the Journal of Capital Market Studies (October 2025), decline (December 2025), and author self-publication on Academia.edu; the record is explicitly not journal-published, accepted, or peer-reviewed.
- Added `evidenceReviewedAt` field to `public-projection.json`; footer and credential section now display the evidence-review date and certification count dynamically from the data rather than as hardcoded HTML.
- Annotated the stale Model6/Enawuga classification in `IDENTITY-RECONCILIATION-2026-10-09.md` as superseded; historical text preserved.
- Added `institutionalEngagement` cross-pillar section to `capability-map.json`; clarified that Institutional Engagement & Market Development is a cross-cutting professional pillar, not a fourth project family.
- Added E-PSM lineage narrative to the Research & institutional intelligence family description in the capability map.
- Regenerated `public-data.js` bundle from canonical JSON.
- All existing evidence IDs, matcher rules, and evidence-governance boundaries preserved unchanged.
- No private documents, credentials, secrets, or primary correspondence published.

## 2026-09-06 - Increment A production release

- Added the approved career, education, research, certification, graph, matcher, scenario, and audience-view projection updates.
- Allowed same-origin projection loading under the static host security policy.
- Kept interactive controls usable when projection loading is temporarily unavailable.
- Completed HTTPS preview QA with no browser console errors and passed JavaScript/JSON integrity checks.
- Added the repository README and aligned deployment guidance with the approved public contact policy.

## 2026-09-03 - Production baseline

- Published the evidence-backed public projection with 64 evidence records and 9 explainable matcher rules.
- Added 45 certification records with public credential verification links where available.
- Added research, project, volunteering, education, career, GitHub, FSRR, Enawuga, SSRN, and Academia.edu evidence paths.
- Added automated projection validation and JavaScript syntax checks to the Pages workflow.
- Confirmed desktop and mobile layout checks, keyboard navigation, graph pathways, matcher lenses, scenarios, and audience views.
- Confirmed no private local paths, passwords, API keys, or private document references are included in the public projection.

## Release policy

- Every public change must pass projection validation, syntax validation, link checks, privacy review, and desktop/mobile walkthroughs.
- The previous stable release is preserved by the `mvp-baseline-2026-09-03` tag.
- The previous stable release is recorded by the `production-2026-09-03` tag; this release is recorded by `production-2026-09-06`.
