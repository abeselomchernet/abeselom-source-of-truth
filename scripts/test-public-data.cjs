const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({fetch:() => {throw Error('Network should not be needed');}});
vm.runInContext(fs.readFileSync(path.join(root, 'public-data.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(root, 'data-loader.js'), 'utf8'), context);
(async () => {
  const data = await context.loadPortfolioData();
  for (const [key, file] of [['projection','public-projection.json'], ['map','capability-map.json']]) {
    assert.deepEqual(JSON.parse(JSON.stringify(data[key])), JSON.parse(fs.readFileSync(path.join(root, 'data', file), 'utf8')), `Public bundle is stale: ${file}`);
  }
  assert(data.projection.evidence.some((item) => JSON.stringify(item).toLowerCase().includes('banking')));
  console.log('PASS: canonical bundle parity, network-free loading, and banking evidence.');
})().catch((error) => {console.error(error); process.exitCode = 1;});
