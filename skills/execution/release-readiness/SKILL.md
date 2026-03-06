---
name: "release-readiness"
description: "Generate a release readiness checklist from stories, acceptance criteria, NFRs, and risks"
argument-hint: "[feature-name]"
---

# release-readiness

You are acting as a Release Manager. Your job is to assess whether a feature is ready to release by systematically evaluating all evidence provided and producing a structured, unambiguous readiness report.

---

## Step 1 — Read All Inputs

Before producing any output, read the following sources in full:

- Any user stories provided or referenced
- Acceptance criteria (from PRD or linked documents)
- Non-functional requirements (NFRs)
- Risk register or risk notes

If inputs are provided as file paths, read each file. If inputs are pasted inline, analyse them directly. Do not proceed with incomplete input — note any gaps explicitly.

---

## Step 2 — Assess Readiness

For each checklist domain, evaluate the inputs and assign a status to every item:

| Status | Meaning |
|--------|---------|
| ✅ **PASS** | Evidence confirms this is met |
| ⚠️ **PARTIAL** | Partially met — condition and gap noted |
| ❌ **FAIL** | Not met or no evidence found |
| 🔲 **NOT APPLICABLE** | Confirmed irrelevant for this release |

Do not mark anything PASS without citing evidence. Do not invent evidence.

---

## Step 3 — Write the Report

Output the completed report to:
```
03_delivery/release-notes/<feature>_readiness.md
```

Where `<feature>` is the argument provided or inferred from inputs. Use lowercase with hyphens (e.g. `dealer-search_readiness.md`).

---

## Report Structure

---

### Header

```
Feature: <Feature Name>
Release Target: <date or sprint, if known>
Assessed By: Release Manager (AI-assisted)
Assessment Date: <today's date>
Overall Status: READY / READY WITH CONDITIONS / NOT READY
```

Set **Overall Status** as:
- **READY** — all items PASS or NOT APPLICABLE
- **READY WITH CONDITIONS** — one or more PARTIAL items, no FAIL items; conditions listed
- **NOT READY** — one or more FAIL items

---

### 1. Functional Readiness

| # | Criterion | Status | Evidence / Notes |
|---|-----------|--------|-----------------|
| F1 | All user stories accepted against defined acceptance criteria | | |
| F2 | All happy path flows verified | | |
| F3 | All edge cases and boundary conditions tested | | |
| F4 | All negative / error cases tested | | |
| F5 | No open P1 or P2 defects | | |
| F6 | Regression suite passed | | |
| F7 | Feature flags configured correctly for target environment | | |
| F8 | Rollback procedure defined and tested | | |

---

### 2. Data Readiness

| # | Criterion | Status | Evidence / Notes |
|---|-----------|--------|-----------------|
| D1 | Schema migrations scripted and reviewed | | |
| D2 | Migrations tested in a production-equivalent environment | | |
| D3 | Data backfill plan in place (if applicable) | | |
| D4 | Data retention and archival policy confirmed | | |
| D5 | PII and sensitive data classified and handled per policy | | |
| D6 | Data validation rules implemented and tested | | |

---

### 3. Security & Compliance Readiness

| # | Criterion | Status | Evidence / Notes |
|---|-----------|--------|-----------------|
| S1 | Authentication and authorisation requirements verified | | |
| S2 | Input validation and output encoding confirmed | | |
| S3 | Security review or threat model completed | | |
| S4 | Penetration test or vulnerability scan completed (if required) | | |
| S5 | Privacy impact assessment completed (if PII involved) | | |
| S6 | Regulatory / compliance obligations met (e.g. GDPR, PCI) | | |
| S7 | Secrets and credentials managed via approved vault / config | | |

---

### 4. NFR Readiness

| # | NFR Dimension | Target | Actual / Evidence | Status |
|---|---------------|--------|-------------------|--------|
| N1 | Performance | | | |
| N2 | Reliability / uptime | | | |
| N3 | Observability (logging, metrics, alerting) | | | |
| N4 | Accessibility | | | |
| N5 | Scalability / load tested | | | |

Populate Target and Actual from the NFR inputs provided. If a target was not defined in the NFRs, mark the target cell as `[NOT DEFINED]` and add a question in Section 8.

---

### 5. Support & Ops Readiness

| # | Criterion | Status | Evidence / Notes |
|---|-----------|--------|-----------------|
| O1 | Runbook or operational guide created | | |
| O2 | Monitoring dashboards and alerts configured | | |
| O3 | On-call or support escalation path documented | | |
| O4 | Support team briefed on new behaviour and known issues | | |
| O5 | Customer-facing documentation updated (if applicable) | | |
| O6 | Release communication drafted and approved | | |

---

### 6. Risk Summary

Summarise risks from the input risk register. For each risk, state whether it has been mitigated, accepted, or is outstanding.

| Risk | Severity (Low/Med/High) | Status | Mitigation / Owner |
|------|------------------------|--------|-------------------|

---

### 7. Known Limitations

List any functionality that is intentionally excluded, degraded, or deferred in this release. Be explicit — do not omit known gaps.

Each limitation must include:
- Description of the limitation
- Impact on users or systems
- Planned resolution (version / date) or `[ACCEPTED — no fix planned]`

---

### 8. Conditions & Blockers

**Conditions** (must be met before go-live):

> List each PARTIAL item that must be resolved, with owner and due date.

**Blockers** (release must not proceed until resolved):

> List each FAIL item with owner and due date.

If there are no conditions or blockers, write: `None — feature is unconditionally ready.`

---

### 9. Open Questions

Prioritised questions that remain unanswered at the time of this assessment.

> **Q[n] [Priority: Critical / High / Medium]**
> [Question]
> _Context: why this matters for release_

---

### 10. Sign-off Checklist

| Role | Name | Status | Date |
|------|------|--------|------|
| Product Manager | | ☐ Approved / ☐ Pending | |
| Engineering Lead | | ☐ Approved / ☐ Pending | |
| QA Lead | | ☐ Approved / ☐ Pending | |
| Security / Compliance | | ☐ Approved / ☐ Pending | |
| Release Manager | | ☐ Approved / ☐ Pending | |

---

## Quality Bar

Before writing the file, verify:

- [ ] Every checklist item has a status — no blanks
- [ ] Every PASS cites evidence
- [ ] Every PARTIAL and FAIL has a note explaining the gap
- [ ] Known Limitations section is populated or explicitly marked `None`
- [ ] Overall Status accurately reflects the checklist results
- [ ] No vague language (e.g. "mostly done", "looks good", "should be fine")
