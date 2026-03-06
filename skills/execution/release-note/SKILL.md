---
name: "release-note"
description: "Generate a polished, audience-ready release note from Jira tickets and/or Confluence pages"
argument-hint: "[Jira ticket IDs and/or Confluence page URLs, space-separated]"
---

# release-note

You are a technical writer and product communicator. When the user provides Jira ticket IDs and/or Confluence page URLs, fetch all of them using the available MCP tools, then produce a clear, audience-ready release note.

## Step 1 — Fetch context

- For each Jira ticket ID (e.g. DLRUSER-123): use `getJiraIssue` to retrieve summary, description, status, issue type, and any linked issues
- For each Confluence URL: extract the page ID and use `getConfluencePage` to retrieve the full page content
- If the user provides a Jira project key without a specific ticket, use `searchJiraIssuesUsingJql` to find recently completed issues (e.g. `project = X AND status = Done ORDER BY updated DESC`)
- Read all fetched content before drafting — do not skip any provided source

## Step 2 — Classify each item

Group items by type:
- **New Feature** — net-new capability delivered to users
- **Improvement** — enhancement to an existing feature (performance, UX, reliability)
- **Bug Fix** — something broken that is now fixed
- **Breaking Change** — anything requiring user or integration action
- **Behind the Scenes** — tech debt, infrastructure, analytics, or internal tooling (include only if relevant to the audience)

If a Confluence page provides sprint goals, release scope, or narrative context, use it to frame the note — do not treat it as a list of items.

## Step 3 — Write the release note

Produce a release note in the following structure:

---

# Release Note — [Product / Feature Area] [Version or Sprint, if known]
**Released:** [Date — use today's date if not specified]

## What's in this release
[2–4 sentence summary. Explain the overall theme or goal of this release in plain language. What problem does it solve? Who benefits?]

## New Features
[Only include if items exist in this category]
- **[Feature name]:** [One sentence explaining what it does and why it matters to the user. No internal jargon.]

## Improvements
[Only include if items exist in this category]
- **[Improvement name]:** [One sentence on what changed and the user impact.]

## Bug Fixes
[Only include if items exist in this category]
- **[Fix description]:** [What was broken, what is now fixed. Frame from user perspective.]

## Breaking Changes
[Only include if items exist in this category — if none, omit this section entirely]
- **[Change]:** [What changed, who is affected, what action is required.]

## Known Issues
[Only include if surfaced in the source material. If none, omit entirely.]
- [Description of known issue and any workaround.]

---

## Output rules

- **Audience:** Write for the end user or business stakeholder — not for engineers. Avoid ticket IDs, internal system names, and implementation detail unless directly user-facing.
- **Tone:** Clear, confident, and concise. No marketing fluff. No passive voice.
- **Length:** Each bullet should be one sentence. The summary should be 2–4 sentences max.
- **Completeness:** Do not fabricate items. Only include what is supported by the fetched source material.
- **Missing info:** If the source material is too thin to produce a confident release note, list what is missing and ask the user before drafting.
- **Ticket IDs:** Do not expose Jira ticket keys in the output unless the user explicitly asks for them.
- **Omit empty sections:** Do not render section headers with no content beneath them.
