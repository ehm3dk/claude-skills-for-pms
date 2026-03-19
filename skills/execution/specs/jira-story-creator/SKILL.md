---
name: "jira-story-creator"
description: "Use this skill when the user wants to plan and create engineering-ready stories directly in Jira. Trigger on: 'create jira stories', 'push stories to jira', 'write stories for this epic', 'create stories under [epic key]', 'make jira tickets for this feature', or any combination of story/ticket creation intent with a Jira destination. Also trigger when the user shares a feature brief, PRD, or Jira epic and asks to 'break it down into tickets', 'generate stories', or 'create the backlog'. Do NOT trigger for story generation to documents — use user-story-writer for .docx or .md output."
argument-hint: "[feature description, PRD text, or Jira epic key/URL]"
---

# Jira Story Creator

## Overview

This skill takes any planning input and creates fully structured, engineering-ready stories directly in Jira via the Atlassian MCP. It runs in 4 phases: context gathering, story generation, review, and Jira creation.

## Phase 1: Context Gathering

Accept any of the following as input — alone or in combination:
- Free-text feature description or brief
- Pasted PRD or BRD content
- A Jira epic key (e.g., `DLRUSER-123`) or URL
- A combination of the above

**If a Jira epic key or URL is provided:**
- Extract the epic key from the URL if needed (format: `PROJECT-123`)
- Call `getJiraIssue` with the epic key to fetch the epic title, description, and any existing context
- Use this as the primary source of truth for what to build

**Ask only for what is clearly missing.** You need at minimum:
- What the feature or product is
- Who the users/personas are (needed for "As a [user]..." story format)
- What core actions the user should be able to perform

If the user says "just go" or "proceed with what you have", mark any inferences as `[Assumption: ...]` and continue. Every assumption made in this phase must be carried forward and displayed in the Phase 3 review summary.

**Jira project inference (follow this order strictly):**
1. If an epic key is provided, extract the project from its prefix (e.g., `DLRUSER-123` → project `DLRUSER`)
2. If input is free-text only, ask the user to explicitly confirm the target Jira project key before Phase 4 — never infer silently
3. After the first story is created, if it lands in the wrong project, flag this immediately and ask whether to continue or abort

## Phase 2: Story Generation

Draft all stories using the field template below. For each story:

- Write one story per distinct user action or behaviour
- Do not combine multiple behaviours into a single story
- Be specific — "As a dealer, I want to filter my inventory by make and model" not "As a user, I want to filter"
- Mark any inference not provided by the user as `[Assumption: ...]`
- Mark any section you cannot complete due to missing context as `[Needs input from engineering]`
- Omit sections that genuinely do not apply — do not leave blank headings

### Story Format

Use this structure for every story:

---

**[PREFIX-NNN] Story title**

**Story:** As a [specific persona], I want [specific action], so that [clear benefit].

**Description**
[2–3 sentences: what this story delivers, why it matters, what system/flow it belongs to]

**Acceptance Criteria**
- Given [precondition], When [action], Then [outcome].
- Given [precondition], When [action], Then [outcome].

**Test Cases**
1. [Happy path: normal use, expected result]
2. [Edge case: boundary or unusual input]
3. [Failure case: what happens when something goes wrong]

**Engineering Approach**
[Suggested technical implementation. Mark as `[Assumption]` if speculative. Skip if no context is available.]

**Functional Requirements**
- [What the system must do — specific and testable]
- [Another requirement]

**Non-Functional Requirements**
- [Performance, accessibility, security, or compatibility constraints — only where relevant]

**Data Requirements**
- [New fields, schema changes, API dependencies — omit if none]

**Instrumentation**
- [Google Analytics events, tracking calls — only for user-facing interactions. Format: `event_name` on `trigger`. Omit if not applicable.]

**Engineering Instructions**
1. [Step-by-step dev guidance — specific enough to act on]
2. [Next step]

**Rollout Considerations**
- [Feature flags, phased rollout, story dependencies, migration concerns — omit if none]

---

### Story ID Convention

Use a short prefix derived from the feature or epic name:
- `DLRUSER` epic → prefix `DU`
- `DLRINV` epic → prefix `DI`
- Free-text feature → derive a 2–3 letter prefix from the feature name, confirm with user

Number sequentially: `DU-001`, `DU-002`, etc.

## Phase 3: Review Gate

Present a numbered summary list of all stories — title and one-line description only. Follow it with a consolidated list of all `[Assumption: ...]` tags made in Phases 1 and 2.

Example format:

```
Stories to create (8 total):

1. DU-001 — Filter inventory by make/model: Dealer can narrow their stock list using dropdowns
2. DU-002 — Save filter preferences: System remembers the dealer's last-used filters
...

Assumptions made:
- [Assumption: Engineering will use the existing filter component from the search page]
- [Assumption: GA event name follows the existing `dealer_action_` prefix convention]

What would you like to do?
  a) Approve all and create in Jira
  b) Revise specific stories (tell me which ones and what to change)
  c) Skip certain stories (tell me which ones)
  d) Just create them (skip this review)
```

**If the user chooses to revise specific stories:**
- Ask them to specify which stories and what to change
- Regenerate only those stories (loop back through Phase 2 for just those stories)
- Re-present the full updated summary list
- Repeat until the user approves

**If the user says "just create them" or equivalent:**
- Proceed directly to Phase 4 without further confirmation

## Phase 4: Jira Creation

### Duplicate Check

Before creating any stories, if a target epic is provided, run a duplicate check:

```
searchJiraIssuesUsingJql: project = [PROJECT] AND "Epic Link" = [EPIC_KEY] ORDER BY created DESC
```

If stories with identical or very similar titles exist, list them and ask the user whether to proceed.

### Epic Handling

**If an epic was provided:** link stories to it using the method below.

**If no epic exists and the user wants one:**
- Create the epic first: `createJiraIssue` with `issuetype: Epic`, `summary: [Epic title]`, `project: [PROJECT]`
- Note the returned epic key, then link all stories to it

**If no epic exists and the user wants stories unlinked:** proceed without a parent.

### Creating Each Story

For each approved story, call `createJiraIssue` with these fields:

```
summary: [story title]
issuetype: { name: "Story" }
project: { key: "[PROJECT]" }
description: [ADF-formatted content — see Jira Field Template section]
parent: { key: "[EPIC_KEY]" }   ← attempt this first
```

**Epic link fallback:** If `parent` fails (Classic project), retry with:
```
customfield_10014: "[EPIC_KEY]"
```
Note which method succeeded for the rest of the batch.

After each story is created, output:
```
✓ [ISSUE_KEY] — [Story title]
```

If creation fails, output:
```
✗ [Story title] — [error message] (skipped, will retry at end)
```
Continue with remaining stories.

### End Summary

After all stories are attempted:

```
Created X of Y stories:

✓ DLRUSER-456 — Filter inventory by make/model
✓ DLRUSER-457 — Save filter preferences
✗ DU-003 — Export filtered list (failed: [reason]) ← retry? y/n
```

Offer retry for any failed stories.

## Jira Field Template

...

## Error Handling

...
