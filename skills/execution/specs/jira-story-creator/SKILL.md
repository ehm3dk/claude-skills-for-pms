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

...

## Phase 3: Review Gate

...

## Phase 4: Jira Creation

...

## Jira Field Template

...

## Error Handling

...
