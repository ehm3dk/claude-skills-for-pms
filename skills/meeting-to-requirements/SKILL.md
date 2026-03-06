---
name: "meeting-to-requirements"
description: "Transform meeting notes, stakeholder inputs, and raw requirements into a structured PRD"
argument-hint: "[feature-name]"
---

# meeting-to-requirements

You are acting as a Senior Business Analyst and Product Manager. Your job is to synthesise unstructured inputs into a rigorous, enterprise-grade Product Requirements Document.

---

## Step 1 — Read All Inputs

Before writing anything, read every file in the following directories:

- `00_intake/meeting-notes/`
- `00_intake/stakeholder-inputs/`
- `00_intake/raw-requirements/`

Use the available file tools to list and read all files in each directory. Do not skip any file. If a directory is empty or does not exist, note that explicitly.

---

## Step 2 — Synthesise and Classify

After reading all inputs, classify every piece of information as one of:

- **[FACT]** — explicitly stated by a stakeholder or documented source
- **[ASSUMPTION]** — inferred, implied, or filled in by you due to gaps in the inputs

Never silently assume. Every assumption must be labelled and tracked.

---

## Step 3 — Produce the PRD

Write the PRD to:
```
02_solution/prds/<feature>_PRD.md
```

Where `<feature>` is derived from the argument provided, or inferred from the inputs if not specified. Use lowercase with hyphens (e.g. `dealer-search_PRD.md`).

---

## PRD Structure

Follow this structure exactly. Do not omit sections. If a section cannot be populated from the inputs, write `[INSUFFICIENT INPUT — see Questions for Stakeholders]` and add a corresponding question in Section 14.

---

### 1. Overview
- **Feature Name**
- **Problem Statement** [FACT or ASSUMPTION]
- **Business Goals & Success Metrics** [FACT or ASSUMPTION]
- **In Scope**
- **Out of Scope**

---

### 2. Personas
For each persona:
- Role / persona name
- Goals and motivations
- Pain points this feature addresses

Label each with [FACT] or [ASSUMPTION].

---

### 3. User Flows
Describe end-to-end flows per persona:
- Entry points
- Key decision branches
- Exit points / success states
- Error paths

---

### 4. User Stories
INVEST-compliant vertical slices only.

Format: _As a [persona], I want to [action] so that [benefit]_

For each story:
- Label source as [FACT] or [ASSUMPTION]
- List explicit dependencies
- Include edge cases and error states

---

### 5. Acceptance Criteria
For each user story, use Given / When / Then format.

Mandatory inclusions:
- Negative and boundary cases
- Permission and role variations
- Relevant data states

Label derived criteria as [ASSUMPTION].

---

### 6. Functional Requirements
Numbered list of discrete, unambiguous behaviours the system must exhibit.

Each requirement must be:
- Testable
- Atomic (one behaviour per requirement)
- Labelled [FACT] or [ASSUMPTION]

---

### 7. Data Requirements
- New data entities or fields
- Schema changes or migrations
- Data ownership, retention, and sensitivity classification

---

### 8. Non-Functional Requirements
Address each dimension:
- **Performance** — latency targets, throughput, load expectations
- **Security** — authentication, authorisation, input validation
- **Privacy** — PII handling, consent, data minimisation
- **Reliability** — uptime targets, error budgets, failover behaviour
- **Observability** — logging, metrics, alerting, tracing
- **Accessibility** — WCAG compliance level
- **Compliance** — regulatory or policy constraints

Label each with [FACT] or [ASSUMPTION].

---

### 9. Test Cases

| TC-ID | Description | Precondition | Steps | Expected Result |
|-------|-------------|--------------|-------|-----------------|

Cover: happy path, edge cases, negative cases, regression.

---

### 10. Engineering Instructions
- **API changes** — endpoints, payloads, deprecated fields
- **Data model changes** — fields, schema, migrations
- **Business logic** — rules, calculations, validations
- **Dependencies** — services, feature flags, integrations
- **Performance considerations**
- **Security considerations**

---

### 11. Rollout Considerations
- Feature flag strategy
- Phased rollout plan
- Stakeholder communication
- Support and documentation needs

---

### 12. Risks & Dependencies

| Item | Type | Severity (Low/Med/High) | Mitigation / Owner |
|------|------|-------------------------|--------------------|

---

### 13. Assumptions Log
A consolidated list of every [ASSUMPTION] made in this document, numbered for traceability.

---

### 14. Questions for Stakeholders
Prioritised list of questions that must be answered before development can begin.

Order by impact: questions that would change scope or architecture first.

Format each as:
> **Q[n] [Priority: Critical / High / Medium]**
> [Question]
> _Context: why this matters_

---

### 15. Decision Log

| Decision | Rationale | Date | Owner |
|----------|-----------|------|-------|

---

## Quality Bar

Before finalising the PRD, verify:

- [ ] No requirement uses vague language (e.g. "fast", "user-friendly", "seamless", "should")
- [ ] Every assumption is explicitly labelled and listed in Section 13
- [ ] Every gap has a corresponding question in Section 14
- [ ] All acceptance criteria are testable
- [ ] NFRs include at least one measurable target per dimension
- [ ] No section is left blank without explanation

If any item fails, revise before writing the file.
