const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const engine = require(path.join(root, 'matcher-engine.js'));
const projection = JSON.parse(fs.readFileSync(path.join(root, 'data/public-projection.json'), 'utf8'));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const presets = [...html.matchAll(/class="preset" data-role="([^"]+)"/g)].map((match) => match[1]);
assert.equal(presets.length, 7);
for (const input of [...presets, 'Business development and go-to-market partnerships', 'Product owner leading discovery and UX', 'Banking internal controls and reconciliation', 'Programme coordination and capacity building']) {
  const matches = engine.match(input, projection.requirements, projection.evidence);
  assert(matches.length > 0, `No match: ${input}`);
  assert(matches.every((match) => match.records.length > 0));
}
assert.equal(engine.contains('paid campaign', 'ai'), false);
assert.equal(engine.contains('capital markets', 'api'), false);
assert.equal(engine.contains('AI-enabled platform', 'ai enabled'), true);
assert.equal(engine.contains('go-to-market', 'go to market'), true);
assert.deepEqual(engine.match('astronaut orbital navigation', projection.requirements, projection.evidence), []);
assert.deepEqual(engine.match('product manager', [], []), []);
console.log('PASS: seven presets, four wider scenarios, phrase boundaries, normalization, unknown requirements, and empty data.');
