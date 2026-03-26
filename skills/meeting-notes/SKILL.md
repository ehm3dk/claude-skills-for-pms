---
name: meeting-notes
description: "Process meeting notes or transcripts into structured documents. Use when: summarize meeting, extract action items, meeting minutes, synthesize notes, process notes, create meeting summary, what were the decisions, extract action items from meeting."
---

# Meeting Notes

Take raw meeting notes or transcripts and produce a structured document with decisions, action items, key discussion points, and open questions. Outputs in .docx or .md format.

## Step 1: Receive Input

The user will provide meeting content as:
- **Pasted text** — raw notes, bullet points, or transcript pasted directly
- **Uploaded file** — .txt or .docx file

If the user says "here are my meeting notes" but provides nothing, ask them to paste or upload.

## Step 2: Load Context

Read the user's context files if they exist:
- `context/company.md` — team members, roles, responsibilities
- `context/product.md` — current priorities, roadmap items

Tell the user what you found. For example:
> "I found your team structure in company.md — Sarah (Engineering), Mike (Design). I'll assign action items to the right people."

## Step 3: Gather Metadata

Ask in one message (not a form):
1. **Meeting name/title** — what was this about?
2. **Date** — when did it happen?
3. **Attendees** — who was present?

If any of this is already in the notes, extract it and confirm rather than asking from scratch. If the user says "just use what's in the notes," proceed with placeholders.

## Step 4: Configure Output

Ask the user:

**Organization:**
- Group by discussion topic / agenda item
- Flat structure (no grouping)

**Format:**
- Markdown file (.md)

## Step 5: Synthesize

Extract and structure the following:

### Meeting Header
```
Meeting: [Title]
Date: [Date]
Attendees: [Names and roles]
Duration: [If mentioned]
```

### Key Discussion Points

A distilled version someone who missed the meeting could read in 2 minutes.
- Write in past tense ("The team discussed...", "It was agreed that...")
- 2-3 sentences per point
- If grouped: organize under topic/agenda headers detected from the notes
- If flat: numbered bullet summary

**Stranger Test:** Would someone who wasn't in the meeting understand this? If not, add context.

### Decisions Made

```
D1: [Decision — clear, specific, unambiguous]
    Context: [Why this decision was made]

D2: [Decision]
    Context: [Context]
```

Rules:
- A decision is something agreed upon or committed to — not just discussed
- Write as definitive statements ("The team will use X", not "X was discussed")
- If discussion happened but no decision reached, put it in Open Questions
- If none: "No explicit decisions were identified in these notes."

### Action Items

| # | Action Item | Owner | Deadline | Status |
|---|-------------|-------|----------|--------|
| 1 | [Specific task] | [Person] | [Date or TBD] | Open |

Rules:
- Must be a specific, doable task — not a vague intention
- "I'll look into X" and "Can you check on Y" are action items
- If owner not mentioned: "[Unassigned]"
- If deadline not mentioned: "TBD"
- If none: "No action items were identified in these notes."

### Open Questions / Parking Lot

```
Q1: [Question or unresolved item]
    Raised by: [Person, if known]

Q2: [Deferred topic]
    Revisit: [When, if mentioned]
```

Includes: unresolved items, things deferred ("let's take this offline"), questions that didn't get answered.

### Next Meeting

If mentioned in the notes:
```
Next Meeting: [Date]
Suggested Agenda:
1. Review action items from this meeting
2. [Item from notes]
```

## Step 6: Generate Output File

**If .docx:** US Letter, 1-inch margins, Arial 12pt, Heading 1 for main sections, Heading 2 for topic groups, tables for action items. Header block with meeting metadata. Page numbers in footer.

**If .md:** Clean markdown, proper heading hierarchy, table for action items.

**Filename:** `Meeting_Notes_<MeetingName>_<Date>.docx` or `.md`

After generating, provide a brief chat summary:
```
📝 X key discussion points
✅ Y decisions captured
📌 Z action items (A assigned, B unassigned)
❓ W open questions

[Any flags — sparse notes, unowned action items, etc.]
```

## Content Rules

- **NEVER invent information.** If it's not in the notes, it doesn't go in the output.
- **NEVER attribute statements to specific people** unless the notes clearly indicate who said what.
- **Resolve ambiguity conservatively** — if unclear whether something was a decision or discussion, put it in Open Questions.
- **Preserve nuance on contentious points** — if there was disagreement, capture it ("There was disagreement on X, with some favoring A and others B") rather than flattening to false consensus.
- **Keep summaries shorter than the original notes** — if the notes are 500 words, the summary should be meaningfully shorter.
- If notes appear to be from multiple meetings mixed together, ask the user to confirm before proceeding.

## Suggested Follow-ups

After processing:
- [ ] Save major decisions to `decisions/` folder
- [ ] Update `product.md` if roadmap decisions were made
- [ ] Add action items to task management system
