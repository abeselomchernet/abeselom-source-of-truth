const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const load = (file) => JSON.parse(fs.readFileSync(path.join(root, 'data', file), 'utf8'));
const data = {projection:load('public-projection.json'), map:load('capability-map.json')};
fs.writeFileSync(path.join(root, 'public-data.js'), `globalThis.PortfolioData = Object.freeze(${JSON.stringify(data)});\n`, 'utf8');
console.log('Built browser data from canonical public JSON.');
