# Privacy-friendly analytics

The public MVP deliberately ships without cookies, visitor profiling, or embedded advertising trackers.

When a custom domain is selected, enable one privacy-preserving provider at the host level, preferably Cloudflare Web Analytics or an equivalent cookieless service. Configure the provider only for the final public hostname, document its retention and data-processing settings, and verify that no personal data is sent in query strings or event payloads.

Do not add Google Analytics, session replay, fingerprinting, ad pixels, or recruiter-identifying telemetry to this public portfolio.
