---
name: user-interview-analyzer
description: 'Transform raw interview transcripts into structured Interview Snapshots with extracted opportunities and key quotes. Use when: analyze interview, interview analysis, research snapshot, interview insights.'
---

# User Interview Analyzer

Transform raw interview transcripts into structured Interview Snapshots with extracted opportunities and key quotes.

## When to Use This Skill
- Right after conducting a user interview while context is fresh
- Processing a backlog of interviews you never wrote up
- Preparing research summaries for stakeholder presentations

## What You'll Get

I'll generate a complete Interview Snapshot with:
- **Jobs-to-be-Done extraction** — What the user is trying to accomplish
- **Goals and frustrations** — What success looks like vs. what gets in their way
- **Opportunity identification** — Unmet needs framed as problems to solve, not solutions
- **Evidence-rated insights** — Strong/Medium/Weak based on how explicitly stated
- **Key quotes** — Memorable statements for presentations and product briefs
- **Context connections** — How this interview relates to your personas, product, and competitors
- **Follow-up questions** — What to ask next to fill gaps

## What You'll Need
- Interview transcript, notes, or recording summary
- Context on what you were trying to learn (optional)

## Process

### Step 1: Review Your Context

I'll start by checking your context files to connect this interview to existing knowledge:
- **personas.md** — Does this person match an existing persona?
- **product.md** — Are they discussing known issues or roadmap items?
- **competitors.md** — Did they mention competitors?

I'll also look for existing research:
- Prior interview snapshots in research/ folder
- Feedback data, support tickets

I'll share what I find. For example:
> "I'll analyze this interview. I see you have 3 personas in your context — I'll note if this person matches one or represents a new pattern. I also see 'resource planning' is a known pain point in your product.md, so I'll flag if that comes up."

This shows you how I'm connecting research across sessions.

### Step 2: Analyze Your Notes

Paste your interview notes in any format — messy is fine. Include:
- What the user said (direct quotes when possible)
- What you observed (body language, hesitation, excitement)
- Your initial reactions or hypotheses

**If notes are sparse, I'll say:**
> "These notes are pretty thin — I'll do my best, but the analysis will be stronger if you can add:
> - Direct quotes from the participant
> - Their role and company context
> - What you were trying to learn"

### Step 3: Extract Key Elements

I'll identify:
- **Jobs-to-be-Done:** What is the user trying to accomplish?
- **Goals:** What does success look like for them?
- **Frustrations:** What's getting in their way?
- **Current Solutions:** How do they solve this today?

I'll connect to your existing context:
- If frustrations match known issues in product.md, I'll note it
- If Jobs-to-be-Done align with a persona, I'll call it out
- If they mention competitors, I'll flag for competitors.md

### Step 4: Identify Opportunities

I'll frame opportunities as user needs, not solutions:
- ✅ "Users need a way to track progress without manual updates"
- ❌ "Add a dashboard" (that's a solution)

I'll rate evidence strength:
- **Strong:** Explicit request + emotional weight
- **Medium:** Mentioned but not emphasized
- **Weak:** Inferred from behavior

### Step 5: Pull Key Quotes

I'll extract memorable quotes that:
- Capture emotional context
- Could be used in presentations
- Represent broader patterns

### Step 6: Generate Follow-up Questions

I'll suggest questions for your next interview based on gaps or interesting threads.

### Step 7: Recommend Next Steps

After analysis, I'll suggest:
- Saving the snapshot to your research/ folder
- Updating personas.md if this reveals new patterns
- Adding opportunities to your backlog

## Output Template

```markdown
# Interview Snapshot: [Participant Name/ID]

**Date:** [Date]
**Interviewer:** [Name]
**Duration:** [Length]
**Context:** [What you were exploring]

## Connection to Your Context
*How this interview relates to what you already know:*
- **Persona match:** [Matches "Jordan" persona / New pattern — consider adding to personas]
- **Known issues mentioned:** [Links to product.md items, or "None identified"]
- **Competitors mentioned:** [Any competitor references]

## Participant Profile
- **Role:** [Job title]
- **Company:** [Size, type, industry]
- **Tenure:** [Time in role / time using product]

## Key Jobs-to-be-Done
*"When [situation], I want to [motivation], so I can [outcome]"*

- [JTBD 1]
- [JTBD 2]

## Goals
*What success looks like for this user*
- [Goal 1]
- [Goal 2]

## Frustrations
*What's getting in their way*
- [Frustration 1] — [Note if this matches known issues in product.md]
- [Frustration 2]

## Current Solutions
*How they solve this today*
- [Solution 1]
- [Solution 2]

## Opportunities Identified

| Opportunity | Evidence | Strength | Notes |
|-------------|----------|----------|-------|
| [Need statement] | [What they said/did] | Strong/Medium/Weak | [Connection to existing context] |

## Key Quotes

> "[Quote 1]"
> — Context: [When they said this]

> "[Quote 2]"
> — Context: [When they said this]

## Patterns & Themes
*How this connects to other research:*
- [Pattern that confirms existing knowledge]
- [New insight not seen before]

## Follow-up Questions
*For your next interview:*
- [ ] [Question 1]
- [ ] [Question 2]

## Suggested Next Steps
- [ ] Save this snapshot to `research/interviews/[name].md`
- [ ] [If new pattern]: Consider updating `personas.md`
- [ ] [If new opportunity]: Add to backlog for prioritization
- [ ] [If competitor mentioned]: Update `competitors.md`

---

## Raw Notes
[Original notes for reference]
```

## Framework Reference

Based on **Teresa Torres' Continuous Discovery Habits**:
- Focus on opportunities (user needs), not solutions
- Extract jobs-to-be-done to understand motivation
- Use evidence strength to prioritize
- Connect individual interviews to patterns across research

## Tips for Best Results

1. **Keep your context files updated** — I'll connect interviews to your personas, product, and competitors
2. **Capture quotes verbatim** — Paraphrasing loses nuance
3. **Note emotions** — Frustration, excitement, and hesitation are data
4. **Process within 24 hours** — Context fades fast
5. **Save snapshots** — Drop them in a `research/` folder so I can reference them in future sessions
