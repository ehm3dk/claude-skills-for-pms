---
name: "update-customer"
description: "Use when the user wants to update the Customer Team Change Log Confluence page with recently shipped DLRUSER items. Trigger on: '/update-customer', 'update customer changelog', 'update customer change log', 'log what shipped for customer', 'what went to prod this week for customer'. Queries the DLRUSER Jira board for Done items and appends them to https://carsales.atlassian.net/wiki/spaces/DEAL/pages/3230072918/Customer+Team+-+Change+Log"
argument-hint: "[optional: number of days to look back, default 7]"
---

# Update Customer Team Change Log

## Overview

Queries the DLRUSER Jira board for items recently moved to **Done**, shows a preview, and appends new entries to the [Customer Team - Change Log](https://carsales.atlassian.net/wiki/spaces/DEAL/pages/3230072918/Customer+Team+-+Change+Log) Confluence page.

---

## Phase 1: Fetch Recent DLRUSER Completions

Determine the lookback window:
1. If the user passed a number of days, use that
2. Otherwise default to **7 days**

Run this JQL query using `searchJiraIssuesUsingJql`:

```
project = DLRUSER
AND status changed to "Done" AFTER -Xd
AND issuetype in (Story, Bug, Task)
ORDER BY updated DESC
```

1. `cloudId`: `carsales.atlassian.net`
2. Fields to fetch: `summary`, `status`, `resolutiondate`, `updated`, `issuetype`, `labels`, `assignee`, `created`
3. Max results: 50
4. Response format: `markdown`

**Filter out noise** — exclude from the candidate list:
1. Issues whose summary starts with "Deploy ", "Test ", "[Retro]", or "[Rollback]"
2. Issues with no `resolutiondate`
3. Duplicate summaries

---

## Phase 2: Read Current Changelog

Fetch the current page using `getConfluencePage`:

```
cloudId: carsales.atlassian.net
pageId: 3230072918
contentFormat: adf
```

Note the **version number** from the response — you'll need it for the update step.

Also note the date of the most recent entry so you can skip any Jira items already logged.

---

## Phase 3: Preview & Confirm

Present the proposed new entries to the user in this format:

```
New entries to add (X items):

  2026-03-23 — Customer details page released to all dealers [DLRUSER-XXXX](https://carsales.atlassian.net/browse/DLRUSER-XXXX)
  2026-03-20 — Fixed customer listing page not loading for group dealers [DLRUSER-XXXX](https://carsales.atlassian.net/browse/DLRUSER-XXXX)

What would you like to do?
  a) Add all and update the page
  b) Remove specific entries (tell me which ones)
  c) Edit a description (tell me which one and what to say)
  d) Cancel
```

**One-line description rules:**
1. Max 100 characters
2. Plain English, no Jira jargon
3. Describe the user-facing or operational change, not the ticket title verbatim
4. Format: present tense, sentence case (e.g. "Customer details page released to all dealers")
5. Include the Jira key as a hyperlink at the end: `[DLRUSER-XXXX](https://carsales.atlassian.net/browse/DLRUSER-XXXX)`

If the user edits or removes entries, update your candidate list and loop back to the preview until they confirm.

---

## Phase 4: Update the Confluence Page

Once approved, update the page using `updateConfluencePage`.

### Month grouping

Always group entries by month. Each month heading includes a total change count:

```
March 2026 - 10 changes
```

**When building the updated page:**

1. Count all entries (new + existing) that fall within each month
2. Update the heading for the current month to reflect the new total (e.g. if there were 6 entries and you're adding 4, the heading becomes "March 2026 - 10 changes")
3. If a month heading already exists in the page body, **prepend** the new entries immediately after the heading and update the count
4. If no heading exists for this month yet, **add a new month heading** with the correct count above the previous month's section

### ADF structure

Build the updated page body in ADF format.

**Month heading block:**
```json
[
  {
    "type": "heading",
    "attrs": { "level": 2 },
    "content": [{ "type": "text", "text": "March 2026 - 10 changes" }]
  }
]
```

**Each new entry** is a numbered list item with:
1. A Confluence date inline node (`type: "date"`, `attrs.timestamp`: epoch ms in UTC at midnight)
2. A text node for the description: ` — [one-line description] `
3. A linked text node for the Jira key pointing to `https://carsales.atlassian.net/browse/DLRUSER-XXXX`

Example ADF snippet for a single entry (wrap all entries in `"type": "orderedList"`):

```json
{
  "type": "listItem",
  "content": [{
    "type": "paragraph",
    "content": [
      {
        "type": "date",
        "attrs": { "timestamp": "1742688000000" }
      },
      {
        "type": "text",
        "text": " — Customer details page released to all dealers "
      },
      {
        "type": "text",
        "text": "[DLRUSER-XXXX]",
        "marks": [{
          "type": "link",
          "attrs": { "href": "https://carsales.atlassian.net/browse/DLRUSER-XXXX" }
        }]
      }
    ]
  }]
}
```

### Update call

```
updateConfluencePage:
  cloudId: carsales.atlassian.net
  pageId: 3230072918
  title: Customer Team - Change Log
  version: <current version + 1>
  body: <full updated ADF body>
```

After a successful update, output:

```
✓ Changelog updated — X new entries added
  https://carsales.atlassian.net/wiki/spaces/DEAL/pages/3230072918/Customer+Team+-+Change+Log
```

---

## Error Handling

| Scenario | Response |
|---|---|
| No Done items found in the lookback window | Tell the user, offer to extend the window |
| All candidates are filtered as noise | Show the raw list and ask the user to pick manually |
| Page version conflict (409) | Re-fetch the page, get new version number, retry once |
| Confluence update fails | Show the error, output the formatted entries as text so the user can paste manually |
| User has no Confluence write access | Output the formatted entries as text for manual copy-paste |
