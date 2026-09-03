# Public Source of Truth Site

This directory is the public static portfolio. Treat it as an untrusted-environment output surface.

## Boundaries

- Publish only public-safe, approved content. Never add source documents, private evidence references, API keys, authentication secrets, private generator code, local paths, or personal identifiers not explicitly approved for public display.
- Do not claim that a fact is verified unless its source and evidence tier support that wording.
- Preserve the five evidence tiers and the public distinction between fact, interpretation, forecast, and aspiration.
- The matcher must remain explainable, gap-visible, and non-ranking. Do not add a suitability score, protected-characteristic inference, or public document generation.

## Data and implementation

- Prefer generated public projection data from the canonical ledger. Do not introduce a new manual evidence list in UI code.
- Every evidence ID referenced by a matcher rule, graph edge, lens, or card must resolve to a public projection item.
- Every numerical public claim needs a dated source/explanation.
- Keep public pages functional without private backend access and avoid browser-exposed API keys.

## Validation before release

- Run static checks for dangling IDs, private-field leakage, broken internal links, and public source links.
- Run desktop and mobile E2E checks for graph, lenses, matcher, forecast view, keyboard navigation, and portrait layout.
- Confirm the target host actually enforces any security headers claimed by the deployment configuration.
