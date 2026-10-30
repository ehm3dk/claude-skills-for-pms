---
name: "clarity-weekly-insights"
description: "Use when the user wants the top weekly insights from Microsoft Clarity for a Nexgate area (customer pages by default, or inventory, sourcing, dashboard). Trigger on: '/clarity-weekly-insights', 'clarity insights', 'top insights from clarity', 'what did clarity show this week', 'look at customer pages in clarity', 'weekly clarity review'. Pulls dashboard metrics (traffic, dead clicks, rage clicks, quick backs, JS errors), checks the top friction signal against session recordings, and returns a verified top 3."
argument-hint: "[optional: area path, default /customer] [optional: days to look back, default 7]"
---

# Clarity Weekly Insights

## Overview

Produces the top 3 behaviour insights for one area of Nexgate (`https://app.nexgate.ai`) from the Microsoft Clarity project `oqgyqmax7q`, using the Microsoft Clarity MCP tools.

The skill runs in two passes. The first pass pulls dashboard metrics to find candidate insights. The second pass checks the strongest friction signal against session recordings before calling it an insight. Dashboard element-level numbers can be badly inflated, so the second pass is not optional.

**Inputs**

1. **Area**: a URL path segment. Defaults to `/customer`. Other common values are `/inventory`, `/sourcing`, `/dashboard`, `/livemarket`.
2. **Window**: days to look back. Defaults to 7. Compute explicit dates from today, for example 23 to 30 October.

Load the tools first with ToolSearch: `select:mcp__Microsoft_Clarity__query-analytics-dashboard,mcp__Microsoft_Clarity__list-session-recordings`.

---

## Phase 1: Dashboard pass

Clarity's query tool works best with **one metric per query**, and every query must include the time range. Run these in parallel. Replace `{area}` and `{range}` with the area and window.

| #   | Query                                                                            | Purpose               |
| --- | -------------------------------------------------------------------------------- | --------------------- |
| 1   | `Top pages with URL containing {area} by page views {range}`                     | Which pages matter    |
| 2   | `Distinct sessions that visited https://app.nexgate.ai{area}/list {range}`       | Denominator for rates |
| 3   | `Rage clicks count by page for URLs containing {area} {range}`                   | Frustration           |
| 4   | `Dead clicks count by page for URLs containing {area} {range}`                   | Broken expectations   |
| 5   | `Quick backs count by page for URLs containing {area} {range}`                   | Bounce-backs          |
| 6   | `Top JavaScript errors on pages containing {area} {range}`                       | Stability             |
| 7   | `Top dead-clicked elements or text on https://app.nexgate.ai{area}/list {range}` | Which element         |

Then run the follow-ups:

1. **Is the top JS error new?** Ask for its daily count over the previous 3 weeks. The tool returns at most 10 rows, so split the range into two queries if needed.
2. **Week-over-week**: ask for the previous window's dead click total on the main list page.

**Ignore**

1. `stg.app.nexgate.ai` URLs, which come from staging traffic.
2. Average scroll depth. It returns 100% for every details page and tells you nothing.
3. Noise errors: `ResizeObserver loop`, `Script error.`, `NG02100`, unless they spike.

**Read the numbers carefully**

1. Details pages are keyed by UUID (`/customer/details/<uuid>`). Treat them as one page type, and note when friction is concentrated in a few specific records.
2. Text masking: `▪` stands for a letter and `▫` for a digit, so `▫▫ of ▫▫▫▫ items returned` is the result count.
3. **The element-level dead-click totals (query 7) can be larger than the page total (query 4).** When they are, use the elements only as a ranking, and verify the top one in Phase 2.

---

## Phase 2: Recording pass (verify before claiming)

Take the strongest behavioural candidate, usually the top dead-clicked element, and check it in recordings.

**Sample A, targeted:**

```json
{
  "filters": {
    "date": { "start": "<start>T00:00:00.000Z", "end": "<end>T23:59:59.999Z" },
    "visitedUrls": [
      { "url": "https://app.nexgate.ai{area}/list", "operator": "startsWith" }
    ],
    "deadClickPresent": true,
    "clickedText": "<top element text>"
  },
  "sortBy": "SessionClickCount_DESC",
  "count": 25
}
```

`clickedText` matches **any** click on that text, not only dead clicks, so most sessions in this sample will be normal clicks on other pages.

**Sample B, random baseline:** use the same filters without `clickedText`, with `sortBy: SessionStart_DESC` and `count: 100`.

The result is too large to read inline. The tool saves it to a file. Analyse it with `jq`, not Read. Some `url` and `text` values are null, so always use `(.url//"")` and `(.text//"")`.

Useful `jq` cuts (`$F` is the saved file):

```bash
# event types
jq -r '.[].timeline[].timelineEvents[]?.eventtype' $F | sort | uniq -c | sort -rn
# dead clicks on the list page: total, and distinct sessions per element
L='.timeline[]|select((.url//"")|test("{area}/list"))|.timelineEvents[]?'
jq -r ".[]|$L|select(.eventtype==\"Dead click\")|(.text//\"\")|.[0:30]" $F | sort | uniq -c | sort -rn | head
jq -r ".[]|[$L|select(.eventtype==\"Dead click\")|(.text//\"\")|.[0:30]]|unique[]" $F | sort | uniq -c | sort -rn | head
# what users do right after a dead click (a normal Click means they recovered)
jq -r '.[].timeline[]|select((.url//"")|test("{area}/list"))|(.timelineEvents//[]) as $e|range(0;($e|length)-1) as $i|select($e[$i].eventtype=="Dead click")|$e[$i+1].eventtype' $F | sort | uniq -c
# top working clicks on the details page (reveals the real workflow)
jq -r '.[].timeline[]|select((.url//"")|test("{area}/details"))|.timelineEvents[]?|select(.eventtype=="Click")|(.text//"")|.[0:30]' $F | sort | uniq -c | sort -rn | head -15
# what came right before each rage click
jq -r '.[].timeline[]|(.timelineEvents//[]) as $e|range(1;$e|length) as $i|select($e[$i].eventtype=="Rage clicks")|"\(.url|tostring|.[0:60])\t\($e[$i-1].eventtype):\(($e[$i-1].text//"")|.[0:30])"' $F | sort | uniq -c | sort -rn | head
```

**Decide**

1. Is the behaviour spread across many sessions, or concentrated in one or two? Count distinct sessions, not clicks.
2. Does it show up in the random baseline (Sample B)? If not, drop it or downgrade it, and say so.
3. Do users recover straight away (the next event is a normal Click)? If so, it is low severity.
4. Which working clicks dominate the details page? Heavy `Prev`/`Next` use alongside status clicks means users are working through customers one at a time. That is often the real insight.

You are reading timelines, not watching videos. Say so in the output.

---

## Phase 3: Output

Return the **top 3 insights**, ranked by impact. For each insight:

1. **Headline**: one sentence on what is happening.
2. **Evidence**: 2 to 4 bullets with numbers and the window. Include whether it is new or long-standing.
3. **Action**: one concrete next step, such as a DLRUSER bug, a design change or further investigation.

Then add:

1. **Data caveats**: inflated element counts, signals that are concentrated in a single user, sample sizes, and the fact that recordings were analysed as timelines.
2. **Recordings worth watching**: 1 to 3 Clarity player links from the samples.

**Style**: plain words, sentence case, no em dashes (use commas), and dates written as "23 to 30 October". Lead with what the user should do or know, not with method.

---

## Lessons from past runs

1. **October 2026, customer pages.** "Contacted" was the top dead-clicked element on the dashboard, with 32,865 dead clicks against a page total of 17,958. In the recordings, 43 of the 45 "Contacted" dead clicks came from one user, and 0 of 100 random sessions had one. The real insight was the workflow on the details page: 340 "Contacted" status clicks and about 500 `Prev`/`Next` clicks, showing that users update status one customer at a time.
2. The JS error `Cannot read properties of undefined (reading 'latestLead')` on `/customer/list` ran at about 500 to 1,600 a day through October 2026. Check whether it is still present before reporting it as new.
