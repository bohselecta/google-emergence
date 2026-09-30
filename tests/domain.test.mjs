import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  initialState,
  isState,
  estimate,
  comparison,
  cohortValues,
  percentile,
  opportunities,
  createProject,
  adopt,
  replayAssessment,
  reviewEvidence,
  setSource,
  disclosure,
  projectBrief,
  policyGate,
  skills,
  MIN_COHORT,
  emergenceSessions,
  sessionById,
  launchSession,
  // World Comparative System:
  VERSION,
  RUBRIC,
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
  futureDomains,
  isDimensionSupported,
  cohortDisclaimer
} from '../src/domain.js';

test('initial fixture passes its state validator', () => {
  assert.ok(isState(initialState()));
});

test('independent and assisted observations remain separate', () => {
  const s = initialState();
  assert.equal(estimate(s, 'research', 'independent').n, 3);
  assert.equal(estimate(s, 'research', 'assisted').n, 3);
  assert.ok(estimate(s, 'research', 'assisted').score > estimate(s, 'research', 'independent').score);
});

test('pending evidence does not change a capability', () => {
  const s = initialState();
  assert.equal(estimate(s, 'story').n, 3);
});

test('accepted evidence recomputes the mean and sample count', () => {
  const s = initialState();
  reviewEvidence(s, 'candidate-story', 'accepted');
  assert.equal(estimate(s, 'story').n, 4);
  assert.equal(estimate(s, 'story').score, 2.75);
});

test('rejected evidence has no effect on the estimate', () => {
  const s = initialState(), before = estimate(s, 'story');
  reviewEvidence(s, 'candidate-story', 'rejected');
  assert.equal(estimate(s, 'story').score, before.score);
});

test('a record cannot be reviewed twice', () => {
  const s = initialState();
  reviewEvidence(s, 'candidate-story', 'accepted');
  assert.throws(() => reviewEvidence(s, 'candidate-story', 'accepted'));
});

test('revocation excludes every dependent skill in both modes', () => {
  const s = initialState();
  setSource(s, 'projects', false);
  for (const mode of ['independent', 'assisted']) {
    for (const skill of ['systems', 'research']) {
      assert.equal(estimate(s, skill, mode).score, null);
    }
  }
  assert.equal(estimate(s, 'story').n, 3);
});

test('a disconnected source cannot contribute a new accepted record', () => {
  const s = initialState();
  setSource(s, 'practice', false);
  assert.throws(() => reviewEvidence(s, 'candidate-story', 'accepted'));
});

test('reconnection restores source eligibility, not new evidence', () => {
  const s = initialState(), before = estimate(s, 'research').score;
  setSource(s, 'projects', false);
  setSource(s, 'projects', true);
  assert.equal(estimate(s, 'research').score, before);
});

test('unknown is not zero; sparse estimates are withheld', () => {
  const s = initialState();
  s.evidence = s.evidence.filter(e => !(e.skill === 'research' && e.id.endsWith('-2')));
  assert.equal(estimate(s, 'research').n, 2);
  assert.equal(estimate(s, 'research').score, null);
  assert.equal(comparison(s, 'research').available, false);
});

test('public fixture comparison uses the selected assistance mode', () => {
  const s = initialState();
  s.mode = 'assisted';
  const c = comparison(s, 'research');
  assert.deepEqual(c.values, cohortValues('research', 'assisted', 'global'));
  assert.notDeepEqual(c.values, cohortValues('research', 'independent', 'global'));
});

test('small cohorts are suppressed', () => {
  const s = initialState();
  s.cohort = 'circle';
  assert.ok(cohortValues('systems', 'independent', 'circle').length < MIN_COHORT);
  assert.equal(comparison(s, 'systems').available, false);
});

test('pausing comparisons keeps practice available', () => {
  const s = initialState();
  s.benchmarkVisible = false;
  assert.equal(comparison(s, 'systems').available, false);
  assert.ok(createProject(s, { skill: 'systems', title: 'Continue learning' }));
});

test('midrank percentile handles ties and endpoints', () => {
  assert.equal(percentile(2, [1, 2, 2, 3]), 50);
  assert.equal(percentile(0, [1, 2]), 0);
  assert.equal(percentile(3, [1, 2]), 100);
});

test('invalid percentile input is not silently ranked', () => {
  assert.equal(percentile(null, [1, 2]), null);
  assert.equal(percentile(2, []), null);
  assert.equal(percentile(2, [NaN]), null);
});

test('cohort generator is deterministic and bounded', () => {
  for (const skill of skills) {
    const a = cohortValues(skill.id, 'independent', 'global');
    assert.equal(a.length, 120);
    assert.deepEqual(a, cohortValues(skill.id, 'independent', 'global'));
    assert.ok(a.every(v => v >= 0 && v <= 4));
  }
});

test('new projects never grant proficiency', () => {
  const s = initialState(), before = estimate(s, 'research').score;
  const p = createProject(s, { skill: 'research', title: 'A test project', minutes: 15 });
  assert.equal(p.status, 'active');
  assert.equal(estimate(s, 'research').score, before);
});

test('project creation rejects empty, oversized, and invalid input', () => {
  const s = initialState();
  for (const input of [
    { skill: 'bad', title: 'x' },
    { skill: 'story', title: ' ' },
    { skill: 'story', title: 'a'.repeat(121) },
    { skill: 'story', title: 'x', minutes: 5 }
  ]) {
    assert.throws(() => createProject(s, input));
  }
});

test('perspective adoption preserves the chosen practices and origin', () => {
  const s = initialState();
  const p = adopt(s, 'builder', [0, 2]);
  assert.deepEqual(p.origin, { bundle: 'builder', version: '1.0', practices: [0, 2] });
  assert.deepEqual(s.adopted[0].practices, [0, 2]);
});

test('perspective adoption never transfers proficiency', () => {
  const s = initialState(), before = estimate(s, 'systems').score;
  adopt(s, 'builder', [1]);
  assert.equal(estimate(s, 'systems').score, before);
});

test('empty, invalid and duplicate adoptions are rejected', () => {
  const s = initialState();
  assert.throws(() => adopt(s, 'builder', []));
  assert.throws(() => adopt(s, 'builder', [8]));
  adopt(s, 'builder', [0]);
  assert.throws(() => adopt(s, 'builder', [1]));
});

test('assessment replay requires completed practice', () => {
  const s = initialState();
  assert.throws(() => replayAssessment(s, s.projects[0].id, 'independent'));
});

test('complete loop: practice → proposal → acceptance', () => {
  const s = initialState(), p = s.projects[0];
  p.steps = [true, true, true];
  const before = estimate(s, 'research').n;
  const e = replayAssessment(s, p.id, 'independent');
  assert.equal(e.status, 'pending');
  assert.equal(p.status, 'review');
  assert.equal(estimate(s, 'research').n, before);
  reviewEvidence(s, e.id, 'accepted');
  assert.equal(p.status, 'complete');
  assert.equal(estimate(s, 'research').n, before + 1);
});

test('rejecting an assessment reopens the project without changing its score', () => {
  const s = initialState(), p = s.projects[0];
  p.steps = [true, true, true];
  const before = estimate(s, 'research').score;
  const e = replayAssessment(s, p.id, 'independent');
  reviewEvidence(s, e.id, 'rejected');
  assert.equal(p.status, 'active');
  assert.equal(estimate(s, 'research').score, before);
});

test('a disconnected practice grant blocks assessment replay', () => {
  const s = initialState();
  s.projects[0].steps = [true, true, true];
  setSource(s, 'practice', false);
  assert.throws(() => replayAssessment(s, s.projects[0].id, 'independent'));
});

test('goal changes reorder opportunities without modifying evidence', () => {
  const s = initialState(), before = JSON.stringify(s.evidence);
  const first = opportunities(s).map(x => x.id);
  s.goal = 'clarity';
  assert.notDeepEqual(opportunities(s).map(x => x.id), first);
  assert.equal(JSON.stringify(s.evidence), before);
});

test('selective export excludes private record fields', () => {
  const s = initialState();
  s.projects[0].reflection = 'PRIVATE ENTERPRISE NOTE';
  const exported = JSON.stringify(disclosure(s));
  assert.ok(!exported.includes('PRIVATE ENTERPRISE NOTE'));
  for (const name of ['audit', 'adopted', 'reflection', 'title', 'date', 'source']) {
    assert.ok(!Object.keys(disclosure(s)).includes(name));
  }
  assert.equal(disclosure(s).claims.length, 12);
  assert.equal(disclosure(s).synthetic, true);
});

test('downloaded project brief includes success and review boundaries', () => {
  const s = initialState(), p = adopt(s, 'storyteller', [1]);
  const brief = projectBrief(p);
  assert.ok(brief.includes('Success Criterion') || brief.includes('Success criterion'));
  assert.ok(brief.includes('Make one idea concrete'));
  assert.ok(brief.includes('Google') || brief.includes('Enterprise'));
});

test('a full session state roundtrips through JSON', () => {
  const s = initialState();
  adopt(s, 'builder', [0]);
  reviewEvidence(s, 'candidate-story', 'accepted');
  setSource(s, 'portfolio', false);
  assert.ok(isState(JSON.parse(JSON.stringify(s))));
});

test('corrupt persistence is rejected safely', () => {
  assert.equal(isState(null), false);
  assert.equal(isState({}), false);
  const s = initialState();
  s.projects[0].origin = { practices: 'bad' };
  assert.equal(isState(s), false);
});

test('duplicate evidence identifiers are rejected', () => {
  const s = initialState();
  s.evidence.push({ ...s.evidence[0] });
  assert.equal(isState(s), false);
});

test('sensitive and high-stakes purposes are not supported', () => {
  for (const purpose of [
    'social-scoring',
    'hiring',
    'promotion',
    'credit',
    'personality-rating',
    'emotion-inference',
    'surveillance'
  ]) {
    assert.equal(policyGate(purpose), false);
  }
  assert.equal(policyGate('personal-learning'), true);
  assert.equal(policyGate('enterprise-learning'), true);
  assert.equal(policyGate('comparative-distribution'), true);
});

test('client implementation makes no fetch, websocket, model or analytics calls', () => {
  const code = readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
  assert.doesNotMatch(code, /\bfetch\s*\(|new\s+WebSocket|sendBeacon\s*\(|XMLHttpRequest/);
});

test('emergence sessions are defined and aligned with enterprise skills', () => {
  assert.ok(emergenceSessions.length >= 3);
  for (const session of emergenceSessions) {
    assert.ok(skills.some(s => s.id === session.skill));
    assert.ok(session.title.length > 0 && session.title.length <= 100);
    assert.ok([15, 30, 60].includes(session.durationMinutes));
  }
});

test('launching an emergence session creates an active project', () => {
  const s = initialState();
  const session = emergenceSessions[0];
  const p = launchSession(s, session.id);
  assert.equal(p.status, 'active');
  assert.equal(p.skill, session.skill);
  assert.ok(isState(s));
});

test('completing an emergence session and accepting evidence increases capability score', () => {
  const s = initialState();
  const session = emergenceSessions[0]; // systems skill
  const p = launchSession(s, session.id);
  p.steps = [true, true, true];
  const initialEstimate = estimate(s, session.skill);
  const evidence = replayAssessment(s, p.id, 'independent');
  reviewEvidence(s, evidence.id, 'accepted');
  const updatedEstimate = estimate(s, session.skill);
  assert.equal(updatedEstimate.n, initialEstimate.n + 1);
  assert.ok(updatedEstimate.score !== null);
});

// ============================================================================
// NEW TESTS: WORLD COMPARATIVE CAPABILITY SYSTEM REQUIREMENTS
// ============================================================================

test('rule 1: unknown is not zero; sparse capabilities are withheld from unearned averages', () => {
  const ap = personById('person-arthur-pendelton');
  assert.ok(ap, 'Arthur Pendelton fixture exists');
  // Arthur has systems (3.7) and story (2.2), but research, prototype, creative are null
  assert.equal(ap.capabilities.independent.research, null);
  assert.equal(ap.capabilities.independent.prototype, null);
  assert.equal(ap.capabilities.independent.creative, null);

  const b = computeBecomingIndex(ap.capabilities, 'independent');
  // Average should be across the 3 measured dimensions (3.7 + 2.2 + 2.1) / 3 = 2.667 -> 667 index points
  // If null were treated as zero, index would be (3.7 + 2.2 + 2.1) / 6 * 250 = 333 points!
  assert.ok(b.index > 500, 'Unknown dimensions are not treated as zero in Becoming Index');
  assert.equal(b.measuredCount, 3);
  assert.equal(b.totalCount, 6);

  const cov = computeEvidenceCoverage(ap.capabilities, 'independent');
  assert.equal(cov, 50); // 3 of 6 dimensions measured
});

test('rule 2: cohort context changes rank without altering raw evidence', () => {
  const elena = personById('person-elena-rostova');
  assert.ok(elena);
  // Raw evidence remains constant
  const rawSystems = elena.capabilities.independent.systems;
  assert.equal(rawSystems, 3.9);

  // Percentiles switch based on cohort
  const pGlobal = elena.cohortPercentiles.global.independent;
  const pUs = elena.cohortPercentiles.us.independent;
  const pSwe = elena.cohortPercentiles.swe.independent;

  assert.equal(pGlobal, 94);
  assert.equal(pUs, 91);
  assert.equal(pSwe, 93);
  assert.notEqual(pGlobal, pUs, 'Cohort context changes percentile rank');
  assert.equal(elena.capabilities.independent.systems, rawSystems, 'Raw evidence remains invariant');
});

test('rule 3: evidence coverage is distinct from score', () => {
  // Arthur has Becoming Index ~675 with 50% coverage -> wide uncertainty
  const ap = personById('person-arthur-pendelton');
  const covAp = computeEvidenceCoverage(ap.capabilities, 'independent');
  const uncertAp = computeUncertainty(ap.evidenceCount, covAp);

  // Elena has Becoming Index 842 with 100% coverage -> tight uncertainty
  const elena = personById('person-elena-rostova');
  const covElena = computeEvidenceCoverage(elena.capabilities, 'independent');
  const uncertElena = computeUncertainty(elena.evidenceCount, covElena);

  assert.ok(covElena > covAp, 'Elena has higher evidence coverage');
  assert.ok(uncertAp.interval > uncertElena.interval, 'Sparse evidence produces wider uncertainty interval');
  assert.notEqual(uncertAp.tier, uncertElena.tier, 'High and sparse coverage have distinct confidence tiers');
});

test('rule 4: independent and AI-assisted measurements remain distinguishable', () => {
  for (const person of syntheticPeople) {
    const indep = computeBecomingIndex(person.capabilities, 'independent');
    const assist = computeBecomingIndex(person.capabilities, 'assisted');
    assert.ok(indep.index !== null, `${person.name} has independent Becoming Index`);
    assert.ok(assist.index !== null, `${person.name} has assisted Becoming Index`);
    assert.ok(assist.index >= indep.index, `${person.name} assisted score reflects AI leverage`);
  }
});

test('rule 5: synthetic fixtures cannot masquerade as verified real people', () => {
  assert.ok(syntheticPeople.length >= 20, 'Population contains at least 20 participants');
  for (const person of syntheticPeople) {
    assert.equal(person.synthetic, true, `${person.name} must be explicitly synthetic: true`);
    assert.equal(person.verificationTier, 'synthetic_benchmark_fixture');
    // Origin country and work country must be present and distinct fields
    assert.ok(typeof person.originCountry === 'string' && person.originCountry.length > 0);
    assert.ok(typeof person.workCountry === 'string' && person.workCountry.length > 0);
  }
  // Verify international distinction: Elena originated in Estonia, works in United States
  const elena = personById('person-elena-rostova');
  assert.equal(elena.originCountry, 'Estonia');
  assert.equal(elena.workCountry, 'United States');
  assert.notEqual(elena.originCountry, elena.workCountry);
});

test('rule 6: comparison uses compatible measurement conditions', () => {
  // Comparing under divergent assistance conditions raises notice
  const divergent = comparePeople('person-elena-rostova', 'person-marcus-vance', 'independent', 'assisted');
  assert.equal(divergent.isModeCompatible, false);
  assert.ok(divergent.compatibilityNotice.includes('Assistance Condition Divergence'));

  // Comparing under identical conditions is compatible
  const compatible = comparePeople('person-elena-rostova', 'person-marcus-vance', 'independent', 'independent');
  assert.equal(compatible.isModeCompatible, true);
  assert.equal(compatible.compatibilityNotice, null);
});

test('rule 7: trajectories calculate consistently', () => {
  // Kwame Mensah is the fastest climber with +112 YoY
  const kwame = personById('person-kwame-mensah');
  assert.equal(kwame.trajectory.yoyDelta, 112);
  assert.equal(kwame.trajectory.velocityRank, 1);

  // Leaderboard sorted by velocity has Kwame at rank 1
  const sorted = getLeaderboard('independent', 'world', 'velocity');
  assert.equal(sorted[0].person.id, 'person-kwame-mensah');
  assert.ok(sorted[0].yoyDelta >= sorted[1].yoyDelta);
});

test('rule 8: composite scores decompose correctly', () => {
  const elena = personById('person-elena-rostova');
  const decomp = computeBecomingIndex(elena.capabilities, 'independent');
  assert.ok(decomp.dimensions.length === 6);

  // Verify that average of dimension points equals composite index
  const sumPoints = decomp.dimensions.reduce((sum, d) => sum + d.indexContribution, 0);
  const expectedIndex = Math.round(sumPoints / decomp.dimensions.length);
  assert.equal(decomp.index, expectedIndex);
});

test('rule 9: low scores are displayed directly rather than replaced with euphemistic tiers', () => {
  const devin = personById('person-devin-vance');
  assert.ok(devin);
  const opp = getOpportunitySurface(devin.capabilities.independent.systems, 18, 'Software Engineering', devin.primaryGap);
  assert.equal(opp.percentile, 18);
  // Must say "18th percentile" directly without euphemistic tier name
  assert.ok(opp.message.startsWith('18th percentile'));
  assert.ok(opp.message.includes('Most comparable participants currently demonstrate stronger performance here'));
  assert.ok(!opp.message.includes('Explorer Tier'));
  assert.ok(!opp.message.includes('Master Tier'));
});

test('rule 10: human neighborhood identifies immediate neighbors and next percentile threshold', () => {
  const n = getNeighborhood('person-elena-rostova', 'composite', 'independent', 'world');
  assert.ok(n.target);
  assert.ok(n.nextThreshold);
  assert.ok(n.attainableSteps.length > 0);
  assert.ok(typeof n.nextThreshold.gapPoints === 'number');
});

test('rule 11: head-to-head comparison identifies leading dimensions without psychological inferences', () => {
  const cmp = comparePeople('person-elena-rostova', 'person-marcus-vance', 'independent', 'independent');
  assert.ok(cmp.dimensionsALeads.some(d => d.skill.id === 'systems'));
  assert.ok(cmp.dimensionsBLeads.some(d => d.skill.id === 'story'));
  assert.ok(cmp.gapExplanation.includes('Systems architecture'));
  assert.ok(cmp.gapExplanation.includes('Executive storytelling'));
  assert.ok(cmp.gapExplanation.includes('Neither profile demonstrates psychological attributes'));
});

test('rule 12: pattern discovery finds distinguishing skills and rare combinations', () => {
  const patterns = discoverPatterns(syntheticPeople, 'independent');
  assert.ok(patterns.skillGaps.length === 6);
  assert.ok(patterns.topDifferentiatingSkill);
  assert.ok(patterns.rareCombinations.length > 0);
  assert.ok(patterns.fastClimbers.length > 0);
});

test('rule 13: future adult-life domains are distinguished from supported measurements', () => {
  assert.ok(futureDomains.length >= 3);
  for (const fd of futureDomains) {
    assert.equal(fd.supported, false);
    assert.equal(fd.status, 'future_domain');
    assert.equal(isDimensionSupported(fd.id), false);
  }
  assert.equal(isDimensionSupported('systems'), true);
});

test('rule 14: cohort representativeness disclaimer is truthful', () => {
  const discGlobal = cohortDisclaimer('global');
  assert.ok(discGlobal.includes('verified participants'));
  assert.ok(discGlobal.includes('not a national census'));

  const discWithheld = cohortDisclaimer('circle');
  assert.ok(discWithheld.includes('Withheld'));
  assert.ok(discWithheld.includes('Small cohorts are suppressed'));
});
