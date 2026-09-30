<div align="center">

<img src="./public/images/google_emergence_logo.jpg" alt="Google Emergence Logo" width="220" style="border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin-bottom: 16px;">

# Google Emergence
### The World View of Human Capability

**An objective, criterion-referenced comparative system mapping human capability, contextual cohorts, and verified trajectories across participating talent worldwide.**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Verification: 50/50 Tests Pass](https://img.shields.io/badge/Verification-50%2F50%20Passed-34a853.svg)](docs/QA.md)
[![Browser QA: 28/28 Passed](https://img.shields.io/badge/Browser%20QA-Headless%20Chrome%20Passed-1a73e8.svg)](tests/browser_qa.mjs)
[![Runtime Dependencies: Zero](https://img.shields.io/badge/Runtime%20Dependencies-Zero-4285f4.svg)](package.json)
[![Security: BeyondCorp & VPC--SC](https://img.shields.io/badge/Security-BeyondCorp%20%26%20VPC--SC-ea4335.svg)](docs/ARCHITECTURE.md)

[World Landscape](#1-the-new-purpose-of-emergence) · [Emergence vs. Becoming](#2-emergence-and-becoming-complementary-systems) · [Architecture](#5-technical-architecture--security-data-planes) · [Verification Record](docs/QA.md) · [Operating Invariants](AGENTS.md)

</div>

---

<div align="center">
  <img src="./public/images/google_emergence_hero.jpg" alt="Google Emergence World Capability Landscape" width="100%" style="border-radius: 16px; margin: 20px 0; box-shadow: 0 8px 30px rgba(0,0,0,0.1);">
</div>

## 1. The New Purpose of Emergence

**Emergence is the world view of human capability.**

Its purpose is to answer consequential questions that conventional résumés, corporate HR dashboards, and social leaderboards cannot:

- **Where do people actually stand relative to other real people?**
- **Who is exceptional at a particular capability?**
- **Who is improving unusually quickly?**
- **Who is just slightly ahead of someone else?**
- **Who has an unusual combination of strengths?**
- **How do countries, regions, professions, specialties, and experience cohorts differ?**
- **What separates people at one part of a distribution from people further ahead?**
- **Which human trajectories are emerging that would be invisible on a static CV?**

This is not a softened "growth map" that refuses to rank people.

### Comparison is the Core Product

The product is loving, constructive, and dignified, but it **never euphemizes valid unfavorable results**. If someone is at the 18th percentile on a properly measured capability, Emergence states 18th percentile directly. The opportunity is what comes next: explain what separates that person from nearby higher performers and what observable practices can move them.

```text
Core Operating Principle:
Never soften a valid comparison. Never manufacture an invalid one.
```

---

## 2. Emergence and Becoming: Complementary Systems

Emergence and Becoming are two sides of one unified conceptual architecture:

```text
┌────────────────────────────────────────────────────────┐
│                      EMERGENCE                         │
│               The World-Facing System                  │
│                                                        │
│  • Global distributions      • Contextual cohorts      │
│  • Public talent rankings    • Emerging trajectories   │
│  • Outliers & rare pairings  • Human neighborhoods     │
│  • Head-to-head comparisons  • Population search       │
└───────────────────────────┬────────────────────────────┘
                            │  Shared Rubrics & Evidence
                            │  Data Contracts
┌───────────────────────────┴────────────────────────────┐
│                       BECOMING                         │
│               The First-Person System                  │
│                                                        │
│  • "Where am I right now?"   • Specific skill gaps     │
│  • Personal comparisons      • Deliberate practice     │
│  • People just ahead of me   • Workspace sprints       │
│  • Evidence acquisition      • Distribution movement   │
└────────────────────────────────────────────────────────┘
```

Emergence stands completely on its own, expressing its distinctive company style, Material 3 visual DNA, information density, and interactive character.

---

## 3. Core System Surfaces

| Surface | Route | System Capabilities |
|---|---|---|
| **World Capability Landscape** | `#landscape` | Filterable, searchable population leaderboard. Contextual cohort switching, multi-cohort percentiles, Becoming Index (0–1000), evidence coverage bars, uncertainty intervals, and 1-year movement. |
| **Human Neighborhoods** | `#neighborhood` | Identifies the person immediately above (+1 comparator), nearby cohort cluster ($\pm 2\%$), next threshold milestone gates (P50, P75, P90), and concrete observable practices illuminating the next attainable step. |
| **Head-to-Head Compare** | `#compare` | Direct `Person A` vs `Person B` comparison (or compare any person against "You"). Identifies leading dimensions, magnitude of differences, assistance condition compatibility, and objective gap explanations with zero psychological speculation. |
| **Emergence Observatory** | `#observatory` | Systemic pattern discovery: capabilities distinguishing the top 10%, rare dual-mastery combinations (e.g., Systems Architecture + Executive Storytelling), high-velocity climbers, and future domain boundaries. |
| **Emergence Feed** | `#feed` | Real-time capability opportunities emerged by leaders and peers in Google Cloud and Workspace networks. Completing a session produces testable evidence (+0.3 to +0.5 score leverage). |
| **Growth Projects** | `#projects` | Structured deliberate practice sprints with clear hypotheses, time budgets (15, 30, 60m), verification steps (Frame, Make, Reflect), and exportable Gemini Gem playbooks. |
| **Perspectives Library** | `#perspectives` | Curated working methodologies from Google SRE, Narrative Labs, and Enterprise Culture. Adopting a methodology initiates practice without inflating scores. |
| **Evidence Ledger** | `#evidence` | Cryptographic demonstration verification audit trail. Evidence updates capability scores *only* upon explicit human verification and acceptance. |
| **Methodology & Data** | `#methodology` | Versioned rubric specifications (`google-emergence-world/2.0`), Becoming Index mathematical decomposition tree, appeals policy, and granular data source revocation with immediate exclusion propagation. |
| **System Proposal** | `#proposal` | Full executive proposal and technical architecture specifications for Google Cloud and Google Workspace leadership. |

---

## 4. Key Architectural Standards

### 4.1 The Becoming Index Composite (0–1000 Scale)
- The Becoming Index represents a published composite of measured, evidence-supported dimensions—**never "human worth."**
- Formula: $\text{Becoming Index} = \frac{1}{|M|} \sum_{s \in M} (m_s \times 250)$, where $m_s \in [0, 4.0]$ is the arithmetic mean of accepted demonstrations for dimension $s$, and $M$ is the set of measured dimensions.
- **Decomposition:** The score decomposes completely down to individual dimension contributions and verified demonstration records.
- **Always paired with:** Percentile rank, Evidence Coverage % ($|M|/6 \times 100\%$), Uncertainty interval ($\pm$ index points), Cohort context, and As-of date.
- Example: **`842 / 1000 · P94 Global · 92% coverage · ±18 pts`**
- A high score with sparse coverage (e.g., 675 pts with 50% coverage, $\pm 95$ pts) visibly differs from a well-grounded score with 98% coverage ($\pm 16$ pts).

### 4.2 Contextual Cohort Switching
A human being does not possess only one rank. Emergence exposes contextual distributions across:
- **All Participating People (Global World Cohort)** ($N = 280,000$)
- **Country Cohorts** (United States, United Kingdom, Japan, Germany, etc.)
- **Regional Cohorts** (North America, EMEA, APAC, LATAM)
- **Profession & Specialty Cohorts** (Software Engineering, AI & ML Research, Product Management)
- **Experience Levels** (Early Career 1-3y, Mid-Level, Senior 7+y, Principal/Staff, Director)
- **Assistance Conditions** (Independent Human vs With Gemini Enterprise)

> [!NOTE]
> Cohort distributions represent verified participating talent in Google Emergence, not compulsory national census populations. National origin (`originCountry`) and current work location (`workCountry`) are strictly separated and never collapsed.

### 4.3 Unknown is Not Zero
Sparse or untested capability dimensions are explicitly recorded as `null` / `Unmapped`. They are omitted from composite averages and withheld from unearned percentiles. **Untested is never assigned zero.**

### 4.4 Low Result as Opportunity Surface
Emergence rejects euphemistic tier names and fake encouragement. A low score is an **Opportunity Surface**:
> *"18th percentile in Software Engineering. Most comparable participants currently demonstrate stronger performance here. The nearest measurable difference is in systems architecture (+0.6 rubric points). Here are people slightly ahead whose shared practices may illuminate the next level."*

### 4.5 Human Neighborhoods Over Top 100 Leaderboards
The most helpful comparator is frequently not the #1 performer in the world. It is the person immediately above whose observed working practices illuminate the next attainable milestone. Emergence exposes:
- **Person Immediately Above** (+1 comparator with index gap)
- **Nearby Cluster** ($\pm 2\%$ band)
- **Next Threshold Milestone** (P50, P75, P90 gates with required point progression)
- **Fast Climbers Nearby** ($\ge +40$ pts YoY)
- **Observable Attainable Steps** (concrete demonstrated practices)

### 4.6 Head-to-Head Compare (Zero Psychological Speculation)
Selecting any two profiles generates an objective side-by-side comparison:
- Dimensions where Person A leads vs Dimensions where Person B leads
- Magnitude of difference bars
- Assistance condition compatibility check (flags if comparing Independent vs AI-assisted)
- **Grounded synthesis strictly limited to demonstrated dimensions:** e.g., *"Most of the measured difference between Elena and Marcus comes from Systems Architecture (Elena +1.1) and Executive Storytelling (Marcus +1.1)."* **No psychological attributes, motives, or "drive" are ever inferred.**

### 4.7 Real People Architecture with Truthful Synthetic Labeling
The architecture and data contracts support real identifiable individuals where authorized. The demo dataset features 25 richly detailed synthetic personas across diverse geographies and specialties, with every profile explicitly labeled:
`synthetic: true` · `verificationTier: 'synthetic_benchmark_fixture'`.

---

## 5. Technical Architecture & Security Data Planes

<div align="center">
  <img src="./public/images/google_emergence_architecture.jpg" alt="Google Emergence Multi-Plane Architecture" width="100%" style="border-radius: 16px; margin: 20px 0; box-shadow: 0 8px 30px rgba(0,0,0,0.1);">
</div>

Google Emergence operates across three isolated data planes:

1. **Private Living Actor Plane (Customer VPC / CMEK):** Contains raw Google Workspace work products, reflections, and personal practice logs. Encrypted with customer-managed Cloud KMS keys.
2. **Shared Comparative Reference Plane (Google Cloud Domain):** Hosts versioned capability rubrics (`google-emergence-world/2.0`), contextual cohort distributions ($k \ge 30$), and Vertex AI evaluation pipelines.
3. **Disclosure Plane (Public Comparative Passport):** Generates cryptographically verifiable, selective capability claims (Becoming Index, percentile, evidence coverage, assistance mode) for organizational mobility, omitting private reflections.

---

## 6. Requirements & Quickstart

- **Runtime:** Node.js 22 or newer (tested on Node v24).
- **Browser:** Any modern web browser with ES modules and HTML5 dialog support (Chrome, Safari, Firefox, Edge).
- **Dependencies:** **Zero external NPM runtime dependencies**. Uses native Node.js test runner and built-in HTTP server.

### Local Development

```bash
# Clone the repository
git clone https://github.com/bohselecta/google-emergence.git
cd google-emergence

# Run full three-tier verification (unit tests + build + headless browser QA)
npm run check

# Start the local development server
npm run dev
```

Navigate to `http://127.0.0.1:4173`. The server operates strictly in loopback mode with zero external network transmission.

### Automated Test Suites

```bash
# Run 50 automated domain and comparative logic tests
npm test

# Run headless Chrome browser QA (exercises all 10 routes and checks zero telemetry)
npm run test:browser

# Compile standalone offline single-file distribution
npm run build
```

---

## 7. Comprehensive Documentation Index

| Document | Description |
|---|---|
| [AGENTS.md](AGENTS.md) | Frozen operating invariants and instructions for autonomous coding agents and maintainers. |
| [docs/ACCEPTANCE.md](docs/ACCEPTANCE.md) | Verified functional capabilities, acceptance criteria, and technical handoff status. |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Technical data planes, VPC-SC boundaries, schemas, and Becoming Index decomposition. |
| [docs/EVALUATION.md](docs/EVALUATION.md) | Psychometric validity, Responsible AI alignment, and comparative evaluation governance. |
| [docs/QA.md](docs/QA.md) | Automated domain test execution logs and headless Chrome browser verification proofs. |
| [docs/PROPOSAL.md](docs/PROPOSAL.md) | Executive product proposal and Google Workspace integration roadmap. |
| [docs/PROVENANCE.md](docs/PROVENANCE.md) | Conceptual lineage from the Living Actor framework into Google Enterprise AI. |
| [docs/PERMISSION.md](docs/PERMISSION.md) | Formal grant of rights and permissions to Google LLC and Alphabet Inc. |

---

## 8. License & Grant to Google LLC

Google Emergence is published under the **Apache License 2.0**, with a dedicated **Special Adaptation & Integration Grant for Google LLC** set forth in [LICENSE](LICENSE) and [PERMISSION.md](docs/PERMISSION.md).

Google LLC, its subsidiaries, and successors are granted **full, perpetual, royalty-free, and irrevocable permission** to adapt, rebrand, commercialize, and integrate this software into **Google Workspace, Gemini Enterprise, Vertex AI, and Google Cloud Platform**.

---

<div align="center">
  <b>Google Emergence</b> · An Independent Contribution by <b>Hayden Lindley</b> · September 30, 2026<br>
  <i>The world view of human capability.</i>
</div>
