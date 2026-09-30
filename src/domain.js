/**
 * Google Emergence: Pure Domain Model.
 * Emergence is the world view of human capability.
 * Comparison is the core product: Never soften a valid comparison. Never manufacture an invalid one.
 * 
 * Supports real identifiable people contracts alongside clearly labeled synthetic benchmark fixtures.
 * Decomposable Becoming Index (0-1000 scale), contextual cohort percentiles, human neighborhoods,
 * head-to-head comparisons, and first-class trajectory tracking.
 * 
 * Designed for Google Enterprise AI systems, Google Workspace, and Vertex AI.
 */

export const VERSION = 2;
export const RUBRIC = 'google-emergence-world/2.0';
export const RUBRIC_LEGACY = 'google-emergence-enterprise/1';
export const MIN_EVIDENCE = 3;
export const MIN_COHORT = 30;
export const MIN_COHORT_STRICT = 10;

// The 6 core evidence-supported dimensions in current taxonomy
export const skills = [
  {
    id: 'systems',
    name: 'Systems architecture',
    category: 'Engineering & Strategy',
    icon: 'orbit',
    color: 'blue',
    x: 51,
    y: 22,
    target: 3.5,
    summary: 'See relationships across distributed services. Find the leverage point.',
    criterion: 'Map dependencies, identify failure domains, and test a change against a stated reliability objective.',
    practice: 'Map a system architecture before changing it',
    marks: [3, 3, 4],
    source: 'projects',
    supported: true
  },
  {
    id: 'research',
    name: 'Research judgment',
    category: 'Strategy & Analysis',
    icon: 'search',
    color: 'red',
    x: 21,
    y: 46,
    target: 3.0,
    summary: 'Turn ambiguous information into a defensible enterprise decision.',
    criterion: 'Triangulate a claim with independent sources, disclose uncertainty, and explain what would change the decision.',
    practice: 'Make a decision from conflicting evidence',
    marks: [2, 2, 3],
    source: 'projects',
    supported: true
  },
  {
    id: 'story',
    name: 'Executive storytelling',
    category: 'Communication',
    icon: 'voice',
    color: 'yellow',
    x: 76,
    y: 48,
    target: 3.5,
    summary: 'Make complex technical and product tradeoffs understood.',
    criterion: 'Explain a complex initiative to executive stakeholders, retain the key tradeoff, and verify cross-functional alignment.',
    practice: 'Explain one complex technical tradeoff in 90 seconds',
    marks: [2, 3, 3],
    source: 'portfolio',
    supported: true
  },
  {
    id: 'prototype',
    name: 'Rapid prototyping',
    category: 'Execution & AI',
    icon: 'box',
    color: 'green',
    x: 48,
    y: 79,
    target: 3.5,
    summary: 'Make an idea tangible enough to test with real enterprise users.',
    criterion: 'Build a testable interactive artifact with explicit assumptions, evaluate with Gemini Enterprise, and revise one core assumption.',
    practice: 'Build the smallest testable prototype with Gemini',
    marks: [3, 3, 3],
    source: 'portfolio',
    supported: true
  },
  {
    id: 'facilitation',
    name: 'Inclusive facilitation',
    category: 'Collaboration',
    icon: 'people',
    color: 'blue',
    x: 14,
    y: 77,
    target: 3.0,
    summary: 'Help cross-functional teams build shared conviction.',
    criterion: 'Design an inclusive collaborative agenda, preserve productive dissent, and produce a clear next action with owners.',
    practice: 'Design a cross-functional alignment session',
    marks: [1, 2, 2],
    source: 'practice',
    supported: true
  },
  {
    id: 'creative',
    name: 'Applied generative AI',
    category: 'Execution & AI',
    icon: 'code',
    color: 'green',
    x: 86,
    y: 79,
    target: 3.0,
    summary: 'Harness enterprise generative models for workflow transformation.',
    criterion: 'Build a functioning prompt chain or agent playbook with evaluation criteria, and adapt it to edge constraints.',
    practice: 'Build a Gemini Enterprise agent playbook',
    marks: [1, 1, 2],
    source: 'practice',
    supported: true
  }
];

// Explicit taxonomy separation: supported measurement dimensions vs future adult-life domains
export const futureDomains = [
  { id: 'financial_position', name: 'Financial Capital & Allocation', category: 'Adult Life', supported: false, status: 'future_domain', summary: 'Long-term capital efficiency and asset risk judgment.' },
  { id: 'physical_vitality', name: 'Physical Stamina & Health Protocol', category: 'Adult Life', supported: false, status: 'future_domain', summary: 'Physical baseline, sleep architecture, and endurance.' },
  { id: 'relationship_depth', name: 'Relational Trust & Family Stewardship', category: 'Adult Life', supported: false, status: 'future_domain', summary: 'Long-term interpersonal trust and domestic competence.' },
  { id: 'craftsmanship', name: 'Physical Craftsmanship & Material Mastery', category: 'Craft', supported: false, status: 'future_domain', summary: 'Tangible physical fabrication, joinery, and analog materials.' },
  { id: 'community_contribution', name: 'Civic Leadership & Commons Stewardship', category: 'Civic', supported: false, status: 'future_domain', summary: 'Local governance, neighborhood institution building, and mutual aid.' }
];

export function isDimensionSupported(dimensionId) {
  return skills.some(s => s.id === dimensionId);
}

export const sources = [
  {
    id: 'projects',
    name: 'Google Workspace & Drive',
    detail: 'Selected Docs, Sheets, Slides, and architectural decision records',
    icon: 'folder'
  },
  {
    id: 'portfolio',
    name: 'Enterprise Portfolio & Code',
    detail: 'Architecture blueprints, Google Cloud prototypes, and technical artifacts',
    icon: 'box'
  },
  {
    id: 'practice',
    name: 'Gemini Practice Check-ins',
    detail: 'Task-specific demonstrations of problem solving and socratic practice',
    icon: 'check'
  }
];

export const goals = [
  {
    id: 'product',
    name: 'Build transformative products',
    weights: { systems: 1.0, research: 1.0, story: 0.7, prototype: 1.0, facilitation: 0.5, creative: 0.8 }
  },
  {
    id: 'clarity',
    name: 'Communicate with executive clarity',
    weights: { systems: 0.6, research: 0.8, story: 1.0, prototype: 0.3, facilitation: 1.0, creative: 0.2 }
  },
  {
    id: 'create',
    name: 'Accelerate enterprise AI innovation',
    weights: { systems: 0.5, research: 0.4, story: 0.8, prototype: 1.0, facilitation: 0.3, creative: 1.0 }
  }
];

export const perspectives = [
  {
    id: 'builder',
    title: 'The Systems Architect',
    subtitle: 'Design for resilience. Find the critical leverage point.',
    color: 'blue',
    shape: 'rings',
    skill: 'systems',
    tags: ['Systems architecture', 'Rapid prototyping'],
    author: 'Google Cloud & SRE Practice',
    practices: [
      'Draw service dependencies and single points of failure before designing solutions.',
      'Ask what production metrics or edge cases would disprove your favorite design.',
      'Test the smallest reversible canary deployment against explicit SLOs.'
    ],
    tastes: ['Clean architectural boundaries', 'Visible telemetry and SLIs'],
    tension: 'This lens prioritizes resilience and simplicity. Preserve necessary distributed complexity when scale demands it.'
  },
  {
    id: 'storyteller',
    title: 'The Clear Storyteller',
    subtitle: 'Lead with the user. Frame the trade-off with clarity.',
    color: 'yellow',
    shape: 'stairs',
    skill: 'story',
    tags: ['Executive storytelling', 'Research judgment'],
    author: 'Google Workspace Narrative Lab',
    practices: [
      'Start with the core user friction and question, not feature mechanics.',
      'Make one idea concrete before adding another layer of abstraction.',
      'Keep the operational trade-offs and uncertainty in the narrative.'
    ],
    tastes: ['Clear plain language', 'Concrete user demonstrations'],
    tension: 'Executive clarity is not certainty. Do not strip out caveats simply to craft a smoother narrative.'
  },
  {
    id: 'facilitator',
    title: 'The Inclusive Facilitator',
    subtitle: 'Foster psychological safety and high-velocity alignment.',
    color: 'green',
    shape: 'petals',
    skill: 'facilitation',
    tags: ['Inclusive facilitation', 'Systems architecture'],
    author: 'Google Enterprise Culture Practice',
    practices: [
      'Invite counter-arguments and dissenting perspectives before reaching consensus.',
      'Make quiet, asynchronous contribution channels available in Workspace Docs.',
      'Conclude with explicit decision records, accountable owners, and timeline milestones.'
    ],
    tastes: ['Structured socratic synthesis', 'Participatory alignment'],
    tension: 'Participation is not a personality contest. Never infer engagement or capability from speech patterns, camera presence, or silence.'
  }
];

// Contextual Cohorts with distinct scopes and explicit representativeness disclaimers
export const cohorts = [
  { id: 'global', name: 'All Participating People (Global World Cohort)', n: 280000, label: 'Global World', offset: 0, sampleSize: 120 },
  { id: 'world', name: 'World Cohort (All Participants)', n: 280000, label: 'World Cohort', offset: 0, sampleSize: 120 },
  { id: 'national', name: 'Google Cloud Partner Cohort', n: 80, label: 'Cloud Partners', offset: 7, sampleSize: 80 },
  { id: 'us', name: 'United States Participant Cohort', n: 84000, label: 'United States', offset: 5, sampleSize: 90 },
  { id: 'emea', name: 'Europe & Middle East Cohort', n: 65000, label: 'EMEA', offset: 8, sampleSize: 85 },
  { id: 'apac', name: 'Asia-Pacific Cohort', n: 52000, label: 'APAC', offset: 12, sampleSize: 80 },
  { id: 'latam', name: 'Latin America Cohort', n: 22000, label: 'LATAM', offset: 15, sampleSize: 70 },
  { id: 'swe', name: 'Software Professionals Cohort', n: 95000, label: 'Software Professionals', offset: 7, sampleSize: 95 },
  { id: 'ai_ml', name: 'AI & Machine Learning Specialists', n: 38000, label: 'AI & ML Specialists', offset: 14, sampleSize: 75 },
  { id: 'product', name: 'Product Strategy & Management Cohort', n: 31000, label: 'Product Strategy', offset: 9, sampleSize: 70 },
  { id: 'senior', name: 'Senior Professionals Cohort (7+ Years)', n: 72000, label: 'Senior Professionals', offset: 11, sampleSize: 85 },
  { id: 'early', name: 'Early Career & Emerging Talent (1-3 Years)', n: 45000, label: 'Early Career', offset: 3, sampleSize: 80 },
  { id: 'circle', name: 'Small Project Pod (Withheld)', n: 12, label: 'Project Pod (Withheld)', offset: 11, sampleSize: 12 }
];

export function cohortDisclaimer(cohortId) {
  const c = cohorts.find(x => x.id === cohortId);
  if (!c) return 'Participating cohort data.';
  if (c.n < MIN_COHORT) {
    return `Withheld: Cohort has ${c.n} participants (fewer than ${MIN_COHORT} threshold). Small cohorts are suppressed to protect validity and privacy.`;
  }
  return `Cohort represents ${c.n.toLocaleString()} verified participants in Emergence; not a national census population or compulsory stack-ranking.`;
}

export const skillById = id => skills.find(s => s.id === id);

// ============================================================================
// POPULATION MODEL: Real Person Architecture & Synthetic Benchmark Fixtures
// ============================================================================

/**
 * 25 Diverse, richly detailed synthetic participant fixtures.
 * All fixtures are explicitly labeled synthetic: true and verificationTier: 'synthetic_benchmark_fixture'.
 * The architecture and data contracts allow real identifiable people to plug in without modifications.
 * Preserves distinction between originCountry (nationality/origin) and workCountry (where work is produced).
 */
export const syntheticPeople = [
  {
    id: 'person-elena-rostova',
    name: 'Elena Rostova',
    handle: '@erostova',
    avatar: 'ER',
    role: 'Principal SRE, Google Cloud Platform',
    organization: 'Google Cloud Distributed Systems',
    originCountry: 'Estonia',
    workCountry: 'United States',
    region: 'North America',
    profession: 'Software Engineering',
    specialty: 'Distributed Systems & Chaos Engineering',
    experienceLevel: 'Principal (L7+)',
    yearsExperience: 14,
    asOf: '2026-09-28',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Pioneered regional failover architectures and multi-tenant consensus boundaries. Strong advocate for visible SLOs and deterministic canary verification.',
    capabilities: {
      independent: { systems: 3.9, research: 3.4, story: 2.8, prototype: 3.2, facilitation: 3.3, creative: 2.9 },
      assisted: { systems: 4.0, research: 3.8, story: 3.4, prototype: 3.7, facilitation: 3.4, creative: 3.8 }
    },
    trajectory: {
      yoyDelta: 48,
      direction: 'rising',
      velocityRank: 12,
      acquisitionCount: 2,
      recentMilestone: 'Mastered Multi-Region Consensus at Scale',
      history: [720, 755, 794, 842]
    },
    cohortPercentiles: {
      global: { independent: 94, assisted: 96 },
      world: { independent: 94, assisted: 96 },
      us: { independent: 91, assisted: 93 },
      swe: { independent: 93, assisted: 95 },
      senior: { independent: 88, assisted: 91 }
    },
    evidenceCount: 26,
    strengths: ['Systems architecture', 'Distributed reliability', 'Research judgment'],
    primaryGap: 'Executive storytelling in high-stakes board presentations',
    observedPractices: [
      'Authors architectural decision records (ADRs) before committing mesh changes',
      'Runs chaos injections during planned maintenance windows with strict canary rollbacks',
      'Triangulates distributed telemetry metrics across independent data planes'
    ]
  },
  {
    id: 'person-marcus-vance',
    name: 'Marcus Vance',
    handle: '@mvance',
    avatar: 'MV',
    role: 'Staff Product Lead, Google Workspace AI',
    organization: 'Google Workspace Narrative Labs',
    originCountry: 'United States',
    workCountry: 'United States',
    region: 'North America',
    profession: 'Product Management',
    specialty: 'Narrative Strategy & Executive Communication',
    experienceLevel: 'Staff (L6)',
    yearsExperience: 11,
    asOf: '2026-09-29',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Specializes in 90-second executive trade-off framing and converting ambiguous technical debt into clear board-level strategic decisions.',
    capabilities: {
      independent: { systems: 2.8, research: 3.3, story: 3.9, prototype: 3.5, facilitation: 3.7, creative: 3.2 },
      assisted: { systems: 3.4, research: 3.7, story: 4.0, prototype: 3.9, facilitation: 3.8, creative: 3.9 }
    },
    trajectory: {
      yoyDelta: 38,
      direction: 'rising',
      velocityRank: 18,
      acquisitionCount: 1,
      recentMilestone: 'Published 3-Slide Executive Decision Framework',
      history: [710, 742, 777, 815]
    },
    cohortPercentiles: {
      global: { independent: 89, assisted: 93 },
      world: { independent: 89, assisted: 93 },
      us: { independent: 87, assisted: 91 },
      product: { independent: 94, assisted: 96 },
      senior: { independent: 83, assisted: 88 }
    },
    evidenceCount: 22,
    strengths: ['Executive storytelling', 'Inclusive facilitation', 'Rapid prototyping'],
    primaryGap: 'Deep distributed systems failure domain modeling',
    observedPractices: [
      'Distills 40-page technical documents into 3 decisive trade-off slides',
      'Uses asynchronous silent-reading in Workspace Docs before verbal discussion',
      'Prototypes interactive customer workflows with Gemini in under 30 minutes'
    ]
  },
  {
    id: 'person-amara-okafor',
    name: 'Amara Okafor',
    handle: '@aokafor',
    avatar: 'AO',
    role: 'Lead Cloud Infrastructure Architect',
    organization: 'Finovate Cloud Systems',
    originCountry: 'Nigeria',
    workCountry: 'United Kingdom',
    region: 'EMEA',
    profession: 'Software Engineering',
    specialty: 'High-Throughput Financial Infrastructure',
    experienceLevel: 'Staff (L6)',
    yearsExperience: 9,
    asOf: '2026-09-30',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Architects resilient, sub-millisecond ledger consensus networks across African and European cloud nodes. Exceptional balance of systems rigor and team facilitation.',
    capabilities: {
      independent: { systems: 3.8, research: 3.5, story: 3.6, prototype: 3.4, facilitation: 3.8, creative: 3.4 },
      assisted: { systems: 4.0, research: 3.8, story: 3.8, prototype: 3.8, facilitation: 3.9, creative: 3.8 }
    },
    trajectory: {
      yoyDelta: 62,
      direction: 'rising',
      velocityRank: 6,
      acquisitionCount: 3,
      recentMilestone: 'Zero-Downtime Migration of 14M Ledger Accounts',
      history: [740, 788, 828, 890]
    },
    cohortPercentiles: {
      global: { independent: 96, assisted: 98 },
      world: { independent: 96, assisted: 98 },
      emea: { independent: 97, assisted: 99 },
      swe: { independent: 95, assisted: 97 },
      senior: { independent: 92, assisted: 95 }
    },
    evidenceCount: 31,
    strengths: ['Systems architecture', 'Inclusive facilitation', 'Executive storytelling'],
    primaryGap: 'Novel prompt adversarial boundary testing',
    observedPractices: [
      'Conducts pre-mortem failure modeling sessions for every distributed release',
      'Mentors junior engineers through structured 15-minute socratic code walk-throughs',
      'Designs idempotent financial transaction processors with verifiable audits'
    ]
  },
  {
    id: 'person-kenji-sato',
    name: 'Dr. Kenji Sato',
    handle: '@ksato',
    avatar: 'KS',
    role: 'Distinguished Research Scientist',
    organization: 'Tokyo Quantum & Distributed Computing Institute',
    originCountry: 'Japan',
    workCountry: 'Japan',
    region: 'APAC',
    profession: 'AI & ML Research',
    specialty: 'Distributed Consensus & Formal Verification',
    experienceLevel: 'Principal / Fellow (L8)',
    yearsExperience: 18,
    asOf: '2026-09-25',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Authority on formally verified state machine replication and quantum-resistant cryptographic consensus. Published 40+ peer-reviewed papers.',
    capabilities: {
      independent: { systems: 3.9, research: 3.9, story: 2.4, prototype: 3.1, facilitation: 2.8, creative: 3.5 },
      assisted: { systems: 4.0, research: 4.0, story: 3.1, prototype: 3.6, facilitation: 3.0, creative: 3.9 }
    },
    trajectory: {
      yoyDelta: 22,
      direction: 'rising',
      velocityRank: 32,
      acquisitionCount: 1,
      recentMilestone: 'Formal Proof of Asynchronous Byzantine Tolerance',
      history: [810, 825, 843, 865]
    },
    cohortPercentiles: {
      global: { independent: 93, assisted: 95 },
      world: { independent: 93, assisted: 95 },
      apac: { independent: 96, assisted: 97 },
      ai_ml: { independent: 94, assisted: 96 },
      senior: { independent: 90, assisted: 92 }
    },
    evidenceCount: 29,
    strengths: ['Research judgment', 'Systems architecture', 'Applied generative AI'],
    primaryGap: 'Executive storytelling and compressed narrative presentation',
    observedPractices: [
      'Proves system invariants mathematically before implementation begins',
      'Validates all empirical claims against randomized double-blind synthetic workloads',
      'Publishes open benchmark datasets with cryptographic reproducible receipts'
    ]
  },
  {
    id: 'person-siddharth-rao',
    name: 'Siddharth Rao',
    handle: '@srao',
    avatar: 'SR',
    role: 'Staff Security Architect, DeepMind Platform',
    organization: 'Google DeepMind Platform Security',
    originCountry: 'India',
    workCountry: 'United States',
    region: 'North America',
    profession: 'Software Engineering',
    specialty: 'Vertex AI Agent Red-Teaming & Guardrail Engineering',
    experienceLevel: 'Staff (L6)',
    yearsExperience: 10,
    asOf: '2026-09-30',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Designs adversarial testing suites for frontier LLM agents, prompt injection perimeters, and BeyondCorp VPC service controls.',
    capabilities: {
      independent: { systems: 3.7, research: 3.6, story: 3.0, prototype: 3.6, facilitation: 3.1, creative: 3.8 },
      assisted: { systems: 3.9, research: 3.9, story: 3.5, prototype: 3.9, facilitation: 3.4, creative: 4.0 }
    },
    trajectory: {
      yoyDelta: 45,
      direction: 'rising',
      velocityRank: 14,
      acquisitionCount: 2,
      recentMilestone: 'Built Zero-Bypass Prompt Guardrail for Vertex Agents',
      history: [735, 772, 815, 860]
    },
    cohortPercentiles: {
      global: { independent: 92, assisted: 95 },
      world: { independent: 92, assisted: 95 },
      us: { independent: 90, assisted: 93 },
      swe: { independent: 91, assisted: 94 },
      senior: { independent: 87, assisted: 91 }
    },
    evidenceCount: 24,
    strengths: ['Applied generative AI', 'Systems architecture', 'Rapid prototyping'],
    primaryGap: 'Cross-functional executive storytelling',
    observedPractices: [
      'Constructs fuzzing test fixtures targeting multi-step LLM tool chains',
      'Verifies containment perimeters under simulated VPC credential compromise',
      'Publishes internal red-team war game findings with automated remediation scripts'
    ]
  },
  {
    id: 'person-camila-silva',
    name: 'Camila Silva',
    handle: '@csilva',
    avatar: 'CS',
    role: 'Senior 3D & Graphics Protocol Engineer',
    organization: 'Spatial Web Labs',
    originCountry: 'Brazil',
    workCountry: 'Germany',
    region: 'EMEA',
    profession: 'Software Engineering',
    specialty: '3D Graphics, WebGPU & Spatial Simulation',
    experienceLevel: 'Senior (L5)',
    yearsExperience: 7,
    asOf: '2026-09-27',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Passionate about WebGPU rendering pipelines and real-time physical simulation on edge hardware. Rapidly emerging talent in spatial computing.',
    capabilities: {
      independent: { systems: 3.5, research: 2.9, story: 2.7, prototype: 3.8, facilitation: 3.0, creative: 3.7 },
      assisted: { systems: 3.8, research: 3.4, story: 3.3, prototype: 4.0, facilitation: 3.3, creative: 4.0 }
    },
    trajectory: {
      yoyDelta: 74,
      direction: 'rising',
      velocityRank: 4,
      acquisitionCount: 3,
      recentMilestone: 'Shipped 60FPS Fluid Simulator on WebGPU Edge',
      history: [620, 675, 711, 785]
    },
    cohortPercentiles: {
      global: { independent: 84, assisted: 89 },
      world: { independent: 84, assisted: 89 },
      emea: { independent: 86, assisted: 91 },
      swe: { independent: 82, assisted: 87 },
      senior: { independent: 76, assisted: 82 }
    },
    evidenceCount: 19,
    strengths: ['Rapid prototyping', 'Applied generative AI', 'Systems architecture'],
    primaryGap: 'Research judgment and formal claim triangulation',
    observedPractices: [
      'Builds interactive 3D prototypes in 24 hours to validate shader performance',
      'Profiles memory leaks across GPU buffers using automated telemetry probes',
      'Collaborates with open-source graphics maintainers to verify driver quirks'
    ]
  },
  {
    id: 'person-priya-patel',
    name: 'Priya Patel',
    handle: '@ppatel',
    avatar: 'PP',
    role: 'Engineering Director, Enterprise Cloud Platform',
    organization: 'CloudScale Global Systems',
    originCountry: 'India',
    workCountry: 'Singapore',
    region: 'APAC',
    profession: 'Software Engineering',
    specialty: 'Engineering Leadership & Cross-Border Collaboration',
    experienceLevel: 'Director (L7+)',
    yearsExperience: 16,
    asOf: '2026-09-29',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Directs 80+ engineers across Singapore, Sydney, and Bangalore. Master of asynchronous decision-making and cross-timezone consensus building.',
    capabilities: {
      independent: { systems: 3.4, research: 3.5, story: 3.8, prototype: 3.0, facilitation: 3.9, creative: 3.3 },
      assisted: { systems: 3.7, research: 3.8, story: 4.0, prototype: 3.4, facilitation: 4.0, creative: 3.7 }
    },
    trajectory: {
      yoyDelta: 35,
      direction: 'rising',
      velocityRank: 22,
      acquisitionCount: 1,
      recentMilestone: 'Scaled Asynchronous Decision SLA to 94% Cross-Timezone',
      history: [770, 802, 835, 870]
    },
    cohortPercentiles: {
      global: { independent: 93, assisted: 96 },
      world: { independent: 93, assisted: 96 },
      apac: { independent: 95, assisted: 97 },
      swe: { independent: 92, assisted: 95 },
      senior: { independent: 91, assisted: 94 }
    },
    evidenceCount: 28,
    strengths: ['Inclusive facilitation', 'Executive storytelling', 'Research judgment'],
    primaryGap: 'Hands-on rapid technical prototyping',
    observedPractices: [
      'Institutes mandatory silence periods in review docs to allow quiet dissent',
      'Reviews strategic engineering proposals against 5-year operating expenditure models',
      'Runs blameless post-incident reviews focusing strictly on systemic design flaws'
    ]
  },
  {
    id: 'person-kwame-mensah',
    name: 'Kwame Mensah',
    handle: '@kmensah',
    avatar: 'KM',
    role: 'Emerging Cloud & AI Developer',
    organization: 'Nairobi NextGen AI Studio',
    originCountry: 'Ghana',
    workCountry: 'Kenya',
    region: 'EMEA',
    profession: 'Software Engineering',
    specialty: 'Edge GenAI Applications & Offline Compute',
    experienceLevel: 'Early Career (L3)',
    yearsExperience: 2,
    asOf: '2026-09-30',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'One of the fastest-improving software builders in the global dataset. Leaps ahead in rapid prototyping and applied generative AI on constrained bandwidth.',
    capabilities: {
      independent: { systems: 3.1, research: 2.8, story: 2.6, prototype: 3.5, facilitation: 2.9, creative: 3.4 },
      assisted: { systems: 3.6, research: 3.3, story: 3.2, prototype: 3.9, facilitation: 3.3, creative: 3.9 }
    },
    trajectory: {
      yoyDelta: 112,
      direction: 'surging',
      velocityRank: 1,
      acquisitionCount: 4,
      recentMilestone: 'Built Offline-First Gemini Nano Field App in Kenya',
      history: [480, 550, 615, 685]
    },
    cohortPercentiles: {
      global: { independent: 68, assisted: 76 },
      world: { independent: 68, assisted: 76 },
      emea: { independent: 72, assisted: 79 },
      swe: { independent: 64, assisted: 72 },
      early: { independent: 94, assisted: 98 }
    },
    evidenceCount: 16,
    strengths: ['Rapid prototyping', 'Applied generative AI', 'Systems architecture'],
    primaryGap: 'Executive storytelling and multi-stakeholder trade-off framing',
    observedPractices: [
      'Implements working prototypes in under 48 hours to test real user adoption',
      'Benchmarks lightweight on-device models against quantized token latency metrics',
      'Documents all code iterations with transparent commit logs and video walkthroughs'
    ]
  },
  {
    id: 'person-maya-lin',
    name: 'Maya Lin',
    handle: '@mlin',
    avatar: 'ML',
    role: 'Principal AI Interaction Designer',
    organization: 'Human-Interface Research Lab',
    originCountry: 'Canada',
    workCountry: 'United States',
    region: 'North America',
    profession: 'Product Management',
    specialty: 'Multimodal Interfaces & Human-AI Collaboration',
    experienceLevel: 'Principal (L7)',
    yearsExperience: 13,
    asOf: '2026-09-28',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Rare combination of executive storytelling, rapid interactive prototyping, and frontier generative AI. Redefines how human intent flows into agentic systems.',
    capabilities: {
      independent: { systems: 2.9, research: 3.4, story: 3.8, prototype: 3.9, facilitation: 3.4, creative: 3.8 },
      assisted: { systems: 3.4, research: 3.8, story: 4.0, prototype: 4.0, facilitation: 3.7, creative: 4.0 }
    },
    trajectory: {
      yoyDelta: 44,
      direction: 'rising',
      velocityRank: 15,
      acquisitionCount: 2,
      recentMilestone: 'Co-Authored Generative UI Principles with 2M+ Views',
      history: [760, 805, 841, 885]
    },
    cohortPercentiles: {
      global: { independent: 95, assisted: 97 },
      world: { independent: 95, assisted: 97 },
      us: { independent: 93, assisted: 96 },
      product: { independent: 98, assisted: 99 },
      senior: { independent: 92, assisted: 95 }
    },
    evidenceCount: 27,
    strengths: ['Rapid prototyping', 'Applied generative AI', 'Executive storytelling'],
    primaryGap: 'Distributed systems backend fault tolerance',
    observedPractices: [
      'Validates interaction hypotheses with interactive high-fidelity web sandboxes',
      'Measures cognitive load during human-AI co-creation sessions with task timings',
      'Presents product vision decks that focus on tangible user agency over AI magic'
    ]
  },
  {
    id: 'person-chloe-dubois',
    name: 'Chloe Dubois',
    handle: '@cdubois',
    avatar: 'CD',
    role: 'AI Ethics & Governance Strategist',
    organization: 'European Responsible Tech Consortium',
    originCountry: 'France',
    workCountry: 'France',
    region: 'EMEA',
    profession: 'Product Management',
    specialty: 'EU AI Act Compliance & Algorithmic Audit',
    experienceLevel: 'Senior (L5)',
    yearsExperience: 8,
    asOf: '2026-09-26',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Specialist in psychometric validity, bias remediation, and regulatory compliance. Strong research judgment and cross-functional facilitation.',
    capabilities: {
      independent: { systems: 2.7, research: 3.8, story: 3.7, prototype: 2.8, facilitation: 3.6, creative: 3.1 },
      assisted: { systems: 3.2, research: 4.0, story: 3.9, prototype: 3.3, facilitation: 3.8, creative: 3.6 }
    },
    trajectory: {
      yoyDelta: 29,
      direction: 'steady',
      velocityRank: 26,
      acquisitionCount: 1,
      recentMilestone: 'Audited 12 Foundation Models for Regulatory Compliance',
      history: [700, 732, 761, 790]
    },
    cohortPercentiles: {
      global: { independent: 85, assisted: 89 },
      world: { independent: 85, assisted: 89 },
      emea: { independent: 87, assisted: 91 },
      product: { independent: 91, assisted: 94 },
      senior: { independent: 78, assisted: 83 }
    },
    evidenceCount: 20,
    strengths: ['Research judgment', 'Executive storytelling', 'Inclusive facilitation'],
    primaryGap: 'Direct production software systems engineering',
    observedPractices: [
      'Triangulates model fairness claims against multi-demographic benchmark datasets',
      'Designs transparent audit trails conforming to European AI Act high-risk gates',
      'Facilitates ethics reviews that balance product velocity with long-term safety'
    ]
  },
  {
    id: 'person-tariq-al-mansoor',
    name: 'Tariq Al-Mansoor',
    handle: '@talmansoor',
    avatar: 'TA',
    role: 'Lead Machine Learning Systems Architect',
    organization: 'VectorScale Systems Canada',
    originCountry: 'United Arab Emirates',
    workCountry: 'Canada',
    region: 'North America',
    profession: 'AI & ML Research',
    specialty: 'High-Performance Model Training Clusters & FlashAttention',
    experienceLevel: 'Staff (L6)',
    yearsExperience: 10,
    asOf: '2026-09-29',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Optimizes TPU and GPU cluster interconnects for multi-billion parameter model pretraining. Deep mastery across systems architecture and applied AI.',
    capabilities: {
      independent: { systems: 3.6, research: 3.7, story: 3.1, prototype: 3.6, facilitation: 3.0, creative: 3.9 },
      assisted: { systems: 3.9, research: 4.0, story: 3.5, prototype: 3.9, facilitation: 3.3, creative: 4.0 }
    },
    trajectory: {
      yoyDelta: 58,
      direction: 'rising',
      velocityRank: 8,
      acquisitionCount: 2,
      recentMilestone: 'Reduced Distributed Pretraining Checkpoint Latency by 42%',
      history: [720, 765, 817, 875]
    },
    cohortPercentiles: {
      global: { independent: 94, assisted: 97 },
      world: { independent: 94, assisted: 97 },
      us: { independent: 92, assisted: 95 },
      ai_ml: { independent: 95, assisted: 97 },
      senior: { independent: 90, assisted: 93 }
    },
    evidenceCount: 25,
    strengths: ['Applied generative AI', 'Research judgment', 'Systems architecture'],
    primaryGap: 'Cross-functional inclusive facilitation',
    observedPractices: [
      'Instruments network packet loss across high-density NVLink fabrics',
      'Validates memory footprint reduction with kernel-level microbenchmarks',
      'Shares reproducible training run logs with open scientific teams'
    ]
  },
  {
    id: 'person-yuki-tanaka',
    name: 'Yuki Tanaka',
    handle: '@ytanaka',
    avatar: 'YT',
    role: 'Junior Infrastructure Engineer',
    organization: 'Tokyo Cloud Operations',
    originCountry: 'Japan',
    workCountry: 'Japan',
    region: 'APAC',
    profession: 'Software Engineering',
    specialty: 'Kubernetes Telemetry & Linux Container Internals',
    experienceLevel: 'Early Career (L3)',
    yearsExperience: 1.5,
    asOf: '2026-09-29',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Junior engineer focused on cloud infrastructure basics. Currently at 18th percentile among software professionals overall, but climbing rapidly through disciplined practice.',
    capabilities: {
      independent: { systems: 2.2, research: 2.4, story: 1.8, prototype: 2.6, facilitation: 2.1, creative: 2.3 },
      assisted: { systems: 2.9, research: 3.1, story: 2.5, prototype: 3.3, facilitation: 2.6, creative: 3.1 }
    },
    trajectory: {
      yoyDelta: 88,
      direction: 'surging',
      velocityRank: 3,
      acquisitionCount: 3,
      recentMilestone: 'Diagnosed Container Memory OOM in Production Canary',
      history: [310, 375, 430, 495]
    },
    cohortPercentiles: {
      global: { independent: 24, assisted: 34 },
      world: { independent: 24, assisted: 34 },
      apac: { independent: 28, assisted: 38 },
      swe: { independent: 18, assisted: 28 }, // Explicit 18th percentile: opportunity surface!
      early: { independent: 62, assisted: 74 }
    },
    evidenceCount: 14,
    strengths: ['Rapid prototyping', 'Research judgment'],
    primaryGap: 'Executive storytelling and multi-system architecture',
    observedPractices: [
      'Documents Linux kernel trace points when debugging container thrashing',
      'Completes weekly 30-minute deliberate practice sprints in Google Docs',
      'Asks senior engineers for rubric-guided reviews on every merged pull request'
    ]
  },
  {
    id: 'person-devin-vance',
    name: 'Devin Vance',
    handle: '@dvance',
    avatar: 'DV',
    role: 'Software Associate',
    organization: 'Midwest Software Solutions',
    originCountry: 'United States',
    workCountry: 'United States',
    region: 'North America',
    profession: 'Software Engineering',
    specialty: 'Web APIs & Database Queries',
    experienceLevel: 'Early Career (L3)',
    yearsExperience: 1,
    asOf: '2026-09-28',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Early-stage developer. Baseline marks place Devin at the 18th percentile in the United States software cohort. A dignified, honest baseline with immense upside and high learning momentum.',
    capabilities: {
      independent: { systems: 1.9, research: 2.1, story: 2.2, prototype: 2.3, facilitation: 2.0, creative: 2.4 },
      assisted: { systems: 2.6, research: 2.8, story: 2.8, prototype: 3.1, facilitation: 2.5, creative: 3.2 }
    },
    trajectory: {
      yoyDelta: 95,
      direction: 'surging',
      velocityRank: 2,
      acquisitionCount: 3,
      recentMilestone: 'Built First End-to-End REST Microservice',
      history: [250, 310, 380, 445]
    },
    cohortPercentiles: {
      global: { independent: 19, assisted: 29 },
      world: { independent: 19, assisted: 29 },
      us: { independent: 18, assisted: 27 }, // Explicit 18th percentile!
      swe: { independent: 14, assisted: 23 },
      early: { independent: 58, assisted: 69 }
    },
    evidenceCount: 12,
    strengths: ['Applied generative AI', 'Rapid prototyping'],
    primaryGap: 'Systems architecture and failure domain mapping',
    observedPractices: [
      'Practices mapping API request lifecycles before writing backend code',
      'Follows Google SRE canary deployment checklists for staging builds',
      'Requests concrete peer reviews against standardized task criteria'
    ]
  },
  {
    id: 'person-samuel-thorne',
    name: 'Samuel Thorne',
    handle: '@sthorne',
    avatar: 'ST',
    role: 'VP & Chief Enterprise Architect',
    organization: 'Global FinCloud Enterprises',
    originCountry: 'Australia',
    workCountry: 'United States',
    region: 'North America',
    profession: 'Software Engineering',
    specialty: 'Enterprise Architecture & Cloud Modernization',
    experienceLevel: 'Director / Fellow (L8+)',
    yearsExperience: 22,
    asOf: '2026-09-27',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'One of the top-ranked practitioners across the global capability landscape. Exceptional breadth across systems, research, executive narrative, and inclusive leadership.',
    capabilities: {
      independent: { systems: 3.8, research: 3.6, story: 3.8, prototype: 3.2, facilitation: 3.9, creative: 3.3 },
      assisted: { systems: 4.0, research: 3.9, story: 4.0, prototype: 3.6, facilitation: 4.0, creative: 3.7 }
    },
    trajectory: {
      yoyDelta: 25,
      direction: 'steady',
      velocityRank: 28,
      acquisitionCount: 1,
      recentMilestone: 'Led 40,000-Seat BeyondCorp Enterprise Migration',
      history: [820, 855, 885, 910]
    },
    cohortPercentiles: {
      global: { independent: 98, assisted: 99 },
      world: { independent: 98, assisted: 99 },
      us: { independent: 97, assisted: 99 },
      swe: { independent: 98, assisted: 99 },
      senior: { independent: 96, assisted: 98 }
    },
    evidenceCount: 38,
    strengths: ['Inclusive facilitation', 'Executive storytelling', 'Systems architecture'],
    primaryGap: 'Edge generative AI prompt engineering',
    observedPractices: [
      'Aligns board-level capital decisions with multi-year technical roadmaps',
      'Protects dissenting voices in architectural review councils',
      'Conducts annual resilience stress-tests on core banking ledgers'
    ]
  },
  {
    id: 'person-arthur-pendelton',
    name: 'Arthur Pendelton',
    handle: '@apendelton',
    avatar: 'AP',
    role: 'Legacy Mainframe & Systems Specialist',
    organization: 'British Heritage Banking',
    originCountry: 'United Kingdom',
    workCountry: 'United Kingdom',
    region: 'EMEA',
    profession: 'Software Engineering',
    specialty: 'Mainframe Systems & High-Reliability Core Banking',
    experienceLevel: 'Senior (L5)',
    yearsExperience: 15,
    asOf: '2026-09-20',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Veteran systems engineer with sparse modern evidence coverage (33% coverage, wide uncertainty of ±95 points). Illustrates how sparse evidence produces wide uncertainty rather than false certainty.',
    capabilities: {
      independent: { systems: 3.7, research: null, story: 2.2, prototype: null, facilitation: 2.1, creative: null },
      assisted: { systems: 3.9, research: null, story: 2.6, prototype: null, facilitation: 2.3, creative: null }
    },
    trajectory: {
      yoyDelta: 15,
      direction: 'steady',
      velocityRank: 35,
      acquisitionCount: 0,
      recentMilestone: 'Migrated 30-Year COBOL Settlement to Linux Emulation',
      history: [620, 640, 660, 675]
    },
    cohortPercentiles: {
      global: { independent: 64, assisted: 70 },
      world: { independent: 64, assisted: 70 },
      emea: { independent: 66, assisted: 72 },
      swe: { independent: 61, assisted: 67 },
      senior: { independent: 52, assisted: 58 }
    },
    evidenceCount: 6,
    strengths: ['Systems architecture'],
    primaryGap: 'Unmapped in Research, Rapid Prototyping, and Generative AI (Sparse Evidence)',
    observedPractices: [
      'Traces mainframe transaction batch bottlenecks with assembly tools',
      'Maintains 99.999% uptime records for overnight clearing runs'
    ]
  },
  {
    id: 'person-ananya-gupta',
    name: 'Ananya Gupta',
    handle: '@agupta',
    avatar: 'AG',
    role: 'AI Research Associate',
    organization: 'Bengaluru Machine Intelligence Labs',
    originCountry: 'India',
    workCountry: 'India',
    region: 'APAC',
    profession: 'AI & ML Research',
    specialty: 'Synthetic Data Generation & Model Evaluation',
    experienceLevel: 'Early Career (L4)',
    yearsExperience: 3,
    asOf: '2026-09-30',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'High-velocity researcher specializing in benchmark contamination detection and synthetic reasoning trajectories for small language models.',
    capabilities: {
      independent: { systems: 2.6, research: 3.2, story: 2.4, prototype: 3.3, facilitation: 2.5, creative: 3.5 },
      assisted: { systems: 3.2, research: 3.8, story: 3.0, prototype: 3.8, facilitation: 2.9, creative: 4.0 }
    },
    trajectory: {
      yoyDelta: 104,
      direction: 'surging',
      velocityRank: 5,
      acquisitionCount: 3,
      recentMilestone: 'Published Contamination Probe for LLM Math Evals',
      history: [420, 500, 570, 635]
    },
    cohortPercentiles: {
      global: { independent: 56, assisted: 67 },
      world: { independent: 56, assisted: 67 },
      apac: { independent: 62, assisted: 72 },
      ai_ml: { independent: 54, assisted: 65 },
      early: { independent: 88, assisted: 94 }
    },
    evidenceCount: 15,
    strengths: ['Applied generative AI', 'Rapid prototyping', 'Research judgment'],
    primaryGap: 'Executive narrative and systems architecture',
    observedPractices: [
      'Executes rigorous permutation testing on synthetic prompt datasets',
      'Tracks evaluation variance across 5 independent random seeds',
      'Designs automated CI/CD evaluation pipelines for LLM fine-tuning'
    ]
  },
  {
    id: 'person-chen-wei',
    name: 'Chen Wei',
    handle: '@cwei',
    avatar: 'CW',
    role: 'Staff Robotics Simulation Engineer',
    organization: 'Pacific Robotics Core',
    originCountry: 'Taiwan',
    workCountry: 'United States',
    region: 'North America',
    profession: 'Software Engineering',
    specialty: 'Physical Simulation, Robotics & Spatial AI',
    experienceLevel: 'Staff (L6)',
    yearsExperience: 11,
    asOf: '2026-09-28',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Connects large foundation models to embodied robotic manipulation. Bridges hardware sensor pipelines with cloud-based reinforcement learning.',
    capabilities: {
      independent: { systems: 3.8, research: 3.6, story: 2.7, prototype: 3.9, facilitation: 2.8, creative: 3.8 },
      assisted: { systems: 4.0, research: 3.9, story: 3.3, prototype: 4.0, facilitation: 3.1, creative: 4.0 }
    },
    trajectory: {
      yoyDelta: 60,
      direction: 'rising',
      velocityRank: 7,
      acquisitionCount: 2,
      recentMilestone: 'Demonstrated Zero-Shot Robot Arm Grasping via Vision-Language Policy',
      history: [720, 770, 825, 870]
    },
    cohortPercentiles: {
      global: { independent: 93, assisted: 96 },
      world: { independent: 93, assisted: 96 },
      us: { independent: 91, assisted: 94 },
      swe: { independent: 92, assisted: 95 },
      senior: { independent: 89, assisted: 92 }
    },
    evidenceCount: 26,
    strengths: ['Rapid prototyping', 'Systems architecture', 'Applied generative AI'],
    primaryGap: 'Executive storytelling and multi-team facilitation',
    observedPractices: [
      'Tests robotic control loops in simulated physics engines before deploying to real actuators',
      'Measures end-to-end perception-to-action latency under strict 20ms boundaries',
      'Publishes open robot simulation environments with standardized task checkpoints'
    ]
  },
  {
    id: 'person-mateo-hernandez',
    name: 'Mateo Hernandez',
    handle: '@mhernandez',
    avatar: 'MH',
    role: 'Senior Full-Stack AI Prototyper',
    organization: 'Oasis Media Systems',
    originCountry: 'Mexico',
    workCountry: 'United States',
    region: 'North America',
    profession: 'Software Engineering',
    specialty: 'Interactive Agent Applications & Streaming UIs',
    experienceLevel: 'Senior (L5)',
    yearsExperience: 6,
    asOf: '2026-09-29',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Builds low-latency streaming user interfaces for multimodal Gemini agents. Fast climber who converts product specs into testable prototypes in hours.',
    capabilities: {
      independent: { systems: 3.1, research: 2.9, story: 3.2, prototype: 3.7, facilitation: 3.1, creative: 3.6 },
      assisted: { systems: 3.6, research: 3.4, story: 3.7, prototype: 4.0, facilitation: 3.4, creative: 4.0 }
    },
    trajectory: {
      yoyDelta: 68,
      direction: 'rising',
      velocityRank: 9,
      acquisitionCount: 3,
      recentMilestone: 'Built Zero-Layout-Shift Streaming Markdown Parser',
      history: [610, 665, 720, 775]
    },
    cohortPercentiles: {
      global: { independent: 82, assisted: 88 },
      world: { independent: 82, assisted: 88 },
      us: { independent: 80, assisted: 86 },
      swe: { independent: 79, assisted: 85 },
      senior: { independent: 73, assisted: 80 }
    },
    evidenceCount: 20,
    strengths: ['Rapid prototyping', 'Applied generative AI', 'Executive storytelling'],
    primaryGap: 'Research judgment and empirical claim triangulation',
    observedPractices: [
      'Benchmarks clientside rendering frame rates with Chrome DevTools MCP',
      'Implements fallback UI states for offline and degraded network connections',
      'Shares weekly interactive prototype recordings with cross-functional stakeholders'
    ]
  },
  {
    id: 'person-aisha-al-nuaimi',
    name: 'Aisha Al-Nuaimi',
    handle: '@aalnuaimi',
    avatar: 'AN',
    role: 'Principal Research Scientist, Foundation Models',
    organization: 'Imperial AI Research Consortium',
    originCountry: 'Saudi Arabia',
    workCountry: 'United Kingdom',
    region: 'EMEA',
    profession: 'AI & ML Research',
    specialty: 'Long-Context Reasoning & Memory Architectures',
    experienceLevel: 'Principal (L7)',
    yearsExperience: 12,
    asOf: '2026-09-30',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Leading researcher in hierarchical attention mechanisms and million-token retrieval fidelity. Published foundational papers on associative transformer memory.',
    capabilities: {
      independent: { systems: 3.6, research: 3.9, story: 3.2, prototype: 3.5, facilitation: 3.2, creative: 3.9 },
      assisted: { systems: 3.9, research: 4.0, story: 3.7, prototype: 3.9, facilitation: 3.5, creative: 4.0 }
    },
    trajectory: {
      yoyDelta: 52,
      direction: 'rising',
      velocityRank: 10,
      acquisitionCount: 2,
      recentMilestone: '10M Token Needle-in-a-Haystack Retrieval with 99.8% Accuracy',
      history: [750, 798, 850, 895]
    },
    cohortPercentiles: {
      global: { independent: 96, assisted: 98 },
      world: { independent: 96, assisted: 98 },
      emea: { independent: 97, assisted: 99 },
      ai_ml: { independent: 97, assisted: 99 },
      senior: { independent: 93, assisted: 96 }
    },
    evidenceCount: 29,
    strengths: ['Research judgment', 'Applied generative AI', 'Systems architecture'],
    primaryGap: 'Inclusive team facilitation across non-technical peers',
    observedPractices: [
      'Tests retrieval accuracy under synthetic noisy needle distributions',
      'Verifies computational complexity with mathematical proofs and kernel traces',
      'Replicates external peer-reviewed claims before accepting baseline numbers'
    ]
  },
  {
    id: 'person-jesper-lindqvist',
    name: 'Jesper Lindqvist',
    handle: '@jlindqvist',
    avatar: 'JL',
    role: 'Site Reliability Engineer',
    organization: 'Nordic Cloud Infrastructure',
    originCountry: 'Sweden',
    workCountry: 'Sweden',
    region: 'EMEA',
    profession: 'Software Engineering',
    specialty: 'Kubernetes Platform Reliability & Chaos Testing',
    experienceLevel: 'Senior (L5)',
    yearsExperience: 8,
    asOf: '2026-09-24',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Pragmatic SRE maintaining high-availability cloud platforms. Strong in systems and facilitation, deliberately improving research judgment.',
    capabilities: {
      independent: { systems: 3.7, research: 3.0, story: 2.6, prototype: 3.0, facilitation: 3.1, creative: 2.7 },
      assisted: { systems: 3.9, research: 3.5, story: 3.1, prototype: 3.5, facilitation: 3.4, creative: 3.5 }
    },
    trajectory: {
      yoyDelta: 30,
      direction: 'steady',
      velocityRank: 24,
      acquisitionCount: 1,
      recentMilestone: 'Automated Regional Failover for 500+ Pod Clusters',
      history: [670, 700, 725, 745]
    },
    cohortPercentiles: {
      global: { independent: 78, assisted: 84 },
      world: { independent: 78, assisted: 84 },
      emea: { independent: 80, assisted: 86 },
      swe: { independent: 75, assisted: 81 },
      senior: { independent: 68, assisted: 75 }
    },
    evidenceCount: 19,
    strengths: ['Systems architecture', 'Inclusive facilitation'],
    primaryGap: 'Executive storytelling and compressed trade-off decks',
    observedPractices: [
      'Validates all alerting rules against actual historical outage replay logs',
      'Automates canary rollback triggers tied directly to error budget burns',
      'Maintains readable architecture diagrams updated via GitOps automation'
    ]
  },
  {
    id: 'person-zoe-brooks',
    name: 'Zoe Brooks',
    handle: '@zbrooks',
    avatar: 'ZB',
    role: 'Staff Developer Relations Strategist',
    organization: 'Cloud Developer Ecosystems',
    originCountry: 'United Kingdom',
    workCountry: 'United States',
    region: 'North America',
    profession: 'Product Management',
    specialty: 'Technical Documentation & Developer Storytelling',
    experienceLevel: 'Senior (L5)',
    yearsExperience: 8,
    asOf: '2026-09-28',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Excels at translating dense technical architecture into crystal-clear developer documentation, tutorials, and keynotes.',
    capabilities: {
      independent: { systems: 2.4, research: 3.1, story: 3.9, prototype: 3.0, facilitation: 3.6, creative: 3.1 },
      assisted: { systems: 3.0, research: 3.6, story: 4.0, prototype: 3.6, facilitation: 3.8, creative: 3.8 }
    },
    trajectory: {
      yoyDelta: 34,
      direction: 'steady',
      velocityRank: 23,
      acquisitionCount: 1,
      recentMilestone: 'Redesigned SDK Quickstart Guides with 40% Retention Gain',
      history: [660, 690, 715, 740]
    },
    cohortPercentiles: {
      global: { independent: 77, assisted: 83 },
      world: { independent: 77, assisted: 83 },
      us: { independent: 75, assisted: 81 },
      product: { independent: 85, assisted: 90 },
      senior: { independent: 67, assisted: 74 }
    },
    evidenceCount: 18,
    strengths: ['Executive storytelling', 'Inclusive facilitation', 'Research judgment'],
    primaryGap: 'Distributed systems backend fault tolerance',
    observedPractices: [
      'Tests developer documentation with fresh engineers before publication',
      'Maintains runnable sample repositories verified by daily automated CI',
      'Delivers concise 90-second technical explanations of complex APIs'
    ]
  },
  {
    id: 'person-nadia-chernoff',
    name: 'Nadia Chernoff',
    handle: '@nchernoff',
    avatar: 'NC',
    role: 'Staff Distributed Database Architect',
    organization: 'WarpDB Global',
    originCountry: 'Ukraine',
    workCountry: 'Poland',
    region: 'EMEA',
    profession: 'Software Engineering',
    specialty: 'Distributed Storage, Raft & Multi-Raft Partitioning',
    experienceLevel: 'Staff (L6)',
    yearsExperience: 12,
    asOf: '2026-09-29',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Designs distributed Raft engines capable of sustained 1M writes/second. High systems depth and strong research validation.',
    capabilities: {
      independent: { systems: 3.9, research: 3.5, story: 2.9, prototype: 3.3, facilitation: 3.0, creative: 3.1 },
      assisted: { systems: 4.0, research: 3.8, story: 3.4, prototype: 3.7, facilitation: 3.3, creative: 3.7 }
    },
    trajectory: {
      yoyDelta: 36,
      direction: 'rising',
      velocityRank: 20,
      acquisitionCount: 1,
      recentMilestone: 'Implemented Multi-Raft Range Splitting with Zero Stall',
      history: [740, 775, 808, 835]
    },
    cohortPercentiles: {
      global: { independent: 91, assisted: 94 },
      world: { independent: 91, assisted: 94 },
      emea: { independent: 93, assisted: 96 },
      swe: { independent: 90, assisted: 93 },
      senior: { independent: 86, assisted: 90 }
    },
    evidenceCount: 25,
    strengths: ['Systems architecture', 'Research judgment', 'Rapid prototyping'],
    primaryGap: 'Executive board-level storytelling',
    observedPractices: [
      'Fuzzes Raft consensus protocol transitions under simulated split-brain conditions',
      'Measures tail latency ($p99.9$) across geodistributed disk write barriers',
      'Designs clean API boundaries for transactional storage engines'
    ]
  },
  {
    id: 'person-fatima-zahra',
    name: 'Fatima Zahra',
    handle: '@fzahra',
    avatar: 'FZ',
    role: 'Principal FinTech Security Architect',
    organization: 'Banque d’Europe Digitale',
    originCountry: 'Morocco',
    workCountry: 'France',
    region: 'EMEA',
    profession: 'Software Engineering',
    specialty: 'Payment Rail Cryptography & Zero-Trust Governance',
    experienceLevel: 'Principal (L7)',
    yearsExperience: 14,
    asOf: '2026-09-27',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Directs cryptographic payment rail architectures compliant with PSD3 and BeyondCorp zero-trust perimeters. Well-rounded leader with strong systems foundation.',
    capabilities: {
      independent: { systems: 3.7, research: 3.4, story: 3.1, prototype: 3.4, facilitation: 3.2, creative: 3.2 },
      assisted: { systems: 3.9, research: 3.8, story: 3.6, prototype: 3.8, facilitation: 3.5, creative: 3.8 }
    },
    trajectory: {
      yoyDelta: 42,
      direction: 'rising',
      velocityRank: 16,
      acquisitionCount: 2,
      recentMilestone: 'Hardened Payment Gateway to Quantum-Resistant Key Exchange',
      history: [710, 750, 785, 815]
    },
    cohortPercentiles: {
      global: { independent: 89, assisted: 93 },
      world: { independent: 89, assisted: 93 },
      emea: { independent: 91, assisted: 94 },
      swe: { independent: 87, assisted: 91 },
      senior: { independent: 83, assisted: 88 }
    },
    evidenceCount: 23,
    strengths: ['Systems architecture', 'Research judgment', 'Rapid prototyping'],
    primaryGap: 'Applied generative AI fine-tuning',
    observedPractices: [
      'Conducts formal security audits of cryptographic key management workflows',
      'Enforces mutual TLS and Hardware Security Module (HSM) signing on all transactions',
      'Communicates compliance risks clearly to banking executive boards'
    ]
  },
  {
    id: 'person-lukas-weber',
    name: 'Lukas Weber',
    handle: '@lweber',
    avatar: 'LW',
    role: 'Cloud Infrastructure Engineer',
    organization: 'Berlin Cloud Works',
    originCountry: 'Germany',
    workCountry: 'Germany',
    region: 'EMEA',
    profession: 'Software Engineering',
    specialty: 'Terraform, Cloud Networking & BGP Routing',
    experienceLevel: 'Senior (L5)',
    yearsExperience: 7,
    asOf: '2026-09-26',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Dedicated infrastructure engineer specializing in software-defined networking and BGP routing across European datacenters.',
    capabilities: {
      independent: { systems: 3.4, research: 3.1, story: 2.5, prototype: 3.1, facilitation: 2.7, creative: 2.8 },
      assisted: { systems: 3.7, research: 3.5, story: 3.0, prototype: 3.5, facilitation: 3.0, creative: 3.4 }
    },
    trajectory: {
      yoyDelta: 55,
      direction: 'rising',
      velocityRank: 11,
      acquisitionCount: 2,
      recentMilestone: 'Automated Multi-Region Transit Gateway with Zero Packet Drop',
      history: [610, 650, 685, 710]
    },
    cohortPercentiles: {
      global: { independent: 72, assisted: 79 },
      world: { independent: 72, assisted: 79 },
      emea: { independent: 75, assisted: 81 },
      swe: { independent: 69, assisted: 76 },
      senior: { independent: 60, assisted: 68 }
    },
    evidenceCount: 18,
    strengths: ['Systems architecture', 'Research judgment'],
    primaryGap: 'Executive storytelling and cross-functional facilitation',
    observedPractices: [
      'Simulates BGP route flap dampening in virtual network topologies',
      'Validates Infrastructure as Code (IaC) with automated policy-as-code linters',
      'Documents network topology changes with automated GitOps change logs'
    ]
  },
  {
    id: 'person-sofia-rossi',
    name: 'Sofia Rossi',
    handle: '@srossi',
    avatar: 'SR',
    role: 'Senior Product Strategist',
    organization: 'Milano Innovation Group',
    originCountry: 'Italy',
    workCountry: 'United Kingdom',
    region: 'EMEA',
    profession: 'Product Management',
    specialty: 'User Research & Discovery Sprints',
    experienceLevel: 'Senior (L5)',
    yearsExperience: 8,
    asOf: '2026-09-27',
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    bio: 'Product strategist focused on qualitative discovery, user research synthesis, and executive trade-off decks.',
    capabilities: {
      independent: { systems: 2.5, research: 3.4, story: 3.6, prototype: 3.2, facilitation: 3.5, creative: 3.0 },
      assisted: { systems: 3.0, research: 3.8, story: 4.0, prototype: 3.6, facilitation: 3.8, creative: 3.7 }
    },
    trajectory: {
      yoyDelta: 40,
      direction: 'rising',
      velocityRank: 17,
      acquisitionCount: 2,
      recentMilestone: 'Conducted 50-User Generative AI Workflow Discovery Sprint',
      history: [660, 698, 735, 765]
    },
    cohortPercentiles: {
      global: { independent: 80, assisted: 86 },
      world: { independent: 80, assisted: 86 },
      emea: { independent: 83, assisted: 89 },
      product: { independent: 88, assisted: 93 },
      senior: { independent: 72, assisted: 79 }
    },
    evidenceCount: 19,
    strengths: ['Executive storytelling', 'Inclusive facilitation', 'Research judgment'],
    primaryGap: 'Deep systems architecture and infrastructure modeling',
    observedPractices: [
      'Triangulates qualitative interview themes with quantitative telemetry',
      'Leads structured socratic design alignment workshops in Google Docs',
      'Frames high-stakes product bets with explicit hypothesis falsification criteria'
    ]
  }
];

// Helper to look up synthetic person
export const personById = id => syntheticPeople.find(p => p.id === id);

// ============================================================================
// CORE METRICS ENGINE: Becoming Index (0-1000), Coverage & Uncertainty
// ============================================================================

/**
 * Calculates Becoming Index (0-1000 scale) from measured capabilities.
 * "Unknown is not zero": untested or sparse dimensions are omitted from average, NOT assigned zero!
 */
export function computeBecomingIndex(capabilities, mode = 'independent') {
  if (!capabilities || !capabilities[mode]) {
    return { index: null, measuredCount: 0, totalCount: 6, averageMark: null, dimensions: [] };
  }
  const modeCaps = capabilities[mode];
  const measured = [];
  
  for (const s of skills) {
    const mark = modeCaps[s.id];
    if (typeof mark === 'number' && Number.isFinite(mark) && mark >= 0) {
      measured.push({
        id: s.id,
        name: s.name,
        category: s.category,
        mark,
        indexContribution: Math.round(mark * 250) // Scale 0-4.0 to 0-1000
      });
    }
  }

  if (measured.length === 0) {
    return { index: null, measuredCount: 0, totalCount: 6, averageMark: null, dimensions: [] };
  }

  const averageMark = measured.reduce((sum, d) => sum + d.mark, 0) / measured.length;
  const index = Math.round(averageMark * 250);

  return {
    index,
    measuredCount: measured.length,
    totalCount: 6,
    averageMark: Math.round(averageMark * 100) / 100,
    dimensions: measured
  };
}

/**
 * Calculates Evidence Coverage percentage (0-100).
 */
export function computeEvidenceCoverage(capabilities, mode = 'independent') {
  if (!capabilities || !capabilities[mode]) return 0;
  const modeCaps = capabilities[mode];
  let measuredCount = 0;
  for (const s of skills) {
    const val = modeCaps[s.id];
    if (typeof val === 'number' && Number.isFinite(val) && val >= 0) {
      measuredCount++;
    }
  }
  return Math.round((measuredCount / skills.length) * 100);
}

/**
 * Calculates Uncertainty Interval (+/- points) and Confidence Tier.
 * Higher coverage and larger demonstration count produce tighter confidence intervals.
 */
export function computeUncertainty(evidenceCount = 10, coverage = 80) {
  const safeCount = Math.max(1, Number(evidenceCount) || 1);
  const safeCoverage = Math.min(100, Math.max(0, Number(coverage) || 0));
  
  // Standard error formula scaled to index points
  const coveragePenalty = 80 * (1 - safeCoverage / 100);
  const samplePenalty = 120 / Math.sqrt(safeCount + 1);
  const interval = Math.round(coveragePenalty + samplePenalty);

  let tier = 'High';
  if (safeCoverage < 50 || safeCount < 8) {
    tier = 'Preliminary / Wide Interval';
  } else if (safeCoverage < 80 || safeCount < 16) {
    tier = 'Moderate';
  }

  return {
    interval,
    tier,
    sampleSize: safeCount,
    coverage: safeCoverage
  };
}

/**
 * Constructs the dignified, unsoftened Opportunity Surface statement.
 * "Never soften a valid comparison. Never manufacture an invalid one."
 */
export function getOpportunitySurface(score, percentileValue, dimensionOrCohortName = 'Software Professionals', primaryGap = null) {
  if (percentileValue === null || percentileValue === undefined) {
    return {
      percentile: null,
      message: 'Assessment withheld: insufficient demonstration evidence. Unknown is not zero.',
      status: 'unmapped'
    };
  }

  const p = Math.round(percentileValue);
  let guidance = '';
  
  if (p <= 25) {
    guidance = `${p}th percentile in ${dimensionOrCohortName}. Most comparable participants currently demonstrate stronger performance here. The nearest measurable difference is ${primaryGap || 'foundational systems mapping'}. Here are people slightly ahead whose shared practices may illuminate the next level.`;
  } else if (p <= 50) {
    guidance = `${p}th percentile in ${dimensionOrCohortName}. Developing foundational proficiency. Comparable participants demonstrate higher consistency in peer-verified demonstrations. Focus on ${primaryGap || 'deliberate practice sprints'}.`;
  } else if (p <= 75) {
    guidance = `${p}th percentile in ${dimensionOrCohortName}. Strong established baseline above median. The next threshold requires demonstrating transfer under novel constraints.`;
  } else if (p <= 90) {
    guidance = `${p}th percentile in ${dimensionOrCohortName}. Top-quartile performance across verified participants. Leads in core practices; next level involves cross-functional multiplication.`;
  } else {
    guidance = `${p}th percentile in ${dimensionOrCohortName}. Exceptional verified demonstration mastery. Operates at the frontier of current benchmark cohorts.`;
  }

  return {
    percentile: p,
    message: guidance,
    status: p <= 25 ? 'opportunity_surface' : p <= 50 ? 'emerging' : 'established'
  };
}

// ============================================================================
// DYNAMIC LOCAL USER STATE JOIN
// ============================================================================

/**
 * Builds a dynamic Person object for the active user ("You" / Alex Rivera)
 * connecting local evidence state to the world population.
 */
export function getActiveUserPerson(state) {
  const caps = { independent: {}, assisted: {} };
  let totalEvidence = 0;

  for (const mode of ['independent', 'assisted']) {
    for (const s of skills) {
      const est = estimate(state, s.id, mode);
      caps[mode][s.id] = est.score; // will be number or null
      if (mode === state.mode && est.n > 0) totalEvidence += est.n;
    }
  }

  const indepIndex = computeBecomingIndex(caps, 'independent').index || 642;
  const assistIndex = computeBecomingIndex(caps, 'assisted').index || 750;
  const indepCoverage = computeEvidenceCoverage(caps, 'independent');
  const assistCoverage = computeEvidenceCoverage(caps, 'assisted');

  return {
    id: 'person-you',
    name: 'Alex Rivera (You)',
    handle: '@arivera',
    avatar: 'AR',
    role: 'Enterprise AI Strategist (Active Session)',
    organization: 'Acme Global · Gemini Enterprise',
    originCountry: 'United States',
    workCountry: 'United States',
    region: 'North America',
    profession: 'Software Engineering',
    specialty: 'Applied GenAI & Strategic Architecture',
    experienceLevel: 'Mid-Level (L4)',
    yearsExperience: 5,
    asOf: new Date().toISOString().slice(0, 10),
    synthetic: true,
    verificationTier: 'synthetic_benchmark_fixture',
    isLocalUser: true,
    bio: 'Your active living capability profile, updated dynamically through verified demonstrations in Google Workspace and Gemini check-ins.',
    capabilities: caps,
    trajectory: {
      yoyDelta: 54,
      direction: 'rising',
      velocityRank: 13,
      acquisitionCount: 2,
      recentMilestone: 'Completed Systems Architecture Sprint in Google Docs',
      history: [520, 568, 605, indepIndex]
    },
    cohortPercentiles: {
      global: { independent: 68, assisted: 77 },
      world: { independent: 68, assisted: 77 },
      us: { independent: 81, assisted: 87 },
      swe: { independent: 59, assisted: 68 },
      senior: { independent: 43, assisted: 52 }
    },
    evidenceCount: Math.max(15, totalEvidence),
    strengths: ['Systems architecture', 'Executive storytelling'],
    primaryGap: 'Research judgment in ambiguous multi-source decisions',
    observedPractices: [
      'Frames operational challenge in Google Docs before drafting solutions',
      'Conducts 90-second executive trade-off walkthroughs with team peers',
      'Verifies generative AI prompt chains with test evaluation criteria'
    ]
  };
}

/**
 * Returns complete population including active local user.
 */
export function getAllPeople(state = null) {
  if (state && isState(state)) {
    return [getActiveUserPerson(state), ...syntheticPeople];
  }
  return [...syntheticPeople];
}

// ============================================================================
// HUMAN NEIGHBORHOODS ENGINE: People Just Ahead & Attainable Steps
// ============================================================================

/**
 * Computes Human Neighborhood for a person:
 * - Person immediately above
 * - Nearby people within +/- 2%
 * - Next meaningful percentile threshold (e.g. P50, P75, P90)
 * - Fast climbers nearby
 * - Similar profiles with different outcomes
 * - Observable next attainable steps
 */
export function getNeighborhood(personId, dimensionOrComposite = 'composite', mode = 'independent', cohortId = 'world', state = null) {
  const people = getAllPeople(state);
  const target = people.find(p => p.id === personId) || people[0];

  // Helper to extract score
  const getScore = p => {
    if (dimensionOrComposite === 'composite') {
      const b = computeBecomingIndex(p.capabilities, mode);
      return b.index;
    }
    const val = p.capabilities?.[mode]?.[dimensionOrComposite];
    return typeof val === 'number' ? Math.round(val * 250) : null;
  };

  // Sort people with valid scores descending
  const scored = people
    .map(p => ({ person: p, score: getScore(p) }))
    .filter(x => x.score !== null)
    .sort((a, b) => b.score - a.score);

  const total = scored.length;
  const targetIdx = scored.findIndex(x => x.person.id === target.id);
  const targetScore = targetIdx >= 0 ? scored[targetIdx].score : getScore(target);

  const targetPercentile = targetIdx >= 0 ? Math.round((100 * (total - 1 - targetIdx + 0.5)) / total) : 50;

  // Person immediately above
  const immediatelyAbove = targetIdx > 0 ? scored[targetIdx - 1].person : null;
  const immediatelyBelow = targetIdx >= 0 && targetIdx < total - 1 ? scored[targetIdx + 1].person : null;

  // Nearby cluster (+/- 2 positions or +/- 25 index points)
  const nearbyCluster = scored
    .filter((x, idx) => idx !== targetIdx && Math.abs(x.score - targetScore) <= 35)
    .map(x => x.person)
    .slice(0, 4);

  // Next meaningful threshold gate
  let nextGate = 75;
  if (targetPercentile < 50) nextGate = 50;
  else if (targetPercentile < 75) nextGate = 75;
  else if (targetPercentile < 90) nextGate = 90;
  else nextGate = 99;

  const gateIndexRequired = Math.round(250 + (nextGate / 100) * 650);
  const gapPoints = Math.max(0, gateIndexRequired - targetScore);

  // Fast climbers nearby (YoY delta >= 40)
  const fastClimbersNearby = scored
    .filter(x => x.person.id !== target.id && x.person.trajectory?.yoyDelta >= 40)
    .map(x => x.person)
    .slice(0, 3);

  // Concrete attainable steps from person immediately above
  const attainableSteps = immediatelyAbove?.observedPractices?.length
    ? immediatelyAbove.observedPractices
    : [
        'Model system failure domains explicitly in Google Docs before committing code',
        'Record structured 90-second executive summaries of key architectural trade-offs',
        'Run reproducible evaluation fixtures against adversarial edge test cases'
      ];

  return {
    target,
    targetScore,
    targetPercentile,
    immediatelyAbove,
    immediatelyBelow,
    nearbyCluster,
    nextThreshold: {
      percentileGate: nextGate,
      requiredIndex: gateIndexRequired,
      gapPoints,
      explanation: `${gapPoints} index points separated from the P${nextGate} milestone.`
    },
    fastClimbersNearby,
    attainableSteps,
    opportunitySummary: getOpportunitySurface(targetScore, targetPercentile, 'Cohort Population', target.primaryGap)
  };
}

// ============================================================================
// HEAD-TO-HEAD COMPARE ENGINE: Objective Demonstrated Dimensions
// ============================================================================

/**
 * Performs deep person-to-person comparison.
 * Never invents psychological explanations; sticks strictly to demonstrated dimensions and practices.
 */
export function comparePeople(personAId, personBId, modeA = 'independent', modeB = 'independent', cohortId = 'world', state = null) {
  const people = getAllPeople(state);
  const personA = people.find(p => p.id === personAId) || people[0];
  const personB = people.find(p => p.id === personBId) || (people[1] || people[0]);

  const indexA = computeBecomingIndex(personA.capabilities, modeA);
  const indexB = computeBecomingIndex(personB.capabilities, modeB);

  const coverageA = computeEvidenceCoverage(personA.capabilities, modeA);
  const coverageB = computeEvidenceCoverage(personB.capabilities, modeB);

  const uncertaintyA = computeUncertainty(personA.evidenceCount, coverageA);
  const uncertaintyB = computeUncertainty(personB.evidenceCount, coverageB);

  const isModeCompatible = modeA === modeB;
  const compatibilityNotice = isModeCompatible
    ? null
    : `Assistance Condition Divergence: ${personA.name} is measured under "${modeA === 'independent' ? 'Independent Human' : 'Gemini Enterprise'}", while ${personB.name} is measured under "${modeB === 'independent' ? 'Independent Human' : 'Gemini Enterprise'}". Direct comparisons are most valid under identical conditions.`;

  // Dimension-by-dimension comparison
  const dimensionDiffs = [];
  const dimensionsALeads = [];
  const dimensionsBLeads = [];
  const tiedDimensions = [];

  for (const s of skills) {
    const valA = personA.capabilities?.[modeA]?.[s.id] ?? null;
    const valB = personB.capabilities?.[modeB]?.[s.id] ?? null;

    let delta = null;
    let lead = 'unmapped';

    if (valA !== null && valB !== null) {
      delta = Math.round((valA - valB) * 10) / 10;
      if (delta >= 0.2) {
        lead = 'A';
        dimensionsALeads.push({ skill: s, delta, valA, valB });
      } else if (delta <= -0.2) {
        lead = 'B';
        dimensionsBLeads.push({ skill: s, delta: Math.abs(delta), valA, valB });
      } else {
        lead = 'tied';
        tiedDimensions.push({ skill: s, valA, valB });
      }
    }

    dimensionDiffs.push({
      skillId: s.id,
      name: s.name,
      category: s.category,
      color: s.color,
      scoreA: valA,
      scoreB: valB,
      delta,
      lead
    });
  }

  // Objective gap narrative grounded strictly in demonstrated evidence
  let gapExplanation = '';
  if (dimensionsALeads.length > 0 && dimensionsBLeads.length > 0) {
    const topA = dimensionsALeads[0];
    const topB = dimensionsBLeads[0];
    gapExplanation = `Most of the measured difference between ${personA.name} and ${personB.name} comes from ${topA.skill.name} (${personA.name} leads by +${topA.delta.toFixed(1)}) and ${topB.skill.name} (${personB.name} leads by +${topB.delta.toFixed(1)}). Neither profile demonstrates psychological attributes; all comparisons reflect verified rubric demonstrations.`;
  } else if (dimensionsALeads.length > 0) {
    const topA = dimensionsALeads[0];
    gapExplanation = `${personA.name} demonstrates higher verified marks across ${dimensionsALeads.length} dimension(s), with the primary difference in ${topA.skill.name} (+${topA.delta.toFixed(1)}).`;
  } else if (dimensionsBLeads.length > 0) {
    const topB = dimensionsBLeads[0];
    gapExplanation = `${personB.name} demonstrates higher verified marks across ${dimensionsBLeads.length} dimension(s), with the primary difference in ${topB.skill.name} (+${topB.delta.toFixed(1)}).`;
  } else {
    gapExplanation = `Both profiles demonstrate closely matched performance within standard measurement tolerance across all tested dimensions.`;
  }

  return {
    personA,
    personB,
    modeA,
    modeB,
    isModeCompatible,
    compatibilityNotice,
    indexA: indexA.index,
    indexB: indexB.index,
    coverageA,
    coverageB,
    uncertaintyA,
    uncertaintyB,
    trajectoryA: personA.trajectory,
    trajectoryB: personB.trajectory,
    dimensionDiffs,
    dimensionsALeads,
    dimensionsBLeads,
    tiedDimensions,
    gapExplanation
  };
}

// ============================================================================
// LEADERBOARDS & DISCOVERY ENGINE: Trajectory as First-Class Dimension
// ============================================================================

/**
 * Returns filtered, sorted population according to selected leaderboard mode:
 * - overall: Becoming Index (0-1000)
 * - velocity: 1-Year YoY Improvement (+pts YoY)
 * - emerging: High trajectory relative to experience level
 * - rare_combinations: Unusual pairings of strengths (e.g. Systems + Storytelling)
 * - breadth: Balanced high marks across all dimensions (polymath)
 * - depth: Maximum mastery in core specialty
 */
export function getLeaderboard(mode = 'independent', cohortId = 'world', sortBy = 'overall', filterText = '', state = null) {
  const allPeople = getAllPeople(state);
  const q = String(filterText || '').trim().toLowerCase();

  // Filter cohort
  let cohortFiltered = allPeople.filter(p => {
    if (cohortId === 'world' || cohortId === 'global') return true;
    if (cohortId === 'us') return p.workCountry === 'United States' || p.originCountry === 'United States';
    if (cohortId === 'emea') return p.region === 'EMEA';
    if (cohortId === 'apac') return p.region === 'APAC';
    if (cohortId === 'latam') return p.region === 'LATAM';
    if (cohortId === 'swe') return p.profession === 'Software Engineering';
    if (cohortId === 'ai_ml') return p.profession === 'AI & ML Research';
    if (cohortId === 'product') return p.profession === 'Product Management';
    if (cohortId === 'senior') return p.yearsExperience >= 7;
    if (cohortId === 'early') return p.yearsExperience <= 3;
    if (cohortId === 'national') return true; // partner demo
    if (cohortId === 'circle') return p.id === 'person-elena-rostova' || p.id === 'person-you'; // small withheld
    return true;
  });

  // Text search
  if (q) {
    cohortFiltered = cohortFiltered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.role.toLowerCase().includes(q) ||
      p.organization.toLowerCase().includes(q) ||
      p.specialty.toLowerCase().includes(q) ||
      p.originCountry.toLowerCase().includes(q) ||
      p.workCountry.toLowerCase().includes(q)
    );
  }

  // Calculate scores for sorting
  const withScores = cohortFiltered.map(p => {
    const b = computeBecomingIndex(p.capabilities, mode);
    const cov = computeEvidenceCoverage(p.capabilities, mode);
    const uncert = computeUncertainty(p.evidenceCount, cov);
    const marks = Object.values(p.capabilities?.[mode] || {}).filter(v => typeof v === 'number');
    const minMark = marks.length ? Math.min(...marks) : 0;
    const maxMark = marks.length ? Math.max(...marks) : 0;
    
    // Rare combination check: Systems >= 3.4 and Story >= 3.4
    const sys = p.capabilities?.[mode]?.systems || 0;
    const sty = p.capabilities?.[mode]?.story || 0;
    const rareScore = (sys >= 3.4 && sty >= 3.4) ? (sys + sty) : 0;

    return {
      person: p,
      index: b.index || 0,
      coverage: cov,
      uncertainty: uncert.interval,
      yoyDelta: p.trajectory?.yoyDelta || 0,
      minMark,
      maxMark,
      rareScore
    };
  });

  // Sorting
  withScores.sort((a, b) => {
    if (sortBy === 'velocity') {
      return b.yoyDelta - a.yoyDelta;
    }
    if (sortBy === 'emerging') {
      // High velocity relative to tenure
      const ratioA = a.yoyDelta / Math.max(1, a.person.yearsExperience);
      const ratioB = b.yoyDelta / Math.max(1, b.person.yearsExperience);
      return ratioB - ratioA;
    }
    if (sortBy === 'rare_combinations') {
      if (b.rareScore !== a.rareScore) return b.rareScore - a.rareScore;
      return b.index - a.index;
    }
    if (sortBy === 'breadth') {
      // Highest floor across dimensions
      if (b.minMark !== a.minMark) return b.minMark - a.minMark;
      return b.index - a.index;
    }
    if (sortBy === 'depth') {
      // Highest ceiling in primary specialty
      if (b.maxMark !== a.maxMark) return b.maxMark - a.maxMark;
      return b.index - a.index;
    }
    // Default: Overall Becoming Index
    return b.index - a.index;
  });

  const totalCohort = withScores.length;
  return withScores.map((item, idx) => {
    const rank = idx + 1;
    const percentile = Math.round((100 * (totalCohort - rank + 0.5)) / totalCohort);
    return {
      ...item,
      rank,
      percentile,
      opportunitySurface: getOpportunitySurface(item.index, percentile, cohorts.find(c => c.id === cohortId)?.label || 'Cohort', item.person.primaryGap)
    };
  });
}

/**
 * Pattern Observatory queries:
 * Uncovers systemic capability insights across the population.
 */
export function discoverPatterns(peopleList = syntheticPeople, mode = 'independent') {
  const list = peopleList.length ? peopleList : syntheticPeople;

  // Distinguishing skills of top 10%
  const sorted = [...list].sort((a, b) => {
    const sA = computeBecomingIndex(a.capabilities, mode).index || 0;
    const sB = computeBecomingIndex(b.capabilities, mode).index || 0;
    return sB - sA;
  });

  const topCount = Math.max(1, Math.round(sorted.length * 0.15));
  const top10 = sorted.slice(0, topCount);
  const bottom50 = sorted.slice(Math.round(sorted.length * 0.5));

  const skillGaps = skills.map(s => {
    const topAvg = top10.reduce((sum, p) => sum + (p.capabilities?.[mode]?.[s.id] || 0), 0) / top10.length;
    const botAvg = bottom50.reduce((sum, p) => sum + (p.capabilities?.[mode]?.[s.id] || 0), 0) / bottom50.length;
    return {
      skill: s,
      topAvg: Math.round(topAvg * 10) / 10,
      botAvg: Math.round(botAvg * 10) / 10,
      gap: Math.round((topAvg - botAvg) * 10) / 10
    };
  }).sort((a, b) => b.gap - a.gap);

  // Rare combinations
  const rareCombinations = list.filter(p => {
    const sys = p.capabilities?.[mode]?.systems || 0;
    const sty = p.capabilities?.[mode]?.story || 0;
    return sys >= 3.4 && sty >= 3.4;
  });

  // Fast climbers (YoY delta >= 50)
  const fastClimbers = list
    .filter(p => p.trajectory?.yoyDelta >= 50)
    .sort((a, b) => b.trajectory.yoyDelta - a.trajectory.yoyDelta);

  return {
    topDifferentiatingSkill: skillGaps[0],
    skillGaps,
    rareCombinations,
    fastClimbers
  };
}

// ============================================================================
// PRESERVED LOCAL STATE, EVIDENCE REVIEWS & PERMISSION ENGINE
// ============================================================================

export function initialState() {
  const evidence = skills.flatMap((s, si) =>
    ['independent', 'assisted'].flatMap(mode =>
      s.marks.map((mark, i) => ({
        id: `seed-${s.id}-${mode}-${i}`,
        skill: s.id,
        source: s.source,
        mode,
        mark: mode === 'assisted' ? Math.min(4, mark + 1) : mark,
        rubric: RUBRIC,
        status: 'accepted',
        title: [s.practice, `Analyze trade-offs: ${s.name}`, `Enterprise transfer: ${s.name}`][i],
        date: `2026-09-${String(12 + si + i).padStart(2, '0')}`,
        synthetic: true
      }))
    )
  );

  evidence.push({
    id: 'candidate-story',
    skill: 'story',
    source: 'practice',
    mode: 'independent',
    mark: 3,
    rubric: RUBRIC,
    status: 'pending',
    title: 'A 90-second executive walkthrough of a complex system',
    date: '2026-09-30',
    synthetic: true
  });

  return {
    version: VERSION,
    goal: 'product',
    mode: 'independent',
    cohort: 'world',
    benchmarkVisible: true,
    sources: { projects: true, portfolio: true, practice: true },
    evidence,
    adopted: [],
    projects: [
      {
        id: 'project-research',
        skill: 'research',
        title: 'Make a decision from conflicting evidence',
        minutes: 30,
        steps: [true, false, false],
        status: 'active',
        reflection: '',
        origin: null
      }
    ],
    audit: []
  };
}

export function isState(value) {
  return (
    !!value &&
    (value.version === VERSION || value.version === 1) &&
    goals.some(g => g.id === value.goal) &&
    ['independent', 'assisted'].includes(value.mode) &&
    cohorts.some(c => c.id === value.cohort) &&
    typeof value.benchmarkVisible === 'boolean' &&
    sources.every(s => typeof value.sources?.[s.id] === 'boolean') &&
    Array.isArray(value.evidence) &&
    value.evidence.length < 1000 &&
    value.evidence.every(
      e =>
        skillById(e.skill) &&
        sources.some(s => s.id === e.source) &&
        ['pending', 'accepted', 'rejected'].includes(e.status) &&
        ['independent', 'assisted'].includes(e.mode) &&
        Number.isInteger(e.mark) &&
        e.mark >= 0 &&
        e.mark <= 4 &&
        (e.rubric === RUBRIC || e.rubric === RUBRIC_LEGACY) &&
        e.synthetic === true &&
        typeof e.id === 'string' &&
        typeof e.title === 'string'
    ) &&
    Array.isArray(value.projects) &&
    value.projects.length < 100 &&
    value.projects.every(
      p =>
        skillById(p.skill) &&
        typeof p.id === 'string' &&
        typeof p.title === 'string' &&
        p.title.length <= 120 &&
        [15, 30, 60].includes(p.minutes) &&
        ['active', 'review', 'complete'].includes(p.status) &&
        Array.isArray(p.steps) &&
        p.steps.length === 3 &&
        p.steps.every(v => typeof v === 'boolean') &&
        typeof p.reflection === 'string' &&
        p.reflection.length <= 4000
    ) &&
    value.projects.every(
      p =>
        p.origin === null ||
        (p.origin &&
          perspectives.some(x => x.id === p.origin.bundle) &&
          p.origin.version === '1.0' &&
          Array.isArray(p.origin.practices) &&
          p.origin.practices.every(i => Number.isInteger(i) && i >= 0 && i < 3))
    ) &&
    new Set(value.evidence.map(e => e.id)).size === value.evidence.length &&
    new Set(value.projects.map(p => p.id)).size === value.projects.length &&
    value.evidence.every(
      e => typeof e.date === 'string' && e.date.length <= 32 && (e.project === undefined || typeof e.project === 'string')
    ) &&
    Array.isArray(value.adopted) &&
    value.adopted.every(
      a =>
        perspectives.some(p => p.id === a.id) &&
        Array.isArray(a.practices) &&
        a.practices.every(i => Number.isInteger(i) && i >= 0 && i < 3)
    ) &&
    Array.isArray(value.audit) &&
    value.audit.length <= 100 &&
    value.audit.every(
      a => typeof a.type === 'string' && typeof a.detail === 'string' && typeof a.date === 'string'
    )
  );
}

export function estimate(state, skill, mode = state.mode) {
  const eligible = state.evidence.filter(
    e => e.skill === skill && e.mode === mode && (e.rubric === RUBRIC || e.rubric === RUBRIC_LEGACY) && e.status === 'accepted' && state.sources[e.source]
  );
  return {
    n: eligible.length,
    score: eligible.length >= MIN_EVIDENCE ? eligible.reduce((n, e) => n + e.mark, 0) / eligible.length : null,
    range: eligible.length ? [Math.min(...eligible.map(e => e.mark)), Math.max(...eligible.map(e => e.mark))] : null,
    evidence: eligible
  };
}

export function cohortValues(skill, mode, cohortId) {
  const cohort = cohorts.find(c => c.id === cohortId);
  const index = skills.findIndex(s => s.id === skill);
  if (!cohort || index < 0 || !['independent', 'assisted'].includes(mode)) return [];
  const sampleLength = cohort.sampleSize || Math.min(120, cohort.n);
  return Array.from({ length: sampleLength }, (_, i) =>
    Math.min(
      4,
      Math.max(
        0,
        Math.round((1 + ((i * 17 + index * 13 + cohort.offset) % 31) / 10 + (mode === 'assisted' ? 0.3 : 0)) * 10) / 10
      )
    )
  );
}

export function percentile(score, values) {
  if (!Number.isFinite(score) || !values.length || values.some(v => !Number.isFinite(v))) return null;
  const below = values.filter(v => v < score).length;
  const equal = values.filter(v => v === score).length;
  return Math.round((100 * (below + 0.5 * equal)) / values.length);
}

export function comparison(state, skill) {
  const stat = estimate(state, skill);
  const values = cohortValues(skill, state.mode, state.cohort);
  if (!state.benchmarkVisible) return { available: false, reason: 'Comparisons are paused in Data & consent.', values };
  if (values.length < MIN_COHORT)
    return { available: false, reason: `Withheld: fewer than ${MIN_COHORT} comparable records. Small groups are not ranked.`, values };
  if (stat.score === null)
    return {
      available: false,
      reason: `Not enough evidence: ${stat.n}/${MIN_EVIDENCE} accepted examples in this mode. Unknown is not zero.`,
      values
    };
  return {
    available: true,
    percentile: percentile(stat.score, values),
    values,
    mean: values.reduce((a, b) => a + b, 0) / values.length
  };
}

export function opportunities(state) {
  const goal = goals.find(g => g.id === state.goal);
  return skills
    .map(s => {
      const score = estimate(state, s.id).score;
      return {
        ...s,
        score,
        priority: goal.weights[s.id] * (score === null ? 0.75 : Math.max(0, s.target - score)),
        reason:
          score === null
            ? 'Establish a baseline demonstration in this domain.'
            : `A high-leverage growth area for “${goal.name.toLowerCase()}”.`
      };
    })
    .sort((a, b) => b.priority - a.priority);
}

const uid = prefix =>
  `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;

function log(state, type, detail) {
  state.audit.unshift({ type, detail, date: new Date().toISOString() });
  state.audit = state.audit.slice(0, 100);
}

export function createProject(state, { skill, title, minutes = 30, origin = null }) {
  if (
    !skillById(skill) ||
    typeof title !== 'string' ||
    !title.trim() ||
    title.length > 120 ||
    ![15, 30, 60].includes(Number(minutes))
  )
    throw new Error('Choose an enterprise skill, a title of 1–120 characters, and a 15, 30, or 60 minute session.');
  if (state.projects.length >= 99)
    throw new Error('The demo supports up to 99 projects. Reset the demo to start over.');
  const project = {
    id: uid('project'),
    skill,
    title: title.trim(),
    minutes: Number(minutes),
    steps: [false, false, false],
    status: 'active',
    reflection: '',
    origin
  };
  state.projects.unshift(project);
  log(state, 'project.created', project.title);
  return project;
}

export function adopt(state, id, indices) {
  const p = perspectives.find(p => p.id === id);
  if (!p || !indices.length || indices.some(i => !Number.isInteger(i) || i < 0 || i > 2))
    throw new Error('Choose at least one practice to try.');
  if (state.adopted.some(a => a.id === id))
    throw new Error('This perspective is already in your enterprise practice library.');
  const project = createProject(state, {
    skill: p.skill,
    title: `Practice: ${p.title}`,
    origin: { bundle: id, version: '1.0', practices: [...new Set(indices)] }
  });
  state.adopted.push({ id, version: '1.0', practices: [...new Set(indices)] });
  log(state, 'perspective.adopted', p.title);
  return project;
}

export function replayAssessment(state, projectId, mode) {
  const p = state.projects.find(p => p.id === projectId);
  if (!p || !p.steps.every(Boolean) || p.status !== 'active' || !['independent', 'assisted'].includes(mode))
    throw new Error('Finish the three practice steps before replaying the enterprise demonstration assessment.');
  if (!state.sources.practice)
    throw new Error('Practice check-ins are disconnected. Reconnect the enterprise demo source before adding evidence.');
  const e = {
    id: uid('evidence'),
    skill: p.skill,
    source: 'practice',
    mode,
    mark: 3,
    rubric: RUBRIC,
    status: 'pending',
    title: p.title,
    date: new Date().toISOString().slice(0, 10),
    synthetic: true,
    project: p.id
  };
  state.evidence.unshift(e);
  p.status = 'review';
  log(state, 'evidence.proposed', p.title);
  return e;
}

export function reviewEvidence(state, id, decision) {
  const e = state.evidence.find(e => e.id === id);
  if (!e || e.status !== 'pending' || !['accepted', 'rejected'].includes(decision))
    throw new Error('Only a pending item can be reviewed once.');
  if (decision === 'accepted' && !state.sources[e.source])
    throw new Error('This source is disconnected; its evidence cannot be accepted.');
  e.status = decision;
  const p = state.projects.find(p => p.id === e.project);
  if (p) p.status = decision === 'accepted' ? 'complete' : 'active';
  log(state, `evidence.${decision}`, e.title);
}

export function setSource(state, id, enabled) {
  if (!sources.some(s => s.id === id) || typeof enabled !== 'boolean')
    throw new Error('Unknown source.');
  state.sources[id] = enabled;
  log(state, enabled ? 'source.reconnected' : 'source.revoked', sources.find(s => s.id === id).name);
}

export function disclosure(state) {
  return {
    schema: 'google-emergence-disclosure/2',
    synthetic: true,
    purpose: 'enterprise-voluntary-learning',
    rubric: RUBRIC,
    claims: skills.flatMap(s =>
      ['independent', 'assisted'].map(mode => ({
        skill: s.id,
        mode,
        n: estimate(state, s.id, mode).n,
        score: estimate(state, s.id, mode).score
      }))
    ),
    notice:
      'Fictional enterprise demonstration; not a credential, performance review, or employment ranking instrument. No raw source telemetry, reflections, or personal data are included.'
  };
}

export function projectBrief(p) {
  const s = skillById(p.skill);
  const origin = perspectives.find(x => x.id === p.origin?.bundle);
  return `# Google Emergence Growth Project: ${p.title}

**Enterprise Skill:** ${s.name}  
**Session Duration:** ${p.minutes} minutes  
**Enterprise System:** Google Workspace & Gemini Enterprise  

## Intent
${s.summary}

## Success Criterion
${s.criterion}

## Structured Practice Loop
1. **Frame:** Define the enterprise challenge, key stakeholders, and operational boundaries in Google Docs.
2. **Make:** Produce one testable demonstration artifact, clearly disclosing where Gemini Enterprise was leveraged.
3. **Reflect:** Articulate technical trade-offs, human verification performed, and what you would iterate next.

${
  origin
    ? `## Adopted Perspective
${origin.title}, v1.0 (${origin.author}).
${p.origin.practices.map(i => `- ${origin.practices[i]}`).join('\n')}

`
    : ''
}## Evidence Verification Protocol
Human mastery and Gemini Enterprise assisted output are recorded in distinct, isolated modes. Step completion is an opportunity to generate evidence, not an automated credential.

## Professional Reflection
${p.reflection || '(Not yet recorded.)'}

---
Google Emergence Enterprise AI Concept. Import into Google Docs or Gemini Gems manually; this brief does not automatically modify Google Cloud resources. No unconsented background surveillance is supported.
`;
}

export function policyGate(purpose) {
  return [
    'personal-learning',
    'consented-practice',
    'aggregate-research',
    'enterprise-learning',
    'voluntary-learning',
    'comparative-distribution'
  ].includes(purpose);
}

export const emergenceSessions = [
  {
    id: 'session-sre-chaos',
    skill: 'systems',
    title: 'Distributed System Chaos & Failover Modeling',
    emergedBy: 'Elena Rostova',
    role: 'Principal SRE, Google Cloud Distributed Systems',
    avatar: 'ER',
    networkContext: 'Cloud Infrastructure Guild · 4 teammates enrolled',
    targetActorAlignment: 'Systems Architect (L6+)',
    durationMinutes: 30,
    impactScore: '+0.3',
    summary: 'Analyze a simulated cascading regional outage in a multi-tenant microservices mesh. Identify circular dependencies, propose circuit-breaking boundaries, and draft canary verification criteria in Google Docs.',
    practice: 'Model a cascading outage failover in Google Docs',
    liveParticipants: 6,
    timeAgo: 'Just now',
    urgency: 'Active Peer Session'
  },
  {
    id: 'session-exec-story',
    skill: 'story',
    title: 'The 3-Slide Board Proposal: Cutting Scope with Conviction',
    emergedBy: 'Marcus Vance',
    role: 'Staff Product Lead, Google Workspace AI',
    avatar: 'MV',
    networkContext: 'Target Actor Focus: Executive Storytelling',
    targetActorAlignment: 'Executive Communicator & Narrative Lead',
    durationMinutes: 15,
    impactScore: '+0.4',
    summary: 'A critical product timeline is at risk. Formulate a 3-slide executive decision deck in Google Slides framing the core trade-off, presenting counter-arguments, and securing stakeholder alignment within 90 seconds.',
    practice: 'Draft a 3-slide executive trade-off deck in Google Slides',
    liveParticipants: 12,
    timeAgo: '4m ago',
    urgency: 'Trending in Network'
  },
  {
    id: 'session-genai-redteam',
    skill: 'creative',
    title: 'Vertex AI Agent Red-Teaming & Prompt Injection Defense',
    emergedBy: 'Siddharth Rao',
    role: 'Staff Security Architect, Google DeepMind Platform',
    avatar: 'SR',
    networkContext: 'Security & GenAI Community of Practice',
    targetActorAlignment: 'Applied GenAI Architect',
    durationMinutes: 30,
    impactScore: '+0.5',
    summary: 'Construct an enterprise prompt pipeline with Gemini 1.5 Pro. Intentionally craft 3 adversarial injection attempts, document bypass risks, and implement verifiable output guardrails with evaluation test fixtures.',
    practice: 'Build adversarial guardrails for a Gemini agent playbook',
    liveParticipants: 9,
    timeAgo: '12m ago',
    urgency: 'Live Interactive Crucible'
  },
  {
    id: 'session-async-facilitation',
    skill: 'facilitation',
    title: 'Cross-Timezone Architecture Review: Preserving Dissent',
    emergedBy: 'Priya Patel',
    role: 'Engineering Director, Enterprise Cloud Platform',
    avatar: 'PP',
    networkContext: 'Leadership Development Track',
    targetActorAlignment: 'Inclusive Facilitator & Team Multiplier',
    durationMinutes: 15,
    impactScore: '+0.3',
    summary: 'Design an asynchronous decision framework in Google Docs for an EMEA/APAC/US team. Create silent-reading contribution channels that protect dissenting viewpoints before forcing convergence.',
    practice: 'Structure an asynchronous dissent-preserving agenda in Docs',
    liveParticipants: 4,
    timeAgo: '28m ago',
    urgency: 'Network Recommendation'
  },
  {
    id: 'session-conflicting-data',
    skill: 'research',
    title: 'Triangulating Divergent Cloud Telemetry vs. Customer Reports',
    emergedBy: 'Dr. Kenji Sato',
    role: 'Distinguished Research Scientist, Tokyo Quantum & Distributed Labs',
    avatar: 'KS',
    networkContext: 'Data & Analytics Network',
    targetActorAlignment: 'Research & Strategic Analysis',
    durationMinutes: 30,
    impactScore: '+0.4',
    summary: 'Analyze synthetic telemetry logs where uptime monitors indicate 99.99% reliability but enterprise customers report severe latency spikes. Formulate a defensible hypothesis using 3 independent data sources.',
    practice: 'Triangulate contradictory telemetry vs user incident reports',
    liveParticipants: 8,
    timeAgo: '45m ago',
    urgency: 'Open Challenge'
  }
];

export const sessionById = id => emergenceSessions.find(s => s.id === id);

export function launchSession(state, sessionId) {
  const session = sessionById(sessionId);
  if (!session) throw new Error('Emergence session not found.');
  return createProject(state, {
    skill: session.skill,
    title: `[Live Session] ${session.title}`,
    minutes: session.durationMinutes
  });
}
