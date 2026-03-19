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

...

## Phase 4: Jira Creation

...

## Jira Field Template

...

## Error Handling

...
