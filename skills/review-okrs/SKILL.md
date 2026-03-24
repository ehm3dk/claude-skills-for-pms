---
name: review-okrs
description: Use when reviewing, critiquing, or improving OKRs for a product or delivery team. Triggers on requests to review OKRs, check if key results are measurable, improve KR quality, or validate an OKR set before a planning cycle.
---

# review-okrs

## Overview

The user is part of the **ACIL team** at carsales. Objectives are fixed — do not create, rename, or reword them. The user will provide KRs (sometimes delivery-focused). Your job is to:
1. Map each KR to the correct ACIL objective
2. Apply the pass/fail quality test
3. Rewrite every failing KR with a concrete outcome metric

**Never invent objectives. Never hallucinate KR context. If a KR cannot be confidently mapped, say so and ask.**

---

## ACIL Objectives (Fixed — Do Not Modify)

| # | Objective |
|---|---|
| O1 | To increase participation and engagement across AG Tools and ecosystems to support JTBD |
| O2 | To improve dealer productivity and platform efficiency |
| O3 | To expand revenue and platform growth |
| O4 | To expand carsales ecosystem through new partnerships |

**Mapping logic:**
- KRs about dealer usage, adoption, feature engagement → **O1**
- KRs about dealer workflows, time saved, reduced friction, data quality → **O2**
- KRs about new revenue, GMV, monetisation, paid features, upsell → **O3**
- KRs about integrations, third-party data, new partners, ecosystem APIs → **O4**
- If a KR could fit multiple objectives, choose the primary one and note the secondary

---

## The 4-Question Test (run on every KR)

1. **Does it have a number?** No number = not a KR.
2. **Is it an outcome or an output?** Outputs describe what you ship. Outcomes describe what changes as a result.
3. **Does it have a baseline and a target?** "Increase X" is not measurable. "Increase X from 40% to 65%" is.
4. **Can you complete it without achieving the objective?** If yes, it's an output.

---

## Red Flag Words → Automatic Fail

If a KR contains any of these words, it is an output disguised as a result:

`launch` · `ship` · `deliver` · `deploy` · `implement` · `build` · `complete` · `release` · `migrate` (as the end goal) · `ensure` · `improve` (without a number)

**Exception:** "migrate" is acceptable as a KR *when paired with a quality metric* (e.g. "Migrate 100% of records with < 1% error rate").

---

## Objective Quality Check

A strong objective is:
- **Qualitative and aspirational** — describes the change in the world, not the work to be done
- **User or business anchored** — answers "for whom?" or "so that what?"
- **Not a project name** — "Complete prospect migration" is a project. "Dealers have accurate, unified customer records to act on" is an objective.

---

## Output Format

Group KRs under their mapped ACIL objective. For each:

```
### O[1–4]: [ACIL Objective text]

**KR: [original KR text]**
Mapped to: O[N] — [one-line reason]
Quality: PASS / FAIL
Issue: [specific problem, or "none"]
Rewrite: [concrete replacement with baseline → target, or "no change needed"]
```

After all KRs, add:

```
## Summary
- [N] KRs pass · [N] fail
- Mapping: O1 [n] · O2 [n] · O3 [n] · O4 [n]
- Patterns: [e.g. "All KRs are outputs — no outcomes measured"]
- Top fix: [the single most important change]
- Unmapped: [any KRs you couldn't confidently assign — flag for user to confirm]
```

---

## Rewrite Rules

When rewriting a failed KR:
- Include a metric, a baseline (use `[TBC]` if unknown), and a target
- Use the format: `[Metric] from [baseline] to [target] by end of quarter`
- If the output-based KR maps to an obvious outcome, use that. If it doesn't, flag it: "No clear outcome for this output — confirm what success looks like."

**Examples:**

| Original (Fail) | Rewrite (Pass) |
|---|---|
| Ship call transcript feature | % of completed calls with enrichment summary saved to profile: [TBC] → 60% |
| Launch after-hours auto-response | Median response time to after-hours enquiries: [TBC] → reduce by 70% |
| Ensure data quality is good | Post-migration mandatory field completion rate: [TBC] → ≥ 95% |
| Increase dealer satisfaction | Dealer CSAT score: [TBC] → [target] (define measurement method first) |

---

## Structural Rules

| Check | Pass criteria |
|---|---|
| Number of objectives | 2–3 per team per quarter |
| KRs per objective | 2–4 (max 5) |
| Initiatives listed as KRs | Flag and move to initiatives list |
| All KRs traceable to objective | Each KR should visibly move the objective needle |
| Baselines confirmed | Flag `[TBC]` items as blockers before quarter starts |

---

## Common Mistakes

- **Objective = project name.** Fix: reframe around the outcome of completing the project.
- **KR = "100% complete" on a task.** Fix: measure fidelity or impact, not binary completion.
- **Satisfaction KR with no measurement method.** Fix: name the survey, score, or signal before writing the target.
- **Overlapping KRs.** If two KRs both describe the same feature from different angles, consolidate or clarify.
- **Too many KRs.** More than 4 per objective = loss of focus. Cut the weakest.
