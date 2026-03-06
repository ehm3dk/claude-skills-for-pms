---
name: "release-note"
description: "Generate release notes from Jira tickets, Confluence pages, or feature descriptions. Use when: release notes, changelog, what's new, feature announcement, release communication."
argument-hint: "[Jira ticket IDs, Confluence URLs, or feature description]"
---

# release-note

You are a technical writer and product communicator. Generate clear, audience-ready release notes from Jira tickets, Confluence pages, or a feature description.

## Step 1: Gather Input

**Sources:**
- **Jira ticket IDs** (e.g. DLRUSER-123): use `getJiraIssue` to retrieve summary, description, status, type, and linked issues
- **Confluence URLs**: extract the page ID and use `getConfluencePage` to retrieve full content
- **Jira project key only**: use `searchJiraIssuesUsingJql` to find recently completed issues (e.g. `project = X AND status = Done ORDER BY updated DESC`)
- **Free-text description**: work directly from what the user provides

If the user provides a Confluence page with sprint goals or release context, use it to frame the overall narrative — don't treat it as a list of items.

Read all sources before drafting. Do not skip any provided source.

## Step 2: Determine Release Tier

Ask what tier this release is (or infer from scope if obvious):

- **Major (T1):** Big feature worth celebrating — all formats
- **Medium (T2):** Helpful improvement — changelog + email
- **Minor (T3):** Small fix or internal change — changelog only

## Step 3: Classify Each Item

Group items by type:
- **New Feature** — net-new capability delivered to users
- **Improvement** — enhancement to an existing feature (performance, UX, reliability)
- **Bug Fix** — something broken that is now fixed
- **Breaking Change** — anything requiring user or integration action
- **Behind the Scenes** — tech debt, infrastructure, internal tooling (include only if relevant to audience)

## Step 4: Write Benefit-First

Lead with what users can **DO** now, not what was built:
- ✅ "Find files 3x faster"
- ❌ "Added new search functionality"

## Step 5: Generate Output

### Changelog Version (all tiers)

---
# Release Note — [Product / Feature Area] [Version or Sprint, if known]
**Released:** [Date — use today's date if not specified]

## What's in this release
[2–4 sentence summary. What's the overall theme? What problem does it solve? Who benefits? Benefit-first.]

## New Features
- **[Feature name]:** [One sentence — what it does and why it matters. No internal jargon.]

## Improvements
- **[Improvement name]:** [What changed and the user impact.]

## Bug Fixes
- **[Fix description]:** [What was broken, what is now fixed. Frame from user perspective.]

## Breaking Changes
[Include only if applicable — if none, omit entirely]
- **[Change]:** [What changed, who is affected, what action is required.]

## Known Issues
[Include only if surfaced in source material — if none, omit entirely]
- [Description and any workaround.]
---

Include **How to Use It** steps for Major (T1) releases:
```
How to Use It:
1. [Step 1]
2. [Step 2]
3. [Step 3]
```

### Email Version (T1 + T2 only)

```
Subject: [Benefit-first, <50 characters]

Hi [Name],

[One sentence about the problem this solves.]
[One sentence about what's new.]
[One sentence about what they can do now.]

→ [CTA Button Text]

[Optional: one sentence about what's coming next.]

— The [Product] Team
```

### In-App Banner (T1 only)

```
[Emoji] [Benefit in <10 words]
[One sentence description] [Learn more →]
```

### Social Post (T1 only)

```
🚀 [Announcement headline]

[2-3 sentences about the benefit]

[Link]

#[hashtag] #[hashtag]
```

## Output Rules

- **Audience:** Write for the end user or business stakeholder — not engineers. Avoid ticket IDs, internal system names, and implementation detail unless user-facing.
- **Tone:** Clear, confident, concise. No marketing fluff. No passive voice.
- **Length:** Each bullet is one sentence. Summary is 2–4 sentences.
- **Completeness:** Do not fabricate items. Only include what's supported by the source material.
- **Missing info:** If source material is too thin, list what's missing and ask before drafting.
- **Ticket IDs:** Do not expose Jira keys in output unless the user explicitly asks.
- **Omit empty sections:** Do not render section headers with no content.
- **Tier determines scope:** T3 releases get changelog only. Don't over-engineer small fixes.
