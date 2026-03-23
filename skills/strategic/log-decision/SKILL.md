---
name: "log-decision"
description: "Use when the user wants to log an architectural, product, or technical decision to Confluence. Trigger on: '/log-decision', 'log a decision', 'document a decision', 'create a decision log', 'record this decision', 'ADR'. Asks structured questions then creates a new child Confluence page with a two-column ADF decision log table."
argument-hint: "[optional: parent Confluence page URL or page ID]"
---

# Log Decision

## Overview

Guides the user through a structured set of questions one at a time, then creates a new child Confluence page under a specified parent page. The page contains a two-column ADF decision log table with the decision title as the page title.

**What this skill does:**
- Asks 9 questions one at a time (title, date, contributors, linked work, considerations, decision, estimated effort, consequences, next steps)
- Shows a summary and asks for confirmation before writing
- Looks up the numeric spaceId from the space key using `getConfluenceSpaces`
- Creates a new child page under the parent using `createConfluencePage` with ADF content

---

## Phase 1: Ask Questions

Ask each question **one at a time** in the order below. Wait for the user's answer before moving to the next. Skip **Linked Work** and **Estimated Effort** if the user says "skip" or "none".

| # | Field | Question to ask |
|---|---|---|
| 1 | **Title** | "What's a short title for this decision?" |
| 2 | **Date** | "What date was this decision made? (default: today)" |
| 3 | **Contributors** | "Who were the contributors? (names or @mentions)" |
| 4 | **Linked Work** | "Any linked Jira tickets or Confluence pages? (or skip)" |
| 5 | **Considerations** | "What's the context or background that drove this decision? What problem or situation prompted it?" |
| 6 | **Decision** | "What was decided? Be specific." |
| 7 | **Estimated Effort** | "What's the estimated engineering effort? (or skip)" |
| 8 | **Consequences** | "What are the positive outcomes? What are the risks or negatives?" |
| 9 | **Next Steps** | "What actions or follow-ups come from this decision?" |

After collecting all answers, show a summary and ask: **"Looks good — shall I write this to Confluence?"**

If the user provided a parent page URL or ID as an argument, create the child page under that parent. Otherwise ask: **"Which Confluence page should this live under? (paste parent page URL or page ID)"**

---

## Phase 2: Build ADF Table

Build the decision log as a 2-column table — narrow left column (labels) and wide right column (values).

**Full ADF table structure:**

```json
{
  "type": "table",
  "attrs": { "layout": "center", "width": 1800 },
  "content": [
    { "ROW": "Date" },
    { "ROW": "Contributors" },
    { "ROW": "Linked Work" },
    { "ROW": "Considerations" },
    { "ROW": "Decision" },
    { "ROW": "Estimated Effort" },
    { "ROW": "Consequences" },
    { "ROW": "Next Steps" }
  ]
}
```

**Each row structure:**
```json
{
  "type": "tableRow",
  "content": [
    {
      "type": "tableHeader",
      "attrs": { "colspan": 1, "rowspan": 1, "colwidth": [236] },
      "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "LABEL", "marks": [{ "type": "strong" }] }] }]
    },
    {
      "type": "tableCell",
      "attrs": { "colspan": 1, "rowspan": 1, "colwidth": [1563] },
      "content": [ ... cell content ... ]
    }
  ]
}
```

**Cell content rules:**

- **Date**: Use a Confluence date inline node: `{ "type": "date", "attrs": { "timestamp": "EPOCH_MS_UTC_MIDNIGHT" } }`
- **Contributors**: Plain text (names as typed, or mention nodes if account IDs are known)
- **Linked Work**: Paragraph with inline links for Jira keys and Confluence URLs; empty paragraph if skipped
- **Considerations**: One paragraph per point, key phrases **bolded**
- **Decision**: One paragraph with key outcome **bolded**
- **Estimated Effort**: Single paragraph; empty paragraph if skipped
- **Consequences**: `Positive` bold paragraph + bullet list of positives, then `Negative / Risks` bold paragraph + bullet list of risks
- **Next Steps**: One paragraph per step

---

## Phase 3: Write to Confluence

### Step 1 — Extract page ID and space key from URL

Given a URL like `https://carsales.atlassian.net/wiki/spaces/DEAL/pages/3510665321/Inventory+Decision+Log`:
- `pageId` = `3510665321`
- `spaceKey` = `DEAL`

### Step 2 — Look up the numeric spaceId

Call `getConfluenceSpaces` with the space key to get the numeric `id`:

```
getConfluenceSpaces:
  cloudId: carsales.atlassian.net
  keys: <spaceKey>
```

Use the `id` field from the result (e.g. `"id": "14614629"`).

### Step 3 — Create the child page

Call `createConfluencePage` with the exact parameter names below:

```
createConfluencePage:
  cloudId: carsales.atlassian.net
  spaceId: <numeric id from Step 2>
  parentId: <pageId from Step 1>
  title: <decision title>
  contentFormat: adf
  body: <full ADF doc with the table>
```

After a successful create, output:

```
✓ Decision logged
  <new Confluence page URL>
```

---

## Error Handling

| Scenario | Response |
|---|---|
| User skips a required field (Considerations, Decision) | Re-ask once with a simpler prompt |
| No parent page provided | Ask for parent page URL or ID before proceeding |
| 400 — page with same title already exists | Tell the user and ask for a different title |
| Any other page creation failure | Show the error message and ask the user to verify the parent page URL |
