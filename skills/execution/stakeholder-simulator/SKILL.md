---
name: stakeholder-simulator
description: 'Get feedback from simulated CTO, UX, Sales, Executive, and User Advocate perspectives. Use when: stakeholder feedback, simulate review, pre-review, stakeholder perspectives.'
---

# Stakeholder Simulator

Get feedback from simulated CTO, UX, Sales, Executive, and User Advocate perspectives.

## When to Use This Skill
- Pressure-testing a PRD before review meetings
- Anticipating concerns from specific stakeholders
- Preparing for exec presentations

## What You'll Need

**Critical inputs (ask if not provided):**
- The document to review (PRD, proposal, one-pager)
- Which stakeholder perspectives to simulate

**Nice-to-have inputs:**
- Specific concerns you're worried about
- Context on your organization's dynamics

## Process

### Step 1: Check Your Context
First, read the user's context files:
- `context/company.md` — Team structure, who are the real stakeholders?
- `context/product.md` — Current priorities, technical constraints
- `context/personas.md` — User context that stakeholders will ask about
- `context/competitors.md` — Competitive context that Sales/Execs will raise

**Tell the user what you found.** For example:
> "I found your org structure in company.md — you have a CTO (Maya), Head of Sales (Alex), and CPO (Jordan). I'll simulate their perspectives based on their known priorities. I also found competitive pressure from Monday.com in competitors.md — Sales will likely ask about differentiation."

### Step 2: Submit Document
Provide the full document you want reviewed. If context files have relevant background, mention:
> "I'll use your personas.md to inform User Advocate feedback and your competitors.md to inform Sales perspective."

### Step 2: Select Perspectives
Choose which stakeholders to simulate:
- **CTO/Tech Lead:** Technical feasibility, architecture
- **UX Lead:** User experience, design, usability
- **Sales Lead:** Market fit, competitive positioning
- **Executive:** Strategy, ROI, prioritization
- **User Advocate:** Customer needs, adoption

### Step 3: Generate Reviews
Each persona reviews with their priorities and concerns.

### Step 4: Identify Patterns
- Where do perspectives align?
- Where do they conflict?
- What questions should you prepare for?

## Output Template

```markdown
# Stakeholder Review: [Document Name]

**Document Type:** PRD / Proposal / One-Pager
**Review Date:** [Date]

## Context
*What I found in your files:*
- **Org structure:** [From company.md — key stakeholders]
- **Current priorities:** [From company.md — what leadership cares about]
- **User context:** [From personas.md — user needs they'll ask about]
- **Competitive context:** [From competitors.md — positioning questions]

## Summary
- **Consensus:** [Where everyone agrees]
- **Tensions:** [Where perspectives conflict]
- **Top Questions to Prepare For:** [List]

---

## CTO / Tech Lead Review

**Overall:** 🟢 Supportive / 🟡 Concerns / 🔴 Blocker

**Likes:**
- [Positive 1]
- [Positive 2]

**Concerns:**
- [Concern 1] — "How will this affect [X]?"
- [Concern 2]

**Questions to Expect:**
- "[Question 1]"
- "[Question 2]"

**Suggestions:**
- [Recommendation 1]

---

## UX Lead Review

**Overall:** 🟢 Supportive / 🟡 Concerns / 🔴 Blocker

[Same structure]

---

## Sales Lead Review

**Overall:** 🟢 Supportive / 🟡 Concerns / 🔴 Blocker

[Same structure]

---

## Executive Review

**Overall:** 🟢 Supportive / 🟡 Concerns / 🔴 Blocker

[Same structure]

---

## User Advocate Review

**Overall:** 🟢 Supportive / 🟡 Concerns / 🔴 Blocker

[Same structure]

---

## Synthesis

### Where They Agree
- [Consensus point 1]

### Where They Conflict
| Issue | Perspective A | Perspective B |
|-------|--------------|---------------|
| [Issue] | [View] | [Opposing view] |

### Prepare For These Questions
1. [Question] — From: [Stakeholder]
2. [Question] — From: [Stakeholder]
```

## Framework Reference
**Multi-perspective stakeholder analysis**:
- Different roles have different priorities
- Surface concerns before the meeting
- Prepare answers in advance

## Tips for Best Results

1. **Use your context files** — I'll ground stakeholder perspectives in your real org, not generic personas
2. **Provide the full document** — Partial docs get partial feedback
3. **Note specific concerns** — If you're worried about technical pushback, tell me
4. **Prepare for conflicts** — The value is in surfacing tensions before the meeting
5. **Practice your answers** — Use the expected questions as a rehearsal script

## Stakeholder Calibration

If your real stakeholders have specific priorities different from generic roles:
> "My CTO cares most about platform scalability. My Sales lead is focused on enterprise deals."

I'll adjust the simulation to match your organization.
