---
name: meeting-synthesizer
description: "Use this skill whenever the user asks to summarize, synthesize, or organize meeting notes, transcripts, or minutes. Trigger on phrases like 'summarize this meeting', 'synthesize these notes', 'extract action items from this meeting', 'turn these notes into meeting minutes', 'what were the decisions from this meeting', 'organize my meeting notes', 'create meeting minutes', or any mention of meeting notes, transcripts, or minutes combined with summarization or extraction. Also trigger when the user pastes a block of text and says something like 'these are my meeting notes' or 'here are notes from a call'. This skill handles the full workflow: reading the input, gathering metadata, extracting decisions, action items, key points, and open questions, and outputting a clean synthesized document in .docx or .md format. Do NOT use for general text summarization unrelated to meetings, or for creating agendas for future meetings."
---

# Meeting Synthesizer Skill

## Overview

This skill takes raw meeting notes or transcripts and synthesizes them into a structured document with decisions, action items (with owners and deadlines), key discussion points, and open questions. It outputs in either .docx or .md format.

## Workflow

### Step 1: Receive Input

The user will provide meeting content in one of two ways:

- **Copy-pasted text** — raw notes, bullet points, or stream-of-consciousness notes pasted directly into the chat
- **Uploaded file** — a .txt or .docx file containing meeting notes or a transcript

If the user uploads a .docx file, read it using the docx skill approach (refer to `/mnt/skills/public/docx/SKILL.md` for reading .docx files). If .txt, read directly.

If the user says something like "here are my meeting notes" but doesn't actually provide any content or attachment, ask them to paste the notes or upload the file.

### Step 2: Gather Metadata

Before generating the output, ask for meeting metadata. Use a brief, conversational prompt — not a form. Ask for:

1. **Meeting name/title** — what was this meeting about?
2. **Date** — when did it happen?
3. **Attendees** — who was present? (names and optionally roles)

**How to ask:**
- If any of this is already evident from the notes (e.g., the notes start with "Sprint Planning — Feb 24" or mention attendees), extract it and confirm with the user rather than asking from scratch.
- Ask all three in one message, not one at a time.
- If the user says "just use what's in the notes" or wants to skip metadata, proceed without it and use placeholders.

### Step 3: Configuration

Ask the user two things using the `ask_user_input_v0` tool:

**Question 1 — Organization:**
- Group by discussion topic / agenda item
- Flat structure (no grouping)

**Question 2 — Output format:**
- Word document (.docx)
- Markdown file (.md)

### Step 4: Synthesize

Read through the meeting notes carefully and extract the following sections:

#### 4.1 Meeting Header

```
Meeting: [Title]
Date: [Date]
Attendees: [Names]
```

#### 4.2 Key Discussion Points / Summary

A concise synthesis of what was discussed. Not a transcript rehash — a distilled version that someone who missed the meeting could read in 2 minutes and understand what happened.

**Rules:**
- Write in past tense ("The team discussed...", "It was agreed that...")
- Keep each point to 2-3 sentences max
- If the user chose grouped output, organize these under topic/agenda headers
- If flat, present as a numbered or bulleted summary

**If grouped by topic:**
```
## [Topic/Agenda Item 1]
[Summary of discussion on this topic]

## [Topic/Agenda Item 2]
[Summary of discussion on this topic]
```

Detect topics from the natural flow of the notes — shifts in subject, explicit agenda items mentioned, or distinct themes. If the notes are too unstructured to detect clear topics, fall back to a flat summary and let the user know.

#### 4.3 Decisions Made

Extract every explicit or clearly implied decision from the notes. Format:

```
D1: [Decision statement — clear, specific, unambiguous]
    Context: [Brief context on why this decision was made, if available]

D2: [Decision statement]
    Context: [Brief context]
```

**Rules:**
- A decision is something that was agreed upon, resolved, or committed to. Not a discussion point.
- Write decisions as definitive statements ("The team will use React for the frontend", not "React was discussed as an option")
- If the notes have discussion but no clear decision on a topic, do NOT fabricate a decision. Instead, move it to Open Questions.
- If no decisions are found in the notes, include the section with a note: "No explicit decisions were identified in these notes."

#### 4.4 Action Items

Extract every action item with owner and deadline. Format:

```
| # | Action Item | Owner | Deadline | Status |
|---|-------------|-------|----------|--------|
| 1 | [Specific task] | [Person name] | [Date or "TBD"] | Open |
| 2 | [Specific task] | [Person name] | [Date or "TBD"] | Open |
```

**Rules:**
- An action item must be a specific, doable task — not a vague intention.
- If the owner is mentioned in the notes, use their name. If not, mark as "[Unassigned]".
- If a deadline is mentioned, include it. If not, mark as "TBD".
- All items default to "Open" status.
- If someone said "I'll look into X" or "Can you check on Y" — those are action items. Extract them.
- If no action items are found, include the section with a note: "No action items were identified in these notes."

#### 4.5 Open Questions / Parking Lot

Capture anything that was raised but not resolved, needs follow-up, or was explicitly deferred.

```
Q1: [Question or unresolved item]
    Raised by: [Person, if known]

Q2: [Question or unresolved item]
    Raised by: [Person, if known]
```

**Rules:**
- This includes items where discussion happened but no decision was reached
- Items explicitly deferred ("let's take this offline", "we'll revisit next week")
- Questions asked that didn't get answered
- If none found, include the section with: "No open questions were identified."

### Step 5: Generate the Output File

**If .docx:** Read `/mnt/skills/public/docx/SKILL.md` for docx creation best practices. Formatting:
- US Letter page size, 1-inch margins
- Arial font, 12pt body
- Heading 1 for main sections (Key Discussion Points, Decisions, Action Items, Open Questions)
- Heading 2 for topic groups (if grouped output)
- Tables for action items (use proper docx-js tables with dual widths, DXA units, ShadingType.CLEAR)
- Clean, minimal formatting
- Header or title block with meeting metadata (name, date, attendees)
- Page numbers in footer

**If .md:** Clean markdown with proper heading hierarchy, table for action items, and standard markdown formatting.

**Filename:** `Meeting_Notes_<MeetingName>_<Date>.docx` or `.md` (sanitize for filesystem safety, replace spaces with underscores)

Save to `/mnt/user-data/outputs/` and use `present_files` to share.

### Step 6: Summary

After generating, provide a brief inline summary (not in the document — in the chat):

```
Here's your synthesized meeting notes:

📝 X key discussion points
✅ Y decisions captured
📌 Z action items (A assigned, B unassigned)
❓ W open questions

[Any flags — e.g., "Some action items didn't have clear owners, marked as Unassigned" or "The notes were quite sparse on the X topic — you may want to add detail."]
```

Keep it tight. The document has the detail.

## Content Rules

- **NEVER invent information.** If it's not in the notes, it doesn't go in the output. No filling gaps with assumptions.
- **NEVER attribute statements to specific people** unless the notes clearly indicate who said what.
- **Resolve ambiguity conservatively.** If it's unclear whether something was a decision or just a discussion, put it in Open Questions, not Decisions.
- **Keep summaries shorter than the original notes.** The whole point is synthesis, not expansion. If the original notes are 500 words, the summary should be meaningfully shorter.
- **Preserve nuance on contentious points.** If the notes indicate disagreement or debate, capture that ("There was disagreement on X, with some favoring A and others B") rather than flattening it into a false consensus.

## Important Notes

- If the notes are extremely short or sparse (e.g., just 3-4 bullet points), still produce the output but flag that the synthesis is limited by the input quality. Suggest what additional detail would help.
- If the notes appear to be from multiple meetings mixed together, ask the user to confirm before proceeding.
- If the user wants to add or correct something after generation, offer to regenerate or update the document.
- The skill should work equally well for standup notes, sprint planning, stakeholder reviews, brainstorms, and 1-on-1s — it's not opinionated about meeting type.
