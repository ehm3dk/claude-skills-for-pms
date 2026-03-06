---
name: stakeholder-update
description: "Generate professional stakeholder or executive updates. Use when: stakeholder update, status report, executive update, leadership update, sprint update, weekly update, monthly update, progress report, exec summary, board update, project update for leadership."
---

# Stakeholder Update

Generate a professional update for any audience — weekly sprint summaries, monthly leadership reports, or executive/board updates. Uses RAG status and SCARF structure for clarity.

## Step 1: Gather Context

**Must-have (ask if missing):**
- Project or product name
- What happened this period (progress, completed items, key activities)

**Nice-to-have (use if provided, don't interrogate):**
- Current blockers or risks
- Upcoming milestones or next steps
- Decisions needed from stakeholders
- Key metrics with current vs. target values
- Team or workstream names
- Sprint number or reporting period

**How to ask:** One natural message. If the user dumps raw notes or bullet points, work with that — turning messy input into polished updates is the point. If the user says "just write it based on what I gave you," proceed and mark gaps as placeholders.

## Step 2: Configure

Ask three things:

**Audience:**
- Team / immediate stakeholders (weekly/sprint update — tactical)
- Senior leadership (monthly update — strategic)
- Executive / board (exec update — scannable, decisions-focused)

**Length:**
- Concise (1 page max, scannable)
- Detailed (as much context as needed)

**Format:**
- Word document (.docx)
- Markdown (.md)

## Step 3: Determine RAG Status

Assess overall project health:
- **Green** — on track, no significant blockers, milestones being met
- **Amber** — at risk, blockers or risks exist but mitigations are in place
- **Red** — off track, critical blockers, missed milestones, escalation needed

Rules:
- Derive RAG from actual content. If there are unresolved blockers or missed dates, it's Amber or Red.
- If not enough info to assess, default Green and note: "RAG based on available information — no blockers or risks reported."
- Never fabricate a status to make things look better or worse.

## Step 4: Generate the Update

Structure varies by audience:

---

### Team / Sprint Update

```
[Project Name] — Weekly Update
Period: [Date range or Sprint #]
Overall Status: [🟢/🟡/🔴 + one-line justification]

1. PROGRESS SUMMARY
   Completed outcomes this period (not task descriptions).
   Group by workstream if multiple teams involved.
   Concise: 4-6 bullets. Detailed: as many as needed.

2. BLOCKERS & RISKS
   Blocker: [Description]
   Waiting on: [Person/team/dependency]
   Impact: [What happens if not resolved]

   Distinguish active blockers (stopping work now) from risks (could become blockers).
   If none: "No blockers reported this period."

3. UPCOMING (NEXT SPRINT / NEXT WEEK)
   What's planned next. Tie to milestones/dates where available.
   Concise: 3-5 items. Detailed: full plan.

4. DECISIONS NEEDED
   Decision: [What needs to be decided]
   Context: [Why this matters / what's at stake]
   Needed by: [Date or "Next sync"]

   If none: "No decisions required at this time."
```

---

### Monthly Leadership Update

```
[Project Name] — Monthly Update
Period: [Month, Year]
Overall Status: [🟢/🟡/🔴 + one-line justification]

1. EXECUTIVE SUMMARY
   2-3 sentences max. Convey: overall health, biggest win, biggest concern.
   Written for someone who has 30 seconds.

2. KEY ACHIEVEMENTS THIS MONTH
   Outcomes and milestones, not tasks.
   Tie to business impact ("Completed X, which enables Y" or "Reduced Z by N%").
   Concise: 3-4 highlights. Detailed: comprehensive list.

3. METRICS / PROGRESS INDICATORS
   Table with current vs. target vs. last period.
   If no metrics provided: [PLACEHOLDER: Add relevant metrics]

4. RISKS & ESCALATIONS
   | Risk | Severity | Mitigation | Escalation Needed? |
   Frame for leadership — business impact, not technical detail.

5. OUTLOOK & NEXT MONTH PRIORITIES
   3-5 priorities framed as expected outcomes, not activities.

6. DECISIONS / SUPPORT NEEDED
   What leadership needs to act on. Explicit ask + deadline.
```

---

### Executive / Board Update (SCARF Framework)

```
[Project/Team Name] — Status Update
Period: [Date Range]
Status: 🟢 On Track / 🟡 At Risk / 🔴 Blocked

TL;DR
[2-3 sentences: punchline first — status, biggest win, biggest concern]

STATUS: [Green/Yellow/Red]
Why: [One sentence]

WHAT WE ACCOMPLISHED
✅ [Accomplishment] — [Impact]
✅ [Accomplishment] — [Impact]

KEY METRICS
| Metric | Last Period | This Period | Target | Status |
|--------|-------------|-------------|--------|--------|
Mark missing metrics as [NEEDS DATA] — never guess.

RISKS & BLOCKERS
🟡 [Risk]: Impact: [what happens] | Mitigation: [what we're doing] | Help needed: [ask or None]
🔴 [Blocker]: Impact: [what's blocked] | Help needed: [specific ask]

DECISIONS NEEDED
| Decision | Context | Options | Deadline |

NEXT PERIOD FOCUS
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]
```

SCARF = **S**tatus, **C**ontext, **A**ction, **R**isks, **F**orward. Lead with the punchline. Execs read in 2 minutes.

---

## Step 5: Generate Output File

**If .docx:** US Letter, 1-inch margins, Arial 12pt. RAG status as a colored table cell (Green: 4CAF50, Amber: FFC107, Red: F44336). Tables for metrics, risks, decisions. No title page — start with header block. Page numbers in footer.

**If .md:** Use emoji for RAG: 🟢 🟡 🔴

**Filename:**
- Sprint: `Update_<ProjectName>_Week_<DateOrSprint>.docx/.md`
- Monthly: `Update_<ProjectName>_<Month>_<Year>.docx/.md`
- Exec: `ExecUpdate_<ProjectName>_<Period>.docx/.md`

After generating, provide a brief chat summary:
```
[RAG emoji] Overall status: [Green/Amber/Red]
📋 X progress items captured
⚠️ Y blockers/risks flagged
📅 Z upcoming items
✋ W decisions needing input

[Any flags — e.g., "No metrics provided — added placeholder" or "RAG set to Amber based on 2 unresolved blockers"]
```

## Content Rules

- **NEVER fabricate progress, metrics, or status.** Only report what the user shared.
- **RAG must be honest.** Don't default to Green to make things sound good.
- **Write for the audience.** Sprint updates can be slightly technical. Leadership updates should be business-oriented — minimize jargon, lead with impact.
- **Keep concise mode genuinely concise.** One page means one page.
- **Frame blockers constructively.** "Auth spec delayed, waiting on security team — expected Friday" is useful. "Security team is slow" is not.
- **Make decisions actionable.** "Should we proceed with Option A (faster, less scalable) or Option B (slower, more robust)? Recommend A given timeline pressure." is useful. "We need to decide on X" is not.

## Tips

1. **Lead with the punchline** — execs and busy stakeholders read the first 2 sentences and skim the rest
2. **Be honest about status** — Amber is okay. Surprises are not.
3. **Make asks explicit** — "I need X by Y" beats "We could use help with Z"
4. **Link to strategic priorities** where possible
5. If the user wants both weekly and monthly updates from the same input, generate both as separate documents
