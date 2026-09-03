const pathCopy = {
  research: 'Research connects CAD measurement, SRF diagnosis, FIOS evidence governance, and independent financial-sector publications.',
  technology: 'Technology connects rural-agent infrastructure, interoperable payment rails, APIs, knowledge graphs, AI agents, and explainable decision support.',
  impact: 'Impact connects financial inclusion, rural access, institutional resilience, productive capital, public service, and practical delivery.',
  leadership: 'Leadership connects nearly two decades of banking and enterprise experience with training delivery, the 29 December 2010 coordinator appointment, entrepreneurship, partnerships, and programme design.'
};

let graphNodes = [];
let requirementRules = [];
const scenarios = {
  baseline: {title:'Baseline · disciplined continuation',description:'Current evidence, projects, and capability development continue without assuming new funding, validation, or institutional adoption.',confidence:'Directional',measure:'Evidence and milestones'},
  reform: {title:'Reform · validated expansion',description:'Validation improves, trusted partnerships form, and the strongest platform components move from demonstration toward carefully governed adoption.',confidence:'Conditional',measure:'External review and signed pilots'},
  stress: {title:'Stress · constrained progress',description:'Validation, funding, data access, or adoption is delayed. Work prioritizes evidence quality, privacy, resilience, and reversible next steps.',confidence:'Risk lens',measure:'Blockers and mitigation actions'}
};

const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));

const renderMatcher = () => {
  const input = document.querySelector('#role-input');
  const output = document.querySelector('#matcher-output');
  const text = input.value.toLowerCase();
  if (!text.trim()) {
    output.innerHTML = '<div class="matcher-empty"><span class="panel-number">MATCH REPORT</span><h3>Your evidence map will appear here.</h3><p>Matches are generated from explicit capability tags and linked evidence. Requirements without evidence remain visible as gaps.</p></div>';
    return;
  }
  const matched = requirementRules.filter((rule) => rule.terms.some((term) => text.includes(term)));
  const evidence = matched.flatMap((rule) => rule.evidence).filter((id, index, ids) => ids.indexOf(id) === index).map((id) => graphNodes.find((node) => node.id === id)).filter(Boolean);
  const missing = requirementRules.filter((rule) => !matched.includes(rule)).filter((rule) => rule.terms.some((term) => text.includes(term)) === false).slice(0, 3);
  const roleTitle = text.split(/[.!?\n]/)[0].trim().slice(0, 58) || 'Role scenario';
  const matchedHtml = matched.length ? matched.map((rule) => `<div class="match-item"><strong>${rule.name}</strong><p>Matched because the requirement mentions: ${rule.terms.filter((term) => text.includes(term)).slice(0,2).join(', ')}.</p></div>`).join('') : '<p class="match-gap">No controlled capability terms detected yet. Try “digital finance”, “resilience”, “DPI”, or “research”.</p>';
  const evidenceHtml = evidence.length ? evidence.map((node) => `<div class="match-item"><strong>${node.title}</strong><p>${node.description}</p><a href="${node.url}" ${node.url.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>${node.label} · inspect evidence →</a></div>`).join('') : '<p class="match-gap">No evidence was matched. This is a signal to review the requirement or add verified evidence—not a negative suitability judgment.</p>';
  const gapsHtml = missing.length ? missing.map((rule) => `<div class="match-gap"><strong>${rule.name}</strong><br>No direct tagged evidence was found in the current public register.</div>`).join('') : '<p class="match-item"><strong>No uncovered capability category detected.</strong><br><span>The matcher still cannot assess unlisted requirements.</span></p>';
  const questionsHtml = matched.slice(0, 3).map((rule) => `<div class="match-item"><strong>${rule.question || `What measurable outcome would demonstrate strength in ${rule.name.toLowerCase()}?`}</strong></div>`).join('');
  output.innerHTML = `<div class="match-summary"><div><small>MATCH REPORT</small><h3>${escapeHtml(roleTitle)}</h3></div><div><strong>${matched.length}</strong><small>capabilities matched</small></div></div><div class="match-section"><h4>Capability matches</h4>${matchedHtml}</div><div class="match-section"><h4>Supporting evidence</h4>${evidenceHtml}</div><div class="match-section"><h4>Open requirements</h4>${gapsHtml}</div><div class="match-section"><h4>Fair interview prompts</h4>${questionsHtml || '<p class="match-item">Add a clearer role description to generate prompts.</p>'}</div>`;
};

const renderGraph = () => {
  const query = document.querySelector('#graph-search').value.toLowerCase().trim();
  const status = document.querySelector('#graph-filter').value;
  const results = graphNodes.filter((node) => {
    const matchesStatus = status === 'all' || node.status === status;
    const matchesQuery = !query || `${node.title} ${node.description} ${node.source} ${node.tags}`.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });
  const container = document.querySelector('#graph-results');
  container.innerHTML = results.length ? results.map((node) => `<article class="graph-result"><small>${node.id} · ${node.label}</small><h3>${node.title}</h3><p>${node.description}</p><small>${node.source}</small><br><a href="${node.url}" ${node.url.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>Inspect evidence →</a></article>`).join('') : '<p class="graph-empty">No matching evidence. Try another term or choose “All evidence.”</p>';
};

const renderProjectionSections = (projection) => {
  const byId = new Map(graphNodes.map((node) => [node.id, node]));
  const badgeClass = {verified:'badge-public', document:'badge-doc', project:'badge-project', synthesis:'badge-synthesis', proposed:'badge-synthesis'};
  const renderCards = (items) => items.map((node) => `<article class="evidence-card"><span class="evidence-badge ${badgeClass[node.status] || 'badge-synthesis'}">${escapeHtml(node.label)}</span><h3>${escapeHtml(node.title)}</h3><p>${escapeHtml(node.description)}</p><small>${escapeHtml(node.source)}</small><a href="${node.url}" ${node.url.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>${node.url.startsWith('http') ? 'Inspect source ↗' : 'View evidence boundary →'}</a>${node.sourceLinks?.length ? `<div class="source-links">${node.sourceLinks.map((url) => `<a href="${url}" target="_blank" rel="noreferrer">Linked source ↗</a>`).join('')}</div>` : ''}</article>`).join('');
  document.querySelector('#featured-evidence').innerHTML = projection.featuredEvidence.map((id) => byId.get(id)).filter(Boolean).map((node) => `<article class="evidence-card"><span class="evidence-badge ${badgeClass[node.status] || 'badge-synthesis'}">${escapeHtml(node.label)}</span><h3>${escapeHtml(node.title)}</h3><p>${escapeHtml(node.description)}</p><a href="${node.url}" ${node.url.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>${node.url.startsWith('http') ? 'Open source ↗' : 'View evidence boundary →'}</a></article>`).join('');
  document.querySelector('#career-list').innerHTML = renderCards(projection.evidence.filter((node) => node.id.startsWith('CAR-')));
  document.querySelector('#education-list').innerHTML = renderCards(projection.evidence.filter((node) => node.id.startsWith('EDU-') || node.id.startsWith('TRN-')));
  document.querySelector('#research-list').innerHTML = renderCards(projection.evidence.filter((node) => node.id.startsWith('RES-')));
  document.querySelector('#forecast-rows').innerHTML = projection.forecasts.map((forecast) => `<tr><td>${escapeHtml(forecast.signal)}</td><td>${escapeHtml(forecast.evidence)}</td><td>${escapeHtml(forecast.checkpoint)}</td><td><span class="table-status ${escapeHtml(forecast.statusClass)}">${escapeHtml(forecast.status)}</span></td></tr>`).join('');
  document.querySelector('#certification-list').innerHTML = projection.certifications.map((certification) => `<article class="evidence-card"><span class="evidence-badge badge-public">Credential · ${escapeHtml(certification.issued)}</span><h3>${escapeHtml(certification.name)}</h3><p>${escapeHtml(certification.issuer)}${certification.credentialId ? ` · Credential ID: ${escapeHtml(certification.credentialId)}` : ' · No separate credential ID listed'}</p><a href="${certification.verificationUrl}" target="_blank" rel="noreferrer">Verify credential ↗</a></article>`).join('');
};

const initializeApp = async () => {
  try {
    const response = await fetch('data/public-projection.json', {cache: 'no-store'});
    if (!response.ok) throw new Error(`Projection request failed: ${response.status}`);
    const projection = await response.json();
    graphNodes = projection.evidence;
    requirementRules = projection.requirements;
    renderProjectionSections(projection);
  } catch (error) {
    document.querySelector('#graph-results').innerHTML = '<p class="graph-empty">The public evidence projection is temporarily unavailable. Please try again later.</p>';
    document.querySelector('#matcher-output').innerHTML = '<div class="matcher-empty"><span class="panel-number">MATCH REPORT</span><h3>Evidence map unavailable.</h3><p>No matching is performed until the approved public projection can be loaded.</p></div>';
    return;
  }

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((item) => {
      item.classList.toggle('is-active', item === tab);
      item.setAttribute('aria-selected', item === tab ? 'true' : 'false');
    });
    document.querySelectorAll('.audience-panel').forEach((panel) => {
      const isActive = panel.id === `view-${tab.dataset.view}`;
      panel.classList.toggle('is-hidden', !isActive);
      panel.hidden = !isActive;
    });
  });
});

document.querySelectorAll('.map-node').forEach((node) => {
  node.addEventListener('click', () => {
    const detail = document.querySelector('#path-detail');
    detail.querySelector('strong').textContent = node.firstChild.textContent.trim();
    detail.querySelector('span').textContent = pathCopy[node.dataset.path];
  });
});

document.querySelector('#graph-search').addEventListener('input', renderGraph);
document.querySelector('#graph-filter').addEventListener('change', renderGraph);
renderGraph();

document.querySelector('#match-button').addEventListener('click', renderMatcher);
document.querySelector('#role-input').addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') renderMatcher();
});
document.querySelectorAll('.preset').forEach((preset) => {
  preset.addEventListener('click', () => {
    document.querySelector('#role-input').value = preset.dataset.role;
    renderMatcher();
  });
});

document.querySelectorAll('.scenario-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.scenario-tab').forEach((item) => {
      item.classList.toggle('is-active', item === tab);
      item.setAttribute('aria-selected', item === tab ? 'true' : 'false');
    });
    const scenario = scenarios[tab.dataset.scenario];
    document.querySelector('#scenario-panel').innerHTML = `<div><span class="evidence-badge badge-synthesis">Planning scenario</span><h3>${scenario.title}</h3><p>${scenario.description}</p></div><div class="scenario-facts"><div><small>Horizon</small><strong>12–24 months</strong></div><div><small>Confidence</small><strong>${scenario.confidence}</strong></div><div><small>Measure next</small><strong>${scenario.measure}</strong></div></div>`;
  });
});
};

initializeApp();
