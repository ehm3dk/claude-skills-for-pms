---
name: sprint-planning-assistant
description: 'Creates a sprint plan with goals, capacity, and committed work Use when: sprint planning, plan sprint, sprint kickoff.'
---

# Sprint Planning Assistant

Creates a sprint plan with goals, capacity, and committed work.

## When to Use This Skill
- Sprint kickoff meetings
- Agile/Scrum teams
- Before sprint starts to align team

## The Problem

Sprint planning meetings drag on for hours, teams overcommit, and sprint goals are vague or non-existent. By the time planning is done, everyone is exhausted and still unclear on what's actually happening.

**This skill solves it by:** Structuring your sprint upfront with clear capacity calculations, a focused goal, and committed vs. stretch work separation—so planning takes 30 minutes instead of 3 hours.

## What You'll Get

I'll generate a complete sprint plan including:
- Sprint goal aligned to your team's priorities
- Team capacity calculation (accounting for PTO, overhead, velocity)
- Committed work with point estimates and owners
- Stretch goals for extra capacity
- Risk and dependency tracking
- Definition of done checklist

## What You'll Need

**Critical inputs (ask if not provided):**
- Sprint dates (start and end)
- Team members and their availability
- Backlog of candidate items (stories, bugs, tasks)

**Nice-to-have inputs:**
- Previous sprint velocity
- Any known blockers or dependencies
- Company/team priorities for the sprint

## Process

### Step 1: Check Your Context
I'll start by reading your context files:
- `context/company.md` — Team structure, strategic priorities
- `context/product.md` — Current roadmap, what's in progress, priorities
- `goals.md` — Team/company OKRs this sprint should support

**I'll tell you what I found.** For example:
> "I found your team structure in company.md (8 product, 32 eng, 6 design) and your Q2 roadmap priorities. The top priority is 'Resource Planning v2.' I'll structure the sprint plan around this."

### Step 2: Gather Sprint Details
If you haven't provided enough context, I'll ask:
> "I need a few things to plan this sprint:
> 1. When does this sprint start and end?
> 2. Who's on the team and what's their availability? (PTO, on-call, etc.)
> 3. What's in the backlog to consider? (paste or point to file)
>
> I can also pull team info from your `context/` files if it's there."

### Step 3: Capture Sprint Metadata
- Sprint number and dates
- Sprint duration (typically 2 weeks)
- Team composition

### Step 4: Calculate Team Capacity
Account for:
- Working days in sprint
- PTO and holidays
- On-call rotations (typically 50% capacity)
- Meetings and overhead (typically 20% reduction)
- Story point capacity = team velocity or (available hours × historical points/hour)

### Step 5: Define Sprint Goal
A good sprint goal is:
- One sentence that describes the outcome
- Focused on user or business value, not tasks
- Achievable within the sprint
- Measurable (you can tell if you hit it)
- Aligned to team/company priorities (from goals.md or company.md)

**Bad:** "Work on the dashboard"
**Good:** "Users can view project profitability at a glance"

### Step 6: Commit to Work
- Pull from prioritized backlog
- Total points ≤ capacity (leave 10-15% buffer)
- Identify dependencies upfront
- Separate committed vs stretch goals

### Step 7: Identify Risks and Dependencies
- What could block us?
- What do we need from other teams?
- What decisions are still open?

## Output Template

I'll generate this sprint plan for you:

```markdown
# Sprint [Number] Plan

**Sprint:** [Number] — [Name if applicable]
**Dates:** [Start Date] → [End Date]
**Duration:** [X] days
**Sprint Goal:** [One sentence describing the outcome]

## Context
*What I found in your files:*
- **Team structure:** [From company.md]
- **Current priorities:** [From product.md roadmap]
- **OKRs this supports:** [From goals.md]

---

## Team Capacity

| Team Member | Role | Available Days | Notes |
|-------------|------|----------------|-------|
| [Name] | [Role] | [X] / [Y] days | [PTO, on-call, etc.] |
| [Name] | [Role] | [X] / [Y] days | — |

**Total Capacity:**
- Available person-days: [X]
- Adjusted for overhead (20%): [X × 0.8]
- Story point capacity: [Based on velocity]
- Committed points: [X] / [Capacity] ([%] utilization)

---

## Sprint Goal

> [One sentence describing what success looks like for this sprint]

**Alignment:** Supports [OKR/priority from goals.md or company.md]

**How we'll know we succeeded:**
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]

---

## Committed Work

### Must Complete (Committed)

| ID | Title | Points | Owner | Dependencies |
|----|-------|--------|-------|--------------|
| [PROJ-123] | [Story title] | [X] | [Name] | [None / PROJ-XXX] |
| [PROJ-124] | [Story title] | [X] | [Name] | [None] |

**Committed Total:** [X] points

### Stretch Goals (If Time Permits)

| ID | Title | Points | Owner | Notes |
|----|-------|--------|-------|-------|
| [PROJ-130] | [Story title] | [X] | [Name] | [Why stretch?] |

---

## Dependencies

| Dependency | Owner | Needed By | Status |
|------------|-------|-----------|--------|
| [What we need] | [Who provides it] | [Date] | Pending / Confirmed |

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [What could go wrong] | L/M/H | L/M/H | [What we'll do] |

---

## Open Questions

- [ ] [Question] — Owner: [Name], Answer by: [Date]

---

## Definition of Done

For this sprint, work is "done" when:
- [ ] Code reviewed and merged
- [ ] Tests passing (unit + integration)
- [ ] Deployed to staging
- [ ] Product sign-off on staging
- [ ] Documentation updated (if applicable)

---

## Sprint Ceremonies

| Ceremony | Day | Time | Duration |
|----------|-----|------|----------|
| Standup | Daily | [Time] | 15 min |
| Sprint Review | [Day] | [Time] | 1 hour |
| Retrospective | [Day] | [Time] | 1 hour |

---

## Suggested Updates to Context Files
- [ ] Update `product.md` with sprint commitments
- [ ] Log sprint velocity after completion
```

## Framework Reference

**Scrum Sprint Planning Best Practices:**
- Capacity-based planning prevents overcommitment
- One sprint goal keeps team focused
- Committed vs stretch creates realistic expectations
- Dependencies identified upfront prevent mid-sprint blocks

## Tips for Best Results

1. **Keep context files updated** — I'll pull team structure and priorities from your files
2. **Know your velocity** — If you don't have historical data, start conservative
3. **Buffer for the unexpected** — 85% utilization max, not 100%
4. **One goal, not five** — A sprint with five goals has zero goals
5. **Call out dependencies early** — "We need X from Team Y by Wednesday" is specific
