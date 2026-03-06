---
name: market-research
description: "Use this skill whenever the user asks for market research, competitive analysis, competitor comparison, market sizing, industry analysis, or trend analysis for a product, feature, or business idea. Trigger on phrases like 'do market research for', 'analyze the competition', 'who are the competitors for', 'what's the market size for', 'competitive landscape for', 'SWOT analysis for', 'compare competitors in', 'direct and indirect competitors', 'TAM SAM SOM', 'industry trends for', or any mention of market research combined with a product or industry. Also trigger when the user describes a product and asks 'what's out there' or 'who else does this' or 'is there a market for this'. This skill uses web search to gather real data, structures findings into a professional research document with competitor analysis (direct + indirect), market sizing, trend analysis, and SWOT, and outputs as .docx or .md. Do NOT use for financial modeling, business plan creation, or general knowledge questions about industries."
---

# Market Research Skill

## Overview

This skill conducts structured market research for a product, feature, or business idea. It uses web search to gather real, current data and produces a professional research document covering competitor analysis (direct and indirect), market sizing, industry trends, and SWOT analysis.

## Workflow

### Step 1: Gather Context

The user needs to provide at minimum:

**Must-have:**
- Product/feature name and a brief description of what it does
- Target market or industry

If either is missing, ask. Keep it to one conversational message, not an interrogation.

**Nice-to-have (extract if shared, don't demand):**
- Known competitors the user is already aware of
- Specific research questions they want answered
- Geographic focus (global, India, US, etc.)
- Whether this is for an existing product or a new concept

If the user provides just a product name and description, that's enough to proceed — infer the industry and target market from the description.

### Step 2: Section Selection

Present the user with section options using the `ask_user_input_v0` tool as a multi-select:

**Question 1 — Sections to include:**
- All sections
- Competitor Analysis (Direct + Indirect)
- Market Sizing (TAM / SAM / SOM)
- Industry Trends & Landscape

**Question 2 — Additional sections (only if "All sections" was NOT selected):**
- SWOT Analysis
- Key Insights & Recommendations

If "All sections" is selected, include everything.

**Question 3 — Output format:**
- Word document (.docx)
- Markdown file (.md)

### Step 3: Research

This is the core step. Use web search extensively to gather real, current data. Do NOT rely solely on training knowledge — search for the latest information.

**Research approach:**

1. **Start broad:** Search for the industry/market overview to understand the landscape
2. **Identify competitors:** Search specifically for direct and indirect competitors
3. **Go deep on each competitor:** Search for their product details, pricing, positioning, funding, market share where available
4. **Market data:** Search for market size estimates, growth rates, analyst reports
5. **Trends:** Search for recent industry trends, emerging technologies, regulatory changes

**Search strategy tips:**
- Use short, specific queries (3-6 words)
- Search for "[industry] market size 2025" or "[industry] TAM"
- Search for "[product category] competitors" and "[product] alternatives"
- Search for "[competitor name] pricing" or "[competitor name] features"
- Search for "[industry] trends 2025 2026"
- For Indian markets specifically, include "India" in searches
- Use web_fetch to read full articles when snippets aren't enough

**Aim for 8-15 web searches** depending on complexity. More searches = better data. Don't shortcut this step.

### Step 4: Generate the Document

Based on research findings, generate the document with the selected sections.

---

#### Section: Executive Summary (always included)

A 3-4 paragraph overview of the research findings. Cover: what the market looks like, who the key players are, how big the opportunity is, and what the user should pay attention to. This should be useful even if someone reads nothing else.

---

#### Section: Competitor Analysis (Direct + Indirect)

This is the most important section. Split it clearly into two subsections.

**Direct Competitors**

Companies/products that solve the same problem for the same target audience in the same way.

For each direct competitor, provide:

| Field | Description |
|-------|-------------|
| Company/Product | Name and one-line description |
| Founded / HQ | When and where |
| Funding / Revenue | If publicly available |
| Target Audience | Who they serve |
| Key Features | What they offer (5-8 key features) |
| Pricing | Pricing model and tiers if available |
| Strengths | What they do well (2-3 points) |
| Weaknesses | Where they fall short (2-3 points) |
| Market Position | How they're positioned — leader, challenger, niche, etc. |

After individual competitor profiles, include a **Comparison Matrix** — a table comparing all direct competitors across key dimensions (features, pricing, target market, platform, etc.).

**Indirect Competitors**

Companies/products that solve the same underlying problem but through a different approach, adjacent category, or for a different segment that could expand into the user's space.

For each indirect competitor, provide:
- Company/Product name and description
- How they relate to the user's product (what overlap exists)
- Why they're a threat or relevant
- Key differentiator from direct competitors

Indirect competitors don't need the full profile — a paragraph each is sufficient. But include at least 3-5 indirect competitors.

**Rules for competitor analysis:**
- NEVER fabricate competitor data. If you can't find pricing or funding info, say "Not publicly available" — don't guess.
- Use web search to verify each competitor's current status. Companies pivot, shut down, or get acquired.
- If the user mentioned competitors they already know about, include those AND add others found through research.
- Clearly cite where data comes from when stating specific numbers (funding rounds, market share percentages, etc.).

---

#### Section: Market Sizing (TAM / SAM / SOM)

Provide estimates with clear methodology:

**TAM (Total Addressable Market):** The entire revenue opportunity if 100% market share is achieved. Usually the broadest industry number.

**SAM (Serviceable Addressable Market):** The segment of TAM that the user's product can realistically serve given its positioning, geography, and capabilities.

**SOM (Serviceable Obtainable Market):** The realistic near-term capture — what share of SAM the user could reasonably achieve in 2-3 years.

**Rules:**
- Use real data from analyst reports, industry publications, or credible sources found via web search.
- Always state the source for market size numbers.
- If exact numbers aren't available, provide a range and explain the methodology.
- Include growth rate (CAGR) where available.
- Present as both a narrative explanation and a summary table.
- If market sizing data is thin or unreliable for the specific niche, be honest about it rather than fabricating precision.

---

#### Section: Industry Trends & Landscape

Cover 4-6 significant trends shaping the market. For each trend:

- **What's happening** — describe the trend in 2-3 sentences
- **Why it matters** — impact on the user's product or market
- **Evidence** — specific data points, examples, or signals from web research

Trends should include a mix of:
- Technology trends (new tools, platforms, AI impact, etc.)
- Market dynamics (consolidation, new entrants, funding trends)
- Regulatory changes (if applicable)
- User behavior shifts
- Pricing/business model trends

---

#### Section: SWOT Analysis

A SWOT analysis **for the user's product** based on the research findings.

| | Helpful | Harmful |
|---|---------|---------|
| **Internal** | **Strengths** | **Weaknesses** |
| **External** | **Opportunities** | **Threats** |

For each quadrant, provide 3-5 specific, actionable points. These should be directly informed by the competitor analysis and market research — not generic statements.

**Rules:**
- Strengths and Weaknesses are about the user's product/position relative to competitors.
- Opportunities and Threats are external market factors.
- If you don't have enough info about the user's product to assess Strengths/Weaknesses, mark them as "[Requires more context about your product's current capabilities]" and focus on Opportunities/Threats which can be derived from market research alone.

---

#### Section: Key Insights & Recommendations

3-5 actionable recommendations based on the research. Each should be:

- **Specific** — not "focus on marketing" but "consider targeting [specific segment] where [competitor] is weak"
- **Grounded in data** — reference specific findings from the research
- **Prioritized** — indicate which are most urgent or impactful

---

### Step 5: Generate the Output File

**If .docx:** Read `/mnt/skills/public/docx/SKILL.md` for best practices. Formatting:
- US Letter page size, 1-inch margins
- Arial font, 12pt body
- Heading 1 for main sections, Heading 2 for subsections (competitor names, trend titles)
- Tables for comparison matrices, market sizing summaries, SWOT (use proper docx-js tables with dual widths, DXA units, ShadingType.CLEAR)
- Clean, minimal formatting — easy to customize
- Title page with: "Market Research — [Product/Market Name]", Date, Version 1.0
- Page numbers in footer

**If .md:** Clean markdown with proper heading hierarchy, markdown tables, and standard formatting.

**Filename:** `Market_Research_<ProductName>_v1.docx` or `.md`

Save to `/mnt/user-data/outputs/` and use `present_files` to share.

### Step 6: Summary

After generating, provide in chat:

```
Here's your market research document:

🏢 X direct competitors profiled
🔄 Y indirect competitors identified
📊 Market sizing: [TAM headline number if available]
📈 Z key trends covered
🎯 W actionable recommendations

⚠️ Data limitations:
- [Any areas where data was thin or unavailable]
- [Any competitors where pricing/funding wasn't public]
```

## Content Rules

- **ALWAYS use web search.** This skill is useless without real data. Don't rely on training knowledge for competitor details, market sizes, or trends — search for current information.
- **NEVER fabricate numbers.** No made-up market sizes, funding amounts, or growth rates. If you can't find it, say so.
- **Cite sources** when stating specific data points (market size, funding, growth rates). Inline citations are fine — no need for a formal bibliography.
- **Distinguish facts from analysis.** Competitor features and pricing are facts (verify them). SWOT points and recommendations are your analysis (label them as such).
- **Be opinionated in recommendations.** The user wants insight, not a balanced on-the-other-hand overview. Take positions on what the data suggests.
- **Keep competitor profiles roughly equal in depth.** Don't write 500 words on one competitor and 50 on another unless one is genuinely more relevant.

## Important Notes

- This skill works best when the user provides a clear product description. Vague inputs like "do market research on fintech" will produce generic results — ask for specificity.
- Geographic context matters. If the user doesn't specify, ask — the competitive landscape for insurance in India is completely different from the US.
- If the user asks to update or add competitors after generation, offer to regenerate the relevant sections or create a supplementary document.
- The web search step takes time. Set expectations with the user that this will involve multiple searches to get quality data.
