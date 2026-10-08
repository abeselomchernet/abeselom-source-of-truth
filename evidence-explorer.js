(() => {
  const safe = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const original = document.querySelector('#graph');
  const section = document.createElement('section');
  section.id = 'graph';
  section.className = 'section section-dark';
  original.after(section);
  original.remove();
  let projection;
  let map;
  let active = 'all';
  section.innerHTML = `<div class="shell"><div class="section-heading"><div><p class="eyebrow">The evidence network</p><h2>Follow the connections behind the capability.</h2></div><p>Explore how career experience, learning, research, and product work support a founder's practice.</p></div><div class="explorer-controls"><label>Search across the evidence<input id="network-search" type="search" placeholder="Try banking, Wishland, AI, UNCDF, or Macro"></label><label>Evidence status<select id="network-status"><option value="all">All evidence</option><option value="verified">Verified public</option><option value="document">Document-backed</option><option value="project">Project</option><option value="synthesis">Interpretation</option><option value="proposed">Proposed</option><option value="review">Needs review</option></select></label></div><div id="network-pathways" class="network-pathways" role="group" aria-label="Evidence pathways"></div><div id="network-context" class="network-context"></div><p id="network-count" role="status">Loading evidence…</p><div id="network-results" class="network-results"></div><button id="network-retry" type="button" class="button" hidden>Retry loading evidence</button><p class="atlas-boundary">A connection explains relevant evidence; it does not establish a live integration, commercial outcome, or proficiency score. Source labels stay visible on every record.</p></div>`;
  function render() {
    if (!projection) return;
    const capability = map.capabilities.find((item) => item.id === active);
    const query = section.querySelector('#network-search').value.trim().toLowerCase();
    const status = section.querySelector('#network-status').value;
    const linked = capability ? new Set(capability.evidence) : null;
    const results = projection.evidence.filter((item) => (!linked || linked.has(item.id)) && (status === 'all' || item.status === status) && (!query || `${item.title} ${item.description} ${item.source} ${(item.tags || []).join(' ')}`.toLowerCase().includes(query)));
    section.querySelectorAll('[data-network]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.network === active)));
    section.querySelector('#network-count').textContent = `${results.length} evidence records · ${capability ? capability.title : 'All pathways'}`;
    const learning = capability ? projection.certifications.filter((item) => capability.terms.some((term) => item.name.toLowerCase().includes(term.toLowerCase()))) : [];
    section.querySelector('#network-context').innerHTML = capability ? `<h3>${safe(capability.title)}</h3><p>${safe(capability.description)}</p><p>Career / research / projects → capability interpretation ← related learning</p><div class="network-learning">${learning.map((item) => `<a href="${safe(item.verificationUrl)}" target="_blank" rel="noreferrer">${safe(item.name)} · ${safe(item.issuer)} ↗</a>`).join('')}</div>` : '<h3>Abeselom · Wishland founder</h3><p>Select a capability to follow its supporting records and related credentials, or search across the full public register.</p><a href="#capabilities">Explore the research and Enawuga families →</a>';
    section.querySelector('#network-results').innerHTML = results.length ? results.map((item) => `<article class="graph-result"><small>${safe(item.label)} · ${safe(item.id)}</small><h3>${safe(item.title)}</h3><p>${safe(item.description)}</p><small>${safe(item.source)}</small><div class="network-tags">${(item.tags || []).map((tag) => `<span>${safe(tag)}</span>`).join('')}</div><a href="${safe(item.url)}" ${item.url.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>${item.url.startsWith('http') ? 'Inspect public source ↗' : 'Review evidence boundary →'}</a></article>`).join('') : '<p class="graph-empty">No records match this combination. Clear the search, choose All pathways, or change the status filter.</p>';
  }
  async function load() {
    section.querySelector('#network-retry').hidden = true;
    section.querySelector('#network-count').textContent = 'Loading evidence…';
    try {
      const data = await loadPortfolioData();
      projection = data.projection;
      map = data.map;
      if (!Array.isArray(projection.evidence) || !Array.isArray(map.capabilities)) throw new Error('Invalid evidence');
      section.querySelector('#network-pathways').innerHTML = `<button type="button" data-network="all" aria-pressed="true">All pathways</button>${map.capabilities.map((item) => `<button type="button" data-network="${safe(item.id)}" aria-pressed="false">${safe(item.title)}</button>`).join('')}`;
      render();
    } catch (error) {
      console.error('Evidence explorer failed:', error);
      projection = null;
      section.querySelector('#network-count').textContent = 'Evidence could not load. Retry below, or inspect career and project references elsewhere on this page.';
      section.querySelector('#network-results').innerHTML = '';
      section.querySelector('#network-retry').hidden = false;
    }
  }
  section.querySelector('#network-search').addEventListener('input', render);
  section.querySelector('#network-status').addEventListener('change', render);
  section.querySelector('#network-retry').addEventListener('click', load);
  section.querySelector('#network-pathways').addEventListener('click', (event) => { const button = event.target.closest('[data-network]'); if (button) { active = button.dataset.network; render(); } });
  load();
})();
