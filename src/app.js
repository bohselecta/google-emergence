import {
  VERSION,
  RUBRIC,
  skills,
  sources,
  goals,
  perspectives,
  cohorts,
  cohortDisclaimer,
  futureDomains,
  isDimensionSupported,
  syntheticPeople,
  personById,
  computeBecomingIndex,
  computeEvidenceCoverage,
  computeUncertainty,
  getOpportunitySurface,
  getActiveUserPerson,
  getAllPeople,
  getNeighborhood,
  comparePeople,
  getLeaderboard,
  discoverPatterns,
  skillById,
  initialState,
  isState,
  estimate,
  comparison,
  opportunities,
  createProject,
  adopt,
  replayAssessment,
  reviewEvidence,
  setSource,
  disclosure,
  projectBrief,
  emergenceSessions,
  sessionById,
  launchSession
} from './domain.js';

const $ = (s, root = document) => root.querySelector(s);
const esc = s =>
  String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const KEY = 'google-emergence-world-v2';
let storageNotice = '',
  state = initialState();

try {
  const raw = localStorage.getItem(KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (isState(parsed)) state = parsed;
    else storageNotice = 'Saved demo state was updated for the world comparative release.';
  }
} catch {
  storageNotice = 'Browser storage is unavailable. Your session is active in memory for this session.';
}

let filter = 'All',
  feedFilter = 'All',
  selectedSkill = 'systems',
  leaderboardSort = 'overall',
  searchQuery = '',
  comparePersonAId = 'person-you',
  comparePersonBId = 'person-elena-rostova',
  compareModeA = 'independent',
  compareModeB = 'independent',
  neighborhoodFocusId = 'person-you',
  toastTimer;

const paths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  broadcast: '<circle cx="12" cy="12" r="2.5"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>',
  orbit: '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(-35 12 12)"/><path d="M17 4a10 10 0 0 1-2 17"/>',
  folder: '<path d="M3 7V5a2 2 0 0 1 2-2h5l3 3h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
  layers: '<path d="m12 3 10 5.5-10 5.5L2 8.5Zm-9 10 9 5 9-5M3 17.5l9 5 9-5"/>',
  chart: '<path d="M4 3v17h17M8 15v-4m5 4V7m5 8v-5"/>',
  check: '<path d="m8 12 3 3 6-7"/><circle cx="12" cy="12" r="9"/>',
  shield: '<path d="M12 2 4 5.5v6.5c0 5.5 3.5 10.5 8 12 4.5-1.5 8-6.5 8-12V5.5Z"/><path d="m9 12 2 2 4-4"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  up: '<path d="M7 17 17 7M7 7h10v10"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4.5 4.5"/>',
  voice: '<path d="M4 10v4m4-8v12m4-15v18m4-11v4m4-7v10"/>',
  box: '<path d="m12 2 9 5v10l-9 5-9-5V7Zm0 10 9-5M12 12 3 7m9 5v10M7 4.5l10 5.5"/>',
  people: '<circle cx="9" cy="7" r="3.5"/><path d="M3 20v-2a5 5 0 0 1 10 0v2M16 4a3.5 3.5 0 0 1 0 7m2 4a4.5 4.5 0 0 1 3 4v1"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3.5l-4 17"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6.5v5.5l4 2.5"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11.5v5m0-8.5v1"/>',
  download: '<path d="M12 3.5v11m-4.5-4.5 4.5 4.5 4.5-4.5M4 17.5v3a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-3"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 20 3c0 9-4 16-11 17Z"/><path d="M8 16c3-4 6-6 10-8"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/>',
  spark: '<path d="m12 2 2.8 6.2L21 11l-6.2 2.8L12 20l-2.8-6.2L3 11l6.2-2.8Z"/>'
};

const icon = (name, cls = '') =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${
    paths[name] || paths.spark
  }</svg>`;

const scoreText = stat => (stat.score === null ? 'Unmapped' : `${stat.score.toFixed(1)} / 4.0`);
const tag = (text, color = '') => `<span class="tag ${color}">${text}</span>`;
const button = (text, action, cls = 'btn', extra = '') =>
  `<button class="${cls}" data-action="${action}" ${extra}>${text}</button>`;

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    toast('Local browser storage is full. Changes are retained for this session.');
  }
}

function toast(message) {
  clearTimeout(toastTimer);
  const live = $('#live');
  if (live) {
    live.textContent = message;
    live.classList.add('show');
    toastTimer = setTimeout(() => live.classList.remove('show'), 5200);
  }
}

const pages = [
  ['landscape', 'grid', 'World Landscape'],
  ['neighborhood', 'people', 'Human Neighborhoods'],
  ['compare', 'layers', 'Compare People'],
  ['observatory', 'spark', 'Emergence Observatory'],
  ['feed', 'broadcast', 'Emergence Feed'],
  ['projects', 'folder', 'Growth Projects'],
  ['perspectives', 'book', 'Perspectives'],
  ['evidence', 'check', 'Evidence Ledger'],
  ['methodology', 'shield', 'Methodology & Data']
];

function route() {
  const path = location.hash.slice(1);
  if (path === 'board' || path === 'benchmarks') return 'landscape';
  if (path === 'consent') return 'methodology';
  if (path === 'proposal') return 'proposal';
  return pages.some(p => p[0] === path) ? path : 'landscape';
}

function navigate(page) {
  if (route() === page) render();
  else location.hash = page;
}

function shell(content) {
  const current = route(),
    pending = state.evidence.filter(e => e.status === 'pending').length,
    active = state.projects.filter(p => p.status !== 'complete').length,
    activeUser = getActiveUserPerson(state),
    activeCohort = cohorts.find(c => c.id === state.cohort) || cohorts[0];

  return `<aside class="sidebar">
    <a href="#landscape" class="brand" aria-label="Google Emergence Home">
      <img src="./public/mark.svg" alt="Google Emergence" width="32" height="32" class="brand-logo">
      <div class="brand-text">
        <div class="brand-title">
          <span class="brand-google"><span class="g-blue">G</span><span class="g-red">o</span><span class="g-yellow">o</span><span class="g-blue">g</span><span class="g-green">l</span><span class="g-red">e</span></span>
          <span class="brand-product">Emergence</span>
        </div>
        <span class="brand-sub">World View of Human Capability</span>
      </div>
    </a>
    <div class="workspace-label">WORLD CAPABILITY PLATFORM</div>
    <nav aria-label="Main navigation">
      ${pages
        .map(
          ([id, i, name]) =>
            `<a href="#${id}" class="nav-item ${current === id ? 'active' : ''}" ${
              current === id ? 'aria-current="page"' : ''
            }>${icon(i)}<span>${name}</span>${
              id === 'feed'
                ? `<span class="count accent">5</span>`
                : id === 'projects' && active
                ? `<span class="count">${active}</span>`
                : id === 'evidence' && pending
                ? `<span class="count accent">${pending}</span>`
                : ''
            }</a>`
        )
        .join('')}
    </nav>
    <div class="sidebar-bottom">
      <a class="proposal-link" href="#proposal">${icon('spark')}<span style="font-weight:600">Enterprise AI & Vision</span>${icon('up')}</a>
      <div class="side-badge">
        <span class="gemini-sparkle">${icon('spark')}</span>
        <span>Comparative Architecture · BeyondCorp VPC-SC</span>
      </div>
      <div class="profile" data-action="inspect:person-you" style="cursor:pointer;" title="Inspect Your Living Capability Profile">
        <span class="avatar" style="background:#34a853;color:#fff;">AR</span>
        <div>
          <strong>Alex Rivera (You)</strong>
          <small>${activeUser.capabilities[state.mode] ? computeBecomingIndex(activeUser.capabilities, state.mode).index : 642} / 1000 · P${activeUser.cohortPercentiles[state.cohort]?.[state.mode] || activeUser.cohortPercentiles.global[state.mode]}</small>
        </div>
        <span class="online-dot" title="Active Verified Session"></span>
      </div>
    </div>
  </aside>
  <div class="workspace">
    <header class="topbar">
      <div class="breadcrumb">
        <span>Google Emergence</span>
        <span>/</span>
        <strong>${pages.find(p => p[0] === current)?.[2] || 'World Capability System'}</strong>
      </div>
      <div class="top-actions">
        <span class="enterprise-domain-pill"><span class="pulse-dot"></span> ${esc(activeCohort.label)} · ${esc(activeCohort.n.toLocaleString())} Verified Records</span>
        ${button(icon('info'), 'tour', 'icon-button', 'aria-label="How Google Emergence works"')}
        ${button(`${icon('layers')} Compare People`, 'navigate:compare', 'btn small outline')}
        ${button(`${icon('plus')} New Growth Sprint`, 'new', 'btn small google-blue')}
      </div>
    </header>
    <main id="main" tabindex="-1">
      ${content}
      <footer class="page-footer">
        <span>Google Emergence · The World View of Human Capability · Apache 2.0 License</span>
        <span>Never soften a valid comparison. Never manufacture an invalid one. · <a href="#proposal">System Architecture ${icon('up')}</a></span>
      </footer>
    </main>
  </div>`;
}

function pageHead(eyebrow, title, description, actions = '') {
  return `<section class="page-heading">
    <div>
      <div class="eyebrow">${eyebrow}</div>
      <h1>${title}</h1>
      <p>${description}</p>
    </div>
    ${actions}
  </section>`;
}

function modeToggle() {
  return `<div class="segmented" role="group" aria-label="Capability demonstration mode">
    ${['independent', 'assisted']
      .map(mode =>
        button(
          mode === 'independent' ? 'Independent Human' : 'With Gemini Enterprise',
          `mode:${mode}`,
          state.mode === mode ? 'selected' : '',
          'aria-pressed="' + (state.mode === mode) + '"'
        )
      )
      .join('')}
  </div>`;
}

function cohortSelect() {
  return `<label class="goal-control">Contextual Cohort
    <select id="cohort" aria-label="Contextual Cohort Selection">
      ${cohorts.map(c => `<option value="${c.id}" ${state.cohort === c.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}
    </select>
  </label>`;
}

// ============================================================================
// SURFACE 1: WORLD CAPABILITY LANDSCAPE & POPULATION LEADERBOARD
// ============================================================================

function landscapeView() {
  const leaderboard = getLeaderboard(state.mode, state.cohort, leaderboardSort, searchQuery, state);
  const activeCohort = cohorts.find(c => c.id === state.cohort) || cohorts[0];
  const disclaimer = cohortDisclaimer(state.cohort);

  // Summary statistics
  const avgIndex = leaderboard.length
    ? Math.round(leaderboard.reduce((sum, item) => sum + item.index, 0) / leaderboard.length)
    : 720;
  const highTrajCount = leaderboard.filter(item => item.yoyDelta >= 50).length;
  const highTrajPct = leaderboard.length ? Math.round((highTrajCount / leaderboard.length) * 100) : 28;
  const avgCoverage = leaderboard.length
    ? Math.round(leaderboard.reduce((sum, item) => sum + item.coverage, 0) / leaderboard.length)
    : 88;

  return `${pageHead(
    'WORLD CAPABILITY LANDSCAPE',
    'Global Talent Distribution & Trajectories',
    'The world view of human capability. Rigorous, objective rankings, contextual cohort switching, and verified trajectories across participating talent. Never soften a valid comparison; never manufacture an invalid one.',
    cohortSelect()
  )}

  <section class="philosophy-strip">
    <div class="philosophy-text">
      <strong>Principle: Comparison is the core product.</strong>
      <p>Emergence answers where people actually stand, who is improving unusually quickly, who is just slightly ahead, and what demonstrable capabilities account for the differences. Low scores are opportunity surfaces—not softened, but paired with attainable next steps.</p>
    </div>
    ${modeToggle()}
  </section>

  <div class="landscape-stats-strip">
    <div class="stat-card">
      <span class="stat-label">Active Cohort Sample</span>
      <span class="stat-value">${activeCohort.n.toLocaleString()}</span>
      <span class="stat-sub">${esc(activeCohort.label)}</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Median Becoming Index</span>
      <span class="stat-value">${avgIndex} <small style="font-size:14px;font-weight:400;color:var(--muted)">/ 1000</small></span>
      <span class="stat-sub">0–1000 composite scale</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">High-Trajectory Talent</span>
      <span class="stat-value" style="color:var(--google-green)">${highTrajPct}%</span>
      <span class="stat-sub">≥ +50 pts YoY movement</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Mean Evidence Coverage</span>
      <span class="stat-value">${avgCoverage}%</span>
      <span class="stat-sub">Verified rubric artifacts</span>
    </div>
  </div>

  <div class="cohort-disclaimer-pill">
    ${icon('shield')}
    <span>${esc(disclaimer)}</span>
  </div>

  <div class="leaderboard-toolbar">
    <div class="toolbar-row">
      <div class="search-box">
        <span class="search-icon">${icon('search')}</span>
        <input type="search" id="population-search" placeholder="Search people, specialties, locations, organizations..." value="${esc(searchQuery)}" aria-label="Search participating population">
      </div>
      <div class="segmented" role="group" aria-label="Sort population">
        ${[
          ['overall', 'Overall Standing (0-1000)'],
          ['velocity', '1-Year Velocity (+pts YoY)'],
          ['emerging', 'Emerging Talent'],
          ['rare_combinations', 'Rare Combinations'],
          ['breadth', 'Capability Breadth'],
          ['depth', 'Specialist Depth']
        ]
          .map(([mode, label]) =>
            button(label, `sort:${mode}`, leaderboardSort === mode ? 'selected' : '', `aria-pressed="${leaderboardSort === mode}"`)
          )
          .join('')}
      </div>
    </div>
    <div class="toolbar-row" style="font-size:12px;color:var(--muted)">
      <span>Displaying ${leaderboard.length} verified individuals in ${esc(activeCohort.name)}</span>
      <span>${icon('info')} Click any person to inspect score decomposition, evidence provenance, or launch head-to-head comparison</span>
    </div>
  </div>

  <div class="population-table-wrapper">
    <table class="population-table">
      <caption class="sr-only">World Capability Population Leaderboard</caption>
      <thead>
        <tr>
          <th class="rank-col">Rank</th>
          <th>Person & Identity</th>
          <th>Becoming Index</th>
          <th>Contextual Percentiles</th>
          <th>1-Year Movement</th>
          <th style="text-align:right">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${
          leaderboard.length
            ? leaderboard
                .map(item => {
                  const p = item.person;
                  const isLocal = p.isLocalUser;
                  const rankClass = item.rank <= 3 ? 'rank-badge-top' : '';
                  const trajClass = p.trajectory?.direction === 'surging' ? 'surging' : p.trajectory?.direction === 'rising' ? 'rising' : 'steady';
                  const primaryPct = p.cohortPercentiles?.[state.cohort]?.[state.mode] || item.percentile;
                  
                  return `<tr class="${isLocal ? 'is-local-user' : ''}">
                    <td class="rank-col">
                      <span class="${rankClass}">#${item.rank}</span>
                    </td>
                    <td>
                      <div class="person-cell">
                        <span class="person-avatar ${isLocal ? 'local' : ''}">${p.avatar}</span>
                        <div class="person-info">
                          <div class="person-name-row">
                            <span class="person-name" data-action="inspect:${p.id}">${esc(p.name)}</span>
                            <span class="synthetic-pill">${p.verificationTier === 'synthetic_benchmark_fixture' ? 'Synthetic Demo' : 'Verified Public'}</span>
                          </div>
                          <span class="person-role">${esc(p.role)} · ${esc(p.organization)}</span>
                          <div class="person-loc-chips">
                            <span class="loc-chip">🌐 Origin: ${esc(p.originCountry)}</span>
                            <span class="loc-chip">📍 Work: ${esc(p.workCountry)}</span>
                            <span>· ${esc(p.specialty)}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="index-cell">
                      <div class="index-value" data-action="inspect:${p.id}" style="cursor:pointer;" title="Click to decompose Becoming Index">
                        ${item.index} <small>/ 1000</small>
                      </div>
                      <div class="index-sub">
                        <span class="coverage-bar-track" title="${item.coverage}% evidence coverage"><span class="coverage-bar-fill" style="width:${item.coverage}%"></span></span>
                        <span>${item.coverage}% cov · ±${item.uncertainty} pts</span>
                      </div>
                    </td>
                    <td>
                      <div style="display:flex;flex-direction:column;gap:2px;font-size:11.5px;">
                        <span><strong>P${primaryPct}</strong> in ${esc(activeCohort.label)}</span>
                        <span style="color:var(--muted)">Global P${p.cohortPercentiles?.global?.[state.mode] || item.percentile} · ${p.cohortPercentiles?.swe ? `SWE P${p.cohortPercentiles.swe[state.mode]}` : `P${item.percentile}`}</span>
                      </div>
                    </td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <span class="trajectory-badge ${trajClass}">
                          ${icon('up')} +${p.trajectory?.yoyDelta || item.yoyDelta} YoY
                        </span>
                        <small style="color:var(--muted)">Rank #${p.trajectory?.velocityRank || item.rank}</small>
                      </div>
                    </td>
                    <td style="text-align:right">
                      <div class="action-buttons-cell" style="justify-content:flex-end">
                        ${button('Inspect', `inspect:${p.id}`, 'btn small outline')}
                        ${button('Neighborhood', `neighborhood:${p.id}`, 'btn small outline')}
                        ${button('Compare', `compare-with:${p.id}`, 'btn small google-blue')}
                      </div>
                    </td>
                  </tr>`;
                })
                .join('')
            : `<tr><td colspan="6" style="text-align:center;padding:48px 20px;color:var(--muted);">No participating individuals match your search query. Try searching for a different name, specialty, or country.</td></tr>`
        }
      </tbody>
    </table>
  </div>`;
}

// ============================================================================
// SURFACE 2: HUMAN NEIGHBORHOODS ("People Just Ahead")
// ============================================================================

function neighborhoodView() {
  const people = getAllPeople(state);
  const n = getNeighborhood(neighborhoodFocusId, 'composite', state.mode, state.cohort, state);
  const target = n.target;
  const opp = n.opportunitySummary;

  return `${pageHead(
    'HUMAN NEIGHBORHOODS',
    'Nearby Talent & The Next Attainable Step',
    'The most useful comparator is rarely #1 in the world. It is someone slightly ahead whose demonstrated practices reveal the next attainable step. Explore your immediate neighborhood in the global distribution.'
  )}

  <div class="toolbar wrap" style="margin-bottom:20px;">
    <label class="field inline">
      <span>Focus Profile:</span>
      <select id="neighborhood-focus-select" aria-label="Select profile for neighborhood analysis">
        ${people.map(p => `<option value="${p.id}" ${p.id === target.id ? 'selected' : ''}>${esc(p.name)} (${esc(p.role)})</option>`).join('')}
      </select>
    </label>
    ${modeToggle()}
  </div>

  <div class="opportunity-surface-box">
    <span class="opp-icon">${icon('info')}</span>
    <div>
      <strong>Opportunity Surface · ${esc(opp.percentile ? `${opp.percentile}th Percentile` : 'Active Baseline')}</strong>
      <p>${esc(opp.message)}</p>
    </div>
  </div>

  <div class="neighborhood-grid">
    <section class="neighbor-card">
      <div class="neighbor-card-header">
        <div>
          <span class="eyebrow" style="color:var(--google-blue)">NEXT ATTAINABLE COMPARATOR</span>
          <h2>The Person Immediately Above</h2>
        </div>
        ${icon('people')}
      </div>

      ${
        n.immediatelyAbove
          ? `<div class="neighbor-comparator">
              <div style="display:flex;align-items:center;gap:12px;">
                <span class="person-avatar">${n.immediatelyAbove.avatar}</span>
                <div>
                  <strong>${esc(n.immediatelyAbove.name)}</strong>
                  <div style="font-size:11.5px;color:var(--muted)">${esc(n.immediatelyAbove.role)} · ${esc(n.immediatelyAbove.organization)}</div>
                  <div style="font-size:11px;margin-top:2px;">Becoming Index: <b>${computeBecomingIndex(n.immediatelyAbove.capabilities, state.mode).index}</b> (${computeBecomingIndex(n.immediatelyAbove.capabilities, state.mode).index - n.targetScore > 0 ? `+${computeBecomingIndex(n.immediatelyAbove.capabilities, state.mode).index - n.targetScore} pts ahead` : 'Comparable'})</div>
                </div>
              </div>
              <div class="button-row" style="margin-top:8px;">
                ${button(`Compare Directly with ${esc(n.immediatelyAbove.name.split(' ')[0])}`, `compare-pair:${target.id}:${n.immediatelyAbove.id}`, 'btn small google-blue')}
                ${button('Inspect Profile', `inspect:${n.immediatelyAbove.id}`, 'btn small outline')}
              </div>
            </div>`
          : `<div class="empty-inline">At the top of this cohort distribution.</div>`
      }

      <div>
        <h3 style="margin-bottom:8px;font-size:14px;color:var(--ink)">Observed Practices Illuminating the Next Step:</h3>
        <div class="attainable-steps-list">
          ${n.attainableSteps.map(step => `<div class="attainable-step-item"><span class="step-bullet"></span><span>${esc(step)}</span></div>`).join('')}
        </div>
      </div>
    </section>

    <section class="neighbor-card">
      <div class="neighbor-card-header">
        <div>
          <span class="eyebrow" style="color:#b06000">MILESTONE GATEWAY</span>
          <h2>Next Meaningful Threshold</h2>
        </div>
        ${icon('chart')}
      </div>

      <div style="background:var(--surface-variant);border-radius:var(--radius-md);padding:18px;display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <strong>P${n.nextThreshold.percentileGate} Percentile Gate</strong>
          <span style="font-size:16px;font-weight:700;color:var(--ink)">${n.nextThreshold.requiredIndex} <small style="font-size:11px;color:var(--muted)">/ 1000</small></span>
        </div>
        <p style="font-size:12.5px;color:var(--ink-secondary);line-height:1.5;">${esc(n.nextThreshold.explanation)} Crossing this gate requires verifying transfer under novel constraints or expanding evidence coverage.</p>
        <div class="coverage-bar-track" style="width:100%;height:8px;">
          <div class="coverage-bar-fill" style="width:${Math.min(100, Math.round((n.targetScore / n.nextThreshold.requiredIndex) * 100))}%;background:var(--google-yellow)"></div>
        </div>
      </div>

      <div>
        <h3 style="margin-bottom:8px;font-size:14px;color:var(--ink)">Fast Climbers Accelerating Nearby:</h3>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${
            n.fastClimbersNearby.length
              ? n.fastClimbersNearby
                  .map(
                    fc => `<div style="display:flex;align-items:center;justify-content:space-between;background:#f8f9fa;padding:10px 12px;border-radius:var(--radius-sm);border:1px solid var(--line-light);">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span class="person-avatar" style="width:30px;height:30px;font-size:11px;">${fc.avatar}</span>
                      <div>
                        <strong style="font-size:12.5px;">${esc(fc.name)}</strong>
                        <div style="font-size:10.5px;color:var(--muted);">${esc(fc.role)}</div>
                      </div>
                    </div>
                    <span class="trajectory-badge rising" style="font-size:11px;">+${fc.trajectory?.yoyDelta} YoY</span>
                  </div>`
                  )
                  .join('')
              : '<div class="small-copy muted">No fast climbers within this narrow band.</div>'
          }
        </div>
      </div>
    </section>
  </div>

  <section class="section">
    <div class="section-heading">
      <div>
        <h2>Nearby Cohort Cluster (±2% Percentile Band)</h2>
        <p>Peers occupying closely matched capability coordinates in this cohort.</p>
      </div>
    </div>
    <div class="growth-grid">
      ${
        n.nearbyCluster.length
          ? n.nearbyCluster
              .map(
                p => `<article class="card growth-card">
                  <div class="growth-top">
                    <span class="person-avatar">${p.avatar}</span>
                    <span class="micro">${esc(p.workCountry.toUpperCase())}</span>
                  </div>
                  <h3>${esc(p.name)}</h3>
                  <p>${esc(p.role)} · ${esc(p.organization)}</p>
                  <div class="growth-bottom">
                    <span>Index: <b>${computeBecomingIndex(p.capabilities, state.mode).index}</b></span>
                    ${button('Compare', `compare-pair:${target.id}:${p.id}`, 'btn small outline')}
                  </div>
                </article>`
              )
              .join('')
          : '<div class="empty-inline">Single occupant in this specific slice.</div>'
      }
    </div>
  </section>`;
}

// ============================================================================
// SURFACE 3: HEAD-TO-HEAD COMPARE ENGINE (COMPARE)
// ============================================================================

function compareView() {
  const people = getAllPeople(state);
  const cmp = comparePeople(comparePersonAId, comparePersonBId, compareModeA, compareModeB, state.cohort, state);
  const pA = cmp.personA;
  const pB = cmp.personB;

  return `${pageHead(
    'HEAD-TO-HEAD COMPARISON',
    'Demonstrated Dimension Analysis',
    'Compare two individuals across verified rubric criteria under declared assistance conditions. Grounded strictly in demonstrated evidence; zero psychological motives or personality traits are inferred.'
  )}

  <div class="toolbar wrap" style="margin-bottom:20px;">
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
      <label class="field inline">
        <span>Person A:</span>
        <select id="compare-person-a" aria-label="Select Person A">
          ${people.map(p => `<option value="${p.id}" ${p.id === pA.id ? 'selected' : ''}>${esc(p.name)} (${esc(p.role)})</option>`).join('')}
        </select>
      </label>
      <label class="field inline">
        <span>Condition A:</span>
        <select id="compare-mode-a" aria-label="Select Assistance Condition A">
          <option value="independent" ${compareModeA === 'independent' ? 'selected' : ''}>Independent Human</option>
          <option value="assisted" ${compareModeA === 'assisted' ? 'selected' : ''}>With Gemini Enterprise</option>
        </select>
      </label>
    </div>

    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
      <label class="field inline">
        <span>Person B:</span>
        <select id="compare-person-b" aria-label="Select Person B">
          ${people.map(p => `<option value="${p.id}" ${p.id === pB.id ? 'selected' : ''}>${esc(p.name)} (${esc(p.role)})</option>`).join('')}
        </select>
      </label>
      <label class="field inline">
        <span>Condition B:</span>
        <select id="compare-mode-b" aria-label="Select Assistance Condition B">
          <option value="independent" ${compareModeB === 'independent' ? 'selected' : ''}>Independent Human</option>
          <option value="assisted" ${compareModeB === 'assisted' ? 'selected' : ''}>With Gemini Enterprise</option>
        </select>
      </label>
    </div>
  </div>

  ${
    cmp.compatibilityNotice
      ? `<div class="opportunity-surface-box" style="background:#fce8e6;border-color:#fad2cf;">
          <span class="opp-icon" style="color:var(--google-red)">${icon('shield')}</span>
          <div>
            <strong style="color:#b31412">Measurement Condition Divergence</strong>
            <p style="color:#800b09">${esc(cmp.compatibilityNotice)}</p>
          </div>
        </div>`
      : ''
  }

  <div class="compare-container">
    <div class="compare-header-grid">
      <div class="compare-person-card">
        <div style="display:flex;align-items:center;gap:12px;">
          <span class="person-avatar ${pA.isLocalUser ? 'local' : ''}">${pA.avatar}</span>
          <div>
            <span class="eyebrow" style="color:var(--google-blue)">PERSON A</span>
            <h2 style="font-size:18px;">${esc(pA.name)}</h2>
            <div style="font-size:12px;color:var(--muted)">${esc(pA.role)} · ${esc(pA.organization)}</div>
            <div style="font-size:11px;color:var(--ink-secondary);margin-top:2px;">Origin: ${esc(pA.originCountry)} · Work: ${esc(pA.workCountry)}</div>
          </div>
        </div>

        <div style="background:var(--surface-variant);border-radius:var(--radius-md);padding:14px;display:flex;justify-content:space-between;align-items:baseline;">
          <div>
            <div style="font-size:11px;color:var(--muted);text-transform:uppercase;">Becoming Index</div>
            <div style="font-size:24px;font-weight:700;color:var(--google-blue)">${cmp.indexA} <small style="font-size:12px;color:var(--muted)">/ 1000</small></div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:12px;"><strong>${cmp.coverageA}%</strong> coverage</div>
            <div style="font-size:11px;color:var(--muted)">±${cmp.uncertaintyA.interval} pts interval</div>
            <div style="font-size:11.5px;color:var(--google-green);margin-top:2px;">+${cmp.trajectoryA?.yoyDelta || 0} YoY</div>
          </div>
        </div>
      </div>

      <div class="compare-vs-badge">VS</div>

      <div class="compare-person-card">
        <div style="display:flex;align-items:center;gap:12px;">
          <span class="person-avatar ${pB.isLocalUser ? 'local' : ''}">${pB.avatar}</span>
          <div>
            <span class="eyebrow" style="color:var(--google-red)">PERSON B</span>
            <h2 style="font-size:18px;">${esc(pB.name)}</h2>
            <div style="font-size:12px;color:var(--muted)">${esc(pB.role)} · ${esc(pB.organization)}</div>
            <div style="font-size:11px;color:var(--ink-secondary);margin-top:2px;">Origin: ${esc(pB.originCountry)} · Work: ${esc(pB.workCountry)}</div>
          </div>
        </div>

        <div style="background:var(--surface-variant);border-radius:var(--radius-md);padding:14px;display:flex;justify-content:space-between;align-items:baseline;">
          <div>
            <div style="font-size:11px;color:var(--muted);text-transform:uppercase;">Becoming Index</div>
            <div style="font-size:24px;font-weight:700;color:var(--google-red)">${cmp.indexB} <small style="font-size:12px;color:var(--muted)">/ 1000</small></div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:12px;"><strong>${cmp.coverageB}%</strong> coverage</div>
            <div style="font-size:11px;color:var(--muted)">±${cmp.uncertaintyB.interval} pts interval</div>
            <div style="font-size:11.5px;color:var(--google-green);margin-top:2px;">+${cmp.trajectoryB?.yoyDelta || 0} YoY</div>
          </div>
        </div>
      </div>
    </div>

    <div class="compare-table-card">
      <h3 style="margin-bottom:14px;font-size:15px;">Dimension-by-Dimension Rubric Comparison</h3>
      ${cmp.dimensionDiffs
        .map(d => {
          const scoreAStr = d.scoreA !== null ? d.scoreA.toFixed(1) : 'Unmapped';
          const scoreBStr = d.scoreB !== null ? d.scoreB.toFixed(1) : 'Unmapped';
          const deltaStr = d.delta !== null ? (d.delta > 0 ? `+${d.delta}` : `${d.delta}`) : '—';
          const barAWidth = d.scoreA !== null ? (d.scoreA / 4.0) * 100 : 0;
          const barBWidth = d.scoreB !== null ? (d.scoreB / 4.0) * 100 : 0;
          
          let badge = `<span class="tag">Tied</span>`;
          if (d.lead === 'A') badge = `<span class="tag" style="background:#e8f0fe;color:#1a73e8;border-color:#aecbfa;">${esc(pA.name.split(' ')[0])} leads (+${d.delta})</span>`;
          if (d.lead === 'B') badge = `<span class="tag" style="background:#fce8e6;color:#ea4335;border-color:#fad2cf;">${esc(pB.name.split(' ')[0])} leads (+${Math.abs(d.delta)})</span>`;

          return `<div class="compare-dimension-row">
            <div>
              <strong style="font-size:13px;display:block;">${esc(d.name)}</strong>
              <small style="color:var(--muted)">${esc(d.category)}</small>
            </div>
            <div class="dimension-diff-bar-container">
              <span style="width:36px;text-align:right;font-weight:600;font-size:12px;color:var(--google-blue);">${scoreAStr}</span>
              <div class="diff-bar-track">
                <div class="diff-bar-fill-a" style="width:${barAWidth}%"></div>
                <div class="diff-bar-fill-b" style="width:${barBWidth}%"></div>
              </div>
              <span style="width:36px;font-weight:600;font-size:12px;color:var(--google-red);">${scoreBStr}</span>
            </div>
            <div style="text-align:right;">
              ${badge}
            </div>
          </div>`;
        })
        .join('')}

      <div class="grounded-gap-card">
        <h3>Objective Measurement Synthesis</h3>
        <p>${esc(cmp.gapExplanation)}</p>
      </div>
    </div>
  </div>`;
}

// ============================================================================
// SURFACE 4: EMERGENCE OBSERVATORY & PATTERN DISCOVERY
// ============================================================================

function observatoryView() {
  const people = getAllPeople(state);
  const patterns = discoverPatterns(people, state.mode);

  return `${pageHead(
    'EMERGENCE OBSERVATORY',
    'Human Capability Distributions & Patterns',
    'An observational system exposing population patterns: capabilities separating top performers, rare intersections of mastery, high-velocity climbers, and regional talent shifts.'
  )}

  <div class="observatory-grid">
    <section class="pattern-card">
      <div>
        <span class="eyebrow" style="color:var(--google-blue)">TOP-DECILE DIFFERENTIATION</span>
        <h2>Capabilities Separating the Top 10%</h2>
        <p style="font-size:12.5px;color:var(--muted);margin-top:4px;">Average rubric gap between top 10% decile and median cohort participants.</p>
      </div>

      <div class="skill-gap-list">
        ${patterns.skillGaps
          .map(
            sg => `<div class="skill-gap-row">
            <div class="skill-gap-row-head">
              <span>${esc(sg.skill.name)}</span>
              <span><strong>+${sg.gap} rubric gap</strong> (Top: ${sg.topAvg} vs Med: ${sg.botAvg})</span>
            </div>
            <div class="skill-gap-bar-track">
              <div class="skill-gap-bar-fill" style="width:${Math.min(100, Math.round((sg.gap / 1.5) * 100))}%"></div>
            </div>
          </div>`
          )
          .join('')}
      </div>
    </section>

    <section class="pattern-card">
      <div>
        <span class="eyebrow" style="color:#b06000">UNUSUAL COMBINATIONS</span>
        <h2>Rare Skill Pairings in Population</h2>
        <p style="font-size:12.5px;color:var(--muted);margin-top:4px;">Profiles demonstrating high dual mastery (e.g., Systems Architecture ≥ 3.4 AND Executive Storytelling ≥ 3.4).</p>
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;">
        ${
          patterns.rareCombinations.length
            ? patterns.rareCombinations
                .map(
                  p => `<div style="background:var(--surface-variant);padding:12px 14px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:space-between;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span class="person-avatar" style="width:32px;height:32px;font-size:11.5px;">${p.avatar}</span>
                    <div>
                      <strong>${esc(p.name)}</strong>
                      <div style="font-size:11px;color:var(--muted);">${esc(p.role)} · ${esc(p.organization)}</div>
                    </div>
                  </div>
                  <div style="text-align:right;">
                    <span class="tag" style="background:#fef7e0;color:#b06000;border-color:#fce8b2;">Systems + Story</span>
                    <div style="font-size:11px;color:var(--muted);margin-top:2px;">Index ${computeBecomingIndex(p.capabilities, state.mode).index}</div>
                  </div>
                </div>`
                )
                .join('')
            : '<div class="small-copy muted">No rare combination clusters currently detected.</div>'
        }
      </div>
    </section>

    <section class="pattern-card">
      <div>
        <span class="eyebrow" style="color:var(--google-green)">ACCELERATING TALENT</span>
        <h2>High-Velocity Learning Trajectories</h2>
        <p style="font-size:12.5px;color:var(--muted);margin-top:4px;">Individuals demonstrating ≥ +50 points YoY movement, regardless of absolute tenure or baseline rank.</p>
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;">
        ${patterns.fastClimbers
          .slice(0, 5)
          .map(
            fc => `<div style="background:#f8fafd;border:1px solid #e8eaed;padding:12px 14px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="person-avatar" style="width:32px;height:32px;font-size:11.5px;">${fc.avatar}</span>
              <div>
                <strong>${esc(fc.name)}</strong>
                <div style="font-size:11px;color:var(--muted);">${esc(fc.role)} (${esc(fc.workCountry)})</div>
              </div>
            </div>
            <div style="text-align:right;">
              <span class="trajectory-badge surging">+${fc.trajectory?.yoyDelta} YoY</span>
              <div style="font-size:10.5px;color:var(--muted);margin-top:2px;">${esc(fc.trajectory?.recentMilestone || 'Fast Climber')}</div>
            </div>
          </div>`
          )
          .join('')}
      </div>
    </section>

    <section class="pattern-card">
      <div>
        <span class="eyebrow" style="color:var(--google-blue)">FUTURE DOMAINS TAXONOMY</span>
        <h2>Supported vs. Future Life Dimensions</h2>
        <p style="font-size:12.5px;color:var(--muted);margin-top:4px;">The architecture explicitly separates supported empirical skills from future adult-life measurements. Unknown is not zero.</p>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px;">
        ${futureDomains
          .map(
            fd => `<div style="background:var(--surface-variant);padding:10px 12px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:space-between;font-size:12px;">
            <div>
              <strong>${esc(fd.name)}</strong>
              <div style="font-size:10.5px;color:var(--muted);">${esc(fd.summary)}</div>
            </div>
            <span class="synthetic-pill">Future Domain (Unmeasured)</span>
          </div>`
          )
          .join('')}
      </div>
    </section>
  </div>`;
}

// ============================================================================
// PRESERVED SURFACES: FEED, PROJECTS, PERSPECTIVES, EVIDENCE, METHODOLOGY
// ============================================================================

function feedView() {
  const goalObj = goals.find(g => g.id === state.goal) || goals[0];
  const filteredSessions = emergenceSessions.filter(s => {
    if (feedFilter === 'All') return true;
    if (feedFilter === 'High Impact') return parseFloat(s.impactScore) >= 0.4;
    return s.skill === feedFilter;
  });

  return `${pageHead(
    'REAL-TIME ENTERPRISE NETWORK',
    'Network Emergence Feed',
    'Real-time capability sessions emerged by leaders, mentors, and peers across the network. Completing a session produces inspectable demonstration evidence.',
    `<span class="live-pill"><span class="live-pulse"></span> 5 Live Sessions Active Now</span>`
  )}

  <div class="live-ticker" style="margin-bottom:20px;">
    <span class="ticker-badge">${icon('broadcast')} LIVE PULSE</span>
    <span><strong>Elena Rostova (Principal SRE)</strong> emerged a new Systems Chaos sprint · 6 peers in session</span>
    <span>·</span>
    <span><strong>Marcus Vance (Workspace AI)</strong> verified a 3-slide storytelling brief (+0.4 score advance)</span>
    <span>·</span>
    <span><strong>Siddharth Rao (DeepMind Platform)</strong> opened Vertex AI Red-Teaming crucible</span>
  </div>

  <div class="feed-grid">
    ${filteredSessions
      .map(s => {
        const sk = skillById(s.skill);
        const currentStat = estimate(state, s.skill);
        return `<article class="card feed-card">
          <div>
            <div class="feed-author">
              <span class="feed-avatar">${s.avatar}</span>
              <div class="feed-author-meta">
                <strong>${esc(s.emergedBy)}</strong>
                <small>${esc(s.role)}</small>
              </div>
              <span class="score-leverage-badge">${icon('spark')} ${s.impactScore} Score Leverage</span>
            </div>

            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              ${tag(sk.name, sk.color)}
              <span class="live-pill"><span class="live-pulse"></span> ${esc(s.urgency)}</span>
            </div>

            <h3 class="feed-title">${esc(s.title)}</h3>
            <p class="feed-summary">${esc(s.summary)}</p>

            <div class="feed-practice-box">
              <span>${icon('folder')} Workspace Demonstration Practice:</span>
              ${esc(s.practice)}
            </div>
          </div>

          <div>
            <div class="feed-meta-row">
              <span>${icon('clock')} ${s.durationMinutes} min sprint</span>
              <span>${icon('people')} ${s.liveParticipants} peers practicing</span>
              <span>Current Mark: <b>${scoreText(currentStat)}</b></span>
            </div>

            <div class="button-row">
              ${button(
                `Accept & Start Emergence Session ${icon('arrow')}`,
                `launch-session:${s.id}`,
                'btn google-blue full'
              )}
            </div>
          </div>
        </article>`;
      })
      .join('')}
  </div>`;
}

function projectCard(p) {
  const s = skillById(p.skill),
    completed = p.steps.filter(Boolean).length;
  return `<article class="card project-card">
    <div class="growth-top">
      <span class="icon-tile ${s.color}">${icon(s.icon)}</span>
      ${tag(
        p.status === 'complete' ? 'Evidence Verified' : p.status === 'review' ? 'Ready for Review' : 'In Progress',
        p.status === 'complete' ? 'mint' : ''
      )}
    </div>
    <h3>${esc(p.title)}</h3>
    <p>${s.name}${p.origin ? ' · Perspective Practice' : ''}</p>
    <div class="step-track" aria-label="${completed} of 3 practice steps completed">
      ${p.steps.map(v => `<span class="${v ? 'done' : ''}"></span>`).join('')}
    </div>
    <div class="project-meta">
      <span>${icon('clock')} ${p.minutes} min sprint</span>
      <span>${completed}/3 verification steps</span>
    </div>
    ${button(`Open Project Workspace ${icon('arrow')}`, `project:${p.id}`, 'btn outline full')}
  </article>`;
}

function projectsView() {
  const list = state.projects.filter(p =>
    filter === 'All' ? true : filter === 'Complete' ? p.status === 'complete' : p.status !== 'complete'
  );
  return `${pageHead(
    'STRATEGIC DELIBERATE PRACTICE',
    'Growth Projects & Deliberate Practice',
    'Every capability develops through inspectable action: an explicit hypothesis, a testable artifact produced in Google Workspace, and verified demonstration evidence.'
  )}
  <div class="toolbar">
    <div class="segmented" role="group" aria-label="Filter enterprise projects">
      ${['All', 'In progress', 'Complete']
        .map(f =>
          button(f, `filter:${f}`, filter === f ? 'selected' : '', `aria-pressed="${filter === f}"`)
        )
        .join('')}
    </div>
    ${button(`${icon('plus')} New Growth Project`, 'new', 'btn google-blue')}
  </div>
  <div class="projects-grid">
    ${
      list.length
        ? list.map(projectCard).join('')
        : `<div class="empty-state">
      ${icon('leaf')}
      <h2>${filter === 'Complete' ? 'No completed projects yet.' : 'Ready for your next deliberate practice sprint.'}</h2>
      <p>Complete structured practice steps and review evidence to record achievements.</p>
      ${button('Create Project', 'new', 'btn google-blue')}
    </div>`
    }
  </div>`;
}

function perspectivesView() {
  return `${pageHead(
    'ENTERPRISE METHODOLOGY',
    'Working Perspectives & Practice Frameworks',
    'Adopt tested engineering and communication frameworks from Google Cloud, SRE, and Workspace leaders. Adopting a methodology initiates practice without artificially inflating scores.'
  )}
  <div class="perspectives-grid">
    ${perspectives
      .map(
        p => `<article class="card perspective-card">
      <div class="perspective-art ${p.color}" aria-hidden="true">
        ${icon(p.id === 'builder' ? 'orbit' : p.id === 'storyteller' ? 'voice' : 'people')}
      </div>
      <div class="perspective-body">
        <div class="creator">
          <span>${icon('spark')}</span>
          ${p.author}
        </div>
        <h2>${p.title}</h2>
        <p>${p.subtitle}</p>
        <div class="tags">${p.tags.map(t => tag(t)).join('')}</div>
        ${button(
          `${state.adopted.some(a => a.id === p.id) ? 'Review Adopted Practices' : 'Explore Perspective'} ${icon(
            'arrow'
          )}`,
          `perspective:${p.id}`,
          'btn outline full'
        )}
      </div>
    </article>`
      )
      .join('')}
  </div>`;
}

function evidenceView() {
  const pending = state.evidence.filter(e => e.status === 'pending'),
    accepted = state.evidence.filter(e => e.status === 'accepted'),
    rejected = state.evidence.filter(e => e.status === 'rejected');

  return `${pageHead(
    'EVIDENCE & GOVERNANCE',
    'Demonstration Verification & Audit Trail',
    'Capabilities update exclusively when demonstrable evidence is verified and accepted—never via speculative AI inferences or passive workplace monitoring.'
  )}
  <div class="section-heading">
    <h2>Pending Verification <span class="pill-count">${pending.length}</span></h2>
  </div>
  <div class="review-grid">
    ${
      pending.length
        ? pending
            .map(
              e => `<article class="card review-card">
        <div class="growth-top">
          ${tag('Proposed Demonstration', 'sand')}
          <span class="micro">${esc(e.date)}</span>
        </div>
        <h3>${esc(e.title)}</h3>
        <p>${skillById(e.skill).name} · ${e.mode === 'independent' ? 'Independent' : 'Gemini Assisted'} · ${
                e.mark
              }/4 proposed mark</p>
        <div class="criterion">
          <strong>Verification Requirement</strong>
          <p>Verify that work product demonstrates declared criteria and appropriately discloses any generative AI contributions before recording to your capability record.</p>
        </div>
        <p class="small-copy">Rubric: ${RUBRIC} · Source: ${sources.find(s => s.id === e.source)?.name || 'Demo'}${
                state.sources[e.source] ? '' : ' · [Source Disconnected]'
              }</p>
        <div class="button-row">
          ${button(
            `${icon('check')} Accept Demonstration`,
            `accept:${e.id}`,
            'btn google-blue',
            state.sources[e.source] ? '' : 'disabled'
          )}
          ${button('Reject / Revise', `reject:${e.id}`, 'btn outline')}
          ${button('Inspect Rubric', `skill:${e.skill}`, 'text-button')}
        </div>
      </article>`
            )
            .join('')
        : `<div class="empty-inline">${icon('check')} All pending demonstrations verified. Practice in a growth project to create new evidence.</div>`
    }
  </div>

  <div class="section-heading section">
    <div>
      <h2>Enterprise Verification Ledger</h2>
      <p>${accepted.length} verified · ${rejected.length} rejected · Source revocation automatically excludes affected records.</p>
    </div>
  </div>
  <div class="card evidence-table">
    <table>
      <caption class="sr-only">Demonstration evidence ledger</caption>
      <thead>
        <tr>
          <th>Demonstration Record</th>
          <th>Capability</th>
          <th>Assistance Mode</th>
          <th>Rubric Mark</th>
          <th>Verification Status</th>
        </tr>
      </thead>
      <tbody>
        ${[...rejected, ...accepted]
          .map(
            e => `<tr>
          <td>
            <strong>${esc(e.title)}</strong>
            <small>${esc(e.date)} · ${sources.find(s => s.id === e.source)?.name || 'Direct'}</small>
          </td>
          <td>${skillById(e.skill).name}</td>
          <td>${e.mode === 'independent' ? 'Independent' : 'Gemini Assisted'}</td>
          <td>${e.mark} / 4.0</td>
          <td>${tag(
            !state.sources[e.source] ? 'Source Excluded' : e.status === 'rejected' ? 'Rejected' : 'Verified',
            !state.sources[e.source] ? 'sand' : e.status === 'accepted' ? 'mint' : ''
          )}</td>
        </tr>`
          )
          .join('')}
      </tbody>
    </table>
  </div>`;
}

function methodologyView() {
  const activeUser = getActiveUserPerson(state);
  const decomp = computeBecomingIndex(activeUser.capabilities, state.mode);

  return `${pageHead(
    'METHODOLOGY & DATA SOVEREIGNTY',
    'Versioned Rubrics, Decomposition & Provenance',
    'Emergence’s credibility comes from being able to defend every number. Review rubric versioning, score decomposition formulas, appeal protocols, and granular data source permissions.'
  )}

  <div class="consent-grid">
    <section class="card settings-card">
      <div class="card-head">
        <div>
          <h2>Connected Enterprise Sources</h2>
          <p>Control data access grants with immediate exclusion propagation.</p>
        </div>
        ${icon('shield')}
      </div>
      ${sources
        .map(
          s => `<div class="setting-row">
        <span class="icon-tile neutral">${icon(s.icon)}</span>
        <div>
          <h3>${s.name}</h3>
          <p>${s.detail}</p>
          <small>${
            state.sources[s.id]
              ? 'Active grant · Voluntary learning only'
              : 'Disconnected · Dependent evidence immediately excluded'
          }</small>
        </div>
        <button role="switch" aria-checked="${state.sources[s.id]}" aria-label="${s.name}" data-action="source:${
            s.id
          }" class="switch ${state.sources[s.id] ? 'on' : ''}">
          <span></span>
        </button>
      </div>`
        )
        .join('')}
    </section>

    <section class="card settings-card">
      <div class="card-head">
        <div>
          <h2>Becoming Index Score Decomposition</h2>
          <p>Formula: Becoming Index = mean rubric score × 250 (0–1000 scale).</p>
        </div>
        ${icon('chart')}
      </div>

      <div class="decomposition-tree">
        <div style="display:flex;justify-content:space-between;font-weight:600;padding-bottom:6px;border-bottom:1px solid var(--line);">
          <span>Dimension (${state.mode})</span>
          <span>Rubric Mark → Index Points</span>
        </div>
        ${decomp.dimensions
          .map(
            d => `<div class="decomp-dimension-row">
            <span>${esc(d.name)}</span>
            <span><strong>${d.mark.toFixed(1)} / 4.0</strong> → ${d.indexContribution} pts</span>
          </div>`
          )
          .join('')}
        <div style="display:flex;justify-content:space-between;font-weight:700;padding-top:8px;border-top:1px solid var(--line);font-size:14px;">
          <span>Becoming Index Composite</span>
          <span style="color:var(--google-blue);">${decomp.index} / 1000</span>
        </div>
      </div>

      <div style="margin-top:16px;" class="button-row">
        ${button(`${icon('download')} Export Capability Claims (JSON)`, 'export', 'btn outline full')}
        ${button('Reset Demo State', 'reset', 'btn outline full')}
      </div>
    </section>
  </div>`;
}

function proposalView() {
  const docs = window.EMERGENCE_DOCS || {};
  return `${pageHead(
    'TECHNICAL ARCHITECTURE & SPECIFICATION',
    'Executive Proposal & Responsible AI Verification',
    'Comprehensive technical architecture, psychometric validity evaluations, and legal grants set forth for Google LLC and Alphabet Inc.'
  )}
  <div class="proposal-container card" style="padding:28px 32px;line-height:1.7;">
    <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;">
      <a href="./docs/PROPOSAL.md" class="btn small outline">${icon('book')} Read Executive Proposal</a>
      <a href="./docs/ARCHITECTURE.md" class="btn small outline">${icon('layers')} Technical Architecture</a>
      <a href="./docs/EVALUATION.md" class="btn small outline">${icon('shield')} Responsible AI Evaluation</a>
      <a href="./docs/ACCEPTANCE.md" class="btn small outline">${icon('check')} Verification Record</a>
    </div>
    <div class="docs-markdown-body">
      ${docs['PROPOSAL.md'] ? `<pre style="white-space:pre-wrap;font-family:inherit;font-size:13.5px;color:var(--ink-secondary);">${esc(docs['PROPOSAL.md'].slice(0, 3000))}...\n\n(Download or inspect full documentation in docs/)</pre>` : '<p>Documentation embedded in offline build.</p>'}
    </div>
  </div>`;
}

// ============================================================================
// MODAL DIALOGS (PERSON PROFILE, COMPARE, SPRINT, ADOPT, TOUR)
// ============================================================================

function personDialog(personId) {
  const people = getAllPeople(state);
  const p = people.find(x => x.id === personId) || people[0];
  const b = computeBecomingIndex(p.capabilities, state.mode);
  const cov = computeEvidenceCoverage(p.capabilities, state.mode);
  const uncert = computeUncertainty(p.evidenceCount, cov);
  const opp = getOpportunitySurface(b.index, p.cohortPercentiles?.[state.cohort]?.[state.mode] || 50, cohorts.find(c => c.id === state.cohort)?.label || 'Cohort', p.primaryGap);

  return `<div class="dialog-head">
    <div style="display:flex;align-items:center;gap:12px;">
      <span class="person-avatar ${p.isLocalUser ? 'local' : ''}" style="width:48px;height:48px;font-size:16px;">${p.avatar}</span>
      <div>
        <div style="display:flex;align-items:center;gap:6px;">
          <h2 id="dialog-title">${esc(p.name)}</h2>
          <span class="synthetic-pill">${p.verificationTier === 'synthetic_benchmark_fixture' ? 'Synthetic Benchmark' : 'Verified Public'}</span>
        </div>
        <p style="font-size:12.5px;color:var(--muted);">${esc(p.role)} · ${esc(p.organization)}</p>
        <div style="font-size:11.5px;color:var(--ink-secondary);margin-top:2px;">Origin: <b>${esc(p.originCountry)}</b> · Work Location: <b>${esc(p.workCountry)}</b> · Specialty: <b>${esc(p.specialty)}</b></div>
      </div>
    </div>
    <button class="icon-button" data-action="close-dialog" aria-label="Close dialog">${icon('close')}</button>
  </div>

  <div class="dialog-body">
    <div style="background:var(--surface-variant);border-radius:var(--radius-md);padding:18px;display:flex;justify-content:space-between;align-items:baseline;margin-bottom:18px;">
      <div>
        <div class="eyebrow" style="color:var(--google-blue)">BECOMING INDEX COMPOSITE</div>
        <div style="font-size:32px;font-weight:700;color:var(--ink);letter-spacing:-0.02em;">
          ${b.index} <small style="font-size:14px;color:var(--muted);font-weight:400">/ 1000</small>
        </div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px;">
          P${p.cohortPercentiles?.[state.cohort]?.[state.mode] || 50} in ${cohorts.find(c => c.id === state.cohort)?.label || 'Active Cohort'} · ${cov}% evidence coverage · ±${uncert.interval} pts
        </div>
      </div>
      <div style="text-align:right;">
        <span class="trajectory-badge rising" style="font-size:13px;">+${p.trajectory?.yoyDelta || 0} YoY</span>
        <div style="font-size:11px;color:var(--muted);margin-top:4px;">Velocity Rank #${p.trajectory?.velocityRank || 1}</div>
      </div>
    </div>

    <div class="opportunity-surface-box" style="margin-bottom:18px;">
      <span class="opp-icon">${icon('info')}</span>
      <div>
        <strong>Opportunity Surface Guidance</strong>
        <p>${esc(opp.message)}</p>
      </div>
    </div>

    <h3 style="font-size:14px;margin-bottom:8px;">Decomposable Dimension Breakdown (${state.mode === 'independent' ? 'Independent Human' : 'With Gemini Enterprise'}):</h3>
    <div class="decomposition-tree" style="margin-bottom:18px;">
      ${skills
        .map(s => {
          const val = p.capabilities?.[state.mode]?.[s.id];
          const valStr = val !== null && val !== undefined ? `${val.toFixed(1)} / 4.0` : 'Unmapped (Unknown is not zero)';
          const pts = val !== null && val !== undefined ? Math.round(val * 250) : '—';
          return `<div class="decomp-dimension-row">
            <div>
              <strong>${esc(s.name)}</strong>
              <small style="display:block;color:var(--muted)">${esc(s.category)}</small>
            </div>
            <div style="text-align:right;">
              <b>${valStr}</b>
              <small style="display:block;color:var(--google-blue)">${pts} pts</small>
            </div>
          </div>`;
        })
        .join('')}
    </div>

    <div style="background:#f8fafd;border:1px solid #e8eaed;border-radius:var(--radius-md);padding:14px 16px;margin-bottom:18px;">
      <h4 style="font-size:12.5px;color:var(--ink);margin-bottom:6px;">Demonstrated Working Practices:</h4>
      <ul style="margin:0;padding-left:18px;font-size:12px;color:var(--ink-secondary);line-height:1.6;">
        ${(p.observedPractices || ['Demonstrates verified rubric artifacts in Google Docs']).map(pr => `<li>${esc(pr)}</li>`).join('')}
      </ul>
    </div>

    <div class="button-row">
      ${button(`Compare with Me ${icon('layers')}`, `compare-with-me:${p.id}`, 'btn google-blue')}
      ${button(`View in Neighborhood ${icon('people')}`, `view-neighborhood:${p.id}`, 'btn outline')}
      ${button('Close', 'close-dialog', 'btn outline')}
    </div>
  </div>`;
}

function projectDialog(projectId) {
  const p = state.projects.find(x => x.id === projectId);
  if (!p) return '';
  const s = skillById(p.skill);

  return `<div class="dialog-head">
    <div>
      <div class="eyebrow">${s.name} SPRINT</div>
      <h2 id="dialog-title">${esc(p.title)}</h2>
    </div>
    <button class="icon-button" data-action="close-dialog" aria-label="Close dialog">${icon('close')}</button>
  </div>
  <div class="dialog-body">
    <p style="font-size:13px;color:var(--muted);margin-bottom:16px;">${esc(s.summary)}</p>
    <div class="criterion" style="margin-bottom:16px;">
      <strong>Success Criterion</strong>
      <p>${esc(s.criterion)}</p>
    </div>

    <h3 style="font-size:14px;margin-bottom:8px;">Structured Practice Steps:</h3>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">
      ${['Frame challenge boundaries in Google Docs', 'Produce testable demonstration artifact', 'Articulate trade-offs and human verification']
        .map(
          (text, idx) => `<label style="display:flex;align-items:center;gap:10px;font-size:13px;">
          <input type="checkbox" data-step="${idx}" ${p.steps[idx] ? 'checked' : ''} data-project-id="${p.id}">
          <span>${text}</span>
        </label>`
        )
        .join('')}
    </div>

    <label style="display:flex;flex-direction:column;gap:6px;font-size:13px;margin-bottom:18px;">
      <span>Professional Reflection & Gemini Transparency:</span>
      <textarea id="reflection" rows="3" style="width:100%;padding:10px;border:1px solid var(--line);border-radius:var(--radius-sm);font-size:13px;">${esc(p.reflection)}</textarea>
    </label>

    <div class="button-row">
      ${button(`${icon('download')} Download Brief`, `brief:${p.id}`, 'btn outline')}
      ${button('Simulate Demonstration Review', `replay:${p.id}`, 'btn google-blue', p.steps.every(Boolean) ? '' : 'disabled')}
      ${button('Done', 'close-dialog', 'btn outline')}
    </div>
  </div>`;
}

function newProjectDialog() {
  return `<div class="dialog-head">
    <div>
      <div class="eyebrow">NEW GROWTH EXPERIMENT</div>
      <h2 id="dialog-title">Initiate Deliberate Practice Sprint</h2>
    </div>
    <button class="icon-button" data-action="close-dialog" aria-label="Close dialog">${icon('close')}</button>
  </div>
  <form id="project-form" class="dialog-body" style="display:flex;flex-direction:column;gap:14px;">
    <label style="display:flex;flex-direction:column;gap:4px;font-size:13px;">
      <span>Enterprise Skill:</span>
      <select id="project-skill">
        ${skills.map(s => `<option value="${s.id}">${s.name} (${s.category})</option>`).join('')}
      </select>
    </label>
    <label style="display:flex;flex-direction:column;gap:4px;font-size:13px;">
      <span>Sprint Title (1–120 characters):</span>
      <input type="text" id="project-title" required placeholder="e.g. Map failover dependencies for multi-tenant mesh" maxlength="120">
    </label>
    <label style="display:flex;flex-direction:column;gap:4px;font-size:13px;">
      <span>Sprint Duration:</span>
      <select id="project-minutes">
        <option value="15">15 Minutes</option>
        <option value="30" selected>30 Minutes</option>
        <option value="60">60 Minutes</option>
      </select>
    </label>
    <div class="button-row" style="margin-top:10px;">
      <button type="submit" class="btn google-blue">Create Growth Project</button>
      ${button('Cancel', 'close-dialog', 'btn outline')}
    </div>
  </form>`;
}

function tourDialog() {
  return `<div class="dialog-head">
    <div>
      <div class="eyebrow">ABOUT GOOGLE EMERGENCE</div>
      <h2 id="dialog-title">The World View of Human Capability</h2>
    </div>
    <button class="icon-button" data-action="close-dialog" aria-label="Close dialog">${icon('close')}</button>
  </div>
  <div class="dialog-body" style="line-height:1.6;font-size:13px;">
    <p><strong>Google Emergence</strong> is the world-facing comparative system of human capability. It answers where real people stand relative to one another, who is improving unusually quickly, and what demonstrable skills account for the differences.</p>
    <h4 style="margin:14px 0 6px;">Core Principles:</h4>
    <ul style="padding-left:18px;">
      <li><strong>Comparison is the core product:</strong> Never soften a valid comparison; never manufacture an invalid one. Low results are constructive opportunity surfaces paired with attainable next steps.</li>
      <li><strong>Decomposable Becoming Index (0-1000):</strong> Never signifies human worth. It is a mathematical composite of verified rubric criteria, paired with evidence coverage and uncertainty.</li>
      <li><strong>Human Neighborhoods:</strong> The most helpful comparator is rarely #1 in the world; it is someone slightly ahead whose shared practices expose the next level.</li>
      <li><strong>Dual-Mode Assistance Isolation:</strong> Independent human performance and Gemini Enterprise execution remain strictly distinguishable.</li>
    </ul>
    <div class="button-row" style="margin-top:18px;">
      ${button('Explore World Landscape', 'navigate:landscape', 'btn google-blue')}
      ${button('Close', 'close-dialog', 'btn outline')}
    </div>
  </div>`;
}

// ============================================================================
// APP RENDERING & EVENT DISPATCHER
// ============================================================================

function render() {
  const current = route();
  const root = $('#app');
  let content = '';

  if (current === 'landscape') content = landscapeView();
  else if (current === 'neighborhood') content = neighborhoodView();
  else if (current === 'compare') content = compareView();
  else if (current === 'observatory') content = observatoryView();
  else if (current === 'feed') content = feedView();
  else if (current === 'projects') content = projectsView();
  else if (current === 'perspectives') content = perspectivesView();
  else if (current === 'evidence') content = evidenceView();
  else if (current === 'methodology') content = methodologyView();
  else if (current === 'proposal') content = proposalView();
  else content = landscapeView();

  root.innerHTML = shell(content);
}

// Event delegation
document.addEventListener('click', e => {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  const action = target.getAttribute('data-action');
  const dialog = $('#dialog');

  if (action.startsWith('navigate:')) {
    const page = action.split(':')[1];
    navigate(page);
  } else if (action.startsWith('mode:')) {
    state.mode = action.split(':')[1];
    save();
    render();
  } else if (action.startsWith('sort:')) {
    leaderboardSort = action.split(':')[1];
    render();
  } else if (action.startsWith('inspect:')) {
    const id = action.split(':')[1];
    dialog.innerHTML = personDialog(id);
    dialog.showModal();
  } else if (action.startsWith('neighborhood:')) {
    neighborhoodFocusId = action.split(':')[1];
    navigate('neighborhood');
  } else if (action.startsWith('view-neighborhood:')) {
    dialog.close();
    neighborhoodFocusId = action.split(':')[1];
    navigate('neighborhood');
  } else if (action.startsWith('compare-with:')) {
    comparePersonAId = 'person-you';
    comparePersonBId = action.split(':')[1];
    navigate('compare');
  } else if (action.startsWith('compare-with-me:')) {
    dialog.close();
    comparePersonAId = 'person-you';
    comparePersonBId = action.split(':')[1];
    navigate('compare');
  } else if (action.startsWith('compare-pair:')) {
    const parts = action.split(':');
    comparePersonAId = parts[1];
    comparePersonBId = parts[2];
    navigate('compare');
  } else if (action === 'new') {
    dialog.innerHTML = newProjectDialog();
    dialog.showModal();
  } else if (action.startsWith('new:')) {
    dialog.innerHTML = newProjectDialog();
    dialog.showModal();
    const sel = $('#project-skill', dialog);
    if (sel) sel.value = action.split(':')[1];
  } else if (action.startsWith('project:')) {
    const id = action.split(':')[1];
    dialog.innerHTML = projectDialog(id);
    dialog.showModal();
  } else if (action.startsWith('perspective:')) {
    const id = action.split(':')[1];
    const p = perspectives.find(x => x.id === id);
    if (p) {
      adopt(state, p.id, [0, 1]);
      save();
      toast(`Adopted practices from ${p.title}. Practice project created.`);
      navigate('projects');
    }
  } else if (action.startsWith('launch-session:')) {
    const id = action.split(':')[1];
    launchSession(state, id);
    save();
    toast('Launched live Emergence session. Structured sprint added to Growth Projects.');
    navigate('projects');
  } else if (action.startsWith('replay:')) {
    const id = action.split(':')[1];
    replayAssessment(state, id, state.mode);
    save();
    dialog.close();
    toast('Assessment demonstration replayed and submitted to Evidence Ledger.');
    navigate('evidence');
  } else if (action.startsWith('accept:')) {
    const id = action.split(':')[1];
    reviewEvidence(state, id, 'accepted');
    save();
    toast('Demonstration verified and accepted! Capability marks and Becoming Index recalculated.');
    render();
  } else if (action.startsWith('reject:')) {
    const id = action.split(':')[1];
    reviewEvidence(state, id, 'rejected');
    save();
    toast('Demonstration rejected and returned to practice.');
    render();
  } else if (action.startsWith('source:')) {
    const id = action.split(':')[1];
    setSource(state, id, !state.sources[id]);
    save();
    toast(`Source grant ${state.sources[id] ? 'reconnected' : 'revoked'}. Evidence recalculation propagated.`);
    render();
  } else if (action.startsWith('filter:')) {
    filter = action.split(':')[1];
    render();
  } else if (action.startsWith('feed-filter:')) {
    feedFilter = action.split(':')[1];
    render();
  } else if (action.startsWith('skill:')) {
    selectedSkill = action.split(':')[1];
    const s = skillById(selectedSkill);
    if (dialog && s) {
      dialog.innerHTML = `<div class="dialog-head">
        <h2>${esc(s.name)}</h2>
        <button class="icon-button" data-action="close-dialog" aria-label="Close dialog">${icon('close')}</button>
      </div>
      <div class="dialog-body">
        <p><strong>Category:</strong> ${esc(s.category)}</p>
        <div class="criterion" style="margin:12px 0;"><strong>Success Criterion:</strong><p>${esc(s.criterion)}</p></div>
        <p><strong>Practice:</strong> ${esc(s.practice)}</p>
        <div class="button-row" style="margin-top:16px;">
          ${button('Start Practice Sprint', `new:${s.id}`, 'btn google-blue')}
          ${button('Close', 'close-dialog', 'btn outline')}
        </div>
      </div>`;
      dialog.showModal();
    }
  } else if (action.startsWith('brief:')) {
    const id = action.split(':')[1];
    const p = state.projects.find(x => x.id === id);
    if (p) {
      const brief = projectBrief(p);
      const blob = new Blob([brief], { type: 'text/markdown' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `project-${p.id}.md`;
      a.click();
      toast('Downloaded Google Workspace deliberate practice brief.');
    }
  } else if (action === 'export') {
    const packet = disclosure(state);
    const blob = new Blob([JSON.stringify(packet, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `capability-claims-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    toast('Selective capability passport downloaded with zero private telemetry.');
  } else if (action === 'reset') {
    if (confirm('Reset Google Emergence demonstration state to initial baseline?')) {
      state = initialState();
      save();
      toast('Demo state reset to initial baseline.');
      render();
    }
  } else if (action === 'tour') {
    dialog.innerHTML = tourDialog();
    dialog.showModal();
  } else if (action === 'close-dialog') {
    dialog.close();
  }
});

// Input event delegation
document.addEventListener('input', e => {
  if (e.target.id === 'population-search') {
    searchQuery = e.target.value;
    const tableWrapper = $('.population-table-wrapper');
    if (tableWrapper) {
      const leaderboard = getLeaderboard(state.mode, state.cohort, leaderboardSort, searchQuery, state);
      const tbody = $('.population-table tbody');
      if (tbody) {
        tbody.innerHTML = leaderboard.length
          ? leaderboard.map(item => {
              const p = item.person;
              const isLocal = p.isLocalUser;
              const rankClass = item.rank <= 3 ? 'rank-badge-top' : '';
              const trajClass = p.trajectory?.direction === 'surging' ? 'surging' : p.trajectory?.direction === 'rising' ? 'rising' : 'steady';
              const primaryPct = p.cohortPercentiles?.[state.cohort]?.[state.mode] || item.percentile;
              return `<tr class="${isLocal ? 'is-local-user' : ''}">
                <td class="rank-col"><span class="${rankClass}">#${item.rank}</span></td>
                <td>
                  <div class="person-cell">
                    <span class="person-avatar ${isLocal ? 'local' : ''}">${p.avatar}</span>
                    <div class="person-info">
                      <div class="person-name-row">
                        <span class="person-name" data-action="inspect:${p.id}">${esc(p.name)}</span>
                        <span class="synthetic-pill">${p.verificationTier === 'synthetic_benchmark_fixture' ? 'Synthetic Demo' : 'Verified Public'}</span>
                      </div>
                      <span class="person-role">${esc(p.role)} · ${esc(p.organization)}</span>
                      <div class="person-loc-chips">
                        <span class="loc-chip">🌐 Origin: ${esc(p.originCountry)}</span>
                        <span class="loc-chip">📍 Work: ${esc(p.workCountry)}</span>
                        <span>· ${esc(p.specialty)}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="index-cell">
                  <div class="index-value" data-action="inspect:${p.id}" style="cursor:pointer;">${item.index} <small>/ 1000</small></div>
                  <div class="index-sub">
                    <span class="coverage-bar-track"><span class="coverage-bar-fill" style="width:${item.coverage}%"></span></span>
                    <span>${item.coverage}% cov · ±${item.uncertainty} pts</span>
                  </div>
                </td>
                <td>
                  <div style="display:flex;flex-direction:column;gap:2px;font-size:11.5px;">
                    <span><strong>P${primaryPct}</strong></span>
                    <span style="color:var(--muted)">Global P${p.cohortPercentiles?.global?.[state.mode] || item.percentile}</span>
                  </div>
                </td>
                <td>
                  <span class="trajectory-badge ${trajClass}">+${p.trajectory?.yoyDelta || item.yoyDelta} YoY</span>
                </td>
                <td style="text-align:right">
                  <div class="action-buttons-cell" style="justify-content:flex-end">
                    ${button('Inspect', `inspect:${p.id}`, 'btn small outline')}
                    ${button('Compare', `compare-with:${p.id}`, 'btn small google-blue')}
                  </div>
                </td>
              </tr>`;
            }).join('')
          : `<tr><td colspan="6" style="text-align:center;padding:48px 20px;color:var(--muted);">No matching individuals found.</td></tr>`;
      }
    }
  } else if (e.target.dataset.step !== undefined) {
    const idx = Number(e.target.dataset.step);
    const pId = e.target.dataset.projectId;
    const p = state.projects.find(x => x.id === pId);
    if (p) {
      p.steps[idx] = e.target.checked;
      save();
      const replayBtn = $('[data-action^="replay:"]', $('#dialog'));
      if (replayBtn) replayBtn.disabled = !p.steps.every(Boolean);
    }
  } else if (e.target.id === 'reflection') {
    const p = state.projects[0];
    if (p) {
      p.reflection = e.target.value;
      save();
    }
  }
});

// Change event delegation
document.addEventListener('change', e => {
  if (e.target.id === 'cohort') {
    state.cohort = e.target.value;
    save();
    render();
  } else if (e.target.id === 'neighborhood-focus-select') {
    neighborhoodFocusId = e.target.value;
    render();
  } else if (e.target.id === 'compare-person-a') {
    comparePersonAId = e.target.value;
    render();
  } else if (e.target.id === 'compare-person-b') {
    comparePersonBId = e.target.value;
    render();
  } else if (e.target.id === 'compare-mode-a') {
    compareModeA = e.target.value;
    render();
  } else if (e.target.id === 'compare-mode-b') {
    compareModeB = e.target.value;
    render();
  }
});

// Form submit delegation
document.addEventListener('submit', e => {
  if (e.target.id === 'project-form') {
    e.preventDefault();
    const skill = $('#project-skill', e.target).value;
    const title = $('#project-title', e.target).value;
    const minutes = Number($('#project-minutes', e.target).value);
    createProject(state, { skill, title, minutes });
    save();
    $('#dialog').close();
    toast(`Created growth project "${title}".`);
    navigate('projects');
  }
});

// Escape key dialog close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const dialog = $('#dialog');
    if (dialog && dialog.open) dialog.close();
  }
});

window.addEventListener('hashchange', render);

// Initial render
render();
