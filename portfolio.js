(() => {
  const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  async function initializeAtlas() {
    const {projection, map} = await loadPortfolioData();
    const evidence = new Map(projection.evidence.map((item) => [item.id, item]));
    const card = (item) => `<a class="atlas-evidence" href="${escape(item.url)}" ${item.url.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}><small>${escape(item.label)}</small><strong>${escape(item.title)}</strong><p>${escape(item.description)}</p></a>`;
    const host = document.createElement('section');
    host.id = 'capabilities';
    host.className = 'section capability-section';
    host.innerHTML = `<div class="shell"><div class="section-heading"><div><p class="eyebrow">The capability atlas</p><h2>Experience that connects.</h2></div><p>Explore the career, research, projects, and learning behind each capability.</p></div><div class="atlas-layout"><div class="atlas-tabs" role="group" aria-label="Capabilities">${map.capabilities.map((item) => `<button type="button" data-capability="${item.id}" aria-pressed="false">${escape(item.title)}<span>Explore evidence →</span></button>`).join('')}</div><div id="capability-detail" class="atlas-detail" aria-live="polite"></div></div><p class="atlas-boundary">Connections are interpretations of linked evidence. Credentials establish learning; projects demonstrate bounded practice. Commercial outcomes require their own evidence.</p><div class="section-heading ecosystem-heading"><div><p class="eyebrow">The connected portfolio</p><h2>Two families. One founder perspective.</h2></div><p>Project relationships show lineage and intended architecture. Each system retains its own maturity.</p></div><div class="ecosystem-grid">${map.families.map((family) => `<article class="ecosystem-family"><h3>${escape(family.title)}</h3><p>${escape(family.description)}</p>${family.nodes.map((node) => `<div class="ecosystem-node"><p>${escape(node.role)}</p>${card(evidence.get(node.evidence))}</div>`).join('')}</article>`).join('')}</div><div class="programme-context"><strong>Wishland · founder and programme context</strong><p>Document-backed EDI / UNCDF FinWise Cohort 2 records support selection, participation, bootcamp, and final pitch submission. They provide programme experience alongside the Enawuga product work.</p>${card(evidence.get('FIN-001'))}</div></div>`;
    document.querySelector('#work').before(host);
    function selectCapability(id) {
      const capability = map.capabilities.find((item) => item.id === id);
      host.querySelectorAll('[data-capability]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.capability === id)));
      const learning = projection.certifications.filter((item) => capability.terms.some((term) => item.name.toLowerCase().includes(term.toLowerCase())));
      host.querySelector('#capability-detail').innerHTML = `<p class="eyebrow">Capability interpretation</p><h3>${escape(capability.title)}</h3><p>${escape(capability.description)}</p><h4>Applied experience & work</h4>${capability.evidence.map((id) => card(evidence.get(id))).join('')}<h4>Related learning</h4><div class="learning-links">${learning.map((item) => `<a href="${escape(item.verificationUrl)}" target="_blank" rel="noreferrer">${escape(item.name)}<small>${escape(item.issuer)} · ${escape(item.issued)}</small></a>`).join('')}</div>`;
    }
    host.addEventListener('click', (event) => { const button = event.target.closest('[data-capability]'); if (button) selectCapability(button.dataset.capability); });
    selectCapability(map.capabilities[0].id);
  }
  initializeAtlas().catch(() => { const notice = document.createElement('p'); notice.className = 'shell'; notice.textContent = 'Capability evidence could not load. Please refresh or inspect the references below.'; document.querySelector('#work').before(notice); });
})();
