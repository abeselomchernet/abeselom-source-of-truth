const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const html = read('index.html');
const projection = JSON.parse(read('data/public-projection.json'));
const map = JSON.parse(read('data/capability-map.json'));
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
ids.add('capabilities');
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const target = match[1];
  if (target.startsWith('#')) assert(ids.has(target.slice(1)), `Missing anchor ${target}`);
  else if (!/^(https?:|mailto:|tel:)/.test(target)) assert(fs.existsSync(path.join(root, target.split('?')[0])), `Missing asset ${target}`);
}
const evidenceIds = new Set(projection.evidence.map((item) => item.id));
for (const capability of map.capabilities) for (const id of capability.evidence) assert(evidenceIds.has(id), `Dangling capability ${id}`);
for (const family of map.families) for (const node of family.nodes) assert(evidenceIds.has(node.evidence));
const controls = new Map();
function element(key) {
  if (!controls.has(key)) controls.set(key, {value:'', hidden:false, innerHTML:'', textContent:'', listeners:{}, addEventListener(name, handler){this.listeners[name]=handler;}, querySelector:element, querySelectorAll(){return [];}, after(){}, remove(){}});
  return controls.get(key);
}
element('#network-status').value = 'all';
const section = element('section');
const context = vm.createContext({console, document:{querySelector:element, createElement(){return section;}}, loadPortfolioData:async () => ({projection,map})});
vm.runInContext(read('evidence-explorer.js'), context);
const settle = () => new Promise((resolve) => setImmediate(resolve));
(async () => {
  await settle();
  assert.match(element('#network-count').textContent, /68 evidence records/);
  element('#network-search').value='banking';
  element('#network-search').listeners.input();
  assert.match(element('#network-results').innerHTML, /Bunna/);
  element('#network-status').value='document';
  element('#network-status').listeners.change();
  assert(!element('#network-results').innerHTML.includes('Verified public'));
  element('#network-search').value='';
  element('#network-status').value='all';
  for (const capability of map.capabilities) {
    element('#network-pathways').listeners.click({target:{closest:() => ({dataset:{network:capability.id}})}});
    assert.match(element('#network-count').textContent, new RegExp(`${capability.evidence.length} evidence records`));
  }
  element('#network-search').value='orbital navigation';
  element('#network-search').listeners.input();
  assert.match(element('#network-results').innerHTML, /No records match/);
  context.loadPortfolioData=async () => {throw Error('Simulated load failure');};
  const originalError=console.error;
  console.error=() => {};
  try {element('#network-retry').listeners.click(); await settle();} finally {console.error=originalError;}
  assert.equal(element('#network-retry').hidden, false);
  context.loadPortfolioData=async () => ({projection,map});
  element('#network-search').value='';
  element('#network-retry').listeners.click();
  await settle();
  assert.equal(element('#network-retry').hidden,true);
  console.log('PASS: local assets/anchors, relationship references, initial graph, banking search, status filter, seven pathways, empty state, load failure, retry recovery. Simulated DOM; visual browser QA not covered.');
})().catch((error) => {console.error(error);process.exitCode=1;});
