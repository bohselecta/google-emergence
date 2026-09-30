# Google Emergence: Maintainer & Agent Operating Invariants

This document establishes frozen product invariants and operating instructions for AI agents (Antigravity, Codex, Gemini) and human maintainers working on **Google Emergence**.

---

## 1. The Core Philosophy of Emergence

**Emergence is the world view of human capability.**

Its purpose is to provide an objective, criterion-referenced understanding of where people actually stand relative to other real people, who is exceptional at a particular capability, who is improving unusually quickly, who is just slightly ahead of someone else, how cohorts differ, and what separates people across capability distributions.

**Comparison is the core product.**

The product is loving, constructive, and dignified, but it must **never euphemize valid unfavorable results**. If someone is at the 18th percentile on a properly measured capability, say 18th percentile. The opportunity is what comes next: explain what separates that person from nearby higher performers and what evidence suggests could move them.

**Core Mandate: Never soften a valid comparison. Never manufacture an invalid one.**

---

## 2. Product Architecture & Relationship to Becoming

Emergence and Becoming are complementary sides of one conceptual system:

| Product | Stance | Core Capabilities |
|---|---|---|
| **Emergence** | World-facing | Distributions, people, rankings, cohorts, outliers, trajectories, emerging talent, searches, global capability landscape. |
| **Becoming** | First-person | "Where am I?", personal comparison, specific gaps, people just ahead of me, improvement projects, evidence acquisition, movement through distributions. |

Emergence stands on its own and retains its distinctive company style, visual DNA, and information density. It is never styled as a sub-tab of Becoming.

---

## 3. Frozen Operating Invariants

1. **Comparison & Direct Ranking Sovereignty:** Comparison is the core product. Never soften a valid comparison; never manufacture an invalid one. Low results are presented directly as **Opportunity Surfaces** (e.g., "18th percentile. Most comparable participants currently demonstrate stronger performance here. The nearest measurable difference is X. Here are people slightly ahead whose shared practices may illuminate the next level."). Never substitute euphemistic tier names or false encouragement.
2. **Contextual Cohort Multiplicity:** A human being does not have only one rank. Support cohort switching (All Participants, World, Country, Region, Profession, Specialty, Experience Level). Explicitly disclose that cohort distributions represent participating verified talent rather than census population. Distinguish origin nationality from work location—never collapse them into one field.
3. **Becoming Index Decomposition (0–1000):** The broad composite index (0–1000 scale) represents a published composite of measured, evidence-supported dimensions—never "human worth." Always pair the index with: percentile, evidence coverage %, uncertainty interval ($\pm$ pts), cohort context, and as-of date. The index must be fully decomposable into individual dimension contributions ($m_s \times 250$).
4. **Unknown is Not Zero:** Sparse or untested dimensions must be reported as `null` / `Unmapped`. They are withheld from unearned score averages and percentiles. They are never defaulted to zero.
5. **Dual-Mode Assistance Separation:** Independent human mastery and Gemini Enterprise assisted execution must remain distinct and distinguishable. Comparing profiles across different assistance modes requires an explicit condition divergence notice.
6. **Real People Contracts & Truthful Synthetic Labeling:** The architecture and data contracts must support real identifiable people where legitimately authorized. Until a real dataset exists, all demo profiles must be explicitly labeled `synthetic: true` with tier `synthetic_benchmark_fixture`. Synthetic fixtures must never masquerade as verified real people.
7. **Human Neighborhoods & Grounded Comparators:** For any ranked capability or index, expose nearby people, the person immediately above (+1 comparator), and the next milestone gate. Base attainable steps strictly on concrete, observable practices demonstrated by individuals slightly ahead.
8. **Objective Comparison (Zero Psychological Speculation):** Head-to-head comparisons must analyze demonstrated rubric dimensions and observable practices only. Never allow AI to invent psychological motives, personality traits, or drive.
9. **Zero Ambient Surveillance:** The platform must never implement background screen capture, keystroke telemetry, emotion inference, camera gaze tracking, or passive surveillance. Evidence enters only through explicit human submission and review.
10. **Zero-Telemetry Offline Guarantee:** The client application (`src/app.js`) and compiled standalone distribution (`dist/google-emergence.html`) must not make unconsented external network calls (`fetch`, `XMLHttpRequest`, `WebSocket`, `sendBeacon`). The application remains 100% offline and browser-local.
11. **Zero-Stub Policy:** All features presented in the user interface must be fully functional and backed by deterministic domain logic in `src/domain.js`.

---

## 4. Verification Protocol ("Never Stop at Build Passed")

Before committing, pushing, or releasing modifications:
1. Run `npm test` and verify that all automated domain tests pass cleanly.
2. Run `npm run build` and ensure `dist/google-emergence.html` and `dist/emergence.html` are compiled with zero syntax or bundling errors.
3. Run `npm run test:browser` and verify that all 10 application routes, accessibility labels, search filtering, and zero-telemetry checks pass in headless Google Chrome.
4. Run `npm run check` to execute the full three-tier test gate (unit tests + production build + browser QA).
5. Inspect `git diff` to ensure no proprietary credentials, unconsented telemetry, or conflicting legacy rules are introduced.
