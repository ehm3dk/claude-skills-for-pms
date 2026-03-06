---
name: meeting-agenda
description: 'Generate structured meeting agendas with time blocks, clear objectives, and expected outcomes. Use when: create meeting agenda, plan meeting, structure discussion, meeting prep, agenda template.'
---

# Meeting Agenda

Generate structured meeting agendas with time blocks, clear objectives, and expected outcomes.

## When to Use This Skill
- Before scheduling any meeting (start with agenda, not calendar invite)
- When someone asks "can we meet about X?" (turn vague request into structured agenda)
- Before stakeholder reviews, planning sessions, or decision meetings
- Training your team to run better meetings

## The Problem

Most meetings start with "so... what are we talking about?" and end with "wait, what did we decide?" Bad agendas waste everyone's time, lead to no decisions, and require follow-up meetings to re-discuss the same topics.

This skill generates a structured agenda in 5 minutes with clear objectives, time blocks, pre-read requirements, and expected outcomes—turning vague "let's sync" meetings into productive decision-making sessions.

## What You'll Get

A complete meeting agenda with:
- Clear objective (what we're trying to accomplish)
- Time-blocked topics (no agenda item runs over)
- Pre-read requirements (so attendees come prepared)
- Expected outcomes per topic (decision, alignment, brainstorm, information)
- Decisions needed section (what we must resolve)
- Action items capture space (for during the meeting)
- Next steps (what happens after)

## What You'll Need

**Required:**
- Meeting purpose (what you're trying to accomplish)
- Duration (30 min, 60 min, etc.)
- Topics to cover

**Helpful:**
- Attendees (I can pull from company.md if team structure is there)
- Background context or decisions needed
- Any documents to review beforehand

## Process

### Step 1: I'll Check Your Context Files
I'll read your context files to find:
- **company.md** — Team structure and key stakeholders
- **product.md** — Current roadmap and initiatives (if meeting is about product decisions)
- **goals.md** — Strategic priorities (to ensure meeting aligns)

Then I'll confirm what I found. For example:
> "I found your team structure in company.md: Engineering (Maya), Design (Lisa), Sales (Marcus). If this meeting involves cross-functional alignment, I'll suggest relevant attendees."

### Step 2: Understand Meeting Purpose
I need to know what type of meeting this is:

| Meeting Type | Purpose | Example |
|--------------|---------|---------|
| **Decision** | Make a specific decision | Go/no-go on feature, prioritization, budget approval |
| **Alignment** | Get everyone on same page | Roadmap review, strategy sync, launch plan |
| **Brainstorm** | Generate ideas | Problem-solving, ideation, discovery |
| **Review** | Provide feedback | Design review, PRD review, metrics review |
| **Planning** | Map out work | Sprint planning, quarterly planning, project kickoff |
| **Information** | Share updates | All-hands, exec update, status report |

**If purpose is vague, I'll ask:**
> "What's the main goal of this meeting? Are we trying to:
> - Make a decision?
> - Align on a plan?
> - Brainstorm solutions?
> - Review something?
>
> This helps me structure the agenda."

### Step 3: Allocate Time to Topics
For each topic you want to cover, I'll:
- Assign a time block (based on complexity and decision weight)
- Identify the objective (what we're trying to accomplish with this topic)
- Specify the expected outcome (decision, alignment, action items)
- Note who leads the topic

**Time allocation principles:**
- **Decision topics:** 15-20 min (present context, discuss, decide)
- **Alignment topics:** 10-15 min (share update, Q&A, confirm understanding)
- **Brainstorm topics:** 20-30 min (generate ideas, group/prioritize, capture)
- **Review topics:** 15-25 min (walkthrough, feedback, iterate)

**Important:** I'll leave 5-10 min buffer at end for overflow and action item recap.

### Step 4: Identify Pre-Read Requirements
If attendees need context before the meeting, I'll list:
- Documents to review
- Data to look at
- Decisions or background to understand

**Pre-reads save meeting time.** If everyone reads the PRD beforehand, you can skip the 15-minute walkthrough and jump straight to feedback.

### Step 5: Define Decisions Needed
For decision-type meetings, I'll create a clear list:
- What decision are we making?
- What are the options?
- Who has final say?

This prevents "we discussed it but didn't decide anything" meetings.

### Step 6: Add Outcome Capture Sections
I'll include sections for:
- **Decisions made** (what was decided, who decided, rationale)
- **Action items** (who, what, by when)
- **Parking lot** (off-topic ideas to revisit later)

These get filled during the meeting, so you leave with clear next steps.

## Output Template

**I'll generate all of this for you.** You provide the meeting purpose, duration, and topics—I'll structure it with time blocks, objectives, and outcomes.

Here's what you'll get:

```markdown
# Meeting Agenda: [Meeting Name]

**Date:** [Date and Day of Week]
**Time:** [Start Time - End Time] ([Duration])
**Location:** [Zoom link / Room / Remote]
**Meeting Lead:** [Your Name]
**Note Taker:** [Assign or rotate]

---

## Attendees

**Required:**
- [Name / Role] — [Why they're needed]
- [Name / Role] — [Why they're needed]

**Optional:**
- [Name / Role] — [FYI only, can skip if busy]

*Tip: Only invite people who need to be there. Keep meetings small.*

---

## Objective

[One sentence: What we're trying to accomplish in this meeting]

**Success looks like:** [What "good" outcome means — e.g., "Decision made on Q2 roadmap priorities" or "Alignment on launch timeline"]

---

## Pre-Read (Please review before meeting)

**Required reading:**
- [ ] [Document 1 with link] — [Why you need to read this]
- [ ] [Document 2] — [Context it provides]

**Optional background:**
- [Link to reference material]

**⏰ Time to review:** ~[X] minutes

*Note: If you haven't reviewed pre-reads, please do so before joining. We'll assume you've read them.*

---

## Agenda

### 1️⃣ [Topic Name] (X min)
**Led by:** [Name]
**Objective:** [What we're trying to accomplish with this topic]
**Type:** Decision / Alignment / Brainstorm / Review
**Outcome:** [What we expect to leave with — decision, action items, consensus, feedback]

**Discussion points:**
- [Point 1]
- [Point 2]

---

### 2️⃣ [Topic Name] (X min)
**Led by:** [Name]
**Objective:** [What we're trying to accomplish]
**Type:** [Type]
**Outcome:** [Expected outcome]

**Discussion points:**
- [Point 1]
- [Point 2]

---

### 3️⃣ [Topic Name] (X min)
**Led by:** [Name]
**Objective:** [What we're trying to accomplish]
**Type:** [Type]
**Outcome:** [Expected outcome]

**Discussion points:**
- [Point 1]

---

### 4️⃣ Recap & Next Steps (5 min)
**Led by:** [Meeting Lead]
- Review decisions made
- Confirm action items and owners
- Schedule follow-ups if needed

---

## Decisions Needed

*[Only for decision-type meetings — skip if not applicable]*

| Decision | Options | Who Decides | Needed By |
|----------|---------|-------------|-----------|
| [Decision 1] | [Option A, Option B] | [Final decision maker] | [End of meeting / By date] |
| [Decision 2] | [Options] | [Who] | [When] |

---

## Notes

*[Fill in during meeting]*

### Key Discussion Points
-

### Decisions Made
| Decision | What We Decided | Rationale | Owner |
|----------|----------------|-----------|-------|
|  |  |  |  |

### Action Items
| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
|  |  |  |  |

### Parking Lot
*Ideas/topics raised but deferred to later:*
-

---

## Follow-Up

**Next steps:**
- [ ] [Action item 1] — [Owner] by [Date]
- [ ] [Action item 2] — [Owner] by [Date]

**Next meeting:** [If recurring or follow-up needed]

---

## Context for Attendees

*[Optional — include if meeting needs background]*

**Why this meeting:**
[Brief context on why we're meeting now]

**Background:**
[Relevant context from product.md, company.md, or recent events]

**Related decisions:**
[Any previous decisions that inform this discussion]
```

## How This Works

This skill applies proven meeting facilitation principles:

**1. Clear Objectives (Death by Meeting, Patrick Lencioni)**
Every meeting needs a single, clear purpose. If you can't state the objective in one sentence, you're not ready to meet.

**2. Time Boxing (Prevents Rambling)**
Allocating time per topic forces prioritization and keeps discussions focused.

**3. Expected Outcomes (Ensures Progress)**
Knowing what outcome you need (decision, alignment, feedback) prevents "we discussed but didn't conclude" meetings.

**4. Pre-Reads (Respects Time)**
Reading beforehand turns meeting time into discussion time, not presentation time.

**5. Action Item Capture (Follow-Through)**
Meetings without action items = no progress. Capture who, what, by when.

## Tips for Best Results

1. **Send agenda 24 hours before meeting** — Gives attendees time to review pre-reads
2. **Stick to time blocks** — If Topic 1 runs over, defer to parking lot, don't let it eat Topic 2's time
3. **Assign a note-taker** — Meeting lead should facilitate, not take notes
4. **Start with objective** — Read it aloud at start of meeting so everyone knows the goal
5. **End with recap** — Last 5 minutes: review decisions, confirm action items, set next steps
6. **Share notes within 1 hour** — Strike while memory is fresh
7. **Cancel if pre-reads not done** — If people haven't prepared, reschedule. Don't waste everyone's time.
8. **Question if meeting is needed** — Could this be an email? A Slack thread? A Loom? Default to async.
9. **Invite only who's needed** — 5 people = productive discussion. 15 people = presentation.
10. **Review after meeting** — Did we achieve the objective? If not, why? Adjust for next time.

## Meeting Type Templates

### Decision Meeting
**Focus:** Make 1-3 specific decisions
**Duration:** 30-45 min
**Pre-read:** Decision brief with options, pros/cons, recommendation
**Outcome:** Decision made, action items assigned

### Alignment Meeting
**Focus:** Get everyone on same page
**Duration:** 30-60 min
**Pre-read:** Strategy doc, roadmap, plan to review
**Outcome:** Consensus on approach, questions answered

### Brainstorm Meeting
**Focus:** Generate ideas
**Duration:** 45-60 min
**Pre-read:** Problem statement, constraints
**Outcome:** Ideas captured, grouped, prioritized

### Review Meeting
**Focus:** Provide feedback
**Duration:** 30-45 min
**Pre-read:** Document to review (PRD, design, spec)
**Outcome:** Feedback captured, next iteration scoped

### Planning Meeting
**Focus:** Map out work
**Duration:** 60-90 min
**Pre-read:** Goals, backlog, capacity
**Outcome:** Plan created, owners assigned, timeline set
