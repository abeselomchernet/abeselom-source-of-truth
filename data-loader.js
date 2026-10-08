globalThis.loadPortfolioData = async function () {
  if (globalThis.PortfolioData) return globalThis.PortfolioData;
  const base = new URL('.', document.currentScript?.src || document.baseURI);
  const paths = ['data/public-projection.json', 'data/capability-map.json'];
  const responses = await Promise.all(paths.map((path) => fetch(new URL(path, base), {cache:'no-store'})));
  if (responses.some((response) => !response.ok)) throw new Error('Public data request failed');
  const [projection, map] = await Promise.all(responses.map((response) => response.json()));
  return {projection, map};
};
