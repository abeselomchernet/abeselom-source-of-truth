const pathCopy = {
  research: 'Research connects CAD measurement, SRF diagnosis, FIOS evidence governance, and independent financial-sector publications.',
  technology: 'Technology connects rural-agent infrastructure, interoperable payment rails, APIs, knowledge graphs, AI agents, and explainable decision support.',
  impact: 'Impact connects financial inclusion, rural access, institutional resilience, productive capital, public service, and practical delivery.',
  leadership: 'Leadership connects nearly two decades of banking and enterprise experience with training, entrepreneurship, partnerships, and programme design.'
};

const graphNodes = [
  {id:'RES-001',title:'SRF Volume II',status:'verified',label:'Verified public',description:'Independent research on Ethiopian financial-system resilience, resolution, and execution.',source:'SSRN · Google Scholar · ResearchGate',url:'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6822401',tags:'research resilience Ethiopia'},
  {id:'PRJ-002',title:'FIOS / CAD Phase 2',status:'project',label:'Public project',description:'Evidence-governed institutional intelligence platform connecting measurement, diagnosis, graphs, agents, and delivery.',source:'CAD Phase 2 documentation',url:'#limitations',tags:'FIOS CAD research platform'},
  {id:'PRJ-005',title:'FSRR Ethiopia Pilot',status:'verified',label:'Verified public',description:'Evidence-first financial-system resilience workspace; current state is read-only intake, not a completed rating.',source:'Live public project',url:'https://glum-surprised-charactercode--berhaneunity.replit.app/',tags:'FSRR resilience Ethiopia evidence'},
  {id:'PRJ-001',title:'Enawuga Phygital Nexus',status:'verified',label:'Verified public',description:'Rural finance and DPI demonstration connecting agents, payments, identity, and productive activity.',source:'Live public project',url:'https://phygital-rural-agent-hub.vercel.app/',tags:'Enawuga DPI rural finance payments'},
  {id:'FIN-001',title:'FinWise Acceleration Program · Cohort 2',status:'document',label:'Document-backed',description:'EDI/UNCDF correspondence records official Enawuga selection from 322 applicants, participation, the 12-Day bootcamp culmination, and final pitch-deck submission.',source:'User-supplied EDI/UNCDF email records',url:'#limitations',tags:'FinWise EDI UNCDF financial inclusion development finance Enawuga pitch acceleration'},
  {id:'ENT-001',title:'Wishland enterprise foundation',status:'document',label:'Document-backed',description:'Private business records support Wishland Networking PLC registration, general-manager identification, and a telecommunications value-added-services classification.',source:'Private registration records; identifiers withheld',url:'#limitations',tags:'Wishland entrepreneurship telecommunications business registration leadership'},
  {id:'TRN-001',title:'Bankers’ Training Coordinator',status:'document',label:'Document-backed',description:'Formal appointment and programme agreement support coordination and curriculum leadership.',source:'Sub-Saharan University College records',url:'#limitations',tags:'training leadership banking'},
  {id:'EDU-004',title:'Certified Digital Finance Practitioner',status:'verified',label:'Verified public',description:'Professional digital-finance credential recorded through the Digital Frontiers Institute.',source:'LinkedIn / DFI profile',url:'https://www.linkedin.com/in/abeselomchernet/',tags:'credential digital finance'},
  {id:'RES-004',title:'Country Architect Diagnostic',status:'project',label:'Public project',description:'Framework for understanding grassroots viability, institutional translation capacity, and market formation readiness.',source:'LinkedIn and CAD materials',url:'#work',tags:'CAD translation institutions markets'},
  {id:'FC-001',title:'Scenario forecasting layer',status:'proposed',label:'Proposed',description:'Future baseline, reform, and stress forecasts with backtesting and visible uncertainty.',source:'Roadmap proposal',url:'#limitations',tags:'forecasting scenarios future'}
];

const requirementRules = [
  {name:'Development finance and capital structuring',terms:['development finance','blended finance','capital raising','structured finance','project finance','investment advisory','deal origination','transaction advisory','capital markets'],evidence:['RES-001','CAR-007','FIN-001'],question:'Which financing constraint, risk allocation, and partner capability determine whether the opportunity becomes bankable?'},
  {name:'Digital product and MSME market development',terms:['digital product','product development','product lifecycle','market research','competitive analysis','customer needs','retail','msme','vendor proposal'],evidence:['PRJ-001','CAR-007','TRN-001'],question:'Which customer segment, product lifecycle stage, and market signal should guide the first product decision?'},
  {name:'Digital finance',terms:['digital finance','fintech','mobile money','financial technology','payment'],evidence:['EDU-004','PRJ-001'],question:'Which financial product, payment, or adoption constraint matters most in this role?'},
  {name:'Financial inclusion',terms:['financial inclusion','rural finance','last mile','access','underserved'],evidence:['PRJ-001','RES-005','FIN-001'],question:'How will success be measured for the people or firms currently excluded?'},
  {name:'DPI and interoperability',terms:['dpi','digital public infrastructure','interoperability','payment rail','api','switch'],evidence:['PRJ-001','PRJ-002'],question:'Which systems, standards, or institutional boundaries must interoperate?'},
  {name:'Institutional resilience',terms:['resilience','financial system','crisis','resolution','supervision','risk'],evidence:['RES-001','PRJ-005'],question:'What evidence would distinguish a resilient system from a merely compliant one?'},
  {name:'Applied research',terms:['research','methodology','validation','policy','diagnostic','evidence'],evidence:['RES-001','RES-004','PRJ-002'],question:'What decision should the research make easier or more defensible?'},
  {name:'Technology and AI',terms:['technology','ai','agent','knowledge graph','machine learning','automation','software'],evidence:['PRJ-002','PRJ-007'],question:'Where should automation assist judgment, and where must human review remain mandatory?'},
  {name:'Leadership and partnerships',terms:['leadership','programme','program','partnership','stakeholder','strategy','manager'],evidence:['CAR-003','TRN-001'],question:'Which stakeholders need alignment, and what practical outcome would demonstrate it?'}
];

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
  const questionsHtml = matched.slice(0, 3).map((rule) => `<div class="match-item"><strong>${rule.question}</strong></div>`).join('');
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
