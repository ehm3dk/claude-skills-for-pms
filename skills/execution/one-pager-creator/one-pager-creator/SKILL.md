---
name: one-pager-creator
description: 'Create concise one-page briefs for quick alignment and stakeholder decisions. Use when: one pager, feature brief, quick spec, feature proposal.'
---

# One-Pager Creator

Create concise one-page briefs for quick alignment and stakeholder decisions.

## When to Use This Skill
- Getting exec approval on early-stage ideas
- Aligning stakeholders before investing in a full PRD
- Communicating decisions or recommendations quickly

## What You'll Need
- A clear problem or opportunity
- Your proposed approach (high-level)
- The decision or support you need
- Who the audience is (execs, eng leads, cross-functional team)

## Process

### Step 1: Check Your Context
First, read the user's context files:
- `context/product.md` — Is this on the roadmap? What's the current state?
- `context/personas.md` — Who has this problem? What's the impact?
- `context/company.md` — Strategic priorities this aligns with?
- `context/competitors.md` — Competitive pressure to cite?

**Tell the user what you found.** For example:
> "I found 'Advanced Reporting' in your product.md as a known issue. Your Alex persona (agency owner) cites lack of profitability visibility as a pain point. I'll frame the one-pager around this evidence."

### Step 2: Check for Critical Inputs
Before generating, verify you have:
1. **The problem/opportunity** — What are we solving?
2. **The ask** — What decision or action is needed?
3. **Audience context** — Who is reading this?

If any are missing, ask:
> "Before I create this one-pager, I need to understand:
> 1. What problem or opportunity are we addressing? (I found [X] in your files — is that it?)
> 2. What's your ask — approval, resources, feedback, or awareness?
> 3. Who will read this — execs, eng leads, or cross-functional stakeholders?"

### Step 3: Clarify the Ask
What do you need from the reader?
- Approval to proceed
- Resource allocation
- Feedback before next step
- Awareness/FYI

### Step 4: Answer Core Questions
- **Problem:** What are we solving? (cite personas.md)
- **Solution:** What are we proposing?
- **Why Now:** Why is this urgent? (cite company.md priorities, competitors.md)
- **Ask:** What do you need?

### Step 5: Constrain Ruthlessly
One page means:
- Cut anything that doesn't support the ask
- Use bullets, not paragraphs
- Lead with the punchline

## Output Template

```markdown
# [Project/Feature Name] — One-Pager

**Author:** [Name]
**Date:** [Date]
**Status:** [Draft/Review/Final]
**Ask:** [Decision needed]
**Decision Deadline:** [Date]

## Context
*What I found in your files:*
- **Problem evidence:** [From personas.md, product.md]
- **Strategic alignment:** [From company.md]
- **Competitive factor:** [From competitors.md if relevant]

---

## Problem
[2-3 sentences: What problem exists? Who has it? What's the impact?]

**Evidence:**
- [From personas.md — user pain point]
- [From product.md — known issue, feedback]
- [From competitors.md — competitive gap if relevant]

## Proposed Solution
[2-3 sentences: What are we proposing at a high level?]

## Why Now?
- [Strategic alignment — from company.md priorities]
- [Competitive pressure — from competitors.md]
- [Opportunity cost of waiting]

## Expected Impact
| Metric | Current | Target | Confidence |
|--------|---------|--------|------------|
| [Metric] | [From product.md] | [Target] | High/Med/Low |

## Key Risks
- [Risk 1] — Mitigation: [Plan]
- [Risk 2] — Mitigation: [Plan]

## Open Questions
- [ ] [Question that needs answering]

## The Ask
[Specifically what you need from the reader — approval, resources, feedback]

## Next Steps (if approved)
1. [Step 1]
2. [Step 2]
```

## Framework Reference
Based on **Lenny Rachitsky's one-pager format**:
- Lead with the ask
- Constrain to one page
- Make it scannable for busy execs

## Tips for Best Results

1. **Use your context files** — I'll cite evidence from personas, product, and competitors
2. **Lead with the punchline** — Busy execs read the first line. Make it count.
3. **Be specific about the ask** — "Approve 2 sprints" beats "Please consider"
4. **Include a decision deadline** — Creates urgency and accountability
5. **One page means one page** — If it scrolls, you're not done cutting
