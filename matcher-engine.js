(function (root) {
  const normalize = (value) => String(value).normalize('NFKC').toLowerCase().replace(/[‐‑–—-]/g, ' ').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  const contains = (text, term) => (` ${normalize(text)} `).includes(` ${normalize(term)} `);
  function match(input, rules, records) {
    const byId = new Map(records.map((record) => [record.id, record]));
    return rules.map((rule) => ({...rule, matchedTerms:rule.terms.filter((term) => contains(input, term)), records:rule.evidence.map((id) => byId.get(id)).filter(Boolean)})).filter((rule) => rule.matchedTerms.length && rule.records.length);
  }
  const engine = {normalize, contains, match};
  if (typeof module !== 'undefined' && module.exports) module.exports = engine;
  else root.PortfolioMatcher = engine;
})(globalThis);
