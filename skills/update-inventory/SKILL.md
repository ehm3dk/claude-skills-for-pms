---
name: "update-inventory"
description: "Use when the user wants to update the Inventory changelog Confluence page with recently shipped DLRINV items. Trigger on: '/update-inventory', 'update inventory changelog', 'log what shipped', 'update the changelog', 'what went to prod this week'. Queries the DLRINV Jira board for Done items and appends them to https://carsales.atlassian.net/wiki/spaces/DEAL/pages/3928391694/Inventory+changelog"
argument-hint: "[optional: number of days to look back, default 7]"
---

# Update Inventory Changelog

## Overview

Queries the DLRINV Jira board for items recently moved to **Done**, shows a preview, and appends new entries to the [Inventory changelog](https://carsales.atlassian.net/wiki/spaces/DEAL/pages/3928391694/Inventory+changelog) Confluence page.

---

## Phase 1: Fetch Recent DLRINV Completions

Determine the lookback window:
1. If the user passed a number of days, use that
2. Otherwise default to **7 days**

Run this JQL query using `searchJiraIssuesUsingJql`:

```
project = DLRINV
AND status changed to "Done" AFTER -Xd
AND issuetype in (Story, Bug, Task)
ORDER BY updated DESC
```

1. `cloudId`: `carsales.atlassian.net`
2. Fields to fetch: `summary`, `status`, `resolutiondate`, `updated`, `issuetype`, `labels`, `assignee`, `created`
3. Max results: 50
4. Response format: `markdown`

**Filter out noise** — exclude from the candidate list:
1. Issues whose summary starts with or contains: "Deploy ", "Test ", "[Retro]", "[Rollback]", "SPIKE", "Spike", "Design Review", "Refactor", "Coordinate", "Decommission", "Shutdown", "Migrate", "Migration"
2. **Never include Teams thread links** — entries that link to a Teams thread instead of a Jira ticket must be excluded, both when adding new entries and when restoring/rebuilding the page. Every entry must reference a Jira ticket. If an entry has no Jira key, skip it entirely.
2. Issues with no `resolutiondate`
3. Duplicate summaries
4. Issues that are clearly internal ops, infrastructure, or tech debt (e.g. database changes, service deprecations, code cleanup, internal tooling)

**Apply the dealer experience test** — after filtering noise, apply one more pass:
> *Would a dealer notice this change, or benefit from it? If not, exclude it.*

Only include items where the answer is clearly yes:
- A new feature or capability dealers can use
- A bug fix that affected something dealers could see or do
- A rule or behaviour change that impacts listings, publishing, or pricing
- A fix that restores something that was broken for dealers

Exclude items where the value is internal:
- Infrastructure work (migrations, decommissions, service shutdowns)
- Developer tooling or code quality improvements
- SPIKEs, design reviews, coordination tasks
- Performance improvements that are invisible to dealers
- Schema or data changes with no UI or workflow impact

**When unsure**, ask the user: *"DLRINV-XXXX ([summary]) — does this have a visible impact on dealers? Should I include it?"*

---

## Phase 2: Read Current Changelog

Fetch the current page using `getConfluencePage`:

```
cloudId: carsales.atlassian.net
pageId: 3928391694
contentFormat: adf
```

Note the **version number** from the response — you'll need it for the update step.

Also note the date of the most recent entry so you can skip any Jira items already logged.

---

## Phase 3: Preview & Confirm

Present the proposed new entries to the user in this format:

```
New entries to add (X items):

  2026-03-23 — Special Offers side panel released with vehicle details and OEM offer display [DLRINV-8116](https://carsales.atlassian.net/browse/DLRINV-8116)
  2026-03-23 — Publishing rules updated to restrict new & demo Mazda listings [DLRINV-8131](https://carsales.atlassian.net/browse/DLRINV-8131)

What would you like to do?
  a) Add all and update the page
  b) Remove specific entries (tell me which ones)
  c) Edit a description (tell me which one and what to say)
  d) Cancel
```

**Grouping rule — club related tickets into a single entry:**
Before writing descriptions, look for tickets that together form one coherent piece of value (e.g. multiple stories delivering one feature, a bug and its follow-up fix, front-end and back-end halves of the same change). Group these into a single entry with a combined description. List all contributing Jira keys as linked references at the end.

The audience is senior leadership — they care about business outcomes and dealer experience, not implementation details.

- **Always** link every Jira ticket referenced — never output a bare key. Format: `[DLRINV-XXXX](https://carsales.atlassian.net/browse/DLRINV-XXXX)`. For grouped entries, list all keys: `[DLRINV-100](…) [DLRINV-101](…)`

**Include vs exclude examples:**

| Ticket | Decision | Reason |
|---|---|---|
| Special Offers - Create side panel | ✅ Include | Dealers can now see and apply OEM offers — visible new capability |
| Publishing rules updated to restrict Mazda listings | ✅ Include | Directly affects what dealers can publish |
| Fixed Hyundai stock not appearing in Special Offers | ✅ Include | Bug fix dealers would have noticed |
| Coordinate Bike/Boats Opportunity Index migration | ❌ Exclude | Internal data migration, no dealer impact |
| Shutdown legacy group dashboard service | ❌ Exclude | Infrastructure decommission, not dealer-facing |
| Refactor stats query to use DCP Stats API | ❌ Exclude | Internal code change, no visible change for dealers |
| SPIKE: Block bulk publishing of test stocks | ❌ Exclude | Investigation task, not a shipped change |
| Automations - Design Review | ❌ Exclude | Internal process, not a shipped change |

**Description writing rules:**
- Describe the value delivered, not the work done. Ask: *what can a dealer now do that they couldn't before?* or *what problem is now solved?*
- Plain English — no Jira jargon, no tech terms (no "endpoint", "migration", "refactor", "schema", "API", "pipeline")
- Present tense, sentence case (e.g. "OEM special offers now display automatically on eligible listings at publish")
- Max 120 characters for the description text

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
3. A linked text node for the Jira key pointing to `https://carsales.atlassian.net/browse/DLRINV-XXXX`

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
        "text": " — Special Offers panel released to inventory list page "
      },
      {
        "type": "text",
        "text": "[DLRINV-8116]",
        "marks": [{
          "type": "link",
          "attrs": { "href": "https://carsales.atlassian.net/browse/DLRINV-8116" }
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
  pageId: 3928391694
  title: Inventory changelog
  version: <current version + 1>
  body: <full updated ADF body>
```

After a successful update, output:

```
✓ Changelog updated — X new entries added
  https://carsales.atlassian.net/wiki/spaces/DEAL/pages/3928391694/Inventory+changelog
```

**Do not send any Teams, Slack, or other notifications.** Updating the Confluence page is the only output.

---

## Error Handling

| Scenario | Response |
|---|---|
| No Done items found in the lookback window | Tell the user, offer to extend the window |
| All candidates are filtered as noise | Show the raw list and ask the user to pick manually |
| Page version conflict (409) | Re-fetch the page, get new version number, retry once |
| Confluence update fails | Show the error, output the formatted entries as text so the user can paste manually |
| User has no Confluence write access | Output the formatted entries as text for manual copy-paste |
