# Claude Skills for Product Managers

A collection of Claude Code skills built for product managers — covering strategy, research, delivery, and stakeholder communication.

## What are skills?

Skills are instruction sets that extend Claude Code's behaviour for specific tasks. When a skill is active, Claude follows its workflow automatically when you describe what you need.

## Installation

1. Clone this repo into your Claude skills directory:

```bash
git clone https://github.com/ehm3dk/claude-skills-for-pms.git ~/.claude/skills
```

2. Or if you already have a skills directory, copy the `skills/` folder contents into it.

3. Restart Claude Code — skills are loaded automatically at session start.

---

## Skills

### Strategic

| Skill | What it does |
|-------|-------------|
| `define-product` | Generate a full PRD from a feature description or Jira ticket. Includes user stories, acceptance criteria, NFRs, test cases, and engineering instructions. Outputs as Markdown or .docx. |
| `discovery` | Run structured market research and competitor analysis. Covers TAM/SAM/SOM, competitor landscape, feature matrix, SWOT, gaps, and positioning. Uses live web search. |
| `challenge-me` | Stress-test an idea, plan, or decision. Surfaces blind spots, challenges weak assumptions, and presents the strongest counter-argument. |

### Execution

| Skill | What it does |
|-------|-------------|
| `meeting-notes` | Turn raw meeting notes or transcripts into structured documents with decisions, action items, key points, and open questions. Outputs as .docx or .md. |
| `meeting-agenda` | Generate structured meeting agendas with time blocks, objectives, and expected outcomes before the meeting starts. |
| `meeting-to-requirements` | Transform meeting notes and stakeholder inputs directly into a structured PRD. |
| `user-story-writer` | Generate well-structured user stories with acceptance criteria and edge cases from feature descriptions, PRDs, or raw notes. |
| `feature-decomposition-tool` | Break a feature down into shippable chunks with dependencies mapped. |
| `stakeholder-update` | Generate professional stakeholder, leadership, or executive updates. Handles all audiences with RAG status and SCARF framework. Outputs as .docx or .md. |
| `release-note` | Generate release notes from Jira tickets, Confluence pages, or a feature description. Supports multi-channel output (changelog, email, in-app, social) and T1/T2/T3 tiers. |
| `release-readiness` | Assess whether a feature is ready to release against functional, data, security, NFR, and ops criteria. |
| `sprint-planning-assistant` | Create a sprint plan with goals, capacity, and committed work. |
| `one-pager-creator` | Create a concise one-page brief for quick stakeholder alignment or feature proposals. |
| `experiment-designer` | Design product experiments beyond A/B tests — pricing, features, operations, and pilot programs. |
| `user-interview-analyzer` | Transform raw interview transcripts into structured snapshots with extracted opportunities and key quotes. |
| `stakeholder-simulator` | Get simulated feedback from CTO, UX, Sales, Executive, and User Advocate perspectives before a review. |

---

## Usage

Just describe what you need in natural language:

```
"Write a PRD for a dealer search feature"
→ uses define-product

"Process these meeting notes"
→ uses meeting-notes

"Do a competitive analysis for our pricing tool"
→ uses discovery

"Write a stakeholder update for leadership"
→ uses stakeholder-update
```

---

## Contributing

Skills are plain Markdown files. Each skill lives in its own directory:

```
skills/
  strategic/
    define-product/SKILL.md
    discovery/SKILL.md
  execution/
    meeting-notes/SKILL.md
    ...
```

To add a skill: create a new directory under `strategic/` or `execution/`, add a `SKILL.md`, and open a PR.
