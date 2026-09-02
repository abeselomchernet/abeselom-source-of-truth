# Public MVP Deployment Guide

## Package

Publish the contents of this folder as the web root. It is dependency-free and can be hosted by GitHub Pages, Cloudflare Pages, Netlify, or another static HTTPS host.

## Before publishing

- Replace no evidence with assumptions; keep the evidence labels and limitations intact.
- Review the public links and confirm each destination is intended to be public.
- Add a professional public contact route when one is chosen; the MVP currently uses LinkedIn rather than an invented email address.
- Confirm that no private certificates, identity documents, API keys, passwords, or confidential project data are inside the publish folder.
- Set the final canonical domain in the host configuration and add a matching `sitemap.xml` only after the domain is known.

## Deployment checklist

1. Create a private or public repository containing only the publishable site package.
2. Configure the host to deploy the `public-mvp` folder as the site root.
3. Enable the provider’s HTTPS certificate and redirect HTTP to HTTPS.
4. Confirm the `_headers` file is supported; if not, apply equivalent headers in the host dashboard.
5. Test the home page, external links, mobile layout, keyboard navigation, tab panels, graph search, graph filters, matcher presets, matcher results, and scenario tabs.
6. Test a screen reader or accessibility inspector and confirm hidden panels are not announced when inactive.
7. Test the 404 route and all deep links after deployment.
8. Record the release date and evidence-register version in the changelog.

## Quality gates

- No broken internal links.
- No placeholder domain or contact details.
- No unsupported claim presented as verified.
- No forecast presented as a fact or promise.
- Every public project has a clear evidence boundary.
- The site remains usable without JavaScript for the core written profile; interactive enhancements may be unavailable.

## Future enhancements

- Add a custom domain and `sitemap.xml`.
- Add a privacy-preserving analytics option only after consent and review.
- Move the graph and matcher data into generated JSON from the canonical evidence register.
- Add a changelog and a visible evidence-review date.
