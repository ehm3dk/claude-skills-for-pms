---
name: stakeholder-updates
description: "Use this skill whenever the user asks to create a stakeholder update, project status report, sprint update, leadership update, weekly update, monthly update, or progress report. Trigger on phrases like 'write a stakeholder update', 'create a status report', 'draft a weekly update', 'project update for leadership', 'sprint summary for stakeholders', 'send an update on the project', 'write a progress report', or any mention of stakeholder communication combined with project status. Also trigger when the user says things like 'I need to update my manager on the project', 'help me write this week's update', or 'summarize what happened this sprint for leadership'. This skill handles the full workflow: gathering project context, determining update type and format, generating a structured update with RAG status, and outputting as .docx or .md. Do NOT use for meeting notes (use meeting-synthesizer), sprint planning, or retrospective documentation."
---

# Stakeholder Updates Skill

## Overview

This skill generates professional stakeholder updates — weekly sprint summaries or monthly leadership reports — with RAG status indicators, progress summaries, blockers, upcoming milestones, and decisions needed. Outputs in .docx or .md format.

## Workflow

### Step 1: Gather Context

When the user asks for a stakeholder update, assess what's been provided.

**Must-have context (ask if missing):**
- Project or product name
- What happened in this period? (progress, completed items, key activities)

**Nice-to-have context (use if provided, don't interrogate):**
- Current blockers or risks
- Upcoming milestones or next steps
- Any decisions needed from stakeholders
- Team or workstream names
- Sprint number or reporting period dates

**How to ask:**
- Keep it to one natural message. Don't turn it into a form.
- If the user dumps raw notes or bullet points, work with that. The whole point of this skill is turning messy input into a polished update.
- If the user says "just write something based on what I gave you," proceed and mark gaps as placeholders.

### Step 2: Configuration

Ask the user three things using the `ask_user_input_v0` tool:

**Question 1 — Update type:**
- Weekly / Sprint update (tactical, for immediate team and stakeholders)
- Monthly leadership update (strategic, for senior leadership)

**Question 2 — Length:**
- Concise (1 page max, scannable)
- Detailed (as much context as needed)

**Question 3 — Output format:**
- Word document (.docx)
- Markdown file (.md)

### Step 3: Determine RAG Status

Based on the context provided, assess the overall project health and assign a RAG status:

- **Green:** On track. No significant blockers. Milestones being met.
- **Amber:** At risk. There are blockers or risks that could impact timeline/scope, but mitigations exist or are being worked on.
- **Red:** Off track. Critical blockers, missed milestones, or escalations needed.

**Rules for RAG:**
- Derive RAG from the actual content provided. If there are unresolved blockers or missed dates, it's Amber or Red — not Green.
- If you don't have enough info to assess (e.g., user only shared progress, no mention of risks), default to Green but note: "RAG based on available information — no blockers or risks were reported."
- Never fabricate a status to make things look better or worse than what the user shared.

In the .docx output, represent RAG with a colored circle or shaded cell:
- Green: fill color "4CAF50"
- Amber: fill color "FFC107"
- Red: fill color "F44336"

### Step 4: Generate the Update

The structure differs based on update type.

---

#### 4A. Weekly / Sprint Update

**Structure:**

```
[Project Name] — Weekly Update
Period: [Date range or Sprint #]
Overall Status: [RAG indicator]

1. PROGRESS SUMMARY
   What got done this period.

2. BLOCKERS & RISKS
   What's in the way or could become a problem.

3. UPCOMING (NEXT SPRINT / NEXT WEEK)
   What's planned next.

4. DECISIONS NEEDED
   What needs stakeholder input or approval.
```

**Section guidelines:**

**1. Progress Summary**
- Write as a concise list of accomplishments, not a diary of activities.
- Each item should be a completed outcome, not a task description. "Completed API integration with claims backend" not "Worked on API stuff."
- If the user mentioned multiple workstreams or teams, group by workstream.
- For concise mode: 4-6 bullet points max. For detailed mode: as many as needed, grouped logically.

**2. Blockers & Risks**
- Each blocker should include: what the blocker is, who/what it's waiting on, and impact if not resolved.
- Format:

```
Blocker: [Description]
Waiting on: [Person/team/dependency]
Impact: [What happens if this isn't resolved]
```

- Distinguish between active blockers (currently stopping work) and risks (could become blockers).
- If no blockers were mentioned, include the section with: "No blockers reported this period."

**3. Upcoming / Next Sprint**
- List planned work for the next period.
- If available, tie items to milestones or dates.
- For concise mode: 3-5 items. For detailed mode: full plan.

**4. Decisions Needed**
- Each decision should be framed as a clear question or choice for the stakeholder.
- Include context on why the decision matters and any deadline.
- Format:

```
Decision: [What needs to be decided]
Context: [Why this matters / what's at stake]
Needed by: [Date or "ASAP" or "Next sync"]
```

- If no decisions are needed, include the section with: "No decisions required at this time."

---

#### 4B. Monthly Leadership Update

**Structure:**

```
[Project Name] — Monthly Update
Period: [Month, Year]
Overall Status: [RAG indicator]

1. EXECUTIVE SUMMARY
   2-3 sentence overview of where things stand.

2. KEY ACHIEVEMENTS THIS MONTH
   Major milestones and outcomes.

3. METRICS / PROGRESS INDICATORS
   Quantitative progress where available.

4. RISKS & ESCALATIONS
   What leadership needs to be aware of.

5. OUTLOOK & NEXT MONTH PRIORITIES
   What's coming and what to expect.

6. DECISIONS / SUPPORT NEEDED
   What leadership needs to act on.
```

**Section guidelines:**

**1. Executive Summary**
- 2-3 sentences maximum. This is the "if you read nothing else" section.
- Should convey: overall health, biggest win, biggest concern.
- Written for someone who has 30 seconds.

**2. Key Achievements**
- Focus on outcomes and milestones, not tasks.
- Tie to business impact where possible ("Completed X, which enables Y" or "Reduced Z by N%").
- For concise mode: 3-4 highlights. For detailed mode: comprehensive list.

**3. Metrics / Progress Indicators**
- Use a table if the user has provided quantitative data (e.g., velocity, completion %, user counts, cost savings).
- If no metrics are provided, include a placeholder: "[PLACEHOLDER: Add relevant metrics — e.g., sprint velocity, feature completion %, adoption rate]"
- Don't fabricate numbers.

**4. Risks & Escalations**
- Similar to weekly format but framed for leadership — focus on business impact, not technical details.
- Each risk should include severity (High/Medium/Low), mitigation status, and whether escalation is needed.
- Format as a table:

```
| Risk | Severity | Mitigation | Escalation Needed? |
```

**5. Outlook & Next Month Priorities**
- 3-5 priorities for the upcoming month.
- Frame in terms of expected outcomes, not activities.

**6. Decisions / Support Needed**
- Same as weekly format but framed for a leadership audience.
- Be explicit about what you need and by when.

---

### Step 5: Generate the Output File

**If .docx:** Read `/mnt/skills/public/docx/SKILL.md` for best practices. Formatting:
- US Letter page size, 1-inch margins
- Arial font, 12pt body
- Heading 1 for main sections
- Heading 2 for subsections (workstreams, individual blockers)
- RAG status displayed as a colored table cell in the header area:
  - Use a small single-cell table with colored shading (ShadingType.CLEAR) and white bold text
  - Green: fill "4CAF50", Amber: fill "FFC107" (dark text), Red: fill "F44336"
- Tables for metrics, risks, and decisions (dual widths, DXA, ShadingType.CLEAR)
- Clean, minimal formatting — stakeholder updates should look professional but not over-designed
- No title page — start directly with the header block (project name, period, RAG)
- Page numbers in footer

**If .md:** Clean markdown. Use emoji for RAG: 🟢 Green, 🟡 Amber, 🔴 Red.

**Filename:**
- Weekly: `Update_<ProjectName>_Week_<DateOrSprint>.docx` or `.md`
- Monthly: `Update_<ProjectName>_<Month>_<Year>.docx` or `.md`

Save to `/mnt/user-data/outputs/` and use `present_files` to share.

### Step 6: Summary

After generating, provide a brief chat summary:

```
Here's your stakeholder update:

[RAG emoji] Overall status: [Green/Amber/Red]
📋 X progress items captured
⚠️ Y blockers/risks flagged
📅 Z upcoming items
✋ W decisions needing stakeholder input

[Any flags — e.g., "No metrics were provided — added a placeholder section" or "RAG set to Amber based on the 2 unresolved blockers you mentioned"]
```

## Content Rules

- **NEVER fabricate progress, metrics, or status.** Only report what the user has shared.
- **Write for the audience.** Weekly updates can be slightly more technical. Monthly leadership updates should be business-oriented — minimize jargon, lead with impact.
- **RAG must be honest.** Don't default to Green to make things sound good. If there are blockers, it's Amber. If milestones are missed, it's Red. The user's stakeholders will trust them more if the RAG reflects reality.
- **Keep concise mode genuinely concise.** One page means one page. Ruthlessly prioritize.
- **Frame blockers constructively.** "Authentication spec is delayed, waiting on security team review — expected by Friday" is useful. "Security team is slow" is not.
- **Decisions should be actionable.** "We need to decide on X" is vague. "Should we proceed with Option A (faster, less scalable) or Option B (slower, more robust)? Recommend A given timeline pressure." is useful.

## Important Notes

- If the user provides messy, unstructured notes (e.g., Slack messages, brain dumps), the skill's primary job is to transform that into a polished, structured update. Don't ask them to restructure their input.
- If the user wants to generate updates regularly, suggest they keep the same project context across sessions and just share "what changed this week."
- If the user asks for both a weekly and monthly update from the same input, generate both as separate documents.
- The skill should work for any project type — software, product launches, migrations, process improvements. Don't assume software/agile terminology unless the user uses it.
