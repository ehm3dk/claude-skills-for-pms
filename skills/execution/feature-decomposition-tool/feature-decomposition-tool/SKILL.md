---
name: feature-decomposition-tool
description: 'Breaks down a feature into shippable chunks with dependencies mapped Use when: feature decomposition, decompose feature, break down feature, slice feature.'
---

# Feature Decomposition Tool

Breaks down a feature into shippable chunks with dependencies mapped.

## When to Use This Skill
- After PRD approval, before sprint planning
- Engineering handoff and estimation
- When a feature is too big for one sprint
- Sprint planning prep

## The Problem

PRDs get approved but engineering asks "how do we break this into sprints?" Without decomposition, estimates are wild guesses, dependencies bite you mid-build, and the "simple feature" takes 3x longer than expected.

**This skill solves it by:** Breaking features into shippable epics and stories with explicit MVP scope, dependency mapping, and parallelization plans—so estimates are grounded, blockers are visible upfront, and you ship in phases instead of one risky big-bang release.

## What You'll Get

I'll generate a complete feature decomposition including:
- MVP scope definition (in/out/non-goals)
- 3-7 epics with user value goals
- Stories with estimates and acceptance criteria
- Dependency graph showing the critical path
- Parallelization plan (frontend/backend/other)
- Ship milestones (Alpha → Beta → GA)
- Risks and open questions

## What You'll Need

**Critical inputs (ask if not provided):**
- Feature name and PRD/description
- High-level requirements (what should it do?)
- Target user and primary use case

**Nice-to-have inputs:**
- Team size and composition
- Technical constraints or existing architecture
- Hard deadlines or dependencies

## Process

### Step 1: Check Your Context
First, read the user's context files:
- `context/product.md` — Is this feature on the roadmap? What's the context?
- `context/personas.md` — Who is this feature for? What's their JTBD?
- `context/company.md` — Team structure, capacity

**Tell the user what you found.** For example:
> "I found 'Resource Planning v2' in your product.md roadmap — it's a Q2 priority. Your Jordan persona (PM) cited resource conflicts as a top pain point. I'll decompose with Jordan's workflow in mind."

### Step 2: Gather Feature Details
If the PM hasn't provided enough context, ask:
> "I need to understand the feature before decomposing:
> 1. What feature are we decomposing? (Name and brief description)
> 2. What's the core user problem this solves?
> 3. Is there a PRD I can reference, or can you describe the requirements?
>
> I can also check your `context/` files if there's relevant info there."

**Do NOT decompose a feature you don't understand. Get clarity first.**

### Step 3: Define MVP Scope
Explicitly separate:
- **In scope (MVP):** The minimum to solve the core problem
- **Out of scope (Future):** Nice-to-haves that can wait
- **Non-goals:** Things that look related but we're explicitly not doing

The MVP should be shippable and valuable on its own.

### Step 4: Identify Epics
Break the MVP into 3-7 epics. Each epic should:
- Be completable in 1-2 sprints
- Have clear boundaries
- Deliver user value (not just technical progress)

### Step 5: Decompose into Stories
Break each epic into stories (1-3 days of work each). Each story should:
- Be independently testable
- Have clear acceptance criteria
- Be estimable (if it's too big to estimate, decompose further)

### Step 6: Map Dependencies
Identify:
- Which stories block other stories?
- Which epics must complete before others can start?
- What do we need from other teams?

Create a dependency graph showing the critical path.

### Step 7: Plan Parallelization
Determine what can happen simultaneously:
- Which stories have no dependencies?
- Where can frontend and backend work in parallel?
- What can be stubbed or mocked to unblock work?

### Step 8: Define Ship Milestones
Create meaningful checkpoints:
- What can we ship after Epic 1?
- What's the internal beta milestone?
- What's the GA milestone?

## Output Template

```markdown
# Feature Decomposition: [Feature Name]

**Feature:** [Name]
**PRD:** [Link or "See description below"]
**Owner:** [PM Name]
**Last Updated:** [Date]

## Context
*What I found in your files:*
- **Roadmap status:** [From product.md]
- **Target persona:** [From personas.md]
- **Persona pain point:** [JTBD or frustration this addresses]
- **Team capacity:** [From company.md if available]

---

## Scope Definition

### MVP (In Scope)
- [Capability 1] — Why essential: [Addresses core persona need]
- [Capability 2] — Why essential: [Reason]
- [Capability 3] — Why essential: [Reason]

### Future (Out of Scope for MVP)
- [Capability A] — Why it can wait: [Reason]
- [Capability B] — Why it can wait: [Reason]

### Non-Goals
- [Thing we're explicitly not doing] — Why: [Reason]

---

## Epic Breakdown

### Epic 1: [Epic Name]
**Goal:** [What this epic delivers — user value]
**Persona impact:** [How this helps Jordan/Alex/Sam from personas.md]
**Estimated Size:** [S/M/L or story points]
**Sprint Target:** Sprint [X]

| Story ID | Story | Points | Owner | Dependencies |
|----------|-------|--------|-------|--------------|
| [FE-001] | [Story description] | [X] | [Name] | None |
| [FE-002] | [Story description] | [X] | [Name] | FE-001 |
| [BE-001] | [Story description] | [X] | [Name] | None |

**Epic 1 Total:** [X] points

---

### Epic 2: [Epic Name]
**Goal:** [What this epic delivers]
**Estimated Size:** [S/M/L or story points]
**Sprint Target:** Sprint [X]
**Depends On:** Epic 1

| Story ID | Story | Points | Owner | Dependencies |
|----------|-------|--------|-------|--------------|
| [FE-003] | [Story description] | [X] | [Name] | FE-002 |
| [BE-002] | [Story description] | [X] | [Name] | BE-001 |

**Epic 2 Total:** [X] points

---

## Dependency Graph

```
Epic 1: Data Model & API Foundation
    ├── FE-001: UI scaffolding (parallel)
    ├── BE-001: Database schema
    │       ↓
    ├── BE-002: API endpoints (blocks Epic 2)
    └── FE-002: Basic UI (needs BE-002)

Epic 2: Core Feature Flow
    ├── FE-003: Full UI implementation
    └── BE-003: Business logic
            ↓
Epic 3: Polish & Edge Cases
    └── All stories can parallelize
```

**Critical Path:** BE-001 → BE-002 → FE-003 → [Ship]

---

## Parallelization Plan

| Phase | Frontend | Backend | Other |
|-------|----------|---------|-------|
| Sprint 1 | UI scaffolding, mocks | Data model, API stubs | Design review |
| Sprint 2 | Integrate real APIs | Business logic | QA test plan |
| Sprint 3 | Polish, error states | Performance, caching | Docs, support |

---

## Ship Milestones

| Milestone | Epics Complete | What's Shippable | Target Date |
|-----------|----------------|------------------|-------------|
| **M1: Internal Alpha** | Epic 1 | Team can test basic flow | [Date] |
| **M2: Internal Beta** | Epic 1-2 | Full flow, internal only | [Date] |
| **M3: Limited Rollout** | Epic 1-3 | 10% of customers | [Date] |
| **M4: GA** | All | Full availability | [Date] |

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| [Risk 1] | H/M/L | H/M/L | [What we'll do] |

---

## Open Questions

- [ ] [Question] — Owner: [Name], Needed by: [Date]

---

## Summary

| Metric | Value |
|--------|-------|
| Total Epics | [X] |
| Total Stories | [X] |
| Total Points | [X] |
| Estimated Sprints | [X] |
| Critical Path Length | [X] stories |

## Suggested Updates to Context Files
- [ ] Add decomposition to feature PRD
- [ ] Update `product.md` with sprint targets
```

## Framework Reference

**Decomposition Best Practices:**
- MVP scope prevents feature bloat
- Epics are sprint-sized chunks with clear value
- Stories are 1-3 day estimable units
- Dependency mapping reveals the critical path
- Ship milestones create momentum

## Tips for Best Results

1. **Use your context files** — I'll connect the decomposition to your personas and roadmap
2. **Start with MVP ruthlessly** — If it doesn't solve the core problem, it's out of scope
3. **Vertical slices over horizontal** — "User can do X end-to-end" beats "Build all the APIs first"
4. **Dependencies reveal risk** — Long dependency chains = high risk
